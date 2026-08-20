import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import ScreeningQuizClient from "./ScreeningQuizClient";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.screeningQuiz);

const SLUG = "/longevity/diagnostics/health-screening-quiz";

const faqs = [
  {
    q: "Does this quiz assess my health risk?",
    a: "No, and it deliberately avoids trying. It asks what prompted your interest, how you would handle an uncertain result, whether cost matters and whether you have spoken to a GP. It asks nothing about symptoms, family history or risk factors, because assessing those is a clinician's job and not something a web page should attempt.",
  },
  {
    q: "Why does the result usually point at a GP?",
    a: "Because whether screening is worthwhile depends on your individual risk, and that is genuinely not knowable from four questions. A GP can also access clinically indicated pathways that attract a Medicare rebate, which private screening does not.",
  },
  {
    q: "Are you recommending against screening?",
    a: "No. We are saying the decision is more complicated than the marketing suggests, particularly for people with no symptoms, and that the incidental-finding cascade belongs in the decision. For some people with specific risk factors, investigation is well justified. That is a conversation with a doctor rather than a conclusion from a quiz.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Longevity", item: `${SITE_URL}/longevity` },
    { "@type": "ListItem", position: 3, name: "Diagnostics", item: `${SITE_URL}/longevity/diagnostics` },
    { "@type": "ListItem", position: 4, name: "Screening quiz", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.screeningQuiz.title,
  description: seoConfig.screeningQuiz.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/longevity" className="hover:text-[#0a7c42]">Longevity</Link>
          <span>/</span>
          <Link href="/longevity/diagnostics" className="hover:text-[#0a7c42]">Diagnostics</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Screening quiz</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Is preventive screening <span className="italic text-[#0a7c42]">worth it for you?</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Four questions about what prompted your interest and how you would handle an uncertain result. It asks nothing about your symptoms or history, and most answers point back to a GP.
        </p>

        <div className="mt-8">
          <ScreeningQuizClient />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">About this quiz</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10">
          <ComingSoonNote category="Diagnostics" />
        </div>
      </main>
    </ConsumerShell>
  );
}
