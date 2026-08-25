import { createClient } from "@supabase/supabase-js";

import { supabaseServiceKey, supabaseUrl } from "@/lib/supabase-env";

/**
 * The Blueprint used its own Supabase project. That project was deleted, so
 * BLUEPRINT_SUPABASE_URL now points at a hostname that does not resolve, and
 * every access-token lookup fails. People paid for this, so the lookup falls
 * back to the main project when the blueprint credentials are absent: clear the
 * two BLUEPRINT_* variables and the table can live alongside everything else.
 *
 * A credential pointing at a dead project is worse than no credential, because
 * it looks configured. Leaving the fallback here means removing the variables is
 * a fix rather than a breakage.
 */
const BLUEPRINT_URL = process.env.BLUEPRINT_SUPABASE_URL ?? "";
const BLUEPRINT_KEY = process.env.BLUEPRINT_SUPABASE_SERVICE_ROLE_KEY ?? "";

export type BlueprintPurchase = {
  id: string;
  email: string;
  name: string | null;
  access_token: string;
  stripe_session_id: string | null;
  industry: string | null;
  primary_goal: string | null;
  experience_level: string | null;
  purchased_at: string;
  status: "preparing" | "delivered";
  notes: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createBlueprintClient(): ReturnType<typeof createClient<any>> {
  const url = BLUEPRINT_URL || supabaseUrl();
  const key = BLUEPRINT_KEY || supabaseServiceKey();
  if (!url || !key) {
    throw new Error("Blueprint Supabase credentials not configured, and the main Supabase credentials are missing too");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
