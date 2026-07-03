"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { MOSHY_URL, JUNIPER_URL, BETTERBEING_URL } from "@/lib/affiliate-links";

/**
 * "Which weight-loss pathway fits you?" — a two-question decision tool that ends
 * in a tailored recommendation. Men leaning clinical land on Moshy (the money
 * link, tracked). Engagement asset + funnel, not medical advice.
 */

type Gender = "man" | "woman";
type Priority = "clinical" | "coaching" | "in-person";

type Result = {
  title: string;
  body: string;
  cta?: { label: string; href: string; sponsored: boolean; loc: string };
  secondary?: { label: string; href: string };
};

function resolve(gender: Gender, priority: Priority): Result {
  if (priority === "in-person") {
    return {
      title: "Start with your GP",
      body: "You value cost and an in-person assessment over online convenience. A GP can manage the same pathway, knows your history, and Medicare offsets part of the cost. It is slower to begin, and for you that trade is worth it.",
      secondary: { label: "Read: telehealth vs your GP", href: "/moshy-vs-gp" },
    };
  }
  if (priority === "coaching") {
    if (gender === "woman") {
      return {
        title: "Juniper looks like your fit",
        body: "You want accountability and structure alongside medication, and Juniper is built for women with exactly that coaching-and-community layer on top of the clinical pathway.",
        cta: { label: "Visit Juniper", href: JUNIPER_URL, sponsored: false, loc: "quiz-juniper" },
        secondary: { label: "Compare the providers", href: "/best-weight-loss-telehealth-australia" },
      };
    }
    return {
      title: "A lifestyle-first program suits you",
      body: "You want coaching and habits at the centre, not medication first. Better Being takes that approach and is open to anyone. If you later want the clinical route, Moshy is the men's option.",
      cta: { label: "Visit Better Being", href: BETTERBEING_URL, sponsored: false, loc: "quiz-betterbeing" },
      secondary: { label: "See all weight-loss options", href: "/weight-loss" },
    };
  }
  // clinical
  if (gender === "woman") {
    return {
      title: "Juniper is the women's clinical option",
      body: "You want a focused, practitioner-led pathway, and Juniper runs that model for women. Eligibility and suitability are assessed individually by registered practitioners.",
      cta: { label: "Visit Juniper", href: JUNIPER_URL, sponsored: false, loc: "quiz-juniper-clinical" },
      secondary: { label: "Compare the providers", href: "/best-weight-loss-telehealth-australia" },
    };
  }
  return {
    title: "Moshy is the natural starting point",
    body: "You want a fast, clinically-led pathway done online, and Moshy is the dedicated men's service for exactly that. The eligibility check takes about ten minutes and commits you to nothing.",
    cta: { label: "Check your eligibility on Moshy", href: MOSHY_URL, sponsored: true, loc: "quiz-moshy" },
    secondary: { label: "Read our full Moshy review", href: "/moshy-review" },
  };
}

const Q1: { key: Gender; label: string }[] = [
  { key: "man", label: "A man" },
  { key: "woman", label: "A woman" },
];
const Q2: { key: Priority; label: string; note: string }[] = [
  { key: "clinical", label: "A fast, clinical pathway", note: "Get started online, practitioner-led" },
  { key: "coaching", label: "Coaching & accountability", note: "Habits and structure, not medication-first" },
  { key: "in-person", label: "Lowest cost, in person", note: "Happy to see a GP and wait a little" },
];

export default function PathwayQuiz() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const step = gender === null ? 0 : priority === null ? 1 : 2;
  const result = gender && priority ? resolve(gender, priority) : null;

  function reset() {
    setGender(null);
    setPriority(null);
  }

  function track(loc: string, href: string) {
    if (typeof window !== "undefined") window.gtag?.("event", "quiz_result_click", { loc, href });
  }

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_2px_24px_-16px_rgba(0,0,0,0.2)] sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0E7C66]">Find your fit · 30 seconds</p>
        {step > 0 && (
          <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8A938E] hover:text-[#0E7C66]">
            <RotateCcw className="h-3 w-3" /> Restart
          </button>
        )}
      </div>

      {step === 0 && (
        <div className="mt-4">
          <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-[#16201C]">
            Which weight-loss pathway fits you?
          </h3>
          <p className="mt-2 text-[15px] text-[#6B756F]">First, who is this for?</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {Q1.map((o) => (
              <button
                key={o.key}
                onClick={() => setGender(o.key)}
                className="rounded-xl border border-black/[0.1] bg-white px-5 py-4 text-left text-[15px] font-semibold text-[#16201C] transition-all hover:-translate-y-0.5 hover:border-[#0E7C66] hover:bg-[#0E7C66]/[0.04]"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4">
          <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-[#16201C]">
            What matters most to you?
          </h3>
          <div className="mt-5 grid gap-3">
            {Q2.map((o) => (
              <button
                key={o.key}
                onClick={() => setPriority(o.key)}
                className="group flex items-center justify-between gap-4 rounded-xl border border-black/[0.1] bg-white px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#0E7C66] hover:bg-[#0E7C66]/[0.04]"
              >
                <span>
                  <span className="block text-[15px] font-semibold text-[#16201C]">{o.label}</span>
                  <span className="block text-[13px] text-[#6B756F]">{o.note}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#8A938E] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0E7C66]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && result && (
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">Your result</p>
          <h3 className="mt-2 font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-[#16201C]">{result.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[#46524C]">{result.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {result.cta && (
              <a
                href={result.cta.href}
                target="_blank"
                rel={result.cta.sponsored ? "nofollow sponsored" : "nofollow"}
                data-cta={result.cta.loc}
                onClick={() => track(result.cta!.loc, result.cta!.href)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#0E7C66] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0b6353]"
              >
                {result.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
            {result.secondary && (
              <Link href={result.secondary.href} className="text-sm font-semibold text-[#16201C] underline decoration-black/15 underline-offset-4 hover:decoration-[#0E7C66]">
                {result.secondary.label}
              </Link>
            )}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#8A938E]">
            This is general information to help you narrow the field, not medical advice. Suitability for any program is
            assessed individually by registered practitioners.
          </p>
        </div>
      )}
    </div>
  );
}
