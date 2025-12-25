import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { verifyAmbassadorToken } from "@/lib/ambassador-auth";
import { checkRateLimitForIdentifier } from "@/lib/rate-limit";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody, validateWithSchema } from "@/lib/api-validation";

const ambassadorAccessSchema = z.object({
  code: z.string().trim().min(1, "referral code is required"),
  token: z.string().trim().optional().nullable(),
});

async function handleExport(
  input: { code: string; token?: string | null },
  logger = createApiLogger("api:ambassadors:export"),
) {
  const { code, token } = input;
  const tokenCheck = verifyAmbassadorToken(token ?? null, code);
  if (!tokenCheck.valid) {
    logger.warn("Ambassador export rejected due to invalid token", { code });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = await checkRateLimitForIdentifier(code, "ambassadorCode");
  if (!rateLimit.success && rateLimit.response) {
    logger.warn("Ambassador export rate limited", { code });
    return rateLimit.response;
  }

  const supabase = await createServiceClient();
  const { data: ambassador, error } = await supabase
    .from("customers")
    .select("id, name, email, phone, referral_code, discount_code, credits, business:business_id (name)")
    .eq("referral_code", code)
    .single();

  if (error || !ambassador) {
    logger.warn("Ambassador export not found", { code, error });
    return NextResponse.json({ error: "Ambassador not found" }, { status: 404 });
  }

  const ambassadorRow = ambassador as Database["public"]["Tables"]["customers"]["Row"];

  const { data: referrals, error: referralsError } = await supabase
    .from("referrals")
    .select("id, referred_name, referred_email, referred_phone, status, created_at, rewarded_at, consent_given, locale")
    .eq("ambassador_id", ambassadorRow.id)
    .order("created_at", { ascending: false });

  if (referralsError) {
    logger.error("Ambassador export referrals fetch failed", { error: referralsError });
    return NextResponse.json({ error: "Failed to load referrals" }, { status: 500 });
  }

  // Helper function to mask email addresses for privacy
  const maskEmail = (email: string | null): string | null => {
    if (!email) return null;
    const [username, domain] = email.split('@');
    if (!username || !domain) return null;
    const maskedUsername = username.length > 2
      ? username[0] + '*'.repeat(Math.min(username.length - 2, 4)) + username[username.length - 1]
      : username[0] + '*';
    return `${maskedUsername}@${domain}`;
  };

  // Helper function to mask phone numbers for privacy
  const maskPhone = (phone: string | null): string | null => {
    if (!phone) return null;
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 4) return '***';
    return '***-***-' + cleaned.slice(-4);
  };

  // Mask referred contacts' PII for privacy - ambassadors should see their own data unmasked,
  // but referred contacts' sensitive info should be masked
  const maskedReferrals = (referrals ?? []).map((referral) => ({
    ...referral,
    referred_email: maskEmail(referral.referred_email),
    referred_phone: maskPhone(referral.referred_phone),
  }));

  logger.info("Ambassador export delivered", { code, referralCount: referrals?.length ?? 0 });
  return NextResponse.json({ ambassador, referrals: maskedReferrals });
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:ambassadors:export");
  logger.info("Received ambassador export POST");
  try {
    const parsed = await parseJsonBody(request, ambassadorAccessSchema, logger, {
      errorMessage: "Invalid ambassador export payload.",
    });
    if (!parsed.success) {
      return parsed.response;
    }
    return handleExport(parsed.data, logger);
  } catch (error) {
    logger.error("Ambassador export POST error", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const logger = createApiLogger("api:ambassadors:export");
  logger.info("Received ambassador export GET");
  try {
    const { searchParams } = new URL(request.url);
    const validation = validateWithSchema(
      ambassadorAccessSchema,
      { code: searchParams.get("code"), token: searchParams.get("token") },
      logger,
      { errorMessage: "referral code is required" },
    );

    if (!validation.success) {
      return validation.response;
    }

    return handleExport(validation.data, logger);
  } catch (error) {
    logger.error("Ambassador export GET error", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
