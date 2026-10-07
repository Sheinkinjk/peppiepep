import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { StepTrack } from "@/components/brand/StepTrack";
import { HubObject, type ObjectKind } from "@/components/home/Objects";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { DEALS } from "@/lib/offers";
import { FACTS } from "@/lib/facts/registry";
import { SEARCH_INDEX as searchIndex } from "@/lib/search-index";

export const metadata = generateSEOMetadata(seoConfig.about);

/*
 * Rebuilt 27 Sep 2026. The previous version opened "run by one person" and named
 * the founder, in seven paragraphs of prose that read as a generated description
 * of itself. Jarred's brief: the page has to read like the institution it is
 * registered as, on the same design system as every other page, and name no
 * individual.
 *
 * What it may and may not say. Pepform Pty Ltd trading as Refer Labs is a real
 * company with a real ABN on the register since 2022, so the company voice is
 * accurate. It may not claim a team size, offices, experts or reviewers that do
 * not exist: an overstated claim here is the same exposure as a fabricated
 * testimonial. Every number on the page is derived from the code that produces
 * the site (the navigation, the offers table, the observation log, the search
 * index) rather than typed, so it cannot go stale.
 *
 * The ids how-we-research, how-we-rank and corrections are linked from other
 * pages and from the Organization schema. Keep them.
 */

const categories: { href: string; label: string; object: ObjectKind }[] = [
  { href: "/weight-loss", label: "Weight loss", object: "scale" },
  { href: "/hair-loss", label: "Hair loss", object: "comb" },
  { href: "/health-and-beauty", label: "Health & beauty", object: "bottle" },
  { href: "/mens-health", label: "Men's health", object: "pulse" },
  { href: "/sleep", label: "Sleep", object: "pillow" },
  { href: "/longevity", label: "Longevity", object: "hourglass" },
  { href: "/business-software", label: "Business software", object: "browser" },
  { href: "/home-battery-cost-australia", label: "Home batteries", object: "battery" },
];

const numbers = [
  { n: String(searchIndex.length), k: "guides, comparisons and tools" },
  { n: String(DEALS.filter((d) => d.code).length), k: "discount codes held, each stated in full" },
  { n: String(DEALS.filter((d) => d.verified).length), k: "offers carrying the date each was checked" },
  { n: String(FACTS.length), k: "observations in the public log" },
];

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

const H2 = "text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl";
const P = "mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]";

export default function AboutPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#14120f]">About</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="max-w-3xl">
              <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
                About Refer Labs
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
                Refer Labs compares the services Australians pay for and find hard to price: telehealth, health and
                beauty, sleep, longevity and home batteries. Every figure is read from the provider&apos;s
                own published page and carries the date it was read. Where a link pays a commission, the page says so
                beside it, and no provider can pay for its position.
              </p>
            </div>
            <EdgeObject kind="balance" className="lg:mt-14">
              <div className="rounded-2xl border border-[#ded8cd] bg-white p-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#007a95]">Refer Labs today</p>
                <dl className="mt-4 grid grid-cols-2 gap-5">
                  {numbers.map((x) => (
                    <div key={x.k}>
                      <dt className="text-3xl font-bold tracking-[-0.02em] text-[#14120f]">{x.n}</dt>
                      <dd className="mt-1 text-[13px] leading-snug text-[#56504a]">{x.k}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[12px] leading-relaxed text-[#766f66]">
                  Counted from the site itself, not typed in, so these figures move when the site does.
                </p>
              </div>
            </EdgeObject>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className={H2}>What we cover</h2>
          <p className={P}>
            Categories where the marketing is loud and the pricing is hard to compare. Each has its own section,
            with comparisons, cost guides and a tool that matches a reader to an option.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="group flex items-center gap-3 rounded-xl border border-[#ded8cd] bg-white p-3 text-sm font-semibold text-[#14120f] transition-colors hover:border-[#14120f] hover:text-[#007a95]"
                >
                  <HubObject kind={c.object} size={36} className="hy-obj" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="how-we-research" className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2}>How a page is made</h2>
            <div style={{ "--n": 4 } as React.CSSProperties}>
            <StepTrack
              steps={[
                { title: "Read the source", object: "lens", body: "Prices, plan inclusions, eligibility and terms are taken from the provider's own live page and published terms. Never from an aggregator, a directory or a press release." },
                { title: "Record the date", object: "document", body: "Each figure carries the day it was read. Offers carry their own date, and the observation log keeps every check rather than overwriting the last one." },
                { title: "Compare on the same rows", object: "balance", body: "Every provider in a category is described on identical terms: who it suits, how it works, what it costs, and any current offer. Where two tie on the facts, the page says so." },
                { title: "Disclose beside the link", object: "badge", body: "Where a link pays a commission, the page states it above that link, in the words the partner requires where a partner requires particular words." },
              ]}
            />
            </div>
            <p className={P}>
              This is desk research. Refer Labs does not use most of what it covers and does not claim to. For services
              that cannot be tried, such as online consultations, the pages describe the published process and link
              to the source so a reader can check it. Terms change, so every page quoting a price asks the reader to
              confirm current pricing with the provider before committing.
            </p>
          </div>
        </section>

        <section id="how-we-rank" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className={H2}>How providers are ordered</h2>
          <p className={P}>
            Category hubs list providers alphabetically and do not rank them. Where a comparison page names a first
            pick, the order comes from the same checklist each time: the published price and what it includes,
            eligibility and who the provider serves, what is bundled against what is billed separately,
            cancellation and refund terms, delivery and follow-up, and availability in Australia. Those are weighed
            against who each option suits, because the right pick for one reader is the wrong pick for another, so
            pages say who each option fits rather than crowning one winner. Commission plays no part in the order,
            and a provider that pays nothing can and does sit above one that does.
          </p>
        </section>

        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2}>What Refer Labs does not publish</h2>
            <ul className="mt-5 grid max-w-4xl gap-4 sm:grid-cols-2">
              {[
                ["Star ratings of its own", "Where a rating appears it belongs to a third party and is attributed, so the reader can weigh the source."],
                ["Testimonials, case studies or invented statistics", "None, in any category. On health pages this is also the law."],
                ["Paid placement", "No provider has paid to be added to a comparison, to rank higher, or to have a criticism removed."],
                ["The name of any prescription medicine", "Health pages describe the service and the process. What is appropriate for a reader is a practitioner's decision."],
              ].map(([t, b]) => (
                <li key={t} className="rounded-2xl border border-[#ded8cd] bg-white p-5">
                  <p className="text-[15px] font-bold text-[#14120f]">{t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#56504a]">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className={H2}>Standards you can check</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: "/how-we-make-money", t: "How Refer Labs is funded", b: "What pays for the site, and the line between that and what it publishes." },
              { href: "/data", t: "The observation log", b: "Every price and offer check, with its date and method, kept rather than overwritten." },
              { href: "/deals", t: "Current offers, dated", b: "Each code with the day it was last confirmed on the provider's own page." },
            ].map((x) => (
              <li key={x.href}>
                <Link href={x.href} className="group block h-full rounded-2xl border border-[#ded8cd] bg-white p-5 transition-colors hover:border-[#007a95]/40">
                  <p className="text-[15px] font-bold text-[#14120f] group-hover:text-[#007a95]">{x.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#56504a]">{x.b}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="corrections" className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2}>Corrections</h2>
            <p className={P}>
              Prices, plan inclusions and offer terms change between checks. Report the page and the figure through
              the <Link href="/contact" className="font-semibold text-[#007a95] underline">contact page</Link>, and the
              claim is re-checked against the provider&apos;s own published page and corrected in place or removed.
              Comparison pages carry the date they were last checked and offers carry the date each was verified, so
              the currency of a figure is visible before anyone relies on it. A provider disputing something published
              here gets the same process and no more weight than a reader; a commercial relationship is not grounds for
              removing a criticism.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className={H2}>The company</h2>
              <p className={P}>
                Refer Labs is operated by Pepform Pty Ltd, trading as Refer Labs, ABN 32 660 008 159, on the
                Australian Business Register since 16 August 2022. It is an Australian publisher and is not the
                manufacturer, prescriber or provider of anything it covers; it holds no stock and dispenses nothing.
                For health topics everything on the site is general information, not medical advice, and prescription
                treatments in Australia are available only after assessment by a registered practitioner.
              </p>
            </div>
            <div>
              <h2 className={H2}>Get in touch</h2>
              <p className={P}>
                Corrections, questions about a comparison, and businesses that want to be compared all go through the{" "}
                <Link href="/contact" className="font-semibold text-[#007a95] underline">contact page</Link>. Being
                compared is free and cannot be bought; how a business applies is set out on the{" "}
                <Link href="/partner-with-refer-labs" className="font-semibold text-[#007a95] underline">partner page</Link>.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <NewsletterSignup variant="band" />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
