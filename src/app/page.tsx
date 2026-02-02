/* eslint-disable react/no-unescaped-entities */

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  LinkedinIcon,
  MessageSquare,
  Users,
  Building2,
  TrendingUp,
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

      <main className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-8 sm:pt-16">

        {/* ─────────────────────────────────────────────────────────
            Hero Section — 2-Column Layout
        ───────────────────────────────────────────────────────── */}
        <section className="relative py-6 sm:py-16 lg:py-20 mb-10 sm:mb-24">
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column: Text + CTA */}
            <div className="relative z-10 text-center lg:text-left">
              <h1 className="font-black text-white tracking-tight mb-6">
                <span className="block text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.5rem] leading-[1.1]">
                  Start Earning
                </span>
                <span className="block text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.5rem] leading-[1.1]">
                  Additional <span className="text-cyan-400">Referral Revenue</span>
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-5 sm:mb-8">
                Turn Clients, Partners, Creators & LinkedIn Influencers Into a Fully Tracked Growth Stream
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
                >
                  Schedule a Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Dashboard Mockup */}
            <div className="relative">
              {/* Glow effect behind dashboard */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-cyan-500/5 to-transparent rounded-3xl blur-2xl" />

              {/* Dashboard Container */}
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/80 p-4 sm:p-6 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Referral Dashboard</p>
                      <p className="text-slate-500 text-xs">Last 90 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    <span className="text-emerald-400 text-xs font-medium">Live</span>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-3 sm:mb-5">
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className="text-xl sm:text-2xl font-black text-white">47</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Partners</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className="text-xl sm:text-2xl font-black text-white">89</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Intros</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className="text-xl sm:text-2xl font-black text-white">34</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Deals</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <p className="text-xl sm:text-2xl font-black text-cyan-400">38%</p>
                    <p className="text-[9px] text-cyan-400/70 uppercase tracking-wider mt-0.5">Conv.</p>
                  </div>
                </div>

                {/* Revenue Highlight */}
                <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 border border-cyan-500/20 p-3 sm:p-4 mb-3 sm:mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Attributed Revenue</p>
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">$412,000</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <TrendingUp className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-semibold">+24%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity - Hidden on smallest mobile for compactness */}
                <div className="hidden xs:block space-y-1.5 sm:space-y-2">
                  <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">Recent Activity</p>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">Deal closed: $18,500</p>
                      <p className="text-slate-500 text-[10px] sm:text-xs">Referred by Anderson Law</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="h-7 w-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">New introduction received</p>
                      <p className="text-slate-500 text-xs">From Miller CPA Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            How We Activate a Recommendation System (MOVED UP)
        ───────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-32">
          <div className="relative">
            <div className="text-center mb-6 sm:mb-12">
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4">
                How We Activate a <span className="text-cyan-400">Recommendation System</span>
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg">
                Refer Labs helps you systematically activate four powerful referral channels.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
              {/* Channel 1: Customer Network */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:p-8 lg:p-10 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 sm:gap-5 mb-3 sm:mb-6">
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 sm:h-7 sm:w-7 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1">Customer Network</h4>
                      <p className="text-cyan-400/80 text-[10px] sm:text-sm font-medium">Turn clients into advocates</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed hidden sm:block">
                    Turn satisfied clients into advocates with trackable links and automated rewards. They already trust you—make it easy for them to share.
                  </p>
                </div>
              </div>

              {/* Channel 2: LinkedIn Influencers */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:p-8 lg:p-10 hover:border-blue-500/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 sm:gap-5 mb-3 sm:mb-6">
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <LinkedinIcon className="h-5 w-5 sm:h-7 sm:w-7 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1">LinkedIn Influencers</h4>
                      <p className="text-blue-400/80 text-[10px] sm:text-sm font-medium">B2B thought leaders</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed hidden sm:block">
                    Activate B2B thought leaders who reach your ideal buyers daily. Full attribution so you know exactly which creators drive pipeline.
                  </p>
                </div>
              </div>

              {/* Channel 3: Agencies & Strategic Partners */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:p-8 lg:p-10 hover:border-purple-500/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 sm:gap-5 mb-3 sm:mb-6">
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 sm:h-7 sm:w-7 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1">Strategic Partners</h4>
                      <p className="text-purple-400/80 text-[10px] sm:text-sm font-medium">White-glove programs</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed hidden sm:block">
                    Build structured partner programs with complementary service providers. Dedicated portals and custom reward structures for each partner tier.
                  </p>
                </div>
              </div>

              {/* Channel 4: Consultants & Advisors */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:p-8 lg:p-10 hover:border-emerald-500/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 sm:gap-5 mb-3 sm:mb-6">
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1">Consultants & Advisors</h4>
                      <p className="text-emerald-400/80 text-[10px] sm:text-sm font-medium">Expert referrals</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed hidden sm:block">
                    Engage trusted experts who guide buying decisions. Discreet tracking and revenue share models that respect professional relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            The Only Referral Platform — Ultra Premium Design
        ───────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-32">
          <div className="relative">
            {/* Background ambience */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gradient-radial from-cyan-500/[0.03] via-cyan-500/[0.01] to-transparent rounded-full blur-3xl" />
            </div>

            {/* Section Header */}
            <div className="text-center mb-6 sm:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.1] mb-3 sm:mb-6">
                The Only Referral Platform <span className="text-cyan-400">Built for Professional Services</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-xl leading-relaxed max-w-3xl mx-auto">
                Trusted recommendations are the foundation of professional services growth. But without proper attribution, you're leaving revenue on the table every single month.
              </p>
            </div>

            {/* Four Notification Badges - Evenly Spaced Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-8 sm:mb-16 lg:mb-20 max-w-5xl mx-auto">
              <div className="flex justify-center">
                <HeroBadge badge={heroBadges[0]} className="-rotate-1" />
              </div>
              <div className="flex justify-center">
                <HeroBadge badge={heroBadges[1]} className="rotate-1" />
              </div>
              <div className="flex justify-center">
                <HeroBadge badge={heroBadges[2]} className="-rotate-1" />
              </div>
              <div className="flex justify-center">
                <HeroBadge badge={heroBadges[3]} className="rotate-1" />
              </div>
            </div>

            {/* Premium Tick-Led Benefits - Horizontal Flow */}
            <div className="space-y-3 sm:space-y-6">
              {/* Benefit 1 */}
              <div className="group relative flex items-start gap-3 sm:gap-6 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent hover:border-cyan-500/20 hover:from-cyan-500/[0.04] transition-all duration-300">
                <div className="flex-shrink-0 h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/10 transition-all">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Never Lose Attribution Again</h4>
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap w-fit">30-day cookies</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-base leading-relaxed">Every referral tracked from first click to closed deal. Partners get credited accurately.</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="group relative flex items-start gap-3 sm:gap-6 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent hover:border-emerald-500/20 hover:from-emerald-500/[0.04] transition-all duration-300">
                <div className="flex-shrink-0 h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-emerald-500/10 transition-all">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Real-Time Revenue Visibility</h4>
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap w-fit">Live dashboards</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-base leading-relaxed">See which partners and channels drive revenue—not just clicks.</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="group relative flex items-start gap-3 sm:gap-6 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent hover:border-purple-500/20 hover:from-purple-500/[0.04] transition-all duration-300">
                <div className="flex-shrink-0 h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-purple-500/10 transition-all">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Built for Complex Sales Cycles</h4>
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap w-fit">6-18 month tracking</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-base leading-relaxed">Professional services deals take months. We track the entire cycle.</p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="group relative flex items-start gap-3 sm:gap-6 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent hover:border-amber-500/20 hover:from-amber-500/[0.04] transition-all duration-300">
                <div className="flex-shrink-0 h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-500/10 transition-all">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Audit-Ready Attribution Records</h4>
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap w-fit">Exportable trails</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-base leading-relaxed">Complete logs for every referral. Finance gets clean records.</p>
                </div>
              </div>

              {/* Benefit 5 */}
              <div className="group relative flex items-start gap-3 sm:gap-6 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent hover:border-rose-500/20 hover:from-rose-500/[0.04] transition-all duration-300">
                <div className="flex-shrink-0 h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/30 flex items-center justify-center group-hover:from-rose-500/30 group-hover:to-rose-500/10 transition-all">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Partner Portals That Scale</h4>
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap w-fit">Unlimited partners</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-base leading-relaxed">Every partner gets a branded portal with unique links and stats.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            What Happens If You Do Nothing?
        ───────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-32">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-white/[0.03] to-transparent p-5 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]" />

            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-12">
                <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-3 sm:mb-6">
                  What Happens If You Do <span className="text-red-400">Nothing?</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-xl leading-relaxed max-w-3xl mx-auto">
                  Informal referral systems create a hard revenue ceiling you can't break through.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto">
                {/* Problem 1 */}
                <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 sm:p-8">
                  <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-base sm:text-xl font-black">$</span>
                    </div>
                    <h4 className="text-xs sm:text-lg font-bold text-white">Lost Attribution = Lost Revenue</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                    Partners who don't see credit for their referrals stop referring.
                  </p>
                </div>

                {/* Problem 2 */}
                <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 sm:p-8">
                  <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-base sm:text-xl font-black">⚠</span>
                    </div>
                    <h4 className="text-xs sm:text-lg font-bold text-white">Spreadsheets Don't Scale</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                    Manual tracking breaks when you hit 10+ partners.
                  </p>
                </div>

                {/* Problem 3 */}
                <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 sm:p-8">
                  <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-base sm:text-xl font-black">📉</span>
                    </div>
                    <h4 className="text-xs sm:text-lg font-bold text-white">Can't Optimize Without Tracking</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                    Without data, you're blind to your highest-ROI channel.
                  </p>
                </div>

                {/* Problem 4 */}
                <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 sm:p-8">
                  <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-base sm:text-xl font-black">🚫</span>
                    </div>
                    <h4 className="text-xs sm:text-lg font-bold text-white">The Revenue Ceiling Is Real</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                    Informal referrals cap out at a fraction of what's possible.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Why Now?
        ───────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-3 sm:mb-6">
              Why <span className="text-cyan-400">Now?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Professional services growth is shifting to low-friction, scalable referral transactions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Reason 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 sm:p-8 hover:border-cyan-500/30 transition-all duration-300">
                <div className="mb-3 sm:mb-6">
                  <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-2 sm:mb-4">
                    <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-xs sm:text-xl font-bold text-white">Frictionless Transactions</h4>
                </div>
                <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                  Today's buyers transact online. Tracked links convert faster.
                </p>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 sm:p-8 hover:border-purple-500/30 transition-all duration-300">
                <div className="mb-3 sm:mb-6">
                  <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center mb-2 sm:mb-4">
                    <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                  <h4 className="text-xs sm:text-xl font-bold text-white">Attribution Technology</h4>
                </div>
                <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                  Track end-to-end with e-commerce precision.
                </p>
              </div>
            </div>

            {/* Reason 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 sm:p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="mb-3 sm:mb-6">
                  <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mb-2 sm:mb-4">
                    <Users className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-xs sm:text-xl font-bold text-white">Network Is Your Moat</h4>
                </div>
                <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                  Build compounding advantages competitors can't replicate.
                </p>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 sm:p-8 hover:border-amber-500/30 transition-all duration-300">
                <div className="mb-3 sm:mb-6">
                  <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center mb-2 sm:mb-4">
                    <Building2 className="h-4 w-4 sm:h-6 sm:w-6 text-amber-400" />
                  </div>
                  <h4 className="text-xs sm:text-xl font-bold text-white">New Revenue Streams</h4>
                </div>
                <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed hidden sm:block">
                  Partners and influencers become consistent revenue sources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            ROI Calculator CTA
        ───────────────────────────────────────────────────────── */}
        <section className="mb-12 sm:mb-24">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-transparent p-5 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(92,225,230,0.1),transparent_50%)]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-lg sm:text-3xl font-black text-white mb-2 sm:mb-3">
                  Model Your Referral Revenue Potential
                </h2>
                <p className="text-slate-300 text-xs sm:text-base max-w-xl hidden sm:block">
                  Calculate how much revenue you're losing to attribution gaps.
                </p>
              </div>
              <Link
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300 whitespace-nowrap"
              >
                Run the Numbers
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Final CTA
        ───────────────────────────────────────────────────────── */}
        <section>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl sm:rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-5 py-10 sm:px-12 sm:py-16 text-center">
              <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-4xl font-black text-white">
                  Stop Losing Referral Revenue
                </h2>
                <p className="text-sm sm:text-lg text-slate-300">
                  Every partner credited. Every deal tracked. Every dollar attributed.
                </p>
                <div className="pt-2 sm:pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
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
