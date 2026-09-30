import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { REPLY_IO_URL } from "@/lib/affiliate-links";

export { REPLY_IO_URL };

export const replyioConfig: AffiliatePageConfig = {
  brand: "Reply.io",
  logo: "replyio",
  badgeText: "AI Sales & Automation",
  affiliateUrl: REPLY_IO_URL,
  // Reply.io's pricing page was re-read in a rendered browser on 30 September
  // 2026. It states the 14-day free trial but says nothing about a card, so the
  // old "no card" wording was dropped rather than carried forward.
  offer: "14-day free trial",
  offerCheckedOn: "2026-09-30",

  quickAnswer:
    "Reply.io is a sales engagement platform that automates outbound sequences across email, LinkedIn, calls and SMS, with an AI SDR, B2B contact data and inbox warm-up built in. Its Email Volume plan starts at US$49 per user a month billed annually, the Multichannel plan at US$89, and any new account can start a 14-day free trial (reply.io/pricing, read 30 September 2026). It integrates with HubSpot, Salesforce, Pipedrive, Copper and Close.",

  banner: {
    heading: "Reply.io: AI Sales Engagement Platform",
    body: "Click below to go directly to Reply.io via our affiliate link and see how the multichannel outbound engine works.",
    buttonLabel: "Continue to Reply.io",
  },

  eyebrow: "AI sales & automation",
  atAGlance: [
    { k: "What it is", v: "AI-first multichannel sales engagement platform" },
    { k: "Best for", v: "SMB and mid-market sales teams running outbound" },
    { k: "Price", v: "From US$49/user/mo billed annually; 14-day free trial (read 30 Sep 2026)" },
    { k: "Integrations", v: "HubSpot, Salesforce, Pipedrive and more" },
  ],
  trustStrip: [
    "Multichannel: email, LinkedIn, calls and SMS",
    "AI SDR agents that write and personalise outreach",
    "Built-in B2B data, email finder and inbox warm-up",
    "Integrates with HubSpot, Salesforce and Pipedrive",
  ],
  verdict:
    "Reply.io is the right pick if you want to run and scale your own multichannel outbound rather than fully outsource it to an AI rep. It gives a sales team the sequencing, data, deliverability and AI writing tools in one platform, which suits SMB and mid-market teams that want hands-on control of their sales motion. It is more of a self-serve platform than a done-for-you service, so it rewards teams willing to build and tune their own sequences.",
  verdictPoints: [
    "Runs multichannel sequences across email, LinkedIn, calls and SMS",
    "AI SDR agents draft and personalise outreach at scale",
    "Bundles B2B data, email finder and inbox warm-up for deliverability",
  ],

  hero: {
    h1Prefix: "Reply.io:",
    h1Highlight: "the AI sales engagement platform for multichannel outbound",
    subheading:
      "Reply.io is a sales engagement platform that runs outbound sequences across email, LinkedIn, calls and SMS, and it starts at US$49 per user a month billed annually, with a 14-day free trial (reply.io/pricing, read 30 September 2026). It suits a team already doing outbound that wants the sequencing, data and follow-ups in one place.",
    trustBullets: [
      "Direct access to Reply.io",
      "Covers what Reply.io does, who it suits, and pricing",
      "Explains the multichannel outbound motion in plain terms",
      "Independent view with a disclosed affiliate link",
      "Click through instantly, no steps required on this page",
    ],
  },

  sections: [
    {
      heading: "How much does Reply.io cost?",
      paragraphs: [
        "Read on reply.io/pricing on 30 September 2026, with annual billing: the Email Volume plan starts at US$49 per user a month for 1,000 active contacts a month, with unlimited mailboxes and emails. LinkedIn automation is a US$69 a month add-on per account and calls and SMS a US$29 add-on. The Multichannel plan starts at US$89 per user a month and bundles email, LinkedIn, calls, SMS and unlimited active contacts. Jason, Reply.io's AI SDR, starts at US$500 a month.",
        "Reply.io says annual billing saves up to 17% against monthly. There is no Reply.io discount code; the published way in is the 14-day free trial, which covers the B2B database, multichannel sequences, reports, the API and the AI features. View the latest pricing on Reply.io's own site before you commit.",
      ],
      hasCta: true,
      ctaText: "See Reply.io",
    },
    {
      heading: "What is Reply.io?",
      paragraphs: [
        "Reply.io is an AI-first sales engagement platform. In practice it is the toolkit a sales team uses to run outbound at scale: you build sequences that reach a prospect across email, LinkedIn, calls and SMS, and the platform automates the timing, follow-ups and tracking so nothing falls through the cracks.",
        "On top of the sequencing it layers AI SDR agents that can write and personalise messages, plus a stack of supporting tools: B2B contact data, an email finder, and deliverability features like inbox warm-up that help your emails land. Replies are centralised so your team can qualify and book meetings from one place.",
        "It integrates with CRMs including HubSpot, Salesforce and Pipedrive, so it works alongside the pipeline your team already runs rather than becoming a separate silo.",
      ],
    },
    {
      heading: "Who Reply.io is best for",
      paragraphs: [
        "Reply.io is best for SMB and mid-market sales teams that want to run their own multichannel outbound and keep hands-on control of the sequences, messaging and data. If you have people who will own the outbound motion and want a platform that gives them sequencing, AI writing, data and deliverability in one login, that is the fit.",
        "It suits teams that already have a clear ideal customer profile and want to scale activity efficiently, as well as agencies running outreach for clients. Teams on HubSpot, Salesforce or Pipedrive get extra value from the native integrations.",
        "It is less suited to someone who wants outbound fully done for them with no hands on the wheel; that is closer to a done-for-you AI SDR service. Reply.io rewards teams that will build, test and refine their sequences.",
      ],
    },
    {
      heading: "How the multichannel outbound motion works",
      paragraphs: [
        "It starts with data and a list. Using its B2B data and email finder, you assemble a target list, then build a sequence: a coordinated series of touches such as a personalised email, a LinkedIn step, a call task and a follow-up, each timed automatically.",
        "AI SDR agents help draft and personalise the messaging so you are not writing every variant by hand, while deliverability tools like inbox warm-up work in the background to protect sender reputation. As prospects reply, everything lands in a shared inbox where your team qualifies conversations and books meetings.",
        "Because the whole motion lives in one platform and syncs to your CRM, you get reporting on what is working across channels, which is what lets a team tune sequences over time rather than guessing.",
      ],
    },
    {
      heading: "Judging whether the price is worth it",
      paragraphs: [
        "The way to judge value is against what your team spends today on separate tools for sequencing, data, an email finder and deliverability, since Reply.io bundles those into one platform. For a team actively running outbound, consolidating that stack can be the main saving.",
        "Because there is a 14-day free trial, the lowest-risk approach is to run a small real campaign through it and see whether the deliverability, data quality and reply rates justify the plan you would need.",
      ],
    },
  ],

  steps: [
    {
      num: "01",
      heading: "Click through to Reply.io",
      body: "Use any button on this page to go directly to Reply.io via our affiliate link and see how the platform works.",
    },
    {
      num: "02",
      heading: "Define your target list",
      body: "Use the built-in B2B data and email finder to assemble a clean list that matches your ideal customer profile.",
    },
    {
      num: "03",
      heading: "Build a multichannel sequence",
      body: "Combine email, LinkedIn, calls and SMS touches, and let the AI SDR agents help draft and personalise the messaging.",
    },
    {
      num: "04",
      heading: "Review replies and book meetings",
      body: "Manage responses from the shared inbox, qualify conversations and book meetings, with everything syncing to your CRM.",
    },
  ],

  whyUseThis: [
    "Direct access to Reply.io via our affiliate link",
    "Explains what Reply.io is and what it automates",
    "Covers who it suits: SMB and mid-market sales teams",
    "Sets out pricing as a guide, not a permanent fact",
    "Describes the multichannel outbound motion in plain terms",
  ],

  faqs: [
    {
      q: "Is there a Reply.io discount code?",
      a: "No. There is no Reply.io discount code to find: Reply.io does not publish one and Refer Labs does not have one. Its published offers are the 14-day free trial and a saving of up to 17% for annual billing, both on reply.io/pricing (read 30 September 2026).",
    },
    {
      q: "What is Reply.io?",
      a: "Reply.io is an AI-first sales engagement platform for multichannel outbound. It builds and automates sequences across email, LinkedIn, calls and SMS, includes AI SDR agents that write and personalise messages, and bundles B2B data, an email finder and deliverability tools like inbox warm-up. It integrates with HubSpot, Salesforce and Pipedrive.",
    },
    {
      q: "Who is Reply.io best for?",
      a: "Reply.io is best for SMB and mid-market sales teams, and agencies, that want to run their own multichannel outbound with hands-on control of sequences, messaging and data. It suits teams with a clear ideal customer profile that want sequencing, AI writing, data and deliverability in one platform.",
    },
    {
      q: "How is Reply.io different from an AI SDR like AiSDR?",
      a: "Reply.io is more of a self-serve platform your team drives, giving you the tools to build and run outbound yourself, while a done-for-you AI SDR like AiSDR aims to run the outbound motion for you. Reply.io suits teams that want control and their own operators; a fully managed AI rep suits teams that want pipeline without building the motion in-house.",
    },
    {
      q: "Does Reply.io integrate with my CRM?",
      a: "Yes. Reply.io's pricing page lists direct integrations with Salesforce, HubSpot, Pipedrive, Copper and Close, so it works alongside your existing pipeline and data. Teams already using one of those CRMs tend to get extra value from the native integrations.",
    },
    {
      q: "Does Reply.io help with email deliverability?",
      a: "Yes. Alongside sequencing, Reply.io includes deliverability tooling such as inbox warm-up plus email verification, which are designed to protect sender reputation so more of your outreach reaches the inbox. As with any outbound, results depend on list quality and how you run your sequences.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Best AI Sales Tools", href: "/best-ai-sales-tools" },
    { label: "Reply.io" },
  ],

  relatedLinks: [
    {
      href: "/best-ai-sales-tools",
      label: "Best AI Sales Tools 2026",
      desc: "Reply.io, AiSDR and GoHighLevel compared: sales engagement platform vs AI SDR vs all-in-one, with hedged pricing and what each is best for.",
    },
    {
      href: "/aisdr",
      label: "AiSDR Review",
      desc: "The done-for-you AI sales development rep that prospects, personalises outreach and books meetings.",
    },
    {
      href: "/fullenrich",
      label: "FullEnrich Review",
      desc: "Waterfall B2B contact enrichment that finds verified emails and mobile numbers to feed your outbound.",
    },
    {
      href: "/guides",
      label: "All Guides & Comparisons",
      desc: "Independent comparison guides across tools, health, and business categories.",
    },
  ],

  ctas: {
    primary: "See Reply.io",
    secondary: "Continue to Reply.io",
    midHeading: "Ready to Run Multichannel Outbound?",
    midBody:
      "Click below to go directly to Reply.io via our affiliate link. See how the platform sequences email, LinkedIn, calls and SMS, and books qualified meetings for your team.",
    midButton: "Try Reply.io",
    bottomHeading: "See What Reply.io Can Do",
    bottomBody:
      "Click below to be taken to Reply.io. Explore how the AI sales engagement platform builds sequences, personalises outreach and centralises replies.",
    bottomButton: "Continue to Reply.io",
  },

  disclaimer:
    "You will be taken to the Reply.io site. This page is operated by Refer Labs and contains a disclosed affiliate link. Prices were read in US dollars on reply.io/pricing on 30 September 2026 and can change; view the latest pricing on Reply.io's own site.",
};
