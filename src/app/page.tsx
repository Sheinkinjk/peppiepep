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

const clientTestimonials = [
  {
    quote:
      "We went live in days and immediately had clarity on what was working. The dashboard made attribution simple—no more chasing spreadsheets.",
    name: "Sarah Nguyen",
    title: "Head of Growth",
    company: "Altitude Advisory",
    avatar: "SN",
    avatarBg: "from-cyan-500 to-teal-500",
  },
  {
    quote:
      "Refer Labs turned happy customers into a measurable acquisition channel. We can finally see which partners drive real outcomes.",
    name: "Michael Torres",
    title: "Founder & CEO",
    company: "Torres Legal Group",
    avatar: "MT",
    avatarBg: "from-blue-500 to-indigo-500",
  },
  {
    quote:
      "The tracking is bulletproof. Every action from clicking the link to converting is captured and attributed properly.",
    name: "Priya Shah",
    title: "Revenue Operations Lead",
    company: "Nexus Consulting",
    avatar: "PS",
    avatarBg: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "We wanted a referral program that plugged into our existing sales process. Refer Labs gave us clean tracking and better visibility.",
    name: "James O'Connor",
    title: "Managing Director",
    company: "O'Connor & Partners",
    avatar: "JO",
    avatarBg: "from-emerald-500 to-green-500",
  },
  {
    quote:
      "What surprised us most was how professional the end-to-end experience feels. The referral pages look premium and prospects convert.",
    name: "Emily Chen",
    title: "Marketing Director",
    company: "Precision Wealth",
    avatar: "EC",
    avatarBg: "from-amber-500 to-orange-500",
  },
  {
    quote:
      "We used to run partnerships manually and it was messy. Now we have a structured flow and can monitor performance in one place.",
    name: "Daniel Robertson",
    title: "Partnerships Manager",
    company: "Summit Accounting",
    avatar: "DR",
    avatarBg: "from-rose-500 to-red-500",
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
            Why Refer Labs — Built for Professional Services
        ───────────────────────────────────────────────────────── */}
        <section className="mb-24 mt-16 sm:mt-0">
          {/* Premium Section Header - Why Refer Labs */}
          <div className="text-center space-y-5 mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-300 uppercase tracking-wide">Why Refer Labs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-4xl mx-auto leading-tight">
              The Only Referral Platform Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">High-Value Professional Services</span>
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-medium">
              Law firms, accounting practices, consultants, and advisory businesses need referral tracking that matches the sophistication of their services—not e-commerce discount tools.
            </p>
          </div>

          {/* Industry-Specific Value Props - Large Premium Cards */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent rounded-3xl blur-2xl" />

            <div className="relative grid md:grid-cols-2 gap-7">
              {/* Card 1: Legal Practices */}
              <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-9 hover:border-cyan-400/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 to-transparent rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-start gap-5 mb-7">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-teal-500/25 border-2 border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-8 w-8 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Built for Law Firms & Legal Practices</h3>
                      <p className="text-cyan-300 text-sm font-semibold uppercase tracking-wider">Trust-Based Referrals</p>
                    </div>
                  </div>
                  <p className="text-slate-200 leading-relaxed mb-7 text-base">
                    Track high-value client introductions from other firms, barristers, and professional networks with full attribution—from first click to case closure. White-label portals maintain your firm's prestige.
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Multi-month deal cycles</strong> — Track cases from referral to settlement</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Discreet tracking</strong> — No public affiliate links or discount codes</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Referral fee calculations</strong> — Automated payout tracking that finance can audit</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Accounting & Advisory */}
              <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-9 hover:border-emerald-400/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/15 to-transparent rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-start gap-5 mb-7">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-green-500/25 border-2 border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-8 w-8 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Built for Accountants & Financial Advisors</h3>
                      <p className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">Revenue Attribution</p>
                    </div>
                  </div>
                  <p className="text-slate-200 leading-relaxed mb-7 text-base">
                    Turn your professional network into a measurable growth channel. Track introductions from mortgage brokers, wealth managers, and business advisors with bulletproof attribution your CFO will approve.
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Full attribution reporting</strong> — Know exactly which partner drove each client</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Revenue share models</strong> — Percentage-based or per-client commission structures</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Audit-ready ledgers</strong> — Clean reports for compliance and reconciliation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 3: Consultants & Strategic Partners */}
              <div className="group relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-900/95 to-slate-900/70 p-9 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/15 to-transparent rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-start gap-5 mb-7">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border-2 border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <LinkedinIcon className="h-8 w-8 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Built for Consultants & Agencies</h3>
                      <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Partner Programs That Scale</p>
                    </div>
                  </div>
                  <p className="text-slate-200 leading-relaxed mb-7 text-base">
                    Launch white-glove partner programs with technology firms, implementation partners, and complementary consultancies. Full campaign tracking, co-branded materials, and performance analytics.
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">White-label portals</strong> — Partners get branded dashboards to track their performance</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Campaign-level tracking</strong> — Measure ROI by partner, campaign, and content piece</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Custom reward structures</strong> — Per-deal, tiered, or hybrid commission models</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 4: The Refer Labs Edge */}
              <div className="group relative overflow-hidden rounded-3xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-900/40 to-slate-900/70 p-9 hover:border-purple-400/60 transition-all hover:shadow-2xl hover:shadow-purple-500/25">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-start gap-5 mb-7">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-violet-500/30 border-2 border-purple-400/50 flex items-center justify-center flex-shrink-0">
                      <Target className="h-8 w-8 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">The Refer Labs Edge</h3>
                      <p className="text-purple-300 text-sm font-semibold uppercase tracking-wider">Enterprise-Grade, Relationship-First</p>
                    </div>
                  </div>
                  <p className="text-slate-200 leading-relaxed mb-7 text-base">
                    Unlike generic affiliate tools built for e-commerce, Refer Labs is purpose-built for professional services where trust, discretion, and precision attribution are non-negotiable.
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Long sales cycles</strong> — Track deals from introduction to close over 3-12+ months</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Professional compliance</strong> — GDPR, CCPA, Australian privacy built-in</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">No transactional feel</strong> — Sophisticated UX that matches your brand standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Why Other Tools Fall Short - Compact & Subtle */}
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Why Generic Tools Don't Work</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-900/50 border border-slate-700/30 p-4 text-center">
                <p className="text-slate-400 text-xs leading-relaxed">E-commerce tools use discount codes—useless for $15K+ consulting engagements</p>
              </div>
              <div className="rounded-xl bg-slate-900/50 border border-slate-700/30 p-4 text-center">
                <p className="text-slate-400 text-xs leading-relaxed">Spreadsheet tracking loses attribution—partners don't get credit, referrals stop</p>
              </div>
              <div className="rounded-xl bg-slate-900/50 border border-slate-700/30 p-4 text-center">
                <p className="text-slate-400 text-xs leading-relaxed">Generic UX feels cheap—trusted advisors expect professional, discreet experiences</p>
              </div>
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
            Client Testimonials — With Avatars
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-5 hover:border-white/20 transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>

                {/* Author with Avatar */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                  {/* Avatar */}
                  <div className={cn(
                    "h-11 w-11 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
                    testimonial.avatarBg
                  )}>
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>

                  {/* Name & Info */}
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{testimonial.name}</p>
                    <p className="text-sm text-slate-400 truncate">{testimonial.title}</p>
                    <p className="text-xs text-slate-500 truncate">{testimonial.company}</p>
                  </div>
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
