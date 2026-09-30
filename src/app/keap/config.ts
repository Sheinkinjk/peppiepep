import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { KEAP_URL } from "@/lib/affiliate-links";

export const keapConfig: AffiliatePageConfig = {
  brand: "Keap",
  logo: "keap",
  logoWide: true,
  badgeText: "CRM & automation",
  eyebrow: "Sales & marketing automation",
  affiliateUrl: KEAP_URL,
  // Re-read keap.com/pricing and keap.com, rendered, on 30 September 2026.
  // Keap now shows "Starting at $299/mo (Billed monthly)" and "Required
  // implementation services", and offers no free trial: every call to action
  // is "Get a demo", and keap.com/free-trial redirects to the homepage. Our
  // referral link lands on the same homepage. The old "14-day free trial" and
  // "billed at US$2,988 a year" (read 5 Sep) were both removed.
  quickAnswer:
    "Keap is a CRM with sales and marketing automation for small businesses, sold as one platform starting at US$299 a month, billed monthly, plus required implementation services (keap.com/pricing, read 30 September 2026). Keap no longer shows a free trial; the way in is a free demo. It combines contacts, a sales pipeline, email and text marketing, landing pages, payments and automated follow-up.",
  offer: "Free demo",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "CRM + sales & marketing automation" },
    { k: "Best for", v: "Small businesses & solopreneurs" },
    { k: "Pricing", v: "From US$299/mo billed monthly, plus implementation (read 30 Sep 2026)" },
    { k: "Start", v: "Free demo; no free trial or free plan" },
  ],
  hero: {
    h1Prefix: "Keap:",
    h1Highlight: "CRM and follow-up automation in one place for small business",
    subheading:
      "Keap costs US$299 a month, billed monthly, for its whole platform, and Keap requires paid implementation services on top (keap.com/pricing, read 30 September 2026). It combines a CRM, pipeline, email and text marketing and automation so follow-up happens on its own.",
    trustBullets: ["CRM, pipeline and automation in one", "Email + SMS marketing built in", "Free demo"],
  },
  banner: {
    heading: "Book a Keap demo",
    body: "See the CRM, pipeline and automation together on a demo before you commit.",
    buttonLabel: "Book a Keap demo",
  },
  sections: [
    {
      heading: "How much does Keap cost?",
      paragraphs: [
        "Keap has dropped feature-based plans. Read on keap.com/pricing on 30 September 2026, the whole platform, covering CRM, automation, email and text, pipeline, landing pages, payments, appointments and reporting, starts at US$299 a month, billed monthly. The price is set by your number of users and contacts, which the page lets you adjust.",
        "Keap also lists implementation services as required: strategy consulting, data import and migration, sold as packages on top of the subscription. Keap offers no free plan and no longer shows a free trial; it invites buyers to ask about current promotional offers on a demo or call. Keap lists no discount code on its own site, and Refer Labs has none to pass on.",
      ],
      hasCta: true,
      ctaText: "Book a Keap demo",
    },
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
        "Keap fits small businesses, coaches, agencies and solopreneurs who are losing revenue to inconsistent follow-up and want the CRM and the automation in one system rather than stitched together. It is heavier than a simple contact list, so it rewards businesses that will use the automation.",
        "The subscription price moves with your users and contacts, and implementation is an extra cost, so get both figures on the demo before comparing Keap with a CRM you can set up yourself.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Book a demo", body: "Open Keap through the link and book a demo; ask for the price at your user and contact count." },
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
      a: "Neither, as of 30 September 2026. Keap's site shows no free trial and no free plan, and every call to action is a demo. Neither Keap nor Refer Labs has a discount code to offer; its pricing page invites you to ask about current promotional offers.",
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
    midBody: "Open Keap through our referral link and book a demo.",
    midButton: "Book a Keap demo",
    bottomHeading: "See Keap run your follow-up",
    bottomBody: "Ask on the demo to see a pipeline and an automated sequence built for your business.",
    bottomButton: "Continue to Keap",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Keap before committing.",
};
