import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

import type { Database } from "@/types/supabase";
import { campaignSchedulerEnabled } from "@/lib/feature-flags";
import { buildCampaignMessages, buildCampaignSnapshot, type CampaignMessagePayload } from "@/lib/campaigns";
import { verifyUrlsAreReachable } from "@/lib/link-preflight";
import { logReferralEvent } from "@/lib/referral-events";
import { dispatchCampaignMessagesInline } from "@/lib/campaign-inline-dispatch";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { createServerComponentClient } from "@/lib/supabase";

export const runtime = "nodejs";

type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];

async function fetchBusiness(
  supabase: SupabaseClient<Database>,
  ownerId: string,
  fallbackName: string,
): Promise<BusinessRow> {
  // Core columns that are guaranteed to exist
  const coreColumns =
    "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, client_reward_text, new_user_reward_text, reward_terms";

  // First try with regular client (respects RLS)
  console.log("[fetchBusiness] Querying for owner_id:", ownerId);
  const { data, error } = await supabase
    .from("businesses")
    .select(coreColumns)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("[fetchBusiness] SELECT error:", error);
    const errorDetails = `${error.message} (code: ${error.code})`;
    throw new Error(`Failed to query business profile. ${errorDetails}`);
  }

  console.log("[fetchBusiness] SELECT result - data length:", data?.length || 0);

  if (data && data.length > 0) {
    const baseBusiness = data[0] as BusinessRow;

    // Try to load optional fields in a separate non-critical query
    try {
      const { data: extras } = await supabase
        .from("businesses")
        .select("logo_url, brand_highlight_color, brand_tone")
        .eq("id", baseBusiness.id)
        .single<Pick<BusinessRow, "logo_url" | "brand_highlight_color" | "brand_tone">>();

      if (extras) {
        return {
          ...baseBusiness,
          logo_url: extras.logo_url ?? null,
          brand_highlight_color: extras.brand_highlight_color ?? null,
          brand_tone: extras.brand_tone ?? null,
        } as BusinessRow;
      }
    } catch (extrasError) {
      console.warn("Optional business fields not available:", extrasError);
    }

    return baseBusiness as BusinessRow;
  }

  // No business found - create one using regular client (RLS allows insert for own user)
  console.log("[fetchBusiness] No business found, creating new one with name:", fallbackName);
  const insertPayload: Database["public"]["Tables"]["businesses"]["Insert"] = {
    owner_id: ownerId,
    name: fallbackName,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const businessQuery = supabase.from("businesses") as any;
  const { data: inserted, error: insertError } = await businessQuery
    .insert([insertPayload])
    .select(coreColumns)
    .single();

  if (insertError || !inserted) {
    console.error("[fetchBusiness] INSERT error:", insertError);
    console.error("[fetchBusiness] INSERT payload was:", insertPayload);
    const errorDetails = insertError
      ? `${insertError.message} (code: ${insertError.code})`
      : "No data returned";
    throw new Error(`Unable to load or create business profile. ${errorDetails}`);
  }

  console.log("[fetchBusiness] Successfully created business:", inserted.id);

  // Try to load optional fields for newly created business
  try {
    const { data: extras } = await supabase
      .from("businesses")
      .select("logo_url, brand_highlight_color, brand_tone")
      .eq("id", inserted.id)
      .single<Pick<BusinessRow, "logo_url" | "brand_highlight_color" | "brand_tone">>();

    if (extras) {
      return {
        ...inserted,
        logo_url: extras.logo_url ?? null,
        brand_highlight_color: extras.brand_highlight_color ?? null,
        brand_tone: extras.brand_tone ?? null,
      } as BusinessRow;
    }
  } catch (extrasError) {
    console.warn("Optional fields not available for new business:", extrasError);
  }

  return inserted as BusinessRow;
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();
    const campaignName = (payload?.campaignName as string) ?? "";
    const campaignMessage = (payload?.campaignMessage as string) ?? "";
    const campaignChannel = payload?.campaignChannel as "sms" | "email";
    const scheduleType = (payload?.scheduleType as "now" | "later") ?? "now";
    const scheduleDate = (payload?.scheduleDate as string | null) ?? "";
    const selectedCustomers = (payload?.selectedCustomers as string[]) ?? [];
    const includeQrModule =
      payload?.includeQrModule === undefined ? true : Boolean(payload.includeQrModule);

    if (!campaignName || selectedCustomers.length === 0) {
      return NextResponse.json(
        { error: "Please provide a campaign name and select at least one customer." },
        { status: 400 },
      );
    }

    if (campaignChannel === "sms" && !campaignMessage) {
      return NextResponse.json(
        { error: "Provide an SMS message or switch to email for this campaign." },
        { status: 400 },
      );
    }

    const schedulingEnabled = campaignSchedulerEnabled;
    const wantsScheduledSend = scheduleType === "later";
    if (wantsScheduledSend && !schedulingEnabled) {
      return NextResponse.json(
        { error: "Scheduled sending is coming soon. Please choose Send Now instead." },
        { status: 400 },
      );
    }

    let scheduledAt = new Date();
    if (wantsScheduledSend) {
      if (!scheduleDate) {
        return NextResponse.json(
          { error: "Select a date/time for your scheduled campaign." },
          { status: 400 },
        );
      }
      const parsed = new Date(scheduleDate);
      if (Number.isNaN(parsed.getTime())) {
        return NextResponse.json({ error: "Invalid schedule date." }, { status: 400 });
      }
      if (parsed.getTime() <= Date.now()) {
        return NextResponse.json(
          { error: "Scheduled time must be in the future." },
          { status: 400 },
        );
      }
      scheduledAt = parsed;
    }
    const scheduledAtIso = scheduledAt.toISOString();

    if (campaignChannel === "email") {
      if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
        return NextResponse.json(
          {
            error:
              "Email sending is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL to your environment settings.",
          },
          { status: 400 },
        );
      }
    } else if (campaignChannel === "sms") {
      if (
        !process.env.TWILIO_ACCOUNT_SID ||
        !process.env.TWILIO_AUTH_TOKEN ||
        !process.env.TWILIO_PHONE_NUMBER
      ) {
        return NextResponse.json(
          {
            error:
              "SMS sending is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER.",
          },
          { status: 400 },
        );
      }
    }

    const fallbackName = `${user.email?.split("@")[0] ?? "Your"}'s salon`;
    const business = await fetchBusiness(supabase, user.id, fallbackName);

    const defaultSiteUrl = ensureAbsoluteUrl("http://localhost:3000") ?? "http://localhost:3000";
    const configuredSiteUrl = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    const siteUrl = configuredSiteUrl ?? defaultSiteUrl;
    const baseSiteUrl =
      ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
      ensureAbsoluteUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
      siteUrl;
    const referralProjectSlug =
      process.env.NEXT_PUBLIC_REFERRAL_PROJECT?.trim() || business.id || null;

    const { data: customersDataRaw, error: fetchError } = await supabase
      .from("customers")
      .select("id, name, phone, email, referral_code")
      .in("id", selectedCustomers)
      .eq("business_id", business.id);

    if (fetchError || !customersDataRaw) {
      console.error("Failed to fetch customers:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch customer data. Please try again." },
        { status: 500 },
      );
    }

    const customersData = customersDataRaw as Database["public"]["Tables"]["customers"]["Row"][];

    const selectedCustomersWithCodes = await Promise.all(
      customersData.map(async (customer) => {
        if (customer.referral_code) return customer;
        const newCode = nanoid(12);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("customers") as any)
          .update({ referral_code: newCode })
          .eq("id", customer.id)
          .eq("business_id", business.id);
        return { ...customer, referral_code: newCode };
      }),
    );

    const snapshotFields = buildCampaignSnapshot(business);
    const snapshotWithQr = {
      ...snapshotFields,
      snapshot_include_qr: includeQrModule,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const campaignsInsert = supabase.from("campaigns") as any;
    const insertPayload: Record<string, unknown> = {
      business_id: business.id,
      name: campaignName,
      message: campaignMessage,
      channel: campaignChannel,
      status: "queued",
      total_recipients: selectedCustomersWithCodes.length,
      sent_count: 0,
      ...snapshotWithQr,
      scheduled_at: scheduledAtIso,
    };
    const optionalSnapshotColumns = ["snapshot_story_blocks", "snapshot_include_qr"];
    let campaignData: Record<string, unknown> | null = null;
    let campaignError: { code?: string; message?: string } | null = null;

    for (let attempt = 0; attempt <= optionalSnapshotColumns.length; attempt++) {
      const { data, error } = await campaignsInsert.insert([insertPayload]).select().single();
      if (!error && data) {
        campaignData = data;
        campaignError = null;
        break;
      }

      campaignError = error;
      if (error?.code === "42703") {
        const missingColumn = optionalSnapshotColumns.find((column) =>
          error.message?.toLowerCase().includes(column.toLowerCase()),
        );
        if (missingColumn) {
          console.warn(
            `[campaigns.send] Optional column ${missingColumn} missing, retrying insert without it.`,
          );
          delete insertPayload[missingColumn];
          continue;
        }
      }

      break;
    }

    if (campaignError || !campaignData) {
      console.error("Failed to create campaign record:", campaignError);
      return NextResponse.json(
        {
          error:
            "Unable to create campaign. Please ensure the latest database migrations have been applied.",
        },
        { status: 500 },
      );
    }

    const campaignId = (campaignData as { id: string }).id;
    const { messages: messagesToInsert, skipped } = buildCampaignMessages({
      campaignId,
      businessId: business.id,
      baseSiteUrl,
      campaignName,
      campaignMessage,
      campaignChannel,
      customers: selectedCustomersWithCodes as Array<
        Pick<Database["public"]["Tables"]["customers"]["Row"], "id" | "name" | "phone" | "email" | "referral_code">
      >,
      scheduledAtIso,
      referralProjectSlug,
    });

    if (messagesToInsert.length === 0) {
      await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaignId);
      return NextResponse.json(
        {
          error:
            "No deliverable contacts found. Ensure selected ambassadors have valid email addresses or SMS numbers.",
        },
        { status: 400 },
      );
    }

    const preflightCandidate = messagesToInsert[0];
    if (preflightCandidate) {
      const preflightTargets: string[] = [];
      if (preflightCandidate.referral_link) {
        preflightTargets.push(preflightCandidate.referral_link);
      }
      const landingRaw = preflightCandidate.metadata?.["referral_landing_url"];
      if (typeof landingRaw === "string" && landingRaw.length > 0) {
        preflightTargets.push(landingRaw);
      }
      if (preflightTargets.length > 0) {
        const { ok, failures } = await verifyUrlsAreReachable(preflightTargets);
        if (!ok && failures.length > 0) {
          const failure = failures[0];
          const failureReason = failure.status
            ? `HTTP ${failure.status}`
            : failure.error ?? "The page did not respond";
          await supabase
            .from("campaigns")
            .delete()
            .eq("id", campaignId);
          return NextResponse.json(
            {
              error: `We couldn't reach ${failure.url}. (${failureReason}) Confirm your NEXT_PUBLIC_SITE_URL and referral landing page are live before starting this campaign.`,
            },
            { status: 400 },
          );
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageInsert = supabase.from("campaign_messages") as any;
    const { data: insertedMessages, error: insertError } = await messageInsert
      .insert(messagesToInsert)
      .select("id, customer_id");

    if (insertError) {
      console.error("Failed to queue campaign messages:", insertError);
      await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaignId);
      return NextResponse.json(
        {
          error:
            "Failed to queue campaign messages. Please ensure the database migrations are up to date.",
        },
        { status: 500 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("campaigns") as any)
      .update({ total_recipients: messagesToInsert.length })
      .eq("id", campaignId);

    if (insertedMessages) {
      await Promise.all(
        insertedMessages.map((row: { id: string; customer_id: string | null }) =>
          logReferralEvent({
            supabase,
            businessId: business.id,
            ambassadorId: row.customer_id,
            eventType: "campaign_message_queued",
            metadata: {
              campaign_id: campaignId,
              campaign_message_id: row.id,
              channel: campaignChannel,
              scheduled_at: scheduledAtIso,
            },
          }),
        ),
      );
    }

    let messagesWithIds =
      (insertedMessages as Array<{ id: string }> | null)?.map((row, index) => ({
        ...messagesToInsert[index],
        id: row.id,
      })) ?? [];

    if (messagesWithIds.length === 0) {
      const { data: fetchedMessages } = await supabase
        .from("campaign_messages")
        .select(
          "id, campaign_id, business_id, customer_id, channel, to_address, referral_link, message_body, metadata, scheduled_at",
        )
        .eq("campaign_id", campaignId)
        .order("created_at", { ascending: true })
        .limit(messagesToInsert.length);

      if (fetchedMessages && fetchedMessages.length > 0) {
        messagesWithIds = fetchedMessages as Array<CampaignMessagePayload & { id: string }>;
      }
    }

    const shouldDispatchInline = !wantsScheduledSend;
    const inlineDispatch = shouldDispatchInline
      ? await dispatchCampaignMessagesInline({
          supabase,
          messages: messagesWithIds as Array<CampaignMessagePayload & { id: string }>,
          campaign: campaignData,
          business,
          siteUrl,
        })
      : { sent: 0, failed: 0, error: null };

    const queuedCount = messagesToInsert.length;
    const skippedNote =
      skipped > 0
        ? ` ${skipped} contact${skipped === 1 ? "" : "s"} were skipped due to missing ${
            campaignChannel === "sms" ? "phone numbers" : "email addresses"
          }.`
        : "";

    const scheduleNote = wantsScheduledSend ? ` Scheduled for ${scheduledAt.toLocaleString()}.` : "";
    const dispatchNote = shouldDispatchInline
      ? inlineDispatch.error
        ? ` Dispatch failed: ${inlineDispatch.error}`
        : inlineDispatch.sent > 0
        ? " Dispatching now."
        : " Our dispatcher will send them shortly."
      : " Added to the dispatcher queue.";
    const sendStatusLabel =
      inlineDispatch.sent > 0 ? "Sending" : shouldDispatchInline ? "Queued" : "Scheduled";

    revalidatePath("/dashboard");

    return NextResponse.json({
      success: `${sendStatusLabel} ${queuedCount} ${
        campaignChannel === "sms" ? "SMS" : "email"
      } message${queuedCount === 1 ? "" : "s"}.${dispatchNote}${scheduleNote}${skippedNote}`,
    });
  } catch (error) {
    console.error("Campaign send API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Failed to queue campaign: ${error.message}`
            : "Failed to queue campaign. Please try again.",
      },
      { status: 500 },
    );
  }
}
