"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  CheckCircle2,
  Building2,
  Briefcase,
  Target,
  Sparkles
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Case Study Data — Organized by Core Offering
───────────────────────────────────────────────────────────── */

type CaseStudy = {
  id: string;
  category: "platform" | "partnerships" | "linkedin" | "done-for-you";
  industry: string;
  result: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  impact: string[];
  testimonial: { quote: string; attribution: string };
};

const caseStudies: CaseStudy[] = [
  {
    id: "financial-advisory-platform",
    category: "platform",
    industry: "Financial Advisory",
    result: "+41% client acquisition from referrals",
    metrics: [
      { value: "+41%", label: "Client Acquisition" },
      { value: "3.8×", label: "Referral Volume" },
      { value: "$0", label: "Manual Tracking" },
    ],
    challenge:
      "A mid-size financial advisory firm relied on informal word-of-mouth with no visibility into which clients referred new business or how to reward them consistently.",
    approach: [
      "Deployed branded ambassador portal with unique tracking links per client",
      "Automated reward notifications and payout calculations",
      "Integrated with CRM for seamless lead attribution",
    ],
    impact: [
      "41% increase in new client acquisition within 6 months",
      "Eliminated spreadsheet tracking entirely",
      "Improved client satisfaction through transparent reward visibility",
    ],
    testimonial: {
      quote: "We went from guessing who referred whom to having a complete picture of our referral pipeline. The platform paid for itself in the first month.",
      attribution: "Managing Director, Financial Advisory Firm",
    },
  },
  {
    id: "consulting-partnerships",
    category: "partnerships",
    industry: "Management Consulting",
    result: "12 new strategic partners in 90 days",
    metrics: [
      { value: "12", label: "New Partners" },
      { value: "34", label: "Qualified Intros" },
      { value: "60%", label: "Ops Time Saved" },
    ],
    challenge:
      "A boutique consulting firm wanted to formalize relationships with adjacent service providers but lacked the infrastructure to track referrals, manage payouts, or maintain partner relationships at scale.",
    approach: [
      "Designed tiered partner program with clear revenue-share terms",
      "Created dedicated partner portal with real-time deal tracking",
      "Implemented automated quarterly reporting and payout workflows",
    ],
    impact: [
      "Onboarded 12 strategic partners within first quarter",
      "Generated 34 qualified introductions from partner network",
      "Reduced partner management overhead by 60%",
    ],
    testimonial: {
      quote: "Refer Labs gave us the infrastructure to build a partner ecosystem we'd been putting off for years. The transparency keeps everyone aligned.",
      attribution: "Partner, Management Consulting Firm",
    },
  },
  {
    id: "saas-linkedin-growth",
    category: "linkedin",
    industry: "B2B SaaS",
    result: "+28% demo conversions via influencer activations",
    metrics: [
      { value: "+28%", label: "Demo Conversions" },
      { value: "8", label: "Active Creators" },
      { value: "Full", label: "Attribution" },
    ],
    challenge:
      "A growing B2B SaaS company knew LinkedIn creators could drive awareness, but had no way to track which influencers actually drove demos or revenue—making it impossible to justify spend.",
    approach: [
      "Identified and onboarded 8 niche LinkedIn creators with aligned audiences",
      "Issued campaign-specific tracking links with per-creator attribution",
      "Structured hybrid compensation: fixed content fees plus performance bonuses",
    ],
    impact: [
      "28% lift in demo conversion rates from influencer-sourced traffic",
      "Complete visibility into ROI per creator and campaign",
      "Established repeatable playbook for future creator partnerships",
    ],
    testimonial: {
      quote: "We finally know which creators drive pipeline, not just impressions. That clarity changed how we invest in LinkedIn.",
      attribution: "Head of Demand Generation, B2B SaaS",
    },
  },
  {
    id: "law-firm-done-for-you",
    category: "done-for-you",
    industry: "Legal Services",
    result: "Full referral program live in 3 weeks",
    metrics: [
      { value: "3", label: "Weeks to Launch" },
      { value: "22", label: "Active Referrers" },
      { value: "+37%", label: "Referral Revenue" },
    ],
    challenge:
      "A mid-size law firm knew referrals were their best source of new clients but had no formal program—and no bandwidth to build one internally.",
    approach: [
      "Conducted discovery to map existing referral sources and opportunities",
      "Designed compliant program structure with appropriate reward mechanics",
      "Built, launched, and trained team on new referral infrastructure",
    ],
    impact: [
      "Program live and generating referrals within 3 weeks",
      "22 active referrers enrolled in first 60 days",
      "37% increase in referral-sourced revenue",
    ],
    testimonial: {
      quote: "We handed off the project and got a fully operational referral program back. The ROI was immediate.",
      attribution: "Managing Partner, Law Firm",
    },
  },
];

const categoryInfo = {
  platform: {
    title: "Referral Program Platform",
    description: "Self-service infrastructure for tracking, rewarding, and scaling referral programs.",
    icon: BarChart3,
    color: "cyan",
    link: "/pricing",
  },
  partnerships: {
    title: "Referral Partnerships",
    description: "White-glove partner program design and management for professional services.",
    icon: Users,
    color: "emerald",
    link: "/referral-partnerships",
  },
  linkedin: {
    title: "LinkedIn Growth",
    description: "End-to-end influencer activations with full attribution and ROI tracking.",
    icon: Target,
    color: "violet",
    link: "/linkedin-growth",
  },
  "done-for-you": {
    title: "Done-For-You Launch",
    description: "We build, launch, and optimize your referral program so you don't have to.",
    icon: Sparkles,
    color: "amber",
    link: "/pricing",
  },
};

/* ─────────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────────── */

export default function CaseStudiesPage() {
  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": caseStudies.map((c) => ({
          "@type": "CaseStudy",
          name: `${c.industry} — ${c.result}`,
          description: c.challenge,
          outcome: c.impact,
        })),
      }),
    []
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(87,230,255,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(10,186,181,0.1),transparent_45%)]" />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:px-10 lg:px-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

        {/* ─────────────────────────────────────────────────────────
            Hero Section
        ───────────────────────────────────────────────────────── */}
        <header className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <TrendingUp className="h-4 w-4" />
            Proven Results
          </div>

          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white tracking-tight">
            Real Outcomes from
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Real Programs
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            How professional services firms and growth-stage companies are using Refer Labs to build scalable referral programs that deliver measurable results.
          </p>
        </header>

        {/* ─────────────────────────────────────────────────────────
            Four Core Offerings Overview
        ───────────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((key) => {
              const info = categoryInfo[key];
              const Icon = info.icon;
              return (
                <Link
                  key={key}
                  href={`#${key}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-400/40 hover:bg-white/8"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-cyan-400/10 p-2.5">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm mb-1 truncate">{info.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{info.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-slate-500 opacity-0 transition-all group-hover:opacity-100 group-hover:text-cyan-300" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Case Studies by Category
        ───────────────────────────────────────────────────────── */}
        <div className="space-y-16">
          {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((categoryKey) => {
            const info = categoryInfo[categoryKey];
            const Icon = info.icon;
            const study = caseStudies.find((s) => s.category === categoryKey);

            if (!study) return null;

            return (
              <section key={categoryKey} id={categoryKey} className="scroll-mt-24">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-500/10 p-3">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{info.title}</h2>
                    <p className="text-sm text-slate-400">{info.description}</p>
                  </div>
                </div>

                {/* Case Study Card */}
                <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-transparent">
                  {/* Top Bar with Industry & Result */}
                  <div className="border-b border-white/10 bg-white/5 px-6 py-4 sm:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-medium text-white">{study.industry}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm font-semibold">{study.result}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="text-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5"
                        >
                          <p className="text-3xl sm:text-4xl font-black text-white mb-1">{metric.value}</p>
                          <p className="text-xs sm:text-sm text-slate-400">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Challenge / Approach / Impact */}
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Challenge */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">The Challenge</h3>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{study.challenge}</p>
                      </div>

                      {/* Approach */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Our Approach</h3>
                        </div>
                        <ul className="space-y-2">
                          {study.approach.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                              <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">The Impact</h3>
                        </div>
                        <ul className="space-y-2">
                          {study.impact.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                              <TrendingUp className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                      <div className="absolute -top-3 left-6 px-2 bg-[#0c1c29]">
                        <Briefcase className="h-5 w-5 text-cyan-400" />
                      </div>
                      <blockquote className="text-slate-200 italic leading-relaxed">
                        &ldquo;{study.testimonial.quote}&rdquo;
                      </blockquote>
                      <p className="mt-3 text-sm text-slate-400">— {study.testimonial.attribution}</p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
                      >
                        Get Similar Results
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={info.link}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                      >
                        Learn About {info.title}
                      </Link>
                    </div>
                  </div>
                </article>
              </section>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────
            Bottom CTA Section
        ───────────────────────────────────────────────────────── */}
        <section className="mt-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-transparent p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(87,230,255,0.12),transparent_50%)]" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Build Your Success Story?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Whether you need a self-service platform, white-glove partnerships, LinkedIn activations, or a fully managed launch—we&apos;ll help you design a referral program that delivers measurable results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
              >
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Footer Links
        ───────────────────────────────────────────────────────── */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/referral-partnerships" className="hover:text-white transition-colors">Referral Partnerships</Link>
            <Link href="/linkedin-growth" className="hover:text-white transition-colors">LinkedIn Growth</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
