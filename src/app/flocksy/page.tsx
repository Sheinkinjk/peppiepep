import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { flocksyConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.flocksy);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: flocksyConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
    { "@type": "ListItem", position: 3, name: "Flocksy", item: `${SITE_URL}/flocksy` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.flocksy.title,
  description: seoConfig.flocksy.description,
  url: seoConfig.flocksy.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Flocksy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Flat-rate subscription providing a dedicated team of human creatives for unlimited graphic design, video, branding, web and copywriting requests.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "No free plan; 14-day money-back guarantee; plans from around US$1,199/month.", availability: "https://schema.org/InStock" },
  url: "https://www.flocksy.com",
  sameAs: ["https://www.flocksy.com"],
};

export default function FlocksyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={flocksyConfig} />
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
