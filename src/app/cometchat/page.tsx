import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { cometchatConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.cometchat);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cometchatConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
    { "@type": "ListItem", position: 3, name: "CometChat", item: `${SITE_URL}/cometchat` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.cometchat.title,
  description: seoConfig.cometchat.description,
  url: seoConfig.cometchat.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CometChat",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Developer platform for adding in-app chat, voice and video to web and mobile apps via SDKs, APIs and pre-built UI kits.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free Build plan (up to 100 monthly active users); paid production plans from around US$299/month.", availability: "https://schema.org/InStock" },
  url: "https://www.cometchat.com",
  sameAs: ["https://www.cometchat.com"],
};

export default function CometChatPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={cometchatConfig} />
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
