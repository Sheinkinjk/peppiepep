"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

type FAQ = { q: string; a: string };

const qualificationFAQs: FAQ[] = [
  {
    q: "Do you only work with overseas companies?",
    a: "Our primary focus is overseas companies ($1M-$50M revenue) entering Australia. However, we also work with Australia-based companies that want partner-driven growth and distribution channel management. The site prioritises overseas expansion because that is where we deliver the most differentiated value.",
  },
  {
    q: "What industries do you focus on?",
    a: "B2B SaaS, fintech, healthtech, creator economy tools, e-commerce tech, and professional services software. We are open to other industries where partner distribution and local GTM make sense, but those six are where we have the deepest playbooks.",
  },
  {
    q: "What does the ideal client look like?",
    a: "$1M-$50M in annual revenue, strong product-market fit in at least one overseas market, high LTV product with partnership potential, and no existing Australian presence. A founder or growth lead who can join key calls is essential.",
  },
  {
    q: "How fast can we see traction?",
    a: "During a 90-day pilot, we aim to deliver 10-20 client conversations, 3-8 strategic partnerships, and 1-3 distribution deals. Revenue signals typically emerge within the first 60-90 days depending on your sales cycle length.",
  },
];

const serviceFAQs: FAQ[] = [
  {
    q: "What are your three core offerings?",
    a: "Sales Representation (outbound prospecting, demo booking, pipeline creation, closing support), Partnership Development (sourcing and activating agencies, consultancies, and strategic partners), and Distribution Deals (structuring white-label, reseller, and enterprise distribution agreements).",
  },
  {
    q: "Do you close deals or just book meetings?",
    a: "We do both. We book meetings, make introductions, negotiate partnership terms, structure distribution deals, and provide closing support on key opportunities. You join the calls that matter and lead final negotiations.",
  },
  {
    q: "What is the client involvement required?",
    a: "We need four things from you: a clear ICP, your offer and pricing, someone to join key calls, and the ability to move fast on partnership and distribution terms. Beyond that, we handle the day-to-day execution.",
  },
  {
    q: "How do you track partners and attribution?",
    a: "We use tracking and reporting tools to attribute every partner introduction, customer conversation, distribution deal, and revenue outcome. You receive weekly reports covering pipeline, partners, deal progress, and next actions.",
  },
  {
    q: "What is your pricing model?",
    a: "Retainer + commission. Standard: $3K-$7.5K/mo + 10-20% commission. Performance-Heavy: low or no retainer + 20-30% commission. Enterprise: $10K-$20K/mo + 5-10% commission. We earn when you earn.",
  },
  {
    q: "What if we already have a salesperson in Australia?",
    a: "We complement your existing team. Your salesperson focuses on direct sales while we build the partnership and distribution layer. We scope the engagement to avoid overlap and maximise coverage.",
  },
  {
    q: "Do you take equity or exclusivity?",
    a: "No. We work on a retainer + commission basis. No equity, no exclusivity clauses. You are free to run other GTM motions in Australia alongside our engagement.",
  },
  {
    q: "What does a 90-day pilot include?",
    a: "Week 1: market and messaging alignment. Weeks 2-3: customer, partner, and distribution target list build. Weeks 4-12: outreach, introductions, meetings, deal structuring, and closing support. Throughout: weekly reporting on pipeline, partners, and conversion metrics. At the end: a playbook with next steps and repeatable channel analysis.",
  },
];

const allFAQs = [...qualificationFAQs, ...serviceFAQs];

export default function FAQPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const toggleQuestion = (idx: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () => setExpandedQuestions(allFAQs.map((_, i) => i));
  const collapseAll = () => setExpandedQuestions([]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero */}
        <header className="text-center space-y-6 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Common questions about our Australia expansion services, pricing, and pilot structure.
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

        {/* Is This For Me? Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Is This For Me?</h2>
          <div className="space-y-3">
            {qualificationFAQs.map((faq, rawIdx) => {
              const idx = rawIdx;
              const isExpanded = expandedQuestions.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent overflow-hidden"
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

        {/* Service & Engagement FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Service &amp; Engagement</h2>
          <div className="space-y-3">
            {serviceFAQs.map((faq, rawIdx) => {
              const idx = rawIdx + qualificationFAQs.length;
              const isExpanded = expandedQuestions.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
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
                Book Call
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
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
