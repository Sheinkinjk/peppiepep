import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import { CATALOG, getVertical, type Provider } from "@/lib/catalog/catalog";

// Only catalog slugs are valid — anything else is a real 404, not a soft-404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVertical(slug);
  if (!v) return {};
  return generateSEOMetadata({
    title: v.metaTitle,
    description: v.metaDescription,
    url: `${SITE_URL}/compare/${v.slug}`,
    keywords: v.keywords,
  });
}

function ProviderCard({ p }: { p: Provider }) {
  const href = p.affiliateUrl ?? p.externalUrl ?? p.reviewHref ?? "#";
  const isAff = Boolean(p.affiliateUrl);
  return (
    <div className={`flex flex-col rounded-2xl border bg-white/[0.03] p-6 shadow-[0_2px_24px_-16px_rgba(0,0,0,0.2)] ${p.featured ? "border-[#22d3ee]/30" : "border-white/[0.08]"}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white">{p.name}</h3>
        {p.featured && <span className="rounded-full bg-[#0e7490]/10 px-2.5 py-1 text-[11px] font-bold text-[#22d3ee]">Top pick</span>}
      </div>
      <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#22d3ee]">{p.bestFor}</p>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">{p.blurb}</p>
      <dl className="mt-4 divide-y divide-white/[0.08] text-sm">
        {p.facts.map((f) => (
          <div key={f.label} className="flex gap-3 py-2">
            <dt className="w-20 shrink-0 text-white/40">{f.label}</dt>
            <dd className="text-white/80">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={href}
          target="_blank"
          rel={isAff ? "nofollow sponsored" : "nofollow"}
          data-cta={`catalog-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="group inline-flex items-center gap-2 rounded-full bg-[#0e7490] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0891b2]"
        >
          {p.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
        {p.reviewHref && (
          <Link href={p.reviewHref} className="text-sm font-semibold text-white underline decoration-white/20 underline-offset-4 hover:decoration-[#22d3ee]">
            Read review
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVertical(slug);
  if (!v) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: v.metaTitle, item: `${SITE_URL}/compare/${v.slug}` },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: v.metaTitle,
    description: v.metaDescription,
    url: `${SITE_URL}/compare/${v.slug}`,
    inLanguage: "en-AU",
    isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: v.providers.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name })),
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

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
            <Link href="/guides" className="hover:text-[#22d3ee]">Compare</Link>
            <span>/</span>
            <span className="text-white/70">{v.h1Lead}</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22d3ee]">{v.eyebrow}</p>
            <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-white sm:text-5xl">
              {v.h1Lead} <span className="italic text-[#22d3ee]">{v.h1Accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{v.intro}</p>
          </div>
          {v.note && (
            <p className="mt-8 max-w-3xl rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-xs leading-relaxed text-white/55">
              {v.note}
            </p>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {v.providers.map((p) => (
              <ProviderCard key={p.name} p={p} />
            ))}
          </div>
          {v.roundupHref && (
            <p className="mt-8 text-sm">
              <Link href={v.roundupHref.href} className="font-semibold text-[#22d3ee] underline decoration-[#22d3ee]/30 underline-offset-4">
                {v.roundupHref.label} →
              </Link>
            </p>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup variant="band" source={`compare-${v.slug}`} />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {v.faqs.map((f) => (
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
            Some links are disclosed affiliate links. See{" "}
            <Link href="/how-we-research" className="font-semibold text-[#22d3ee] underline decoration-[#22d3ee]/30 underline-offset-4">how we research</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
