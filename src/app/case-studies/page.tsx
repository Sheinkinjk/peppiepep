import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.caseStudies);

const segments = [
  {
    title: "Financial Services",
    href: "/services/financial-advisors",
    outcomes: [
      "Structured advisor + broker referral channels",
      "Co-branded go-to-market kits for regulated audiences",
      "Pipeline reviews with compliance and pricing alignment",
    ],
  },
  {
    title: "Accounting & Tax",
    href: "/services/accountants",
    outcomes: [
      "Partnerships with mid-tier and boutique firms",
      "Licensing and white-label opportunities for practices",
      "Education-led campaigns that drive demos",
    ],
  },
  {
    title: "Insurance",
    href: "/services/insurance-brokers",
    outcomes: [
      "Broker and MGA distribution programs",
      "Product-localised terms for AU/NZ regulatory expectations",
      "Referral attribution and shared revenue reporting",
    ],
  },
  {
    title: "HR & Recruitment",
    href: "/services/recruiters-staffing",
    outcomes: [
      "Agency alliances and embedded recruiter motions",
      "Talent marketplace partnerships",
      "Onboarding playbooks that convert signed LOIs into revenue",
    ],
  },
  {
    title: "Professional Services",
    href: "/services/consultants-coaches",
    outcomes: [
      "Industry association introductions",
      "Partner-led implementations with accountability SLAs",
      "Executive roundtables to accelerate trust",
    ],
  },
];

const useCases = [
  {
    headline: "US Fintech enters APAC via broker-first motion",
    detail:
      "Built a 30-firm broker list, ran compliant outreach, closed 6 active distribution partners, and generated first partner-sourced revenue in 75 days.",
    proof: ["30 broker meetings", "6 signed partners", "First revenue in 75 days"],
  },
  {
    headline: "B2B SaaS lands enterprise pilots through advisors",
    detail:
      "Activated 12 trusted local advisors; advisor-led intros produced 14 enterprise pilots and 3 multi-year contracts.",
    proof: ["12 advisor partners", "14 enterprise pilots", "3 multi-year contracts"],
  },
  {
    headline: "Insurance platform expands with MGA partnerships",
    detail:
      "Negotiated MGA agreements, localised coverage docs, and launched joint marketing-producing steady quarterly pipeline.",
    proof: ["4 MGA agreements", "AU/NZ-compliant docs", "Quarterly partner pipeline"],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <main id="main-content" className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        {/* Hero */}
        <section className="premium-section-light text-center space-y-4 mb-16 rounded-[2rem] px-6 py-12 sm:px-10 sm:py-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2a34] leading-tight">
            How Refer Labs Creates Outcomes
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Real examples of how we combine sales, partnerships, compliance, and operations to enter APAC markets, and the results our clients see.
          </p>
        </section>

        {/* Segment tiles */}
        <section className="mb-18">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {segments.map((segment) => (
              <div
                key={segment.title}
                className="premium-section-light group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#f5fbfc] p-6 shadow-sm hover:-translate-y-1 hover:border-[#0AA7B5]/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#0b2a34]">{segment.title}</h3>
                  <ArrowRight className="h-4 w-4 text-[#0AA7B5] opacity-70 group-hover:opacity-100" />
                </div>
                <ul className="space-y-2">
                  {segment.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={segment.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0AA7B5] hover:text-[#00838F]"
                >
                  See segment playbook
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-18 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a34]">Representative Outcomes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.headline}
                className="premium-section-light rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-[#0b2a34] mb-3">{useCase.headline}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{useCase.detail}</p>
                <div className="space-y-1">
                  {useCase.proof.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs font-semibold text-[#0b2a34]">
                      <CheckCircle2 className="h-4 w-4 text-[#0AA7B5]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h3 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mt-4 mb-3">
            Ready to see your version of these outcomes?
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6">
            We tailor the playbook to your product, ICP, and internal resourcing. Let’s outline the first 90 days.
          </p>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#0AA7B5] px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-[#00838F] transition-all"
          >
            View the 90-day pilot
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
