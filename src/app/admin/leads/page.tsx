import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { lendingDb } from "@/lib/lending-db";
import { LEAD_STATUSES, statusTone } from "@/lib/lending-status";
import { AMOUNT_SHORT, label } from "@/lib/lending-schema";

export const metadata: Metadata = { title: "Lending leads", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic"; // always live data, never statically cached

type Lead = Record<string, unknown> & {
  id: string; created_at: string; status: string; business_name: string;
  first_name: string; last_name: string; amount_requested: string; state: string | null;
  industry: string | null; urgency: string | null; notified_at: string | null;
  commission_expected: number | null; commission_received: number | null;
};

const dt = (s: string) =>
  new Date(s).toLocaleString("en-AU", { timeZone: "Australia/Sydney", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function LeadsAdmin({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const db = lendingDb();

  let query = db.from("lending_leads").select("*").order("created_at", { ascending: false }).limit(500);
  if (status && LEAD_STATUSES.includes(status as never)) query = query.eq("status", status);
  const { data } = await query;
  const leads = (data ?? []) as Lead[];

  // Counters across all leads (not just the filtered view).
  const { data: allForCounts } = await db.from("lending_leads").select("status, commission_expected, commission_received");
  const all = (allForCounts ?? []) as { status: string; commission_expected: number | null; commission_received: number | null }[];
  const counts: Record<string, number> = {};
  for (const l of all) counts[l.status] = (counts[l.status] ?? 0) + 1;
  const pipelineCommission = all.reduce((s, l) => s + (l.commission_expected ?? 0), 0);
  const bankedCommission = all.reduce((s, l) => s + (l.commission_received ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#f6f7f6] text-[#10251b]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">Lending leads</h1>
            <p className="mt-1 text-sm text-[#6e7b74]">{all.length} total · showing {leads.length}{status ? ` with status “${status}”` : ""}</p>
          </div>
          <div className="flex gap-3 text-right">
            <Counter label="Pipeline commission" value={`$${pipelineCommission.toLocaleString("en-AU")}`} />
            <Counter label="Banked commission" value={`$${bankedCommission.toLocaleString("en-AU")}`} />
          </div>
        </div>

        {/* Status filter */}
        <div className="mt-5 flex flex-wrap gap-2">
          <FilterChip href="/admin/leads" active={!status} label={`All (${all.length})`} />
          {LEAD_STATUSES.map((s) => (
            <FilterChip key={s} href={`/admin/leads?status=${s}`} active={status === s} label={`${s} (${counts[s] ?? 0})`} tone={statusTone(s)} />
          ))}
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e5e9e7] bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f8faf9] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6e7b74]">
                <th scope="col" className="px-4 py-3">Received</th>
                <th scope="col" className="px-4 py-3">Business</th>
                <th scope="col" className="px-4 py-3">Amount</th>
                <th scope="col" className="px-4 py-3">Industry · State</th>
                <th scope="col" className="px-4 py-3">Urgency</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Notified</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-[#6e7b74]">No leads{status ? " with this status" : " yet"}.</td></tr>
              )}
              {leads.map((l) => {
                const tone = statusTone(l.status);
                return (
                  <tr key={l.id} className="border-t border-[#eef1ef] hover:bg-[#f8faf9]">
                    <td className="whitespace-nowrap px-4 py-3 text-[#6e7b74]">{dt(l.created_at)}</td>
                    <th scope="row" className="px-4 py-3 font-semibold">
                      <Link href={`/admin/leads/${l.id}`} className="text-[#0a7c42] hover:underline">{l.business_name}</Link>
                      <span className="block text-xs font-normal text-[#6e7b74]">{l.first_name} {l.last_name}</span>
                    </th>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">{AMOUNT_SHORT[l.amount_requested as keyof typeof AMOUNT_SHORT] ?? l.amount_requested}</td>
                    <td className="px-4 py-3 text-[#3d4b44]">{[l.industry, l.state].filter(Boolean).join(" · ") || "—"}</td>
                    <td className="px-4 py-3 text-[#3d4b44]">{label(l.urgency)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: tone.bg, color: tone.fg }}>{l.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6e7b74]">{l.notified_at ? "✓" : <span className="text-amber-600">not sent</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[#9aa39c]">Internal · not indexed. Showing up to 500 most-recent leads.</p>
      </div>
    </div>
  );
}

function Counter({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#e5e9e7] bg-white px-4 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9aa39c]">{label}</p>
      <p className="text-lg font-extrabold tabular-nums">{value}</p>
    </div>
  );
}

function FilterChip({ href, active, label, tone }: { href: string; active: boolean; label: string; tone?: { bg: string; fg: string } }) {
  return (
    <Link href={href}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
      style={active
        ? { borderColor: "#0a7c42", background: "#0a7c42", color: "#fff" }
        : { borderColor: "#e5e9e7", background: tone?.bg ?? "#fff", color: tone?.fg ?? "#3d4b44" }}>
      {label}
    </Link>
  );
}
