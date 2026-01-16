"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CaseStudy = {
  id: string;
  title: string;
  headline: string;
  challenge: string;
  solution: string[];
  outcomes: string[];
  tags: string[];
  quote: string;
  quoteBy: string;
  metrics: { label: string; value: string }[];
  date: string;
};

const filters = [
  { id: "all", label: "Show All" },
  { id: "saaS", label: "SaaS Referral Programs" },
  { id: "partnerships", label: "Referral Partnerships" },
  { id: "revenue", label: "Revenue Growth" },
  { id: "engagement", label: "Engagement Lift" },
  { id: "efficiency", label: "Operational Efficiency" },
] as const;

const cases: CaseStudy[] = [
  {
    id: "pro-services-revenue",
    title: "Professional Services — +37% referral revenue",
    headline: "Problem → Strategy → Result",
    challenge: "Manual referrals with no attribution or payout visibility.",
    solution: [
      "We issued unique partner links and mapped every event into Measure ROI.",
      "We automated reward workflows tied to revenue share and demo bookings.",
      "We enabled partner dashboards so advisors could see performance in real time.",
    ],
    outcomes: [
      "37% increase in referral-sourced revenue",
      "3.2× lift in partner engagement scores",
      "Zero manual reconciliation for payouts",
    ],
    tags: ["saaS", "revenue", "efficiency"],
    quote: "ReferLabs turned our referral channel into a measurable revenue engine.",
    quoteBy: "Growth Lead, Professional Services",
    metrics: [
      { label: "Referral revenue", value: "+37%" },
      { label: "Engagement lift", value: "3.2×" },
      { label: "Manual tracking", value: "-100%" },
    ],
    date: "2024-11-01",
  },
  {
    id: "b2b-influencers",
    title: "B2B Influencers / LinkedIn — +28% conversion",
    headline: "Problem → Strategy → Result",
    challenge: "Creator-led referrals were untracked and undervalued.",
    solution: [
      "We onboarded LinkedIn influencers through External Partners with briefs and approvals.",
      "We issued campaign-specific links and tagged events with partner + campaign IDs.",
      "We aligned rewards to revenue share and cash-per-demo with audit-ready ledgers.",
    ],
    outcomes: [
      "28% increase in referral conversions",
      "Revenue attribution per influencer, per campaign",
      "Quarterly performance reviews for creators",
    ],
    tags: ["partnerships", "revenue", "engagement"],
    quote: "We finally see which creators move revenue, not just impressions.",
    quoteBy: "Head of Demand Gen, B2B SaaS",
    metrics: [
      { label: "Conversion lift", value: "+28%" },
      { label: "Influencer ROI", value: "Fully attributed" },
      { label: "Partner reviews", value: "Quarterly" },
    ],
    date: "2024-10-15",
  },
  {
    id: "agencies-ops",
    title: "Agencies & Strategic Partners — -60% ops overhead",
    headline: "Problem → Strategy → Result",
    challenge: "Multiple partner deals, no single source of truth for links, contracts, and payouts.",
    solution: [
      "We centralized partner records and links inside External Partners.",
      "We automated payout calculations for hybrid fixed + revenue-share models.",
      "We provided compliance-ready reporting for finance and operations.",
    ],
    outcomes: [
      "60% reduction in manual ops hours",
      "Single ledger for payouts and rewards",
      "Improved partner satisfaction (NPS +18)",
    ],
    tags: ["partnerships", "efficiency", "engagement"],
    quote: "Ops stopped chasing spreadsheets. Everything lives in one ledger now.",
    quoteBy: "COO, Strategic Agency Collective",
    metrics: [
      { label: "Ops time saved", value: "-60%" },
      { label: "Partner NPS", value: "+18" },
      { label: "Payout errors", value: "0" },
    ],
    date: "2024-09-20",
  },
];

const featured = cases[0];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");

  const visibleCases = useMemo(() => {
    if (activeFilter === "all") return cases;
    return cases.filter((c) => c.tags.includes(activeFilter));
  }, [activeFilter]);

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": cases.map((c) => ({
          "@type": "CaseStudy",
          name: c.title,
          headline: c.headline,
          description: c.challenge,
          datePublished: c.date,
          outcome: c.outcomes,
        })),
      }),
    [],
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(87,230,255,0.12),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(10,186,181,0.18),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1),transparent_55%)]" />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-20 pt-16 sm:px-10 lg:px-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white">
            Real Results from Real Growth Programs
          </h1>
          <p className="text-lg sm:text-xl text-slate-100/85 max-w-4xl mx-auto">
            Explore how innovative teams are using ReferLabs to build scalable referral and partner programs that drive measurable revenue, increase engagement, and accelerate growth. Each case study highlights the challenge, key actions taken, and the outcomes that matter most to business leaders.
          </p>
        </header>

        {/* Featured */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Featured Success Story</h2>
            <Link href="#case-list" className="text-sm font-semibold text-cyan-200 hover:text-cyan-100">
              Explore More Case Studies →
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-4xl border border-cyan-300/40 bg-gradient-to-br from-cyan-200/20 via-white/8 to-transparent backdrop-blur-2xl p-[1px] shadow-2xl shadow-cyan-900/40">
            <div className="rounded-[1.6rem] bg-gradient-to-br from-white/16 via-white/10 to-white/6 border border-white/15 px-6 py-8 sm:px-8 sm:py-10 grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-100 uppercase tracking-[0.18em]">{featured.title}</p>
                <p className="text-xl font-black text-white">{featured.headline}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {featured.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3 shadow-sm shadow-black/20 text-center">
                      <p className="text-2xl font-black text-white">{m.value}</p>
                      <p className="text-xs text-slate-100/80">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-100/85">
                    <strong>Challenge:</strong> {featured.challenge}
                  </p>
                  <p className="text-sm text-slate-100/85">
                    <strong>Solution:</strong> {featured.solution.join(" ")}
                  </p>
                  <p className="text-sm text-slate-100/85">
                    <strong>Outcome:</strong> {featured.outcomes.join(" • ")}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm italic text-slate-100/90">
                  “{featured.quote}” — {featured.quoteBy}
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-between">
                <div className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3 shadow-sm shadow-black/20">
                  <p className="text-sm font-semibold text-white">From manual referrals to +37% conversion</p>
                  <p className="mt-2 text-sm text-slate-100/85">Partner dashboards, automated rewards, and Measure ROI attribution unlocked revenue visibility.</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 text-slate-900 px-5 py-3 text-sm font-semibold hover:bg-cyan-200"
                >
                  See how we can help you
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === f.id
                    ? "bg-cyan-300 text-slate-900 shadow-md"
                    : "border border-white/15 bg-white/6 text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Case list */}
        <section id="case-list" className="grid gap-6">
          {visibleCases.map((c) => (
            <article
              key={c.id}
              className="relative overflow-hidden rounded-4xl border border-white/12 bg-white/6 backdrop-blur-2xl p-[1px] shadow-xl shadow-black/30"
            >
              <div className="rounded-[1.4rem] bg-gradient-to-br from-white/12 via-white/6 to-white/4 border border-white/10 px-6 py-6 sm:px-8 sm:py-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-white">{c.title}</h3>
                    <p className="text-sm font-semibold text-cyan-100 uppercase tracking-[0.14em]">{c.headline}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white/90">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3 shadow-sm shadow-black/15">
                      <p className="text-2xl font-black text-white">{m.value}</p>
                      <p className="text-xs text-slate-100/80">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                    <p className="text-sm font-semibold text-white mb-1">Challenge</p>
                    <p className="text-sm text-slate-100/85">{c.challenge}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                    <p className="text-sm font-semibold text-white mb-1">Solution</p>
                    <ul className="space-y-2 text-sm text-slate-100/85">
                      {c.solution.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="text-cyan-200">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                    <p className="text-sm font-semibold text-white mb-1">Outcome</p>
                    <ul className="space-y-2 text-sm text-slate-100/85">
                      {c.outcomes.map((o) => (
                        <li key={o} className="flex gap-2">
                          <span className="text-cyan-200">•</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm italic text-slate-100/90">
                  “{c.quote}” — {c.quoteBy}
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-cyan-300 text-slate-900 px-5 py-3 text-sm font-semibold hover:bg-cyan-200"
                  >
                    See how we can help you
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Learn more */}
        <section className="space-y-3 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">See How It Works — Explore our Platform & Partnerships</h2>
          <p className="text-sm sm:text-base text-slate-100/85 max-w-3xl mx-auto">
            Want to learn how ReferLabs delivers these outcomes? Check out our product overview or pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-cyan-200"
            >
              How it Works
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent text-white px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Pricing
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-4xl border border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/12 px-8 py-12 sm:px-12 sm:py-14 shadow-2xl shadow-black/35 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(87,230,255,0.18),transparent_40%),radial-gradient(circle_at_75%_15%,rgba(10,186,181,0.18),transparent_45%)]" />
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">Ready to Build Your Own Referral Program?</h2>
            <p className="text-sm sm:text-base text-slate-100/85">
              Find out how the ReferLabs platform or our Referral Partnerships program can deliver measurable outcomes for your business.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-cyan-200"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
