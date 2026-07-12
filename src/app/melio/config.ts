import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MELIO_URL } from "@/lib/affiliate-links";

export const melioConfig: AffiliatePageConfig = {
  brand: "Melio",
  logo: "melio",
  badgeText: "Bill pay (US)",
  eyebrow: "Payments & bill pay",
  affiliateUrl: MELIO_URL,
  quickAnswer:
    "Melio is a B2B bill-pay and accounts-payable tool for US businesses: pay vendors and bills by bank transfer, card or check, and schedule and track everything, syncing with QuickBooks and Xero. It has a free plan and paid plans from about US$25/month. Important: Melio requires a US business and US bank account to send payments, so it is US-only for senders.",
  offer: "Free plan, no card required",
  atAGlance: [
    { k: "Type", v: "B2B bill pay / accounts payable" },
    { k: "Best for", v: "US small businesses paying vendors" },
    { k: "Availability", v: "US-only for senders (US bank required)" },
    { k: "Pricing", v: "Free plan; paid from US$25/mo" },
  ],
  hero: {
    h1Prefix: "Melio:",
    h1Highlight: "pay your business bills, the simple way",
    subheading:
      "Schedule and send vendor payments by bank transfer, card or check from one dashboard, keep the cash in your account longer, and sync it all to your accounting software. Built for US businesses.",
    trustBullets: ["Free plan to start","Syncs with QuickBooks & Xero","US business & bank account required"],
  },
  banner: {
    heading: "See how Melio works",
    body: "Set up your account, connect your accounting software and schedule your first vendor payment. Free plan, no card required.",
    buttonLabel: "Continue to Melio",
  },
  sections: [
    {
      heading: "What Melio is for",
      paragraphs: [
        "Melio is an accounts-payable tool that lets a business pay its vendors and bills without writing checks by hand or logging into a bank. You schedule payments, choose to pay by bank transfer, card or check, and Melio delivers them, while syncing the records to your accounting software.",
        "A useful trick is paying a vendor by card even when they only accept bank transfer or check, which can help with cash flow and rewards. It suits small businesses that want to streamline how they pay suppliers.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits US small businesses that pay a regular set of vendors and want bill pay in one place, tied to QuickBooks or Xero. The free plan covers a handful of bank payments a month.",
        "The key limit for our readers: Melio requires a US business and US bank account to send payments. Australian businesses cannot use it as senders, though US businesses can send payments to vendors in Australia. Confirm eligibility before signing up.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open Melio", body: "Go to Melio through the link and create your account. A US business and US bank account are required to send payments." },
    { num: "2", heading: "Connect accounting", body: "Link QuickBooks or Xero so bills and payments stay in sync automatically." },
    { num: "3", heading: "Schedule a payment", body: "Add a vendor, choose how to pay (bank transfer, card or check) and schedule the payment." },
  ],
  whyUseThis: ["Pay vendors by bank transfer, card or check","Pay by card even where cards aren't normally accepted","Syncs bills and payments to QuickBooks and Xero","Free plan for a handful of payments a month"],
  faqs: [
    { q: "Is Melio free, and is there a discount code?", a: "Melio has a free plan that covers a set number of bank payments a month, with paid plans from about US$25/month for more volume and features. It does not publish a standard discount code; card payments and some transfer types carry fees, so check the current fee schedule before relying on it." },
    { q: "Can Australian businesses use Melio?", a: "Not as senders. Melio requires a US business and US bank account to send payments, so Australian businesses cannot use it to pay their own bills. US businesses can, however, send payments to vendors located in Australia and many other countries." },
    { q: "How much does Melio cost?", a: "The Go plan is free with a limited number of bank payments a month; paid plans (Core from about US$25/month, then higher tiers) add more free payments and features. Card payments carry a percentage fee and some payment types have per-transaction costs. Confirm the current fees before committing." },
    { q: "Does Melio work with my accounting software?", a: "Yes, Melio syncs with QuickBooks and Xero so your bills and payments stay reconciled automatically. Confirm your specific setup is supported when you connect your account." },
  ],
  ctas: {
    primary: "See Melio",
    secondary: "Continue to Melio",
    midHeading: "Tired of paying bills by hand?",
    midBody: "Set up Melio through our link, connect QuickBooks or Xero, and schedule your first vendor payment. A US business and bank account are required.",
    midButton: "Get started",
    bottomHeading: "Pay vendors without the admin",
    bottomBody: "Schedule payments by bank transfer, card or check, and keep everything reconciled automatically.",
    bottomButton: "Continue to Melio",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Melio before committing.",
};
