import { lendingDb } from "@/lib/lending-db";

// Reliability backstop for the email-only lead captures (Apollo EOI, software
// recommender, Get Featured). Stores the lead in public.leads BEFORE the admin
// email is attempted, so a Resend failure can no longer lose a lead.
//
// Defensive by design: any failure (missing service key, table absent, network)
// resolves to { stored: false } instead of throwing, so the calling route can
// still fall back to email and never 500s on the backstop alone.

export type LeadType = "apollo_eoi" | "software_quiz" | "comparison_listing";

export async function storeLead(input: {
  type: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  source_page?: string;
  payload: Record<string, unknown>;
}): Promise<{ stored: boolean; id?: string; error?: string }> {
  try {
    const supabase = lendingDb();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        type: input.type,
        name: input.name?.trim() || null,
        email: input.email?.trim() || null,
        phone: input.phone?.trim() || null,
        source_page: input.source_page || null,
        payload: input.payload ?? {},
        status: "new",
      })
      .select("id")
      .single();
    if (error || !data) return { stored: false, error: error?.message };
    return { stored: true, id: data.id as string };
  } catch (e) {
    return { stored: false, error: e instanceof Error ? e.message : "store failed" };
  }
}

// Best-effort: record that the admin email fired for a stored lead. Never throws.
export async function markLeadNotified(id: string): Promise<void> {
  try {
    await lendingDb().from("leads").update({ notified_at: new Date().toISOString() }).eq("id", id);
  } catch {
    /* best-effort only */
  }
}
