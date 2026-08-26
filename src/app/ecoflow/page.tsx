import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { ecoflowConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.ecoflow);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ecoflowConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Portable power", item: `${SITE_URL}/portable-power-station-australia` },
    { "@type": "ListItem", position: 3, name: "EcoFlow", item: `${SITE_URL}/ecoflow` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.ecoflow.title,
  description: seoConfig.ecoflow.description,
  url: seoConfig.ecoflow.url,
  inLanguage: "en-AU",
  datePublished: "2026-08-24",
  dateModified: "2026-08-24",
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
  name: "EcoFlow portable power stations",
  brand: { "@type": "Brand", name: "EcoFlow" },
  category: "Portable power station",
  description: ecoflowConfig.quickAnswer,
  url: "https://au.ecoflow.com",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    lowPrice: "299",
    highPrice: "7299",
    offerCount: "11",
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
      <PremiumAffiliateLanding config={ecoflowConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="mb-1.5 text-xs text-[#9aa39c]">Compare the two ranges</p>
          <Link href="/ecoflow-vs-anker-solix" className="text-sm font-semibold text-[#0a7c42] transition-colors hover:text-[#086536]">
            See EcoFlow next to the other range, priced per watt-hour &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
