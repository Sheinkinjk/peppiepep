import {
  ArrowRight,
  Calendar,
  Globe,
  Handshake,
  Megaphone,
  Share2,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.services);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const coreServices = [
  {
    icon: Target,
    title: "Australia Sales Rep",
    subtitle: "Customer Acquisition",
    color: "cyan",
    description:
      "We act as your on-the-ground sales arm in Australia. Outbound prospecting, warm introductions, pipeline creation, and deal support — all managed by us.",
    deliverables: [
      "Outbound prospecting to your ICP in Australia",
      "Warm introductions via our network",
      "Pipeline creation and CRM updates",
      "Closing support on key opportunities",
      "Weekly pipeline and conversion reporting",
    ],
  },
  {
    icon: Handshake,
    title: "Partnerships & Distribution",
    subtitle: "Channel Growth",
    color: "emerald",
    description:
      "We source and activate agencies, platforms, communities, and strategic partners who can distribute your product across Australia.",
    deliverables: [
      "Partner identification and outreach",
      "Agency and platform partnership activation",
      "Channel partner onboarding and enablement",
      "Partner terms and structure design",
      "Ongoing partner relationship management",
    ],
  },
  {
    icon: Share2,
    title: "Referral & Affiliate Channel Management",
    subtitle: "Performance Distribution",
    color: "purple",
    description:
      "We recruit and manage high-trust referral and affiliate partners, track performance with attribution, and optimise the channel monthly.",
    deliverables: [
      "Affiliate and referral partner recruitment",
      "Partner enablement and onboarding",
      "Attribution and performance tracking",
      "Monthly channel optimisation",
      "Commission structure management",
    ],
  },
];

const addOns = [
  {
    icon: Globe,
    title: "Landing Page Localisation",
    description: "Copy tweaks and localisation for the Australian market.",
  },
  {
    icon: Users,
    title: "Partner Program Design",
    description: "Terms, commissions, structure, and partner playbook creation.",
  },
  {
    icon: Megaphone,
    title: "Event & Community Entry",
    description: "Introductions to relevant Australian events, communities, and industry groups.",
  },
  {
    icon: Handshake,
    title: "Intro-Only Mode",
    description: "Lighter touch — we make the introductions, you take it from there. Lower cost entry point.",
  },
];

const colorMap: Record<string, { border: string; bg: string; icon: string }> = {
  cyan: { border: "border-cyan-500/20", bg: "from-cyan-500/10 to-cyan-500/5", icon: "text-cyan-400" },
  emerald: { border: "border-emerald-500/20", bg: "from-emerald-500/10 to-emerald-500/5", icon: "text-emerald-400" },
  purple: { border: "border-purple-500/20", bg: "from-purple-500/10 to-purple-500/5", icon: "text-purple-400" },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero */}
        <header className="text-center space-y-6 mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white tracking-tight max-w-4xl mx-auto">
            Services Built to <span className="text-cyan-400">Drive Australian Revenue</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Three core services, each designed to give you traction in Australia without building a local team. Delivered as managed engagements, not software.
          </p>
        </header>

        {/* Core Services */}
        <section className="mb-20 space-y-6">
          {coreServices.map((service) => {
            const Icon = service.icon;
            const colors = colorMap[service.color];
            return (
              <div
                key={service.title}
                className={`rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-6 sm:p-10`}
              >
                <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-white/10 border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h2>
                        <p className={`text-sm font-medium ${colors.icon}`}>{service.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  <div className="lg:w-72">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">Deliverables</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className={`mt-1 h-1.5 w-1.5 rounded-full ${colors.icon.replace("text-", "bg-")} flex-shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Optional Add-ons */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Optional <span className="text-cyan-400">Add-ons</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Layer these on top of any core service for a more comprehensive engagement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {addOns.map((addon) => {
              const Icon = addon.icon;
              return (
                <div
                  key={addon.title}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{addon.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{addon.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-transparent p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(87,230,255,0.12),transparent_50%)]" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Let&apos;s Scope Your Australia Engagement
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Tell us what you sell and where you are today. We will recommend the right service mix and pilot structure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
              >
                <Calendar className="h-4 w-4" />
                Book Call
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
