import twilio from "twilio";
import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";

import { buildCampaignEmail } from "@/lib/campaign-email";
import { logReferralEvent } from "@/lib/referral-events";
import type { CampaignMessagePayload } from "@/lib/campaigns";
import type { Database } from "@/types/supabase";

type CampaignMessageRecord = CampaignMessagePayload & { id: string };

type CampaignSnapshot = Partial<{
  snapshot_new_user_reward_text: string | null;
  snapshot_client_reward_text: string | null;
  snapshot_reward_type: string | null;
  snapshot_reward_amount: number | null;
  snapshot_upgrade_name: string | null;
  snapshot_reward_terms: string | null;
  snapshot_logo_url: string | null;
  snapshot_story_blocks: Record<string, unknown>[] | null;
  snapshot_include_qr: boolean | null;
}>;

export async function dispatchCampaignMessagesInline({
  supabase,
  messages,
  campaign,
  business,
  siteUrl,
}: {
  supabase: SupabaseClient<Database>;
  messages: Array<CampaignMessageRecord>;
  campaign: Record<string, unknown> & { id: string; name: string | null };
  business: Pick<Database["public"]["Tables"]["businesses"]["Row"], "name" | "logo_url" | "brand_highlight_color" | "brand_tone">;
  siteUrl: string;
}) {
  if (messages.length === 0) {
    return { sent: 0, failed: 0, error: "No queued messages were created." };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
  const twilioClient =
    twilioSid && twilioToken && twilioFrom ? twilio(twilioSid, twilioToken) : null;

  const campaignSnapshot = campaign as CampaignSnapshot;
  const snapshot = {
    newUserRewardText: campaignSnapshot.snapshot_new_user_reward_text ?? null,
    clientRewardText: campaignSnapshot.snapshot_client_reward_text ?? null,
    rewardType: campaignSnapshot.snapshot_reward_type ?? null,
    rewardAmount: campaignSnapshot.snapshot_reward_amount ?? null,
    upgradeName: campaignSnapshot.snapshot_upgrade_name ?? null,
    rewardTerms: campaignSnapshot.snapshot_reward_terms ?? null,
    logoUrl: campaignSnapshot.snapshot_logo_url ?? null,
    storyBlocks: campaignSnapshot.snapshot_story_blocks ?? null,
    includeQr: campaignSnapshot.snapshot_include_qr ?? null,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabaseClient = supabase as any;

  let sent = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const record of messages) {
    if (record.channel === "email") {
      if (!resendClient || !resendFromEmail) {
        failures.push("Resend is not configured");
        failed += 1;
        await supabaseClient
          .from("campaign_messages")
          .update({
            status: "failed",
            error: "Resend credentials missing",
          })
          .eq("id", record.id);
        continue;
      }

      try {
        const referralLandingUrl =
          (record.metadata?.["referral_landing_url"] as string | undefined) ||
          record.referral_link ||
          siteUrl;

        const { html, text } = await buildCampaignEmail({
          businessName: business.name || "Refer Labs",
          siteUrl,
          campaignName: (campaign.name as string | null) || "Private invitation",
          textBody: record.message_body ?? "",
          referralLink: record.referral_link || "",
          referralLandingUrl,
          ambassadorPortalUrl:
            (record.metadata?.["ambassador_portal_url"] as string) ||
            `${siteUrl}/r/referral`,
          brand: {
            logoUrl: snapshot.logoUrl ?? business.logo_url ?? null,
            highlightColor: business.brand_highlight_color ?? null,
            tone: business.brand_tone ?? null,
          },
          includeQrCode: snapshot.includeQr !== false,
          snapshot,
        });

        const response = await resendClient.emails.send({
          from:
            resendFromEmail.includes("<") && resendFromEmail.includes(">")
              ? resendFromEmail
              : `${business.name || "Refer Labs"} <${resendFromEmail}>`,
          to: record.to_address ?? "",
          subject: (campaign.name as string | null) || business.name || "Refer Labs",
          html,
          text,
          ...(process.env.RESEND_REPLY_TO?.trim() ? { reply_to: process.env.RESEND_REPLY_TO.trim() } : {}),
        });

        const providerMessageId = response?.data?.id ?? null;

        await supabaseClient
          .from("campaign_messages")
          .update({
            status: "sent",
            provider_message_id: providerMessageId,
            sent_at: new Date().toISOString(),
          })
          .eq("id", record.id);

        await supabaseClient.rpc("increment_campaign_counts", {
          target: campaign.id,
          sent_delta: 1,
          failed_delta: 0,
        });

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
        sent += 1;
      } catch (error) {
        const message = error instanceof Error ? error.message : `${error}`;
        failures.push(message);
        failed += 1;
        await supabaseClient
          .from("campaign_messages")
          .update({
            status: "failed",
            error: message,
          })
          .eq("id", record.id);

        await supabaseClient.rpc("increment_campaign_counts", {
          target: campaign.id,
          sent_delta: 0,
          failed_delta: 1,
        });

        await logReferralEvent({
          supabase,
          businessId: record.business_id,
          ambassadorId: record.customer_id,
          eventType: "campaign_message_failed",
          metadata: {
            campaign_id: record.campaign_id,
            campaign_message_id: record.id,
            channel: "email",
            error: message,
          },
        });
      }
      continue;
    }

    if (record.channel === "sms") {
      if (!twilioClient || !twilioFrom) {
        failures.push("Twilio is not configured");
        failed += 1;
        await supabaseClient
          .from("campaign_messages")
          .update({
            status: "failed",
            error: "Twilio credentials missing",
          })
          .eq("id", record.id);
        continue;
      }

      try {
        const response = await twilioClient.messages.create({
          body: record.message_body ?? "",
          from: twilioFrom,
          to: record.to_address ?? "",
        });

        await supabaseClient
          .from("campaign_messages")
          .update({
            status: "sent",
            provider_message_id: response.sid,
            sent_at: new Date().toISOString(),
          })
          .eq("id", record.id);

        await supabaseClient.rpc("increment_campaign_counts", {
          target: campaign.id,
          sent_delta: 1,
          failed_delta: 0,
        });

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
        sent += 1;
      } catch (smsError) {
        const message = smsError instanceof Error ? smsError.message : `${smsError}`;
        failures.push(message);
        failed += 1;
        await supabaseClient
          .from("campaign_messages")
          .update({
            status: "failed",
            error: message,
          })
          .eq("id", record.id);

        await supabaseClient.rpc("increment_campaign_counts", {
          target: campaign.id,
          sent_delta: 0,
          failed_delta: 1,
        });

        await logReferralEvent({
          supabase,
          businessId: record.business_id,
          ambassadorId: record.customer_id,
          eventType: "campaign_message_failed",
          metadata: {
            campaign_id: record.campaign_id,
            campaign_message_id: record.id,
            channel: "sms",
            error: message,
          },
        });
      }
    }
  }

  const { count: pendingCount } = await supabaseClient
    .from("campaign_messages")
    .select("id", { head: true, count: "exact" })
    .eq("campaign_id", campaign.id)
    .in("status", ["queued", "sending"])
    .limit(1);

  if (!pendingCount || pendingCount === 0) {
    const finalStatus = failed > 0 ? "partial" : "completed";
    await supabaseClient
      .from("campaigns")
      .update({ status: finalStatus })
      .eq("id", campaign.id);
  }

  return {
    sent,
    failed,
    error: failures.length > 0 ? failures[0] : null,
  };
}
