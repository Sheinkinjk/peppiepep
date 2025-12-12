import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";
import { checkRateLimit } from "@/lib/rate-limit";

type BusinessLookup = Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">;
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
      .select("id")
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
      return NextResponse.json(
        { error: `No ambassador found with discount code ${normalizedCode}.` },
        { status: 404 },
      );
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
      order_reference:
        (typeof payload.orderReference === "string" && payload.orderReference) ||
        (typeof payload.orderId === "string" && payload.orderId) ||
        null,
      capture_source: payload.source || payload.platform || "api",
      notes:
        (typeof payload.notes === "string" && payload.notes) ||
        (typeof payload.comment === "string" && payload.comment) ||
        null,
      metadata,
      amount: Number.isFinite(numericAmount) ? numericAmount : null,
    };

    const serviceClient = supabase as unknown as SupabaseClient<Database>;
    const { error: insertError } = await (serviceClient as SupabaseClient<Database>)
      .from("discount_redemptions")
      .insert([redemptionPayload]);

    if (insertError) {
      logger.error("Failed to record discount redemption", { error: insertError });
      return NextResponse.json(
        { error: "Unable to record redemption. Please retry shortly." },
        { status: 500 },
      );
    }

    logger.info("Discount code recorded", {
      businessId: business.id,
      customerId: customer.id,
      discountCode: normalizedCode,
    });

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
