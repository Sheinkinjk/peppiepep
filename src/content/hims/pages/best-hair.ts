import type { HimsPageContent } from "../types";
import { SRC } from "../config";

export const bestHair: HimsPageContent = {
  slug: "best-hair-loss-treatment-online-australia",
  vertical: "hair",
  kind: "versus",
  seoTitle: "Online Hair Loss Treatment in Australia: Hims vs Mosh",
  metaDescription:
    "Hims (formerly Pilot) and Mosh compared for online hair loss consultations in Australia: consult fees, 180-day money-back terms, cancelling, support and the Refer Labs codes.",
  eyebrow: "Men's hair loss · Australia",
  h1: "Online hair loss treatment in Australia: Hims vs Mosh compared",
  standfirst:
    "This page compares two Australian online hair loss services for men, Hims (formerly Pilot) and Mosh. Both start with a free online quiz and a consultation with an AHPRA-registered practitioner, who decides whether any treatment is appropriate, and both run a 180-day money-back guarantee: Hims on all hair plans, Mosh on quarterly hair programs. Mosh publishes its hair prices and consults by call, video or text; Hims shows prices after a phone consultation and includes a 24-hour Care Team.",
  hub: { label: "Hair loss", href: "/hair-loss" },
  verdictQuestion: "Is Hims or Mosh better for hair loss?",
  verdict: [
    "Choose on how you want to be seen and when you want to see the price. Mosh publishes its hair prices and lets you reach your practitioner by text, call or video. Hims shows prices after a phone consultation, refunds the consult fee if you don't go ahead, and lets you cancel before any order without a fee.",
    "Both guarantees run 180 days, but Mosh's covers quarterly programs only, so check which billing option you're on before relying on it.",
  ],
  pair: {
    hims: {
      bestIf: "A phone consultation, a 24-hour Care Team and a guarantee on every hair plan.",
      points: [
        "Free two-minute quiz, then a phone consultation",
        "180-day money-back guarantee on all hair plans",
        "Cancel before any order, no cancellation fee",
      ],
    },
    mosh: {
      bestIf: "Prices published before you start, and a practitioner you can text.",
      points: [
        "Free online quiz, then a call, video or text consultation",
        "180-day money-back guarantee on quarterly hair programs",
        "Price match on substantially comparable hair programs",
      ],
    },
  },
  blocks: [
    { type: "inclusions", id: "includes", heading: "What does each include?", table: "hair" },
    {
      type: "choose",
      id: "choose",
      hims: [
        "You want the money-back guarantee to cover whichever hair plan you're on.",
        "You want a Care Team you can reach at any hour.",
        "You'd rather cancel before an order than be tied to a billing period.",
      ],
      mosh: [
        "You want to see the price before the consultation.",
        "You'd rather reach your practitioner by text.",
        "You want a price match if you find a comparable hair program for less.",
      ],
    },
    {
      type: "prose",
      id: "how-to-choose",
      heading: "How do I choose an online hair loss service?",
      paragraphs: [
        "Hair plans run for months, so the terms that matter are the ones that play out over months: the length and scope of the money-back guarantee, what it takes to cancel, and how often you're charged.",
        "Price is easier to compare where it is published. If a provider shows its price only after the consultation, check that the consult fee is refundable, then ask for the cost per order and the order frequency before you commit.",
      ],
    },
    {
      type: "prose",
      id: "in-person",
      heading: "Should I see someone in person about hair loss?",
      paragraphs: [
        "If your hair loss is sudden or patchy, or comes with other symptoms, an in-person appointment is the better first step. A practitioner on either service can also tell you if they think you should be seen in person.",
      ],
    },
    { type: "offer", id: "codes", vertical: "hair" },
    {
      type: "faq",
      id: "faq",
      heading: "Online hair loss treatment: common questions",
      items: [
        {
          q: "What is the best online hair loss treatment in Australia?",
          a: "This page compares two services, Hims and Mosh, and in both a practitioner decides whether any treatment suits you. Mosh publishes its prices and consults by call, video or text; Hims shows prices after a phone consultation and adds a 24-hour Care Team.",
        },
        {
          q: "How much does online hair loss treatment cost in Australia?",
          a: "Mosh publishes its hair plan prices on its pricing page. Hims shows its prices after the consultation and refunds the consult fee if no suitable plan is found or you decide not to go ahead.",
        },
        {
          q: "Is the Mosh 180-day guarantee the same as Hims'?",
          a: "Not quite. Hims applies its 180-day money-back guarantee to all hair plans. Mosh applies its guarantee to quarterly hair programs. Both are under each provider's terms.",
        },
        {
          q: "Is Pilot hair loss still available?",
          a: "Only through Hims. Pilot is part of the Hims & Hers group now, and its website hands new patients to the Hims quiz.",
        },
        {
          q: "What are the Hims and Mosh codes for hair loss?",
          a: "Refer Labs' Hims code is REFERLABS89, which means no charge for the initial consultation for new patients. Mosh's is REFERAL55, a discount on a new customer's first hair order; our link carries REFERAL55, and you can enter it at checkout if it isn't shown.",
        },
      ],
    },
  ],
  sources: [SRC.himsHair, SRC.himsFaq, SRC.moshHair, SRC.moshReferLabs, SRC.moshPricing, SRC.moshHome, SRC.pilot],
  related: [
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "The consultation, the 180-day money-back guarantee and cancelling." },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared." },
    { label: "Mosh hair loss", href: "/moshhair", desc: "Mosh's hair service and the REFERAL55 code." },
    { label: "Online ED consultations: Hims vs Mosh", href: "/ed", desc: "Consultation format, hours and contracts." },
  ],
};
