import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseServiceKey, supabaseCredentialReport } from "@/lib/supabase-env";

// Untyped service-role client for the business-lending tables (lending_leads,
// lead_submissions), which are not in the generated Database types. Mirrors the
// blueprint helper pattern. Server-only: the service role key must never reach the
// browser. Used by the lead API and the /admin/leads pages.
export function lendingDb(): SupabaseClient {
  const url = supabaseUrl();
  const key = supabaseServiceKey();
  if (!url || !key) {
    const { missing } = supabaseCredentialReport();
    throw new Error(`Supabase service credentials not configured. Missing: ${missing.join("; ")}`);
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
