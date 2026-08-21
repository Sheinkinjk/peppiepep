import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { cloudtalkConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.cloudtalk);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cloudtalkConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business phone", item: `${SITE_URL}/compare/business-phone` },
    { "@type": "ListItem", position: 3, name: "CloudTalk", item: `${SITE_URL}/cloudtalk` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.cloudtalk.title,
  description: seoConfig.cloudtalk.description,
  url: seoConfig.cloudtalk.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CloudTalk",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI-powered business phone and call-centre platform: call routing, recording, analytics, SMS/WhatsApp and AI voice agents, with CRM integrations.",
  offers: { "@type": "Offer", price: "19", priceCurrency: "EUR", description: "14-day free trial; per-user paid plans from around €19/user/month.", availability: "https://schema.org/InStock" },
  url: "https://www.cloudtalk.io",
  sameAs: ["https://www.cloudtalk.io"],
};

export default function CloudTalkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={cloudtalkConfig} />
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
