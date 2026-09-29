import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const bestWeight: HimsPageContent = {
  slug: "best-mens-weight-loss-program-australia",
  vertical: "weight",
  kind: "best",
  seoTitle: "Best Men's Weight Loss Program in Australia (2026): Online Options Compared",
  metaDescription:
    "Comparing online medical weight loss programs for Australian men: Hims, Mosh and seeing a practitioner in person. Cost to start, commitment, refunds and support.",
  h1: "The best men's weight loss program in Australia depends on one question: how long are you committing for?",
  standfirst:
    "Online medical weight loss programs for men in Australia look similar on the surface: a quiz, a consult, a plan delivered to the door. The differences that matter sit in the commitment period, the refund terms and the support after you start. This guide compares Hims and Mosh on those points, alongside the traditional route of seeing a practitioner in person.",
  verdict: [
    "For most men who want an online program, the choice comes down to Hims or Mosh, and the deciding factor is commitment. Hims' advertised price sits on a twelve-month pay-upfront option with round-the-clock support. Mosh's intro offer carries a three-month minimum and an optional dietitian add-on.",
    "If you want continuity with a practitioner you already see, or you prefer face-to-face care, an in-person appointment is still a reasonable place to start.",
  ],
  otherPartnersOnPage: ["Mosh"],
  blocks: [
    {
      type: "compare",
      id: "summary",
      heading: "Online men's weight loss programs compared",
      intro: `Read on each provider's own website on ${FACTS_CHECKED_ON}. Confirm the price and terms at checkout.`,
      columns: ["", "Hims", "Mosh", "In-person practitioner"],
      rows: [
        { label: "How you start", cells: ["Free quiz, phone consult", "Free quiz, consult by text, video or phone", "Book an appointment at a clinic"] },
        { label: "Advertised start", cells: ["$199 first payment with Hims' public code", "Month one from $249 with Mosh's public intro code", "Appointment fee set by the clinic; Medicare may apply"] },
        { label: "Commitment", cells: ["Twelve months pay-upfront, minimum $2,988", "Three-month minimum on the intro offer", "None; you manage the plan with the practitioner"] },
        { label: "Refund", cells: ["Full refund within 30 days of starting. Terms apply.", "Check Mosh's terms", "Not applicable"], verify: true },
        { label: "Support between check-ins", cells: ["24/7 Care Team, unlimited practitioner check-ins", "Unlimited follow-ups; dietitian add-on $50/session", "Follow-up appointments as booked"] },
        { label: "Delivery", cells: ["Free, monthly, discreet", "Free, discreet", "You organise it yourself"] },
      ],
      footnote: "We haven't compared every online weight loss service in Australia. The providers here are the ones we've reviewed in depth.",
    },
    { type: "offer", id: "offer", vertical: "weight" },
    {
      type: "providers",
      id: "providers",
      heading: "Each option in more detail",
      providers: [
        {
          name: "Hims",
          bestFor: "Best for round-the-clock support on a year-long program",
          summary:
            "Hims (formerly Pilot) runs its program entirely online and by phone. Its advertised price is a first payment on a twelve-month pay-upfront option, which gives you a known total from day one. Support is the standout: every plan includes unlimited practitioner check-ins and 24/7 access to a care team of nurses, pharmacists and clinicians.",
          facts: [
            { label: "Commitment", value: "Twelve months on the advertised option, minimum $2,988 ($249 a month on average)" },
            { label: "Refund", value: "30 days from starting. Terms apply." },
            { label: "Consult", value: "Phone, with an Australian practitioner. Free with the ReferLabs code." },
          ],
          cta: "hims",
        },
        {
          name: "Mosh",
          bestFor: "Best for a shorter first commitment and help with food",
          summary:
            "Mosh has run men's health programs in Australia since 2016. Its intro weight offer takes $100 off month one and carries a three-month minimum, which is easier to live with if you want to see how a program fits before committing for longer. Mosh also offers one-hour dietitian sessions as a paid add-on and a price match guarantee.",
          facts: [
            { label: "Commitment", value: "Three-month minimum on the intro offer" },
            { label: "Extras", value: "Dietitian add-on at $50 per session; price match across hair and weight" },
            { label: "Consult", value: "Text, video or phone" },
          ],
          cta: "mosh",
        },
        {
          name: "Seeing a practitioner in person",
          bestFor: "Best if you want face-to-face care or continuity with someone you know",
          summary:
            "Booking an appointment at a clinic is the traditional route and still a good one if you'd rather be assessed in person or already have a practitioner who knows your history. You manage the plan together, with no program commitment, but you arrange follow-ups and collection yourself.",
          facts: [
            { label: "Cost", value: "Set by the clinic. A Medicare rebate may apply to the appointment." },
            { label: "Commitment", value: "None beyond the appointment" },
          ],
          cta: "none",
        },
      ],
    },
    {
      type: "prose",
      id: "how-to-choose",
      heading: "How to choose a weight loss program without knowing what's in it",
      paragraphs: [
        "Australian advertising law doesn't allow any provider, or any site writing about them, to name the specific treatments a practitioner may recommend. That's why every program page looks alike. It also means the things you can compare are the things that decide how the next year goes.",
        "Start with the total cost over the time you expect to stay, not the first payment. Every provider leads with an introductory number, and every one attaches it to a minimum period. Multiply it out.",
        "Then look at what happens if you want to stop: the refund window, the minimum commitment, and whether cancelling early leaves a balance. Then support: who you can reach, when, and whether help with food and exercise is included or extra.",
        "Finally, the consult. It's where the specifics are discussed, and a good provider makes it easy to ask questions and refunds the fee if you're not eligible or decide not to go ahead.",
      ],
    },
    {
      type: "questions",
      id: "checklist",
      heading: "Ask every provider these before you pay",
      items: [
        "What is the total cost over twelve months, and over three?",
        "What is the minimum commitment, and what do I owe if I stop early?",
        "How long is the refund window, and what does it cover?",
        "Who can I contact between check-ins, and when?",
        "Is help with food and exercise included, or extra?",
        "What happens when the program ends?",
      ],
    },
    {
      type: "prose",
      id: "method",
      heading: "How we chose",
      paragraphs: [
        `We read each provider's public pages, pricing and terms on ${FACTS_CHECKED_ON} and judged them only on what a customer can check before signing up. We don't use testimonials, success rates or before-and-after claims, and we don't rank providers by what they pay us.`,
        "ReferLabs is paid by Hims and Mosh when a new customer signs up using our code or link. We have not compared every provider in Australia. If there's one you'd like us to look at, email jarred@referlabs.com.au.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Men's weight loss programs: common questions",
      items: [
        { q: "What is the best weight loss program for men in Australia?", a: "It depends on how long you're prepared to commit. Hims suits men who want a year-long program with 24/7 support. Mosh suits men who want a three-month minimum to start and optional dietitian sessions. An in-person practitioner suits men who want face-to-face care." },
        { q: "How much do online weight loss programs cost in Australia?", a: `When we checked on ${FACTS_CHECKED_ON}, Hims advertised a $199 first payment on a twelve-month option with a $2,988 minimum, and Mosh advertised month one from $249 with a three-month minimum.` },
        { q: "Why don't online weight loss programs say what they supply?", a: "Australian advertising law stops providers naming the specific treatments a practitioner may recommend. The practitioner explains the options on the consult." },
        { q: "Can I get a refund on an online weight loss program?", a: "Terms differ. Hims offers a full refund within 30 days of starting its program, subject to its terms. Check each provider's terms before you pay." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Weight loss", url: "https://hims.com.au/weight-loss" },
    { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
    { label: "Mosh: Promotions terms", url: "https://www.getmoshy.com.au/promotions-terms-and-conditions" },
  ],
  related: [
    { label: "Hims weight loss review", href: "/hims" },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh" },
    { label: "Best online hair loss treatment in Australia", href: "/best-hair-loss-treatment-online-australia" },
  ],
};
