import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { DEXT_URL } from "@/lib/affiliate-links";

export const dextConfig: AffiliatePageConfig = {
  brand: "Dext",
  logo: "dext",
  badgeText: "Accounting",
  eyebrow: "Accounting & finance",
  affiliateUrl: DEXT_URL,
  quickAnswer:
    "Dext is bookkeeping-automation software that captures receipts, invoices and bills, extracts the data automatically, and syncs it to accounting software like Xero, QuickBooks and Sage. New accounts get a 14-day free trial with no credit card.",
  offer: "14-day free trial, no card required",
  atAGlance: [
    { k: "Type", v: "Bookkeeping automation" },
    { k: "Best for", v: "Bookkeepers, accountants & SMBs" },
    { k: "Pricing", v: "No free plan; from US$25/mo (annual)" },
    { k: "Syncs with", v: "Xero, QuickBooks, Sage" },
  ],
  hero: {
    h1Prefix: "Dext:",
    h1Highlight: "stop typing in receipts and let the software do it",
    subheading:
      "Snap or forward a receipt, invoice or bill and Dext pulls out the data, categorises it and pushes it into your accounting software. Built for bookkeepers, accountants and the businesses they support.",
    trustBullets: ["Captures receipts & invoices", "Syncs to Xero, QuickBooks, Sage", "14-day free trial"],
  },
  banner: {
    heading: "Start the Dext free trial",
    body: "Capture your first receipts and see them flow into your accounting software. 14 days, no card required.",
    buttonLabel: "Try Dext free",
  },
  sections: [
    {
      heading: "What Dext does",
      paragraphs: [
        "Dext removes the manual data entry from bookkeeping. You submit paperwork by phone photo, email forwarding, upload or bank feed, and it reads the supplier, date, amount, tax and line items, then categorises the entry and sends it to your accounting ledger.",
        "For bookkeepers and accountants it means clients' paperwork arrives in a usable form instead of a shoebox; for a business owner it means receipts and bills are captured as they happen and stored, rather than scrambled together at tax time.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It suits accounting and bookkeeping practices that want to standardise how clients submit paperwork, and small-to-mid businesses that already use Xero, QuickBooks or Sage and want to cut data entry. If you have very few transactions a month, the time saved may not justify a subscription.",
        "Dext is priced by users and documents processed, so confirm the current plan for your volume before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Dext through the link and create your account, no card for the 14-day trial." },
    { num: "2", heading: "Submit paperwork", body: "Snap, email or upload receipts and invoices, or connect a bank feed." },
    { num: "3", heading: "Sync to your ledger", body: "Review the extracted data and push it into Xero, QuickBooks or Sage." },
  ],
  whyUseThis: [
    "Automatic data extraction from receipts, invoices and bills",
    "Syncs to Xero, QuickBooks and Sage",
    "Multiple capture methods: photo, email, upload, bank feed",
    "Keeps digital copies for record-keeping",
  ],
  faqs: [
    {
      q: "Is there a Dext free trial or discount code?",
      a: "Yes to the trial: new accounts get a 14-day free trial with no credit card. Dext does not typically publish a public promo code; signing up through our referral link is the reliable way to start the current offer, at no extra cost to you.",
    },
    {
      q: "How much does Dext cost?",
      a: "Dext is priced by the number of users and documents you process, so the cost scales with your volume. Because pricing changes, check the current plan on Dext's pricing page before committing.",
    },
    {
      q: "Does Dext work with Xero and QuickBooks?",
      a: "Yes, syncing extracted data into accounting software such as Xero, QuickBooks and Sage is Dext's core job. Confirm your specific software and region are supported on their site.",
    },
    {
      q: "Is Dext for accountants or business owners?",
      a: "Both. Accounting and bookkeeping practices use it to standardise how clients submit paperwork, and business owners use it to capture receipts and bills as they go. It is most worthwhile once you have a steady flow of transactions.",
    },
  ],
  relatedLinks: [
    { href: "/compare/payments", label: "Payments & finance tools", desc: "Getting paid across borders, plus bookkeeping and accounting automation." },
  ],
  ctas: {
    primary: "See Dext",
    secondary: "Continue to Dext",
    midHeading: "Ready to end manual data entry?",
    midBody: "Open Dext through our referral link and start the 14-day free trial, no card required.",
    midButton: "Try Dext free",
    bottomHeading: "See Dext capture your paperwork",
    bottomBody: "Submit a few receipts and watch the data flow into your accounting software.",
    bottomButton: "Continue to Dext",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. This is not accounting or tax advice. Pricing and offers change, verify current terms on Dext before committing.",
};
