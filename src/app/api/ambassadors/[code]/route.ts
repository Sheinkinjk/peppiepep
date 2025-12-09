import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { ensureAbsoluteUrl } from "@/lib/urls";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const params = await context.params;
    const code = params.code;

    if (!code || code.trim().length === 0) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    const { data: customer, error } = await supabase
      .from("customers")
      .select(`
        id,
        name,
        phone,
        email,
        referral_code,
        discount_code,
        credits,
        business:business_id (
          id,
          name,
          offer_text,
          client_reward_text,
          new_user_reward_text,
          reward_type,
          reward_amount,
          upgrade_name,
          reward_terms,
          logo_url,
          brand_highlight_color,
          site_url
        )
      `)
      .ilike("referral_code", code)
      .single();

    if (error || !customer) {
      return NextResponse.json(
        { error: "Ambassador not found" },
        { status: 404 }
      );
    }

    // Type the customer data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typed = customer as any;
    const business = typed.business as {
      id: string;
      name: string | null;
      offer_text: string | null;
      client_reward_text: string | null;
      new_user_reward_text: string | null;
      reward_type: string | null;
      reward_amount: number | null;
      upgrade_name: string | null;
      reward_terms: string | null;
      logo_url: string | null;
      brand_highlight_color: string | null;
      site_url: string | null;
    } | null;

    // Build reward texts
    const rewardAmount = business?.reward_amount || 15;
    const newUserReward =
      business?.new_user_reward_text ||
      business?.offer_text ||
      "$15 credit";
    const clientReward =
      business?.client_reward_text ||
      (business?.reward_type === "credit"
        ? `$${rewardAmount} credit`
        : business?.reward_type === "upgrade"
        ? business?.upgrade_name || "a free upgrade"
        : business?.reward_type === "discount"
        ? `${rewardAmount}% discount`
        : `${rewardAmount} points`);

    // Build referral link
    const siteOrigin =
      ensureAbsoluteUrl(business?.site_url) ||
      ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
      ensureAbsoluteUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      "https://referlabs.com.au";

    const referralLink = `${siteOrigin}/r/${typed.referral_code}`;

    // Fetch ambassador stats
    const { data: referrals } = await supabase
      .from("referrals")
      .select("id, status")
      .eq("ambassador_id", typed.id);

    const totalReferrals = referrals?.length || 0;
    const completedReferrals =
      referrals?.filter((r) => r.status === "complete").length || 0;

    // Return public ambassador data
    return NextResponse.json({
      id: typed.id,
      name: typed.name,
      referralCode: typed.referral_code,
      discountCode: typed.discount_code,
      referralLink,
      businessId: business?.id,
      businessName: business?.name,
      offerText: business?.offer_text,
      clientReward,
      newUserReward,
      rewardTerms: business?.reward_terms,
      logoUrl: business?.logo_url,
      brandHighlightColor: business?.brand_highlight_color,
      credits: typed.credits || 0,
      totalReferrals,
      completedReferrals,
    });
  } catch (error) {
    console.error("Ambassador API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
