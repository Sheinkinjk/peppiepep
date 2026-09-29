import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS } from "../config";

export const weight: HimsPageContent = {
  slug: "hims",
  vertical: "weight",
  kind: "review",
  seoTitle: "Hims Weight Loss Australia (formerly Pilot): Code and Review",
  metaDescription:
    "Hims, formerly Pilot, runs a phone-based men's weight loss program in Australia. How it works, the twelve-month commitment, refunds, support and the Refer Labs code.",
  eyebrow: "Men's weight loss telehealth · Australia",
  h1: "Hims weight loss Australia: the code, the commitment and who it suits",
  standfirst:
    "Hims is the men's telehealth service formerly called Pilot. Its weight loss program starts with a free two-minute quiz and a phone consult with an Australian practitioner, and any plan ships free each month in unmarked packaging. The advertised starting offer carries a twelve-month commitment, with a full refund if you contact Hims within 30 days of starting (terms apply). New patients get a free initial consult with the Refer Labs code.",
  hub: { label: "Weight loss", href: "/weight-loss" },
  verdictQuestion: "Is Hims weight loss worth it?",
  verdict: [
    "Hims suits men who want a practitioner-led weight loss program run entirely from their phone, with support they can reach at any hour and everything delivered to the door.",
    "The figure to plan around is the commitment. Hims' advertised starting offer is paid upfront and runs for twelve months. If you already expect to stay a year, the support behind it is strong. If you want to try a month and stop, confirm your payment options on the consult before you pay for anything beyond it.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims weight loss at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia aged 18 and over." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consult with an Australian practitioner." },
        { label: "Consult", value: "Fee refunded if you're not eligible or decide not to go ahead. Free with the Refer Labs code." },
        {
          label: "Commitment",
          value: "The advertised starting offer is a pay-upfront option with a twelve-month commitment.",
          note: "For Hims to confirm: the fine print on hims.com.au/weight-loss describes a twelve-month commitment, and the partner handbook says there is no lock-in.",
          verify: true,
        },
        { label: "Refund", value: "Full refund if you contact Hims within 30 days of starting. Terms apply." },
        { label: "Cancelling", value: "Hims' weight loss page says you can change or cancel your plan at any time." },
        { label: "Support", value: "Unlimited practitioner check-ins and 24-hour Care Team access." },
        { label: "Delivery", value: "Free, monthly, unmarked, tracked." },
        { label: "Practitioners", value: "AHPRA-registered, across Australia." },
      ],
    },
    { type: "offer", id: "offer", vertical: "weight" },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims weight loss work?",
      intro: "The process is the same with or without a code. Nothing is sent to you until a practitioner has approved a plan and you have chosen to go ahead.",
      steps: [
        {
          title: "Take the online quiz",
          body: "About two minutes of questions on your health history, your goals and what you've tried before. It's free and doesn't commit you to anything.",
        },
        {
          title: "Book the phone consult",
          body: "You book a phone consult with an Australian practitioner. Through the Refer Labs link the code applies at checkout and the initial consult is free. If you're not eligible, or decide the recommended plan isn't for you, Hims refunds the consult fee.",
        },
        {
          title: "Talk it through on the phone",
          body: "The practitioner has read your quiz answers before the call. This is where the specifics are discussed: what the recommended plan involves, how it's used, what it costs and what to expect. Ask everything you want answered here, because the website can't tell you.",
        },
        {
          title: "Choose your plan in your Hims profile",
          body: "If you're approved, you review the plan and payment option in your online profile and decide whether to proceed. Read the commitment period and the refund terms on this screen before you pay.",
        },
        {
          title: "Delivery and ongoing support",
          body: "Hims says orders take around two to three business days to prepare, then ship free with Australia Post tracking. From there you have unlimited check-ins with your practitioner and the Care Team for adjustments and questions.",
        },
      ],
    },
    {
      type: "prose",
      id: "commitment",
      heading: "What does Hims weight loss commit you to?",
      paragraphs: [
        "Hims' advertised starting offer is the first payment on a pay-upfront option that carries a twelve-month commitment. The fine print on Hims' weight loss page sets a minimum total payment for that option, and if you're approved and choose to start, you pay the balance to get full access to the program. Hims shows the figures on its own site and in your profile before you pay.",
        "The same page says you can change or cancel your plan at any time and that deliveries ship monthly. Ask on the consult how that works alongside a twelve-month pay-upfront option: whether a monthly payment option is available for you, what happens to the balance if you stop early, and whether the 30-day refund covers the full pay-upfront amount. Get the answer in writing through your Hims profile or by email before you pay.",
      ],
    },
    {
      type: "prose",
      id: "why-no-names",
      heading: "Why doesn't Hims say what the treatment is?",
      paragraphs: [
        "Weight loss sites in Australia don't say exactly what they supply. Australian advertising law does not allow telehealth services, or sites like Refer Labs that write about them, to name the specific treatments a practitioner may recommend, and the rule applies to every provider in the category.",
        "Hims says this on its own FAQ: advertising regulations stop it being more specific before the consult, and on the phone the practitioner can discuss the options freely, based on your health history.",
        "Before the consult, compare providers on how easy it is to reach a practitioner, how long you're committed for, what happens if you want to stop, and what support looks like after the first delivery.",
      ],
    },
    {
      type: "ledger",
      id: "included",
      heading: "What's included once you're on a Hims weight loss plan?",
      rows: [
        { label: "Practitioner access", value: "Unlimited check-ins with your practitioner, organised through your profile or by email." },
        { label: "Care Team", value: "24-hour support from your phone, from a team Hims says includes nurses, pharmacists and clinicians." },
        { label: "Plan changes", value: "Ask to discuss an alternative plan at any time and the Care Team organises another practitioner appointment." },
        { label: "Delivery", value: "Free, monthly, discreet and tracked." },
        { label: "Community", value: "Hims lists community access as part of its weight loss program." },
        { label: "Refund", value: "30 days from the start of the program to ask for a full refund. Terms apply." },
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Who Hims weight loss suits, and who should look elsewhere",
      suits: [
        "You want the whole process on your phone: quiz, consult, ordering, support and delivery.",
        "You expect to want help between check-ins and like the idea of a team you can reach at 2am.",
        "You prefer a phone call to a video call or a clinic visit.",
        "You're planning for a program that runs for months, and a twelve-month commitment matches how you think about it.",
        "You may want hair loss or ED support later, since Hims covers both as well.",
      ],
      notFor: [
        "You want to try a program for a single month with no longer commitment. Ask about monthly options on the consult before you pay.",
        "You're a woman. Hims in Australia is a men's service.",
        "You've been a Hims or Pilot patient before. You can still use Hims, but new-patient offers, including ours, won't apply.",
        "You want to be seen face to face. Hims is phone and online only.",
      ],
    },
    {
      type: "questions",
      id: "consult-questions",
      heading: "What should I ask on the Hims consult?",
      items: [
        "What does the plan you're recommending involve, and how is it used day to day?",
        "What are the payment options for me, monthly as well as pay-upfront, and what is the total of each over twelve months?",
        "If I stop after three months, what do I pay and what do I get back?",
        "Does the 30-day refund cover the whole pay-upfront amount?",
        "What support do I get for food and exercise, as well as the treatment plan?",
        "What happens at the end of the program, and how is that transition managed?",
        "Who do I contact if something doesn't feel right, and how quickly will they reply?",
      ],
    },
    {
      type: "prose",
      id: "about",
      heading: "Is Hims the same as Pilot?",
      paragraphs: [
        "Yes. Pilot has joined the Hims & Hers group, and pilot.com.au now sends new patients to the Hims quiz. Hims is part of Hims & Hers Health, the US-listed telehealth company, and partners with AHPRA-registered practitioners across Australia.",
        "If you're searching for Pilot weight loss reviews or a Pilot discount code in Australia, Hims is the service you're now looking for. Former Pilot patients count as previous patients for Hims' new-patient offers.",
      ],
    },
    {
      type: "faq",
      id: "faq",
      heading: "Hims weight loss: common questions",
      items: [
        {
          q: "Is there a Hims discount code for weight loss?",
          a: `Yes. The Refer Labs code for new Hims patients is ${OFFERS.weight.code}, which gives a free initial consult, and our link applies it at checkout. It is for new patients in Australia only and can't be combined with other Hims offers. Hims also runs its own public new-patient offer, so compare the two at checkout and use whichever suits you. Checked ${FACTS_CHECKED_ON}.`,
        },
        {
          q: "How much does Hims weight loss cost in Australia?",
          a: "Hims shows its weight loss pricing on its own site and in your profile before you pay. Because the advertised offer runs for twelve months, ask on the consult about monthly options and the total over the time you expect to stay.",
        },
        {
          q: "Can I get a refund from Hims?",
          a: "Hims refunds the consult fee if you're not eligible or decide the recommended plan isn't for you. For the weight loss program, Hims offers a full refund if you contact it within 30 days of starting. Its terms and conditions apply.",
        },
        {
          q: "Can I cancel Hims weight loss?",
          a: "Hims' weight loss page says you can change or cancel at any time. Its advertised starting offer is attached to a twelve-month pay-upfront commitment, so confirm on the consult what cancelling early would mean for the option you choose.",
        },
        {
          q: "Is the Hims consult by video?",
          a: "No. Hims consults are by phone, with an Australian practitioner who has read your quiz answers beforehand.",
        },
        {
          q: "Does Hims weight loss work for women?",
          a: "Hims in Australia is a men's service. Women need a different provider.",
        },
      ],
    },
  ],
  sources: [
    { label: "Hims: Weight loss treatment plans for men", url: "https://hims.com.au/weight-loss" },
    { label: "Hims: Frequently asked questions", url: "https://hims.com.au/faq" },
    { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
    { label: "Hims: Terms and conditions", url: "https://hims.com.au/terms-and-conditions" },
  ],
  related: [
    { label: "How Hims compares with other providers", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared on commitment, refunds and support." },
    { label: "Best men's weight loss program in Australia", href: "/best-mens-weight-loss-program-australia", desc: "The online options and an in-person practitioner, side by side." },
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "Keep and Regrow plans and the 180-day money-back guarantee." },
    { label: "Hims ED treatment", href: "/hims-ed", desc: "The three ED plans, the phone consult and cancelling." },
  ],
};
