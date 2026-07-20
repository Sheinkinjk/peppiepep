// Consent record versioning for business-lending leads. Bump the version whenever
// the wording of either checkbox or the collection notice materially changes, so
// every stored lead is tied to the exact text the applicant agreed to.
export const CONSENT_TEXT_VERSION = "v1.0-2026-07";

// The two consent statements shown as separate, unticked checkboxes on the form.
// Kept here as the single source of truth so the form, the API and any audit read
// the same words.
export const CONSENT_PRIVACY_LABEL =
  "I consent to Refer Labs collecting my information and disclosing it to lenders on its panel for the purpose of assessing my finance application.";

export const CONSENT_CONTACT_LABEL =
  "I consent to being contacted by Refer Labs and its lender partners by phone, email and SMS.";
