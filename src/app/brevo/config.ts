import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BREVO_URL } from "@/lib/affiliate-links";

export { BREVO_URL };

export const brevoConfig: AffiliatePageConfig = {
  brand: "Brevo",
  logo: "brevo",
  badgeText: "Email marketing",
  affiliateUrl: BREVO_URL,
  offer: "Free plan forever, no card",
  // Free plan, 300 emails a day and the AUD plan prices re-read on
  // brevo.com/pricing (AUD view) on 30 September 2026.
  offerCheckedOn: "2026-09-30",

  quickAnswer:
    "There is no Brevo discount code: Brevo publishes none and Refer Labs holds none. Brevo's free plan is permanent, sends up to 300 emails a day and needs no card, and the paid Starter plan costs A$12 a month, or A$10.83 a month billed yearly (brevo.com/pricing, AUD view, read 30 September 2026). Brevo (formerly Sendinblue) puts email, SMS and WhatsApp, automation, a sales CRM and transactional email in one tool, priced by emails sent rather than list size.",

  banner: {
    heading: "Brevo: All-in-One Marketing Platform",
    body: "Click below to go directly to Brevo via our affiliate link and see the email, automation and CRM tools.",
    buttonLabel: "Continue to Brevo",
  },

  eyebrow: "Email marketing",
  atAGlance: [
    { k: "What it is", v: "All-in-one email, SMS, automation & CRM" },
    { k: "Best for", v: "Small and mid-sized businesses" },
    { k: "Price", v: "Free plan (300 emails/day); Starter A$12/mo, A$10.83/mo billed yearly (read 30 Sep 2026)" },
    { k: "Priced on", v: "Emails sent, not list size" },
  ],
  trustStrip: [
    "Email, SMS and WhatsApp in one platform",
    "Marketing automation and a built-in CRM",
    "Priced by emails sent, not subscriber count",
    "Free plan to start, with a daily send limit",
  ],
  verdict:
    "Brevo is the right pick if you want more than a newsletter tool: email plus SMS, automation and a CRM in one place, priced on how many emails you send rather than how big your list is. That volume-based pricing suits businesses with large lists who send occasionally. It is broader and more business-focused than a creator-first newsletter platform, so it rewards teams that will use the automation and CRM, not just the send button.",
  verdictPoints: [
    "One platform for email, SMS, automation and a sales CRM",
    "Priced by emails sent, which can favour large but low-frequency lists",
    "A free plan lets you test the workflow before paying",
  ],

  hero: {
    h1Prefix: "Brevo:",
    h1Highlight: "the all-in-one email, automation and CRM platform",
    subheading:
      "There is no Brevo discount code; what Brevo offers instead is a free plan with no card and no expiry that sends up to 300 emails a day, with paid plans from A$12 a month (brevo.com/pricing, read 30 September 2026). Brevo, formerly Sendinblue, puts email, SMS and WhatsApp campaigns, automation, a sales CRM and transactional email in one tool.",
    trustBullets: [
      "Direct access to Brevo",
      "Covers what Brevo does, who it suits, and how pricing works",
      "Explains the email-volume pricing model in plain terms",
      "Independent view with a disclosed affiliate link",
      "Click through instantly, no steps required on this page",
    ],
  },

  sections: [
    {
      heading: "Is there a Brevo discount code?",
      paragraphs: [
        "No. Brevo publishes no discount, promo or coupon code and Refer Labs holds none. The two savings Brevo does publish, both read on brevo.com/pricing on 30 September 2026, are a free plan that never expires (up to 300 emails a day, no card) and 10% off any paid plan when you pay yearly instead of monthly.",
        "Starting free and upgrading later costs nothing, so the free plan is the practical first step: build one automation, check your deliverability, then choose a tier. Our link goes to the same sign-up and adds no code.",
      ],
      hasCta: true,
      ctaText: "See Brevo",
    },
    {
      heading: "What is Brevo?",
      paragraphs: [
        "Brevo, formerly Sendinblue, is an all-in-one marketing and CRM platform. Beyond sending email campaigns it handles SMS and WhatsApp messaging, marketing automation workflows, a built-in sales CRM, landing pages and forms, and transactional email for your app or store.",
        "The distinguishing feature is the pricing model. Brevo is priced primarily by the number of emails you send each month, not by how many subscribers you have. For a business with a large list that emails occasionally, that can work out cheaper than list-size pricing; for high-frequency senders it is worth modelling against the volume tiers.",
        "There is a free plan with a daily send limit, which is enough to build a workflow and test deliverability before you pay.",
      ],
    },
    {
      heading: "Who Brevo is best for",
      paragraphs: [
        "Brevo suits small and mid-sized businesses that want email, SMS, automation and a CRM in one platform rather than a stack of separate tools. It is a strong fit for e-commerce and service businesses that will use the automation and contact management, not just broadcast a newsletter.",
        "Because pricing is by emails sent, it particularly suits businesses with a large contact list who send campaigns occasionally. Creators who want a discovery network and a purely newsletter-first experience may prefer a dedicated newsletter platform instead.",
      ],
    },
    {
      heading: "Brevo pricing, in plain terms",
      paragraphs: [
        "Read on brevo.com/pricing in Australian dollars on 30 September 2026: the Free plan sends up to 300 emails a day. Starter costs A$12 a month, or A$10.83 a month billed yearly, from 5,000 emails a month. Standard, which adds marketing automation, A/B testing and landing pages, costs A$25 a month, or A$22.50 billed yearly. Professional starts at A$824 a month, and Enterprise is custom-priced. Removing the Brevo logo is an A$11.70 monthly add-on on Starter.",
        "Each paid price rises with the monthly email volume you pick. The practical way to judge value is to estimate your monthly sends, match them to the tier, then compare against what a list-size-priced tool would charge for the same list. View the latest pricing on Brevo's own site before you commit.",
      ],
    },
  ],

  steps: [
    { num: "01", heading: "Click through to Brevo", body: "Use any button on this page to go directly to Brevo via our affiliate link." },
    { num: "02", heading: "Start on the free plan", body: "Create an account and import a small list to test sending, automation and the CRM." },
    { num: "03", heading: "Model your send volume", body: "Estimate how many emails you send per month and match it to the right paid tier." },
    { num: "04", heading: "Build one automation", body: "Set up a welcome or abandoned-cart flow to see the automation and CRM working together." },
  ],

  whyUseThis: [
    "Direct access to Brevo via our affiliate link",
    "Explains what Brevo is and what it includes",
    "Covers who it suits: small and mid-sized businesses",
    "Explains the email-volume pricing model, hedged as a guide",
    "Sets out how to judge value against list-size pricing",
  ],

  faqs: [
    {
      q: "What is Brevo?",
      a: "Brevo (formerly Sendinblue) is an all-in-one marketing platform combining email marketing, SMS and WhatsApp, marketing automation, a sales CRM and transactional email. It is aimed at small and mid-sized businesses that want these tools in one place rather than several separate apps.",
    },
    {
      q: "How much does Brevo cost?",
      a: "Brevo's Free plan costs nothing and sends up to 300 emails a day. Starter is A$12 a month (A$10.83 billed yearly) and Standard A$25 a month (A$22.50 billed yearly), each rising with the monthly email volume you choose, read on brevo.com/pricing on 30 September 2026.",
    },
    {
      q: "How is Brevo priced differently from other email tools?",
      a: "Most email platforms charge by the size of your subscriber list. Brevo charges mainly by how many emails you send each month. For a business with a large list that emails occasionally, that can be cheaper; for very frequent senders, model it against the volume tiers first.",
    },
    {
      q: "Who is Brevo best for?",
      a: "Small and mid-sized businesses, especially e-commerce and service teams, that want email, SMS, automation and a CRM in one platform and will use the automation and contact management. Creators wanting a purely newsletter-first tool with a discovery network may prefer a dedicated newsletter platform.",
    },
    {
      q: "Does Brevo have a free plan?",
      a: "Yes. Brevo's free plan never expires, needs no card and sends up to 300 emails a day, which is enough to build and test an email workflow and the CRM before moving to a paid tier.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Newsletter & email tools", href: "/best-newsletter-platform" },
    { label: "Brevo" },
  ],

  relatedLinks: [
    { href: "/brevo-vs-mailchimp", label: "Brevo vs Mailchimp", desc: "Free-plan limits and AUD prices for both, read on each vendor's page." },
    { href: "/activecampaign", label: "ActiveCampaign", desc: "Email marketing with deeper automation." },
    { href: "/best-newsletter-platform", label: "Best Newsletter Platform 2026", desc: "beehiiv vs Substack vs ConvertKit, the creator-first newsletter platforms compared." },
    { href: "/beehiiv", label: "beehiiv Review", desc: "The newsletter platform built for creator growth and monetisation." },
    { href: "/compare/newsletter-platforms", label: "Newsletter platforms hub", desc: "Where to build an email audience, sorted by what each is for." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health and business." },
  ],

  ctas: {
    primary: "See Brevo",
    secondary: "Continue to Brevo",
    midHeading: "Ready to Run Email, SMS and Automation in One Place?",
    midBody: "Click below to go directly to Brevo via our affiliate link and see the platform, starting on the free plan.",
    midButton: "Try Brevo",
    bottomHeading: "See What Brevo Can Do",
    bottomBody: "Click below to be taken to Brevo. Explore the email, automation and CRM tools and start on the free plan.",
    bottomButton: "Continue to Brevo",
  },

  disclaimer:
    "You will be taken to the Brevo site. This page is operated by Refer Labs and contains a disclosed affiliate link. Prices were read in Australian dollars on brevo.com/pricing on 30 September 2026 and can change; view the latest pricing on Brevo's own site.",
};
