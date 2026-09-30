import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS, SRC } from "../config";

// ED is a TGA 2026-27 priority area. This page describes the consultation and the
// terms only: no plan names, no treatment descriptions, no usage patterns, no
// outcomes, no causes.
export const ed: HimsPageContent = {
  slug: "hims-ed",
  vertical: "ed",
  kind: "review",
  seoTitle: "Hims ED Australia (formerly Pilot): Consultation, Code and Review",
  metaDescription:
    "How the Hims ED service works in Australia, formerly Pilot: a phone consultation with an Australian practitioner, hours, no lock-in contracts, the Care Team and the Refer Labs code.",
  eyebrow: "Men's sexual health telehealth · Australia",
  h1: "Hims ED Australia: the phone consultation, the terms and the code",
  standfirst:
    "Hims, formerly Pilot, runs an online sexual health service for Australian men. You answer a free two-minute quiz in private, then speak by phone to an Australian practitioner, who decides whether any treatment is appropriate. Consultations run from 7am to 11pm AEST, seven days, there are no lock-in contracts, and Hims refunds the consult fee if no suitable plan is found for you. Hims doesn't publish its ED prices. With the Refer Labs code, new patients pay nothing for the initial consultation.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "Is Hims ED worth it?",
  verdict: [
    "Hims suits men who would rather not raise ED in a waiting room. The sensitive questions go into an online quiz, the consultation is a phone call, and support afterwards runs through the Care Team.",
    "Price is the unknown. Hims doesn't publish it and has no lock-in, so the low-cost way to find out is the quiz and the consultation, with the consult fee refunded if you don't go ahead.",
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
        "The practitioner decides whether any treatment is appropriate. Hims says not every plan suits everyone, and after the quiz and the call it may have no suitable option for you; the consult fee is then refunded. Australian advertising law stops Hims, and sites like Refer Labs, from naming what a practitioner may recommend, so the specifics are covered on the call.",
        "Be complete in the quiz and on the call about your health history and anything else you take. The practitioner's decision depends on it.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims ED work?",
      steps: [
        { title: "Take the free quiz", body: "A short set of questions about what has been happening and your general health. Online and private." },
        { title: "Book the phone consultation", body: "Choose a time between 7am and 11pm AEST, any day. Our link carries the Refer Labs code into checkout." },
        { title: "Speak to a practitioner", body: "An Australian practitioner calls you and decides whether any treatment is appropriate, and explains the cost if a plan is recommended." },
        { title: "Decide in your profile", body: "If a plan is recommended, you review it in your profile and choose whether to go ahead. You can pause, delay or cancel later from the same place." },
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Is Hims ED right for you?",
      suits: [
        "You'd rather not raise ED face to face and want to start online.",
        "You prefer a phone call to a video call.",
        "You want to be able to pause or cancel without a contract.",
        "You want a Care Team to contact between appointments.",
      ],
      notFor: [
        "You want to see the price before speaking to anyone. Hims shows ED pricing after the consultation.",
        "You'd rather message by text than talk. Hims consults by phone.",
        "You've been a Hims or Pilot patient before. New-patient offers, including ours, won't apply.",
      ],
    },
    {
      type: "questions",
      id: "consult-questions",
      heading: "What should I ask on the Hims ED consultation?",
      items: [
        "Is a plan appropriate for me, and why that one?",
        "Is there anything I should tell you about other things I take?",
        "What does each order cost, and how often will I be charged?",
        "How do I change the plan if it doesn't suit?",
        "How do I pause or cancel, and is there a cut-off before each order?",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims ED: common questions",
      items: [
        {
          q: "Is there a Hims discount code for ED?",
          a: `Hims' ED page showed no public ED code when read on ${FACTS_CHECKED_ON}. The Refer Labs code for new Hims patients is ${OFFERS.ed.code}, which means no charge for the initial consultation; program fees apply. Our link carries it into checkout.`,
        },
        { q: "How much does Hims ED cost in Australia?", a: "Hims doesn't publish ED plan prices on its ED page. The practitioner covers cost on the consultation, before you order anything." },
        { q: "Is the Hims ED consultation private?", a: "The quiz is online and the consultation is a phone call, so there is no clinic visit and no video. Hims' practitioners are AHPRA-registered and based in Australia." },
        { q: "Can I cancel Hims ED?", a: "Yes. Hims says you can pause or cancel at any time and it has no lock-in contracts." },
        { q: "Is Hims ED the same as Pilot?", a: "Yes. Pilot joined the Hims & Hers group, and Pilot's site now sends new patients to the Hims quiz." },
        { q: "Can I claim Hims ED on Medicare?", a: "No. Hims' FAQ says Medicare benefits are not currently claimable for any of its plans." },
      ],
    },
  ],
  sources: [SRC.himsEd, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [
    { label: "Online ED consultations compared", href: "/ed", desc: "Consultation format, hours, contracts and support side by side." },
    { label: "How Hims compares with other providers", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED: how you start, commitment, refunds and support." },
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "The consultation, the 180-day money-back guarantee and cancelling." },
    { label: "Hims weight loss", href: "/hims", desc: "The consultation, the twelve-month commitment and the refund window." },
  ],
};
