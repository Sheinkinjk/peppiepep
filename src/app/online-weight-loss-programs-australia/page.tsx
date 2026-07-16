import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.onlineWeightLossPrograms);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const ext = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow" as const });

const faqs = [
  {
    q: "What types of online weight loss programs exist in Australia?",
    a: "Broadly three: medical telehealth services with practitioner oversight (Moshy, Juniper), lifestyle and behavioural programs built around coaching and nutrition, and self-serve apps or meal plans with no clinician involved. They are very different products that happen to share a category name.",
  },
  {
    q: "How is medical telehealth different from a coaching app?",
    a: "A registered practitioner assesses you individually before anything starts, some applicants are declined, and prescription pathways are possible where clinically appropriate. Coaching apps skip all three, which is why they are cheaper and also why they are not comparable.",
  },
  {
    q: "How do these providers differ?",
    a: "Moshy runs a lean, clinically-led pathway that is open to anyone eligible. Juniper wraps medication in a coaching program and markets primarily to women. Suitability for either is assessed individually.",
  },
  {
    q: "Are these programs regulated?",
    a: "Medical telehealth providers operate under Australian health service regulations, and any prescription requires individual assessment by a registered practitioner. Self-serve apps sit outside that framework because no medicine is involved.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Online Weight Loss Programs Australia", item: `${SITE_URL}/online-weight-loss-programs-australia` },
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
  name: seoConfig.onlineWeightLossPrograms.title,
  description: seoConfig.onlineWeightLossPrograms.description,
  url: seoConfig.onlineWeightLossPrograms.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function OnlineWeightLossProgramsPage() {
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
          <span className="text-[#2b362f]">Online Weight Loss Programs</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Online weight loss programs in Australia: <span style={{ color: CYAN_LT }}>the three types, untangled</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          &ldquo;Online weight loss program&rdquo; covers everything from a practitioner-supervised medical service to a
          meal-plan PDF. Knowing which type you are looking at is most of the decision.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page maps a category of services
          and is not medical advice. It does not recommend any treatment or imply suitability for any individual.
          Contains an affiliate link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Type one: medical telehealth</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            These services put a registered Australian practitioner between you and any treatment. You complete an
            eligibility questionnaire, a practitioner reviews it individually, and where clinically appropriate a
            supervised, subscription-based program follows. Some applicants are declined, which is the point. Moshy
            (men) and Juniper (women) are the two names Australians search most in this group.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Type two: lifestyle and behavioural programs</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            These programs build around habits, nutrition, and coaching rather than a medication-first pathway.
            Practitioner support may exist but the emphasis is behavioural. This suits people who specifically want a
            structured lifestyle approach.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Type three: apps and meal plans</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Calorie trackers, workout apps, and meal-plan subscriptions. No clinician, no screening, no prescriptions,
            and usually the lowest price. Fine as tools; just do not mistake them for the medical category above, and be
            wary of any app that markets itself as if it were one.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-4">The main Australian providers at a glance</h2>
          <div className="overflow-hidden rounded-xl border border-[#e5e9e7]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f8f6]">
                  <th className="text-left font-semibold text-[#3d4b44] px-4 py-3">Provider</th>
                  <th className="text-left font-semibold text-[#3d4b44] px-4 py-3">Built for</th>
                  <th className="text-left font-semibold text-[#3d4b44] px-4 py-3">Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#e5e9e7]">
                  <td className="px-4 py-3 font-semibold text-[#10251b]">Moshy</td>
                  <td className="px-4 py-3 text-[#2b362f]">Men</td>
                  <td className="px-4 py-3 text-[#2b362f]">Clinical pathway, practitioner-led</td>
                </tr>
                <tr className="border-t border-[#e5e9e7]">
                  <td className="px-4 py-3 font-semibold text-[#10251b]">Juniper</td>
                  <td className="px-4 py-3 text-[#2b362f]">Women</td>
                  <td className="px-4 py-3 text-[#2b362f]">Clinical pathway plus coaching and community</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#3d4b44] text-xs mt-3 leading-relaxed">
            Suitability for any provider is assessed individually. Pricing for each is shown inside its own sign-up flow
            before you commit.
          </p>
        </section>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>The clinical pathway</p>
            <h3 className="text-lg font-bold mb-2">Start with Moshy</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
              Online eligibility check, individual practitioner review, delivery if approved. Referral applies through
              the link.
            </p>
            <a
              {...aff}
              data-cta="programs-moshy"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}
            >
              Continue to Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-[#3d4b44]">Another path</p>
            <h3 className="text-lg font-bold mb-2">Juniper</h3>
            <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
              The same clinical pathway with a coaching and community layer on top, marketed to women.
            </p>
            <div className="flex flex-wrap gap-3">
              <a {...ext(JUNIPER_URL)} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-[#2b362f] transition-all hover:text-[#10251b]" style={{ borderColor: `${CYAN}30` }}>
                Juniper
              </a>
            </div>
          </div>
        </div>

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
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Full provider comparison →</Link>
          <Link href="/weight-loss-telehealth-men-australia" style={{ color: CYAN }} className="hover:opacity-80">The men&apos;s guide →</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Prescription medicines in
          Australia require individual assessment by a registered practitioner.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
