import Link from "next/link";
import { EngravedMarker, EngravedProof, catKey } from "@/components/preview/dir/Art";
import { dirCategories, liveCodes, wallBrands } from "@/lib/preview/directions";
import {
  formatReading, oldestReadingISO, popularComparisons, publisher,
  splitSaving, verifiedOfferCount, verifiedOffers,
} from "@/lib/preview/data";

/**
 * D1 — THE RECORD.
 *
 * Voice: sober and past-tense. It reports what was read rather than promising
 * what the reader will get. No second person in the lead, no verbs of
 * enthusiasm anywhere on the page.
 *
 * Structure: masthead with a dateline, a lead, then the ledger. The ledger is
 * the centrepiece and the date is a column in it, not meta text under a card.
 * There is not a single card on this page.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";
const TODAY = "11 September 2026";

export function D1() {
  return (
    <div className="d1">
      <header className="d1-mast rl-own">
        <div className="d1-w">
          <div className="d1-mast__top">
            <span>{publisher.tradingAs}, an independent record</span>
            <span>Sydney &middot; {TODAY}</span>
          </div>
          <div className="d1-mast__mid">
            <span className="d1-wm">Refer<i>&thinsp;</i>Labs</span>
          </div>
          <nav className="d1-mast__nav" aria-label="Categories">
            {dirCategories.map((c) => (
              <Link key={c.key} href={c.hub}>{c.label}</Link>
            ))}
            <Link href="/editorial-policy">Method</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="d1-lead">
          <div className="d1-w d1-lead__g">
            <div>
              <p className="d1-kick">The reading, {READ}</p>
              <h1 className="d1-h1">
                Eight offers were opened on the provider&rsquo;s own page and
                written down with the date.
              </h1>
              <p className="d1-lead__p">
                This is a record of what was on the page when we looked, not a
                ranking bought by the companies in it. <b>No provider pays to
                appear and none pays to rank higher.</b> Where an offer carries
                a code, the code is printed in full. Where a reading has aged
                past sixty days it is marked for re-checking rather than quietly
                left standing.
              </p>
              <p className="d1-byl">
                Compiled by {publisher.author}, {publisher.authorRole}.{" "}
                {publisher.entity} trading as {publisher.tradingAs}, ABN {publisher.abn}.
              </p>
            </div>
            <div>
              <EngravedProof date={READ} />
            </div>
          </div>
        </section>

        <section className="d1-sec d1-rule--hard">
          <div className="d1-w">
            <div className="d1-sech">
              <h2>The ledger</h2>
              <span>{verifiedOfferCount} entries &middot; {liveCodes.length} codes in force</span>
            </div>
            <table className="d1-tbl">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Category</th>
                  <th scope="col">Entry</th>
                  <th scope="col">Code</th>
                  <th scope="col">Read on</th>
                </tr>
              </thead>
              <tbody>
                {verifiedOffers.map((d) => {
                  const s = splitSaving(d.offer);
                  return (
                    <tr key={d.brand + d.offer}>
                      <td data-l="Provider">
                        <span className="d1-brand">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={d.logo} alt="" width={24} height={24} />
                          <Link href={d.href}>{d.brand}</Link>
                        </span>
                      </td>
                      <td data-l="Category"><span className="d1-cat">{d.category}</span></td>
                      <td data-l="Entry">
                        {s.before}
                        {s.saving ? <span className="d1-sav">{s.saving}</span> : null}
                        {s.after}
                      </td>
                      <td data-l="Code">
                        {d.code ? <span className="d1-code">{d.code}</span> : <span className="d1-cat">none required</span>}
                      </td>
                      <td data-l="Read on"><span className="d1-date">{d.verified ? formatReading(d.verified) : READ}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="d1-sec">
          <div className="d1-w">
            <div className="d1-sech">
              <h2>Index</h2>
              <span>{dirCategories.length} categories carrying an entry</span>
            </div>
            <div className="d1-idx">
              {dirCategories.map((c) => (
                <Link key={c.key} href={c.hub}>
                  <EngravedMarker cat={catKey(c.label)} size={38} ink="#EFE9DD" accent="#D4756B" />
                  <span>
                    <span className="d1-idx__l">{c.label}</span>
                    <span className="d1-idx__m">{c.brands.map((b) => b.name).join(", ")}</span>
                  </span>
                  <span className="d1-idx__n">{c.offerCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="d1-sec">
          <div className="d1-w">
            <div className="d1-sech">
              <h2>Providers on the record</h2>
              <span>every company holding an entry above</span>
            </div>
            <div className="d1-wall">
              {wallBrands.map((b) => (
                <figure key={b.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt="" height={26} />
                  <figcaption>{b.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="d1-sec d1-rule">
          <div className="d1-w">
            <div className="d1-sech">
              <h2>Method</h2>
              <span>how an entry gets into the ledger</span>
            </div>
            <div className="d1-cols">
              <div>
                <h3>Read at source</h3>
                <p>
                  Every price and every offer is taken from the provider&rsquo;s
                  own page, never from an aggregator and never from the
                  partner&rsquo;s email. The page is opened, the terms are read,
                  and the date is written down beside the figure.
                </p>
              </div>
              <div>
                <h3>Stated in full</h3>
                <p>
                  What the discount applies to is stated with the discount.
                  PetsOnMe&rsquo;s code reduces the cost of pet care services
                  rather than the premium, and it is described that way
                  everywhere it appears.
                </p>
              </div>
              <div>
                <h3>Re-checked or withdrawn</h3>
                <p>
                  A reading older than sixty days is flagged for re-checking. An
                  offer that cannot be confirmed on the provider&rsquo;s page is
                  removed from the ledger rather than left to age.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="d1-sec">
          <div className="d1-w">
            <div className="d1-sech">
              <h2>Comparisons</h2>
              <span>read most</span>
            </div>
            <div className="d1-list">
              {popularComparisons.map((c) => (
                <Link key={c.href} href={c.href}>
                  <span className="d1-list__t">{c.title}</span>
                  <span className="d1-list__l">{c.line}</span>
                  <span className="d1-list__d">Read {formatReading(c.updated)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="d1-foot rl-own">
        <div className="d1-w d1-foot__g">
          <div>
            <h4>Colophon</h4>
            <p>
              {publisher.entity} trading as {publisher.tradingAs}, ABN {publisher.abn}.
              Independent of every provider listed.
            </p>
            <p>
              We may earn a commission when a reader takes up an offer. That
              never changes the order of the ledger or whether an entry appears
              in it.
            </p>
          </div>
          <div>
            <h4>Categories</h4>
            {dirCategories.map((c) => <Link key={c.key} href={c.hub}>{c.label}</Link>)}
          </div>
          <div>
            <h4>The record</h4>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/how-we-research">How we research</Link>
            <Link href="/deals">All current entries</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
