import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import VerifiedStamp from "@/components/consumer/VerifiedStamp";
import { MOSHY_OFFER } from "@/lib/offers";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.moshyReview);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Is Moshy legit?",
    a: "Yes. Moshy is an Australian telehealth service operating under Australian health service regulations, and every eligibility submission is reviewed individually by a registered Australian practitioner. Some applicants are declined, which is the clinical screening working as it should, and pricing is shown inside the flow before you commit. Those are the markers of a real clinical service rather than a storefront.",
  },
  {
    q: "Is Moshy a real Australian company?",
    a: "Yes. Moshy is an Australian telehealth provider operating under Australian health service regulations, and eligibility submissions are reviewed by registered Australian practitioners. It sits in the same family of Australian telehealth brands as Mosh.",
  },
  {
    q: "How long does the Moshy sign-up take?",
    a: "The online eligibility questionnaire usually takes around five to ten minutes. The practitioner review that follows is not instant, because a real person assesses each submission individually.",
  },
  {
    q: "Does everyone who applies get accepted?",
    a: "No. Some applicants are declined or pointed toward other care after the practitioner review. That screening step is a feature of a clinical service rather than a flaw.",
  },
  {
    q: "Do I need a referral from my GP to use Moshy?",
    a: "No. The starting point is Moshy's own online eligibility check, which does not require a GP referral. Whether any treatment follows is decided by the reviewing practitioner based on your individual circumstances.",
  },
  {
    q: "Is this page affiliated with Moshy?",
    a: "This page is published by Refer Labs and contains an affiliate referral link, which is disclosed on the page. The referral applies automatically when you click through. Nothing here is medical advice.",
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
  dateModified: "2026-07-06",
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
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Moshy Review</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy review: <span style={{ color: CYAN_LT }}>is it legit, and what the service is like</span>
        </h1>
        {/* Above the first affiliate link, not below it. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
          A plain walkthrough of how Moshy works: what you get, what happens when you apply, and how to start the free
          eligibility check.
        </p>
        <CodeAnswer code="REFERRAL120" className="mt-6">
          REFERRAL120, the Moshy code Refer Labs holds, gets a new customer $120 off a first order, once per customer.
        </CodeAnswer>
        <OfferSchema code="REFERRAL120" />

        <div className="mb-6">
          <VerifiedStamp date={MOSHY_OFFER.verified} label={`${MOSHY_OFFER.amount} for new customers · verified`} />
        </div>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The short version</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Moshy is an Australian telehealth service, and its weight-management program is the part most people come
            looking for. You complete a questionnaire online, a registered Australian practitioner reviews your answers,
            and if they consider it appropriate you continue on a subscription, with anything prescribed delivered to
            your door. No waiting room, no referral letter, no phone queue.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The starting point is a free eligibility check that takes about ten minutes and commits you to nothing.
            That is the fastest way to see what Moshy would offer you. New customers get $120 off their first order
              with code REFERRAL120, which our link applies for you.
          </p>
          <div className="pt-1">
            <Cta label="Start your free eligibility check" loc="short-version" />
          </div>
        </section>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page describes a telehealth service.
          It is not medical advice, does not recommend any treatment, and does not imply suitability for any individual.
        </p>

        <section className="space-y-5 mb-10">
          <h2 className="text-xl font-black">What you get</h2>
          <ul className="space-y-3">
            {[
              ["Done entirely from home", "The questionnaire, the review, the plan and the deliveries all happen online. Nothing needs to be booked in person."],
              ["Reviewed by a registered practitioner", "A certified Australian practitioner assesses each submission individually. It is a clinical review, not an automatic checkout."],
              ["Pricing shown before you commit", "If you are approved, the treatment options and the subscription pricing are laid out inside the platform first. You are never charged for something you have not seen."],
              ["Delivered and managed on subscription", "Anything prescribed is sent to your door, with check-ins and questions handled through the platform rather than a generic support inbox."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CYAN }} />
                <span className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-[#10251b]">{t}.</span> {d}
                </span>
              </li>
            ))}
          </ul>
          <div className="pt-1">
            <Cta label="See what Moshy offers you" loc="what-you-get" />
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">What happens when you apply</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The eligibility check is a structured health questionnaire covering your history, your goals and your
            current situation. Real practitioners review the submissions, and some applicants are declined or redirected
            to other care, so approval is not guaranteed.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            If a practitioner approves you, the treatment options, the plan and the pricing are presented inside the
            platform before anything is charged. The referral on this page applies automatically when you click through,
            so there is no code to enter.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              The eligibility check is free, takes a few minutes, and commits you to nothing. It is the quickest way to
              find out where you stand.
            </p>
            <Cta label="Start the Moshy eligibility check" loc="mid-cta" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Common questions</h2>
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

        <div className="rounded-2xl border px-6 py-7 mb-10 text-center sm:px-8" style={{ borderColor: `${CYAN}30`, background: `${CYAN}08` }}>
          <h2 className="text-lg sm:text-xl font-black text-[#10251b]">Ready to see where you stand?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4b44]">
            The eligibility check is free and takes about ten minutes. You will see exactly what Moshy can offer you
            before committing to anything.
          </p>
          <div className="mt-5 flex justify-center">
            <Cta label="Start your free eligibility check" loc="closing-cta" />
          </div>
        </div>

        <div className="mb-10">
          <NewsletterSignup
            variant="alert"
            source="deal-alert-moshy-review"
            interest="Moshy offer"
            heading="Not ready today? Get told when the Moshy offer changes."
            sub="New customers can currently get $120 off with code REFERRAL120. We'll email you if that changes, and nothing else."
          />
        </div>

        <div className="border-t border-[#e5e9e7] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">About Moshy →</Link>
          <Link href="/moshy-eligibility" style={{ color: CYAN }} className="hover:opacity-80">The eligibility check, explained →</Link>
          <Link href="/moshy-alternatives" style={{ color: CYAN }} className="hover:opacity-80">Moshy alternatives →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy-review" />

        <AffiliateDisclosure className="mt-8" />
        <p className="text-[#9aa39c] text-xs mt-3 leading-relaxed">
          Nothing on this page is medical advice. Prescription medicines in
          Australia are available only after assessment by a registered practitioner.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy" label="Check eligibility" />
    </ConsumerShell>
  );
}
