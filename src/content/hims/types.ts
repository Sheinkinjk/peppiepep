// Content model for the Hims page set.
// Every page is data. The renderer (src/components/hims/HimsPage.tsx) owns layout,
// disclosure placement and the offer box, so copy files cannot forget them.
//
// Three layouts:
//  - "review": a Hims brand page, on the /moshy brand-page pattern.
//  - "versus": a Hims and Mosh comparison for one program, on the /moshy-vs-juniper
//    pattern: answer-first lead, compact disclosure, equal cards in alphabetical
//    order, one dated inclusions table, FAQ. No verdict box, no sticky button, no pick.
//  - "overview" (1 Oct 2026, /hims-vs-mosh only): the two businesses profiled side
//    by side, then a program selector (hair loss, weight loss, ED) whose three
//    panels are all server-rendered, then the codes, a short FAQ and sources.

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
  /** Versus pages: balanced "Choose Hims if" / "Choose Mosh if" lists. Not used on /hims-vs-mosh. */
  | { type: "choose"; id: string; hims: string[]; mosh: string[] }
  | { type: "faq"; id: string; heading: string; items: { q: string; a: string }[] };

export type Source = { label: string; url: string };

/** One side of a versus card. Same fields for both providers. */
export type PairSide = { bestIf: string; points: string[] };

/** One fact row in the "About the two businesses" profiles. Same label for both sides. */
export type ProfileRow = { label: string; hims: string; mosh: string };

/** One panel of the /hims-vs-mosh program selector. */
export type ProgramPanel = {
  vertical: Vertical;
  /** URL hash and element id of the panel. */
  anchor: "hair-loss" | "weight-loss" | "ed";
  /** Tab label. */
  tab: string;
  /** The buyer's question, verbatim, as the panel's H2. */
  question: string;
  /** Two or three neutral sentences. */
  summary: string;
  /** Labels of the rows to show from INCLUSIONS[vertical], in order (4 to 6). */
  rows: string[];
  /** The full comparison page for this program. */
  full: { label: string; href: string };
};

export type OverviewContent = {
  profiles: ProfileRow[];
  /** What the profile facts were read from, and when. */
  profilesNote: string;
  selectorHeading: string;
  selectorIntro: string;
  programs: ProgramPanel[];
};

export type HimsPageContent = {
  slug: string;
  /** Which Hims offer (and, on versus pages, which Mosh link) the page uses. */
  vertical: Vertical;
  kind: "review" | "versus" | "overview";
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
  /** The buyer's question, verbatim, asked as an H2. Review and versus pages. */
  verdictQuestion?: string;
  /** Plain answer to verdictQuestion. On versus pages it favours neither provider. */
  verdict?: string[];
  /** Overview layout only (/hims-vs-mosh). */
  overview?: OverviewContent;
  /** Versus pages only: the two cards, Hims then Mosh. */
  pair?: { hims: PairSide; mosh: PairSide };
  blocks: Block[];
  sources: Source[];
  /**
   * Links beyond the Hims set. The other Hims pages are added by the renderer from
   * src/content/hims/siblings.ts, so every page links to all six siblings and the
   * links are reciprocal by construction.
   */
  related: { label: string; href: string; desc?: string }[];
  /** ISO date the page's copy last changed, for WebPage and Article dateModified. */
  modified: string;
};
