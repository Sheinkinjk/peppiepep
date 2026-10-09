import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, HIMS_SUPPLIED_ON, OFFERS, SRC } from "../config";

// /ed: the one ED comparison page (30 Sep 2026). Replaces
// /best-online-ed-treatment-australia, which 301s here at go-live.
// ED is a TGA 2026-27 priority area: this page describes the consultation only.
// No treatment names, types, usage patterns, causes, outcomes or health claims,
// including in the JSON-LD and anchor IDs.
// Mosh ED is a PLACEHOLDER (Jarred, 1 Oct 2026): Mosh has not supplied its ED
// details or offer. The Mosh card, table column and codes panel render as muted
// dashed placeholders with no link (MOSH.ed.placeholder in config.ts), and no copy
// here makes a claim about Mosh ED. When Mosh supplies them, fill `pair.mosh`
// below, the `mosh` cells of INCLUSIONS.ed and MOSH.ed, then add Mosh back to the
// lead, the answer, the FAQ and the sources.
export const edCompare: HimsPageContent = {
  slug: "ed",
  vertical: "ed",
  kind: "versus",
  modified: "2026-10-09",
  seoTitle: "Online ED Consultations in Australia: Hims vs Mosh",
  metaDescription:
    "Hims (formerly Pilot) consults on ED by phone, 7am to 11pm AEST, with no lock-in contract and a free consultation with REFERLABS. Mosh's ED details are to be added.",
  eyebrow: "Men's sexual health · Australia",
  h1: "Online ED consultations in Australia: Hims vs Mosh",
  standfirst:
    "Hims, formerly Pilot (Hims & Hers bought Pilot's owner on 2 June 2026, and Hims says Pilot rebranded as Hims on 1 September 2026), runs private online ED consultations for Australian men by phone, any day from 7am to 11pm AEST. A free two-minute quiz comes first, then the call with an Australian practitioner, who decides whether a plan is right for you. Hims has no lock-in contract, and the Refer Labs code REFERLABS gives new patients a free consultation. Mosh's ED details will sit beside Hims' once Mosh supplies them.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "How do Hims and Mosh run an online ED consultation?",
  verdict: [
    "Hims books a phone call with an AHPRA-registered practitioner based in Australia, with unlimited practitioner check-ins and a 24-hour Care Team of nurses, pharmacists and practitioners. You can pause or cancel at any time.",
    "Mosh's consultation format and terms are to be added with its offer.",
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
    // PLACEHOLDER: fill when Mosh supplies its ED details. Until then MOSH.ed.placeholder
    // makes the card render as a placeholder and these fields are not shown.
    mosh: { bestIf: "", points: [] },
  },
  blocks: [
    { type: "inclusions", id: "includes", heading: "What does each include?", table: "ed" },
    {
      type: "prose",
      id: "how-it-works",
      heading: "How do online ED consultations work in Australia?",
      paragraphs: [
        "A private online questionnaire about your health history comes first, and a practitioner reads it before the consultation. The practitioner then decides whether a plan is right for you. Hims says it may have no suitable option for you.",
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
          a: `Refer Labs' Hims code is ${OFFERS.ed.code}, exclusive to Refer Labs: a free consultation for new patients, applied automatically by our link. Hims has no public ED code (Hims, ${HIMS_SUPPLIED_ON}). Read ${FACTS_CHECKED_ON}. Mosh's ED code will be added once Mosh supplies it.`,
        },
        {
          q: "How much does an online ED consultation with Hims cost?",
          a: "With code REFERLABS the consultation is free for new patients. Hims doesn't publish its ED plan prices; the practitioner covers cost on the call. Its FAQ says its plans are not claimable on Medicare.",
        },
        {
          q: "Do I need to be on video for an online ED consultation with Hims?",
          a: "No. Hims consults by phone.",
        },
        {
          q: "Is Hims the same as Pilot?",
          a: `Yes. Pilot is now Hims: Hims says Pilot rebranded as Hims on 1 September 2026 (Hims, ${HIMS_SUPPLIED_ON}). Eucalyptus, the company behind it, has been part of Hims & Hers Health since 2 June 2026, and new patients who start on pilot.com.au are taken to the Hims quiz.`,
        },
      ],
    },
  ],
  sources: [SRC.himsEd, SRC.himsFaq, SRC.pilot, SRC.eucalyptus],
  related: [
    { label: "Men's health", href: "/mens-health", desc: "Online men's health services in Australia." },
  ],
};
