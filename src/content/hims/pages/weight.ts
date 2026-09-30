import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, OFFERS, SRC } from "../config";

export const weight: HimsPageContent = {
  slug: "hims",
  vertical: "weight",
  kind: "review",
  seoTitle: "Hims Weight Loss Australia (formerly Pilot): Code and Review",
  metaDescription:
    "Hims, formerly Pilot, runs an online men's weight loss program in Australia. The phone consultation, the twelve-month commitment, the 30-day refund, support and the Refer Labs code.",
  eyebrow: "Men's weight loss telehealth · Australia",
  h1: "Hims weight loss Australia: the consultation, the commitment and the code",
  standfirst:
    "Hims is the Australian service of Hims & Hers Health, the US-listed telehealth company, and the men's health brand formerly called Pilot. It runs online consultations with Australian-registered practitioners for weight loss, hair loss, skin and sexual health. Its weight loss program starts with a free two-minute quiz and a phone consultation, and the practitioner decides whether any treatment is appropriate. The advertised starting offer carries a twelve-month pay-upfront commitment, with a full refund if you contact Hims within 30 days of starting (terms apply). With the Refer Labs code, new patients pay nothing for the initial consultation; program fees apply.",
  hub: { label: "Weight loss", href: "/weight-loss" },
  verdictQuestion: "Is Hims weight loss worth it?",
  verdict: [
    "Hims suits men who want a practitioner-led program run from their phone, with unlimited practitioner support and a Care Team they can reach at any hour.",
    "Plan around the commitment. The advertised starting offer is paid upfront and runs for twelve months. If you already expect to stay a year, that gives you a known total. If you would rather try a month first, ask about payment options on the consultation before you pay for anything beyond it.",
  ],
  blocks: [
    {
      type: "ledger",
      id: "at-a-glance",
      heading: "Hims weight loss at a glance",
      intro: `Read on Hims' own site on ${FACTS_CHECKED_ON}.`,
      rows: [
        { label: "Who it's for", value: "Men in Australia. Hims describes its weight plans as plans for men." },
        { label: "How you start", value: "Free two-minute quiz, then a phone consultation with an Australian practitioner." },
        { label: "Consult fee", value: "Refunded if no suitable plan is found for you or you decide not to go ahead." },
        {
          label: "Commitment",
          value: "The advertised starting offer is a pay-upfront option with a twelve-month commitment.",
          note: "For Hims to confirm: the fine print on hims.com.au/weight-loss describes a twelve-month commitment, and the partner handbook says there is no lock-in.",
          verify: true,
        },
        { label: "Money-back", value: "Full refund if you contact Hims within 30 days of starting. Terms apply." },
        { label: "Cancelling", value: "Hims' weight page says you can change or cancel your plan at any time." },
        { label: "Support", value: "Unlimited practitioner support and a 24/7 Care Team." },
        { label: "Practitioners", value: "AHPRA-registered, based in Australia." },
        { label: "Medicare", value: "Not claimable, according to Hims' FAQ." },
      ],
    },
    { type: "offer", id: "offer", vertical: "weight" },
    {
      type: "steps",
      id: "how-it-works",
      heading: "How does Hims weight loss work?",
      intro: "The steps are the same with or without a code, and nothing is charged beyond the consult fee until you choose a plan.",
      steps: [
        {
          title: "Take the online quiz",
          body: "About two minutes of questions on your health history and your goals. It is free and doesn't commit you to anything.",
        },
        {
          title: "Book the phone consultation",
          body: "Consultations run from 7am to 11pm AEST, seven days. Our link carries the Refer Labs code into checkout. If no suitable plan is found for you, or you decide not to go ahead, Hims refunds the consult fee.",
        },
        {
          title: "Talk it through with the practitioner",
          body: "The practitioner reads your quiz answers before the call and decides whether any treatment is appropriate. The specifics, the cost and what the program involves are discussed here, so bring your questions.",
        },
        {
          title: "Decide in your Hims profile",
          body: "If a plan is recommended, you review it and the payment options in your profile and choose whether to go ahead. Read the commitment period and the refund terms on that screen before you pay.",
        },
        {
          title: "Ongoing support",
          body: "From there you have unlimited check-ins with your practitioner, and the Care Team handles questions and requests to change plans.",
        },
      ],
    },
    {
      type: "prose",
      id: "commitment",
      heading: "What does Hims weight loss commit you to?",
      paragraphs: [
        "Hims' advertised starting offer is the first payment on a pay-upfront option that carries a twelve-month commitment. The fine print on Hims' weight page sets a minimum total payment for that option, and if a plan is recommended and you choose to start, you pay the balance to get full access to the program. Hims shows the figures on its own site and in your profile before you pay.",
        "The same page says the program runs on a monthly schedule and that you can change or cancel at any time. Ask on the consultation how that sits with a twelve-month pay-upfront option: whether a monthly payment option is open to you, what happens to the balance if you stop early, and whether the 30-day refund covers the full upfront amount. Get the answer in writing through your Hims profile or by email before you pay.",
      ],
    },
    {
      type: "ledger",
      id: "included",
      heading: "What's included once you're on a Hims weight loss plan?",
      rows: [
        { label: "Practitioner access", value: "Unlimited appointments with your practitioner, included in the cost of the plan (Hims FAQ)." },
        { label: "Care Team", value: "24/7 support from your phone, from a team Hims says includes practitioners, health coaches and pharmacists." },
        { label: "Plan changes", value: "Ask to discuss an alternative plan and the Care Team books another practitioner appointment." },
        { label: "Nutrition", value: "Guidance on eating habits from the Care Team, without a set diet." },
        { label: "Community", value: "An optional online community." },
        { label: "Money-back", value: "30 days from the start of the program to ask for a full refund. Terms apply." },
      ],
    },
    {
      type: "fit",
      id: "fit",
      heading: "Who does Hims weight loss suit?",
      suits: [
        "You want the whole process on your phone: quiz, consultation, ordering and support.",
        "You want help between check-ins from a team you can reach at any hour.",
        "You prefer a phone call to a video call or a clinic visit.",
        "You expect a program to run for months, and a twelve-month commitment matches how you think about it.",
        "You may want hair loss or sexual health support later, since Hims covers both.",
      ],
    },
    {
      type: "questions",
      id: "consult-questions",
      heading: "What should I ask on the Hims consultation?",
      items: [
        "What does the plan you're recommending involve day to day?",
        "What are the payment options for me, monthly as well as pay-upfront, and what is the total of each over twelve months?",
        "If I stop after three months, what do I pay and what do I get back?",
        "Does the 30-day refund cover the whole upfront amount?",
        "What help do I get with food and exercise?",
        "What happens at the end of the program?",
        "Who do I contact if something doesn't feel right, and how quickly will they reply?",
      ],
    },
    {
      type: "prose",
      id: "about",
      heading: "Is Hims the same as Pilot?",
      paragraphs: [
        "Yes. Hims & Hers Health, the US-listed telehealth company, completed its acquisition of Eucalyptus, the Australian company behind Pilot, on 2 June 2026, which marked Hims & Hers' entry into Australia. Pilot is now rebranding as Hims: pilot.com.au says Pilot has joined the Hims & Hers group, and clicking through from Pilot's site opens the Hims quiz (read 1 October 2026). The acquisition announcement says patients already receiving care through Pilot continue without interruption.",
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
          a: `The Refer Labs code for new Hims patients is ${OFFERS.weight.code}: no charge for the initial consultation, and program fees apply. Our link carries it into Hims' checkout; if it isn't shown, enter it yourself. It is for new patients in Australia only and can't be combined with other Hims offers. Hims also publishes its own new-patient code on its weight page, so compare the two at checkout. Read ${FACTS_CHECKED_ON}.`,
        },
        {
          q: "How much does Hims weight loss cost in Australia?",
          a: "Hims shows its weight loss pricing on its own site and in your profile before you pay. Because the advertised offer runs for twelve months, ask on the consultation about monthly options and the total over the time you expect to stay.",
        },
        {
          q: "Can I get a refund from Hims?",
          a: "Hims refunds the consult fee if no suitable plan is found for you or you decide not to go ahead. For the program itself, it gives a full refund if you contact it within 30 days of starting, under its terms and conditions.",
        },
        {
          q: "Can I cancel Hims weight loss?",
          a: "Hims' weight page says you can change or cancel at any time. Its advertised starting offer is attached to a twelve-month pay-upfront commitment, so confirm on the consultation what cancelling early would mean for the option you choose.",
        },
        {
          q: "Is the Hims consultation by video?",
          a: "No. Hims consults by phone, with an Australian practitioner who has read your quiz answers beforehand.",
        },
        {
          q: "Can I claim Hims on Medicare?",
          a: "No. Hims' FAQ says Medicare benefits are not currently claimable for any of its plans.",
        },
        {
          q: "Is Hims weight loss for women?",
          a: "Hims in Australia describes its plans as plans for men. Women need a different provider.",
        },
      ],
    },
  ],
  sources: [SRC.himsWeight, SRC.himsFaq, SRC.pilot, SRC.eucalyptus, SRC.himsTerms],
  related: [
    { label: "How Hims compares with other providers", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED: how you start, commitment, refunds and support." },
    { label: "Online men's weight loss programs compared", href: "/best-mens-weight-loss-program-australia", desc: "Commitment, money-back terms and nutrition help side by side." },
    { label: "Hims hair loss", href: "/hims-hair-loss", desc: "The consultation, the 180-day money-back guarantee and cancelling." },
    { label: "Hims ED", href: "/hims-ed", desc: "The phone consultation, hours, contracts and the Care Team." },
  ],
};
