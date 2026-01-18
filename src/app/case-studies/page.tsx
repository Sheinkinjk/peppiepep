"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Sparkles,
  Linkedin,
  Building2,
  MessageSquare,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Case Study Data
───────────────────────────────────────────────────────────── */

type CaseStudy = {
  id: string;
  category: "platform" | "partnerships" | "linkedin" | "done-for-you";
  industry: string;
  headline: string;
  metrics: { value: string; label: string }[];
  summary: string;
  testimonial: { quote: string; attribution: string };
};

const caseStudies: CaseStudy[] = [
  {
    id: "financial-advisory-platform",
    category: "platform",
    industry: "Financial Advisory",
    headline: "+41% client acquisition from referrals",
    metrics: [
      { value: "+41%", label: "Client Growth" },
      { value: "3.8×", label: "Referral Volume" },
      { value: "$0", label: "Manual Tracking" },
    ],
    summary:
      "A mid-size financial advisory firm deployed branded ambassador portals with unique tracking links. Within 6 months, they saw a 41% increase in new client acquisition and eliminated manual spreadsheet tracking entirely.",
    testimonial: {
      quote: "We went from guessing who referred whom to having a complete picture of our referral pipeline.",
      attribution: "Managing Director, Financial Advisory Firm",
    },
  },
  {
    id: "consulting-partnerships",
    category: "partnerships",
    industry: "Management Consulting",
    headline: "12 new strategic partners in 90 days",
    metrics: [
      { value: "12", label: "New Partners" },
      { value: "34", label: "Qualified Intros" },
      { value: "60%", label: "Ops Savings" },
    ],
    summary:
      "A boutique consulting firm formalized relationships with adjacent service providers using tiered partner programs. They onboarded 12 strategic partners and generated 34 qualified introductions while reducing partner management overhead by 60%.",
    testimonial: {
      quote: "Refer Labs gave us the infrastructure to build a partner ecosystem we'd been putting off for years.",
      attribution: "Partner, Management Consulting Firm",
    },
  },
  {
    id: "saas-linkedin-growth",
    category: "linkedin",
    industry: "B2B SaaS",
    headline: "+28% demo conversions via influencer activations",
    metrics: [
      { value: "+28%", label: "Demo Lift" },
      { value: "8", label: "Active Creators" },
      { value: "Full", label: "Attribution" },
    ],
    summary:
      "A growing B2B SaaS company activated 8 niche LinkedIn creators with campaign-specific tracking links. They achieved a 28% lift in demo conversion rates and complete visibility into ROI per creator.",
    testimonial: {
      quote: "We finally know which creators drive pipeline, not just impressions.",
      attribution: "Head of Demand Generation, B2B SaaS",
    },
  },
  {
    id: "law-firm-done-for-you",
    category: "done-for-you",
    industry: "Legal Services",
    headline: "Full referral program live in 3 weeks",
    metrics: [
      { value: "3 wks", label: "Time to Launch" },
      { value: "22", label: "Active Referrers" },
      { value: "+37%", label: "Referral Revenue" },
    ],
    summary:
      "A mid-size law firm handed off their referral program build entirely. Within 3 weeks, they had a fully operational program with 22 active referrers enrolled, resulting in a 37% increase in referral-sourced revenue.",
    testimonial: {
      quote: "We handed off the project and got a fully operational referral program back. The ROI was immediate.",
      attribution: "Managing Partner, Law Firm",
    },
  },
];

const categories = [
  { key: "all", label: "All Case Studies", icon: TrendingUp },
  { key: "platform", label: "Platform", icon: BarChart3 },
  { key: "partnerships", label: "Partnerships", icon: Users },
  { key: "linkedin", label: "LinkedIn Growth", icon: Linkedin },
  { key: "done-for-you", label: "Done-For-You", icon: Sparkles },
] as const;

const categoryMeta: Record<string, { icon: typeof Users; color: string; link: string }> = {
  platform: { icon: BarChart3, color: "cyan", link: "/pricing" },
  partnerships: { icon: Users, color: "emerald", link: "/referral-partnerships" },
  linkedin: { icon: Target, color: "violet", link: "/linkedin-growth" },
  "done-for-you": { icon: Sparkles, color: "amber", link: "/pricing" },
};

/* ─────────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────────── */

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredStudies = useMemo(() => {
    if (activeFilter === "all") return caseStudies;
    return caseStudies.filter((s) => s.category === activeFilter);
  }, [activeFilter]);

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": caseStudies.map((c) => ({
          "@type": "CaseStudy",
          name: `${c.industry} — ${c.headline}`,
          description: c.summary,
        })),
      }),
    []
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(87,230,255,0.06),transparent_40%)]" />

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 sm:px-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

        {/* Hero */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white tracking-tight">
            Case Studies
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Real results from professional services firms using Refer Labs.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-400 text-slate-900"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Case Study Cards */}
        <div className="space-y-6">
          {filteredStudies.map((study) => {
            const meta = categoryMeta[study.category];
            const CategoryIcon = meta.icon;

            return (
              <article
                key={study.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-cyan-400/10 p-2">
                      <CategoryIcon className="h-4 w-4 text-cyan-300" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{study.industry}</p>
                      <h2 className="font-semibold text-white">{study.headline}</h2>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-6">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="text-xl font-bold text-cyan-300">{m.value}</p>
                        <p className="text-xs text-slate-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed">{study.summary}</p>

                  {/* Testimonial */}
                  <blockquote className="border-l-2 border-cyan-500/50 pl-4 text-sm italic text-slate-400">
                    &ldquo;{study.testimonial.quote}&rdquo;
                    <span className="block mt-1 text-xs not-italic text-slate-500">
                      — {study.testimonial.attribution}
                    </span>
                  </blockquote>

                  {/* CTA */}
                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      Get Similar Results
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={meta.link}
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.02] to-transparent p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Build Your Success Story?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Schedule a call to discuss how Refer Labs can help you achieve similar results.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
          >
            Schedule a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
