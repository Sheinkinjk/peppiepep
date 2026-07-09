import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { krispcallConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.krispcall);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: krispcallConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business phone", item: `${SITE_URL}/compare/business-phone` },
    { "@type": "ListItem", position: 3, name: "KrispCall", item: seoConfig.krispcall.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.krispcall.title,
  description: seoConfig.krispcall.description,
  url: seoConfig.krispcall.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KrispCall",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Cloud phone system with virtual local and international numbers, a shared team inbox, call recording, SMS and CRM integrations.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
  url: "https://krispcall.com",
  sameAs: ["https://krispcall.com"],
};

export default function KrispcallPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={krispcallConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare business phone systems</p>
          <Link href="/compare/business-phone" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            CloudTalk vs KrispCall in the business-phone hub &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
