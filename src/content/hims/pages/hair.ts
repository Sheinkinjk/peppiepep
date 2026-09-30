import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS, SRC } from "../config";

export const hair: HimsPageContent = {
  slug: "hims-hair-loss",
  vertical: "hair",
  kind: "review",
  modified: "2026-10-01",
  seoTitle: "Hims Hair Loss Australia (formerly Pilot): Code and Review",
  metaDescription:
    "Pilot's hair loss service is now Hims: a phone consultation, a 180-day money-back guarantee on every hair plan, fee-free cancelling and a Refer Labs code.",
  eyebrow: "Men's hair loss telehealth · Australia",
  h1: "Hims hair loss Australia: the consultation, the guarantee and the code",
  standfirst:
    "Hims hair loss is an online service from Hims, the Australian arm of US-listed Hims & Hers Health and the brand Pilot is becoming; Hims also covers weight loss and sexual health. You start with a free two-minute quiz and a phone consultation with an Australian-registered practitioner, who decides whether any treatment is appropriate. Every hair plan carries a 180-day money-back guarantee under Hims' terms, and you can cancel without a fee before any order is processed. Prices appear after the consultation, and new patients using the Refer Labs code are not charged for the initial consultation.",
  hub: { label: "Hair loss", href: "/hair-loss" },
  verdictQuestion: "Is Hims hair loss treatment worth it?",
  verdict: [
    "The case for it is time. Hair plans run for months, the 180-day guarantee covers every one of them, and cancelling before an order costs nothing.",
    "The gap is price. Hims shows hair pricing only after the consultation. The consult fee is refunded if you decide not to go ahead, so finding out costs little.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims hair loss at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia, from first thinning to more advanced hair loss." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consultation, 7am to 11pm AEST, seven days." },
        { label: "Consult fee", value: "Refunded if no suitable plan is found for you or you decide not to go ahead." },
        { label: "Plan price", value: "Not published on Hims' hair page. You see it after the consultation." },
        { label: "Guarantee", value: "180-day money-back guarantee on all hair plans. Terms apply." },
        { label: "Orders", value: "A subscription, with an order every two or three months depending on the plan." },
        { label: "Cancelling", value: "Before your next order is processed, with no cancellation fee." },
        { label: "Support", value: "24-hour Care Team and plan changes on request." },
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
        { title: "Take the online quiz", body: "About two minutes of questions about your hair, how long it has been changing, and your health history. Free, and it doesn't commit you to anything." },
        { title: "Book the phone consultation", body: "Our link carries the Refer Labs code into checkout. Otherwise Hims refunds the consult fee if no suitable plan is found or you decide not to go ahead." },
        { title: "Talk to an Australian practitioner", body: "The practitioner has read your answers before the call and decides whether any treatment is appropriate. Ask about price here, since it isn't published on the site." },
        { title: "Decide in your profile", body: "If a plan is recommended and you want to proceed, you choose it and the order frequency in your Hims profile." },
        { title: "Check in and adjust", body: "Check in with your practitioner whenever you like, and cancel before any upcoming order if you want to stop." },
      ],
    },
    {
      type: "prose",
      id: "guarantee",
      heading: "How does the Hims 180-day money-back guarantee work?",
      paragraphs: [
        "Hims offers a 180-day money-back guarantee on all hair plans if you're not satisfied, claimed by emailing hello@hims.com.au. It sits under Hims' terms and conditions, so read those before you start and keep a note of your start date.",
        "Cancelling is separate. You can cancel before any upcoming order is processed without a fee. The guarantee returns money already paid; cancelling stops future charges.",
      ],
    },
    {
      type: "ledger",
      id: "included",
      heading: "What's included with every Hims hair plan?",
      rows: [
        { label: "Practitioner access", value: "Appointments with your practitioner are included in the cost of the plan, and plan changes are made on request." },
        { label: "Care Team", value: "24-hour support from a team Hims says includes nurses, pharmacists and practitioners." },
        { label: "Flexibility", value: "Pause or delay an order from your profile, or cancel before the next order is processed with no fee." },
        { label: "Guarantee", value: "180-day money-back guarantee. Terms apply." },
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Is Hims right for your hair loss?",
      suits: [
        "You've noticed thinning or a receding hairline and want to speak to a practitioner without a clinic visit.",
        "You want a long money-back window on a plan that runs for months.",
        "You like being able to change plans through a practitioner.",
        "You may want weight loss or sexual health support later, since Hims covers both.",
      ],
    },

    {
      type: "faq",
      id: "faq",
      heading: "Hims hair loss: common questions",
      items: [
        {
          q: "Is there a Hims discount code for hair loss?",
          a: `Yes, two. ${OFFERS.hair.code} is the Refer Labs code: no charge for the initial consultation for a new patient, with program fees applying after that, one use, not combined with other Hims offers. Hims also shows its own new-patient hair code on its hair page, so compare the two at checkout. Our link carries the Refer Labs code; otherwise type it in. Read ${FACTS_CHECKED_ON}.`,
        },
        { q: "How much is Hims hair loss treatment in Australia?", a: "Hims doesn't publish hair plan prices on its hair page. You see the price after your phone consultation, and the consult fee is refunded if you decide not to go ahead." },
        { q: "Does Hims offer a money-back guarantee on hair plans?", a: "Yes. Hims offers a 180-day money-back guarantee on all hair plans if you're not satisfied, under its terms and conditions." },
        { q: "Can I cancel my Hims hair plan?", a: "Yes. You can cancel any time before your next order is processed, with no cancellation fee." },
        { q: "How often am I charged for a Hims hair plan?", a: "Hims hair plans run as a subscription, with an order every two or three months depending on the plan." },
        { q: "Is Hims hair loss the same as Pilot hair loss?", a: "Yes. Pilot belonged to Eucalyptus, which Hims & Hers Health bought on 2 June 2026, and Pilot is now rebranding as Hims: pilot.com.au says it has joined the Hims & Hers group, and signing up there leads to the Hims quiz. Former Pilot patients count as previous patients for new-patient offers." },
      ],
    },
  ],
  sources: [SRC.himsHair, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [],
};
