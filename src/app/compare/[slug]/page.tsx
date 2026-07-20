import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import RelatedGuides from "@/components/consumer/RelatedGuides";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import { CATALOG, getVertical, type Provider } from "@/lib/catalog/catalog";

// Only catalog slugs are valid, anything else is a real 404, not a soft-404.
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
    <div className={`flex flex-col rounded-2xl border bg-[#f5f8f6] p-6 shadow-[0_2px_24px_-16px_rgba(0,0,0,0.2)] ${p.featured ? "border-[#0a7c42]/30" : "border-[#e5e9e7]"}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-[#10251b]">{p.name}</h3>
        {p.featured && <span className="rounded-full bg-[#0a7c42]/10 px-2.5 py-1 text-[11px] font-bold text-[#0a7c42]">Top pick</span>}
      </div>
      <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0a7c42]">{p.bestFor}</p>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#3d4b44]">{p.blurb}</p>
      <dl className="mt-4 divide-y divide-[#e5e9e7] text-sm">
        {p.facts.map((f) => (
          <div key={f.label} className="flex gap-3 py-2">
            <dt className="w-20 shrink-0 text-[#9aa39c]">{f.label}</dt>
            <dd className="text-[#10251b]">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={href}
          target="_blank"
          rel={isAff ? "nofollow sponsored" : "nofollow"}
          data-cta={`catalog-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="group inline-flex items-center gap-2 rounded-full bg-[#0a7c42] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0a7c42]"
        >
          {p.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
        {p.reviewHref && (
          <Link href={p.reviewHref} className="text-sm font-semibold text-[#10251b] underline decoration-[#cdd5cf] underline-offset-4 hover:decoration-[#0a7c42]">
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
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#0a7c42]">Compare</Link>
            <span>/</span>
            <span className="text-[#2b362f]">{v.h1Lead}</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">{v.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              {v.h1Lead} <span className="italic text-[#0a7c42]">{v.h1Accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">{v.intro}</p>
          </div>
          {v.note && (
            <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
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
              <Link href={v.roundupHref.href} className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/30 underline-offset-4">
                {v.roundupHref.label} →
              </Link>
            </p>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup variant="band" source={`compare-${v.slug}`} />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
            {v.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#2b362f]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#3d4b44]">
            Some links are disclosed affiliate links.
          </p>
        </section>

        {v.relatedCategory && (
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <RelatedGuides category={v.relatedCategory} currentHref={`/compare/${v.slug}`} limit={6} />
          </div>
        )}
      </main>
    </ConsumerShell>
  );
}
