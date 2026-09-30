/**
 * What Hims and Mosh each say they include, read off each provider's own public
 * pages on 30 September 2026 and re-read on 1 October 2026. One source of truth for the four comparison pages,
 * on the pattern of src/lib/compare/weight-inclusions.ts.
 *
 * Rules for every cell:
 *  - only what the provider states on its own page, read on INCLUSIONS_READ_ON;
 *  - no prices (Jarred, 27 and 29 Sep 2026);
 *  - no treatment, shipping or supply wording, no plan names that are efficacy
 *    words (TGA service wording, 30 Sep 2026);
 *  - a fact that could not be read today is dropped. A cell that must exist but
 *    cannot be filled yet is `null`, which renders "Awaiting Mosh" with a flag.
 *
 * Columns are alphabetical (Hims, Mosh) and there is no winner column.
 */
export const INCLUSIONS_READ_ON = "1 October 2026";

export type InclusionsKey = "overview" | "weight" | "hair" | "ed";

export type InclusionRow = {
  label: string;
  hims: string;
  mosh: string | null;
  /** Preview flag beside the Hims cell (a placeholder Hims has not confirmed). */
  himsFlag?: string;
  /** Preview flag beside the Mosh cell. A null Mosh cell is always flagged "Awaiting Mosh". */
  moshFlag?: string;
};

export type InclusionsTableData = {
  rows: InclusionRow[];
  sources: { hims: { label: string; url: string }[]; mosh: { label: string; url: string }[] };
};

// Shared cells. Declared once so a change moves every table together.
const HIMS_START = "Free online quiz of about two minutes, then a phone consultation with an Australian practitioner";
const HIMS_PRACTITIONERS = "AHPRA-registered practitioners based in Australia";
const HIMS_CONSULT_FEE =
  "A consult fee applies; Hims refunds it if no suitable plan is found for you or you decide the recommended option isn't for you";
const HIMS_HOURS = "Consultations from 7am to 11pm AEST, seven days";
const HIMS_MEDICARE = "Not claimable on Medicare (Hims FAQ)";

const MOSH_START = "Free online quiz, then a consultation by call, video or text";
const MOSH_PRACTITIONERS =
  "AHPRA-registered medical practitioners and nurse practitioners based in Australia, paid on a fee-for-service basis";
const MOSH_CONSULT_FEE = "No charge for the initial consultation; program fees apply";

// The Refer Labs offer row. Hims' code and offer are placeholders until Hims'
// reviewers confirm them (Jarred, 30 Sep 2026).
const HIMS_OFFER_CELL = "REFERLABS89: no charge for the initial consultation for new patients; program fees apply";
const HIMS_OFFER_FLAG = "Offer and code to confirm";
const MOSH_HAIR_OFFER_CELL = "REFERAL55: a discount on a new customer's first hair order";

const HIMS_SRC = {
  weight: { label: "hims.com.au/weight-loss", url: "https://hims.com.au/weight-loss" },
  hair: { label: "hims.com.au/hair-loss", url: "https://hims.com.au/hair-loss" },
  ed: { label: "hims.com.au/erectile-dysfunction", url: "https://hims.com.au/erectile-dysfunction" },
  faq: { label: "hims.com.au/faq", url: "https://hims.com.au/faq" },
};
const MOSHY_SRC = {
  home: { label: "getmoshy.com.au", url: "https://www.getmoshy.com.au/" },
  weight: { label: "getmoshy.com.au/weight-loss", url: "https://www.getmoshy.com.au/weight-loss" },
};
const MOSH_SRC = {
  home: { label: "getmosh.com.au", url: "https://www.getmosh.com.au/" },
  pricing: { label: "getmosh.com.au/pricing", url: "https://www.getmosh.com.au/pricing" },
  weight: { label: "getmosh.com.au/weight-loss", url: "https://www.getmosh.com.au/weight-loss" },
  hair: { label: "getmosh.com.au/hair-loss", url: "https://www.getmosh.com.au/hair-loss" },
  ed: { label: "getmosh.com.au/erectile-dysfunction", url: "https://www.getmosh.com.au/erectile-dysfunction" },
  referlabs: { label: "getmosh.com.au/start/referlabs", url: "https://www.getmosh.com.au/start/referlabs" },
};

export const INCLUSIONS: Record<InclusionsKey, InclusionsTableData> = {
  overview: {
    rows: [
      {
        label: "Ownership",
        hims: "Formerly Pilot. Part of Hims & Hers Health, which completed its purchase of Eucalyptus on 2 June 2026",
        mosh: "Australian owned. Lists Moshy and Healthy Mummy as its brands",
      },
      { label: "Programs", hims: "Weight loss, hair loss and sexual health", mosh: "Hair loss, sexual health, mental health and skin; weight loss through Moshy, its partner brand" },
      { label: "How you start", hims: HIMS_START, mosh: MOSH_START },
      { label: "Consult fee", hims: HIMS_CONSULT_FEE, mosh: MOSH_CONSULT_FEE },
      { label: "Practitioners", hims: HIMS_PRACTITIONERS, mosh: MOSH_PRACTITIONERS },
      {
        label: "Support after you start",
        hims: "Unlimited practitioner appointments and 24-hour Care Team access from your phone",
        mosh: "Unlimited medical follow-ups",
      },
      {
        label: "Stopping",
        hims: "Pause, delay or cancel from your profile",
        mosh: "No lock-in contracts; cancel anytime",
      },
      {
        label: "Money-back",
        hims: "Weight: 30 days from starting. Hair: 180 days. Under Hims' terms",
        mosh: "Weight (through Moshy): 30 days. Hair: 180 days on quarterly programs. Under each brand's terms",
      },
      { label: "Prices", hims: "Weight pricing on Hims' weight page; hair and sexual health after the consult", mosh: "Published on Mosh's pricing page" },
      { label: "Refer Labs code", hims: HIMS_OFFER_CELL, himsFlag: HIMS_OFFER_FLAG, mosh: MOSH_HAIR_OFFER_CELL },
    ],
    sources: { hims: [HIMS_SRC.weight, HIMS_SRC.hair, HIMS_SRC.ed, HIMS_SRC.faq], mosh: [MOSH_SRC.home, MOSH_SRC.pricing, MOSH_SRC.weight, MOSH_SRC.hair, MOSH_SRC.referlabs] },
  },

  // Weight compares Hims with Moshy, Mosh's partner brand for weight (Jarred, 30 Sep
  // 2026). Moshy cells are the facts in src/lib/compare/weight-inclusions.ts, read off
  // getmoshy.com.au/weight-loss the same day. The `mosh` field holds the Moshy cell.
  weight: {
    rows: [
      {
        label: "Who it is for",
        hims: "Men's telehealth covering weight loss, hair loss and sexual health",
        mosh: "An online women's health clinic by its own description; open to anyone a practitioner assesses as suitable",
      },
      { label: "How you start", hims: HIMS_START, mosh: "Online questionnaire, then a consult by phone or video" },
      {
        label: "Commitment",
        hims: "The advertised starting offer is a pay-upfront option with a twelve-month commitment",
        mosh: "The Refer Labs offer carries a three-month minimum commitment",
      },
      {
        label: "Money-back",
        hims: "30-day money-back guarantee: contact Hims within 30 days of starting. Terms apply",
        mosh: "30-day money-back guarantee. Terms apply",
      },
      {
        label: "Practitioner and care team",
        hims: "Unlimited support from your practitioner and a 24/7 Care Team of practitioners, health coaches and pharmacists",
        mosh: "Unlimited medical support from a care team of medical practitioners, nurses, pharmacists, psychologists, dietitians and exercise physiologists",
      },
      {
        label: "Coaching and nutrition",
        hims: "Nutrition guidance from the Care Team; optional online community",
        mosh: "In-app health coaching, dietitian-approved meal plans and recipes, and a community",
      },
      { label: "How it is priced", hims: "Weight pricing on Hims' weight page", mosh: "An all-inclusive program fee published on Moshy's site" },
      {
        label: "Refer Labs code",
        hims: HIMS_OFFER_CELL,
        himsFlag: HIMS_OFFER_FLAG,
        mosh: "REFERRAL120: a discount on a new customer's first Moshy order, with a three-month minimum commitment",
      },
    ],
    sources: { hims: [HIMS_SRC.weight, HIMS_SRC.faq], mosh: [MOSHY_SRC.weight, MOSHY_SRC.home] },
  },

  hair: {
    rows: [
      { label: "How you start", hims: HIMS_START, mosh: MOSH_START },
      { label: "Consult fee", hims: HIMS_CONSULT_FEE, mosh: MOSH_CONSULT_FEE },
      {
        label: "Money-back",
        hims: "180-day money-back guarantee on all hair plans. Terms apply",
        mosh: "180-day money-back guarantee on quarterly hair programs. Terms apply",
      },
      {
        label: "Support",
        hims: "24-hour Care Team of nurses, pharmacists and practitioners; unlimited plan changes on request",
        mosh: "Unlimited access to your practitioner by text, call or video",
      },
      {
        label: "Stopping",
        hims: "Cancel before your next order is processed, with no cancellation fee",
        mosh: "No lock-in contracts; cancel anytime",
      },
      { label: "Price match", hims: "Not advertised", mosh: "On substantially comparable hair programs, by application form. Terms apply" },
      { label: "Prices", hims: "Not published on Hims' hair page; shown after the consult", mosh: "Published on Mosh's pricing page" },
      { label: "Refer Labs code", hims: HIMS_OFFER_CELL, himsFlag: HIMS_OFFER_FLAG, mosh: MOSH_HAIR_OFFER_CELL },
    ],
    sources: { hims: [HIMS_SRC.hair, HIMS_SRC.faq], mosh: [MOSH_SRC.hair, MOSH_SRC.referlabs, MOSH_SRC.pricing, MOSH_SRC.home] },
  },

  ed: {
    rows: [
      { label: "How you start", hims: HIMS_START, mosh: "Short online questionnaire, then a private consultation with a practitioner" },
      {
        label: "Consultation format",
        hims: `Phone. ${HIMS_HOURS}`,
        mosh: "Text messaging, with phone and video also available. Mosh says you never need to show your face",
      },
      { label: "Practitioners", hims: HIMS_PRACTITIONERS, mosh: MOSH_PRACTITIONERS },
      { label: "Consult fee", hims: HIMS_CONSULT_FEE, mosh: null },
      { label: "Contract", hims: "No lock-in contracts; pause or cancel at any time", mosh: "No lock-in contracts; cancel anytime (Mosh home page)" },
      { label: "Support", hims: "24-hour Care Team of nurses, pharmacists and practitioners", mosh: "Message your practitioner by text; unlimited medical follow-ups (Mosh home page)" },
      { label: "Medicare", hims: HIMS_MEDICARE, mosh: null },
      { label: "Refer Labs code", hims: HIMS_OFFER_CELL, himsFlag: HIMS_OFFER_FLAG, mosh: null },
    ],
    sources: { hims: [HIMS_SRC.ed, HIMS_SRC.faq], mosh: [MOSH_SRC.ed, MOSH_SRC.home] },
  },
};
