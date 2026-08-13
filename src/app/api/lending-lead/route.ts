import { NextRequest, NextResponse } from "next/server";
import { lendingDb } from "@/lib/lending-db";
import { sendAdminNotification } from "@/lib/email-notifications";
import { leadSchema } from "@/lib/lending-schema";
import { matchLenders } from "@/lib/lenders";
import { CONSENT_TEXT_VERSION } from "@/lib/consent";
import { operatorSubject, buildOperatorEmail, buildApplicantEmail } from "@/lib/lending-email";

export const runtime = "nodejs";

const OPERATOR_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || "jarred@referlabs.com.au";
const RATE_LIMIT = 5;              // submissions per IP per hour
const HOUR_MS = 60 * 60 * 1000;

function clientIp(req: NextRequest): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Accept silently so it does not retry.
  if (typeof body.company_website_confirm === "string" && body.company_website_confirm.length > 0) {
    return NextResponse.json({ ok: true, matchedLenders: 0 });
  }

  const ip = clientIp(req);
  const userAgent = req.headers.get("user-agent")?.slice(0, 400) ?? null;

  const supabase = lendingDb();

  // IP rate limit (5/hour) via a DB count — no in-memory state, robust on serverless.
  if (ip) {
    const since = new Date(Date.now() - HOUR_MS).toISOString();
    const { count } = await supabase
      .from("lending_leads")
      .select("id", { count: "exact", head: true })
      .eq("consent_ip", ip)
      .gte("created_at", since);
    if ((count ?? 0) >= RATE_LIMIT) {
      return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
    }
  }

  // Never trust the client: re-validate with the same schema.
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 400 },
    );
  }
  const lead = parsed.data;

  // Duplicate check: same ABN or email in the last 30 days. Still insert; flag it.
  let dupNote = "";
  const cutoff = new Date(Date.now() - 30 * 24 * HOUR_MS).toISOString();
  const orClauses = [`email.eq.${lead.email}`];
  if (lead.abn) orClauses.push(`abn.eq.${lead.abn}`);
  const { data: dupes } = await supabase
    .from("lending_leads")
    .select("id")
    .or(orClauses.join(","))
    .gte("created_at", cutoff)
    .limit(1);
  if (dupes && dupes.length > 0) {
    dupNote = `[DUPLICATE] Matching ABN/email submitted within the last 30 days. `;
  }

  const loanPurpose = lead.loan_purpose_detail?.trim()
    ? `${lead.loan_purpose}: ${lead.loan_purpose_detail.trim()}`
    : lead.loan_purpose;

  const insertRow = {
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: lead.phone,
    preferred_contact: lead.preferred_contact ?? null,

    business_name: lead.business_name,
    abn: lead.abn || null,
    entity_type: lead.entity_type ?? null,
    industry: lead.industry || null,
    state: lead.state ?? null,
    trading_since: lead.trading_since ?? null,
    website: lead.website || null,

    monthly_revenue: lead.monthly_revenue,
    avg_bank_balance: lead.avg_bank_balance || null,
    has_existing_loans: lead.has_existing_loans ?? null,
    existing_loan_detail: lead.existing_loan_detail || null,
    credit_profile: lead.credit_profile ?? null,
    has_ato_debt: lead.has_ato_debt ?? null,
    ato_debt_band: lead.ato_debt_band ?? null,

    amount_requested: lead.amount_requested,
    loan_purpose: loanPurpose,
    urgency: lead.urgency ?? null,
    product_interest: lead.product_interest ?? [],
    security_available: lead.security_available ?? null,

    consent_privacy: lead.consent_privacy,
    consent_contact: lead.consent_contact,
    consent_text_version: CONSENT_TEXT_VERSION,
    consent_ip: ip,
    consent_user_agent: userAgent,

    source_page: lead.source_page || null,
    referrer: lead.referrer || null,
    utm_source: lead.utm_source || null,
    utm_medium: lead.utm_medium || null,
    utm_campaign: lead.utm_campaign || null,

    status: "new",
    internal_notes: dupNote || null,
  };

  const { data: inserted, error } = await supabase
    .from("lending_leads")
    .insert(insertRow)
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("lending_leads insert failed:", error);
    return NextResponse.json({ ok: false, error: "Could not save your enquiry. Please try again." }, { status: 500 });
  }

  const leadId = inserted.id as string;
  const matched = matchLenders(lead);

  // Emails must never fail the request: the lead is already saved. On failure,
  // notified_at simply stays null so the operator can spot un-notified leads.
  let operatorSent = false;
  try {
    const r = await sendAdminNotification({
      subject: operatorSubject(lead),
      html: buildOperatorEmail(lead, leadId, matched),
      to: OPERATOR_EMAIL,
    });
    operatorSent = r.success;
  } catch (e) {
    console.error("operator email failed:", e);
  }
  try {
    await sendAdminNotification({
      subject: "We've received your business finance enquiry | Refer Labs",
      html: buildApplicantEmail(lead, matched),
      to: lead.email,
    });
  } catch (e) {
    console.error("applicant email failed:", e);
  }

  if (operatorSent) {
    await supabase.from("lending_leads").update({ notified_at: new Date().toISOString() }).eq("id", leadId);
  }

  // Never return the lead id or any stored data.
  return NextResponse.json({ ok: true, matchedLenders: matched.length });
}
