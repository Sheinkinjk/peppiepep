import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import IndustryPageTemplate from "@/components/blueprint/IndustryPageTemplate";
import { CREATORS } from "@/components/blueprint/industries";

const data = CREATORS;

export const metadata: Metadata = {
  title: "Referral Blueprint for Creators — $799 | Refer Labs",
  description: "Referral Growth Blueprint for creators — 250+ programs, personalised strategy brief, SEO concepts, distribution playbooks. $799 AUD, 48hr delivery.",
  alternates: { canonical: `${SITE_URL}/referral-blueprint-for-creators` },
  keywords: [
    "referral blueprint for creators",
    "affiliate programs for creators",
    "creators affiliate marketing",
    "creators referral system",
    "best affiliate programs creators",
  ],
  openGraph: {
    title: "Referral Blueprint for Creators — 250+ Programs + Strategy",
    description: "Personalised strategy brief, 250+ affiliate programs, SEO concepts and distribution playbooks built for creators. $799, 48hr delivery.",
    url: `${SITE_URL}/referral-blueprint-for-creators`,
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Referral Blueprint", item: `${SITE_URL}/referral-blueprint` },
    { "@type": "ListItem", position: 3, name: "For Creators", item: `${SITE_URL}/referral-blueprint-for-creators` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: data.industryFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Referral Growth Blueprint for ${data.industry}`,
  description: data.hero.sub,
  url: `${SITE_URL}/referral-blueprint-for-creators`,
  brand: { "@type": "Brand", name: "Refer Labs" },
  image: [`${SITE_URL}/og-image.png`],
  offers: {
    "@type": "Offer",
    priceCurrency: "AUD",
    price: "799.00",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/referral-blueprint-for-creators`,
    priceValidUntil: "2027-01-01",
    seller: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "AUD" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "AU" },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 2, unitCode: "DAY" },
        transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "AU",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      merchantReturnDays: 0,
    },
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <IndustryPageTemplate data={data} />
    </>
  );
}
