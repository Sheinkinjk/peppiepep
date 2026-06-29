import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.consultantsCoachesService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Professional Services & Consulting Tech",
  heroTitle: "Enter Australia's Professional Services Market",
  heroSubtitle:
    "We help overseas consulting platforms, legal tech, project management, and professional services software companies generate clients, firm partnerships, and distribution deals in Australia - without hiring locally.",
  primaryCta: { label: "Partner With Us", href: calendlyUrl },
  whyAustralia:
    "Australia has a large and growing professional services sector across legal, management consulting, engineering, and advisory. Firms are actively investing in technology to improve operations, client delivery, and business development. The market rewards trusted local relationships and industry-specific positioning, making it difficult to penetrate from overseas without on-the-ground execution.",
  opportunities: [
    { title: "Firm Partnerships", desc: "Top and mid-tier consulting, legal, and advisory firms are actively seeking technology partners to modernise their operations." },
    { title: "Industry Associations", desc: "Professional associations and industry bodies provide efficient channels to reach thousands of practitioners." },
    { title: "Enterprise Procurement", desc: "Large firms and government buyers have structured procurement processes that favour locally represented vendors." },
    { title: "Vertical Specialisation", desc: "Niche positioning (legal, engineering, advisory) dramatically increases conversion in this market." },
  ],
  approach: [
    "Map the Australian professional services technology landscape",
    "Build target list of firms, associations, and enterprise buyers",
    "Adapt product positioning for Australian professional services verticals",
    "Launch outbound sales sequences to qualified buyers",
    "Pitch partnerships to industry associations and firm networks",
    "Structure reseller, licensing, and enterprise distribution deals",
    "Handle GST, contract localisation, and regulatory introductions",
    "Weekly pipeline and partner reporting throughout",
  ],
  outcomes: [
    { value: "10-15", label: "Firm conversations" },
    { value: "3-5", label: "Partner discussions" },
    { value: "1-3", label: "Distribution deals" },
    { value: "100%", label: "Market-ready setup" },
  ],
  ctaTitle: "Ready to Enter Australia's Professional Services Market?",
  ctaDescription:
    "Book a 15-minute call. We will discuss your product, the Australian professional services landscape, and scope the engagement.",
};

export default function ConsultantsCoachesServicePage() {
  return <ServiceLandingPage content={content} />;
}
