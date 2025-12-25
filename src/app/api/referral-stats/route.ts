import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import { checkRateLimit, checkRateLimitForIdentifier } from "@/lib/rate-limit";
import { verifyAmbassadorToken } from "@/lib/ambassador-auth";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";

type ReferralStatsCustomer = {
  id: string;
  name: string | null;
  referral_code: string | null;
  credits: number | null;
  business: {
    name: string | null;
    reward_amount: number | null;
    offer_text: string | null;
    client_reward_text: string | null;
    new_user_reward_text: string | null;
    reward_terms: string | null;
  } | null;
};

type ReferralStatsEntry = {
  id: string;
  referred_name: string | null;
  referred_email: string | null;
  referred_phone: string | null;
  status: string | null;
  created_at: string | null;
  rewarded_at: string | null;
};

const referralStatsQuerySchema = z.object({
  code: z.string().trim().min(1, "Referral code is required"),
  token: z.string().trim().optional().nullable(),
  markVerified: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const logger = createApiLogger("api:referral-stats");
  try {
    const rateLimitCheck = await checkRateLimit(request, "referralStats");
    if (!rateLimitCheck.success && rateLimitCheck.response) {
      logger.warn("Referral stats rate limited (global)");
      return rateLimitCheck.response;
    }

    const searchParams = request.nextUrl.searchParams;
    const validation = validateWithSchema(
      referralStatsQuerySchema,
      {
        code: searchParams.get("code"),
        token: searchParams.get("token"),
        markVerified: searchParams.get("markVerified"),
      },
      logger,
      { errorMessage: "Referral code is required" },
    );

    if (!validation.success) {
      return validation.response;
    }

    const { code, token, markVerified } = validation.data;
    const tokenCheck = verifyAmbassadorToken(token ?? null, code);
    if (!tokenCheck.valid) {
      logger.warn("Referral stats invalid token", { code });
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const codeRateLimit = await checkRateLimitForIdentifier(
      code,
      "ambassadorCode",
    );
    if (!codeRateLimit.success && codeRateLimit.response) {
      logger.warn("Referral stats rate limited for code", { code });
      return codeRateLimit.response;
    }

    const supabase = await createServiceClient();

    // Fetch customer with business data
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select(
        `
        id,
        name,
        referral_code,
        credits,
        business:business_id (
          name,
          reward_amount,
          offer_text,
          client_reward_text,
          new_user_reward_text,
          reward_terms
        )
      `,
      )
      .eq("referral_code", code)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { error: "Ambassador not found" },
        { status: 404 }
      );
    }

    const typedCustomer = customer as ReferralStatsCustomer;
    const customerId = typedCustomer.id;

    // Optionally mark ambassador as verified when requested (e.g., when they
    // click "Become an Ambassador" from an email invite).
    if (markVerified === "1") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from("customers")
          .update({ status: "verified" })
          .eq("id", customerId);
      } catch (verifyError) {
        logger.warn("Failed to mark ambassador as verified", { error: verifyError });
        // Non-blocking: stats still return even if this update fails.
      }
    }

    // Fetch referrals for this ambassador
    const { data: referrals, error: referralsError } = await supabase
      .from("referrals")
      .select(
        "id, referred_name, referred_email, referred_phone, status, created_at, rewarded_at",
      )
      .eq("ambassador_id", customerId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (referralsError) {
      logger.error("Error fetching referrals", { error: referralsError });
      return NextResponse.json(
        { error: "Failed to fetch referrals" },
        { status: 500 }
      );
    }

    const safeBusiness = typedCustomer.business
      ? {
          name: typedCustomer.business.name,
          reward_amount: typedCustomer.business.reward_amount,
          offer_text: typedCustomer.business.offer_text,
          client_reward_text: typedCustomer.business.client_reward_text,
          new_user_reward_text: typedCustomer.business.new_user_reward_text,
          reward_terms: typedCustomer.business.reward_terms,
        }
      : null;

    const safeCustomer = {
      name: typedCustomer.name,
      referral_code: typedCustomer.referral_code,
      credits: typedCustomer.credits,
      business: safeBusiness,
    };

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

    const typedReferrals = (referrals || []) as ReferralStatsEntry[];
    const safeReferrals = typedReferrals.map((referral) => ({
      id: referral.id,
      referred_name: referral.referred_name,
      referred_email: maskEmail(referral.referred_email),
      referred_phone: maskPhone(referral.referred_phone),
      status: referral.status,
      created_at: referral.created_at,
      rewarded_at: referral.rewarded_at,
    }));

    logger.info("Referral stats returned", {
      code,
      referrals: safeReferrals.length,
    });
    return NextResponse.json({
      customer: safeCustomer,
      referrals: safeReferrals,
    });
  } catch (error) {
    logger.error("Error in referral-stats API", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
