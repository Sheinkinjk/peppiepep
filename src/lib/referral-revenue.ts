import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import { calculateNextCredits } from "@/lib/credits";
import { logReferralEvent } from "@/lib/referral-events";

type CompleteReferralAttributionInput = {
  supabase: SupabaseClient<Database>;
  referralId: string;
  businessId: string;
  ambassadorId: string;
  transactionValue: number | null;
  transactionDate: string;
  rewardType: Database["public"]["Tables"]["businesses"]["Row"]["reward_type"] | null;
  rewardAmount: number | null;
  serviceType?: string | null;
};

/**
 * Marks a referral as completed, records revenue, and releases ambassador rewards.
 * Used by manual conversions and integration tests to mirror the full capture ➝ reward flow.
 */
export async function completeReferralAttribution({
  supabase,
  referralId,
  businessId,
  ambassadorId,
  transactionValue,
  transactionDate,
  rewardType,
  rewardAmount,
  serviceType = null,
}: CompleteReferralAttributionInput) {
  const rewardedAt = new Date().toISOString();

  const { error: referralUpdateError } = await supabase
    .from("referrals")
    .update({
      status: "completed",
      transaction_value: transactionValue,
      transaction_date: transactionDate,
      rewarded_at: rewardedAt,
      service_type: serviceType,
    })
    .eq("id", referralId)
    .eq("business_id", businessId);

  if (referralUpdateError) {
    throw new Error(`Failed to mark referral as completed: ${referralUpdateError.message}`);
  }

  await logReferralEvent({
    supabase,
    businessId,
    ambassadorId,
    referralId,
    eventType: "conversion_completed",
    metadata: {
      transaction_value: transactionValue,
      transaction_date: transactionDate,
      service_type: serviceType,
    },
  });

  if (rewardType === "credit" && rewardAmount && rewardAmount > 0) {
    const { data: ambassador, error: ambassadorError } = await supabase
      .from("customers")
      .select("credits")
      .eq("id", ambassadorId)
      .single();

    if (ambassadorError || !ambassador) {
      throw new Error(
        `Failed to load ambassador credits for payout: ${ambassadorError?.message ?? "unknown"}`,
      );
    }

    const updatedCredits = calculateNextCredits(ambassador.credits ?? 0, rewardAmount);
    const { error: creditError } = await supabase
      .from("customers")
      .update({ credits: updatedCredits })
      .eq("id", ambassadorId);

    if (creditError) {
      throw new Error(`Failed to update ambassador credits: ${creditError.message}`);
    }

    await logReferralEvent({
      supabase,
      businessId,
      ambassadorId,
      referralId,
      eventType: "payout_released",
      metadata: {
        amount: rewardAmount,
        transaction_value: transactionValue,
        transaction_date: transactionDate,
        service_type: serviceType,
      },
    });
  }
}
