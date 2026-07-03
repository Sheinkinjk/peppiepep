import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";

export const metadata = generateSEOMetadata(seoConfig.hairLossHub);

const aff = { href: MOSH_HAIR_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const guides = [
  { href: "/best-hair-loss-treatment-australia", title: "Best hair loss treatment", desc: "Clinical telehealth versus topical products, side by side." },
  { href: "/moshhair", title: "Mosh review & offer", desc: "How the men's hair-loss telehealth service works, and the current referral offer." },
  { href: "/dense", title: "Dense Hair Experts", desc: "The topical, non-prescription route for density and scalp health." },
  { href: "/mens-health-telehealth-australia", title: "Men's health telehealth", desc: "The wider category, and what online clinics can and cannot do." },
];

const faqs = [
  {
    q: "What are my real options for hair loss in Australia?",
    a: "Broadly two. Clinical telehealth services like Mosh can, after a practitioner assessment, provide prescription treatments such as finasteride and minoxidil. Topical brands like Dense Hair Experts sell non-prescription products for density and scalp health. They solve different problems, and many people use one, the other, or both.",
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
  name: "Hair Loss in Australia: Compare Your Options",
  description:
    "Refer Labs' hair loss hub for Australians. Compare clinical telehealth and topical products, with independent guides to the main providers.",
  url: `${SITE_URL}/hair-loss`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
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
          <nav className="mb-7 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-[#22d3ee]">Refer Labs</Link>
            <span>/</span>
            <span className="text-white/70">Hair loss</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22d3ee]">Category hub · Australia</p>
            <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-white sm:text-5xl">
              Hair loss in Australia: <span className="italic text-[#22d3ee]">the options, compared properly</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Prescription telehealth, topical products, and everything marketed in between. This hub separates the
              clinical route from the cosmetic one so you know which you are actually looking at.
            </p>
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-xs leading-relaxed text-white/55">
            <span className="font-semibold text-white/70">Information only.</span> Nothing here is medical advice or a
            recommendation of any treatment. Prescription medicines in Australia are available only after individual
            assessment by a registered practitioner. Some links are disclosed affiliate links.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white sm:text-3xl">
            First, which route are you on?
          </h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#22d3ee]/30 bg-white/[0.03] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22d3ee]">Clinical</p>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white">
                Telehealth &amp; prescription
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                A registered practitioner assesses you and, where appropriate, prescribes the treatments that act on the
                cause of hair loss. Mosh is the main Australian men&apos;s service. This is the route for active or
                progressing loss.
              </p>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <p><Link href="/best-hair-loss-treatment-australia" className="text-[#22d3ee] hover:underline">Compare treatments →</Link></p>
                <p><Link href="/moshhair" className="text-[#22d3ee] hover:underline">Read the Mosh guide →</Link></p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Cosmetic</p>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white">
                Topical products
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                Non-prescription shampoos, serums and scalp treatments for density and condition. Dense Hair Experts is
                the main Australian name. Best as a routine, and best paired with realistic expectations.
              </p>
              <p className="mt-5 text-sm font-semibold">
                <Link href="/dense" className="text-[#22d3ee] hover:underline">See the Dense guide →</Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#22d3ee]/20 bg-[#0e7490]/[0.05] px-7 py-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-[15px] leading-relaxed text-white/80">
              For men leaning toward the clinical route, Mosh&apos;s online consultation is the usual starting point.
              The referral applies automatically through our link.
            </p>
            <a
              {...aff}
              data-cta="hub-hair-loss"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0e7490] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0891b2]"
            >
              Start the Mosh consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        <section className="border-y border-white/[0.08] bg-white/[0.03]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white sm:text-3xl">
              Every guide in this hub
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.href} href={g.href} className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-[#22d3ee]/40">
                  <h3 className="text-[15px] font-bold text-white group-hover:text-[#22d3ee]">{g.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup variant="band" source="hair-loss-hub" />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white sm:text-3xl">
            Before you dive in
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                  {f.q}
                  <span className="text-xl leading-none text-[#22d3ee] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/55">
            How this hub is funded and researched:{" "}
            <Link href="/how-we-research" className="font-semibold text-[#22d3ee] underline decoration-[#22d3ee]/30 underline-offset-4">
              our editorial standards
            </Link>
            .
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
