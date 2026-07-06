"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Heart, Globe, Mail } from "lucide-react";

// Editorial "best for" positioning, not numeric ratings, so it stays clean of
// any health-rating implication. Weight-loss (the money vertical) leads.
const CATS = [
  {
    key: "weight",
    label: "Weight-loss telehealth",
    icon: Heart,
    grad: "from-[#12b981] to-[#0a7c42]",
    href: "/best-weight-loss-telehealth-australia",
    rows: [
      { name: "Moshy", bestFor: "Best value, no lock-in", top: true },
      { name: "Juniper", bestFor: "Coaching-led support" },
      { name: "Better Being", bestFor: "Lifestyle-first" },
    ],
  },
  {
    key: "web",
    label: "Website builders",
    icon: Globe,
    grad: "from-[#6366f1] to-[#4338ca]",
    href: "/compare/website-builders",
    rows: [
      { name: "Carrd", bestFor: "Simple one-pagers", top: true },
      { name: "Durable AI", bestFor: "AI-built in minutes" },
      { name: "Butternut AI", bestFor: "Full AI websites" },
    ],
  },
  {
    key: "news",
    label: "Newsletter platforms",
    icon: Mail,
    grad: "from-[#a855f7] to-[#7c3aed]",
    href: "/compare/newsletter-platforms",
    rows: [
      { name: "beehiiv", bestFor: "Serious audience growth", top: true },
      { name: "Substack", bestFor: "Built-in discovery" },
      { name: "Kit", bestFor: "Advanced automation" },
    ],
  },
];

export default function HeroRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced.current || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % CATS.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const c = CATS[i];
  const Icon = c.icon;

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(18,160,91,0.14),transparent)] blur-2xl" aria-hidden="true" />
      <div className="nw-card rounded-2xl p-5 shadow-[0_24px_60px_-30px_rgba(16,37,27,0.4)] sm:p-6">
        <div className="flex items-center justify-between border-b border-[#eef1ef] pb-3">
          <div className="flex items-center gap-3">
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${c.grad} text-white shadow-[0_8px_18px_-8px_rgba(16,37,27,0.55)] ring-1 ring-inset ring-white/20`}>
              <Icon className="h-5 w-5" strokeWidth={2.1} />
            </span>
            <div>
              <p className="nw-kicker !text-[10.5px]">Comparing</p>
              <p className="text-[15px] font-bold leading-tight text-[#10251b]">{c.label}</p>
            </div>
          </div>
          <span className="rounded-full border border-[#e3e7e2] bg-[#f2f4ee] px-2.5 py-1 text-[11px] font-semibold text-[#6e7b74]">AU · 2026</span>
        </div>

        {/* Rows crossfade on rotation */}
        <div key={c.key} className="mt-4 space-y-2.5 [animation:nw-rise_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
          {c.rows.map((r, idx) => (
            <div key={r.name} className={`flex items-center gap-3.5 rounded-xl border px-3.5 py-3 ${r.top ? "border-[#cfe6da] bg-[#e8f5ee]" : "border-[#eef1ef] bg-white"}`}>
              <span className="w-3 shrink-0 text-center text-[13px] font-bold text-[#9aa39c]">{idx + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[14px] font-bold text-[#10251b]">{r.name}</span>
                  {r.top && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0a7c42] px-2 py-0.5 text-[10px] font-bold text-white">
                      <Star className="h-2.5 w-2.5 fill-white" /> Top pick
                    </span>
                  )}
                </div>
                <span className="text-[11.5px] text-[#6e7b74]">{r.bestFor}</span>
              </div>
            </div>
          ))}
        </div>

        <Link href={c.href} className="mt-4 flex items-center justify-between border-t border-[#eef1ef] pt-3.5 text-[13px] font-semibold text-[#0a7c42] hover:text-[#086536]">
          See the full {c.label.toLowerCase()} comparison
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* Progress dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {CATS.map((cat, idx) => (
            <button
              key={cat.key}
              onClick={() => setI(idx)}
              aria-label={`Show ${cat.label}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-[#0a7c42]" : "w-1.5 bg-[#cdd5cf] hover:bg-[#9aa39c]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
