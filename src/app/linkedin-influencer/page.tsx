import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Layers,
  LineChart,
  Megaphone,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.linkedinInfluencer);

const referralGoals = [
  {
    title: "Book SaaS Demos",
    detail: "Drive qualified demo bookings through creator-led posts that showcase real product use cases and benefits to engaged LinkedIn audiences.",
    icon: Target,
    gradient: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-400/30",
  },
  {
    title: "Educate to Transaction",
    detail: "Guide prospects from awareness to purchase with educational content that builds trust and positions your product as the solution.",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30",
  },
  {
    title: "Brand Exposure Posts",
    detail: "Amplify brand awareness through authentic creator content that reaches new audiences and builds credibility in your target market.",
    icon: Megaphone,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-400/30",
  },
];

const problemSignals = [
  {
    title: "Outbound fatigue is real",
    detail: "Cold emails and SDRs are increasingly ignored, even by warm buyers.",
  },
  {
    title: "Paid ads keep getting pricier",
    detail: "CPMs climb while attention gets more fragmented and skeptical.",
  },
  {
    title: "Trust lives in the feed",
    detail: "People buy from people they already follow and respect.",
  },
];

const modelSteps = [
  {
    title: "Creators join and get approved offers",
    detail: "LinkedIn creators apply, get vetted, and gain access to aligned brands.",
    icon: Users,
  },
  {
    title: "Businesses launch performance incentives",
    detail: "Brands define conversion goals, payouts, and target audiences.",
    icon: Target,
  },
  {
    title: "Promotion happens inside LinkedIn",
    detail: "Authentic posts, use-cases, and operator insights drive action.",
    icon: Megaphone,
  },
  {
    title: "Tracking proves what converts",
    detail: "Demos, sign-ups, and revenue are tracked end-to-end.",
    icon: BarChart3,
  },
  {
    title: "Everyone scales what works",
    detail: "Creators earn recurring upside. Brands invest in proven channels.",
    icon: LineChart,
  },
];

const creatorBenefits = [
  "Promote products you believe in (and would use yourself)",
  "Earn on real outcomes with transparent tracking",
  "Avoid spammy sponsorships or one-off campaigns",
  "Build recurring revenue from your content",
];

const businessBenefits = [
  "Replace or complement SDRs with trusted distribution",
  "Reach warm, in-market audiences already engaged",
  "Pay for outcomes instead of activity",
  "Launch and test multiple creator angles fast",
];

const businessUseCases = [
  {
    title: "SaaS demo pipelines at scale",
    detail: "Creator-led posts drive demo bookings from in-market operators.",
  },
  {
    title: "E-commerce product launches",
    detail: "Founders and creators introduce new offers to engaged followers.",
  },
  {
    title: "B2B tools replacing SDR outreach",
    detail: "Warm LinkedIn distribution outperforms cold outbound sequences.",
  },
  {
    title: "Founder-led GTM with credibility",
    detail: "Operators amplify founder stories and product narratives.",
  },
];

const comparison = [
  "Trusted voices > cold emails",
  "In-feed insight > paid CPMs",
  "Performance-based > fixed retainers",
  "Relationship-driven > transactional ads",
];

export default function LinkedInInfluencerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LinkedIn Influencer Marketplace",
    "description": "Connect verified LinkedIn creators with SaaS & e-commerce brands through performance-based referral partnerships",
    "url": "https://referlabs.com.au/linkedin-influencer",
    "provider": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au",
      "logo": "https://referlabs.com.au/logo.png"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Creator Partnership",
        "description": "Earn 25% recurring revenue promoting SaaS and e-commerce products",
        "url": "https://referlabs.com.au/linkedin-influencer/influencer"
      },
      {
        "@type": "Offer",
        "name": "Business Partnership",
        "description": "Scale with LinkedIn creator partnerships - pay only for results",
        "url": "https://referlabs.com.au/linkedin-influencer/business"
      }
    ],
    "mainEntity": {
      "@type": "Service",
      "serviceType": "Performance Marketing Platform",
      "provider": {
        "@type": "Organization",
        "name": "Refer Labs"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Global"
      },
      "audience": [
        {
          "@type": "Audience",
          "audienceType": "LinkedIn Creators"
        },
        {
          "@type": "Audience",
          "audienceType": "SaaS Companies"
        },
        {
          "@type": "Audience",
          "audienceType": "E-commerce Businesses"
        }
      ]
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b12] via-[#0b121b] to-[#05070b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="sr-only">
        LinkedIn Influencer is a performance-based referral marketplace that connects high-quality LinkedIn creators
        with SaaS and e-commerce brands, enabling creators to drive demos and conversions while businesses replace
        outbound sales with trusted, in-feed distribution.
      </p>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.2),transparent_50%),radial-gradient(circle_at_85%_85%,rgba(16,185,129,0.16),transparent_55%)]" />
      <div className="absolute -top-16 right-0 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-400/30 to-transparent blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 left-12 h-96 w-96 rounded-full bg-gradient-to-br from-amber-400/25 to-transparent blur-3xl animate-pulse"
        style={{ animationDelay: "1.1s" }}
      />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-10 lg:px-16">
        {/* Hero */}
        <section className="space-y-8 animate-in fade-in duration-700 text-center max-w-4xl mx-auto">
          <h1 className="text-balance text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl text-white">
            Turn LinkedIn Influence Into Scalable Revenue
          </h1>
          <p className="text-lg text-slate-200/90 leading-relaxed">
            Connect trusted LinkedIn creators with SaaS &amp; e-commerce companies to drive demos, sign-ups, and real
            revenue — without ads or SDRs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/linkedin-influencer/influencer"
              className="inline-flex items-center gap-2 rounded-full bg-[#5ce1e6] hover:bg-[#4dd4d9] px-8 py-3 text-sm font-bold text-slate-900 shadow-2xl shadow-cyan-500/30 transition hover:scale-[1.02]"
            >
              Join as a LinkedIn Influencer
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/linkedin-influencer/business"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3 text-sm font-bold text-white/90 backdrop-blur transition hover:border-white/60"
            >
              Partner as a Business
            </Link>
          </div>
        </section>

        {/* Referral Program Goals */}
        <section className="mt-20 animate-in fade-in duration-700 delay-150">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Referral Program Goals</p>
            <h2 className="text-3xl font-black text-white mt-2">What Can Your LinkedIn Referral Program Achieve?</h2>
            <p className="mt-4 text-base text-slate-200/90 max-w-3xl mx-auto">
              Whether you're launching a SaaS product, educating prospects, or building brand awareness — LinkedIn creator partnerships deliver measurable results tied directly to your business objectives.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {referralGoals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div
                  key={goal.title}
                  className={`rounded-3xl border ${goal.border} bg-gradient-to-br ${goal.gradient} backdrop-blur-sm p-8 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <Icon className="h-8 w-8 text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                    <p className="text-sm text-slate-200/90 leading-relaxed">{goal.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-400/20 p-3 backdrop-blur">
                <Zap className="h-6 w-6 text-amber-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Performance-Based Tracking</h3>
                <p className="text-sm text-slate-200/90 leading-relaxed">
                  Every goal is tracked end-to-end with unique referral links, conversion analytics, and real-time dashboards. You only pay for outcomes — demos booked, purchases completed, or engagement delivered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur animate-in fade-in duration-700 delay-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Why this exists</p>
              <h2 className="text-3xl font-black text-white">Traditional Outbound Is Broken</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200/80">
              <Layers className="h-3.5 w-3.5 text-cyan-200" />
              Buyer trust has shifted
            </span>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {problemSignals.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-200/80">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base text-slate-200/90">
            Modern buyers respond to trusted voices they already follow. When a LinkedIn creator shares a product with
            real context, it lands like a recommendation — not a sales funnel.
          </p>
        </section>

        {/* Model */}
        <section className="mt-20 animate-in fade-in duration-700 delay-300">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 lg:p-12 backdrop-blur">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">The solution</p>
                <h2 className="text-3xl font-black text-white mt-2">A New Way to Sell Through LinkedIn</h2>
                <p className="mt-4 text-base text-slate-200/90 leading-relaxed">
                  LinkedIn Influencer is a performance-based referral model where creators promote products they believe
                  in, while businesses pay only for outcomes (demos, sign-ups, or conversions).
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {creatorBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                      <span className="text-sm text-slate-200/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 via-slate-900/70 to-emerald-500/10 p-8 backdrop-blur">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl bg-cyan-400/20 p-2.5">
                    <Sparkles className="h-6 w-6 text-cyan-200" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Outcome-based GTM</p>
                </div>
                <p className="text-2xl font-bold text-white leading-tight">Influencers earn on performance. Brands scale with proof.</p>
                <p className="mt-4 text-base text-slate-200/90 leading-relaxed">
                  No cold outreach. No generic ads. Just trusted distribution inside the LinkedIn feed that converts.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Performance-based
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Transparent tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works - Visual Flow Diagram */}
        <section className="mt-20 animate-in fade-in duration-700 delay-400">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">How it works</p>
            <h2 className="text-3xl font-black text-white mt-2">From Join → Launch → Scale</h2>
          </div>

          {/* Flow Diagram */}
          <div className="relative">
            {/* Desktop: Horizontal Flow */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-4">
              {modelSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {/* Connecting Arrow */}
                    {index < modelSteps.length - 1 && (
                      <div className="absolute top-[60px] -right-[18px] z-10">
                        <ChevronRight className="h-8 w-8 text-cyan-400/60" />
                      </div>
                    )}

                    {/* Step Card */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur p-5 h-full flex flex-col items-center text-center">
                      {/* Step Number Badge */}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-lg font-black text-white shadow-lg">
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className="mb-4 rounded-xl bg-white/5 p-3">
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>

                      {/* Content */}
                      <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-slate-300/80 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: Vertical Flow */}
            <div className="lg:hidden space-y-6">
              {modelSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {/* Connecting Line */}
                    {index < modelSteps.length - 1 && (
                      <div className="absolute left-[30px] top-[120px] bottom-[-24px] w-0.5 bg-gradient-to-b from-cyan-400/60 to-transparent" />
                    )}

                    {/* Step Card */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur p-6">
                      <div className="flex gap-4">
                        {/* Step Number */}
                        <div className="flex-shrink-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-2xl font-black text-white shadow-lg">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          {/* Icon */}
                          <div className="inline-flex mb-3 rounded-xl bg-white/5 p-2.5">
                            <Icon className="h-5 w-5 text-cyan-300" />
                          </div>

                          {/* Content */}
                          <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-sm text-slate-300/80 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Audience split */}
        <section className="mt-20 grid gap-8 lg:grid-cols-2 lg:items-stretch animate-in fade-in duration-700 delay-500">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-black text-white">Monetise Your Audience Without Selling Out</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-200/90">
              {creatorBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Link
              href="/linkedin-influencer/influencer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-6 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02]"
            >
              Join as an Influencer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-black text-white">Replace SDRs With Trusted Distribution</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-200/90">
              {businessBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Link
              href="/linkedin-influencer/business"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/90 px-6 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
            >
              Partner as a Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Compliance & Transparency */}
        <section className="mt-20 rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-10 backdrop-blur animate-in fade-in duration-700 delay-550">
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-xl bg-blue-400/20 p-3 backdrop-blur">
              <CheckCircle2 className="h-6 w-6 text-blue-300" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200 mb-2">Compliance & Transparency</p>
              <h2 className="text-2xl font-black text-white">Creator Partnerships Are Marketing</h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-200/90 leading-relaxed">
            <p>
              When a trusted LinkedIn creator announces they've partnered with a specific brand, this constitutes marketing and advertising. All creator partnerships facilitated through Refer Labs are performance-based marketing relationships.
            </p>
            <p>
              <strong className="text-white">Disclosure Requirements:</strong> Creators are required to clearly disclose their partnership with brands in accordance with FTC guidelines, ASA regulations, and local advertising standards. This includes using appropriate hashtags (#ad, #sponsored, #partner) and clear language indicating the commercial relationship.
            </p>
            <p>
              <strong className="text-white">Brand Responsibility:</strong> Businesses partnering with creators must ensure that all claims made about their products are truthful, substantiated, and compliant with applicable advertising regulations in their jurisdiction.
            </p>
            <p>
              <strong className="text-white">Platform Compliance:</strong> All partnerships must comply with LinkedIn's policies on sponsored content and commercial relationships. Refer Labs provides guidance and templates to help both creators and businesses maintain compliance, but ultimate responsibility for regulatory compliance rests with the parties involved.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 mb-2">Important Notice</p>
            <p className="text-sm text-slate-200/90">
              This platform facilitates business-to-creator partnerships for marketing purposes. All participants are responsible for understanding and complying with advertising regulations including FTC endorsement guidelines, truth-in-advertising laws, and platform-specific commercial content policies. Refer Labs provides tools and guidance but does not provide legal advice. Consult with legal counsel regarding your specific compliance obligations.
            </p>
          </div>
        </section>

        {/* Business use cases */}
        <section className="mt-20 animate-in fade-in duration-700 delay-600">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 lg:p-12 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Business outcomes</p>
                <h2 className="text-3xl font-black text-white mt-2">Use Cases That Outperform Outbound</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200/80">
                <Globe2 className="h-3.5 w-3.5 text-cyan-200" />
                LinkedIn-native distribution
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {businessUseCases.map((item, index) => {
                const colors = [
                  { border: "border-cyan-400/30", bg: "from-cyan-500/10 to-teal-500/10", icon: "text-cyan-300" },
                  { border: "border-purple-400/30", bg: "from-purple-500/10 to-pink-500/10", icon: "text-purple-300" },
                  { border: "border-emerald-400/30", bg: "from-emerald-500/10 to-green-500/10", icon: "text-emerald-300" },
                  { border: "border-amber-400/30", bg: "from-amber-500/10 to-orange-500/10", icon: "text-amber-300" },
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={item.title}
                    className={`rounded-3xl border ${color.border} bg-gradient-to-br ${color.bg} p-6 lg:p-7 hover:scale-[1.02] transition-transform duration-300`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`rounded-xl bg-white/10 p-2.5 ${color.icon}`}>
                        <Target className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white flex-1">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-200/90 leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 lg:p-12 backdrop-blur animate-in fade-in duration-700 delay-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white">Why LinkedIn Referrals Beat Ads &amp; Outbound</h2>
            <p className="mt-3 text-base text-slate-200/80">The future of B2B growth is relationship-driven, not transaction-driven</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {comparison.map((item, index) => {
              const icons = [CheckCircle2, Sparkles, Target, LineChart];
              const Icon = icons[index % icons.length];
              return (
                <div key={item} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 hover:border-cyan-400/30 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-400/10 p-2.5">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <p className="text-base font-semibold text-white">{item}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Getting started */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 p-10 animate-in fade-in duration-700 delay-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Getting started</p>
              <h2 className="text-3xl font-black text-white">Launch in days, not months</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200/80">
              <ChevronRight className="h-3.5 w-3.5 text-cyan-200" />
              Onboarding is fast
            </span>
          </div>
          <p className="mt-4 text-base text-slate-200/90">
            Simple onboarding, fast approvals, tracked links &amp; dashboards, and ongoing optimisation so both sides
            can scale what works.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/linkedin-influencer/influencer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900"
            >
              Apply as a LinkedIn Influencer
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/linkedin-influencer/business"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-sm font-bold text-white/90"
            >
              Launch a Partnership
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 p-12 lg:p-16 text-center backdrop-blur animate-in fade-in duration-700 delay-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Turn Influence Into Revenue. Turn Products Into Conversations.
            </h2>
            <p className="mt-4 text-lg text-slate-200/90">
              Join the performance-based referral marketplace where creators and brands grow together
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/linkedin-influencer/influencer"
                className="inline-flex items-center gap-2 rounded-full bg-[#5ce1e6] hover:bg-[#4dd4d9] px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
              >
                Join as an Influencer
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/linkedin-influencer/business"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur hover:border-white/50 hover:bg-white/10 transition"
              >
                Work With Influencers
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
