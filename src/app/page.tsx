/* eslint-disable react/no-unescaped-entities */

import { ArrowRight, Gift, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrackedCTA } from "@/components/TrackedCTA";

const referralPillars = [
  {
    number: "01",
    title: "Introductions that skip cold outreach",
    copy:
      "Brand evangelists text concierge-quality links that do the heavy lifting. Most prospects arrive already primed with context, social proof, and urgency.",
    chipBg: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
  },
  {
    number: "02",
    title: "VIP incentives that feel on-brand",
    copy:
      "Refer Labs issues wallet cards, QR lounges, and luxury-grade perks automatically so the experience feels bespoke—never like a generic promo code blast.",
    chipBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
  },
  {
    number: "03",
    title: "CRM imports become referral fuel",
    copy:
      "Upload spreadsheets or sync a CRM export and Refer Labs immediately assigns links, discount words, and share kits for every contact without manual ops.",
    chipBg: "bg-gradient-to-br from-purple-500 to-pink-600 text-white",
  },
  {
    number: "04",
    title: "Automated concierge follow-ups",
    copy:
      "SMS + email journeys keep ambassadors nudged at the perfect cadence with AI-drafted talking points, brand gradients, and instant proofs of reward.",
    chipBg: "bg-gradient-to-br from-orange-500 to-red-600 text-white",
  },
  {
    number: "05",
    title: "Payouts & compliance in one ledger",
    copy:
      "Every referral event syncs to a live ledger so finance teams see status, clawbacks, and pending credits. Approvals take minutes, not days.",
    chipBg: "bg-gradient-to-br from-amber-500 to-yellow-600 text-white",
  },
  {
    number: "06",
    title: "Intelligence on what to scale next",
    copy:
      "Track who referred who, which assets drove highest AOV, and when advocates go quiet—so you know exactly where to double down for your next drop.",
    chipBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
  },
];

const referralNumbers = [
  {
    value: "70%",
    title: "Lower Acquisition Costs",
    copy:
      "Referral-driven customers require significantly less marketing spend because trust is already established.",
    gradient: "from-white/95 to-purple-50/95",
    accentIcon: TrendingUp,
    accentBg: "from-emerald-500 to-emerald-600",
    source: "Nielsen Consumer Trust Index",
    sourceUrl: "https://www.nielsen.com/insights/2021/trust-in-advertising-2021/",
  },
  {
    value: "4×",
    title: "Higher Conversion Rates",
    copy:
      "Referred leads come pre-qualified, making them four times more likely to convert than other channels.",
    gradient: "from-white/95 to-blue-50/95",
    accentIcon: Users,
    accentBg: "from-blue-500 to-blue-600",
    source: "Wharton School of Business",
    sourceUrl: "https://knowledge.wharton.upenn.edu/article/referral-programs/",
  },
  {
    value: "37%",
    title: "Higher Lifetime Value",
    copy:
      "Customers acquired through referrals have a 37% higher retention rate and become more profitable over time.",
    gradient: "from-white/95 to-pink-50/95",
    accentIcon: Gift,
    accentBg: "from-pink-500 to-pink-600",
    source: "Deloitte Research",
    sourceUrl: "https://www2.deloitte.com/us/en/insights/topics/marketing-and-sales-operations/global-marketing-trends.html",
  },
  {
    value: "83%",
    title: "Customers Willing to Refer",
    copy:
      "83% of satisfied customers are willing to recommend products and services — they just need an easy way to do it.",
    gradient: "from-white/95 to-amber-50/95",
    accentIcon: Users,
    accentBg: "from-amber-500 to-amber-600",
    source: "Texas Tech University Study",
    sourceUrl: "https://www.business.txst.edu/news-and-events/news/2020/new-research-shows-83-of-satisfied-customers-are-willing-to-refer.html",
  },
  {
    value: "6×",
    title: "Return on Investment",
    copy:
      "Referral programs deliver an average 6:1 ROI, making them one of the most cost-effective marketing channels.",
    gradient: "from-white/95 to-purple-50/95",
    accentIcon: Sparkles,
    accentBg: "from-purple-500 to-purple-600",
    source: "Influitive B2B Study",
    sourceUrl: "https://influitive.com/resources/state-of-b2b-customer-marketing-report/",
  },
  {
    value: "5 Minutes",
    title: "To Launch With Refer Labs",
    copy:
      "No coding. No complexity. Turn on your referral program and let your customers become your growth engine.",
    gradient: "from-white/95 to-indigo-50/95",
    accentIcon: TrendingUp,
    accentBg: "from-indigo-500 to-indigo-600",
    source: "Refer Labs Promise",
    sourceUrl: "/how-it-works",
  },
];

type ReferralPillar = (typeof referralPillars)[number];

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
    title: "NEW REFERRAL",
    text: "Jenny used a referral link",
    colors: ["#855b4c", "#a87261"],
    position: "top-3 left-3 lg:top-4 lg:left-6",
  },
  {
    id: "hero-vip",
    title: "VIP BOOKING",
    text: "David confirmed a new order",
    colors: ["#2c5248", "#356757"],
    position: "top-3 right-3 lg:top-4 lg:right-6",
  },
  {
    id: "hero-leaderboard",
    title: "LEADERBOARD",
    text: "Jake referred 24 orders",
    colors: ["#1f2c3b", "#3b4e5d"],
    position: "bottom-3 left-3 lg:bottom-6 lg:left-6",
  },
  {
    id: "hero-revenue",
    title: "REVENUE",
    text: "$35,500 generated",
    colors: ["#3a3334", "#54484a"],
    position: "bottom-3 right-3 lg:bottom-6 lg:right-6",
  },
];

// Legacy position classes - no longer used in new redesign
// Kept for reference if needed for other pages

const heroBadgeOrientation: Record<string, string> = {
  "hero-referral": "-rotate-2 origin-top-left",
  "hero-vip": "rotate-2 origin-top-right",
  "hero-leaderboard": "rotate-2 origin-bottom-left",
  "hero-revenue": "-rotate-2 origin-bottom-right",
};

type PartnerLogoSpec = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  backgroundClass?: string;
};

const partnerLogos: PartnerLogoSpec[] = [
  {
    id: "logo-attentive",
    name: "Attentive",
    src: "/partners/attentive.svg",
    width: 180,
    height: 60,
  },
  {
    id: "logo-hubspot",
    name: "HubSpot",
    src: "/partners/hubspot.svg",
    width: 160,
    height: 60,
  },
  {
    id: "logo-resend",
    name: "Resend",
    src: "/partners/resend.svg",
    width: 160,
    height: 60,
  },
  {
    id: "logo-shopify",
    name: "Shopify",
    src: "/partners/shopify.svg",
    width: 150,
    height: 60,
  },
  {
    id: "logo-salesforce",
    name: "Salesforce",
    src: "/partners/salesforce.svg",
    width: 170,
    height: 60,
  },
  {
    id: "logo-mailchimp",
    name: "Mailchimp",
    src: "/partners/mailchimp.svg",
    width: 170,
    height: 60,
  },
  {
    id: "logo-klaviyo",
    name: "Klaviyo",
    src: "/partners/klaviyo.svg",
    width: 170,
    height: 60,
  },
];

const PillarCard = ({ pillar }: { pillar: ReferralPillar }) => (
  <div className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
    <div
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold mb-3 shadow-md ${pillar.chipBg}`}
    >
      {pillar.number}
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{pillar.copy}</p>
  </div>
);

const HeroBadge = ({ badge, className = "" }: { badge: HeroBadgeSpec; className?: string }) => (
  <div
    className={cn(
      "hero-badge pointer-events-none select-none rounded-2xl border border-white/20 bg-white/50",
      "flex flex-row items-center gap-2.5 w-[180px] sm:w-[220px] lg:w-[260px] h-[65px] sm:h-[75px] px-2.5 sm:px-3 py-2.5 transition-all duration-300",
      "opacity-70 hover:opacity-85 backdrop-blur-lg shadow-lg shadow-black/15",
      className,
    )}
    style={{
      background: `linear-gradient(135deg, ${badge.colors[0]}dd, ${badge.colors[1]}dd)`,
    }}
  >
    {/* Logo on left */}
    <div className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/95 shadow-md">
      <Image
        src="/logo.svg"
        alt="Refer Labs"
        width={32}
        height={32}
        className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
        priority={true}
      />
    </div>

    {/* Text on right - 2 lines */}
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/90 mb-0.5 leading-tight">
        {badge.title}
      </p>
      <p className="text-xs sm:text-sm font-semibold leading-tight text-white line-clamp-2">
        {badge.text}
      </p>
    </div>
  </div>
);

export default async function Home() {
  const repeatedPartnerLogos = [...partnerLogos, ...partnerLogos];

  // Read attribution cookie if present
  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let ambassadorData: { id: string; code: string; business_id: string } | null = null;

  if (refAmbassadorCookie?.value) {
    try {
      const parsed = JSON.parse(refAmbassadorCookie.value);
      // Check if cookie is still within 30-day window
      // eslint-disable-next-line react-hooks/purity
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
      console.error("Failed to parse attribution cookie:", err);
    }
  }

  return (
    <div className="aurora tiffany-hero relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,131,143,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(77,208,225,0.18),transparent_35%)]" />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 px-4 pb-16 sm:pb-20 pt-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        {/* Hero Section - Premium Polish */}
        <div className="mx-auto w-full max-w-7xl relative py-10 sm:py-12 lg:py-20 min-h-[480px] lg:min-h-[580px]">
          {/* Corner notification cards - Desktop only, subtle and ambient */}
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {heroBadges.map((badge) => (
              <HeroBadge
                key={badge.id}
                badge={badge}
                className={cn("absolute", badge.position, heroBadgeOrientation[badge.id])}
              />
            ))}
          </div>

          {/* Mobile: Show only top 2 cards, even more subtle */}
          <div className="pointer-events-none absolute inset-0 xl:hidden">
            {heroBadges.slice(0, 2).map((badge) => (
              <HeroBadge
                key={badge.id}
                badge={badge}
                className={cn(
                  "absolute hidden sm:flex",
                  badge.position,
                  heroBadgeOrientation[badge.id],
                  "opacity-40",
                )}
              />
            ))}
          </div>

          <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center gap-8 px-4 text-center sm:px-8 lg:px-16">
            <div className="space-y-5 sm:space-y-6 max-w-5xl">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[3.25rem] lg:text-[3.75rem]">
                <span className="block">We Help Launch Successful</span>
                <span className="block">Referral Programs</span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl font-semibold leading-snug text-slate-900 sm:text-2xl lg:text-[1.75rem]">
                Generate Additional Revenue That Complements Your Sales and Marketing Strategies
              </p>
            </div>
            <TrackedCTA
              ambassadorId={ambassadorData?.id}
              businessId={ambassadorData?.business_id}
              referralCode={ambassadorData?.code}
            />

          </div>
        </div>

        {/* How It Works Section - Premium Redesign */}
        <section className="space-y-12 sm:space-y-16 relative">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 shadow-xl sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute inset-x-16 -top-24 h-64 bg-gradient-to-br from-indigo-500/15 via-sky-500/10 to-emerald-400/10 blur-3xl" />
            <div className="relative z-10 space-y-10">
              <div className="text-left sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Why A Referral Program Is Your Best Resource For Growth Hacking
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-0 sm:mx-auto">
                  Your next best customers are already in your existing customers&rsquo; network.<br />
                  Refer Labs helps you turn that network into a structured, trackable growth engine that feels natural for them and powerful for you.
                </p>
              </div>

              <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {referralPillars.map((pillar) => (
                  <PillarCard key={pillar.number} pillar={pillar} />
                ))}
              </div>

              <div className="md:hidden -mx-2">
                <div
                  className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Referral program pillars"
                >
                  {referralPillars.map((pillar) => (
                    <div key={pillar.number} className="min-w-[260px] snap-center">
                      <PillarCard pillar={pillar} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Ready to make referrals your highest-ROI channel?
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Plug Refer Labs into your existing sales and marketing stack and start activating the
                    customers you already have.
                  </p>
                </div>
                <TrackedCTA
                  ambassadorId={ambassadorData?.id}
                  businessId={ambassadorData?.business_id}
                  referralCode={ambassadorData?.code}
                />
              </div>
            </div>
          </div>
        </section>


        {/* Why Start a Referral Program - Premium Section */}
        <section className="relative overflow-hidden">
          {/* Premium Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#021013] via-[#01343C] to-[#031C20]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,131,143,0.22),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(77,208,225,0.18),transparent_50%)]" />

          <div className="relative space-y-12 sm:space-y-16 py-16 sm:py-24">

            {/* Section Header */}
            <div className="text-center space-y-6 px-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                Referral Programs By The Numbers
              </h2>
              <p className="text-xl sm:text-2xl text-purple-100 max-w-4xl mx-auto font-medium leading-relaxed">
                Turn your existing customers into a high-performing sales team—without the overhead, training, or payroll costs
              </p>
            </div>

            {/* Stats Grid */}
            <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
              {referralNumbers.map((stat) => (
                <div
                  key={stat.title}
                  className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br ${stat.gradient} backdrop-blur p-8 hover:scale-105 hover:shadow-2xl hover:shadow-teal-400/20 transition-all duration-500`}
                >
                  <div
                    className={`absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.accentBg} flex items-center justify-center shadow-2xl shadow-black/30 rotate-12 group-hover:rotate-0 transition-transform duration-500`}
                  >
                    <stat.accentIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="relative space-y-3">
                    <p className="text-6xl font-black text-[#024b56]">{stat.value}</p>
                    <p className="text-sm font-black uppercase tracking-wide text-[#024b56]">
                      {stat.title}
                    </p>
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
                      {stat.copy}
                    </p>
                    {stat.source && (
                      <p className="text-xs text-slate-500 italic pt-2 border-t border-slate-200/50">
                        Source:{" "}
                        <a
                          href={stat.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 underline decoration-dotted underline-offset-2 transition-colors"
                        >
                          {stat.source}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden -mx-2">
              <div
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Referral performance stats"
              >
                {referralNumbers.map((stat) => (
                  <div key={stat.title} className="min-w-[260px] snap-center">
                    <div
                      className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br ${stat.gradient} backdrop-blur p-8 hover:scale-105 hover:shadow-2xl hover:shadow-teal-400/20 transition-all duration-500`}
                    >
                      <div
                        className={`absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.accentBg} flex items-center justify-center shadow-2xl shadow-black/30 rotate-12 group-hover:rotate-0 transition-transform duration-500`}
                      >
                        <stat.accentIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="relative space-y-3">
                        <p className="text-5xl font-black text-[#024b56]">{stat.value}</p>
                        <p className="text-xs font-black uppercase tracking-wide text-[#024b56]">
                          {stat.title}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {stat.copy}
                        </p>
                        {stat.source && (
                          <p className="text-xs text-slate-500 italic pt-2 border-t border-slate-200/50">
                            Source:{" "}
                            <a
                              href={stat.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 underline decoration-dotted underline-offset-2 transition-colors"
                            >
                              {stat.source}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Hacking Value Proposition */}
            <div className="max-w-6xl mx-auto px-4">
              <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-10 sm:p-12 shadow-2xl overflow-hidden border border-white/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_60%)]" />

                <div className="relative z-10 space-y-8">
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                      Your Customers Are Your Best Sales Team
                    </h3>
                    <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                      Instead of pouring budget into ads that get ignored, activate the people who already love your brand—this is{" "}
                      <span className="text-[#5ce1e6] font-black tracking-tight drop-shadow-[0_0_18px_rgba(92,225,230,0.35)]">growth hacking</span>{" "}
                      powered by trust and proof from real customers.
                    </p>
                  </div>

                  {/* Comparison Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {/* Traditional Methods */}
                    <div className="rounded-2xl bg-slate-900/50 backdrop-blur p-6 border border-slate-700/50">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <span className="text-2xl">❌</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">Traditional Marketing</h4>
                          <p className="text-sm text-slate-400">Expensive, hard to track, declining trust</p>
                        </div>
                      </div>
                      <ul className="space-y-3.5">
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Paid ads CAC: <span className="font-bold text-white">$200-400+</span></div>
                            <div className="text-xs text-slate-500 mt-0.5 italic">
                              Source:{" "}
                              <a
                                href="https://www.webfx.com/digital-advertising/pricing/cost-per-acquisition/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline decoration-dotted"
                              >
                                WebFX 2024
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Attribution unclear: <span className="font-bold text-white">50% can't track ROI</span></div>
                            <div className="text-xs text-slate-500 mt-0.5 italic">
                              Source:{" "}
                              <a
                                href="https://www.gartner.com/en/marketing/research/marketing-analytics-and-data-science-survey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline decoration-dotted"
                              >
                                Gartner
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Ad trust declining: <span className="font-bold text-white">Only 25% trust ads</span></div>
                            <div className="text-xs text-slate-500 mt-0.5 italic">
                              Source:{" "}
                              <a
                                href="https://www.nielsen.com/insights/2021/trust-in-advertising-2021/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline decoration-dotted"
                              >
                                Nielsen
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Rising costs: <span className="font-bold text-white">CPM up 61% since 2020</span></div>
                            <div className="text-xs text-slate-500 mt-0.5 italic">
                              Source:{" "}
                              <a
                                href="https://www.statista.com/statistics/1219187/average-cpm-facebook-instagram-ads-worldwide/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline decoration-dotted"
                              >
                                Statista
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Referral Programs */}
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur p-6 border border-emerald-400/30">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">Referral Marketing with Refer Labs</h4>
                          <p className="text-sm text-emerald-200">Lower cost, trackable, trusted by default</p>
                        </div>
                      </div>
                      <ul className="space-y-3.5">
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Referred CAC: <span className="font-bold text-white">70% lower</span> than paid ads</div>
                            <div className="text-xs text-emerald-100/60 mt-0.5 italic">
                              Source:{" "}
                              <a
                                href="https://www.nielsen.com/insights/2021/trust-in-advertising-2021/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-300 hover:text-emerald-200 underline decoration-dotted"
                              >
                                Nielsen
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div><span className="font-bold text-white">100% attribution:</span> Track every click, signup, conversion</div>
                            <div className="text-xs text-emerald-100/60 mt-0.5 italic">Refer Labs tracks full customer journey</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Trust advantage: <span className="font-bold text-white">92% trust peer recommendations</span></div>
                            <div className="text-xs text-emerald-100/60 mt-0.5 italic">
                              Source:{" "}
                              <a
                                href="https://www.nielsen.com/insights/2021/trust-in-advertising-2021/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-300 hover:text-emerald-200 underline decoration-dotted"
                              >
                                Nielsen
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div>Network effect: <span className="font-bold text-white">Each customer can recruit 2-5 more</span></div>
                            <div className="text-xs text-emerald-100/60 mt-0.5 italic">Compounding growth automatically tracked in dashboard</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <div className="text-sm">
                            <div><span className="font-bold text-white">Automated rewards:</span> Instant payouts when targets hit</div>
                            <div className="text-xs text-emerald-100/60 mt-0.5 italic">Refer Labs handles tracking, reporting, payments</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-10 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        href="/login"
                        className={cn(buttonVariants({ variant: "cta" }), "group w-full sm:w-auto text-base font-bold shadow-none")}
                      >
                        Launch my dashboard
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/r/DEMO2025"
                        className={cn(buttonVariants({ variant: "outline" }), "group w-full sm:w-auto text-base font-bold")}
                      >
                        Preview referral landing
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Who We Work With */}
        <section className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 py-10 bg-gradient-to-r from-cyan-50/60 via-teal-50/40 to-cyan-50/60">
          <div className="space-y-6">
            <p className="text-center text-xs uppercase tracking-[0.4em] text-slate-600 font-bold">
              Our Partners
            </p>
            <div className="overflow-hidden px-4 py-5">
              <div className="logo-marquee gap-10">
                {repeatedPartnerLogos.map((logo, index) => (
                  <div
                    key={`partner-${logo.id}-${index}`}
                    className="min-w-[220px] flex items-center justify-center px-3"
                  >
                    <div
                      className={cn(
                        "flex h-20 w-full max-w-[220px] items-center justify-center rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur",
                        logo.backgroundClass ?? ""
                      )}
                    >
                      <Image
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        width={logo.width}
                        height={logo.height}
                        className="h-12 w-auto object-contain"
                        priority={index < 4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator CTA */}
        <section className="rounded-[32px] border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl shadow-purple-200/50 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 text-center">
              Calculate your referral program ROI in 4 steps
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-xl text-center md:text-left">
                Get AI-powered revenue and growth forecasts and discover the perfect reward structure for your business.
                No signup required.
              </p>
              <Link
                href="/roi-calculator"
                className={cn(buttonVariants({ variant: "cta" }), "group text-lg font-bold px-8 py-4 cursor-pointer hover:shadow-xl whitespace-nowrap")}
              >
                Calculate ROI <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}
