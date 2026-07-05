import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { bioPeptiTechConfig } from "./config";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.bioPeptiTech);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: bioPeptiTechConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Peptide Supplier Comparison 2026", item: `${SITE_URL}/best-peptide-supplier` },
    { "@type": "ListItem", position: 3, name: "BioPeptiTech Discount Code & Peptides Sale", item: `${SITE_URL}/biopeptitech` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bioPeptiTech.title,
  description: seoConfig.bioPeptiTech.description,
  url: seoConfig.bioPeptiTech.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-13",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "BioPeptiTech discount code" },
    { "@type": "Thing", name: "peptides sale" },
    { "@type": "Thing", name: "research peptides deals" },
    { "@type": "Thing", name: "BioPeptiTech review" },
    { "@type": "Thing", name: "buy peptides online" },
    { "@type": "Thing", name: "peptide supplier discounts" },
    { "@type": "Thing", name: "longevity research peptides" },
    { "@type": "Thing", name: "metabolic research peptides" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BioPeptiTech",
  url: "https://biopeptitech.com",
  description:
    "Research peptide supplier providing laboratory-grade peptides and compounds for scientific research environments. Covers longevity, metabolic, hormone signalling, and biochemical research areas. Frequently runs peptides sale promotions. For research and laboratory use only.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BioPeptiTechPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PremiumAffiliateLanding config={bioPeptiTechConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare research peptide suppliers</p>
          <Link
            href="/best-peptide-supplier"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See how BioPeptiTech compares to Apollo Peptide Sciences and Ascension Peptides &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
