// Consent record versioning for business-lending leads. Bump the version whenever
// the wording of either checkbox or the collection notice materially changes, so
// every stored lead is tied to the exact text the applicant agreed to.
// v2.0 (23 July 2026): the v1.0 wording said "lenders on its panel" and "its lender
// partners". Both were wrong in the same two ways. Refer Labs holds no lender panel
// and has no partnership with any lender, and neither statement covered disclosure to
// a FINANCE BROKER, which is how an enquiry actually reaches a lender. Consent that
// does not name the recipient does not authorise the disclosure, so this is corrected
// and versioned rather than edited in place.
export const CONSENT_TEXT_VERSION = "v2.0-2026-07";

// The two consent statements shown as separate, unticked checkboxes on the form.
// Kept here as the single source of truth so the form, the API and any audit read
// the same words.
export const CONSENT_PRIVACY_LABEL =
  "I consent to Refer Labs collecting my information and disclosing it to lenders, and to finance brokers who submit applications to lenders, for the purpose of assessing my finance enquiry.";

export const CONSENT_CONTACT_LABEL =
  "I consent to being contacted about this enquiry by Refer Labs, and by the lenders and brokers my enquiry is passed to, by phone, email and SMS.";
