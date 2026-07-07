"use client";

import { useMemo, useState } from "react";
import PolymarketCta from "@/components/polymarket/PolymarketCta";

/**
 * Polymarket profit / edge calculator.
 *
 * Uses ONLY verified mechanics: shares priced $0.00-$1.00, winners resolve to
 * $1.00 and losers to $0.00. It deliberately does NOT compute trading fees,
 * because Polymarket's taker fee is a variable formula we won't guess; a plain
 * caveat covers it. Everything shown is arithmetic from the reader's inputs,
 * not a prediction. Not financial advice.
 */

const GREEN = "#0a7c42";
const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export default function ProfitCalc() {
  const [stake, setStake] = useState(100);
  const [priceCents, setPriceCents] = useState(40); // cents, 1-99
  const [estimate, setEstimate] = useState(55); // your probability %, 1-99

  const r = useMemo(() => {
    const price = Math.min(0.99, Math.max(0.01, priceCents / 100));
    const s = Math.max(0, stake);
    const shares = s / price;
    const payoutWin = shares * 1; // each winning share = $1
    const profitWin = payoutWin - s;
    const returnPct = (1 / price - 1) * 100;
    const impliedProb = price * 100;
    const p = Math.min(0.99, Math.max(0.01, estimate / 100));
    const edge = (p - price) * 100; // percentage points
    const ev = p * payoutWin - s; // expected value at your estimate
    return { shares, payoutWin, profitWin, returnPct, impliedProb, maxLoss: s, edge, ev };
  }, [stake, priceCents, estimate]);

  const field =
    "w-full rounded-xl border border-[#e5e9e7] bg-white px-4 py-2.5 text-sm text-[#10251b] outline-none transition-colors focus:border-[#0a7c42] focus:ring-4 focus:ring-[#0a7c42]/12";

  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label htmlFor="stake" className="mb-1.5 block text-sm font-bold text-[#10251b]">Your stake (USD)</label>
            <input id="stake" type="number" min={0} step={10} value={stake} onChange={(e) => setStake(Number(e.target.value))} className={field} />
          </div>

          <div>
            <label htmlFor="price" className="mb-1.5 block text-sm font-bold text-[#10251b]">
              Share price: <span className="tabular-nums">{money(priceCents / 100)}</span>{" "}
              <span className="font-normal text-[#6e7b74]">({r.impliedProb.toFixed(0)}% implied)</span>
            </label>
            <input id="price" type="range" min={1} max={99} value={priceCents} onChange={(e) => setPriceCents(Number(e.target.value))} className="w-full accent-[#0a7c42]" />
            <div className="mt-1 flex justify-between text-[10px] text-[#9aa39c]"><span>$0.01</span><span>$0.99</span></div>
          </div>

          <div>
            <label htmlFor="estimate" className="mb-1.5 block text-sm font-bold text-[#10251b]">
              Your probability estimate: <span className="tabular-nums">{estimate}%</span>
            </label>
            <input id="estimate" type="range" min={1} max={99} value={estimate} onChange={(e) => setEstimate(Number(e.target.value))} className="w-full accent-[#0a7c42]" />
            <p className="mt-1 text-[11px] text-[#9aa39c]">How likely you think the outcome is. Sets your edge below.</p>
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Shares bought" value={r.shares.toLocaleString("en-US", { maximumFractionDigits: 0 })} />
            <Stat label="If it resolves YES" value={money(r.payoutWin)} accent />
            <Stat label="Profit if YES" value={money(r.profitWin)} accent />
            <Stat label="Return if YES" value={`${r.returnPct.toFixed(0)}%`} />
            <Stat label="Max loss (if NO)" value={money(r.maxLoss)} danger />
            <Stat label="Implied probability" value={`${r.impliedProb.toFixed(0)}%`} />
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: r.edge >= 0 ? `${GREEN}40` : "#e6c7c1", background: r.edge >= 0 ? `${GREEN}0A` : "#fbf1ef" }}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6e7b74]">Your edge</span>
              <span className="tabular-nums text-lg font-extrabold" style={{ color: r.edge >= 0 ? GREEN : "#a33b2e" }}>
                {r.edge >= 0 ? "+" : ""}{r.edge.toFixed(0)} pts
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#3d4b44]">
              Your estimate ({estimate}%) vs the market ({r.impliedProb.toFixed(0)}%). Expected value at your estimate:{" "}
              <strong className="text-[#10251b]">{money(r.ev)}</strong> per trade. Positive edge is necessary, not
              sufficient, edge must be <em>measured</em>, not assumed.
            </p>
          </div>

          <p className="text-[11px] leading-relaxed text-[#9aa39c]">
            Arithmetic from your inputs, not a prediction. Taker orders pay a fee that reduces net profit (makers
            generally pay none); this tool does not estimate fees. Not financial advice.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <PolymarketCta label="Open Polymarket to place a trade" campaign="profit-calculator" location="tool" />
      </div>
    </div>
  );
}

function Stat({ label, value, accent, danger }: { label: string; value: string; accent?: boolean; danger?: boolean }) {
  return (
    <div className="rounded-xl border border-[#e5e9e7] bg-white px-4 py-3">
      <div className="tabular-nums text-xl font-extrabold" style={{ color: danger ? "#a33b2e" : accent ? GREEN : "#10251b" }}>{value}</div>
      <div className="mt-0.5 text-[11px] leading-tight text-[#6e7b74]">{label}</div>
    </div>
  );
}
