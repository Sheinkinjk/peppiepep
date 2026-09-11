import Link from "next/link";
import { ContourMarker, ContourProof, catKey } from "@/components/preview/dir/Art";
import { dirCategories, liveCodes, wallBrands } from "@/lib/preview/directions";
import {
  formatReading, oldestReadingISO, popularComparisons, publisher,
  splitSaving, verifiedOfferCount, verifiedOffers,
} from "@/lib/preview/data";

/**
 * D3 — THE EDITORIAL.
 *
 * Voice: a writer with a view, first person plural, willing to say the
 * commercially inconvenient thing in the lead. The Knose/PetsOnMe underwriter
 * line is the standfirst because it is the most interesting true sentence we
 * own, and because a magazine leads with the story rather than the service.
 *
 * Structure: a 7/3/2 asymmetric lead, heavy rules, display against 13px body.
 * No card and no shadow anywhere on the page.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

/* The lead story is derived, not chosen: the offer with the largest dollar
   saving. If a bigger one is added it takes this slot automatically. */
const dollars = (o: string) => Number((o.match(/\$([\d,]+)/)?.[1] ?? "0").replace(/,/g, ""));
const lead = [...verifiedOffers].sort((a, b) => dollars(b.offer) - dollars(a.offer))[0];
const leadSplit = splitSaving(lead.offer);
const rest = verifiedOffers.filter((d) => d !== lead);

export function D3() {
  return (
    <div className="d3">
      <header className="d3-hd rl-own">
        <div className="d3-w d3-hd__g">
          <Link href="/" className="d3-wm">Refer Labs</Link>
          <nav aria-label="Categories">
            {dirCategories.slice(0, 4).map((c) => (
              <Link key={c.key} href={c.hub} className="d3-sc">{c.label}</Link>
            ))}
            <Link href="/editorial-policy" className="d3-sc">Method</Link>
          </nav>
          <span className="d3-sc d3-hd__d">Sydney</span>
        </div>
      </header>
      <hr className="d3-hr" />

      <main>
        <section className="d3-lead">
          <div className="d3-w d3-lead__g">
            <div>
              <p className="d3-sc" style={{ marginBottom: "0.6rem" }}>The reading &middot; {READ}</p>
              <h1 className="d3-h1">
                Two pet insurers we send readers to share <em>one underwriter</em>.
              </h1>
            </div>

            <div>
              <p className="d3-stand">
                Most published sources name Hollard, Allied World or PetSure.
                Knose&rsquo;s own disclosure names Pacific International.{" "}
                <b>We hold an offer with both Knose and PetsOnMe, and that fact
                argues against treating them as alternatives.</b> We publish it
                anyway, because a comparison that only says what suits us is an
                advertisement with a table in it.
              </p>
              <p className="d3-sc" style={{ marginTop: "0.9rem" }}>
                {publisher.author}, {publisher.authorRole}
              </p>
            </div>

            <div className="d3-side">
              <p className="d3-sc">The figures</p>
              <p><b>{verifiedOfferCount}</b> offers carrying a real discount</p>
              <p><b>{liveCodes.length}</b> codes printed in full</p>
              <p><b>{dirCategories.length}</b> categories with a verified offer</p>
              <p>Oldest reading <b>{READ}</b></p>
            </div>
          </div>
        </section>

        <section className="d3-sec">
          <div className="d3-w">
            <div className="d3-sech">
              <h2>The lead</h2>
              <span className="d3-sc">The largest discount on the site</span>
            </div>
            <div className="d3-feat">
              <div className="d3-feat__art">
                <ContourProof date={READ} />
                <p className="d3-sc" style={{ marginTop: "0.6rem" }}>
                  The line we read, on the page we read it from
                </p>
              </div>
              <div>
                <Link href={lead.href}>
                  <span className="d3-sc">{lead.category}</span>
                  <span className="d3-feat__t">{lead.brand}</span>
                </Link>
                <p className="d3-feat__o">
                  {leadSplit.before}
                  {leadSplit.saving ? <span className="d3-sav">{leadSplit.saving}</span> : null}
                  {leadSplit.after}
                </p>
                <p className="d3-feat__o" style={{ fontSize: 14 }}>
                  Applied to the quote rather than paid as a rebate, so it comes
                  off before anything the government scheme contributes. Read on
                  Apollo&rsquo;s own page.
                </p>
                <span className="d3-feat__m">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lead.logo} alt="" height={30} />
                  <span className="d3-sc">{lead.code ? `Code ${lead.code}` : "No code needed"}</span>
                  <span className="d3-sc">Read {lead.verified ? formatReading(lead.verified) : READ}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="d3-sec">
          <div className="d3-w">
            <div className="d3-sech">
              <h2>The rest</h2>
              <span className="d3-sc">{rest.length} more, each with the day it was read</span>
            </div>
            <div className="d3-run">
              {rest.map((d) => {
                const s2 = splitSaving(d.offer);
                return (
                  <Link href={d.href} key={d.brand + d.offer}>
                    <span className="d3-run__h">
                      <span className="d3-run__b">{d.brand}</span>
                      <span className="d3-run__s">{s2.saving ?? "offer"}</span>
                    </span>
                    <span className="d3-run__o">{d.offer}</span>
                    <span className="d3-run__m">
                      <span className="d3-sc">{d.category}</span>
                      {d.code ? <span className="d3-code">{d.code}</span> : null}
                      <span className="d3-sc">Read {d.verified ? formatReading(d.verified) : READ}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="d3-sec">
          <div className="d3-w">
            <div className="d3-sech">
              <h2>Departments</h2>
              <span className="d3-sc">{dirCategories.length} categories</span>
            </div>
            <div className="d3-idx">
              {dirCategories.map((c) => (
                <Link key={c.key} href={c.hub}>
                  <ContourMarker cat={catKey(c.label)} size={42} />
                  <span>
                    <span className="d3-idx__l">{c.label}</span>
                    <span className="d3-idx__m">{c.brands.map((b) => b.name).join(" · ")}</span>
                  </span>
                  <span className="d3-sc">{c.offerCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="d3-sec">
          <div className="d3-w">
            <p className="d3-sc">The companies in the table</p>
            <div className="d3-wall">
              {wallBrands.map((b) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={b.name} src={b.logo} alt={b.name} height={24} />
              ))}
            </div>
          </div>
        </section>

        <hr className="d3-hr" />
        <section className="d3-sec">
          <div className="d3-w d3-pull">
            <p className="d3-q">
              A price on this site is not a price we were told. It is a price we{" "}
              <em>opened the page and read</em>, on a day we are willing to print.
            </p>
            <div className="d3-body">
              <p>
                Every figure comes off the provider&rsquo;s own page. Not an
                aggregator, not a partner&rsquo;s email, not last quarter&rsquo;s
                screenshot. If a company publishes no price, we say so rather
                than estimating one.
              </p>
              <p>
                What a discount applies to is stated with the discount.
                PetsOnMe&rsquo;s code reduces the cost of pet care services, not
                the premium, and describing it any other way would be false.
              </p>
              <p>
                Readings age. Past sixty days an entry is flagged for
                re-checking, and anything we cannot confirm on the source page
                comes down rather than sitting here going quietly stale.
              </p>
              <p>
                We may earn a commission. It has never determined what is in the
                table or the order the table is in, and the underwriter story
                above is what that commitment costs.
              </p>
            </div>
          </div>
        </section>
        <hr className="d3-hr" />

        <section className="d3-sec">
          <div className="d3-w">
            <div className="d3-sech">
              <h2>Also in this issue</h2>
              <span className="d3-sc">Read most</span>
            </div>
            <div className="d3-cmp">
              {popularComparisons.map((c) => (
                <Link key={c.href} href={c.href}>
                  <span className="d3-cmp__t">{c.title}</span>
                  <span className="d3-cmp__l">{c.line}</span>
                  <span className="d3-sc d3-cmp__d">Read {formatReading(c.updated)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="d3-ft rl-own">
        <div className="d3-w d3-ft__g">
          <div>
            <p className="d3-sc">Refer Labs</p>
            <p>
              {publisher.entity} trading as {publisher.tradingAs}, ABN {publisher.abn}.
              Independent of every provider named. We may earn a commission on an
              offer a reader takes up; it never changes what is published.
            </p>
          </div>
          <div>
            <p className="d3-sc">Departments</p>
            {dirCategories.map((c) => <Link key={c.key} href={c.hub}>{c.label}</Link>)}
          </div>
          <div>
            <p className="d3-sc">Masthead</p>
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
