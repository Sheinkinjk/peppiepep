import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const bestWeight: HimsPageContent = {
  slug: "best-mens-weight-loss-program-australia",
  vertical: "weight",
  kind: "best",
  seoTitle: "Best Men's Weight Loss Program Australia: Hims vs Mosh",
  metaDescription:
    "Online men's weight loss programs in Australia compared: Hims (formerly Pilot), Mosh and an in-person practitioner, on commitment, refunds and support.",
  eyebrow: "Men's weight loss · Australia",
  h1: "Best men's weight loss program in Australia: Hims, Mosh or in person?",
  standfirst:
    "For most Australian men choosing an online weight loss program, it comes down to Hims (formerly Pilot) or Mosh, and the deciding factor is commitment. Hims' advertised starting offer is a twelve-month pay-upfront option with 24-hour care team support. Mosh's intro offer carries a three-month minimum and an optional dietitian add-on. An in-person practitioner suits men who want face-to-face care and no program commitment.",
  hub: { label: "Weight loss", href: "/weight-loss" },
  verdictQuestion: "Is Hims or Mosh better for men's weight loss?",
  verdict: [
    "Choose Hims if you want a year-long program with a known structure and round-the-clock support. Choose Mosh if you'd rather start on a three-month minimum and want dietitian sessions available.",
    "If you want continuity with a practitioner you already see, or you prefer face-to-face care, an in-person appointment is still a reasonable place to start.",
  ],
  otherPartnersOnPage: ["Mosh"],
  blocks: [
    {
      type: "compare",
      id: "summary",
      heading: "Online men's weight loss programs compared",
      intro: `Read on each provider's own website on ${FACTS_CHECKED_ON}. Confirm the terms at checkout.`,
      columns: ["", "Hims", "Mosh", "In-person practitioner"],
      rows: [
        { label: "How you start", cells: ["Free quiz, phone consult", "Free quiz, consult by call, video or text", "Book an appointment at a clinic"] },
        { label: "Commitment", cells: ["Twelve months, pay-upfront, on the advertised offer", "Three-month minimum on the intro offer", "None; you manage the plan with the practitioner"] },
        { label: "Refund", cells: ["Full refund within 30 days of starting. Terms apply.", "Check Mosh's terms", "Not applicable"], verify: true },
        { label: "Support between check-ins", cells: ["24-hour Care Team, unlimited practitioner check-ins", "Unlimited consultations; paid dietitian add-on", "Follow-up appointments as booked"] },
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
            "Hims (formerly Pilot) runs its program entirely online and by phone. Its advertised starting offer is the first payment on a twelve-month pay-upfront option, which gives you a known total from day one. Support is the standout: every weight loss plan includes unlimited practitioner check-ins and 24-hour access to a care team of nurses, pharmacists and clinicians.",
          facts: [
            { label: "Commitment", value: "Twelve months on the advertised pay-upfront option" },
            { label: "Refund", value: "30 days from starting. Terms apply." },
            { label: "Consult", value: "Phone, with an Australian practitioner. Free with the Refer Labs code." },
          ],
          cta: "hims",
        },
        {
          name: "Mosh",
          bestFor: "Best for a shorter first commitment and help with food",
          summary:
            "Mosh's intro weight offer carries a three-month minimum, which is easier to live with if you want to see how a program fits before committing for longer. Mosh also offers one-hour dietitian sessions as a paid add-on, and a price match guarantee on substantially comparable products.",
          facts: [
            { label: "Commitment", value: "Three-month minimum on the intro offer" },
            { label: "Extras", value: "Paid dietitian sessions; price match guarantee" },
            { label: "Consult", value: "Call, video or text" },
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
      heading: "How do I choose a men's weight loss program?",
      paragraphs: [
        "Australian advertising law doesn't allow any provider, or any site writing about them, to name the specific treatments a practitioner may recommend. That's why every program page looks alike, and why the useful comparison is on terms and support.",
        "Start with the total cost over the time you expect to stay. Each provider leads with an introductory offer and attaches it to a minimum period, so ask for the total over three months and over twelve.",
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
        `We read each provider's public pages and terms on ${FACTS_CHECKED_ON} and compared them only on what a customer can check before signing up.`,
        "Refer Labs is paid by Hims and Mosh when a new customer signs up using our code or link. We have not compared every provider in Australia. If there's one you'd like us to look at, email jarred@referlabs.com.au.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Men's weight loss programs: common questions",
      items: [
        { q: "What is the best weight loss program for men in Australia?", a: "It depends on how long you're prepared to commit. Hims suits men who want a year-long program with 24-hour support. Mosh suits men who want a three-month minimum to start and optional dietitian sessions. An in-person practitioner suits men who want face-to-face care." },
        { q: "How much do online weight loss programs cost in Australia?", a: "Hims and Mosh both show their current pricing on their own sites and confirm it before you pay. Compare the total over the minimum commitment: twelve months on Hims' advertised pay-upfront option, three months on Mosh's intro offer." },
        { q: "Is Pilot weight loss still available?", a: "Pilot has joined the Hims & Hers group, and pilot.com.au now sends new patients to the Hims quiz, so Hims is where Pilot's weight loss program continues." },
        { q: "Why don't online weight loss programs say what they supply?", a: "Australian advertising law stops providers naming the specific treatments a practitioner may recommend. The practitioner explains the options on the consult." },
        { q: "Can I get a refund on an online weight loss program?", a: "Terms differ. Hims offers a full refund within 30 days of starting its program, subject to its terms. Check each provider's terms before you pay." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Weight loss", url: "https://hims.com.au/weight-loss" },
    { label: "Mosh: Weight loss", url: "https://www.getmosh.com.au/weight-loss" },
    { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
    { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
  ],
  related: [
    { label: "Hims weight loss", href: "/hims", desc: "How the program works, the commitment and the refund window." },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared." },
    { label: "Best online hair loss treatment in Australia", href: "/best-hair-loss-treatment-online-australia", desc: "Hims, Mosh and an in-person practitioner for hair loss." },
  ],
};
