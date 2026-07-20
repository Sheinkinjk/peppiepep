import { escapeHtml } from "./email-notifications";
import type { Lender } from "./lenders";
import {
  type LeadInput,
  AMOUNT_SHORT, AMOUNT_DISPLAY, REVENUE_DISPLAY, TRADING_DISPLAY, label,
} from "./lending-schema";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";

const urgencySubject: Record<string, string> = {
  today: "URGENT", this_week: "This week", this_month: "This month", exploring: "Exploring",
};

const esc = (v: string | null | undefined) => escapeHtml(v ?? "") || "—";

// Operator subject built for phone triage:
//   [LEAD] $100-250k · Construction · VIC · Urgent — Smith Building Co
export function operatorSubject(lead: LeadInput): string {
  const parts = [
    AMOUNT_SHORT[lead.amount_requested],
    lead.industry?.trim() || "Industry n/a",
    lead.state || "State n/a",
    urgencySubject[lead.urgency ?? "exploring"] ?? "Exploring",
  ];
  return `[LEAD] ${parts.join(" · ")} — ${lead.business_name.trim()}`;
}

function row(k: string, v: string): string {
  return `<tr><td style="padding:4px 12px 4px 0;color:#6e7b74;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;color:#10251b">${esc(v)}</td></tr>`;
}

function section(title: string, rows: string): string {
  return `<h3 style="margin:22px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:#0a7c42">${esc(title)}</h3><table style="border-collapse:collapse;font-size:14px;width:100%">${rows}</table>`;
}

export function buildOperatorEmail(lead: LeadInput, leadId: string, matched: Lender[]): string {
  const purpose = lead.loan_purpose_detail?.trim()
    ? `${label(lead.loan_purpose)} — ${lead.loan_purpose_detail.trim()}`
    : label(lead.loan_purpose);
  const products = (lead.product_interest ?? []).map(label).join(", ") || "—";
  const matchedList = matched.length
    ? matched.map((l) => `${l.name}${l.afiaCodeSignatory ? " (AFIA)" : ""}`).join(", ")
    : "None matched on stated criteria — review manually";

  return `<!DOCTYPE html><html><body style="margin:0;background:#f5f8f6;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e9e7;border-radius:14px;padding:28px">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0a7c42">New lending lead</p>
      <h1 style="margin:0 0 2px;font-size:22px;color:#10251b">${esc(lead.business_name)}</h1>
      <p style="margin:0;color:#3d4b44;font-size:14px">${esc(AMOUNT_DISPLAY[lead.amount_requested])} · ${esc(label(lead.urgency))}</p>

      <div style="margin:18px 0;padding:12px 16px;background:#e8f5ee;border-radius:10px;font-size:14px;color:#10251b">
        <strong>Likely lenders (${matched.length}):</strong> ${esc(matchedList)}
      </div>

      ${section("What they need", row("Amount", AMOUNT_DISPLAY[lead.amount_requested]) + row("Purpose", purpose) + row("Urgency", label(lead.urgency)) + row("Products", products) + row("Security", lead.security_available == null ? "—" : lead.security_available ? "Yes" : "No"))}
      ${section("Business", row("Name", lead.business_name) + row("ABN", lead.abn || "—") + row("Entity", label(lead.entity_type)) + row("Industry", lead.industry || "—") + row("State", lead.state || "—") + row("Trading", lead.trading_since ? TRADING_DISPLAY[lead.trading_since] : "—") + row("Website", lead.website || "—"))}
      ${section("Financials", row("Monthly revenue", REVENUE_DISPLAY[lead.monthly_revenue]) + row("Avg bank balance", lead.avg_bank_balance || "—") + row("Existing loans", lead.has_existing_loans == null ? "—" : lead.has_existing_loans ? "Yes" : "No") + (lead.has_existing_loans ? row("Loan detail", lead.existing_loan_detail || "—") : "") + row("Credit profile", label(lead.credit_profile)) + row("ATO debt", lead.has_ato_debt == null ? "—" : lead.has_ato_debt ? "Yes" : "No") + (lead.has_ato_debt ? row("ATO band", label(lead.ato_debt_band)) : ""))}
      ${section("Contact", row("Name", `${lead.first_name} ${lead.last_name}`) + row("Email", lead.email) + row("Phone", lead.phone) + row("Preferred", label(lead.preferred_contact)))}
      ${section("Attribution", row("Source page", lead.source_page || "—") + row("Referrer", lead.referrer || "—") + row("UTM", [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || "—"))}

      <a href="${SITE}/admin/leads/${esc(leadId)}" style="display:inline-block;margin-top:22px;background:#0a7c42;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:11px 20px;border-radius:10px">Open lead in admin →</a>
    </div>
  </body></html>`;
}

export function buildApplicantEmail(lead: LeadInput, matched: Lender[]): string {
  const lenderNames = matched.length ? matched.map((l) => l.name).join(", ") : "our panel of approved lenders";
  return `<!DOCTYPE html><html><body style="margin:0;background:#f5f8f6;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e9e7;border-radius:14px;padding:28px;color:#3d4b44;font-size:15px;line-height:1.6">
      <p style="margin:0 0 16px">Hi ${esc(lead.first_name)},</p>
      <p style="margin:0 0 16px">Thanks for your business finance enquiry with Refer Labs. We've received your details for <strong style="color:#10251b">${esc(lead.business_name)}</strong>.</p>
      <p style="margin:0 0 16px">Jarred from Refer Labs will review your enquiry and be in touch <strong style="color:#10251b">within one business day</strong> to talk through your options.</p>
      <p style="margin:0 0 16px">Based on what you've told us, your details may be shared with the following lenders on our panel so they can assess your application: <strong style="color:#10251b">${esc(lenderNames)}</strong>. We only share them with lenders relevant to your enquiry, and only as you consented.</p>
      <p style="margin:0 0 16px">If anything changes or you have a question in the meantime, just reply to this email.</p>
      <p style="margin:24px 0 0;color:#6e7b74;font-size:13px">Refer Labs · Independent Australian comparison publisher<br>How we make money: ${SITE}/how-we-make-money</p>
    </div>
  </body></html>`;
}
