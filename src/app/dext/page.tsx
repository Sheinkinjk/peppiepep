import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { dextConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.dext);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: dextConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Payments & finance", item: `${SITE_URL}/compare/payments` },
    { "@type": "ListItem", position: 3, name: "Dext", item: seoConfig.dext.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.dext.title,
  description: seoConfig.dext.description,
  url: seoConfig.dext.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dext",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Bookkeeping automation that captures receipts and invoices, extracts the data and syncs it to accounting software like Xero, QuickBooks and Sage.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
  url: "https://dext.com",
  sameAs: ["https://dext.com"],
};

export default function DextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={dextConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare finance & accounting tools</p>
          <Link href="/compare/payments" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See finance & accounting tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
