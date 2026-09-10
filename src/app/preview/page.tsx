import type { Metadata } from "next";
import Link from "next/link";
import {
  categoriesWithVerifiedOffer,
  formatReading,
  oldestReadingISO,
  verifiedOfferCount,
} from "@/lib/preview/data";

export const metadata: Metadata = {
  title: "Homepage design preview",
  robots: { index: false, follow: false },
};

export default function PreviewIndex() {
  return (
    <div className="rl-shell">
      <main className="rl-section">
        <div className="rl-wrap">
          <h1 className="rl-h2" style={{ fontSize: "var(--rl-s-4)" }}>
            Homepage design preview
          </h1>
          <p className="rl-lede">
            Two variants of the same content, sharing one set of tokens. Neither is
            live, and nothing here changes the existing site.
          </p>

          <div className="rl-index">
            <Link href="/preview/home-a" className="rl-index__card">
              <p className="rl-guide__t" style={{ fontSize: "var(--rl-s-1)" }}>
                Variant A, Publisher
              </p>
              <p className="rl-guide__l">
                Editorial serif, left aligned, generous air. The verification record
                is the hero proof, and the offers sit in a full-width table.
              </p>
            </Link>
            <Link href="/preview/home-b" className="rl-index__card">
              <p className="rl-guide__t" style={{ fontSize: "var(--rl-s-1)" }}>
                Variant B, Utility
              </p>
              <p className="rl-guide__l">
                Grotesque headlines, tighter rhythm. Leads with the category
                selector, one inverted verification band, offers as cards.
              </p>
            </Link>
          </div>

          <h2 className="rl-h2" style={{ marginBlockStart: "3rem" }}>
            The numbers on both pages
          </h2>
          <p className="rl-lede rl-measure">
            Computed from <code>src/lib/offers.ts</code> at render time, not typed in.
            An offer counts only where it carries a real discount and a reading date.
          </p>
          <ul style={{ marginBlockStart: "1rem", paddingInlineStart: "1.1rem" }}>
            <li>
              <span className="rl-num">{verifiedOfferCount}</span> offers with a
              verified discount
            </li>
            <li>
              <span className="rl-num">{categoriesWithVerifiedOffer.length}</span>{" "}
              categories with a verified offer:{" "}
              {categoriesWithVerifiedOffer.join(", ").toLowerCase()}
            </li>
            <li>
              oldest reading{" "}
              {oldestReadingISO ? (
                <time dateTime={oldestReadingISO}>
                  {formatReading(oldestReadingISO)}
                </time>
              ) : (
                "not recorded"
              )}
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
