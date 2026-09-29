import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS } from "../config";

export const ed: HimsPageContent = {
  slug: "hims-ed",
  vertical: "ed",
  kind: "review",
  seoTitle: "Hims ED Treatment Australia (formerly Pilot): Code and Review",
  metaDescription:
    "How Hims ED plans work in Australia, formerly Pilot: ED Stamina, ED Performance, the phone consult, discreet delivery, cancelling and the Refer Labs code.",
  eyebrow: "Men's sexual health telehealth · Australia",
  h1: "Hims ED treatment Australia: the three plans, the consult and the Refer Labs code",
  standfirst:
    "Hims, formerly Pilot, offers three erectile dysfunction plans to Australian men: ED Stamina, ED Performance and a combined plan. You start with a free two-minute quiz, speak to an Australian practitioner by phone, and any plan arrives free in unmarked packaging with no lock-in contract. Hims doesn't publish ED plan prices on its public page. New patients get a free initial consult with the Refer Labs code.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "Is Hims ED treatment worth it?",
  verdict: [
    "Hims is a good fit if the main thing stopping you is the awkwardness of raising ED in a waiting room. The whole process runs from your phone, the consult is a call with an Australian practitioner, and nothing arrives in packaging that says what's inside.",
    "Hims doesn't publish ED plan prices on its public page, and it has no lock-in contracts, so the low-risk way to find out is to take the quiz and ask on the consult. The consult fee is refunded if you're not eligible or don't want to proceed.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims ED at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia aged 18 and over who have trouble getting or keeping an erection." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consult with an Australian practitioner." },
        { label: "Consult", value: "Fee refunded if you're not eligible or not satisfied with the options. Free with the Refer Labs code." },
        { label: "Plan price", value: "Not published on Hims' public ED page. You see it after the consult." },
        { label: "Plans", value: "ED Stamina, ED Performance and a combined plan." },
        { label: "Public offer", value: "No public ED code on Hims' ED page when we checked." },
        { label: "Cancelling", value: "Pause or cancel at any time. No lock-in contracts." },
        { label: "Delivery", value: "Free, unmarked, tracked." },
        { label: "Support", value: "24/7 phone support and unlimited practitioner check-ins." },
      ],
    },
    { type: "offer", id: "offer", vertical: "ed" },
    { type: "eligibility", id: "eligibility", vertical: "ed" },
    {
      type: "prose",
      id: "plans",
      heading: "What are the three Hims ED plans?",
      paragraphs: [
        "Hims describes its ED plans by the situation they suit. Australian advertising rules stop any provider naming what a plan contains, so every provider's page talks about plans and situations.",
        "ED Stamina is positioned around spontaneity: for men who don't want to plan ahead. Hims says it is the plan most men on Hims choose.",
        "ED Performance is positioned around planned occasions, and Hims presents it as a reliable option for couples who plan sex in advance.",
        "The third is a combined plan that Hims says is exclusive to it. Ask the practitioner what it involves and who it suits.",
        "The practitioner recommends a plan after reviewing your answers and talking to you. If the first plan doesn't suit, you can ask for an adjustment at any time.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims ED work?",
      steps: [
        { title: "Take the free quiz", body: "A short set of questions about what's been happening and your general health. It's online, private and free." },
        { title: "Book the phone consult", body: "Through the Refer Labs link the code applies at checkout and the initial consult is free. Without a code, the consult fee is refunded if you're not eligible or not satisfied with the options." },
        { title: "Speak to a practitioner", body: "An Australian practitioner calls you. They can name and explain the recommended plan in full, including how it's used and what it costs." },
        { title: "Order in your profile", body: "If you're approved and want to go ahead, you review and order the plan online and choose your delivery frequency." },
        { title: "Discreet delivery", body: "Your order arrives free, in an unmarked package, with Australia Post tracking. Check in with your practitioner whenever you want." },
      ],
    },
    {
      type: "prose",
      id: "consult",
      heading: "What is the Hims ED consult like?",
      paragraphs: [
        "Plenty of men put this off for months because the conversation feels awkward. You answer the sensitive questions in the quiz on your own time, so the practitioner already knows the background when they call, and the call can focus on what suits you.",
        "Occasional trouble is common and often linked to stress, alcohol or tiredness. It is still worth a conversation if it keeps happening, and a practitioner is the right person to have it with. If anything in your answers suggests an in-person appointment would serve you better, the practitioner will tell you.",
        "Be straight with the quiz and the practitioner about your health history and anything else you take. The assessment is only as good as the information behind it.",
      ],
    },
    {
      type: "prose",
      id: "why-no-names",
      heading: "Why doesn't any ED site in Australia name what it supplies?",
      paragraphs: [
        "Australian advertising law does not allow telehealth services, or sites like Refer Labs, to name the specific treatments a practitioner may recommend. That applies across the category.",
        "Hims says the same on its own FAQ and points you to the consult, where the practitioner can discuss your options freely. If you decide the plan isn't for you, you can be refunded what you've paid.",
        "What you can compare before the consult: whether the consult fee is refunded, whether prices are published, how discreet the packaging is, whether there's a contract, and what support you get after the first delivery.",
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
      heading: "What should I ask on the Hims ED consult?",
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
        { q: "Is there a Hims discount code for ED?", a: `When we checked on ${FACTS_CHECKED_ON}, Hims wasn't showing a public ED code on its ED page. The Refer Labs code for new Hims patients is ${OFFERS.ed.code}, which gives a free initial consult, and our link applies it at checkout.` },
        { q: "How much does Hims ED treatment cost in Australia?", a: "Hims doesn't publish ED plan prices on its public ED page, so the practitioner covers cost on the consult. The consult fee is refunded if you're not eligible or not satisfied with the options." },
        { q: "Is Hims ED discreet?", a: "Yes. Hims ships free Australia-wide in a discreet, unmarked package with tracking, and the consult happens by phone." },
        { q: "What's the difference between ED Stamina and ED Performance?", a: "Hims positions ED Stamina around spontaneity, for men who don't want to plan ahead, and ED Performance around planned occasions. Your practitioner explains what each involves on the consult." },
        { q: "Can I cancel Hims ED?", a: "Yes. Hims says you can pause or cancel at any time and it doesn't use lock-in contracts." },
        { q: "Is Hims ED the same as Pilot?", a: "Pilot has joined the Hims & Hers group, and pilot.com.au now sends new patients to the Hims quiz." },
        { q: "Who are the Hims practitioners?", a: "Hims partners with AHPRA-registered practitioners working across Australia." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Erectile dysfunction treatment online", url: "https://hims.com.au/erectile-dysfunction" },
    { label: "Hims: Frequently asked questions", url: "https://hims.com.au/faq" },
    { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
    { label: "Hims: Terms and conditions", url: "https://hims.com.au/terms-and-conditions" },
  ],
  related: [
    { label: "Best online ED treatment in Australia", href: "/best-online-ed-treatment-australia", desc: "The online options and an in-person practitioner, side by side." },
    { label: "How Hims compares with other providers", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared on commitment, refunds and support." },
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "Keep and Regrow plans and the 180-day money-back guarantee." },
    { label: "Hims weight loss", href: "/hims", desc: "How the program works, the commitment and the refund window." },
  ],
};
