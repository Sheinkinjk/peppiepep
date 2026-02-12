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
    name: "Australia Launch",
    recommended: true,
    description: "Best for first-time market entry. A structured 90-day pilot that delivers your first Australian customers, partners, and compliance setup.",
    pricing: "Fixed monthly retainer + success fee on closed revenue",
    scope: [
      "Sales Representation",
      "Partnership & Distribution Development",
      "Compliance & Market Setup",
      "Initial operational coordination",
      "Weekly pipeline and conversion reporting",
      "End-of-pilot playbook with next steps",
    ],
    goal: "First customers and partners in Australia",
    cta: "Book a Market Entry Call",
  },
  {
    name: "Australia Growth",
    recommended: false,
    description: "Best for companies scaling in Australia. Ongoing retainer engagement with full commercial operations management.",
    pricing: "Monthly retainer + lower success fee on closed revenue",
    scope: [
      "Sales Representation",
      "Partnership & Distribution Development",
      "Australian Operations Management",
      "Ongoing deal support and coordination",
      "Monthly strategy reviews and reporting",
      "Market expansion planning",
    ],
    goal: "Consistent pipeline and channel growth",
    cta: "Discuss Growth Engagement",
  },
];

const faqs = [
  {
    q: "What does the 90-day pilot cost?",
    a: "Pricing depends on scope, target market size, and the number of services you want to activate. We scope and quote during the initial call based on your specific goals and market.",
  },
  {
    q: "What counts as a 'success fee' event?",
    a: "We agree on this upfront during scoping. Common triggers include closed revenue, signed partnership agreements, distribution deals, or qualified pipeline milestones. Everything is defined before the engagement starts.",
  },
  {
    q: "Can we start with Launch and move to Growth?",
    a: "Yes. Most clients start with the Australia Launch pilot to validate the market, then transition to the Growth engagement once they see early traction and want to scale.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Australia Launch is a 90-day engagement. Australia Growth is a 6-month minimum. All engagement terms are agreed upfront.",
  },
  {
    q: "Do you take equity or exclusivity?",
    a: "No. We work on a retainer + success fee basis. No equity, no exclusivity clauses. You are free to run other GTM motions in Australia alongside our engagement.",
  },
  {
    q: "What if we already have a team in Australia?",
    a: "We complement your existing team with partnership development, distribution deal structuring, compliance support, and operations management. We scope the engagement to avoid overlap and maximise coverage.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f5fbfc] via-white to-[#e8f6f8] text-slate-900 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,167,181,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(12,58,69,0.06),transparent_45%)]" />
      </div>

      <main
        id="main-content"
        className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8 pb-24 pt-20"
      >
        {/* Hero */}
        <header className="text-center space-y-5">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#0b2a34] tracking-tight">
            Retainer + Success Fee
            <br />
            <span className="text-[#0AA7B5]">Aligned Incentives</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We earn when you earn. Choose the engagement model that matches your stage and goals in Australia.
          </p>
        </header>

        {/* Pricing Cards */}
        <section className="space-y-6 max-w-4xl mx-auto w-full">
          <h2 className="sr-only">Engagement models</h2>
          <div className="grid gap-6 lg:grid-cols-2 w-full">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 ${
                  plan.recommended
                    ? "border-[#0AA7B5]/50 shadow-lg shadow-[#0AA7B5]/10"
                    : "border-slate-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#0AA7B5]" />
                )}
                <div className="h-full p-6 sm:p-8 flex flex-col gap-6">
                  {plan.recommended && (
                    <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3FAFF] text-[#0b2a34] text-xs font-semibold">
                      <Sparkles className="h-3 w-3 text-[#0AA7B5]" />
                      Recommended
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0b2a34]">{plan.name}</h3>
                    <p className="text-sm text-slate-600">{plan.description}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f3fbfc] border border-[#d7f2f5]">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Pricing</p>
                    <p className="text-sm text-[#0b2a34] font-semibold">{plan.pricing}</p>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {plan.scope.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="h-5 w-5 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 rounded-xl bg-[#E3FAFF] border border-[#B4EEF7]">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Goal</p>
                    <p className="text-sm text-[#0b2a34] font-semibold">{plan.goal}</p>
                  </div>

                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                      plan.recommended
                        ? "bg-[#0AA7B5] text-white hover:bg-[#088c98]"
                        : "bg-white text-[#0b2a34] border border-slate-200 hover:border-[#0AA7B5]/40"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6 max-w-4xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] text-center">
            Common Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white/90 px-6 py-5 shadow-sm transition-all hover:border-[#0AA7B5]/40"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-left list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0b2a34] pr-4">
                    {faq.q}
                  </h3>
                  <span className="text-[#0AA7B5] text-xl font-light group-open:rotate-45 transition-transform duration-200 flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 sm:px-10 py-12 sm:py-16 shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,167,181,0.08),transparent_45%)]" />
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2a34] leading-tight">
              Ready to Enter the Australian Market?
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Book a 15-minute call. We will discuss your goals, recommend an engagement model, and scope the pilot.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#0AA7B5] text-white px-8 py-4 text-sm font-semibold hover:bg-[#088c98] transition-all shadow-md shadow-[#0AA7B5]/25 gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book a Market Entry Call
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#0b2a34] px-8 py-4 text-sm font-semibold hover:border-[#0AA7B5]/40 transition-all gap-2"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
