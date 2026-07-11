import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { LOGOME_URL } from "@/lib/affiliate-links";

export const logomeConfig: AffiliatePageConfig = {
  brand: "Logome.ai",
  badgeText: "AI branding",
  eyebrow: "AI tools",
  affiliateUrl: LOGOME_URL,
  quickAnswer:
    "Logome.ai is an AI logo and brand-kit generator: describe your business and it creates logos plus a matching brand kit (colours, fonts, business cards and social templates) in minutes. You can design and preview for free without signing up; downloading the files requires a paid plan, from about US$19/month billed annually.",
  offer: "Free to design and preview (pay to download)",
  atAGlance: [
    { k: "Type", v: "AI logo & brand-kit generator" },
    { k: "Best for", v: "Startups & solo founders" },
    { k: "Pricing", v: "Free to design; downloads from US$19/mo (annual)" },
  ],
  hero: {
    h1Prefix: "Logome.ai:",
    h1Highlight: "an AI logo and brand kit in minutes",
    subheading:
      "Describe your business and Logome generates logo options and a full brand kit, colours, fonts, business cards and social templates, so you can look professional fast without hiring a designer.",
    trustBullets: ["Free to design and preview","Full brand kit, not just a logo","No design skills needed"],
  },
  banner: {
    heading: "Design your logo free",
    body: "Describe your business, generate logo and brand-kit options, and preview them free. Pay only when you want to download.",
    buttonLabel: "Try Logome free",
  },
  sections: [
    {
      heading: "What Logome is for",
      paragraphs: [
        "Logome.ai turns a short description of your business into logo options and a coordinated brand kit. Instead of a single mark, you get colours, typography, business-card layouts and social templates that match, which is what most small businesses actually need to look consistent.",
        "You can generate and preview designs for free without an account, which makes it easy to explore ideas before spending anything. Downloading the final files is where a paid plan comes in.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits startups, solo founders and small businesses that need a professional-looking identity quickly and cheaply, without a designer or agency. The brand-kit output is the standout: it saves stitching together a look yourself.",
        "It is less suited to established brands that need bespoke, hand-crafted design or complex brand systems. For a quick, solid starting identity, though, an AI generator like this is hard to beat on speed and price.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Describe your business", body: "Open Logome through the link and enter your business name and a short description of what you do." },
    { num: "2", heading: "Generate and preview", body: "Review the AI-generated logo and brand-kit options and refine the style, all free, no signup needed." },
    { num: "3", heading: "Download when ready", body: "Choose a plan to download your logo files and brand kit in the formats you need, with usage rights." },
  ],
  whyUseThis: ["Generates a full brand kit, not just a logo","Free to design and preview before you pay","Fast, no design skills or designer required","Export-ready files in common formats on paid plans"],
  faqs: [
    { q: "Is Logome free, and is there a discount code?", a: "You can design and preview logos and brand kits for free without signing up. Downloading the files requires a paid plan, from about US$19/month billed annually. Logome does not publish a standard discount code; using our link takes you to the current plans, at no extra cost to you." },
    { q: "How much does Logome cost?", a: "Designing and previewing is free. To download, plans start at about US$19/month billed annually for a basic logo pack, with higher tiers adding more formats, transparent backgrounds and a full brand kit. Check the current plans before committing." },
    { q: "Do I own the logo I create?", a: "Paid plans grant download files with usage rights for your logo. Confirm the exact ownership and licensing terms on Logome's current plan page for the tier you choose before using it commercially." },
    { q: "Is an AI logo good enough for a real business?", a: "For most startups and small businesses, yes, especially because Logome outputs a coordinated brand kit, not just a mark. Established brands needing bespoke, hand-crafted design will still want a human designer, but as a fast, affordable starting identity it works well." },
  ],
  ctas: {
    primary: "See Logome.ai",
    secondary: "Continue to Logome.ai",
    midHeading: "Ready to get started with Logome.ai?",
    midBody: "Open Logome.ai through our referral link and try it today.",
    midButton: "Get started",
    bottomHeading: "See what Logome.ai can do",
    bottomBody: "Start through our link and explore it for yourself.",
    bottomButton: "Continue to Logome.ai",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Logome.ai before committing.",
};
