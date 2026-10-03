/**
 * Published cover facts for the two pet insurers we refer to, in one place.
 *
 * Why this exists (3 Oct 2026, legal review M7). Refer Labs holds no AFSL and
 * relies on the referral exemption in Corporations Regulations reg 7.6.01(1)(e),
 * which covers referring a reader to an insurer and does NOT cover an opinion on
 * which policy suits them (s 766B). The pet pages used to carry "Knose suits you
 * if", "worth insuring" and "the strongest argument for insuring" lines. Those
 * were replaced with these rows: what each insurer publishes, word for word in
 * substance, with the date it was read, and no mapping to the reader.
 *
 * Rules for this file:
 * - Facts only, as each insurer states them on its own site. No adjective that
 *   ranks one against the other ("higher", "better", "unusual").
 * - Where an insurer does not publish a figure, the cell says where it is
 *   (usually the PDS) rather than guessing.
 * - Re-verify by opening each `sources` URL, correcting anything that moved,
 *   then setting READ_ON. Do not bump the date without re-reading.
 */

export const READ_ON = "2026-10-03";
export const READ_ON_LABEL = "3 October 2026";

export const SOURCES = {
  knose: ["https://www.knose.com.au/", "https://www.knose.com.au/pet-insurance-cover/"],
  petsonme: ["https://www.petsonme.com.au/compare-cover", "https://www.petsonme.com.au/"],
} as const;

const PACIFIC = "Pacific International Insurance Pty Ltd (ABN 83 169 311 193, AFSL 523921)";

export type PetCoverRow = { label: string; knose: string; petsonme: string };

export const PET_COVER_ROWS: PetCoverRow[] = [
  {
    label: "Benefit percentage",
    knose: "70%, 80% or 90% of eligible vet bills, chosen by you",
    petsonme: "80% of the eligible vet bill, on all three plans",
  },
  {
    label: "Annual benefit limit",
    knose: "Up to $25,000",
    petsonme: "$5,000 (Accidental), $10,000 (Classic), $20,000 (Deluxe)",
  },
  {
    label: "Excess options",
    knose: "$0, $100 or $200 per policy period",
    petsonme: "$100, $200 or $300",
  },
  {
    label: "Waiting periods",
    knose:
      "1 day for injuries, 14 days for illnesses, 6 months for specified conditions, behavioural conditions and dental illness (14 days for dental if under 1 year). May be waived when switching after 12 months' cover elsewhere",
    petsonme:
      "Lengths not stated on its cover pages: set out in the PDS. Waived when switching after 12 months' uninterrupted cover elsewhere",
  },
  {
    label: "Sub-limits",
    knose: "States no sub-limits on eligible treatments",
    petsonme: "Hereditary conditions $2,300pa (Classic) or $3,800pa (Deluxe). Dental $500pa (Deluxe)",
  },
  {
    label: "Hereditary and congenital",
    knose: "Covered, with a 6-month exclusion period unless waived",
    petsonme:
      "Hereditary covered on Classic and Deluxe within the sub-limits above, not on Accidental. Its “what’s not” list includes “hereditary conditions for the first 180 days after the start of your cover and before your pet’s 2nd birthday”",
  },
  {
    label: "Underwriter",
    knose: PACIFIC,
    petsonme: PACIFIC,
  },
  {
    label: "Premiums",
    knose: "Not published: quote-based",
    petsonme: "Not published: quote-based",
  },
];
