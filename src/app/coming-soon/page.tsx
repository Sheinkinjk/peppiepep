import Link from "next/link";
import { ArrowRight, Sparkles, Moon } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.comingSoon);

const SLUG = "/coming-soon";

/**
 * The landing page for the "Coming Soon" nav group.
 *
 * It is not a placeholder in the usual sense: every section it points at has
 * complete, researched guides live today. What is genuinely absent is the
 * provider comparison, and this page says so in those terms rather than
 * promising a launch date we would then have to hit.
 *
 * No partner or brand is named for the unlaunched sections. Naming one before
 * an agreement exists would be a claim we cannot support.
 */

const SECTIONS = [
  {
    href: "/skin-and-beauty",
    icon: Sparkles,
    accent: "#7A5A8C",
    tint: "#F2ECF6",
    title: "Skin & Beauty",
    live: "Six guides, live now",
    body: "What over-the-counter actives do and how the prescription route differs, verified Australian device prices against the US listing, and why cosmetic clinics will not publish a price.",
    links: [
      { h: "/skin-and-beauty/led-face-mask-comparison-australia", l: "LED masks: the real AUD prices" },
      { h: "/skin-and-beauty/acne-treatment-options-and-costs-australia", l: "Acne: routes and costs" },
      { h: "/skin-and-beauty/skincare-quiz", l: "Which routine fits you?" },
    ],
  },
  {
    href: "/sleep",
    icon: Moon,
    accent: "#3D5A80",
    tint: "#E9EFF6",
    title: "Sleep",
    live: "Six guides, live now",
    body: "How sleep apnoea is actually diagnosed here, what a sleep study costs once Medicare is accounted for, verified CPAP prices, and how to compare a mattress on something other than marketing.",
    links: [
      { h: "/sleep/do-i-have-sleep-apnoea", l: "How diagnosis actually works" },
      { h: "/sleep/cpap-machine-costs-australia", l: "CPAP: verified prices" },
      { h: "/sleep/mattress-comparison-australia", l: "Comparing mattresses properly" },
    ],
  },
];

const faqs = [
  {
    q: "What does coming soon mean on Refer Labs?",
    a: "The guides in these sections are finished and free to read. What is coming is the provider comparison and any current offers, which we add only after we have checked a provider ourselves. Until then nothing in those sections earns us a commission, and we are not recommending anything to you.",
  },
  {
    q: "Why publish the guides before the comparisons?",
    a: "Because the guidance is useful on its own. Knowing how a sleep study is referred, or that an LED mask listed in US dollars is not the price you will pay here, helps whether or not we ever add a partner in that category. Holding it back until there is something to sell would be the wrong way round.",
  },
  {
    q: "When will these sections be finished?",
    a: "We are not giving a date, because it depends on finding providers we are prepared to put our name to rather than on a content schedule. We would rather be late than list someone we have not checked. Join the list below and you will hear when a section is genuinely ready.",
  },
  {
    q: "What other categories are planned?",
    a: "Longevity and sexual health are both under consideration and neither has started. Sexual health in particular has to be written entirely around access pathways and costs, because advertising prescription medicines to the public is prohibited in Australia, and we will not publish it until that is right.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Coming soon", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Categories in progress",
  itemListElement: SECTIONS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}${s.href}`,
  })),
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
  name: seoConfig.comingSoon.title,
  description: seoConfig.comingSoon.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function ComingSoonPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Coming soon</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              What we&apos;re <span className="italic text-[#0a7c42]">building next</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              Two new categories are underway. The guides in both are finished and free to read today. What is still
              missing is the provider comparison, which we add only once we have checked someone ourselves, so nothing
              in these sections earns us a commission yet.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.href} className="rounded-2xl border border-[#e5e9e7] bg-white p-7">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: s.tint }}
                    >
                      <Icon className="h-5 w-5" style={{ color: s.accent }} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-[#10251b]">{s.title}</h2>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">{s.live}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#3d4b44]">{s.body}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {s.links.map((l) => (
                      <li key={l.h}>
                        <Link href={l.h} className="font-semibold text-[#0a7c42] hover:underline">{l.l}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#10251b] hover:text-[#0a7c42]"
                  >
                    All {s.title.toLowerCase()} guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              How this works
            </h2>
            <dl className="mt-7 max-w-3xl divide-y divide-[#e5e9e7]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Categories that are already live
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
              These have the comparisons and current offers in place.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <li><Link href="/weight-loss" className="text-[#0a7c42] hover:underline">Weight loss</Link></li>
              <li><Link href="/hair-loss" className="text-[#0a7c42] hover:underline">Hair loss</Link></li>
              <li><Link href="/pet-insurance" className="text-[#0a7c42] hover:underline">Pets</Link></li>
              <li><Link href="/deals" className="text-[#0a7c42] hover:underline">All current offers</Link></li>
            </ul>
          </div>
          <div className="mt-10 max-w-2xl">
            <NewsletterSignup />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
