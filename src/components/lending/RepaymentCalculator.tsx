"use client";

import { useState } from "react";
import Link from "next/link";

const GREEN = "#0a7c42";

// Standard amortised repayment (the textbook PMT formula). This is a definition:
// M = P·r·(1+r)^n / ((1+r)^n − 1), with r the periodic rate.
function pmt(ratePerPeriod: number, n: number, principal: number): number {
  if (ratePerPeriod === 0) return principal / n;
  const pow = Math.pow(1 + ratePerPeriod, n);
  return (principal * ratePerPeriod * pow) / (pow - 1);
}
function monthlyRepayment(principal: number, annualRatePct: number, months: number): number | null {
  if (principal <= 0 || months <= 0) return null;
  return pmt(annualRatePct / 100 / 12, months, principal);
}

// Effective (comparison) rate, calculated the way the Australian comparison rate is:
// the nominal annual rate at which the amount of credit equals the present value of
// every repayment INCLUDING fees (National Consumer Credit Protection Regulations
// reg 71 — an internal-rate-of-return calculation, annualised as periodic rate × 12).
// With no fees it returns the nominal rate; each fee pushes it above the nominal rate.
// It does NOT model factor-rate pricing — that isn't an interest rate at all.
function effectiveRate(
  principal: number, annualNominalPct: number, months: number,
  establishmentFee: number, monthlyFee: number,
): number | null {
  if (principal <= 0 || months <= 0) return null;
  const rNom = annualNominalPct / 100 / 12;
  const repayment = pmt(rNom, months, principal) + monthlyFee; // paid each month
  const netAdvance = principal - establishmentFee;             // cash actually received
  if (netAdvance <= 0 || repayment <= 0) return null;

  // Present value of a level stream of `repayment` for `months` at monthly rate i.
  const pv = (i: number) => (i === 0 ? repayment * months : repayment * (1 - Math.pow(1 + i, -months)) / i);
  // pv is strictly decreasing in i; bisection for pv(i) = netAdvance.
  if (pv(0) < netAdvance) return annualNominalPct; // no positive-fee case
  let lo = 0, hi = 2; // 200%/month upper bound comfortably brackets any real loan
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > netAdvance) lo = mid; else hi = mid;
  }
  return ((lo + hi) / 2) * 12 * 100; // nominal annual %, comparison-rate convention
}

const money = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

const inputCls =
  "w-full rounded-xl border border-[#e5e9e7] bg-white px-4 py-3 text-sm text-[#10251b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7c42] focus-visible:border-[#0a7c42]";

export default function RepaymentCalculator() {
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(15);
  const [months, setMonths] = useState(24);
  const [estFee, setEstFee] = useState(500);
  const [monthlyFee, setMonthlyFee] = useState(0);

  const monthly = monthlyRepayment(amount, rate, months);
  const totalRepay = monthly != null ? monthly * months + monthlyFee * months : null;
  const totalCost = totalRepay != null ? totalRepay + estFee - amount : null; // interest + all fees
  const effective = effectiveRate(amount, rate, months, estFee, monthlyFee);

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

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#10251b]">Establishment fee ($, one-off)</span>
          <input type="number" min={0} step={50} value={estFee} className={`mt-1.5 ${inputCls} tabular-nums`}
            onChange={(e) => setEstFee(Number(e.target.value))} inputMode="numeric" aria-label="One-off establishment fee in dollars" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#10251b]">Ongoing fee ($/month)</span>
          <input type="number" min={0} step={5} value={monthlyFee} className={`mt-1.5 ${inputCls} tabular-nums`}
            onChange={(e) => setMonthlyFee(Number(e.target.value))} inputMode="numeric" aria-label="Ongoing monthly fee in dollars" />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Monthly repayment" value={monthly != null ? money(monthly + monthlyFee) : "—"} emphasis />
        <Stat label="Total repaid" value={totalRepay != null ? money(totalRepay + estFee) : "—"} />
        <Stat label="Total cost of loan" value={totalCost != null ? money(totalCost) : "—"} />
        <Stat label="Effective rate (incl. fees)" value={effective != null ? `${effective.toFixed(1)}% p.a.` : "—"} emphasis />
      </div>

      <p className="mt-4 rounded-xl bg-[#f8faf9] px-4 py-3 text-xs leading-relaxed text-[#6e7b74]">
        The <strong className="text-[#10251b]">effective rate</strong> folds the establishment and ongoing fees into a single
        annual figure, the same way an Australian comparison rate is calculated, so it sits above the nominal rate whenever
        there are fees. It still can&apos;t capture <strong className="text-[#10251b]">factor-rate</strong> pricing, which
        isn&apos;t an interest rate at all, so for those products ask the lender for the total cost in dollars. Enter a
        lender&apos;s real fees above to see their true rate.
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
