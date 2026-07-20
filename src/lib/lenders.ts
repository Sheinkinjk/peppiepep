import {
  type Product,
  type LeadMatchInput,
  AMOUNT_RANGE,
  REVENUE_RANGE,
  TRADING_MONTHS_RANGE,
} from "./lending-schema";

// ─── Lender config ──────────────────────────────────────────────────────────
// The whole lending section is data-driven from this array. Adding a newly-approved
// lender is a single entry here: the lender pages (/business-loans/<slug> and /review),
// the comparison tables and matchLenders() all read from this. No new page files needed.
//
// All figures below were verified against each lender's OWN website in July 2026
// (rateAsAt). Where a lender does not publish a headline per-annum rate (Lumi quotes a
// total repayment; Prospa prices each loan on simple interest), advertisedRateFrom is
// "Quote-based" rather than an invented number — see hasHeadlineRate().

export interface Lender {
  slug: string;
  name: string;
  logo: string;                 // /logos/<slug>.png (falls back to a monogram if absent)
  homepage: string;             // the lender's own website (factual, for citation)
  overview: string;             // one factual sentence of what they offer (no ratings, no hype)
  minTradingMonths: number;
  minMonthlyRevenue: number;    // AUD/month (annual figures converted /12)
  minAmount: number;            // AUD
  maxAmount: number;            // AUD
  speed: string;                // human, e.g. "Same business day"
  // Matching heuristics (NOT public claims): whether to KEEP the lender in the
  // indicative match for an impaired-credit / ATO-debt lead. false only where the
  // lender's own site states a gate (e.g. Prospa requires "good credit history").
  acceptsBadCredit: boolean;
  acceptsAtoDebt: boolean;
  afiaCodeSignatory: boolean;   // AFIA Online Small Business Lender Code of Practice
  products: Product[];
  advertisedRateFrom: string;   // "From 15.99% p.a." OR "Quote-based" where none is published
  establishmentFee?: string;    // e.g. "2% of the loan amount" (only where published)
  rateAsAt: string;             // e.g. "July 2026"
}

export const LENDERS: Lender[] = [
  {
    slug: "lumi",
    name: "Lumi",
    logo: "/logos/lumi.png",
    homepage: "https://www.lumi.com.au",
    overview:
      "Lumi is an Australian non-bank lender offering unsecured business loans and a business line of credit, with funding up to $1 million. It quotes a total repayment amount upfront rather than a headline annual rate.",
    minTradingMonths: 6,
    minMonthlyRevenue: 4167,      // ~$50,000 minimum annual turnover
    minAmount: 5000,
    maxAmount: 1000000,
    speed: "Same business day",
    acceptsBadCredit: true,       // assesses business data, not credit score alone (case-by-case)
    acceptsAtoDebt: true,         // no published refusal; operator assesses
    afiaCodeSignatory: true,
    products: ["term_loan", "line_of_credit"],
    advertisedRateFrom: "Quote-based",
    establishmentFee: "2.5% of the loan amount",
    rateAsAt: "July 2026",
  },
  {
    slug: "moula",
    name: "Moula",
    logo: "/logos/moula.png",
    homepage: "https://moula.com.au",
    overview:
      "Moula is an Australian non-bank lender providing unsecured business term loans, assessed largely from a business's bank-transaction and accounting data, with funding from $10,000 up to $500,000.",
    minTradingMonths: 12,
    minMonthlyRevenue: 10000,
    minAmount: 10000,
    maxAmount: 500000,
    speed: "Next business day",
    acceptsBadCredit: true,       // risk-based; reads bank data beyond the credit score (case-by-case)
    acceptsAtoDebt: true,         // verified own site: lends to businesses with ATO debt, incl. payment plans
    afiaCodeSignatory: true,
    products: ["term_loan"],
    advertisedRateFrom: "From 15.99% p.a.",
    establishmentFee: "2% of the loan amount",
    rateAsAt: "July 2026",
  },
  {
    slug: "prospa",
    name: "Prospa",
    logo: "/logos/prospa.png",
    homepage: "https://www.prospa.com",
    overview:
      "Prospa is an ASX-listed Australian small-business lender offering unsecured business loans ($5,000 to $500,000) and a line of credit ($2,000 to $500,000), priced on simple interest and funded fast.",
    minTradingMonths: 6,
    minMonthlyRevenue: 6000,
    minAmount: 5000,
    maxAmount: 500000,
    speed: "Funds within an hour of signing",
    acceptsBadCredit: false,      // own eligibility states "good credit history"
    acceptsAtoDebt: true,         // no published refusal; operator assesses
    afiaCodeSignatory: true,
    products: ["term_loan", "line_of_credit"],
    advertisedRateFrom: "Quote-based",
    rateAsAt: "July 2026",
  },
];

export function getLender(slug: string): Lender | undefined {
  return LENDERS.find((l) => l.slug === slug);
}

/** True when the lender publishes a numeric headline rate (vs "Quote-based"). */
export function hasHeadlineRate(l: Lender): boolean {
  return /%/.test(l.advertisedRateFrom);
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
