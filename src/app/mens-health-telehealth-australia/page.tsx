import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL, MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.mensHealthTelehealth);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow sponsored" as const });

const faqs = [
  {
    q: "What can men's telehealth actually handle?",
    a: "The services are built around specific, common pathways: weight management, hair loss, and similar men's health categories. Each runs on the same skeleton of an online questionnaire followed by an individual review from a registered Australian practitioner. Anything outside those lanes belongs with a GP.",
  },
  {
    q: "How do prescriptions work through an online clinic?",
    a: "The same way they work anywhere in Australia: a registered practitioner assesses you individually and prescribes only where they consider it clinically appropriate. The questionnaire is the intake, not the decision. No legitimate service promises a specific medicine up front.",
  },
  {
    q: "Are Moshy and Mosh the same company?",
    a: "They are sister brands in the same Australian telehealth family. Moshy at getmoshy.com.au covers weight management and is open to anyone eligible, while Mosh at getmosh.com.au is a men's service best known for hair loss.",
  },
  {
    q: "Do these services replace having a GP?",
    a: "No. They handle specific pathways conveniently. A GP remains the right setting for your overall health and for anything complex or urgent, and the telehealth services themselves will redirect those cases.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Men's Health Telehealth Australia", item: `${SITE_URL}/mens-health-telehealth-australia` },
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
  name: seoConfig.mensHealthTelehealth.title,
  description: seoConfig.mensHealthTelehealth.description,
  url: seoConfig.mensHealthTelehealth.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function MensHealthTelehealthPage() {
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
          <span className="text-[#2b362f]">Men&apos;s Health Telehealth</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Men&apos;s health telehealth in Australia: <span style={{ color: CYAN_LT }}>what online clinics actually do</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          A wave of Australian services now handle specific men&apos;s health pathways entirely online. Here is how the
          model works, what it can and cannot do, and who the main providers are.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page describes a category of
          services and is not medical advice. Prescription medicines in Australia require individual assessment by a
          registered practitioner. Contains affiliate links.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The model, in one paragraph</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Every credible men&apos;s telehealth service in Australia runs the same loop. You answer a structured
            questionnaire online. A registered practitioner reviews your answers individually, and either approves a
            plan, asks follow-ups, or declines and points you elsewhere. If approved, the program runs as a
            subscription with anything prescribed delivered to your door. The paperwork moved online; the clinical
            gatekeeping stayed exactly where Australian regulation requires it to be.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The categories that work well in this format are the specific, common, screenable ones. Weight management
            and hair loss lead the list, which is why the two best-known Australian brands are built around exactly
            those.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-4">The two main doors</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>Weight management</p>
              <h3 className="text-lg font-bold mb-2">Moshy</h3>
              <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
                A clinically-led weight-management telehealth service, open to anyone eligible. Eligibility check online,
                practitioner review, subscription with delivery if approved.
              </p>
              <a
                {...aff(MOSHY_URL)}
                data-cta="mens-hub-moshy"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
                style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}
              >
                Check eligibility on Moshy
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3">
                <Link href="/moshy" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Moshy: the offer</Link>
          <Link href="/moshy-review" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">
                  Read our Moshy review →
                </Link>
              </p>
            </div>
            <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>Hair loss</p>
              <h3 className="text-lg font-bold mb-2">Mosh</h3>
              <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">
                The sister brand for hair loss. Online consultation with photo review, then practitioner-determined
                options if eligible.
              </p>
              <a
                {...aff(MOSH_HAIR_URL)}
                data-cta="mens-hub-mosh"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
                style={{ background: CYAN, boxShadow: `0 8px 24px ${CYAN}25` }}
              >
                Start the Mosh consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3">
                <Link href="/moshhair" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">
                  Read our Mosh page →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-xl font-black">What to be wary of</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            The category has attracted imitators, so apply a simple filter. A legitimate Australian service names its
            regulatory footing, uses registered practitioners, shows pricing before you commit, and declines unsuitable
            applicants. Anything that guarantees a specific medicine before anyone has assessed you is advertising a
            prescription decision it has no right to make. Close the tab.
          </p>
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
          <Link href="/weight-loss-telehealth-men-australia" style={{ color: CYAN }} className="hover:opacity-80">Men&apos;s weight loss telehealth →</Link>
          <Link href="/best-hair-loss-treatment-australia" style={{ color: CYAN }} className="hover:opacity-80">Hair loss options compared →</Link>
          <Link href="/moshy-vs-gp" style={{ color: CYAN }} className="hover:opacity-80">Telehealth vs your GP →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains affiliate referral links. We may earn a commission if you
          sign up through them, at no extra cost to you. Nothing here is medical advice. Always consult a qualified
          health professional about your own circumstances.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
