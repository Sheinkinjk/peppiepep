import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { PANDADOC_URL } from "@/lib/affiliate-links";

export const pandadocConfig: AffiliatePageConfig = {
  brand: "PandaDoc",
  logo: "pandadoc",
  logoWide: true,
  badgeText: "Docs & e-signature",
  eyebrow: "Documents & e-signature",
  affiliateUrl: PANDADOC_URL,
  quickAnswer:
    "PandaDoc is proposal, quote and contract software with built-in e-signatures. Its Free plan costs US$0 for five documents a month with no credit card, and the paid Starter plan is listed at US$19 per seat a month, with a 14-day free trial (pandadoc.com/pricing, read 30 September 2026).",
  offer: "Free eSign plan; 14-day trial on paid",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Documents, proposals & e-signature" },
    { k: "Best for", v: "Sales teams & small businesses" },
    { k: "Pricing", v: "Free (5 docs/mo); Starter US$19/seat/mo (read 30 Sep 2026)" },
    { k: "Start", v: "Free eSign plan or 14-day trial" },
  ],
  hero: {
    h1Prefix: "PandaDoc:",
    h1Highlight: "proposals, contracts and e-signatures in one tool",
    subheading:
      "PandaDoc is free for five documents a month with no credit card, and its Starter plan is listed at US$19 per seat a month after a 14-day free trial (pandadoc.com/pricing, read 30 September 2026). It puts building, sending, tracking and signing proposals and contracts in one tool.",
    trustBullets: ["Proposals, quotes and contracts", "Built-in e-signatures", "Templates and real-time tracking"],
  },
  banner: {
    heading: "Start with PandaDoc",
    body: "Send your first document for signature. Free eSign plan, or a 14-day trial on paid tiers.",
    buttonLabel: "Try PandaDoc",
  },
  sections: [
    {
      heading: "How much does PandaDoc cost?",
      paragraphs: [
        "Read on pandadoc.com/pricing on 30 September 2026, in US dollars excluding taxes: Free is US$0 for you and your team, limited to five documents a month, with no credit card. Starter is listed at US$19 per seat a month, with unlimited document uploads and e-signatures. Business is US$49 per seat a month and adds custom quotes, CRM integrations, a content library and approval workflows. Enterprise is quoted, per seat or per document.",
        "Paid plans start with a 14-day free trial, and PandaDoc says it charges nothing until you decide to continue. It advertises savings of up to 46% for annual billing. Some features, including the API, CRM integrations and bulk send, need usage credits or a paid add-on. PandaDoc runs no public discount code, and there is no Refer Labs code either.",
      ],
      hasCta: true,
      ctaText: "Try PandaDoc",
    },
    {
      heading: "What PandaDoc does",
      paragraphs: [
        "PandaDoc turns proposals, quotes, contracts and forms into a single automated flow. You build a document from reusable templates and a content library, send it to the client, and collect a legally binding electronic signature, all in one tool instead of juggling a word processor, email and a separate signing app.",
        "It also tracks the document in real time, so you can see when a prospect opens it and which sections they read, and it integrates with CRMs and payment tools so signed deals flow into the rest of your stack.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "PandaDoc suits sales teams, agencies and small businesses that send proposals, quotes or contracts regularly and want to speed up how they are created, sent and signed. The tracking and templates matter most when documents are a routine part of winning work.",
        "There is a free eSign plan for basic signing, and paid tiers add templates, the content library, analytics and CRM integrations; confirm the current plan for your needs before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start free", body: "Open PandaDoc through the link, on the free eSign plan or a 14-day paid trial." },
    { num: "2", heading: "Build from a template", body: "Create a proposal, quote or contract from a template and content library." },
    { num: "3", heading: "Send, track and sign", body: "Send it, watch when it is opened, and collect a binding e-signature." },
  ],
  whyUseThis: [
    "Proposals, quotes and contracts in one tool",
    "Legally binding e-signatures built in",
    "Templates, content library and real-time tracking",
    "Integrates with CRMs and payment tools",
  ],
  faqs: [
    {
      q: "Is there a PandaDoc free plan or discount code?",
      a: "There is a free plan and no code. PandaDoc's Free plan covers five documents a month with no credit card, and paid plans have a 14-day free trial (read 30 September 2026). PandaDoc publishes no discount code and Refer Labs holds none.",
    },
    {
      q: "Who is PandaDoc best for?",
      a: "Sales teams, agencies and small businesses that send proposals, quotes or contracts regularly and want to build, send, track and sign them in one place rather than across several tools.",
    },
    {
      q: "Are PandaDoc signatures legally binding?",
      a: "Yes, PandaDoc provides legally binding electronic signatures under common e-signature laws, with an audit trail. For specific legal requirements in your jurisdiction, confirm the details on their site.",
    },
  ],
  relatedLinks: [
    { href: "/nutshell", label: "Nutshell", desc: "A sales CRM proposals can flow into." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See PandaDoc",
    secondary: "Continue to PandaDoc",
    midHeading: "Ready to close documents faster?",
    midBody: "Open PandaDoc through our referral link and send your first document.",
    midButton: "Try PandaDoc",
    bottomHeading: "See PandaDoc handle your proposals",
    bottomBody: "Build a proposal from a template and send it for signature.",
    bottomButton: "Continue to PandaDoc",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on PandaDoc before committing.",
};
