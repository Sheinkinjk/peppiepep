import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { z } from "zod";

import type { Database } from "@/types/supabase";
import { campaignSchedulerEnabled } from "@/lib/feature-flags";
import { buildCampaignMessages, buildCampaignSnapshot, type CampaignMessagePayload } from "@/lib/campaigns";
import { verifyUrlsAreReachable } from "@/lib/link-preflight";
import { logReferralEvent } from "@/lib/referral-events";
import { dispatchCampaignMessagesInline } from "@/lib/campaign-inline-dispatch";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { createServerComponentClient } from "@/lib/supabase";
import { resolveEmailCampaignMessage } from "@/lib/campaign-copy";
import { createApiLogger } from "@/lib/api-logger";
import type { ApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];

const campaignPayloadSchema = z.object({
  campaignName: z.string().trim().min(1, "Campaign name is required."),
  campaignMessage: z
    .string()
    .optional()
    .transform((val) => (val ?? "").trim()),
  campaignChannel: z.enum(["sms", "email"]),
  scheduleType: z.enum(["now", "later"]).default("now"),
  scheduleDate: z.union([z.string().trim().min(1), z.null()]).optional(),
  selectedCustomers: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one customer."),
  includeQrModule: z.boolean().optional().default(true),
});

async function fetchBusiness(
  supabase: SupabaseClient<Database>,
  ownerId: string,
  fallbackName: string,
  logger?: ApiLogger,
): Promise<BusinessRow> {
  // Core columns that are guaranteed to exist
  const coreColumns =
    "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, client_reward_text, new_user_reward_text, reward_terms";

  // First try with regular client (respects RLS)
  logger?.info("[fetchBusiness] Querying owner business", { ownerId });
  const { data, error } = await supabase
    .from("businesses")
    .select(coreColumns)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    logger?.error("[fetchBusiness] SELECT error", { error });
    const errorDetails = `${error.message} (code: ${error.code})`;
    throw new Error(`Failed to query business profile. ${errorDetails}`);
  }

  logger?.info("[fetchBusiness] Loaded business rows", { count: data?.length || 0 });

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
      logger?.warn("Optional business fields not available", { error: extrasError });
    }

    return baseBusiness as BusinessRow;
  }

  // No business found - create one using regular client (RLS allows insert for own user)
  logger?.info("[fetchBusiness] No business found, creating new profile", { fallbackName });
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
    logger?.error("[fetchBusiness] INSERT error", {
      error: insertError,
      payload: insertPayload,
    });
    const errorDetails = insertError
      ? `${insertError.message} (code: ${insertError.code})`
      : "No data returned";
    throw new Error(`Unable to load or create business profile. ${errorDetails}`);
  }

  logger?.info("[fetchBusiness] Created business", { businessId: inserted.id });

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
    logger?.warn("Optional fields not available for new business", {
      error: extrasError,
    });
  }

  return inserted as BusinessRow;
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:campaigns:send");
  logger.info("Received campaign send request");

  // Rate limiting
  const rateLimitCheck = await checkRateLimit(request, "campaignSend");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for campaign send");
    return rateLimitCheck.response;
  }

  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      logger.warn("Unauthorized campaign send attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    logger.info("User authenticated", { userId: user.id });

    const parsedPayload = await parseJsonBody(request, campaignPayloadSchema, logger, {
      errorMessage: "Invalid campaign payload.",
    });

    if (!parsedPayload.success) {
      return parsedPayload.response;
    }

    const {
      campaignName,
      campaignMessage: rawCampaignMessage,
      campaignChannel,
      scheduleType,
      scheduleDate,
      selectedCustomers,
      includeQrModule: includeQrModuleFlag,
    } = parsedPayload.data;

    const campaignMessage = rawCampaignMessage ?? "";
    const includeQrModule = includeQrModuleFlag ?? true;
    const wantsScheduledSend = scheduleType === "later";
    const scheduleDateInput = typeof scheduleDate === "string" ? scheduleDate : "";

    logger.info("Validated campaign payload", {
      userId: user.id,
      campaignChannel,
      scheduleType,
      recipients: selectedCustomers.length,
    });

    if (campaignChannel === "sms" && !campaignMessage) {
      return NextResponse.json(
        { error: "Provide an SMS message or switch to email for this campaign." },
        { status: 400 },
      );
    }

    const schedulingEnabled = campaignSchedulerEnabled;
    if (wantsScheduledSend && !schedulingEnabled) {
      return NextResponse.json(
        { error: "Scheduled sending is coming soon. Please choose Send Now instead." },
        { status: 400 },
      );
    }

    let scheduledAt = new Date();
    if (wantsScheduledSend) {
      if (!scheduleDateInput) {
        return NextResponse.json(
          { error: "Select a date/time for your scheduled campaign." },
          { status: 400 },
        );
      }
      const parsed = new Date(scheduleDateInput);
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
    const business = await fetchBusiness(supabase, user.id, fallbackName, logger);

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
      logger.error("Failed to fetch customers", { error: fetchError, businessId: business.id });
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
    const resolvedCampaignMessage = resolveEmailCampaignMessage({
      channel: campaignChannel,
      campaignMessage,
      businessName: business.name || fallbackName,
      offerText: snapshotFields.snapshot_offer_text ?? business.offer_text ?? null,
      clientRewardText: snapshotFields.snapshot_client_reward_text,
      newUserRewardText: snapshotFields.snapshot_new_user_reward_text,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const campaignsInsert = supabase.from("campaigns") as any;
    type CampaignRecord = Record<string, unknown> & { id: string; name: string | null };

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
    let campaignData: CampaignRecord | null = null;
    let campaignError: { code?: string; message?: string } | null = null;

    for (let attempt = 0; attempt <= optionalSnapshotColumns.length; attempt++) {
      const { data, error } = await campaignsInsert.insert([insertPayload]).select().single();
      if (!error && data) {
        campaignData = data as CampaignRecord;
        campaignError = null;
        break;
      }

      campaignError = error;
      if (error) {
        const normalizedMessage = error.message?.toLowerCase() ?? "";
        const missingColumn = optionalSnapshotColumns.find((column) =>
          normalizedMessage.includes(column.toLowerCase()),
        );

        if (
          missingColumn &&
          (error.code === "42703" ||
            error.code === "PGRST204" ||
            normalizedMessage.includes("could not find"))
        ) {
          logger.warn("Optional snapshot column missing, retrying insert", {
            missingColumn,
            errorCode: error.code,
          });
          delete insertPayload[missingColumn];
          continue;
        }
      }

      break;
    }

    if (campaignError || !campaignData) {
      logger.error("Failed to create campaign record", { error: campaignError });
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
      campaignMessage: resolvedCampaignMessage,
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
      logger.error("Failed to queue campaign messages", { error: insertError });
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

    logger.info("Campaign queued", {
      campaignId,
      businessId: business.id,
      queuedCount,
      channel: campaignChannel,
      scheduledAt: scheduledAtIso,
      dispatchState: shouldDispatchInline ? "inline" : "queued",
    });

    return NextResponse.json({
      success: `${sendStatusLabel} ${queuedCount} ${
        campaignChannel === "sms" ? "SMS" : "email"
      } message${queuedCount === 1 ? "" : "s"}.${dispatchNote}${scheduleNote}${skippedNote}`,
    });
  } catch (error) {
    logger.error("Campaign send API error", { error });
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
