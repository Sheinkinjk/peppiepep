import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { LINDY_URL } from "@/lib/affiliate-links";

export const lindyConfig: AffiliatePageConfig = {
  brand: "Lindy",
  logo: "lindy",
  badgeText: "AI assistant",
  eyebrow: "AI tools",
  affiliateUrl: LINDY_URL,
  // Plans and trial terms read on lindy.ai/pricing, 30 September 2026. Lindy's
  // own FAQ: "New teammates who join through Slack get their first week free...
  // Direct signups are billed right away." A reader arriving through our link is
  // a direct signup, so the old "7-day free trial, no card" offer was removed.
  quickAnswer:
    "Lindy is an AI work assistant that runs inbox triage, scheduling, follow-ups and CRM updates across the apps you use. Its Plus plan costs US$29.99 per user a month, and Lindy's own FAQ says direct sign-ups are billed straight away, with the free first week reserved for teammates who join through Slack (lindy.ai/pricing, read 30 September 2026).",
  atAGlance: [
    { k: "Type", v: "AI work assistant / automation" },
    { k: "Best for", v: "Automating repetitive admin" },
    { k: "Pricing", v: "No free tier; Plus US$29.99/user/mo (read 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "Lindy:",
    h1Highlight: "an AI assistant that does the repetitive work for you",
    subheading:
      "Lindy starts at US$29.99 per user a month on its Plus plan, and direct sign-ups are billed from day one (lindy.ai/pricing, read 30 September 2026). It connects to Gmail, Slack, Notion, your calendar and CRM, then handles the inbox, scheduling, follow-ups and data entry you delegate to it.",
    trustBullets: ["Connects to your existing apps", "Automates inbox, meetings & CRM", "From US$29.99 per user a month"],
  },
  banner: {
    heading: "See Lindy",
    body: "Connect an app or two and hand Lindy a repetitive task.",
    buttonLabel: "See Lindy",
  },
  sections: [
    {
      heading: "How much does Lindy cost?",
      paragraphs: [
        "Read on lindy.ai/pricing on 30 September 2026, per user a month: Plus is US$29.99 with 3,000 credits, Pro is US$99.99 with 15,000 credits, and Max is US$199.99 with 35,000 credits. Enterprise, with HIPAA compliance and audit logs, is quoted by sales. Credits are pooled across the team, and Lindy pauses rather than overcharging when the pool runs low.",
        "On the trial, Lindy's own FAQ says teammates who join through Slack get their first week free, while direct sign-ups are billed right away. There is no Lindy discount code to find: Lindy does not publish one and Refer Labs does not have one.",
      ],
      hasCta: true,
      ctaText: "See Lindy",
    },
    {
      heading: "What Lindy does",
      paragraphs: [
        "Lindy is an AI assistant built for repeatable work rather than chat. It plugs into the tools you already use, email, calendar, Slack, Notion, HubSpot, Salesforce, and takes over the tasks that eat your day: triaging and drafting email replies, scheduling meetings, sending follow-ups, and keeping CRM records up to date.",
        "You delegate a task once, define how it should run, and Lindy handles it going forward across your connected apps. It suits people who spend a chunk of every day on admin they'd rather automate.",
      ],
    },
    {
      heading: "Who it suits, and the catch",
      paragraphs: [
        "It fits founders, sales and operations people, and anyone drowning in inbox and coordination work. The value depends on how much repetitive, rules-based admin you have, if your work is mostly ad-hoc and creative, an AI assistant helps less.",
        "Plans are tiered by monthly credits, so estimate how much work you will hand over before choosing a tier.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Sign up", body: "Open Lindy through the link and choose a plan; direct sign-ups are billed from the start." },
    { num: "2", heading: "Connect your apps", body: "Link email, calendar and any tools like Slack, Notion or your CRM." },
    { num: "3", heading: "Delegate a task", body: "Hand Lindy a repetitive job, then let it run across your connected apps." },
  ],
  whyUseThis: [
    "Automates inbox, scheduling, follow-ups and CRM updates",
    "Connects to Gmail, Slack, Notion, HubSpot, Salesforce and more",
    "Delegate via the web app or messaging",
    "Best for repeatable, rules-based admin work",
  ],
  faqs: [
    {
      q: "Is there a Lindy free trial or discount code?",
      a: "Only for some sign-ups, and there is no code. Lindy's FAQ says teammates who join through Slack get their first week free and direct sign-ups are billed right away (read 30 September 2026). Lindy lists no discount code on its own site, and Refer Labs has none to pass on.",
    },
    {
      q: "What can Lindy do?",
      a: "Repetitive, connected-app work: triaging and drafting emails, scheduling meetings, sending follow-ups and updating your CRM. It is designed to run defined tasks automatically rather than to hold open-ended conversations.",
    },
    {
      q: "Is Lindy worth it?",
      a: "It depends on how much repetitive admin you have. If a meaningful part of your day is inbox and coordination work, automating it can pay for itself; if your work is mostly one-off and creative, the benefit is smaller. Starting on the Plus plan and moving up only if you run out of credits keeps the first month's cost low.",
    },
  ],
  relatedLinks: [
    { href: "/wing-assistant", label: "Wing Assistant", desc: "A dedicated human virtual assistant for the work an AI agent should not run alone." },
    { href: "/compare/ai-tools", label: "Compare AI tools", desc: "Lindy next to AI voice, presentation and meeting-note tools." },
  ],
  ctas: {
    primary: "See Lindy",
    secondary: "Continue to Lindy",
    midHeading: "Ready to delegate the busywork?",
    midBody: "Open Lindy through our referral link and choose the plan that fits your workload.",
    midButton: "See Lindy",
    bottomHeading: "Hand off the repetitive tasks",
    bottomBody: "Connect your apps and let Lindy handle inbox, scheduling and follow-ups.",
    bottomButton: "Continue to Lindy",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Lindy before committing.",
};
