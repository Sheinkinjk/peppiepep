import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

export const metadata = generateSEOMetadata(seoConfig.weightLossEligibility);

const CYAN = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "What BMI do you need to qualify for weight-loss treatment in Australia?",
    a: "There is no self-serve threshold, but prescribing guidelines generally point to a body-mass index (BMI) of 30 or above, or 27 or above alongside a weight-related health condition. That is a starting point for a clinical decision, not an automatic qualification. A registered practitioner assesses your full picture individually.",
  },
  {
    q: "Do I automatically qualify if my BMI is over 30?",
    a: "No. A higher BMI is one factor a practitioner weighs, not a guarantee. Eligibility also considers your medical history, other medications, and whether a medical weight-management program is appropriate and safe for you. Some people who meet a BMI band are still declined after review.",
  },
  {
    q: "Can I qualify with a BMI under 30?",
    a: "Sometimes. Guidelines commonly consider a BMI of 27 or above where there is a weight-related health condition, such as type 2 diabetes, high blood pressure or sleep apnoea. Whether that applies to you is a clinical decision made by a registered practitioner, not something a webpage can confirm.",
  },
  {
    q: "Do I need a GP referral to be assessed?",
    a: "Not to start. Online telehealth services run their own eligibility questionnaire that a registered Australian practitioner reviews, with no GP referral needed to begin. You can also go through your own GP if you prefer whole-of-health care.",
  },
  {
    q: "What happens if I do not qualify?",
    a: "A credible service tells you rather than proceeding, and may suggest other options such as your GP or a coaching-led program. Being declined is the screening working as intended. This page is general information, not medical advice.",
  },
];

const criteria = [
  ["A BMI of 30 or above", "The most commonly cited threshold prescribing guidelines use for weight-management treatment."],
  ["A BMI of 27 or above with a weight-related condition", "Such as type 2 diabetes, high blood pressure, sleep apnoea or PCOS. The condition, not just the number, is part of the picture."],
  ["Your wider medical history", "Other conditions, medications and history all factor into whether a program is appropriate and safe for you."],
  ["A practitioner's individual judgement", "The criteria above guide the decision; a registered Australian practitioner makes it, case by case, and can decline."],
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Treatment Eligibility", item: `${SITE_URL}/weight-loss-treatment-eligibility-australia` },
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
  name: seoConfig.weightLossEligibility.title,
  description: seoConfig.weightLossEligibility.description,
  url: seoConfig.weightLossEligibility.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
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

export default function WeightLossEligibilityPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/weight-loss" className="hover:text-[#2b362f] transition-colors">Weight loss</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Treatment eligibility</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Do you qualify for weight-loss treatment in Australia? <span style={{ color: CYAN }}>The eligibility criteria, explained</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
          There is no online form that decides this for you, but there are clear criteria a registered practitioner uses.
          This page explains what generally counts, what does not automatically qualify you, and the fastest way to find
          out where you actually stand. It is general information, not medical advice.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> Eligibility for any medical
          weight-management program is decided individually by a registered Australian practitioner after an assessment.
          This page describes general criteria and contains a disclosed affiliate referral link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">How eligibility actually works</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            A medical weight-management program is not something you can select for yourself. You complete a health
            questionnaire, a registered Australian practitioner reviews it individually, and they decide whether a program
            is appropriate and safe for you. The criteria below guide that decision; they do not replace it, and some
            people who meet a threshold are still declined.
          </p>
        </section>

        <section className="space-y-5 mb-10">
          <h2 className="text-xl font-black">The criteria practitioners generally consider</h2>
          <ul className="space-y-3">
            {criteria.map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                  <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-[#10251b]">{t}.</span> {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            These figures are the thresholds commonly cited in prescribing guidelines. The exact criteria a given service
            applies can differ, which is why the only reliable answer comes from an assessment.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">What does not automatically qualify you</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Meeting a BMI band is a starting point, not a green light. A practitioner also weighs your medical history,
            other medications and overall suitability, and can decline. Equally, no service can promise you a specific
            treatment before it has assessed you, so treat any that implies a guaranteed outcome with caution.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              The quickest way to find out where you stand is a free online eligibility check reviewed by a registered
              Australian practitioner. It takes a few minutes and commits you to nothing. Moshy is one gender-neutral
              Australian service that runs this check, and new customers get $120 off their first order through our link.
            </p>
            <Cta label="Check your eligibility with Moshy" loc="mid-cta" />
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
          <h2 className="text-lg sm:text-xl font-black text-[#10251b]">Find out if you qualify</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4b44]">
            A free eligibility check, reviewed by a registered Australian practitioner, is the only way to know for
            certain. It takes a few minutes and commits you to nothing.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Cta label="Check your eligibility with Moshy" loc="closing-cta" />
            <Link href="/weight-loss-quiz" className="inline-flex items-center gap-2 rounded-xl border border-[#e5e9e7] bg-white px-6 py-3 text-sm font-bold text-[#10251b] hover:bg-[#f5f8f6] transition-colors">
              Take the 30-second match
            </Link>
          </div>
        </div>

        <div className="mb-10">
          <NewsletterSignup
            variant="band"
            source="weight-loss-eligibility"
            heading="Weighing up weight-loss telehealth?"
            sub="Get the occasional plain-English guide and comparison update, no spam."
          />
        </div>

        <div className="border-t border-[#e5e9e7] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Best weight-loss telehealth, compared →</Link>
          <Link href="/weight-loss-telehealth-cost-australia" style={{ color: CYAN }} className="hover:opacity-80">What it costs →</Link>
          <Link href="/weight-loss" style={{ color: CYAN }} className="hover:opacity-80">The full weight-loss hub →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains a disclosed affiliate referral link. We may earn a commission
          if you sign up through it, at no extra cost to you. Commissions never change what we write. Nothing on this page
          is medical advice, and eligibility for any program is decided by a registered Australian practitioner after an
          individual assessment.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
