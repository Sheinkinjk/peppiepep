import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { MOSHY_TERMS_URL } from "@/lib/offers";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";
export const metadata = generateSEOMetadata(seoConfig.moshyReview);

const CYAN = "#007a95";
const CYAN_LT = "#007a95";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// Facts read on getmoshy.com.au (homepage and /weight-loss) on this date.
const READ_ON = "30 September 2026";

const faqs = [
  {
    q: "Is Moshy legit?",
    a: `Yes. getmoshy.com.au is Moshy's own site, and Moshy is the brother brand of the Australian telehealth service Mosh. Moshy says it partners with independent AHPRA-registered doctors and nurses based in Australia, paid on a fee-for-service basis, and its weight-loss page states it is NSQPCH-accredited, holds QIP Accreditation and LegitScript certification, and is ISO/IEC 27001 certified for information security (read ${READ_ON}).`,
  },
  {
    q: "Does everyone who applies get accepted?",
    a: "No. A registered practitioner reviews each applicant in the consultation and some are declined; finishing the questionnaire does not settle it.",
  },
  {
    q: "Do I need a referral from my GP to use Moshy?",
    a: "No. You start with Moshy's own online questionnaire, and Moshy arranges the consultation by phone or video. No GP referral is needed to begin.",
  },
  {
    q: "Can I get my money back?",
    a: `Moshy advertises a 30-day money back guarantee and a price match guarantee, each with its own conditions on Moshy's site; the money-back guarantee is in Moshy's terms at getmoshy.com.au/terms (read ${READ_ON}). If you use REFERRAL120, read those alongside the code's 3-month minimum commitment.`,
  },
  {
    q: "Is this page affiliated with Moshy?",
    a: "This page is published by Refer Labs and contains an affiliate referral link, which is disclosed on the page. Refer Labs earns a fee when someone signs up through it, at no extra cost to them. Nothing here is medical advice.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy Review", item: `${SITE_URL}/moshy-review` },
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
  name: seoConfig.moshyReview.title,
  description: seoConfig.moshyReview.description,
  url: seoConfig.moshyReview.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

function Cta({ label, loc }: { label: string; loc: string }) {
  return (
    <a
      {...aff}
      data-cta={loc}
      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
      style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export default function MoshyReviewPage() {
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
          <span className="text-[#14120f]">Moshy Review</span>
        <SectionMark kind="scale" size={56} /></nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy review: <span>is it legit, and what the service is like</span>
        </h1>
        <p className="text-[#56504a] text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
          Yes, Moshy is a legitimate Australian telehealth service: it says its practitioners are independent
          AHPRA-registered doctors and nurses paid on a fee-for-service basis, and its own site states it is
          NSQPCH-accredited, LegitScript-certified and ISO/IEC 27001 certified (read {READ_ON}). It is the brother brand
          of Mosh, and the service is an online consultation with a registered practitioner, who decides what is
          appropriate for you.
        </p>
        {/* Below the lead, above the first affiliate link. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <CodeAnswer code="REFERRAL120" className="mt-6 mb-10">
          REFERRAL120, the Moshy code Refer Labs holds, gets a new customer $120 off a first order, once per customer,
          with a minimum commitment period of 3 months, on eligible Moshy weight programs.
        </CodeAnswer>
        <OfferSchema code="REFERRAL120" />

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-black">How Moshy works</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Moshy runs weight-loss, hair and skin services online, and its weight-management program is the part most
            people come looking for. You answer a questionnaire on Moshy&apos;s site, then Moshy arranges a
            consultation with a practitioner by phone or video.
          </p>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            If you go ahead, you pay one monthly program fee, which Moshy publishes on its weight-loss page. New
            customers get $120 off their first order with REFERRAL120, under Moshy&apos;s terms. Use code REFERRAL120 at checkout; our link opens Moshy&apos;s sign-up with the offer.
          </p>
          <div className="pt-1">
            <Cta label="Continue to Moshy" loc="short-version" />
          </div>
        </section>

        <p className="mb-10 rounded-lg border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-xs leading-relaxed text-[#56504a]">
          <span className="font-semibold text-[#14120f]">Information only.</span> This page describes a telehealth service.
          It is not medical advice, does not recommend any treatment, and does not imply suitability for any individual.
        </p>

        <section className="space-y-5 mb-10">
          <h2 className="text-2xl font-black">What you get</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">As listed on getmoshy.com.au, read {READ_ON}:</p>
          <ul className="space-y-3">
            {[
              ["Done from home", "The questionnaire is online and the consultation is by phone or video, so nothing needs to be booked in person."],
              ["Unlimited practitioner support", "Ongoing access to Moshy's practitioners, which Moshy lists as part of the program fee."],
              ["A care team", "Moshy's care team includes doctors, nurses, dietitians, psychologists and exercise physiologists."],
              ["App, coaching and community", "In-app health tracking and health coaching, dietitian-approved meal plans and recipes, and a member community."],
              ["Two guarantees", "A 30-day money back guarantee and a price match guarantee, each with conditions on Moshy's terms page."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CYAN }} />
                <span className="text-[#56504a] text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-[#14120f]">{t}.</span> {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Weighing Moshy against Juniper? <Link href="/moshy-vs-juniper" style={{ color: CYAN }} className="font-semibold hover:opacity-80">Moshy vs Juniper</Link> puts
            the two side by side.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black mb-5">Common questions</h2>
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
          <OfferTermsNote brand="Moshy" className="mt-5" />
        </section>

        <div className="rounded-2xl border px-6 py-7 mb-10 text-center sm:px-8" style={{ borderColor: `${CYAN}30`, background: `${CYAN}08` }}>
          <h2 className="text-lg sm:text-xl font-black text-[#14120f]">Start with Moshy</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#56504a]">
            $120 off a new customer&apos;s first order with REFERRAL120 at checkout.
          </p>
          <div className="mt-5 flex justify-center">
            <Cta label="Continue to Moshy" loc="closing-cta" />
          </div>
        </div>

        <div className="mb-10">
          <NewsletterSignup
            variant="alert"
            source="deal-alert-moshy-review"
            interest="Moshy offer"
            heading="Not ready today? Get told when the Moshy offer changes."
            sub="New customers can currently get $120 off a first order with code REFERRAL120, under Moshy's terms. We'll email you if that changes, and nothing else."
          />
        </div>

        <div className="border-t border-[#ded8cd] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy discount code →</Link>
          <Link href="/moshy-vs-juniper" style={{ color: CYAN }} className="hover:opacity-80">Moshy vs Juniper →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy-review" />

        <AffiliateDisclosure className="mt-8" />
        <p className="text-[#56504a] text-xs mt-3 leading-relaxed">
          Nothing on this page is medical advice. What is appropriate for you is decided by a registered practitioner after an
          individual assessment. Offers and pricing can change; check current terms on Moshy&apos;s own site.
        </p>
        <p className="text-[#56504a] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#56504a]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy" label="Get started" />
    </ConsumerShell>
  );
}
