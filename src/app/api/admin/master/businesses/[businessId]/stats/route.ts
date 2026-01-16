import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";

const paramsSchema = z.object({
  windowDays: z.coerce.number().int().min(1).max(365).default(30),
});

export async function GET(
  request: Request,
  context: { params: Promise<{ businessId: string }> | { businessId: string } },
) {
  const logger = createApiLogger("api:admin:master:business-stats");
  await requireAdmin();

  const rawParams = await Promise.resolve(context.params);
  const businessId = rawParams.businessId;
  if (!businessId) {
    return NextResponse.json({ error: "Missing business id" }, { status: 400 });
  }

  const url = new URL(request.url);
  const validation = validateWithSchema(
    paramsSchema,
    { windowDays: url.searchParams.get("windowDays") ?? undefined },
    logger,
  );
  if (!validation.success) return validation.response;

  const { windowDays } = validation.data;
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

  const supabase = await createServiceClient();

  const [{ data: business }, { count: customersTotal }, { count: customersApplicants }, { count: referralsTotal }, { count: referralsCompleted }, { count: linkVisits }, { count: signups }, { count: meetings }, { count: conversions }] =
    await Promise.all([
      supabase
        .from("businesses")
        .select(
          `
          id,
          owner_id,
          name,
          upgrade_name,
          reward_type,
          reward_amount,
          created_at,
          onboarding_metadata,
          owner:users!owner_id(id,email,created_at,last_sign_in_at)
        `,
        )
        .eq("id", businessId)
        .maybeSingle(),
      supabase.from("customers").select("id", { head: true, count: "exact" }).eq("business_id", businessId),
      supabase
        .from("customers")
        .select("id", { head: true, count: "exact" })
        .eq("business_id", businessId)
        .eq("status", "applicant"),
      supabase.from("referrals").select("id", { head: true, count: "exact" }).eq("business_id", businessId),
      supabase
        .from("referrals")
        .select("id", { head: true, count: "exact" })
        .eq("business_id", businessId)
        .eq("status", "completed"),
      supabase
        .from("referral_events")
        .select("id", { head: true, count: "exact" })
        .eq("business_id", businessId)
        .eq("event_type", "link_visit")
        .gte("created_at", since),
      supabase
        .from("referral_events")
        .select("id", { head: true, count: "exact" })
        .eq("business_id", businessId)
        .eq("event_type", "signup_submitted")
        .gte("created_at", since),
      supabase
        .from("referral_events")
        .select("id", { head: true, count: "exact" })
        .eq("business_id", businessId)
        .eq("event_type", "schedule_call_clicked")
        .gte("created_at", since),
      supabase
        .from("referral_events")
        .select("id", { head: true, count: "exact" })
        .eq("business_id", businessId)
        .eq("event_type", "conversion_completed")
        .gte("created_at", since),
    ]);

  if (!business) {
    logger.warn("Business not found", { businessId });
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const safeNumber = (value: number | null | undefined) => (typeof value === "number" ? value : 0);

  return NextResponse.json({
    business,
    counts: {
      customersTotal: safeNumber(customersTotal),
      customersApplicants: safeNumber(customersApplicants),
      referralsTotal: safeNumber(referralsTotal),
      referralsCompleted: safeNumber(referralsCompleted),
      windowDays,
      events: {
        linkVisits: safeNumber(linkVisits),
        signups: safeNumber(signups),
        meetings: safeNumber(meetings),
        conversions: safeNumber(conversions),
      },
    },
  });
}

