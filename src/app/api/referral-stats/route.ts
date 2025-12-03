import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { checkRateLimit, checkRateLimitForIdentifier } from "@/lib/rate-limit";
import { verifyAmbassadorToken } from "@/lib/ambassador-auth";

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

export async function GET(request: NextRequest) {
  try {
    const rateLimitCheck = await checkRateLimit(request, "referralStats");
    if (!rateLimitCheck.success && rateLimitCheck.response) {
      return rateLimitCheck.response;
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const token = searchParams.get("token");

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    const tokenCheck = verifyAmbassadorToken(token, code);
    if (!tokenCheck.valid) {
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
    const markVerified = searchParams.get("markVerified");
    if (markVerified === "1") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from("customers")
          .update({ status: "verified" })
          .eq("id", customerId);
      } catch (verifyError) {
        console.warn("Failed to mark ambassador as verified:", verifyError);
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
      console.error("Error fetching referrals:", referralsError);
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

    const typedReferrals = (referrals || []) as ReferralStatsEntry[];
    const safeReferrals = typedReferrals.map((referral) => ({
      id: referral.id,
      referred_name: referral.referred_name,
      referred_email: referral.referred_email,
      referred_phone: referral.referred_phone,
      status: referral.status,
      created_at: referral.created_at,
      rewarded_at: referral.rewarded_at,
    }));

    return NextResponse.json({
      customer: safeCustomer,
      referrals: safeReferrals,
    });
  } catch (error) {
    console.error("Error in referral-stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
