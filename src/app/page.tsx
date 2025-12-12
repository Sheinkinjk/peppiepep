import { ArrowRight, Gift, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode, CSSProperties } from "react";

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

type HeroNotification = {
  id: string;
  label: string;
  text: string;
};

const heroNotifications: HeroNotification[] = [
  {
    id: "hero-jenny",
    label: "New referral",
    text: "Jenny used her referral link",
  },
  {
    id: "hero-david",
    label: "VIP booking",
    text: "David confirmed a premium order",
  },
  {
    id: "hero-jake",
    label: "Leaderboard",
    text: "Jake is your top Referrer with 24 referrals this month",
  },
  {
    id: "hero-campaign",
    label: "Campaign drop",
    text: "500 ambassadors received your drop",
  },
  {
    id: "hero-revenue",
    label: "Revenue boost",
    text: "$45,500 in attributed revenue",
  },
];

// Legacy position classes - no longer used in new redesign
// Kept for reference if needed for other pages

type PartnerLogoSpec = {
  id: string;
  name: string;
  render: () => ReactNode;
};

const partnerLogos: PartnerLogoSpec[] = [
  {
    id: "logo-shopify",
    name: "Shopify",
    render: () => (
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f9b64] shadow-lg shadow-[#1f9b64]/30">
          <span className="text-2xl font-black text-white">S</span>
        </div>
        <span className="text-2xl font-black lowercase tracking-[0.2em] text-slate-900">
          shopify
        </span>
      </div>
    ),
  },
  {
    id: "logo-klaviyo",
    name: "Klaviyo",
    render: () => (
      <div
        className="flex items-center gap-1 text-2xl font-bold uppercase tracking-[0.2em]"
        style={{ fontFamily: "Times New Roman, Baskerville, serif" }}
      >
        <span>klaviyo</span>
        <span className="h-3 w-3 rounded-sm bg-[#0c0c0c]" />
      </div>
    ),
  },
  {
    id: "logo-mailchimp",
    name: "Mailchimp",
    render: () => (
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1d1d1f] text-4xl font-black text-yellow-50 shadow-lg">
          m
        </div>
        <span className="text-2xl font-black lowercase tracking-[0.1em] text-[#151515]">
          mailchimp
        </span>
      </div>
    ),
  },
  {
    id: "logo-resend",
    name: "Resend",
    render: () => (
      <div className="text-2xl font-black uppercase tracking-[0.1em] text-[#111111]">
        Resend
      </div>
    ),
  },
  {
    id: "logo-attentive",
    name: "Attentive",
    render: () => (
      <div className="flex items-baseline gap-1 text-2xl font-black tracking-[0.25em] text-slate-900 lowercase">
        <span>attentive</span>
        <span className="text-[0.4rem] uppercase tracking-[0.4em] font-semibold text-slate-600">
          ®
        </span>
      </div>
    ),
  },
  {
    id: "logo-paperrun",
    name: "PaperRun",
    render: () => (
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-10">
          <span className="absolute inset-x-0 top-1 h-4 rounded-[12px] bg-[#1c9fbf]" />
          <span className="absolute inset-x-0 top-4 h-4 rounded-[12px] bg-[#0c6a88]" />
          <span className="absolute inset-x-0 top-7 h-4 rounded-[12px] bg-[#6dd3e3]" />
        </div>
        <span className="text-xl font-black uppercase tracking-[0.25em] text-slate-900">
          PaperRun
        </span>
      </div>
    ),
  },
  {
    id: "logo-loop",
    name: "Loop",
    render: () => (
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-[#6ec3e8]" />
          <span className="absolute right-0 top-1/2 h-2 w-6 -translate-y-1/2 rotate-12 rounded-full bg-[#6ec3e8]" />
          <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#6ec3e8]" />
        </div>
        <span className="text-2xl font-black uppercase tracking-[0.25em] text-slate-900">
          LOOP
        </span>
      </div>
    ),
  },
  {
    id: "logo-hubspot",
    name: "HubSpot",
    render: () => (
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a59]">
          <span className="text-lg font-bold uppercase text-white">H</span>
          <span className="absolute -right-0 top-0 h-3 w-3 rounded-full bg-white/80" />
        </div>
        <span className="text-2xl font-black text-slate-900">HubSpot</span>
      </div>
    ),
  },
  {
    id: "logo-salesforce",
    name: "Salesforce",
    render: () => (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-20 overflow-visible">
          <span className="absolute left-0 top-2 h-8 w-14 rounded-[36px] bg-[#0172de]" />
          <span className="absolute left-6 top-0 h-10 w-16 rounded-[36px] bg-[#01a0ff]" />
          <span className="absolute -left-2 top-3 h-5 w-10 rounded-full bg-[#00baff]" />
        </div>
        <span className="text-xl font-semibold uppercase tracking-[0.4em] text-[#0172de]">
          SALESFORCE
        </span>
      </div>
    ),
  },
];


const NotificationCard = ({
  notification,
  variant,
  positionClass = "",
}: {
  notification: HeroNotification;
  variant: "floating" | "stacked";
  positionClass?: string;
}) => {
  const cardContent = (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Header with logo */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60">
        <div className="flex h-6 w-auto items-center justify-center">
          <Image src="/logo.svg" alt="Refer Labs" width={60} height={20} className="h-5 w-auto object-contain" />
        </div>
        <span className="text-[11px] font-bold text-[#008B8B]">Refer Labs</span>
      </div>
      {/* Notification content */}
      <div className="leading-snug">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-1">
          {notification.label}
        </p>
        <p className="text-[13px] font-semibold text-slate-900 leading-tight">
          {notification.text}
        </p>
      </div>
    </div>
  );

  if (variant === "floating") {
    return (
      <div
        key={notification.id}
        className={`hero-notification-card hero-notification-card--floating ${positionClass}`}
        aria-hidden
      >
        {cardContent}
      </div>
    );
  }

  return (
    <div
      key={`mobile-${notification.id}`}
      className="hero-notification-card hero-notification-card--stacked"
    >
      {cardContent}
    </div>
  );
};

export default function Home() {
  const repeatedPartnerLogos = [...partnerLogos, ...partnerLogos];

  return (
    <div className="aurora tiffany-hero relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,131,143,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(77,208,225,0.18),transparent_35%)]" />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 px-4 pb-16 sm:pb-20 pt-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        {/* Hero Section - Redesigned with bulletproof positioning */}
        <div className="mx-auto w-full max-w-7xl relative py-12 sm:py-16 lg:py-24 min-h-[600px] lg:min-h-[700px]">
          {/* Floating notification cards - Desktop only (xl screens and up) */}
          <div className="hidden xl:block absolute inset-0 pointer-events-none">
            {/* Only show 4 cards positioned in corners to avoid overlap */}
            <NotificationCard
              notification={heroNotifications[0]}
              variant="floating"
              positionClass="hero-card--redesign-top-left"
            />
            <NotificationCard
              notification={heroNotifications[1]}
              variant="floating"
              positionClass="hero-card--redesign-top-right"
            />
            <NotificationCard
              notification={heroNotifications[3]}
              variant="floating"
              positionClass="hero-card--redesign-bottom-left"
            />
            <NotificationCard
              notification={heroNotifications[4]}
              variant="floating"
              positionClass="hero-card--redesign-bottom-right"
            />
          </div>

          {/* Center content container with guaranteed spacing */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Mobile stacked cards - show above heading on mobile/tablet */}
            <div className="flex flex-col items-center gap-3 mb-8 xl:hidden">
              {heroNotifications.slice(0, 4).map((notification) => (
                <NotificationCard
                  key={`stacked-${notification.id}`}
                  notification={notification}
                  variant="stacked"
                />
              ))}
            </div>

            {/* Main hero content */}
            <div className="text-center space-y-6 sm:space-y-8">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#008B8B] to-[#006D6D] bg-clip-text text-transparent sm:text-[3.35rem] lg:text-[3.75rem] xl:text-[3.85rem]">
                <span className="block text-balance">We Help Launch Successful</span>
                <span className="block">Referral Programs</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-semibold">
                <span className="block">We'll Activate Additional Revenue That Plugs</span>
                <span className="block">Straight Into Your Sales and Marketing Strategy.</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:pt-10">
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "cta" }), "group w-full sm:w-auto text-xl font-bold px-10 py-5 hover:scale-105 transition-all duration-300")}
              >
                Start Getting Referrals
                <ArrowRight className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
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

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {referralPillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                  >
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold mb-3 shadow-md ${pillar.chipBg}`}
                    >
                      {pillar.number}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {pillar.copy}
                    </p>
                  </div>
                ))}
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
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
                    {logo.render()}
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
