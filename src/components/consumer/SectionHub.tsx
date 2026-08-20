import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL } from "@/lib/seo";

/**
 * Chrome and structured data for a category or sub-category hub.
 *
 * Extracted when longevity added three hubs at once (the section plus recovery
 * and diagnostics). Three hand-copied hubs would have drifted apart within a
 * fortnight, and the schema is the part most likely to drift silently.
 */
export default function SectionHub({
  slug,
  crumbs,
  h1,
  intro,
  note,
  comingSoonFor,
  guides,
  faqs,
  otherLinks,
  listName,
  title,
  description,
}: {
  slug: string;
  crumbs: { href?: string; label: string }[];
  h1: React.ReactNode;
  intro: string;
  note?: React.ReactNode;
  comingSoonFor: string;
  guides: { href: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  otherLinks: { href: string; label: string }[];
  listName: string;
  title: string;
  description: string;
}) {
  const url = `${SITE_URL}${slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        item: c.href ? `${SITE_URL}${c.href}` : url,
      })),
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}${g.href}`,
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    inLanguage: "en-AU",
    isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#0a7c42]">{c.label}</Link>
                ) : (
                  <span className="text-[#2b362f]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">{h1}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">{intro}</p>
          </div>
          {note && (
            <div className="mt-8 max-w-3xl rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4">
              <p className="text-[13px] leading-relaxed text-[#3d4b44]">{note}</p>
            </div>
          )}
          <div className="mt-4 max-w-3xl">
            <ComingSoonNote category={comingSoonFor} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Start here</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group rounded-2xl border border-[#e5e9e7] bg-white p-6 transition-colors hover:border-[#0a7c42]/40"
              >
                <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{g.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                  Read <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Common questions</h2>
            <dl className="mt-7 max-w-3xl divide-y divide-[#e5e9e7]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Elsewhere on Refer Labs</h2>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {otherLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#0a7c42] hover:underline">{l.label}</Link>
                </li>
              ))}
              <li><Link href="/guides" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">All guides</Link></li>
            </ul>
          </div>
          <div className="mt-10 max-w-2xl">
            <NewsletterSignup />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
