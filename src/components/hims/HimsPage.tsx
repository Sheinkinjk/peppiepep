import Image from "next/image";
import Link from "next/link";
import { Check, Gift, Minus } from "lucide-react";
import type { Block, HimsPageContent, LedgerRow, Vertical } from "@/content/hims/types";
import { HIMS_SLUG_LIST } from "@/content/hims/slugs";
import {
  AUTHOR,
  DISCLOSURE,
  DISCLOSURE_REVIEW_NOTE,
  FACTS_CHECKED_ON,
  MOSH,
  OFFERS,
  SITE_URL,
} from "@/content/hims/config";
import { SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import StickyCta from "@/components/consumer/StickyCta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { CopyCode } from "./CopyCode";
import { HimsPair } from "./HimsPair";
import { InclusionsTable } from "./InclusionsTable";
import { CtaLink, Disclosure, Flag } from "./ui";

// Two layouts (30 Sep 2026):
//  - review: the Hims brand pages, on the /moshy and /moshhair brand-page pattern
//    (logo, lead, offer callout, at-a-glance card, sticky "Continue to Hims").
//  - versus: the Hims and Mosh comparisons, on the /moshy-vs-juniper pattern
//    (answer-first lead, compact disclosure above the first link, equal cards in
//    alphabetical order, one dated inclusions table, balanced "Choose X if" lists,
//    FAQ). No verdict box, no sticky button, no pick.
// On both, the answer is the first paragraph after the H1; nothing sits between them.

const PROGRAM_LABEL: Record<Vertical, string> = { weight: "weight loss", hair: "hair loss", ed: "ED" };

type Ctx = { preview: boolean; linkSuffix: string; vertical: Vertical; moshLink: Vertical };

const H2_CLASS = "scroll-mt-24 text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl";
const BODY = "text-[15.5px] leading-relaxed text-[#56504a]";

const isHimsSlug = (href: string) => (HIMS_SLUG_LIST as readonly string[]).includes(href.replace(/^\//, ""));

function HimsLogo({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-2xl border border-[#ded8cd] bg-white shadow-[0_10px_28px_-16px_rgba(20,18,15,0.35)] ${
        size === "md" ? "h-16 px-5" : "h-11 px-3.5"
      }`}
    >
      <Image src="/logos/hims.png" alt="Hims logo" width={816} height={280} className={size === "md" ? "h-8 w-auto" : "h-5 w-auto"} />
    </span>
  );
}

function MoshLogo() {
  return (
    <Image
      src="/logos/mosh-tile.png"
      alt="Mosh logo"
      width={64}
      height={64}
      className="h-16 w-16 rounded-2xl object-cover shadow-[0_10px_28px_-16px_rgba(20,18,15,0.35)]"
    />
  );
}

/** The Hims handbook disclosure, plus the reviewer note while Hims has not approved the wording. */
function HimsDisclosure({ preview }: { preview: boolean }) {
  return (
    <div>
      <Disclosure text={DISCLOSURE} />
      {preview ? (
        <p className="mt-1">
          <Flag show>{DISCLOSURE_REVIEW_NOTE}</Flag>
        </p>
      ) : null}
    </div>
  );
}

export function HimsPage({ content, preview, linkSuffix }: { content: HimsPageContent; preview: boolean; linkSuffix: string }) {
  const moshLink = content.moshLink ?? content.vertical;
  const ctx: Ctx = { preview, linkSuffix, vertical: content.vertical, moshLink };
  const url = `${SITE_URL}/${content.slug}`;
  const faq = content.blocks.find((b): b is Extract<Block, { type: "faq" }> => b.type === "faq");
  const crumbName = content.h1.split(":")[0];

  const breadcrumb = [
    { name: "Refer Labs", item: SITE_URL },
    { name: content.hub.label, item: `${SITE_URL}${content.hub.href}` },
    { name: crumbName, item: url },
  ];

  const moshSide = MOSH[moshLink];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.h1,
      description: content.metaDescription,
      datePublished: "2026-09-29",
      dateModified: "2026-09-30",
      author: SCHEMA_AUTHOR,
      publisher: SCHEMA_PUBLISHER,
      mainEntityOfPage: url,
      inLanguage: "en-AU",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: b.item })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.seoTitle,
      description: content.metaDescription,
      url,
      inLanguage: "en-AU",
      dateModified: "2026-09-30",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    content.kind === "review"
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Hims",
          alternateName: "Pilot",
          url: "https://hims.com.au",
          description: "Australian men's telehealth service, formerly Pilot, part of the Hims & Hers group.",
          areaServed: { "@type": "Country", name: "Australia" },
        }
      : {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: content.h1,
          numberOfItems: 2,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Hims", url: `${SITE_URL}/hims` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Mosh",
              url: moshSide.sponsored ? `${SITE_URL}/moshhair` : moshSide.href,
            },
          ],
        },
    faq && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    },
  ].filter(Boolean);

  const byline = (
    <p className="mt-5 text-[13px] text-[#56504a]">
      By {AUTHOR} · Facts read on each provider&rsquo;s own site, {FACTS_CHECKED_ON}
    </p>
  );

  const breadcrumbNav = (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
      <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
      <span aria-hidden>/</span>
      <Link href={content.hub.href} className="transition-colors hover:text-[#14120f]">{content.hub.label}</Link>
      <span aria-hidden>/</span>
      <span className="text-[#14120f]">{crumbName}</span>
    </nav>
  );

  const previewBanner = preview ? (
    <div role="status" className="sticky top-0 z-50 border-b border-[#E3C766] bg-[#FCEFC7] px-4 py-2 text-center text-sm text-[#4A3700]">
      Draft for Hims review. This page is not public and is not indexed. Amber tags mark codes, links and facts still to be confirmed.
    </div>
  ) : null;

  const sources = (
    <section aria-labelledby="sources" className="mt-14 border-t border-[#ded8cd] pt-6">
      <h2 id="sources" className="text-lg font-bold text-[#14120f]">
        Sources
      </h2>
      <p className="mt-1 text-[13px] text-[#56504a]">Each read on {FACTS_CHECKED_ON}.</p>
      <ul className="mt-3 space-y-1.5 text-sm">
        {content.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} rel="nofollow noopener" target="_blank" className="nw-link">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );

  const related = (
    <section aria-labelledby="related" className="mt-14">
      <h2 id="related" className="text-xl font-bold text-[#14120f]">
        Related reading
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {content.related.map((r) => (
          <Link key={r.href} href={`${r.href}${isHimsSlug(r.href) ? linkSuffix : ""}`} className="nw-card nw-card-hover group rounded-xl p-4">
            <p className="text-sm font-bold text-[#14120f] group-hover:text-[#007a95]">{r.label}</p>
            {r.desc && <p className="mt-1 text-xs leading-relaxed text-[#56504a]">{r.desc}</p>}
          </Link>
        ))}
      </div>
    </section>
  );

  const ldBlocks = jsonLd.map((j, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />);

  /* ---------------------------------------------------------------- versus */
  if (content.kind === "versus" && content.pair) {
    const partners = moshSide.sponsored ? ["Hims", "Mosh"] : ["Hims"];
    return (
      <>
        {previewBanner}
        <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
          {breadcrumbNav}

          <div className="mt-8 flex items-center gap-3">
            <HimsLogo />
            <span className="text-sm font-semibold text-[#56504a]">vs</span>
            <MoshLogo />
          </div>
          <p className="nw-kicker mt-5">{content.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
            {content.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">{content.standfirst}</p>
          {byline}

          <div className="mt-5 max-w-2xl space-y-2">
            <AffiliateDisclosure compact partners={partners} />
            <HimsDisclosure preview={preview} />
          </div>

          <div className="mt-8">
            <HimsPair
              hims={content.pair.hims}
              mosh={content.pair.mosh}
              vertical={content.vertical}
              moshLink={moshLink}
              preview={preview}
              locPrefix={`${content.slug}-hero`}
            />
          </div>

          <section className="mt-14 max-w-3xl">
            <h2 id="answer" className={H2_CLASS}>
              {content.verdictQuestion}
            </h2>
            <div className={`mt-4 space-y-4 ${BODY}`}>
              {content.verdict.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {content.blocks.map((block) => (
            <div key={block.id} className="mt-14">
              <BlockView block={block} ctx={ctx} kind="versus" />
            </div>
          ))}

          <p className="mt-10 max-w-3xl rounded-xl border border-[#ded8cd] bg-white px-5 py-4 text-[13px] leading-relaxed text-[#56504a]">
            General information only, not medical advice. Refer Labs is not a healthcare provider. Neither service suits everyone, and a
            registered practitioner decides whether any treatment is appropriate for you.
          </p>

          <section className="mt-14">
            <h2 className="text-xl font-bold text-[#14120f]">Ready to start?</h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
              Each button goes to the provider&rsquo;s own site. What each card says about a code applies there.
            </p>
            <div className="mt-5">
              <HimsPair
                hims={content.pair.hims}
                mosh={content.pair.mosh}
                vertical={content.vertical}
                moshLink={moshLink}
                preview={preview}
                locPrefix={`${content.slug}-close`}
              />
            </div>
          </section>

          {related}
          {sources}

          <footer className="mt-12 max-w-3xl space-y-3 text-xs leading-relaxed text-[#56504a]">
            <AffiliateDisclosure partners={partners} earnsFromAll={moshSide.sponsored} />
            <Disclosure text={DISCLOSURE} />
            <p>
              Offers and terms were read on {FACTS_CHECKED_ON} and can change, so confirm them with each provider before you pay. Hims is a
              trademark of Hims, Inc. Refer Labs is independent and is not owned by or part of Hims, Mosh or any other provider named here.
            </p>
          </footer>
        </main>
        {ldBlocks}
      </>
    );
  }

  /* ---------------------------------------------------------------- review */
  const offer = OFFERS[content.vertical];
  const glance = content.blocks.find((b): b is Extract<Block, { type: "ledger" }> => b.type === "ledger" && b.id === "at-a-glance");
  const bodyBlocks = content.blocks.filter((b) => b !== glance);
  const toc = bodyBlocks.filter((b) => "heading" in b && b.heading) as Extract<Block, { heading: string }>[];

  return (
    <>
      {previewBanner}

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {breadcrumbNav}

        <section className="grid gap-10 pt-8 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <HimsLogo />
            <p className="nw-kicker mt-5">{content.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#14120f] sm:text-5xl lg:text-[3.1rem]">{content.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#56504a]">{content.standfirst}</p>
            {byline}

            <div className="mt-6 max-w-xl">
              <HimsDisclosure preview={preview} />
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#007a95]/30 bg-[#007a95]/[0.08] px-5 py-4">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#007a95]" strokeWidth={1.9} aria-hidden />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#003647]">Refer Labs code for new Hims patients</p>
                <p className="mt-1 text-[15px] font-bold leading-snug text-[#14120f]">
                  {offer.headline} (code {offer.code})
                  <Flag show={preview && (offer.headlineIsPlaceholder || offer.codeIsPlaceholder)}>Offer and code to confirm</Flag>
                </p>
                <p className="mt-1.5 text-[12px] font-medium text-[#56504a]">
                  Read by Refer Labs, {FACTS_CHECKED_ON} ·{" "}
                  <a href="#offer" className="underline decoration-[#ded8cd] underline-offset-2 hover:text-[#14120f]">Offer terms</a>
                </p>
              </div>
            </div>

            <div className="mt-7">
              <CtaLink href={offer.ctaHref} label={offer.ctaLabel} placeholder={offer.ctaIsPlaceholder} preview={preview} loc="hero" size="lg" />
            </div>
          </div>

          {glance && (
            <aside className="lg:pt-2">
              <div className="nw-card rounded-2xl p-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">At a glance</span>
                <dl className="mt-4 divide-y divide-[#f1ede4] text-sm">
                  <div className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 font-semibold text-[#007a95]">Offer</dt>
                    <dd className="font-semibold text-[#14120f]">
                      {offer.headline}
                      <Flag show={preview && offer.headlineIsPlaceholder}>Offer to confirm</Flag>
                    </dd>
                  </div>
                  {glance.rows.map((r) => (
                    <div key={r.label} className="flex gap-3 py-2.5">
                      <dt className="w-24 shrink-0 text-[#56504a]">{r.label}</dt>
                      <dd className="text-[#14120f]">
                        {r.value}
                        <Flag show={preview && !!r.verify} />
                        {r.note && preview ? <span className="mt-1 block text-xs text-[#6B4F00]">{r.note}</span> : null}
                      </dd>
                    </div>
                  ))}
                </dl>
                {glance.intro && <p className="mt-3 text-xs text-[#56504a]">{glance.intro}</p>}
                <div className="mt-5">
                  <CtaLink href={offer.ctaHref} label={offer.ctaLabel} placeholder={offer.ctaIsPlaceholder} preview={preview} loc="glance-card" block />
                </div>
              </div>
            </aside>
          )}
        </section>

        <section aria-labelledby="verdict" className="mt-12 max-w-3xl">
          <h2 id="verdict" className={H2_CLASS}>
            {content.verdictQuestion}
          </h2>
          <div className="mt-4 rounded-2xl border border-[#007a95]/25 bg-[#007a95]/[0.05] px-6 py-5">
            <div className="space-y-3">
              {content.verdict.map((p, i) => (
                <p key={i} className="text-[15.5px] leading-relaxed text-[#14120f]">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-5">
              <CtaLink href={offer.ctaHref} label={offer.ctaLabel} placeholder={offer.ctaIsPlaceholder} preview={preview} loc="verdict" />
            </div>
          </div>
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {toc.map((b) => (
                  <li key={b.id}>
                    <a href={`#${b.id}`} className="text-[#56504a] transition-colors hover:text-[#007a95]">
                      {b.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <article className="min-w-0">
            {bodyBlocks.map((block, i) => (
              <div key={block.id} className={i === 0 ? "" : "mt-14"}>
                <BlockView block={block} ctx={ctx} kind="review" />
              </div>
            ))}
            {sources}
            {related}
          </article>
        </div>

        <section aria-labelledby="next" className="mt-20 overflow-hidden rounded-3xl bg-[#14120f] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 id="next" className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Start with the Hims {PROGRAM_LABEL[content.vertical]} quiz
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            The quiz is free and takes about two minutes. A registered practitioner then decides whether any treatment is appropriate. Our
            link carries the Refer Labs code; if it isn&rsquo;t shown at checkout, enter it yourself.
          </p>
          <p className="mt-5 text-white">
            Code <span className="font-mono text-lg font-bold tracking-[0.08em]">{offer.code}</span>
            <Flag show={preview && offer.codeIsPlaceholder}>Placeholder code</Flag>
          </p>
          <div className="mt-7 flex justify-center">
            <CtaLink href={offer.ctaHref} label={offer.ctaLabel} placeholder={offer.ctaIsPlaceholder} preview={preview} loc="final-band" variant="inverse" size="lg" />
          </div>
          <div className="mx-auto mt-7 max-w-lg">
            <Disclosure text={DISCLOSURE} tone="dark" />
          </div>
        </section>

        <footer className="mt-12 max-w-3xl space-y-3 text-xs leading-relaxed text-[#56504a]">
          <p>
            General information only, not medical advice. Refer Labs is not a healthcare provider and does not assess anyone. A registered
            practitioner decides whether any treatment is appropriate for you. Offers and terms were read on {FACTS_CHECKED_ON} and can
            change, so confirm them with Hims before you pay.
          </p>
          <p>
            Program details on this page are taken from Hims&rsquo; public website and are Hims&rsquo; to confirm. For anything about your own
            situation, ask the practitioner on the consult or contact Hims directly.
          </p>
          <p>Hims is a trademark of Hims, Inc. Refer Labs is independent and is not owned by or part of Hims or any other provider.</p>
        </footer>
      </main>

      <StickyCta href={offer.ctaHref} product="Hims" label={offer.ctaLabel} />

      {ldBlocks}
    </>
  );
}

/* ------------------------------------------------------------------ */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={H2_CLASS}>
      {children}
    </h2>
  );
}

function Ledger({ rows, preview }: { rows: LedgerRow[]; preview: boolean }) {
  return (
    <dl className="mt-5 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="text-[15px] font-semibold text-[#14120f]">{r.label}</dt>
          <dd className="text-[15px] leading-relaxed text-[#56504a]">
            {r.value}
            <Flag show={preview && !!r.verify} />
            {r.note && preview ? <span className="mt-1 block text-sm text-[#6B4F00]">{r.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function BlockView({ block, ctx, kind }: { block: Block; ctx: Ctx; kind: "review" | "versus" }) {
  switch (block.type) {
    case "prose":
      return (
        <section className="max-w-3xl">
          <H2 id={block.id}>{block.heading}</H2>
          <div className={`mt-4 space-y-4 ${BODY}`}>
            {block.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      );

    case "ledger":
      return (
        <section>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className="mt-3 text-sm text-[#56504a]">{block.intro}</p>}
          <Ledger rows={block.rows} preview={ctx.preview} />
        </section>
      );

    case "steps":
      return (
        <section>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className={`mt-4 ${BODY}`}>{block.intro}</p>}
          <ol className="mt-6 space-y-5">
            {block.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4f2f5] text-sm font-bold text-[#00748e]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#14120f]">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#56504a]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case "fit":
      return (
        <section>
          <H2 id={block.id}>{block.heading}</H2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="nw-card rounded-2xl p-6">
              <h3 className="font-bold text-[#14120f]">It suits you if</h3>
              <ul className="mt-3 space-y-2.5">
                {block.suits.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#14120f]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#007a95]" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
              <h3 className="font-bold text-[#14120f]">Look elsewhere if</h3>
              <ul className="mt-3 space-y-2.5">
                {block.notFor.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#56504a]">
                    <Minus className="mt-1 h-4 w-4 shrink-0 text-[#56504a]" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    case "questions":
      return (
        <section>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className={`mt-4 ${BODY}`}>{block.intro}</p>}
          <ul className="mt-5 space-y-2.5">
            {block.items.map((q) => (
              <li key={q} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#14120f]">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#007a95]" />
                {q}
              </li>
            ))}
          </ul>
        </section>
      );

    case "inclusions":
      return (
        <section>
          <H2 id={block.id}>{block.heading}</H2>
          <div className="mt-5">
            <InclusionsTable table={block.table} preview={ctx.preview} />
          </div>
        </section>
      );

    case "choose":
      return (
        <section className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["Hims", block.hims],
              ["Mosh", block.mosh],
            ] as const
          ).map(([name, items]) => (
            <div key={name} className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
              <h2 id={`${block.id}-${name.toLowerCase()}`} className="text-lg font-bold text-[#14120f]">
                Choose {name} if
              </h2>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#56504a]">
                {items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      );

    case "offer": {
      const o = OFFERS[block.vertical];
      if (kind === "versus") {
        const m = MOSH[ctx.moshLink];
        return (
          <section id={block.id} aria-labelledby={`${block.id}-h`} className="scroll-mt-24">
            <h2 id={`${block.id}-h`} className={H2_CLASS}>
              What are the Refer Labs codes, and their terms?
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#ded8cd] bg-white p-6 text-sm leading-relaxed text-[#56504a]">
                <h3 className="text-base font-bold text-[#14120f]">Hims</h3>
                <p className="mt-2 text-[#14120f]">
                  {o.headline}. Code <span className="font-mono font-bold">{o.code}</span>.
                  <Flag show={ctx.preview && (o.codeIsPlaceholder || o.headlineIsPlaceholder)}>Offer and code to confirm</Flag>
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {o.terms.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#ded8cd] bg-white p-6 text-sm leading-relaxed text-[#56504a]">
                <h3 className="text-base font-bold text-[#14120f]">Mosh</h3>
                {m.code ? (
                  <>
                    <p className="mt-2 text-[#14120f]">{m.offerText}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      <li>New Mosh customers only. The discount applies to the first billing period only.</li>
                      <li>Mosh&rsquo;s promotion terms apply, at getmosh.com.au/promotions-terms-and-conditions.</li>
                      <li>A registered practitioner decides whether any treatment is appropriate for you. Program fees apply.</li>
                    </ul>
                  </>
                ) : (
                  <p className="mt-2">
                    {m.noOfferText}
                    <Flag show={ctx.preview && !!m.pendingFlag}>{m.pendingFlag}</Flag>
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      }
      return (
        <section id={block.id} aria-label="Refer Labs offer" className="scroll-mt-24 rounded-2xl border border-[#007a95]/30 bg-[#007a95]/[0.08] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Gift className="mt-1 h-5 w-5 shrink-0 text-[#007a95]" strokeWidth={1.9} aria-hidden />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#003647]">Refer Labs code for new Hims patients</p>
              <p className="mt-1 text-lg font-bold text-[#14120f]">
                {o.headline}
                <Flag show={ctx.preview && o.headlineIsPlaceholder}>Offer to confirm</Flag>
              </p>
              <p className="mt-1 text-[15px] text-[#56504a]">Our link carries this code into Hims&rsquo; checkout. If it isn&rsquo;t shown, enter it yourself.</p>
            </div>
          </div>
          <div className="mt-5">
            <CopyCode code={o.code} />
            <Flag show={ctx.preview && o.codeIsPlaceholder}>Placeholder code</Flag>
          </div>
          <div className="mt-6">
            <CtaLink href={o.ctaHref} label={o.ctaLabel} placeholder={o.ctaIsPlaceholder} preview={ctx.preview} loc="offer-box" />
          </div>
          <details className="mt-6 text-sm text-[#56504a]">
            <summary className="cursor-pointer font-semibold text-[#14120f]">Offer terms</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {o.terms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </details>
        </section>
      );
    }

    case "faq":
      return (
        <section className="max-w-3xl">
          <H2 id={block.id}>{block.heading}</H2>
          <div className="mt-6 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
            {block.items.map((i) => (
              <details key={i.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                  {i.q}
                  <span aria-hidden className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{i.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
  }
}
