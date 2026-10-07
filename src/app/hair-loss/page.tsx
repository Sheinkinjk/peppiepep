import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { MOSH_TERMS_URL } from "@/lib/offers";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";
import OfferSchema from "@/components/offers/OfferSchema";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { GuideGrid } from "@/components/brand/GuideGrid";
import { HubObject } from "@/components/home/Objects";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.hairLossHub);


const guides = [
  { href: "/best-hair-loss-treatment-australia", title: "Best hair loss treatment", desc: "Mosh and your GP side by side, and where over-the-counter products fit." },
  { href: "/moshhair", title: "Mosh review & offer", desc: "How the men's hair-loss telehealth service works, plus 55% off your first order." },
  { href: "/mosh-review", title: "Is Mosh legit?", desc: "Who runs the consultations and how billing works." },
  { href: "/hair-loss-treatment-cost-australia", title: "Hair-loss costs compared", desc: "How over-the-counter products, a GP and a telehealth subscription are each priced." },
  { href: "/early-signs-of-hair-loss-australia", title: "Early signs of hair loss", desc: "How to tell if you're going bald, what's normal, and where to get it checked." },
  { href: "/receding-hairline-treatment-australia", title: "Receding hairline", desc: "What a receding hairline usually means, and the routes to having it assessed." },
  { href: "/mens-health", title: "Men's health", desc: "The wider category: how the access routes differ and what each costs over a year." },
];

const faqs = [
  {
    q: "What are my options for hair loss in Australia?",
    a: "Three. An online consultation with a service such as Mosh, where a registered practitioner decides what is appropriate for you; an appointment with your GP; or over-the-counter shampoos and serums, which are cosmetic. Your GP and an online consultation are the two ways to be assessed; over-the-counter products need no consult.",
  },
  {
    q: "Are over-the-counter products enough on their own?",
    a: "They are cosmetic: they change how hair looks and feels, and they do not find why it is falling out. For loss that is progressing, an assessment by a practitioner or your GP is what finds the cause.",
  },
  {
    q: "How does the telehealth route work?",
    a: "You complete an online questionnaire with photos, and a registered practitioner reviews it individually, sometimes with a follow-up call. Some applicants are declined, and some are told to see a GP in person.",
  },
  {
    q: "Is any of this medical advice?",
    a: "No. This hub is general information about services and products. What is appropriate for you is decided by a registered practitioner after an individual assessment. Speak to a qualified health professional about your own situation.",
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
  dateModified: "2026-10-01",
  name: "Hair loss treatment options in Australia, compared",
  description:
    "Refer Labs' hair loss hub for Australians: an online consultation, your GP, or over-the-counter products, and how each is priced.",
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
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#14120f]">Hair loss</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
              Hair loss treatment options in Australia, compared
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#14120f]">
              There are three routes. An online consultation with a service such as Mosh, where a registered
              practitioner assesses you with no clinic visit; an appointment with your GP, who can also order tests and
              refer you on; or over-the-counter shampoos and serums, which are cosmetic. Your GP and an online
              consultation are the two ways to be assessed; over-the-counter products need no consult.
            </p>
            {/* Below the lead. The first paragraph after the h1 is the answer;
                a disclosure in that slot is what an engine lifts instead. Still
                above the first affiliate link, which is what it is for. */}
            <AffiliateDisclosure compact className="mt-4 max-w-2xl" notWholeMarket="The one online service on this hub, Mosh, pays us, and other online services exist that we do not list." />
            <OfferSchema code="REFERAL55" />
          </div>
          {/* The matcher, moved up from below the guides so the hero has its
              second column, as the weight-loss hub does. */}
          <EdgeObject kind="comb">
            <MatchPrompt
              stacked
              href="/best-hair-loss-treatment-australia"
              title="Compare the three routes"
              sub="An online consultation, over-the-counter products and your GP, side by side: what each involves and how each is priced."
              cta="Compare all options"
              dataCta="hair-hub-hero-compare"
            />
          </EdgeObject>
          </div>
        </section>


        {/* Rebuilt 30 Sep 2026. Dense retired (a UK prescribing pharmacy that this
            hub described as a non-prescription topical), and the HubProviders grid
            went with it: a one-provider grid is an advert, not a comparison. Three
            routes on equal cards; only the online one has a provider we link to. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            Which route are you on?
          </h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#ded8cd] bg-white p-7">
              <HubObject kind="phone" size={64} className="hy-obj mb-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#007a95]">Online</p>
              <h3 className="mt-3 text-xl font-bold text-[#14120f]">An online consultation</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#56504a]">
                A questionnaire and photos, reviewed by a registered practitioner, with no clinic visit. Mosh is one
                Australian men&apos;s service that runs this. Refer Labs readers get 55% off with REFERAL55.
                Use code REFERAL55 at checkout; our link opens Mosh&apos;s sign-up with the offer.
              </p>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <p>
                  <a href={MOSH_HAIR_URL} target="_blank" rel="nofollow sponsored" data-cta="hair-hub-mosh" className="inline-flex items-center gap-1.5 text-[#007a95] hover:underline">
                    Continue to Mosh <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </p>
                <p><Link href="/moshhair" className="text-[#007a95] hover:underline">Read the Mosh guide →</Link></p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#ded8cd] bg-white p-7">
              <HubObject kind="scale" size={64} className="hy-obj mb-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#56504a]">In person</p>
              <h3 className="mt-3 text-xl font-bold text-[#14120f]">Your GP</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#56504a]">
                A full history, blood tests where needed, and a referral to a dermatologist. The consult may be
                bulk-billed. The better first step for sudden or patchy loss, and for women. We earn nothing from it.
              </p>
              <p className="mt-5 text-sm font-semibold">
                <Link href="/best-hair-loss-treatment-australia" className="text-[#007a95] hover:underline">Mosh and your GP, side by side →</Link>
              </p>
            </div>
            <div className="rounded-2xl border border-[#ded8cd] bg-white p-7">
              <HubObject kind="comb" size={64} className="hy-obj mb-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#56504a]">Cosmetic</p>
              <h3 className="mt-3 text-xl font-bold text-[#14120f]">Over-the-counter products</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#56504a]">
                Shampoos, conditioners and serums for thinning hair, sold by pharmacies with no consult. They change
                how hair looks and feels; they do not find the cause. We do not recommend a brand.
              </p>
              <p className="mt-5 text-sm font-semibold">
                <Link href="/hair-loss-treatment-cost-australia" className="text-[#007a95] hover:underline">How each route is priced →</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
              Every guide in this hub
            </h2>
            <GuideGrid guides={guides} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup variant="band" source="hair-loss-hub" />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            Before you start
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                  {f.q}
                  <span className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#14120f]">{f.a}</p>
              </details>
            ))}
          </div>
          <OfferTermsNote brand="Mosh" className="mt-6 max-w-3xl" />
          <p className="mt-8 max-w-3xl rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4 text-xs leading-relaxed text-[#56504a]">
            <span className="font-semibold text-[#14120f]">Information only.</span> Nothing here is medical advice or a
            recommendation of any treatment. What is appropriate for you is decided by a registered practitioner after an individual
            assessment.
          </p>
          <AffiliateDisclosure className="mt-3 max-w-3xl" />
          <p className="mt-6 text-sm leading-relaxed text-[#56504a]">
            Every current offer we hold, with the date each one was checked, is on{" "}
            <Link href="/deals" className="font-semibold text-[#007a95] hover:underline">the deals page</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
