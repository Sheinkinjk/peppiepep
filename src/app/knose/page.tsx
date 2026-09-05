import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { KNOSE_URL } from "@/lib/affiliate-links";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import InsuranceDisclosure from "@/components/consumer/InsuranceDisclosure";
import { checkedOn } from "@/lib/offers";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.knose);

const SLUG = "/knose";
const UPDATED = "2026-08-04";

const faqs = [
  {
    q: "Is Refer Labs recommending Knose?",
    a: "No. Refer Labs is not an insurer, broker or financial adviser. We provide general information and refer you to Knose. This page is not a recommendation or personal financial advice, and whether a Knose policy suits you depends on your own circumstances.",
  },
  {
    q: "What is the Knose offer?",
    a: "New customers get 2 months free when they take out a policy using the code referlab2mf through our link. The offer is provided by Knose and subject to their terms; confirm the current offer and terms during the quote.",
  },
  {
    q: "How does Refer Labs make money from this?",
    a: "We may receive a commission or referral fee from Knose if you take out a policy through our link, at no extra cost to you. This does not change what we publish, and we do not provide advice.",
  },
  {
    q: "Where do I see what a Knose policy actually covers?",
    a: "In Knose's Product Disclosure Statement (PDS) and Target Market Determination (TMD), and in your quote. These set out the cover, waiting periods, exclusions, excess, benefit percentage and annual limits that would apply to your pet.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}/pet-insurance` },
    { "@type": "ListItem", position: 3, name: "Knose", item: `${SITE_URL}${SLUG}` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.knose.title,
  description: seoConfig.knose.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function KnoseCta({ label, loc }: { label: string; loc: string }) {
  return (
    <a href={KNOSE_URL} target="_blank" rel="nofollow sponsored" data-cta={`knose-${loc}`} className="nw-btn">
      {label} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export default function KnosePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
            <span>/</span>
            <Link href="/pet-insurance" className="transition-colors hover:text-[#10251b]">Pet insurance</Link>
            <span>/</span>
            <span className="text-[#10251b]">Knose</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/knose.svg" alt="Knose logo" width={160} height={62} className="mb-5 h-11 w-auto" />
            <p className="nw-kicker">Pet insurance · Current offer</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
              Knose promo code <span className="text-[#0a7c42]">referlab2mf</span>: 2 months free for new customers
            </h1>
            {/* Above the first affiliate link, not below it. */}
            <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
            <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">
              Knose is an Australian pet insurance provider. New customers can get <strong className="text-[#10251b]">2
              months free</strong> when they take out a policy using the code <strong className="text-[#10251b]">referlab2mf</strong> through
              our link. This page is general information and a referral, not financial advice or a recommendation.
            </p>
            {/* The sentence that sat here duplicated the paragraph above it. The date
                stays: it is the only reading date on this page, and without it the nearest
                date to the code is the "Last updated" stamp, which reads as verification. */}
            <p className="mt-4 text-[12px] font-medium text-[#5c6b63]">
              Verified by Refer Labs on {checkedOn("referlab2mf")}, read off Knose&apos;s own page. Offers can change, so check the current terms
              before you sign up.
            </p>
            <OfferSchema code="referlab2mf" />

            <EditorialMeta lastUpdated={UPDATED} className="mt-4" />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <KnoseCta label="Get a Knose quote (2 months free)" loc="hero" />
              <Link href="/pet-insurance" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                Back to pet insurance
              </Link>
            </div>
          </header>

          <InsuranceDisclosure className="mb-10" />

          {/* The buyer's question as an h2, verbatim. It lived only inside the
              FAQPage JSON-LD, which an engine can read but a heading-led snippet
              cannot be built from. Worded differently from the FAQ entry below on
              purpose: same facts, not the same sentence twice on one page. */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What is the current Knose promo code?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
              referlab2mf, worth 2 months free for new customers taking out a policy. What the policy itself covers, and
              the waiting periods, exclusions and limits that apply, sit in Knose&apos;s PDS rather than in the offer, so
              get a quote to see what would apply to your pet.
            </p>
          </section>

          {/* What to check (factual pointers, not advice) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Before you take up the offer</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
              Whether any policy is right for you depends on your pet and your circumstances, so it&apos;s worth reading
              the detail rather than the headline:
            </p>
            <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
              <li>Get a quote for your specific pet, so the price and terms reflect its species, breed and age.</li>
              <li>Read Knose&apos;s Product Disclosure Statement (PDS) and Target Market Determination (TMD) for exactly what is and isn&apos;t covered.</li>
              <li>Check the waiting periods, exclusions (including pre-existing conditions), excess, benefit percentage and annual limits.</li>
              <li>Confirm the current 2-months-free offer and its terms during the quote, as offers can change.</li>
            </ul>
            <div className="mt-7">
              <KnoseCta label="Start a Knose quote" loc="mid" />
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
            <div className="mt-6 divide-y divide-[#e5e9e7] border-t border-[#e5e9e7]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="font-bold text-[#10251b]">{f.q}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <InsuranceDisclosure className="mb-16" />
        </div>
      </main>
    </ConsumerShell>
  );
}
