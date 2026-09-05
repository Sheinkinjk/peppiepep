import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import HairLossQuiz from "./HairLossQuiz";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.hairLossQuiz);

const faqs = [
  {
    q: "How do I choose a hair-loss treatment in Australia?",
    a: "Start with the approach you want. A clinical, prescription-based route points to a men's telehealth service like Mosh, where a registered practitioner decides if treatment is appropriate. A non-prescription route points to a topical, cosmetic routine like Dense. If you are unsure of the cause or want to be seen in person, start with your GP. This match asks one or two questions and points you to the route that fits, and why.",
  },
  {
    q: "Is telehealth or a topical product better for hair loss?",
    a: "They do different jobs. Clinical telehealth can involve prescription treatment after a practitioner assessment; topical products are cosmetic and non-prescription, best as an ongoing routine. Which suits you depends on how far you want to go and whether a practitioner considers treatment appropriate. Neither is a guaranteed result.",
  },
  {
    q: "Does the match decide if I am eligible for treatment?",
    a: "No. Eligibility for any prescription treatment is decided only by a registered practitioner after they assess you individually. This tool matches your preferences to a route to explore, it is general information, not medical advice.",
  },
  {
    q: "Is the recommendation independent?",
    a: "Yes. The result is based only on your answers, and we never sell rankings. Where we recommend a service the page carries a disclosed affiliate link, so we may earn a commission if you sign up through it, at no extra cost to you, and it never changes a conclusion. When a GP is the better first step we say so, even though it pays us nothing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair loss", item: `${SITE_URL}/hair-loss` },
    { "@type": "ListItem", position: 3, name: "Which option fits you", item: `${SITE_URL}/hair-loss-quiz` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.hairLossQuiz.title,
  description: seoConfig.hairLossQuiz.description,
  url: seoConfig.hairLossQuiz.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: pageDates("/hair-loss-quiz")?.updated ?? "2026-07-08",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function HairLossQuizPage() {
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
            <Link href="/hair-loss" className="transition-colors hover:text-[#0a7c42]">Hair loss</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Which option fits you</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Which hair-loss option fits you?
            </h1>
            <div className="mb-6 max-w-2xl space-y-3 text-sm leading-relaxed text-[#3d4b44] sm:text-base">
              <p>
                A clinical telehealth route, a topical routine, or your GP, they suit different people. Answer one or two
                quick questions and see the route that fits, and why. About 30 seconds. This is general
                information, not medical advice, and it does not decide your eligibility.
              </p>
            </div>
          </section>

          <section className="pb-4">
            <HairLossQuiz />
          </section>

          <section className="mt-8 border-t border-[#e5e9e7] py-9">
            <h2 className="mb-4 text-xl font-extrabold tracking-tight text-[#10251b] sm:text-2xl">Prefer the full picture?</h2>
            <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                The match points you to the best-fit route, but if you want the detail yourself, the{" "}
                <Link href="/hair-loss" className="text-[#0a7c42] underline underline-offset-2">hair-loss hub</Link>{" "}
                and the{" "}
                <Link href="/best-hair-loss-treatment-australia" className="text-[#0a7c42] underline underline-offset-2">full comparison</Link>{" "}
                lay out clinical telehealth and topical products side by side.
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
              establish that any treatment is suitable for you.
            </p>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
