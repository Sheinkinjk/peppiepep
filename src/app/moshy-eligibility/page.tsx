import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.moshyEligibility);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "How long does the Moshy eligibility quiz take?",
    a: "Around five to ten minutes for most people. You can do it on a phone, and nothing is charged at this stage.",
  },
  {
    q: "Does completing the quiz commit me to anything?",
    a: "No. The questionnaire is the assessment step. Any plan, treatment options, and pricing are shown afterwards, and you decide whether to proceed from there.",
  },
  {
    q: "Why do some people get declined?",
    a: "Every submission is reviewed by a registered Australian practitioner, and they will decline or redirect applicants where the service is not the right fit for their circumstances. That individual assessment is required for any prescription pathway in Australia.",
  },
  {
    q: "What should I have ready before starting?",
    a: "Roughly ten minutes, and honest answers about your health history and current situation. Accurate answers matter because a practitioner makes a real decision based on them.",
  },
  {
    q: "Who can complete the Moshy eligibility check?",
    a: "Moshy's eligibility check is open to anyone considering the clinical pathway. It gathers your health history so an Australian-registered practitioner can assess suitability individually. If you would rather have coaching wrapped around medication, Juniper runs a comparable eligibility model with that focus.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy Eligibility Check", item: `${SITE_URL}/moshy-eligibility` },
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
  name: seoConfig.moshyEligibility.title,
  description: seoConfig.moshyEligibility.description,
  url: seoConfig.moshyEligibility.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

export default function MoshyEligibilityPage() {
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
          <span className="text-[#2b362f]">Moshy Eligibility</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          The Moshy eligibility check, <span style={{ color: CYAN_LT }}>explained before you start it</span>
        </h1>
        {/* Above the first affiliate link, not below it. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Ten minutes, a questionnaire, and a practitioner on the other end. Here is what the Moshy quiz actually asks,
          what happens after you hit submit, and why not everyone gets through.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page explains a sign-up process.
          It is not medical advice and does not imply the service is suitable for any individual. This page contains an
          affiliate referral link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">What the quiz covers</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The questionnaire works through your health history, your current situation, and what you are hoping to
            achieve. It is the same territory a doctor would cover in a first appointment, arranged as a structured
            form instead of a conversation. Answer it honestly. A registered practitioner makes a genuine decision
            based on what you write, and vague or inaccurate answers help nobody, least of all you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-5">What happens after you submit</h2>
          <ol className="space-y-4">
            {[
              ["Your submission goes into a review queue", "A registered Australian practitioner reads it. This is a person, not an algorithm, which is why the response is not instant."],
              ["One of three things comes back", "You are approved to continue, asked follow-up questions, or told the service is not the right fit and pointed elsewhere."],
              ["If approved, you see the plan before paying", "Treatment options and the subscription price are laid out inside the platform. Nothing is charged until you choose to proceed."],
            ].map(([h, b], i) => (
              <li key={h} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ background: `${CYAN}20`, color: CYAN_LT }}>
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#10251b] text-sm sm:text-base">{h}</p>
                  <p className="text-[#3d4b44] text-sm leading-relaxed mt-1">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Why some applications are declined</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Because it has to work that way. In Australia, any pathway that could end in a prescription requires a
            registered practitioner to assess each person individually, and a genuine assessment produces some
            declines. If your circumstances are complex, or something in your answers needs an in-person look, the
            reviewing practitioner will say so rather than push you through.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Getting declined costs you nothing except the ten minutes. Getting approved means a practitioner has
            actually looked at your case, which is precisely what you want from a health service.
          </p>
        </section>

        <div className="rounded-xl border px-6 py-5 mb-12" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
            Ready to see where you stand? The check is free to complete and the referral applies automatically through
            this link.
          </p>
          <a
            {...aff}
            data-cta="eligibility-main"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Start the Moshy eligibility check ($120 off first order)
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Questions people ask</h2>
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
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Our full Moshy review →</Link>
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy, in full →</Link>
          <Link href="/weight-loss-telehealth-men-australia" style={{ color: CYAN }} className="hover:opacity-80">Men&apos;s weight loss telehealth →</Link>
        </div>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy-eligibility" />

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Prescription medicines in
          Australia are available only after individual assessment by a registered practitioner.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
