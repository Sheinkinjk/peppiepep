import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import BatteryCalc from "./BatteryCalc";

export const metadata = generateSEOMetadata(seoConfig.homeBatteryPaybackCalculator);

const SLUG = "/home-battery-payback-calculator";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Home Batteries", item: `${SITE_URL}/apollo-energy` },
    { "@type": "ListItem", position: 3, name: "Battery Payback Calculator", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "How is home battery payback calculated?",
    a: "Payback is the net cost of the battery divided by what it saves you each year. The saving comes mostly from storing your own solar and using it at night instead of buying power at peak rates, which is worth the peak buy rate minus the feed-in tariff you gave up. This calculator estimates net cost from the battery size and the federal rebate, then divides by the annual saving from your usage and tariff inputs. It is an illustrative starting estimate, not a quote.",
  },
  {
    q: "What payback period is realistic for a home battery in Australia?",
    a: "With the 2026 federal rebate, reputable Australian sources commonly cite payback of about six to nine years in states with higher electricity prices, and shorter if you join a Virtual Power Plant and self-consume most of your solar. It varies a lot with your usage, tariff, existing solar and feed-in rate, which is why this calculator asks for those rather than assuming them.",
  },
  {
    q: "Does the calculator include the federal rebate?",
    a: "Yes, unless you enter your own quoted price. It estimates the federal Cheaper Home Batteries discount from the tiered taper: the full rate up to 14kWh, then 60% from 14 to 28kWh, then 15% above that. The per-kWh rate is indicative and floats with the certificate market, so treat the rebate figure as a close guide. If you already have a quote, enter the installed price after rebate for a more accurate result.",
  },
  {
    q: "Why does a bigger battery not always pay back faster?",
    a: "Two reasons. The federal rebate pays the full rate only up to 14kWh, so extra capacity above that earns a smaller subsidy per kWh. And a battery only saves money on the energy it actually cycles most nights, so capacity beyond your evening and overnight use often sits idle. That is why sizing to your real usage, usually around 10 to 14kWh for most homes, tends to pay back better than oversizing.",
  },
  {
    q: "Is this calculator financial advice?",
    a: "No. It is general information to help you sense-check the economics, built from your own inputs and clearly-stated assumptions. It is not a quote, a guarantee or financial advice, and the real figure depends on your home, usage and tariff. Refer Labs earns a commission if you request a quote through the Apollo Energy Group link, at no extra cost to you, and that never changes what the tool calculates.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.homeBatteryPaybackCalculator.title,
  description: seoConfig.homeBatteryPaybackCalculator.description,
  url: seoConfig.homeBatteryPaybackCalculator.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-19",
  dateModified: "2026-07-19",
  about: [
    { "@type": "Thing", name: "home battery payback calculator" },
    { "@type": "Thing", name: "home battery payback period Australia" },
    { "@type": "Thing", name: "battery savings calculator Australia" },
    { "@type": "Thing", name: "Cheaper Home Batteries rebate" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function HomeBatteryPaybackCalculatorPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="hover:text-[#10251b] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/apollo-energy" className="hover:text-[#10251b] transition-colors">Home batteries</Link>
            <span>/</span>
            <span className="text-[#10251b]">Payback calculator</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6 max-w-3xl">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              Home battery payback calculator
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Work out roughly how long a home battery would take to pay for itself, from your own usage and tariff. It
              estimates the federal rebate, the net cost and the annual saving, then the payback period. Every number is
              built from your inputs and stated assumptions, so treat it as a starting estimate, not a quote. It is
              general information, not financial advice.
            </p>
          </header>

          {/* Calculator */}
          <BatteryCalc />

          <article className="mt-12 max-w-3xl space-y-9">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">How the estimate works</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  The saving from a battery is mostly arbitrage: you store cheap or free solar during the day and use it
                  at night instead of buying power at the peak rate. So each kWh you shift is worth the peak rate you
                  avoid, minus the small feed-in tariff you would have earned exporting it. The lower feed-in tariffs
                  have fallen, the more a stored kWh is worth.
                </p>
                <p>
                  Net cost is the installed price minus the federal rebate. The calculator estimates installed cost from
                  researched per-kWh ranges, and the rebate from the tiered taper, but if you already have a quote,
                  entering it makes the result far more accurate. The full method and the price ranges are in our{" "}
                  <Link href="/home-battery-cost-australia" className="nw-link">home battery cost guide</Link>, and the
                  rebate detail is in our{" "}
                  <Link href="/home-battery-rebate-australia" className="nw-link">rebate guide</Link>.
                </p>
                <p>
                  What the tool cannot know is your exact tariff structure, whether you join a Virtual Power Plant, or
                  your real installed price. Those are why a quote for your own home is the only figure to act on.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">Turn the estimate into a real number</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                Apollo Energy Group sizes a battery from your actual usage and applies the federal rebate at the quote,
                so you get a real payback figure for your home. You get $500 off your quote through our link, no code
                needed, and it commits you to nothing.
              </p>
              <a
                href={APOLLO_ENERGY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="battery-calc-footer"
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
                <li><Link href="/home-battery-cost-australia" className="nw-link">How much a home battery costs in Australia</Link></li>
                <li><Link href="/home-battery-rebate-australia" className="nw-link">The 2026 home battery rebate, explained</Link></li>
                <li><Link href="/apollo-energy" className="nw-link">Apollo Energy Group: the offer and how it works</Link></li>
                <li><Link href="/apollo-energy-review" className="nw-link">Apollo Energy Group review: is it legit?</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#e5e9e7] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#9aa39c]">
                This page is published by Refer Labs, an independent comparison publisher, and contains a disclosed
                affiliate link to Apollo Energy Group, which means we may earn a commission if you request a quote
                through our link. Commissions never change what we write or what the calculator computes. All figures are
                illustrative estimates built from your inputs and stated assumptions, are not a quote, and are subject to
                change with the market. Content is general information, not financial advice. See{" "}
                <Link href="/how-we-research" className="nw-link">how we research</Link>.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={APOLLO_ENERGY_URL} product="Apollo Energy · home batteries" label="Get $500 off" />
    </ConsumerShell>
  );
}
