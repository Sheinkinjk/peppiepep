// How each Hims page is linked from the other six (1 Oct 2026).
//
// The renderer adds every sibling to every page's "Related reading", so the seven
// pages link to each other and the links are reciprocal by construction. A page's
// own `related` field now holds only links outside the set.
//
// `neutralLabel` is used on the three single-brand review pages (/hims,
// /hims-hair-loss, /hims-ed), which may not name a competitor (Hims handbook;
// lint:hims enforces it for the page files). Descriptions never name a competitor,
// for the same reason.

import type { HIMS_SLUG_LIST } from "./slugs";

type Slug = (typeof HIMS_SLUG_LIST)[number];

export const SIBLINGS: Record<Slug, { label: string; neutralLabel?: string; desc: string }> = {
  hims: {
    label: "Hims weight loss",
    desc: "How the weight program starts, the twelve-month commitment and the 30-day refund.",
  },
  "hims-hair-loss": {
    label: "Hims hair loss",
    desc: "The hair consultation, the 180-day guarantee and cancelling before an order.",
  },
  "hims-ed": {
    label: "Hims ED",
    desc: "The private phone consultation, its hours, contracts and the Care Team.",
  },
  "hims-vs-mosh": {
    label: "Hims vs Mosh",
    neutralLabel: "How Hims compares with other providers",
    desc: "Both businesses side by side, then hair loss, weight loss and ED.",
  },
  "best-mens-weight-loss-program-australia": {
    label: "Men's weight loss programs: Hims vs Moshy",
    neutralLabel: "Online men's weight loss programs compared",
    desc: "Commitment, refund windows, support and nutrition help in one table.",
  },
  "best-hair-loss-treatment-online-australia": {
    label: "Online hair loss treatment: Hims vs Mosh",
    neutralLabel: "Online hair loss services compared",
    desc: "Consult fees, guarantee scope, support and cancelling in one table.",
  },
  ed: {
    label: "Online ED consultations: Hims vs Mosh",
    neutralLabel: "Online ED consultations compared",
    desc: "Consultation format, hours, practitioners and contracts in one table.",
  },
};
