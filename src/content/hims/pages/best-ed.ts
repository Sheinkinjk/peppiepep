import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const bestEd: HimsPageContent = {
  slug: "best-online-ed-treatment-australia",
  vertical: "ed",
  kind: "best",
  seoTitle: "Best Online ED Treatment in Australia (2026): Hims vs Mosh vs In-Person",
  metaDescription:
    "Comparing online erectile dysfunction services for Australian men: Hims, Mosh and seeing a practitioner in person. Consult fees, prices, discretion and cancelling.",
  h1: "Best online ED treatment in Australia: comparing the discreet options",
  standfirst:
    "For most men, the hardest part of dealing with ED is raising it. Online services exist to make that easier: a private quiz, a consult by phone, and delivery in unmarked packaging. This guide compares Hims and Mosh on the things you can check before you start, and covers when seeing someone in person is the better call.",
  verdict: [
    "Hims and Mosh both run the whole process online with discreet delivery and no need to visit a clinic.",
    "Mosh publishes its ED price, from $1.50 a day, and offers consults by text, video or phone. Hims keeps pricing for the consult, charges $20 for it (free with the ReferLabs code), and doesn't use lock-in contracts. If you want to know the cost before talking to anyone, start with Mosh. If you want a free consult and a phone call, start with Hims.",
  ],
  otherPartnersOnPage: ["Mosh"],
  blocks: [
    {
      type: "compare",
      id: "summary",
      heading: "Online ED services compared",
      intro: `Read on each provider's own website on ${FACTS_CHECKED_ON}. Confirm the price and terms at checkout.`,
      columns: ["", "Hims", "Mosh", "In-person practitioner"],
      rows: [
        { label: "How you start", cells: ["Free quiz, phone consult", "Free quiz, consult by text, video or phone", "Book an appointment at a clinic"] },
        { label: "Consult cost", cells: ["$20, refundable; free with the ReferLabs code", "Check at the quiz", "Set by the clinic; Medicare may apply"], verify: true },
        { label: "Published price", cells: ["Shown after the consult", "From $1.50 a day", "Depends on what's recommended"] },
        { label: "Contract", cells: ["No lock-in; pause or cancel any time", "Check Mosh's terms", "None"], verify: true },
        { label: "Packaging", cells: ["Discreet, unmarked", "Discreet", "You collect it yourself"] },
        { label: "Support", cells: ["24/7 phone support, unlimited check-ins", "Unlimited follow-ups", "Follow-ups as booked"] },
      ],
      footnote: "We haven't compared every online ED service in Australia. The providers here are the ones we've reviewed in depth.",
    },
    { type: "offer", id: "offer", vertical: "ed" },
    {
      type: "providers",
      id: "providers",
      heading: "Each option in more detail",
      providers: [
        {
          name: "Hims",
          bestFor: "Best for a free consult and no contract",
          summary:
            "Hims (formerly Pilot) offers three ED plans described by situation: ED Stamina for spontaneity, ED Performance for planned occasions, and a third combined plan Hims says is exclusive to it. The consult is a phone call with an Australian practitioner, delivery is unmarked, and you can pause or cancel at any time.",
          facts: [
            { label: "Consult", value: "$20, refundable. Free with the ReferLabs code." },
            { label: "Price", value: "Shown after the consult", verify: true },
            { label: "Contract", value: "None" },
          ],
          cta: "hims",
        },
        {
          name: "Mosh",
          bestFor: "Best for knowing the price up front",
          summary:
            "Mosh has run men's health services in Australia since 2016. It publishes its ED price, from $1.50 a day, lets you choose how often deliveries arrive, and offers consults by text, video or phone, which suits men who'd rather type than talk.",
          facts: [
            { label: "Price", value: "From $1.50 a day" },
            { label: "Consult", value: "Text, video or phone" },
          ],
          cta: "mosh",
        },
        {
          name: "Seeing a practitioner in person",
          bestFor: "Best if you want a broader health check at the same time",
          summary:
            "An in-person appointment is the better starting point if you'd like a general health check alongside the conversation, or if you already have a practitioner who knows your history. It takes more effort than an online consult, but it isn't a conversation practitioners find unusual.",
          facts: [{ label: "Cost", value: "Set by the clinic. A Medicare rebate may apply to the appointment." }],
          cta: "none",
        },
      ],
    },
    {
      type: "prose",
      id: "how-to-choose",
      heading: "How to choose an online ED service",
      paragraphs: [
        "Australian advertising law doesn't allow providers or review sites to name the specific treatments a practitioner may recommend, so no ED site will tell you what it supplies. Compare on what you can see instead.",
        "Discretion: whether the packaging is unmarked and whether the consult can happen in a format you're comfortable with. Cost: whether the consult fee is refundable and whether the plan price is published. Flexibility: whether you're locked in, and how easy it is to pause. Support: whether you can get hold of someone if the first plan doesn't suit.",
        "Whichever you choose, be straight in the quiz and with the practitioner about your health and anything else you take. The recommendation depends on it.",
      ],
    },
    {
      type: "prose",
      id: "method",
      heading: "How we chose",
      paragraphs: [
        `We read each provider's public pages, pricing and terms on ${FACTS_CHECKED_ON} and judged them only on what a customer can check before signing up. We don't use testimonials or success-rate claims, and we don't rank providers by what they pay us.`,
        "ReferLabs is paid by Hims and Mosh when a new customer signs up using our code or link. We have not compared every provider in Australia.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Online ED treatment: common questions",
      items: [
        { q: "What is the best online ED service in Australia?", a: "For most men it's Hims or Mosh. Mosh publishes its price, from $1.50 a day. Hims charges a $20 consult fee, free with the ReferLabs code, has no lock-in contract and shows its price on the consult." },
        { q: "Is online ED treatment discreet?", a: "Hims ships in unmarked packaging and Mosh ships discreetly. Neither requires a clinic visit." },
        { q: "Is there a discount code for Hims ED?", a: "The ReferLabs code gives new Hims patients a free initial consult. When we checked, Hims wasn't showing a public ED code." },
        { q: "Do I need to see someone in person for ED?", a: "Not usually. Online services assess you by quiz and consult, and the practitioner will tell you if an in-person appointment would be better for you." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Erectile dysfunction", url: "https://hims.com.au/erectile-dysfunction" },
    { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
  ],
  related: [
    { label: "Hims ED review", href: "/hims-ed" },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh" },
    { label: "Best men's weight loss program in Australia", href: "/best-mens-weight-loss-program-australia" },
  ],
};
