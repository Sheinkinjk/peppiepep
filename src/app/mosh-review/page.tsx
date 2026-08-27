import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import VerifiedStamp from "@/components/consumer/VerifiedStamp";
import { VERIFIED_DATE } from "@/lib/offers";
import FactHistory from "@/components/facts/FactHistory";

export const metadata = generateSEOMetadata(seoConfig.moshReview);

const CYAN = "#0a7c42";
const aff = { href: MOSH_HAIR_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Is Mosh legit?",
    a: "Yes. Mosh is an Australian men's health telehealth service operating under Australian health service regulations, and hair-loss enquiries are reviewed by registered Australian practitioners. It publishes its plans and prices openly and advertises a money-back guarantee, which are the markers of a real clinical service rather than a storefront.",
  },
  {
    q: "Does Mosh actually work for hair loss?",
    a: "Mosh is a service rather than a treatment in itself: it provides access to a practitioner who decides whether prescription hair-loss treatment is appropriate for you. Evidence-based hair-loss treatment generally takes several months to show change and works while it is used. Outcomes vary between people, and suitability is a clinical decision. This is general information, not medical advice.",
  },
  {
    q: "Is Mosh worth it?",
    a: "It depends on what you want. Mosh's value is convenience and a genuine practitioner review with no in-person appointment, with the plan and price shown before you commit. A GP may be cheaper and already knows your history, while Mosh is faster and fully online. Since any treatment is ongoing, the value tracks how consistently you stick with it.",
  },
  {
    q: "How much does Mosh cost, and is there a discount?",
    a: "Mosh runs on a monthly subscription with free delivery, and you see the plan and price before you commit. New customers get 55% off their first order through the link on this page, applied automatically with no code to type. The exact plan and price are set after the assessment, so check the current terms on Mosh when you click through.",
  },
  {
    q: "Can I cancel Mosh?",
    a: "Mosh runs on a subscription and advertises a money-back guarantee. Cancellation and refund terms are set by Mosh and can change, so check the current terms on Mosh's own site before subscribing, and keep written confirmation of any cancellation. Refer Labs does not manage Mosh billing.",
  },
  {
    q: "Is this page affiliated with Mosh?",
    a: "This page is published by Refer Labs and contains a disclosed affiliate referral link. The referral applies automatically when you click through, at no extra cost to you, and it never changes what we write. Nothing here is medical advice.",
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
  dateModified: "2026-08-07",
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
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/hair-loss" className="hover:text-[#2b362f] transition-colors">Hair loss</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Mosh Review</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Mosh review: <span style={{ color: CYAN }}>is it legit, and is it worth it?</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
          An independent look at Mosh, the Australian men&apos;s hair-loss telehealth service: whether it is a real
          clinical service, what it costs, what people actually raise about it, and how to start.
        </p>
        <div className="mb-6">
          <VerifiedStamp date={VERIFIED_DATE} label="55% off first order for new customers · verified" />
        </div>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page describes a telehealth service.
          It is not medical advice, does not recommend any treatment, and does not imply suitability for any individual.
          This page contains a disclosed affiliate referral link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The short version</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Mosh is an Australian men&apos;s health telehealth service, and hair loss is the reason most people come
            looking. You complete a questionnaire and photo assessment online, a registered Australian practitioner
            reviews your case, and if it is appropriate you continue on a subscription with treatment delivered to your
            door. No waiting room and no referral letter to get started.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Delivery is free, new customers get 55% off their first order with code REFERAL55, and you see the plan and
            price before you commit. The starting point is a quick online consultation that commits you to nothing.
          </p>
          <div className="pt-1">
            <Cta label="Start the Mosh consultation" loc="short-version" />
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Is Mosh legit?</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            On the markers that matter, yes. Mosh is an Australian telehealth provider operating under Australian health
            service regulations, and enquiries are reviewed by registered Australian practitioners rather than an
            automatic checkout. Some applicants are declined, which is the screening working as it should.
          </p>
          <ul className="space-y-3">
            {[
              ["Registered Australian practitioners", "A practitioner reviews each case individually and decides whether treatment is appropriate. Not everyone is approved."],
              ["Pricing shown before you commit", "Mosh lays out the plan and price inside its flow before you pay, with free delivery, so there are no surprises at checkout."],
              ["A money-back guarantee", "Mosh advertises a money-back guarantee, which lowers the risk of trying it. Confirm the current terms on their site."],
              ["Disclosed, not anonymous", "It is a known Australian men's health brand, not a faceless storefront, and it does not promise a specific outcome before an assessment."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CYAN }} />
                <span className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-[#10251b]">{t}.</span> {d}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Is it worth it?</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            That comes down to what you want from it. Mosh&apos;s value is convenience and a genuine practitioner review
            with no in-person appointment, with pricing shown before you commit. A GP may be cheaper and already knows
            your history; Mosh is faster and fully online. Because any hair-loss treatment is ongoing, the real cost is
            long-term, and the value tracks how consistently you stick with it.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            If you want a fast, fully online way to find out whether treatment is appropriate for you, with a money-back
            guarantee if it is not for you, it is a low-friction place to start. If you would rather be seen in person or
            keep everything with your GP, that is a reasonable choice too.
          </p>
          <div className="pt-1">
            <Cta label="See what Mosh offers you" loc="worth-it" />
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">What people actually raise</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The most common points in Australian discussions are practical rather than about legitimacy: that it is a
            subscription, so it is an ongoing cost rather than a one-off; that hair-loss treatment takes months to show
            change and only works while it is used; and that you should read the cancellation terms before you start.
            None of these are unique to Mosh, but they are worth going in with your eyes open.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              The online consultation is free, takes a few minutes, and commits you to nothing. It is the quickest way to
              find out whether treatment is appropriate for you, with 55% off your first order using code REFERAL55.
            </p>
            <Cta label="Start the Mosh consultation" loc="mid-cta" />
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
            The Mosh consultation is free and takes a few minutes, with 55% off your first order through our link. You
            will see the plan and price before committing to anything.
          </p>
          <div className="mt-5 flex justify-center">
            <Cta label="Start the Mosh consultation" loc="closing-cta" />
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

        <div className="border-t border-[#e5e9e7] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshhair" style={{ color: CYAN }} className="hover:opacity-80">Mosh: how it works &amp; the offer →</Link>
          <Link href="/best-hair-loss-treatment-australia" style={{ color: CYAN }} className="hover:opacity-80">Best hair-loss treatment, compared →</Link>
          <Link href="/hair-loss" style={{ color: CYAN }} className="hover:opacity-80">The full hair-loss hub →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Mosh" kind="offer_observation" hub="hair-loss" route="/mosh-review" />

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains a disclosed affiliate referral link. We may earn a commission
          if you sign up through it, at no extra cost to you. Commissions never change what we write. Nothing on this page
          is medical advice. Prescription hair-loss treatment in Australia is available only after assessment by a
          registered practitioner who decides suitability.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh · hair-loss telehealth" label="Start the consultation" />
    </ConsumerShell>
  );
}
