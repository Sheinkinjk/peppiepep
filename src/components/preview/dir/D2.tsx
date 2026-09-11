import Link from "next/link";
import { InstrumentMarker, catKey } from "@/components/preview/dir/Art";
import { D2Desk } from "@/components/preview/dir/D2Desk";
import { dirCategories, liveCodes, wallBrands } from "@/lib/preview/directions";
import {
  formatReading, oldestReadingISO, popularComparisons, publisher, verifiedOfferCount,
} from "@/lib/preview/data";

/**
 * D2 — THE INSTRUMENT.
 *
 * Voice: second person, present tense, short. It tells the reader what to do
 * and what will happen, because the page is a control panel and a control
 * panel that describes itself is a brochure.
 *
 * Structure: two saturated bands with the working desk breaking the boundary
 * between them. The headline is small and sits BESIDE the control rather than
 * above it, which is the whole point of the direction.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

export function D2() {
  return (
    <div className="d2">
      <header className="d2-hd rl-own">
        <div className="d2-w d2-hd__g">
          <Link href="/" className="d2-wm">Refer Labs</Link>
          <nav className="d2-nav" aria-label="Categories">
            {dirCategories.slice(0, 5).map((c) => <Link key={c.key} href={c.hub}>{c.label}</Link>)}
          </nav>
          <Link href="/deals" className="d2-hd__cta">All {verifiedOfferCount} offers</Link>
        </div>
      </header>

      <main>
        <section className="d2-top">
          <div className="d2-w">
            <div className="d2-top__g">
              <div>
                <h1>Set it the way you want it, then read the codes off.</h1>
                <p>
                  Every figure comes off the provider&rsquo;s own page, and
                  carries the day it was read.
                </p>
              </div>
              <div className="d2-figs">
                <div className="d2-fig"><b>{verifiedOfferCount}</b><span>offers with a real discount</span></div>
                <div className="d2-fig"><b>{liveCodes.length}</b><span>codes you can copy</span></div>
                <div className="d2-fig"><b>{dirCategories.length}</b><span>categories covered</span></div>
              </div>
            </div>
            <D2Desk />
          </div>
        </section>
        <div className="d2-desk-sp" aria-hidden="true" />

        <section className="d2-sec">
          <div className="d2-w">
            <h2 className="d2-h2">Go straight to a category</h2>
            <p className="d2-lede">
              Each one opens on the brands we hold a verified offer for, not a
              list of everything that exists.
            </p>
            <div className="d2-cats">
              {dirCategories.map((c) => (
                <Link key={c.key} href={c.hub} className="d2-cat">
                  <InstrumentMarker cat={catKey(c.label)} size={40} />
                  <span>
                    <span className="d2-cat__l">{c.label}</span>
                    <span className="d2-cat__m">{c.brands.map((b) => b.name).join(", ")}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="d2-sec d2-sec--tint">
          <div className="d2-w">
            <h2 className="d2-h2">The companies behind those offers</h2>
            <p className="d2-lede">
              Every brand holding one of the {verifiedOfferCount} offers above.
              Nobody appears here for paying.
            </p>
            <div className="d2-wall">
              {wallBrands.map((b) => (
                <figure key={b.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt="" height={30} />
                  <figcaption>{b.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="d2-sec d2-sec--deep">
          <div className="d2-w">
            <h2 className="d2-h2">How a code gets on this page</h2>
            <p className="d2-lede">Three steps, and the third is the one most sites skip.</p>
            <div className="d2-grid3">
              <div className="d2-step">
                <span className="d2-step__n">1</span>
                <h3>Open the provider&rsquo;s page</h3>
                <p>Not an aggregator, not the partner&rsquo;s email. The page the company publishes itself.</p>
              </div>
              <div className="d2-step">
                <span className="d2-step__n">2</span>
                <h3>Write down what it discounts</h3>
                <p>PetsOnMe&rsquo;s code takes 15% off pet care services, not the premium. That distinction goes everywhere the offer appears.</p>
              </div>
              <div className="d2-step">
                <span className="d2-step__n">3</span>
                <h3>Date it, then re-check it</h3>
                <p>The date goes on the offer. Past sixty days it is flagged, and anything that cannot be confirmed comes down.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="d2-sec">
          <div className="d2-w">
            <h2 className="d2-h2">Read next</h2>
            <p className="d2-lede">The comparisons people open most.</p>
            <div className="d2-cmp">
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

      <footer className="d2-ft rl-own">
        <div className="d2-w d2-ft__g">
          <div>
            <h4>Refer Labs</h4>
            <p>
              {publisher.entity} trading as {publisher.tradingAs}, ABN {publisher.abn}.
              Independent of every provider listed.
            </p>
            <p>We may earn a commission on an offer you take up. It never changes what is listed or in what order.</p>
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
