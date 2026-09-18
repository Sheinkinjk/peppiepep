import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
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
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#14120f]">About</span>
        <SectionMark kind="balance" size={56} /></nav>

        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
          About Refer Labs
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
          Refer Labs is an independent Australian comparison platform, run by one person and trading since
          16 August 2022. We compare health services, software and tools by reading each provider&apos;s own page,
          recording the date we read it, and publishing what we find in plain language. Some links earn a commission and
          every one of them is disclosed. Rankings are never sold.
        </p>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-[#14120f]">What we do</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              We publish independent comparisons and guides across a growing set of categories, from weight-loss and
              hair-loss telehealth to website builders, newsletter platforms, AI sales tools and more. Each guide is
              built to answer a real question: which option fits you, what it costs, and what the catch is. We
              cover Australians first, and note clearly when a product or service is only available in another region.
            </p>
          </section>

          {/* Merged in from the retired /how-we-research (July 2026). Keep every claim
              below literally true and provable. Do not add one without checking it
              first: this is the page whose whole job is trust, and an overstated
              claim here is the same exposure as a fabricated testimonial. */}
          <section id="how-we-research">
            <h2 className="text-lg font-bold text-[#14120f]">How we research</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              Prices, plan tiers, fees and eligibility come from the provider&apos;s own live pages and published terms,
              checked when we last reviewed the page. We do not take figures from aggregators, directories or press releases.
              This is desk research: we do not test or personally use most of what we cover, and we do not claim to. For
              services we cannot use ourselves, such as prescription telehealth, we describe the published process and
              link to the source so you can check it. Terms change, so every page quoting a price asks you to confirm
              current pricing with the provider before you commit.
            </p>
          </section>

          <section id="how-we-rank">
            <h2 className="text-lg font-bold text-[#14120f]">How we rank</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              When a page orders providers or names a first pick, the order comes from the same checklist every time:
              published price and what the price includes; eligibility and who the provider serves; what is
              bundled versus billed separately; cancellation and refund terms; delivery, support and follow-up; and
              availability in Australia. We weigh those against who each provider suits, because the right pick for one
              reader is the wrong pick for another, and we say who each option fits rather than crowning one winner for
              everyone. Where two providers tie on the facts, we say that too. Commission rates play no part in the
              order, and a provider we earn nothing from can and does outrank one we partner with.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#14120f]">How we are paid</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              Many pages contain affiliate links. If you sign up or buy through one, we may earn a commission at no extra
              cost to you. That is how the research is funded. A brand cannot pay to rank higher, to be added to a
              comparison, or to have a criticism removed, and commercial relationships never change the order of a list
              or the substance of a conclusion. Where a link earns us a commission, the page says so plainly rather than
              burying it in a policy you have to hunt for.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#14120f]">What we do not publish</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              We do not score products out of five, award badges, or publish customer testimonials, case studies or
              invented statistics. Where a rating or figure appears it belongs to a third party and is attributed to
              them so you can weigh the source. If something we have published is out of date or wrong, we correct it,
              and we would rather hear about it from you than leave it standing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#14120f]">Who this is for</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              Anyone weighing up a decision who wants the pricing, the trade-offs and the fine print in one place. For
              health topics, everything here is general information, not medical advice, and prescription treatments in
              Australia are only available after assessment by a registered practitioner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#14120f]">Who we are</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              Refer Labs is a small independent Australian publisher, operated by Pepform Pty Ltd trading as Refer Labs,
              ABN 32 660 008 159, registered on the Australian Business Register since 16 August 2022. It is
              founded and run by Jarred Krowitz, who researches and writes the comparisons
              here. There is no content team and no outsourced writing pool: if a page is wrong, one person is
              accountable for it, and you can reach him directly at jarred@referlabs.com.au. We are not the
              manufacturer, prescriber or provider of anything we cover, and we hold no stock and dispense nothing.
            </p>
          </section>

          {/* A findable corrections section, not a sentence buried in "contact us".
              The Organization schema points correctionsPolicy and
              actionableFeedbackPolicy here, and a policy property that resolves to
              nothing in particular is worth less than no property at all. Describes
              what actually happens, with no commitment we do not already meet. */}
          <section id="corrections">
            <h2 className="text-lg font-bold text-[#14120f]">Corrections</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              Prices, plan inclusions and offer terms change, and pages here go out of date between checks. If something
              is wrong, email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#007a95] underline decoration-[#007a95]/40 underline-offset-4">
                jarred@referlabs.com.au
              </a>{" "}
              and say which page and which figure. Every claim gets re-checked against the provider&apos;s own published
              page rather than an aggregator, and the page is corrected or the claim removed. Corrections are made in
              place: comparison pages carry the date they were last checked, and offers carry the date each one was
              verified, so you can see how current a figure is before you rely on it.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#14120f]">
              A provider disputing something we have published gets the same process, and no more weight than a reader.
              A commercial relationship is not grounds for removing a criticism.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#14120f]">Get in touch</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#14120f]">
              Found an error, want to suggest something to compare, or want to partner with us? Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#007a95] underline decoration-[#007a95]/40 underline-offset-4">
                jarred@referlabs.com.au
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-[#ded8cd] pt-8">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#007a95]">
            Browse all guides &amp; comparisons &rarr;
          </Link>
        </div>
      </main>
    </ConsumerShell>
  );
}
