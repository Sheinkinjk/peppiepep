/* eslint-disable react/no-unescaped-entities */
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Linkedin,
  Building2,
  MessageSquare,
  Link as LinkIcon,
  BarChart3,
  Gift,
  Zap,
  Target,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.howItWorks);

const offeringHighlights = [
  {
    id: "customer-network",
    icon: Users,
    title: "Customer Network",
    description: "Turn satisfied clients into advocates with branded portals and unique tracking links.",
    color: "cyan",
  },
  {
    id: "linkedin-influencers",
    icon: Linkedin,
    title: "LinkedIn Influencers",
    description: "Activate B2B thought leaders with campaign-specific tracking and per-creator attribution.",
    color: "blue",
  },
  {
    id: "agencies-partners",
    icon: Building2,
    title: "Agencies & Partners",
    description: "Build white-glove partner programs with tiered rewards and quarterly reviews.",
    color: "purple",
  },
  {
    id: "consultants-advisors",
    icon: MessageSquare,
    title: "Consultants & Advisors",
    description: "Enable trusted experts with discreet tracking and compliance-ready workflows.",
    color: "emerald",
  },
];

const steps = [
  {
    num: "01",
    title: "Design Your Program",
    subtitle: "Strategy tailored to your offering",
    description:
      "We start by understanding your goals and identifying which referral sources—customers, influencers, agencies, or advisors—fit your business. Then we design reward structures, tracking rules, and onboarding flows specific to each partner type.",
    features: [
      {
        icon: Target,
        text: "Define ideal partner profiles and targeting criteria",
      },
      {
        icon: Gift,
        text: "Configure reward models: revenue share, per-deal fees, credits, or hybrid",
      },
      {
        icon: Shield,
        text: "Set compliance guardrails and disclosure requirements",
      },
    ],
    offeringNote: "For LinkedIn campaigns, we match influencer audiences. For agency programs, we design tiered structures.",
  },
  {
    num: "02",
    title: "Activate Your Partners",
    subtitle: "Onboarding made effortless",
    description:
      "Each partner receives a branded portal with their unique tracking link, share buttons, and real-time performance stats. Whether it's a loyal customer, a LinkedIn creator, or a strategic agency—activation is seamless.",
    features: [
      {
        icon: LinkIcon,
        text: "Unique tracked links for every partner, campaign, and content piece",
      },
      {
        icon: Users,
        text: "Branded ambassador portals with one-tap sharing (WhatsApp, SMS, email, LinkedIn)",
      },
      {
        icon: Zap,
        text: "Instant onboarding—partners go live in minutes, not weeks",
      },
    ],
    offeringNote: "Customers get simple share links. Influencers get campaign-specific UTMs. Agencies get co-branded materials.",
  },
  {
    num: "03",
    title: "Track Every Interaction",
    subtitle: "Full-funnel attribution",
    description:
      "Every click, form submission, demo booking, and conversion is captured with partner, campaign, and link IDs. No spreadsheets, no guessing—just clean, audit-ready data flowing into your dashboard.",
    features: [
      {
        icon: BarChart3,
        text: "Real-time dashboards showing referral flow from click to close",
      },
      {
        icon: CheckCircle2,
        text: "Automatic status updates: pending, qualified, converted, rewarded",
      },
      {
        icon: Target,
        text: "Per-partner and per-campaign ROI breakdowns",
      },
    ],
    offeringNote: "LinkedIn activations show per-creator attribution. Agency programs track deal value and close rates.",
  },
  {
    num: "04",
    title: "Reward & Scale",
    subtitle: "Automated payouts that keep partners engaged",
    description:
      "When a referral converts, rewards are calculated and triggered automatically. Partners receive notifications, credits update in real-time, and your finance team gets clean ledgers for every payout.",
    features: [
      {
        icon: Gift,
        text: "Automatic reward calculations based on your configured rules",
      },
      {
        icon: Zap,
        text: "Instant SMS/email notifications keep partners motivated to share more",
      },
      {
        icon: Shield,
        text: "Audit-ready records for compliance and finance teams",
      },
    ],
    offeringNote: "Customers earn credits. Influencers get revenue share. Agencies receive tiered commissions.",
  },
];

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero Section */}
        <header className="text-center space-y-6 mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white tracking-tight max-w-4xl mx-auto">
            How <span className="text-cyan-400">Refer Labs</span> Works
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            One unified flow powers all four offerings—customer referrals, LinkedIn activations, agency partnerships, and advisor programs. Here's how it all comes together.
          </p>
        </header>

        {/* Four Offerings Overview */}
        <section className="mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offeringHighlights.map((offering) => {
              const Icon = offering.icon;
              const colorMap: Record<string, string> = {
                cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-500/20",
                blue: "bg-blue-400/10 text-blue-300 border-blue-500/20",
                purple: "bg-purple-400/10 text-purple-300 border-purple-500/20",
                emerald: "bg-emerald-400/10 text-emerald-300 border-emerald-500/20",
              };
              return (
                <div
                  key={offering.id}
                  className={`rounded-2xl border p-5 ${colorMap[offering.color]}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-xl bg-white/10 p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">{offering.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{offering.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step-by-Step Flow */}
        <section className="space-y-16">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute left-8 top-32 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
              )}

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Step Number */}
                <div className="lg:col-span-2 flex lg:flex-col items-center gap-4 lg:gap-0">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-2xl font-black text-cyan-300">{step.num}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-10 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                      {step.subtitle}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h2>
                    <p className="text-slate-300 leading-relaxed max-w-3xl">
                      {step.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {step.features.map((feature, fIdx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={fIdx}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <FeatureIcon className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-300 leading-relaxed">{feature.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Offering-specific note */}
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-cyan-400/5 border border-cyan-500/20">
                    <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-cyan-200/80 italic">{step.offeringNote}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Summary CTA */}
        <section className="mt-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-transparent p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(87,230,255,0.12),transparent_50%)]" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              One Platform. Four Powerful Channels.
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Whether you're activating customers, LinkedIn creators, strategic agencies, or trusted advisors—Refer Labs gives you the tracking, attribution, and payouts to prove ROI.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
              >
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
