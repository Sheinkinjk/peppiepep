import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";

export const metadata = generateSEOMetadata(seoConfig.getMoshy);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Is getmoshy.com.au the official Moshy website?",
    a: "Yes. getmoshy.com.au is the official domain of Moshy, the Australian telehealth weight-management service. If you have seen the name written as 'get moshy' or 'getmoshy', they all point to the same company.",
  },
  {
    q: "Is getmoshy legit?",
    a: "getmoshy.com.au is the real website of a registered Australian telehealth provider. Eligibility submissions on the site are reviewed by registered Australian practitioners. As with any health service, read their terms before signing up.",
  },
  {
    q: "Where on getmoshy.com.au do I start?",
    a: "The eligibility check is the entry point for the weight-management program. The link on this page takes you straight to it, with our referral applied automatically. There is no code to type in.",
  },
  {
    q: "Is Moshy the same company as Mosh?",
    a: "They are sister brands in the same Australian telehealth family. Mosh at getmosh.com.au is a men's service best known for hair loss telehealth, while Moshy at getmoshy.com.au focuses on weight management and is open to anyone eligible.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "getmoshy.com.au", item: `${SITE_URL}/getmoshy` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-05",
  dateModified: "2026-07-06",
  name: seoConfig.getMoshy.title,
  description: seoConfig.getMoshy.description,
  url: seoConfig.getMoshy.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

export default function GetMoshyPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">getmoshy.com.au</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          getmoshy.com.au: <span style={{ color: CYAN_LT }}>what it is and the fastest way in</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
          Searching &ldquo;getmoshy&rdquo; usually means one of two things: you want to confirm the site is real, or you
          want the quickest route to the eligibility check. Both answers are below.
        </p>
        <CodeAnswer code="REFERRAL120" className="mt-6">
          getmoshy.com.au is Moshy&apos;s own site, and the code Refer Labs holds for it, REFERRAL120, takes $120 off a new customer&apos;s first order, once per customer, carried into the sign-up flow by the link below.
        </CodeAnswer>
        <OfferSchema code="REFERRAL120" />


        <div className="rounded-xl border px-6 py-5 mb-10" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
            <strong className="text-[#10251b]">Yes, it is the official site.</strong> getmoshy.com.au is the real domain of
            Moshy, an Australian telehealth weight-management provider. The button below takes you straight to their eligibility
            check, with our referral applied automatically.
          </p>
          <a
            {...aff}
            data-cta="getmoshy-main"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Go to getmoshy.com.au ($120 off first order)
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">What Moshy does</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Moshy runs telehealth weight-management programs for Australians, open to anyone eligible, and that program
            is its best-known offering. The model is simple: an online questionnaire, an individual review by a registered Australian
            practitioner, and if approved, a subscription with delivery to your door. Not every applicant is approved,
            because the practitioner review is a genuine assessment rather than a rubber stamp.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            If you want the longer walk-through of how the service runs in practice, read{" "}
            <Link href="/moshy-review" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              our full Moshy review
            </Link>{" "}
            or the{" "}
            <Link href="/moshy-eligibility" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              breakdown of the eligibility check
            </Link>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Quick answers</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-[#e5e9e7] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy referral link &amp; offer →</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/mens-health-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Men&apos;s health telehealth in Australia →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/getmoshy" />

        <AffiliateDisclosure className="mt-8" />
        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and is not the official Moshy website. Nothing here is medical
          advice.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
