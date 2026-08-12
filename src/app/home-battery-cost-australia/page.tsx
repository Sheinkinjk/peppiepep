import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.homeBatteryCost);

const SLUG = "/home-battery-cost-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Home Batteries", item: `${SITE_URL}/apollo-energy-group` },
    { "@type": "ListItem", position: 3, name: "Home Battery Cost Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "How much does a home battery cost in Australia in 2026?",
    a: "Installed battery prices are commonly quoted around $600 to $1,300 per usable kWh before rebates, with bigger systems costing less per kWh. After the federal Cheaper Home Batteries discount, worked examples from industry sources put a typical 10kWh system in the several-thousand-dollar range and a 13.5kWh system around $10,000 installed, though the spread is wide depending on the brand, the inverter and your site. Always check whether a quoted price is supply-only or installed, and before or after the rebate.",
  },
  {
    q: "Does the federal rebate reduce these prices?",
    a: "Yes. The federal Cheaper Home Batteries Program applies a point-of-sale discount of roughly 30% of the upfront cost, applied by the installer, so the prices you are quoted usually already include it. It tapers above 14kWh, which is one reason most homes are sized around that mark. Our home battery rebate guide explains exactly what it pays and how the taper works.",
  },
  {
    q: "What is the payback period on a home battery?",
    a: "With the 2026 rebate, reputable Australian sources commonly cite payback in the range of about six to nine years in states with higher electricity prices, and sometimes shorter if you join a Virtual Power Plant and use most of your solar. It is genuinely variable, because payback depends on your usage pattern, your tariff, whether you already have solar, your feed-in rate and VPP participation. Treat any single number with caution and ask for a projection based on your own bills.",
  },
  {
    q: "Why do battery quotes vary so much?",
    a: "Three big reasons. First, whether the price is supply-only or fully installed. Second, whether it is before or after the federal rebate. Third, whether a new hybrid inverter is needed, which adds cost. A larger battery also costs less per kWh than a small one. This is why comparing quotes on a like-for-like basis matters more than chasing the lowest headline number.",
  },
  {
    q: "What size battery gives the best value?",
    a: "Most Australian homes are advised to size a battery to their evening and overnight usage rather than total daily use, which for a typical household lands somewhere around 10 to 14kWh usable. That range also lines up with the federal rebate, which pays the full rate only up to 14kWh, so oversizing means paying near-full price for capacity that both earns a smaller subsidy and often sits unused. A good installer sizes from your actual usage data.",
  },
  {
    q: "Does Refer Labs sell batteries?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how the costs and rebates work and link out to providers, including a disclosed affiliate link to Apollo Energy Group, which offers $500 off a quote through our link. We do not sell or install batteries and do not provide financial advice. Prices here are general information; get a quote for figures specific to your home.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

// Describes Refer Labs' comparison/information service, NOT a battery installer's
// service. Refer Labs is not an installer or energy retailer.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Australian home battery cost comparison",
  description:
    "Refer Labs explains Australian home battery cost ranges, rebate considerations, quote checks and payback factors using general information and disclosed referral links.",
  provider: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: "Home energy comparison publishing",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.homeBatteryCost.title,
  description: seoConfig.homeBatteryCost.description,
  url: seoConfig.homeBatteryCost.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  about: [
    { "@type": "Thing", name: "home battery cost Australia" },
    { "@type": "Thing", name: "home battery price 2026" },
    { "@type": "Thing", name: "battery payback period Australia" },
    { "@type": "Thing", name: "Cheaper Home Batteries Program" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// Installed cost bands per usable kWh, from SolarQuotes' battery cost guide
// (updated 12 May 2026). Bigger systems cost less per kWh. Ranges, not fixed prices.
const bands: { size: string; perKwh: string; note: string }[] = [
  { size: "~10 to 13kWh", perKwh: "$720 to $1,080 / kWh", note: "The common household range. Covers a typical evening plus part of the night." },
  { size: "~15 to 20kWh", perKwh: "$620 to $940 / kWh", note: "Larger homes or higher overnight use. Cheaper per kWh than a small battery." },
  { size: "~25 to 32kWh", perKwh: "$540 to $630 / kWh", note: "Big systems. Lowest per-kWh cost, but the rebate tapers above 14kWh." },
];

export default function HomeBatteryCostAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="hover:text-[#10251b] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/apollo-energy-group" className="hover:text-[#10251b] transition-colors">Home batteries</Link>
            <span>/</span>
            <span className="text-[#10251b]">Cost</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              How much a home battery costs in Australia
            </h1>
            <EditorialMeta lastUpdated="2026-07-17" className="mt-5" />
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Battery prices are confusing because quotes mix up supply-only and installed, and before and after the
              rebate. This page sets out the real installed cost ranges for 2026 by size, what the federal rebate takes
              off, what payback periods reputable sources actually cite, and why quotes vary so much. It is general
              information to help you read a quote, not financial advice. For a figure specific to your home, get a quote.
            </p>
          </header>

          {/* Answer-first: the exact buyer question as an H2, then a liftable answer for engines. */}
          <section className="pb-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">How much does it cost to install a home battery in Australia?</h2>
            <div className="mt-4 nw-card px-6 py-5">
              <p className="text-[15.5px] leading-relaxed text-[#2b362f]">
                Installed home batteries in Australia are commonly quoted around $600 to $1,300 per usable kWh before
                rebates, with larger systems costing less per kWh. The federal Cheaper Home Batteries discount then takes
                roughly 30% off at the point of sale, applied by your installer. What you actually pay depends on
                capacity, whether a new hybrid inverter is needed, and whether the quote is supply-only or fully
                installed, which is why quotes vary so much. Use these ranges to sense-check a quote, then get a quote
                for a figure specific to your home.
              </p>
            </div>
          </section>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Indicative ranges.</span> The figures below are researched
            industry ranges, not fixed prices, and battery costs move with the market. Use them to sense-check a quote,
            not as a promise. This page contains a disclosed affiliate link to Apollo Energy Group.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              The only price that matters is the one for your home. Apollo Energy Group sizes a battery from your actual
              usage and applies the federal rebate at the quote. You get $500 off your quote through our link, no code
              needed.
            </p>
            <a
              href={APOLLO_ENERGY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="battery-cost-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Get $500 off a quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Installed cost by size
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
                Installed battery cost is usually quoted per usable kWh, and bigger systems cost less per kWh. These
                bands are from industry price tracking in 2026. They are before any state incentive, and whether the
                federal rebate is already applied depends on the quote.
              </p>
              <div className="mt-5 overflow-x-auto rounded-xl border border-[#e5e9e7]">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="bg-[#f5f8f6] text-left">
                      <th className="px-4 py-3 font-semibold text-[#10251b]">Battery size</th>
                      <th className="px-4 py-3 font-semibold text-[#10251b]">Installed cost</th>
                      <th className="px-4 py-3 font-semibold text-[#10251b]">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e9e7]">
                    {bands.map((b) => (
                      <tr key={b.size}>
                        <td className="px-4 py-3 font-semibold text-[#10251b] whitespace-nowrap">{b.size}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-semibold text-[#0a7c42]">{b.perKwh}</td>
                        <td className="px-4 py-3 text-[#3d4b44]">{b.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
                Ranges based on Australian industry price tracking (SolarQuotes battery cost guide, updated May 2026).
                Indicative only, before state incentives. A new hybrid inverter, if needed, adds cost.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What that looks like in dollars
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Turned into whole-system prices, industry examples in 2026 put a common household battery in a broad
                  band from around $4,000 up to $13,000 or more installed after the federal rebate, depending heavily on
                  the brand and your site. A popular 13.5kWh system, for instance, is often quoted around $10,000
                  installed including its gateway. The spread is genuinely wide, which is why a single number is
                  misleading and a quote for your own home is the only figure worth acting on.
                </p>
                <p>
                  The federal{" "}
                  <Link href="/home-battery-rebate-australia" className="nw-link">Cheaper Home Batteries discount</Link>{" "}
                  takes roughly 30% off the upfront cost and is usually applied by the installer at the point of sale, so
                  the prices you are quoted often already include it. It tapers above 14kWh, which our rebate guide
                  explains in full.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Payback: a range, not a number
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  With the 2026 rebate, reputable Australian sources commonly cite payback of about six to nine years in
                  states with higher electricity prices, and shorter, closer to five to seven years, if you join a
                  Virtual Power Plant and self-consume most of your solar. Anyone quoting a precise payback without
                  knowing your bills is guessing.
                </p>
                <p>
                  Payback is driven by a handful of things: how much of your power you use after dark, your tariff and
                  whether it is time-of-use, whether you already have surplus solar to charge the battery, how low your
                  feed-in tariff has fallen, and whether you join a VPP. The lower feed-in tariffs have gone, the more a
                  battery makes sense, because exporting solar is worth so little. Our{" "}
                  <Link href="/home-battery-rebate-australia" className="nw-link">rebate guide</Link> covers the incentive
                  side, including state VPP incentives.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Reading a quote without getting caught out
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  Three checks save most of the confusion. Is the price supply-only or fully installed? Is it before or
                  after the federal rebate? And does it include a new inverter if your setup needs one? Get quotes on a
                  like-for-like basis and the differences between installers become real rather than an artefact of how
                  the number was presented.
                </p>
                <p>
                  For who does the installing and what to check on credentials and warranty, see our{" "}
                  <Link href="/apollo-energy-review" className="nw-link">Apollo Energy Group review</Link>, and for the
                  full picture on the offer and process, the{" "}
                  <Link href="/apollo-energy-group" className="nw-link">Apollo Energy Group guide</Link>.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">Get a price for your actual home</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                Ranges only get you so far. Apollo Energy Group sizes a battery from your real usage and applies the
                federal rebate at the quote, so you see a real number for your home. You get $500 off your quote through
                our link, no code needed, and it commits you to nothing.
              </p>
              <a
                href={APOLLO_ENERGY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="battery-cost-footer"
                className="nw-btn mt-5"
              >
                Get $500 off a quote <ArrowRight className="h-4 w-4" />
              </a>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                      {f.q}
                      <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section>
              <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/best-home-battery-australia" className="nw-link">Best home battery: how to actually choose one</Link></li>
                <li><Link href="/what-size-home-battery-do-i-need-australia" className="nw-link">What size home battery do I need?</Link></li>
                <li><Link href="/home-battery-payback-calculator" className="nw-link">Home battery payback calculator</Link></li>
                <li><Link href="/home-battery-rebate-australia" className="nw-link">The 2026 home battery rebate, explained</Link></li>
                <li><Link href="/apollo-energy-group" className="nw-link">Apollo Energy Group: the offer and how it works</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#e5e9e7] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#9aa39c]">
                This page is published by Refer Labs, an independent comparison publisher, and contains a disclosed
                affiliate link to Apollo Energy Group, which means we may earn a commission if you request a quote through
                our link. Commissions never change what we write. Prices are researched industry ranges, indicative only
                and subject to change, and are not a quote. Content is general information, not financial advice.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={APOLLO_ENERGY_URL} product="Apollo Energy · home batteries" label="Get $500 off" />
    </ConsumerShell>
  );
}
