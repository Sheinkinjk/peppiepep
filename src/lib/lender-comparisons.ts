// ─── Lender head-to-head registry ────────────────────────────────────────────
// Neutral "X vs Y" comparisons built from the verified lenders.ts data. This is
// the content the lenders themselves can't credibly write, and it targets the
// high-intent "prospa vs lumi" style queries. Each entry carries UNIQUE lead and
// verdict copy (no shared skeleton) so these read as real editorial, not a
// templated permutation. The data table and "who each suits" are derived from the
// lender config, so figures stay accurate and update in one place.

export interface LenderComparison {
  slug: string;   // e.g. "prospa-vs-lumi"
  a: string;      // lender slug
  b: string;      // lender slug
  title: string;
  description: string;
  keywords: string[];
  lead: string;
  verdict: string;
  priority: number;
}

export const LENDER_COMPARISONS: LenderComparison[] = [
  {
    slug: "prospa-vs-lumi",
    a: "prospa", b: "lumi",
    title: "Prospa vs Lumi (2026): Which Business Lender Fits You? | Refer Labs",
    description:
      "Prospa vs Lumi for an Australian business loan: speed, loan size, how each prices, and who each suits. Prospa funds within an hour on a clean file; Lumi quotes a total repayment and lends up to $1M. Independent, no paid rankings.",
    keywords: ["prospa vs lumi", "lumi vs prospa", "prospa or lumi business loan", "prospa lumi comparison australia"],
    lead:
      "Prospa and Lumi are two of Australia's best-known non-bank business lenders, and on paper they look similar: fast, unsecured, online. The differences that actually matter are how big a facility each will write, how they price it, and how they treat your credit file. Prospa is ASX-listed and built for speed on a clean file; Lumi will go larger, up to $1 million, and quotes a total repayment upfront rather than a headline rate.",
    verdict:
      "If you want funds fast and have a clean credit history, Prospa is the more natural fit. If you need a larger facility or want the full repayment figure stated upfront before you decide, Lumi is worth the look. Neither is 'better' in the abstract, and one enquiry with us shows which your business plausibly fits.",
    priority: 0.78,
  },
  {
    slug: "prospa-vs-moula",
    a: "prospa", b: "moula",
    title: "Prospa vs Moula (2026): Which Business Lender Fits You? | Refer Labs",
    description:
      "Prospa vs Moula for an Australian business loan: how each assesses you, speed, loan size and pricing. Prospa prices on simple interest and funds fast; Moula publishes a from-rate and assesses largely on your bank and accounting data. No paid rankings.",
    keywords: ["prospa vs moula", "moula vs prospa", "prospa or moula", "prospa moula comparison australia"],
    lead:
      "Prospa and Moula both lend unsecured to Australian businesses, but they get to a decision differently. Moula leans heavily on your bank-transaction and accounting data, which suits a business with clean, readable books, and it publishes a from-rate so you have a number to anchor to. Prospa prices each loan on simple interest and is built to fund quickly once approved. The right one depends on how your business looks on paper and how fast you need the money.",
    verdict:
      "Moula tends to suit a data-rich business that wants a published rate to start from; Prospa suits one that values speed and has a clean file. Both cap out around $500,000. Tell us your numbers once and we'll show you which of the two your enquiry fits, alongside the other lenders we compare.",
    priority: 0.78,
  },
  {
    slug: "lumi-vs-moula",
    a: "lumi", b: "moula",
    title: "Lumi vs Moula (2026): Which Business Lender Fits You? | Refer Labs",
    description:
      "Lumi vs Moula for an Australian business loan: loan size, pricing transparency, speed and how each assesses you. Lumi funds up to $1M and quotes a total repayment; Moula publishes a from-rate and reads your bank data. Independent, no paid rankings.",
    keywords: ["lumi vs moula", "moula vs lumi", "lumi or moula business loan", "lumi moula comparison australia"],
    lead:
      "Lumi and Moula are both Australian non-bank lenders that fund fast and assess more flexibly than a bank, but they diverge on size and how they present cost. Lumi will write up to $1 million and quotes a total repayment amount upfront, which some borrowers find clearer than a rate. Moula caps lower, around $500,000, publishes a from-rate, and relies on reading your bank and accounting data to decide.",
    verdict:
      "Choose the frame that helps you decide: Lumi if you want a larger facility or the total-repayment number upfront, Moula if you want a published rate and have clean, readable books. One enquiry with us checks both against your actual situation.",
    priority: 0.76,
  },
];

export function getComparison(slug: string): LenderComparison | undefined {
  return LENDER_COMPARISONS.find((c) => c.slug === slug);
}
