import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Tag } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { FEATURED_DEALS, OTHER_DEALS, DEALS } from "@/lib/offers";
import OffersTable from "@/components/lending/OffersTable";

export const metadata = generateSEOMetadata(seoConfig.deals);

/**
 * The literal question people put to a search or answer engine. Answers lead
 * with the code and state what the discount actually applies to, which ACL s29
 * requires and which is also what makes an answer citable.
 */
const FAQS = [
  {
    q: "What is the current Moshy discount code?",
    a: "The current Moshy discount code is REFERRAL120, worth $120 off a new customer's first order. Moshy states it applies to a practitioner-assigned weight-loss program, one use per customer, with a minimum three-month commitment, and excludes dietitian, over-the-counter and meal-replacement plans. It applies automatically through our link, so there is nothing to type. Read off Moshy's own sign-up page on 17 August 2026.",
  },
  {
    q: "What is the current Mosh discount code?",
    a: "The current Mosh discount code is REFERAL55, worth 55% off a new customer's first order. It applies to that first order rather than to later renewals, and Mosh runs as a subscription after that. It applies automatically through our link. Read off Mosh's own page on 17 August 2026.",
  },
  {
    q: "What is the current Knose promo code?",
    a: "The current Knose promo code is referlab2mf, which gives new customers 2 months free on Knose pet insurance. What the policy covers, along with waiting periods, exclusions and limits, is set out in Knose's PDS, so get a quote to see what would apply to your pet. This is general information, not financial advice.",
  },
  {
    q: "What is the current PetsOnMe discount code?",
    a: "The current PetsOnMe discount code is REFERLABS, which takes 15% off pet care services rather than off the insurance premium, up from the usual 12%. The distinction matters: it is a discount on services, not on the cost of cover. Read off PetsOnMe's own page on 17 August 2026. General information, not financial advice.",
  },
  {
    q: "Are these discount codes actually current?",
    a: "Each offer in the table shows the date we last read it off that provider's own page, rather than one site-wide stamp, so you can see how current each individual code is. Offers change without notice, so treat the date as when we checked rather than a guarantee, and confirm the terms on the provider's site before you sign up.",
  },
  {
    q: "Does Refer Labs earn from these deals?",
    a: "Yes, some of the links are affiliate links, so we may earn a commission if you sign up. It costs you nothing extra and never changes what you pay or which offers we list. We do not accept payment for rankings.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

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
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function DealsPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content" className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Deals</span>
        </nav>

        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
          Deals &amp; discount codes
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4b44]">
          The current offers on the providers we compare, each checked against the provider&apos;s own page. We only
          list deals for brands we actually work with, and every one links to our full guide with the details.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#6e7b74]">
            {/* A single month here contradicted the table underneath, which dates
                every offer individually: the header claimed July while rows read
                August. Per-row dating is the stronger claim anyway, so the header
                points at it rather than competing with it. */}
            <BadgeCheck className="h-4 w-4 text-[#0a7c42]" aria-hidden="true" /> Every offer below carries the
            date we last checked it
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

        <section className="mt-14">
          <h2 className="text-xl font-extrabold text-[#10251b]">Discount code questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white">
            {FAQS.map((f) => (
              <div key={f.q} className="px-5 py-5 sm:px-6">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
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
