import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";
import { escapeHtml, sendAdminNotification } from "@/lib/email-notifications";
import type { Database } from "@/types/supabase";

const requestSchema = z.object({
  requestKind: z.enum(["partner_discovery", "partner_activation"]).default("partner_discovery"),

  // Activation (launch a relationship) fields
  partnerName: z.string().optional().default(""),
  partnerCompany: z.string().optional().default(""),
  partnerProfileUrl: z.string().url().optional().or(z.literal("")).default(""),
  partnerWebsite: z.string().url().optional().or(z.literal("")).default(""),
  landingUrl: z.string().url().optional().or(z.literal("")).default(""),

  // Discovery fields (multi-step brief)
  partnerTypes: z.array(z.string()).default([]),
  industryFocus: z.array(z.string()).default([]),
  geography: z.array(z.string()).default([]),
  audienceLevel: z.string().default("Founder"),
  audienceSize: z.tuple([z.number().min(0), z.number().min(0)]).default([1000, 10000]),
  promotionMethods: z.array(z.string()).default([]),
  contentStyle: z.string().default("Educational"),
  ctaType: z.string().default("Book demo"),
  primaryGoal: z.string().default("Lead generation"),
  successMetric: z.string().default("Leads"),
  expectedVolume: z.string().optional().default(""),
  offerType: z.string().default("Revenue share"),
  offerNotes: z.string().optional().default(""),
  approvalRequired: z.boolean().default(true),
  additionalNotes: z.string().optional().default(""),
});

export async function GET() {
  const logger = createApiLogger("api:external-partners:requests:list");
  try {
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
      .select("id, name")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id" | "name">>();

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("external_partner_requests")
      .select("id, status, created_at, payload")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      logger.error("Request list query failed", { error });
      return NextResponse.json({ error: "Failed to load requests." }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    logger.error("Request list exception", { error });
    return NextResponse.json({ error: "Failed to load requests." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:external-partners:requests:create");
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
    const validation = validateWithSchema(requestSchema, body, logger);
    if (!validation.success) return validation.response;

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id, name")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id" | "name">>();

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    const insertPayload = {
      business_id: business.id,
      submitted_by: user.id,
      status: "pending_review",
      payload: validation.data,
    } satisfies Database["public"]["Tables"]["external_partner_requests"]["Insert"] as any;

    const { data: created, error: insertError } = await supabase
      .from("external_partner_requests")
      .insert(insertPayload)
      .select("id, created_at, status")
      .single();

    if (insertError || !created?.id) {
      logger.error("Insert failed", { insertError });
      return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
    }

    const safeBusinessName = escapeHtml(business.name || "Business");
    const safeUserEmail = escapeHtml(user.email || "unknown");
    const safeKind = escapeHtml(validation.data.requestKind);
    const safeGoal = escapeHtml(validation.data.primaryGoal);
    const safePartnerTypes = escapeHtml(validation.data.partnerTypes.join(", "));
    const safePartnerName = escapeHtml(validation.data.partnerName);
    const safePartnerCompany = escapeHtml(validation.data.partnerCompany);
    const safePartnerProfileUrl = escapeHtml(validation.data.partnerProfileUrl);
    const safePartnerWebsite = escapeHtml(validation.data.partnerWebsite);
    const safeLandingUrl = escapeHtml(validation.data.landingUrl);
    const dashboardBase =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://peppiepep.vercel.app";
    const dashboardUrl = `${dashboardBase}/dashboard?section=external-partners`;
    const adminUrl = `${dashboardBase}/dashboard/admin-master?request=${encodeURIComponent(created.id)}#external-partners-requests`;

    await sendAdminNotification({
      subject: `External Partners: ${validation.data.requestKind === "partner_activation" ? "Activation request" : "Discovery request"} · ${business.name || "Business"}`,
      html: `
        <div style="font-family:Inter,system-ui,-apple-system,sans-serif;padding:16px;color:#0f172a;">
          <h2 style="margin:0 0 12px 0;">External Partners Request</h2>
          <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${safeBusinessName}</p>
          <p style="margin:0 0 8px 0;"><strong>Submitted by:</strong> ${safeUserEmail}</p>
          <p style="margin:0 0 8px 0;"><strong>Request type:</strong> ${safeKind}</p>
          ${
            validation.data.requestKind === "partner_activation"
              ? `
                <p style="margin:0 0 8px 0;"><strong>Partner name:</strong> ${safePartnerName || "—"}</p>
                <p style="margin:0 0 8px 0;"><strong>Company:</strong> ${safePartnerCompany || "—"}</p>
                <p style="margin:0 0 8px 0;"><strong>Profile:</strong> ${safePartnerProfileUrl ? `<a href="${safePartnerProfileUrl}">${safePartnerProfileUrl}</a>` : "—"}</p>
                <p style="margin:0 0 8px 0;"><strong>Website:</strong> ${safePartnerWebsite ? `<a href="${safePartnerWebsite}">${safePartnerWebsite}</a>` : "—"}</p>
                <p style="margin:0 0 8px 0;"><strong>Landing URL:</strong> ${safeLandingUrl ? `<a href="${safeLandingUrl}">${safeLandingUrl}</a>` : "—"}</p>
              `
              : `
                <p style="margin:0 0 8px 0;"><strong>Primary goal:</strong> ${safeGoal}</p>
                <p style="margin:0 0 8px 0;"><strong>Partner types:</strong> ${safePartnerTypes || "—"}</p>
              `
          }
          <p style="margin:12px 0 0 0;">
            <a href="${adminUrl}" style="color:#0abab5;text-decoration:underline;">Open in Master Admin</a>
            &nbsp;·&nbsp;
            <a href="${dashboardUrl}" style="color:#0abab5;text-decoration:underline;">Client dashboard</a>
            &nbsp;· Request ID: <code>${escapeHtml(created.id)}</code>
          </p>
        </div>
      `,
    }).catch((err) => {
      logger.warn("Admin notification failed (non-fatal)", { err });
    });

    return NextResponse.json({ id: created.id, status: created.status });
  } catch (error) {
    logger.error("Request create exception", { error });
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}
