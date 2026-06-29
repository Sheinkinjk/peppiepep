"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

type FAQ = { q: string; a: string };

const aboutFAQs: FAQ[] = [
  {
    q: "What exactly does Refer Labs do?",
    a: "We design, build, and activate distribution systems for B2B and B2C businesses. Our five core services are: launching and optimising referral programs, elite affiliate program distribution, influencer and network activation, APAC market expansion, and product creation and end-to-end distribution.",
  },
  {
    q: "Who do you work with?",
    a: "We work with SMBs and eCommerce brands launching referral programs, B2B and B2C affiliate programs seeking distribution scale, global businesses entering APAC markets, influencers and creators seeking structured brand partnerships, and operators looking to collaborate on distribution-led products.",
  },
  {
    q: "What makes Refer Labs different from a marketing agency?",
    a: "We build distribution systems, not campaigns. Every engagement has clear commercial terms, performance tracking, and aligned incentives. We do not sell retainers for activity — we structure growth engines designed to compound over time.",
  },
  {
    q: "Do you work with B2C businesses?",
    a: "Yes. Several of our services — particularly elite affiliate distribution, referral program launch, and influencer activation — are built for consumer-facing brands, eCommerce businesses, subscription services, and DTC companies.",
  },
];

const servicesFAQs: FAQ[] = [
  {
    q: "Can we engage for just one service?",
    a: "Yes. We scope each engagement based on your specific goals. Some clients engage us for a single growth engine — for example, referral program launch only. Others engage across multiple services. We scope and quote based on what is actually needed.",
  },
  {
    q: "How does the process work?",
    a: "Every engagement follows four stages: identify growth leverage, structure the distribution engine, activate channels, then optimise and scale. We identify where the real opportunity is before we start building anything.",
  },
  {
    q: "What involvement is required from us?",
    a: "We need a clear brief on your product and audience, someone available to join key calls and sign off on commercial terms, and the ability to move on opportunities when they arise. We handle the day-to-day execution.",
  },
  {
    q: "Do you work across both B2B and B2C affiliate programs?",
    a: "Yes. We partner with both B2B and B2C affiliate programs and distribute them across high-intent digital communities including Reddit, niche forums, and engaged online groups. The channel strategy is tailored to your audience.",
  },
  {
    q: "How do you find and activate influencers and partners?",
    a: "We identify aligned operators, creators, consultants, and influencers based on your specific audience. We structure partnerships with clear commercial terms — not just gifting or one-off posts. Every activation is tracked and optimised.",
  },
  {
    q: "What does APAC expansion involve?",
    a: "We act as your on-the-ground commercial partner in Australia and the APAC region. This covers sales representation, partnership and distribution development, compliance and market setup, and ongoing operations management. You get a functioning in-region presence without building a local team.",
  },
];

const pricingFAQs: FAQ[] = [
  {
    q: "How do you charge?",
    a: "We work on a retainer plus success fee model. The retainer covers the execution work. The success fee is tied to agreed commercial outcomes — closed revenue, signed partnerships, distribution deals, or qualified pipeline milestones. We earn when you earn.",
  },
  {
    q: "What triggers a success fee?",
    a: "We agree on this upfront during scoping. Common triggers include closed revenue, signed partnership agreements, distribution deals, or qualified pipeline milestones. Everything is defined before the engagement starts.",
  },
  {
    q: "Do you take equity or exclusivity?",
    a: "No. We work on a retainer plus success fee basis only. No equity, no exclusivity clauses. You are free to run other GTM motions alongside our engagement.",
  },
  {
    q: "What if we already have a team or partner in-region?",
    a: "We complement existing teams and partners. We scope the engagement to avoid overlap and maximise coverage — typically covering the partnership, distribution, and operations layer that in-house salespeople do not have capacity for.",
  },
];

const allFAQs = [...aboutFAQs, ...servicesFAQs, ...pricingFAQs];

export default function FAQPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const toggleQuestion = (idx: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () => setExpandedQuestions(allFAQs.map((_, i) => i));
  const collapseAll = () => setExpandedQuestions([]);

  const renderFAQSection = (title: string, faqs: FAQ[], offset: number, borderClass: string) => (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, rawIdx) => {
          const idx = rawIdx + offset;
          const isExpanded = expandedQuestions.includes(idx);
          return (
            <div
              key={idx}
              className={`rounded-xl border ${borderClass} overflow-hidden`}
            >
              <button
                onClick={() => toggleQuestion(idx)}
                className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
              >
                <h3 className="text-base font-medium text-white leading-relaxed pr-2">{faq.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                  isExpanded ? "pb-5 max-h-[500px]" : "max-h-0"
                }`}
              >
                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#012e36] via-[#03424d] to-[#02272f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <main
        id="main-content"
        className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 pb-24 pt-16"
      >
        {/* Hero */}
        <header className="text-center space-y-6 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Common questions about our services, engagement models, and how we work.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={expandAll}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Expand all
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={collapseAll}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Collapse all
            </button>
          </div>
        </header>

        {renderFAQSection(
          "About Refer Labs",
          aboutFAQs,
          0,
          "border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent"
        )}

        {renderFAQSection(
          "Services & Engagement",
          servicesFAQs,
          aboutFAQs.length,
          "border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent"
        )}

        {renderFAQSection(
          "Pricing & Model",
          pricingFAQs,
          aboutFAQs.length + servicesFAQs.length,
          "border-white/5 bg-white/[0.02]"
        )}

        {/* Bottom CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-10 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Book a quick call and we will answer anything not covered here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0AA7B5] text-sm font-semibold text-white transition-colors hover:bg-[#00838F] shadow-lg shadow-[#0AA7B5]/30"
              >
                <Calendar className="h-4 w-4" />
                Partner With Us
              </a>
              <Link
                href="/application"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
