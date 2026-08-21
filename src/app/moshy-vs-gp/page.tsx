import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.moshyVsGp);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
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
  datePublished: "2026-07-05",
  dateModified: "2026-07-06",
  name: seoConfig.moshyVsGp.title,
  description: seoConfig.moshyVsGp.description,
  url: seoConfig.moshyVsGp.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
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
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Moshy vs GP</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy vs your GP: <span style={{ color: CYAN_LT }}>two doors to the same kind of care</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Both routes end with a qualified practitioner making an individual decision about you. The differences are
          practical: speed, format, continuity, and what kind of case each one handles best.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page compares two ways of
          accessing care. It is not medical advice, does not recommend either pathway for any individual, and both are
          legitimate. Contains an affiliate link.
        </p>

        {/* Answer-first: the question verbatim, then a liftable answer, before the table. */}
        <section className="mb-10">
          <h2 className="text-xl font-black mb-3">Should you use Moshy or see your GP for weight loss?</h2>
          <div className="rounded-xl border border-[#cfe6da] bg-[#e8f5ee] px-6 py-5">
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
              Both are legitimate, and the right one depends on what you want from the process. Your GP is the cheaper
              route because Medicare offsets part of the consult, already knows your history, and can manage weight
              alongside the rest of your health, but it is slower to begin and depends on appointment availability.
              Moshy is faster and entirely online, with the eligibility check, practitioner review and delivery handled
              in one flow, though it is focused on the single issue rather than your whole health. If cost and
              continuity matter most, start with your GP. If speed and convenience matter most, Moshy is the more
              natural starting point. Either way a registered Australian practitioner decides what is appropriate.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-4">Side by side</h2>
          <div className="overflow-x-auto rounded-xl border border-[#e5e9e7]">
              <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-[#f5f8f6]">
                  <th className="text-left font-semibold text-[#3d4b44] px-4 py-3 w-1/4"></th>
                  <th className="text-left font-black text-[#10251b] px-4 py-3">Moshy</th>
                  <th className="text-left font-black text-[#10251b] px-4 py-3">Your GP</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([k, m, g]) => (
                  <tr key={k} className="border-t border-[#e5e9e7] align-top">
                    <td className="px-4 py-3 text-[#3d4b44] font-medium">{k}</td>
                    <td className="px-4 py-3 text-[#2b362f]">{m}</td>
                    <td className="px-4 py-3 text-[#2b362f]">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The trade-off</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Telehealth trades continuity for convenience. Moshy will never know your history the way a GP you have seen
            for a decade does, and it is not trying to. What it offers instead is the removal of every small barrier
            between deciding to act and actually acting: no booking lead time, no waiting room, no need to say anything
            out loud to anyone until a practitioner has already reviewed your details.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            For plenty of men, that difference is the difference between starting and not starting. For others, the
            GP&apos;s office is the better room. Anything urgent, unusual, or layered on top of other conditions belongs
            with a doctor in person, full stop.
          </p>
        </section>

        <div className="rounded-xl border px-6 py-5 mb-12" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
          <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
            If the telehealth route suits your situation, Moshy&apos;s eligibility check is the starting point. Ten
            minutes, no commitment, referral applied automatically.
          </p>
          <a
            {...aff}
            data-cta="vs-gp-main"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Check your eligibility on Moshy ($120 off first order)
            <ArrowRight className="h-4 w-4" />
          </a>
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
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy: the offer</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/moshy-eligibility" style={{ color: CYAN }} className="hover:opacity-80">The eligibility check →</Link>
          <Link href="/moshy-alternatives" style={{ color: CYAN }} className="hover:opacity-80">Moshy alternatives →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Always consult a qualified health
          professional about your own circumstances.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
