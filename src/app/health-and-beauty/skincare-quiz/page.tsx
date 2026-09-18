import Link from "next/link";
import { SectionMark } from "@/components/brand/SectionMark";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import SkincareQuiz from "@/components/consumer/SkincareQuiz";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.skincareQuiz);

const SLUG = "/health-and-beauty/skincare-quiz";

const faqs = [
  {
    q: "Does the skincare quiz ask about my skin condition?",
    a: "No. It asks only what you are trying to improve in general terms, how much effort you will keep up, what you want to spend, and whether you are open to seeing a practitioner. It does not collect symptoms or medical history, because it is a preference matcher rather than an assessment and should not be mistaken for one.",
  },
  {
    q: "Do I have to give my email to see the result?",
    a: "No. The result appears as soon as you finish the questions. There is an optional signup underneath if you want to be told when we have researched providers in this category, but nothing is held back if you skip it.",
  },
  {
    q: "Is the quiz recommending products or brands?",
    a: "Not currently. We have no skincare partner, so there is no brand we earn from and nothing to steer you toward. The result points at our own guides. When we do add providers, we will disclose it on the page as we do everywhere else.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Health & Beauty", item: `${SITE_URL}/health-and-beauty` },
    { "@type": "ListItem", position: 3, name: "Skincare quiz", item: `${SITE_URL}${SLUG}` },
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
  name: seoConfig.skincareQuiz.title,
  description: seoConfig.skincareQuiz.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function SkincareQuizPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <Link href="/health-and-beauty" className="hover:text-[#007a95]">Skin &amp; beauty</Link>
          <span>/</span>
          <span className="text-[#14120f]">Skincare quiz</span>
        <SectionMark kind="bottle" size={56} /></nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#14120f] sm:text-4xl">
          Which skincare approach <span>fits you?</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
          Four questions about what you want and what you will realistically keep up. No health questions, no email
          wall, and the result points at guidance rather than a product.
        </p>
        {/* This page used to take its disclosure from ComingSoonNote, which was
            removed on 16 Sep 2026 when the section went live. The note is gone;
            the duty to disclose above the first affiliate link is not. */}
        <AffiliateDisclosure compact className="mt-4 max-w-3xl" />

        <div className="mt-8">
          <SkincareQuiz />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">About this quiz</h2>
          <dl className="mt-5 divide-y divide-[#f1ede4] rounded-2xl border border-[#ded8cd] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <PartnerRoute
          className="mt-12"
          heading="Where to go next"
          intro="Your answers stay in your browser. This is simply where to buy if you want to act on the result."
          providers={[
            {
              name: "Edible Beauty Australia",
              href: "/go/edible-beauty-skincare-quiz",
              what: "An Australian natural skincare range, priced in Australian dollars and shipped domestically.",
            },
          ]}
        />
      </main>
    </ConsumerShell>
  );
}
