import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { alohiConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.alohi);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: alohiConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
    { "@type": "ListItem", position: 3, name: "Alohi", item: `${SITE_URL}/alohi` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.alohi.title,
  description: seoConfig.alohi.description,
  url: seoConfig.alohi.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Alohi",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Alohi document tools: Sign.Plus for legally-binding electronic signatures and Fax.Plus for secure online faxing, both with free plans.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free plans on both products; paid plans from US$6.99/month (Fax.Plus) and US$14.99/month (Sign.Plus).", availability: "https://schema.org/InStock" },
  url: "https://www.alohi.com",
  sameAs: ["https://www.alohi.com"],
};

export default function AlohiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={alohiConfig} />
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
