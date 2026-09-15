import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { unbounceConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.unbounce);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: unbounceConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Website builders", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Unbounce", item: `${SITE_URL}/unbounce` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.unbounce.title,
  description: seoConfig.unbounce.description,
  url: seoConfig.unbounce.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-12",
  dateModified: pageDates("/unbounce")?.updated ?? "2026-07-12",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Unbounce",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "No-code landing-page builder for marketers, with a large template library, A/B testing, lead-capture forms and integrations.",
  // No price: the page deliberately quotes none ("We do not quote a figure here"),
  // so a price in the markup would state one the page does not stand behind.
  offers: { "@type": "Offer", description: "14-day free trial; plans and prices are published on Unbounce's own site.", availability: "https://schema.org/InStock" },
  url: "https://unbounce.com",
  sameAs: ["https://unbounce.com"],
};

export default function UnbouncePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={unbounceConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#627068] text-xs mb-1.5">Compare website & landing-page builders</p>
          <Link href="/compare/website-builders" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Unbounce next to the other builders &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
