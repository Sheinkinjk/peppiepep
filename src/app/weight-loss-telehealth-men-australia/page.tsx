import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.weightLossTelehealthMen);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Why do some weight loss services market to men and others to women?",
    a: "Partly clinical tailoring and partly candour. Providers found some men engage more readily with a service worded for them, so the marketing split. In Australia, Moshy runs a clinical pathway that is open to anyone eligible, while Juniper wraps coaching around medication and markets primarily to women. Both use an eligibility-then-practitioner-review model.",
  },
  {
    q: "Do I need to see a doctor in person first?",
    a: "Not to start. Men's weight loss telehealth begins with an online questionnaire that a registered Australian practitioner then reviews. If your case needs an in-person look, a credible service will tell you so rather than proceed.",
  },
  {
    q: "Is online weight loss treatment regulated in Australia?",
    a: "Yes. Any pathway that could involve prescription medicine requires individual assessment by a registered practitioner, and telehealth providers operate under Australian health service regulations. That is why legitimate services decline some applicants.",
  },
  {
    q: "What does a men's program typically include?",
    a: "The common shape is an eligibility questionnaire, practitioner review, a plan if approved, ongoing check-ins, and delivery of anything prescribed. Details, inclusions, and pricing vary by provider and are shown before you commit.",
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
  name: seoConfig.weightLossTelehealthMen.title,
  description: seoConfig.weightLossTelehealthMen.description,
  url: seoConfig.weightLossTelehealthMen.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function WeightLossTelehealthMenPage() {
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
          <span className="text-[#2b362f]">Weight Loss Telehealth for Men</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Weight loss telehealth for men in Australia: <span style={{ color: CYAN_LT }}>how it works and what to check</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Men are famously bad at booking the appointment. Telehealth exists to remove that excuse. This page covers
          how the men&apos;s services operate, the checklist worth running before you sign up with anyone, and where the
          main Australian provider fits.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page describes a category of
          services. It is not medical advice and does not recommend any treatment. Prescription medicines in Australia
          require individual assessment by a registered practitioner. Contains an affiliate link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Why this category exists</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The uncomfortable statistic behind men&apos;s telehealth is that men see doctors less often, and later, than
            women. Weight sits high on the list of topics men avoid raising. Moving the first step online, into a
            questionnaire you can fill in on the couch, removed the part most men were actually avoiding: the
            face-to-face conversation that starts it.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            What it did not remove is the clinician. In Australia, every legitimate service in this category still puts
            a registered practitioner between your questionnaire and any treatment. The format changed. The gatekeeping
            did not.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-4">The checklist before signing up with anyone</h2>
          <ul className="space-y-3">
            {[
              "Registered Australian practitioners doing the reviews, not offshore contractors",
              "A real screening step that declines unsuitable applicants",
              "Pricing shown in full before you commit to a subscription",
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
          <h2 className="text-xl font-black">Where Moshy fits</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Moshy runs a clinically-led telehealth pathway that is open to anyone eligible, and it passes the checklist
            above: AHPRA-registered practitioners, an eligibility step that genuinely screens, pricing disclosed inside
            the platform before any commitment, and Australian regulation. If you would rather have coaching wrapped
            around medication, Juniper markets primarily to women, and we cover the wider field in our{" "}
            <Link href="/online-weight-loss-programs-australia" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              online weight loss programs guide
            </Link>.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              The Moshy eligibility check takes about ten minutes and commits you to nothing. Our referral applies
              automatically through the link.
            </p>
            <a
              {...aff}
              data-cta="men-telehealth-main"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Check your eligibility on Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
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
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/moshy-vs-gp" style={{ color: CYAN }} className="hover:opacity-80">Moshy vs your GP →</Link>
          <Link href="/mens-health-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Men&apos;s health telehealth →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Always consult a qualified health
          professional before making health decisions.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
