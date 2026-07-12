import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ACTIVECAMPAIGN_URL } from "@/lib/affiliate-links";

export const activeCampaignConfig: AffiliatePageConfig = {
  brand: "ActiveCampaign",
  badgeText: "Email & automation",
  eyebrow: "Email marketing & automation",
  affiliateUrl: ACTIVECAMPAIGN_URL,
  quickAnswer:
    "ActiveCampaign is an email marketing and automation platform with a built-in CRM: email campaigns, powerful automations, segmentation and sales tools in one place. New accounts get a 14-day free trial with no credit card; paid plans start at about US$15/month for 1,000 contacts billed annually, rising with your list size.",
  offer: "14-day free trial, no card required",
  atAGlance: [
    { k: "Type", v: "Email marketing / automation / CRM" },
    { k: "Best for", v: "SMBs wanting advanced automation" },
    { k: "Pricing", v: "No free plan; from US$15/mo (1,000 contacts)" },
  ],
  hero: {
    h1Prefix: "ActiveCampaign:",
    h1Highlight: "email marketing with serious automation",
    subheading:
      "Run email campaigns, then layer on automations that react to what each contact does, with segmentation and a built-in CRM, so your follow-up is personal without being manual.",
    trustBullets: ["14-day free trial","No credit card to start","Advanced automation builder"],
  },
  banner: {
    heading: "Start the ActiveCampaign free trial",
    body: "Import a list, build your first automation and send a campaign. 14 days, no card required.",
    buttonLabel: "Try ActiveCampaign free",
  },
  sections: [
    {
      heading: "What ActiveCampaign is for",
      paragraphs: [
        "ActiveCampaign combines email marketing with a deep automation engine and a light CRM. You send campaigns and newsletters, but the real power is the visual automation builder: sequences that branch based on opens, clicks, purchases or any tag, so each contact gets a relevant path.",
        "Segmentation, forms and a sales CRM round it out, making it a single tool for turning a list into automated, personalised follow-up. It suits businesses that have outgrown basic email tools.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits small and mid-sized businesses that want more than send-and-hope email, and are ready to use automation and segmentation properly. If you value a powerful automation builder, it is one of the strongest options.",
        "It is less suited to someone who only needs a simple newsletter, where a lighter or free-tier tool is cheaper. Pricing is by contact volume, so costs rise as your list grows, on every plan.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open ActiveCampaign through the link and sign up, no card required for the 14-day trial." },
    { num: "2", heading: "Import and segment", body: "Bring in your contacts, add tags and build the segments you want to message differently." },
    { num: "3", heading: "Build an automation", body: "Use the visual builder to create a welcome or follow-up sequence, then send your first campaign." },
  ],
  whyUseThis: ["A genuinely powerful visual automation builder","Email, segmentation and a CRM in one tool","Automations that react to each contact's behaviour","Scales from newsletters to full lifecycle marketing"],
  faqs: [
    { q: "Is there an ActiveCampaign free trial or discount code?", a: "Yes to the trial: new accounts get a 14-day free trial, no credit card required. ActiveCampaign does not typically publish a public discount code; signing up through our referral link is the most reliable way to start, at no extra cost to you." },
    { q: "How much does ActiveCampaign cost?", a: "Pricing is by contact volume. The entry Starter plan begins at about US$15/month for 1,000 contacts billed annually, with the popular Pro plan around US$79/month; every plan's price rises as your list grows. Check the current tiers for your list size before committing." },
    { q: "Does ActiveCampaign have a free plan?", a: "No, there is no permanent free plan; it offers a 14-day free trial instead. If you only need a simple free newsletter tool, a freemium email platform may suit better, but the trial lets you test the automation first." },
    { q: "ActiveCampaign vs a basic email tool, what's the difference?", a: "Basic tools send broadcasts to a list. ActiveCampaign adds an automation engine that reacts to each contact's behaviour, plus segmentation and a CRM, so follow-up is personalised and hands-off. It is the step up when send-and-hope email stops being enough." },
  ],
  ctas: {
    primary: "See ActiveCampaign",
    secondary: "Continue to ActiveCampaign",
    midHeading: "Ready to make your email do the work?",
    midBody: "Start the 14-day free trial through our link, import a list, and build your first automation.",
    midButton: "Get started",
    bottomHeading: "Turn a list into automated follow-up",
    bottomBody: "Send a campaign, then let an automation handle the follow-up based on what each contact does.",
    bottomButton: "Continue to ActiveCampaign",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on ActiveCampaign before committing.",
};
