import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.financialAdvisorsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Financial Services & Fintech",
  heroTitle: "Enter Australia's Financial Services Market",
  heroSubtitle:
    "We help overseas fintech, lending, payments, and financial software companies generate clients, broker partnerships, and distribution deals in Australia - without hiring locally.",
  primaryCta: { label: "Partner With Us", href: calendlyUrl },
  whyAustralia:
    "Australia's financial services market is one of the largest in the Asia-Pacific region. Strong regulatory frameworks, high digital adoption, and a sophisticated advisor and broker network create significant opportunities for overseas financial technology companies. However, breaking in requires local relationships, compliance knowledge, and distribution partnerships that are difficult to build remotely.",
  opportunities: [
    { title: "Broker & Advisor Networks", desc: "Australia has a large, active network of financial advisors, mortgage brokers, and insurance brokers who act as key distribution channels." },
    { title: "Regulatory Credibility", desc: "Having a local compliance setup and Australian-adapted contracts dramatically increases buyer confidence." },
    { title: "Platform Partnerships", desc: "Australian platforms, aggregators, and dealer groups are actively seeking innovative technology partners." },
    { title: "Enterprise Demand", desc: "Banks, super funds, and wealth management firms are investing heavily in technology modernisation." },
  ],
  approach: [
    "Map the Australian financial services landscape relevant to your product",
    "Build target list of brokers, advisors, platforms, and enterprise accounts",
    "Adapt messaging and compliance positioning for Australian buyers",
    "Launch outbound sales sequences to qualified prospects",
    "Pitch and activate broker, advisor, and platform partnerships",
    "Structure white-label, reseller, and distribution deals",
    "Handle GST, contract localisation, and regulatory introductions",
    "Weekly pipeline and partner reporting throughout",
  ],
  outcomes: [
    { value: "10-20", label: "Qualified conversations" },
    { value: "3-8", label: "Partner discussions" },
    { value: "1-3", label: "Distribution deals" },
    { value: "100%", label: "Market-ready setup" },
  ],
  ctaTitle: "Ready to Enter Australia's Financial Services Market?",
  ctaDescription:
    "Book a 15-minute call. We will discuss your product, your goals in the Australian financial services market, and scope the engagement.",
};

export default function FinancialAdvisorsServicePage() {
  return <ServiceLandingPage content={content} />;
}
