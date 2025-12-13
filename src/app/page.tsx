/* eslint-disable react/no-unescaped-entities */

import { ArrowRight, Gift, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  },
  {
    value: "3×",
    title: "Higher Conversion Rates",
    copy:
      "Referred leads come pre-qualified, making them three times more likely to convert than cold traffic.",
    gradient: "from-white/95 to-blue-50/95",
    accentIcon: Users,
    accentBg: "from-blue-500 to-blue-600",
  },
  {
    value: "2×",
    title: "Better Long-Term Retention",
    copy:
      "Customers acquired through referrals stay longer and become more profitable over time.",
    gradient: "from-white/95 to-pink-50/95",
    accentIcon: Gift,
    accentBg: "from-pink-500 to-pink-600",
  },
  {
    value: "82%",
    title: "Customers Willing to Refer",
    copy:
      "Most customers are happy to recommend a brand they like — they just need an easy way to do it.",
    gradient: "from-white/95 to-amber-50/95",
    accentIcon: Users,
    accentBg: "from-amber-500 to-amber-600",
  },
  {
    value: "35%",
    title: "Faster Revenue Growth",
    copy:
      "Businesses that use referral programs grow significantly faster than those relying only on paid ads.",
    gradient: "from-white/95 to-purple-50/95",
    accentIcon: Sparkles,
    accentBg: "from-purple-500 to-purple-600",
  },
  {
    value: "5 Minutes",
    title: "To Launch With Refer Labs",
    copy:
      "No coding. No complexity. Turn on your referral program and let your customers become your growth engine.",
    gradient: "from-white/95 to-indigo-50/95",
    accentIcon: TrendingUp,
    accentBg: "from-indigo-500 to-indigo-600",
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
    position: "top-6 left-4",
  },
  {
    id: "hero-vip",
    title: "VIP BOOKING",
    text: "David confirmed a new order",
    colors: ["#2c5248", "#356757"],
    position: "top-6 right-4",
  },
  {
    id: "hero-leaderboard",
    title: "LEADERBOARD",
    text: "Jake referred 24 orders this month",
    colors: ["#1f2c3b", "#3b4e5d"],
    position: "bottom-8 left-6",
  },
  {
    id: "hero-revenue",
    title: "REVENUE BOOK",
    text: "$35,500 additional revenue generated",
    colors: ["#3a3334", "#54484a"],
    position: "bottom-8 right-6",
  },
];

// Legacy position classes - no longer used in new redesign
// Kept for reference if needed for other pages

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
  {
    id: "logo-referlabs",
    name: "Refer Labs",
    src: "/logo.svg",
    width: 120,
    height: 60,
    backgroundClass: "bg-white",
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
      "hero-badge pointer-events-none select-none rounded-[26px] border border-white/30 bg-white/90 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-md sm:px-6 sm:py-4",
      "flex min-w-[240px] max-w-[300px] items-center gap-4 transition-all duration-300",
      className,
    )}
    style={{
      background: `linear-gradient(120deg, ${badge.colors[0]}, ${badge.colors[1]})`,
    }}
  >
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-inner shadow-black/10">
      <Image
        src="/logo.svg"
        alt="Refer Labs logo"
        width={48}
        height={48}
        className="h-10 w-10 object-contain"
        priority={false}
      />
    </div>
    <div className="space-y-1 text-left text-white">
      <p className="text-xs font-bold uppercase tracking-[0.2em]">{badge.title}</p>
      <p className="text-sm font-semibold leading-tight text-white/90">{badge.text}</p>
    </div>
  </div>
);

export default function Home() {
  const repeatedPartnerLogos = [...partnerLogos, ...partnerLogos];

  return (
    <div className="aurora tiffany-hero relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,131,143,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(77,208,225,0.18),transparent_35%)]" />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 px-4 pb-16 sm:pb-20 pt-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        {/* Hero Section - Redesigned with bulletproof positioning */}
        <div className="mx-auto w-full max-w-7xl relative py-10 sm:py-12 lg:py-16 min-h-[520px] lg:min-h-[620px]">
          {/* New hero badges positioned in corners */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {heroBadges.map((badge) => (
              <HeroBadge
                key={badge.id}
                badge={badge}
                className={cn("absolute", badge.position)}
              />
            ))}
          </div>

          <div className="relative z-10 flex min-h-[460px] flex-col items-center justify-center gap-8 px-4 text-center sm:px-6 lg:px-8">
            <div className="space-y-5 sm:space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[3.25rem] lg:text-[3.75rem]">
                <span className="block">We Help Launch Successful</span>
                <span className="block">Referral Programs</span>
              </h1>
              <p className="max-w-3xl text-lg font-semibold leading-snug text-slate-700 sm:text-xl">
                We'll Activate Additional Revenue That Plugs Straight Into Your Sales and Marketing Strategy.
              </p>
            </div>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "cta" }),
                "text-xl font-black px-12 py-5 shadow-xl shadow-teal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              )}
            >
              Start Getting Referrals
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>

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
                  Your next best customers are already in your existing customers&rsquo; network. Refer Labs
                  helps you turn that network into a structured, trackable growth engine that feels
                  natural for them and powerful for you.
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
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "default", size: "default" }), "min-w-[220px]")}
                  >
                    Start Getting Referrals
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
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
                          <p className="text-sm text-slate-400">High cost, low trust, diminishing returns</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Facebook/Instagram ads: <span className="font-bold text-white">$200-500 CAC</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Google Ads: <span className="font-bold text-white">$150-400 CAC</span> + ongoing spend</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Sales team: <span className="font-bold text-white">$60K+ per rep</span> + commission + training</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Cold outreach: <span className="font-bold text-white">1-3% response rate</span>, low trust</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Ad costs rising <span className="font-bold text-white">30% year-over-year</span></span>
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
                          <h4 className="text-lg font-bold text-white mb-1">Referral Marketing</h4>
                          <p className="text-sm text-emerald-200">Low cost, high trust, compounding growth</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Customer referrals: <span className="font-bold text-white">$15-30 CAC</span> (16x cheaper)</span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Existing customers = free sales force: <span className="font-bold text-white">$0 payroll</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Warm introductions: <span className="font-bold text-white">30% conversion rate</span> (4x higher)</span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Compounding network effects: <span className="font-bold text-white">Each customer recruits 2-3 more</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Cost stays flat while growth accelerates</span>
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
                        href="/referral"
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
