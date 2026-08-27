import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import LenderTable from "@/components/lending/LenderTable";
import CommissionDisclosure from "@/components/lending/CommissionDisclosure";
import { LENDERS, type Lender } from "@/lib/lenders";
import { SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { LENDING_LAST_UPDATED, type Product } from "@/lib/lending-schema";

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout for the business-lending intent + explainer pages. Structure is
// shared; every word of copy lives in the per-page config (src/lib/lending-intent.ts),
// so sibling pages never share a sentence skeleton. Optional `filterProducts`
// narrows the panel table to lenders offering a relevant product.
// ─────────────────────────────────────────────────────────────────────────────

export type IntentSection = { h: string; body: string[]; bullets?: string[] };

export interface IntentConfig {
  slug: string;
  h1: string;
  crumb: string;
  /** The direct, citable answer in the first ~100 words (AEO/GEO). */
  lead: string;
  intro?: string[];
  sections: IntentSection[];
  filterProducts?: Product[];
  showPanel?: boolean;
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  /** Explainers set this to render the Article schema instead of a service WebPage. */
  kind?: "guide" | "intent";
}

function panelFor(cfg: IntentConfig): Lender[] {
  if (!cfg.filterProducts?.length) return LENDERS;
  return LENDERS.filter((l) => cfg.filterProducts!.some((p) => l.products.includes(p)));
}

export function intentSchemas(cfg: IntentConfig) {
  const url = `${SITE_URL}/${cfg.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Business Loans", item: `${SITE_URL}/business-loans` },
      { "@type": "ListItem", position: 3, name: cfg.crumb, item: url },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: cfg.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const main = cfg.kind === "guide"
    ? { "@context": "https://schema.org", "@type": "Article", headline: cfg.h1, url, dateModified: LENDING_LAST_UPDATED,
        author: SCHEMA_AUTHOR, publisher: SCHEMA_PUBLISHER }
    : { "@context": "https://schema.org", "@type": "WebPage", name: cfg.h1, url, publisher: SCHEMA_PUBLISHER };
  return [breadcrumb, faq, main];
}

export default function IntentPage({ cfg }: { cfg: IntentConfig }) {
  const panel = panelFor(cfg);
  const showPanel = cfg.showPanel !== false;

  return (
    <ConsumerShell>
      {intentSchemas(cfg).map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="text-xs text-[#6e7b74]">
          <Link href="/business-loans" className="hover:text-[#0a7c42]">Business loans</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#3d4b44]">{cfg.crumb}</span>
        </nav>

        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-[#10251b]">{cfg.h1}</h1>
        <EditorialMeta lastUpdated={LENDING_LAST_UPDATED} className="mt-3" />
        <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">{cfg.lead}</p>
        {cfg.intro?.map((p, i) => <p key={i} className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{p}</p>)}

        {cfg.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-2xl font-extrabold text-[#10251b]">{s.h}</h2>
            {s.body.map((p, i) => <p key={i} className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{p}</p>)}
            {s.bullets && (
              <ul className="mt-3 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {showPanel && (
          <section className="mt-12">
            <h2 className="text-2xl font-extrabold text-[#10251b]">
              {cfg.filterProducts?.length ? "Lenders that may fit" : "The lenders we compare"}
            </h2>
            <div className="mt-5">
              <LenderTable lenders={panel} caption={`Lenders relevant to ${cfg.crumb}`} />
            </div>
            <div className="mt-4"><CommissionDisclosure variant="inline" /></div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl border p-6" style={{ borderColor: "#0a7c4240", background: "#0a7c4208" }}>
          <h2 className="text-xl font-extrabold text-[#10251b]">Check your options in about a minute</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
            Tell us what you need. A person reviews every enquiry and introduces you to the lenders that fit. No documents to upload.
          </p>
          <div className="mt-4">
            <Link href="/business-loans#enquire" className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5" style={{ background: "#0a7c42", boxShadow: "0 8px 24px #0a7c4225" }}>
              Start my enquiry
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-[#10251b]">Common questions</h2>
          <dl className="mt-6 divide-y divide-[#eef1ef] border-t border-[#eef1ef]">
            {cfg.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related */}
        <section className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#eef1ef] pt-8 text-sm">
          {cfg.related.map((r) => (
            <Link key={r.href} href={r.href} className="font-semibold text-[#0a7c42] hover:text-[#086536]">{r.label}</Link>
          ))}
        </section>
      </main>
    </ConsumerShell>
  );
}
