import type { HimsPageContent } from "../types";
import { SRC } from "../config";

export const bestWeight: HimsPageContent = {
  slug: "best-mens-weight-loss-program-australia",
  vertical: "weight",
  kind: "versus",
  seoTitle: "Men's Weight Loss Programs Online in Australia: Hims vs Moshy",
  metaDescription:
    "Hims (formerly Pilot) and Moshy compared for Australian men: commitment, money-back terms, practitioner support, coaching and nutrition, and the Refer Labs code for each.",
  eyebrow: "Men's weight loss · Australia",
  h1: "Online men's weight loss programs in Australia: Hims vs Moshy",
  standfirst:
    "This page compares two Australian online weight programs a man can join, Hims (formerly Pilot) and Moshy, Mosh's partner brand for weight, on commitment, refunds and support. In both, a registered practitioner decides whether any treatment is appropriate. Hims' advertised starting offer is a twelve-month pay-upfront option with a 24/7 Care Team. Moshy describes itself as a women's health clinic, takes anyone a practitioner assesses as suitable, and includes in-app coaching and dietitian meal plans; its Refer Labs offer has a three-month minimum. Each offers a 30-day money-back guarantee under its own terms.",
  hub: { label: "Weight loss", href: "/weight-loss" },
  verdictQuestion: "Is Hims or Moshy better for men's weight loss?",
  verdict: [
    "The two differ most on how long you commit and what the program is built around. Hims is built for men and fits someone who expects to stay a year and wants a Care Team at any hour. Moshy is built with women in mind but open to men a practitioner assesses as suitable, and fits someone who wants a shorter first commitment with coaching and meal plans included.",
    "Moshy is Mosh's partner brand and runs its weight offering; Refer Labs' Moshy link and code apply to it.",
  ],
  pair: {
    hims: {
      bestIf: "A twelve-month program built for men, with support at any hour.",
      points: [
        "Advertised starting offer: twelve months, paid upfront",
        "24/7 Care Team of practitioners, health coaches and pharmacists",
        "30-day money-back guarantee from starting",
      ],
    },
    mosh: {
      bestIf: "A shorter first commitment with coaching and meal plans included.",
      points: [
        "Refer Labs offer: three-month minimum",
        "In-app coaching, dietitian meal plans and a community",
        "30-day money-back guarantee",
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
        "You want coaching, meal plans and a community included in the fee.",
        "You'd like to consult by video as well as by phone.",
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
          a: "This page compares two, Hims and Moshy, rather than the whole market. Between them, the choice turns on commitment and support: Hims' advertised offer runs twelve months with a 24/7 Care Team, and Moshy's Refer Labs offer has a three-month minimum with coaching and meal plans included.",
        },
        {
          q: "How much do online weight loss programs cost in Australia?",
          a: "Hims and Moshy both show current pricing on their own sites and confirm it before you pay. Moshy describes its fee as all-inclusive. Compare the total over each minimum commitment: twelve months on Hims' advertised pay-upfront option, three months on Moshy's Refer Labs offer.",
        },
        {
          q: "Can men use Moshy?",
          a: "Yes. Moshy describes itself as an online women's health clinic, but its services are open to anyone a practitioner assesses as suitable. Moshy is Mosh's partner brand and runs Mosh's weight offering.",
        },
        {
          q: "Is Pilot weight loss still available?",
          a: "Not under the Pilot name. Pilot joined the Hims & Hers group, and new patients who start on pilot.com.au are taken to the Hims quiz.",
        },
        {
          q: "Can I get a refund on an online weight loss program?",
          a: "Both programs here offer 30 days. Hims refunds in full if you contact it within 30 days of starting, and Moshy has a 30-day money-back guarantee. Both are under the provider's terms.",
        },
      ],
    },
  ],
  sources: [SRC.himsWeight, SRC.himsFaq, SRC.moshyWeight, SRC.moshyHome, SRC.pilot],
  related: [
    { label: "Hims weight loss", href: "/hims", desc: "The consultation, the twelve-month commitment and the refund window." },
    { label: "Hims vs Mosh", href: "/hims-vs-mosh", desc: "Hair loss and ED compared, and where Moshy fits for weight." },
    { label: "Online hair loss treatment: Hims vs Mosh", href: "/best-hair-loss-treatment-online-australia", desc: "Guarantees, cancelling and consultation formats side by side." },
    { label: "Moshy vs Juniper", href: "/moshy-vs-juniper", desc: "Two weight-management services built with women in mind." },
  ],
};
