"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Affiliate earnings estimator.
 *
 * Rules baked in:
 * - Everything is an ILLUSTRATIVE estimate from the visible assumptions below,
 *   never a promise or prediction of income. Real results vary widely and can
 *   be zero; the page says so plainly.
 * - No partner-specific payout claims: commission bands are our own modelling
 *   ranges for a CATEGORY, clearly labelled as assumptions.
 * - The conversion goal is the $799 Blueprint (a real, in-house price).
 */

const GREEN = "#0a7c42";

const AUDIENCES = [
  { key: "tiny", label: "Under 1,000", mid: 600 },
  { key: "small", label: "1,000 to 5,000", mid: 3000 },
  { key: "mid", label: "5,000 to 20,000", mid: 12000 },
  { key: "large", label: "20,000 to 100,000", mid: 55000 },
  { key: "xl", label: "100,000+", mid: 150000 },
] as const;

const CHANNELS = [
  { key: "seo", label: "SEO / a website", note: "People arrive already searching", ctr: 0.06 },
  { key: "email", label: "Email list", note: "Direct and owned, strong intent", ctr: 0.035 },
  { key: "social", label: "Social audience", note: "Bigger reach, lower click-through", ctr: 0.01 },
] as const;

const NICHES = [
  { key: "saas", label: "Software & SaaS", lo: 40, hi: 120, note: "often recurring monthly commissions" },
  { key: "finance", label: "Finance & fintech", lo: 30, hi: 100, note: "high payouts, tight compliance" },
  { key: "health", label: "Health & wellness", lo: 40, hi: 90, note: "strong AU demand, strict ad rules" },
  { key: "creator", label: "Creator tools", lo: 15, hi: 40, note: "smaller tickets, easy conversions" },
  { key: "general", label: "General / mixed", lo: 20, hi: 60, note: "a blended middle-ground band" },
] as const;

const CONV_LO = 0.015;
const CONV_HI = 0.04;

const fmt = (n: number) =>
  n >= 1000 ? `$${Math.round(n / 100) * 100 >= 10000 ? (Math.round(n / 100) * 100).toLocaleString("en-AU") : (Math.round(n / 50) * 50).toLocaleString("en-AU")}` : `$${Math.max(0, Math.round(n / 5) * 5)}`;

export default function EarningsCalc() {
  const [aud, setAud] = useState<(typeof AUDIENCES)[number]>(AUDIENCES[1]);
  const [ch, setCh] = useState<(typeof CHANNELS)[number]>(CHANNELS[0]);
  const [niche, setNiche] = useState<(typeof NICHES)[number]>(NICHES[0]);

  const { lo, hi } = useMemo(() => {
    const clicks = aud.mid * ch.ctr;
    const lo = clicks * CONV_LO * niche.lo;
    const hi = clicks * CONV_HI * niche.hi;
    if (typeof window !== "undefined") {
      window.gtag?.("event", "earnings_calc_result", { audience: aud.key, channel: ch.key, niche: niche.key });
    }
    return { lo, hi };
  }, [aud, ch, niche]);

  const selBtn = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42] ${
      active ? "border-[#0a7c42] bg-white shadow-sm" : "border-[#e5e9e7] bg-white/60"
    }`;

  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <fieldset>
            <legend className="text-sm font-bold text-[#10251b] mb-3">Monthly audience (visitors, subscribers or engaged followers)</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AUDIENCES.map((a) => (
                <button key={a.key} type="button" className={selBtn(aud.key === a.key)} onClick={() => setAud(a)}>
                  <span className="text-xs font-semibold text-[#10251b]">{a.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-[#10251b] mb-3">Main channel</legend>
            <div className="grid gap-2">
              {CHANNELS.map((c) => (
                <button key={c.key} type="button" className={selBtn(ch.key === c.key)} onClick={() => setCh(c)}>
                  <span className="text-xs font-semibold text-[#10251b] block">{c.label}</span>
                  <span className="text-[11px] text-[#6e7b74]">{c.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-[#10251b] mb-3">Niche</legend>
            <div className="grid gap-2">
              {NICHES.map((n) => (
                <button key={n.key} type="button" className={selBtn(niche.key === n.key)} onClick={() => setNiche(n)}>
                  <span className="text-xs font-semibold text-[#10251b] block">{n.label}</span>
                  <span className="text-[11px] text-[#6e7b74]">{n.note}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col">
          <div className="rounded-2xl border bg-white p-6 sm:p-7" style={{ borderColor: `${GREEN}30` }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c] mb-2">
              Illustrative monthly range
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#10251b] tabular-nums">
              {fmt(lo)} <span className="text-[#9aa39c] font-semibold text-xl">to</span> {fmt(hi)}
            </p>
            <p className="mt-1 text-xs text-[#6e7b74] tabular-nums">
              Roughly {fmt(lo * 12)} to {fmt(hi * 12)} a year, if performance held.
            </p>

            <details className="mt-5 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3">
              <summary className="cursor-pointer list-none text-xs font-bold text-[#10251b]">
                The assumptions behind this number +
              </summary>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-[11px] leading-relaxed text-[#3d4b44]">
                <li>Audience midpoint: {aud.mid.toLocaleString("en-AU")} per month</li>
                <li>Click-through to offers ({ch.label.toLowerCase()}): {(ch.ctr * 100).toFixed(1)}%</li>
                <li>Conversion on the partner site: {CONV_LO * 100}% to {CONV_HI * 100}%</li>
                <li>Average commission ({niche.label}): ${niche.lo} to ${niche.hi} per sale, our modelling band, not any specific program&apos;s rate</li>
              </ul>
            </details>

            <p className="mt-4 text-[11px] leading-relaxed text-[#9aa39c]">
              An illustrative estimate from the assumptions above, not a prediction or promise of income.
              Real results vary widely and can be zero. Not financial advice.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border px-5 py-5" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
            <p className="text-sm leading-relaxed text-[#10251b] mb-3">
              The maths only works with programs that fit your audience. The Referral Growth Blueprint
              matches you to them: 250+ vetted programs plus a personalised strategy brief, $799 AUD.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/referral-blueprint"
                data-cta="earnings-calc-blueprint"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
                style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}
              >
                Get the Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/affiliate-programs-australia"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: "#ffffff" }}
              >
                Browse programs free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
