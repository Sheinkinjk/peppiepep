import Link from "next/link";
import HubOffer from "@/components/consumer/HubOffer";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSH_HAIR_URL, DENSE_URL } from "@/lib/affiliate-links";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";

export const metadata = generateSEOMetadata(seoConfig.hairLossHub);

const aff = { href: MOSH_HAIR_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const guides = [
  { href: "/best-hair-loss-treatment-australia", title: "Best hair loss treatment", desc: "Clinical telehealth versus topical products, side by side." },
  { href: "/moshhair", title: "Mosh review & offer", desc: "How the men's hair-loss telehealth service works, plus 55% off your first order." },
  { href: "/mosh-review", title: "Is Mosh legit & worth it?", desc: "An independent look at whether Mosh stacks up, what it costs, and what people raise." },
  { href: "/dense", title: "Dense Hair Experts", desc: "The topical, non-prescription route for density and scalp health." },
  { href: "/hair-loss-treatment-cost-australia", title: "What treatment costs", desc: "Over-the-counter options vs telehealth plans, with Mosh\u2019s published prices." },
  { href: "/early-signs-of-hair-loss-australia", title: "Early signs of hair loss", desc: "How to tell if you're going bald, what's normal, and when to act." },
  { href: "/how-to-stop-hair-loss-australia", title: "How to slow hair loss", desc: "The causes, what the evidence supports, and why acting early helps." },
  { href: "/online-hair-loss-treatment-australia", title: "Online hair-loss treatment", desc: "How the telehealth assessment works, and what you can and can't get online." },
  { href: "/mens-health-telehealth-australia", title: "Men's health telehealth", desc: "The wider category, and what online clinics can and cannot do." },
];

const faqs = [
  {
    q: "What are my real options for hair loss in Australia?",
    a: "Broadly two. Clinical telehealth services like Mosh can, after a practitioner assessment, provide prescription treatment where appropriate. Topical brands like Dense Hair Experts sell non-prescription products for density and scalp health. They solve different problems, and many people use one, the other, or both.",
  },
  {
    q: "Is topical treatment enough on its own?",
    a: "For early or mild thinning, a consistent topical routine can help. For active, progressing hair loss, the treatments that address the underlying cause are prescription-only, which is why the clinical pathway exists. A practitioner assessment is the way to know which applies to you.",
  },
  {
    q: "How does the telehealth route work?",
    a: "You complete an online consultation with photos, a registered practitioner reviews it individually, and if appropriate, treatment is prescribed and delivered. Some applicants are declined. It is not a shortcut past the clinical assessment; it just moves it online.",
  },
  {
    q: "Is any of this medical advice?",
    a: "No. This hub is general information about services and products. Suitability for any treatment is assessed individually by registered practitioners, and prescription medicines are prescription-only in Australia. Speak to a qualified health professional about your own situation.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  datePublished: "2026-03-16",
  dateModified: "2026-07-16",
  name: "Hair Loss in Australia: Compare Your Options",
  description:
    "Refer Labs' hair loss hub for Australians. Compare clinical telehealth and topical products, with independent guides to the main providers.",
  url: `${SITE_URL}/hair-loss`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: `${SITE_URL}${g.href}` })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function HairLossHubPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Hair loss</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Hair loss in Australia: <span className="italic text-[#0a7c42]">the options, compared properly</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              Prescription telehealth, topical products, and everything marketed in between. This hub separates the
              clinical route from the cosmetic one so you know which you are actually looking at.
            </p>
            <CodeAnswer code="REFERAL55" className="mt-6">
              The current Mosh offer for new customers is 55% off a first order with the code REFERAL55, applied by the link on this page.
            </CodeAnswer>
            <OfferSchema code="REFERAL55" />

          </div>
        </section>

        <HubOffer
          logo="/logos/mosh-tile.png"
          logoAlt="Mosh logo"
          badge="55% off"
          headline="New customers: 55% off your first Mosh order"
          code="REFERAL55"
          appliesTo="It applies to your first order rather than to later renewals, and Mosh runs as a subscription after that. Any treatment is decided by a registered practitioner after your consultation and only where clinically appropriate."
          href={MOSH_HAIR_URL}
          ctaLabel="Start the Mosh consultation (55% off)"
          dataCta="hub-hair-loss-offer"
          moreHref="/moshhair"
          moreLabel="More about the Mosh offer"
          verified="2026-08-17"
        />

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            First, which route are you on?
          </h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#f5f8f6] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a7c42]">Clinical</p>
              <h3 className="mt-3 text-xl font-bold text-[#10251b]">
                Telehealth &amp; prescription
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#3d4b44]">
                A registered practitioner assesses you and, where appropriate, prescribes the treatments that act on the
                cause of hair loss. Mosh is the main Australian men&apos;s service. This is the route for active or
                progressing loss.
              </p>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <p><Link href="/best-hair-loss-treatment-australia" className="text-[#0a7c42] hover:underline">Compare treatments →</Link></p>
                <p><Link href="/moshhair" className="text-[#0a7c42] hover:underline">Read the Mosh guide →</Link></p>
                <p><Link href="/receding-hairline-treatment-australia" className="text-[#0a7c42] hover:underline">Receding hairline: the options →</Link></p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9aa39c]">Cosmetic</p>
              <h3 className="mt-3 text-xl font-bold text-[#10251b]">
                Topical products
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#3d4b44]">
                Non-prescription shampoos, serums and scalp treatments for density and condition. Dense Hair Experts is
                the main Australian name. Best as a routine, and best paired with realistic expectations.
              </p>
              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
                <a href={DENSE_URL} target="_blank" rel="nofollow sponsored" data-cta="hair-hub-dense" className="inline-flex items-center gap-1.5 text-[#0a7c42] hover:underline">
                  Visit Dense Hair Experts <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <Link href="/dense" className="font-medium text-[#6e7b74] hover:text-[#0a7c42] hover:underline">Read our review</Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#0a7c42]/20 bg-[#0a7c42]/[0.05] px-7 py-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-[15px] leading-relaxed text-[#10251b]">
              For men leaning toward the clinical route, Mosh&apos;s online consultation is the usual starting point,
              and new customers get 55% off their first order with code REFERAL55. The code applies automatically
              through our link, so there is nothing to type.
            </p>
            <a
              {...aff}
              data-cta="hub-hair-loss"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0a7c42] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0a7c42]"
            >
              Start the Mosh consultation (55% off)
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Every guide in this hub
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.href} href={g.href} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40">
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{g.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <MatchPrompt
            href="/hair-loss-quiz"
            title="Not sure which hair-loss route fits you?"
            sub="Answer one or two quick questions and get the option that fits, clinical, topical, or your GP, and why."
            cta="Take the 30-second match"
            dataCta="hair-match-prompt"
          />

          <NewsletterSignup variant="band" source="hair-loss-hub" />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Before you start
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#2b362f]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">Information only.</span> Nothing here is medical advice or a
            recommendation of any treatment. Prescription medicines in Australia are available only after individual
            assessment by a registered practitioner. Some links are disclosed affiliate links, and commissions never
            change a comparison or a conclusion.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[#3d4b44]">
            Every current offer we hold, with the date each one was checked, is on{" "}
            <Link href="/deals" className="font-semibold text-[#0a7c42] hover:underline">the deals page</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
