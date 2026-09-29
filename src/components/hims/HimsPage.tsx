import { Public_Sans } from "next/font/google";
import type { Block, HimsPageContent, LedgerRow, Vertical } from "@/content/hims/types";
import { AUTHOR, DISCLOSURE, FACTS_CHECKED_ON, MOSH, OFFERS, SITE_DISCLOSURE, SITE_URL } from "@/content/hims/config";
import { CopyCode } from "./CopyCode";
import { EligibilityCheck } from "./EligibilityCheck";
import { CtaLink, Disclosure, Flag } from "./ui";

// One family, two weights. Plain and civic: this is a consumer guide, not a sales page.
const sans = Public_Sans({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });

const PROGRAM_LABEL: Record<Vertical, string> = { weight: "weight loss", hair: "hair loss", ed: "ED" };

type Ctx = { preview: boolean; linkSuffix: string; vertical: Vertical };

export function HimsPage({ content, preview, linkSuffix }: { content: HimsPageContent; preview: boolean; linkSuffix: string }) {
  const ctx: Ctx = { preview, linkSuffix, vertical: content.vertical };
  const offer = OFFERS[content.vertical];
  const faq = content.blocks.find((b): b is Extract<Block, { type: "faq" }> => b.type === "faq");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.h1,
      description: content.metaDescription,
      dateModified: "2026-09-29",
      author: { "@type": "Person", name: "Jarred", jobTitle: "Founder" },
      publisher: { "@type": "Organization", name: "ReferLabs", url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/${content.slug}`,
    },
    faq && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    },
  ].filter(Boolean);

  return (
    <div className={`${sans.className} min-h-screen bg-[#F4F6F5] text-[#17222B] antialiased`}>
      {preview && (
        <div role="status" className="sticky top-0 z-20 border-b border-[#E3C766] bg-[#FCEFC7] px-4 py-2 text-center text-sm text-[#4A3700]">
          Draft for Hims review. This page is not public and is not indexed. Amber tags mark codes, links and facts still to be confirmed.
        </div>
      )}

      <article className="mx-auto max-w-5xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <header className="max-w-[68ch]">
          <h1 className="text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.015em] sm:text-5xl">{content.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#3A4650] sm:text-xl">{content.standfirst}</p>
          <p className="mt-5 text-sm text-[#56636E]">
            By {AUTHOR}. Facts checked {FACTS_CHECKED_ON}.
          </p>
        </header>

        <div className="mt-8 max-w-[68ch]">
          <Disclosure text={DISCLOSURE} />
          {content.otherPartnersOnPage?.length ? (
            <div className="mt-3">
              <Disclosure text={SITE_DISCLOSURE} />
            </div>
          ) : null}
        </div>

        <section aria-labelledby="verdict" className="mt-12 max-w-[68ch] border-t-2 border-[#17222B] pt-6">
          <h2 id="verdict" className="text-xl font-semibold">
            The short answer
          </h2>
          {content.verdict.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-[1.7]">
              {p}
            </p>
          ))}
          <div className="mt-7">
            <CtaLink href={offer.ctaHref} label={offer.ctaLabel} placeholder={offer.ctaIsPlaceholder} preview={preview} />
          </div>
        </section>

        <nav aria-label="On this page" className="mt-12 max-w-[68ch]">
          <h2 className="text-sm font-semibold text-[#56636E]">On this page</h2>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
            {content.blocks
              .filter((b) => "heading" in b && b.heading)
              .map((b) => (
                <li key={b.id}>
                  <a className="text-[#0F5E4E] underline decoration-[#0F5E4E]/30 underline-offset-4 hover:decoration-[#0F5E4E]" href={`#${b.id}`}>
                    {"heading" in b ? b.heading : ""}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="mt-6">
          {content.blocks.map((block) => (
            <BlockView key={block.id} block={block} ctx={ctx} />
          ))}
        </div>

        <section aria-labelledby="sources" className="mt-16 max-w-[68ch] border-t border-[#D5DCDF] pt-6">
          <h2 id="sources" className="text-xl font-semibold">
            Sources
          </h2>
          <p className="mt-2 text-[15px] text-[#56636E]">Each read on {FACTS_CHECKED_ON}.</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            {content.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="nofollow noopener" target="_blank" className="text-[#0F5E4E] underline underline-offset-4">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="next" className="mt-16 max-w-[68ch] border-t-2 border-[#17222B] pt-6">
          <h2 id="next" className="text-2xl font-semibold">
            Ready to see if Hims suits you?
          </h2>
          <p className="mt-3 text-lg leading-relaxed">
            The quiz is free and takes about two minutes. The ReferLabs link applies the code at checkout, or you can enter it yourself.
          </p>
          <p className="mt-4 text-lg">
            Code: <span className="font-semibold tracking-[0.06em]">{offer.code}</span>
            <Flag show={preview && offer.codeIsPlaceholder}>Placeholder code</Flag>
          </p>
          <div className="mt-6">
            <CtaLink href={offer.ctaHref} label={offer.ctaLabel} placeholder={offer.ctaIsPlaceholder} preview={preview} />
          </div>
          <div className="mt-8">
            <Disclosure text={DISCLOSURE} />
          </div>
        </section>

        <section aria-labelledby="related" className="mt-14 max-w-[68ch]">
          <h2 id="related" className="text-lg font-semibold">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2">
            {content.related.map((r) => (
              <li key={r.href}>
                <a href={`${r.href}${ctx.linkSuffix}`} className="text-[#0F5E4E] underline underline-offset-4">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-14 max-w-[68ch] border-t border-[#D5DCDF] pt-6 text-sm leading-relaxed text-[#56636E]">
          <p>
            General information only, not medical advice. ReferLabs is not a healthcare provider and does not assess anyone for
            treatment. Any treatment plan is only supplied if a registered practitioner decides it is clinically appropriate for you.
            Prices, offers and terms were checked on {FACTS_CHECKED_ON} and can change, so confirm them with the provider before you pay.
          </p>
          <p className="mt-3">
            Program details on this page are taken from Hims&rsquo; public website and are Hims&rsquo; to confirm. For anything about your own
            situation or plan, ask your practitioner on the consult or contact Hims directly.
          </p>
          <p className="mt-3">
            Hims is a trademark of Hims, Inc. ReferLabs is independent and is not owned by or part of Hims or any other provider named on this page.
          </p>
        </footer>
      </article>

      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-16 text-2xl font-semibold leading-snug sm:text-[1.75rem]">
      {children}
    </h2>
  );
}

function Ledger({ rows, preview }: { rows: LedgerRow[]; preview: boolean }) {
  return (
    <dl className="mt-5 divide-y divide-[#D5DCDF] border-y border-[#D5DCDF]">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="font-semibold text-[#17222B]">{r.label}</dt>
          <dd className="leading-relaxed">
            {r.value}
            <Flag show={preview && !!r.verify} />
            {r.note && preview ? <span className="mt-1 block text-sm text-[#6B4F00]">{r.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function BlockView({ block, ctx }: { block: Block; ctx: Ctx }) {
  const wrap = "mt-16 max-w-[68ch]";
  switch (block.type) {
    case "prose":
      return (
        <section className={wrap}>
          <H2 id={block.id}>{block.heading}</H2>
          {block.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-[1.7]">
              {p}
            </p>
          ))}
        </section>
      );

    case "ledger":
      return (
        <section className={wrap}>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className="mt-3 text-[#56636E]">{block.intro}</p>}
          <Ledger rows={block.rows} preview={ctx.preview} />
        </section>
      );

    case "steps":
      return (
        <section className={wrap}>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className="mt-3 text-lg leading-[1.7]">{block.intro}</p>}
          <ol className="mt-6 space-y-6">
            {block.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#17222B] font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-lg leading-[1.7]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case "compare":
      return (
        <section className="mt-16">
          <div className="max-w-[68ch]">
            <H2 id={block.id}>{block.heading}</H2>
            {block.intro && <p className="mt-3 text-[#56636E]">{block.intro}</p>}
          </div>
          <div className="mt-5 overflow-x-auto rounded-lg border border-[#C9D3D6] bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px] leading-relaxed">
              <thead>
                <tr className="border-b-2 border-[#17222B]">
                  {block.columns.map((c, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-semibold">
                      {c || <span className="sr-only">Feature</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r) => (
                  <tr key={r.label} className="border-b border-[#E2E7E9] align-top last:border-b-0">
                    <th scope="row" className="w-44 px-4 py-3 font-semibold">
                      {r.label}
                      <Flag show={ctx.preview && !!r.verify} />
                    </th>
                    {r.cells.map((c, i) => (
                      <td key={i} className="px-4 py-3">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.footnote && <p className="mt-3 max-w-[68ch] text-sm text-[#56636E]">{block.footnote}</p>}
        </section>
      );

    case "fit":
      return (
        <section className="mt-16">
          <div className="max-w-[68ch]">
            <H2 id={block.id}>{block.heading}</H2>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="border-t-4 border-[#0F5E4E] pt-4">
              <h3 className="text-lg font-semibold">It suits you if</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-lg leading-[1.65]">
                {block.suits.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="border-t-4 border-[#56636E] pt-4">
              <h3 className="text-lg font-semibold">Look elsewhere if</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-lg leading-[1.65]">
                {block.notFor.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    case "picks":
      return (
        <section className={wrap}>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className="mt-3 text-lg leading-[1.7]">{block.intro}</p>}
          <dl className="mt-5 divide-y divide-[#D5DCDF] border-y border-[#D5DCDF]">
            {block.picks.map((p) => (
              <div key={p.label} className="py-4">
                <dt className="text-[#56636E]">{p.label}</dt>
                <dd className="mt-1">
                  <span className="text-lg font-semibold">{p.pick}.</span> <span className="text-lg leading-[1.65]">{p.why}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "questions":
      return (
        <section className={wrap}>
          <H2 id={block.id}>{block.heading}</H2>
          {block.intro && <p className="mt-3 text-lg leading-[1.7]">{block.intro}</p>}
          <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-[1.65]">
            {block.items.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      );

    case "callout":
      return (
        <section className={`${wrap} rounded-lg border border-[#C9D3D6] bg-white p-6`}>
          <H2 id={block.id}>{block.heading}</H2>
          {block.body.map((p, i) => (
            <p key={i} className="mt-3 text-lg leading-[1.7]">
              {p}
            </p>
          ))}
        </section>
      );

    case "offer": {
      const o = OFFERS[block.vertical];
      return (
        <section id={block.id} aria-label="ReferLabs offer" className="mt-16 max-w-[68ch] rounded-lg border-2 border-[#0F5E4E] bg-[#E6F1EE] p-6 sm:p-8">
          <p className="text-lg font-semibold">
            {o.headline}
            <Flag show={ctx.preview && o.headlineIsPlaceholder}>Offer to confirm</Flag>
          </p>
          <p className="mt-2 text-[#3A4650]">Our link applies this code automatically at checkout. If it doesn&rsquo;t show, enter it yourself.</p>
          <div className="mt-5">
            <CopyCode code={o.code} />
            <Flag show={ctx.preview && o.codeIsPlaceholder}>Placeholder code</Flag>
          </div>
          <div className="mt-6">
            <CtaLink href={o.ctaHref} label={o.ctaLabel} placeholder={o.ctaIsPlaceholder} preview={ctx.preview} />
          </div>
          <details className="mt-6 text-sm text-[#3A4650]">
            <summary className="cursor-pointer font-semibold text-[#17222B]">Offer terms</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {o.terms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </details>
        </section>
      );
    }

    case "eligibility":
      return (
        <section id={block.id} className="mt-12 max-w-[68ch] scroll-mt-16">
          <EligibilityCheck programLabel={PROGRAM_LABEL[block.vertical]} />
        </section>
      );

    case "providers":
      return (
        <section className="mt-16">
          <div className="max-w-[68ch]">
            <H2 id={block.id}>{block.heading}</H2>
            {block.intro && <p className="mt-3 text-lg leading-[1.7]">{block.intro}</p>}
          </div>
          <div className="mt-6 space-y-10">
            {block.providers.map((p) => (
              <div key={p.name} className="max-w-[68ch] border-t border-[#17222B] pt-5">
                <h3 className="text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 font-semibold text-[#0F5E4E]">{p.bestFor}</p>
                <p className="mt-3 text-lg leading-[1.7]">{p.summary}</p>
                <Ledger rows={p.facts} preview={ctx.preview} />
                {p.cta === "hims" && (
                  <div className="mt-5">
                    <CtaLink
                      href={OFFERS[ctx.vertical].ctaHref}
                      label={OFFERS[ctx.vertical].ctaLabel}
                      placeholder={OFFERS[ctx.vertical].ctaIsPlaceholder}
                      preview={ctx.preview}
                    />
                  </div>
                )}
                {p.cta === "mosh" && (
                  <div className="mt-5">
                    <CtaLink href={MOSH.ctaHref} label={MOSH.ctaLabel} placeholder={MOSH.ctaIsPlaceholder} preview={ctx.preview} variant="outline" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      );

    case "faq":
      return (
        <section className={wrap}>
          <H2 id={block.id}>{block.heading}</H2>
          <div className="mt-5 divide-y divide-[#D5DCDF] border-y border-[#D5DCDF]">
            {block.items.map((i) => (
              <details key={i.q} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                  <span className="mr-2 inline-block w-4 text-[#0F5E4E] group-open:hidden">+</span>
                  <span className="mr-2 hidden w-4 text-[#0F5E4E] group-open:inline-block">&minus;</span>
                  {i.q}
                </summary>
                <p className="mt-3 pl-6 text-lg leading-[1.7]">{i.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
  }
}
