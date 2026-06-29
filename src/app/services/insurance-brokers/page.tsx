import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.insuranceBrokersService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Insurance & Insurtech",
  heroTitle: "Enter Australia's Insurance Market",
  heroSubtitle:
    "We help overseas insurtech, underwriting platforms, and insurance software companies generate clients, broker partnerships, and distribution deals in Australia - without hiring locally.",
  primaryCta: { label: "Partner With Us", href: calendlyUrl },
  whyAustralia:
    "Australia's insurance market is mature but undergoing significant digital transformation. Brokers handle a large share of commercial insurance, creating a concentrated distribution channel. Regulatory modernisation and increasing demand for digital-first solutions mean overseas insurtech companies have a clear window to enter with the right local partnerships and compliance setup.",
  opportunities: [
    { title: "Broker Distribution", desc: "Australian insurance brokers are the primary channel for commercial insurance and are actively seeking technology partners." },
    { title: "Underwriter Partnerships", desc: "Local underwriters and MGAs are looking for innovative platforms to modernise their operations." },
    { title: "Regulatory Tailwinds", desc: "APRA and ASIC modernisation creates demand for compliance-ready technology solutions." },
    { title: "Claims & Operations", desc: "Insurers are investing in claims automation, pricing engines, and customer experience platforms." },
  ],
  approach: [
    "Map the Australian insurance technology landscape and key stakeholders",
    "Build target list of brokers, underwriters, MGAs, and enterprise insurers",
    "Adapt product positioning for Australian regulatory and market requirements",
    "Launch outbound sales sequences to qualified insurance buyers",
    "Pitch and activate broker network and underwriter partnerships",
    "Structure distribution, licensing, and white-label deals",
    "Handle regulatory introductions, GST, and contract localisation",
    "Weekly pipeline and partner reporting throughout",
  ],
  outcomes: [
    { value: "10-15", label: "Qualified conversations" },
    { value: "3-6", label: "Broker/partner discussions" },
    { value: "1-2", label: "Distribution deals" },
    { value: "100%", label: "Market-ready setup" },
  ],
  ctaTitle: "Ready to Enter Australia's Insurance Market?",
  ctaDescription:
    "Book a 15-minute call. We will discuss your product, the Australian insurance landscape, and scope the engagement.",
};

export default function InsuranceBrokersServicePage() {
  return <ServiceLandingPage content={content} />;
}
