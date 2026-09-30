import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS, SRC } from "../config";

// /ed: the one ED comparison page (30 Sep 2026). Replaces
// /best-online-ed-treatment-australia, which 301s here at go-live.
// ED is a TGA 2026-27 priority area: this page describes the consultation only.
// No treatment names, types, usage patterns, causes, outcomes or health claims,
// including in the JSON-LD and anchor IDs.
// Mosh's ED offer is not supplied yet. Its card and table cells say "Awaiting
// Mosh" and its button goes to Mosh's public ED page with plain rel.
export const edCompare: HimsPageContent = {
  slug: "ed",
  vertical: "ed",
  kind: "versus",
  modified: "2026-10-01",
  seoTitle: "Online ED Consultations in Australia: Hims vs Mosh",
  metaDescription:
    "Phone or text? Hims (formerly Pilot) consults by phone, 7am to 11pm AEST; Mosh lets you message a practitioner. ED consultations, contracts and support compared.",
  eyebrow: "Men's sexual health · Australia",
  h1: "Online ED consultations in Australia: Hims vs Mosh",
  standfirst:
    "Hims, formerly Pilot, and Mosh both run private online consultations for Australian men with erectile dysfunction, and in both a registered practitioner decides whether any treatment is appropriate. Hims consults by phone between 7am and 11pm AEST, seven days, and refunds the consult fee if no suitable plan is found. Mosh starts with a short questionnaire and lets you message a practitioner by text, with phone and video available. Neither locks you into a contract.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "Which is better for an online ED consultation, Hims or Mosh?",
  verdict: [
    "The main difference is format. If you'd rather talk it through, Hims consults by phone and adds a 24-hour Care Team. If you'd rather type, Mosh lets you message the practitioner by text and says you never need to show your face.",
    "Both use AHPRA-registered practitioners based in Australia, and Mosh states that its practitioners are paid on a fee-for-service basis.",
  ],
  pair: {
    hims: {
      bestIf: "A phone consultation with support at any hour.",
      points: [
        "Free two-minute quiz, then a phone call with an Australian practitioner",
        "Consultations 7am to 11pm AEST, seven days",
        "No lock-in contracts; pause or cancel at any time",
      ],
    },
    mosh: {
      bestIf: "A consultation you can do by text.",
      points: [
        "Short online questionnaire, then a private consultation",
        "Message your practitioner by text; phone and video available",
        "No lock-in contracts; cancel anytime",
      ],
    },
  },
  blocks: [
    { type: "inclusions", id: "includes", heading: "What does each include?", table: "ed" },
    {
      type: "choose",
      id: "choose",
      hims: [
        "You'd rather speak to a practitioner than type.",
        "You'd like a Care Team to contact between consultations.",
        "You want the consult fee refunded if no suitable plan is found.",
      ],
      mosh: [
        "You'd rather message by text than speak on the phone.",
        "You want a service that says you never need to show your face.",
        "You may want mental health support from the same provider.",
      ],
    },
    {
      type: "prose",
      id: "how-it-works",
      heading: "How do online ED consultations work in Australia?",
      paragraphs: [
        "Both services start with a private online questionnaire about your health history, which a practitioner reads before the consultation. The practitioner then decides whether any treatment is appropriate. Hims says it may have no suitable option for you; Mosh says its practitioners first decide whether a telehealth consultation suits you.",
        "Treatment specifics are left to the consultation, because Australian advertising rules keep them off provider sites and off pages like this one.",
      ],
    },
    {
      type: "prose",
      id: "privacy",
      heading: "Is an online ED consultation private?",
      paragraphs: [
        "Neither service needs a clinic visit. Hims' consultation is a phone call. Mosh offers text messaging and says you don't need to show your face. Whichever you choose, answer the questionnaire fully, including anything else you take, because the practitioner's decision depends on it.",
      ],
    },
    {
      type: "prose",
      id: "in-person",
      heading: "Is an in-person appointment better for ED?",
      paragraphs: [
        "Mosh says its practitioners sometimes advise tests or an in-person visit, and a practitioner on either service can tell you if an in-person appointment would serve you better. If you already see a practitioner who knows your history, starting there is reasonable.",
      ],
    },
    { type: "offer", id: "codes", vertical: "ed" },
    {
      type: "faq",
      id: "faq",
      heading: "Online ED consultations: common questions",
      items: [
        {
          q: "Is there a Hims or Mosh discount code for ED?",
          a: `Refer Labs' Hims code is ${OFFERS.ed.code}, which means no charge for the initial consultation for new patients; program fees apply. Mosh's offer for Refer Labs readers has not been supplied yet. Hims' ED page showed no public code when read on ${FACTS_CHECKED_ON}.`,
        },
        {
          q: "How much does an online ED consultation cost?",
          a: "Hims charges a consult fee and refunds it if no suitable plan is found for you or you decide not to go ahead; it doesn't publish its ED plan prices. Mosh publishes its sexual health prices on its pricing page. Hims' FAQ says its plans are not claimable on Medicare.",
        },
        {
          q: "Do I need to be on video for an online ED consultation?",
          a: "No. Hims consults by phone. Mosh offers text messaging, with phone and video available, and says you never need to show your face.",
        },
        {
          q: "Is Hims the same as Pilot?",
          a: "Yes. Pilot is the former name. Eucalyptus, the company behind it, has been part of Hims & Hers Health since that acquisition completed on 2 June 2026, and Pilot is rebranding as Hims; new patients who start on pilot.com.au are taken to the Hims quiz.",
        },
        {
          q: "Who are the practitioners?",
          a: "Hims uses AHPRA-registered practitioners based in Australia. Mosh uses AHPRA-registered medical practitioners and nurse practitioners based in Australia, and says they are paid on a fee-for-service basis.",
        },
      ],
    },
  ],
  sources: [SRC.himsEd, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.moshEd, SRC.moshHome, SRC.moshPricing],
  related: [
    { label: "ED consultation costs in Australia", href: "/mens-health/erectile-dysfunction-treatment-cost-australia", desc: "What an online or in-person ED consultation costs." },
    { label: "Men's health", href: "/mens-health", desc: "Online men's health services in Australia." },
  ],
};
