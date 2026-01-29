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
  Sparkles,
  TrendingUp,
  Eye,
  MousePointer,
  Award,
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
    position: "top-0 left-1 sm:top-4 sm:left-4",
  },
  {
    id: "hero-vip",
    title: "CASE CLOSED",
    text: "Smith & Partners confirmed",
    colors: ["#16a085", "#1abc9c"],
    position: "top-0 right-1 sm:top-4 sm:right-4",
  },
  {
    id: "hero-leaderboard",
    title: "TOP PARTNER",
    text: "Miller CPA referred 18 clients",
    colors: ["#27ae60", "#2ecc71"],
    position: "bottom-0 left-1 sm:bottom-24 sm:left-4",
  },
  {
    id: "hero-revenue",
    title: "REVENUE ATTRIBUTED",
    text: "$425,000 from referrals",
    colors: ["#2980b9", "#3498db"],
    position: "bottom-0 right-1 sm:bottom-24 sm:right-4",
  },
];

const heroBadgeOrientation: Record<string, string> = {
  "hero-referral": "-rotate-2 origin-top-left",
  "hero-vip": "rotate-2 origin-top-right",
  "hero-leaderboard": "rotate-2 origin-bottom-left",
  "hero-revenue": "-rotate-2 origin-bottom-right",
};

const HeroBadge = ({ badge, className = "", isMobile = false }: { badge: HeroBadgeSpec; className?: string; isMobile?: boolean }) => (
  <div
    className={cn(
      "hero-badge pointer-events-none select-none border border-white/20 transition-all duration-300",
      "backdrop-blur-lg shadow-lg shadow-black/15",
      isMobile
        ? "rounded-lg w-[120px] h-[44px] px-2 py-1.5 gap-1.5 opacity-50"
        : "rounded-2xl w-[240px] h-[70px] px-3 py-2.5 gap-2.5 opacity-60",
      "flex flex-row items-center",
      className,
    )}
    style={{
      background: `linear-gradient(135deg, ${badge.colors[0]}dd, ${badge.colors[1]}dd)`,
    }}
  >
    <div className={cn(
      "flex flex-shrink-0 items-center justify-center rounded-lg bg-white/95 shadow-md",
      isMobile ? "h-6 w-6" : "h-10 w-10 rounded-xl"
    )}>
      <Image
        src="/logo.svg"
        alt="Refer Labs"
        width={isMobile ? 18 : 32}
        height={isMobile ? 18 : 32}
        className={isMobile ? "h-4 w-4 object-contain" : "h-7 w-7 object-contain"}
        priority={true}
      />
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <p className={cn(
        "font-bold uppercase tracking-wider text-white/90 leading-tight",
        isMobile ? "text-[6px] tracking-[0.1em] mb-0" : "text-[9px] tracking-[0.16em] mb-0.5"
      )}>
        {badge.title}
      </p>
      <p className={cn(
        "font-semibold leading-tight text-white line-clamp-1",
        isMobile ? "text-[8px]" : "text-xs line-clamp-2"
      )}>
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

const dashboardPreviews = [
  {
    id: "overview",
    title: "Program Overview",
    description: "See your entire referral program at a glance—active partners, pending referrals, and revenue attributed.",
    icon: Eye,
    metrics: [
      { label: "Active Partners", value: "47" },
      { label: "This Month", value: "$128K" },
      { label: "Conversion", value: "34%" },
    ],
    color: "cyan",
  },
  {
    id: "tracking",
    title: "Real-Time Tracking",
    description: "Every click, form fill, and meeting booked is captured with full attribution to the referring partner.",
    icon: MousePointer,
    metrics: [
      { label: "Link Clicks", value: "2,847" },
      { label: "Form Fills", value: "312" },
      { label: "Calls Booked", value: "89" },
    ],
    color: "blue",
  },
  {
    id: "attribution",
    title: "Full Attribution",
    description: "Know exactly which partner, campaign, and content piece drove each conversion—audit-ready data.",
    icon: TrendingUp,
    metrics: [
      { label: "Attributed", value: "94%" },
      { label: "Avg Deal", value: "$18.5K" },
      { label: "ROI", value: "12.4x" },
    ],
    color: "emerald",
  },
  {
    id: "payouts",
    title: "Automated Rewards",
    description: "Commissions calculate automatically. Partners get notified. Finance gets clean ledgers.",
    icon: Award,
    metrics: [
      { label: "Paid Out", value: "$42K" },
      { label: "Pending", value: "$8.2K" },
      { label: "Partners", value: "23" },
    ],
    color: "purple",
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
        <section className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-140px)] py-14 sm:py-12 mb-8 sm:mb-0">
          {/* Corner notification badges - Mobile (smaller, in corners) */}
          <div className="pointer-events-none absolute inset-0 block sm:hidden">
            {heroBadges.map((badge) => (
              <HeroBadge
                key={badge.id}
                badge={badge}
                isMobile={true}
                className={cn("absolute", badge.position, heroBadgeOrientation[badge.id])}
              />
            ))}
          </div>

          {/* Corner notification badges - Desktop (xl+) */}
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {heroBadges.map((badge) => (
              <HeroBadge
                key={badge.id}
                badge={badge}
                className={cn("absolute", badge.position, heroBadgeOrientation[badge.id])}
              />
            ))}
          </div>

          <div className="relative z-10 space-y-3 sm:space-y-6 px-4 sm:px-0 -mt-4 sm:mt-0">
            {/* Mobile: 4 lines, 2 words each */}
            <h1 className="font-black text-white max-w-4xl mx-auto tracking-tight">
              {/* Mobile layout - 4 lines, 2 words per line */}
              <span className="block sm:hidden text-[1.625rem] leading-[1.2]">
                <span className="block">Launch Successful</span>
                <span className="block">Referral Programs</span>
                <span className="block">For <span className="text-cyan-400">Professional</span></span>
                <span className="block"><span className="text-cyan-400">Services</span> Firms</span>
              </span>
              {/* Desktop layout */}
              <span className="hidden sm:block sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[3rem] leading-[1.15]">
                <span className="block whitespace-nowrap">Launch Successful Referral Programs</span>
                <span className="block whitespace-nowrap">
                  For <span className="text-cyan-400">Professional Services</span> Firms
                </span>
              </span>
            </h1>
            <p className="text-[13px] sm:text-base md:text-lg lg:text-[1.125rem] text-slate-300 max-w-3xl mx-auto leading-relaxed sm:px-0 lg:whitespace-nowrap">
              Turn Clients, Partners, Creators & LinkedIn Influencers Into a Fully Tracked Revenue Stream
            </p>
            <div className="pt-1 sm:pt-4">
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
            Why Refer Labs — Premium Unified Section
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24 mt-16 sm:mt-0">
          {/* Premium Hero Header */}
          <div className="relative mb-16">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/8 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/6 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-teal-500/15 border border-cyan-500/30 mb-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">Purpose-Built for Professional Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-black text-white max-w-5xl mx-auto leading-[1.1]">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400">Refer Labs</span> Is Different
              </h2>
              <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed">
                Most referral tools were built for e-commerce. We built ours for{" "}
                <span className="text-white font-semibold">law firms, accountants, consultants, and advisory practices</span>—where growth happens through trusted introductions, not discount codes.
              </p>
            </div>
          </div>

          {/* GTM Leader Value Proposition */}
          <div className="relative mb-16">
            <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-900/80 p-8 sm:p-10 lg:p-12 overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="text-center mb-10">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 mb-3">For GTM Leaders & Founders</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Where Refer Labs Fits in Your Stack
                  </h3>
                  <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Refer Labs isn't another marketing tool to manage. It's a <span className="text-white">revenue infrastructure layer</span> that turns your existing network into a systematic, trackable growth channel.
                  </p>
                </div>

                {/* Three pillars */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-5">
                      <Building2 className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Plugs Into Existing Workflows</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Works with your CRM, billing, and team. No engineering required. Partners get their own branded portal. Your team gets a dashboard.
                    </p>
                  </div>

                  <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mb-5">
                      <Target className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Full Attribution Stack</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Every click, demo, and closed deal is tracked end-to-end. Finance gets audit-ready reports. Partners see their impact in real time.
                    </p>
                  </div>

                  <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center mb-5">
                      <BarChart3 className="h-6 w-6 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Performance-Based Model</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pay only for results—demos booked, deals closed, revenue generated. No retainers. No minimum spend. Clear ROI from day one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Six Core Benefits - Premium Grid */}
          <div className="relative mb-16">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">Why Referrals Win</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                The Power of Trusted Introductions
              </h3>
            </div>

            {/* 6 Premium Benefit Cards - 3x2 Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1: Trust-Based Growth */}
              <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-6 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/25 flex items-center justify-center">
                      <Users className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Trust-Based Growth</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Referrals carry implicit endorsement. When a trusted advisor recommends you, prospects arrive pre-sold on your credibility.
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>3-5× higher conversion rates</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Trackable Introductions */}
              <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-6 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/25 flex items-center justify-center">
                      <Target className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Trackable Introductions</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Full attribution from first click to deal close. Partners get credited accurately. No more spreadsheet guesswork.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>100% attribution accuracy</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Higher-Quality Leads */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/25 flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Higher-Quality Leads</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Referred prospects are pre-qualified by people who know your ideal client profile. Less tire-kicking, more serious buyers.
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Higher average deal size</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Shorter Path to Conversion */}
              <div className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-6 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/25 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Shorter Path to Conversion</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Trust is already established. Skip the awareness stage and move straight to evaluation and decision.
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>40-60% shorter sales cycles</span>
                  </div>
                </div>
              </div>

              {/* Card 5: Measurable ROI */}
              <div className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-6 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/25 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-amber-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Measurable ROI</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Every dollar of revenue is attributed to its source. Know exactly what your referral program returns—and prove it to stakeholders.
                  </p>
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>6× average ROI</span>
                  </div>
                </div>
              </div>

              {/* Card 6: Repeatable Partner Activations */}
              <div className="group relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-6 hover:border-rose-500/40 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/25 flex items-center justify-center">
                      <Gift className="h-6 w-6 text-rose-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Repeatable Activations</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Systematize partner onboarding. Automated tracking, rewards, and reporting keep partners engaged and referring.
                  </p>
                  <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Partner onboarding in minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Advantage - Why Not Generic Tools */}
          <div className="relative mb-16">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] via-slate-900/50 to-white/[0.03] p-8 sm:p-10">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left: The Problem */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400/80 mb-3">Why Generic Tools Fail</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">Built for E-commerce, Not Professional Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">✕</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Coupon-code architecture</p>
                        <p className="text-slate-500 text-sm">Designed for $50 Shopify orders, not $50K advisory engagements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">✕</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Public affiliate links</p>
                        <p className="text-slate-500 text-sm">Looks unprofessional when shared by trusted advisors</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">✕</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">No long-cycle tracking</p>
                        <p className="text-slate-500 text-sm">Attribution breaks when deals take months to close</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: The Solution */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3">The Refer Labs Approach</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">Purpose-Built for High-Value Relationships</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Relationship-first architecture</p>
                        <p className="text-slate-500 text-sm">Designed for warm introductions and trusted recommendations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">White-label partner portals</p>
                        <p className="text-slate-500 text-sm">Professional, discreet experience that reflects your brand</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Full-cycle attribution</p>
                        <p className="text-slate-500 text-sm">Track deals from first click to closed revenue, however long it takes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How We Activate a Recommendation System - Four Channels */}
          <div className="relative">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">Where We Fit</p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
                How We Activate a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Recommendation System</span>
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Refer Labs plugs into your existing workflow and systematically activates four powerful referral channels—each with full tracking, attribution, and automated rewards.
              </p>
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
                          <h4 className="text-xl font-bold text-cyan-400">{program.title}</h4>
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
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            How The Referral Flow Works + Dashboard Preview
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

          {/* Flow Steps */}
          <div className="relative mb-16">
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

          {/* Dashboard Preview Cards */}
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Your Dashboard at a Glance</h3>
              <p className="text-slate-400 mt-2">Real-time tracking, attribution, and performance metrics in one view</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardPreviews.map((preview) => {
                const Icon = preview.icon;
                const colorClasses: Record<string, { border: string; bg: string; icon: string; metric: string }> = {
                  cyan: { border: "border-cyan-500/30", bg: "from-cyan-500/10 to-cyan-500/5", icon: "text-cyan-400", metric: "text-cyan-300" },
                  blue: { border: "border-blue-500/30", bg: "from-blue-500/10 to-blue-500/5", icon: "text-blue-400", metric: "text-blue-300" },
                  emerald: { border: "border-emerald-500/30", bg: "from-emerald-500/10 to-emerald-500/5", icon: "text-emerald-400", metric: "text-emerald-300" },
                  purple: { border: "border-purple-500/30", bg: "from-purple-500/10 to-purple-500/5", icon: "text-purple-400", metric: "text-purple-300" },
                };
                const colors = colorClasses[preview.color];

                return (
                  <div
                    key={preview.id}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all hover:scale-[1.02]",
                      colors.border,
                      colors.bg
                    )}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Icon className={cn("h-5 w-5", colors.icon)} />
                      </div>
                      <h4 className="font-semibold text-white text-sm">{preview.title}</h4>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {preview.description}
                    </p>

                    {/* Mock Metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      {preview.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <p className={cn("text-lg font-bold", colors.metric)}>{metric.value}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wide">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                See the Full Playbook
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
