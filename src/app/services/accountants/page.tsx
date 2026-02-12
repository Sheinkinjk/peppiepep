import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ServiceLandingPage from "@/components/services/ServiceLandingPage";

export const metadata = generateSEOMetadata(seoConfig.accountantsService);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const content = {
  industry: "Accounting & Tax Technology",
  heroTitle: "Enter Australia's Accounting & Tax Market",
  heroSubtitle:
    "We help overseas accounting software, tax technology, and practice management companies generate clients, firm partnerships, and distribution deals in Australia - without hiring locally.",
  primaryCta: { label: "Book a Market Entry Call", href: calendlyUrl },
  whyAustralia:
    "Australia has over 40,000 accounting practices and a highly digitised tax system with mandatory electronic lodgement. The market is dominated by a few key players, but mid-market firms are actively seeking modern alternatives. Strong partnerships with accounting associations, practice networks, and technology integrators are the fastest path to distribution.",
  opportunities: [
    { title: "Practice Networks", desc: "Australian accounting firms operate through large networks and associations that provide efficient distribution channels." },
    { title: "Regulatory Complexity", desc: "ATO compliance requirements, BAS, and STP create ongoing demand for specialised technology solutions." },
    { title: "Integration Partnerships", desc: "Platforms like Xero and MYOB have extensive partner ecosystems that overseas companies can leverage." },
    { title: "Mid-Market Growth", desc: "Growing practices are actively upgrading their technology stack and seeking modern solutions." },
  ],
  approach: [
    "Map the Australian accounting technology landscape and key decision-makers",
    "Build target list of accounting firms, practice networks, and technology partners",
    "Adapt product positioning for Australian tax and compliance requirements",
    "Launch outbound sales sequences to mid-market and enterprise firms",
    "Pitch partnerships to accounting associations and practice groups",
    "Structure integration, reseller, and white-label deals",
    "Handle GST registration, contract localisation, and regulatory introductions",
    "Weekly pipeline and partner reporting throughout",
  ],
  outcomes: [
    { value: "10-20", label: "Firm conversations" },
    { value: "3-5", label: "Network partnerships" },
    { value: "1-3", label: "Integration deals" },
    { value: "100%", label: "Market-ready setup" },
  ],
  ctaTitle: "Ready to Enter Australia's Accounting Market?",
  ctaDescription:
    "Book a 15-minute call. We will discuss your product, the Australian accounting technology landscape, and scope a 90-day pilot.",
};

export default function AccountantsServicePage() {
  return <ServiceLandingPage content={content} />;
}
