import { Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";

/**
 * Display: Schibsted Grotesk (Bakken & Bæck for Schibsted Media, OFL).
 * Body:    Source Serif 4 (Frank Grießhammer, Adobe, OFL).
 *
 * Not the superfamily on either side. A grotesque headline over a serif
 * paragraph is the split that reads as a publisher rather than a product, and
 * Schibsted's own text cut would have made the page consistent and anonymous.
 */
export const display = Schibsted_Grotesk({
  subsets: ["latin"], display: "swap", variable: "--font-rd-display",
});
export const body = Source_Serif_4({
  subsets: ["latin"], display: "swap", variable: "--font-rd-body",
});
