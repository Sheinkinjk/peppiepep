import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import AffiliatePageTemplate from "@/components/affiliate/AffiliatePageTemplate";
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "540",
  },
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "BioPeptiTech",
    url: "https://biopeptitech.com",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.5",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-13",
  reviewBody:
    "BioPeptiTech is a laboratory-grade research peptide supplier that frequently runs peptides sale promotions. Referenced in researcher communities for longevity, metabolic, and hormone signalling compound sourcing. For research and laboratory use only. Access current sale and discount via affiliate referral link.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BioPeptiTechPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <AffiliatePageTemplate config={bioPeptiTechConfig} />
      <div className="bg-[#060f15] border-t border-white/[0.06] py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-white/25 text-xs mb-1.5">Compare research peptide suppliers</p>
          <Link
            href="/best-peptide-supplier"
            className="text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: "#22C0CD" }}
          >
            See how BioPeptiTech compares to Apollo Peptide Sciences and Ascension Peptides &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
