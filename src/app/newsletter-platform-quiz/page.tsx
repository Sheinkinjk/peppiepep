import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterQuiz from "./NewsletterQuiz";

export const metadata = generateSEOMetadata(seoConfig.newsletterPlatformQuiz);

const faqs = [
  {
    q: "How do I choose a newsletter platform?",
    a: "Start with your goal. If you want to grow fast and make money from it, beehiiv is built for growth and monetisation and lets you keep ownership of your list. If you want the simplest start with readers built in, Substack is hard to beat, though it takes a cut. If automation, sequences and funnels matter most, Kit (ConvertKit) is the creator-automation choice. This match asks one question and points you to the fit.",
  },
  {
    q: "Is beehiiv better than Substack?",
    a: "For growth and monetisation, beehiiv gives you more control, native ad and referral tools, and list ownership. Substack wins on simplicity and its built-in discovery network, at the cost of a revenue share and less control. Neither is universally better, it depends on whether you're optimising for reach-from-day-one or for owning and monetising your audience.",
  },
  {
    q: "Is the recommendation independent?",
    a: "Yes. The result is based only on your answer, and we never sell rankings. We're affiliated with beehiiv, so its page carries a disclosed affiliate link and we may earn a commission if you sign up through it, at no extra cost to you. We're not affiliated with Substack or Kit, and we still recommend them when they fit better, that's the point.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Newsletter platforms", item: `${SITE_URL}/best-newsletter-platform` },
    { "@type": "ListItem", position: 3, name: "Which platform should you use", item: `${SITE_URL}/newsletter-platform-quiz` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.newsletterPlatformQuiz.title,
  description: seoConfig.newsletterPlatformQuiz.description,
  url: seoConfig.newsletterPlatformQuiz.url,
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

export default function NewsletterPlatformQuizPage() {
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
            <Link href="/best-newsletter-platform" className="transition-colors hover:text-[#0a7c42]">Newsletter platforms</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Which platform should you use</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl lg:text-[2.6rem]">
              Which newsletter platform should you use?
            </h1>
            <div className="mb-6 max-w-2xl space-y-3 text-sm leading-relaxed text-[#3d4b44] sm:text-base">
              <p>
                beehiiv, Substack and Kit each win at a different job, growth and monetisation, a simple start, or
                automation. Answer one quick question and get the one that fits your goal, with an honest reason why.
                About 20 seconds.
              </p>
            </div>
          </section>

          <section className="pb-4">
            <NewsletterQuiz />
          </section>

          <section className="mt-8 border-t border-[#e5e9e7] py-9">
            <h2 className="mb-4 text-xl font-extrabold tracking-tight text-[#10251b] sm:text-2xl">Prefer the full picture?</h2>
            <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              <p>
                The match points you to the best fit, but if you want the trade-offs yourself, the{" "}
                <Link href="/best-newsletter-platform" className="text-[#0a7c42] underline underline-offset-2">full roundup</Link>{" "}
                lays all three out side by side, and the{" "}
                <Link href="/compare/newsletter-platforms" className="text-[#0a7c42] underline underline-offset-2">category hub</Link>{" "}
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
              This page recommends a platform based on your answer and contains a disclosed affiliate link where we're
              affiliated (beehiiv). We may earn a commission if you sign up through it, at no extra cost to you, and it
              never changes a conclusion. We never sell rankings. Our standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
