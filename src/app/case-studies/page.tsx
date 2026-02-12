import {
  ArrowRight,
  Calendar,
  Cloud,
  FileSignature,
  Handshake,
  Target,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.caseStudies);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const playbooks = [
  {
    id: "us-saas-australia",
    icon: Cloud,
    color: "cyan",
    title: "How We Enter a New Market for a B2B SaaS Company",
    subtitle: "Example playbook",
    steps: [
      { phase: "Week 1", action: "ICP alignment and region-specific positioning review" },
      { phase: "Week 2-3", action: "Build target list of 50 local prospects and 15 potential agency partners" },
      { phase: "Week 4-6", action: "Launch outbound sequences; begin partner outreach with tailored pitch decks" },
      { phase: "Week 7-10", action: "Book and attend introductory meetings; refine messaging based on early feedback" },
      { phase: "Week 11-12", action: "Pipeline review; partner terms negotiation; next-step playbook delivered" },
    ],
    typicalOutcomes: [
      "10-20 qualified prospect conversations",
      "3-5 agency or platform partner discussions",
      "Clear signal on product-market fit in the region",
      "Repeatable outreach sequences for continued use",
    ],
  },
  {
    id: "agency-partner-channel",
    icon: Handshake,
    color: "teal",
    title: "How We Build an Agency Partner Channel",
    subtitle: "Example playbook",
    steps: [
      { phase: "Week 1", action: "Map the local agency landscape relevant to the client's product category" },
      { phase: "Week 2-3", action: "Shortlist 20 agencies; draft partner value proposition and terms framework" },
      { phase: "Week 4-8", action: "Outreach to agency decision-makers; present partnership opportunity" },
      { phase: "Week 9-10", action: "Onboard first partners; set up tracking and reporting" },
      { phase: "Week 11-12", action: "First partner-sourced leads entering pipeline; optimise partner enablement materials" },
    ],
    typicalOutcomes: [
      "15-20 agency conversations",
      "3-8 signed or in-progress partner agreements",
      "Partner enablement kit ready for scale",
      "First partner-sourced pipeline within 90 days",
    ],
  },
  {
    id: "distribution-deals",
    icon: FileSignature,
    color: "cyanSoft",
    title: "How We Structure Distribution Deals in Australia",
    subtitle: "Example playbook",
    steps: [
      { phase: "Week 1", action: "Define ideal distribution partner profile and deal structure preferences (white-label, reseller, licensing)" },
      { phase: "Week 2-3", action: "Identify 15-20 potential distribution partners - platforms, enterprise buyers, and channel operators" },
      { phase: "Week 4-8", action: "Pitch distribution opportunities; negotiate terms and revenue-share structures" },
      { phase: "Week 9-10", action: "First deals in negotiation; support contract finalisation and onboarding" },
      { phase: "Week 11-12", action: "First distribution revenue flowing; optimise terms based on early performance" },
    ],
    typicalOutcomes: [
      "1-3 signed distribution agreements",
      "White-label or reseller terms negotiated",
      "Enterprise introductions completed",
      "Scalable distribution deal playbook",
    ],
  },
];

const colorMap: Record<string, { border: string; icon: string; bg: string; text: string }> = {
  cyan: { border: "border-cyan-500/20", icon: "text-cyan-300", bg: "from-cyan-500/12", text: "text-cyan-300" },
  teal: { border: "border-teal-500/20", icon: "text-teal-300", bg: "from-teal-500/12", text: "text-teal-300" },
  cyanSoft: { border: "border-cyan-400/20", icon: "text-cyan-200", bg: "from-cyan-400/12", text: "text-cyan-200" },
};

export default function CaseStudiesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(87,230,255,0.06),transparent_40%)]" />

      <main
        id="main-content"
        className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 sm:px-10"
      >
        {/* Hero */}
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white tracking-tight">
            Playbooks
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Example scenarios showing how we approach market entry, partner channels, and distribution deals.
          </p>
          <p className="text-sm text-slate-500 italic">
            These are illustrative playbooks, not fabricated case studies. Each engagement is scoped to your specific situation.
          </p>
        </header>

        {/* Playbook Cards */}
        <div className="space-y-8">
          {playbooks.map((playbook) => {
            const Icon = playbook.icon;
            const colors = colorMap[playbook.color];

            return (
              <article
                key={playbook.id}
                className={`rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} to-white/[0.02] overflow-hidden`}
              >
                {/* Header */}
                <div className="px-6 sm:px-8 py-6 border-b border-white/5">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl bg-white/10 border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{playbook.subtitle}</p>
                      <h2 className="text-lg sm:text-xl font-bold text-white">{playbook.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="px-6 sm:px-8 py-6">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-4 font-semibold">Approach</p>
                  <div className="space-y-3">
                    {playbook.steps.map((step) => (
                      <div key={step.phase} className="flex items-start gap-3">
                        <span className={`text-xs font-bold ${colors.text} w-16 flex-shrink-0 mt-0.5`}>{step.phase}</span>
                        <p className="text-sm text-slate-300">{step.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typical Outcomes */}
                <div className="px-6 sm:px-8 py-6 border-t border-white/5 bg-white/[0.02]">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">Typical Targets</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {playbook.typicalOutcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
                        <Target className={`h-4 w-4 ${colors.icon} flex-shrink-0 mt-0.5`} />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.02] to-transparent p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want a Playbook Built for Your Business?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Book a call and we will map out a market entry approach specific to your product and region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#00838F] shadow-lg shadow-[#0AA7B5]/30"
            >
              <Calendar className="h-4 w-4" />
              Book a Market Entry Call
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
