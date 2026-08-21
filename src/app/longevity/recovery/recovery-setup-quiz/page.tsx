import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import RecoveryQuizClient from "./RecoveryQuizClient";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.recoveryQuiz);

const SLUG = "/longevity/recovery/recovery-setup-quiz";

const faqs = [
  {
    q: "Does this quiz ask about my health?",
    a: "No. It asks about how often you would use a setup, what space you have, your budget and your climate. Those are the four things that actually determine what suits you, and none of them requires knowing anything about your health.",
  },
  {
    q: "Does it recommend a brand?",
    a: "No. We have tested no ice baths or saunas and have no partner in this category, so there is nothing we earn from and no list to steer you toward. The result points at our own guides on cost and comparison criteria.",
  },
  {
    q: "Is cold or heat exposure safe for everyone?",
    a: "No. Both place real stress on the cardiovascular system. If you have a heart condition, high blood pressure, are pregnant, or have a condition affecting circulation or temperature regulation, speak to a practitioner before starting rather than after. This quiz is not an assessment of whether either is safe for you.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Longevity", item: `${SITE_URL}/longevity` },
    { "@type": "ListItem", position: 3, name: "Recovery", item: `${SITE_URL}/longevity/recovery` },
    { "@type": "ListItem", position: 4, name: "Setup quiz", item: `${SITE_URL}${SLUG}` },
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
  name: seoConfig.recoveryQuiz.title,
  description: seoConfig.recoveryQuiz.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
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
          <Link href="/longevity/recovery" className="hover:text-[#0a7c42]">Recovery</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Setup quiz</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          What recovery setup <span className="italic text-[#0a7c42]">fits your place?</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Four questions about frequency, space, budget and climate. No health questions, and the result points at cost guidance rather than a product.
        </p>

        <div className="mt-8">
          <RecoveryQuizClient />
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
          <ComingSoonNote category="Recovery" />
        </div>
      </main>
    </ConsumerShell>
  );
}
