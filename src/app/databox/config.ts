import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { DATABOX_URL } from "@/lib/affiliate-links";
import { DATABOX, DATABOX_FACTS } from "@/lib/partners/databox";

const d = DATABOX;
const free = DATABOX_FACTS.freePlan;
const analyst = DATABOX_FACTS.cheapestPaid;
const team = DATABOX_FACTS.teamEntry;
const top = DATABOX_FACTS.topListed;

export const databoxConfig: AffiliatePageConfig = {
  brand: "Databox",
  logo: "databox",
  badgeText: "KPI dashboards",
  eyebrow: "Analytics & reporting",
  affiliateUrl: DATABOX_URL,
  quickAnswer:
    `There is no Databox discount code: Databox publishes none and Refer Labs holds none. The savings Databox does publish are a free plan that never expires (${free.sources}, ${free.users}), ${d.annualSaving} off every paid plan for paying yearly, and a ${d.trial}. Paid plans run ${analyst.price} to ${top.price} a month ${d.billing}, read off databox.com on ${d.readOnLabel}.`,
  offer: `${d.trial}. No discount code exists`,
  offerCheckedOn: d.readOn,
  atAGlance: [
    { k: "Type", v: "KPI dashboards and reporting" },
    { k: "Free plan", v: `Yes, permanent: ${free.sources}, ${free.users}` },
    { k: "Paid from", v: `${analyst.price}/mo ${d.billing} (${d.readOnShort})` },
    { k: "Discount code", v: "None. Annual billing is the discount" },
  ],
  hero: {
    h1Prefix: "Databox discount code:",
    h1Highlight: `there isn't one, and the free plan is why`,
    subheading:
      `Neither Databox nor Refer Labs has a discount code to offer. What Databox does offer, read on its pricing page on ${d.readOnLabel}: a free plan that never expires, ${d.annualSaving} off any paid plan for paying yearly, and a ${d.trial}, with paid plans from ${analyst.price} a month ${d.billing}.`,
    trustBullets: [
      `Free plan: ${free.sources}, ${free.users}`,
      `Annual billing saves ${d.annualSaving}`,
      `Prices read off databox.com on ${d.readOnShort}`,
    ],
  },
  banner: {
    heading: "Start on the free plan",
    body: `${free.sources} and ${free.users}, with no expiry and no card. The ${d.trial} sits on top of it if you want a paid feature set first.`,
    buttonLabel: "Open Databox",
  },
  sections: [
    {
      heading: "Is there a Databox discount code?",
      paragraphs: [
        "No. Databox publishes no coupon and Refer Labs holds none. The saving on Databox is built into the plans rather than offered as a code.",
        `The free plan is permanent, so a single person tracking ${free.sources.replace("data sources", "sources")} pays nothing indefinitely. Annual billing takes ${d.annualSaving} off every paid plan, and any paid plan can be trialled for 14 days without a card.`,
      ],
    },
    {
      heading: "How much does Databox cost?",
      paragraphs: [
        `Read off ${d.source} on ${d.readOnLabel}, billed annually: ${free.name} is ${free.price} (${free.sources}, ${free.users}). ${analyst.name} is ${analyst.price} a month (${analyst.sources}, ${analyst.users}), or ${analyst.monthly} billed monthly. ${team.name} is ${team.price} a month (${team.sources}, ${team.users}), or ${team.monthly} billed monthly. ${top.name} is ${top.price} a month (${top.sources}, ${top.users}). A Custom plan, where Databox builds the setup for you, is quoted.`,
        "Figures are US dollars, as Databox publishes them. Databox changed its plan line-up during September 2026: the Pro and Growth plans quoted on older pages no longer appear on its pricing page.",
      ],
    },
    {
      heading: "Where the price jumps",
      paragraphs: [
        `The gap that decides the bill is ${analyst.price} to ${team.price}, because that is where a second seat starts. Free and ${analyst.name} are single-user plans.`,
        `So the first question is how many people need to log in. If only one, ${analyst.name} at ${analyst.price} covers five data sources. If two or three, the entry price is ${team.price} however few extra people that is.`,
      ],
    },
    {
      heading: "Who it suits, and who it does not",
      paragraphs: [
        "Databox suits a team that already has data in several tools and wants one dashboard over the top, with the reporting scheduled rather than rebuilt each month. It connects to the usual sources and answers questions about metrics you already collect.",
        "It does not suit someone who needs the underlying data warehoused, transformed or joined in complex ways. It is a reporting layer over your tools, and a free tool like Google's own reporting studio covers a simple single-source dashboard at no cost.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start on the free plan", body: `Open Databox and create an account. The free tier covers ${free.sources} and ${free.users}, with no card and no expiry.` },
    { num: "2", heading: "Connect your sources", body: "Link the tools you already report from. The free plan allows three, which is enough to see whether the dashboards are worth paying for." },
    { num: "3", heading: "Decide on seats first", body: `If one person needs access, ${analyst.name} at ${analyst.price} is the ceiling. If more do, the entry price is ${team.price}. Choose annual to take ${d.annualSaving} off either.` },
  ],
  whyUseThis: [
    "A free plan that does not expire",
    `Annual billing takes ${d.annualSaving} off every paid plan`,
    "One dashboard over data you already collect in several tools",
    "Scheduled reporting rather than rebuilding the same deck monthly",
  ],
  ctas: {
    primary: "Open Databox",
    secondary: "Continue to Databox",
    midHeading: "Start free before you price anything",
    midBody: `The free plan is permanent, so you can connect ${free.sources.replace("data sources", "sources")} and see the dashboards before deciding whether a paid plan is worth it.`,
    midButton: "Open Databox",
    bottomHeading: "See your KPIs in one place",
    bottomBody: `No code exists for Databox. The free plan and ${d.annualSaving} off annual billing are the savings that do.`,
    bottomButton: "Open Databox",
  },
  faqs: [
    {
      q: "Does Databox have a free plan?",
      a: `Yes, and it does not expire. It covers ${free.sources} and ${free.users}, with 50 AI credits a month. Separately, any paid plan can be trialled free for 14 days with no credit card, which is the paid feature set rather than an extension of the free plan.`,
    },
    {
      q: "What is the difference between Analyst and Team?",
      a: `Seats and sources. ${analyst.name} at ${analyst.price} a month is a single user with ${analyst.sources}. ${team.name} at ${team.price} is ${team.users} and ${team.sources}, and ${top.name} at ${top.price} is ${top.users} and ${top.sources}, all ${d.billing} (read ${d.readOnLabel}).`,
    },
    {
      q: "Is annual billing worth it?",
      a: `It saves ${d.annualSaving} against monthly on Databox's own pricing page: ${analyst.name} is ${analyst.price} a month billed annually against ${analyst.monthly} monthly. The trade is the usual one: you commit for a year to get it.`,
    },
    {
      q: "Do I need a credit card for the Databox trial?",
      a: "No. Databox's pricing FAQ says the 14-day free trial starts without payment details, and the first payment is taken only after the trial ends if you choose a paid plan.",
    },
  ],
  relatedLinks: [
    { href: "/business-software", label: "All business software we cover", desc: "Every tool we compare, grouped by the job it does." },
    { href: "/compare/ai-tools", label: "AI and automation tools", desc: "What the automation layer costs and which tool suits which bottleneck." },
    { href: "/pipedrive", label: "Pipedrive", desc: "The visual sales CRM, and what a seat costs." },
  ],
  disclaimer:
    `Pricing read off databox.com on ${d.readOnLabel} and can change, so view the latest pricing on Databox's own site before you buy. Figures are US dollars, as Databox publishes them.`,
};
