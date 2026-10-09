import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, HIMS_SUPPLIED_ON, OFFERS, SRC } from "../config";

// ED is a TGA 2026-27 priority area, and the TGA's June 2026 guidance names services
// presenting themselves as a route to ED medicines as a common prohibited example.
// This page describes the consultation and the terms only: no plan names, no
// treatment descriptions, no usage patterns, no outcomes, no causes, no statistics.
// V2 (9 Oct 2026): REFERLABS is presented as exclusive to Refer Labs, which Hims
// confirmed in writing (no public ED code).
export const ed: HimsPageContent = {
  slug: "hims-ed",
  vertical: "ed",
  kind: "review",
  modified: "2026-10-09",
  seoTitle: "Hims ED (ex-Pilot): Exclusive Free Consult Code REFERLABS",
  metaDescription:
    "Hims ED, formerly Pilot: a private quiz, a phone consultation from 7am to 11pm AEST, no lock-in contract, and a free consultation with REFERLABS, exclusive to us.",
  eyebrow: "Men's sexual health telehealth · Australia",
  h1: "Hims ED in Australia: a private phone consultation with no lock-in contract",
  standfirst:
    "Hims, formerly Pilot, runs private online consultations for erectile dysfunction in Australia. You answer a free two-minute quiz in private, then speak by phone to an Australian practitioner, who decides whether a plan is right for you. Consultations run from 7am to 11pm AEST, seven days, there are no lock-in contracts, and prices are shown after the consultation.",
  standfirstOffer: "REFERLABS, exclusive to Refer Labs, gives new patients a free consultation.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "What is it like to use Hims for ED?",
  verdict: [
    "The sensitive questions go into an online quiz, the consultation is a phone call, and afterwards the Care Team handles support, so nothing happens in a waiting room.",
    "Hims doesn't publish ED prices, and there is no lock-in contract.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims ED at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia who have trouble getting or keeping an erection." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consultation with an Australian practitioner." },
        { label: "Hours", value: "Consultations 7am to 11pm AEST, seven days." },
        { label: "Consultation", value: `Free with code ${OFFERS.ed.code} for new patients. The code is exclusive to Refer Labs.` },
        { label: "Plan price", value: "Not published on Hims' ED page. You see it after the consultation." },
        { label: "Contract", value: "No lock-in contracts. Pause or cancel at any time." },
        { label: "Support", value: "Unlimited practitioner check-ins and a 24-hour Care Team of nurses, pharmacists and practitioners." },
      ],
    },
    { type: "offer", id: "offer", vertical: "ed" },
    {
      type: "prose",
      id: "consult",
      heading: "What happens on the Hims ED consultation?",
      paragraphs: [
        "You answer the personal questions in the quiz, in your own time, so the practitioner knows the background before the call and the conversation can start from there.",
        "The practitioner decides whether a plan is right for you. Hims says not every plan suits everyone, and after the quiz and the call it may have no suitable option for you. Australian advertising law keeps what a practitioner may recommend off Hims' site and off Refer Labs, so the specifics come up on the call.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims ED work?",
      steps: [
        { title: "Take the free quiz", body: "A short set of questions about what has been happening and your general health. Online and private." },
        { title: "Book the phone consultation", body: "Choose a time between 7am and 11pm AEST, any day." },
        { title: "Speak to a practitioner", body: "An Australian practitioner calls you, decides whether a plan is right for you, and explains the cost if one is recommended." },
        { title: "Go ahead, or don't", body: "If a plan is recommended, you review it in your profile and choose whether to start. Pausing, delaying and cancelling later happen in the same place." },
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims ED: common questions",
      items: [
        {
          q: "Is there a Hims discount code for ED?",
          a: `Yes. ${OFFERS.ed.code} is exclusive to Refer Labs: Hims has confirmed in writing that it has no public ED code (${HIMS_SUPPLIED_ON}). It gives new patients a free consultation with an Australian practitioner, and our link applies it automatically. One use per patient. Read ${FACTS_CHECKED_ON}.`,
        },
        { q: "How much does Hims ED cost in Australia?", a: "ED plan prices aren't on Hims' ED page; the practitioner covers cost on the consultation, before you order anything." },
        { q: "Is the Hims ED consultation private?", a: "The quiz is online and the consultation is a phone call, so there is no clinic visit and no video. Hims' practitioners are AHPRA-registered and based in Australia." },
        { q: "Can I cancel Hims ED?", a: "Yes. Hims says you can pause or cancel at any time and it has no lock-in contracts." },
        {
          q: "Is Hims ED the same as Pilot?",
          a: `Yes. Pilot is now Hims: Pilot rebranded as Hims on 1 September 2026 (confirmed by Hims in writing, ${HIMS_SUPPLIED_ON}). Its owner, Eucalyptus, became part of Hims & Hers Health on 2 June 2026, and pilot.com.au sends new patients to the Hims quiz.`,
        },
        { q: "Can I claim Hims ED on Medicare?", a: "No. According to Hims' FAQ, none of its plans currently attracts a Medicare benefit." },
      ],
    },
  ],
  sources: [SRC.himsEd, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [],
};
