import { Resend } from "resend";
import twilio from "twilio";

import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent } from "@/lib/referral-events";
import { buildCampaignEmail } from "@/lib/campaign-email";
import { sendCampaignDeliveredSummaryOwnerEmail } from "@/lib/business-notifications";

const DEFAULT_BATCH_SIZE = 25;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://referlabs.com.au");

type CampaignMessageRecord = {
  id: string;
  campaign_id: string;
  business_id: string;
  customer_id: string | null;
  channel: "sms" | "email";
  to_address: string | null;
  referral_link: string | null;
  message_body: string | null;
  metadata: Record<string, unknown> | null;
  attempts: number | null;
  campaign: {
    id: string;
    name: string | null;
    snapshot_offer_text: string | null;
    snapshot_new_user_reward_text: string | null;
    snapshot_client_reward_text: string | null;
    snapshot_reward_type: string | null;
    snapshot_reward_amount: number | null;
    snapshot_upgrade_name: string | null;
    snapshot_reward_terms: string | null;
    snapshot_logo_url: string | null;
    snapshot_story_blocks: Record<string, unknown>[] | null;
    snapshot_include_qr: boolean | null;
  } | null;
  business: {
    name: string | null;
    logo_url?: string | null;
    brand_highlight_color?: string | null;
    brand_tone?: string | null;
  } | null;
  customer: {
    id: string | null;
    name: string | null;
    referral_code: string | null;
    email: string | null;
    phone: string | null;
  } | null;
};

type DispatchOptions = {
  batchSize?: number;
  restrictCampaignId?: string | null;
  skipBatchEvents?: boolean;
};

export type DispatchBatchResult = {
  processed: number;
  sent: number;
  failed: number;
  error?: string;
};

export async function runCampaignDispatchBatch(
  options: DispatchOptions = {},
): Promise<DispatchBatchResult> {
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  const maxAttempts = Number(process.env.CAMPAIGN_MAX_ATTEMPTS ?? 3);
  try {
    const supabase = await createServiceClient();
    const nowIso = new Date().toISOString();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from("campaign_messages")
      .select(
        `
          id,
          campaign_id,
          business_id,
          customer_id,
          channel,
          to_address,
          referral_link,
          message_body,
          metadata,
          attempts,
          campaign:campaign_id (
            id,
            name,
            snapshot_offer_text,
            snapshot_new_user_reward_text,
            snapshot_client_reward_text,
            snapshot_reward_type,
            snapshot_reward_amount,
            snapshot_upgrade_name,
            snapshot_reward_terms,
            snapshot_logo_url,
            snapshot_story_blocks,
            snapshot_include_qr
          ),
          business:business_id (
            name,
            logo_url,
            brand_highlight_color,
            brand_tone
          ),
          customer:customer_id (
            id,
            name,
            referral_code,
            email,
            phone
          )
        `,
      )
      .eq("status", "queued")
      .or(`scheduled_at.is.null,scheduled_at.lte.${nowIso}`)
      .order("created_at", { ascending: true })
      // Fetch extra rows so we can drop max-attempt messages without starving the batch.
      .limit(Math.max(batchSize * 2, batchSize));

    if (options.restrictCampaignId) {
      query = query.eq("campaign_id", options.restrictCampaignId);
    }

    const { data: queue, error: queueError } = await query;
    if (queueError) {
      console.error("Failed to load campaign queue:", queueError);
      return { processed: 0, sent: 0, failed: 0, error: "Failed to load queued messages." };
    }

    if (!queue || queue.length === 0) {
      return { processed: 0, sent: 0, failed: 0 };
    }

    const eligibleQueue = (queue as CampaignMessageRecord[]).filter(
      (record) => (record.attempts ?? 0) < maxAttempts,
    );

    // Fail messages that have exceeded max attempts (so they don't clog the queue forever).
    const overAttemptQueue = (queue as CampaignMessageRecord[]).filter(
      (record) => (record.attempts ?? 0) >= maxAttempts,
    );
    for (const record of overAttemptQueue) {
      await markMessageAs(
        supabase,
        record.id,
        "failed",
        `Max send attempts reached (${maxAttempts}).`,
      );
      await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
      await logReferralEvent({
        supabase,
        businessId: record.business_id,
        ambassadorId: record.customer_id,
        eventType: "campaign_message_failed",
        metadata: {
          campaign_id: record.campaign_id,
          campaign_message_id: record.id,
          reason: "Max attempts reached",
          max_attempts: maxAttempts,
          channel: record.channel,
        },
      });
    }

    const batchQueue = eligibleQueue.slice(0, batchSize);
    if (batchQueue.length === 0) {
      return { processed: 0, sent: 0, failed: overAttemptQueue.length };
    }

    const batchBusinessId =
      batchQueue.length > 0 ? (batchQueue[0] as CampaignMessageRecord).business_id : null;
    if (batchBusinessId && !options.skipBatchEvents) {
      await logReferralEvent({
        supabase,
        businessId: batchBusinessId,
        ambassadorId: null,
        eventType: "campaign_delivery_batch_started",
        metadata: { batch_size: batchQueue.length },
      });
    }

    const processedCampaigns = new Set<string>();
    let sent = 0;
    let failed = 0;

    for (const record of batchQueue as CampaignMessageRecord[]) {
      const locked = await lockMessage(supabase, record);
      if (!locked) continue;

      processedCampaigns.add(record.campaign_id);

      const result = await dispatchMessage(supabase, record);
      if (result === "sent") {
        sent += 1;
      } else if (result === "failed") {
        failed += 1;
      }
    }

    await finalizeCampaigns(supabase, Array.from(processedCampaigns));
    if (batchBusinessId && !options.skipBatchEvents) {
      await logReferralEvent({
        supabase,
        businessId: batchBusinessId,
        ambassadorId: null,
        eventType: "campaign_delivery_batch_finished",
        metadata: { processed: batchQueue.length, sent, failed },
      });
    }

    return {
      processed: batchQueue.length,
      sent,
      failed: failed + overAttemptQueue.length,
    };
  } catch (error) {
    console.error("Campaign dispatch error:", error);
    return { processed: 0, sent: 0, failed: 0, error: `${error}` };
  }
}

async function lockMessage(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  record: CampaignMessageRecord,
) {
  const now = new Date().toISOString();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("campaign_messages")
    .update({
      status: "sending",
      last_attempt_at: now,
      attempts: (record.attempts ?? 0) + 1,
    })
    .eq("id", record.id)
    .eq("status", "queued")
    .select("id")
    .single();

  if (error || !data) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("campaigns")
    .update({ status: "sending" })
    .eq("id", record.campaign_id)
    .in("status", ["queued", "sending"]);

  return true;
}

async function dispatchMessage(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  record: CampaignMessageRecord,
) {
  if (!record.to_address || !record.message_body) {
    await markMessageAs(
      supabase,
      record.id,
      "failed",
      "Missing destination address or message body",
    );
    await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        reason: "Missing address",
      },
    });
    return "failed";
  }

  if (record.channel === "sms") {
    return await sendSmsMessage(supabase, record);
  }

  return await sendEmailMessage(supabase, record);
}

async function sendSmsMessage(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  record: CampaignMessageRecord,
) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    await markMessageAs(
      supabase,
      record.id,
      "failed",
      "Twilio credentials are not configured",
    );
    await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        reason: "Twilio credentials missing",
      },
    });
    return "failed";
  }

  try {
    const client = twilio(sid, token);
    const response = await client.messages.create({
      body: record.message_body ?? "",
      from,
      to: record.to_address ?? "",
    });

    await markMessageAs(supabase, record.id, "sent", null, {
      provider_message_id: response.sid,
      sent_at: new Date().toISOString(),
    });
    await incrementCampaignCounts(supabase, record.campaign_id, 1, 0);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_sent",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        provider_message_id: response.sid,
        channel: "sms",
      },
    });
    return "sent";
  } catch (error) {
    console.error("Twilio send error:", error);
    await markMessageAs(supabase, record.id, "failed", `${error}`);
    await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        channel: "sms",
        error: `${error}`,
      },
    });
    return "failed";
  }
}

async function sendEmailMessage(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  record: CampaignMessageRecord,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const configuredFrom = process.env.RESEND_FROM_EMAIL?.trim();
  const replyTo =
    (record.metadata?.reply_to as string | undefined)?.trim() ||
    process.env.RESEND_REPLY_TO?.trim() ||
    undefined;

  if (!apiKey) {
    await markMessageAs(
      supabase,
      record.id,
      "failed",
      "Resend API key not configured",
    );
    await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        reason: "Resend credentials missing",
      },
    });
    return "failed";
  }

  const campaignSnapshot = record.campaign;
  if (!campaignSnapshot) {
    await markMessageAs(
      supabase,
      record.id,
      "failed",
      "Campaign snapshot missing",
    );
    await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        reason: "Missing snapshot",
      },
    });
    return "failed";
  }

  const resend = new Resend(apiKey);
  const fallbackFromEmail =
    configuredFrom && configuredFrom.length > 0
      ? configuredFrom
      : "onboarding@resend.dev";
  const businessName =
    record.business?.name || campaignSnapshot.name || "Refer Labs";
  const senderName =
    (record.metadata?.sender_name as string | undefined)?.trim() || businessName;
  const businessEmail =
    fallbackFromEmail.includes("<") && fallbackFromEmail.includes(">")
      ? fallbackFromEmail
      : `${senderName} <${fallbackFromEmail}>`;

  const referralLandingUrl =
    (record.metadata?.referral_landing_url as string | undefined) ||
    record.referral_link ||
    SITE_URL;
  const emailSubject =
    (record.metadata?.email_subject as string | undefined) ||
    campaignSnapshot.name ||
    businessName;
  const emailPreheader = (record.metadata?.email_preheader as string | undefined) || null;

  const brandLogo =
    campaignSnapshot.snapshot_logo_url ||
    record.business?.logo_url ||
    null;

  const { html, text } = await buildCampaignEmail({
    businessName,
    siteUrl: SITE_URL,
    campaignName: emailSubject,
    textBody: record.message_body ?? "",
    referralLink: record.referral_link || "",
    referralLandingUrl,
    ambassadorPortalUrl:
      (record.metadata?.ambassador_portal_url as string) ||
      `${SITE_URL}/r/referral`,
    preheaderText: emailPreheader,
    brand: {
      logoUrl: brandLogo,
      highlightColor: record.business?.brand_highlight_color ?? null,
      tone: record.business?.brand_tone ?? null,
    },
    includeQrCode: campaignSnapshot.snapshot_include_qr !== false,
    snapshot: {
      newUserRewardText: campaignSnapshot.snapshot_new_user_reward_text,
      clientRewardText: campaignSnapshot.snapshot_client_reward_text,
      rewardType: campaignSnapshot.snapshot_reward_type,
      rewardAmount: campaignSnapshot.snapshot_reward_amount,
      upgradeName: campaignSnapshot.snapshot_upgrade_name,
      rewardTerms: campaignSnapshot.snapshot_reward_terms,
      logoUrl: campaignSnapshot.snapshot_logo_url,
      storyBlocks: campaignSnapshot.snapshot_story_blocks,
      includeQr: campaignSnapshot.snapshot_include_qr ?? null,
    },
  });

  try {
    const toAddress = record.to_address ?? "";
    const response = await resend.emails.send({
      from: businessEmail,
      to: toAddress,
      subject: emailSubject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    });

    const providerMessageId = response?.data?.id ?? null;

    await markMessageAs(supabase, record.id, "sent", null, {
      provider_message_id: providerMessageId,
      sent_at: new Date().toISOString(),
    });
    await incrementCampaignCounts(supabase, record.campaign_id, 1, 0);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_sent",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        provider_message_id: providerMessageId,
        channel: "email",
      },
    });
    return "sent";
  } catch (error) {
    console.error("Resend send error:", error);
    await markMessageAs(supabase, record.id, "failed", `${error}`);
    await incrementCampaignCounts(supabase, record.campaign_id, 0, 1);
    await logReferralEvent({
      supabase,
      businessId: record.business_id,
      ambassadorId: record.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: record.campaign_id,
        campaign_message_id: record.id,
        channel: "email",
        error: `${error}`,
      },
    });
    return "failed";
  }
}

async function markMessageAs(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  messageId: string,
  status: "sent" | "failed" | "delivered",
  errorMessage?: string | null,
  extras?: Record<string, unknown>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("campaign_messages")
    .update({
      status,
      error: errorMessage ?? null,
      ...(extras ?? {}),
    })
    .eq("id", messageId);
}

async function incrementCampaignCounts(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  campaignId: string,
  sentDelta: number,
  failedDelta: number,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).rpc("increment_campaign_counts", {
    target: campaignId,
    sent_delta: sentDelta,
    failed_delta: failedDelta,
  });
}

async function finalizeCampaigns(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  campaignIds: string[],
) {
  for (const campaignId of campaignIds) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: pending } = await (supabase as any)
      .from("campaign_messages")
      .select("id", { count: "exact", head: true })
      .eq("campaign_id", campaignId)
      .in("status", ["queued", "sending"])
      .limit(1);

    if (pending && pending.length > 0) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: failures } = await (supabase as any)
      .from("campaign_messages")
      .select("id", { count: "exact", head: true })
      .eq("campaign_id", campaignId)
      .eq("status", "failed")
      .limit(1);

    const hasFailures = Boolean(failures && failures.length > 0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("campaigns")
      .update({ status: hasFailures ? "partial" : "completed" })
      .eq("id", campaignId);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: campaign } = await (supabase as any)
        .from("campaigns")
        .select("business_id")
        .eq("id", campaignId)
        .single();
      const businessId = (campaign as { business_id?: string | null } | null)?.business_id ?? null;
      if (businessId) {
        await sendCampaignDeliveredSummaryOwnerEmail({
          supabase,
          campaignId,
          businessId,
        });
      }
    } catch (error) {
      console.warn("Failed to send campaign summary email (non-fatal):", error);
    }
  }
}
