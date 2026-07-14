import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { CAPSULE_URL } from "@/lib/affiliate-links";

export const capsuleConfig: AffiliatePageConfig = {
  brand: "Capsule",
  logo: "capsule",
  badgeText: "Simple CRM",
  eyebrow: "Sales CRM",
  affiliateUrl: CAPSULE_URL,
  quickAnswer:
    "Capsule is a simple, easy-to-use CRM for small businesses: it manages contacts, tracks a sales pipeline, stores your emails and notes against each contact, and adds light task management. There is a free plan for up to 250 contacts and two users, with paid plans that raise the limits.",
  offer: "Free plan (up to 250 contacts)",
  atAGlance: [
    { k: "Type", v: "Simple sales CRM" },
    { k: "Best for", v: "Small businesses wanting an easy CRM" },
    { k: "Pricing", v: "Free up to 250 contacts; paid from ~US$18/user/mo" },
    { k: "Start", v: "Free plan, no card" },
  ],
  hero: {
    h1Prefix: "Capsule:",
    h1Highlight: "a simple CRM small teams actually keep using",
    subheading:
      "Most CRMs are abandoned because they are too heavy. Capsule keeps it to the essentials: contacts, a clear pipeline, tasks and email tracking. Here is what it does, who it suits, and how the free plan works.",
    trustBullets: ["Free plan up to 250 contacts", "Contacts, pipeline and tasks", "Integrates with your email"],
  },
  banner: {
    heading: "Start with Capsule free",
    body: "Add your contacts and set up a pipeline on the free plan. No card required.",
    buttonLabel: "Try Capsule free",
  },
  sections: [
    {
      heading: "What Capsule does",
      paragraphs: [
        "Capsule is a customer relationship manager that keeps the essentials in one place: your contacts, the emails and notes you have exchanged, a visual sales pipeline of open opportunities, and the tasks that move each deal forward.",
        "Its appeal is simplicity. It is quick to set up and easy enough that a small team will actually keep it up to date, which is the difference between a CRM that helps and one that gets abandoned.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "Capsule suits small businesses, consultants and teams who want an organised view of contacts and deals without the complexity and cost of an enterprise CRM. If you need heavy marketing automation, a more powerful platform will fit better.",
        "The free plan covers up to 250 contacts and two users, so you can trial it properly before paying; paid plans raise the contact and feature limits.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start free", body: "Open Capsule through the link and create your free account." },
    { num: "2", heading: "Add contacts", body: "Import your contacts and connect your email." },
    { num: "3", heading: "Track your pipeline", body: "Add opportunities and move them through your pipeline stages." },
  ],
  whyUseThis: [
    "Simple, fast CRM small teams keep using",
    "Free plan for up to 250 contacts and two users",
    "Visual sales pipeline and task management",
    "Stores emails and notes against each contact",
  ],
  faqs: [
    {
      q: "Does Capsule have a free plan?",
      a: "Yes. Capsule has a free plan that supports up to 250 contacts and two users, with the core CRM features. Paid plans raise the contact limits and add features; sign up through our link to start, at no extra cost to you.",
    },
    {
      q: "How much does Capsule cost?",
      a: "Capsule is free up to 250 contacts and two users, then paid plans start from around US$18 per user per month at the time of writing, scaling with contacts and features. Check current pricing on Capsule before committing.",
    },
    {
      q: "Who is Capsule best for?",
      a: "Small businesses, consultants and teams who want an easy, organised CRM for contacts and a sales pipeline without enterprise complexity. It is less suited to teams that need heavy marketing automation.",
    },
    {
      q: "Does Capsule work with my email?",
      a: "Yes. Capsule integrates with common email tools so messages and notes are stored against the right contact. Confirm your specific email provider is supported on their site.",
    },
  ],
  relatedLinks: [
    { href: "/nutshell", label: "Nutshell", desc: "A sales CRM with email marketing built in." },
    { href: "/pipedrive", label: "Pipedrive", desc: "Another visual, pipeline-first CRM." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Capsule",
    secondary: "Continue to Capsule",
    midHeading: "Ready for a CRM your team will actually use?",
    midBody: "Open Capsule through our referral link and start on the free plan.",
    midButton: "Try Capsule free",
    bottomHeading: "See Capsule organise your pipeline",
    bottomBody: "Add your contacts and opportunities and see the pipeline at a glance.",
    bottomButton: "Continue to Capsule",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Capsule before committing.",
};
