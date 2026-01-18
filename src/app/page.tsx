/* eslint-disable react/no-unescaped-entities */

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gift,
  Linkedin,
  MessageSquare,
  Sparkles,
  Target,
  Users,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";

/* ─────────────────────────────────────────────────────────────
   Hero Badge Types & Data
───────────────────────────────────────────────────────────── */

type HeroBadgeSpec = {
  id: string;
  title: string;
  text: string;
  colors: [string, string];
  position: string;
};

const heroBadges: HeroBadgeSpec[] = [
  {
    id: "hero-referral",
    title: "NEW INTRODUCTION",
    text: "Anderson Law referred a client",
    colors: ["#2c3e50", "#34495e"],
    position: "top-4 left-4",
  },
  {
    id: "hero-vip",
    title: "CASE CLOSED",
    text: "Smith & Partners confirmed new matter",
    colors: ["#16a085", "#1abc9c"],
    position: "top-4 right-4",
  },
  {
    id: "hero-leaderboard",
    title: "TOP PARTNER",
    text: "Miller CPA referred 18 clients",
    colors: ["#27ae60", "#2ecc71"],
    position: "bottom-24 left-4",
  },
  {
    id: "hero-revenue",
    title: "REVENUE ATTRIBUTED",
    text: "$425,000 from referrals",
    colors: ["#2980b9", "#3498db"],
    position: "bottom-24 right-4",
  },
];

const heroBadgeOrientation: Record<string, string> = {
  "hero-referral": "-rotate-2 origin-top-left",
  "hero-vip": "rotate-2 origin-top-right",
  "hero-leaderboard": "rotate-2 origin-bottom-left",
  "hero-revenue": "-rotate-2 origin-bottom-right",
};

const HeroBadge = ({ badge, className = "" }: { badge: HeroBadgeSpec; className?: string }) => (
  <div
    className={cn(
      "hero-badge pointer-events-none select-none rounded-2xl border border-white/20",
      "flex flex-row items-center gap-2.5 w-[240px] h-[70px] px-3 py-2.5 transition-all duration-300",
      "opacity-60 backdrop-blur-lg shadow-lg shadow-black/15",
      className,
    )}
    style={{
      background: `linear-gradient(135deg, ${badge.colors[0]}dd, ${badge.colors[1]}dd)`,
    }}
  >
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/95 shadow-md">
      <Image
        src="/logo.svg"
        alt="Refer Labs"
        width={32}
        height={32}
        className="h-7 w-7 object-contain"
        priority={true}
      />
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/90 mb-0.5 leading-tight">
        {badge.title}
      </p>
      <p className="text-xs font-semibold leading-tight text-white line-clamp-2">
        {badge.text}
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Data & Types
───────────────────────────────────────────────────────────── */

const targetedPrograms = [
  {
    id: "customer-network",
    icon: Users,
    title: "Customer Network",
    tagline: "Turn Clients Into Advocates",
    description:
      "Activate your happiest customers with branded ambassador portals, unique tracking links, and automated reward calculations. Turn word-of-mouth into a measurable revenue channel.",
    features: [
      "Branded ambassador portals",
      "Unique tracking links & QR codes",
      "Automated reward calculations",
      "Real-time performance dashboards",
    ],
    cta: { label: "View Pricing", href: "/pricing" },
    gradient: "from-cyan-400/20 to-cyan-500/5",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
  },
  {
    id: "linkedin-influencers",
    icon: Linkedin,
    title: "LinkedIn Influencers",
    tagline: "B2B Thought Leader Activations",
    description:
      "Activate B2B thought leaders with matched audiences. We handle influencer sourcing, campaign tracking, and performance attribution—so you know exactly which creators drive pipeline.",
    features: [
      "Influencer matching & vetting",
      "Campaign-specific tracking",
      "Per-creator ROI attribution",
      "Hybrid payout models",
    ],
    cta: { label: "Learn More", href: "/linkedin-growth" },
    gradient: "from-blue-400/20 to-blue-500/5",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    id: "agencies-partners",
    icon: Building2,
    title: "Agencies & Strategic Partners",
    tagline: "White-Glove Partner Programs",
    description:
      "We design, launch, and manage partner programs with agencies and strategic partners—complete with tracking, payouts, and reporting your finance team can defend.",
    features: [
      "Partner identification & outreach",
      "Custom reward structures",
      "Co-branded materials",
      "Quarterly performance reviews",
    ],
    cta: { label: "Learn More", href: "/referral-partnerships" },
    gradient: "from-purple-400/20 to-purple-500/5",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    id: "consultants-advisors",
    icon: MessageSquare,
    title: "Consultants & Advisors",
    tagline: "Trusted Expert Referrals",
    description:
      "Activate consultants and advisors who guide buying decisions. Discreet tracking, compliance disclosures, and automated payouts make it easy for trusted experts to recommend you.",
    features: [
      "Discreet referral tracking",
      "Compliance disclosures built-in",
      "Per-deal or revenue share payouts",
      "Advisor-friendly onboarding",
    ],
    cta: { label: "Learn More", href: "/referral-partnerships" },
    gradient: "from-emerald-400/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
];

const proofStats = [
  { value: "70%", label: "Lower CAC", desc: "vs. paid acquisition channels" },
  { value: "4×", label: "Higher Conversion", desc: "from referred leads" },
  { value: "37%", label: "Better Retention", desc: "lifetime value increase" },
  { value: "6×", label: "Average ROI", desc: "on referral programs" },
];

const howItWorks = [
  {
    step: "01",
    title: "Partner Onboarding",
    description: "Partners receive unique tracked links and a branded portal to monitor their performance.",
    icon: Users,
  },
  {
    step: "02",
    title: "Tracked Interactions",
    description: "Every click, form submission, demo booking, and conversion is captured in real time.",
    icon: Target,
  },
  {
    step: "03",
    title: "Full Attribution",
    description: "Partner, campaign, and link IDs flow into dashboards with audit-ready tracking.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Automated Rewards",
    description: "Revenue share, credits, or cash payouts settle automatically with clear ledgers.",
    icon: Gift,
  },
];

const clientTestimonials = [
  {
    quote:
      "We went live in days and immediately had clarity on what was working. The dashboard made attribution simple—no more chasing spreadsheets.",
    name: "Sarah N",
    title: "Head of Growth",
  },
  {
    quote:
      "Refer Labs turned happy customers into a measurable acquisition channel. We can finally see which partners drive real outcomes.",
    name: "Michael",
    title: "Founder",
  },
  {
    quote:
      "The tracking is bulletproof. Every action from clicking the link to converting is captured and attributed properly.",
    name: "Priya Shah",
    title: "Revenue Operations Lead",
  },
  {
    quote:
      "We wanted a referral program that plugged into our existing sales process. Refer Labs gave us clean tracking and better visibility.",
    name: "James O'Connor",
    title: "Managing Director",
  },
  {
    quote:
      "What surprised us most was how professional the end-to-end experience feels. The referral pages look premium and prospects convert.",
    name: "Emily",
    title: "Marketing Director",
  },
  {
    quote:
      "We used to run partnerships manually and it was messy. Now we have a structured flow and can monitor performance in one place.",
    name: "Daniel R",
    title: "Partnerships Manager",
  },
];

/* ─────────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────────── */

export default async function Home() {
  // Read attribution cookie if present
  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let ambassadorData: { id: string; code: string; business_id: string } | null = null;

  if (refAmbassadorCookie?.value) {
    try {
      const parsed = JSON.parse(refAmbassadorCookie.value);
      const cookieAge = Date.now() - (parsed.timestamp || 0);
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      if (cookieAge < thirtyDaysMs) {
        ambassadorData = {
          id: parsed.id,
          code: parsed.code,
          business_id: parsed.business_id,
        };
      }
    } catch (err) {
      logger.error("Failed to parse attribution cookie:", err);
    }
  }

  // Preserve ambassador data for potential use
  void ambassadorData;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      {/* Subtle background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* ─────────────────────────────────────────────────────────
            Hero Section
        ───────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] pb-16">
          {/* Corner notification badges - Desktop only (xl+) */}
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {heroBadges.map((badge) => (
              <HeroBadge
                key={badge.id}
                badge={badge}
                className={cn("absolute", badge.position, heroBadgeOrientation[badge.id])}
              />
            ))}
          </div>

          <div className="relative z-10 space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-black leading-[1.12] text-white max-w-5xl mx-auto tracking-tight">
              <span className="whitespace-nowrap">Launch Successful Referral Programs</span>
              <br className="hidden sm:block" />
              <span className="whitespace-nowrap">For <span className="text-cyan-400">Professional Services</span> Firms</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 whitespace-nowrap">
              Turn Clients, Partners, Creators & LinkedIn Influencers Into a Fully Tracked Revenue Stream
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
              >
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Launch Targeted Referral Programs — 4 Categories
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-4xl mx-auto">
              Launch Targeted Referral Programs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {targetedPrograms.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.id}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border bg-gradient-to-br p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10",
                    program.borderColor,
                    program.gradient
                  )}
                >
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Icon className={cn("h-7 w-7", program.iconColor)} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                          {program.tagline}
                        </p>
                        <h3 className="text-xl font-bold text-white">{program.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={program.cta.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    {program.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            How The Referral Flow Works
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              How Referrals Flow Through the Platform
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From partner onboarding to automated payouts—every step is tracked and attributable.
            </p>
          </div>

          <div className="relative">
            {/* Connection line - desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-500/50 via-cyan-400/50 to-cyan-500/50" />

            <div className="grid md:grid-cols-4 gap-6">
              {howItWorks.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="relative text-center">
                    <div className="relative inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-500/5 border border-cyan-500/20 mb-5">
                      <Icon className="h-10 w-10 text-cyan-400" />
                      <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Why Partner-Led Growth Outperforms
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(92,225,230,0.08),transparent_50%)]" />

            <div className="relative z-10">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Why Referral-Led Growth Wins
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  The math is simple: trusted recommendations convert better and cost less.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional Marketing */}
                <div className="rounded-2xl bg-slate-900/50 border border-red-500/20 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <span className="text-xl">❌</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Traditional Marketing</h3>
                      <p className="text-sm text-slate-400">Expensive, hard to track, declining trust</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>Paid ads CAC: <span className="font-semibold text-white">$200-400+</span></span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>50% of marketers <span className="font-semibold text-white">can't track ROI</span></span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>Only <span className="font-semibold text-white">25% trust ads</span></span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>CPM <span className="font-semibold text-white">up 61%</span> since 2020</span>
                    </li>
                  </ul>
                </div>

                {/* Referral Marketing */}
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/5 border border-emerald-500/20 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-xl">✅</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Referral Marketing</h3>
                      <p className="text-sm text-emerald-300">Lower cost, trackable, trusted by default</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Referred CAC: <span className="font-semibold text-white">70% lower</span></span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span><span className="font-semibold text-white">100% attribution</span> with Refer Labs</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span><span className="font-semibold text-white">92% trust</span> peer recommendations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Each customer <span className="font-semibold text-white">recruits 2-5 more</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Client Testimonials
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Trusted by Growth Teams
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Teams use Refer Labs to launch referral programs, track attribution, and measure ROI—without adding complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clientTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4"
              >
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Performance Metrics
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-white font-semibold mt-2">{stat.label}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            ROI Calculator CTA
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(92,225,230,0.1),transparent_50%)]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Calculate Your Referral Program ROI
                </h2>
                <p className="text-slate-300 max-w-xl">
                  Get AI-powered revenue forecasts and discover the perfect reward structure for your business in 4 simple steps.
                </p>
              </div>
              <Link
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300 whitespace-nowrap"
              >
                Calculate ROI
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Final CTA
        ───────────────────────────────────────────────────────── */}
        <section>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Ready to Build Your Referral Channel?
                </h2>
                <p className="text-lg text-slate-300">
                  Launch a referral program that turns your network into your most efficient growth engine—with full attribution, compliance, and payouts that scale.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
                  >
                    Schedule a Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
