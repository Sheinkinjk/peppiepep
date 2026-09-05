import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import PowerCtaPair from "@/components/energy/PowerCtaPair";
import { APOLLO_ENERGY_LEAD_HREF } from "@/lib/affiliate-links";
import { STATIONS, fmtAud } from "@/lib/portable-power";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.solarAndEnergy);

const SLUG = "/solar-and-energy";
const UPDATED = "2026-08-25";

/**
 * Category hub for Solar & Energy.
 *
 * The cluster had eighteen pages and no front door: the nav pointed at the
 * Apollo money page, so a reader who did not yet know they wanted a quote had
 * nowhere to land, and the internal equity all pooled on one commercial page
 * rather than flowing through a hub.
 *
 * Its job is routing, so it is organised by the decision the reader is making
 * rather than by page type. Both monetisation routes sit on it: an Apollo quote
 * for installed systems, and the two portable brands for people who cannot
 * install anything.
 */

const cheapestAny = [...STATIONS].sort((a, b) => a.aud - b.aud)[0];

const GROUPS: {
  heading: string;
  question: string;
  body: string;
  links: { href: string; label: string; desc: string }[];
}[] = [
  {
    heading: "Should I get a battery at all?",
    question: "Start here if you have solar, or a big evening bill, and are not sure a battery pays for itself",
    body:
      "A battery pays back on the gap between what you export for and what you buy at, so the answer turns on your own usage rather than on the brand. These work out whether the numbers stack up before anyone quotes you.",
    links: [
      { href: "/is-a-home-battery-worth-it-australia", label: "Is a home battery worth it?", desc: "When the numbers work, and the cases where they do not." },
      { href: "/home-battery-payback-calculator", label: "Payback calculator", desc: "Net cost, annual saving and payback from your own usage and tariff." },
      { href: "/home-battery-cost-australia", label: "What a battery costs", desc: "Installed price bands by size, before and after the rebate." },
      { href: "/what-size-home-battery-do-i-need-australia", label: "What size do I need?", desc: "Sizing from evening use rather than from roof size." },
    ],
  },
  {
    heading: "What the rebates pay",
    question: "Start here if you want to know what you will actually be charged after incentives",
    body:
      "The federal Cheaper Home Batteries discount is applied at the point of sale by the installer, and some states add their own on top. It tapers above 14kWh, which is why most quotes land near that mark.",
    links: [
      { href: "/home-battery-rebate-australia", label: "The 2026 federal rebate", desc: "What it pays, how the taper works, and who applies it." },
      { href: "/home-battery-rebate-by-state-australia", label: "Rebates by state", desc: "Which states still add an incentive in 2026, and which stopped." },
      { href: "/nsw-home-battery-rebate-2026", label: "NSW in 2026", desc: "The federal discount and the NSW VPP incentive on one battery." },
      { href: "/virtual-power-plant-australia", label: "Virtual power plants", desc: "What a VPP pays, and what you give up on control and warranty." },
    ],
  },
  {
    heading: "Choosing a battery and an installer",
    question: "Start here if you have decided to install and are comparing quotes",
    body:
      "The installer decides more about the outcome than the badge on the battery does: accreditation, the warranty that is actually honoured, and whether backup was specified at all.",
    links: [
      { href: "/apollo-energy-group", label: "Apollo Energy Group", desc: "The installer we work with, and $500 off your quote through our link." },
      { href: "/best-home-battery-australia", label: "How to choose a battery", desc: "Capacity, chemistry, warranty, backup and VPP-readiness." },
      { href: "/tesla-powerwall-alternatives-australia", label: "Powerwall alternatives", desc: "Weighing the alternatives on capacity, backup and after-rebate cost." },
      { href: "/apollo-energy-review", label: "Apollo, reviewed", desc: "Accreditation, warranty and what to check before signing." },
    ],
  },
  {
    heading: "Solar, blackouts and backup",
    question: "Start here if the reason you are looking is an outage, not a bill",
    body:
      "A battery only carries you through a blackout if backup hardware was specified, which is a separate line on the quote. If you rent, none of the installed options are open to you and a portable unit is the realistic answer.",
    links: [
      { href: "/home-battery-blackout-backup-australia", label: "Blackout backup", desc: "Why many batteries shut off with the grid, and what to specify." },
      { href: "/solar-and-battery-package-australia", label: "Solar and battery together", desc: "Sizing panels and storage as one system, and what each rebate covers." },
      { href: "/portable-vs-installed-home-battery-australia", label: "Portable vs installed", desc: "Which one the rebate applies to, and which suits renters." },
      { href: "/home-battery-installer-nsw", label: "Choosing a NSW installer", desc: "Accreditation, licensing and the questions worth asking." },
    ],
  },
];

const faqs = [
  {
    q: "What does Refer Labs cover under solar and energy?",
    a: "Home battery storage, the federal and state rebates that apply to it, choosing an installer, and portable power stations for people who cannot install a fixed system. We do not compare electricity retailers or rank solar panel brands, because we hold no commercial relationship in either and would be repeating other people's research.",
  },
  {
    q: "What does a home battery cost in Australia?",
    a: "Installed prices are commonly quoted around $600 to $1,300 per usable kWh before rebates, with larger systems costing less per kWh. After the federal Cheaper Home Batteries discount, industry examples put a common household system in a broad band from about $4,000 to $13,000 installed. The spread is wide enough that a quote for your own home is the only figure worth acting on.",
  },
  {
    q: "I rent. Is there anything here for me?",
    a: `Yes, one route. An installed battery needs owner consent, switchboard work and an accredited installer, so it is not available to renters. A portable power station starts at ${fmtAud(cheapestAny.aud)}, plugs into a normal outlet, needs no approval and moves with you when you do. It will carry a fridge and devices through an outage, though it will not lower your power bill.`,
  },
  {
    q: "How does Refer Labs make money on these pages?",
    a: "Apollo Energy Group pays us when a reader enquires for a quote, and EcoFlow and Anker SOLIX pay us on purchases through our links. Nothing on these pages is a paid placement, and the rebate rules and published prices the comparisons rest on are checkable without us. Every page carries its own disclosure.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Solar & energy", item: `${SITE_URL}${SLUG}` },
  ],
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Solar and energy guides for Australians",
  itemListElement: GROUPS.flatMap((g) => g.links).map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: l.label,
    url: `${SITE_URL}${l.href}`,
  })),
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: seoConfig.solarAndEnergy.title,
  description: seoConfig.solarAndEnergy.description,
  url: seoConfig.solarAndEnergy.url,
  inLanguage: "en-AU",
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8">
        <h1 className="mt-2 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-[2.6rem]">
          Solar &amp; energy: <span className="text-[#0a7c42]">what to decide, in the order it matters</span>
        </h1>

        {/* The answer, first. */}
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#2b362f]">
          Three decisions sit behind almost every energy question we get asked, and they come in order:{" "}
          <strong>does a battery pay back on your usage</strong>, <strong>what the rebates leave you paying</strong>,
          and <strong>who installs it</strong>. If you rent or live in an apartment, none of those are open to you and
          the answer is a portable unit from {fmtAud(cheapestAny.aud)} instead. Everything below is grouped by which of
          those you are on.
        </p>

        {/* Below the lead. The first paragraph after the h1 is the answer;
            a disclosure in that slot is what an engine lifts instead. Still
            above the first affiliate link, which is what it is for. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[15px] font-bold text-[#10251b]">If you own the home</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              An installed battery cuts your bill year-round and is the only option the federal rebate applies to.
              Apollo Energy Group sizes it from your real usage, and our readers get $500 off the quote.
            </p>
            <Link
              href={APOLLO_ENERGY_LEAD_HREF}
              data-cta="solar-hub-apollo"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0a7c42] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#086536]"
            >
              Get an Apollo quote, $500 off <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-2 text-[12px] text-[#9aa39c]">Apollo pays us when you enquire. The $500 is yours either way.</p>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[15px] font-bold text-[#10251b]">If you rent, or cannot install</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              A portable power station needs no electrician, no roof and no landlord conversation. It will hold a fridge
              and devices through an outage, and it moves house with you.
            </p>
            <PowerCtaPair location="solar-hub" className="mt-5" />
          </div>
        </div>

        {GROUPS.map((g) => (
          <section key={g.heading} className="mt-12">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">{g.heading}</h2>
            <p className="mt-1.5 text-[14px] font-medium text-[#6e7b74]">{g.question}</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">{g.body}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {g.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group rounded-2xl border border-[#e5e9e7] bg-white p-5 transition-colors hover:border-[#0a7c42]"
                >
                  <p className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{l.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{l.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Portable power, priced per watt-hour</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">
            The two ranges we hold links for are EcoFlow and Anker SOLIX, and their Australian prices are set out
            together so different capacities can be compared on one number.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { href: "/portable-power-station-australia", label: "What they cost and run", desc: "Prices, runtimes and who each size suits." },
              { href: "/ecoflow-vs-anker-solix", label: "EcoFlow vs Anker SOLIX", desc: "Both ranges at matching capacities." },
              { href: "/ecoflow", label: "EcoFlow Australia", desc: "The range from A$299 to A$7,299." },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group rounded-2xl border border-[#e5e9e7] bg-white p-5 transition-colors hover:border-[#0a7c42]"
              >
                <p className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{l.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{l.desc}</p>
              </Link>
            ))}
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
      </main>
    </ConsumerShell>
  );
}
