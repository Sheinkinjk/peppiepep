import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { GOHIGHLEVEL_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, GHL, HUBSPOT } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.gohighlevelVsHubspot);

/**
 * Revenue line: an agency or small business weighing an all-in-one platform
 * ("gohighlevel vs hubspot"). Decision: one flat agency fee plus usage, or
 * per-seat hubs. Monetisation: GoHighLevel affiliate click (14-day trial).
 * HubSpot is not a partner.
 *
 * Owned fact: GoHighLevel's pricing page prints $97/$297/$497 with no currency,
 * and its own pricing guide states "All prices are in USD" in the AI section and
 * bills email ($0.675 per 1,000) and phone (Twilio rates) from a prepaid wallet;
 * HubSpot quotes AUD per seat and is free for two users. The guide does not state
 * the currency of the plan fees themselves, so the page does not either.
 */

const SLUG = "/gohighlevel-vs-hubspot";
const seo = seoConfig.gohighlevelVsHubspot;

const providers: PairProvider[] = [
  {
    name: "GoHighLevel",
    logo: "/logos/gohighlevel.png",
    bestIf: "One flat monthly platform fee for an agency running client accounts.",
    points: [
      "Unlimited contacts and users on every plan",
      "CRM, funnels, websites, email, SMS, calendars and reviews in one tool",
      "Email, phone and AI usage billed on top from a wallet",
    ],
    href: GOHIGHLEVEL_URL,
    cta: "Continue to GoHighLevel",
    loc: "gvh-hero-ghl",
  },
  {
    name: "HubSpot",
    bestIf: "Per-seat sales, marketing and service hubs for one business, priced in AUD.",
    points: [
      "Free for up to two users",
      "Starter, Professional and Enterprise tiers per hub",
      "HubSpot Credits included by tier for AI and data features",
    ],
    href: SRC.hubspotCrm,
    cta: "See HubSpot's plans",
    loc: "gvh-hero-hubspot",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from HubSpot; this link opens HubSpot's own pricing page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "What currency does GoHighLevel charge in?",
    a: `Its pricing page does not say. It prints Starter at ${GHL.starter}, Unlimited at ${GHL.unlimited} and Agency Pro at ${GHL.agencyPro} a month with no currency named (gohighlevel.com/pricing, read ${READ_ON}). HighLevel's own pricing guide, in its AI pricing section, states "All prices are in USD", and does not restate the currency for the plan fees. Confirm at checkout before comparing it with an AUD price.`,
  },
  {
    q: "Does GoHighLevel charge for email and SMS on top of the plan?",
    a: `Yes. Its pricing page marks email and SMS marketing, calling and several AI features as usage-based. HighLevel's pricing guide says usage is paid from a prepaid Agency Wallet, email costs ${GHL.emailPer1000} per 1,000 emails on every plan, and phone and messaging cost the same as Twilio's rates, which vary by region (help.gohighlevel.com, read ${READ_ON}).`,
  },
  {
    q: "Is HubSpot free for a small team?",
    a: `For up to ${HUBSPOT.freeUsers} users. HubSpot lists its free tools at A$0 a month with no credit card. A third user means a paid seat, with Starter at ${HUBSPOT.starterStanding} a seat a month as the standard price (hubspot.com/pricing, read ${READ_ON}).`,
  },
  {
    q: "Is there a contract with GoHighLevel?",
    a: `No long-term contract, according to its FAQ: HighLevel runs month to month and you can upgrade, downgrade or cancel from the dashboard. It offers a ${GHL.trialDays}-day free trial on each plan (read ${READ_ON}).`,
  },
  {
    q: "Does Refer Labs make money from either?",
    a: "From GoHighLevel, yes: Refer Labs is paid a commission on accounts opened through its links here. From HubSpot, no; that link goes to HubSpot's pricing page with nothing attached.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Sales & CRM", item: `${SITE_URL}/compare/ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "GoHighLevel vs HubSpot", item: `${SITE_URL}${SLUG}` },
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
  name: "GoHighLevel vs HubSpot",
  description: "GoHighLevel and HubSpot compared on pricing model, currency, free tier and usage charges.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "GoHighLevel", url: `${SITE_URL}/gohighlevel` },
    { "@type": "ListItem", position: 2, name: "HubSpot", url: SRC.hubspotCrm },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "GoHighLevel vs HubSpot: flat agency fee or per-seat AUD pricing",
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
          <span className="text-[#14120f]">GoHighLevel vs HubSpot</span>
        </nav>

        <p className="nw-kicker mt-8">All-in-one marketing and CRM</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          GoHighLevel vs HubSpot: flat agency fee or per-seat pricing
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          GoHighLevel charges one monthly fee per account, {GHL.starter} (Starter, 3 sub-accounts), {GHL.unlimited} (Unlimited)
          or {GHL.agencyPro} (Agency Pro), with unlimited contacts and users, and its pricing page names no currency
          (gohighlevel.com/pricing, read {READ_ON}). Email, SMS, calls and AI are billed on top from a prepaid wallet:
          HighLevel&apos;s pricing guide puts email at {GHL.emailPer1000} per 1,000 sends and phone at Twilio&apos;s rates, and
          states its AI prices in USD. HubSpot prices each seat in Australian dollars, is free for up to{" "}
          {HUBSPOT.freeUsers} users, lists Starter at {HUBSPOT.starterStanding} a seat a month as its standard price, and adds
          a required one-time onboarding fee at Professional (hubspot.com/pricing, read {READ_ON}). GoHighLevel is built
          around agencies running client sub-accounts; HubSpot around one business&apos;s own sales, marketing and service
          teams.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["GoHighLevel"]}
            notWholeMarket="HubSpot pays Refer Labs nothing. Other all-in-one platforms exist; only these two are compared on this page."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Can GoHighLevel replace HubSpot?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            For an agency, often. GoHighLevel&apos;s own FAQ says most users replace their CRM, funnel builder, email
            marketing software, appointment scheduler, SMS tool and review management with it, and its Unlimited plan
            removes the cap on client sub-accounts. HubSpot&apos;s pricing pages are built around seats and, for marketing,
            contact tiers, and list no sub-account count.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            For a small business with one or two people in the CRM, the sums run the other way. HubSpot&apos;s free tier
            costs nothing at that size and bills in Australian dollars, while GoHighLevel starts at {GHL.starter} a month in
            an unnamed currency before any email or SMS usage (both read {READ_ON}).
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each vendor's own pages on ${READ_ON}. GoHighLevel prints no currency on its plan fees; HubSpot prints AUD. HubSpot figures are its standard prices; a limited-time discount was also showing.`}
            columns={["GoHighLevel", "HubSpot"]}
            rows={[
              { label: "Pricing model", cells: ["Flat monthly fee per account; unlimited users and contacts", "Per seat; Marketing Hub also by contact tier"] },
              { label: "Currency printed", cells: ['"$", none named; pricing guide gives AI prices in USD', "AUD (A$)"] },
              { label: "Free plan", cells: [`None; ${GHL.trialDays}-day free trial`, `A$0 for up to ${HUBSPOT.freeUsers} users`] },
              {
                label: "Plans",
                cells: [
                  `Starter ${GHL.starter}/month (3 sub-accounts); Unlimited ${GHL.unlimited}/month; Agency Pro ${GHL.agencyPro}/month (SaaS mode)`,
                  `Starter ${HUBSPOT.starterStanding}/seat/month standard; Sales Hub Professional ${HUBSPOT.salesProStanding}/seat/month standard`,
                ],
              },
              {
                label: "On top",
                cells: [
                  `Usage from a wallet: email ${GHL.emailPer1000} per 1,000; phone at Twilio rates; AI by usage`,
                  `One-time onboarding on Professional: ${HUBSPOT.salesProOnboarding} (Sales Hub)`,
                ],
              },
              { label: "Contract", cells: ["Month to month (GoHighLevel FAQ)", "Pay monthly or pay annually options shown"] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "GoHighLevel",
              items: [
                "You run an agency and want every client in its own sub-account under one bill.",
                "Funnels, websites, SMS, booking and reviews all need to live in the same tool as the CRM.",
                "Your team keeps growing and you would rather not pay per seat: every plan includes unlimited users.",
              ],
            },
            {
              name: "HubSpot",
              items: [
                "One or two people use the CRM, and HubSpot's free tier covers that at no cost.",
                "You want to be billed in Australian dollars at a known per-seat price.",
                "You are one business managing your own customers, with no client accounts to resell.",
              ],
            },
          ]}
        />

        <PairFaqs heading="GoHighLevel and HubSpot: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Start a trial or the free tier</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Both companies revise plans and usage rates. Figures here were read on {READ_ON}.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "GoHighLevel pricing and FAQ", url: SRC.ghlPricing },
            { label: "HighLevel pricing guide (help centre)", url: SRC.ghlGuide },
            { label: "HubSpot CRM pricing", url: SRC.hubspotCrm },
            { label: "HubSpot Sales Hub pricing", url: SRC.hubspotSales },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/gohighlevel" className="nw-link">GoHighLevel review</Link>
          <Link href="/pipedrive-vs-hubspot" className="nw-link">Pipedrive vs HubSpot</Link>
          <Link href="/compare/ai-sales-tools" className="nw-link">Sales and CRM tools</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["GoHighLevel"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
