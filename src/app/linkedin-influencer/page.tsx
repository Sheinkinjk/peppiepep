import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Handshake,
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
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b12] via-[#0b121b] to-[#05070b] text-white">
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
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-cyan-200">
              <Zap className="h-3.5 w-3.5" />
              LinkedIn Influencer
            </div>
            <h1 className="text-balance text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
              Turn LinkedIn Influence Into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Scalable Revenue
              </span>
            </h1>
            <p className="text-lg text-slate-200/90 leading-relaxed">
              Connect trusted LinkedIn creators with SaaS &amp; e-commerce companies to drive demos, sign-ups, and real
              revenue — without ads or SDRs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/linkedin-influencer/influencer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-500 px-8 py-3 text-sm font-bold text-slate-900 shadow-2xl shadow-cyan-500/30 transition hover:scale-[1.02]"
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
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-in fade-in duration-700 delay-150">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 p-3 text-white shadow-lg">
                <Handshake className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Marketplace</p>
                <p className="text-xl font-bold text-white">Authentic, performance-driven distribution</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-200/90">
              {[
                "Creators share insights that feel native in the feed",
                "Brands pay only for demos, sign-ups, or conversions",
                "Referral links track every action end-to-end",
                "Growth scales without cold outreach or ad fatigue",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
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
        <section className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center animate-in fade-in duration-700 delay-300">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">The solution</p>
            <h2 className="text-3xl font-black text-white">A New Way to Sell Through LinkedIn</h2>
            <p className="mt-4 text-base text-slate-200/90">
              LinkedIn Influencer is a performance-based referral model where creators promote products they believe
              in, while businesses pay only for outcomes (demos, sign-ups, or conversions).
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-200/90">
              {creatorBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 via-slate-900/70 to-emerald-500/10 p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-cyan-200" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Outcome-based GTM</p>
            </div>
            <p className="mt-4 text-xl font-bold text-white">Influencers earn on performance. Brands scale with proof.</p>
            <p className="mt-4 text-sm text-slate-200/80">
              No cold outreach. No generic ads. Just trusted distribution inside the LinkedIn feed.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-20 animate-in fade-in duration-700 delay-400">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">How it works</p>
              <h2 className="text-3xl font-black text-white">From join → launch → scale</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {modelSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {index + 1}
                  </p>
                  <step.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-200/90">{step.detail}</p>
              </div>
            ))}
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

        {/* Business use cases */}
        <section className="mt-20 animate-in fade-in duration-700 delay-600">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Business outcomes</p>
              <h2 className="text-3xl font-black text-white">Use cases that outperform outbound</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200/80">
              <Globe2 className="h-3.5 w-3.5 text-cyan-200" />
              LinkedIn-native distribution
            </span>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {businessUseCases.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-200/90">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 animate-in fade-in duration-700 delay-700">
          <h2 className="text-3xl font-black text-white">Why LinkedIn Referrals Beat Ads &amp; Outbound</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {comparison.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200/90">
                {item}
              </div>
            ))}
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
        <section className="mt-20 text-center animate-in fade-in duration-700 delay-900">
          <h2 className="text-3xl font-black text-white">
            Turn Influence Into Revenue. Turn Products Into Conversations.
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/linkedin-influencer/influencer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-8 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
            >
              Join as an Influencer
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/linkedin-influencer/business"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-bold text-white/90 backdrop-blur"
            >
              Work With Influencers
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
