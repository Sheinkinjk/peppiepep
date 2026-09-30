// Content model for the Hims page set.
// Every page is data. The renderer (src/components/hims/HimsPage.tsx) owns layout,
// disclosure placement and the offer box, so copy files cannot forget them.
//
// Two layouts (30 Sep 2026):
//  - "review": a Hims brand page, on the /moshy brand-page pattern.
//  - "versus": a Hims and Mosh comparison, on the /moshy-vs-juniper pattern:
//    answer-first lead, compact disclosure, equal cards in alphabetical order,
//    one dated inclusions table, balanced "Choose X if" lists, FAQ. No verdict box,
//    no sticky button, no pick.

import type { InclusionsKey } from "./inclusions";

export type Vertical = "weight" | "hair" | "ed";

export type LedgerRow = {
  label: string;
  value: string;
  note?: string;
  /** true = fact still needs confirming with Hims. Renders a visible flag in preview. */
  verify?: boolean;
};

export type Block =
  | { type: "prose"; id: string; heading: string; paragraphs: string[] }
  | { type: "ledger"; id: string; heading: string; intro?: string; rows: LedgerRow[] }
  | { type: "steps"; id: string; heading: string; intro?: string; steps: { title: string; body: string }[] }
  | { type: "fit"; id: string; heading: string; suits: string[]; notFor?: string[] }
  | { type: "questions"; id: string; heading: string; intro?: string; items: string[] }
  /** Review pages: the Hims code box. Versus pages: both providers' offer terms, side by side. */
  | { type: "offer"; id: string; vertical: Vertical }
  /** Versus pages: the dated "What does each include?" table. */
  | { type: "inclusions"; id: string; heading: string; table: InclusionsKey }
  /** Versus pages: balanced "Choose Hims if" / "Choose Mosh if" lists. */
  | { type: "choose"; id: string; hims: string[]; mosh: string[] }
  | { type: "faq"; id: string; heading: string; items: { q: string; a: string }[] };

export type Source = { label: string; url: string };

/** One side of a versus card. Same fields for both providers. */
export type PairSide = { bestIf: string; points: string[] };

export type HimsPageContent = {
  slug: string;
  /** Which Hims offer (and, on versus pages, which Mosh link) the page uses. */
  vertical: Vertical;
  kind: "review" | "versus";
  /**
   * Versus pages: which Mosh link and offer the Mosh card uses. Defaults to
   * `vertical`. /hims-vs-mosh covers all three programs and uses "hair", the only
   * Mosh vertical with a Refer Labs link.
   */
  moshLink?: Vertical;
  seoTitle: string;
  metaDescription: string;
  /** Small category label above the H1. */
  eyebrow: string;
  h1: string;
  /** The first paragraph after the H1. It answers the page's query; nothing sits above it. */
  standfirst: string;
  /** The hub this page belongs to, for the breadcrumb. */
  hub: { label: string; href: string };
  /** The buyer's question, verbatim, asked as an H2. */
  verdictQuestion: string;
  /** Plain answer to verdictQuestion. On versus pages it favours neither provider. */
  verdict: string[];
  /** Versus pages only: the two cards, Hims then Mosh. */
  pair?: { hims: PairSide; mosh: PairSide };
  blocks: Block[];
  sources: Source[];
  related: { label: string; href: string; desc?: string }[];
};
