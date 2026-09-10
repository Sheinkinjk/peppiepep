import type { Metadata } from "next";
import Link from "next/link";
import "../home.css";
import {
  Editorial2, Footer2, Guides2, Header2, ImageSlot, Method2,
  Partners2, Strip2, Compare2,
  Tray,
} from "@/components/preview/Home2";
import { OfferCards2 } from "@/components/preview/OfferCards2";
import { oldestReadingISO, formatReading, verifiedOfferCount } from "@/lib/preview/data";

export const metadata: Metadata = {
  title: "Variant B, Utility",
  robots: { index: false, follow: false },
};

/**
 * Variant B, utility-led.
 *
 * Leads with the tool: the category tray sits immediately under the headline
 * rather than beside a proof panel, and the offers render as cards. Same
 * tokens, same two flooded bands, same real figures.
 */
export default function HomeB() {
  return (
    <div className="rl-h rl-shell2">
      <Header2 />

      <main>
        {/* 1. hero on flooded band one: headline, one action, then the tool */}
        <section className="rl-field rl-hero2">
          <div className="rl-wrap2">
            <div className="rl-hero2__grid">
              <div>
              <h1 className="rl-hero2__h1">
                Compare it properly, before <em>you buy</em>.
              </h1>
              <p className="rl-hero2__sub">
                Pick a category. Every offer and price is read off the
                provider&rsquo;s own page and carries the date we read it.
              </p>
              <div className="rl-acts">
                <Link href="/deals" className="rl-btn2 rl-btn2--p">Browse current offers</Link>
                <Link href="/editorial-policy" className="rl-btn2 rl-btn2--s">How we verify</Link>
              </div>
              <p className="rl-note">
                {verifiedOfferCount} offers verified, oldest read{" "}
                {oldestReadingISO ? formatReading(oldestReadingISO) : "not recorded"}.
              </p>
              </div>
              <Compare2 />
            </div>

            <div className="rl-overlap"><Tray /></div>
          </div>
        </section>
        <div className="rl-overlap-sp" aria-hidden="true" />

        {/* 2. trust strip, flooded band two */}
        <Strip2 />

        {/* 3. the comparison module, as cards */}
        <section className="rl-sec">
          <div className="rl-wrap2">
            <h2 className="rl-h2x">Current offers</h2>
            <p className="rl-lede2">
              Offers carrying a real discount. Free plans and free trials are not
              listed, because anyone can start those direct from the vendor.
            </p>
            <OfferCards2 />
          </div>
        </section>

        {/* 4. method, with the one image slot */}
        <section className="rl-sec rl-ruleTop">
          <div className="rl-wrap2">
            <div className="rl-hero2__grid">
              <div>
                <h2 className="rl-h2x">Reading it off the source</h2>
                <p className="rl-lede2">
                  A price on a comparison site is a claim about someone else&rsquo;s
                  page. We open that page, read the figure, and print the date we
                  read it beside the number. When a reading passes 60 days, the card
                  says so rather than quietly ageing.
                </p>
                <Link href="/editorial-policy" className="rl-btn2 rl-btn2--s">
                  How we verify
                </Link>
              </div>
              <ImageSlot note={"1040 x 780, 4:3\n\nNo partner photography has arrived. Slot held open rather than filled with stock."} />
            </div>
          </div>
        </section>

        <Method2 />
        <Guides2 />
        <Partners2 />
        <Editorial2 />
      </main>

      <Footer2 />
    </div>
  );
}
