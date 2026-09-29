import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const bestHair: HimsPageContent = {
  slug: "best-hair-loss-treatment-online-australia",
  vertical: "hair",
  kind: "best",
  seoTitle: "Best Online Hair Loss Treatment Australia: Hims vs Mosh",
  metaDescription:
    "Online hair loss treatment for Australian men compared: Hims (formerly Pilot), Mosh and an in-person practitioner, on guarantees, cancelling and support.",
  eyebrow: "Men's hair loss · Australia",
  h1: "Best online hair loss treatment in Australia: Hims, Mosh or in person?",
  standfirst:
    "For most Australian men treating hair loss online, the choice is Hims (formerly Pilot) or Mosh. Both offer a 180-day money-back guarantee on hair plans, free discreet delivery and ongoing practitioner support. Mosh publishes its hair plan prices before the consult. Hims shows them after the consult, and includes 24/7 care team access and cancellation before any order without a fee. An in-person practitioner is the better first step if hair loss is sudden or patchy.",
  hub: { label: "Hair loss", href: "/hair-loss" },
  verdictQuestion: "Is Hims or Mosh better for hair loss?",
  verdict: [
    "Pick Mosh if seeing the price before the consult matters most. Pick Hims if round-the-clock support and fee-free cancelling before each order matter more.",
    "Either way, the 180-day guarantee gives you time to judge a plan properly, so keep a note of your start date.",
  ],
  otherPartnersOnPage: ["Mosh"],
  blocks: [
    {
      type: "compare",
      id: "summary",
      heading: "Online hair loss services compared",
      intro: `Read on each provider's own website on ${FACTS_CHECKED_ON}. Confirm the terms at checkout.`,
      columns: ["", "Hims", "Mosh", "In-person practitioner"],
      rows: [
        { label: "How you start", cells: ["Free quiz, phone consult", "Free quiz, consult by call, video or text", "Book an appointment at a clinic"] },
        { label: "Consult", cells: ["Fee refunded if not eligible; free with the Refer Labs code", "Free consultation to start", "Set by the clinic; Medicare may apply"] },
        { label: "Prices", cells: ["Shown after the consult", "Published on Mosh's pricing page", "Depends on what's recommended"] },
        { label: "Money-back guarantee", cells: ["180 days. Terms apply.", "180 days. Terms apply.", "Not applicable"] },
        { label: "Cancelling", cells: ["Before the next order, no fee", "Check Mosh's terms", "Not applicable"], verify: true },
        { label: "Support", cells: ["Unlimited check-ins, 24/7 Care Team", "Ongoing practitioner support", "Follow-ups as booked"] },
      ],
    },
    { type: "offer", id: "offer", vertical: "hair" },
    {
      type: "providers",
      id: "providers",
      heading: "What each hair loss option offers",
      providers: [
        {
          name: "Hims",
          bestFor: "Best for support and flexibility",
          summary:
            "Hims (formerly Pilot) groups its hair plans by stage, Keep for early thinning and Regrow for more advanced loss, with 2-in-1, 3-in-1 and single-action options. Every plan includes unlimited practitioner check-ins and 24/7 care team access. You can cancel before any upcoming order without a fee, and the 180-day guarantee covers you if you're not satisfied with your progress.",
          facts: [
            { label: "Prices", value: "Shown after the consult" },
            { label: "Deliveries", value: "Every two or three months" },
            { label: "Consult", value: "Phone. Free with the Refer Labs code." },
          ],
          cta: "hims",
        },
        {
          name: "Mosh",
          bestFor: "Best for price transparency",
          summary:
            "Mosh publishes its hair plan prices on its pricing page, across a Prevention plan, a Prevention & Regrowth plan and an advanced plan. It says its practitioners tailor plans from more than 85 variations, and it offers a price match guarantee on substantially comparable products.",
          facts: [
            { label: "Prices", value: "Published on Mosh's pricing page" },
            { label: "Guarantee", value: "180 days on hair subscriptions. Terms apply." },
            { label: "Consult", value: "Free consultation to start" },
          ],
          cta: "mosh",
        },
        {
          name: "Seeing a practitioner in person",
          bestFor: "Best if you want your scalp examined face to face",
          summary:
            "An in-person appointment makes sense if your hair loss is patchy, sudden or comes with other symptoms, or if you'd simply rather be examined in person. You'll manage follow-ups yourself and there's no program guarantee.",
          facts: [{ label: "Cost", value: "Set by the clinic. A Medicare rebate may apply to the appointment." }],
          cta: "none",
        },
      ],
    },
    {
      type: "prose",
      id: "how-to-choose",
      heading: "How do I choose an online hair loss service?",
      paragraphs: [
        "Hair plans take months to judge, so the terms that matter most are the ones that play out over months: the length of the money-back guarantee, what it takes to cancel, and how often you're charged. Hims and Mosh both offer 180 days.",
        "Providers and review sites can't name what a hair plan contains under Australian advertising law, so the consult is where that conversation happens.",
        "Price is easier to compare where it's published. If a provider shows its price only after the consult, make sure the consult fee is refundable, then ask for the cost per delivery and the delivery frequency before you order.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Online hair loss treatment: common questions",
      items: [
        { q: "What is the best online hair loss treatment in Australia?", a: "For most men it's a choice between Hims and Mosh. Both offer a 180-day money-back guarantee and free delivery. Mosh publishes its prices before the consult; Hims shows prices after the consult and includes 24/7 care team access." },
        { q: "How much does online hair loss treatment cost in Australia?", a: "Mosh publishes its hair plan prices on its pricing page. Hims shows its prices after the consult, and refunds the consult fee if you're not eligible or decide not to go ahead." },
        { q: "Is Pilot hair loss still available?", a: "Only through Hims. Pilot is part of the Hims & Hers group now, and its website hands new patients to the Hims quiz." },
        { q: "Do online hair loss services offer refunds?", a: "Hims and Mosh both offer a 180-day money-back guarantee on hair plans, subject to their terms." },
        { q: "Should I see someone in person instead?", a: "If your hair loss is sudden, patchy or comes with other symptoms, an in-person appointment is the better first step." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Hair loss", url: "https://hims.com.au/hair-loss" },
    { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
    { label: "Mosh: Hair loss", url: "https://www.getmosh.com.au/hair-loss" },
    { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
  ],
  related: [
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "Keep and Regrow plans and the 180-day money-back guarantee." },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared." },
    { label: "Best online ED treatment in Australia", href: "/best-online-ed-treatment-australia", desc: "Hims, Mosh and an in-person practitioner for ED." },
  ],
};
