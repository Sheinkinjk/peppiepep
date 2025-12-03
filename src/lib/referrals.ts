import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import { logReferralEvent } from "@/lib/referral-events";

type ReferralInput = {
  supabase: SupabaseClient<Database>;
  businessId: string;
  ambassadorId: string;
  campaignId?: string | null;
  consentGiven?: boolean;
  locale?: string | null;
  referredName?: string | null;
  referredEmail?: string | null;
  referredPhone?: string | null;
};

/**
 * Central helper used by the referral landing page and integration tests.
 * Inserts a referral row and returns the created record.
 */
export async function recordReferralSubmission({
  supabase,
  businessId,
  ambassadorId,
  campaignId = null,
  consentGiven = false,
  locale = "en",
  referredName,
  referredEmail,
  referredPhone,
}: ReferralInput) {
  const payload = {
    business_id: businessId,
    ambassador_id: ambassadorId,
    campaign_id: campaignId,
    consent_given: consentGiven,
    locale,
    referred_name: referredName?.slice(0, 120) ?? null,
    referred_email: referredEmail?.slice(0, 160) ?? null,
    referred_phone: referredPhone?.slice(0, 40) ?? null,
    status: "pending" as Database["public"]["Tables"]["referrals"]["Insert"]["status"],
  } satisfies Database["public"]["Tables"]["referrals"]["Insert"];

  // Use a loosely typed client here to avoid Supabase generics issues during build
  // while still validating the payload shape with `satisfies` above.
  const { data, error } = await (supabase as unknown as {
    from: (table: string) => {
      insert: (values: unknown) => {
        select: () => { single: () => Promise<{ data: unknown; error: Error | null }> };
      };
    };
  })
    .from("referrals")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to record referral: ${error.message}`);
  }

  const referralRow = data as Database["public"]["Tables"]["referrals"]["Row"];

  await logReferralEvent({
    supabase,
    businessId,
    ambassadorId,
    referralId: referralRow?.id ?? null,
    eventType: "signup_submitted",
    source: campaignId ?? "referral-form",
    device: "web",
    metadata: {
      referred_name: referralRow?.referred_name,
      referred_email: referralRow?.referred_email,
      referred_phone: referralRow?.referred_phone,
      campaign_id: campaignId,
      consent_given: consentGiven,
      locale,
    },
  });

  return referralRow;
}
