import Link from "next/link";
import { GuideGrid } from "@/components/brand/GuideGrid";
import { HubObject } from "@/components/home/Objects";
import { objectFor } from "@/lib/home/hubs";
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
  partner,
  disclosure,
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
  /**
   * Omit once the section has a commercial partner: the note tells readers
   * nothing here pays us, which stops being true the moment one lands, and
   * check-partner-scope fails the build on that.
   */
  comingSoonFor?: string;
  /** Rendered under the hero. The partner placement for a live section. */
  partner?: React.ReactNode;
  /** Disclosure, required whenever `partner` is passed. */
  disclosure?: React.ReactNode;
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
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#007a95]">{c.label}</Link>
                ) : (
                  <span className="text-[#14120f]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">{h1}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#14120f]">{intro}</p>
            </div>
            {/* The section's own drawing, large: after the lead in the DOM, so
                the answer slot stays clear. Hidden on phones, where it would
                push the lead below the fold. */}
            {objectFor(`/${slug}`) && (
              <HubObject kind={objectFor(`/${slug}`)!} size={176} className="hy-obj hidden lg:block lg:mr-10" />
            )}
          </div>
          {note && (
            <div className="mt-8 max-w-3xl rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4">
              <p className="text-[13px] leading-relaxed text-[#56504a]">{note}</p>
            </div>
          )}
          {disclosure && <div className="mt-4 max-w-3xl">{disclosure}</div>}
          {comingSoonFor && (
            <div className="mt-4 max-w-3xl">
              <ComingSoonNote category={comingSoonFor} />
            </div>
          )}
        </section>

        {partner}

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Start here</h2>
          <GuideGrid guides={guides} />
        </section>

        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Common questions</h2>
            <dl className="mt-7 max-w-3xl divide-y divide-[#ded8cd]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Elsewhere on Refer Labs</h2>
            <ul className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              {otherLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-2.5 rounded-xl border border-[#ded8cd] bg-white py-2 pl-2.5 pr-4 text-[#14120f] transition-colors hover:border-[#14120f] hover:text-[#007a95]">
                    {objectFor(l.href) && <HubObject kind={objectFor(l.href)!} size={30} className="hy-obj" />}
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/guides" className="text-[#56504a] hover:text-[#007a95] hover:underline">All guides</Link></li>
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
