import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.recruitersStaffingService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "HR Tech & Recruitment",
  heroTitle: "Enter Australia's HR & Recruitment Market",
  heroSubtitle:
    "We help overseas HR technology, ATS, payroll, and workforce management companies generate clients, agency partnerships, and distribution deals in Australia - without hiring locally.",
  primaryCta: { label: "Book a Market Entry Call", href: calendlyUrl },
  whyAustralia:
    "Australia's HR and recruitment market is characterised by a strong agency sector, complex employment legislation (Fair Work Act, Modern Awards), and growing demand for workforce technology. Mid-market and enterprise companies are actively upgrading their HR tech stacks, and recruitment agencies are seeking tools that give them a competitive edge. Local compliance knowledge is essential for product positioning.",
  opportunities: [
    { title: "Agency Partnerships", desc: "Australia's recruitment agency sector is large and fragmented, providing multiple partnership and distribution opportunities." },
    { title: "Enterprise HR Budgets", desc: "Australian enterprises are investing heavily in workforce management, payroll, and talent acquisition platforms." },
    { title: "Compliance Complexity", desc: "Fair Work Act, Modern Awards, and super requirements create demand for specialised technology solutions." },
    { title: "Platform Integrations", desc: "Local HRIS and payroll platforms have partner ecosystems that overseas companies can plug into." },
  ],
  approach: [
    "Map the Australian HR technology landscape and key buyers",
    "Build target list of agencies, enterprise HR teams, and technology partners",
    "Adapt product positioning for Australian employment law and compliance",
    "Launch outbound sales sequences to mid-market and enterprise buyers",
    "Pitch partnerships to recruitment agency networks and HR associations",
    "Structure reseller, integration, and distribution deals",
    "Handle GST, contract localisation, and regulatory introductions",
    "Weekly pipeline and partner reporting throughout",
  ],
  outcomes: [
    { value: "10-20", label: "Qualified conversations" },
    { value: "3-6", label: "Agency partnerships" },
    { value: "1-3", label: "Integration deals" },
    { value: "100%", label: "Market-ready setup" },
  ],
  ctaTitle: "Ready to Enter Australia's HR & Recruitment Market?",
  ctaDescription:
    "Book a 15-minute call. We will discuss your product, the Australian HR technology landscape, and scope a 90-day pilot.",
};

export default function RecruitersStaffingServicePage() {
  return <ServiceLandingPage content={content} />;
}
