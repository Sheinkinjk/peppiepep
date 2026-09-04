import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import MensHealthQuiz from "@/components/consumer/MensHealthQuiz";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.mensHealthQuiz);

const SLUG = "/mens-health/mens-health-quiz";

const faqs = [
  {
    q: "Does this quiz ask about symptoms or health history?",
    a: "No. It asks four questions about whether your GP bulk bills, how much privacy matters to you, how often you would expect to consult, and how quickly you want to be seen. It collects no health information at all, because a marketing page has no business gathering it and because a tool that inferred a condition from your answers would be a different kind of thing entirely.",
  },
  {
    q: "Will my answers be stored against my email?",
    a: "No. If you choose to join the notification list, we store the email address only. The quiz result is not attached to it and is not sent to us, which is deliberate in a category like this one.",
  },
  {
    q: "Does the quiz recommend a treatment?",
    a: "It recommends an access route to consider, comparing a GP against online services on cost, speed and privacy. It does not name medicines, does not suggest what might be appropriate for you, and is not an assessment. Those decisions belong to a registered practitioner.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men's Health", item: `${SITE_URL}/mens-health` },
    { "@type": "ListItem", position: 3, name: "Men's health quiz", item: `${SITE_URL}${SLUG}` },
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
  name: seoConfig.mensHealthQuiz.title,
  description: seoConfig.mensHealthQuiz.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function MensHealthQuizPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/mens-health" className="hover:text-[#0a7c42]">Men&apos;s health</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Quiz</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Which men&apos;s health route <span className="italic text-[#0a7c42]">fits you?</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Four questions about cost, privacy and how you prefer to consult. No health questions, no email wall, and the
          result points at guidance on access and pricing rather than at a product.
        </p>

        <div className="mt-8">
          <MensHealthQuiz />
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
          <ComingSoonNote category="Men's health" />
        </div>
        <PartnerRoute
          className="mt-12"
          heading="Where to go next"
          intro="Whichever route the quiz points you to, one Australian provider we work with covers most of these areas."
          providers={[
            {
              name: "Midoc",
              href: "/go/midoc-mens-health-quiz",
              what: "Consultations from $49 across general, sexual health, hair loss and men's health lines, plus certificates from $18. Nationally, phone or video.",
              checked: "3 September 2026",
            },
          ]}
        />
      </main>
    </ConsumerShell>
  );
}
