"use client";

import Link from "next/link";
import MatchQuiz, { type MatchConfig, type MatchResult, type MatchAnswers } from "@/components/consumer/MatchQuiz";
import { BEEHIIV_URL } from "@/lib/affiliate-links";

/**
 * Newsletter-platform matcher. beehiiv (the one we're affiliated with) is the
 * growth/monetisation pick; Substack and Kit are honest, non-monetized results
 * we route to when they genuinely fit better. Built on the same positioning as
 * the catalog so it never drifts. Shared MatchQuiz engine.
 */

const BEEHIIV: MatchResult = {
  key: "beehiiv",
  name: "beehiiv",
  why: "You want to grow fast and make money from it. beehiiv is built for growth and monetisation, native ads, a referral program and cross-newsletter recommendations, and you keep ownership of your list.",
  primaryCta: { label: "Try beehiiv", href: BEEHIIV_URL, dataCta: "newsletter-quiz-beehiiv" },
  secondary: { label: "Read our full beehiiv review", href: "/beehiiv" },
};

const SUBSTACK: MatchResult = {
  key: "substack",
  name: "Substack",
  why: "You want the simplest possible start with readers built in. Substack is free to begin and has a large discovery network. The trade-offs: it takes a cut of paid subscriptions and you don't own the platform, but for getting going quickly it is hard to beat. We're not affiliated with Substack, this is just where it fits.",
  secondary: { label: "See how it compares", href: "/best-newsletter-platform" },
};

const KIT: MatchResult = {
  key: "kit",
  name: "Kit (ConvertKit)",
  why: "You care most about automation, sequences and tagging. Kit is the creator-automation choice, strong at funnels and behavioural emails. We're not affiliated with Kit, we're pointing you there because it's the better fit for that job.",
  secondary: { label: "See how it compares", href: "/best-newsletter-platform" },
};

function resolve(a: MatchAnswers): MatchResult {
  if (a.goal === "simple") return SUBSTACK;
  if (a.goal === "automation") return KIT;
  return BEEHIIV; // growth
}

const config: MatchConfig = {
  source: "newsletter-platform-quiz",
  questions: [
    {
      id: "goal",
      legend: "What matters most for your newsletter?",
      options: [
        { value: "growth", title: "Growing fast and making money from it", note: "Ads, referrals, recommendations" },
        { value: "simple", title: "The simplest start, with readers built in", note: "Up and running today" },
        { value: "automation", title: "Automation, sequences and funnels", note: "Behavioural emails and tagging" },
      ],
    },
  ],
  resolve,
  interest: (r) => `Newsletter platforms (matched: ${r.name})`,
  newsletterHeading: "Want your match and the best current deals emailed to you?",
  newsletterSub: "We'll send your pick plus any genuinely good newsletter-tool offers we verify. No spam.",
  footnote: (
    <>
      A recommendation based on your answer, not the only option. Compare all three in the{" "}
      <Link href="/best-newsletter-platform" className="underline underline-offset-2">
        full roundup
      </Link>
      .
    </>
  ),
};

export default function NewsletterQuiz() {
  return <MatchQuiz config={config} />;
}
