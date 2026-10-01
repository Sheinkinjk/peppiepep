import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { MOSHY_TERMS_URL } from "@/lib/offers";
import TermsApplyLink, { OfferTermsNote } from "@/components/consumer/TermsApplyLink";
export const metadata = generateSEOMetadata(seoConfig.moshyAlternatives);

const CYAN = "#007a95";
const CYAN_LT = "#007a95";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "What is the closest alternative to Moshy?",
    a: "Of the services we compare, Juniper is the closest like-for-like option: a weight program designed for women, with an online consultation with a registered practitioner, meal plans and a physio-designed exercise program. Other online services exist, and your GP is a route too.",
  },
  {
    q: "How is Juniper different from Moshy?",
    a: "Both include practitioner review, meal plans, a community and app progress tracking (each provider's own pages, read 1 October 2026). Juniper is designed for women, lists a physio-designed exercise program and a practitioner team of specialist GPs and nurse practitioners. Moshy describes itself as an online women's health clinic, includes in-app health coaching, and charges an all-inclusive fee.",
  },
  {
    q: "Is going through my GP a real alternative?",
    a: "Yes. A GP can see you in person, knows your history, and Medicare partly offsets the consultation. The trade is convenience: booking, attending, and repeat visits versus an online questionnaire and a phone or video consultation.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy Alternatives", item: `${SITE_URL}/moshy-alternatives` },
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
  dateModified: "2026-10-01",
  name: seoConfig.moshyAlternatives.title,
  description: seoConfig.moshyAlternatives.description,
  url: seoConfig.moshyAlternatives.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

export default function MoshyAlternativesPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#14120f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#14120f]">Moshy Alternatives</span>
        <SectionMark kind="scale" size={56} /></nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy alternatives in Australia: <span>the shortlist</span>
        </h1>
        <p className="text-[#56504a] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Of the services we compare, Juniper is the closest like-for-like option to Moshy; other online services
          exist, and your GP is a route too. Which suits you depends on what you want from the program.
        </p>
        {/* Below the lead. The first paragraph after the h1 is the answer;
            a disclosure in that slot is what an engine lifts instead. Still
            above the first affiliate link, which is what it is for. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <CodeAnswer code="REFERRAL120" className="mt-6">
          Refer Labs holds a Moshy code: REFERRAL120, $120 off a new customer&apos;s first order, one use per customer,
          with a 3-month minimum commitment (<TermsApplyLink href={MOSHY_TERMS_URL} />).
        </CodeAnswer>
        <OfferSchema code="REFERRAL120" />


        {/* Answer-first: the question verbatim, then a liftable summary of the options. */}
        <section className="mb-10">
          <h2 className="text-xl font-black mb-3">What are the best alternatives to Moshy in Australia?</h2>
          <div className="rounded-xl border border-[#b9e3eb] bg-[#e4f2f5] px-6 py-5">
            <p className="text-[#14120f] text-sm sm:text-base leading-relaxed max-w-2xl">
              Of the services we compare, Juniper is the closest like-for-like option; other online services exist,
              and your GP is a route too. Your GP suits you if you want weight managed alongside the rest of your
              health, with the consultation partly offset by Medicare. Juniper is designed for women and offers an
              online consultation with a registered practitioner, plus coaching, meal plans and a community; JARREDKFC
              means no charge for the initial consultation, which Juniper values at $89, and program fees apply.
              Suitability for any of them is decided individually by a registered Australian practitioner.
            </p>
          </div>
        </section>

        <p className="mb-10 rounded-lg border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-xs leading-relaxed text-[#56504a]">
          <span className="font-semibold text-[#14120f]">Information only.</span> This page compares services and is not
          medical advice. Suitability for any provider is assessed individually by registered practitioners.
        </p>

        {/* Unnumbered and alphabetical: an online program, then the GP route (1 Oct 2026). */}
        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">Juniper, designed for women</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Juniper runs a close model to Moshy: an online consultation with a registered practitioner, plus meal plans,
            a physio-designed exercise program and a private community, with a practitioner team of specialist GPs and
            nurse practitioners. To see what it includes,{" "}
            <Link href="/juniper" data-cta="moshy-alternatives-juniper" className="underline decoration-[#ded8cd] underline-offset-2 hover:text-[#14120f]" style={{ color: CYAN }}>
              read our Juniper review
            </Link>.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">Your GP</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            A GP can see you in person about weight management, sees your whole health picture, and Medicare offsets
            part of the consultation. It runs by appointment rather than online. We compare the two routes in{" "}
            <Link href="/moshy-vs-gp" className="underline decoration-[#ded8cd] underline-offset-2 hover:text-[#14120f]" style={{ color: CYAN }}>
              Moshy vs your GP
            </Link>.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Where does Moshy fit?</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Moshy describes itself as an online women&apos;s health clinic and takes anyone a practitioner assesses as
            suitable. Its weight program includes in-app coaching, dietitian meal plans and a community for an
            all-inclusive fee, and a registered practitioner decides whether any treatment is appropriate.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-4" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#14120f] text-sm sm:text-base leading-relaxed mb-4">
              REFERRAL120: $120 off a first order. Use code REFERRAL120 at checkout; our link opens Moshy&apos;s sign-up with the offer.{" "}
              <TermsApplyLink href={MOSHY_TERMS_URL} />
            </p>
            <a
              {...aff}
              data-cta="alternatives-main"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Continue to Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
            {/* Moshy only: this page carries no Juniper affiliate link (1 Oct 2026). */}
            <EarningsBalanceNote earnFrom="Moshy" className="mt-4 max-w-2xl" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#14120f] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#56504a] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#56504a] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* The full offer terms, near the foot; beside the code there is only the
            muted "T&Cs apply" link (1 Oct 2026). */}
        <OfferTermsNote brand="Moshy" className="mb-8" />

        <div className="border-t border-[#ded8cd] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Full provider comparison →</Link>
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">our Moshy page</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy-alternatives" />

        <AffiliateDisclosure partners={["Moshy", "Juniper"]} className="mt-8" />
        <p className="text-[#56504a] text-xs mt-3 leading-relaxed">
          Nothing here is medical advice. Any treatment is decided by a registered practitioner after an individual
          assessment. Always consult a qualified health
          professional about your own circumstances.
        </p>
        <p className="text-[#56504a] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#56504a]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Get started" />
    </ConsumerShell>
  );
}
