import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { databoxConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.databox);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: databoxConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
    { "@type": "ListItem", position: 3, name: "Databox", item: `${SITE_URL}/databox` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.databox.title,
  description: seoConfig.databox.description,
  url: seoConfig.databox.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Databox",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "KPI-dashboard and analytics platform that pulls data from 130+ sources into unified dashboards and automated reports with AI insights.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free plan; 14-day trial with no card; paid plans from around US$64/month.", availability: "https://schema.org/InStock" },
  url: "https://databox.com",
  sameAs: ["https://databox.com"],
};

export default function DataboxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={databoxConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare business software</p>
          <Link href="/business-software" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See more business tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
