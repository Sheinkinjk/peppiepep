import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";
import { MOSH_TERMS_URL, MOSH_PROMOTIONS_PAGE_URL } from "@/lib/offers";
import TermsApplyLink, { OfferTermsNote } from "@/components/consumer/TermsApplyLink";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.moshReview);

const CYAN = "#007a95";
const aff = { href: MOSH_HAIR_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

/*
 * Rewritten 30 Sep 2026. The lead now answers "is Mosh legit" in its first
 * sentence with facts read off Mosh's own site; the title and h1 agree; billing
 * is described as Mosh's own terms describe it (a first hair order covers three
 * months) rather than as "monthly"; the money-back guarantee carries its
 * condition (quarterly hair programs); the unsourced "what people raise" section
 * is gone; and the legit / worth-it questions are answered once, in the body,
 * rather than again in the FAQ.
 */
const MOSH_READ = "30 September 2026";

const faqs = [
  {
    q: "What does Mosh do?",
    a: "Mosh runs online consultations for men's health, including hair loss. You complete a questionnaire with photos, and a registered practitioner reviews it. It is not an emergency or diagnostic service. General information, not medical advice.",
  },
  {
    q: "How does Mosh bill, and is there a discount?",
    a: "Mosh runs as a subscription. It lists its plans on its own pricing page; the practitioner decides which, if any, applies, and Mosh shows the price before you pay. Its promotions page describes first-order hair discounts as covering the first three months. REFERAL55 takes 55% off. Use code REFERAL55 at checkout; our link opens Mosh's sign-up with the offer. New customers only; applies to the first order of a Mosh hair program; full terms at getmosh.com.au/promotions-terms-and-conditions. Later orders are at the standard plan rate.",
  },
  {
    q: "Can I cancel Mosh?",
    a: `Mosh advertises no lock-in contracts and says you can cancel anytime (getmosh.com.au/start/referlabs, read ${MOSH_READ}). Mosh also offers a 180-day money-back guarantee on quarterly hair programs, under its terms at getmosh.com.au/promotions-terms-and-conditions. Keep written confirmation of any cancellation. Refer Labs does not manage Mosh billing.`,
  },
  {
    q: "Is this page affiliated with Mosh?",
    a: "This page is published by Refer Labs and contains a disclosed affiliate referral link, so we may earn a commission if you sign up through it, at no extra cost to you. Nothing here is medical advice.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
    { "@type": "ListItem", position: 3, name: "Mosh Review", item: `${SITE_URL}/mosh-review` },
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
  datePublished: "2026-08-07",
  dateModified: pageDates("/mosh-review")?.updated ?? "2026-08-07",
  name: seoConfig.moshReview.title,
  description: seoConfig.moshReview.description,
  url: seoConfig.moshReview.url,
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

export default function MoshReviewPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/hair-loss" className="hover:text-[#14120f] transition-colors">Hair loss</Link>
          <span>/</span>
          <span className="text-[#14120f]">Mosh Review</span>
        <SectionMark kind="comb" size={56} /></nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Mosh Review 2026: <span>Is It Legit, and Is It Worth It?</span>
        </h1>
        <p className="text-[#14120f] text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
          Yes, Mosh is legit. It is an Australian-owned telehealth service that says it works only with AHPRA-registered
          doctors and nurse practitioners based in Australia, pays them on a fee-for-service basis, and is certified by
          LegitScript (getmosh.com.au, read {MOSH_READ}). Whether it is worth it depends on whether you want an online
          consultation instead of a GP appointment, and on the standard rate you pay after the first order.
        </p>
        {/* Below the lead. The first paragraph after the h1 is the answer;
            a disclosure in that slot is what an engine lifts instead. Still
            above the first affiliate link, which is what it is for. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <CodeAnswer code="REFERAL55" className="mt-6 mb-10">
          REFERAL55, the Mosh code Refer Labs holds, gets a new customer 55% off a first order.
          Use code REFERAL55 at checkout; our link opens Mosh&apos;s sign-up with the offer.{" "}
          <TermsApplyLink href={MOSH_TERMS_URL} />
        </CodeAnswer>
        <OfferSchema code="REFERAL55" />

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">How Mosh works</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Mosh is an online consultation with an AHPRA-registered practitioner, who decides whether any treatment is
            appropriate. For hair loss you answer questions about your history and general health and upload photos;
            the practitioner may follow up by message, call or video. There is no charge for the initial consultation;
            program fees apply.
          </p>
          <div className="pt-1">
            <Cta label="Continue to Mosh" loc="how-it-works" />
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Is Mosh legit?</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Each of these is read off Mosh&apos;s own site, {MOSH_READ}:
          </p>
          <ul className="space-y-3">
            {[
              ["AHPRA-registered practitioners", "Mosh says it works only with doctors and nurse practitioners registered with AHPRA and based in Australia."],
              ["Paid fee-for-service", "Mosh says its practitioners are paid on a fee-for-service basis, so their pay does not depend on the outcome of a consultation."],
              ["Certified by LegitScript", "Mosh states the certification on its homepage."],
              ["Published terms", "A 180-day money-back guarantee on quarterly hair programs and a price match on substantially comparable programs, both under Mosh's terms."],
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
            <a href={MOSH_PROMOTIONS_PAGE_URL} target="_blank" rel="nofollow noopener" style={{ color: CYAN }} className="font-semibold underline underline-offset-2">Read Mosh&apos;s guarantee and promotions terms</a>
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Is it worth it?</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            It suits men with gradual thinning or a receding hairline who would rather not book an appointment: the
            consultation is online and a practitioner reviews it. Mosh offers a 180-day money-back guarantee on
            quarterly hair programs, under <a href={MOSH_PROMOTIONS_PAGE_URL} target="_blank" rel="nofollow noopener" style={{ color: CYAN }} className="font-semibold underline underline-offset-2">its terms</a>. A GP suits you better if the loss is sudden or patchy, or you want blood tests or a
            dermatologist referral; the consult may be bulk-billed, and your GP already knows your history.
          </p>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            On cost, judge Mosh on the standard rate after the first order, not the discounted one. Mosh lists its plans
            on its own pricing page; the practitioner decides which, if any, applies, and Mosh shows the price before you
            pay.
          </p>
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
          {/* The full offer terms; beside the code there is only "T&Cs apply" (1 Oct 2026). */}
          <OfferTermsNote brand="Mosh" className="mt-5" />
        </section>

        <div className="rounded-2xl border px-6 py-7 mb-10 text-center sm:px-8" style={{ borderColor: `${CYAN}30`, background: `${CYAN}08` }}>
          <h2 className="text-lg sm:text-xl font-black text-[#14120f]">Start with an online consultation</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#56504a]">
            No charge for the initial consultation; program fees apply. REFERAL55 takes 55% off a new customer&apos;s
            first order. <TermsApplyLink href={MOSH_TERMS_URL} />
          </p>
          <div className="mt-5 flex justify-center">
            <Cta label="Continue to Mosh" loc="closing-cta" />
          </div>
        </div>

        <div className="mb-10">
          <NewsletterSignup
            variant="band"
            source="mosh-review"
            heading="Weighing up your hair-loss options?"
            sub="Get the occasional plain-English guide and comparison update, no spam."
          />
        </div>

        <div className="border-t border-[#ded8cd] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshhair" style={{ color: CYAN }} className="hover:opacity-80">Mosh: how it works &amp; the offer →</Link>
          <Link href="/best-hair-loss-treatment-australia" style={{ color: CYAN }} className="hover:opacity-80">Best hair-loss treatment, compared →</Link>
          <Link href="/hair-loss" style={{ color: CYAN }} className="hover:opacity-80">The full hair-loss hub →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Mosh" kind="offer_observation" hub="hair-loss" route="/mosh-review" />

        <AffiliateDisclosure className="mt-8" />
        <p className="text-[#56504a] text-xs mt-8 leading-relaxed">
          Nothing on this page is medical advice.
        </p>
        <p className="text-[#56504a] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#56504a]">All guides</Link></p>
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh · hair-loss telehealth" label="Continue to Mosh" />
    </ConsumerShell>
  );
}
