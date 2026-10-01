import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import { MOSHY_TERMS_URL } from "@/lib/offers";
import TermsApplyLink, { OfferTermsNote } from "@/components/consumer/TermsApplyLink";

export const metadata = generateSEOMetadata(seoConfig.weightLossTelehealthMen);

const CYAN = "#007a95";
const CYAN_LT = "#007a95";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Why do some weight loss services market to men and others to women?",
    a: "Mostly marketing. Juniper designs its program for women, and Moshy describes itself as an online women's health clinic, and its services are open to anyone a practitioner assesses as suitable. Both start with an online assessment that a registered practitioner reviews, and both include app coaching, dietitian meal plans and a community (each provider's own page, read 30 September 2026).",
  },
  {
    q: "Do I need to see a doctor in person first?",
    a: "Not to start. Weight-loss telehealth begins with an online questionnaire that a registered Australian practitioner then reviews. If your case needs an in-person look, a credible service will tell you so rather than proceed.",
  },
  {
    q: "Is online weight loss treatment regulated in Australia?",
    a: "Yes. Practitioners consulting through these services must be registered with AHPRA, and telehealth providers operate under Australian health service regulations. A registered practitioner reviews each applicant and some are declined.",
  },
  {
    q: "What does a men's program typically include?",
    a: "The common shape is an online questionnaire, a consultation with a registered practitioner, ongoing check-ins, and support such as coaching and meal plans. Inclusions and pricing vary by provider and are shown before you commit.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Weight Loss Telehealth for Men", item: `${SITE_URL}/weight-loss-telehealth-men-australia` },
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
  name: seoConfig.weightLossTelehealthMen.title,
  description: seoConfig.weightLossTelehealthMen.description,
  url: seoConfig.weightLossTelehealthMen.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

export default function WeightLossTelehealthMenPage() {
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
          <span className="text-[#14120f]">Weight Loss Telehealth for Men</span>
        <SectionMark kind="scale" size={56} /></nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Weight loss telehealth for men in Australia: <span>how it works and what to check</span>
        </h1>
        <p className="text-[#56504a] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          For men in Australia, the weight-management telehealth service we cover is Moshy. It describes itself as
          an online women&apos;s health clinic, but its services are open to anyone a practitioner assesses as
          suitable; Juniper, the other service we compare, is designed for women. Moshy starts with an online
          questionnaire and a consult by phone or video with a registered practitioner, who decides whether any
          treatment is appropriate. It includes in-app coaching, dietitian meal plans and a community, and its code
          REFERRAL120 takes $120 off a first order with a 3-month minimum commitment.
        </p>

        <p className="mb-10 rounded-lg border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-xs leading-relaxed text-[#56504a]">
          <span className="font-semibold text-[#14120f]">Information only.</span> This page describes a category of
          services. It is not medical advice and does not recommend any treatment. Contains an affiliate link: we may earn a commission from Moshy, at no extra cost to you.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">How it works</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            You complete an online questionnaire in your own time. A registered practitioner reviews it and consults
            with you by phone or video, then decides whether any treatment is appropriate. Some applicants are declined.
            A service that promises a particular treatment before a practitioner has assessed you is one to avoid.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-4">The checklist before signing up with anyone</h2>
          <ul className="space-y-3">
            {[
              "Registered Australian practitioners doing the reviews, not offshore contractors",
              "A real screening step that declines unsuitable applicants",
              "Pricing shown in full before you commit, including any minimum term",
              "An Australian entity operating under Australian health regulations",
              "A clear path to human support once you are a subscriber",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#14120f] leading-relaxed">
                <Check className="h-4 w-4 shrink-0 mt-1" style={{ color: CYAN_LT }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Where Moshy fits</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed">
            Moshy takes anyone a practitioner assesses as suitable and passes the checklist above: AHPRA-registered practitioners, a
            screening step, pricing published on its own site, and Australian regulation. It includes in-app coaching,
            dietitian meal plans and a community. Juniper, the other service we compare, is designed for women; our{" "}
            <Link href="/best-weight-loss-telehealth-australia" className="underline decoration-[#ded8cd] underline-offset-2 hover:text-[#14120f]" style={{ color: CYAN }}>
              weight loss telehealth comparison
            </Link>{" "}
            sets out what each includes.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#14120f] text-sm sm:text-base leading-relaxed mb-4">
              Our link carries REFERRAL120: $120 off a first order, one use per new customer, with a 3-month minimum
              commitment. <TermsApplyLink href={MOSHY_TERMS_URL} />
            </p>
            <a
              {...aff}
              data-cta="men-telehealth-main"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Continue to Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
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
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy: how to start</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/moshy-vs-gp" style={{ color: CYAN }} className="hover:opacity-80">Moshy vs your GP →</Link>
          <Link href="/mens-health" style={{ color: CYAN }} className="hover:opacity-80">Men&apos;s health →</Link>
          <Link href="/weight-loss-telehealth-women-australia" style={{ color: CYAN }} className="hover:opacity-80">Weight loss telehealth for women →</Link>
        </div>

        <p className="text-[#56504a] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Any treatment is decided by a
          registered practitioner after an individual assessment. Always consult a qualified health
          professional before making health decisions.
        </p>
        <p className="text-[#56504a] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#56504a]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Get started" />
    </ConsumerShell>
  );
}
