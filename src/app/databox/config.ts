import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { DATABOX_URL } from "@/lib/affiliate-links";

export const databoxConfig: AffiliatePageConfig = {
  brand: "Databox",
  logo: "databox",
  badgeText: "Analytics dashboards",
  eyebrow: "Analytics & dashboards",
  affiliateUrl: DATABOX_URL,
  quickAnswer:
    "Databox is a KPI-dashboard and analytics tool that pulls data from 130+ sources, cloud apps, spreadsheets and databases, into unified dashboards and reports. It has a free plan (up to 3 data sources) and a 14-day free trial with no card; paid plans start at about US$64/month.",
  offer: "Free plan; 14-day trial, no card",
  atAGlance: [
    { k: "Type", v: "KPI dashboards / analytics" },
    { k: "Best for", v: "Agencies, SaaS & consultants" },
    { k: "Pricing", v: "Free plan; paid from US$64/mo" },
    { k: "Data sources", v: "130+ integrations" },
  ],
  hero: {
    h1Prefix: "Databox:",
    h1Highlight: "every metric in one dashboard",
    subheading:
      "Connect the tools you already use and pull their numbers into one place, dashboards and automated reports that track your KPIs, so you stop copying data between spreadsheets and start seeing the whole picture.",
    trustBullets: ["Free plan to start","130+ data sources","14-day trial, no card"],
  },
  banner: {
    heading: "Build your first dashboard free",
    body: "Connect a few data sources and see your KPIs update automatically. Free plan, no card required.",
    buttonLabel: "Try Databox free",
  },
  sections: [
    {
      heading: "What Databox is for",
      paragraphs: [
        "Databox pulls the numbers scattered across your tools, analytics, ads, CRM, email, spreadsheets, databases, into unified dashboards. You pick the metrics that matter, and they update automatically, so performance lives in one place instead of ten browser tabs.",
        "On top sit automated reports and alerts, plus AI insights that flag changes. It suits anyone who reports on results regularly and is tired of rebuilding the same spreadsheet every week or month.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits agencies, SaaS teams, consultants and executives who track KPIs across several tools and want one dashboard and repeatable reports. The 130+ integrations mean most of your stack is already supported.",
        "It is less relevant if all your data lives in a single tool that already reports well, or if you need deep custom BI modelling, where a heavier analytics platform fits better. For pulling multiple sources into clear dashboards, Databox is purpose-built.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start free", body: "Open Databox through the link and create a free account, no credit card required." },
    { num: "2", heading: "Connect your sources", body: "Link your analytics, ads, CRM or spreadsheets from the 130+ available integrations." },
    { num: "3", heading: "Build and share", body: "Assemble dashboards for the metrics that matter, then set up automated reports and alerts." },
  ],
  whyUseThis: ["Pulls 130+ data sources into one place","Dashboards and automated reports that update themselves","AI insights and alerts on changes","Free plan and a no-card trial to start"],
  faqs: [
    { q: "Is Databox free, and is there a discount code?", a: "Yes, Databox has a free plan (one user, up to three data sources) plus a 14-day free trial of the paid features with no credit card. It does not usually run a public discount code; starting through our referral link takes you to the current plans, at no extra cost to you." },
    { q: "How much does Databox cost?", a: "There is a free plan for basic use. Paid plans start at about US$64/month (Analyst) for more data sources, with Pro around US$159/month for unlimited users and more frequent syncing. Pricing scales with sources and users, so check the current plans for your needs." },
    { q: "What can Databox connect to?", a: "Databox integrates with 130+ sources, including Google Analytics, ad platforms, CRMs, email tools, spreadsheets and SQL databases. That breadth is the point: it lets you combine metrics from across your stack into single dashboards." },
    { q: "Databox vs building my own spreadsheet, why bother?", a: "A spreadsheet needs rebuilding every reporting cycle and breaks when data changes. Databox connects to your tools once and keeps dashboards and reports updating automatically, with alerts on changes, so you spend time acting on the numbers rather than assembling them." },
  ],
  ctas: {
    primary: "See Databox",
    secondary: "Continue to Databox",
    midHeading: "Tired of pulling numbers from ten different tools?",
    midBody: "Start free through our link, connect your first few data sources, and build a live dashboard.",
    midButton: "Get started",
    bottomHeading: "See every metric in one place",
    bottomBody: "Connect your tools, build the dashboards that matter, and get your KPIs updating automatically.",
    bottomButton: "Continue to Databox",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Databox before committing.",
};
