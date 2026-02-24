import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.howItWorks);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const phases = [
  {
    num: "01",
    title: "Identify Growth Leverage",
    copy: "We start by identifying where the real distribution opportunity is. This means understanding your product, your current channels, your market, and where the highest-leverage growth system sits.",
    bullets: [
      "Growth channel audit",
      "Target market and audience mapping",
      "Distribution gap analysis",
      "Opportunity prioritisation",
    ],
  },
  {
    num: "02",
    title: "Structure the Distribution Engine",
    copy: "Once the opportunity is clear, we design the system. Whether that is a referral program, an affiliate distribution network, an influencer partnership framework, or a market entry structure, we build the architecture before activation.",
    bullets: [
      "System design and architecture",
      "Incentive and commercial structure",
      "Partner and channel framework",
      "Tracking and reporting setup",
    ],
  },
  {
    num: "03",
    title: "Activate Channels",
    copy: "Execution is where most growth strategies fail. We activate systematically, across the right channels, with the right partners, in the right sequence. We manage the entire activation process.",
    bullets: [
      "Channel activation and partner outreach",
      "Referral or affiliate program launch",
      "Influencer or network onboarding",
      "Market entry or product distribution",
    ],
  },
  {
    num: "04",
    title: "Optimise and Scale",
    copy: "Distribution systems compound when they are continuously optimised. We track performance, identify what is working, cut what is not, and double down on the channels generating the highest leverage.",
    bullets: [
      "Performance tracking and analysis",
      "Channel optimisation",
      "Conversion refinement",
      "Scale strategy and expansion",
    ],
  },
];

const principles = [
  "We build systems, not campaigns",
  "Every engagement has clear commercial terms",
  "We track performance and report transparently",
  "We align our success with yours",
  "We work across referral, affiliate, influencer, APAC, and product channels",
];

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.07),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-4">
            Our Process
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] text-white mb-6 tracking-tight">
            Simple. Structured.{" "}
            <span className="text-[#22C0CD]">Commercial.</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            Every Refer Labs engagement follows the same four-stage process. We identify the leverage, structure the system, activate the channels, and optimise until the distribution compounds.
          </p>
        </div>

        {/* Phases */}
        <div className="mb-20">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className="border-t border-[#0AA7B5]/10 py-12 sm:py-14 grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16"
            >
              <div className="lg:pt-0.5">
                <span className="block text-5xl font-black text-[#0AA7B5]/25 leading-none mb-3 select-none">
                  {phase.num}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {phase.title}
                </h2>
              </div>

              <div>
                <p className="text-white/55 leading-relaxed mb-7 text-sm sm:text-base">
                  {phase.copy}
                </p>
                <ul className="space-y-2.5">
                  {phase.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/65">
                      <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* How We Operate */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16 mb-4">
          <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-2">Principles</p>
              <h2 className="text-xl font-black text-white">How We Operate</h2>
            </div>
            <div className="space-y-3">
              {principles.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#0AA7B5] flex-shrink-0" />
                  <p className="text-white/60 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-14 sm:pt-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            Ready to build your distribution engine?
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            Tell us where you are and where you want to go. We will map the system.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Partner With Us
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-white/[0.07] hover:text-white"
            >
              Explore Growth Engines
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
