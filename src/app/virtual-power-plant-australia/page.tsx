import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { APOLLO_ENERGY_LEAD_HREF } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.virtualPowerPlantAustralia);

const SLUG = "/virtual-power-plant-australia";
const UPDATED = "July 2026";

// Payment models: factual descriptions of how AU VPPs pay, with brands named only
// as illustrations of a model type (not ranked, no invented current rates).
const MODELS: { model: string; paid: string; example: string }[] = [
  {
    model: "Cheaper energy plan",
    paid: "You get a discounted electricity plan in exchange for giving the VPP access to your battery.",
    example: "Tesla Energy Plan, sonnenFlat",
  },
  {
    model: "Event / dispatch payments",
    paid: "You are paid per kWh when your battery is called on to support the grid during peak-demand or price-spike events.",
    example: "Many retailer VPPs",
  },
  {
    model: "Wholesale exposure",
    paid: "You buy and sell at wholesale prices: charge the battery when power is cheap, export when it is expensive.",
    example: "Amber",
  },
];

const TRADEOFFS: { h: string; p: string }[] = [
  {
    h: "You give up some control",
    p: "The VPP operator can draw on a share of your stored energy at high-value moments. Good programs keep a reserve so you are not left empty during an outage, but you are no longer the only one deciding when the battery discharges.",
  },
  {
    h: "More cycling can mean more wear",
    p: "Exporting to the grid cycles the battery harder than home use alone, which can add wear over time. The better programs cap how hard the battery is worked and set reserve rules to manage this.",
  },
  {
    h: "Warranty needs checking",
    p: "Major battery brands generally keep approved VPP use inside their warranty and cap cycling, but this is not universal. Confirm VPP cover with your battery manufacturer and installer before you enrol, not after.",
  },
];

const faqs = [
  {
    q: "What is a virtual power plant (VPP)?",
    a: "A virtual power plant is a network that links thousands of home batteries (and sometimes solar, EV chargers and hot-water systems) so they can act like one large power station. Your battery automatically sends a share of its stored energy to the grid at high-value moments, and you receive a bill credit or a direct payment in return. You still use the battery normally the rest of the time.",
  },
  {
    q: "How much can a home battery earn in a VPP in Australia?",
    a: "Industry estimates put typical residential VPP returns at roughly $200 to $1,500 a year, depending on your battery size, how volatile wholesale prices are in your state, and which program you join. For most homes it is modest, a bill credit of a few hundred dollars a year on top of the savings the battery already delivers. Wholesale-exposure plans like Amber can reach the higher end in volatile markets, but they carry more variability. Treat any single figure as indicative and confirm current terms with the provider.",
  },
  {
    q: "Is joining a VPP worth it?",
    a: "It is worth it when the extra earnings and any upfront incentive outweigh the added battery cycling and the loss of some control. If you are in NSW, the upfront VPP incentive (worth roughly $40 per usable kWh, up to about $1,100) can make joining worthwhile on the incentive alone. Elsewhere it comes down to the ongoing payments and whether the program protects your battery with sensible cycling caps and reserve rules. It is a smaller decision than the battery itself, and reversible on most plans.",
  },
  {
    q: "Does a VPP affect my battery warranty?",
    a: "It can, so this is the thing to check before enrolling. Most major battery manufacturers keep approved VPP participation within warranty and limit how hard the battery is cycled, but terms differ by brand and program. Confirm VPP cover directly with your battery manufacturer and installer before you join, and prefer programs that publish cycling caps and reserve rules.",
  },
  {
    q: "Do I need a battery to join a VPP?",
    a: "In practice, yes. A home battery is what a VPP dispatches to the grid, so a battery (usually paired with solar) is the entry point. Some programs also coordinate solar-only or EV-charger setups, but the meaningful payments and the state incentives are tied to battery storage.",
  },
  {
    q: "How is the NSW VPP incentive different from the federal rebate?",
    a: "They are two separate things that stack. The federal Cheaper Home Batteries rebate reduces the upfront cost of the battery at the point of sale (indicatively around $252 per usable kWh). The NSW VPP incentive is paid separately for connecting an eligible battery to an approved Virtual Power Plant, worth roughly $40 per usable kWh, capped at 28kWh, so up to about $1,100. A NSW household can claim both on the same battery. See our home battery rebate by state guide for how this differs elsewhere.",
  },
  {
    q: "Which VPP should I join?",
    a: "Compare programs on the things that actually vary: the payment structure (an upfront incentive, ongoing credits or per-event export rates), how hard the battery is cycled and whether there are cycling caps and a guaranteed reserve, whether your battery brand is supported, and whether you keep full warranty cover. Check the exit terms too, since most plans are reversible. Confirm current provider terms before enrolling.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Home Batteries", item: `${SITE_URL}/apollo-energy-group` },
    { "@type": "ListItem", position: 3, name: "Virtual Power Plant (VPP)", item: `${SITE_URL}${SLUG}` },
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
  name: seoConfig.virtualPowerPlantAustralia.title,
  description: seoConfig.virtualPowerPlantAustralia.description,
  url: seoConfig.virtualPowerPlantAustralia.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-28",
  dateModified: pageDates("/virtual-power-plant-australia")?.updated ?? "2026-07-28",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
  about: [
    { "@type": "Thing", name: "Virtual power plant" },
    { "@type": "Thing", name: "Home battery" },
    { "@type": "Thing", name: "VPP incentive Australia" },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VirtualPowerPlantAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
            <span>/</span>
            <Link href="/apollo-energy-group" className="transition-colors hover:text-[#10251b]">Home batteries</Link>
            <span>/</span>
            <span className="text-[#10251b]">Virtual power plant</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Virtual power plant (VPP) in Australia: how the payments work, and is it worth it
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#3d4b44] sm:text-lg">
              A virtual power plant links thousands of home batteries so they can act like one power station, sending a
              share of your stored energy to the grid at peak times in exchange for a payment. Industry estimates put the
              return at roughly $200 to $1,500 a year, which for most homes means a few hundred dollars on top of what the
              battery already saves. In NSW there is also an upfront VPP incentive worth up to about $1,100. Here is how
              VPPs pay, what you give up, and how to decide.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Indicative only, updated {UPDATED}.</span> VPP payments vary by
            battery, state, wholesale market and program, and terms change. Figures here are illustrative; confirm current
            rates and warranty cover with the provider and your installer. Nothing here is financial advice. This page
            contains a disclosed commercial referral arrangement with Apollo Energy Group.
          </div>

          {/* What a VPP is */}
          <section className="mt-9">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">What a VPP actually is</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                A virtual power plant, or VPP, is a network that coordinates thousands of home batteries, and sometimes
                solar, EV chargers and hot-water systems, so they can be dispatched together like a single large generator.
                When the grid needs support, at peak-demand times or when wholesale prices spike, the operator draws a
                share of your battery&apos;s stored energy and pays you for it, either as a bill credit or a direct payment.
              </p>
              <p>
                The rest of the time your battery works as normal, storing your solar and cutting your evening peak. The
                VPP is an additional income layer on top of the everyday savings, not a replacement for them.
              </p>
            </div>
          </section>

          {/* Payment models table (the citable asset) */}
          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">The three ways a VPP pays you</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Model</th>
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">How you are paid</th>
                    <th className="pb-3 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS.map((m) => (
                    <tr key={m.model} className="border-b border-[#eef1ec] align-top">
                      <td className="py-3 pr-4 font-semibold text-[#10251b]">{m.model}</td>
                      <td className="py-3 pr-4 text-[#3d4b44]">{m.paid}</td>
                      <td className="py-3 text-[#6e7b74]">{m.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
              Brands are named to illustrate each model, not as a ranking. What any provider pays changes with the market,
              so compare current offers before you commit.
            </p>
          </section>

          {/* First CTA */}
          <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              A VPP needs a battery first. Apollo Energy Group sizes a system from your usage, applies the federal rebate,
              and can connect an eligible battery to a VPP. Refer Labs readers get $500 off the quote.
            </p>
            <a
              href={APOLLO_ENERGY_LEAD_HREF}
              data-cta="vpp-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Claim your $500 discount <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Earnings reality */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">What you can realistically earn</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                Industry estimates put typical residential VPP returns at roughly $200 to $1,500 a year. The spread is
                wide because it depends on your battery size, how volatile wholesale prices are in your state, and the
                program. For most homes the ongoing payment is modest, a few hundred dollars a year, and it sits on top of
                the savings the battery already delivers by shifting your own usage out of expensive peak periods.
              </p>
              <p>
                Wholesale-exposure plans can reach the higher end when the market is volatile, but that same volatility
                cuts both ways, so they suit engaged owners who want to optimise rather than set-and-forget. If you are in
                NSW, the upfront incentive can matter more than the ongoing payments: see how it stacks with the federal
                rebate in our{" "}
                <Link href="/nsw-home-battery-rebate-2026" className="nw-link">NSW home battery rebate guide</Link> and how
                the picture differs by state in the{" "}
                <Link href="/home-battery-rebate-by-state-australia" className="nw-link">rebate by state</Link> guide.
              </p>
            </div>
          </section>

          {/* Trade-offs */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">What you give up</h2>
            <div className="mt-5 space-y-4">
              {TRADEOFFS.map((t) => (
                <div key={t.h} className="nw-card px-5 py-5">
                  <h3 className="text-lg font-bold text-[#10251b]">{t.h}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">{t.p}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Second CTA */}
          <section className="mt-11 rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
            <h2 className="text-lg font-bold text-[#10251b]">Get a VPP-ready battery, sized to your home</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              Apollo Energy Group is a Sydney-based, SAA-accredited installer that sizes a system from your real usage,
              applies the federal rebate at the point of sale, and can set you up for a VPP where it stacks. Refer Labs
              readers get an exclusive $500 off. Prefer a callback first? Register your interest and someone gets in touch
              within 2 business days.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={APOLLO_ENERGY_LEAD_HREF}
                data-cta="vpp-footer"
                className="nw-btn"
              >
                Claim your $500 discount <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/apollo-energy-group" className="nw-btn-ghost" data-cta="vpp-eoi">
                Register your interest
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">Frequently asked questions</h2>
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
          <section className="mt-11">
            <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li><Link href="/home-battery-rebate-by-state-australia" className="nw-link">Home battery rebate by state, 2026</Link></li>
              <li><Link href="/nsw-home-battery-rebate-2026" className="nw-link">NSW home battery rebate and VPP incentive</Link></li>
              <li><Link href="/home-battery-rebate-australia" className="nw-link">The federal home battery rebate, in full</Link></li>
              <li><Link href="/is-a-home-battery-worth-it-australia" className="nw-link">Is a home battery worth it in Australia?</Link></li>
              <li><Link href="/home-battery-payback-calculator" className="nw-link">Home battery payback calculator</Link></li>
              <li><Link href="/apollo-energy-group" className="nw-link">Apollo Energy Group: review and the $500 discount</Link></li>
            </ul>
          </section>

          {/* Disclosure */}
          <section className="border-t border-[#e5e9e7] pt-6 pb-16">
            <p className="text-xs leading-relaxed text-[#9aa39c]">
              Published by Refer Labs, an independent comparison publisher, and contains a disclosed affiliate link to
              Apollo Energy Group, which means we may earn a commission if you enquire or buy through our link, at no extra
              cost to you. Commissions never change what we write. VPP payments and incentives are indicative, vary by
              provider, battery, state and market, and change over time; confirm current rates and warranty cover with the
              provider and your installer. This page is general information, not financial advice.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={APOLLO_ENERGY_LEAD_HREF} sponsored={false} product="Apollo Energy home battery" label="Claim $500 off" />
    </ConsumerShell>
  );
}
