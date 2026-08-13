import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendAdminNotification, escapeHtml as esc } from "@/lib/email-notifications";
import { storeLead, markLeadNotified } from "@/lib/store-lead";

export const runtime = "nodejs";

const OPERATOR_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || "jarred@referlabs.com.au";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trim = (n: number) => z.string().trim().max(n);

// Optional capture from the business-software recommender. No sensitive data;
// gives the team intelligence on what businesses are trying to solve.
const schema = z.object({
  email: z.string().trim().max(160).regex(emailRe, "Enter a valid email"),
  goals: z.array(trim(80)).max(12).default([]),
  size: trim(40).optional().or(z.literal("")),
  priority: trim(40).optional().or(z.literal("")),
  recommended: z.array(trim(80)).max(30).default([]),
  business_name: trim(160).optional().or(z.literal("")),
  notes: trim(1000).optional().or(z.literal("")),
  company_website_confirm: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Please check your email and try again.", issues: parsed.error.issues }, { status: 400 });
  const d = parsed.data;
  if (d.company_website_confirm) return NextResponse.json({ ok: true }); // drop bots silently

  // Backstop first: persist before emailing so a Resend failure can't lose the lead.
  const saved = await storeLead({
    type: "software_quiz",
    name: d.business_name,
    email: d.email,
    source_page: "/business-software",
    payload: d,
  });

  const row = (k: string, v: string) => v ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${esc(k)}</td><td style="padding:4px 0;color:#111827;font-weight:600">${esc(v)}</td></tr>` : "";
  const operatorHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#0a7c42;margin:0 0 4px">Business software shortlist request</h2>
      <p style="color:#6b7280;margin:0 0 16px">From the /business-software recommender.</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${row("Email", d.email)}${row("Business", d.business_name || "")}${row("Goals", d.goals.join(", "))}
        ${row("Size", d.size || "")}${row("Priority", d.priority || "")}${row("Recommended", d.recommended.join(", "))}
        ${row("Notes", d.notes || "")}
      </table>
    </div>`;
  const opRes = await sendAdminNotification({ subject: `[SOFTWARE QUIZ] ${d.email} · ${d.goals.slice(0, 3).join(", ")}`, html: operatorHtml, to: OPERATOR_EMAIL });
  if (!opRes.success && !saved.stored) return NextResponse.json({ ok: false, error: "Could not send. Please try again, or email jarred@referlabs.com.au." }, { status: 500 });
  if (opRes.success && saved.id) await markLeadNotified(saved.id);

  const recs = d.recommended.length ? d.recommended.join(", ") : "your shortlist";
  const applicantHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#111827">
      <p>Thanks for using the Refer Labs business-software finder.</p>
      <p>Based on what you told us, your shortlist was: <strong>${esc(recs)}</strong>. You can revisit the recommendations and read our independent reviews any time at referlabs.com.au/business-software.</p>
      <p>If you'd like a hand narrowing it down, just reply to this email.</p>
      <p style="color:#6b7280;font-size:13px;margin-top:20px">Refer Labs publishes independent comparisons. Some links are disclosed affiliate links; we may earn a commission at no extra cost to you, and it never changes a recommendation.</p>
      <p style="color:#6b7280;font-size:13px">Pepform Pty Ltd trading as Refer Labs · ABN 32 660 008 159</p>
    </div>`;
  await sendAdminNotification({ subject: "Your business-software shortlist | Refer Labs", html: applicantHtml, to: d.email });

  return NextResponse.json({ ok: true });
}
