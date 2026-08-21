import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import AiSalesQuiz from "./AiSalesQuiz";

export const metadata = generateSEOMetadata(seoConfig.aiSalesToolsQuiz);

const faqs = [
  {
    q: "How do I choose an AI sales tool?",
    a: "Start with your actual bottleneck, not the feature list. If you lack verified contact details, you need a data tool like FullEnrich. If you have leads but nobody running outreach, you either want a platform to run sequences yourself (Reply.io) or a done-for-you AI rep that books meetings (AiSDR). If your CRM and tools are a tangled mess, an all-in-one like GoHighLevel consolidates them. This match asks one or two questions and points you to the fit.",
  },
  {
    q: "What is the difference between an AI SDR and a sales engagement platform?",
    a: "A sales engagement platform (Reply.io) gives you the tooling to run your own multichannel sequences, you stay in control of the outreach. An AI SDR (AiSDR) is more done-for-you: it prospects, personalises and books meetings on your behalf, closer to hiring a rep than buying software. Which fits depends on how hands-on you want to be.",
  },
  {
    q: "Is the recommendation independent?",
    a: "Yes. The result is based only on your answer, and we never sell rankings. The pages contain disclosed affiliate links, so we may earn a commission if you sign up through them, at no extra cost to you, and it never changes a conclusion.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI sales tools", item: `${SITE_URL}/best-ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "Which tool do you need", item: `${SITE_URL}/ai-sales-tools-quiz` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.aiSalesToolsQuiz.title,
  description: seoConfig.aiSalesToolsQuiz.description,
  url: seoConfig.aiSalesToolsQuiz.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AiSalesToolsQuizPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="transition-colors hover:text-[#0a7c42]">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href="/best-ai-sales-tools" className="transition-colors hover:text-[#0a7c42]">AI sales tools</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Which tool do you need</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Which AI sales tool do you actually need?
            </h1>
            <div className="mb-6 max-w-2xl space-y-3 text-sm leading-relaxed text-[#3d4b44] sm:text-base">
              <p>
                Four good tools, four different jobs, data, outreach, a done-for-you rep, or a whole stack in one. Answer
                one or two quick questions and get the one that fixes your actual bottleneck, and why.
                About 30 seconds.
              </p>
            </div>
          </section>

          <section className="pb-4">
            <AiSalesQuiz />
          </section>

          <section className="mt-8 border-t border-[#e5e9e7] py-9">
            <h2 className="mb-4 text-xl font-extrabold tracking-tight text-[#10251b] sm:text-2xl">Prefer the full picture?</h2>
            <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                The match points you to the best fit, but if you want the trade-offs yourself, the{" "}
                <Link href="/best-ai-sales-tools" className="text-[#0a7c42] underline underline-offset-2">full AI sales-tools roundup</Link>{" "}
                lays out all four side by side, and the{" "}
                <Link href="/compare/ai-sales-tools" className="text-[#0a7c42] underline underline-offset-2">category hub</Link>{" "}
                sorts them by use-case.
              </p>
            </div>
          </section>

          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-[#10251b] sm:text-2xl">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#10251b] sm:text-base">
                    {f.q}
                    <span aria-hidden="true" className="text-lg leading-none text-[#9aa39c] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#3d4b44]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <p className="max-w-2xl text-xs leading-relaxed text-[#9aa39c]">
              This page recommends a tool based on your answer and contains disclosed affiliate links. We may earn a
              commission if you sign up through them, at no extra cost to you, and it never changes a conclusion. We
              never sell rankings.
            </p>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
