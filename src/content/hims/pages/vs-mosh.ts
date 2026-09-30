import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, SRC } from "../config";

export const vsMosh: HimsPageContent = {
  slug: "hims-vs-mosh",
  vertical: "hair",
  // Covers all three programs. Hair is the only Mosh vertical with a Refer Labs link.
  moshLink: "hair",
  kind: "versus",
  seoTitle: "Hims vs Mosh (formerly Pilot vs Mosh): Weight, Hair and ED Compared",
  metaDescription:
    "Hims, formerly Pilot, and Mosh compared for Australian men: how you start, consult fees, practitioners, commitment and money-back terms for weight loss, hair loss and ED.",
  eyebrow: "Men's telehealth comparison · Australia",
  h1: "Hims vs Mosh: how do they compare for weight loss, hair loss and ED?",
  standfirst:
    "Hims, the service formerly called Pilot, and Mosh are Australian men's telehealth services covering weight loss, hair loss and sexual health. Both start with a free online quiz and a consultation with an AHPRA-registered practitioner, who decides whether any treatment is appropriate. Hims consults by phone and includes a 24-hour Care Team. Mosh consults by call, video or text and publishes its prices before you start. On hair, both run a 180-day money-back guarantee: Hims on all hair plans, Mosh on quarterly programs.",
  hub: { label: "Men's health", href: "/mens-health" },
  verdictQuestion: "Is Hims or Mosh better?",
  verdict: [
    "It depends on the program. For weight loss, Mosh's offering is Moshy, its partner brand: Hims' advertised starting offer is a twelve-month pay-upfront option, and Moshy's Refer Labs offer carries a three-month minimum. Each gives 30 days to ask for your money back, under its own terms.",
    "For hair, Mosh publishes its prices and limits its 180-day guarantee to quarterly programs; Hims shows prices after the consultation and covers every hair plan. For ED, the difference is format: Hims consults by phone from 7am to 11pm AEST, and Mosh lets you message a practitioner by text, with phone and video available.",
  ],
  pair: {
    hims: {
      bestIf: "A phone consultation and a Care Team at any hour.",
      points: ["Free two-minute quiz, then a phone consultation", "Weight loss, hair loss and sexual health for men", "Pause, delay or cancel from your profile"],
    },
    mosh: {
      bestIf: "Consultations by call, video or text, with prices published up front.",
      points: ["Free online quiz, then a consultation", "Weight, hair, sexual health, mental health and skin", "No lock-in contracts; cancel anytime"],
    },
  },
  blocks: [
    { type: "inclusions", id: "includes", heading: "What does each include?", table: "overview" },
    {
      type: "choose",
      id: "choose",
      hims: [
        "You'd rather talk on the phone than type or be on video.",
        "You want a Care Team you can reach at any hour.",
        "For weight loss, a twelve-month program with a known total suits you.",
      ],
      mosh: [
        "You want to see prices before the consultation.",
        "You'd rather message a practitioner by text.",
        "For weight loss, you want Moshy's three-month minimum with coaching and meal plans included.",
      ],
    },
    {
      type: "prose",
      id: "weight",
      heading: "Should I choose Hims or Moshy for weight loss?",
      paragraphs: [
        "Mosh's weight offering is Moshy, its partner brand, so this is Hims against Moshy. Start with how long you expect to stay. Hims' advertised offer sits on a twelve-month pay-upfront option, which gives a known total if you plan to stay a year. Moshy's Refer Labs offer comes with a three-month minimum, which is easier to live with if you want to see how a program fits first. Hims' weight page also says you can change or cancel at any time, so ask how that applies to the option you choose.",
        "Then support. Hims includes a 24/7 Care Team of practitioners, health coaches and pharmacists. Moshy includes in-app coaching, dietitian meal plans and a community, with a care team of medical practitioners, nurses, pharmacists, psychologists, dietitians and exercise physiologists. Moshy describes itself as a women's health clinic but takes anyone a practitioner assesses as suitable. Both are compared row by row on our men's weight loss page.",
      ],
    },
    {
      type: "prose",
      id: "moshy",
      heading: "Is Mosh the same as Moshy?",
      paragraphs: [
        "They are partner brands. Moshy has its own site at getmoshy.com.au, describes itself as an online women's health clinic, and runs Mosh's weight offering; its services are open to anyone a practitioner assesses as suitable. The hair and ED comparisons on this page are Mosh's own services on getmosh.com.au.",
      ],
    },
    { type: "offer", id: "codes", vertical: "hair" },
    {
      type: "faq",
      id: "faq",
      heading: "Hims vs Mosh: common questions",
      items: [
        {
          q: "Is Mosh or Pilot better?",
          a: "Pilot is now Hims: pilot.com.au says Pilot has joined the Hims & Hers group and sends new patients to the Hims quiz. So the comparison today is Hims vs Mosh. Hims consults by phone and adds a 24-hour Care Team; Mosh consults by call, video or text and publishes its prices first.",
        },
        {
          q: "Is Hims cheaper than Mosh?",
          a: "It depends on the program and how long you stay. Mosh publishes its prices on its pricing page. Hims publishes weight pricing on its weight page and shows hair and ED prices after the consultation. For weight loss, where Mosh's offering is Moshy, compare the total over each minimum: twelve months on Hims' advertised option, three months on Moshy's Refer Labs offer.",
        },
        {
          q: "Do Hims and Mosh have a money-back guarantee?",
          a: "Yes, with different scopes. On hair, Hims covers all plans for 180 days and Mosh covers quarterly programs for 180 days. On weight loss, Hims gives 30 days from starting and Moshy, Mosh's weight brand, has a 30-day money-back guarantee. Each is under the provider's terms.",
        },
        {
          q: "Who owns Hims and Mosh?",
          a: "Hims is part of Hims & Hers Health, which completed its purchase of Eucalyptus, the Australian company behind Pilot and Juniper, on 2 June 2026; Pilot is rebranding as Hims. Mosh describes itself as Australian owned and lists Moshy and Healthy Mummy as its brands.",
        },
        {
          q: "Can I switch from Mosh to Hims, or the other way?",
          a: "Yes. You start as a new patient with the quiz and consultation. Tell the new practitioner about any plan you're on so they can assess you properly.",
        },
      ],
    },
  ],
  sources: [SRC.himsWeight, SRC.himsHair, SRC.himsEd, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.moshHome, SRC.moshPricing, SRC.moshyWeight, SRC.moshHair, SRC.moshReferLabs],
  related: [
    { label: "Hims weight loss", href: "/hims", desc: "The consultation, the twelve-month commitment and the refund window." },
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "The consultation, the 180-day money-back guarantee and cancelling." },
    { label: "Online ED consultations: Hims vs Mosh", href: "/ed", desc: `Consultation format, hours and contracts, read ${FACTS_CHECKED_ON}.` },
    { label: "Men's weight loss programs: Hims vs Mosh", href: "/best-mens-weight-loss-program-australia", desc: "Commitment, money-back terms and nutrition help side by side." },
  ],
};
