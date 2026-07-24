import { z } from "zod";

// Shared ISO-8601 last-updated date for lending-page Article schema (schema.org
// dateModified must be ISO; "July 2026" is invalid and Google ignores it). Bump
// this when the lending content is materially refreshed.
export const LENDING_LAST_UPDATED = "2026-07-23";

// ─── Band definitions ─────────────────────────────────────────────────────────
// Every quantitative field is a band, never a raw number: it lowers friction and
// avoids collecting more precision than lead qualification needs. Each band carries
// a numeric [min, max] used by matchLenders(). `null` max means "no upper bound".

export const AMOUNT_BANDS = ["<25k", "25-50k", "50-100k", "100-250k", "250-500k", "500k+"] as const;
export const REVENUE_BANDS = ["<10k", "10-25k", "25-50k", "50-100k", "100k+"] as const;
export const TRADING_BANDS = ["<6m", "6-12m", "1-2y", "2-5y", "5y+"] as const;
export const URGENCY_VALUES = ["today", "this_week", "this_month", "exploring"] as const;
export const PRODUCTS = ["term_loan", "invoice_finance", "equipment_finance", "line_of_credit", "trade_finance", "merchant_cash_advance"] as const;
export const CREDIT_PROFILES = ["clean", "minor_defaults", "defaults_judgements", "unsure"] as const;
export const ATO_DEBT_BANDS = ["<10k", "10-50k", "50-100k", "100k+", "unsure"] as const;
export const ENTITY_TYPES = ["sole_trader", "company", "partnership", "trust", "other"] as const;
export const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;
export const PREFERRED_CONTACT = ["morning", "afternoon", "evening", "anytime"] as const;
export const LOAN_PURPOSES = [
  "working_capital", "equipment", "stock_inventory", "expansion",
  "cash_flow", "hiring", "marketing", "refinance", "tax_ato", "other",
] as const;

export type Product = (typeof PRODUCTS)[number];

// Numeric ranges per band, for lender matching. [min, max]; max null = unbounded.
export const AMOUNT_RANGE: Record<(typeof AMOUNT_BANDS)[number], [number, number | null]> = {
  "<25k": [5000, 25000], "25-50k": [25000, 50000], "50-100k": [50000, 100000],
  "100-250k": [100000, 250000], "250-500k": [250000, 500000], "500k+": [500000, null],
};
export const REVENUE_RANGE: Record<(typeof REVENUE_BANDS)[number], [number, number | null]> = {
  "<10k": [0, 10000], "10-25k": [10000, 25000], "25-50k": [25000, 50000],
  "50-100k": [50000, 100000], "100k+": [100000, null],
};
export const TRADING_MONTHS_RANGE: Record<(typeof TRADING_BANDS)[number], [number, number | null]> = {
  "<6m": [0, 6], "6-12m": [6, 12], "1-2y": [12, 24], "2-5y": [24, 60], "5y+": [60, null],
};

// Human labels for UI + emails.
export const LABELS: Record<string, string> = {
  today: "Today", this_week: "This week", this_month: "This month", exploring: "Just exploring",
  term_loan: "Term loan", invoice_finance: "Invoice finance", equipment_finance: "Equipment finance",
  line_of_credit: "Line of credit or overdraft", trade_finance: "Trade finance", merchant_cash_advance: "Merchant cash advance",
  clean: "Clean", minor_defaults: "Minor defaults", defaults_judgements: "Defaults or judgements", unsure: "Unsure",
  sole_trader: "Sole trader", company: "Company", partnership: "Partnership", trust: "Trust", other: "Other",
  morning: "Morning", afternoon: "Afternoon", evening: "Evening", anytime: "Anytime",
  working_capital: "Working capital", equipment: "Equipment", stock_inventory: "Stock or inventory",
  expansion: "Expansion", cash_flow: "Cash flow", hiring: "Hiring", marketing: "Marketing",
  refinance: "Refinance", tax_ato: "Tax or ATO", "100k+": "$100k+/month",
};

// Display strings for the money/time bands (used in the UI, tables and emails).
export const AMOUNT_DISPLAY: Record<(typeof AMOUNT_BANDS)[number], string> = {
  "<25k": "Under $25k", "25-50k": "$25k–$50k", "50-100k": "$50k–$100k",
  "100-250k": "$100k–$250k", "250-500k": "$250k–$500k", "500k+": "$500k+",
};
export const AMOUNT_SHORT: Record<(typeof AMOUNT_BANDS)[number], string> = {
  "<25k": "<$25k", "25-50k": "$25-50k", "50-100k": "$50-100k",
  "100-250k": "$100-250k", "250-500k": "$250-500k", "500k+": "$500k+",
};
export const REVENUE_DISPLAY: Record<(typeof REVENUE_BANDS)[number], string> = {
  "<10k": "Under $10k/month", "10-25k": "$10k–$25k/month", "25-50k": "$25k–$50k/month",
  "50-100k": "$50k–$100k/month", "100k+": "$100k+/month",
};
export const TRADING_DISPLAY: Record<(typeof TRADING_BANDS)[number], string> = {
  "<6m": "Under 6 months", "6-12m": "6–12 months", "1-2y": "1–2 years", "2-5y": "2–5 years", "5y+": "5+ years",
};

/** Human label for any coded value, falling back to LABELS then the raw value. */
export function label(v: string | null | undefined): string {
  if (!v) return "n/a";
  return LABELS[v] ?? v;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trim = (max: number) => z.string().trim().max(max);

export const leadSchema = z.object({
  // Step 1 — what do you need
  amount_requested: z.enum(AMOUNT_BANDS),
  loan_purpose: z.enum(LOAN_PURPOSES),
  loan_purpose_detail: trim(500).optional().or(z.literal("")),
  urgency: z.enum(URGENCY_VALUES).optional(),
  product_interest: z.array(z.enum(PRODUCTS)).default([]),

  // Step 2 — about the business
  business_name: trim(160).min(1, "Business name is required"),
  // ABN captured as entered — deliberately lenient so a formatting quirk (dashes,
  // an ACN, a stray digit) never blocks the lead; the operator verifies it later.
  abn: trim(30).optional().or(z.literal("")),
  entity_type: z.enum(ENTITY_TYPES).optional(),
  industry: trim(120).optional().or(z.literal("")),
  state: z.enum(STATES).optional(),
  trading_since: z.enum(TRADING_BANDS).optional(),
  website: trim(200).optional().or(z.literal("")),
  monthly_revenue: z.enum(REVENUE_BANDS),
  avg_bank_balance: trim(60).optional().or(z.literal("")),
  has_existing_loans: z.boolean().optional(),
  existing_loan_detail: trim(500).optional().or(z.literal("")),
  credit_profile: z.enum(CREDIT_PROFILES).optional(),
  has_ato_debt: z.boolean().optional(),
  ato_debt_band: z.enum(ATO_DEBT_BANDS).optional(),
  security_available: z.boolean().optional(),

  // Step 3 — contact + consent
  first_name: trim(80).min(1, "First name is required"),
  last_name: trim(80).min(1, "Last name is required"),
  email: z.string().trim().max(160).regex(emailRe, "Enter a valid email"),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  preferred_contact: z.enum(PREFERRED_CONTACT).optional(),
  consent_privacy: z.literal(true, { message: "This consent is required to proceed" }),
  consent_contact: z.literal(true, { message: "This consent is required to proceed" }),

  // Hidden attribution
  source_page: trim(200).optional().or(z.literal("")),
  referrer: trim(400).optional().or(z.literal("")),
  utm_source: trim(120).optional().or(z.literal("")),
  utm_medium: trim(120).optional().or(z.literal("")),
  utm_campaign: trim(120).optional().or(z.literal("")),

  // Spam honeypot — must stay empty. Named innocuously.
  company_website_confirm: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

// The subset matchLenders() needs (also satisfied by a full LeadInput).
export type LeadMatchInput = Pick<
  LeadInput,
  "amount_requested" | "monthly_revenue" | "trading_since" | "credit_profile" | "has_ato_debt" | "product_interest"
>;
