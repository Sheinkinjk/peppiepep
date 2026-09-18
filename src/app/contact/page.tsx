import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { HubObject, type ObjectKind } from "@/components/home/Objects";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contact);

/*
 * Rewritten 18 Sep 2026. The page it replaces was written for the retired
 * growth-services offer ("building your distribution system"), carried two
 * identical "Email Us" cards, promised a 15-minute call that the linked 30-minute
 * Calendly slot contradicted, and pinned that link to January 2026. It now says
 * what is true: one inbox, read by the person who writes the site, and a
 * separate door for businesses.
 */
const EMAIL = "jarred@referlabs.com.au";
const CALENDLY = "https://calendly.com/jarred-referlabs/30min";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

const ROUTES: { object: ObjectKind; title: string; body: string; action: { label: string; href: string; external?: boolean } }[] = [
  {
    object: "lens",
    title: "Something on a page is wrong",
    body: "Prices, plan inclusions and offer terms change between our checks. Tell us the page and what you saw on the provider's own site, and the page is corrected or the claim removed.",
    action: { label: "Report a correction", href: `mailto:${EMAIL}?subject=Correction` },
  },
  {
    object: "envelope",
    title: "A question about a comparison",
    body: "Ask about anything we compare, or about how a page was researched. We cannot give medical, financial or legal advice about your own situation.",
    action: { label: "Email a question", href: `mailto:${EMAIL}` },
  },
  {
    object: "funnel",
    title: "A business that wants to be featured",
    body: "Partnerships are always disclosed and rankings are never sold. Apply with your details, or book a 30-minute call.",
    action: { label: "Apply to partner with us", href: "/partner-with-refer-labs" },
  },
];

export default function Contact() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8">
        <nav className="flex items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#14120f]">Contact</span>
        </nav>
        <h1 className="mt-5 text-4xl font-bold leading-[1.06] text-[#14120f] sm:text-5xl">Contact Refer Labs</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#14120f]">
          Email <a href={`mailto:${EMAIL}`} className="font-semibold text-[#007a95] underline underline-offset-4">{EMAIL}</a>.
          It goes to the person who researches and writes the site, and you will usually hear back within one business day.
        </p>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {ROUTES.map((r) => (
            <li key={r.title} className="flex flex-col rounded-2xl border border-[#ded8cd] bg-white p-7">
              <HubObject kind={r.object} size={64} className="hy-obj mb-5" />
              <h2 className="text-xl font-bold text-[#14120f]">{r.title}</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#56504a]">{r.body}</p>
              <p className="mt-auto pt-6">
                <a href={r.action.href} className="nw-btn">{r.action.label}</a>
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#56504a]">
          Businesses can also{" "}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] underline underline-offset-4">
            book a 30-minute call
          </a>
          . How corrections are handled is set out on the{" "}
          <Link href="/about" className="font-semibold text-[#007a95] underline underline-offset-4">about page</Link>, and how the site is
          funded on{" "}
          <Link href="/how-we-make-money" className="font-semibold text-[#007a95] underline underline-offset-4">how we make money</Link>.
        </p>
      </main>
    </ConsumerShell>
  );
}
