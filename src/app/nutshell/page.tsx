import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { nutshellConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.nutshell);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: nutshellConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI sales tools", item: `${SITE_URL}/compare/ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "Nutshell", item: `${SITE_URL}/nutshell` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.nutshell.title,
  description: seoConfig.nutshell.description,
  url: seoConfig.nutshell.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nutshell",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Easy-to-use sales CRM with built-in email marketing: pipeline and contact management, email sequences, web forms, landing pages and reporting.",
  offers: { "@type": "Offer", price: "13", priceCurrency: "USD", description: "14-day free trial, no card; per-user plans from $13/user/month.", availability: "https://schema.org/InStock" },
  url: "https://www.nutshell.com",
  sameAs: ["https://www.nutshell.com"],
};

export default function NutshellPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={nutshellConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare sales tools</p>
          <Link href="/compare/ai-sales-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Nutshell next to the other AI sales tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
