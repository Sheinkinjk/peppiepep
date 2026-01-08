import { NextResponse } from "next/server";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";

export async function POST() {
  const logger = createApiLogger("api:qa:clients-ambassadors");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    const businessId = (business as { id: string } | null)?.id;
    if (!businessId) {
      return NextResponse.json({
        totalCustomers: 0,
        missingReferralCodes: 0,
        missingDiscountCodes: 0,
        duplicateReferralCodes: 0,
        duplicateDiscountCodes: 0,
        sampleReferralLink: null,
        referralLinksOk: false,
        discountCodesOk: false,
        directoryOk: false,
        issues: ["No business found for this account."],
      });
    }

    const { data: customers, error } = await supabase
      .from("customers")
      .select("id, referral_code, discount_code")
      .eq("business_id", businessId);

    if (error) {
      logger.error("Failed to fetch customers", { error });
      return NextResponse.json({ error: "Failed to run QA checks" }, { status: 500 });
    }

    const totalCustomers = customers?.length ?? 0;
    const referralCodes = (customers ?? []).map((c) => c.referral_code).filter(Boolean) as string[];
    const discountCodes = (customers ?? []).map((c) => c.discount_code).filter(Boolean) as string[];
    const missingReferralCodes = totalCustomers - referralCodes.length;
    const missingDiscountCodes = totalCustomers - discountCodes.length;

    const referralCodeSet = new Set<string>();
    let duplicateReferralCodes = 0;
    referralCodes.forEach((code) => {
      if (referralCodeSet.has(code)) duplicateReferralCodes += 1;
      referralCodeSet.add(code);
    });

    const discountCodeSet = new Set<string>();
    let duplicateDiscountCodes = 0;
    discountCodes.forEach((code) => {
      if (discountCodeSet.has(code)) duplicateDiscountCodes += 1;
      discountCodeSet.add(code);
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";
    const sampleReferralCode = referralCodes.length > 0 ? referralCodes[0] : null;
    const sampleDiscountCode = discountCodes.length > 0 ? discountCodes[0] : null;
    const sampleReferralLink = sampleReferralCode ? `${siteUrl}/r/${sampleReferralCode}` : null;

    const issues: string[] = [];
    if (totalCustomers === 0) {
      issues.push("No ambassadors found. Add at least one customer before launching.");
    }
    if (missingReferralCodes > 0) {
      issues.push("Some ambassadors are missing referral codes. Re-import or re-save those records.");
    }
    if (missingDiscountCodes > 0) {
      issues.push("Some ambassadors are missing discount codes. Ensure discount code generation is enabled.");
    }
    if (duplicateReferralCodes > 0) {
      issues.push("Duplicate referral codes detected. Regenerate codes to avoid attribution collisions.");
    }
    if (duplicateDiscountCodes > 0) {
      issues.push("Duplicate discount codes detected. Regenerate codes to avoid redemption conflicts.");
    }

    return NextResponse.json({
      totalCustomers,
      missingReferralCodes,
      missingDiscountCodes,
      duplicateReferralCodes,
      duplicateDiscountCodes,
      sampleReferralLink,
      sampleReferralCode,
      sampleDiscountCode,
      referralLinksOk: missingReferralCodes === 0 && duplicateReferralCodes === 0,
      discountCodesOk: missingDiscountCodes === 0 && duplicateDiscountCodes === 0,
      directoryOk: totalCustomers > 0,
      issues,
    });
  } catch (error) {
    logger.error("QA endpoint failed", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
