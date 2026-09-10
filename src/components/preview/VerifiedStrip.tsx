import {
  categoriesWithVerifiedOffer,
  formatReading,
  oldestReadingISO,
  verifiedOfferCount,
} from "@/lib/preview/data";

/**
 * The one inverted band on Variant B.
 *
 * Three figures, all computed from DEALS. Gold is not used here: measured
 * against --rl-ink it is 3.32:1, which fails AA for text, and these are counts
 * and dates rather than savings, so gold would be wrong twice over.
 */
export function VerifiedStrip() {
  return (
    <section className="rl-strip" aria-label="Verification record">
      <div className="rl-wrap">
        <div className="rl-strip__grid">
          <div>
            <span className="rl-strip__fig">{verifiedOfferCount}</span>
            <span className="rl-strip__label">
              offers with a discount we have verified
            </span>
          </div>
          <div>
            <span className="rl-strip__fig">
              {categoriesWithVerifiedOffer.length}
            </span>
            <span className="rl-strip__label">
              categories with a verified offer
            </span>
          </div>
          <div>
            <span className="rl-strip__fig">
              {oldestReadingISO ? (
                <time dateTime={oldestReadingISO}>
                  {formatReading(oldestReadingISO)}
                </time>
              ) : (
                "not recorded"
              )}
            </span>
            <span className="rl-strip__label">
              oldest reading in the table below
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
