import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { MIDOC } from "@/lib/partners/midoc";

export const metadata = generateSEOMetadata(seoConfig.midoc);

const UPDATED = MIDOC.readOn;

/**
 * Every figure on this page comes from src/lib/partners/midoc.ts, which carries
 * the date it was read off midoc.com.au and prints it beside the numbers, per
 * the site's provenance rule. Refreshing the prices is one edit to that file.
 *
 * TGA: Midoc supplies Schedule 4 treatments through several of the lines below,
 * and this page carries a commission link, so it cannot claim the editorial
 * exemption. No medicine is named or made identifiable anywhere on it. The page
 * describes access, price and process only. Do not add a product name.
 */

const FAQS = [
  {
    q: "What is Midoc?",
    a: `Midoc is an Australian telehealth service. You complete a short form, a doctor registered with AHPRA calls you by phone or video, and where appropriate they can issue a prescription, a medical certificate or a specialist referral. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
  },
  {
    q: "How much does a Midoc consultation cost?",
    a: `Midoc lists standard consultations at ${MIDOC.consultStandard}, covering general health, child health, COVID-19, hair loss, sexual health and STI, smoking cessation and continence. Specialist consultations are listed at ${MIDOC.consultSpecialist}, covering, among other services, men's health priced after the Medicare rebate, dementia support and wound care. A mental health care plan or review is listed as ${MIDOC.mentalHealth}. Medical certificates are ${MIDOC.certificateSingleDay} for a single day and ${MIDOC.certificateWeek} for multiple days. Read off midoc.com.au on ${MIDOC.readOnLabel}, and prices can change.`,
  },
  {
    q: "How long is the wait?",
    a: `Midoc states a call comes ${MIDOC.waitTime}. Most services run ${MIDOC.hoursMost}, with ${MIDOC.hoursExceptions}. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
  },
  {
    q: "Do I need a Medicare card?",
    a: "Midoc states a Medicare card is not required for a consultation, but is required for a prescription. That is the single most useful thing to check before you book, because it decides whether the consultation can end in the thing you came for.",
  },
  {
    q: "Is Midoc available in my state?",
    a: `Midoc states it operates ${MIDOC.coverage}. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
  },
  {
    q: "Who is Midoc not right for?",
    a: "Anyone who needs a physical examination, ongoing continuity with one regular GP who knows their history, or emergency care. Telehealth is an access route, not a replacement for either of those. It also will not suit you if you need a prescription and do not hold a Medicare card. This page is general information, not medical advice.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men's Health", item: `${SITE_URL}/mens-health` },
    { "@type": "ListItem", position: 3, name: "Midoc", item: `${SITE_URL}/midoc` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.midoc.title,
  description: seoConfig.midoc.description,
  url: `${SITE_URL}/midoc`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Midoc",
  url: "https://www.midoc.com.au",
  areaServed: "AU",
  description: "Australian telehealth service providing consultations, prescriptions, medical certificates and specialist referrals from AHPRA-registered doctors.",
};

export default function MidocPage() {
  return (
    <ConsumerShell>
      {[breadcrumbSchema, webPageSchema, faqSchema, orgSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main id="main-content" className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/mens-health" className="hover:text-[#0a7c42]">Men&apos;s Health</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Midoc</span>
        </nav>

        <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
          Midoc: what it costs and how the access route works
        </h1>

        {/* Answer-first. Nothing goes above this paragraph. */}
        <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">
          Midoc is an Australian telehealth service. You fill in a short form, a doctor registered with
          AHPRA calls you by phone or video usually within 5 to 60 minutes, and where it is
          appropriate they can issue a prescription, a medical certificate or a specialist referral.
          Standard consultations are listed at {MIDOC.consultStandard} and specialist consultations at{" "}
          {MIDOC.consultSpecialist}, with mental health care plans listed as {MIDOC.mentalHealth}. Read
          off midoc.com.au on {MIDOC.readOnLabel}.
        </p>

        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        <p className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4 text-xs leading-relaxed text-[#6e7b74]">
          <span className="font-semibold text-[#3d4b44]">Information only.</span> This page describes a
          service and how to reach it. It is not medical advice and does not recommend any treatment.
          Prescription medicines in Australia are supplied only after an individual assessment by a
          registered practitioner, who decides what is appropriate.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What a Midoc consultation costs</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Midoc publishes its prices rather than quoting after an assessment, and states there is no
            membership fee. Every figure below was read off midoc.com.au on {MIDOC.readOnLabel} and can
            change, so confirm the current price on their site before you book.
          </p>
          <dl className="mt-6 divide-y divide-[#eef1ef] overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white">
            {MIDOC.bands.map((p) => (
              <div key={p.band} className="px-5 py-4 sm:px-6">
                <dt className="text-[15px] font-bold text-[#10251b]">
                  {p.band}, {p.price}{" "}
                  <span className="font-medium text-[#9aa39c]">({MIDOC.readOnShort})</span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{p.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">How the access route works</h2>
          <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#3d4b44]">
            <li><span className="font-semibold text-[#10251b]">1.</span> Pick the service and complete a short health form.</li>
            <li><span className="font-semibold text-[#10251b]">2.</span> An AHPRA-registered doctor calls you, by phone or video depending on the service, usually within 5 to 60 minutes.</li>
            <li><span className="font-semibold text-[#10251b]">3.</span> If it is clinically appropriate, they issue what you need: a prescription, a certificate, or a referral. A Medicare card is required for a prescription, though not for the consultation itself.</li>
          </ol>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
            Hours vary by service. Most run {MIDOC.hoursMost}, with {MIDOC.hoursExceptions}.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Who it suits, and who it does not</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            It suits someone who wants a decision quickly, outside standard clinic hours, on something
            they already understand: a certificate, a repeat script, a referral, or a first
            conversation about a subject they have been putting off. Published pricing and no
            membership fee make the cost knowable before you start.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            It does not suit anyone who needs a physical examination, ongoing continuity with a GP who
            knows their history, or emergency care. It also will not work if you need a prescription
            and do not hold a Medicare card, which is the check worth doing before you book rather
            than after.
          </p>
        </section>

        <PartnerRoute
          className="mt-12"
          heading="Start with Midoc"
          intro="Midoc is the first partner in this section. More are being added."
          providers={[
            {
              name: "Midoc",
              href: "/go/midoc-brand-page",
              what: `Consultations from ${MIDOC.consultStandard}, medical certificates from ${MIDOC.certificateSingleDay}, mental health care plans ${MIDOC.mentalHealth}. Phone or video, nationally, ${MIDOC.waitTime}.`,
              checked: MIDOC.readOnLabel,
            },
          ]}
        />

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white">
            {FAQS.map((f) => (
              <div key={f.q} className="px-5 py-5 sm:px-6">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#10251b]">Related reading</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><Link href="/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health" className="text-[#0a7c42] hover:underline">Is telehealth or a GP cheaper for men&apos;s health?</Link></li>
            <li><Link href="/mens-health/online-mens-health-clinics-compared" className="text-[#0a7c42] hover:underline">Online men&apos;s health clinics compared</Link></li>
            <li><Link href="/mens-health/online-prescription-australia" className="text-[#0a7c42] hover:underline">Online prescriptions in Australia: cost and Medicare</Link></li>
            <li><Link href="/mens-health/online-doctor-medical-certificate-australia" className="text-[#0a7c42] hover:underline">Online medical certificates: cost and turnaround</Link></li>
            <li><Link href="/mens-health" className="text-[#0a7c42] hover:underline">All men&apos;s health guides</Link></li>
          </ul>
        </section>

        <AffiliateDisclosure partners={["Midoc"]} className="mt-10" />
      </main>
    </ConsumerShell>
  );
}
