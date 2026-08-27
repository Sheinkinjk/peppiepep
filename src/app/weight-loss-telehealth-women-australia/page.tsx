import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.weightLossTelehealthWomen);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Which weight loss telehealth services are aimed at women?",
    a: "In Australia, Juniper markets primarily to women and wraps health coaching around clinical care. Moshy runs a clinically-led pathway that is open to anyone eligible and is not gendered. Both start with an online questionnaire that a registered Australian practitioner reviews before any treatment is discussed. The right fit depends on whether you want coaching built in or a leaner clinical pathway.",
  },
  {
    q: "Do I need a referral or an in-person appointment to start?",
    a: "Not to start. Women's weight loss telehealth begins with an online eligibility questionnaire that a registered Australian practitioner then reviews. If your situation needs an in-person assessment, a credible service will tell you rather than proceed. Prescription medicines still require individual clinical assessment.",
  },
  {
    q: "Is it safe to do weight loss treatment online in Australia?",
    a: "Any pathway that could involve prescription medicine requires assessment by a registered practitioner, and telehealth providers operate under Australian health service regulations. That is why legitimate services screen applicants and decline some. Safety comes from the practitioner review, which the online format keeps in place rather than removing.",
  },
  {
    q: "What does a women's program usually include?",
    a: "The common shape is an eligibility questionnaire, practitioner review, a plan if approved, ongoing check-ins, and delivery of anything prescribed. Coaching-led services add habit and nutrition support around that. Inclusions and pricing vary by provider and are shown before you commit.",
  },
  {
    q: "How much does Juniper cost, and is there a discount?",
    a: "Juniper runs as a monthly subscription that its own site says covers treatment, unlimited consultations and delivery, with optional 1:1 coaching as a paid add-on and a 30-day money-back guarantee. There is no single fixed price, since any treatment is arranged only after an individual assessment, and you can view Juniper's latest offers through our link. The cost that applies to you is confirmed inside Juniper's own flow before you commit.",
  },
];

const articleSchema = comparisonArticleSchema({
  headline: "Weight loss telehealth for women in Australia: Refer Labs' comparison",
  description: "Refer Labs compares coaching-led and clinical weight-loss telehealth pathways for women in Australia, and where Juniper and Moshy fit.",
  url: "https://referlabs.com.au/weight-loss-telehealth-women-australia",
  datePublished: "2026-07-24",
  dateModified: "2026-08-06",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Weight Loss Telehealth for Women", item: `${SITE_URL}/weight-loss-telehealth-women-australia` },
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
  datePublished: "2026-07-24",
  dateModified: "2026-07-24",
  name: seoConfig.weightLossTelehealthWomen.title,
  description: seoConfig.weightLossTelehealthWomen.description,
  url: seoConfig.weightLossTelehealthWomen.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function WeightLossTelehealthWomenPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Weight Loss Telehealth for Women</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Weight loss telehealth for women in Australia: <span style={{ color: CYAN_LT }}>the options, and how to choose</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Most of the weight-loss telehealth marketing aimed at women leads with coaching and community. That suits some
          people and not others. This page explains how the women&apos;s services actually work, the difference between a
          coaching-led program and a leaner clinical pathway, and the checklist worth running before you commit to any of
          them.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page describes a category of
          services. It is not medical advice and does not recommend any treatment. Prescription medicines in Australia
          require individual assessment by a registered practitioner. Contains an affiliate link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Coaching-led vs clinical pathways</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The services marketed to women tend to split into two shapes. Coaching-led programs, like Juniper, wrap habit,
            nutrition and community support around any medication, which suits people who want structure and
            accountability alongside the clinical side. Leaner clinical pathways, like Moshy, focus on the practitioner
            assessment and treatment without the coaching layer, which suits people who want a straightforward route and
            a lower ongoing cost.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Neither is better in the abstract. The question is what you actually want to pay for: the coaching wrap, or
            just the clinical pathway. Both keep a registered practitioner between your questionnaire and any treatment.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-4">The checklist before signing up with anyone</h2>
          <ul className="space-y-3">
            {[
              "Registered Australian practitioners doing the reviews, not offshore contractors",
              "A real screening step that declines unsuitable applicants",
              "Pricing shown in full before you commit, including what coaching adds",
              "An Australian entity operating under Australian health regulations",
              "A clear path to human support once you are a subscriber",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#2b362f] leading-relaxed">
                <Check className="h-4 w-4 shrink-0 mt-1" style={{ color: CYAN_LT }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Where Juniper fits</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Juniper is the service built specifically for women, and its Weight Reset Program is the coaching-led option:
            unlimited practitioner follow-ups, health tracking through an app, a patient community, and optional 1:1
            coaching wrapped around any treatment. It suits people who want structure and accountability alongside the
            clinical care rather than a bare prescription. Suitability is assessed individually by an Australian-registered
            practitioner, and some applicants are declined.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            You can view Juniper&apos;s latest offers through our link, and any treatment is arranged only after an
            individual assessment, so the cost is confirmed inside Juniper&apos;s own flow before you commit. Our{" "}
            <Link href="/juniper" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              full Juniper review
            </Link>{" "}
            breaks down exactly what is included.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              Juniper&apos;s online eligibility check takes a few minutes and commits you to nothing. An
              Australian-registered practitioner reviews your answers before anything is prescribed.
            </p>
            <Link
              href="/juniper"
              data-cta="women-telehealth-juniper"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Read our Juniper review
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Where Moshy fits</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Moshy runs a clinically-led telehealth pathway that is open to anyone eligible, women included, and it passes
            the checklist above: AHPRA-registered practitioners, an eligibility step that genuinely screens, pricing
            disclosed inside the platform before any commitment, and Australian regulation. If you would rather have
            coaching wrapped around clinical care, Juniper is the women-focused option, and we compare the two directly in
            our{" "}
            <Link href="/moshy-vs-juniper" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              Moshy vs Juniper guide
            </Link>.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              New customers currently get $120 off their first order (code REFERRAL120), applied automatically through the
              link. The Moshy eligibility check takes about ten minutes and commits you to nothing.
            </p>
            <a
              {...aff}
              data-cta="women-telehealth-main"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Check your eligibility on Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
            <EarningsBalanceNote earnFrom="Moshy" noEarnFrom="Juniper" className="mt-4 max-w-2xl" />
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

        <div className="border-t border-[#e5e9e7] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy-vs-juniper" style={{ color: CYAN }} className="hover:opacity-80">Moshy vs Juniper &rarr;</Link>
          <Link href="/juniper" style={{ color: CYAN }} className="hover:opacity-80">Juniper review &rarr;</Link>
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Start with Moshy</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review &rarr;</Link>
          <Link href="/online-weight-loss-programs-australia" style={{ color: CYAN }} className="hover:opacity-80">Online weight loss programs &rarr;</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Always consult a qualified health
          professional before making health decisions.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">&copy; 2026 Refer Labs &middot; Australia &middot; <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
