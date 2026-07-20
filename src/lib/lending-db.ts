import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Untyped service-role client for the business-lending tables (lending_leads,
// lead_submissions), which are not in the generated Database types. Mirrors the
// blueprint helper pattern. Server-only: the service role key must never reach the
// browser. Used by the lead API and the /admin/leads pages.
export function lendingDb(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service credentials not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
