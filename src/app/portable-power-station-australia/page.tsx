import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import PowerStationTable from "@/components/energy/PowerStationTable";
import PowerCtaPair from "@/components/energy/PowerCtaPair";
import { ECOFLOW_URL, ANKER_SOLIX_URL } from "@/lib/affiliate-links";
import { STATIONS, RUNS, fmtAud, fmtPerWh, PRICES_READ_ON } from "@/lib/portable-power";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.portablePowerStationAustralia);

const SLUG = "/portable-power-station-australia";
const UPDATED = "2026-08-24";

/**
 * The decision page above the two brand pages.
 *
 * Built for a reader the rest of this site could not serve: someone who rents or
 * lives in an apartment and cannot install anything. Across the whole energy
 * cluster there were zero mentions of "portable" and zero of "apartment" before
 * this page, while every existing page assumed a roof and an electrician.
 *
 * The fact it owns is the same one the comparison page owns: real AUD prices per
 * watt-hour, read off the brands' own stores and dated. The runtime figures are
 * deliberately conservative and the arithmetic is shown rather than asserted.
 */

const cheapest1k = STATIONS.filter((s) => Math.abs(s.wh - 1024) < 40).sort((a, b) => a.aud - b.aud)[0];
const cheapestAny = [...STATIONS].sort((a, b) => a.aud - b.aud)[0];

const faqs = [
  {
    q: "What does a portable power station cost in Australia?",
    a: `From ${fmtAud(cheapestAny.aud)} for a ${cheapestAny.wh}Wh unit that keeps phones and a router going, up to ${fmtAud(7299)} for a 6,144Wh unit that will carry a fridge and more for a day or two. The useful middle, around 1,000Wh, starts at ${fmtAud(cheapest1k.aud)} for the ${cheapest1k.model}. Judge them on cost per watt-hour rather than headline price, because capacity varies far more than the price tags suggest. Prices read off EcoFlow's and Anker SOLIX's own Australian stores on ${PRICES_READ_ON}.`,
  },
  {
    q: "Can I use one if I rent or live in an apartment?",
    a: "Yes, and that is the main reason to choose one. A portable power station plugs into a normal outlet to charge and needs no electrician, no roof, no switchboard work and no landlord permission. An installed home battery needs all of those, which is why most renters and apartment residents have no path to backup power at all otherwise.",
  },
  {
    q: "Will a portable power station run my fridge in a blackout?",
    a: "Usually, yes. A typical fridge-freezer averages around 100W once you account for it cycling on and off rather than running continuously, so a 1,000Wh unit will hold one up for roughly six to eight hours after inverter losses. The catch is the start-up surge when the compressor kicks in, which is far higher than the running figure: check the unit's surge rating, not only its continuous output.",
  },
  {
    q: "Do portable power stations qualify for the federal battery rebate?",
    a: "No. The Cheaper Home Batteries program applies to installed systems fitted by an accredited installer, not to a plug-in appliance you buy off a shelf. If a rebate is central to your decision, you are looking at an installed battery, and the arithmetic changes completely. We set the two out side by side on our portable versus installed page.",
  },
  {
    q: "How is this page paid for?",
    a: "Links to EcoFlow and Anker SOLIX are affiliate links, so we earn if you buy through them, at no extra cost to you. We earn from both, which is why the comparison runs on cost per watt-hour taken from each company's own published prices. We also earn from Apollo Energy Group on installed batteries, and both these brands sell installed systems that compete with Apollo; that is stated wherever the categories meet.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Solar & energy", item: `${SITE_URL}/solar-and-energy` },
    { "@type": "ListItem", position: 3, name: "Portable power stations", item: `${SITE_URL}${SLUG}` },
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
  name: seoConfig.portablePowerStationAustralia.title,
  description: seoConfig.portablePowerStationAustralia.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const articleSchema = comparisonArticleSchema({
  headline: "Portable power stations in Australia: what they cost and what they run",
  description: seoConfig.portablePowerStationAustralia.description,
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
          <Link href="/apollo-energy-group" className="hover:text-[#0a7c42]">Home &amp; energy</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Portable power stations</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Portable power stations in Australia: <span className="text-[#0a7c42]">what they cost, and what they run</span>
        </h1>

        {/* Above the first affiliate link, not below it. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Australian prices run from <strong>{fmtAud(cheapestAny.aud)}</strong> for a {cheapestAny.wh}Wh unit that keeps
          a router and phones alive, to <strong>{fmtAud(7299)}</strong> for 6,144Wh that will carry a fridge for a day
          or more. The useful middle sits around 1,000Wh from <strong>{fmtAud(cheapest1k.aud)}</strong>. None of them
          need an electrician, which is the whole point if you rent or live in an apartment.
        </p>

        <PowerCtaPair location="pps-top" className="mt-6" />

        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            Can I use one if I rent or live in an apartment?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Yes. A portable station charges from
            a normal power point and powers appliances from its own outlets. No switchboard work, no roof, no accredited
            installer, no landlord conversation. Every other page in this section assumes you own the building and can
            have someone wire a battery into it. The ABS put the renting share of Australian households at 31% in its
            Housing Occupancy and Costs release for 2019-20, its latest, read 25 August 2026.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            The trade is scale. You are powering selected appliances through a plug, not the circuits of a house, and
            you charge it back up from a wall socket rather than from a roof.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What a portable power station costs</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Compare on cost per watt-hour rather than on the sticker, because capacity varies far more widely than
            price does. Both ranges below are shown together and sorted that way.
          </p>
          <PowerStationTable caption="EcoFlow and Anker SOLIX, the two ranges we hold links for, sorted by cost per watt-hour." />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What will it actually run?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Divide capacity by draw and take roughly 15% off for inverter losses. A 1,000Wh unit against a 100W load is
            about eight hours on paper and closer to seven in practice.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e9e7] bg-[#f8faf9] text-[#6e7b74]">
                  <th className="px-4 py-3 font-semibold">Appliance</th>
                  <th className="px-4 py-3 font-semibold">Typical draw</th>
                  <th className="px-4 py-3 font-semibold">On a 1,000Wh unit</th>
                  <th className="px-4 py-3 font-semibold">Worth knowing</th>
                </tr>
              </thead>
              <tbody>
                {RUNS.map((r) => (
                  <tr key={r.appliance} className="border-b border-[#eef1ef] last:border-0 align-top">
                    <td className="px-4 py-3 font-semibold text-[#10251b]">{r.appliance}</td>
                    <td className="px-4 py-3 tabular-nums text-[#3d4b44]">{r.watts}W</td>
                    <td className="px-4 py-3 tabular-nums text-[#3d4b44]">
                      {r.watts > 900 ? "Minutes, if output allows" : `about ${Math.floor((1024 * 0.85) / r.watts)} hours`}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#6e7b74]">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#6e7b74]">
            Draw figures are typical Australian appliance averages, not measurements of your appliance. A fridge cycles,
            so it draws far less over an hour than its nameplate suggests. Anything with a heating element or a
            compressor draws a large surge at start-up: check the unit&apos;s surge rating as well as its continuous
            output.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Which brand, and what we earn</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
              <p className="text-lg font-bold text-[#10251b]">EcoFlow</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
                Cheaper per watt-hour at the 1,000Wh and 2,000Wh tiers, and the widest range at both ends.
              </p>
              <a href={ECOFLOW_URL} {...aff} data-cta="pps-ecoflow" className="nw-btn mt-5 justify-center">
                See EcoFlow prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
              <p className="text-lg font-bold text-[#10251b]">Anker SOLIX</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
                More continuous output at the 1,000Wh tier, which decides whether high-draw appliances run.
              </p>
              <a href={ANKER_SOLIX_URL} {...aff} data-cta="pps-anker" className="nw-btn mt-5 justify-center">
                See Anker SOLIX prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[#6e7b74]">
            Both links are affiliate links and we earn from either, at no extra cost to you. The comparison rests on each
            brand&apos;s published prices.{" "}
            <Link href="/ecoflow-vs-anker-solix" className="underline hover:text-[#3d4b44]">The full head-to-head</Link>{" "}
            sets them out at matching capacities.{" "}
            <Link href="/how-we-make-money" className="underline hover:text-[#3d4b44]">How we make money</Link>.
          </p>
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

        <section className="mt-10 border-t border-[#eef1ef] pt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">Keep reading</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li><Link href="/ecoflow-vs-anker-solix" className="font-semibold text-[#0a7c42] hover:underline">EcoFlow vs Anker SOLIX</Link></li>
            <li><Link href="/portable-vs-installed-home-battery-australia" className="font-semibold text-[#0a7c42] hover:underline">Portable vs installed</Link></li>
            <li><Link href="/ecoflow" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">EcoFlow prices</Link></li>
            <li><Link href="/anker-solix" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">Anker SOLIX prices</Link></li>
            <li><Link href="/home-battery-rebate-australia" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">The battery rebate</Link></li>
          </ul>
        </section>
      </main>
    </ConsumerShell>
  );
}
