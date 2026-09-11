import Link from "next/link";
import { Marker, Proof, Texture, catKey } from "@/components/preview/final/Art";
import { Newsletter } from "@/components/preview/final/Newsletter";
import { OfferStack } from "@/components/preview/final/OfferStack";
import { dirCategories, isCrispAt, liveCodes, wallBrands } from "@/lib/preview/directions";
import {
  formatReading, liveCategories, oldestReadingISO, popularComparisons,
  publisher, verifiedOfferCount,
} from "@/lib/preview/data";

/**
 * The final homepage. D5's visual language on the live site's information
 * architecture.
 *
 * THE STRUCTURAL IDEA, applied five times and marked at each site:
 * scale encodes who verified it. The largest type in a module is the thing we
 * checked; whatever the merchant asserts is set smaller.
 *
 * VOICE: short declarative sentences. No second-person promises, no verbs of
 * enthusiasm, and no sub-headline that restates the headline.
 *
 * OUTBOUND POLICY: every link on this page is internal. The homepage defers
 * the offsite click behind a comparison page, which is what both primaries do.
 * Offer pages keep the direct outbound path.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

export function Final() {
  return (
    <div className="fx">
      <header className="fx-hd rl-own">
        <div className="fx-w fx-hd__g">
          <Link href="/" className="fx-wm">Refer Labs</Link>
          <nav className="fx-nav" aria-label="Main">
            {liveCategories.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
            <Link href="/deals">Deals</Link>
            <Link href="/for-business">For business</Link>
          </nav>
          <Link href="/deals" className="fx-hd__cta">See the codes</Link>
        </div>
        <div className="fx-w">
          <nav className="fx-strip" aria-label="Categories">
            {liveCategories.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
            <Link href="/deals">Deals</Link>
            <Link href="/for-business">For business</Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* ---- hero ---------------------------------------------------- */}
        <section className="fx-hero">
          <div className="fx-w">
            <h1 className="fx-h1">
              We opened the page on a day, and the day is printed.
            </h1>
            <div className="fx-hero__g">
              <p>
                Prices and offers here are read off the company&rsquo;s own
                page, never an email and never an aggregator. Where one has
                aged past sixty days, the row says so.
              </p>
              {/* SCALE RULE 2 of 5: the date is the largest figure in this
                  strip, larger than the offer count, because the date is the
                  part we are accountable for. */}
              <div className="fx-proof">
                <div className="fx-proof__i"><b>{verifiedOfferCount}</b><span>offers with a real discount</span></div>
                <div className="fx-proof__i"><b>{liveCodes.length}</b><span>codes you can copy</span></div>
                <div className="fx-proof__i fx-proof__i--date"><b>{READ}</b><span>oldest reading in the list below</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- current offers ------------------------------------------ */}
        <section aria-labelledby="fx-offers">
          <div className="fx-w">
            <h2 id="fx-offers" className="fx-sr">Current offers</h2>
            <OfferStack />
          </div>
        </section>

        {/* ---- categories ---------------------------------------------- */}
        <section className="fx-sec" aria-labelledby="fx-cats">
          <div className="fx-w">
            <h2 id="fx-cats" className="fx-h2" style={{ fontSize: "clamp(28px, 4.6vw, 60px)", marginBottom: "0.5rem" }}>
              Six categories carry an offer
            </h2>
            <p style={{ margin: "0 0 1.75rem", color: "var(--ink-2)", maxWidth: "52ch" }}>
              Four more are being worked on. They are not listed, because a
              category with nothing read in it is not a category yet.
            </p>
          </div>
          {/* SCALE RULE 4 of 5: our taxonomy is set large, the brand names
              inside it small. */}
          <div className="fx-cats">
            {dirCategories.map((c) => (
              <Link key={c.key} href={c.hub} className="fx-cat">
                <Marker cat={catKey(c.label)} size={44} />
                <span className="fx-cat__l">{c.label}</span>
                <span className="fx-cat__m">{c.brands.map((b) => b.name).join(", ")}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---- methodology: the one section that breaks the container --- */}
        <section className="fx-method fx-sec" aria-labelledby="fx-method">
          <div className="fx-w fx-method__g">
            <div>
              <h2 id="fx-method" style={{ fontSize: "clamp(28px, 4.4vw, 56px)", marginBottom: "1.25rem" }}>
                How we compare
              </h2>
              {/* SCALE RULE 5 of 5: the verification step is display-size,
                  the benefit it produces is body-size underneath it. */}
              <div className="fx-step">
                <h3>We open the company&rsquo;s own page</h3>
                <p>Not an aggregator, not the partner&rsquo;s email, not last quarter&rsquo;s screenshot. If a company publishes no price, we say so rather than estimating one.</p>
              </div>
              <div className="fx-step">
                <h3>We write down what it discounts</h3>
                <p>PetsOnMe&rsquo;s code reduces the cost of pet care services, not the premium. That distinction appears everywhere the offer does.</p>
              </div>
              <div className="fx-step">
                <h3>We date it, then we take it down</h3>
                <p>Past sixty days a reading is flagged. Anything we cannot confirm on the source page is removed, whether or not it earns us anything.</p>
              </div>
              <p style={{ marginTop: "1.5rem" }}>
                <Link href="/editorial-policy" className="fx-copy" style={{ borderBottomColor: "var(--accent)" }}>
                  Read the editorial policy
                </Link>
              </p>
            </div>
            <div className="fx-bleed" aria-hidden="false">
              <Proof date={READ} count={verifiedOfferCount} />
            </div>
          </div>
        </section>

        <Texture />

        {/* ---- partner wall -------------------------------------------- */}
        <section className="fx-sec" aria-labelledby="fx-wall">
          <div className="fx-w">
            <h2 id="fx-wall" style={{ fontSize: "clamp(24px, 3.4vw, 42px)", marginBottom: "0.5rem" }}>
              The {wallBrands.length} companies in the list above
            </h2>
            <p style={{ margin: "0 0 1.75rem", color: "var(--ink-2)", maxWidth: "54ch" }}>
              Every one holds an offer we have read and dated. None of them paid
              to be here, and none can pay to move up.
            </p>
            <div className="fx-wall">
              {wallBrands.map((b) => (
                <figure key={b.name}>
                  {/* 128px tiles are crisp to 64px display and no further, so
                      they render at 22px and the vector marks at 30px. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt="" width={96} height={30} data-small={isCrispAt(b.logo, 30) ? "0" : "1"} />
                  <figcaption>{b.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---- popular comparisons ------------------------------------- */}
        <section className="fx-sec" aria-labelledby="fx-cmp" style={{ paddingBlockStart: 0 }}>
          <div className="fx-w">
            <h2 id="fx-cmp" style={{ fontSize: "clamp(24px, 3.4vw, 42px)", marginBottom: "1.25rem" }}>
              Read before you choose
            </h2>
            {/* SCALE RULE 3 of 5: our page title is display-size, the summary
                that describes the merchants is body-size. */}
            <div className="fx-cmp">
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

        {/* ---- editorial line ------------------------------------------ */}
        <section className="fx-ed" aria-labelledby="fx-ed">
          <div className="fx-w fx-ed__g">
            <span className="fx-ed__n" id="fx-ed">{publisher.author}, {publisher.authorRole}</span>
            <p>
              Written and verified by {publisher.author}. Published by{" "}
              {publisher.entity} trading as {publisher.tradingAs}, ABN {publisher.abn}.
              Independent of every company listed. We may earn a commission when
              a reader takes up an offer; it has never determined what appears
              here or in what order.
            </p>
          </div>
        </section>

        {/* ---- newsletter ---------------------------------------------- */}
        <section className="fx-news fx-sec" aria-labelledby="fx-news-h">
          <div className="fx-w fx-news__g">
            <div>
              <h2 id="fx-news-h">When a code changes, you hear first</h2>
              <p>
                One email when something in the list above is re-read and the
                figure moves. Nothing else.
              </p>
            </div>
            <Newsletter />
          </div>
        </section>
      </main>

      <footer className="fx-ft rl-own">
        <div className="fx-w">
          <div className="fx-ft__g">
            <div>
              <span className="fx-ft__wm">Refer Labs</span>
              <p>
                Independent comparisons for Australians, with the date every
                figure was read printed beside it.
              </p>
              <p>{publisher.entity} t/a {publisher.tradingAs}<br />ABN {publisher.abn}</p>
            </div>
            <div>
              <h3>Compare</h3>
              {liveCategories.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
              <Link href="/deals">All current offers</Link>
            </div>
            <div>
              <h3>How we work</h3>
              <Link href="/how-we-research">How we research</Link>
              <Link href="/editorial-policy">Editorial policy</Link>
              <Link href="/guides">All guides</Link>
              <Link href="/faq">FAQ</Link>
            </div>
            <div>
              <h3>Business</h3>
              <Link href="/for-business">For business</Link>
              <Link href="/partner-with-refer-labs">Partner with us</Link>
              <Link href="/affiliate-programs-australia">Affiliate programs</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div className="fx-legal">
            <p>
              <b>Disclosure.</b> Refer Labs earns affiliate commission on some
              links. This never affects which products appear, the order they
              appear in, or what we write about them. No company pays to be
              listed and no company can pay to rank higher. Offers and prices
              change; each row carries the date we last read it on the
              provider&rsquo;s own page, and anything we cannot confirm is
              removed.
            </p>
            <p style={{ marginTop: "0.7rem" }}>
              <b>Health content.</b> Information on this site is general
              information only and is not medical advice. Weight-management and
              hair-loss medicines are prescription-only in Australia. Any
              treatment is decided by a qualified practitioner, and only where
              clinically appropriate. Speak to your doctor before starting or
              changing any treatment.
            </p>
            <p style={{ marginTop: "0.7rem" }}>
              <Link href="/privacy">Privacy</Link> <Link href="/terms">Terms</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
