import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { melioConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.melio);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: melioConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Payments & finance", item: `${SITE_URL}/compare/payments` },
    { "@type": "ListItem", position: 3, name: "Melio", item: `${SITE_URL}/melio` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.melio.title,
  description: seoConfig.melio.description,
  url: seoConfig.melio.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Melio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "B2B bill-pay and accounts-payable platform for US businesses to pay vendors by bank transfer, card or check, syncing with QuickBooks and Xero.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free plan; paid plans from around US$25/month. Requires a US business and US bank account to send payments.", availability: "https://schema.org/InStock" },
  url: "https://meliopayments.com",
  sameAs: ["https://meliopayments.com"],
};

export default function MelioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={melioConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare payment tools</p>
          <Link href="/compare/payments" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Melio next to the other payment tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
