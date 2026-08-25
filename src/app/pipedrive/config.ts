import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { PIPEDRIVE_URL } from "@/lib/affiliate-links";

export const pipedriveConfig: AffiliatePageConfig = {
  brand: "Pipedrive",
  logo: "pipedrive",
  logoWide: true,
  badgeText: "Sales CRM",
  eyebrow: "CRM & sales",
  affiliateUrl: PIPEDRIVE_URL,
  quickAnswer:
    "Pipedrive is a sales CRM built around a visual pipeline: you drag deals through stages, log activities, and let automation handle the follow-up, so nothing stalls. New accounts get a 14-day free trial with no credit card; paid plans start at US$14 per seat per month billed annually.",
  offer: "14-day free trial, no card required",
  atAGlance: [
    { k: "Type", v: "Sales CRM / pipeline" },
    { k: "Best for", v: "Sales teams & SMBs" },
    { k: "Pricing", v: "No free plan; from US$14/seat/mo (annual)" },
  ],
  hero: {
    h1Prefix: "Pipedrive:",
    h1Highlight: "the visual sales CRM that keeps deals moving",
    subheading:
      "A deal-first CRM that shows your whole pipeline at a glance, automates the busywork, and reminds you who to chase, so your team sells instead of updating spreadsheets.",
    trustBullets: ["14-day free trial","No credit card to start","Visual drag-and-drop pipeline"],
  },
  banner: {
    heading: "Start the Pipedrive free trial",
    body: "Import your contacts, set up your pipeline and start tracking deals. 14 days, no card required.",
    buttonLabel: "Try Pipedrive free",
  },
  sections: [
    {
      heading: "What Pipedrive is for",
      paragraphs: [
        "Pipedrive is a customer-relationship manager designed first and foremost around the sales pipeline. Every deal is a card you move left to right through your stages, so anyone can see what is close, what is stuck, and what needs a nudge, without digging through notes.",
        "On top of that it adds activity reminders, email sync, workflow automation and reporting, plus optional add-ons for lead capture and web forms. It suits teams that want a CRM their reps will actually keep up to date.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits small and mid-sized sales teams and founders who want a straightforward, deal-focused CRM that is quick to set up. The visual pipeline is its strength: it makes the state of your sales obvious at a glance.",
        "It is less suited to teams that need a full all-in-one marketing suite baked in, or very large enterprises with heavily customised processes. Pricing is per seat per month and scales with the plan you choose.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Pipedrive through the link and create your account, no card required for the 14-day trial." },
    { num: "2", heading: "Build your pipeline", body: "Set up your deal stages, import contacts from a spreadsheet or another CRM, and add your open deals." },
    { num: "3", heading: "Automate follow-up", body: "Turn on activity reminders and workflow automation so no deal goes cold, then track progress in the reports." },
  ],
  whyUseThis: ["A visual pipeline that shows deal status at a glance","Activity reminders so follow-ups never slip","Workflow automation for repetitive sales admin","Reporting to see what is winning and what is stuck"],
  faqs: [
    { q: "Is there a Pipedrive free trial or discount code?", a: "Yes to the trial: new accounts get a 14-day free trial with no credit card. Pipedrive does not typically publish a public discount code; signing up through our referral link is the most reliable way to start, at no extra cost to you." },
    { q: "How much does Pipedrive cost?", a: "Pipedrive is priced per seat per month. Its entry Lite plan starts at US$14 per seat per month billed annually, with the popular Growth plan US$39 per seat per month annually. Check the current tiers on Pipedrive's pricing page before committing." },
    { q: "Does Pipedrive have a free plan?", a: "No, Pipedrive does not offer a permanent free plan; it offers a 14-day free trial instead. If you specifically need a free-forever CRM tier, a tool like a freemium CRM may suit better, but Pipedrive's trial lets you test everything first." },
    { q: "Is Pipedrive good for a small team?", a: "Yes, that is its sweet spot. It is built to be quick to set up and easy enough that a small sales team keeps it current, while still offering automation and reporting to run a pipeline properly." },
  ],
  relatedLinks: [
      { href: "/best-crm-small-business-australia", label: "Best CRM for small business", desc: "Pipedrive, Capsule, Nutshell and Keap compared by who each suits." },
    { href: "/capsule", label: "Capsule", desc: "A simpler CRM for small teams." },
    { href: "/compare/ai-sales-tools", label: "Compare sales & CRM tools", desc: "See Pipedrive next to the other CRMs and sales tools." },
    { href: "/nutshell", label: "Nutshell", desc: "Another easy CRM with email marketing built in." },
    { href: "/gohighlevel", label: "GoHighLevel", desc: "An all-in-one CRM and marketing platform." },
  ],
  ctas: {
    primary: "See Pipedrive",
    secondary: "Continue to Pipedrive",
    midHeading: "Ready to see your whole pipeline at a glance?",
    midBody: "Start the 14-day free trial through our link, import your deals, and watch them move through your stages.",
    midButton: "Get started",
    bottomHeading: "Run your sales in one place",
    bottomBody: "Set up your pipeline, switch on the follow-up reminders, and see what is actually closing.",
    bottomButton: "Continue to Pipedrive",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Pipedrive before committing.",
};
