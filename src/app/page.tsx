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
                <span className="block">Stop Losing</span>
                <span className="block">Referral Revenue</span>
                <span className="block">Due to <span className="text-cyan-400">Attribution</span></span>
                <span className="block"><span className="text-cyan-400">Gaps</span></span>
              </span>
              {/* Desktop layout */}
              <span className="hidden sm:block sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[3rem] leading-[1.15]">
                <span className="block">Stop Losing Referral Revenue</span>
                <span className="block">
                  Due to <span className="text-cyan-400">Attribution Gaps</span>
                </span>
              </span>
            </h1>
            <p className="text-[13px] sm:text-base md:text-lg lg:text-[1.125rem] text-slate-300 max-w-3xl mx-auto leading-relaxed sm:px-0">
              The only referral platform built for professional services. We guarantee you never lose attribution on a referral again.
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
            Why Refer Labs Is Different — Ultra Premium Section
        ───────────────────────────────────────────────────────── */}
        <section className="mb-32 mt-16 sm:mt-0">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.1] mb-6">
              The Only Referral Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400">Built for Professional Services</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Trusted recommendations are the foundation of professional services growth. But without proper attribution, you're leaving revenue on the table every single month.
            </p>
          </div>

          {/* Main Feature Block: Dashboard Visual + Benefits */}
          <div className="relative mb-20">
            {/* Background ambience */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-cyan-500/[0.06] via-cyan-500/[0.02] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Dashboard Mockup Visual */}
              <div className="relative order-2 lg:order-1">
                <div className="relative">
                  {/* Glow effect behind dashboard */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-cyan-500/5 to-transparent rounded-3xl blur-2xl" />

                  {/* Dashboard Container */}
                  <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/80 p-6 sm:p-8 shadow-2xl shadow-black/40 overflow-hidden">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Referral Dashboard</p>
                          <p className="text-slate-500 text-xs">Last 90 days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
                        <span className="text-emerald-400 text-xs font-medium">Live</span>
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                      <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-2xl sm:text-3xl font-black text-white">47</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Partners</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-2xl sm:text-3xl font-black text-white">89</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Intros</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-2xl sm:text-3xl font-black text-white">34</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Deals</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <p className="text-2xl sm:text-3xl font-black text-cyan-400">38%</p>
                        <p className="text-[10px] text-cyan-400/70 uppercase tracking-wider mt-1">Conv.</p>
                      </div>
                    </div>

                    {/* Revenue Highlight */}
                    <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 border border-cyan-500/20 p-5 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Attributed Revenue</p>
                          <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">$412,000</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-xs font-semibold">+24%</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <p className="text-slate-500 text-xs uppercase tracking-wider">Recent Activity</p>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">Deal closed: $18,500</p>
                          <p className="text-slate-500 text-xs">Referred by Anderson Law</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-400" />
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

              {/* Right: Benefits with Ticks */}
              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  {/* Benefit 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Never Lose Attribution Again</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Every referral tracked from first click to closed deal. Partners get credited accurately, every single time.</p>
                      <p className="text-cyan-400 text-sm font-semibold mt-2">30-day attribution cookies</p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Real-Time Revenue Visibility</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">See which partners, campaigns, and channels drive revenue—not just clicks. Attribution data flows into dashboards instantly.</p>
                      <p className="text-emerald-400 text-sm font-semibold mt-2">Live dashboards</p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Automated Partner Payouts</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Stripe-powered payouts settle automatically when deals close. Clean ledgers for finance review.</p>
                      <p className="text-blue-400 text-sm font-semibold mt-2">Set thresholds and rules</p>
                    </div>
                  </div>

                  {/* Benefit 4 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Built for Complex Sales Cycles</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Professional services deals take months. We track attribution across your entire sales cycle.</p>
                      <p className="text-purple-400 text-sm font-semibold mt-2">6-18 month tracking</p>
                    </div>
                  </div>

                  {/* Benefit 5 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Audit-Ready Attribution Records</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Complete attribution logs for every referral. Finance and compliance teams get clean records they can verify.</p>
                      <p className="text-amber-400 text-sm font-semibold mt-2">Exportable audit trails</p>
                    </div>
                  </div>

                  {/* Benefit 6 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-rose-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Partner Portals That Scale</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Every partner gets a branded portal with their unique link, performance stats, and reward tracking.</p>
                      <p className="text-rose-400 text-sm font-semibold mt-2">Unlimited partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Four Channels Section */}
          <div className="relative">
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
                    Build structured partner programs with complementary service providers. Dedicated portals and custom reward structures for each partner tier.
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
        </section>

        {/* ─────────────────────────────────────────────────────────
            How Referrals Flow Through the Platform
        ───────────────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
              How Referrals Flow Through the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Platform</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              From partner onboarding to automated payouts—every step is tracked and attributable.
            </p>
          </div>

          {/* Flow Steps - 4 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 01 - Partner Onboarding */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-5xl font-black text-cyan-500/20 mb-4">01</div>
                <h4 className="text-xl font-bold text-white mb-3">Partner Onboarding</h4>
                <p className="text-slate-400 leading-relaxed">Partners receive unique tracked links and a branded portal to monitor their performance.</p>
              </div>
            </div>

            {/* Step 02 - Tracked Interactions */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-5xl font-black text-blue-500/20 mb-4">02</div>
                <h4 className="text-xl font-bold text-white mb-3">Tracked Interactions</h4>
                <p className="text-slate-400 leading-relaxed">Every click, form submission, demo booking, and conversion is captured in real time.</p>
              </div>
            </div>

            {/* Step 03 - Full Attribution */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-purple-500/30 transition-all duration-300">
                <div className="text-5xl font-black text-purple-500/20 mb-4">03</div>
                <h4 className="text-xl font-bold text-white mb-3">Full Attribution</h4>
                <p className="text-slate-400 leading-relaxed">Partner, campaign, and link IDs flow into dashboards with audit-ready tracking.</p>
              </div>
            </div>

            {/* Step 04 - Automated Rewards */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="text-5xl font-black text-emerald-500/20 mb-4">04</div>
                <h4 className="text-xl font-bold text-white mb-3">Automated Rewards</h4>
                <p className="text-slate-400 leading-relaxed">Revenue share, credits, or cash payouts settle automatically with clear ledgers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            What Happens If You Do Nothing?
        ───────────────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-white/[0.03] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
                  What Happens If You Do <span className="text-red-400">Nothing?</span>
                </h2>
                <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                  Informal referral systems create a hard revenue ceiling you can't break through.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Problem 1 */}
                <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-xl font-black">$</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Lost Attribution = Lost Revenue</h4>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Partners who don't see credit for their referrals stop referring. Without attribution, you're guessing at rewards—and your best sources dry up.
                  </p>
                </div>

                {/* Problem 2 */}
                <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-xl font-black">⚠</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Spreadsheets Don't Scale</h4>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Manual tracking breaks when you hit 10+ partners. Missed attribution, delayed payouts, and partner disputes become operational overhead.
                  </p>
                </div>

                {/* Problem 3 */}
                <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-xl font-black">📉</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">You Can't Optimize What You Don't Track</h4>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Without data on which partners and campaigns drive revenue, you're blind to your highest-ROI growth channel.
                  </p>
                </div>

                {/* Problem 4 */}
                <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-xl font-black">🚫</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">The Revenue Ceiling Is Real</h4>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Informal referrals cap out at a fraction of what's possible. Systemized referrals with attribution scale infinitely.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-slate-300 text-lg font-semibold max-w-3xl mx-auto">
                  Every month without attribution is a month of lost referral revenue you can't recover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            Why Now?
        ───────────────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Now?</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Professional services growth is shifting to low-friction, scalable referral transactions. Firms that systemize now capture the opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Reason 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-cyan-500/30 transition-all duration-300">
                <div className="mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Modern Buyers Expect Frictionless Transactions</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Today's buyers research, compare, and transact online. Referrals that require manual handoffs lose momentum. Tracked links convert faster.
                </p>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-purple-500/30 transition-all duration-300">
                <div className="mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Attribution Technology Is Finally Here</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Professional services have historically relied on "trust me" attribution. Now you can track end-to-end with the same precision as e-commerce.
                </p>
              </div>
            </div>

            {/* Reason 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Your Network Is Your Moat</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  The firms that build systematic referral engines now create compounding advantages competitors can't replicate.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 px-8 py-5">
              <CheckCircle2 className="h-6 w-6 text-cyan-400 flex-shrink-0" />
              <p className="text-white text-lg font-semibold">
                We guarantee you never lose attribution on a referral again
              </p>
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
                  Model Your Referral Revenue Potential
                </h2>
                <p className="text-slate-300 max-w-xl">
                  Calculate how much revenue you're losing to attribution gaps and what systematic referrals could generate in 90 days.
                </p>
              </div>
              <Link
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300 whitespace-nowrap"
              >
                Run the Numbers
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
                  Stop Losing Referral Revenue to Attribution Gaps
                </h2>
                <p className="text-lg text-slate-300">
                  We guarantee you never lose attribution on a referral again. Every partner credited. Every deal tracked. Every dollar attributed.
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
