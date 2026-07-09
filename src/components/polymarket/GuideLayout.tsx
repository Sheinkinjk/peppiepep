import Link from "next/link";
import type { ReactNode } from "react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import PolymarketCta from "./PolymarketCta";
import RiskDisclaimer from "./RiskDisclaimer";
import { polymarketRef } from "@/lib/polymarket";
import { SITE_URL } from "@/lib/seo";

const GREEN = "#0a7c42";
const PILLAR = "/polymarket";

export type GuideSection = { id: string; h2: string; body: ReactNode };
export type GuideFaq = { q: string; a: string };
export type GuideRelated = { href: string; label: string; desc: string };

type Props = {
  slug: string; // e.g. "polymarket/trading-bots"
  campaign: string; // utm_campaign
  articleType?: "Article" | "TechArticle";
  breadcrumbLabel: string;
  kicker: string;
  h1: string;
  description: string;
  intro: ReactNode;
  heroCtaLabel: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  related: GuideRelated[];
  closing: { heading: string; body: string; ctaLabel: string };
  datePublished?: string;
  dateModified?: string;
};

export default function GuideLayout({
  slug,
  campaign,
  articleType = "Article",
  breadcrumbLabel,
  kicker,
  h1,
  description,
  intro,
  heroCtaLabel,
  sections,
  faqs,
  related,
  closing,
  datePublished = "2026-07-07",
  dateModified = "2026-07-07",
}: Props) {
  const url = `${SITE_URL}/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Polymarket", item: `${SITE_URL}${PILLAR}` },
      { "@type": "ListItem", position: 3, name: breadcrumbLabel, item: url },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": articleType,
    headline: h1,
    description,
    datePublished,
    dateModified,
    inLanguage: "en-AU",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Refer Labs",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/moshy.png` },
    },
    image: `${SITE_URL}/og?title=${encodeURIComponent(h1)}`,
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

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href={PILLAR} className="hover:text-[#0a7c42] transition-colors">Polymarket</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">{breadcrumbLabel}</span>
          </nav>

          {/* Hero */}
          <section className="pt-9 pb-7 sm:pt-11">
            <p className="nw-kicker mb-5">{kicker}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              {h1}
            </h1>
            <div className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-5 space-y-3">
              {intro}
            </div>
            <div className="mt-6">
              <PolymarketCta label={heroCtaLabel} campaign={campaign} location="hero" />
            </div>
          </section>

          {/* Table of contents */}
          <nav aria-label="On this page" className="border-t border-[#e5e9e7] py-6">
            <p className="text-[13px] font-semibold text-[#2b362f] mb-3">In this guide</p>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[#3d4b44] underline decoration-[#cdd5cf] decoration-1 underline-offset-4 hover:text-[#0a7c42] hover:decoration-[#0a7c42] transition-colors"
                  >
                    {s.h2}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="border-t border-[#e5e9e7] py-9 scroll-mt-24"
            >
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">{s.h2}</h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl [&_p_a]:text-[#0a7c42] [&_p_a]:underline [&_p_a]:underline-offset-2 [&_li_a]:text-[#0a7c42] [&_li_a]:underline [&_li_a]:underline-offset-2 [&_strong]:text-[#10251b] [&_strong]:font-semibold">
                {s.body}
              </div>
            </section>
          ))}

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                  <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden="true" className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="rounded-2xl border px-6 py-7 text-center sm:px-8" style={{ borderColor: `${GREEN}30`, background: `${GREEN}08` }}>
              <h2 className="text-lg sm:text-xl font-black text-[#10251b]">{closing.heading}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4b44]">{closing.body}</p>
              <div className="mt-5 flex justify-center">
                <PolymarketCta label={closing.ctaLabel} campaign={campaign} location="closing" />
              </div>
            </div>
          </section>

          {/* Related (internal cluster links) */}
          <section className="border-t border-[#e5e9e7] py-8">
            <h2 className="text-sm font-bold text-[#10251b] mb-4">Continue the guide</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-4 transition-colors hover:border-[#0a7c42]/40">
                  <p className="text-sm font-bold text-[#10251b] mb-1">{r.label}</p>
                  <p className="text-xs leading-relaxed text-[#6e7b74]">{r.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Disclosures */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16 space-y-4">
            <RiskDisclaimer />
            <p className="text-[#9aa39c] text-xs leading-relaxed">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to
              Polymarket. We may earn a commission if you sign up through it, at no extra cost to you.
              Referral rewards, fees, and country or US-state availability are set by Polymarket, change
              frequently, and are described here as current at the time of writing; always confirm the
              current terms on Polymarket&apos;s official documentation. Our full standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>
        </div>
      </main>

      <StickyCta href={polymarketRef(campaign)} product="Polymarket · prediction markets" label="Sign up" />
    </ConsumerShell>
  );
}
