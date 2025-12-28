import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import { calculateNextCredits } from "@/lib/credits";
import { logReferralEvent } from "@/lib/referral-events";
import { maybeSendFirstConversionCapturedOwnerEmail, maybeSendGoLiveOwnerEmail } from "@/lib/business-notifications";
import { sendTransactionalEmail } from "@/lib/transactional-email";
// import { tryInsertCreditLedgerEntry } from "@/lib/credits-ledger";

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

  await maybeSendFirstConversionCapturedOwnerEmail({
    supabase,
    businessId,
    sourceLabel: serviceType || "conversion",
  }).catch((error) => console.warn("Failed to send first conversion owner email (non-fatal):", error));

  await maybeSendGoLiveOwnerEmail({ supabase, businessId }).catch((error) =>
    console.warn("Failed to send go-live owner email (non-fatal):", error),
  );

  if (rewardType === "credit" && rewardAmount && rewardAmount > 0) {
    const { data: ambassador, error: ambassadorError } = await supabase
      .from("customers")
      .select("credits, email, name")
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

    // Optional credit ledger entry (currently disabled)
    // await tryInsertCreditLedgerEntry(supabase, {
    //   businessId,
    //   customerId: ambassadorId,
    //   referralId,
    //   delta: rewardAmount,
    //   type: "issued",
    //   source: "referral_reward",
    // });

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

    const ambassadorEmail = (ambassador as { email?: string | null })?.email ?? null;
    const ambassadorName = (ambassador as { name?: string | null })?.name ?? "Ambassador";

    if (ambassadorEmail) {
      await sendTransactionalEmail({
        to: ambassadorEmail,
        subject: "You earned a reward",
        html: `<!doctype html><html><body style="font-family:Inter,system-ui,-apple-system,sans-serif;background:#f5f5f5;padding:32px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e2e8f0"><p style="font-size:18px;font-weight:900;margin:0 0 10px;color:#0f172a">Nice work, ${ambassadorName}.</p><p style="margin:0;color:#475569;font-size:14px;line-height:1.6">A referral just completed and <strong>$${Number(rewardAmount).toFixed(0)} credit</strong> has been released to your account.</p><p style="margin:18px 0 0"><a href="${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/r/referral" style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:800">View my portal</a></p></div><p style="text-align:center;font-size:12px;color:#94a3b8;margin-top:14px">Sent by Refer Labs</p></body></html>`,
      }).catch((error) => console.warn("Failed to send ambassador reward email (non-fatal):", error));
    }
  }
}
