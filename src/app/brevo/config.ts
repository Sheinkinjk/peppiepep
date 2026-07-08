import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BREVO_URL } from "@/lib/affiliate-links";

export { BREVO_URL };

export const brevoConfig: AffiliatePageConfig = {
  brand: "Brevo",
  logo: "brevo",
  badgeText: "Email marketing",
  affiliateUrl: BREVO_URL,

  quickAnswer:
    "Brevo (formerly Sendinblue) is an all-in-one marketing platform: email marketing, SMS and WhatsApp campaigns, marketing automation, a built-in sales CRM and transactional email, in one tool. It suits small and mid-sized businesses that want to run email and automation without stitching several apps together. Brevo offers a free plan with a daily send limit, and paid tiers priced by monthly email volume rather than list size. Verify current pricing and limits on the provider.",

  banner: {
    heading: "Brevo: All-in-One Marketing Platform",
    body: "Click below to go directly to Brevo via our affiliate link and see the email, automation and CRM tools.",
    buttonLabel: "Continue to Brevo",
  },

  eyebrow: "Email marketing",
  atAGlance: [
    { k: "What it is", v: "All-in-one email, SMS, automation & CRM" },
    { k: "Best for", v: "Small and mid-sized businesses" },
    { k: "Price", v: "Free plan; paid tiers by email volume (verify)" },
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
    h1Prefix: "Brevo review:",
    h1Highlight: "the all-in-one email, automation and CRM platform",
    subheading:
      "Weighing up Brevo for email marketing and want to know what it actually includes, who it suits, and how its pricing works before you start? This page covers the essentials and takes you directly to Brevo to see it yourself.",
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
      heading: "Access Brevo",
      paragraphs: [
        "This page is for businesses and marketers weighing up Brevo before committing: what the platform includes, how the email-volume pricing works, and who it suits. Rather than piecing it together across review sites, this covers the essentials and takes you straight to Brevo.",
        "Click any button on this page to be taken to Brevo. No details are required here before you arrive.",
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
        "Brevo suits small and mid-sized businesses that want email, SMS, automation and a CRM in one platform rather than a stack of separate tools. It is a strong fit for e-commerce and service businesses that will actually use the automation and contact management, not just broadcast a newsletter.",
        "Because pricing is by emails sent, it particularly suits businesses with a large contact list who send campaigns occasionally. Creators who want a discovery network and a purely newsletter-first experience may prefer a dedicated newsletter platform instead.",
      ],
    },
    {
      heading: "Brevo pricing, in plain terms",
      paragraphs: [
        "Brevo offers a free plan capped by a daily email limit, then paid tiers (commonly a Starter and a Business plan) priced by monthly email volume, with higher tiers unlocking more automation, reporting and removal of Brevo branding. Add-ons and enterprise pricing exist on top.",
        "These plans and limits change, so treat any figure as a guide and verify the current pricing on the provider before you commit. The practical way to judge value is to estimate your monthly send volume and match it to the tier, then compare against what you would pay a list-size-priced tool for the same list.",
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
    "Click any button on this page to go straight to Brevo",
  ],

  faqs: [
    {
      q: "What is Brevo?",
      a: "Brevo (formerly Sendinblue) is an all-in-one marketing platform combining email marketing, SMS and WhatsApp, marketing automation, a sales CRM and transactional email. It is aimed at small and mid-sized businesses that want these tools in one place rather than several separate apps.",
    },
    {
      q: "How much does Brevo cost?",
      a: "Brevo has a free plan with a daily email limit, then paid tiers priced by the number of emails you send per month rather than by list size. Higher tiers add more automation and reporting. Pricing and limits change, so verify the current figures on the provider before committing.",
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
      a: "Yes. Brevo offers a free plan with a daily send limit, which is enough to build and test an email workflow, automation and the CRM before moving to a paid tier. Confirm the current free-plan limits on the provider.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Newsletter & email tools", href: "/best-newsletter-platform" },
    { label: "Brevo" },
  ],

  relatedLinks: [
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
    "You will be taken to the Brevo site. This page is operated by Refer Labs and contains a disclosed affiliate link. Pricing and plan limits are indicative and correct to the best of our knowledge at the time of writing; verify current pricing on the provider.",
};
