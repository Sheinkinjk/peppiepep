import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { lendingDb } from "@/lib/lending-db";
import { LEAD_STATUSES, SUBMISSION_OUTCOMES, statusTone } from "@/lib/lending-status";
import { AMOUNT_DISPLAY, REVENUE_DISPLAY, TRADING_DISPLAY, label } from "@/lib/lending-schema";
import { LENDERS, matchLenders } from "@/lib/lenders";
import {
  updateLeadStatus, updateLeadNotes, updateCommercials, addSubmission, updateSubmission, deleteSubmission,
} from "../actions";

export const metadata: Metadata = { title: "Lead detail", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const dt = (s: string | null) =>
  s ? new Date(s).toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "medium", timeStyle: "short" }) : "—";
const yn = (v: unknown) => (v === true ? "Yes" : v === false ? "No" : "—");

type Lead = Record<string, unknown>;
type Submission = Record<string, unknown> & { id: string; lender: string; outcome: string };

const inputCls = "w-full rounded-lg border border-[#d7ddd9] bg-white px-3 py-2 text-sm";
const btn = "rounded-lg bg-[#0a7c42] px-4 py-2 text-sm font-bold text-white hover:bg-[#086536]";

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const db = lendingDb();

  const { data: leadData } = await db.from("lending_leads").select("*").eq("id", id).single();
  if (!leadData) notFound();
  const lead = leadData as Lead;

  const { data: subsData } = await db.from("lead_submissions").select("*").eq("lead_id", id).order("submitted_at", { ascending: true });
  const subs = (subsData ?? []) as Submission[];

  const status = String(lead.status);
  const tone = statusTone(status);

  // Recompute the indicative match so the operator sees who to submit to.
  const matched = matchLenders({
    amount_requested: lead.amount_requested as never,
    monthly_revenue: lead.monthly_revenue as never,
    trading_since: (lead.trading_since as never) || undefined,
    credit_profile: (lead.credit_profile as never) || undefined,
    has_ato_debt: (lead.has_ato_debt as boolean | null) ?? undefined,
    product_interest: ((lead.product_interest as string[]) ?? []) as never,
  });
  const submittedLenders = new Set(subs.map((s) => s.lender.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f6f7f6] text-[#10251b]">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <Link href="/admin/leads" className="text-sm font-semibold text-[#0a7c42] hover:underline">← All leads</Link>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold">{String(lead.business_name)}</h1>
          <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: tone.bg, color: tone.fg }}>{status}</span>
        </div>
        <p className="mt-1 text-sm text-[#6e7b74]">
          Received {dt(String(lead.created_at))} · Operator notified {lead.notified_at ? dt(String(lead.notified_at)) : <span className="font-semibold text-amber-600">not sent</span>}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: details */}
          <div className="space-y-6">
            <Card title="What they need">
              <Row k="Amount" v={AMOUNT_DISPLAY[lead.amount_requested as keyof typeof AMOUNT_DISPLAY] ?? String(lead.amount_requested)} />
              <Row k="Purpose" v={`${label(String(lead.loan_purpose).split(":")[0])}${String(lead.loan_purpose).includes(":") ? " — " + String(lead.loan_purpose).split(":").slice(1).join(":").trim() : ""}`} />
              <Row k="Urgency" v={label(lead.urgency as string)} />
              <Row k="Products" v={((lead.product_interest as string[]) ?? []).map(label).join(", ") || "—"} />
              <Row k="Security offered" v={yn(lead.security_available)} />
            </Card>

            <Card title="Business">
              <Row k="Name" v={String(lead.business_name)} />
              <Row k="ABN" v={(lead.abn as string) || "—"} />
              <Row k="Structure" v={label(lead.entity_type as string)} />
              <Row k="Industry" v={(lead.industry as string) || "—"} />
              <Row k="State" v={(lead.state as string) || "—"} />
              <Row k="Trading" v={lead.trading_since ? TRADING_DISPLAY[lead.trading_since as keyof typeof TRADING_DISPLAY] : "—"} />
              <Row k="Website" v={(lead.website as string) || "—"} />
            </Card>

            <Card title="Financials">
              <Row k="Monthly revenue" v={REVENUE_DISPLAY[lead.monthly_revenue as keyof typeof REVENUE_DISPLAY] ?? String(lead.monthly_revenue)} />
              <Row k="Avg bank balance" v={(lead.avg_bank_balance as string) || "—"} />
              <Row k="Existing loans" v={yn(lead.has_existing_loans)} />
              {lead.has_existing_loans ? <Row k="Loan detail" v={(lead.existing_loan_detail as string) || "—"} /> : null}
              <Row k="Credit profile" v={label(lead.credit_profile as string)} />
              <Row k="ATO debt" v={yn(lead.has_ato_debt)} />
              {lead.has_ato_debt ? <Row k="ATO band" v={label(lead.ato_debt_band as string)} /> : null}
            </Card>

            <Card title="Contact">
              <Row k="Name" v={`${String(lead.first_name)} ${String(lead.last_name)}`} />
              <Row k="Email" v={<a href={`mailto:${String(lead.email)}`} className="text-[#0a7c42] hover:underline">{String(lead.email)}</a>} />
              <Row k="Phone" v={<a href={`tel:${String(lead.phone)}`} className="text-[#0a7c42] hover:underline">{String(lead.phone)}</a>} />
              <Row k="Preferred time" v={label(lead.preferred_contact as string)} />
            </Card>

            <Card title="Consent & attribution">
              <Row k="Privacy consent" v={yn(lead.consent_privacy)} />
              <Row k="Contact consent" v={yn(lead.consent_contact)} />
              <Row k="Consent version" v={String(lead.consent_text_version)} />
              <Row k="Consent IP" v={(lead.consent_ip as string) || "—"} />
              <Row k="Source page" v={(lead.source_page as string) || "—"} />
              <Row k="Referrer" v={(lead.referrer as string) || "—"} />
              <Row k="UTM" v={[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || "—"} />
            </Card>

            {/* Submission tracker */}
            <Card title="Lender submissions">
              {subs.length === 0 && <p className="text-sm text-[#6e7b74]">No submissions logged yet.</p>}
              <div className="space-y-4">
                {subs.map((s) => (
                  <form key={s.id} action={updateSubmission} className="rounded-xl border border-[#e5e9e7] p-3">
                    <input type="hidden" name="submission_id" value={s.id} />
                    <input type="hidden" name="lead_id" value={id} />
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold">{s.lender}</p>
                      <span className="text-xs text-[#6e7b74]">{dt(String(s.submitted_at))}</span>
                    </div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <label className="text-xs font-semibold text-[#6e7b74]">Outcome
                        <select name="outcome" defaultValue={s.outcome} className={`mt-1 ${inputCls}`}>
                          {SUBMISSION_OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </label>
                      <label className="text-xs font-semibold text-[#6e7b74]">Lender ref
                        <input name="lender_ref" defaultValue={(s.lender_ref as string) || ""} className={`mt-1 ${inputCls}`} />
                      </label>
                      <label className="text-xs font-semibold text-[#6e7b74]">Offer amount
                        <input name="offer_amount" inputMode="decimal" defaultValue={(s.offer_amount as number | null) ?? ""} className={`mt-1 ${inputCls}`} />
                      </label>
                      <label className="text-xs font-semibold text-[#6e7b74]">Offer rate
                        <input name="offer_rate" defaultValue={(s.offer_rate as string) || ""} placeholder="e.g. 16.9% p.a." className={`mt-1 ${inputCls}`} />
                      </label>
                    </div>
                    <label className="mt-2 block text-xs font-semibold text-[#6e7b74]">Notes
                      <input name="notes" defaultValue={(s.notes as string) || ""} className={`mt-1 ${inputCls}`} />
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <button type="submit" className={btn}>Save</button>
                      <button type="submit" formAction={deleteSubmission} className="text-xs font-semibold text-red-600 hover:underline">Delete</button>
                    </div>
                  </form>
                ))}
              </div>

              {/* Add a submission */}
              <form action={addSubmission} className="mt-4 rounded-xl border border-dashed border-[#c7cfc9] p-3">
                <input type="hidden" name="lead_id" value={id} />
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#9aa39c]">Log a new submission</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-[#6e7b74]">Lender
                    <input name="lender" list="panel-lenders" required placeholder="Lender name" className={`mt-1 ${inputCls}`} />
                    <datalist id="panel-lenders">{LENDERS.map((l) => <option key={l.slug} value={l.name} />)}</datalist>
                  </label>
                  <label className="text-xs font-semibold text-[#6e7b74]">Lender ref (optional)
                    <input name="lender_ref" className={`mt-1 ${inputCls}`} />
                  </label>
                </div>
                <label className="mt-2 block text-xs font-semibold text-[#6e7b74]">Notes (optional)
                  <input name="notes" className={`mt-1 ${inputCls}`} />
                </label>
                <button type="submit" className={`mt-3 ${btn}`}>Add submission</button>
              </form>
            </Card>
          </div>

          {/* Right rail: controls */}
          <aside className="space-y-5">
            <Card title="Status">
              <form action={updateLeadStatus} className="space-y-2">
                <input type="hidden" name="lead_id" value={id} />
                <select name="status" defaultValue={status} className={inputCls}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button type="submit" className={`${btn} w-full`}>Update status</button>
              </form>
            </Card>

            <Card title="Suggested lenders">
              {matched.length === 0 && <p className="text-sm text-[#6e7b74]">No panel lenders matched the stated criteria — review manually.</p>}
              <ul className="space-y-1.5 text-sm">
                {matched.map((l) => (
                  <li key={l.slug} className="flex items-center justify-between">
                    <span>{l.name}{l.afiaCodeSignatory ? " (AFIA)" : ""}</span>
                    {submittedLenders.has(l.name.toLowerCase())
                      ? <span className="text-xs font-semibold text-[#0a7c42]">submitted</span>
                      : <span className="text-xs text-[#9aa39c]">not yet</span>}
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Commercials">
              <form action={updateCommercials} className="space-y-2">
                <input type="hidden" name="lead_id" value={id} />
                <label className="block text-xs font-semibold text-[#6e7b74]">Settled amount
                  <input name="settled_amount" inputMode="decimal" defaultValue={(lead.settled_amount as number | null) ?? ""} className={`mt-1 ${inputCls}`} />
                </label>
                <label className="block text-xs font-semibold text-[#6e7b74]">Commission expected
                  <input name="commission_expected" inputMode="decimal" defaultValue={(lead.commission_expected as number | null) ?? ""} className={`mt-1 ${inputCls}`} />
                </label>
                <label className="block text-xs font-semibold text-[#6e7b74]">Commission received
                  <input name="commission_received" inputMode="decimal" defaultValue={(lead.commission_received as number | null) ?? ""} className={`mt-1 ${inputCls}`} />
                </label>
                <button type="submit" className={`${btn} w-full`}>Save commercials</button>
              </form>
            </Card>

            <Card title="Internal notes">
              <form action={updateLeadNotes} className="space-y-2">
                <input type="hidden" name="lead_id" value={id} />
                <textarea name="internal_notes" rows={5} defaultValue={(lead.internal_notes as string) || ""} className={inputCls} />
                <button type="submit" className={`${btn} w-full`}>Save notes</button>
              </form>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
      <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3 border-b border-[#f1f4f2] py-1.5 text-sm last:border-0">
      <span className="text-[#6e7b74]">{k}</span>
      <span className="font-medium text-[#10251b]">{v}</span>
    </div>
  );
}
