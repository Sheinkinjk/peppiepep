import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { KEAP_URL } from "@/lib/affiliate-links";

export const keapConfig: AffiliatePageConfig = {
  brand: "Keap",
  logo: "keap",
  logoWide: true,
  badgeText: "CRM & automation",
  eyebrow: "Sales & marketing automation",
  affiliateUrl: KEAP_URL,
  quickAnswer:
    "Keap is an all-in-one CRM with sales and marketing automation built for small businesses: it combines contact management, a sales pipeline, email and SMS marketing, and automated follow-up in one platform. There is a 14-day free trial, and pricing scales with your number of contacts.",
  offer: "14-day free trial",
  atAGlance: [
    { k: "Type", v: "CRM + sales & marketing automation" },
    { k: "Best for", v: "Small businesses & solopreneurs" },
    { k: "Pricing", v: "No free plan; from US$249/mo" },
    { k: "Start", v: "14-day free trial" },
  ],
  hero: {
    h1Prefix: "Keap:",
    h1Highlight: "CRM and follow-up automation in one place for small business",
    subheading:
      "If leads slip through the cracks because follow-up is manual, Keap combines a CRM, pipeline, email and SMS, and automation so the chasing happens on its own. Here is what it does, who it suits, and how pricing works.",
    trustBullets: ["CRM, pipeline and automation in one", "Email + SMS marketing built in", "14-day free trial"],
  },
  banner: {
    heading: "Start the Keap free trial",
    body: "See the CRM, pipeline and automation together. 14 days, then pricing scales with your contacts.",
    buttonLabel: "Try Keap free",
  },
  sections: [
    {
      heading: "What Keap does",
      paragraphs: [
        "Keap brings a CRM together with the marketing and follow-up that usually lives in separate tools. Contacts, deals and a sales pipeline sit alongside email and SMS campaigns, landing pages and forms, and automations that trigger the next step when a lead acts.",
        "The point is that follow-up stops being manual. A new lead can be tagged, emailed, and moved through a sequence automatically, so a small team behaves like a much larger one without extra admin.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "Keap fits small businesses, coaches, agencies and solopreneurs who are losing revenue to inconsistent follow-up and want the CRM and the automation in one system rather than stitched together. It is heavier than a simple contact list, so it rewards businesses that will actually use the automation.",
        "Pricing scales with your number of contacts, so it is worth being clear about your list size when you compare plans.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Keap through the link and start the 14-day free trial." },
    { num: "2", heading: "Import your contacts", body: "Bring in your list and set up your pipeline stages." },
    { num: "3", heading: "Automate follow-up", body: "Build an email/SMS sequence so new leads are chased automatically." },
  ],
  whyUseThis: [
    "CRM, sales pipeline and automation in one platform",
    "Email and SMS marketing built in",
    "Automations that trigger follow-up without manual work",
    "Landing pages and forms to capture leads",
  ],
  faqs: [
    {
      q: "Is there a Keap free trial or discount code?",
      a: "Yes to the trial: Keap offers a 14-day free trial. It does not usually publish a public promo code, so signing up through our referral link is the reliable way to start the current offer, at no extra cost to you.",
    },
    {
      q: "How much does Keap cost?",
      a: "Keap does not have a free plan, and pricing scales with your number of contacts, starting from US$249/month. Because pricing changes, check the current plan for your list size on Keap before committing.",
    },
    {
      q: "Who is Keap best for?",
      a: "Small businesses, coaches, agencies and solopreneurs who want a CRM plus marketing and follow-up automation in one place, and who are losing leads to manual, inconsistent follow-up.",
    },
    {
      q: "What is the difference between Keap and a simple CRM?",
      a: "A simple CRM stores contacts and deals. Keap adds the marketing and automation layer, email and SMS campaigns, sequences and triggers, so the follow-up runs automatically rather than relying on someone remembering to do it.",
    },
  ],
  relatedLinks: [
      { href: "/best-crm-small-business-australia", label: "Best CRM for small business", desc: "Pipedrive, Capsule, Nutshell and Keap compared by who each suits." },
    { href: "/nutshell", label: "Nutshell", desc: "An easy sales CRM with email marketing built in." },
    { href: "/pipedrive", label: "Pipedrive", desc: "A simpler, visual, pipeline-first CRM." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Keap",
    secondary: "Continue to Keap",
    midHeading: "Ready to stop losing leads to manual follow-up?",
    midBody: "Open Keap through our referral link and start the 14-day free trial.",
    midButton: "Try Keap free",
    bottomHeading: "See Keap run your follow-up",
    bottomBody: "Set up a pipeline and an automated sequence during the trial.",
    bottomButton: "Continue to Keap",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Keap before committing.",
};
