import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

export type CreditLedgerEntryInput = {
  businessId: string;
  customerId: string;
  delta: number;
  type: "issued" | "spent" | "expired" | "adjustment";
  source: string;
  referralId?: string | null;
  note?: string | null;
};

export async function tryInsertCreditLedgerEntry(
  supabase: SupabaseClient<Database>,
  entry: CreditLedgerEntryInput,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from("credit_ledger").insert([
    {
      business_id: entry.businessId,
      customer_id: entry.customerId,
      referral_id: entry.referralId ?? null,
      delta: entry.delta,
      entry_type: entry.type,
      source: entry.source,
      note: entry.note ?? null,
    },
  ]);

  // Backwards compatible: table/column may not exist yet.
  if (error?.code === "42P01" || error?.code === "42703") return;
  if (error) {
    console.warn("Failed to write credit ledger entry:", error);
  }
}

