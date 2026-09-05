import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { DATABOX_URL } from "@/lib/affiliate-links";
import { DATABOX, DATABOX_FACTS } from "@/lib/partners/databox";

const d = DATABOX;

export const databoxConfig: AffiliatePageConfig = {
  brand: "Databox",
  logo: "databox",
  badgeText: "KPI dashboards",
  eyebrow: "Analytics & reporting",
  affiliateUrl: DATABOX_URL,
  quickAnswer:
    `There is no Databox discount code, and nobody holds one. The saving that exists is on their own pricing page: the free plan is permanent rather than a trial, covering ${DATABOX_FACTS.freePlan.sources.replace("data sources", "data sources and")} ${DATABOX_FACTS.freePlan.users}, and annual billing takes ${d.annualSaving} off every paid tier. Paid plans run ${DATABOX_FACTS.cheapestPaid.price} to ${d.plans[d.plans.length - 1].price} a month ${d.billing}, read off databox.com on ${d.readOnLabel}.`,
  offer: `${d.trial}. No discount code exists`,
  atAGlance: [
    { k: "Type", v: "KPI dashboards and reporting" },
    { k: "Free plan", v: `Yes, permanent: ${DATABOX_FACTS.freePlan.sources}, ${DATABOX_FACTS.freePlan.users}` },
    { k: "Paid from", v: `${DATABOX_FACTS.cheapestPaid.price}/mo ${d.billing} (${d.readOnShort})` },
    { k: "Discount code", v: "None. Annual billing is the discount" },
  ],
  hero: {
    h1Prefix: "Databox discount code:",
    h1Highlight: `there isn't one, and the free plan is why`,
    subheading:
      `People search for a Databox coupon every month and there is nothing to find. What there is: a free plan that does not expire, and ${d.annualSaving} off any paid tier for paying yearly. This page sets out what each plan actually costs and where the jump happens.`,
    trustBullets: [
      `Free plan: ${DATABOX_FACTS.freePlan.sources}, ${DATABOX_FACTS.freePlan.users}`,
      `Annual billing saves ${d.annualSaving}`,
      `Prices read off databox.com on ${d.readOnShort}`,
    ],
  },
  banner: {
    heading: "Start on the free plan",
    body: `${DATABOX_FACTS.freePlan.sources} and ${DATABOX_FACTS.freePlan.users}, with no expiry and no card. The ${d.trial} sits on top of it if you want the full feature set first.`,
    buttonLabel: "Open Databox",
  },
  sections: [
    {
      heading: "Is there a Databox discount code?",
      paragraphs: [
        "No. Databox publishes no coupon, we hold none, and the sites that rank for this query are mostly listing codes that do not exist. The honest answer is that the discount is structural rather than promotional.",
        `Two things actually reduce what you pay. The free plan is permanent, not a fourteen-day tease, so a single person tracking ${DATABOX_FACTS.freePlan.sources.replace("data sources","sources")} pays nothing indefinitely. And annual billing takes ${d.annualSaving} off every paid tier, which is a larger saving than most coupon codes in this category ever offer.`,
      ],
    },
    {
      heading: "What each plan costs",
      paragraphs: [
        `Every figure below is the annual rate, which is what Databox shows by default. Read off ${d.source} on ${d.readOnLabel}, and pricing changes, so confirm before you buy.`,
      ],
    },
    {
      heading: "Where the price actually jumps",
      paragraphs: [
        `The gap that decides the bill is not ${DATABOX_FACTS.freePlan.price} to ${DATABOX_FACTS.cheapestPaid.price}. It is ${DATABOX_FACTS.cheapestPaid.price} to ${DATABOX_FACTS.teamEntry.price}, because that is where unlimited users start. Everything below it is a single-seat product.`,
        `So the question is not which features you want, it is whether more than one person needs to log in. If the answer is no, ${DATABOX_FACTS.cheapestPaid.name} at ${DATABOX_FACTS.cheapestPaid.price} covers it. If the answer is yes, the entry price is ${DATABOX_FACTS.teamEntry.price} regardless of how few people that is.`,
        `The second variable is data sources. Team plans include three and charge ${d.additionalSource} per source per month after that, so an agency connecting a source per client should cost that line out before comparing plans. Ten extra sources is another ${d.additionalSource.replace("US$","US$")} times ten a month on top of the plan.`,
      ],
    },
    {
      heading: "Who it suits, and who it does not",
      paragraphs: [
        "Databox suits a team that already has data in several tools and wants one dashboard over the top, with the reporting scheduled rather than rebuilt each month. It connects to the usual sources and answers questions about metrics you already collect.",
        "It does not suit someone who needs the underlying data warehoused, transformed or joined in complex ways. It is a reporting layer, not a data platform, and a free tool like Google's own reporting studio covers a simple single-source dashboard at no cost.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start on the free plan", body: `Open Databox and create an account. The free tier covers ${DATABOX_FACTS.freePlan.sources} and ${DATABOX_FACTS.freePlan.users}, with no card and no expiry.` },
    { num: "2", heading: "Connect your sources", body: "Link the tools you already report from. The free plan allows three, which is enough to see whether the dashboards are worth paying for." },
    { num: "3", heading: "Decide on users, not features", body: `If one person needs access, ${DATABOX_FACTS.cheapestPaid.name} at ${DATABOX_FACTS.cheapestPaid.price} is the ceiling. If two do, the entry price is ${DATABOX_FACTS.teamEntry.price}. Choose annual to take ${DATABOX.annualSaving} off either.` },
  ],
  whyUseThis: [
    "A free plan that does not expire, unlike most tools in this category",
    `Annual billing takes ${DATABOX.annualSaving} off, which beats any coupon here`,
    "One dashboard over data you already collect in several tools",
    "Scheduled reporting rather than rebuilding the same deck monthly",
  ],
  ctas: {
    primary: "Open Databox",
    secondary: "Continue to Databox",
    midHeading: "Start free before you price anything",
    midBody: `The free plan is permanent, so you can connect ${DATABOX_FACTS.freePlan.sources.replace("data sources","sources")} and see the dashboards before deciding whether a paid tier is worth it.`,
    midButton: "Open Databox",
    bottomHeading: "See your KPIs in one place",
    bottomBody: `No code exists for Databox. The free plan and ${DATABOX.annualSaving} off annual billing are the savings that do.`,
    bottomButton: "Open Databox",
  },
  faqs: [
    {
      q: "Is there a Databox discount code or coupon?",
      a: `No. Databox publishes no discount code and Refer Labs holds none. The two real savings are the permanent free plan (${DATABOX_FACTS.freePlan.sources}, ${DATABOX_FACTS.freePlan.users}) and annual billing, which takes ${d.annualSaving} off any paid tier. Read off databox.com on ${d.readOnLabel}.`,
    },
    {
      q: "Does Databox have a free plan?",
      a: `Yes, and it does not expire. It covers ${DATABOX_FACTS.freePlan.sources} and ${DATABOX_FACTS.freePlan.users}, with one dashboard or report and ten custom metrics. Separately there is a ${d.trial}, which is the paid feature set rather than an extension of the free plan.`,
    },
    {
      q: "How much does Databox cost?",
      a: `Paid plans run ${DATABOX_FACTS.cheapestPaid.price} a month for ${DATABOX_FACTS.cheapestPaid.name}, ${d.plans[2].price} for ${d.plans[2].name} and ${d.plans[3].price} for ${d.plans[3].name}, all ${d.billing}. Team plans include three data sources and charge ${d.additionalSource} per additional source per month. Read off databox.com on ${d.readOnLabel}.`,
    },
    {
      q: "What is the difference between Analyst and Pro?",
      a: `Users. ${DATABOX_FACTS.cheapestPaid.name} at ${DATABOX_FACTS.cheapestPaid.price} is a single seat. ${DATABOX_FACTS.teamEntry.name} at ${DATABOX_FACTS.teamEntry.price} is where unlimited users begin. If a second person needs to log in, the entry price is ${DATABOX_FACTS.teamEntry.price} whatever else you need.`,
    },
    {
      q: "Is annual billing worth it?",
      a: `It saves ${d.annualSaving} against monthly on Databox's own pricing page, which is larger than any coupon in this category. The trade is the usual one: you commit for a year to get it.`,
    },
    {
      q: "Can I add data sources without upgrading?",
      a: `Databox states that on Pro, Growth and Custom you can add sources at ${d.additionalSource} per source per month on annual billing, so connecting a new client or a new ad account does not force a plan change. Read off databox.com on ${d.readOnLabel}.`,
    },
  ],
  relatedLinks: [
    { href: "/business-software", label: "All business software we cover", desc: "Every tool we compare, grouped by the job it does." },
    { href: "/compare/ai-tools", label: "AI and automation tools", desc: "What the automation layer costs and which tool suits which bottleneck." },
    { href: "/pipedrive", label: "Pipedrive", desc: "The visual sales CRM, and what a seat actually costs." },
  ],
  disclaimer:
    `Pricing read off databox.com on ${d.readOnLabel} and can change, so confirm the current figure on Databox's own site before you buy. Figures are US dollars, as Databox publishes them.`,
};
