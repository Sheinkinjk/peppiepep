import { Public_Sans } from "next/font/google";

/**
 * Public Sans is used ONLY by the three legacy preview routes (home-a, home-b,
 * plate). It used to be loaded in the shared preview layout, which meant every
 * preview route preloaded and downloaded 26KB of a face it never rendered —
 * including /preview/redesign, where it was 26 of the 98KB of font traffic and
 * one of four preloads competing for the connection ahead of the two faces the
 * page actually paints with.
 */
export const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rl-public-sans",
  weight: ["400", "500", "600"],
});
