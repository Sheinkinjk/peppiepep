import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const bestEd: HimsPageContent = {
  slug: "best-online-ed-treatment-australia",
  vertical: "ed",
  kind: "best",
  seoTitle: "Best Online ED Treatment Australia: Hims vs Mosh",
  metaDescription:
    "Online erectile dysfunction services for Australian men compared: Hims (formerly Pilot), Mosh and an in-person practitioner, on consults, discretion and contracts.",
  eyebrow: "Men's sexual health · Australia",
  h1: "Best online ED treatment in Australia: Hims, Mosh or in person?",
  standfirst:
    "For most Australian men, the online choice for ED is Hims (formerly Pilot) or Mosh. Both run the whole process online with discreet delivery and no clinic visit. Mosh publishes its ED price and consults by call, video or text. Hims consults by phone, has no lock-in contract, and the Refer Labs code makes the initial consult free for new patients. An in-person appointment suits men who want a broader health check at the same time.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "Is Hims or Mosh better for ED?",
  verdict: [
    "If you want to know the cost before talking to anyone, start with Mosh. If you want a free consult by phone and no contract, start with Hims.",
    "Both let you answer the sensitive questions in an online quiz before you speak to anyone, which for most men is the hardest part.",
  ],
  otherPartnersOnPage: ["Mosh"],
  blocks: [
    {
      type: "compare",
      id: "summary",
      heading: "Online ED services compared",
      intro: `Read on each provider's own website on ${FACTS_CHECKED_ON}. Confirm the terms at checkout.`,
      columns: ["", "Hims", "Mosh", "In-person practitioner"],
      rows: [
        { label: "How you start", cells: ["Free quiz, phone consult", "Free quiz, consult by call, video or text", "Book an appointment at a clinic"] },
        { label: "Consult", cells: ["Fee refunded if not eligible; free with the Refer Labs code", "Check at the quiz", "Set by the clinic; Medicare may apply"], verify: true },
        { label: "Prices", cells: ["Shown after the consult", "Published on Mosh's pricing page", "Depends on what's recommended"] },
        { label: "Contract", cells: ["No lock-in; pause or cancel any time", "Check Mosh's terms", "None"], verify: true },
        { label: "Packaging", cells: ["Discreet, unmarked", "Discreet", "You collect it yourself"] },
        { label: "Support", cells: ["24/7 phone support, unlimited check-ins", "Ongoing practitioner support", "Follow-ups as booked"] },
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
            "Hims (formerly Pilot) offers three ED plans described by situation: ED Stamina for spontaneity, ED Performance for planned occasions, and a combined plan Hims says is exclusive to it. The consult is a phone call with an Australian practitioner, delivery is unmarked, and you can pause or cancel at any time.",
          facts: [
            { label: "Consult", value: "Fee refunded if not eligible. Free with the Refer Labs code." },
            { label: "Prices", value: "Shown after the consult" },
            { label: "Contract", value: "None" },
          ],
          cta: "hims",
        },
        {
          name: "Mosh",
          bestFor: "Best for knowing the price up front",
          summary:
            "Mosh publishes its ED price on its pricing page, lets you choose how often deliveries arrive, and offers consults by call, video or text, which suits men who'd rather type than talk.",
          facts: [
            { label: "Prices", value: "Published on Mosh's pricing page" },
            { label: "Consult", value: "Call, video or text" },
          ],
          cta: "mosh",
        },
        {
          name: "Seeing a practitioner in person",
          bestFor: "Best if you want a broader health check at the same time",
          summary:
            "An in-person appointment is the better starting point if you'd like a general health check alongside the conversation, or if you already have a practitioner who knows your history. It takes more effort than an online consult, and it is a conversation practitioners have every day.",
          facts: [{ label: "Cost", value: "Set by the clinic. A Medicare rebate may apply to the appointment." }],
          cta: "none",
        },
      ],
    },
    {
      type: "prose",
      id: "how-to-choose",
      heading: "How do I choose an online ED service?",
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
        `We read each provider's public pages and terms on ${FACTS_CHECKED_ON} and compared them only on what a customer can check before signing up.`,
        "Refer Labs is paid by Hims and Mosh when a new customer signs up using our code or link. We have not compared every provider in Australia.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Online ED treatment: common questions",
      items: [
        { q: "What is the best online ED service in Australia?", a: "For most men it's Hims or Mosh. Mosh publishes its price before the consult. Hims refunds the consult fee if you're not eligible, the Refer Labs code makes it free for new patients, and it has no lock-in contract." },
        { q: "Is online ED treatment discreet?", a: "Hims ships in unmarked packaging and Mosh ships discreetly. Neither requires a clinic visit." },
        { q: "Is there a discount code for Hims ED?", a: "The Refer Labs code gives new Hims patients a free initial consult. When we checked, Hims wasn't showing a public ED code." },
        { q: "Mosh vs Pilot for ED: which is better?", a: "Pilot is now Hims: pilot.com.au says Pilot has joined the Hims & Hers group. For ED, Mosh publishes its price and consults by call, video or text; Hims consults by phone and has no lock-in contract." },
        { q: "Do I need to see someone in person for ED?", a: "Not usually. Online services assess you by quiz and consult, and the practitioner will tell you if an in-person appointment would be better for you." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Erectile dysfunction", url: "https://hims.com.au/erectile-dysfunction" },
    { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
    { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
  ],
  related: [
    { label: "Hims ED treatment", href: "/hims-ed", desc: "The three ED plans, the phone consult and cancelling." },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared." },
    { label: "Best men's weight loss program in Australia", href: "/best-mens-weight-loss-program-australia", desc: "Hims, Mosh and an in-person practitioner for weight loss." },
  ],
};
