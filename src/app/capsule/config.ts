import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { CAPSULE_URL } from "@/lib/affiliate-links";

export const capsuleConfig: AffiliatePageConfig = {
  brand: "Capsule",
  logo: "capsule",
  logoWide: true,
  badgeText: "Simple CRM",
  eyebrow: "Sales CRM",
  affiliateUrl: CAPSULE_URL,
  // Plans and prices read on capsulecrm.com/pricing, rendered in a browser,
  // 30 September 2026.
  quickAnswer:
    "Capsule CRM is free for up to 250 contacts and two users, and its paid Starter plan costs US$18 per user a month billed annually, with a 14-day free trial that needs no card (capsulecrm.com/pricing, read 30 September 2026). It is a simple sales CRM for small businesses: contacts, a visual pipeline, tasks, and emails stored against each contact.",
  offer: "Free plan (up to 250 contacts)",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Simple sales CRM" },
    { k: "Best for", v: "Small businesses wanting an easy CRM" },
    { k: "Pricing", v: "Free up to 250 contacts; Starter US$18/user/mo billed annually (read 30 Sep 2026)" },
    { k: "Start", v: "Free plan, no card" },
  ],
  hero: {
    h1Prefix: "Capsule:",
    h1Highlight: "a simple CRM small teams keep using",
    subheading:
      "Capsule CRM is free for up to 250 contacts and two users, and paid plans start at US$18 per user a month billed annually (capsulecrm.com/pricing, read 30 September 2026). It keeps to the essentials a small team will actually maintain: contacts, a clear pipeline, tasks and email tracking.",
    trustBullets: ["Free plan up to 250 contacts", "Contacts, pipeline and tasks", "Integrates with your email"],
  },
  banner: {
    heading: "Start with Capsule free",
    body: "Add your contacts and set up a pipeline on the free plan. No card required.",
    buttonLabel: "Try Capsule free",
  },
  sections: [
    {
      heading: "How much does Capsule CRM cost?",
      paragraphs: [
        "Read on capsulecrm.com/pricing on 30 September 2026, billed annually: Free is US$0 for up to two users and 250 contacts with one sales pipeline. Starter is US$18 per user a month (30,000 contacts, email templates, a shared mailbox, Xero and Zendesk integrations). Growth is US$36 per user a month and adds workflow automations, multiple pipelines, email sync and AI summaries. Advanced is US$54 per user a month.",
        "Capsule says annual billing saves up to 14% against monthly. Each paid plan comes with a 14-day free trial and no card required. There is no Capsule discount code to find: Capsule does not publish one and Refer Labs does not have one.",
      ],
      hasCta: true,
      ctaText: "Try Capsule free",
    },
    {
      heading: "What Capsule does",
      paragraphs: [
        "Capsule is a customer relationship manager that keeps the essentials in one place: your contacts, the emails and notes you have exchanged, a visual sales pipeline of open opportunities, and the tasks that move each deal forward.",
        "Its appeal is simplicity. It is quick to set up and easy enough that a small team will keep it up to date, which is the difference between a CRM that helps and one that gets abandoned.",
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
      q: "Is there a Capsule CRM discount code?",
      a: "No. Capsule lists no discount code on its own site, and Refer Labs has none to pass on. Its published offers are the free plan (250 contacts, two users), a 14-day no-card trial of each paid plan, and up to 14% off for annual billing.",
    },
    {
      q: "Does Capsule have a free plan?",
      a: "Yes. Capsule has a free plan that supports up to 250 contacts and two users, with the core CRM features. Paid plans raise the contact limits and add features; sign up through our link to start, at no extra cost to you.",
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
      { href: "/best-crm-small-business-australia", label: "Best CRM for small business", desc: "Pipedrive, Capsule, Nutshell and Keap compared by who each suits." },
    { href: "/nutshell", label: "Nutshell", desc: "A sales CRM with email marketing built in." },
    { href: "/pipedrive", label: "Pipedrive", desc: "Another visual, pipeline-first CRM." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Capsule",
    secondary: "Continue to Capsule",
    midHeading: "Ready for a CRM your team will use?",
    midBody: "Open Capsule through our referral link and start on the free plan.",
    midButton: "Try Capsule free",
    bottomHeading: "See Capsule organise your pipeline",
    bottomBody: "Add your contacts and opportunities and see the pipeline at a glance.",
    bottomButton: "Continue to Capsule",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Prices were read in US dollars on Capsule's own page on 30 September 2026 and can change; view the latest pricing on Capsule's site.",
};
