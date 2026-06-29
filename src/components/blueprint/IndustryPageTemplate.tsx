"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp, X,
  AlertTriangle, DollarSign, Clock, TrendingUp, Star, Lock,
  FileSpreadsheet, Brain, Rocket,
} from "lucide-react";
import { SpreadsheetMock } from "./Mocks";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

export type IndustryPageData = {
  slug: string;
  industry: string;          // "Agencies"
  industryLower: string;     // "agencies"
  emoji: string;
  hero: { headline: string; sub: string };
  painPoints: { title: string; body: string }[];
  whatYouGet: string[];      // industry-specific deliverables wording
  topPrograms: { name: string; commission: string; type: string; angle: string; href?: string }[];
  caseExample: { quote: string; name: string; role: string };
  industryFaqs: { q: string; a: string }[];
};

export default function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const utm = `?utm_source=industry&utm_medium=organic&utm_campaign=${data.slug}`;

  return (
    <div className="bg-[#060f15] text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-white/10 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/35">
            <Link href="/" className="hover:text-white/60 transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/referral-blueprint" className="hover:text-white/60 transition-colors">Referral Blueprint</Link>
            <span>/</span>
            <span className="text-white/55">For {data.industry}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5" style={{ background: `${CYAN}15`, border: `1px solid ${CYAN}30` }}>
                <span className="text-base">{data.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>Built for {data.industry}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[0.95] mb-5 text-white">
                {data.hero.headline}
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg mb-8">
                {data.hero.sub}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link href={`/referral-blueprint${utm}`} className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}40` }}>
                  Get the {data.industry} Blueprint — $799
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <span className="text-xs text-white/35">48-hour delivery · Personalised to your business</span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" style={{ color: CYAN }} />250+ programs</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" style={{ color: CYAN }} />Strategy brief written for {data.industryLower}</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" style={{ color: CYAN }} />One-time, no subscription</span>
              </div>
            </div>

            <div>
              <SpreadsheetMock blurred rows={7} />
              <p className="text-center mt-3 text-[10px] text-white/25 italic">Sample from the 250+ program database</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Why {data.industryLower} struggle with affiliate revenue.
          </h2>
          <p className="text-white/50 mb-12 max-w-xl">
            The pattern is consistent across every {data.industryLower.replace(/s$/, "")} we&apos;ve worked with.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.painPoints.map(({ title, body }) => (
              <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-red-500/10">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white mb-1.5">{title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET (industry-specific) ──────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            What&apos;s in the blueprint for {data.industryLower}.
          </h2>
          <p className="text-white/50 mb-10 max-w-xl">
            Six deliverables, customised to how {data.industryLower} actually monetise.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.whatYouGet.map((item, i) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black" style={{ background: `${CYAN}25`, color: CYAN }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-white/75 leading-relaxed pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP PROGRAMS FOR THIS INDUSTRY ────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Top affiliate programs for {data.industryLower}.
          </h2>
          <p className="text-white/50 mb-10 max-w-xl">
            A preview of the highest-leverage programs in the database for your industry. The full database has 250+ across all 5 categories.
          </p>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid bg-white/[0.04] border-b border-white/10 text-[9px] font-bold uppercase tracking-wider text-white/40" style={{ gridTemplateColumns: "120px 110px 90px 1fr" }}>
              <div className="px-4 py-3">Program</div>
              <div className="px-4 py-3">Commission</div>
              <div className="px-4 py-3">Type</div>
              <div className="px-4 py-3">Angle for {data.industry}</div>
            </div>
            {data.topPrograms.map((p, i) => (
              <div key={p.name} className={`grid border-b border-white/[0.05] last:border-0 ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`} style={{ gridTemplateColumns: "120px 110px 90px 1fr" }}>
                <div className="px-4 py-3 text-sm font-bold text-white">
                  {p.href ? <Link href={p.href} className="hover:underline" style={{ color: CYAN }}>{p.name} →</Link> : p.name}
                </div>
                <div className="px-4 py-3 text-sm font-mono text-white/80">{p.commission}</div>
                <div className="px-4 py-3 text-xs text-white/50">{p.type}</div>
                <div className="px-4 py-3 text-xs text-white/55">{p.angle}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3 italic">+ 240 more programs in the full database</p>
        </div>
      </section>

      {/* ── CASE EXAMPLE / SOCIAL PROOF ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-8">
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: AMBER }} />
              ))}
            </div>
            <p className="text-lg text-white/80 leading-relaxed mb-6 italic">
              &ldquo;{data.caseExample.quote}&rdquo;
            </p>
            <div className="border-t border-white/10 pt-5">
              <p className="text-sm font-bold text-white">{data.caseExample.name}</p>
              <p className="text-xs text-white/40">{data.caseExample.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING + 48HR EMPHASIS ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6" style={{ background: `${AMBER}15`, border: `1px solid ${AMBER}40` }}>
            <Clock className="h-3.5 w-3.5" style={{ color: AMBER }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: AMBER }}>48-hour personalised delivery</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            $799 once. That&apos;s it.
          </h2>
          <p className="text-white/55 max-w-md mx-auto mb-8">
            Personalised strategy brief written by Jarred for your {data.industryLower.replace(/s$/, "")}. Database, SEO concepts, distribution playbooks — all in your inbox within 48 hours.
          </p>
          <Link href={`/referral-blueprint${utm}`} className="inline-flex items-center gap-2 rounded-xl px-9 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}35` }}>
            Get the {data.industry} Blueprint — $799
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <Lock className="h-3 w-3 text-white/30" />
            <p className="text-xs text-white/35">Secure checkout · One-time payment · 48-hour delivery</p>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY-SPECIFIC FAQ ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white mb-10">Common questions from {data.industryLower}.</h2>
          <div className="space-y-1">
            {data.industryFaqs.map((item, i) => (
              <div key={item.q} className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full py-5 text-left gap-4 group">
                  <span className="text-sm font-bold text-white group-hover:text-[#0AA7B5] transition-colors">{item.q}</span>
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-white/40 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-white/40 flex-shrink-0" />}
                </button>
                {openFaq === i && <p className="pb-5 text-sm text-white/60 leading-relaxed">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#060f15] text-center">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <h2 className="text-3xl font-black text-white mb-3">Ready to start?</h2>
          <p className="text-white/55 text-base mb-7 max-w-md mx-auto">
            Fill the intake form, pay $799, and receive your personalised {data.industry} blueprint within 48 hours.
          </p>
          <Link href={`/referral-blueprint${utm}`} className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
            Get the {data.industry} Blueprint — $799
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
