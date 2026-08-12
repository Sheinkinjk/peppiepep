"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";

/**
 * Home-battery payback estimator.
 *
 * Honesty rules baked in:
 * - Illustrative only. Every figure is derived from the reader's own inputs plus
 *   clearly-stated, editable assumptions. No fixed price is asserted as fact.
 * - The federal rebate is estimated from the tiered taper using an INDICATIVE base
 *   rate that floats with the STC market (matches /home-battery-rebate-australia).
 * - The result is a starting estimate; the real number is a quote for the reader's
 *   home. Not financial advice.
 */

const GREEN = "#0a7c42";

// Federal Cheaper Home Batteries rebate, indicative $/usable kWh (floats with the
// STC spot price). Full rate to 14kWh, 60% 14-28kWh, 15% 28-50kWh. Kept in sync
// with /home-battery-rebate-australia; if that base rate changes, change it here too.
const REBATE_BASE = 252;
function estimateRebate(kwh: number): number {
  const t1 = Math.min(kwh, 14) * REBATE_BASE;
  const t2 = Math.max(0, Math.min(kwh, 28) - 14) * REBATE_BASE * 0.6;
  const t3 = Math.max(0, Math.min(kwh, 50) - 28) * REBATE_BASE * 0.15;
  return Math.round(t1 + t2 + t3);
}

// Indicative installed cost per usable kWh (before rebate), midpoints of researched
// 2026 industry ranges: bigger systems cost less per kWh.
function costPerKwh(kwh: number): number {
  if (kwh <= 13) return 900;
  if (kwh <= 20) return 780;
  return 585;
}

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-AU");

export default function BatteryCalc() {
  const [size, setSize] = useState(13);            // usable kWh
  const [shifted, setShifted] = useState(10);      // kWh/day moved from grid to stored
  const [peak, setPeak] = useState(40);            // c/kWh peak grid rate
  const [feedin, setFeedin] = useState(5);         // c/kWh solar feed-in rate
  const [custom, setCustom] = useState<string>(""); // optional: reader's own quote (after rebate)

  const grossCost = size * costPerKwh(size);
  const rebate = estimateRebate(size);
  const estNet = Math.max(0, grossCost - rebate);
  const customNum = parseFloat(custom.replace(/[^0-9.]/g, ""));
  const netCost = custom && !Number.isNaN(customNum) && customNum > 0 ? customNum : estNet;

  // Each kWh you store and self-use instead of exporting is worth the peak buy rate
  // minus the feed-in you gave up. Cap the shifted amount at the battery's usable size.
  const effShift = Math.min(shifted, size);
  const valuePerKwh = Math.max(0, peak - feedin) / 100;
  const annualSaving = Math.round(effShift * 365 * valuePerKwh);
  const paybackYears = annualSaving > 0 ? netCost / annualSaving : 0;
  const tenYearNet = annualSaving * 10 - netCost;

  const reset = () => { setSize(13); setShifted(10); setPeak(40); setFeedin(5); setCustom(""); };

  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Inputs */}
        <div className="space-y-6">
          <Slider label="Battery size" value={size} min={5} max={30} step={1} unit="kWh usable"
            onChange={setSize} hint="Most homes land around 10 to 14kWh. The rebate pays the full rate only to 14kWh." />

          <Slider label="Energy shifted from the grid each day" value={shifted} min={2} max={30} step={1} unit="kWh/day"
            onChange={setShifted} hint="How much you would store from solar and use at night instead of buying. Usually close to, but not more than, your battery size." />

          <Slider label="Peak grid electricity rate" value={peak} min={20} max={60} step={1} unit="c/kWh"
            onChange={setPeak} hint="What you pay to buy a unit of power at peak. Check your bill." />

          <Slider label="Solar feed-in tariff" value={feedin} min={0} max={20} step={1} unit="c/kWh"
            onChange={setFeedin} hint="What you get for exporting solar. The lower this is, the more a battery is worth." />

          <div>
            <label className="block text-sm font-semibold text-[#10251b]">
              Have a quote? Enter the installed price after rebate <span className="font-normal text-[#9aa39c]">(optional)</span>
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[#9aa39c]">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder={estNet.toLocaleString("en-AU")}
                className="w-full rounded-lg border border-[#e5e9e7] px-3 py-2 text-sm focus:border-[#0a7c42] focus:outline-none"
              />
            </div>
            <p className="mt-1.5 text-xs text-[#9aa39c]">Leave blank to use our indicative estimate for this size.</p>
          </div>

          <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-[#0a7c42]/20 bg-[#e8f5ee] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Estimated payback</p>
          <p className="mt-2 text-4xl font-black text-[#10251b]">
            {paybackYears > 0 ? `${paybackYears.toFixed(1)} yrs` : "—"}
          </p>
          <p className="mt-1 text-sm text-[#3d4b44]">
            on an estimated {fmt(netCost)} net cost{!custom && " (after an indicative federal rebate)"}.
          </p>

          <dl className="mt-6 space-y-3 border-t border-[#0a7c42]/15 pt-5 text-sm">
            {!custom && (
              <>
                <Row k="Installed cost (before rebate)" v={fmt(grossCost)} />
                <Row k="Estimated federal rebate" v={"− " + fmt(rebate)} accent />
                <Row k="Net cost" v={fmt(netCost)} bold />
              </>
            )}
            <Row k="Estimated annual saving" v={fmt(annualSaving)} />
            <Row k="Net position after 10 years" v={(tenYearNet >= 0 ? "+" : "−") + fmt(Math.abs(tenYearNet))} bold accent={tenYearNet >= 0} />
          </dl>

          <Link
            href="/apollo-energy-group#register"
            data-cta="battery-calc-to-eoi"
            onClick={() => {
              // First-party intent data: the estimate this reader carried into the
              // enquiry. Consent-gated like all gtag calls.
              window.gtag?.("event", "battery_estimate", {
                battery_kwh: size,
                shifted_kwh_day: effShift,
                net_cost: netCost,
                annual_saving: annualSaving,
                payback_years: Math.round(paybackYears * 10) / 10,
                event_category: "matcher",
              });
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}
          >
            Turn this estimate into a real quote, $500 off <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2.5 text-center text-xs text-[#6e7b74]">
            Registers your interest with Apollo Energy through us; they quote from your actual usage.{" "}
            <a href={APOLLO_ENERGY_URL} target="_blank" rel="nofollow sponsored" data-cta="battery-calc-direct" className="underline">
              Or go straight to Apollo
            </a>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#6e7b74]">
            Illustrative only, from your inputs and stated assumptions. It is not a quote, a guarantee, or financial
            advice. Rebate and prices are indicative and move with the market. Your real figure depends on your home,
            usage and tariff. See the full method in our{" "}
            <Link href="/home-battery-cost-australia" className="underline">cost guide</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, unit, onChange, hint }: {
  label: string; value: number; min: number; max: number; step: number; unit: string;
  onChange: (n: number) => void; hint: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-[#10251b]">{label}</label>
        <span className="text-sm font-bold text-[#0a7c42]">{value} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#0a7c42]"
        aria-label={label}
      />
      <p className="mt-1 text-xs leading-relaxed text-[#9aa39c]">{hint}</p>
    </div>
  );
}

function Row({ k, v, bold, accent }: { k: string; v: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-[#3d4b44]">{k}</dt>
      <dd className={`${bold ? "font-bold" : "font-semibold"} ${accent ? "text-[#0a7c42]" : "text-[#10251b]"}`}>{v}</dd>
    </div>
  );
}
