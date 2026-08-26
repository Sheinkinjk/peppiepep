import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import CostPlanner from "./CostPlanner";

export const metadata = generateSEOMetadata(seoConfig.weightLossCostCalculator);

const faqs = [
  {
    q: "How much does weight-loss telehealth cost in Australia?",
    a: "There is no single figure, because pricing is individual. Online clinical services run on subscriptions where the fee typically bundles practitioner oversight, any prescribed treatment and delivery, and the exact price depends on the plan a registered practitioner approves for you. Every reputable provider shows your actual figure inside its own flow before you commit to anything.",
  },
  {
    q: "Why doesn't this calculator show exact prices?",
    a: "Because any exact figure we published would be a guess, and prices change and vary by individual treatment plan. Instead the planner shows what each pathway charges for, what determines your price, and the questions to ask, then points you to where your real figure is shown: inside the provider's consultation, before any commitment.",
  },
  {
    q: "Is the Moshy eligibility check free?",
    a: "Yes. The online eligibility check is free, takes around ten minutes and commits you to nothing. If a registered Australian practitioner approves you, the subscription options and pricing are shown inside the platform before you pay. New customers can currently receive $120 off their first treatment through our referral link, applied automatically with no code.",
  },
  {
    q: "Does Medicare cover weight-loss telehealth?",
    a: "Telehealth weight-management programs are generally private services, so the program fees are not Medicare-rebated. The GP pathway is different: eligible in-person or telehealth GP consults may attract Medicare rebates, and some practices bulk-bill, which is why the GP route can suit people prioritising lowest cash cost over speed and convenience. Check your own practice's billing.",
  },
  {
    q: "Is this tool medical advice?",
    a: "No. The planner compares pricing structures based on your preferences about paying and support. It does not assess your health, does not evaluate suitability for any treatment, and does not recommend any medicine. Suitability is decided by a registered Australian practitioner after an individual assessment, and approval is never guaranteed.",
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
  dateModified: "2026-07-07",
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

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href="/weight-loss" className="hover:text-[#0a7c42] transition-colors">Weight loss</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Cost calculator</span>
          </nav>

          {/* Hero */}
          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              What will weight-loss telehealth cost you? Find your pathway
            </h1>
            <div className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-5 space-y-3">
              <p>
                Nobody can quote you an honest fixed price for weight-loss care, because the figure depends on
                the plan a practitioner approves for you. What we can do is show you exactly{" "}
                <strong className="font-semibold text-[#10251b]">what each pathway charges for</strong>, what
                moves the price, and where your real number gets revealed before you commit a cent.
              </p>
              <p>Three quick preference questions. No health questions, and nothing is stored.</p>
            </div>
            <p className="mb-6 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
              <span className="font-semibold text-[#2b362f]">Information only.</span> This tool compares pricing
              structures, not medical suitability. It is not medical or financial advice and does not recommend
              any treatment. Prescription medicines in Australia are available only after assessment by a
              registered practitioner. This page contains a disclosed affiliate link.
            </p>
          </section>

          {/* The tool */}
          <section className="pb-4">
            <CostPlanner />
          </section>

          {/* Why no dollar figures */}
          <section className="border-t border-[#e5e9e7] mt-8 py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Why we don&apos;t publish exact prices
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Most &ldquo;cost&rdquo; pages in this category publish a number to win the click, and the number
                is either out of date or was never true for anyone in particular. Subscription pricing in
                weight-loss telehealth depends on the treatment plan a registered practitioner approves after an
                individual assessment, so two people rarely pay the same amount.
              </p>
              <p>
                What this tool gives you instead is the cost structure of each pathway, the
                factors that move your price, and the fact that reputable providers show the exact figure inside
                their own flow before you commit. The free eligibility check is how you turn &ldquo;roughly
                what&rdquo; into &ldquo;exactly this, for me&rdquo; without spending anything. For the wider
                pricing landscape, see our guide to{" "}
                <Link href="/weight-loss-telehealth-cost-australia" className="text-[#0a7c42] underline underline-offset-2">
                  how weight-loss telehealth pricing works
                </Link>{" "}
                and the{" "}
                <Link href="/cheapest-weight-loss-telehealth-australia" className="text-[#0a7c42] underline underline-offset-2">
                  cheapest-options comparison
                </Link>.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                  <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden="true" className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Email capture */}
          <section className="border-t border-[#e5e9e7] py-9">
            <NewsletterSignup variant="band" source="cost-calculator" />
          </section>

          {/* Related + disclosure */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#10251b] mb-3">Keep researching</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/weight-loss-telehealth-cost-australia" className="nw-link text-sm">How pricing works</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-weight-loss-telehealth-australia" className="nw-link text-sm">Best weight-loss telehealth</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/moshy" className="nw-link text-sm">Moshy: what it costs</Link>
          <Link href="/moshy-review" className="nw-link text-sm">Moshy, explained</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/weight-loss" className="nw-link text-sm">The full weight-loss hub</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to Moshy. We
              may earn a commission if you sign up through it, at no extra cost to you, and it never changes a
              conclusion. All content is general information only and does not constitute medical or financial
              advice. Prescription medicines in Australia are available only after an individual assessment by a
              registered Australian practitioner, and suitability is practitioner-decided and never guaranteed.
              Consult a qualified health professional before making health decisions.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
