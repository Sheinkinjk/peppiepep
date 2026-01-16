import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";
import { quickAddCustomerProfile } from "@/lib/customers-quick-add";
import type { Database } from "@/types/supabase";

const createPartnerSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().optional().or(z.literal("")).default(""),
  phone: z.string().optional().or(z.literal("")).default(""),
  partnerType: z.string().min(1).max(80),
  campaignGoal: z.string().min(1).max(80),
  landingUrl: z.string().min(1).max(500),
  status: z.enum(["Draft", "Active", "Paused"]).default("Draft"),
  requestId: z.string().uuid().optional(),
});

function buildExternalPartnerLink(params: {
  baseUrl: string;
  code: string;
  ambassadorId: string;
  businessId: string;
  linkId: string;
  landingUrl: string;
}) {
  const base = params.baseUrl.replace(/\/$/, "");
  const url = new URL(`${base}/api/referral-redirect`);
  url.searchParams.set("code", params.code);
  url.searchParams.set("ambassador_id", params.ambassadorId);
  url.searchParams.set("business_id", params.businessId);
  url.searchParams.set("utm_source", "external_partner");
  url.searchParams.set("utm_medium", "external_partner");
  url.searchParams.set("utm_campaign", params.linkId);
  url.searchParams.set("external_partner_id", params.ambassadorId);
  url.searchParams.set("external_partner_link_id", params.linkId);
  url.searchParams.set("redirect_to", params.landingUrl);
  return url.toString();
}

const partnersQuerySchema = z.object({
  windowDays: z.coerce.number().int().min(1).max(365).default(30),
});

export async function GET(request: Request) {
  const logger = createApiLogger("api:external-partners:partners:list");
  try {
    const url = new URL(request.url);
    const queryValidation = validateWithSchema(
      partnersQuerySchema,
      Object.fromEntries(url.searchParams.entries()),
      logger,
    );
    const windowDays = queryValidation.success ? queryValidation.data.windowDays : 30;
    const windowStartIso = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">>();

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    const { data: partners, error: partnersError } = await supabase
      .from("customers")
      .select("id, name, email, referral_code, status, metadata")
      .eq("business_id", business.id)
      .eq("source", "external_partner")
      .order("created_at", { ascending: false })
      .limit(200);

    if (partnersError) {
      logger.error("Partner list query failed", { partnersError });
      return NextResponse.json({ error: "Failed to load partners." }, { status: 500 });
    }

    const partnerIds = (partners ?? []).map((p) => p.id);
    let referralRows: Array<{
      ambassador_id: string | null;
      status: string | null;
      transaction_value: number | null;
      transaction_date: string | null;
      created_at: string | null;
    }> = [];
    if (partnerIds.length > 0) {
      const { data: referrals, error: referralsError } = await supabase
        .from("referrals")
        .select("ambassador_id, status, transaction_value, transaction_date, created_at")
        .eq("business_id", business.id)
        .in("ambassador_id", partnerIds)
        .limit(5000);
      if (!referralsError && referrals) {
        referralRows = referrals as any;
      }
    }

    const performanceByPartner = new Map<string, { totalReferrals: number; completedReferrals: number }>();
    const windowedRevenueByPartner = new Map<string, number>();
    const windowedConversionsByPartner = new Map<string, number>();
    referralRows.forEach((row) => {
      const ambassadorId = row.ambassador_id;
      if (!ambassadorId) return;
      const current = performanceByPartner.get(ambassadorId) ?? { totalReferrals: 0, completedReferrals: 0 };
      current.totalReferrals += 1;
      if ((row.status ?? "").toLowerCase() === "completed") {
        current.completedReferrals += 1;
      }
      performanceByPartner.set(ambassadorId, current);

      const baseDate = row.transaction_date ?? row.created_at;
      const isWindowed = baseDate ? Date.parse(baseDate) >= Date.parse(windowStartIso) : false;
      if (isWindowed && (row.status ?? "").toLowerCase() === "completed") {
        windowedConversionsByPartner.set(
          ambassadorId,
          (windowedConversionsByPartner.get(ambassadorId) ?? 0) + 1,
        );
        windowedRevenueByPartner.set(
          ambassadorId,
          (windowedRevenueByPartner.get(ambassadorId) ?? 0) + (row.transaction_value ?? 0),
        );
      }
    });

    let eventRows: Array<{ ambassador_id: string | null; event_type: string | null }> = [];
    if (partnerIds.length > 0) {
      const { data: events, error: eventsError } = await supabase
        .from("referral_events")
        .select("ambassador_id, event_type, created_at")
        .eq("business_id", business.id)
        .in("ambassador_id", partnerIds)
        .gte("created_at", windowStartIso)
        .limit(10000);
      if (!eventsError && events) {
        eventRows = events as any;
      }
    }

    const windowedEventsByPartner = new Map<
      string,
      { linkVisits: number; signups: number; meetings: number; conversions: number }
    >();
    eventRows.forEach((event) => {
      const ambassadorId = event.ambassador_id;
      if (!ambassadorId) return;
      const current =
        windowedEventsByPartner.get(ambassadorId) ?? { linkVisits: 0, signups: 0, meetings: 0, conversions: 0 };
      const type = (event.event_type ?? "").toLowerCase();
      if (type === "link_visit") current.linkVisits += 1;
      if (type === "signup_submitted") current.signups += 1;
      if (type === "schedule_call_clicked") current.meetings += 1;
      if (type === "conversion_completed") current.conversions += 1;
      windowedEventsByPartner.set(ambassadorId, current);
    });

    const { data: links } = await supabase
      .from("external_partner_links")
      .select("id, customer_id, landing_url")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false })
      .limit(500);

    const linkByCustomer = new Map<string, { id: string; landing_url: string }>();
    (links ?? []).forEach((link: any) => {
      if (!linkByCustomer.has(link.customer_id)) {
        linkByCustomer.set(link.customer_id, { id: link.id, landing_url: link.landing_url });
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://peppiepep.vercel.app";

    const data = (partners ?? []).map((partner: any) => {
      const link = linkByCustomer.get(partner.id);
      const referralLink =
        partner.referral_code && link
          ? buildExternalPartnerLink({
              baseUrl,
              code: partner.referral_code,
              ambassadorId: partner.id,
              businessId: business.id,
              linkId: link.id,
              landingUrl: link.landing_url,
            })
          : "";
      const windowedEvents = windowedEventsByPartner.get(partner.id) ?? {
        linkVisits: 0,
        signups: 0,
        meetings: 0,
        conversions: 0,
      };
      const windowedRevenue = windowedRevenueByPartner.get(partner.id) ?? 0;
      return {
        ...partner,
        referralLink,
        performance: performanceByPartner.get(partner.id) ?? { totalReferrals: 0, completedReferrals: 0 },
        window: {
          days: windowDays,
          linkVisits: windowedEvents.linkVisits,
          signups: windowedEvents.signups,
          meetings: windowedEvents.meetings,
          conversions: windowedEvents.conversions,
          completedReferrals: windowedConversionsByPartner.get(partner.id) ?? 0,
          revenue: windowedRevenue,
        },
      };
    });

    return NextResponse.json({ data });
  } catch (error) {
    logger.error("Partner list exception", { error });
    return NextResponse.json({ error: "Failed to load partners." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:external-partners:partners:create");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const validation = validateWithSchema(createPartnerSchema, body, logger);
    if (!validation.success) return validation.response;

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">>();

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    const externalStatus = validation.data.status;
    const customerStatus: Database["public"]["Tables"]["customers"]["Insert"]["status"] =
      externalStatus === "Active" ? "active" : "pending";

    const result = await quickAddCustomerProfile({
      supabase,
      businessId: business.id,
      name: validation.data.name,
      email: validation.data.email || "",
      phone: validation.data.phone || "",
      source: "external_partner",
      status: customerStatus,
      metadata: {
        external_partner: {
          partnerType: validation.data.partnerType,
          campaignGoal: validation.data.campaignGoal,
          status: externalStatus,
          requestId: validation.data.requestId ?? null,
        },
      } as any,
    });

    if (result.status === "error") {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const customerId =
      result.status === "created" ? result.customerId : result.existingCustomerId;

    const { data: customerRow, error: customerError } = await supabase
      .from("customers")
      .select("id, referral_code")
      .eq("id", customerId)
      .single<{ id: string; referral_code: string | null }>();

    if (customerError || !customerRow?.referral_code) {
      logger.error("Failed to fetch created customer", { customerError });
      return NextResponse.json({ error: "Partner created but referral link could not be generated." }, { status: 500 });
    }

    const { data: linkRow, error: linkError } = await supabase
      .from("external_partner_links")
      .upsert({
        business_id: business.id,
        customer_id: customerId,
        request_id: validation.data.requestId ?? null,
        landing_url: validation.data.landingUrl,
        campaign_goal: validation.data.campaignGoal,
        status: externalStatus === "Paused" ? "paused" : "active",
      } as any, {
        onConflict: "business_id,customer_id,campaign_goal,landing_url",
      })
      .select("id")
      .single<{ id: string }>();

    if (linkError || !linkRow?.id) {
      logger.error("Link insert failed", { linkError });
      return NextResponse.json({ error: "Partner created but link could not be created." }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://peppiepep.vercel.app";
    const referralLink = buildExternalPartnerLink({
      baseUrl,
      code: customerRow.referral_code,
      ambassadorId: customerId,
      businessId: business.id,
      linkId: linkRow.id,
      landingUrl: validation.data.landingUrl,
    });

    return NextResponse.json({ customerId, linkId: linkRow.id, referralLink });
  } catch (error) {
    logger.error("Partner create exception", { error });
    return NextResponse.json({ error: "Failed to create partner." }, { status: 500 });
  }
}
