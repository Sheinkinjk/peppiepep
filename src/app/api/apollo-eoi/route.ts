import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendAdminNotification, escapeHtml as esc } from "@/lib/email-notifications";

export const runtime = "nodejs";

const OPERATOR_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || "jarred@referlabs.com.au";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trim = (n: number) => z.string().trim().max(n);

// Lean EOI schema: enough to qualify a home-battery lead, no document uploads.
const eoiSchema = z.object({
  full_name: trim(120).min(1, "Your name is required"),
  email: z.string().trim().max(160).regex(emailRe, "Enter a valid email"),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  postcode: trim(8).min(3, "Enter your postcode"),
  property: trim(30).optional().or(z.literal("")),      // own / rent / business
  has_solar: trim(20).optional().or(z.literal("")),      // yes / no / unsure
  quarterly_bill: trim(30).optional().or(z.literal("")), // band
  timeframe: trim(40).optional().or(z.literal("")),
  notes: trim(1000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please tick the consent box to proceed" }),
  // Spam honeypot, must stay empty.
  company_website_confirm: z.string().max(0).optional().or(z.literal("")),
  source_page: trim(200).optional().or(z.literal("")),
});

const row = (k: string, v: string | undefined) =>
  v ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${esc(k)}</td><td style="padding:4px 0;color:#111827;font-weight:600">${esc(v)}</td></tr>` : "";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = eoiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const d = parsed.data;
  if (d.company_website_confirm) return NextResponse.json({ ok: true }); // silently drop bots

  // Operator email — this MUST succeed, or the lead is lost. On failure we 500 so the
  // form tells the person to try again rather than silently dropping their enquiry.
  const operatorHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#0a7c42;margin:0 0 4px">New Apollo Energy EOI</h2>
      <p style="color:#6b7280;margin:0 0 16px">Home battery interest via ${esc(d.source_page || "/apollo-energy-group-eoi")}. Contact within 2 business days.</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${row("Name", d.full_name)}${row("Email", d.email)}${row("Phone", d.phone)}${row("Postcode", d.postcode)}
        ${row("Property", d.property)}${row("Has solar", d.has_solar)}${row("Quarterly bill", d.quarterly_bill)}
        ${row("Timeframe", d.timeframe)}${row("Notes", d.notes)}
      </table>
    </div>`;
  const opRes = await sendAdminNotification({
    subject: `[APOLLO EOI] ${d.full_name} · ${d.postcode}${d.timeframe ? " · " + d.timeframe : ""}`,
    html: operatorHtml,
    to: OPERATOR_EMAIL,
  });
  if (!opRes.success) {
    return NextResponse.json({ ok: false, error: "Could not send your enquiry. Please try again, or email jarred@referlabs.com.au." }, { status: 500 });
  }

  // Applicant confirmation — best-effort; never fail the request if this bounces.
  const applicantHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#111827">
      <p>Hi ${esc(d.full_name.split(" ")[0])},</p>
      <p>Thanks for your interest in a home battery through Refer Labs and Apollo Energy Group. We've received your details and <strong>someone will be in touch within 2 business days</strong> to talk through your options and your $500 Refer Labs discount, applied on top of the government battery rebate.</p>
      <p>There's nothing else to do for now, and no documents to upload. If anything changes, reply to this email.</p>
      <p style="color:#6b7280;font-size:13px;margin-top:20px">Refer Labs is an independent referrer, not Apollo Energy Group and not the installer. With your consent we introduce your enquiry to Apollo; they assess it and make any offer to you directly. We may be paid a commission if you proceed, at no extra cost to you.</p>
      <p style="color:#6b7280;font-size:13px">Pepform Pty Ltd trading as Refer Labs · ABN 32 660 008 159</p>
    </div>`;
  await sendAdminNotification({ subject: "Your Apollo Energy home battery enquiry — Refer Labs", html: applicantHtml, to: d.email });

  return NextResponse.json({ ok: true });
}
