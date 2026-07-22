import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { PANDADOC_URL } from "@/lib/affiliate-links";

export const pandadocConfig: AffiliatePageConfig = {
  brand: "PandaDoc",
  logo: "pandadoc",
  badgeText: "Docs & e-signature",
  eyebrow: "Documents & e-signature",
  affiliateUrl: PANDADOC_URL,
  quickAnswer:
    "PandaDoc is document-automation software for proposals, quotes, contracts and forms, with built-in e-signatures. You build documents from templates, send them for legally binding signature, and track when they are opened and signed. There is a free eSign plan and a 14-day trial on paid tiers.",
  offer: "Free eSign plan; 14-day trial on paid",
  atAGlance: [
    { k: "Type", v: "Documents, proposals & e-signature" },
    { k: "Best for", v: "Sales teams & small businesses" },
    { k: "Pricing", v: "Free eSign plan; paid from US$19/user/mo" },
    { k: "Start", v: "Free eSign plan or 14-day trial" },
  ],
  hero: {
    h1Prefix: "PandaDoc:",
    h1Highlight: "proposals, contracts and e-signatures in one tool",
    subheading:
      "If proposals and contracts are slow because they bounce between docs, email and a separate signing tool, PandaDoc puts building, sending, tracking and signing in one place. Here is what it does and who it suits.",
    trustBullets: ["Proposals, quotes and contracts", "Built-in e-signatures", "Templates and real-time tracking"],
  },
  banner: {
    heading: "Start with PandaDoc",
    body: "Send your first document for signature. Free eSign plan, or a 14-day trial on paid tiers.",
    buttonLabel: "Try PandaDoc",
  },
  sections: [
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
      a: "Yes to a free plan: PandaDoc has a free eSign plan for basic signing, and a 14-day trial on paid tiers. It does not usually publish a public promo code, so signing up through our referral link is the reliable way to start, at no extra cost to you.",
    },
    {
      q: "How much does PandaDoc cost?",
      a: "PandaDoc has a free eSign plan; paid plans start from US$19 per user per month (Essentials), with a Business tier adding CRM integrations and the content library. Pricing changes, so check current plans before committing.",
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
