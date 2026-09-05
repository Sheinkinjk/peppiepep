import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import { ECOFLOW_URL, ANKER_SOLIX_URL, APOLLO_ENERGY_LEAD_HREF } from "@/lib/affiliate-links";
import { STATIONS, fmtAud, PRICES_READ_ON } from "@/lib/portable-power";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.portableVsInstalledBattery);

const SLUG = "/portable-vs-installed-home-battery-australia";
const UPDATED = "2026-08-24";

/**
 * The page where the commercial conflict lives, so it is the page that states it
 * plainly.
 *
 * Refer Labs earns from Apollo Energy Group on installed batteries and from
 * EcoFlow and Anker SOLIX on portable ones. Both of those brands also sell
 * installed whole-home systems that compete with Apollo directly. A comparison
 * page written by someone paid by all three sides is worth nothing unless it
 * says so, so it says so, up front and again beside the CTAs.
 *
 * The separation that makes it honest is a real one rather than a convenience:
 * the federal rebate applies to installed systems and not to an appliance you
 * plug in, and no arrangement between us and a brand changes that.
 */

const cheapest1k = STATIONS.filter((s) => Math.abs(s.wh - 1024) < 40).sort((a, b) => a.aud - b.aud)[0];

const ROWS: { label: string; portable: string; installed: string }[] = [
  { label: "Typical spend", portable: `${fmtAud(299)} entry, ${fmtAud(cheapest1k.aud)} for 1,024Wh, up to ${fmtAud(7299)}`, installed: "About $7,000 to $14,000 before the federal rebate for a 10-13kWh system, roughly $4,000 to $13,000 after it" },
  { label: "Who can buy one", portable: "Anyone, including renters and apartments", installed: "Owners with a suitable switchboard and space" },
  { label: "Installation", portable: "None. It plugs into a power point", installed: "Accredited installer, switchboard work, approval" },
  { label: "Federal rebate", portable: "Not eligible", installed: "Eligible under the Cheaper Home Batteries program" },
  { label: "What it powers", portable: "Appliances you plug into it", installed: "Nominated circuits, automatically" },
  { label: "In a blackout", portable: "Manual. You plug things in", installed: "Automatic changeover, if specified for backup" },
  { label: "Recharges from", portable: "A wall socket, or portable solar", installed: "Rooftop solar, and the grid" },
  { label: "Cuts your power bill", portable: "Essentially no", installed: "Yes, by storing cheap or solar energy" },
  { label: "Moves with you", portable: "Yes", installed: "No" },
];

const faqs = [
  {
    q: "Is a portable power station a substitute for a home battery?",
    a: `No. They solve different problems, an order of magnitude apart in price. A portable unit at ${fmtAud(cheapest1k.aud)} for 1,024Wh carries a fridge, a router and devices through an outage and needs no electrician. An installed battery costs eight to fifteen times that, runs nominated circuits automatically, charges from your rooftop solar, cuts your bill year-round and qualifies for the federal rebate. If the goal is surviving a blackout, portable is often enough. If the goal is lower bills, portable does essentially nothing.`,
  },
  {
    q: "Which one qualifies for the federal battery rebate?",
    a: "Only the installed system. The Cheaper Home Batteries program applies to systems fitted by an accredited installer, not to a plug-in appliance. That single rule moves the arithmetic more than any brand difference, so if the rebate is central to your decision the comparison is really between installed systems, not between these two categories.",
  },
  {
    q: "I rent. What are my options?",
    a: "A portable power station, realistically. An installed battery needs switchboard work, owner consent and an accredited installer, and it stays with the building when you leave. A portable unit needs none of that and moves with you. That is the main reason the category exists for Australian renters and apartment residents.",
  },
  {
    q: "Do EcoFlow and Anker SOLIX sell installed systems too?",
    a: "Yes. EcoFlow sells the OCEAN 2 and PowerOcean range and Anker SOLIX sells the X1 through its own installer partners, and both compete directly with the installers we work with. We earn from EcoFlow, from Anker SOLIX and from Apollo Energy Group, so on installed systems we are paid whichever way you go. We have not compared those systems against each other here, because we do not have the same first-hand basis for it that we have on published portable pricing.",
  },
  {
    q: "How is this page paid for?",
    a: "Every commercial link on it earns us something: EcoFlow and Anker SOLIX pay on purchases, Apollo pays on quote enquiries. Refer Labs is paid by all three, and no arrangement between us and a brand changes the rebate rule or the prices each brand publishes, which is what this comparison is built on.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Solar & energy", item: `${SITE_URL}/solar-and-energy` },
    { "@type": "ListItem", position: 3, name: "Portable vs installed", item: `${SITE_URL}${SLUG}` },
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
  name: seoConfig.portableVsInstalledBattery.title,
  description: seoConfig.portableVsInstalledBattery.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const articleSchema = comparisonArticleSchema({
  headline: "Portable power station vs installed home battery in Australia",
  description: seoConfig.portableVsInstalledBattery.description,
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
          <span className="text-[#2b362f]">Portable vs installed</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Portable power station or installed home battery: <span className="text-[#0a7c42]">which do you need?</span>
        </h1>

        {/* Above the first affiliate link, not below it. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          They answer different questions. A portable unit, {fmtAud(299)} for a small one
          and <strong>{fmtAud(cheapest1k.aud)}</strong> for one that will hold a fridge, gets you through a blackout with
          no electrician and moves house with you, but it will not lower your power bill. An installed battery costs
          several thousand, runs your circuits
          automatically, charges from rooftop solar, cuts your bill and{" "}
          <strong>qualifies for the federal rebate, which the portable one does not</strong>. If you rent, only one of
          these is available to you at all.
        </p>

        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        {/* The conflict, up front rather than buried at the bottom. */}
        <div className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
          <strong className="font-semibold text-[#10251b]">We are paid on both sides of this page.</strong> EcoFlow and
          Anker SOLIX pay us on purchases; Apollo Energy Group pays us on quote enquiries. The comparison below rests on two things you
          can check without us: the rebate rule, and each brand&apos;s own published prices.
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The two, side by side</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e9e7] bg-[#f8faf9] text-[#6e7b74]">
                  <th className="px-4 py-3 font-semibold"> </th>
                  <th className="px-4 py-3 font-semibold">Portable power station</th>
                  <th className="px-4 py-3 font-semibold">Installed home battery</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-[#eef1ef] last:border-0 align-top">
                    <td className="px-4 py-3 font-semibold text-[#10251b]">{r.label}</td>
                    <td className="px-4 py-3 text-[#3d4b44]">{r.portable}</td>
                    <td className="px-4 py-3 text-[#3d4b44]">{r.installed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#6e7b74]">
            Portable prices read off EcoFlow&apos;s and Anker SOLIX&apos;s own Australian stores on {PRICES_READ_ON}.
            Installed pricing varies by system size, switchboard and site, which is why it is a range rather than a
            figure: a quote is the only accurate number.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Choose portable if</h2>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
            <li>You rent, or live in an apartment, and cannot have anything installed.</li>
            <li>The goal is getting through outages rather than lowering a bill.</li>
            <li>You want it for camping or a caravan as well as the house.</li>
            <li>You would rather spend hundreds than thousands, and accept doing it manually.</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={ECOFLOW_URL} {...aff} data-cta="pvi-ecoflow" className="nw-btn">
              See EcoFlow prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={ANKER_SOLIX_URL} {...aff} data-cta="pvi-anker" className="nw-btn">
              See Anker SOLIX prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-3 text-[13px] text-[#6e7b74]">Both are affiliate links; we earn from either.</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Choose an installed battery if</h2>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
            <li>You own the home and want the power bill down, not just the lights on.</li>
            <li>You have rooftop solar, or are adding it, and want to store what it makes.</li>
            <li>You want the changeover to happen without you doing anything.</li>
            <li>You want the federal rebate, which a portable unit cannot claim.</li>
          </ul>
          <div className="mt-5">
            <Link href={APOLLO_ENERGY_LEAD_HREF} data-cta="pvi-apollo" className="nw-btn">
              Get an Apollo quote, $500 off <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#6e7b74]">
            Apollo Energy Group is the installer we work with, and they pay us on enquiries. EcoFlow and Anker SOLIX
            also sell installed systems, the OCEAN 2 range and the SOLIX X1, and we earn from them too. We have not
            ranked those against Apollo here, because we do not have the same first-hand basis for it that we have on
            published portable pricing.
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
            <li><Link href="/portable-power-station-australia" className="font-semibold text-[#0a7c42] hover:underline">What portable units cost and run</Link></li>
            <li><Link href="/ecoflow-vs-anker-solix" className="font-semibold text-[#0a7c42] hover:underline">EcoFlow vs Anker SOLIX</Link></li>
            <li><Link href="/home-battery-rebate-australia" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">The federal rebate</Link></li>
            <li><Link href="/is-a-home-battery-worth-it-australia" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">Is a home battery worth it?</Link></li>
          </ul>
        </section>
      </main>
    </ConsumerShell>
  );
}
