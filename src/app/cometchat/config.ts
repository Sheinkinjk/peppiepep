import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { COMETCHAT_URL } from "@/lib/affiliate-links";

export const cometchatConfig: AffiliatePageConfig = {
  brand: "CometChat",
  logo: "cometchat",
  badgeText: "In-app chat SDK",
  eyebrow: "Developer & communication tools",
  affiliateUrl: COMETCHAT_URL,
  quickAnswer:
    "CometChat is a developer platform for adding in-app chat, voice and video to your product, via SDKs, APIs and pre-built UI kits. It has a free Build plan (up to 100 monthly active users) so you can prototype, with paid plans for production; paid production plans are priced by monthly active users.",
  offer: "Free Build plan (up to 100 users)",
  atAGlance: [
    { k: "Type", v: "In-app chat / voice / video SDK" },
    { k: "Best for", v: "Developers & product teams" },
    { k: "Pricing", v: "Free Build plan; paid plans priced by monthly active users" },
  ],
  hero: {
    h1Prefix: "CometChat:",
    h1Highlight: "add chat and calling to your app",
    subheading:
      "Drop real-time messaging, voice and video into your product with SDKs and pre-built UI kits instead of building it from scratch, so a feature that would take months ships in days.",
    trustBullets: ["Free Build plan to prototype","SDKs and pre-built UI kits","Chat, voice and video"],
  },
  banner: {
    heading: "Start building on the free plan",
    body: "Grab the SDKs and UI kits and add chat to your app. Free Build plan for up to 100 users.",
    buttonLabel: "Continue to CometChat",
  },
  sections: [
    {
      heading: "What CometChat is for",
      paragraphs: [
        "CometChat is a communications platform for developers. Instead of building real-time chat, voice and video yourself, you use its SDKs, APIs and pre-built UI kits to add those features to a web or mobile app, with the messaging infrastructure, moderation and scaling handled for you.",
        "It is used to power in-app messaging in marketplaces, communities, healthcare, education, gaming and SaaS products. The free Build plan lets you prototype before committing to a paid production plan.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits developers and product teams who need to add messaging or calling to an app and would rather integrate a proven platform than build and maintain real-time infrastructure. The UI kits make it fast to get something working.",
        "It is not a consumer app or a team chat tool like Slack; it is developer infrastructure you build on. If you just want team messaging, this is not it. If you are shipping chat inside your own product, it fits well.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Create a free account", body: "Open CometChat through the link and start on the free Build plan, no card required." },
    { num: "2", heading: "Add the SDK or UI kit", body: "Drop the pre-built UI kit or SDK into your web or mobile app to enable chat, voice or video." },
    { num: "3", heading: "Scale to production", body: "Test with up to 100 users free, then move to a paid plan as your app grows." },
  ],
  whyUseThis: ["SDKs, APIs and pre-built UI kits for every major framework","Chat, voice and video in one platform","Moderation and scaling handled for you","Free Build plan to prototype before you pay"],
  faqs: [
    { q: "Is CometChat free, and is there a discount code?", a: "CometChat has a free Build plan for up to 100 monthly active users, so you can prototype without paying. It does not usually run a public discount code; starting through our referral link takes you to the current plans, at no extra cost to you." },
    { q: "How much does CometChat cost?", a: "The Build plan is free for up to 100 monthly active users. Paid production plans are priced by monthly active users, with higher tiers adding AI moderation, smart replies and compliance features. Confirm current pricing for your app's scale on CometChat." },
    { q: "What can I build with CometChat?", a: "In-app text chat, voice and video calling, and AI-agent messaging, inside your own web or mobile product. It is commonly used for marketplaces, communities, telehealth, education, gaming and SaaS apps that need users to communicate." },
    { q: "Is CometChat a team chat tool like Slack?", a: "No. CometChat is developer infrastructure for adding messaging to your own app, not a ready-made team-chat product. If you want internal team messaging, a tool like Slack fits; if you are building chat into a product you ship, CometChat is the right layer." },
  ],
  relatedLinks: [
    { href: "/business-software", label: "Business software", desc: "Browse more tools for running a business." },
    { href: "/compare/business-phone", label: "Business phone tools", desc: "Compare calling and communication tools." },
  ],
  ctas: {
    primary: "See CometChat",
    secondary: "Continue to CometChat",
    midHeading: "Adding chat or calling to your app?",
    midBody: "Start on the free Build plan through our link and drop in chat, voice or video with the SDKs and UI kits.",
    midButton: "Get started",
    bottomHeading: "Ship in-app messaging faster",
    bottomBody: "Use the pre-built UI kits and APIs to add chat and calls, then scale on a paid plan as you grow.",
    bottomButton: "Continue to CometChat",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on CometChat before committing.",
};
