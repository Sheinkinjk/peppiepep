import type { Metadata } from "next";
import { publicSans } from "../legacy-font";
import Link from "next/link";
import "../home.css";
import {
  Editorial2, Footer2, Guides2, Header2, ImageSlot, Method2,
  OffersTable2, Partners2, ProofCard, Strip2, Tray,
} from "@/components/preview/Home2";
import { oldestReadingISO, formatReading, verifiedOfferCount } from "@/lib/preview/data";

export const metadata: Metadata = {
  title: "Variant A, Publisher",
  robots: { index: false, follow: false },
};

/**
 * Variant A, editorial-led.
 *
 * The verification record is the hero proof, so the raised proof card sits in
 * the hero rather than an image. Module order follows the Phase 1E convention
 * that appeared on 4 or more of 5 references.
 */
export default function HomeA() {
  return (
    <div className={publicSans.variable}>
    <div className="rl-h rl-shell2">
      <Header2 />

      <main>
        {/* 1. hero on flooded band one, with the tray overlapping its edge */}
        <section className="rl-field rl-hero2">
          <div className="rl-wrap2">
            <div className="rl-hero2__grid">
              <div>
                <h1 className="rl-hero2__h1">
                  Every offer here carries the date <em>we read it</em>.
                </h1>
                <p className="rl-hero2__sub">
                  We check each offer on the provider&rsquo;s own page and publish the
                  date. No provider pays to appear, and none pays to rank higher.
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
              <ProofCard />
            </div>

            <div className="rl-overlap"><Tray /></div>
          </div>
        </section>
        <div className="rl-overlap-sp" aria-hidden="true" />

        {/* 2. trust strip, flooded band two */}
        <Strip2 />

        {/* 3. the comparison module, real numbers */}
        <section className="rl-sec">
          <div className="rl-wrap2">
            <h2 className="rl-h2x">Current offers</h2>
            <p className="rl-lede2">
              Offers carrying a real discount. Free plans and free trials are not
              listed, because anyone can start those direct from the vendor.
            </p>
            <OffersTable2 />
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
                  read it beside the number. When a reading passes 60 days, the row
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
    </div>
  );
}
