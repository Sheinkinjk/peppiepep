import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON } from "../config";

export const ed: HimsPageContent = {
  slug: "hims-ed",
  vertical: "ed",
  kind: "review",
  seoTitle: "Hims ED Review Australia (2026): Plans, Consult Fee and Cancelling",
  metaDescription:
    "How Hims erectile dysfunction treatment plans work in Australia: the three plan types, the consult, pricing, discreet delivery, cancelling and who it suits.",
  h1: "Hims ED review: how it works, the three plans and what you pay",
  standfirst:
    "Hims, formerly Pilot, offers erectile dysfunction treatment plans for Australian men through a short online quiz and a phone consult, with delivery in unmarked packaging. This review covers the three plan types, the costs you can see and the ones you can't, how cancelling works, and how to get the most out of the consult.",
  verdict: [
    "Hims is a good fit if the main thing stopping you is the awkwardness of raising ED in a waiting room. The whole process runs from your phone, the consult is a call with an Australian practitioner, and nothing arrives in packaging that says what's inside.",
    "Hims doesn't publish ED plan prices on its public page, and it has no lock-in contracts, so the low-risk way to find out is to take the quiz and ask on the consult. The consult fee is refunded if you're not eligible or don't want to proceed.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims ED at a glance",
      intro: `Every figure below was read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia aged 18 and over who have trouble getting or keeping an erection, or want to talk to a practitioner about it." },
        { label: "How you start", value: "A free online quiz, then a phone consult with an Australian practitioner." },
        { label: "Consult fee", value: "$20, refundable if you're not eligible or not satisfied with the recommended options." },
        { label: "Plan price", value: "Not published on Hims' public ED page. You see it after the consult.", verify: true },
        { label: "Plan types", value: "ED Stamina, ED Performance and a third, combined plan." },
        { label: "Public offer", value: "No public ED discount code was shown on Hims' ED page when we checked." },
        { label: "Cancelling", value: "Pause or cancel at any time. Hims says it doesn't do lock-in contracts." },
        { label: "Delivery", value: "Free Australia-wide in a discreet, unmarked package, with tracking." },
        { label: "Support", value: "24/7 support by phone, unlimited practitioner check-ins and adjustments on request." },
      ],
    },
    { type: "offer", id: "offer", vertical: "ed" },
    { type: "eligibility", id: "eligibility", vertical: "ed" },
    {
      type: "prose",
      id: "plans",
      heading: "The three Hims ED plans, by the situation they're built for",
      paragraphs: [
        "Hims describes its ED plans by how they fit into your life rather than by what's in them, which is the only way any Australian provider is allowed to describe them publicly.",
        "ED Stamina is positioned around spontaneity: for men who don't want to plan ahead. Hims says it is the plan most men on Hims choose.",
        "ED Performance is positioned around planned occasions, and Hims presents it as a reliable option for couples who plan sex in advance.",
        "The third is a combined plan that Hims says is exclusive to it. Ask the practitioner what it involves and who it suits.",
        "The practitioner recommends a plan after reviewing your answers and talking to you. If the first plan doesn't suit, you can ask for an adjustment at any time.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How Hims ED works, step by step",
      steps: [
        { title: "Take the free quiz", body: "A short set of questions about what's been happening and your general health. It's online, private and free." },
        { title: "Book the phone consult", body: "Use the ReferLabs link and the code applies at checkout, making the initial consult free. Without a code the consult is $20, refunded if you're not eligible or not satisfied with the options." },
        { title: "Speak to a practitioner", body: "An Australian practitioner calls you. They can name and explain the recommended plan in full, including how it's used and what it costs." },
        { title: "Order in your profile", body: "If you're approved and want to go ahead, you review and order the plan online and choose your delivery frequency." },
        { title: "Discreet delivery", body: "Your order arrives free, in an unmarked package, with Australia Post tracking. Check in with your practitioner whenever you want." },
      ],
    },
    {
      type: "prose",
      id: "talking-about-it",
      heading: "Raising it is the hardest part, so here's what the consult is like",
      paragraphs: [
        "Plenty of men put this off for months because the conversation feels awkward. The Hims consult is designed to take most of that out. You answer the sensitive questions in the quiz on your own time, so the practitioner already knows the background when they call. The call itself is about what's right for you, not about explaining yourself from scratch.",
        "Occasional trouble is common and often linked to stress, alcohol or tiredness. It is still worth a conversation if it keeps happening, and a practitioner is the right person to have it with. If anything in your answers suggests you'd be better served by an in-person appointment, the practitioner will tell you.",
        "Be straight with the quiz and the practitioner about your health history and anything else you take. The assessment is only as good as the information behind it.",
      ],
    },
    {
      type: "prose",
      id: "why-no-names",
      heading: "Why no ED site in Australia names what it supplies",
      paragraphs: [
        "Australian advertising law does not allow telehealth services, or sites like ReferLabs, to name the specific treatments a practitioner may recommend. That applies across the category, which is why every provider's page talks about plans and situations instead.",
        "Hims says the same thing on its own FAQ, and points you to the consult, where the practitioner can name and describe your options freely. If you decide the plan isn't for you, you can be refunded what you've paid.",
        "What you can compare before the consult: the consult fee and whether it's refunded, whether prices are published, how discreet the packaging is, whether there's a contract, and what support you get after the first delivery.",
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Who Hims ED suits, and who should look elsewhere",
      suits: [
        "You'd rather not raise ED face to face and want the whole process online and by phone.",
        "Discretion matters: unmarked packaging and nothing on your doorstep that says what it is.",
        "You want the freedom to pause or cancel without a contract.",
        "You like the option of adjusting the plan through a practitioner if the first one doesn't suit.",
      ],
      notFor: [
        "You want to see the price before speaking to anyone. Hims shows ED pricing after the consult.",
        "You'd prefer an in-person assessment. Hims is phone and online only.",
        "You've been a Hims or Pilot patient before. New-patient offers, including ours, won't apply.",
      ],
    },
    {
      type: "questions",
      id: "consult-questions",
      heading: "Questions to ask on your Hims ED consult",
      items: [
        "Which plan are you recommending, and why that one for me?",
        "How is it used, and is there anything I should avoid while I'm on it?",
        "What does each delivery cost, and how often will I be charged?",
        "How do I adjust the plan if it doesn't suit?",
        "How do I pause or cancel, and is there a cut-off before each order?",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims ED: common questions",
      items: [
        { q: "How much does Hims ED treatment cost in Australia?", a: `Hims charges a $20 consult fee, refunded if you're not eligible or not satisfied with the options. Plan prices aren't published on Hims' public ED page, so the practitioner covers cost on the consult. Checked ${FACTS_CHECKED_ON}.` },
        { q: "Is Hims ED discreet?", a: "Yes. Hims ships free Australia-wide in a discreet, unmarked package with tracking, and the consult happens by phone." },
        { q: "What's the difference between ED Stamina and ED Performance?", a: "Hims positions ED Stamina around spontaneity, for men who don't want to plan ahead, and ED Performance around planned occasions. Your practitioner explains what each involves on the consult." },
        { q: "Can I cancel Hims ED?", a: "Yes. Hims says you can pause or cancel at any time and it doesn't use lock-in contracts." },
        { q: "Is there a Hims discount code for ED?", a: "When we checked, Hims wasn't showing a public ED code on its ED page. The ReferLabs code gives new patients a free initial consult." },
        { q: "Who are the Hims practitioners?", a: "Hims partners with AHPRA-registered practitioners working across Australia." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Erectile dysfunction treatment online", url: "https://hims.com.au/erectile-dysfunction" },
    { label: "Hims: Frequently asked questions", url: "https://hims.com.au/faq" },
    { label: "Hims: Terms and conditions", url: "https://hims.com.au/terms-and-conditions" },
  ],
  related: [
    { label: "Best online ED treatment in Australia", href: "/best-online-ed-treatment-australia" },
    { label: "How Hims compares with other providers", href: "/hims-vs-mosh" },
    { label: "Hims hair loss review", href: "/hims-hair-loss" },
    { label: "Hims weight loss review", href: "/hims" },
  ],
};
