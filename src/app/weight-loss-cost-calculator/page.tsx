import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSHY_URL } from "@/lib/affiliate-links";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import CostPlanner from "./CostPlanner";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.weightLossCostCalculator);

const faqs = [
  {
    q: "How much does weight-loss telehealth cost in Australia?",
    a: "There is no single figure, because pricing is individual. Online services charge a program fee: Moshy describes its fee as all-inclusive, and Juniper's varies with the plan and level of support. Both publish pricing on their own sites and show the amount before you pay.",
  },
  {
    q: "Why doesn't this calculator show exact prices?",
    a: "Because any exact figure we published would go stale: prices change and vary with the program and level of support. Instead the planner shows what each route charges for, and what determines your price, then points you to where your real figure is shown: the provider's own pricing page, before you pay.",
  },
  {
    q: "How is Moshy priced?",
    a: "Moshy publishes one all-inclusive program fee on its own site and shows the amount before you pay. New customers get $120 off their first order with REFERRAL120 at checkout, one use, with a 3-month minimum commitment under Moshy's terms. Moshy's terms are at getmoshy.com.au/terms.",
  },
  {
    q: "Does Medicare cover weight-loss telehealth?",
    a: "Telehealth weight-management programs are generally private services, so the program fees are not Medicare-rebated. The GP route is different: eligible in-person or telehealth GP consults may attract Medicare rebates, and some practices bulk-bill, which is why the GP route can suit people prioritising lowest cash cost over speed and convenience. Check your own practice's billing.",
  },
  {
    q: "Is this tool medical advice?",
    a: "No. The planner compares pricing structures based on your preferences about paying and support. It does not assess your health, does not evaluate suitability for any treatment, and does not recommend any treatment. Suitability is decided by a registered Australian practitioner after an individual assessment, and some applicants are declined.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Cost calculator", item: `${SITE_URL}/weight-loss-cost-calculator` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.weightLossCostCalculator.title,
  description: seoConfig.weightLossCostCalculator.description,
  url: seoConfig.weightLossCostCalculator.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-07",
  dateModified: pageDates("/weight-loss-cost-calculator")?.updated ?? "2026-07-07",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function WeightLossCostCalculatorPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#14120f]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href="/weight-loss" className="hover:text-[#007a95] transition-colors">Weight loss</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#14120f]">Cost calculator</span>
          <SectionMark kind="calculator" size={56} /></nav>

          {/* Hero */}
          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#14120f] mb-4 max-w-3xl">
              What will weight-loss telehealth cost you? Compare the fee models
            </h1>
            <div className="text-[#56504a] text-sm sm:text-base leading-relaxed max-w-2xl mb-5 space-y-3">
              <p>
                Weight-loss telehealth has no single fixed price, because the figure depends on the program and
                support level you choose. This planner shows{" "}
                <strong className="font-semibold text-[#14120f]">what each route charges for</strong>, what moves
                the price, and where each provider publishes its fee before you pay.
              </p>
              <p>Three quick preference questions. No health questions, and nothing is stored.</p>
            </div>
            <p className="mb-6 rounded-lg border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-xs leading-relaxed text-[#56504a]">
              <span className="font-semibold text-[#14120f]">Information only.</span> This tool compares pricing
              structures, not medical suitability. It is not medical or financial advice and does not recommend
              any treatment. This page contains a disclosed affiliate link.
            </p>
          </section>

          {/* The tool */}
          <section className="pb-4">
            <CostPlanner />
          </section>

          {/* Why no dollar figures */}
          <section className="border-t border-[#ded8cd] mt-8 py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#14120f] mb-4">
              Why we don&apos;t publish exact prices
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#56504a] max-w-2xl">
              <p>
                Weight-loss telehealth pricing depends on the program, the level of support and any minimum
                term, so two people rarely pay the same amount.
              </p>
              <p>
                What this tool gives you instead is the cost structure of each route, the factors that move your
                price, and where to read the exact figure: each provider publishes its fee on its own pricing page
                and shows it before you pay. For the wider
                pricing landscape, see our guide to{" "}
                <Link href="/weight-loss-telehealth-cost-australia" className="text-[#007a95] underline underline-offset-2">
                  how weight-loss telehealth pricing works
                </Link>{" "}
                and the{" "}
                <Link href="/cheapest-weight-loss-telehealth-australia" className="text-[#007a95] underline underline-offset-2">
                  cheapest-options comparison
                </Link>.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#ded8cd] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#14120f] mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4">
                  <summary className="cursor-pointer list-none font-semibold text-[#14120f] text-sm sm:text-base flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden="true" className="text-[#56504a] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="text-[#56504a] text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
            <OfferTermsNote brand="Moshy" className="mt-5" />
          </section>

          {/* Email capture */}
          <section className="border-t border-[#ded8cd] py-9">
            <NewsletterSignup variant="band" source="cost-calculator" />
          </section>

          {/* Related + disclosure */}
          <section className="border-t border-[#ded8cd] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#14120f] mb-3">Keep researching</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/weight-loss-telehealth-cost-australia" className="nw-link text-sm">How pricing works</Link>
              <span className="text-[#56504a]">·</span>
              <Link href="/best-weight-loss-telehealth-australia" className="nw-link text-sm">Best weight-loss telehealth</Link>
              <span className="text-[#56504a]">·</span>
              <Link href="/moshy" className="nw-link text-sm">Moshy: what it costs</Link>
          <Link href="/moshy-review" className="nw-link text-sm">Moshy, explained</Link>
              <span className="text-[#56504a]">·</span>
              <Link href="/weight-loss" className="nw-link text-sm">The full weight-loss hub</Link>
            </div>
            <p className="text-[#56504a] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to Moshy. We
              may earn a commission if you sign up through it, at no extra cost to you, and it never changes a
              conclusion. All content is general information only and does not constitute medical or financial
              advice. What is appropriate for you is decided by a registered practitioner after an individual assessment.
              Consult a qualified health professional before making health decisions.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Get started" />
    </ConsumerShell>
  );
}
