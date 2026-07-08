import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import PathwayQuiz from "@/components/consumer/PathwayQuiz";

export const metadata = generateSEOMetadata(seoConfig.weightLossQuiz);

const faqs = [
  {
    q: "How do I choose a weight-loss program in Australia?",
    a: "Start with what you actually want. A fast, clinically-led pathway you can start online points to a medical telehealth service. Wanting coaching, habits and accountability alongside, rather than medication first, points to a coaching-led program. Preferring the lowest cost and an in-person assessment points to your GP. This match asks two quick questions and points you to the pathway that fits, with an honest reason why. A registered practitioner still decides whether any treatment is appropriate for you.",
  },
  {
    q: "Is telehealth or an in-person GP better for weight loss?",
    a: "Neither is universally better, they suit different people. Telehealth is faster to start and handled from home, with practitioner check-ins built in. An in-person GP suits you if you prefer a face-to-face assessment, want the lowest cost with Medicare offsetting part of it, or have a complex history. Both routes involve a registered practitioner deciding whether any treatment is appropriate for you.",
  },
  {
    q: "Does the match decide if I am eligible for treatment?",
    a: "No. Eligibility for any prescription treatment in Australia is decided only by a registered practitioner after they assess you individually. This tool matches your preferences to a route to explore, it is general information, not a medical assessment or medical advice.",
  },
  {
    q: "Is the recommendation independent?",
    a: "Yes. The result is based only on your answers, and we never sell rankings. Where we recommend a telehealth service the page carries a disclosed affiliate link, so we may earn a commission if you sign up through it, at no extra cost to you, and it never changes a conclusion. When an in-person GP is the better fit we say so, even though it pays us nothing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Which option fits you", item: `${SITE_URL}/weight-loss-quiz` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.weightLossQuiz.title,
  description: seoConfig.weightLossQuiz.description,
  url: seoConfig.weightLossQuiz.url,
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

export default function WeightLossQuizPage() {
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
            <Link href="/weight-loss" className="transition-colors hover:text-[#0a7c42]">Weight loss</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Which option fits you</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Which weight-loss option fits you?
            </h1>
            <div className="mb-6 max-w-2xl space-y-3 text-sm leading-relaxed text-[#3d4b44] sm:text-base">
              <p>
                A clinical telehealth pathway, a coaching program, or your GP, they suit different people. Answer two
                quick questions and see the route that fits your situation, with an honest reason why. About 30 seconds.
                This is general information, not medical advice, and it does not decide your eligibility.
              </p>
            </div>
          </section>

          <section className="pb-4">
            <PathwayQuiz />
          </section>

          <section className="mt-8 border-t border-[#e5e9e7] py-9">
            <h2 className="mb-4 text-xl font-extrabold tracking-tight text-[#10251b] sm:text-2xl">Prefer the full picture?</h2>
            <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                The match points you to the best-fit route, but if you want to see the detail yourself, the{" "}
                <Link href="/weight-loss" className="text-[#0a7c42] underline underline-offset-2">weight-loss hub</Link>{" "}
                covers how telehealth works, what it costs and what to watch for, and the{" "}
                <Link href="/weight-loss-cost-calculator" className="text-[#0a7c42] underline underline-offset-2">cost calculator</Link>{" "}
                estimates the monthly figure before you commit.
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
              This page matches a route based on your answers and, where relevant, contains a disclosed affiliate link.
              We may earn a commission if you sign up through it, at no extra cost to you, and it never changes a
              conclusion. We never sell rankings. It is general health information, not medical advice, and does not
              establish that any treatment is suitable for you. Our standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
