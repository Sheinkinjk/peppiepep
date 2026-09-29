// Content model for the Hims page set.
// Every page is data. The renderer (src/components/hims/HimsPage.tsx) owns layout,
// disclosure placement and the offer box, so copy files cannot forget them.

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
  | {
      type: "compare";
      id: string;
      heading: string;
      intro?: string;
      columns: string[]; // first column is the row label header
      rows: { label: string; cells: string[]; verify?: boolean }[];
      footnote?: string;
    }
  | { type: "fit"; id: string; heading: string; suits: string[]; notFor: string[] }
  | { type: "picks"; id: string; heading: string; intro?: string; picks: { label: string; pick: string; why: string }[] }
  | { type: "questions"; id: string; heading: string; intro?: string; items: string[] }
  | { type: "callout"; id: string; heading: string; body: string[] }
  | { type: "offer"; id: string; vertical: Vertical }
  | { type: "eligibility"; id: string; vertical: Vertical }
  | {
      type: "providers";
      id: string;
      heading: string;
      intro?: string;
      providers: {
        name: string;
        bestFor: string;
        summary: string;
        facts: LedgerRow[];
        /** "hims" uses the Hims offer + code; "mosh" uses the Mosh link; "none" shows no button. */
        cta: "hims" | "mosh" | "none";
      }[];
    }
  | { type: "faq"; id: string; heading: string; items: { q: string; a: string }[] };

export type Source = { label: string; url: string };

export type HimsPageContent = {
  slug: string;
  /** Which offer the hero and closing CTA use. */
  vertical: Vertical;
  kind: "review" | "versus" | "best";
  seoTitle: string;
  metaDescription: string;
  /** Small category label above the H1, e.g. "Men's weight loss telehealth · Australia". */
  eyebrow: string;
  h1: string;
  /** The first paragraph after the H1. It answers the page's query; nothing sits above it. */
  standfirst: string;
  /** The hub this page belongs to, for the breadcrumb. */
  hub: { label: string; href: string };
  /** The buyer's question, verbatim, asked as the H2 over the verdict. */
  verdictQuestion: string;
  /** Short verdict answering verdictQuestion. Plain, no hype. */
  verdict: string[];
  blocks: Block[];
  sources: Source[];
  /** Other partners named with an affiliate relationship on this page (for the disclosure box). */
  otherPartnersOnPage?: string[];
  related: { label: string; href: string; desc?: string }[];
};
