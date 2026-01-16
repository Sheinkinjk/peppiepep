import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";
import type { Database } from "@/types/supabase";

const querySchema = z.object({
  windowDays: z.coerce.number().int().min(1).max(365).default(30),
});

type BusinessRow = Pick<
  Database["public"]["Tables"]["businesses"]["Row"],
  "id" | "reward_type" | "reward_amount"
>;

type ReferralSummaryRow = Pick<
  Database["public"]["Tables"]["referrals"]["Row"],
  "id" | "status" | "transaction_value" | "transaction_date" | "created_at"
> & {
  ambassador: { id: string | null; name: string | null; source: string | null } | null;
};

const PAGE_SIZE = 1000;
const MAX_ROWS = 20000;

function channelForAmbassadorSource(source: string | null): "partners" | "external_partners" | "linkedin_influencer" {
  const normalized = (source ?? "").toLowerCase();
  if (normalized === "external_partner") return "external_partners";
  if (normalized.startsWith("linkedin-influencer")) return "linkedin_influencer";
  return "partners";
}

export async function GET(request: Request) {
  const logger = createApiLogger("api:referrals:summary");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const validation = validateWithSchema(
      querySchema,
      { windowDays: url.searchParams.get("windowDays") ?? undefined },
      logger,
    );
    if (!validation.success) return validation.response;

    const { windowDays } = validation.data;
    const sinceIso = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id,reward_type,reward_amount")
      .eq("owner_id", user.id)
      .single<BusinessRow>();

    if (businessError || !business?.id) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    const rewardType = business.reward_type ?? null;
    const revenueShareRate = rewardType === "revenue_share" ? Math.max(0, (business.reward_amount ?? 0) / 100) : 0;

    const breakdown = {
      partners: { referrals: 0, completed: 0, revenue: 0, rewardsEst: 0 },
      external_partners: { referrals: 0, completed: 0, revenue: 0, rewardsEst: 0 },
      linkedin_influencer: { referrals: 0, completed: 0, revenue: 0, rewardsEst: 0 },
    };

    const topPartners = new Map<
      string,
      { ambassadorId: string; name: string; channel: keyof typeof breakdown; completed: number; revenue: number; rewardsEst: number }
    >();

    let fetched = 0;
    for (let page = 0; fetched < MAX_ROWS; page += 1) {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("referrals")
        .select(
          `
            id,
            status,
            transaction_value,
            transaction_date,
            created_at,
            ambassador:customers!referrals_ambassador_id_fkey (
              id,
              name,
              source
            )
          `,
        )
        .eq("business_id", business.id)
        .or(`created_at.gte.${sinceIso},transaction_date.gte.${sinceIso}`)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        logger.error("Summary query failed", { error });
        return NextResponse.json({ error: "Failed to load summary." }, { status: 500 });
      }

      const rows = (data ?? []) as ReferralSummaryRow[];
      if (rows.length === 0) break;
      fetched += rows.length;

      for (const row of rows) {
        const channel = channelForAmbassadorSource(row.ambassador?.source ?? null);
        breakdown[channel].referrals += 1;

        const isCompleted = (row.status ?? "").toLowerCase() === "completed";
        const value = typeof row.transaction_value === "number" ? row.transaction_value : 0;

        if (isCompleted) {
          breakdown[channel].completed += 1;
          breakdown[channel].revenue += value;
          breakdown[channel].rewardsEst += rewardType === "revenue_share" ? value * revenueShareRate : 0;

          const ambassadorId = row.ambassador?.id ?? null;
          if (ambassadorId) {
            const key = ambassadorId;
            const current = topPartners.get(key) ?? {
              ambassadorId,
              name: row.ambassador?.name ?? "Ambassador",
              channel,
              completed: 0,
              revenue: 0,
              rewardsEst: 0,
            };
            current.completed += 1;
            current.revenue += value;
            current.rewardsEst += rewardType === "revenue_share" ? value * revenueShareRate : 0;
            topPartners.set(key, current);
          }
        }
      }

      if (rows.length < PAGE_SIZE) break;
    }

    if (fetched >= MAX_ROWS) {
      logger.warn("Summary capped at MAX_ROWS; results may be incomplete", { businessId: business.id, fetched });
    }

    const top = Array.from(topPartners.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 12);

    return NextResponse.json({
      windowDays,
      rewardType,
      breakdown,
      topPartners: top,
      meta: { fetchedRows: fetched, capped: fetched >= MAX_ROWS },
    });
  } catch (error) {
    logger.error("Summary exception", { error });
    return NextResponse.json({ error: "Failed to load summary." }, { status: 500 });
  }
}

