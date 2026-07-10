import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { NUTSHELL_URL } from "@/lib/affiliate-links";

export const nutshellConfig: AffiliatePageConfig = {
  brand: "Nutshell",
  logo: "nutshell",
  badgeText: "Sales CRM",
  eyebrow: "CRM & sales",
  affiliateUrl: NUTSHELL_URL,
  quickAnswer:
    "Nutshell is an easy-to-use sales CRM with marketing built in: pipeline and contact management, email sequences, web forms, landing pages and reporting in one tool. New accounts get a 14-day free trial with no credit card; paid plans start at about US$13/user/month.",
  offer: "14-day free trial, no card required",
  atAGlance: [
    { k: "Type", v: "Sales CRM + marketing" },
    { k: "Best for", v: "SMB sales teams" },
    { k: "Pricing", v: "No free plan; from US$13/user/mo" },
  ],
  hero: {
    h1Prefix: "Nutshell:",
    h1Highlight: "an easy sales CRM with marketing built in",
    subheading:
      "A CRM that smaller sales teams actually use, pipeline and contact management, email sequences, web forms, landing pages and reporting in one place, without the cost or complexity of an enterprise platform.",
    trustBullets: ["14-day free trial", "No credit card to start", "CRM and marketing in one"],
  },
  banner: {
    heading: "Start the Nutshell free trial",
    body: "Import your contacts, build your pipeline and send your first sequence. 14 days, no card required.",
    buttonLabel: "Try Nutshell free",
  },
  sections: [
    {
      heading: "What Nutshell is for",
      paragraphs: [
        "Nutshell is a sales CRM built for small and mid-sized teams that want to manage their pipeline without wrestling an enterprise platform. It keeps contacts, leads and deals in one place, shows where each opportunity sits, and automates the follow-up so nothing slips.",
        "What sets it apart at its price is the marketing bundled in: email sequences and broadcasts, web forms, landing pages, and reporting that ties activity back to revenue. For a smaller team, that means a CRM and a basic marketing stack in one subscription rather than two.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits SMB sales teams and founders who want a CRM that is quick to set up and genuinely gets used, with enough automation and reporting to run a pipeline properly. It is a strong middle ground between a bare contact list and a heavy platform.",
        "It is less suited to very large sales orgs with complex, highly customised processes, where a heavier enterprise CRM may be warranted. Pricing is per user per month and scales with the plan, so pick the tier that matches the features you need.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Nutshell through the link and create your account, no card required for the 14-day trial." },
    { num: "2", heading: "Import your contacts", body: "Bring in contacts from a spreadsheet, Google or another CRM, and set up your pipeline stages." },
    { num: "3", heading: "Automate the follow-up", body: "Build email sequences, add web forms, and let Nutshell track deals and remind you to follow up." },
  ],
  whyUseThis: [
    "Pipeline and contact management that is quick to set up",
    "Email sequences, broadcasts and web forms built in",
    "Landing pages and attribution reporting included",
    "Priced for small teams, not enterprise budgets",
  ],
  faqs: [
    {
      q: "Is there a Nutshell free trial or discount code?",
      a: "Yes to the trial: new accounts get a 14-day free trial with no credit card. Nutshell does not typically publish a public discount code; signing up through our referral link is the most reliable way to start, at no extra cost to you.",
    },
    {
      q: "How much does Nutshell cost?",
      a: "Nutshell is priced per user per month. Its entry Foundation plan starts at about US$13/user/month, with the popular Pro plan around US$42/user/month, and annual billing lowers the effective rate. Check the current tiers on Nutshell's pricing page before committing.",
    },
    {
      q: "Does Nutshell include email marketing?",
      a: "Yes. Alongside the CRM, Nutshell includes email sequences and broadcasts, web forms, landing pages and attribution reporting, which is why smaller teams often use it to replace a separate CRM and email tool.",
    },
    {
      q: "Is Nutshell good for a small team?",
      a: "Yes, that is its sweet spot. It is built to be quick to set up and easy enough that a small sales team actually keeps it up to date, while still offering the automation and reporting to run a pipeline properly.",
    },
  ],
  ctas: {
    primary: "See Nutshell",
    secondary: "Continue to Nutshell",
    midHeading: "Ready to run your pipeline in one place?",
    midBody: "Open Nutshell through our referral link and start the 14-day free trial, no card required.",
    midButton: "Try Nutshell free",
    bottomHeading: "See what Nutshell can do",
    bottomBody: "Import your contacts, build your pipeline and send your first sequence on the free trial.",
    bottomButton: "Continue to Nutshell",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Nutshell before committing.",
};
