import Link from "next/link";
import { PartnerLogo } from "@/components/preview/PartnerLogo";
import {
  formatReading,
  isDueForRecheck,
  mostRecentlyVerified,
  oldestReadingISO,
  splitSaving,
  verifiedOfferCount,
  verifiedOffers,
} from "@/lib/preview/data";

/**
 * The verification record, rendered two ways.
 *
 * Every figure here is computed from `DEALS`. Nothing is placeholdered: if the
 * data thins out, these modules get smaller, which is the signal rather than a
 * problem to paper over.
 */

/* ---- Variant A: the proof panel ----------------------------------------- */

export function ProofPanel() {
  return (
    <div className="rl-proof">
      <p className="rl-proof__head">
        <span className="rl-num">{verifiedOfferCount}</span> offers verified. Oldest
        reading{" "}
        {oldestReadingISO ? (
          <time dateTime={oldestReadingISO}>{formatReading(oldestReadingISO)}</time>
        ) : (
          "not recorded"
        )}
        .
      </p>
      {mostRecentlyVerified.map((d) => {
        const { saving } = splitSaving(d.offer);
        return (
          <div className="rl-proof__row" key={d.brand}>
            <PartnerLogo
              className="rl-proof__logo"
              src={d.logo}
              alt=""
              width={32}
              height={32}
            />
            <div>
              <p className="rl-proof__brand">{d.brand}</p>
              <p className="rl-proof__offer">{d.category}</p>
            </div>
            <div className="rl-proof__meta">
              {saving ? (
                <span className="rl-saving">{saving}</span>
              ) : (
                <span className="rl-read">{d.offer}</span>
              )}
              <span className="rl-read">
                read{" "}
                <time dateTime={d.verified}>{formatReading(d.verified as string)}</time>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Variant A: the offers table ---------------------------------------- */

export function OffersTable() {
  return (
    <div className="rl-table-wrap">
      <table className="rl-table">
        <caption className="rl-visually-hidden">
          Current verified offers, with the date each was last read off the
          provider&rsquo;s own page
        </caption>
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">Offer</th>
            <th scope="col">Saving</th>
            <th scope="col">Code</th>
            <th scope="col">Status</th>
            <th scope="col">Last checked</th>
          </tr>
        </thead>
        <tbody>
          {verifiedOffers.map((d) => {
            const { before, saving, after } = splitSaving(d.offer);
            const due = isDueForRecheck(d.verified);
            return (
              <tr key={d.brand}>
                <td>
                  <span className="rl-cell-label">Provider</span>
                  <Link href={d.href} className="rl-provider" style={{ color: "inherit", textDecoration: "none" }}>
                    <PartnerLogo src={d.logo} alt="" width={28} height={28} />
                    {d.brand}
                  </Link>
                </td>
                <td>
                  <span className="rl-cell-label">Offer</span>
                  <span>
                    {before}
                    {saving}
                    {after}
                  </span>
                </td>
                <td>
                  <span className="rl-cell-label">Saving</span>
                  {saving ? (
                    <span className="rl-saving" style={{ fontSize: "var(--rl-s-0)" }}>
                      {saving}
                    </span>
                  ) : (
                    <span className="rl-recheck">not quantified</span>
                  )}
                </td>
                <td>
                  <span className="rl-cell-label">Code</span>
                  {d.code ? (
                    <span className="rl-code">{d.code}</span>
                  ) : (
                    <span className="rl-recheck">no code needed</span>
                  )}
                </td>
                <td>
                  <span className="rl-cell-label">Status</span>
                  <span className="rl-status">Active</span>
                </td>
                <td>
                  <span className="rl-cell-label">Last checked</span>
                  <span className={due ? "rl-recheck" : undefined}>
                    <time dateTime={d.verified}>
                      {formatReading(d.verified as string)}
                    </time>
                    {due ? " (due for re-check)" : null}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
