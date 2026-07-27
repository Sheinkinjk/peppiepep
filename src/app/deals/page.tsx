import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Tag } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { FEATURED_DEALS, OTHER_DEALS, DEALS, OFFERS_VERIFIED } from "@/lib/offers";
import OffersTable from "@/components/lending/OffersTable";

export const metadata = generateSEOMetadata(seoConfig.deals);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Deals & Discount Codes", item: `${SITE_URL}/deals` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Current deals and discount codes at Refer Labs",
  itemListElement: DEALS.map((d, i) => ({
    "@type": "ListItem", position: i + 1, name: `${d.brand}: ${d.offer}`, url: `${SITE_URL}${d.href}`,
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.deals.title,
  description: seoConfig.deals.description,
  url: `${SITE_URL}/deals`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function DealsPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Deals</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Current offers</p>
        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
          Deals &amp; discount codes
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4b44]">
          The current offers on the providers we compare, each checked against the provider&apos;s own page. We only
          list deals for brands we actually work with, and every one links to our full guide with the details.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#6e7b74]">
          <BadgeCheck className="h-4 w-4 text-[#0a7c42]" aria-hidden="true" /> Checked &amp; verified {OFFERS_VERIFIED}
        </p>

        {/* Structured offers table (AI-extractable canonical source) */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#10251b]">Current offers at a glance</h2>
          <div className="mt-5">
            <OffersTable deals={FEATURED_DEALS} caption="Current verified discount codes and offers at Refer Labs" />
          </div>
        </section>

        {/* Featured: real monetary discounts */}
        <section className="mt-14">
          <h2 className="text-xl font-extrabold text-[#10251b]">Best deals right now</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DEALS.map((d) => (
              <Link key={d.brand} href={d.href}
                className="group flex flex-col rounded-2xl border border-[#0a7c42]/25 bg-[#0a7c42]/[0.04] p-6 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/50 hover:shadow-[0_22px_50px_-28px_rgba(14,124,66,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                    <Image src={d.logo} alt={`${d.brand} logo`} width={32} height={32} className="h-8 w-8 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-extrabold leading-tight text-[#10251b]">{d.brand}</h3>
                    <span className="text-[11px] font-medium text-[#6e7b74]">{d.category}</span>
                  </div>
                </div>
                <p className="mt-4 text-lg font-bold leading-snug text-[#0a7c42]">{d.offer}</p>
                {d.code ? (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3d4b44]">
                    <Tag className="h-3.5 w-3.5 text-[#9aa39c]" aria-hidden="true" /> Code {d.code}, applied via our link
                  </p>
                ) : (
                  <p className="mt-2 text-[13px] font-medium text-[#6e7b74]">Applied automatically via our link, no code</p>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#0a7c42]">
                  Get the deal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Other offers: free trials / plans */}
        <section className="mt-14">
          <h2 className="text-xl font-extrabold text-[#10251b]">More free trials &amp; offers</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5e9e7]">
            {OTHER_DEALS.map((d, i) => (
              <Link key={d.brand} href={d.href}
                className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f5f8f6] ${i % 2 ? "bg-[#f8faf9]" : "bg-white"}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#eef1ef] bg-white">
                  <Image src={d.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                </span>
                <span className="w-32 shrink-0 font-bold text-[#10251b]">{d.brand}</span>
                <span className="flex-1 text-sm text-[#3d4b44]">{d.offer}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#9aa39c]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-[#6e7b74]">
          Offers are the providers&apos; own current terms and can change; we recheck them regularly and show when we
          last did. Some links are affiliate links, so we may earn a commission if you sign up, at no extra cost to you,
          and it never changes what you pay. See{" "}
          <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">how we make money</Link>.
        </p>
      </main>
    </ConsumerShell>
  );
}
