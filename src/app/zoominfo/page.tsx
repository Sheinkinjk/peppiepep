import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { zoomInfoConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.zoomInfo);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: zoomInfoConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI sales tools", item: `${SITE_URL}/compare/ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "ZoomInfo", item: `${SITE_URL}/zoominfo` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.zoomInfo.title,
  description: seoConfig.zoomInfo.description,
  url: seoConfig.zoomInfo.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZoomInfo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Enterprise B2B sales-intelligence platform with a large contact and company database, direct dials, verified emails, org charts and buyer-intent signals.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Quote-only, enterprise annual contracts; trials arranged via the sales team.", availability: "https://schema.org/InStock" },
  url: "https://www.zoominfo.com",
  sameAs: ["https://www.zoominfo.com"],
};

export default function ZoomInfoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={zoomInfoConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare sales tools</p>
          <Link href="/compare/ai-sales-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See ZoomInfo next to the other sales tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
