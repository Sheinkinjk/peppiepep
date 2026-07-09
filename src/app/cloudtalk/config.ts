import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { CLOUDTALK_URL } from "@/lib/affiliate-links";

export const cloudtalkConfig: AffiliatePageConfig = {
  brand: "CloudTalk",
  badgeText: "Business phone",
  eyebrow: "Business phone & calling",
  affiliateUrl: CLOUDTALK_URL,
  quickAnswer:
    "CloudTalk is an AI-powered business phone and call-centre platform for sales and support teams, with call routing, recording, analytics and AI voice agents. New accounts get a 14-day free trial (no card) plus free minutes to test the AI voice agents.",
  offer: "14-day free trial, no card required",
  atAGlance: [
    { k: "Type", v: "Cloud phone / call centre" },
    { k: "Best for", v: "Sales & support teams" },
    { k: "Pricing", v: "No free plan; from €19/user/mo" },
  ],
  hero: {
    h1Prefix: "CloudTalk:",
    h1Highlight: "the AI phone system for sales and support teams",
    subheading:
      "A cloud call-centre platform that handles inbound and outbound calls with smart routing, recording, real-time analytics, SMS and WhatsApp, and AI voice agents. Built to plug into your CRM.",
    trustBullets: ["14-day free trial", "No credit card to start", "Free AI-voice test minutes"],
  },
  banner: {
    heading: "Start the CloudTalk free trial",
    body: "Set up numbers, connect your CRM and test the AI voice agents. 14 days, no card required.",
    buttonLabel: "Try CloudTalk free",
  },
  sections: [
    {
      heading: "What CloudTalk is for",
      paragraphs: [
        "CloudTalk is a cloud-based business phone system built for teams that make and take a lot of calls, sales floors, support desks and operations. Rather than a desk phone, it runs in the browser and mobile app, so agents can work anywhere while managers keep visibility.",
        "The core is call handling done well: intelligent routing and IVR, call recording and transcripts, queues and callbacks, plus SMS and WhatsApp in the same inbox. On top sits an analytics layer, and newer AI voice agents that can handle routine calls automatically.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits sales and support teams that already use a CRM and want their calling tightly integrated, with the reporting to coach a team. It is less relevant for a solo operator who only needs a single number, where a lighter virtual-phone tool is cheaper.",
        "Pricing is per user per month and scales with the features you switch on, so confirm the current plan for the seats and add-ons you actually need before you commit.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open CloudTalk through the link and create your account, no card required for the 14-day trial." },
    { num: "2", heading: "Set up numbers & CRM", body: "Add or port your numbers, connect your CRM, and configure routing for your team." },
    { num: "3", heading: "Test AI voice agents", body: "Use the free test minutes to try the AI voice agents on routine calls before you scale." },
  ],
  whyUseThis: [
    "Purpose-built call handling: routing, IVR, recording and queues",
    "Analytics to see call volumes, wait times and agent performance",
    "SMS, WhatsApp and AI voice agents alongside voice",
    "Deep CRM integrations so calls log against the right records",
  ],
  faqs: [
    {
      q: "Is there a CloudTalk free trial or discount code?",
      a: "Yes to the trial: new accounts get a 14-day free trial with no credit card, plus free minutes to test the AI voice agents. CloudTalk does not typically publish a public discount code; signing up through our referral link is the most reliable way to start the current offer, at no extra cost to you.",
    },
    {
      q: "How much does CloudTalk cost?",
      a: "CloudTalk is priced per user per month, and the total depends on the plan and any add-ons such as extra numbers or AI features. Because pricing changes, check the current per-seat cost on CloudTalk's pricing page before committing.",
    },
    {
      q: "Does CloudTalk work with my CRM?",
      a: "CloudTalk integrates with common CRMs and helpdesks so calls, recordings and notes sync to the right contact automatically. Confirm your specific tool is supported on their integrations page.",
    },
    {
      q: "Is CloudTalk good for a small team?",
      a: "It suits small-to-mid sales and support teams that want proper call handling and reporting. A single-user setup that only needs one number may find a lighter virtual-phone tool cheaper.",
    },
  ],
  ctas: {
    primary: "See CloudTalk",
    secondary: "Continue to CloudTalk",
    midHeading: "Ready to run your calls in one place?",
    midBody: "Open CloudTalk through our referral link and start the 14-day free trial, no card required.",
    midButton: "Try CloudTalk free",
    bottomHeading: "See what CloudTalk can do",
    bottomBody: "Set up numbers, connect your CRM and test the AI voice agents on the free trial.",
    bottomButton: "Continue to CloudTalk",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on CloudTalk before committing.",
};
