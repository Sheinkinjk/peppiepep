import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { ankerSolixConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.ankerSolix);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ankerSolixConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Portable power", item: `${SITE_URL}/portable-power-station-australia` },
    { "@type": "ListItem", position: 3, name: "Anker SOLIX", item: `${SITE_URL}/anker-solix` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.ankerSolix.title,
  description: seoConfig.ankerSolix.description,
  url: seoConfig.ankerSolix.url,
  inLanguage: "en-AU",
  datePublished: "2026-08-24",
  dateModified: pageDates("/anker-solix")?.updated ?? "2026-08-24",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};
// Product rather than SoftwareApplication: these are physical goods. No
// aggregateRating, because Refer Labs publishes no ratings of its own and
// inventing one would breach ACL s29(1)(e). Offer carries the real AUD range
// read off the brand's own store.
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Anker SOLIX portable power stations",
  brand: { "@type": "Brand", name: "Anker SOLIX" },
  category: "Portable power station",
  description: ankerSolixConfig.quickAnswer,
  url: "https://www.ankersolix.com/au",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    lowPrice: "449",
    highPrice: "5399",
    offerCount: "8",
    availability: "https://schema.org/InStock",
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PremiumAffiliateLanding config={ankerSolixConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="mb-1.5 text-xs text-[#9aa39c]">Compare the two ranges</p>
          <Link href="/ecoflow-vs-anker-solix" className="text-sm font-semibold text-[#0a7c42] transition-colors hover:text-[#086536]">
            See Anker SOLIX next to the other range, priced per watt-hour &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
