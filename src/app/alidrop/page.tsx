import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { alidropConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.alidrop);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: alidropConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "AliDrop Review", item: `${SITE_URL}/alidrop` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.alidrop.title,
  description: seoConfig.alidrop.description,
  url: seoConfig.alidrop.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AliDrop",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Dropshipping tool for sourcing products from AliExpress, Alibaba and Temu, importing them to Shopify and other stores, and automating order fulfilment. Includes product research and private suppliers.",
  offers: {
    "@type": "Offer",
    price: "39",
    priceCurrency: "USD",
    description: "A $1 seven-day trial, then paid plans from $39/month.",
    availability: "https://schema.org/InStock",
  },
  url: "https://www.alidrop.co",
  sameAs: ["https://www.alidrop.co"],
};

export default function AliDropPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={alidropConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Building an online business?</p>
          <Link href="/guides" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            Browse our guides to tools, income and building online &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
