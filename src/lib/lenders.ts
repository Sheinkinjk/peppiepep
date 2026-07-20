import {
  type Product,
  type LeadMatchInput,
  AMOUNT_RANGE,
  REVENUE_RANGE,
  TRADING_MONTHS_RANGE,
} from "./lending-schema";

// ─── Lender config ──────────────────────────────────────────────────────────
// The whole lending section is data-driven from this array. Adding a newly-approved
// lender is a single entry here: the lender pages (/{slug} and /{slug}-review), the
// comparison tables and matchLenders() all read from this. No new page files needed.
//
// PLACEHOLDER VALUES: rate, amount and speed are from each lender's public site (dated
// via rateAsAt). minTradingMonths, minMonthlyRevenue, acceptsBadCredit and acceptsAtoDebt
// are best-effort placeholders for Jarred to correct after the build.

export interface Lender {
  slug: string;
  name: string;
  logo: string;                 // /logos/<slug>.png (falls back to a monogram if absent)
  homepage: string;             // the lender's own website (factual, for citation)
  overview: string;             // one factual sentence of what they offer (no ratings, no hype)
  minTradingMonths: number;
  minMonthlyRevenue: number;    // AUD/month
  minAmount: number;            // AUD
  maxAmount: number;            // AUD
  speed: string;                // human, e.g. "24–48 hours"
  acceptsBadCredit: boolean;
  acceptsAtoDebt: boolean;
  afiaCodeSignatory: boolean;   // AFIA Online Small Business Lender Code of Practice
  products: Product[];
  advertisedRateFrom: string;   // e.g. "14.55% p.a."
  rateAsAt: string;             // e.g. "May 2026"
}

export const LENDERS: Lender[] = [
  {
    slug: "lumi",
    name: "Lumi",
    logo: "/logos/lumi.png",
    homepage: "https://www.lumi.com.au",
    overview: "Lumi is an Australian non-bank lender offering unsecured business loans and a business line of credit, with funding advertised from $10,000 up to $750,000.",
    minTradingMonths: 6,          // placeholder
    minMonthlyRevenue: 10000,     // placeholder
    minAmount: 10000,
    maxAmount: 750000,
    speed: "24–48 hours",
    acceptsBadCredit: false,      // placeholder
    acceptsAtoDebt: false,        // placeholder
    afiaCodeSignatory: true,
    products: ["term_loan", "line_of_credit"],
    advertisedRateFrom: "14.55% p.a.",
    rateAsAt: "May 2026",
  },
  {
    slug: "moula",
    name: "Moula",
    logo: "/logos/moula.png",
    homepage: "https://moula.com.au",
    overview: "Moula is an Australian non-bank lender providing unsecured business term loans, assessed largely from a business's bank-transaction and accounting data, with funding advertised from $5,000 up to $250,000.",
    minTradingMonths: 6,          // placeholder
    minMonthlyRevenue: 5000,      // placeholder
    minAmount: 5000,
    maxAmount: 250000,
    speed: "Same-day possible",
    acceptsBadCredit: true,       // placeholder
    acceptsAtoDebt: true,         // placeholder
    afiaCodeSignatory: true,
    products: ["term_loan"],
    advertisedRateFrom: "15.80% p.a.",
    rateAsAt: "May 2026",
  },
  {
    slug: "prospa",
    name: "Prospa",
    logo: "/logos/prospa.png",
    homepage: "https://www.prospa.com",
    overview: "Prospa is an ASX-listed Australian small-business lender offering unsecured business loans and a line of credit, with funding advertised from $5,000 up to $500,000.",
    minTradingMonths: 6,          // placeholder
    minMonthlyRevenue: 5000,      // placeholder
    minAmount: 5000,
    maxAmount: 500000,
    speed: "Within 24 hours",
    acceptsBadCredit: true,       // placeholder
    acceptsAtoDebt: true,         // placeholder
    afiaCodeSignatory: true,
    products: ["term_loan", "line_of_credit"],
    advertisedRateFrom: "13.90% p.a.",
    rateAsAt: "May 2026",
  },
];

export function getLender(slug: string): Lender | undefined {
  return LENDERS.find((l) => l.slug === slug);
}

/** The most recent rateAsAt across the panel, for a page-level "rates as at" stamp. */
export function panelRatesAsAt(): string {
  return LENDERS[0]?.rateAsAt ?? "";
}

// ─── Matching ─────────────────────────────────────────────────────────────────
// Returns the lenders whose criteria a lead PLAUSIBLY meets. Deliberately lenient:
// this drives the indicative "N of M lenders" result and the operator email, not a
// hard eligibility decision (a human still assesses). Uses band upper bounds so a
// borderline lead is included rather than wrongly excluded.

const bandUpper = (range: [number, number | null]): number => range[1] ?? Infinity;

export function matchLenders(lead: LeadMatchInput): Lender[] {
  const amt = AMOUNT_RANGE[lead.amount_requested];              // [min, max] requested
  const amtMin = amt[0];
  const amtMax = amt[1] ?? Infinity;
  const revUpper = bandUpper(REVENUE_RANGE[lead.monthly_revenue]);
  const tradingUpper = lead.trading_since ? bandUpper(TRADING_MONTHS_RANGE[lead.trading_since]) : Infinity;
  const wantedProducts = lead.product_interest ?? [];

  return LENDERS.filter((l) => {
    // Requested amount must overlap the lender's range.
    if (amtMin > l.maxAmount) return false;
    if (amtMax < l.minAmount) return false;
    // Revenue and trading history: plausible if the band could clear the minimum.
    if (revUpper < l.minMonthlyRevenue) return false;
    if (tradingUpper < l.minTradingMonths) return false;
    // Hard blockers only where the lender clearly won't consider it.
    if (lead.credit_profile === "defaults_judgements" && !l.acceptsBadCredit) return false;
    if (lead.has_ato_debt === true && !l.acceptsAtoDebt) return false;
    // If the applicant named products, keep only lenders offering at least one.
    if (wantedProducts.length > 0 && !wantedProducts.some((p) => l.products.includes(p))) return false;
    return true;
  });
}
