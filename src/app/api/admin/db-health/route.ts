import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import { logger } from "@/lib/logger";

type CheckResult = {
  table: string;
  ok: boolean;
  details?: string;
};

const REQUIRED_TABLES: Record<string, string[]> = {
  businesses: [
    "id",
    "owner_id",
    "name",
    "discount_capture_secret",
    "onboarding_metadata",
    "logo_url",
    "brand_highlight_color",
    "brand_tone",
    "sign_on_bonus_enabled",
    "sign_on_bonus_amount",
    "sign_on_bonus_type",
    "sign_on_bonus_description",
  ],
  customers: [
    "id",
    "business_id",
    "name",
    "email",
    "phone",
    "referral_code",
    "discount_code",
    "credits",
    "status",
    "company",
    "website",
    "instagram_handle",
    "linkedin_handle",
    "audience_profile",
    "source",
    "notes",
  ],
  referrals: [
    "id",
    "business_id",
    "ambassador_id",
    "campaign_id",
    "referred_name",
    "referred_email",
    "referred_phone",
    "status",
    "transaction_value",
    "transaction_date",
    "service_type",
    "created_by",
  ],
  campaigns: [
    "id",
    "business_id",
    "name",
    "message",
    "channel",
    "status",
    "total_recipients",
    "sent_count",
    "failed_count",
    "snapshot_offer_text",
    "snapshot_new_user_reward_text",
    "snapshot_client_reward_text",
    "snapshot_reward_type",
    "snapshot_reward_amount",
    "snapshot_upgrade_name",
    "snapshot_reward_terms",
    "snapshot_logo_url",
    "snapshot_story_blocks",
    "snapshot_include_qr",
  ],
  partner_applications: [
    "id",
    "business_id",
    "customer_id",
    "source",
    "status",
  ],
  credit_ledger: [
    "id",
    "business_id",
    "customer_id",
    "referral_id",
    "delta",
    "entry_type",
  ],
  referral_events: [
    "id",
    "business_id",
    "event_type",
    "created_at",
  ],
  admin_roles: [
    "id",
    "user_id",
    "email",
    "role",
    "permissions",
    "is_active",
    "revoked_at",
  ],
};

function extractErrorDetail(error: { message?: string; details?: string; hint?: string } | null) {
  if (!error) return "Unknown error";
  return [error.message, error.details, error.hint].filter(Boolean).join(" | ");
}

export async function GET(request: Request) {
  const secret = request.headers.get("x-dashboard-health-secret");
  if (!secret || secret !== process.env.DASHBOARD_HEALTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase service role key missing" },
      { status: 500 },
    );
  }

  const supabase = await createServiceClient();
  const results: CheckResult[] = [];

  for (const [table, columns] of Object.entries(REQUIRED_TABLES)) {
    try {
      const { error } = await supabase
        .from(table)
        .select(columns.join(","))
        .limit(1);
      if (error) {
        const details = extractErrorDetail(error);
        results.push({ table, ok: false, details });
        logger.error("DB health check failed", { table, details });
      } else {
        results.push({ table, ok: true });
      }
    } catch (err) {
      const details = err instanceof Error ? err.message : String(err);
      results.push({ table, ok: false, details });
      logger.error("DB health check exception", { table, details });
    }
  }

  const missing = results.filter((result) => !result.ok);
  const status = missing.length > 0 ? 500 : 200;
  return NextResponse.json(
    {
      ok: missing.length === 0,
      missing,
      checked: results.length,
    },
    { status },
  );
}
