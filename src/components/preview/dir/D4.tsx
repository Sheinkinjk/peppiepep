import Link from "next/link";
import { SpecimenMarker, SpecimenProof, SpecimenEmpty, catKey } from "@/components/preview/dir/Art";
import { dirCategories, liveCodes, wallBrands } from "@/lib/preview/directions";
import {
  formatReading, oldestReadingISO, popularComparisons, publisher,
  splitSaving, verifiedOfferCount, verifiedOffers,
} from "@/lib/preview/data";

/**
 * D4 — THE SPECIMEN.
 *
 * Voice: flat declarative sentences with nothing added. No adjectives of
 * persuasion anywhere on the page. The restraint is the argument: a site that
 * will not oversell an offer is more plausible about the offer.
 *
 * Structure: one narrow column, very tall. Two rules on the entire page. The
 * only large element is the date, because the date is the only claim the site
 * genuinely owns.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

export function D4() {
  return (
    <div className="d4">
      <header className="d4-hd rl-own">
        <div className="d4-wide d4-hd__g">
          <Link href="/" className="d4-wm">Refer Labs</Link>
          <nav aria-label="Categories">
            {dirCategories.slice(0, 4).map((c) => <Link key={c.key} href={c.hub}>{c.label}</Link>)}
            <Link href="/deals">All offers</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="d4-open">
          <div className="d4-w">
            <span className="d4-open__k">Oldest reading in the table</span>
            <span className="d4-date">{READ}</span>
            <p>
              Every offer below was opened on the provider&rsquo;s own page and
              written down with the day it was read. The oldest of those days is
              printed above. Nothing here is older than it.
            </p>
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-w">
            <span className="d4-l">The offers</span>
            <h2>{verifiedOfferCount} offers carrying a discount</h2>
            <p>
              A free trial is not a discount, so free trials are not listed. Of
              these, {liveCodes.length} need a code; the rest apply without one.
            </p>
            {verifiedOffers.map((d) => {
              const s = splitSaving(d.offer);
              return (
                <article className="d4-row" key={d.brand + d.offer}>
                  <Link href={d.href} className="d4-row__b">{d.brand}</Link>
                  <span className="d4-row__s">{s.saving ?? "—"}</span>
                  <p className="d4-row__o">{d.offer}</p>
                  <span className="d4-row__m">
                    <span>{d.category}</span>
                    <span>{d.code ? `Code ${d.code}` : "No code"}</span>
                    <span>Read {d.verified ? formatReading(d.verified) : READ}</span>
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-w">
            <span className="d4-l">Categories</span>
            <div className="d4-idx">
              {dirCategories.map((c) => (
                <Link key={c.key} href={c.hub}>
                  <SpecimenMarker cat={catKey(c.label)} size={28} />
                  <span className="d4-idx__l">{c.label}</span>
                  <span className="d4-idx__n">{c.offerCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-w">
            <span className="d4-l">A reading</span>
            <SpecimenProof date={READ} />
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-wide">
            <span className="d4-l" style={{ textAlign: "center" }}>The companies listed</span>
            <div className="d4-wall">
              {wallBrands.map((b) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={b.name} src={b.logo} alt={b.name} height={20} />
              ))}
            </div>
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-w d4-notes">
            <span className="d4-l">Method</span>
            <p>
              Figures are read off the provider&rsquo;s own page. Not an
              aggregator, not a partner&rsquo;s email. <b>If a company publishes
              no price, we say so rather than estimating one.</b>
            </p>
            <p>
              What a discount applies to is stated with the discount.
              PetsOnMe&rsquo;s code reduces the cost of pet care services, not
              the premium.
            </p>
            <p>
              A reading older than sixty days is flagged. Anything that cannot be
              confirmed is removed.
            </p>
            <p>
              We may earn a commission. <b>No provider pays to appear and none
              pays to rank higher.</b>
            </p>
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-w">
            <span className="d4-l">Categories with nothing yet</span>
            <SpecimenEmpty />
            <p style={{ textAlign: "center", color: "var(--ink-2)", marginTop: "1rem" }}>
              A category appears here only once an offer in it has been read.
              Four are being worked on and none of them is listed.
            </p>
          </div>
        </section>

        <section className="d4-sec">
          <div className="d4-w">
            <span className="d4-l">Comparisons</span>
            <div className="d4-cmp">
              {popularComparisons.map((c) => (
                <Link key={c.href} href={c.href}>
                  <b>{c.title}</b>
                  <span>{c.line}</span>
                  <em>Read {formatReading(c.updated)}</em>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="d4-ft rl-own">
        <div className="d4-w">
          <p>
            {publisher.entity} trading as {publisher.tradingAs}. ABN {publisher.abn}.
            Independent of every provider listed.
          </p>
          <p>{publisher.author}, {publisher.authorRole}. Sydney.</p>
          <nav aria-label="About">
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/how-we-research">How we research</Link>
            <Link href="/deals">All offers</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
