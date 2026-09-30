import type { HimsPageContent } from "../types";
import { SRC } from "../config";

export const bestWeight: HimsPageContent = {
  slug: "best-mens-weight-loss-program-australia",
  vertical: "weight",
  kind: "versus",
  seoTitle: "Men's Weight Loss Programs Online in Australia: Hims vs Mosh",
  metaDescription:
    "Two online men's weight loss programs in Australia compared, Hims (formerly Pilot) and Mosh: commitment, money-back terms, practitioner support, nutrition help and the Refer Labs code.",
  eyebrow: "Men's weight loss · Australia",
  h1: "Online men's weight loss programs in Australia: Hims vs Mosh",
  standfirst:
    "This page compares two Australian online weight loss programs for men, Hims (formerly Pilot) and Mosh, on what each publishes about commitment, refunds and support. In both, a registered practitioner decides whether any treatment is appropriate. Hims' advertised starting offer is a twelve-month pay-upfront option with a 24/7 Care Team. Mosh's public intro offer carries a three-month minimum, with meal plans, a tracking app and paid dietitian sessions. Each offers a 30-day money-back guarantee under its own terms.",
  hub: { label: "Weight loss", href: "/weight-loss" },
  verdictQuestion: "Is Hims or Mosh better for men's weight loss?",
  verdict: [
    "The two differ most on how long you commit and what support comes with it. Hims fits a man who expects to stay a year and wants a Care Team at any hour. Mosh fits a man who wants a shorter first commitment, nutrition tools, and a care team that lists dietitians and exercise physiologists.",
    "Mosh's weight program is Mosh's own. Moshy, Mosh's brother brand, is a separate service that describes itself as an online women's health clinic.",
  ],
  pair: {
    hims: {
      bestIf: "A twelve-month program with support at any hour.",
      points: [
        "Advertised starting offer: twelve months, paid upfront",
        "24/7 Care Team of practitioners, health coaches and pharmacists",
        "30-day money-back guarantee from starting",
      ],
    },
    mosh: {
      bestIf: "A shorter first commitment with nutrition tools built in.",
      points: [
        "Public intro offer: three-month minimum",
        "Meal plans, a tracking app and paid dietitian sessions",
        "30-day money-back guarantee on monthly programs",
      ],
    },
  },
  blocks: [
    { type: "inclusions", id: "includes", heading: "What does each include?", table: "weight" },
    {
      type: "choose",
      id: "choose",
      hims: [
        "You expect to stay on a program for a year and want the total known upfront.",
        "You want a Care Team you can reach at any hour.",
        "You prefer a phone consultation.",
      ],
      mosh: [
        "You want a three-month minimum rather than twelve months.",
        "You want meal plans, a tracking app and access to dietitians.",
        "You'd like to consult by text or video as well as by phone.",
      ],
    },
    {
      type: "prose",
      id: "how-to-compare",
      heading: "How do I compare online weight loss programs?",
      paragraphs: [
        "Australian advertising law doesn't allow any provider, or any site writing about one, to name the specific treatments a practitioner may recommend. The comparison that is open to you is on terms and support.",
        "Start with the total over the time you expect to stay. Each provider leads with an introductory offer tied to a minimum period, so ask for the total over three months and over twelve. Then look at stopping: the refund window, the minimum commitment, and whether cancelling early leaves a balance. Then support: who you can reach, when, and whether help with food is included or extra.",
      ],
    },
    {
      type: "prose",
      id: "in-person",
      heading: "Should I see a practitioner in person instead?",
      paragraphs: [
        "If you'd rather be assessed face to face, or already see a practitioner who knows your history, an in-person appointment is a reasonable place to start. You manage the plan together with no program commitment, and arrange follow-ups yourself.",
      ],
    },
    { type: "offer", id: "codes", vertical: "weight" },
    {
      type: "faq",
      id: "faq",
      heading: "Men's weight loss programs: common questions",
      items: [
        {
          q: "What is the best weight loss program for men in Australia?",
          a: "This page compares two, Hims and Mosh, rather than the whole market. Between them, the choice turns on commitment and support: Hims' advertised offer runs twelve months with a 24/7 Care Team, and Mosh's intro offer has a three-month minimum with meal plans and dietitian sessions.",
        },
        {
          q: "How much do online weight loss programs cost in Australia?",
          a: "Hims and Mosh both show current pricing on their own sites and confirm it before you pay. Compare the total over each minimum commitment: twelve months on Hims' advertised pay-upfront option, three months on Mosh's intro offer.",
        },
        {
          q: "Is Mosh weight loss the same as Moshy?",
          a: "No. Moshy is Mosh's brother brand with its own site, getmoshy.com.au. The Mosh program on this page is Mosh's own, on getmosh.com.au.",
        },
        {
          q: "Is Pilot weight loss still available?",
          a: "Not under the Pilot name. Pilot joined the Hims & Hers group, and new patients who start on pilot.com.au are taken to the Hims quiz.",
        },
        {
          q: "Can I get a refund on an online weight loss program?",
          a: "Both programs here offer 30 days. Hims refunds in full if you contact it within 30 days of starting; Mosh refunds your first order if you cancel a monthly program within 30 days of receiving it. Both are under the provider's terms.",
        },
      ],
    },
  ],
  sources: [SRC.himsWeight, SRC.himsFaq, SRC.moshWeight, SRC.moshPricing, SRC.moshHome, SRC.pilot],
  related: [
    { label: "Hims weight loss", href: "/hims", desc: "The consultation, the twelve-month commitment and the refund window." },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh", desc: "Weight loss, hair loss and ED compared." },
    { label: "Online hair loss treatment: Hims vs Mosh", href: "/best-hair-loss-treatment-online-australia", desc: "Guarantees, cancelling and consultation formats side by side." },
    { label: "Moshy vs Juniper", href: "/moshy-vs-juniper", desc: "Two weight-management services built with women in mind." },
  ],
};
