import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { SURVICATE_URL } from "@/lib/affiliate-links";

export const survicateConfig: AffiliatePageConfig = {
  brand: "Survicate",
  logo: "survicate",
  badgeText: "Surveys & feedback",
  eyebrow: "Surveys & customer feedback",
  affiliateUrl: SURVICATE_URL,
  quickAnswer:
    "Survicate is a customer-feedback survey platform for your website, email, app and chat. Every sign-up starts with a 10-day free trial of its paid features with no card, then drops to a Free plan of 25 responses a month unless you upgrade; the Growth plan costs US$114 a month billed annually (survicate.com/pricing, read 30 September 2026).",
  offer: "Free plan to start; 10-day trial, no card",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Surveys / customer feedback" },
    { k: "Best for", v: "Product, marketing & CX teams" },
    { k: "Pricing", v: "Free plan (25 responses/mo); Growth US$114/mo billed annually (read 30 Sep 2026)" },
    { k: "Integrations", v: "50+ tools" },
  ],
  hero: {
    h1Prefix: "Survicate:",
    h1Highlight: "ask your customers and act on the answers",
    subheading:
      "Survicate is free for 25 survey responses a month after a 10-day, no-card trial of its paid features, and its Growth plan costs US$114 a month billed annually (survicate.com/pricing, read 30 September 2026). It runs surveys on your website, in emails, in your app or over chat, and summarises the answers with AI.",
    trustBullets: ["Surveys across web, email & app", "AI-analysed responses", "Free plan to start"],
  },
  banner: {
    heading: "Start collecting feedback free",
    body: "Launch your first survey and see the responses. Start on the free plan, then upgrade if you need more.",
    buttonLabel: "Try Survicate",
  },
  sections: [
    {
      heading: "Does Survicate have a free plan?",
      paragraphs: [
        "Yes. Read on survicate.com/pricing on 30 September 2026: every account starts with a 10-day free trial of the paid features, with no card required, and then switches to the Free plan unless you upgrade. The Free plan allows up to 25 responses a month, one active survey at a time, up to three team members and 30 days of data retention.",
        "Paid plans: Growth is US$114 a month billed annually for 250 responses a month and 10 seats. Pro starts at US$349 a month and Enterprise at US$569, both with custom response limits. Survicate lists no discount code on its own site, and Refer Labs has none to pass on.",
      ],
      hasCta: true,
      ctaText: "Try Survicate",
    },
    {
      heading: "What Survicate does",
      paragraphs: [
        "Survicate is built to capture customer feedback where it happens, an on-site survey, an email NPS, an in-product prompt after a key action, or a question in chat, rather than a once-a-year survey nobody remembers taking.",
        "The responses feed a single view with AI-assisted analysis that surfaces themes, so product, marketing and CX teams can see what customers think and route it to the right place through 50-plus integrations with CRMs, help desks and analytics.",
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
      q: "Is there a Survicate discount code?",
      a: "No. Neither Survicate nor Refer Labs has a discount code to offer. Its published offers are the 10-day free trial with no card and the Free plan of 25 responses a month.",
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
  relatedLinks: [
    { href: "/flexiquiz", label: "FlexiQuiz", desc: "Build quizzes, tests and assessments." },
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
