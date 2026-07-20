import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import RelatedGuides from "@/components/consumer/RelatedGuides";
import BuilderQuiz from "./BuilderQuiz";

export const metadata = generateSEOMetadata(seoConfig.websiteBuilderQuiz);

const faqs = [
  {
    q: "How do I choose the right website builder?",
    a: "Start with the job. A one-page site or link-in-bio points to Carrd (cheapest). A full business site points to an AI builder, Durable AI if you want a CRM and invoicing, Butternut AI for the fastest full draft. Landing pages for paid ads point to Swipe Pages for its AMP speed and A/B testing. This quiz maps those preferences to a pick in three questions.",
  },
  {
    q: "What is the cheapest website builder?",
    a: "Carrd, comfortably, with a genuine free plan and Pro from $9 per year. The AI builders let you generate a site free before committing to a paid publishing plan, so you can try before you pay.",
  },
  {
    q: "What is the best AI website builder?",
    a: "Durable AI and Butternut AI are the strongest AI builders. Durable suits service businesses because it bundles a CRM and invoicing; Butternut produces the fastest full multi-page draft from a single prompt. Both let you generate free before subscribing.",
  },
  {
    q: "Is the recommendation independent?",
    a: "Yes. The result is based only on your answers, and we never sell rankings. The pages contain disclosed affiliate links, so we may earn a commission if you sign up through them, at no extra cost to you, and it never changes a conclusion.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Website builders", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Which builder quiz", item: `${SITE_URL}/website-builder-quiz` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.websiteBuilderQuiz.title,
  description: seoConfig.websiteBuilderQuiz.description,
  url: seoConfig.websiteBuilderQuiz.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function WebsiteBuilderQuizPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href="/best-website-builder" className="hover:text-[#0a7c42] transition-colors">Website builders</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Which builder quiz</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Which website builder is right for you?
            </h1>
            <div className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-6 space-y-3">
              <p>
                Four good builders, four different jobs. Answer two or three quick questions and get the one that fits
                what you&apos;re actually making, and why. About 30 seconds.
              </p>
            </div>
          </section>

          <section className="pb-4">
            <BuilderQuiz />
          </section>

          <section className="border-t border-[#e5e9e7] mt-8 py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Prefer the full picture?
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The quiz points you to the best fit, but if you want to see the trade-offs yourself, the{" "}
                <Link href="/best-website-builder" className="text-[#0a7c42] underline underline-offset-2">full website-builder comparison</Link>{" "}
                lays out all four side by side, and the{" "}
                <Link href="/compare/website-builders" className="text-[#0a7c42] underline underline-offset-2">category hub</Link>{" "}
                sorts them by use-case.
              </p>
            </div>
          </section>

          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">Frequently asked questions</h2>
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

          <RelatedGuides category="Software" currentHref="/website-builder-quiz" limit={6} />

          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page recommends a builder based on your answers and contains disclosed affiliate links. We may earn
              a commission if you sign up through them, at no extra cost to you, and it never changes a conclusion. We
              never sell rankings.
            </p>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
