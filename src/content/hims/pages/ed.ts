import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS, SRC } from "../config";

// ED is a TGA 2026-27 priority area. This page describes the consultation and the
// terms only: no plan names, no treatment descriptions, no usage patterns, no
// outcomes, no causes.
export const ed: HimsPageContent = {
  slug: "hims-ed",
  vertical: "ed",
  kind: "review",
  modified: "2026-10-01",
  seoTitle: "Hims ED Australia (formerly Pilot): Consultation, Code and Review",
  metaDescription:
    "Hims ED, formerly Pilot: a private quiz, then a phone call with an Australian practitioner from 7am to 11pm AEST. No lock-in contract. Terms and code, 1 Oct 2026.",
  eyebrow: "Men's sexual health telehealth · Australia",
  h1: "Hims ED in Australia: a private phone consultation with no lock-in contract",
  standfirst:
    "Hims, the men's health service that is replacing Pilot in Australia and belongs to US-listed Hims & Hers Health, runs private online consultations for erectile dysfunction, as well as weight loss and hair loss. You answer a free two-minute quiz in private, then speak by phone to an Australian-registered practitioner, who decides whether any treatment is appropriate. Consultations run from 7am to 11pm AEST, seven days, there are no lock-in contracts, and Hims refunds the consult fee if no suitable plan is found for you. ED prices are shown after the consultation.",
  standfirstOffer: "The Refer Labs code waives the initial consultation fee for new patients.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "Is Hims ED worth it?",
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
        { label: "Consult fee", value: "Refunded if no suitable plan is found for you or you're not satisfied with the options." },
        { label: "Plan price", value: "Not published on Hims' ED page. You see it after the consultation." },
        { label: "Public offer", value: `No public ED code on Hims' ED page, read ${FACTS_CHECKED_ON}.` },
        { label: "Contract", value: "No lock-in contracts. Pause or cancel at any time." },
        { label: "Support", value: "24-hour Care Team of nurses, pharmacists and practitioners." },
      ],
    },
    { type: "offer", id: "offer", vertical: "ed" },
    {
      type: "prose",
      id: "consult",
      heading: "What happens on the Hims ED consultation?",
      paragraphs: [
        "You answer the personal questions in the quiz, in your own time, so the practitioner knows the background before the call and the conversation can start from there.",
        "The practitioner decides whether any treatment is appropriate. Hims says not every plan suits everyone, and after the quiz and the call it may have no suitable option for you; the consult fee is then refunded. Australian advertising law keeps what a practitioner may recommend off Hims' site and off Refer Labs, so the specifics come up on the call.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims ED work?",
      steps: [
        { title: "Take the free quiz", body: "A short set of questions about what has been happening and your general health. Online and private." },
        { title: "Book the phone consultation", body: "Choose a time between 7am and 11pm AEST, any day." },
        { title: "Speak to a practitioner", body: "An Australian practitioner calls you and decides whether any treatment is appropriate, and explains the cost if a plan is recommended." },
        { title: "Go ahead, or don't", body: "If a plan is recommended, you review it in your profile and choose whether to start. Pausing, delaying and cancelling later happen in the same place." },
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Is Hims ED right for you?",
      suits: [
        "You'd rather not raise ED face to face and want to start online.",
        "You want to be able to pause or cancel without a contract.",
        "You want a Care Team to contact between appointments.",
      ],
    },

    {
      type: "faq",
      id: "faq",
      heading: "Hims ED: common questions",
      items: [
        {
          q: "Is there a Hims discount code for ED?",
          a: `Hims' ED page showed no public ED code when read on ${FACTS_CHECKED_ON}. Readers new to Hims can use ${OFFERS.ed.code}, the Refer Labs code, which removes the charge for the initial consultation; program fees still apply.`,
        },
        { q: "How much does Hims ED cost in Australia?", a: "ED plan prices aren't on Hims' ED page; the practitioner covers cost on the consultation, before you order anything." },
        { q: "Is the Hims ED consultation private?", a: "The quiz is online and the consultation is a phone call, so there is no clinic visit and no video. Hims' practitioners are AHPRA-registered and based in Australia." },
        { q: "Can I cancel Hims ED?", a: "Yes. Hims says you can pause or cancel at any time and it has no lock-in contracts." },
        { q: "Is Hims ED the same as Pilot?", a: "Yes. Pilot is rebranding as Hims. Its owner, Eucalyptus, became part of Hims & Hers Health on 2 June 2026, and pilot.com.au now says Pilot has joined the Hims & Hers group and sends new patients to the Hims quiz." },
        { q: "Can I claim Hims ED on Medicare?", a: "No. According to Hims' FAQ, none of its plans currently attracts a Medicare benefit." },
      ],
    },
  ],
  sources: [SRC.himsEd, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [],
};
