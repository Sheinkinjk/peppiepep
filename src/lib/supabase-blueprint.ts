import { createClient } from "@supabase/supabase-js";

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
  if (!BLUEPRINT_URL || !BLUEPRINT_KEY) {
    throw new Error("Blueprint Supabase credentials not configured — set BLUEPRINT_SUPABASE_URL and BLUEPRINT_SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(BLUEPRINT_URL, BLUEPRINT_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
