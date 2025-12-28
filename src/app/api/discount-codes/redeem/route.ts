import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { logReferralEvent } from "@/lib/referral-events";
import {
  maybeSendFirstConversionCapturedOwnerEmail,
  maybeSendGoLiveOwnerEmail,
  sendIntegrationHealthAlert,
} from "@/lib/business-notifications";
import { incrementAlertBucket, shouldSendOnce } from "@/lib/alert-bucket";

type BusinessLookup = Pick<
  Database["public"]["Tables"]["businesses"]["Row"],
  "id" | "reward_type" | "reward_amount" | "owner_id" | "onboarding_metadata" | "name"
>;
type CustomerLookup = Pick<Database["public"]["Tables"]["customers"]["Row"], "id" | "discount_code" | "name">;

const redemptionPayloadSchema = z.object({
  secret: z.string().trim().optional(),
  discountCode: z.string().trim().optional(),
  code: z.string().trim().optional(),
  discount_code: z.string().trim().optional(),
  orderReference: z.string().trim().optional(),
  orderId: z.string().trim().optional(),
  source: z.string().trim().optional(),
  platform: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  comment: z.string().trim().optional(),
  amount: z.union([z.number(), z.string()]).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

function normalizeHeaderSecret(request: Request) {
const headerKeys = [
  "x-referlabs-discount-secret",
  "x-referlabs-secret",
  "x-pepf-discount-secret",
  "x-peppiepep-secret",
  "x-discount-secret",
];
  for (const key of headerKeys) {
    const value = request.headers.get(key);
    if (value) return value.trim();
  }
  return null;
}

type ExistingRedemptionRow = Pick<
  Database["public"]["Tables"]["discount_redemptions"]["Row"],
  "id" | "captured_at"
>;

type ExistingReferralEventRow = Pick<
  Database["public"]["Tables"]["referral_events"]["Row"],
  "id"
>;

type ReferralRow = Pick<Database["public"]["Tables"]["referrals"]["Row"], "id">;

export async function POST(request: Request) {
  const logger = createApiLogger("api:discount-codes:redeem");
  logger.info("Received discount redemption request");

  // Rate limiting
  const rateLimitCheck = await checkRateLimit(request, "discountRedeem");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for discount redemption");
    return rateLimitCheck.response;
  }

  try {
    const supabase = await createServiceClient();
    const serviceClient = supabase as unknown as SupabaseClient<Database>;
    const headerSecret = normalizeHeaderSecret(request);
    const parsedPayload = await parseJsonBody(request, redemptionPayloadSchema, logger, {
      errorMessage: "Invalid redemption payload.",
    });

    if (!parsedPayload.success) {
      return parsedPayload.response;
    }

    const payload = parsedPayload.data;
    const secret = headerSecret ?? payload.secret ?? null;

    if (!secret) {
      logger.warn("Missing discount capture secret");
      return NextResponse.json(
        {
          error:
            "Missing discount capture secret. Include it in the x-referlabs-discount-secret header.",
        },
        { status: 401 },
      );
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id, reward_type, reward_amount, owner_id, onboarding_metadata, name")
      .eq("discount_capture_secret", secret)
      .single<BusinessLookup>();

    if (businessError || !business) {
      logger.warn("Invalid discount capture secret", { error: businessError });
      return NextResponse.json({ error: "Invalid capture secret." }, { status: 401 });
    }

    const discountCodeInput =
      payload.discountCode ?? payload.code ?? payload.discount_code;

    if (!discountCodeInput || typeof discountCodeInput !== "string") {
      logger.warn("Discount code missing in payload", { businessId: business.id });
      return NextResponse.json(
        { error: "Provide the discountCode that was captured on your checkout or signup form." },
        { status: 400 },
      );
    }

    const normalizedCode = discountCodeInput.trim();

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("id, discount_code, name")
      .eq("business_id", business.id)
      .ilike("discount_code", normalizedCode)
      .maybeSingle<CustomerLookup>();

    if (customerError || !customer) {
      logger.warn("Discount code not found for business", {
        businessId: business.id,
        discountCode: normalizedCode,
      });

      const failures = await incrementAlertBucket({
        key: `discount_redeem_code_not_found:${business.id}`,
        ttlSeconds: 15 * 60,
      }).catch(() => 0);
      if (failures >= 3) {
        const shouldAlert = await shouldSendOnce({
          key: `integration_health:discount_redeem_code_not_found:${business.id}`,
          ttlSeconds: 60 * 60,
        }).catch(() => false);
        if (shouldAlert) {
          await sendIntegrationHealthAlert({
            supabase: serviceClient,
            businessId: business.id,
            title: "Integration errors detected",
            detail:
              "We’re receiving conversion posts, but the discount code being sent doesn’t match any ambassador in your account. This usually means your checkout is sending the wrong field/value (or you’re testing with a code that hasn’t been issued by Refer Labs).",
            includeAdmin: true,
          }).catch((error) => logger.warn("Failed to send integration health alert", { error }));
        }
      }

      return NextResponse.json(
        { error: `No ambassador found with discount code ${normalizedCode}.` },
        { status: 404 },
      );
    }

    const orderReference =
      (typeof payload.orderReference === "string" && payload.orderReference.trim()) ||
      (typeof payload.orderId === "string" && payload.orderId.trim()) ||
      null;

    if (orderReference) {
      const { data: existingEvent, error: existingEventError } = await (supabase as SupabaseClient<Database>)
        .from("referral_events")
        .select("id")
        .eq("business_id", business.id)
        .eq("event_type", "conversion_completed")
        .filter("metadata->>order_reference", "eq", orderReference)
        .limit(1)
        .maybeSingle<ExistingReferralEventRow>();

      if (existingEventError) {
        logger.warn("Failed to check existing conversion event", { error: existingEventError, orderReference });
      } else if (existingEvent?.id) {
        logger.info("Conversion already processed for order reference", {
          businessId: business.id,
          orderReference,
        });
        return NextResponse.json({
          success: "Discount code already recorded for this order reference.",
        });
      }
    }

    const numericAmount =
      payload.amount !== undefined && payload.amount !== null
        ? Number(payload.amount)
        : null;

    const metadata =
      payload.metadata && typeof payload.metadata === "object"
        ? payload.metadata
        : null;

    const redemptionPayload: Database["public"]["Tables"]["discount_redemptions"]["Insert"] = {
      business_id: business.id,
      customer_id: customer.id,
      discount_code: customer.discount_code ?? normalizedCode,
      order_reference: orderReference,
      capture_source: payload.source || payload.platform || "api",
      notes:
        (typeof payload.notes === "string" && payload.notes) ||
        (typeof payload.comment === "string" && payload.comment) ||
        null,
      metadata,
      amount: Number.isFinite(numericAmount) ? numericAmount : null,
    };

    let redemptionId: string | null = null;
    let redemptionCapturedAt: string | null = null;

    const shouldDeduplicate =
      Boolean(orderReference) &&
      Boolean(redemptionPayload.discount_code) &&
      Boolean(redemptionPayload.business_id);

    if (shouldDeduplicate) {
      const orderReferenceValue = orderReference as string;
      const { data: existingRedemption, error: existingRedemptionError } = await (serviceClient as SupabaseClient<Database>)
        .from("discount_redemptions")
        .select("id, captured_at")
        .eq("business_id", business.id)
        .eq("discount_code", redemptionPayload.discount_code)
        .eq("order_reference", orderReferenceValue)
        .limit(1)
        .maybeSingle<ExistingRedemptionRow>();

      if (existingRedemptionError) {
        logger.warn("Failed to check existing redemption", { error: existingRedemptionError });
      } else if (existingRedemption?.id) {
        redemptionId = existingRedemption.id;
        redemptionCapturedAt = existingRedemption.captured_at ?? null;
      }
    }

    if (!redemptionId) {
      const { data: inserted, error: insertError } = await (serviceClient as SupabaseClient<Database>)
        .from("discount_redemptions")
        .insert([redemptionPayload])
        .select("id, captured_at")
        .single<ExistingRedemptionRow>();

      if (insertError || !inserted?.id) {
        logger.error("Failed to record discount redemption", { error: insertError });
        return NextResponse.json(
          { error: "Unable to record redemption. Please retry shortly." },
          { status: 500 },
        );
      }

      redemptionId = inserted.id;
      redemptionCapturedAt = inserted.captured_at ?? null;
    }

    logger.info("Discount code recorded", {
      businessId: business.id,
      customerId: customer.id,
      discountCode: normalizedCode,
      orderReference,
      redemptionId,
    });

    const capturedAtIso = redemptionCapturedAt ?? new Date().toISOString();
    const captureSource = redemptionPayload.capture_source ?? "api";

    const { data: pendingReferral } = await (serviceClient as SupabaseClient<Database>)
      .from("referrals")
      .select("id")
      .eq("business_id", business.id)
      .eq("ambassador_id", customer.id)
      .eq("status", "pending")
      .is("created_by", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<ReferralRow>();

    let referralId: string | null = pendingReferral?.id ?? null;

    if (referralId) {
      const { error: completeError } = await (serviceClient as SupabaseClient<Database>)
        .from("referrals")
        .update({
          status: "completed",
          rewarded_at: capturedAtIso,
          transaction_value: redemptionPayload.amount ?? null,
          transaction_date: capturedAtIso,
          service_type: captureSource,
        })
        .eq("id", referralId)
        .eq("business_id", business.id)
        .eq("status", "pending");

      if (completeError) {
        logger.error("Failed to mark referral completed from redemption", { error: completeError, referralId });
        return NextResponse.json(
          { error: "Redemption recorded, but failed to update referral status." },
          { status: 500 },
        );
      }
    } else {
      const { data: createdReferral, error: createReferralError } = await (serviceClient as SupabaseClient<Database>)
        .from("referrals")
        .insert({
          business_id: business.id,
          ambassador_id: customer.id,
          status: "completed",
          rewarded_at: capturedAtIso,
          transaction_value: redemptionPayload.amount ?? null,
          transaction_date: capturedAtIso,
          service_type: captureSource,
          referred_name: "Checkout conversion",
          consent_given: false,
          locale: "en",
        })
        .select("id")
        .single<ReferralRow>();

      if (createReferralError || !createdReferral?.id) {
        logger.error("Failed to create completed referral from redemption", { error: createReferralError });
        return NextResponse.json(
          { error: "Redemption recorded, but failed to create a referral entry." },
          { status: 500 },
        );
      }

      referralId = createdReferral.id;
    }

    const rewardAmount =
      business.reward_type === "credit" && typeof business.reward_amount === "number"
        ? business.reward_amount
        : 0;

    if (rewardAmount > 0) {
      const { data: ambassador, error: ambassadorError } = await (serviceClient as SupabaseClient<Database>)
        .from("customers")
        .select("credits")
        .eq("id", customer.id)
        .single<{ credits: number | null }>();

      if (ambassadorError) {
        logger.error("Failed to fetch ambassador credits for redemption", { error: ambassadorError, customerId: customer.id });
        return NextResponse.json(
          { error: "Redemption recorded, but failed to apply reward credits." },
          { status: 500 },
        );
      }

      const currentCredits = typeof ambassador?.credits === "number" ? ambassador.credits : 0;
      const { error: creditError } = await (serviceClient as SupabaseClient<Database>)
        .from("customers")
        .update({ credits: currentCredits + rewardAmount })
        .eq("id", customer.id);

      if (creditError) {
        logger.error("Failed to apply ambassador credits for redemption", { error: creditError, customerId: customer.id });
        return NextResponse.json(
          { error: "Redemption recorded, but failed to apply reward credits." },
          { status: 500 },
        );
      }
    }

    await logReferralEvent({
      supabase: serviceClient,
      businessId: business.id,
      ambassadorId: customer.id,
      referralId,
      eventType: "conversion_completed",
      source: captureSource,
      device: "server",
      metadata: {
        redemption_id: redemptionId,
        order_reference: orderReference,
        discount_code: redemptionPayload.discount_code,
        transaction_value: redemptionPayload.amount ?? null,
        reward_amount: rewardAmount,
        capture_source: captureSource,
      },
    });

    await maybeSendFirstConversionCapturedOwnerEmail({
      supabase: serviceClient,
      businessId: business.id,
      sourceLabel: captureSource,
    }).catch((error) => logger.warn("Failed to send first conversion owner email", { error }));

    await maybeSendGoLiveOwnerEmail({ supabase: serviceClient, businessId: business.id }).catch((error) =>
      logger.warn("Failed to send go-live owner email", { error }),
    );

    return NextResponse.json({
      success: `Discount code recorded for ${customer.name ?? "ambassador"}.`,
    });
  } catch (error) {
    logger.error("Discount redemption error", { error });
    return NextResponse.json(
      { error: "Unexpected error recording discount code." },
      { status: 500 },
    );
  }
}
