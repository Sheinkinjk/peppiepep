import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";

export const metadata = generateSEOMetadata(seoConfig.moshyVsGp);

const CYAN = "#0891b2";
const CYAN_LT = "#22d3ee";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Is telehealth as legitimate as seeing a GP?",
    a: "For the straightforward case, yes. Australian telehealth providers use registered practitioners and operate under Australian health regulations. For anything complex, unusual, or urgent, an in-person doctor is the right setting, and a credible telehealth service will redirect you there anyway.",
  },
  {
    q: "Which is cheaper, Moshy or a GP?",
    a: "It depends on your situation. A GP route can involve consultation fees offset by Medicare plus standard pharmacy prices, while Moshy bundles the practitioner oversight, check-ins, and delivery into one subscription shown before you commit. Neither is universally cheaper, so compare your own numbers.",
  },
  {
    q: "Can I use both?",
    a: "Keeping your regular GP informed about anything you start through a telehealth service is sensible, and nothing about using one excludes the other. Continuity of care is worth protecting.",
  },
  {
    q: "Does Moshy replace my regular doctor?",
    a: "No. It handles one specific pathway with practitioner oversight. Your GP remains the right person for your overall health, and for anything the online questionnaire is not designed to catch.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy vs GP", item: `${SITE_URL}/moshy-vs-gp` },
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
  name: seoConfig.moshyVsGp.title,
  description: seoConfig.moshyVsGp.description,
  url: seoConfig.moshyVsGp.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const rows: [string, string, string][] = [
  ["Getting started", "Online questionnaire, about 10 minutes", "Book and attend an appointment"],
  ["Who assesses you", "Registered practitioner, reviewing remotely", "Your GP, in person"],
  ["Continuity", "Focused on one program", "Whole-of-health relationship over years"],
  ["Format", "App, email, delivery to your door", "Clinic visits, scripts filled at a pharmacy"],
  ["Best suited to", "The straightforward case, done conveniently", "Complex history, or you value one doctor who knows you"],
];

export default function MoshyVsGpPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/55">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-white/70">Moshy vs GP</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy vs your GP: <span style={{ color: CYAN_LT }}>two doors to the same kind of care</span>
        </h1>
        <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Both routes end with a qualified practitioner making an individual decision about you. The differences are
          practical: speed, format, continuity, and what kind of case each one handles best.
        </p>

        <p className="mb-10 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-white/55">
          <span className="font-semibold text-white/70">Information only.</span> This page compares two ways of
          accessing care. It is not medical advice, does not recommend either pathway for any individual, and both are
          legitimate. Contains an affiliate link.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-4">Side by side</h2>
          <div className="overflow-hidden rounded-xl border border-white/[0.08]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left font-semibold text-white/55 px-4 py-3 w-1/4"></th>
                  <th className="text-left font-black text-white px-4 py-3">Moshy</th>
                  <th className="text-left font-black text-white px-4 py-3">Your GP</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([k, m, g]) => (
                  <tr key={k} className="border-t border-white/[0.08] align-top">
                    <td className="px-4 py-3 text-white/55 font-medium">{k}</td>
                    <td className="px-4 py-3 text-white/70">{m}</td>
                    <td className="px-4 py-3 text-white/70">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The honest trade</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Telehealth trades continuity for convenience. Moshy will never know your history the way a GP you have seen
            for a decade does, and it is not trying to. What it offers instead is the removal of every small barrier
            between deciding to act and actually acting: no booking lead time, no waiting room, no need to say anything
            out loud to anyone until a practitioner has already reviewed your details.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            For plenty of men, that difference is the difference between starting and not starting. For others, the
            GP&apos;s office is the better room. Anything urgent, unusual, or layered on top of other conditions belongs
            with a doctor in person, full stop.
          </p>
        </section>

        <div className="rounded-xl border px-6 py-5 mb-12" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
            If the telehealth route suits your situation, Moshy&apos;s eligibility check is the starting point. Ten
            minutes, no commitment, referral applied automatically.
          </p>
          <a
            {...aff}
            data-cta="vs-gp-main"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Check your eligibility on Moshy
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-white text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-white/40 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-white/55 text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-white/[0.08] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/moshy-eligibility" style={{ color: CYAN }} className="hover:opacity-80">The eligibility check →</Link>
          <Link href="/moshy-alternatives" style={{ color: CYAN }} className="hover:opacity-80">Moshy alternatives →</Link>
        </div>

        <p className="text-white/40 text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Always consult a qualified health
          professional about your own circumstances.
        </p>
        <p className="text-white/40 text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-white/55">All guides</Link></p>
      </main>
    </ConsumerShell>
  );
}
