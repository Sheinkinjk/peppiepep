"use client";

import Link from "next/link";
import MatchQuiz, { type MatchConfig, type MatchResult, type MatchAnswers } from "@/components/consumer/MatchQuiz";
import { CARRD_URL, DURABLE_URL, BUTTERNUT_URL, SWIPE_PAGES_URL } from "@/lib/affiliate-links";

/**
 * Website-builder recommender, expressed as a MatchQuiz config. Three preference
 * questions map deterministically to one of four builders, each an honest "best
 * for" with a tracked affiliate CTA and a link to the full review. The shared
 * MatchQuiz engine owns the UI, telemetry and email capture — see
 * components/consumer/MatchQuiz.tsx.
 */

const CARRD: MatchResult = {
  key: "carrd",
  name: "Carrd",
  why: "For a simple one-page site or link-in-bio, Carrd is the cheapest, fastest way to get live, a genuine free plan and Pro from $9/year.",
  primaryCta: { label: "Try Carrd free", href: CARRD_URL, dataCta: "builder-quiz-carrd" },
  secondary: { label: "Read our full review", href: "/carrd" },
};
const DURABLE: MatchResult = {
  key: "durable",
  name: "Durable AI",
  why: "For a service business that wants a working site plus back-office tools, Durable AI generates a full site in ~30 seconds and bundles a CRM and invoicing.",
  primaryCta: { label: "Try Durable AI", href: DURABLE_URL, dataCta: "builder-quiz-durable" },
  secondary: { label: "Read our full review", href: "/durableai" },
};
const BUTTERNUT: MatchResult = {
  key: "butternut",
  name: "Butternut AI",
  why: "For the fastest full multi-page draft, Butternut AI builds a complete site from one prompt in ~20 seconds that you then refine. Free to generate.",
  primaryCta: { label: "Try Butternut AI", href: BUTTERNUT_URL, dataCta: "builder-quiz-butternut" },
  secondary: { label: "Read our full review", href: "/butternut" },
};
const SWIPE: MatchResult = {
  key: "swipe",
  name: "Swipe Pages",
  why: "For paid-ad landing pages, Swipe Pages is the specialist: AMP pages that load in under a second, with A/B testing built in. 14-day free trial.",
  primaryCta: { label: "Start the free trial", href: SWIPE_PAGES_URL, dataCta: "builder-quiz-swipe" },
  secondary: { label: "Read our full review", href: "/swipepages" },
};

function resolve(a: MatchAnswers): MatchResult {
  if (a.project === "ads" || a.build === "conversion") return SWIPE;
  if (a.project === "onepage" || a.build === "cheap") return CARRD;
  // business + AI path
  return a.depth === "crm" ? DURABLE : BUTTERNUT;
}

const config: MatchConfig = {
  source: "builder-quiz",
  questions: [
    {
      id: "project",
      legend: "What are you building?",
      options: [
        { value: "onepage", title: "A one-page site or link-in-bio", note: "Portfolio, a single landing page, a bio link" },
        { value: "business", title: "A full business website", note: "Multiple pages, a real company site" },
        { value: "ads", title: "Landing pages for paid ads", note: "Google/Meta campaigns, fast and testable" },
      ],
    },
    {
      id: "build",
      legend: "How do you want it built?",
      options: [
        { value: "cheap", title: "As cheap as possible, I'll build it", note: "Lowest cost, simple editor" },
        { value: "ai", title: "Let AI generate it for me", note: "Describe it, get a site in seconds" },
        { value: "conversion", title: "I need speed and A/B testing for ads", note: "Conversion-focused landing pages" },
      ],
    },
    {
      id: "depth",
      legend: "What matters more?",
      // Only the "full business website + let AI build it" path needs this tiebreak.
      skipIf: (a) => !(a.project === "business" && a.build === "ai"),
      options: [
        { value: "crm", title: "A built-in CRM and invoicing", note: "You run a service business" },
        { value: "fast", title: "The fastest full-site draft", note: "Get everything generated, then edit" },
      ],
    },
  ],
  resolve,
  interest: (r) => `Website builders (matched: ${r.name})`,
  newsletterHeading: "Want the result and the best current deals emailed to you?",
  newsletterSub: "We'll send your match plus any genuinely good website-builder offers we verify. No spam.",
  footnote: (
    <>
      A recommendation based on your answers, not the only option. Compare all four in the{" "}
      <Link href="/best-website-builder" className="underline underline-offset-2">
        full roundup
      </Link>
      .
    </>
  ),
};

export default function BuilderQuiz() {
  return <MatchQuiz config={config} />;
}
