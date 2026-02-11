"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Calculator,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const scenarios = [
  {
    label: "B2B SaaS",
    avgDealSize: 15000,
    closeCycle: "30-60 days",
    partnerMultiplier: 1.2,
    description: "Average ACV $15K, 30-60 day sales cycle",
  },
  {
    label: "Fintech",
    avgDealSize: 25000,
    closeCycle: "60-90 days",
    partnerMultiplier: 1.0,
    description: "Average ACV $25K, 60-90 day sales cycle",
  },
  {
    label: "Healthtech",
    avgDealSize: 20000,
    closeCycle: "60-90 days",
    partnerMultiplier: 0.9,
    description: "Average ACV $20K, 60-90 day sales cycle",
  },
  {
    label: "E-commerce Tech",
    avgDealSize: 10000,
    closeCycle: "14-30 days",
    partnerMultiplier: 1.4,
    description: "Average ACV $10K, 14-30 day sales cycle",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ROICalculatorPage() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [monthlyRetainer, setMonthlyRetainer] = useState(5000);
  const [commissionRate, setCommissionRate] = useState(15);
  const [avgDealSize, setAvgDealSize] = useState(15000);

  const scenario = scenarios[selectedScenario];

  // 90-day projections based on typical Refer Labs pilot outcomes
  const prospectConversations = Math.round(15 * scenario.partnerMultiplier);
  const partnerDiscussions = Math.round(5 * scenario.partnerMultiplier);
  const dealsInPipeline = Math.round(3 * scenario.partnerMultiplier);
  const expectedCloses90 = Math.max(1, Math.round(dealsInPipeline * 0.33));

  const totalRetainer90 = monthlyRetainer * 3;
  const expectedRevenue90 = expectedCloses90 * avgDealSize;
  const commissionPaid90 = expectedRevenue90 * (commissionRate / 100);
  const totalCost90 = totalRetainer90 + commissionPaid90;
  const netReturn90 = expectedRevenue90 - totalCost90;
  const roi90 = totalCost90 > 0 ? ((expectedRevenue90 / totalCost90) * 100).toFixed(0) : "0";

  // 12-month projection (pipeline compounds)
  const expectedCloses12 = expectedCloses90 * 5; // Pipeline compounds after 90 days
  const expectedRevenue12 = expectedCloses12 * avgDealSize;
  const totalRetainer12 = monthlyRetainer * 12;
  const commissionPaid12 = expectedRevenue12 * (commissionRate / 100);
  const totalCost12 = totalRetainer12 + commissionPaid12;
  const netReturn12 = expectedRevenue12 - totalCost12;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-10">
        {/* Hero */}
        <header className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
            <Calculator className="h-4 w-4" />
            Australia Expansion Estimator
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white max-w-3xl mx-auto">
            Estimate Your Australia Expansion ROI
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            See what a 90-day pilot with Refer Labs could look like for your business.
            Adjust the inputs below to model your scenario.
          </p>
        </header>

        {/* Calculator */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mb-16">
          {/* Inputs */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Your Inputs</h2>

            {/* Industry */}
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-3 block">Industry</label>
              <div className="grid grid-cols-2 gap-2">
                {scenarios.map((s, idx) => (
                  <button
                    key={s.label}
                    onClick={() => {
                      setSelectedScenario(idx);
                      setAvgDealSize(s.avgDealSize);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      idx === selectedScenario
                        ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">{scenario.description}</p>
            </div>

            {/* Average Deal Size */}
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Average Deal Size (AUD)
              </label>
              <input
                type="number"
                value={avgDealSize}
                onChange={(e) => setAvgDealSize(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Monthly Retainer */}
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Monthly Retainer (AUD)
              </label>
              <input
                type="range"
                min={3000}
                max={20000}
                step={500}
                value={monthlyRetainer}
                onChange={(e) => setMonthlyRetainer(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$3,000</span>
                <span className="text-cyan-300 font-semibold">{formatCurrency(monthlyRetainer)}/mo</span>
                <span>$20,000</span>
              </div>
            </div>

            {/* Commission Rate */}
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Commission Rate
              </label>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5%</span>
                <span className="text-cyan-300 font-semibold">{commissionRate}%</span>
                <span>30%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* 90-Day Pilot */}
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.02] to-transparent p-8">
              <h2 className="text-xl font-bold text-white mb-6">90-Day Pilot Projection</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <Users className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{prospectConversations}</p>
                  <p className="text-xs text-slate-400">Prospect conversations</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <TrendingUp className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{partnerDiscussions}</p>
                  <p className="text-xs text-slate-400">Partner discussions</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <DollarSign className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{dealsInPipeline}</p>
                  <p className="text-xs text-slate-400">Deals in pipeline</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{expectedCloses90}</p>
                  <p className="text-xs text-slate-400">Expected closes</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Expected revenue</span>
                  <span className="font-bold text-white">{formatCurrency(expectedRevenue90)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Total retainer (3 months)</span>
                  <span className="font-bold text-white">{formatCurrency(totalRetainer90)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Commission paid</span>
                  <span className="font-bold text-white">{formatCurrency(commissionPaid90)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Total cost</span>
                  <span className="font-bold text-white">{formatCurrency(totalCost90)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white font-semibold">Net return</span>
                  <span className={`font-black text-xl ${netReturn90 >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {formatCurrency(netReturn90)}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-center">
                <p className="text-sm text-slate-300">90-day ROI</p>
                <p className="text-3xl font-black text-cyan-300">{roi90}%</p>
              </div>
            </div>

            {/* 12-Month Projection */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-white mb-4">12-Month Projection</h3>
              <p className="text-sm text-slate-400 mb-4">Pipeline compounds after the 90-day pilot as relationships mature and partners activate.</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xl font-black text-white">{formatCurrency(expectedRevenue12)}</p>
                  <p className="text-xs text-slate-400">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-white">{formatCurrency(totalCost12)}</p>
                  <p className="text-xs text-slate-400">Total cost</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-black ${netReturn12 >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {formatCurrency(netReturn12)}
                  </p>
                  <p className="text-xs text-slate-400">Net return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mb-16">
          <p className="text-sm text-slate-500 italic max-w-2xl mx-auto">
            These projections are illustrative estimates based on typical outcomes.
            Actual results depend on your product, market, and engagement scope.
            Book a call for a custom estimate.
          </p>
        </div>

        {/* CTA */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.02] to-transparent p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want a Custom Estimate for Your Business?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Book a call and we will model the expected pipeline, revenue, and ROI specific to your product and market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#00838F] shadow-lg shadow-[#0AA7B5]/30"
            >
              <Calendar className="h-4 w-4" />
              Book a Call
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              View Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
