"use client";

import Link from "next/link";
import MatchQuiz, { type MatchConfig, type MatchResult, type MatchAnswers } from "@/components/consumer/MatchQuiz";
import { FULLENRICH_URL, REPLY_IO_URL, AISDR_URL, GOHIGHLEVEL_URL } from "@/lib/affiliate-links";

/**
 * AI sales-tools matcher. Maps the reader's actual bottleneck to the right tool,
 * built on the same positioning as the catalog/roundup so it never drifts. Each
 * result ends in a tracked affiliate CTA + the full review. Uses the shared
 * MatchQuiz engine.
 */

const FULLENRICH: MatchResult = {
  key: "fullenrich",
  name: "FullEnrich",
  why: "Your bottleneck is data. FullEnrich runs waterfall enrichment across 15+ sources to find verified emails and mobile numbers, the data layer that feeds every other outbound tool.",
  primaryCta: { label: "Try FullEnrich", href: FULLENRICH_URL, dataCta: "ai-quiz-fullenrich" },
  secondary: { label: "Read our full review", href: "/fullenrich" },
};
const REPLY: MatchResult = {
  key: "replyio",
  name: "Reply.io",
  why: "You want to run outreach yourself. Reply.io is an AI-first engagement platform for your own sequences across email, LinkedIn, calls and SMS, with AI SDR agents and deliverability tools built in.",
  primaryCta: { label: "Visit Reply.io", href: REPLY_IO_URL, dataCta: "ai-quiz-replyio" },
  secondary: { label: "Read our full review", href: "/replyio" },
};
const AISDR: MatchResult = {
  key: "aisdr",
  name: "AiSDR",
  why: "You want it handled for you. AiSDR is a done-for-you AI rep that prospects, personalises outreach across channels and books meetings, so you build pipeline without hiring SDRs.",
  primaryCta: { label: "Visit AiSDR", href: AISDR_URL, dataCta: "ai-quiz-aisdr" },
  secondary: { label: "Read our full review", href: "/aisdr" },
};
const GOHIGHLEVEL: MatchResult = {
  key: "gohighlevel",
  name: "GoHighLevel",
  why: "Your stack is the problem. GoHighLevel consolidates CRM, marketing automation, funnels and follow-up into one platform, best for agencies and SMBs cutting tool sprawl.",
  primaryCta: { label: "Try GoHighLevel", href: GOHIGHLEVEL_URL, dataCta: "ai-quiz-gohighlevel" },
  secondary: { label: "Read our full review", href: "/gohighlevel" },
};

function resolve(a: MatchAnswers): MatchResult {
  if (a.bottleneck === "data") return FULLENRICH;
  if (a.bottleneck === "system") return GOHIGHLEVEL;
  // bottleneck === "doing"
  return a.hands === "done" ? AISDR : REPLY;
}

const config: MatchConfig = {
  source: "ai-sales-tools-quiz",
  questions: [
    {
      id: "bottleneck",
      legend: "What's the real bottleneck in your outbound right now?",
      options: [
        { value: "data", title: "I don't have good contact details", note: "Missing verified emails and mobile numbers" },
        { value: "doing", title: "I have leads, but no one to run the outreach", note: "Nobody sending the sequences" },
        { value: "system", title: "My tools and CRM are a tangled mess", note: "Too many disconnected apps" },
      ],
    },
    {
      id: "hands",
      legend: "How hands-on do you want to be?",
      skipIf: (a) => a.bottleneck !== "doing",
      options: [
        { value: "self", title: "I'll run the sequences myself", note: "Just give me a powerful platform" },
        { value: "done", title: "Do it for me", note: "An AI rep that prospects and books meetings" },
      ],
    },
  ],
  resolve,
  interest: (r) => `AI sales tools (matched: ${r.name})`,
  newsletterHeading: "Want your match and the best current deals emailed to you?",
  newsletterSub: "We'll send your pick plus any genuinely good AI sales-tool offers we verify. No spam.",
  footnote: (
    <>
      A recommendation based on your answer, not the only option. Compare all four in the{" "}
      <Link href="/best-ai-sales-tools" className="underline underline-offset-2">
        full roundup
      </Link>
      .
    </>
  ),
};

export default function AiSalesQuiz() {
  return <MatchQuiz config={config} />;
}
