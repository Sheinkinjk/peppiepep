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
  Eye,
  MousePointer,
  TrendingUp,
  Award,
  Play,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
    description: "Build white-glove partner programs with custom rewards and quarterly reviews.",
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

const dashboardPreviews = [
  {
    step: "01",
    title: "Program Setup Dashboard",
    description: "Configure your reward rules, partner types, and compliance settings in one place.",
    icon: FileText,
    metrics: [
      { label: "Reward Rules", value: "3" },
      { label: "Partner Types", value: "4 Active" },
      { label: "Active", value: "Yes" },
    ],
    color: "cyan",
  },
  {
    step: "02",
    title: "Partner Portal View",
    description: "See what your partners see—their unique link, share buttons, and performance stats.",
    icon: Users,
    metrics: [
      { label: "Share Link", value: "Active" },
      { label: "QR Code", value: "Ready" },
      { label: "Affiliates", value: "12" },
    ],
    color: "blue",
  },
  {
    step: "03",
    title: "Attribution Dashboard",
    description: "Track every click, form fill, and conversion with full partner attribution.",
    icon: TrendingUp,
    metrics: [
      { label: "Clicks", value: "847" },
      { label: "Conversions", value: "34" },
      { label: "Rate", value: "4.0%" },
    ],
    color: "emerald",
  },
  {
    step: "04",
    title: "Payout Ledger",
    description: "Automated calculations, clear records, and one-click payouts to partners.",
    icon: Award,
    metrics: [
      { label: "Earned", value: "$12.4K" },
      { label: "Pending", value: "$2.8K" },
      { label: "Paid", value: "$9.6K" },
    ],
    color: "purple",
  },
];

const steps = [
  {
    num: "01",
    title: "Design Your Program",
    subtitle: "Strategy tailored to your offering",
    description:
      "We start by understanding your goals and identifying which affiliate sources—customers, influencers, agencies, or advisors—fit your business. Then we design reward structures, tracking rules, and onboarding flows specific to each partner type.",
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
    offeringNote: "For LinkedIn campaigns, we match influencer audiences. For agency programs, we design custom reward structures.",
    playbook: {
      title: "Example: Law Firm Setup",
      steps: [
        "Identify 20 past clients who've sent informal affiliates",
        "Set 10% revenue share on closed deals",
        "Create branded landing page for affiliate prospects",
        "Configure 30-day attribution window",
      ],
    },
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
    playbook: {
      title: "Example: Partner Activation",
      steps: [
        "Send invite email with personalized portal link",
        "Partner logs in and sees their unique affiliate URL",
        "One-tap share to LinkedIn, email, or WhatsApp",
        "Partner sees real-time stats in their dashboard",
      ],
    },
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
        text: "Real-time dashboards showing affiliate flow from click to close",
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
    playbook: {
      title: "Example: Tracking Flow",
      steps: [
        "Prospect clicks partner's affiliate link",
        "Cookie + UTM params captured automatically",
        "Form submission logged with full attribution",
        "Sales team sees affiliate source in CRM",
      ],
    },
  },
  {
    num: "04",
    title: "Reward & Scale",
    subtitle: "Automated payouts that keep partners engaged",
    description:
      "When a affiliate converts, rewards are calculated and triggered automatically. Partners receive notifications, credits update in real-time, and your finance team gets clean ledgers for every payout.",
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
    offeringNote: "Customers earn credits. Influencers get revenue share. Agencies receive performance-based commissions.",
    playbook: {
      title: "Example: Payout Scenario",
      steps: [
        "Deal closes: $50,000 contract",
        "System calculates 10% commission = $5,000",
        "Partner notified via email + SMS",
        "Payout processed on next cycle",
      ],
    },
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
            One unified flow powers all four offerings—customer affiliates, LinkedIn activations, agency partnerships, and advisor programs.
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

        {/* Step-by-Step Flow with Dashboard Previews */}
        <section className="space-y-20">
          {steps.map((step, idx) => {
            const preview = dashboardPreviews[idx];
            const PreviewIcon = preview.icon;
            const colorClasses: Record<string, { border: string; bg: string; icon: string; metric: string }> = {
              cyan: { border: "border-cyan-500/30", bg: "from-cyan-500/10 to-cyan-500/5", icon: "text-cyan-400", metric: "text-cyan-300" },
              blue: { border: "border-blue-500/30", bg: "from-blue-500/10 to-blue-500/5", icon: "text-blue-400", metric: "text-blue-300" },
              emerald: { border: "border-emerald-500/30", bg: "from-emerald-500/10 to-emerald-500/5", icon: "text-emerald-400", metric: "text-emerald-300" },
              purple: { border: "border-purple-500/30", bg: "from-purple-500/10 to-purple-500/5", icon: "text-purple-400", metric: "text-purple-300" },
            };
            const colors = colorClasses[preview.color];

            return (
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

                    {/* Dashboard Preview Card */}
                    <div className={cn(
                      "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6",
                      colors.border,
                      colors.bg
                    )}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <PreviewIcon className={cn("h-6 w-6", colors.icon)} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Dashboard Preview</p>
                            <h4 className="font-semibold text-white">{preview.title}</h4>
                            <p className="text-sm text-slate-400">{preview.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-6">
                          {preview.metrics.map((metric) => (
                            <div key={metric.label} className="text-center">
                              <p className={cn("text-xl font-bold", colors.metric)}>{metric.value}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-wide">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Playbook Example */}
                    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/50 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Play className="h-4 w-4 text-emerald-400" />
                        </div>
                        <h4 className="font-semibold text-white text-sm">{step.playbook.title}</h4>
                      </div>
                      <ol className="space-y-2">
                        {step.playbook.steps.map((playbookStep, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-300">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                              {pIdx + 1}
                            </span>
                            {playbookStep}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Offering-specific note */}
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-cyan-400/5 border border-cyan-500/20">
                      <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-cyan-200/80 italic">{step.offeringNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Summary CTA */}
        <section className="mt-16 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-transparent p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(87,230,255,0.12),transparent_50%)]" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Launch Your Program?
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
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
