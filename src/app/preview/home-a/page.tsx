import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import { PreviewHeader } from "@/components/preview/Header";
import { ProofPanel, OffersTable } from "@/components/preview/Offers";
import {
  CategoryChips,
  EditorialLine,
  HowWeCompare,
  Newsletter,
  PartnerStrip,
  PopularComparisons,
  PreviewFooter,
} from "@/components/preview/Shared";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rl-newsreader",
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Variant A, Publisher",
  robots: { index: false, follow: false },
};

/**
 * Variant A, "Publisher".
 *
 * An independent Australian publisher that happens to compare things. The
 * verification record is the hero proof, so the right-hand panel carries the
 * three most recently read offers rather than an image.
 */
export default function HomeA() {
  return (
    <div className={`rl-variant-a rl-shell ${newsreader.variable}`}>
      <PreviewHeader />

      <main id="preview-main">
        <section className="rl-section">
          <div className="rl-wrap">
            <div className="rl-heroA">
              <div>
                <h1 className="rl-heroA__h1">
                  Independent comparisons, with the date we checked.
                </h1>
                <p className="rl-heroA__sub">
                  Every offer below was read off the provider&rsquo;s own page, and we
                  publish the date we read it.
                </p>
                <div className="rl-actions">
                  <Link href="/deals" className="rl-btn rl-btn--primary">
                    Browse current offers
                  </Link>
                  <Link href="/editorial-policy" className="rl-btn rl-btn--quiet">
                    How we verify
                  </Link>
                </div>
              </div>
              <ProofPanel />
            </div>
          </div>
        </section>

        <section className="rl-section rl-section--tight">
          <div className="rl-wrap">
            <CategoryChips />
          </div>
        </section>

        <section className="rl-section rl-rule-top">
          <div className="rl-wrap">
            <h2 className="rl-h2">Current offers</h2>
            <p className="rl-lede" style={{ marginBottom: "1.5rem" }}>
              Offers carrying a real discount. Free plans and free trials are not
              listed here, because anyone can start those direct from the vendor.
            </p>
            <OffersTable />
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
