import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { logger } from "@/lib/logger";

type CreditLedgerEntry = {
  businessId: string;
  customerId: string;
  referralId?: string | null;
  delta: number;
  type: "issued" | "spent" | "expired" | "adjustment";
  source: string;
  note?: string | null;
};

type CreditLedgerRow = Database["public"]["Tables"]["credit_ledger"]["Row"];

export type CreditLedgerEntryWithDetails = CreditLedgerRow & {
  customer: {
    id: string;
    name: string | null;
    email: string | null;
    referral_code: string | null;
    credits: number | null;
  } | null;
  referral: {
    id: string;
    referred_name: string | null;
    transaction_value: number | null;
    transaction_date: string | null;
  } | null;
};

type AmbassadorRewardSummary = {
  ambassadorId: string;
  ambassadorName: string | null;
  referralCode: string | null;
  totalConversions: number;
  totalCreditsEarned: number;
  manualAdjustments: number;
  lastRewardDate: string | null;
  currentBalance: number;
};

/**
 * Insert a credit ledger entry with error handling.
 * Non-fatal - logs warnings but doesn't throw to avoid breaking credit updates.
 */
export async function tryInsertCreditLedgerEntry(
  supabase: SupabaseClient<Database>,
  entry: CreditLedgerEntry,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("credit_ledger").insert({
      business_id: entry.businessId,
      customer_id: entry.customerId,
      referral_id: entry.referralId || null,
      delta: entry.delta,
      entry_type: entry.type,
      source: entry.source,
      note: entry.note?.trim() || null,
    });

    if (error) {
      logger.warn("Credit ledger insert failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.warn("Credit ledger insert exception:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Fetch credit ledger entries for a business with customer and referral details.
 */
export async function fetchCreditLedger(
  supabase: SupabaseClient<Database>,
  businessId: string,
  options?: {
    limit?: number;
    offset?: number;
    customerId?: string;
    entryType?: "issued" | "spent" | "expired" | "adjustment";
    dateFrom?: Date;
    dateTo?: Date;
  },
): Promise<CreditLedgerEntryWithDetails[]> {
  try {
    let query = supabase
      .from("credit_ledger")
      .select(
        `
        *,
        customer:customers!customer_id (
          id,
          name,
          email,
          referral_code,
          credits
        ),
        referral:referrals!referral_id (
          id,
          referred_name,
          transaction_value,
          transaction_date
        )
      `,
      )
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (options?.customerId) {
      query = query.eq("customer_id", options.customerId);
    }

    if (options?.entryType) {
      query = query.eq("entry_type", options.entryType);
    }

    if (options?.dateFrom) {
      query = query.gte("created_at", options.dateFrom.toISOString());
    }

    if (options?.dateTo) {
      query = query.lte("created_at", options.dateTo.toISOString());
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 100) - 1);
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch credit ledger:", error);
      return [];
    }

    return (data as unknown as CreditLedgerEntryWithDetails[]) || [];
  } catch (err) {
    logger.error("Credit ledger fetch exception:", err);
    return [];
  }
}

/**
 * Calculate windowed credit totals for a business.
 */
export async function calculateCreditTotals(
  supabase: SupabaseClient<Database>,
  businessId: string,
  windowDays: number,
): Promise<{
  totalIssued: number;
  totalSpent: number;
  totalExpired: number;
  totalAdjustments: number;
  outstandingBalance: number;
}> {
  try {
    const windowStart = new Date();
    windowStart.setDate(windowStart.getDate() - windowDays);

    const { data: ledgerEntries, error } = await supabase
      .from("credit_ledger")
      .select("delta, entry_type")
      .eq("business_id", businessId)
      .gte("created_at", windowStart.toISOString());

    if (error) {
      logger.warn("Failed to calculate credit totals:", error);
      return {
        totalIssued: 0,
        totalSpent: 0,
        totalExpired: 0,
        totalAdjustments: 0,
        outstandingBalance: 0,
      };
    }

    const totals = (ledgerEntries || []).reduce(
      (acc, entry) => {
        const delta = entry.delta || 0;
        switch (entry.entry_type) {
          case "issued":
            acc.totalIssued += delta;
            break;
          case "spent":
            acc.totalSpent += Math.abs(delta);
            break;
          case "expired":
            acc.totalExpired += Math.abs(delta);
            break;
          case "adjustment":
            acc.totalAdjustments += delta;
            break;
        }
        return acc;
      },
      {
        totalIssued: 0,
        totalSpent: 0,
        totalExpired: 0,
        totalAdjustments: 0,
      },
    );

    // Get current outstanding balance from customers table
    const { data: customers, error: customersError } = await supabase
      .from("customers")
      .select("credits")
      .eq("business_id", businessId);

    const outstandingBalance =
      customersError || !customers
        ? 0
        : customers.reduce((sum, c) => sum + (c.credits ?? 0), 0);

    return {
      ...totals,
      outstandingBalance,
    };
  } catch (err) {
    logger.error("Credit totals calculation exception:", err);
    return {
      totalIssued: 0,
      totalSpent: 0,
      totalExpired: 0,
      totalAdjustments: 0,
      outstandingBalance: 0,
    };
  }
}

/**
 * Get ambassador reward summary grouped by ambassador.
 */
export async function getAmbassadorRewardsSummary(
  supabase: SupabaseClient<Database>,
  businessId: string,
  windowDays?: number,
): Promise<AmbassadorRewardSummary[]> {
  try {
    // Fetch all credit ledger entries with customer details
    const ledgerEntries = await fetchCreditLedger(supabase, businessId, {
      limit: 10000, // Get all for grouping
      dateFrom: windowDays
        ? new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000)
        : undefined,
    });

    // Get all referrals for conversion counts
    const { data: referrals, error: referralsError } = await supabase
      .from("referrals")
      .select("id, ambassador_id, status")
      .eq("business_id", businessId);

    if (referralsError) {
      logger.warn("Failed to fetch referrals for reward summary:", referralsError);
    }

    // Get all customers to ensure we have current balances
    const { data: customers, error: customersError } = await supabase
      .from("customers")
      .select("id, name, email, referral_code, credits")
      .eq("business_id", businessId);

    if (customersError) {
      logger.error("Failed to fetch customers for reward summary:", customersError);
      return [];
    }

    // Group by ambassador
    const ambassadorMap = new Map<string, AmbassadorRewardSummary>();

    ledgerEntries.forEach((entry) => {
      const ambassadorId = entry.customer_id;
      if (!ambassadorMap.has(ambassadorId)) {
        const customer = customers?.find((c) => c.id === ambassadorId);
        ambassadorMap.set(ambassadorId, {
          ambassadorId,
          ambassadorName: entry.customer?.name || customer?.name || null,
          referralCode: entry.customer?.referral_code || customer?.referral_code || null,
          totalConversions: 0,
          totalCreditsEarned: 0,
          manualAdjustments: 0,
          lastRewardDate: null,
          currentBalance: entry.customer?.credits || customer?.credits || 0,
        });
      }

      const summary = ambassadorMap.get(ambassadorId)!;

      if (entry.entry_type === "issued") {
        summary.totalCreditsEarned += entry.delta || 0;
        if (!summary.lastRewardDate || entry.created_at! > summary.lastRewardDate) {
          summary.lastRewardDate = entry.created_at;
        }
      } else if (entry.entry_type === "adjustment") {
        summary.manualAdjustments += entry.delta || 0;
      }
    });

    // Add conversion counts
    if (referrals) {
      referrals.forEach((referral) => {
        if (referral.ambassador_id && referral.status === "completed") {
          const summary = ambassadorMap.get(referral.ambassador_id);
          if (summary) {
            summary.totalConversions++;
          }
        }
      });
    }

    // Return sorted by total credits earned (descending)
    return Array.from(ambassadorMap.values())
      .filter((a) => a.totalCreditsEarned > 0 || a.currentBalance > 0)
      .sort((a, b) => b.totalCreditsEarned - a.totalCreditsEarned);
  } catch (err) {
    logger.error("Ambassador rewards summary exception:", err);
    return [];
  }
}
