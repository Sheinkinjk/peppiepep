import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { PIPEDRIVE_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, PIPEDRIVE, HUBSPOT } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.pipedriveVsHubspot);

/**
 * Revenue line: a small sales team choosing a CRM ("pipedrive vs hubspot").
 * Decision: a paid pipeline CRM, or HubSpot's free tier and per-seat upgrades.
 * Monetisation: Pipedrive affiliate click (14-day trial). HubSpot is not a
 * partner.
 *
 * Owned fact: both quote AUD to an Australian visitor (ranking snippets quote
 * USD), HubSpot is free for up to 2 users while Pipedrive has no free plan, and
 * HubSpot's Professional tier carries a required one-time onboarding fee while
 * Pipedrive says implementation is free on plans over $400 a year. HubSpot's
 * figures cited are the standard (struck-through) prices; a limited-time
 * new-customer discount was showing beside them on 4 Oct 2026.
 */

const SLUG = "/pipedrive-vs-hubspot";
const seo = seoConfig.pipedriveVsHubspot;

const providers: PairProvider[] = [
  {
    name: "Pipedrive",
    logo: "/logos/pipedrive.png",
    bestIf: "A paid, pipeline-first CRM priced per seat in Australian dollars.",
    points: [
      "Four plans from Lite to Ultimate, billed monthly or annually",
      "Email sync, automations and sequences from the Growth plan",
      "Add-ons for lead capture, campaigns, projects and documents",
    ],
    href: PIPEDRIVE_URL,
    cta: "Continue to Pipedrive",
    loc: "pvh-hero-pipedrive",
  },
  {
    name: "HubSpot",
    bestIf: "A free CRM for up to two users, with paid hubs for sales, marketing and service.",
    points: [
      "Free tools across marketing, sales and service",
      "Starter, Professional and Enterprise priced per seat in AUD",
      "Required onboarding fee on Professional and Enterprise",
    ],
    href: SRC.hubspotCrm,
    cta: "See HubSpot's plans",
    loc: "pvh-hero-hubspot",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from HubSpot; this link opens HubSpot's own pricing page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "How many users does HubSpot's free CRM allow?",
    a: `Two. HubSpot's pricing page lists its free tools at A$0 a month, "Free for up to 2 users. No credit card required." Free marketing email is limited to 2,000 sends a calendar month with HubSpot branding (hubspot.com/pricing, read ${READ_ON}).`,
  },
  {
    q: "Does Pipedrive have a free plan?",
    a: `No. Pipedrive offers a 14-day free trial with no credit card required, then paid plans from ${PIPEDRIVE.lite} per seat a month billed annually, or AU$34 billed monthly (pipedrive.com/en/pricing, read ${READ_ON}).`,
  },
  {
    q: "Does Pipedrive charge in Australian dollars?",
    a: `Its pricing page shows Australian visitors AU$ figures: Lite ${PIPEDRIVE.lite}, Growth ${PIPEDRIVE.growth}, Premium ${PIPEDRIVE.premium} and Ultimate ${PIPEDRIVE.ultimate} per seat a month billed annually (read ${READ_ON}). The page notes its prices exclude VAT for EU customers and does not say how GST is handled.`,
  },
  {
    q: "Does HubSpot charge an onboarding fee?",
    a: `On Professional and Enterprise, yes. HubSpot's Sales Hub page says the cost shown does not include a required one-time Professional Onboarding fee of ${HUBSPOT.salesProOnboarding}, or A$5,040 for Enterprise (read ${READ_ON}). Its free and Starter tiers list no onboarding fee.`,
  },
  {
    q: "Is Pipedrive a Refer Labs partner?",
    a: "Yes. Pipedrive is a Refer Labs affiliate partner, so a sign-up through these links earns a commission. HubSpot is not, and its link carries no tracking.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Sales & CRM", item: `${SITE_URL}/compare/ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "Pipedrive vs HubSpot", item: `${SITE_URL}${SLUG}` },
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
  name: seo.title,
  description: seo.description,
  url: seo.url,
  inLanguage: "en-AU",
  datePublished: READ_ON_ISO,
  dateModified: READ_ON_ISO,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pipedrive vs HubSpot",
  description: "Pipedrive and HubSpot compared on Australian-dollar seat prices, free tiers and onboarding fees.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Pipedrive", url: `${SITE_URL}/pipedrive` },
    { "@type": "ListItem", position: 2, name: "HubSpot", url: SRC.hubspotCrm },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "Pipedrive vs HubSpot in Australia: AUD seats and the free CRM",
  description: seo.description,
  url: seo.url,
  datePublished: READ_ON_ISO,
  dateModified: READ_ON_ISO,
});

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/compare/ai-sales-tools" className="transition-colors hover:text-[#14120f]">Sales &amp; CRM</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Pipedrive vs HubSpot</span>
        </nav>

        <p className="nw-kicker mt-8">CRM · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Pipedrive vs HubSpot in Australia: AUD seats and the free CRM
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          HubSpot&apos;s CRM is free for up to {HUBSPOT.freeUsers} users with no credit card, and Pipedrive has no free plan
          at all. Past that, both quote Australian dollars per seat. Pipedrive runs from {PIPEDRIVE.lite} (Lite) to{" "}
          {PIPEDRIVE.ultimate} (Ultimate) a month billed annually, or AU$34 to AU$139 billed monthly, after a 14-day trial
          (pipedrive.com/en/pricing, read {READ_ON}). HubSpot&apos;s Starter seat lists at {HUBSPOT.starterStanding} a month
          as its standard price, with a limited-time new-customer price showing beside it, and its Professional tier adds a
          required one-time onboarding fee of {HUBSPOT.salesProOnboarding} on Sales Hub (hubspot.com/pricing, read {READ_ON}).
          Pipedrive says implementation is free on any plan over $400 a year. Neither page says whether GST is included.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["Pipedrive"]}
            notWholeMarket="HubSpot is not a Refer Labs partner. Plenty of other CRMs are sold in Australia; this page sets these two side by side."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Is HubSpot CRM really free?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            For one or two people, yes. The free tier bundles HubSpot&apos;s free marketing, sales, service, content and data
            tools, with HubSpot branding on email and live chat and a cap of 2,000 marketing email sends a month. The third user is
            where the free tier ends, and from there a Starter seat at {HUBSPOT.starterStanding} a month standard (read {READ_ON}) is the
            next step, with {HUBSPOT.marketingStarterContacts} marketing contacts included on Marketing Hub Starter.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Pipedrive never had a free tier to grow out of. Its argument is a pipeline-first layout and a published price
            ladder with no onboarding fee: Growth ({PIPEDRIVE.growth}) adds full email sync, automations and sequences, and
            Premium ({PIPEDRIVE.premium}) adds lead routing, scoring and e-signatures, all per seat a month billed annually
            (read {READ_ON}).
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each vendor's own pricing page on ${READ_ON}, as shown to an Australian visitor. Neither states a GST basis. HubSpot figures are its standard prices; a limited-time discount was also showing.`}
            columns={["Pipedrive", "HubSpot"]}
            rows={[
              { label: "Currency shown", cells: ["AU$", "AUD (A$)"] },
              { label: "Free plan", cells: ["None; 14-day trial, no card", `A$0 for up to ${HUBSPOT.freeUsers} users, no card`] },
              {
                label: "Entry seat",
                cells: [`Lite ${PIPEDRIVE.lite}/seat/month billed annually; AU$34 billed monthly`, `Starter ${HUBSPOT.starterStanding}/seat/month standard`],
              },
              {
                label: "Higher tiers",
                cells: [
                  `Growth ${PIPEDRIVE.growth}, Premium ${PIPEDRIVE.premium}, Ultimate ${PIPEDRIVE.ultimate} billed annually; AU$69, AU$109, AU$139 billed monthly`,
                  `Sales Hub Professional ${HUBSPOT.salesProStanding}/seat/month standard; Enterprise from A$240/seat/month`,
                ],
              },
              {
                label: "Onboarding",
                cells: ["Implementation free on plans over $400 a year (Pipedrive FAQ)", `Required one-time fee: ${HUBSPOT.salesProOnboarding} Sales Professional, A$5,040 Sales Enterprise`],
              },
              { label: "Email marketing", cells: ["Campaigns add-on from A$13.33", "Free: 2,000 sends/month with branding; more on paid Marketing Hub"] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "Pipedrive",
              items: [
                "Your team has three or more salespeople, past the point where HubSpot's free tier stops.",
                "You want a fixed per-seat price with no onboarding fee on top.",
                "Deals moving through a visual pipeline is the core of how you sell.",
              ],
            },
            {
              name: "HubSpot",
              items: [
                "One or two people will use the CRM, so the free tier costs nothing.",
                "Marketing email, live chat and service tickets belong in the same platform as sales.",
                "You already use HubSpot's free tools and want to keep the same data.",
              ],
            },
          ]}
        />

        <PairFaqs heading="Pipedrive and HubSpot: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Open either and check today&apos;s seat price</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            HubSpot runs time-limited new-customer pricing and Pipedrive changes plan features regularly. The prices above
            were read on {READ_ON}.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "Pipedrive pricing and FAQ", url: SRC.pipedrivePricing },
            { label: "HubSpot CRM pricing", url: SRC.hubspotCrm },
            { label: "HubSpot Sales Hub pricing", url: SRC.hubspotSales },
            { label: "HubSpot Marketing Hub pricing", url: SRC.hubspotMarketing },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/pipedrive" className="nw-link">Pipedrive review</Link>
          <Link href="/gohighlevel-vs-hubspot" className="nw-link">GoHighLevel vs HubSpot</Link>
          <Link href="/best-crm-small-business-australia" className="nw-link">CRMs for small business compared</Link>
          <Link href="/compare/ai-sales-tools" className="nw-link">Sales and CRM tools</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["Pipedrive"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
