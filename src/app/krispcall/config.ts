import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { KRISPCALL_URL } from "@/lib/affiliate-links";

export const krispcallConfig: AffiliatePageConfig = {
  brand: "KrispCall",
  badgeText: "Business phone",
  eyebrow: "Business phone & calling",
  affiliateUrl: KRISPCALL_URL,
  quickAnswer:
    "KrispCall is a cloud phone system that gives teams virtual phone numbers in many countries, a shared call inbox, recording, SMS and CRM integrations, without physical hardware. Check the current plan and any trial on the signup page before you commit.",
  atAGlance: [
    { k: "Type", v: "Cloud phone / virtual numbers" },
    { k: "Best for", v: "Remote & distributed teams" },
    { k: "Pricing", v: "No free plan; from US$12/user/mo (annual)" },
  ],
  hero: {
    h1Prefix: "KrispCall:",
    h1Highlight: "virtual phone numbers and a shared inbox for your team",
    subheading:
      "A cloud telephony platform for getting local and international numbers, handling calls and texts in one unified inbox, and keeping everything logged against your CRM, all from the browser and mobile app.",
    trustBullets: ["Numbers in many countries", "Shared team call inbox", "Works from browser & mobile"],
  },
  banner: {
    heading: "Set up your KrispCall numbers",
    body: "Get virtual numbers, share a team inbox and connect your CRM. Check the current plan on the signup page.",
    buttonLabel: "See KrispCall",
  },
  sections: [
    {
      heading: "What KrispCall is for",
      paragraphs: [
        "KrispCall is aimed at teams that need business phone numbers without the hardware, sales, support and remote teams that want to make and receive calls and texts from anywhere. You buy virtual numbers, local or international, and manage everything through a shared inbox.",
        "The point of a unified callbox is that calls, voicemails and SMS from every number land in one place, so nothing is missed and a manager can see the whole picture. Recording, call notes and CRM sync keep records tidy.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It fits distributed or remote teams that want a presence in multiple regions and a single view of customer conversations. If you only need one number for occasional calls, a lighter setup may be cheaper.",
        "Because plans and any trial change, confirm the current pricing for the numbers and seats you need on KrispCall's signup page before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open KrispCall", body: "Go to KrispCall through the link and start creating your account." },
    { num: "2", heading: "Pick your numbers", body: "Choose local or international virtual numbers for your team and regions." },
    { num: "3", heading: "Connect & call", body: "Share the team inbox, connect your CRM and start handling calls and texts." },
  ],
  whyUseThis: [
    "Virtual local and international numbers, no hardware",
    "Unified inbox for calls, voicemail and SMS across numbers",
    "Call recording, notes and CRM sync",
    "Works from the browser and mobile app, good for remote teams",
  ],
  faqs: [
    {
      q: "Is there a KrispCall free trial or discount code?",
      a: "KrispCall's current plans and any trial are shown on its signup page, check there for the latest terms. We don't publish a promo code we can't verify; signing up through our referral link is the reliable way to reach the current offer, at no extra cost to you.",
    },
    {
      q: "How much does KrispCall cost?",
      a: "KrispCall is priced per user per month, and numbers can add to the total depending on country and type. Confirm the current per-seat and per-number cost on KrispCall before committing, since pricing changes.",
    },
    {
      q: "Can I get an international phone number with KrispCall?",
      a: "Yes, KrispCall offers virtual numbers across many countries, which is a common reason remote and international teams choose it. Availability varies by country, so check that your specific region is supported.",
    },
    {
      q: "KrispCall or CloudTalk?",
      a: "Both are cloud phone systems. KrispCall leans toward simple virtual numbers and a shared inbox for smaller and remote teams; CloudTalk leans toward call-centre features and analytics for busier sales and support floors. See our business-phone hub for the side-by-side.",
    },
  ],
  ctas: {
    primary: "See KrispCall",
    secondary: "Continue to KrispCall",
    midHeading: "Ready for numbers without the hardware?",
    midBody: "Open KrispCall through our referral link and set up your team's virtual numbers.",
    midButton: "See KrispCall",
    bottomHeading: "Get your team on one inbox",
    bottomBody: "Choose your numbers, connect your CRM and manage every call and text in one place.",
    bottomButton: "Continue to KrispCall",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on KrispCall before committing.",
};
