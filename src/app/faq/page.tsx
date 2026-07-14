"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

import { aboutFAQs, servicesFAQs, pricingFAQs, allFAQs, type FAQ } from "./faqs";

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
