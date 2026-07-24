"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";

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

  const renderFAQSection = (title: string, faqs: FAQ[], offset: number) => (
    <section className="mb-10">
      <h2 className="text-xl font-extrabold text-[#10251b] mb-4">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, rawIdx) => {
          const idx = rawIdx + offset;
          const isExpanded = expandedQuestions.includes(idx);
          return (
            <div key={idx} className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] overflow-hidden">
              <button
                onClick={() => toggleQuestion(idx)}
                aria-expanded={isExpanded}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
              >
                <h3 className="text-[15px] font-semibold text-[#10251b] leading-relaxed pr-2">{faq.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-[#9aa39c] flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                className={`px-5 overflow-hidden transition-all duration-200 ease-in-out ${
                  isExpanded ? "pb-5 max-h-[600px]" : "max-h-0"
                }`}
              >
                <p className="text-sm text-[#3d4b44] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-3xl px-5 sm:px-8 pb-20 pt-12 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">FAQ</span>
        </nav>

        <header className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Questions</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f] max-w-2xl">
            Common questions about how Refer Labs works, our services, and how we are paid.
          </p>
          <div className="mt-6 flex gap-4 text-sm font-semibold">
            <button onClick={expandAll} className="text-[#0a7c42] hover:text-[#086536]">Expand all</button>
            <span className="text-[#cdd5cf]">|</span>
            <button onClick={collapseAll} className="text-[#0a7c42] hover:text-[#086536]">Collapse all</button>
          </div>
        </header>

        {renderFAQSection("About Refer Labs", aboutFAQs, 0)}
        {renderFAQSection("Services & Engagement", servicesFAQs, aboutFAQs.length)}
        {renderFAQSection("Pricing & Model", pricingFAQs, aboutFAQs.length + servicesFAQs.length)}

        <section className="mt-4">
          <div className="rounded-2xl border border-[#0a7c42]/20 bg-[#0a7c42]/[0.05] p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-extrabold text-[#10251b] mb-3">Still have questions?</h2>
            <p className="text-[#3d4b44] mb-6 max-w-md mx-auto">
              Book a quick call and we will answer anything not covered here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a7c42] text-sm font-bold text-white transition-colors hover:bg-[#086536]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Partner with us
              </a>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#e5e9e7] bg-white text-sm font-bold text-[#10251b] hover:bg-[#f5f8f6] transition-colors"
              >
                Browse the guides
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
