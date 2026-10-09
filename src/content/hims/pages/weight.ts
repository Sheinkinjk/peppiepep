import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, HIMS_SUPPLIED_ON, OFFERS, SRC } from "../config";

// V2 (9 Oct 2026), from Hims' feedback doc: headline reframed, commitment shown as
// two ways to pay, the "get it in writing" line and the "for Hims to confirm" box
// removed, women FAQ answered with Hims' wording. Plan prices are NOT printed (TGA
// price guidance, 18 June 2026): the page points to Hims' own pricing, dated.
export const weight: HimsPageContent = {
  slug: "hims",
  vertical: "weight",
  kind: "review",
  modified: "2026-10-09",
  seoTitle: "Hims Weight Loss (ex-Pilot): Free Consult Code REFERLABS89",
  metaDescription:
    "Hims, formerly Pilot, runs a men's weight program in Australia. How it works, the two ways to pay, and a free consultation ($89 value) with REFERLABS89.",
  eyebrow: "Men's weight loss telehealth · Australia",
  h1: "Hims weight loss in Australia: how it works, what it costs and what's included",
  standfirst:
    "The Refer Labs code REFERLABS89 gives new Hims patients a free consultation ($89 value), and our link applies it for you. Hims, formerly Pilot, runs an online weight program for men in Australia: a free two-minute quiz, then a phone consultation with an Australian practitioner, who decides whether the program is right for you.",
  hub: { label: "Weight loss", href: "/weight-loss" },
  verdictQuestion: "What do you get with Hims weight loss?",
  verdict: [
    "A practitioner-led program run from your phone: unlimited practitioner check-ins, a 24/7 Care Team for questions and plan changes, guidance on eating habits and an optional online community.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims weight loss at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Hims weight plans are designed for men." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consultation with an Australian practitioner." },
        { label: "Pricing", value: "On hims.com.au/weight-loss, and in your profile before you pay." },
        { label: "Ways to pay", value: "A monthly plan you can change or cancel at any time, or a 12-month plan paid upfront for the lowest price." },
        { label: "Money-back", value: "30-day money-back guarantee, under Hims' terms." },
        { label: "Support", value: "Unlimited practitioner check-ins and a 24/7 Care Team." },
        { label: "Practitioners", value: "AHPRA-registered, based in Australia." },
      ],
    },
    { type: "offer", id: "offer", vertical: "weight" },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims weight loss work?",
      intro: "Nothing beyond the consultation is charged until you choose a plan.",
      steps: [
        {
          title: "Take the online quiz",
          body: "About two minutes of questions on your health history and your goals. It is free and doesn't commit you to anything.",
        },
        {
          title: "Book the phone consultation",
          body: "Consultations run from 7am to 11pm AEST, seven days.",
        },
        {
          title: "Talk it through with the practitioner",
          body: "The practitioner reads your quiz answers before the call and decides whether the program is right for you. What the program involves is covered on the call.",
        },
        {
          title: "Choose how to pay in your Hims profile",
          body: "If a plan is recommended, you review it in your profile and choose a monthly plan or a 12-month plan paid upfront, or decide not to go ahead.",
        },
        {
          title: "Ongoing support",
          body: "From there you have unlimited check-ins with your practitioner, and the Care Team handles questions and requests to change plans.",
        },
      ],
    },
    {
      type: "prose",
      id: "ways-to-pay",
      heading: "What are the ways to pay for Hims weight loss?",
      paragraphs: [
        "Choose a monthly plan you can change or cancel at any time, or a 12-month plan paid upfront for the lowest price. Both include a 30-day money-back guarantee under Hims' terms. T&Cs apply: hims.com.au/terms-and-conditions.",
        `Hims publishes the prices for both on hims.com.au/weight-loss and shows them again in your profile before you pay (read ${FACTS_CHECKED_ON}).`,
      ],
    },
    {
      type: "ledger",
      id: "included",
      heading: "What's included once you're on a Hims weight loss plan?",
      rows: [
        { label: "Practitioner access", value: "Unlimited practitioner check-ins, included in the cost of the plan (Hims FAQ)." },
        { label: "Care Team", value: "24/7 support from your phone, from a team Hims says includes practitioners, health coaches and pharmacists." },
        { label: "Plan changes", value: "Ask to discuss an alternative plan and the Care Team books another practitioner appointment." },
        { label: "Nutrition", value: "Guidance on eating habits from the Care Team, without a set diet." },
        { label: "Community", value: "An optional online community." },
        { label: "Money-back", value: "30-day money-back guarantee from the start of the program, claimed by emailing hello@hims.com.au. T&Cs apply: hims.com.au/terms-and-conditions." },
      ],
    },
    {
      type: "prose",
      id: "about",
      heading: "Is Hims the same as Pilot?",
      paragraphs: [
        `Yes. Pilot is now Hims: Pilot rebranded as Hims on 1 September 2026 (confirmed by Hims in writing, ${HIMS_SUPPLIED_ON}). Hims & Hers Health, the US-listed telehealth company, completed its acquisition of Eucalyptus, the Australian company behind Pilot, on 2 June 2026. pilot.com.au says Pilot has joined the Hims & Hers group, and clicking through from Pilot's site opens the Hims quiz (read ${FACTS_CHECKED_ON}).`,
        "Pilot weight loss is now Hims weight loss.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims weight loss: common questions",
      items: [
        {
          q: "Is there a Hims discount code for weight loss?",
          a: `Yes. The Refer Labs code for new Hims patients is ${OFFERS.weight.code}: a free consultation ($89 value). Our link applies it automatically. It is for new patients in Australia only, one use per patient, and can't be combined with other Hims offers. Read ${FACTS_CHECKED_ON}.`,
        },
        {
          q: "How much does Hims weight loss cost in Australia?",
          a: `Hims publishes its weight plan prices on hims.com.au/weight-loss and shows them in your profile before you pay (read ${FACTS_CHECKED_ON}). There are two ways to pay: a monthly plan, or a 12-month plan paid upfront for the lowest price.`,
        },
        {
          q: "Can I get a refund from Hims?",
          a: "Hims offers a 30-day money-back guarantee on the weight program: contact Hims within 30 days of starting, under its terms and conditions.",
        },
        {
          q: "Can I cancel Hims weight loss?",
          a: "On a monthly plan you can change or cancel at any time. A 12-month plan is paid upfront for the lowest price.",
        },
        {
          q: "Is the Hims consultation by video?",
          a: "No. Hims consults by phone, with an Australian practitioner who has read your quiz answers beforehand.",
        },
        {
          q: "Can I claim Hims on Medicare?",
          a: "No. Hims' FAQ says Medicare benefits are not currently claimable for any of its plans.",
        },
        {
          q: "Is Hims weight loss for women?",
          a: "No. Hims weight plans are designed for men.",
        },
      ],
    },
  ],
  sources: [SRC.himsWeight, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [],
};
