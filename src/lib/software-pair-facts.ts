/**
 * Vendor facts for the seven business-software pair pages (built 4 Oct 2026).
 *
 * Every figure here was read on the vendor's OWN page on READ_ON, at the URL in
 * SRC, and is printed exactly as the vendor prints it: currency, GST basis and
 * billing period included. Where a vendor prints no currency, no GST basis or no
 * billing period, the label below says so rather than filling the gap.
 *
 * Each price is declared once and referenced by the pages, the tables and the
 * FAQ answers, so a re-read changes every mention together. When re-reading,
 * open the SRC url, correct anything that moved, then change READ_ON. Changing
 * the date without re-reading makes the date a lie, and the date is the claim
 * the pages print.
 *
 * Never sum these into a "cheaper" total across vendors: the bases differ
 * (Xero AUD incl GST, Deputy and Dext AUD excl GST, Employment Hero no basis
 * printed, several US vendors with a bare "$").
 */

export const READ_ON = "4 October 2026";
export const READ_ON_ISO = "2026-10-04";

export const SRC = {
  xeroPricing: "https://www.xero.com/au/pricing-plans/",
  xeroPayroll: "https://www.xero.com/au/accounting-software/payroll/",
  xeroStoreFiles: "https://www.xero.com/au/accounting-software/store-files/",
  xeroHubdocOld: "https://www.xero.com/au/accounting-software/hubdoc/",
  xeroBlogCapture: "https://blog.xero.com/product-updates/smart-document-capture/",
  xeroBlogDocuments: "https://blog.xero.com/product-updates/files-now-called-documents/",
  ehPricing: "https://employmenthero.com/pricing/",
  ehXero: "https://employmenthero.com/integrations/xero/",
  keypay: "https://www.keypay.com.au/",
  hubdocPricing: "https://www.hubdoc.com/pricing",
  dextPricing: "https://dext.com/au/business/pricing",
  dextVsHubdoc: "https://dext.com/au/resources/compare/dext-vs-hubdoc",
  deputyPricing: "https://www.deputy.com/au/pricing",
  deputyPayroll: "https://www.deputy.com/au/payroll-software",
  replyPricing: "https://reply.io/pricing/",
  apolloPricing: "https://www.apollo.io/pricing",
  pipedrivePricing: "https://www.pipedrive.com/en/pricing",
  hubspotCrm: "https://www.hubspot.com/pricing/crm",
  hubspotSales: "https://www.hubspot.com/pricing/sales",
  hubspotMarketing: "https://www.hubspot.com/pricing/marketing",
  ghlPricing: "https://www.gohighlevel.com/pricing",
  ghlGuide: "https://help.gohighlevel.com/en/support/solutions/articles/155000001156-highlevel-pricing-guide",
  brevoPricing: "https://www.brevo.com/pricing/",
  mailchimpPricing: "https://mailchimp.com/pricing/marketing/?currency=AUD",
  mailchimpCompare: "https://mailchimp.com/pricing/marketing/compare-plans/?currency=AUD",
} as const;

/** Xero AU: "Prices are in AUD and include GST." Monthly, standing price (the
 *  90%-off promo on the page expired 30 Sep 2026 and is not cited). */
export const XERO = {
  ignite: "$37",
  grow: "$78",
  comprehensive: "$107",
  ultimate10: "$143",
  ultimate20: "$180",
  ultimate50: "$250",
  basis: "a month, AUD including GST",
} as const;

/** Employment Hero: the card prints "$10 * Conditions apply" and nothing else. */
export const EH = {
  payroll: "$10",
  minUsers: 10,
  rostering: "$4",
  managedPayroll: "$20",
} as const;

/** Deputy AU: AUD excluding all applicable taxes, per user per month. */
export const DEPUTY = {
  liteAnnual: "$6.75",
  liteMonthly: "$7.50",
  coreAnnual: "$8.75",
  coreMonthly: "$9.75",
  proAnnual: "$13",
  proMonthly: "$14.50",
  payroll: "$5",
  hr: "$3.50",
  minMonthly: "AUD $30",
} as const;

/** Dext AU business plan: "$33.58 Per Month, AUD, Excludes GST, $403 billed annually". */
export const DEXT = {
  entry: "$33.58",
  entryAnnual: "$403",
  docs: 250,
  users: 5,
  lineItem: "$28.50",
} as const;

/** Hubdoc, Australian locale of hubdoc.com/pricing: "$15 AUD per month thereafter". */
export const HUBDOC = { aud: "$15", trialDays: 30 } as const;

/** Reply.io: a bare "$", no currency printed. Annual billing shown by default. */
export const REPLY = { multichannel: "$89", emailVolume: "$159", linkedin: "$69", calls: "$29", trialDays: 14 } as const;

/** Apollo.io: a bare "$", no currency printed. Per seat per month, billed annually. */
export const APOLLO = { basic: "$49", professional: "$79", organization: "$119", advancedDialer: "$119", freeCredits: "900", trialCredits: 75 } as const;

/** Pipedrive: AU$ per seat per month, billed annually. GST treatment not printed. */
export const PIPEDRIVE = { lite: "AU$19", growth: "AU$49", premium: "AU$79", ultimate: "AU$109" } as const;

/** HubSpot: AUD. Starter's standing price is the struck-through A$31; a limited
 *  new-customer discount was showing beside it and is not cited as the price. */
export const HUBSPOT = {
  freeUsers: 2,
  starterStanding: "A$31",
  salesProStanding: "A$155",
  salesProOnboarding: "A$2,160",
  marketingStarterContacts: "1,000",
} as const;

/** GoHighLevel: "$97 /Month" etc, no currency printed on the pricing page. */
export const GHL = { starter: "$97", unlimited: "$297", agencyPro: "$497", emailPer1000: "$0.675", trialDays: 14 } as const;

/** Brevo: AUD to an Australian visitor. */
export const BREVO = { starterMonthly: "A$12", starterYearly: "A$10.83", standardMonthly: "A$25", freeEmailsMonth: "5,000", freeEmailsDay: "300" } as const;

/** Mailchimp: AUD via ?currency=AUD. "Then, starts at" after a 14-day trial. */
export const MAILCHIMP = { essentials: "A$18.92", standard: "A$29.11", freeContacts: 250, freeSends: 500 } as const;
