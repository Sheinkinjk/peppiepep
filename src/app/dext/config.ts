import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { DEXT_URL } from "@/lib/affiliate-links";

export const dextConfig: AffiliatePageConfig = {
  brand: "Dext",
  logo: "dext",
  logoWide: true,
  badgeText: "Accounting",
  eyebrow: "Accounting & finance",
  affiliateUrl: DEXT_URL,
  // Trial terms and the annual saving read on dext.com/au/business/pricing,
  // rendered in a browser, 30 September 2026. That page does not state the
  // trial's length, so the old "14-day" wording was dropped. No plan price is
  // printed here, per the 27 Sep 2026 decision not to add partner prices.
  quickAnswer:
    "There is no Dext discount code: Dext publishes none and Refer Labs holds none. What Dext's Australian pricing page does offer is a free trial that needs no payment details and up to 20% off for annual billing (dext.com/au/business/pricing, read 30 September 2026). Dext captures receipts, invoices and bills, extracts the data and syncs it to Xero, QuickBooks or Sage.",
  offer: "Free trial, no payment details required",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Bookkeeping automation" },
    { k: "Best for", v: "Bookkeepers, accountants & SMBs" },
    { k: "Pricing", v: "By users and documents a month; AUD plans on Dext's Australian site" },
    { k: "Syncs with", v: "Xero, QuickBooks, Sage" },
  ],
  hero: {
    h1Prefix: "Dext:",
    h1Highlight: "stop typing in receipts and let the software do it",
    subheading:
      "There is no Dext discount code; what Dext publishes instead is a free trial that needs no payment details and up to 20% off for paying annually (dext.com/au/business/pricing, read 30 September 2026). Snap or forward a receipt, invoice or bill and Dext pulls out the data and pushes it into your accounting software.",
    trustBullets: ["Captures receipts & invoices", "Syncs to Xero, QuickBooks, Sage", "Free trial, no payment details"],
  },
  banner: {
    heading: "Start the Dext free trial",
    body: "Capture your first receipts and see them flow into your accounting software. No payment details required to start.",
    buttonLabel: "Try Dext free",
  },
  sections: [
    {
      heading: "Is there a Dext discount code in Australia?",
      paragraphs: [
        "No. Dext lists no discount or promo code on its own site, and Refer Labs has none to pass on. The savings Dext does publish, read on dext.com/au/business/pricing on 30 September 2026, are a free trial that needs no payment details and up to 20% off for choosing annual billing over monthly.",
        "Business plans are priced in Australian dollars by users and documents processed a month, and Dext's page shows the figure for your volume as you move its slider. Line-item, bank statement and supplier statement extraction are paid add-ons, and accounting and bookkeeping firms have separate partner pricing.",
      ],
      hasCta: true,
      ctaText: "Try Dext free",
    },
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
        "Dext is priced by users and documents processed a month, so price your own volume on Dext's page before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Dext through the link and create your account; the trial needs no payment details." },
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
      q: "Does Dext have a free trial?",
      a: "Yes. Dext's Australian pricing page says the trial gives full access to key features and needs no payment details upfront (read 30 September 2026). The page does not state how many days it runs.",
    },
    {
      q: "How is Dext priced in Australia?",
      a: "By the number of users and documents processed a month, in Australian dollars excluding GST, with a discount for annual billing. Dext's Australian pricing page shows the price for your volume.",
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
    midBody: "Open Dext through our referral link and start the free trial, no payment details required.",
    midButton: "Try Dext free",
    bottomHeading: "See Dext capture your paperwork",
    bottomBody: "Submit a few receipts and watch the data flow into your accounting software.",
    bottomButton: "Continue to Dext",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. This is not accounting or tax advice. Trial and billing terms were read on Dext's Australian pricing page on 30 September 2026 and can change; view the latest pricing on Dext's own site.",
};
