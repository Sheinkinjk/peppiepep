import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS } from "../config";

export const hair: HimsPageContent = {
  slug: "hims-hair-loss",
  vertical: "hair",
  kind: "review",
  seoTitle: "Hims Hair Loss Australia (formerly Pilot): Code and Review",
  metaDescription:
    "Hims hair loss plans in Australia, formerly Pilot: Keep and Regrow plans, the 180-day money-back guarantee, cancelling, support and the Refer Labs code.",
  eyebrow: "Men's hair loss telehealth · Australia",
  h1: "Hims hair loss Australia: the plans, the guarantee and the Refer Labs code",
  standfirst:
    "Hims, formerly Pilot, offers hair loss plans to Australian men through a free two-minute quiz and a phone consult with an Australian practitioner. Plans are grouped by stage, Keep for early thinning and Regrow for more advanced loss, and come with a 180-day money-back guarantee, free discreet delivery every two or three months, and cancellation before any order without a fee. The Refer Labs code makes the initial consult free for new patients.",
  hub: { label: "Hair loss", href: "/hair-loss" },
  verdictQuestion: "Is Hims hair loss treatment worth it?",
  verdict: [
    "Hims is a solid choice if you want a long-running hair plan with a long refund window behind it. The 180-day money-back guarantee gives you time to decide, and you can cancel before any delivery without a fee.",
    "The gap is price transparency. Hims doesn't publish hair plan prices on its public pages, so you see the cost after the consult. The consult fee is refunded if you decide not to go ahead, so finding out costs little.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims hair loss at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia aged 18 and over, from first thinning to more advanced loss." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consult. Hims says you can speak to a practitioner in as little as 15 minutes." },
        { label: "Consult", value: "Fee refunded if you're not eligible or decide not to go ahead. Free with the Refer Labs code." },
        { label: "Plan price", value: "Not published on Hims' public hair page. You see it after the consult." },
        { label: "Plans", value: "Keep and Regrow, with 3-in-1, 2-in-1 and single-action options." },
        { label: "Guarantee", value: "180-day money-back guarantee. Terms apply." },
        { label: "Deliveries", value: "Every two or three months. Free, discreet, tracked." },
        { label: "Cancelling", value: "Before your next order is processed, no fee." },
        { label: "Support", value: "Unlimited check-ins, 24/7 Care Team, plan changes on request." },
      ],
    },
    { type: "offer", id: "offer", vertical: "hair" },
    {
      type: "prose",
      id: "plans",
      heading: "Which Hims hair plan is for me?",
      paragraphs: [
        "Hims groups its hair plans in two ways. The first is by stage. Keep is aimed at men who are worried about hair loss or noticing the first signs of thinning. Regrow is aimed at more advanced loss, including a receding hairline and thinning patches, and uses Hims' Hair Hybrid plans.",
        "The second is by how many parts the plan combines. A 2-in-1 plan combines two approaches in one routine and, according to Hims, is the plan most of its hair patients are on. A 3-in-1 plan adds a third part, combined into one daily routine. Single-action plans focus on one approach, for men who need something more tailored.",
        "Which one you're offered is the practitioner's decision, based on your quiz answers, the stage and pattern of your hair loss and your health history. You can ask for a different plan at any time and the Care Team will organise another practitioner appointment to discuss it. Australian advertising law stops any provider naming what a plan contains, so the practitioner explains that on the consult.",
      ],
    },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims hair loss work?",
      steps: [
        { title: "Take the online quiz", body: "About two minutes of questions about your hair, how long it has been changing, and your health history. Free, and it doesn't commit you to anything." },
        { title: "Book the phone consult", body: "Book through the Refer Labs link and the consult is free for new patients. Otherwise Hims refunds the fee if you're not eligible or decide not to go ahead." },
        { title: "Talk to an Australian practitioner", body: "The practitioner has read your answers before the call and can explain the recommended plan in full, including what it involves and what it costs. Ask about price here, since it isn't published on the site." },
        { title: "Order through your profile", body: "If you're approved and want to proceed, you choose the plan and delivery frequency in your Hims profile. Hims says your plan can arrive in as little as three days." },
        { title: "Ongoing deliveries and check-ins", body: "Refills arrive every two or three months. Check in with your practitioner whenever you like, and cancel before any upcoming order if you want to stop." },
      ],
    },
    {
      type: "prose",
      id: "guarantee",
      heading: "How does the Hims 180-day money-back guarantee work?",
      paragraphs: [
        "Hair plans are a slow process. Hims describes hair treatment as a long-term commitment and asks you to stick with a plan consistently before judging it. 180 days gives you time to decide whether a plan suits you before asking for your money back.",
        "The guarantee applies if you're not satisfied with your progress, and you claim it by contacting Hims at hello@hims.com.au. It is subject to Hims' terms and conditions, so read those before you start and keep a note of your start date.",
        "Separately, you can cancel before any upcoming order is processed without a fee. The guarantee gets money back if you're unhappy with progress; cancelling stops future charges.",
      ],
    },
    {
      type: "ledger",
      id: "included",
      heading: "What's included with every Hims hair plan?",
      rows: [
        { label: "Practitioner access", value: "Unlimited check-ins and plan alterations on request." },
        { label: "Care Team", value: "24/7 support from a team Hims says includes nurses, pharmacists and clinicians." },
        { label: "Delivery", value: "Free Australia-wide in discreet unmarked packaging, every two or three months." },
        { label: "Flexibility", value: "Cancel before the next order is processed with no cancellation fee." },
        { label: "Guarantee", value: "180-day money-back guarantee. Terms apply." },
        { label: "First order extra", value: "Hims says a complimentary jar comes with the first order of select plans." },
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Is Hims right for your hair loss?",
      suits: [
        "You've noticed thinning or a receding hairline and want to speak to a practitioner about it without a clinic visit.",
        "You want a long money-back window on a plan that runs for months.",
        "You like the option of changing plans through a practitioner rather than being locked into one routine.",
        "You may want weight loss or ED support later, since Hims covers both as well.",
      ],
      notFor: [
        "You want to see prices before you speak to anyone. Hims shows hair pricing after the consult.",
        "You want a procedure such as a transplant. Hims offers treatment plans only.",
        "You've been a Hims or Pilot patient before. New-patient offers, including ours, won't apply.",
        "You're a woman. Hims in Australia is a men's service.",
      ],
    },
    {
      type: "questions",
      id: "consult-questions",
      heading: "What should I ask on the Hims hair consult?",
      items: [
        "Which plan are you recommending for my stage of hair loss, and why that one over the alternatives?",
        "What does the plan involve day to day?",
        "What does it cost per delivery, and how often will I be charged?",
        "How long should I stay on it before judging whether it suits me?",
        "How do I claim the 180-day guarantee, and what does it cover?",
        "What should I do if I want to adjust or stop the plan?",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims hair loss: common questions",
      items: [
        { q: "Is there a Hims discount code for hair loss?", a: `Yes. The Refer Labs code for new Hims patients is ${OFFERS.hair.code}, which gives a free initial consult, and our link applies it at checkout. It is for new patients only and can't be combined with other Hims offers. Hims sometimes runs its own public hair offers, so compare them at checkout and use whichever suits you. Checked ${FACTS_CHECKED_ON}.` },
        { q: "How much is Hims hair loss treatment in Australia?", a: "Hims doesn't publish hair plan prices on its public hair page. You see the price after your phone consult, and the consult fee is refunded if you decide not to go ahead." },
        { q: "Does Hims offer a money-back guarantee on hair plans?", a: "Yes. Hims offers a 180-day money-back guarantee on hair plans if you're not satisfied with your progress. Its terms and conditions apply." },
        { q: "Can I cancel my Hims hair plan?", a: "Yes. You can cancel any time before your next order is processed, with no cancellation fee." },
        { q: "What's the difference between the Hims 2-in-1 and 3-in-1 hair plans?", a: "The 2-in-1 combines two approaches into one plan and is the one Hims says most of its hair patients use. The 3-in-1 adds a third part. Your practitioner explains what each involves on the consult." },
        { q: "How often does Hims deliver hair plans?", a: "Every two or three months, depending on your plan. Delivery is free and discreet." },
        { q: "Is Hims hair loss the same as Pilot hair loss?", a: "Pilot is now Hims. Pilot's website says it has joined the Hims & Hers group, and signing up there leads to the Hims quiz." },
      ],
    },
  ],
  sources: [
    { label: "Hims: Hair loss treatment plans for men", url: "https://hims.com.au/hair-loss" },
    { label: "Hims: Frequently asked questions", url: "https://hims.com.au/faq" },
    { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
    { label: "Hims: Terms and conditions", url: "https://hims.com.au/terms-and-conditions" },
  ],
  related: [
    { label: "Best online hair loss treatment in Australia", href: "/best-hair-loss-treatment-online-australia", desc: "The online options and an in-person practitioner, side by side." },
    { label: "How Hims compares with other providers", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared on commitment, refunds and support." },
    { label: "Hims weight loss", href: "/hims", desc: "How the program works, the commitment and the refund window." },
    { label: "Hims ED treatment", href: "/hims-ed", desc: "The three ED plans, the phone consult and cancelling." },
  ],
};
