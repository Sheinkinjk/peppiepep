import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, HIMS_SUPPLIED_ON, OFFERS, SRC } from "../config";

// V2 (9 Oct 2026). The 180-day guarantee stays in the headline and now also sits
// beside the code (OFFER_NOTES.hair). Hims' terms (clause c, read 9 Oct 2026) apply
// it to "a particular" hair plan, so V2 says "select hair plans", matching Hims'
// own claims sheet; V1's "all hair plans" followed the hair page's banner.
export const hair: HimsPageContent = {
  slug: "hims-hair-loss",
  vertical: "hair",
  kind: "review",
  modified: "2026-10-09",
  seoTitle: "Hims Hair Loss (ex-Pilot): Free Consult Code REFERLABS",
  metaDescription:
    "Pilot's hair service is now Hims: a phone consultation, a 180-day money-back guarantee on select plans, and a free consultation with code REFERLABS.",
  eyebrow: "Men's hair loss telehealth · Australia",
  h1: "Hims hair loss in Australia, with a 180-day money-back guarantee",
  standfirst:
    "Hims, formerly Pilot, runs online hair loss consultations for men in Australia. You take a free two-minute quiz, then talk by phone to an Australian practitioner, who decides whether a hair plan is right for you. Select hair plans carry a 180-day money-back guarantee under Hims' terms, you can cancel without a fee before any order is processed, and prices appear after the consultation.",
  standfirstOffer: "New patients get a free consultation with the Refer Labs code REFERLABS.",
  hub: { label: "Hair loss", href: "/hair-loss" },
  verdictQuestion: "What happens if a Hims hair plan isn't for you?",
  verdict: [
    "Hair plans run for months. Select plans carry a 180-day money-back guarantee under Hims' terms, and there is no fee for cancelling before an order.",
    "The price is shown after the consultation, and with code REFERLABS the consultation is free for new patients.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims hair loss at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia, from first thinning to more advanced hair loss." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consultation with an Australian practitioner." },
        { label: "Consultation", value: `Free with code ${OFFERS.hair.code} for new patients.` },
        { label: "Plan price", value: "Not published on Hims' hair page. You see it after the consultation." },
        { label: "Guarantee", value: "180-day money-back guarantee on select hair plans, under Hims' terms." },
        { label: "Orders", value: "A subscription, with an order every two or three months depending on the plan." },
        { label: "Cancelling", value: "Before your next order is processed, with no cancellation fee." },
        { label: "Support", value: "Unlimited practitioner check-ins, a 24-hour Care Team and plan changes on request." },
      ],
    },
    { type: "offer", id: "offer", vertical: "hair" },
    {
      type: "prose",
      id: "plans",
      heading: "How does Hims decide which hair plan I get?",
      paragraphs: [
        "Hims groups its hair plans by the stage of hair loss, from the first signs of thinning to more advanced loss. It does not say what a plan contains, because Australian advertising law stops any provider, or any site writing about one, from naming it.",
        "Which plan is recommended, if any, is the practitioner's decision, based on your quiz answers, the stage and pattern of your hair loss and your health history. You can ask to change plans at any time, and the Care Team books another practitioner appointment to discuss it.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims hair loss work?",
      steps: [
        { title: "Take the online quiz", body: "About two minutes of questions about your hair, how long it has been changing and your health history. There is no charge." },
        { title: "Book the phone consultation", body: "Hims says you can speak to a practitioner within 20 minutes of finishing the quiz and booking, subject to availability." },
        { title: "Talk to an Australian practitioner", body: "The practitioner has your answers before the call and decides whether a hair plan is right for you." },
        { title: "Choose a plan and how often it is ordered", body: "If a plan is recommended and you want to proceed, you pick it and the order frequency in your Hims profile." },
        { title: "Check in and adjust", body: "Check in with your practitioner whenever you like, and cancel before any upcoming order if you want to stop." },
      ],
    },
    {
      type: "prose",
      id: "guarantee",
      heading: "How does the Hims 180-day money-back guarantee work?",
      paragraphs: [
        "Hims offers a 180-day money-back guarantee on select hair plans if you're not satisfied, claimed by emailing hello@hims.com.au within the first 180 days, under Hims' terms and conditions.",
        "Cancelling is separate. You can cancel before any upcoming order is processed without a fee. The guarantee returns money already paid; cancelling stops future charges.",
      ],
    },
    {
      type: "ledger",
      id: "included",
      heading: "What's included with a Hims hair plan?",
      rows: [
        { label: "Practitioner access", value: "Unlimited practitioner check-ins, included in the cost of the plan, and plan changes made on request." },
        { label: "Care Team", value: "24-hour support from a team Hims says includes nurses, pharmacists and practitioners." },
        { label: "Flexibility", value: "Pause or delay an order from your profile, or cancel before the next order is processed with no fee." },
        { label: "Guarantee", value: "180-day money-back guarantee on select hair plans, claimed by email to Hims, under Hims' terms." },
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims hair loss: common questions",
      items: [
        {
          q: "Is there a Hims discount code for hair loss?",
          a: `Yes. ${OFFERS.hair.code} is the Refer Labs code for new Hims patients: a free consultation with an Australian practitioner. Our link applies it automatically. One use per patient, and it can't be combined with any other Hims offer. Read ${FACTS_CHECKED_ON}.`,
        },
        {
          q: "How much does Hims hair loss cost in Australia?",
          a: `Hims doesn't publish hair plan prices on its hair page. You see the price after your phone consultation, and with code ${OFFERS.hair.code} the consultation is free for new patients.`,
        },
        {
          q: "Does Hims offer a money-back guarantee on hair plans?",
          a: "Yes. Hims offers a 180-day money-back guarantee on select hair plans if you're not satisfied, under its terms and conditions.",
        },
        { q: "Can I cancel my Hims hair plan?", a: "Yes. You can cancel any time before your next order is processed, with no cancellation fee." },
        { q: "How often am I charged for a Hims hair plan?", a: "Hims hair plans run as a subscription, with an order every two or three months depending on the plan." },
        {
          q: "Is Hims hair loss the same as Pilot hair loss?",
          a: `Yes. Pilot is now Hims: Pilot rebranded as Hims on 1 September 2026 (confirmed by Hims in writing, ${HIMS_SUPPLIED_ON}), after Hims & Hers Health bought Pilot's owner, Eucalyptus, on 2 June 2026. Signing up on pilot.com.au leads to the Hims quiz. Former Pilot patients count as previous patients for new-patient offers.`,
        },
      ],
    },
  ],
  sources: [SRC.himsHair, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [],
};
