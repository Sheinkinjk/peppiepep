/* eslint-disable react/no-unescaped-entities */

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gift,
  LinkedinIcon,
  MessageSquare,
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
    icon: LinkedinIcon,
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
        <section className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-140px)] py-8 sm:py-12">
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

          <div className="relative z-10 space-y-5 sm:space-y-6">
            <h1 className="text-[1.75rem] leading-[1.15] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[3rem] font-black text-white max-w-4xl mx-auto tracking-tight">
              <span className="block sm:inline">Launch Successful Referral Programs</span>
              <span className="hidden sm:inline"> </span>
              <span className="block sm:inline">For <span className="text-cyan-400">Professional Services</span> Firms</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-[1.125rem] text-slate-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 lg:whitespace-nowrap">
              Turn Clients, Partners, Creators & LinkedIn Influencers Into a Fully Tracked Revenue Stream
            </p>
            <div className="pt-3 sm:pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
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
            Why Refer Labs — Differentiated Positioning
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(92,225,230,0.06),transparent_50%)]" />

            <div className="relative z-10">
              {/* Section Header */}
              <div className="text-center space-y-4 mb-10 sm:mb-14">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  Why Most Referral Programs Fail
                </h2>
                <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
                  Most partnership tools were built for e-commerce or mass-market SaaS. Professional services firms—law, accounting, consulting—operate on trust, long sales cycles, and discrete introductions. <span className="text-white font-medium">The existing tools don't understand this.</span>
                </p>
              </div>

              {/* Problem Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
                <div className="rounded-2xl bg-slate-900/60 border border-red-500/15 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">01</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Wrong Model</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Coupon-code referral tools built for Shopify stores don't work when your average deal is $10,000+ and takes months to close.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/60 border border-red-500/15 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">02</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base">No Attribution</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Manual spreadsheets and "who introduced whom" guesswork means partners don't get credited—and stop referring.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/60 border border-red-500/15 p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">03</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Generic Experience</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Off-the-shelf tools feel transactional. Trusted advisors and partners expect a professional, discreet experience.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-10 sm:mb-14">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Why Refer Labs
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              </div>

              {/* Solution Cards */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/5 border border-cyan-500/20 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="font-bold text-white">Built for Professional Services</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Designed for law firms, accountants, consultants, and advisory practices—where growth happens through trusted introductions, not discount codes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>High-value, long-cycle deal tracking</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Discreet partner experiences</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Professional compliance built-in</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <LinkedinIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white">Beyond Mass-Market Affiliate Tools</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Professional referrals require discretion, not coupon codes. We built for the way B2B relationships actually work—warm introductions, not spam links.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>White-label partner portals</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>No public discount codes</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Relationship-first tracking</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-white">Attribution You Can Defend</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Every click, meeting, and closed deal is tracked and attributed. Your finance team gets audit-ready reports, partners get clear credit.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Full-funnel conversion tracking</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Real-time partner dashboards</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Automated payout calculations</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-white">Results, Not Impressions</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Pay for outcomes—demos booked, deals closed, revenue generated. Not vanity metrics or impression counts.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>Performance-based payouts</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>Revenue share or per-deal models</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>Clear ROI measurement</span>
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
