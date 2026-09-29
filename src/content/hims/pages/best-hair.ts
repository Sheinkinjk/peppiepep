import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const bestHair: HimsPageContent = {
  slug: "best-hair-loss-treatment-online-australia",
  vertical: "hair",
  kind: "best",
  seoTitle: "Best Online Hair Loss Treatment in Australia (2026): Hims vs Mosh vs In-Person",
  metaDescription:
    "Comparing online hair loss treatment plans for Australian men: Hims, Mosh and seeing a practitioner in person. Prices, guarantees, cancelling and support.",
  h1: "Best online hair loss treatment in Australia: what separates the options",
  standfirst:
    "Online hair loss services for men in Australia follow the same pattern: a quiz, a consult and a plan delivered every few months. What separates them is whether prices are published, how long the money-back guarantee runs, how easy it is to cancel, and what support you get over the months a hair plan takes. This guide compares Hims and Mosh on those points, alongside seeing a practitioner in person.",
  verdict: [
    "Hims and Mosh both offer a 180-day money-back guarantee on hair plans, free discreet delivery and ongoing practitioner support, so either is a sound choice for most men.",
    "Mosh publishes its hair prices up front, from $24 a month. Hims shows its prices after the consult but includes 24/7 care team access and lets you cancel before any order without a fee. Pick on whichever of those matters more to you.",
  ],
  otherPartnersOnPage: ["Mosh"],
  blocks: [
    {
      type: "compare",
      id: "summary",
      heading: "Online hair loss services compared",
      intro: `Read on each provider's own website on ${FACTS_CHECKED_ON}. Confirm the price and terms at checkout.`,
      columns: ["", "Hims", "Mosh", "In-person practitioner"],
      rows: [
        { label: "How you start", cells: ["Free quiz, phone consult", "Free quiz, consult by text, video or phone", "Book an appointment at a clinic"] },
        { label: "Consult cost", cells: ["$20, refundable; free with the ReferLabs code", "Free practitioner review before you pay", "Set by the clinic; Medicare may apply"] },
        { label: "Published price", cells: ["Shown after the consult", "From $24, $44 or $56 a month depending on plan", "Depends on what's recommended"] },
        { label: "Money-back guarantee", cells: ["180 days. Terms apply.", "180 days. Terms apply.", "Not applicable"] },
        { label: "Cancelling", cells: ["Before the next order, no fee", "Check Mosh's terms", "Not applicable"], verify: true },
        { label: "Support", cells: ["Unlimited check-ins, 24/7 Care Team", "Unlimited follow-ups", "Follow-ups as booked"] },
      ],
      footnote: "We haven't compared every online hair loss service in Australia. The providers here are the ones we've reviewed in depth.",
    },
    { type: "offer", id: "offer", vertical: "hair" },
    {
      type: "providers",
      id: "providers",
      heading: "Each option in more detail",
      providers: [
        {
          name: "Hims",
          bestFor: "Best for support and flexibility",
          summary:
            "Hims (formerly Pilot) groups its hair plans by stage, Keep for early thinning and Regrow for more advanced loss, with 2-in-1, 3-in-1 and single-action options. Every plan includes unlimited practitioner check-ins and 24/7 care team access. You can cancel before any upcoming order without a fee, and the 180-day guarantee covers you if you're not satisfied with your progress.",
          facts: [
            { label: "Price", value: "Shown after the consult", verify: true },
            { label: "Deliveries", value: "Every two or three months" },
            { label: "Consult", value: "Phone. Free with the ReferLabs code." },
          ],
          cta: "hims",
        },
        {
          name: "Mosh",
          bestFor: "Best for price transparency",
          summary:
            "Mosh has offered hair loss plans to Australian men since 2016 and publishes its prices: a Prevention Plan from $24 a month, Prevention & Regrowth from $44 and an advanced plan from $56. It says its practitioners tailor plans from more than 85 combinations, and it offers a price match across hair and weight.",
          facts: [
            { label: "Price", value: "From $24 a month" },
            { label: "Guarantee", value: "180 days on hair subscriptions. Terms apply." },
            { label: "Consult", value: "Free review before you pay" },
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
      heading: "How to choose a hair loss service",
      paragraphs: [
        "Hair plans take months to judge, so the terms that matter most are the ones that play out over months: the length of the money-back guarantee, what it takes to cancel, and how often you're charged. A 180-day guarantee is now the standard among the larger services, and you shouldn't settle for less.",
        "Australian advertising law doesn't allow providers or review sites to name the specific treatments a practitioner may recommend, so you won't find ingredient lists on any of these sites. The consult is where that conversation happens.",
        "Price is easier to compare where it's published. If a provider shows its price only after the consult, make sure the consult fee is refundable, then ask for the cost per delivery and the delivery frequency before you order.",
      ],
    },
    {
      type: "prose",
      id: "method",
      heading: "How we chose",
      paragraphs: [
        `We read each provider's public pages, pricing and terms on ${FACTS_CHECKED_ON} and judged them only on what a customer can check before signing up. We don't use testimonials, success rates or before-and-after photos, and we don't rank providers by what they pay us.`,
        "ReferLabs is paid by Hims and Mosh when a new customer signs up using our code or link. We have not compared every provider in Australia.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Online hair loss treatment: common questions",
      items: [
        { q: "What is the best online hair loss treatment in Australia?", a: "For most men it's a choice between Hims and Mosh. Both offer a 180-day money-back guarantee and free delivery. Mosh publishes prices from $24 a month; Hims shows prices after the consult and includes 24/7 care team access." },
        { q: "How much does online hair loss treatment cost in Australia?", a: `When we checked on ${FACTS_CHECKED_ON}, Mosh listed hair plans from $24, $44 and $56 a month. Hims shows its prices after the consult.` },
        { q: "Do online hair loss services offer refunds?", a: "Hims and Mosh both offer a 180-day money-back guarantee on hair plans, subject to their terms." },
        { q: "Should I see someone in person instead?", a: "If your hair loss is sudden, patchy or comes with other symptoms, an in-person appointment is the better first step." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Hair loss", url: "https://hims.com.au/hair-loss" },
    { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
    { label: "Mosh: Hair loss", url: "https://www.getmosh.com.au/hair-loss" },
    { label: "Mosh: Hair loss reviews and guarantee", url: "https://www.getmosh.com.au/reviews-hair-loss" },
  ],
  related: [
    { label: "Hims hair loss review", href: "/hims-hair-loss" },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh" },
    { label: "Best online ED treatment in Australia", href: "/best-online-ed-treatment-australia" },
  ],
};
