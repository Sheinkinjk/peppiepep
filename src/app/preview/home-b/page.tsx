import type { Metadata } from "next";
import Link from "next/link";
import { Schibsted_Grotesk } from "next/font/google";
import { PreviewHeader } from "@/components/preview/Header";
import { OfferCards } from "@/components/preview/OfferCards";
import { VerifiedStrip } from "@/components/preview/VerifiedStrip";
import {
  CategoryTiles,
  EditorialLine,
  HowWeCompare,
  Newsletter,
  PartnerStrip,
  PopularComparisons,
  PreviewFooter,
} from "@/components/preview/Shared";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rl-schibsted",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Variant B, Utility",
  robots: { index: false, follow: false },
};

/**
 * Variant B, "Utility".
 *
 * Same content, same tokens, same trust rules. Leads with the tool: the
 * category selector sits directly under the headline, and the verification
 * record becomes a single inverted band rather than a panel.
 */
export default function HomeB() {
  return (
    <div className={`rl-variant-b rl-shell ${schibsted.variable}`}>
      <PreviewHeader />

      <main id="preview-main">
        <section className="rl-heroB">
          <div className="rl-wrap">
            <h1 className="rl-heroB__h1">Compare it properly, before you buy.</h1>
            <p className="rl-heroB__sub">
              Pick a category. Every offer and price is read off the provider&rsquo;s
              own page, and carries the date we read it.
            </p>
            <CategoryTiles />
          </div>
        </section>

        <VerifiedStrip />

        <section className="rl-section">
          <div className="rl-wrap">
            <h2 className="rl-h2">Current offers</h2>
            <p className="rl-lede" style={{ marginBottom: "1.5rem" }}>
              Offers carrying a real discount. Free plans and free trials are not
              listed here, because anyone can start those direct from the vendor.
            </p>
            <OfferCards />
            <p style={{ marginBlockStart: "1.5rem" }}>
              <Link href="/deals" className="rl-btn rl-btn--quiet">
                Browse current offers
              </Link>
            </p>
          </div>
        </section>

        <HowWeCompare />
        <PartnerStrip />
        <PopularComparisons />
        <EditorialLine />
        <Newsletter />
      </main>

      <PreviewFooter />
    </div>
  );
}
