import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import PowerStationTable from "@/components/energy/PowerStationTable";
import PowerCtaPair from "@/components/energy/PowerCtaPair";
import { ECOFLOW_URL, ANKER_SOLIX_URL } from "@/lib/affiliate-links";
import { STATIONS, perWh, fmtPerWh, fmtAud, PRICES_READ_ON } from "@/lib/portable-power";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.ecoflowVsAnkerSolix);

const SLUG = "/ecoflow-vs-anker-solix";
const UPDATED = "2026-08-24";
const UPDATED_LABEL = "24 August 2026";

/**
 * The brand-pair format, which is the only page type on this site measured to
 * both rank and get cited.
 *
 * The fact it owns: a directly comparable AUD cost-per-watt-hour table at
 * matching capacities. Published comparisons of these two almost all quote USD
 * or an undated sale price, so an Australian buyer cannot actually tell which is
 * cheaper for the capacity they need. Every figure is read off each brand's own
 * AU store and dated, and EcoFlow's struck-through prices are recorded so a sale
 * is not mistaken for the standing price.
 *
 * Refer Labs earns from both, which is stated on the page rather than implied.
 */

const pair = (wh: number) => {
  const at = STATIONS.filter((s) => Math.abs(s.wh - wh) < 40);
  const eco = at.filter((s) => s.brand === "EcoFlow").sort((a, b) => a.aud - b.aud)[0];
  const ank = at.filter((s) => s.brand === "Anker SOLIX").sort((a, b) => a.aud - b.aud)[0];
  return { eco, ank };
};
const P1K = pair(1024);
// The most output you can buy under A$2,000, whichever brand holds it. Named
// rather than assumed: it is currently Anker's, and that is the whole case for
// paying its premium.
const TOP_OUTPUT_UNDER_2K = [...STATIONS].filter((s) => s.aud < 2000).sort((a, b) => b.watts - a.watts)[0];
const P2K = pair(2048);

const faqs = [
  {
    q: "Is EcoFlow or Anker SOLIX cheaper in Australia?",
    a: `EcoFlow at the two tiers most people buy in. At roughly 1,000Wh the EcoFlow DELTA 3 Classic is ${fmtAud(P1K.eco.aud)} against ${fmtAud(P1K.ank.aud)} for the Anker SOLIX C1000, which is ${fmtPerWh(P1K.eco)} versus ${fmtPerWh(P1K.ank)}. At roughly 2,000Wh the DELTA 2 Max is ${fmtAud(P2K.eco.aud)} against ${fmtAud(P2K.ank.aud)} for the C2000 Gen 2. At the 290Wh entry tier they are level: both charge A$449, for 286Wh and 600W from EcoFlow against 288Wh and 300W from Anker. The gap narrows but does not close at EcoFlow's regular prices, since several EcoFlow models were discounted when these were read on ${PRICES_READ_ON}. Check both before buying.`,
  },
  {
    q: "Does Anker SOLIX offer anything EcoFlow does not at the same price?",
    a: `More continuous output at the 1,000Wh tier. The C1000 Gen 2 delivers 2,000W against 1,800W for EcoFlow's DELTA 3 range, which matters if you intend to run a kettle, microwave or power tool rather than only electronics. Output and capacity are different specifications and the one that stops a unit working is output: a large battery with a small inverter will refuse a high-draw appliance no matter how much charge it holds.`,
  },
  {
    q: "Which has the bigger unit?",
    a: `EcoFlow. Its DELTA Pro Ultra reaches ${fmtAud(7299)} at 6,144Wh and 6,900W, above Anker's largest single unit, the F3800 at ${fmtAud(5399)} for 3,840Wh and 6,000W. Both expand with add-on batteries, so the practical ceiling is higher than either headline figure and the cost per watt-hour of expansion packs is worth checking separately.`,
  },
  {
    q: "Are these a substitute for an installed home battery?",
    a: "No. A portable unit runs a fridge, a router and devices through an outage and needs no electrician, which is why it suits renters and apartments. An installed battery runs circuits, charges from rooftop solar and qualifies for the federal rebate, none of which a portable unit does. We set the two out side by side on our portable versus installed page.",
  },
  {
    q: "Does Refer Labs earn from this comparison?",
    a: "Yes, from both brands. Cost per watt-hour is arithmetic on prices you can check on each company's own store, so a commission cannot move it. We also earn from Apollo Energy Group on installed batteries, and that is stated wherever the two categories are compared.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Solar & energy", item: `${SITE_URL}/solar-and-energy` },
    { "@type": "ListItem", position: 3, name: "EcoFlow vs Anker SOLIX", item: `${SITE_URL}${SLUG}` },
  ],
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.ecoflowVsAnkerSolix.title,
  description: seoConfig.ecoflowVsAnkerSolix.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const articleSchema = comparisonArticleSchema({
  headline: "EcoFlow vs Anker SOLIX: priced per watt-hour in Australian dollars",
  description: seoConfig.ecoflowVsAnkerSolix.description,
  url: `${SITE_URL}${SLUG}`,
  datePublished: UPDATED,
  dateModified: UPDATED,
});

const aff = { target: "_blank" as const, rel: "nofollow sponsored" as const };

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/portable-power-station-australia" className="hover:text-[#0a7c42]">Portable power</Link>
          <span>/</span>
          <span className="text-[#2b362f]">EcoFlow vs Anker SOLIX</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          EcoFlow vs Anker SOLIX: <span className="text-[#0a7c42]">priced per watt-hour, in AUD</span>
        </h1>

        {/* The answer, first. Nothing above it. */}
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          <strong>EcoFlow is cheaper per watt-hour at the 1,000Wh and 2,000Wh tiers, where most buyers land.</strong> At about
          1,000Wh that is {fmtPerWh(P1K.eco)} against {fmtPerWh(P1K.ank)}; at about 2,000Wh, {fmtPerWh(P2K.eco)} against{" "}
          {fmtPerWh(P2K.ank)}. Anker answers with output rather than price: its C1000 Gen 2 delivers 2,000W where
          EcoFlow&apos;s 1,000Wh units deliver 1,800W, which decides whether a kettle or a microwave will run at all. At the 290Wh entry tier both brands charge A$449 and the rate per watt-hour is level, though EcoFlow&apos;s unit puts out 600W against Anker&apos;s 300W.
        </p>

        {/* Below the lead. The first paragraph after the h1 is the answer;
            a disclosure in that slot is what an engine lifts instead. Still
            above the first affiliate link, which is what it is for. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <PowerCtaPair location="vs-top" className="mt-6" />

        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        <div className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
          Every price below was read off each brand&apos;s own Australian store on {PRICES_READ_ON}, not converted from
          US pricing and not taken from a retailer. Several EcoFlow models were on sale when read, and the regular price
          is shown beside them so a discount is not mistaken for the standing price.
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            Is EcoFlow or Anker SOLIX cheaper in Australia?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Cost per watt-hour is the only figure that makes different capacities comparable, and it is simple
            arithmetic on a published price. Sorted that way the two ranges interleave, with EcoFlow holding the cheaper slot at 1,000Wh and
            2,000Wh and the pair level at the 290Wh entry tier.
          </p>
          <PowerStationTable caption="EcoFlow and Anker SOLIX, Australian range, sorted by cost per watt-hour." />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where each one wins</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
              <p className="text-lg font-bold text-[#10251b]">EcoFlow</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
                Cheaper for the same capacity at 1,000Wh and 2,000Wh, and the largest single unit of the two.
                Choose it if you are buying capacity per dollar, or want one unit that can grow.
              </p>
              <p className="mt-3 text-[13px] text-[#6e7b74]">
                Cheapest 1,000Wh: {P1K.eco.model} at {fmtAud(P1K.eco.aud)}
              </p>
              <a href={ECOFLOW_URL} {...aff} data-cta="vs-ecoflow" className="nw-btn mt-5 justify-center">
                See EcoFlow prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3">
                <Link href="/ecoflow" className="text-xs text-[#3d4b44] underline underline-offset-2 hover:text-[#10251b]">
                  Read our EcoFlow breakdown
                </Link>
              </p>
            </div>
            <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
              <p className="text-lg font-bold text-[#10251b]">Anker SOLIX</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
                More continuous output at the 1,000Wh tier, 2,000W against 1,800W. Choose it if the point is running
                high-draw appliances rather than storing the most energy per dollar.
              </p>
              <p className="mt-3 text-[13px] text-[#6e7b74]">
                Most output under A$2,000: {TOP_OUTPUT_UNDER_2K.model} at{" "}
                {TOP_OUTPUT_UNDER_2K.watts.toLocaleString("en-AU")}W, {fmtAud(TOP_OUTPUT_UNDER_2K.aud)}
              </p>
              <a href={ANKER_SOLIX_URL} {...aff} data-cta="vs-anker" className="nw-btn mt-5 justify-center">
                See Anker SOLIX prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3">
                <Link href="/anker-solix" className="text-xs text-[#3d4b44] underline underline-offset-2 hover:text-[#10251b]">
                  Read our Anker SOLIX breakdown
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            Output, not capacity, is what stops a unit working
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Capacity in watt-hours tells you how long something runs. Output in watts tells you whether it runs at all.
            A 2,000Wh unit rated at 1,800W will refuse a 2,400W appliance no matter how full it is. If your reason for buying is a kettle, a microwave, a power tool or a
            portable air conditioner, read the output column first and the capacity column second.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What we earn, on both sides</h2>
          <div className="mt-4 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6">
            <p className="text-[15px] leading-relaxed text-[#3d4b44]">
              Links to EcoFlow and to Anker SOLIX are both affiliate links, so we earn either way and have no reason to
              prefer one. That is why this page turns on cost per watt-hour: it is arithmetic on prices published by the
              companies themselves, which you can check in a minute and a commission cannot move. We also earn from{" "}
              <Link href="/apollo-energy-group" className="font-semibold text-[#0a7c42] hover:underline">Apollo Energy Group</Link>{" "}
              on installed home batteries, and both of these brands sell installed systems that compete with Apollo.
              Our{" "}
              <Link href="/portable-vs-installed-home-battery-australia" className="font-semibold text-[#0a7c42] hover:underline">
                portable versus installed
              </Link>{" "}
              page sets out that overlap.{" "}
              <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">How we make money</Link>.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6">
          <h2 className="text-lg font-bold text-[#10251b]">Check the current price on the one you have picked</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
            Both ranges move on sale pricing, so the figures above are a snapshot dated {UPDATED_LABEL}. Open whichever
            store matches your decision and confirm what the model costs today.
          </p>
          <PowerCtaPair location="vs-bottom" className="mt-5" />
        </section>

        <section className="mt-10 border-t border-[#eef1ef] pt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">Keep reading</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li><Link href="/portable-power-station-australia" className="font-semibold text-[#0a7c42] hover:underline">What a portable power station costs and runs</Link></li>
            <li><Link href="/portable-vs-installed-home-battery-australia" className="font-semibold text-[#0a7c42] hover:underline">Portable vs installed</Link></li>
            <li><Link href="/home-battery-blackout-backup-australia" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">Blackout backup</Link></li>
            <li><Link href="/apollo-energy-group" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">Installed batteries with Apollo</Link></li>
          </ul>
        </section>
      </main>
    </ConsumerShell>
  );
}
