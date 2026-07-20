// App-layer vocabularies for lead + submission state. The DB intentionally has no
// CHECK constraint (see the migration) so ops can extend these without a migration;
// keep this list as the source of truth the admin UI validates against.

export const LEAD_STATUSES = [
  "new", "contacted", "qualified", "submitted", "approved", "declined", "settled", "dead",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const SUBMISSION_OUTCOMES = ["pending", "approved", "declined", "withdrawn"] as const;
export type SubmissionOutcome = (typeof SUBMISSION_OUTCOMES)[number];

// Tailwind-ish colour tokens for status pills (kept as inline styles in the admin).
export const STATUS_TONE: Record<string, { bg: string; fg: string }> = {
  new: { bg: "#e8f5ee", fg: "#0a7c42" },
  contacted: { bg: "#e7f0fb", fg: "#1f5fbf" },
  qualified: { bg: "#eef0ff", fg: "#4b4fbf" },
  submitted: { bg: "#fff4e5", fg: "#b06a00" },
  approved: { bg: "#e8f5ee", fg: "#0a7c42" },
  settled: { bg: "#dff5e6", fg: "#067a3a" },
  declined: { bg: "#fdeaea", fg: "#c22" },
  dead: { bg: "#f0f0f0", fg: "#777" },
};

export function statusTone(status: string) {
  return STATUS_TONE[status] ?? { bg: "#f0f0f0", fg: "#555" };
}
