import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.homeBatteryRebateByState);

const SLUG = "/home-battery-rebate-by-state-australia";
const UPDATED = "July 2026";

// ─── The data (the citable asset) ──────────────────────────────────────────────
// Federal figures reconciled against the Cheaper Home Batteries Program and Solar
// Choice / CHOICE (about $272/usable kWh gross, ~$252 after typical ~10% costs).
// State STATUS is consistent across independent sources; the two in-flux dollar
// figures (WA, NSW) are deliberately left as "confirm" rather than committing to a
// number the sources disagree on. Indicative only; verify current terms at quote.

interface StateRow {
  state: string;
  scheme: string;
  stacks: string;
  detail: string;
}

const STATES: StateRow[] = [
  {
    state: "New South Wales",
    scheme: "VPP incentive + Home Energy Saver",
    stacks: "Yes",
    detail:
      "NSW adds a Virtual Power Plant (VPP) incentive for connecting an eligible battery to an approved VPP, and in 2026 expanded support through the Home Energy Saver package (interest-free loans and targeted discounts for lower-income households). Both are designed to sit on top of the federal rebate. The VPP figure moves with energy certificate prices and the package is still rolling out, so confirm the current amount for your address and battery.",
  },
  {
    state: "Western Australia",
    scheme: "Residential Battery Scheme",
    stacks: "Yes",
    detail:
      "WA runs a state battery rebate on top of the federal discount, with the amount differing by network (Synergy in the south-west grid versus Horizon Power in regional WA), plus an interest-free loan option. Published figures vary between sources, so treat WA as an active state rebate and confirm the current amount for your network before you rely on it.",
  },
  {
    state: "Australian Capital Territory",
    scheme: "Sustainable Household Scheme",
    stacks: "Loan, not a cash rebate",
    detail:
      "The ACT does not pay a cash battery rebate, but its Sustainable Household Scheme offers an interest-free or low-interest loan (up to around $15,000) that can cover a battery. You still claim the federal rebate on the purchase; the ACT scheme helps you finance the balance.",
  },
  {
    state: "Victoria",
    scheme: "None active",
    stacks: "Federal only",
    detail:
      "Victoria's Solar Homes battery rebate and its interest-free loan have closed. Victorian households now access the federal Cheaper Home Batteries Program only, which still takes roughly 30% off an eligible battery.",
  },
  {
    state: "Queensland",
    scheme: "None active",
    stacks: "Federal only",
    detail:
      "Queensland has no dedicated state battery rebate in 2026. The federal program applies, and some Queensland retailers run their own VPP offers that can add value, which is worth asking an installer about.",
  },
  {
    state: "South Australia",
    scheme: "None active",
    stacks: "Federal only",
    detail:
      "South Australia's Home Battery Scheme, once the most generous in the country, closed in 2022. SA households now rely on the federal rebate, with retailer VPP offers as the main additional saving.",
  },
  {
    state: "Tasmania",
    scheme: "None active",
    stacks: "Federal only",
    detail:
      "Tasmania has no dedicated state battery rebate. The federal program applies; Tasmania's separate energy loan products have historically focused on other upgrades, so confirm what currently covers batteries.",
  },
  {
    state: "Northern Territory",
    scheme: "Home and Business Battery Scheme (closed)",
    stacks: "Federal only",
    detail:
      "The NT's Home and Business Battery Scheme reached its funding cap and has closed to new applications. NT households now access the federal rebate only.",
  },
];

const faqs = [
  {
    q: "Which Australian states have a home battery rebate in 2026?",
    a: "In 2026 the federal Cheaper Home Batteries Program is the main rebate in every state and territory, worth about $272 per usable kWh (around $252 after typical costs). On top of it, only Western Australia and New South Wales currently add a meaningful state battery incentive, and the ACT offers an interest-free loan rather than a cash rebate. Victoria, Queensland, South Australia, Tasmania and the Northern Territory no longer run their own dedicated battery rebate, so households there rely on the federal program. State schemes change often, so confirm current terms when you get a quote.",
  },
  {
    q: "How much is the federal home battery rebate?",
    a: "The federal Cheaper Home Batteries Program discounts roughly 30% of the upfront cost of an eligible battery. For May to December 2026 that works out at about $272 per usable kWh before costs, or around $252 after the typical 10% in certificate trading and admin costs. It applies to usable capacity up to 50kWh, tapers above 14kWh, and steps down every six months through to 2030. The exact figure moves with the small-scale certificate market, so treat it as a close guide, not a fixed number.",
  },
  {
    q: "Do state and federal battery rebates stack?",
    a: "Where a state incentive exists, it is generally designed to sit on top of the federal rebate rather than replace it. In Western Australia the state Residential Battery Scheme adds to the federal discount, and in NSW the VPP incentive and Home Energy Saver support are meant to stack. The ACT's scheme is a loan that helps finance the balance after the federal rebate. Always confirm stacking rules for your address, because eligibility and amounts change.",
  },
  {
    q: "Why did so many state battery rebates close?",
    a: "The federal Cheaper Home Batteries Program launched as a national scheme large enough that several states wound back or closed their own rebates rather than run two overlapping subsidies. South Australia's Home Battery Scheme closed in 2022, Victoria's Solar Homes battery rebate has closed, and the Northern Territory's scheme reached its funding cap. The practical effect for most households is one main rebate, the federal one, plus any retailer VPP offer.",
  },
  {
    q: "Does Refer Labs set these rebate amounts?",
    a: "No. Refer Labs is an independent comparison publisher. We consolidate what the federal and state programs currently offer and link out to services, including a disclosed affiliate link to Apollo Energy Group. We do not set rebate amounts, they are set by government programs and move with certificate markets and scheme rules, so confirm the current figure for your address at quote. Nothing here is financial advice.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Home Batteries", item: `${SITE_URL}/apollo-energy-group` },
    { "@type": "ListItem", position: 3, name: "Home Battery Rebate by State", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Australian home battery rebates by state, 2026",
  description:
    "State-by-state status of home battery rebates and incentives across Australia for 2026: the national federal Cheaper Home Batteries Program plus each state and territory's own scheme (active, loan-based, or closed).",
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  creator: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  dateModified: "2026-07-28",
  license: `${SITE_URL}/terms`,
  spatialCoverage: { "@type": "Place", name: "Australia" },
  variableMeasured: ["State-specific battery incentive", "Stacks with federal rebate", "Scheme status"],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.homeBatteryRebateByState.title,
  description: seoConfig.homeBatteryRebateByState.description,
  url: seoConfig.homeBatteryRebateByState.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-28",
  dateModified: "2026-07-28",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const stacksTone: Record<string, string> = {
  Yes: "bg-[#e8f5ee] text-[#0a7c42]",
  "Loan, not a cash rebate": "bg-[#fdf6e3] text-[#8a6d1a]",
  "Federal only": "bg-[#eef1ec] text-[#6e7b74]",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeBatteryRebateByStatePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
            <span>/</span>
            <Link href="/apollo-energy-group" className="transition-colors hover:text-[#10251b]">Home batteries</Link>
            <span>/</span>
            <span className="text-[#10251b]">Rebate by state</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Home battery rebate by state in Australia (2026)
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#3d4b44] sm:text-lg">
              The federal Cheaper Home Batteries Program is the main home battery rebate in every Australian state and
              territory, worth about $272 per usable kWh (around $252 after typical costs) and stepping down every six
              months. On top of it, only <strong className="font-semibold text-[#10251b]">Western Australia</strong> and{" "}
              <strong className="font-semibold text-[#10251b]">New South Wales</strong> currently add a meaningful state
              battery incentive, the <strong className="font-semibold text-[#10251b]">ACT</strong> offers an interest-free
              loan, and most other states no longer run their own battery rebate. Here is the full picture, state by state.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Indicative only, updated {UPDATED}.</span> Rebate amounts are set
            by government programs, move with certificate markets, and change often. State schemes open and close. Confirm
            the current figure for your address and battery when you get a quote. Nothing here is financial advice. This
            page contains a disclosed affiliate link to Apollo Energy Group.
          </div>

          {/* The by-state table (the asset) */}
          <section className="mt-9">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">
              Home battery rebates by state, at a glance
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">State / Territory</th>
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">State scheme (2026)</th>
                    <th className="pb-3 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">On top of federal?</th>
                  </tr>
                </thead>
                <tbody>
                  {STATES.map((s) => (
                    <tr key={s.state} className="border-b border-[#eef1ec] align-top">
                      <td className="py-3 pr-4 font-semibold text-[#10251b]">{s.state}</td>
                      <td className="py-3 pr-4 text-[#3d4b44]">{s.scheme}</td>
                      <td className="py-3">
                        <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${stacksTone[s.stacks] ?? "bg-[#eef1ec] text-[#6e7b74]"}`}>
                          {s.stacks}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
              The federal Cheaper Home Batteries Program applies in every row above. &ldquo;Federal only&rdquo; means the
              state has no active battery-specific rebate of its own in 2026. Amounts for active state schemes vary by
              network and household, so confirm at quote.
            </p>
          </section>

          {/* First CTA */}
          <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Whichever state you are in, the federal rebate is applied at the point of sale. Through Refer Labs, Apollo
              Energy Group takes an extra $500 off your quote on top of it, with no code to enter.
            </p>
            <a
              href={APOLLO_ENERGY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="bystate-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Claim your $500 discount <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Per-state detail */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">Every state and territory, in detail</h2>
            <div className="mt-5 space-y-5">
              {STATES.map((s) => (
                <div key={s.state} className="nw-card px-5 py-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-[#10251b]">{s.state}</h3>
                    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${stacksTone[s.stacks] ?? "bg-[#eef1ec] text-[#6e7b74]"}`}>
                      {s.scheme}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#3d4b44]">{s.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Federal explainer link (avoid duplicating the mechanics page) */}
          <section className="mt-11">
            <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">How the federal rebate works everywhere</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                The federal Cheaper Home Batteries Program is national, so it is the one constant no matter your postcode.
                It discounts about 30% of an eligible battery, works out at roughly $272 per usable kWh before costs (around
                $252 after the typical certificate and admin costs), and applies to usable capacity up to 50kWh. Above 14kWh
                the rate tapers, and the whole scheme steps down every six months through to 2030, so the value is highest
                the sooner you install.
              </p>
              <p>
                For the full mechanics, the 14kWh taper and worked examples by battery size, see our{" "}
                <Link href="/home-battery-rebate-australia" className="nw-link">federal home battery rebate guide</Link>,
                and to check whether a battery pays for itself after the rebate, try the{" "}
                <Link href="/home-battery-payback-calculator" className="nw-link">home battery payback calculator</Link>.
              </p>
            </div>
          </section>

          {/* Second CTA */}
          <section className="mt-10 rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
            <h2 className="text-lg font-bold text-[#10251b]">Get your rebate applied and $500 off the quote</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              Apollo Energy Group is a Sydney-based, SAA-accredited installer that applies the federal rebate at the point
              of sale and takes an exclusive $500 off for Refer Labs readers. Prefer a callback first? Register your
              interest and someone gets in touch within 2 business days.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={APOLLO_ENERGY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="bystate-footer"
                className="nw-btn"
              >
                Claim your $500 discount <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/apollo-energy-group" className="nw-btn-ghost" data-cta="bystate-eoi">
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
              <li><Link href="/home-battery-rebate-australia" className="nw-link">The federal home battery rebate, in full: rate, taper and examples</Link></li>
              <li><Link href="/nsw-home-battery-rebate-2026" className="nw-link">NSW home battery rebate 2026, explained</Link></li>
              <li><Link href="/virtual-power-plant-australia" className="nw-link">Virtual power plants (VPP): how the payments work</Link></li>
              <li><Link href="/home-battery-cost-australia" className="nw-link">What a home battery actually costs in Australia</Link></li>
              <li><Link href="/home-battery-payback-calculator" className="nw-link">Home battery payback calculator</Link></li>
              <li><Link href="/best-home-battery-australia" className="nw-link">Best home battery in Australia, compared</Link></li>
              <li><Link href="/apollo-energy-group" className="nw-link">Apollo Energy Group: review and the $500 discount</Link></li>
            </ul>
          </section>

          {/* Disclosure */}
          <section className="border-t border-[#e5e9e7] pt-6 pb-16">
            <p className="text-xs leading-relaxed text-[#9aa39c]">
              Published by Refer Labs, an independent comparison publisher, and contains a disclosed affiliate link to
              Apollo Energy Group, which means we may earn a commission if you enquire or buy through our link, at no extra
              cost to you. Commissions never change what we write. Rebate figures are indicative, set by government programs,
              and move with certificate markets and scheme rules; state schemes open and close, so confirm the current
              amount for your address and battery at quote. This page is general information, not financial advice.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={APOLLO_ENERGY_URL} product="Apollo Energy home battery" label="Claim $500 off" />
    </ConsumerShell>
  );
}
