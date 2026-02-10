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
    name: "90-Day Pilot",
    recommended: true,
    description: "Test Australia with a structured pilot before committing long-term.",
    pricing: "Fixed monthly fee + success fee on closed revenue or partner wins",
    scope: [
      "Market and messaging alignment (Week 1)",
      "Customer + partner target list build",
      "Outbound outreach and introductions",
      "Closing support on key opportunities",
      "Weekly pipeline and conversion reporting",
      "End-of-pilot playbook with next steps",
    ],
    cta: "Book a Pilot Scoping Call",
  },
  {
    name: "Ongoing Retainer",
    recommended: false,
    description: "For companies ready to invest in sustained Australian growth after a successful pilot.",
    pricing: "Monthly retainer + lower success fee. 6-month minimum.",
    scope: [
      "Everything in the Pilot, plus:",
      "Expanded partner management and activation",
      "Ongoing customer pipeline development",
      "Partner program design and optimisation",
      "Monthly strategy reviews",
      "Dedicated partnership operations",
    ],
    cta: "Discuss a Retainer",
  },
  {
    name: "Intro-Only",
    recommended: false,
    description: "A lighter-touch entry point. We make the introductions, you take it from there.",
    pricing: "Fixed fee per introduction or light monthly retainer",
    scope: [
      "Partner and customer introductions",
      "Target list and angle recommendations",
      "No ongoing management or closing support",
      "Ideal for teams with some local capacity",
    ],
    cta: "Learn More",
  },
];

const faqs = [
  {
    q: "What does the 90-day pilot cost?",
    a: "Pricing depends on scope, target market size, and the number of channels you want to activate. We will scope and quote during the initial call. Expect a fixed monthly retainer plus a success fee component.",
  },
  {
    q: "What counts as a 'success fee' event?",
    a: "We agree on this upfront during scoping. Common triggers include closed revenue, signed partner agreements, or qualified pipeline milestones. Everything is defined before the engagement starts.",
  },
  {
    q: "Can we start with Intro-Only and upgrade?",
    a: "Yes. Many clients start with introductions to test the waters, then move to a full pilot or retainer once they see early traction.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "The Pilot is a 90-day engagement. The Retainer has a 6-month minimum. Intro-Only is flexible and can be month-to-month.",
  },
  {
    q: "Do you take equity or exclusivity?",
    a: "No. We work on a fee + success basis. No equity, no exclusivity clauses.",
  },
  {
    q: "What if we already have a team in Australia?",
    a: "We can complement your existing team with partner distribution and affiliate channel management. We will scope the engagement to avoid overlap.",
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
            Simple, Services-Led
            <br />
            <span className="text-cyan-300">
              Pricing
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose the engagement model that matches where you are. Start with a pilot, scale into a retainer, or begin with introductions only.
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
                    Recommended
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
              Book a 15-minute call. We will discuss your goals, recommend a plan, and scope the engagement.
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
