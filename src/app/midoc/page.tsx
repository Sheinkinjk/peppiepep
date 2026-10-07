import Link from "next/link";
import { SectionMark } from "@/components/brand/SectionMark";
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
    a: `Midoc is an Australian telehealth service. You complete a short form, a doctor registered with AHPRA calls you by phone or video and decides what, if anything, is appropriate, which may include a certificate or a referral. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
  },
  {
    q: "How much does a Midoc consultation cost?",
    a: `Midoc lists standard consultations at ${MIDOC.consultStandard} and specialist consultations at ${MIDOC.consultSpecialist}, with the full price list on its own site. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
  },
  {
    q: "How long is the wait?",
    a: `Midoc states a call comes ${MIDOC.waitTime}. Most services run ${MIDOC.hoursMost}, with ${MIDOC.hoursExceptions}. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
  },
  {
    q: "Do I need a Medicare card?",
    a: "Midoc states a Medicare card is not required for a consultation, but is required for a prescription. Check which applies to you before you book.",
  },
  {
    q: "Is Midoc available in my state?",
    a: `Midoc states it operates ${MIDOC.coverage}. Read off midoc.com.au on ${MIDOC.readOnLabel}.`,
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
  description: "Australian telehealth service providing consultations, medical certificates and specialist referrals from AHPRA-registered doctors.",
};

export default function MidocPage() {
  return (
    <ConsumerShell>
      {[breadcrumbSchema, webPageSchema, faqSchema, orgSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main id="main-content" className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <Link href="/mens-health" className="hover:text-[#007a95]">Men&apos;s Health</Link>
          <span>/</span>
          <span className="text-[#14120f]">Midoc</span>
        <SectionMark kind="pulse" size={56} /></nav>

        <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-[#14120f] sm:text-4xl">
          Midoc: how the online consultation works
        </h1>

        {/* Answer-first. Nothing goes above this paragraph. */}
        <p className="mt-5 text-lg leading-relaxed text-[#56504a]">
          Midoc is an Australian telehealth service. You fill in a short form, a doctor registered with
          AHPRA calls you by phone or video usually within 5 to 60 minutes, and decides what, if
          anything, is appropriate, which may include a certificate or a referral.
          Standard consultations are listed at {MIDOC.consultStandard} and specialist consultations at{" "}
          {MIDOC.consultSpecialist}, with mental health care plans listed as {MIDOC.mentalHealth}. Read
          off midoc.com.au on {MIDOC.readOnLabel}.
        </p>

        {/* Below the lead. The first paragraph after the h1 is the answer;
            a disclosure in that slot is what an engine lifts instead. Still
            above the first affiliate link, which is what it is for. */}
        <AffiliateDisclosure compact partners={["Midoc"]} className="mt-4 max-w-2xl" />
        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        <p className="mt-6 rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4 text-xs leading-relaxed text-[#56504a]">
          <span className="font-semibold text-[#56504a]">Information only.</span> This page describes a
          service and how to reach it. It is not medical advice and does not recommend any treatment.
          What is appropriate for you is decided by a registered practitioner after an individual assessment.
        </p>


        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">How the access route works</h2>
          <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#56504a]">
            <li><span className="font-semibold text-[#14120f]">1.</span> Pick the service and complete a short health form.</li>
            <li><span className="font-semibold text-[#14120f]">2.</span> An AHPRA-registered doctor calls you, by phone or video depending on the service, usually within 5 to 60 minutes.</li>
            <li><span className="font-semibold text-[#14120f]">3.</span> The doctor decides what, if anything, is appropriate, which may include a certificate or a referral. A Medicare card is required for a prescription, though not for the consultation itself.</li>
          </ol>
          <p className="mt-4 text-[15px] leading-relaxed text-[#56504a]">
            Hours vary by service. Most run {MIDOC.hoursMost}, with {MIDOC.hoursExceptions}.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">
            Telehealth is not for emergencies or for anything that needs a physical examination.
          </p>
        </section>


        <PartnerRoute
          className="mt-12"
          heading="Start with Midoc"
          intro="Midoc is the partner in this section."
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
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#f1ede4] overflow-hidden rounded-2xl border border-[#ded8cd] bg-white">
            {FAQS.map((f) => (
              <div key={f.q} className="px-5 py-5 sm:px-6">
                <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#14120f]">Related reading</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><Link href="/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health" className="text-[#007a95] hover:underline">Is telehealth or a GP cheaper for men&apos;s health?</Link></li>
            <li><Link href="/mens-health/online-mens-health-clinics-compared" className="text-[#007a95] hover:underline">Online men&apos;s health clinics compared</Link></li>
            <li><Link href="/mens-health/online-doctor-medical-certificate-australia" className="text-[#007a95] hover:underline">Online medical certificates: cost and turnaround</Link></li>
            <li><Link href="/mens-health" className="text-[#007a95] hover:underline">All men&apos;s health guides</Link></li>
          </ul>
        </section>

        <AffiliateDisclosure partners={["Midoc"]} className="mt-10" />
      </main>
    </ConsumerShell>
  );
}
