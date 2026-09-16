import Link from "next/link";
import HubProviders from "@/components/consumer/HubProviders";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSH_HAIR_URL, DENSE_URL } from "@/lib/affiliate-links";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.hairLossHub);


const guides = [
  { href: "/best-hair-loss-treatment-australia", title: "Best hair loss treatment", desc: "Clinical telehealth versus topical products, side by side." },
  { href: "/moshhair", title: "Mosh review & offer", desc: "How the men's hair-loss telehealth service works, plus 55% off your first order." },
  { href: "/mosh-review", title: "Is Mosh legit & worth it?", desc: "An independent look at whether Mosh stacks up, what it costs, and what people raise." },
  { href: "/dense", title: "Dense Hair Experts", desc: "The topical, non-prescription route for density and scalp health." },
  { href: "/hair-loss-treatment-cost-australia", title: "What treatment costs", desc: "Over-the-counter options vs telehealth plans, with Mosh\u2019s published prices." },
  { href: "/early-signs-of-hair-loss-australia", title: "Early signs of hair loss", desc: "How to tell if you're going bald, what's normal, and when to act." },
  { href: "/how-to-stop-hair-loss-australia", title: "How to slow hair loss", desc: "The causes, what the evidence supports, and why acting early helps." },
  { href: "/online-hair-loss-treatment-australia", title: "Online hair-loss treatment", desc: "How the telehealth assessment works, and what you can and can't get online." },
  { href: "/mens-health", title: "Men's health", desc: "The wider category: how the access routes differ and what each costs over a year." },
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
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#627068]">
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
              clinical route from the cosmetic one so you know which you are looking at.
            </p>
            {/* Below the lead. The first paragraph after the h1 is the answer;
                a disclosure in that slot is what an engine lifts instead. Still
                above the first affiliate link, which is what it is for. */}
            <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
            <OfferSchema code="REFERAL55" />

          </div>
        </section>


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
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#627068]">Cosmetic</p>
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
                <Link href="/dense" className="font-medium text-[#5a665f] hover:text-[#0a7c42] hover:underline">Read our review</Link>
              </p>
            </div>
          </div>

        </section>


        <HubProviders
          className="pb-10"
          heading="The providers we cover"
          intro="One prescription telehealth service and one topical range, on the same four points. We earn from both, and neither can pay to be described more favourably."
          providers={[
            {
              name: "Mosh",
              logo: "/logos/mosh-tile.png",
              href: "/moshhair",
              hrefLabel: "Read our Mosh guide",
              suits: "Active or progressing loss, where a prescription route is on the table.",
              how: "Online consultation, then a registered practitioner decides what is appropriate.",
              cost: "A subscription after the first order.",
              offerCode: "REFERAL55",
              visitHref: MOSH_HAIR_URL,
              visitLabel: "Start the Mosh consultation",
              earns: true,
            },
            {
              name: "Dense Hair Experts",
              logo: "/logos/dense.png",
              href: "/dense",
              hrefLabel: "Read our Dense guide",
              suits: "Density and condition, without a prescription.",
              how: "Non-prescription shampoos, serums and scalp treatments bought direct.",
              cost: "Per product, priced on their own site.",
              visitHref: DENSE_URL,
              visitLabel: "Visit Dense Hair Experts",
              earns: true,
            },
          ]}
        />

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
            assessment by a registered practitioner.
          </p>
          <AffiliateDisclosure className="mt-3 max-w-3xl" />
          <p className="mt-6 text-sm leading-relaxed text-[#3d4b44]">
            Every current offer we hold, with the date each one was checked, is on{" "}
            <Link href="/deals" className="font-semibold text-[#0a7c42] hover:underline">the deals page</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
