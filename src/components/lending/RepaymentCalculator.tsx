"use client";

import { useState } from "react";
import Link from "next/link";

const GREEN = "#0a7c42";

// Standard amortised repayment (the textbook PMT formula). This is a definition,
// not an improvisation: M = P·r·(1+r)^n / ((1+r)^n − 1), with r the periodic rate.
// It assumes a simple amortising loan; many business lenders price with factor
// rates or fees instead, so this is an indicative estimate only.
function monthlyRepayment(principal: number, annualRatePct: number, months: number): number | null {
  if (principal <= 0 || months <= 0) return null;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * r * pow) / (pow - 1);
}

// ─── TODO(effective-rate): DO NOT IMPROVISE ────────────────────────────────────
// The fee-inclusive effective / comparison rate (the true cost of the loan once
// establishment fees, ongoing fees and any factor-rate pricing are folded in) is
// intentionally left unimplemented. It requires the correct, agreed methodology —
// do not guess it. Until then the UI shows only nominal amortised figures and tells
// the user to confirm the real cost with the lender.
function effectiveRate(): number | null {
  return null; // TODO: implement agreed effective-rate methodology.
}

const money = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

const inputCls =
  "w-full rounded-xl border border-[#e5e9e7] bg-white px-4 py-3 text-sm text-[#10251b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7c42] focus-visible:border-[#0a7c42]";

export default function RepaymentCalculator() {
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(15);
  const [months, setMonths] = useState(24);

  const monthly = monthlyRepayment(amount, rate, months);
  const total = monthly != null ? monthly * months : null;
  const interest = total != null ? total - amount : null;
  const effective = effectiveRate();

  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-white p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-[#10251b]">Loan amount</span>
          <input type="number" min={1000} step={1000} value={amount} className={`mt-1.5 ${inputCls} tabular-nums`}
            onChange={(e) => setAmount(Number(e.target.value))} inputMode="numeric" aria-label="Loan amount in dollars" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#10251b]">Nominal rate (% p.a.)</span>
          <input type="number" min={0} step={0.1} value={rate} className={`mt-1.5 ${inputCls} tabular-nums`}
            onChange={(e) => setRate(Number(e.target.value))} inputMode="decimal" aria-label="Nominal annual interest rate" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#10251b]">Term (months)</span>
          <input type="number" min={1} max={120} step={1} value={months} className={`mt-1.5 ${inputCls} tabular-nums`}
            onChange={(e) => setMonths(Number(e.target.value))} inputMode="numeric" aria-label="Loan term in months" />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Est. monthly repayment" value={monthly != null ? money(monthly) : "—"} emphasis />
        <Stat label="Total repaid" value={total != null ? money(total) : "—"} />
        <Stat label="Total interest" value={interest != null ? money(interest) : "—"} />
      </div>

      {/* Effective / comparison rate is deliberately not shown yet — see the stub. */}
      <p className="mt-4 rounded-xl bg-[#f8faf9] px-4 py-3 text-xs leading-relaxed text-[#6e7b74]">
        {effective == null ? (
          <>These are nominal, simple-amortised estimates. They do <strong className="text-[#10251b]">not</strong> include
          establishment fees, ongoing fees, or factor-rate pricing, so the true cost of a business loan is usually higher
          than the interest shown here. Ask each lender for the total cost of the loan in dollars, and for a comparison
          rate if they publish one, before deciding.</>
        ) : (
          <>Estimated effective rate: {effective}% p.a.</>
        )}
      </p>

      <p className="mt-3 text-xs text-[#6e7b74]">
        Indicative only, not a quote or an offer of credit.{" "}
        <Link href="/what-a-business-loan-actually-costs" className="underline hover:text-[#10251b]">How business loan pricing really works</Link>.
      </p>

      <div className="mt-6">
        <Link href="/business-loans#enquire"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
          style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
          Check my real options
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: emphasis ? `${GREEN}40` : "#e5e9e7", background: emphasis ? `${GREEN}08` : "#fff" }}>
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9aa39c]">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums text-[#10251b]">{value}</p>
    </div>
  );
}
