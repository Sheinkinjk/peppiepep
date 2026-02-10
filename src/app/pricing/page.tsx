import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.pricing);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const plans = [
  {
    name: "Standard",
    recommended: true,
    description: "The most common engagement model. Balanced retainer with performance upside for both sides.",
    pricing: "$3K–$7.5K/mo retainer + 10–20% commission on closed revenue",
    scope: [
      "Full 90-day pilot structure",
      "Sales representation & outbound prospecting",
      "Partnership development & activation",
      "Distribution deal sourcing & structuring",
      "Weekly pipeline and conversion reporting",
      "End-of-pilot playbook with next steps",
    ],
    cta: "Book a Pilot Scoping Call",
  },
  {
    name: "Performance-Heavy",
    recommended: false,
    description: "Lower upfront cost, higher success fee. Best for companies wanting to minimise risk during market testing.",
    pricing: "Low or no retainer + 20–30% commission on closed revenue",
    scope: [
      "Same deliverables as Standard",
      "Higher commission on all revenue generated",
      "Ideal for cash-conscious early testing",
      "Aligned incentives — we earn when you earn",
      "Weekly reporting included",
      "Flexible engagement terms",
    ],
    cta: "Discuss Performance Model",
  },
  {
    name: "Enterprise",
    recommended: false,
    description: "For larger companies ready to invest in sustained Australian growth with dedicated resources.",
    pricing: "$10K–$20K/mo retainer + 5–10% commission",
    scope: [
      "Everything in Standard, plus:",
      "Expanded multi-channel execution",
      "Dedicated partnership operations",
      "Enterprise distribution deal management",
      "Monthly strategy reviews",
      "6-month minimum engagement",
    ],
    cta: "Discuss Enterprise",
  },
];

const faqs = [
  {
    q: "What does the 90-day pilot cost?",
    a: "Pricing depends on scope, target market size, and the number of channels you want to activate. Most pilots fall in the Standard range ($3K–$7.5K/mo + 10–20% commission). We scope and quote during the initial call.",
  },
  {
    q: "What counts as a 'commission' event?",
    a: "We agree on this upfront during scoping. Common triggers include closed revenue, signed partnership agreements, distribution deals, or qualified pipeline milestones. Everything is defined before the engagement starts.",
  },
  {
    q: "Can we start with Performance-Heavy and switch to Standard?",
    a: "Yes. Many clients start with the performance-heavy model to test the waters, then move to a standard retainer once they see early traction and want to scale.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Standard and Performance-Heavy pilots are 90-day engagements. Enterprise has a 6-month minimum. All engagement terms are agreed upfront.",
  },
  {
    q: "Do you take equity or exclusivity?",
    a: "No. We work on a retainer + commission basis. No equity, no exclusivity clauses. You are free to run other GTM motions in Australia alongside our engagement.",
  },
  {
    q: "What if we already have a team in Australia?",
    a: "We complement your existing team with partnership development, distribution deal structuring, and channel management. We scope the engagement to avoid overlap and maximise coverage.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(87,230,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(10,186,181,0.12),transparent_40%)]" />
      </div>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8 pb-24 pt-20">
        {/* Hero */}
        <header className="text-center space-y-6">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white tracking-tight">
            Retainer + Commission
            <br />
            <span className="text-cyan-300">
              Aligned Incentives
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We earn when you earn. Choose the engagement model that matches your risk appetite and growth stage.
          </p>
        </header>

        {/* Pricing Cards */}
        <section className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto w-full">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${
                plan.recommended
                  ? "border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20"
                  : "border border-white/10"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 inset-x-0 h-1 bg-cyan-400" />
              )}
              <div
                className={`h-full p-6 sm:p-8 flex flex-col ${
                  plan.recommended
                    ? "bg-gradient-to-br from-white/12 via-white/8 to-white/4"
                    : "bg-gradient-to-br from-white/8 via-white/4 to-white/2"
                }`}
              >
                {plan.recommended && (
                  <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-300 mt-2">{plan.description}</p>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Pricing</p>
                  <p className="text-sm text-cyan-300 font-medium">{plan.pricing}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? "bg-[#0AA7B5] text-white hover:bg-[#00838F] shadow-lg shadow-[#0AA7B5]/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="space-y-6 max-w-4xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center">Common Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5 shadow-md shadow-black/20 transition-all hover:bg-white/[0.07]"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-left list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-white pr-4">{faq.q}</h3>
                  <span className="text-cyan-300 text-xl font-light group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/10 px-6 sm:px-10 py-12 sm:py-16 shadow-2xl shadow-black/35 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(87,230,255,0.12),transparent_40%)]" />
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Ready to Build Australian Revenue?
            </h2>
            <p className="text-base sm:text-lg text-slate-200">
              Book a 15-minute call. We&apos;ll discuss your goals, recommend an engagement model, and scope the pilot.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#0AA7B5] text-white px-8 py-4 text-sm font-semibold hover:bg-[#00838F] transition-all shadow-lg shadow-[#0AA7B5]/30 gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book Call
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-all"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
