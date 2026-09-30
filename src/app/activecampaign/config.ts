import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ACTIVECAMPAIGN_URL } from "@/lib/affiliate-links";

export const activeCampaignConfig: AffiliatePageConfig = {
  brand: "ActiveCampaign",
  logo: "activecampaign",
  badgeText: "Email & automation",
  eyebrow: "Email marketing & automation",
  affiliateUrl: ACTIVECAMPAIGN_URL,
  // Prices read in AUD on activecampaign.com/pricing, rendered in a browser,
  // 30 September 2026; the 14-day, no-card trial read on the same page.
  quickAnswer:
    "ActiveCampaign is an email marketing and automation platform with a built-in CRM. In Australian dollars its Starter plan starts at A$23 a month for 1,000 contacts billed annually, and new accounts get a 14-day free trial with no credit card (activecampaign.com/pricing, read 30 September 2026). Every plan's price rises with the size of your list.",
  offer: "14-day free trial, no card required",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Email marketing / automation / CRM" },
    { k: "Best for", v: "SMBs wanting advanced automation" },
    { k: "Pricing", v: "No free plan; from A$23/mo billed annually, 1,000 contacts (read 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "ActiveCampaign:",
    h1Highlight: "email marketing with serious automation",
    subheading:
      "ActiveCampaign is email marketing with a visual automation builder and a built-in CRM, and in Australia it starts at A$23 a month for 1,000 contacts billed annually, after a 14-day free trial that needs no card (activecampaign.com/pricing, read 30 September 2026). It suits a business that has outgrown send-and-hope newsletters.",
    trustBullets: ["14-day free trial","No credit card to start","Advanced automation builder"],
  },
  banner: {
    heading: "Start the ActiveCampaign free trial",
    body: "Import a list, build your first automation and send a campaign. 14 days, no card required.",
    buttonLabel: "Try ActiveCampaign free",
  },
  sections: [
    {
      heading: "How much does ActiveCampaign cost in Australia?",
      paragraphs: [
        "Read in Australian dollars on activecampaign.com/pricing on 30 September 2026, for 1,000 email contacts billed annually: Starter A$23 a month (one user, five actions per automation), Plus A$74 (unlimited automation actions, landing pages), Pro A$119 (three users, advanced segmentation and conditional content) and Enterprise A$218 (five users, SSO and a dedicated account team).",
        "Those are starting prices. Every plan rises as your contact count grows, so price your real list size on ActiveCampaign's own page before you commit. There is no free plan and no discount code; the published offers are the 14-day free trial with no card and ActiveCampaign's own 30-day results guarantee, which offers your money back.",
      ],
      hasCta: true,
      ctaText: "Try ActiveCampaign free",
    },
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
  whyUseThis: ["A powerful visual automation builder","Email, segmentation and a CRM in one tool","Automations that react to each contact's behaviour","Scales from newsletters to full lifecycle marketing"],
  faqs: [
    { q: "Is there an ActiveCampaign free trial or discount code?", a: "There is a trial and no code. New accounts get a 14-day free trial with no credit card, per ActiveCampaign's pricing page on 30 September 2026. Neither ActiveCampaign nor Refer Labs has a discount code to offer." },
    { q: "Does ActiveCampaign have a free plan?", a: "No, there is no permanent free plan; it offers a 14-day free trial instead. If you only need a simple free newsletter tool, a freemium email platform may suit better, but the trial lets you test the automation first." },
    { q: "ActiveCampaign vs a basic email tool, what's the difference?", a: "Basic tools send broadcasts to a list. ActiveCampaign adds an automation engine that reacts to each contact's behaviour, plus segmentation and a CRM, so follow-up is personalised and hands-off. It is the step up when send-and-hope email stops being enough." },
  ],
  relatedLinks: [
    { href: "/compare/ai-sales-tools", label: "Compare sales & CRM tools", desc: "See ActiveCampaign next to CRMs and outreach tools." },
    { href: "/brevo", label: "Brevo", desc: "An all-in-one email, SMS and CRM alternative." },
    { href: "/nutshell", label: "Nutshell", desc: "A sales CRM with email marketing built in." },
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
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Prices were read in AUD on ActiveCampaign's pricing page on 30 September 2026 and can change; view the latest pricing on ActiveCampaign's own site.",
};
