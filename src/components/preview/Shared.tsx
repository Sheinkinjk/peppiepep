import Link from "next/link";
import { PartnerLogo } from "@/components/preview/PartnerLogo";
import {
  formatReading,
  liveCategories,
  partnerLogos,
  popularComparisons,
  publisher,
} from "@/lib/preview/data";

/* ---- Category entry points --------------------------------------------- */

export function CategoryChips() {
  return (
    <nav className="rl-chips" aria-label="Compare by category">
      {liveCategories.map((c) => (
        <Link key={c.href} href={c.href} className="rl-chip">
          <span className="rl-chip__label">{c.label}</span>
          <span className="rl-chip__blurb">{c.blurb}</span>
        </Link>
      ))}
    </nav>
  );
}

export function CategoryTiles() {
  return (
    <nav className="rl-tiles" aria-label="Compare by category">
      {liveCategories.map((c) => (
        <Link key={c.href} href={c.href} className="rl-tile">
          <span className="rl-tile__label">{c.label}</span>
          <span className="rl-tile__blurb">{c.blurb}</span>
        </Link>
      ))}
    </nav>
  );
}

/* ---- How we compare ----------------------------------------------------- */

export function HowWeCompare() {
  return (
    <section className="rl-section rl-rule-top">
      <div className="rl-wrap">
        <h2 className="rl-h2">How we compare</h2>
        <div className="rl-cols3" style={{ marginBlockStart: "1.75rem" }}>
          <div>
            <h3 className="rl-col__h">What we verify</h3>
            <p className="rl-col__p">
              Every offer and price is read off the provider&rsquo;s own page, never an
              aggregator. We publish the date we read it, so you can see how old the
              figure is before you rely on it.
            </p>
          </div>
          <div>
            <h3 className="rl-col__h">What we will not sell</h3>
            <p className="rl-col__p">
              Rankings are never sold. No provider can pay to be placed higher, added
              to a comparison, or removed from one. We publish the parts that do not
              suit us, including where two partners share an insurer.
            </p>
          </div>
          <div>
            <h3 className="rl-col__h">How we make money</h3>
            <p className="rl-col__p">
              Some links pay us a commission when you sign up, at no extra cost to
              you. Which links those are is disclosed on every page that carries one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Partner strip ------------------------------------------------------ */

export function PartnerStrip() {
  return (
    <section className="rl-section rl-section--tight rl-rule-top">
      <div className="rl-wrap">
        <div className="rl-partners">
          {partnerLogos.map((p) => (
            <PartnerLogo
              key={p.name}
              src={p.src}
              alt={p.name}
              width={110}
              height={26}
            />
          ))}
        </div>
        <p className="rl-disclose">
          These are providers we hold a commercial relationship with. We do not compare
          every provider in a category, and a provider being absent does not mean it is
          worse. Commercial relationships are disclosed on every page that carries one.
        </p>
      </div>
    </section>
  );
}

/* ---- Popular comparisons ------------------------------------------------ */

export function PopularComparisons() {
  return (
    <section className="rl-section rl-rule-top">
      <div className="rl-wrap">
        <h2 className="rl-h2">Popular comparisons</h2>
        <div className="rl-guides" style={{ marginBlockStart: "1.5rem" }}>
          {popularComparisons.map((g) => (
            <Link key={g.href} href={g.href} className="rl-guide">
              <p className="rl-guide__t">{g.title}</p>
              <p className="rl-guide__l">{g.line}</p>
              <span className="rl-guide__d">
                Last updated{" "}
                <time dateTime={g.updated}>{formatReading(g.updated)}</time>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Editorial line + newsletter ---------------------------------------- */

export function EditorialLine() {
  return (
    <section className="rl-section rl-section--tight rl-rule-top">
      <div className="rl-wrap">
        <p className="rl-editorial">
          Refer Labs is published by {publisher.entity} (ABN{" "}
          <span className="rl-num">{publisher.abn}</span>). Written and verified by{" "}
          {publisher.author}, {publisher.authorRole}.{" "}
          <Link href="/editorial-policy">Read how we verify offers</Link>.
        </p>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="rl-section rl-section--tight rl-rule-top">
      <div className="rl-wrap">
        <h2 className="rl-h2">Get the re-checks</h2>
        <p className="rl-lede">
          One email when an offer changes or a reading date is refreshed. Nothing else.
        </p>
        <form className="rl-news" action="/api/subscribe" method="post">
          <label htmlFor="rl-email" className="rl-cell-label" style={{ display: "block" }}>
            Email address
          </label>
          <input
            id="rl-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
          <button type="submit" className="rl-btn rl-btn--primary">
            Send me re-checks
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---- Footer ------------------------------------------------------------- */

export function PreviewFooter() {
  return (
    <footer className="rl-footer">
      <div className="rl-wrap">
        <div className="rl-footer__grid">
          <div>
            <h2 className="rl-footer__h">Categories</h2>
            <ul className="rl-footer__list">
              {liveCategories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="rl-footer__h">Top comparisons</h2>
            <ul className="rl-footer__list">
              {popularComparisons.map((g) => (
                <li key={g.href}>
                  <Link href={g.href}>{g.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/deals">All current offers</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="rl-footer__h">Company</h2>
            <ul className="rl-footer__list">
              <li>
                <Link href="/about">About Refer Labs</Link>
              </li>
              <li>
                <Link href="/editorial-policy">How we verify offers</Link>
              </li>
              <li>
                <Link href="/how-we-make-money">How we make money</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/for-business">For business</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="rl-footer__h">Legal</h2>
            <ul className="rl-footer__list">
              <li>
                <Link href="/privacy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of use</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rl-footer__legal">
          <p>
            Refer Labs is published by {publisher.entity} trading as{" "}
            {publisher.tradingAs}, ABN <span className="rl-num">{publisher.abn}</span>.
          </p>
          <p>
            Some links on this site are affiliate links. If you sign up or buy through
            one, we may earn a commission at no extra cost to you. This never affects
            the order providers appear in, and rankings are not sold. We do not compare
            every provider in a category.
          </p>
          <p>
            Health content on this site is general information only. It is not medical
            advice and it is not a substitute for a consultation with a registered
            practitioner. Whether any treatment is appropriate is decided by a
            practitioner, and only where clinically appropriate. Prescription medicines
            in Australia require a prescription.
          </p>
        </div>
      </div>
    </footer>
  );
}
