import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { LINDY_URL } from "@/lib/affiliate-links";

export const lindyConfig: AffiliatePageConfig = {
  brand: "Lindy",
  logo: "lindy",
  badgeText: "AI assistant",
  eyebrow: "AI tools",
  affiliateUrl: LINDY_URL,
  quickAnswer:
    "Lindy is an AI work assistant that automates repetitive admin, inbox triage, meeting scheduling, follow-ups and CRM updates, by connecting to the apps you already use. New accounts get a 7-day free trial with no credit card; paid plans start at US$49.99/month.",
  offer: "7-day free trial, no card required",
  atAGlance: [
    { k: "Type", v: "AI work assistant / automation" },
    { k: "Best for", v: "Automating repetitive admin" },
    { k: "Pricing", v: "No free tier; from US$49.99/mo" },
  ],
  hero: {
    h1Prefix: "Lindy:",
    h1Highlight: "an AI assistant that does the repetitive work for you",
    subheading:
      "Lindy connects to Gmail, Slack, Notion, your calendar and CRM, then handles the busywork, sorting the inbox, scheduling, follow-ups and data entry, so you delegate tasks instead of doing them.",
    trustBullets: ["Connects to your existing apps", "Automates inbox, meetings & CRM", "7-day free trial"],
  },
  banner: {
    heading: "Start the Lindy free trial",
    body: "Connect an app or two and hand Lindy a repetitive task. 7 days, no card required.",
    buttonLabel: "Try Lindy free",
  },
  sections: [
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
        "It fits founders, sales and operations people, and anyone drowning in inbox and coordination work. The value depends on how much repetitive, rules-based admin you actually have, if your work is mostly ad-hoc and creative, an AI assistant helps less.",
        "Plans are tiered by usage and connected inboxes, starting US$49.99/month, with higher tiers for more volume. Start on the free trial and confirm current pricing before you subscribe.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Lindy through the link and sign up, no card for the 7-day trial." },
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
      a: "Yes to the trial: new accounts get a 7-day free trial with no credit card. Lindy doesn't typically publish a public promo code; our referral link takes you to the current offer, at no extra cost to you.",
    },
    {
      q: "How much does Lindy cost?",
      a: "Paid plans start US$49.99/month, with higher tiers (US$99.99 and US$199.99) for more usage and connected inboxes, plus an enterprise option. Pricing changes, so confirm the current tiers on Lindy before subscribing.",
    },
    {
      q: "What can Lindy actually do?",
      a: "Repetitive, connected-app work: triaging and drafting emails, scheduling meetings, sending follow-ups and updating your CRM. It is designed to run defined tasks automatically rather than to hold open-ended conversations.",
    },
    {
      q: "Is Lindy worth it?",
      a: "It depends on how much repetitive admin you have. If a meaningful part of your day is inbox and coordination work, automating it can pay for itself; if your work is mostly one-off and creative, the benefit is smaller. The free trial is the low-risk way to find out.",
    },
  ],
  relatedLinks: [
  ],
  ctas: {
    primary: "See Lindy",
    secondary: "Continue to Lindy",
    midHeading: "Ready to delegate the busywork?",
    midBody: "Open Lindy through our referral link and start the 7-day free trial, no card required.",
    midButton: "Try Lindy free",
    bottomHeading: "Hand off the repetitive tasks",
    bottomBody: "Connect your apps and let Lindy handle inbox, scheduling and follow-ups.",
    bottomButton: "Continue to Lindy",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Lindy before committing.",
};
