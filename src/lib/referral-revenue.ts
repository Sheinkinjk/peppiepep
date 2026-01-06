import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import { calculateNextCredits } from "@/lib/credits";
import { logReferralEvent } from "@/lib/referral-events";
import { maybeSendFirstConversionCapturedOwnerEmail, maybeSendGoLiveOwnerEmail } from "@/lib/business-notifications";
import { sendTransactionalEmail } from "@/lib/transactional-email";
import { tryInsertCreditLedgerEntry } from "@/lib/credits-ledger";
import { buildPremiumEmail } from "@/lib/premium-email";

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
 *
 * IDEMPOTENCY: Checks referral status before processing to prevent duplicate credit issuance.
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
  // CRITICAL: Check if referral is already completed to prevent duplicate credit issuance
  const { data: existingReferral, error: fetchError } = await supabase
    .from("referrals")
    .select("status, rewarded_at")
    .eq("id", referralId)
    .eq("business_id", businessId)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch referral: ${fetchError.message}`);
  }

  if (existingReferral.status === "completed") {
    console.warn(`Referral ${referralId} already completed at ${existingReferral.rewarded_at}. Skipping duplicate processing.`);
    return; // Idempotent: Already processed, exit gracefully
  }

  // Validate transaction value if provided
  if (transactionValue !== null && transactionValue < 0) {
    throw new Error(`Transaction value must be non-negative, got ${transactionValue}`);
  }

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

    // Log to credit ledger for audit trail
    const ledgerResult = await tryInsertCreditLedgerEntry(supabase, {
      businessId,
      customerId: ambassadorId,
      referralId,
      delta: rewardAmount,
      type: "issued",
      source: "referral_reward",
      note: `Reward for successful referral`,
    });

    if (!ledgerResult.success) {
      console.warn("Credit ledger logging failed (non-fatal):", ledgerResult.error);
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

    const ambassadorEmail = (ambassador as { email?: string | null })?.email ?? null;
    const ambassadorName = (ambassador as { name?: string | null })?.name ?? "Ambassador";

    if (ambassadorEmail) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au";
      const html = buildPremiumEmail({
        title: "You earned a reward",
        subtitle: `${ambassadorName}, your referral just converted.`,
        preheader: "A referral completed and your credit is ready.",
        bodyHtml: `
          <p style="margin:0 0 12px;">
            A referral just completed and <strong>$${Number(rewardAmount).toFixed(0)} credit</strong> has been released to your account.
          </p>
          <div style="margin:16px 0 0;padding:14px 16px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;color:#475569;font-size:13px;">
            Keep sharing your link to grow rewards even faster.
          </div>
        `,
        cta: { label: "View my portal", url: `${siteUrl}/r/referral` },
        footerNote: "Need help? Reply to this email and we’ll assist.",
        brandName: "Refer Labs",
        logoUrl: `${siteUrl}/logo.svg`,
      });
      await sendTransactionalEmail({
        to: ambassadorEmail,
        subject: "You earned a reward",
        html,
      }).catch((error) => console.warn("Failed to send ambassador reward email (non-fatal):", error));
    }
  }
}
