import Link from "next/link";
import { PartnerLogo } from "@/components/preview/PartnerLogo";
import {
  categoriesWithVerifiedOffer,
  formatReading,
  isDueForRecheck,
  liveCategories,
  mostRecentlyVerified,
  oldestReadingISO,
  partnerLogos,
  popularComparisons,
  publisher,
  splitSaving,
  verifiedOfferCount,
  verifiedOffers,
} from "@/lib/preview/data";

/**
 * Shared homepage modules, Phase 3.
 *
 * Outbound-click policy, applied per the brief and split by intent:
 * every link on this page is INTERNAL. The homepage defers the offsite click
 * behind a comparison or offer page, which is what both primaries do (CTM's
 * category page has zero form fields and zero offsite links; NerdWallet's
 * category page has 14 CTAs and 0 offsite). Offer pages keep their direct
 * outbound path, because discount-code traffic arrives wanting the code and an
 * extra hop there costs revenue. Nothing here links to a merchant.
 */

/* ---- Header ------------------------------------------------------------- */

export function Header2() {
  return (
    <header className="rl-hdr">
      <div className="rl-hdr__in">
        <Link href="/preview" className="rl-mark">Refer Labs</Link>
        <nav className="rl-nav2" aria-label="Categories">
          {liveCategories.map((c) => (
            <Link key={c.href} href={c.href}>{c.label}</Link>
          ))}
        </nav>
        <div className="rl-navR">
          <Link href="/deals">Deals</Link>
          <Link href="/for-business">For business</Link>
        </div>
      </div>
    </header>
  );
}

/**
 * Popular comparisons. home-b's hero right column.
 *
 * Four real pages with their real read dates, from popularComparisons. Nothing
 * here is a placeholder: if the list were empty the panel would not render.
 */
export function Compare2() {
  return (
    <aside className="rl-cmp">
      <p className="rl-cmp__h">Most-read comparisons</p>
      {popularComparisons.map((c) => (
        <Link key={c.href} href={c.href} className="rl-cmp__a">
          <span className="rl-cmp__t">{c.title}</span>
          <span className="rl-cmp__l">{c.line}</span>
          <span className="rl-cmp__d">read {formatReading(c.updated)}</span>
        </Link>
      ))}
    </aside>
  );
}

/* ---- Image slot --------------------------------------------------------- */

export function ImageSlot({ note }: { note: string }) {
  return (
    <div className="rl-slot" role="img" aria-label={`Image placeholder. ${note}`}>
      <p className="rl-slot__t">
        IMAGE SLOT, NOT FINAL
        <br />
        {note}
      </p>
    </div>
  );
}

/* ---- Category tray ------------------------------------------------------ */

export function Tray() {
  return (
    <div className="rl-tray">
      <div className="rl-tray__well">
      <nav className="rl-tiles2" aria-label="Compare by category">
        {liveCategories.map((c) => (
          <Link key={c.href} href={c.href} className="rl-tile2">
            <span className="rl-tile2__l">{c.label}</span>
            <span className="rl-tile2__b">{c.blurb}</span>
          </Link>
        ))}
      </nav>
      </div>
    </div>
  );
}

/* ---- Proof card, elevation 2 -------------------------------------------- */

export function ProofCard() {
  return (
    <div className="rl-proof2">
      <p className="rl-proof2__h">
        {verifiedOfferCount} offers verified. Oldest reading{" "}
        {oldestReadingISO ? (
          <time dateTime={oldestReadingISO}>{formatReading(oldestReadingISO)}</time>
        ) : ("not recorded")}.
      </p>
      {mostRecentlyVerified.map((d) => {
        const { saving } = splitSaving(d.offer);
        return (
          <div className="rl-proof2__r" key={d.brand}>
            <PartnerLogo src={d.logo} alt="" width={32} height={32} />
            <div>
              <p className="rl-brand">{d.brand}</p>
              <p className="rl-cat">{d.category}</p>
            </div>
            <div>
              {saving ? <span className="rl-sav">{saving}</span> : null}
              <span className="rl-read2">
                read <time dateTime={d.verified}>{formatReading(d.verified as string)}</time>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Verified strip, flooded band two ----------------------------------- */

export function Strip2() {
  return (
    <section className="rl-strip" aria-label="Verification record">
      <div className="rl-wrap2">
        <div className="rl-strip__g">
          <div>
            <span className="rl-fig2">{verifiedOfferCount}</span>
            <span className="rl-figl2">offers with a discount we have verified</span>
          </div>
          <div>
            <span className="rl-fig2">{categoriesWithVerifiedOffer.length}</span>
            <span className="rl-figl2">categories with a verified offer</span>
          </div>
          <div>
            <span className="rl-fig2">
              {oldestReadingISO ? formatReading(oldestReadingISO) : "not recorded"}
            </span>
            <span className="rl-figl2">oldest reading in the table below</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Offers table, variant A -------------------------------------------- */

export function OffersTable2() {
  return (
    <div className="rl-tw">
      <table className="rl-tbl">
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
            const { saving } = splitSaving(d.offer);
            const due = isDueForRecheck(d.verified);
            return (
              <tr key={d.brand}>
                <td>
                  <span className="rl-cl">Provider</span>
                  {/* internal: our own offer page, never the merchant */}
                  <Link href={d.href} className="rl-prov2">
                    <PartnerLogo src={d.logo} alt="" width={26} height={26} />
                    {d.brand}
                  </Link>
                </td>
                <td><span className="rl-cl">Offer</span>{d.offer}</td>
                <td>
                  <span className="rl-cl">Saving</span>
                  {saving
                    ? <span style={{ color: "var(--gold)", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{saving}</span>
                    : <span style={{ color: "var(--muted)" }}>not quantified</span>}
                </td>
                <td>
                  <span className="rl-cl">Code</span>
                  {d.code
                    ? <span className="rl-code2">{d.code}</span>
                    : <span style={{ color: "var(--muted)", fontSize: "var(--t2)" }}>no code needed</span>}
                </td>
                <td><span className="rl-cl">Status</span><span className="rl-status2">Active</span></td>
                <td>
                  <span className="rl-cl">Last checked</span>
                  <span style={{ color: due ? "var(--muted)" : undefined, fontVariantNumeric: "tabular-nums" }}>
                    <time dateTime={d.verified}>{formatReading(d.verified as string)}</time>
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

/* ---- Method ------------------------------------------------------------- */

export function Method2() {
  return (
    <section className="rl-sec rl-ruleTop">
      <div className="rl-wrap2">
        <h2 className="rl-h2x">How we compare</h2>
        <p className="rl-lede2">
          Three things decide what appears on this site, and none of them is money.
        </p>
        <div className="rl-cols">
          <div>
            <h3 className="rl-colH">What we verify</h3>
            <p className="rl-colP">
              Every offer and price is read off the provider&rsquo;s own page, never an
              aggregator. We publish the date we read it, so you can judge how old
              a figure is before you rely on it.
            </p>
          </div>
          <div>
            <h3 className="rl-colH">What we will not sell</h3>
            <p className="rl-colP">
              Rankings are never sold. No provider can pay to be placed higher, added
              to a comparison, or taken out of one. We publish the parts that do not
              suit us, including where two partners share an insurer.
            </p>
          </div>
          <div>
            <h3 className="rl-colH">How we make money</h3>
            <p className="rl-colP">
              Some links pay us a commission when you sign up, at no extra cost to
              you. Which links those are is disclosed on every page carrying one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Guides ------------------------------------------------------------- */

export function Guides2() {
  return (
    <section className="rl-sec rl-ruleTop">
      <div className="rl-wrap2">
        <h2 className="rl-h2x">Popular comparisons</h2>
        <p className="rl-lede2">
          Head to head, with the date each was last checked.
        </p>
        <div className="rl-guides2">
          {popularComparisons.map((g) => (
            <Link key={g.href} href={g.href} className="rl-guide2">
              <p className="rl-guide2__t">{g.title}</p>
              <p className="rl-guide2__l">{g.line}</p>
              <span className="rl-guide2__d">
                Last updated <time dateTime={g.updated}>{formatReading(g.updated)}</time>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Partners ----------------------------------------------------------- */

export function Partners2() {
  return (
    <section className="rl-sec rl-sec--tight rl-ruleTop">
      <div className="rl-wrap2">
        <div className="rl-logos2">
          {partnerLogos.map((p) => (
            <PartnerLogo key={p.name} src={p.src} alt={p.name} width={110} height={28} />
          ))}
        </div>
        <p className="rl-disc2">
          Providers we hold a commercial relationship with. We do not compare every
          provider in a category, and a provider being absent does not mean it is
          worse. Commercial relationships are disclosed on every page carrying one.
        </p>
      </div>
    </section>
  );
}

/* ---- Editorial + newsletter --------------------------------------------- */

export function Editorial2() {
  return (
    <section className="rl-sec rl-sec--tight rl-ruleTop">
      <div className="rl-wrap2">
        <h2 className="rl-h2x" style={{ fontSize: "var(--t7)" }}>Who publishes this</h2>
        <p className="rl-lede2" style={{ marginBottom: "1.5rem" }}>
          Refer Labs is published by {publisher.entity} (ABN{" "}
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{publisher.abn}</span>),
          trading as {publisher.tradingAs}. Written and verified by {publisher.author},{" "}
          {publisher.authorRole}.{" "}
          <Link href="/editorial-policy" style={{ color: "var(--action-dk)" }}>
            Read how we verify offers
          </Link>.
        </p>
        <form className="rl-news2" action="/api/subscribe" method="post">
          <label htmlFor="rl2-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
            Email address
          </label>
          <input id="rl2-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
          <button type="submit" className="rl-btn2 rl-btn2--p">Send me re-checks</button>
        </form>
        <p style={{ margin: "0.75rem 0 0", fontSize: "var(--t2)", color: "var(--muted)" }}>
          One email when an offer changes or a reading date is refreshed. Nothing else.
        </p>
      </div>
    </section>
  );
}

/* ---- Footer ------------------------------------------------------------- */

export function Footer2() {
  return (
    <footer className="rl-ft">
      <div className="rl-wrap2">
        <div className="rl-ft__g">
          <div>
            <h2 className="rl-ft__h">Categories</h2>
            <ul className="rl-ft__l">
              {liveCategories.map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="rl-ft__h">Top comparisons</h2>
            <ul className="rl-ft__l">
              {popularComparisons.map((g) => (
                <li key={g.href}><Link href={g.href}>{g.title}</Link></li>
              ))}
              <li><Link href="/deals">All current offers</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="rl-ft__h">Company</h2>
            <ul className="rl-ft__l">
              <li><Link href="/about">About Refer Labs</Link></li>
              <li><Link href="/editorial-policy">How we verify offers</Link></li>
              <li><Link href="/how-we-make-money">How we make money</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/for-business">For business</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="rl-ft__h">Legal</h2>
            <ul className="rl-ft__l">
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms of use</Link></li>
            </ul>
          </div>
        </div>
        <div className="rl-ft__legal">
          <p>
            Refer Labs is published by {publisher.entity} trading as {publisher.tradingAs},
            ABN <span style={{ fontVariantNumeric: "tabular-nums" }}>{publisher.abn}</span>.
          </p>
          <p>
            Some links on this site are affiliate links. If you sign up or buy through
            one, we may earn a commission at no extra cost to you. This never affects
            the order providers appear in, and rankings are not sold. We do not compare
            every provider in a category.
          </p>
          <p>
            Health content on this site is general information only. It is not medical
            advice and is not a substitute for a consultation with a registered
            practitioner. Whether any treatment is appropriate is decided by a
            practitioner, and only where clinically appropriate. Prescription medicines
            in Australia require a prescription.
          </p>
        </div>
      </div>
    </footer>
  );
}
