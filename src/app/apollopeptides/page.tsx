import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import AffiliatePageTemplate from "@/components/affiliate/AffiliatePageTemplate";
import { apolloPeptidesConfig } from "./config";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.apolloPeptides);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: apolloPeptidesConfig.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "Apollo Peptide Sciences Discount Code & Peptides Sale", item: `${SITE_URL}/apollopeptides` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.apolloPeptides.title,
  description: seoConfig.apolloPeptides.description,
  url: seoConfig.apolloPeptides.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-13",
  dateModified: "2026-03-16",
  about: [
    { "@type": "Thing", name: "Apollo Peptide Sciences discount code" },
    { "@type": "Thing", name: "peptides sale" },
    { "@type": "Thing", name: "research peptides" },
    { "@type": "Thing", name: "Apollo Peptide Sciences review" },
    { "@type": "Thing", name: "buy research peptides online" },
    { "@type": "Thing", name: "peptide supplier discount" },
    { "@type": "Thing", name: "Semaglutide research peptides" },
    { "@type": "Thing", name: "CJC-1295 research peptides" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Apollo Peptide Sciences",
  url: "https://apollopeptidesciences.com",
  description:
    "Research peptide supplier providing high-purity laboratory compounds for scientific research. Catalogue includes metabolic, longevity, tissue repair, and hormone signalling peptides. For laboratory research use only.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "840",
  },
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "Apollo Peptide Sciences",
    url: "https://apollopeptidesciences.com",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.6",
    bestRating: "5",
    worstRating: "1",
  },
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  datePublished: "2026-03-13",
  reviewBody:
    "Apollo Peptide Sciences is one of the most referenced research peptide suppliers, known for high-purity compounds and third-party testing documentation. Catalogue includes Semaglutide, CJC-1295, Ipamorelin, GHK-Cu, and Retatrutide research peptides. All compounds are for laboratory research use only. Regularly runs peptides sale promotions. Access via referral link for current offer.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApolloPeptidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <AffiliatePageTemplate config={apolloPeptidesConfig} />
      <div className="bg-[#060f15] border-t border-white/[0.06] py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-white/25 text-xs mb-1.5">Compare research peptide suppliers</p>
          <Link
            href="/best-peptide-supplier"
            className="text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: "#22C0CD" }}
          >
            See how Apollo Peptide Sciences compares to Ascension Peptides and BioPeptiTech &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
