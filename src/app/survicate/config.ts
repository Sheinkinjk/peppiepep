import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { SURVICATE_URL } from "@/lib/affiliate-links";

export const survicateConfig: AffiliatePageConfig = {
  brand: "Survicate",
  badgeText: "Surveys & feedback",
  eyebrow: "Surveys & customer feedback",
  affiliateUrl: SURVICATE_URL,
  quickAnswer:
    "Survicate is a customer-feedback platform for running surveys across your website, email, app and chat, then analysing the responses (with AI) and pushing insights into your other tools. You can start on a free plan; check the current free-tier limits before you rely on it.",
  offer: "Free plan to start",
  atAGlance: [
    { k: "Type", v: "Surveys / customer feedback" },
    { k: "Best for", v: "Product, marketing & CX teams" },
    { k: "Pricing", v: "Free plan; paid from US$114/mo" },
    { k: "Integrations", v: "50+ tools" },
  ],
  hero: {
    h1Prefix: "Survicate:",
    h1Highlight: "ask your customers and actually act on the answers",
    subheading:
      "Run surveys on your website, in emails, in your app or over chat, collect feedback at the moments that matter, and let AI summarise the themes, then send the insights into your CRM and analytics.",
    trustBullets: ["Surveys across web, email & app", "AI-analysed responses", "Free plan to start"],
  },
  banner: {
    heading: "Start collecting feedback free",
    body: "Launch your first survey and see the responses. Start on the free plan, then upgrade if you need more.",
    buttonLabel: "Try Survicate",
  },
  sections: [
    {
      heading: "What Survicate does",
      paragraphs: [
        "Survicate is built to capture customer feedback where it happens, an on-site survey, an email NPS, an in-product prompt after a key action, or a question in chat, rather than a once-a-year survey nobody remembers taking.",
        "The responses feed a single view with AI-assisted analysis that surfaces themes, so product, marketing and CX teams can see what customers actually think and route it to the right place through 50-plus integrations with CRMs, help desks and analytics.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It fits product, marketing and customer-experience teams that want continuous feedback tied into their stack, NPS, CSAT, onboarding surveys and churn reasons. A team that only needs an occasional simple form may find a basic survey tool enough.",
        "Pricing is plan-based and scales with responses and features. Start on the free plan and confirm the current limits and paid tiers before you build reporting on it.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Sign up free", body: "Open Survicate through the link and create a free account." },
    { num: "2", heading: "Build a survey", body: "Pick a template or build your own for web, email, app or chat." },
    { num: "3", heading: "Analyse & route", body: "Read the AI-summarised responses and send insights into your other tools." },
  ],
  whyUseThis: [
    "Surveys across website, email, in-app and chat",
    "AI-assisted analysis to surface themes fast",
    "50+ integrations with CRMs, help desks and analytics",
    "Good for NPS, CSAT, onboarding and churn feedback",
  ],
  faqs: [
    {
      q: "Does Survicate have a free plan?",
      a: "Yes, Survicate offers a free tier so you can run surveys with limited monthly usage. Free-tier limits change, so check the current details on Survicate before relying on it for ongoing reporting.",
    },
    {
      q: "Is there a Survicate discount code?",
      a: "Survicate doesn't typically publish a public promo code. The free plan is the standard way to start, and our referral link takes you to the current offer, at no extra cost to you.",
    },
    {
      q: "What can you use Survicate for?",
      a: "Website and in-app surveys, email NPS and CSAT, onboarding and churn-reason surveys, and general customer feedback, then analysing the results and pushing them into your CRM, help desk or analytics.",
    },
    {
      q: "Does Survicate integrate with my tools?",
      a: "Survicate integrates with 50-plus tools including common CRMs, help desks and analytics platforms. Confirm your specific stack is supported on their integrations page.",
    },
  ],
  ctas: {
    primary: "See Survicate",
    secondary: "Continue to Survicate",
    midHeading: "Ready to hear from your customers?",
    midBody: "Open Survicate through our referral link and launch your first survey on the free plan.",
    midButton: "Try Survicate",
    bottomHeading: "Turn feedback into action",
    bottomBody: "Collect responses across channels, let AI summarise them, and route the insights to your team.",
    bottomButton: "Continue to Survicate",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing, limits and offers change, verify current terms on Survicate before committing.",
};
