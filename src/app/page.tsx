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
        <section className="mb-32 mt-16 sm:mt-0">
          {/* Elegant Section Header */}
          <div className="relative mb-20">
            {/* Subtle ambient background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/[0.07] via-cyan-500/[0.03] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.1] mb-8">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400">Refer Labs</span> Is Different
              </h2>
              <p className="text-slate-300 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed max-w-3xl mx-auto">
                Trusted recommendations are the foundation of professional services growth. When someone stakes their reputation on your work, that introduction carries weight no ad can match.
              </p>
            </div>
          </div>

          {/* Four Referral Channels - Refined Cards */}
          <div className="relative mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
                How We Activate a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Recommendation System</span>
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                Refer Labs helps you systematically activate four powerful referral channels.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Channel 1: Customer Network */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 lg:p-10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="h-7 w-7 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-1">Your Customer Network</h4>
                      <p className="text-cyan-400/80 text-sm font-medium">Turn satisfied clients into advocates</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Turn satisfied clients into advocates with trackable links and automated rewards. They already trust you—make it easy for them to share.
                  </p>
                </div>
              </div>

              {/* Channel 2: LinkedIn Influencers */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 lg:p-10 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <LinkedinIcon className="h-7 w-7 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-1">LinkedIn Influencers</h4>
                      <p className="text-blue-400/80 text-sm font-medium">B2B thought leader activations</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Activate B2B thought leaders who reach your ideal buyers daily. Full attribution so you know exactly which creators drive pipeline.
                  </p>
                </div>
              </div>

              {/* Channel 3: Agencies & Strategic Partners */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 lg:p-10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-7 w-7 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-1">Agencies & Strategic Partners</h4>
                      <p className="text-purple-400/80 text-sm font-medium">White-glove partner programs</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Build white-glove partner programs with complementary service providers. Co-branded materials and professional onboarding included.
                  </p>
                </div>
              </div>

              {/* Channel 4: Consultants & Advisors */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 lg:p-10 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-7 w-7 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-1">Consultants & Advisors</h4>
                      <p className="text-emerald-400/80 text-sm font-medium">Trusted expert referrals</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Engage trusted experts who guide buying decisions. Discreet tracking and revenue share models that respect professional relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics Dashboard */}
          <div className="relative mb-20">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.03] via-transparent to-cyan-500/[0.03] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="text-center mb-10">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400/70 mb-3">Referral Program Performance</p>
                  <p className="text-slate-400 text-sm">Last 90 days</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
                  {/* Metric 1 */}
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">47</p>
                    <p className="text-sm text-slate-400 font-medium">Active Partners</p>
                  </div>
                  {/* Metric 2 */}
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">89</p>
                    <p className="text-sm text-slate-400 font-medium">Introductions</p>
                  </div>
                  {/* Metric 3 */}
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">34</p>
                    <p className="text-sm text-slate-400 font-medium">Closed Deals</p>
                  </div>
                  {/* Metric 4 */}
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-2 tracking-tight">$412K</p>
                    <p className="text-sm text-slate-400 font-medium">Attributed Revenue</p>
                  </div>
                  {/* Metric 5 */}
                  <div className="text-center col-span-2 sm:col-span-3 lg:col-span-1">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-400 mb-2 tracking-tight">38%</p>
                    <p className="text-sm text-slate-400 font-medium">Conversion Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Six Core Benefits - Premium Masonry-Style Grid */}
          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                The Power of Trusted Introductions
              </h3>
              <p className="text-slate-400 max-w-xl mx-auto">
                Why referral-driven growth outperforms every other channel.
              </p>
            </div>

            {/* 6 Premium Benefit Cards - Refined Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {/* Card 1: Trust-Based Growth */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Trust-Based Growth</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Referrals carry implicit endorsement. When a trusted advisor recommends you, prospects arrive pre-sold on your credibility.
                  </p>
                  <p className="text-cyan-400 text-sm font-semibold">3-5× higher conversion rates</p>
                </div>
              </div>

              {/* Card 2: Trackable Introductions */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Target className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Trackable Introductions</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Full attribution from first click to deal close. Partners get credited accurately. No more spreadsheet guesswork.
                  </p>
                  <p className="text-emerald-400 text-sm font-semibold">100% attribution accuracy</p>
                </div>
              </div>

              {/* Card 3: Higher-Quality Leads */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Higher-Quality Leads</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Referred prospects are pre-qualified by people who know your ideal client profile. Less tire-kicking, more serious buyers.
                  </p>
                  <p className="text-blue-400 text-sm font-semibold">Higher average deal size</p>
                </div>
              </div>

              {/* Card 4: Shorter Path to Conversion */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Shorter Path to Conversion</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Trust is already established. Skip the awareness stage and move straight to evaluation and decision.
                  </p>
                  <p className="text-purple-400 text-sm font-semibold">40-60% shorter sales cycles</p>
                </div>
              </div>

              {/* Card 5: Measurable ROI */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-amber-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Measurable ROI</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Every dollar of revenue is attributed to its source. Know exactly what your referral program returns.
                  </p>
                  <p className="text-amber-400 text-sm font-semibold">6× average ROI</p>
                </div>
              </div>

              {/* Card 6: Repeatable Activations */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-rose-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-rose-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Repeatable Activations</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Systematize partner onboarding. Automated tracking, rewards, and reporting keep partners engaged.
                  </p>
                  <p className="text-rose-400 text-sm font-semibold">Partner onboarding in minutes</p>
                </div>
              </div>
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
