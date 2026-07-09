import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.about);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Refer Labs",
  url: `${SITE_URL}/about`,
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

export default function AboutPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">About</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">About</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
          About Refer Labs
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Refer Labs is an independent Australian comparison platform. We help people choose between health services,
          software and tools by researching the options properly and writing up what we find, in plain language, with
          the fine print read.
        </p>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-[#10251b]">What we do</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              We publish independent comparisons and guides across a growing set of categories, from weight-loss and
              hair-loss telehealth to website builders, newsletter platforms, AI sales tools and more. Each guide is
              built to answer a real question: which option fits you, what it actually costs, and what the catch is. We
              cover Australians first, and note clearly when a product or service is only available in another region.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#10251b]">How we stay independent</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              Many pages contain affiliate links. If you sign up or buy through one, we may earn a commission at no extra
              cost to you. That is how the research is funded. It does not buy a better ranking, a place on a list, or a
              softened conclusion, a brand cannot pay for any of those. Where a link earns us a commission, the page says
              so plainly. The full detail is in{" "}
              <Link href="/how-we-research" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/40 underline-offset-4">
                how we research
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#10251b]">Who this is for</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              Anyone weighing up a decision and wanting an honest, readable comparison rather than a sales pitch. For
              health topics, everything here is general information, not medical advice, and prescription treatments in
              Australia are only available after assessment by a registered practitioner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#10251b]">Get in touch</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              Found an error, want to suggest something to compare, or want to partner with us? Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/40 underline-offset-4">
                jarred@referlabs.com.au
              </a>
              . Corrections are welcome, accuracy is the product.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-[#e5e9e7] pt-8">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
            Browse all guides &amp; comparisons &rarr;
          </Link>
        </div>
      </main>
    </ConsumerShell>
  );
}
