import { NextResponse } from "next/server";

import { getCurrentAdmin } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase";
import { logger } from "@/lib/logger";

type CheckResult = {
  table: string;
  ok: boolean;
  details?: string;
};

const REQUIRED_TABLES: Record<string, string[]> = {
  businesses: ["id", "owner_id", "name", "discount_capture_secret", "onboarding_metadata"],
  customers: ["id", "business_id", "referral_code", "discount_code", "credits", "status", "source"],
  referrals: ["id", "business_id", "ambassador_id", "status", "transaction_value", "transaction_date"],
  referral_events: ["id", "business_id", "event_type", "created_at"],
  campaigns: ["id", "business_id", "status", "channel", "sent_count"],
  credit_ledger: ["id", "business_id", "customer_id", "delta", "entry_type"],
  external_partner_requests: ["id", "business_id", "status", "created_at"],
  external_partner_links: ["id", "business_id", "customer_id", "landing_url", "status"],
};

function extractErrorDetail(error: { message?: string; details?: string; hint?: string } | null) {
  if (!error) return "Unknown error";
  return [error.message, error.details, error.hint].filter(Boolean).join(" | ");
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createServiceClient();
    const service = supabase as unknown as {
      from: (table: string) => {
        select: (columns: string) => { limit: (count: number) => Promise<{ error: any }> };
      };
    };
    const results: CheckResult[] = [];

    for (const [table, columns] of Object.entries(REQUIRED_TABLES)) {
      try {
        const { error } = await service.from(table).select(columns.join(",")).limit(1);
        if (error) {
          const details = extractErrorDetail(error);
          results.push({ table, ok: false, details });
          logger.error("DB health-lite check failed", { table, details });
        } else {
          results.push({ table, ok: true });
        }
      } catch (err) {
        const details = err instanceof Error ? err.message : String(err);
        results.push({ table, ok: false, details });
        logger.error("DB health-lite check exception", { table, details });
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
  } catch (error) {
    logger.error("DB health-lite error", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

