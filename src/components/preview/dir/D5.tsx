import Link from "next/link";
import { SignalMarker, SignalProof, catKey } from "@/components/preview/dir/Art";
import { dirCategories, liveCodes, wallBrands } from "@/lib/preview/directions";
import {
  formatReading, oldestReadingISO, popularComparisons, publisher,
  splitSaving, verifiedOfferCount, verifiedOffers,
} from "@/lib/preview/data";

/**
 * D5 — THE SIGNAL.
 *
 * Voice: short, blunt, contemporary. Sentences that stop early. No hedging and
 * no throat-clearing, because the type is doing the talking at 168px and
 * anything qualified reads as weak at that size.
 *
 * Structure: the page is built out of words rather than boxes. The offer list
 * is a stack of 58px brand names running edge to edge, each one shifting its
 * registration on hover and focus, which is the gesture the artwork is drawn
 * from. Nothing on this page animates on scroll.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

export function D5() {
  return (
    <div className="d5">
      <header className="d5-hd rl-own">
        <div className="d5-w d5-hd__g">
          <Link href="/" className="d5-wm">Refer Labs</Link>
          <nav aria-label="Categories">
            {dirCategories.slice(0, 4).map((c) => <Link key={c.key} href={c.hub}>{c.label}</Link>)}
          </nav>
          <Link href="/deals" className="d5-hd__cta">Get the codes</Link>
        </div>
      </header>

      <main>
        <section className="d5-open">
          <div className="d5-w">
            <h1 className="d5-h1">
              We read it. <em>On a day.</em> And we print the day.
            </h1>
            <div className="d5-open__g">
              <p>
                Every offer below came off the company&rsquo;s own page. Not an
                email. Not an aggregator. The page, on a date we will show you.
              </p>
              <div className="d5-figs">
                <div className="d5-fig"><b>{verifiedOfferCount}</b><span>offers</span></div>
                <div className="d5-fig"><b>{liveCodes.length}</b><span>codes</span></div>
                <div className="d5-fig"><b>{dirCategories.length}</b><span>categories</span></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="d5-w">
            <div className="d5-stack">
              {verifiedOffers.map((d) => {
                const s = splitSaving(d.offer);
                return (
                  <Link href={d.href} className="d5-o" key={d.brand + d.offer}>
                    <span className="d5-o__g">
                      <span className="d5-o__b">{d.brand}</span>
                      <span className="d5-o__s">{s.saving ?? "offer"}</span>
                      <span className="d5-o__m">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={d.logo} alt="" height={20} />
                        <span>{d.category}</span>
                        <span>{d.offer}</span>
                        {d.code ? <span className="d5-o__code">{d.code}</span> : <span>no code needed</span>}
                        <span className="d5-o__read">read {d.verified ? formatReading(d.verified) : READ}</span>
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="d5-sec">
          <div className="d5-w">
            <h2 className="d5-h2">Pick a lane</h2>
            <p className="d5-lede">
              Six categories. Each one opens on the brands we actually hold a
              verified offer for.
            </p>
          </div>
          <div className="d5-cats">
            {dirCategories.map((c) => (
              <Link key={c.key} href={c.hub} className="d5-cat">
                <SignalMarker cat={catKey(c.label)} size={44} />
                <span className="d5-cat__l">{c.label}</span>
                <span className="d5-cat__m">{c.brands.map((b) => b.name).join(", ")}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="d5-sec d5-sec--ink">
          <div className="d5-w">
            <h2 className="d5-h2">How it gets here</h2>
            <p className="d5-lede">Three steps. The third is the one that costs us money.</p>
            <div className="d5-steps">
              <div className="d5-step">
                <h3>Open the page</h3>
                <p>The company&rsquo;s own page. Never an aggregator, never the partner&rsquo;s email.</p>
              </div>
              <div className="d5-step">
                <h3>Say what it cuts</h3>
                <p>PetsOnMe&rsquo;s code cuts pet care services, not the premium. We write that everywhere the offer appears.</p>
              </div>
              <div className="d5-step">
                <h3>Take it down</h3>
                <p>Past sixty days it gets flagged. If we cannot confirm it, it comes off, commission or not.</p>
              </div>
            </div>
            <div style={{ marginTop: "2.5rem" }}>
              <SignalProof date={READ} ink="#f7f4ee" accent="#d0126e" />
            </div>
          </div>
        </section>

        <section className="d5-sec">
          <div className="d5-w">
            <h2 className="d5-h2">Who is in here</h2>
            <p className="d5-lede">
              The eight companies holding the offers above. None of them paid to
              be on this page.
            </p>
            <div className="d5-wall">
              {wallBrands.map((b) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={b.name} src={b.logo} alt={b.name} height={28} />
              ))}
            </div>
          </div>
        </section>

        <section className="d5-sec">
          <div className="d5-w">
            <h2 className="d5-h2">Read next</h2>
            <div className="d5-cmp">
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

      <footer className="d5-ft rl-own">
        <div className="d5-w d5-ft__g">
          <div>
            <h4>Refer Labs</h4>
            <p>
              {publisher.entity} trading as {publisher.tradingAs}, ABN {publisher.abn}.
              Independent of every company listed.
            </p>
            <p>We may earn a commission. It has never changed what is on this page or the order it is in.</p>
          </div>
          <div>
            <h4>Categories</h4>
            {dirCategories.map((c) => <Link key={c.key} href={c.hub}>{c.label}</Link>)}
          </div>
          <div>
            <h4>About</h4>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/how-we-research">How we research</Link>
            <Link href="/deals">All offers</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
