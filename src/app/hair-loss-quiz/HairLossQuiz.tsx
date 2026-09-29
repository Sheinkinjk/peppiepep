"use client";

import Link from "next/link";
import MatchQuiz, { type MatchConfig, type MatchResult, type MatchAnswers } from "@/components/consumer/MatchQuiz";
import { MOSH_HAIR_URL, DENSE_URL } from "@/lib/affiliate-links";

/**
 * Hair-loss matcher. Preference-based, not medical: routes to the clinical
 * telehealth route (Mosh, men's service), a topical/cosmetic routine (Dense),
 * or a GP. The in-person branch is honest and non-monetized. Practitioner-
 * assessment disclaimer on the clinical result. See TGA rules in project memory.
 */

const MOSH: MatchResult = {
  key: "mosh",
  name: "The clinical route, via Mosh",
  why: "You want a practitioner-assessed approach, done online. Mosh runs a men's hair-loss consult entirely online, and a registered practitioner decides whether any treatment is appropriate.",
  primaryCta: { label: "Check your options with Mosh", href: MOSH_HAIR_URL, dataCta: "hair-quiz-mosh" },
  secondary: { label: "Read our full Mosh review", href: "/moshhair" },
  note: "Prescription treatments in Australia are only available after assessment by a registered practitioner, who decides whether they are appropriate for you. General information, not medical advice.",
};

const DENSE: MatchResult = {
  key: "dense",
  name: "A topical routine, via Dense",
  why: "You want a non-prescription approach. Dense Hair Experts focuses on density and scalp health with topical, cosmetic products, no consult required. Best treated as an ongoing routine with realistic expectations.",
  primaryCta: { label: "Visit Dense Hair Experts", href: DENSE_URL, dataCta: "hair-quiz-dense" },
  secondary: { label: "Read our full Dense review", href: "/dense" },
};

const GP: MatchResult = {
  key: "gp",
  kicker: "The fit for you",
  name: "Start with your GP",
  why: "You would rather be seen in person or you are not sure where to begin. A GP can assess the likely cause of your hair loss, talk through options, and refer you on. It is the safest first step when you are unsure.",
  secondary: { label: "See how the options compare", href: "/best-hair-loss-treatment-australia" },
  note: "General information, not medical advice. A registered health professional should assess your individual situation.",
};

/*
 * 28 Sep 2026. The quiz never asked who the treatment was for, so a woman choosing
 * the clinical route online was sent to Mosh, a men's service, and told so only in
 * the result. It now asks first, and a woman on the clinical route is matched to a
 * GP, which earns nothing. The clinical option is described as practitioner-assessed
 * rather than "prescription-based": the TGA treats promoting a service as a way to
 * obtain prescription medicine as advertising that medicine.
 */
const GP_WOMEN: MatchResult = {
  ...GP,
  key: "gp-women",
  why: "You want a clinical, practitioner-assessed approach. The online hair-loss service we cover is for men, so a GP is the better first step: they can assess the likely cause, talk through options and refer you on.",
};

function resolve(a: MatchAnswers): MatchResult {
  if (a.pref === "topical") return DENSE;
  if (a.pref === "unsure") return GP;
  // clinical
  if (a.who === "woman") return GP_WOMEN;
  return a.consult === "no" ? GP : MOSH;
}

const config: MatchConfig = {
  source: "hair-loss-quiz",
  questions: [
    {
      id: "who",
      legend: "Who is this for?",
      options: [
        { value: "man", title: "A man" },
        { value: "woman", title: "A woman" },
      ],
    },
    {
      id: "pref",
      legend: "How would you prefer to treat it?",
      options: [
        { value: "clinical", title: "A clinical, practitioner-assessed approach", note: "Any treatment is decided by the practitioner" },
        { value: "topical", title: "Topical, non-prescription products", note: "A cosmetic routine, no consult" },
        { value: "unsure", title: "I'm not sure, I'd rather ask someone first", note: "See a doctor before deciding" },
      ],
    },
    {
      id: "consult",
      legend: "Are you comfortable doing the assessment online?",
      skipIf: (a) => a.pref !== "clinical" || a.who === "woman",
      options: [
        { value: "yes", title: "Yes, online is fine", note: "Handled from home" },
        { value: "no", title: "No, I'd rather be seen in person", note: "Prefer a face-to-face GP" },
      ],
    },
  ],
  resolve,
  // Topic only. The matched result tied a health condition to an email address and
  // went to GA4 as an event parameter, while the privacy policy says we do not
  // knowingly collect health information.
  interest: () => "Hair-loss offers",
  newsletterHeading: "Want verified hair-loss offers emailed to you?",
  newsletterSub: "Only offers we have verified. We do not record your answers against your address. No spam, no pay-to-rank.",
  footnote: (
    <>
      A recommendation based on your preferences, not a medical assessment. Compare every option in the{" "}
      <Link href="/hair-loss" className="underline underline-offset-2">
        hair-loss hub
      </Link>
      .
    </>
  ),
};

export default function HairLossQuiz() {
  return <MatchQuiz config={config} />;
}
