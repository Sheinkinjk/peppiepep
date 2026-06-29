import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { AffiliatePageConfig } from "./types";

const ctaProps = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored",
});

// ─── Reusable primitives ──────────────────────────────────────────────────────

function PrimaryButton({ url, label }: { url: string; label: string }) {
  return (
    <a
      {...ctaProps(url)}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0AA7B5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD]"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SecondaryButton({ url, label }: { url: string; label: string }) {
  return (
    <a
      {...ctaProps(url)}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <h2 className="text-base font-black text-[#22C0CD]">{text}</h2>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function AffiliatePageTemplate({ config }: { config: AffiliatePageConfig }) {
  const url = config.affiliateUrl;

  const breadcrumb =
    config.breadcrumb ?? [
      { label: "Refer Labs", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: config.brand },
    ];

  return (
    <main className="bg-[#060f15] text-white min-h-screen">

      {/* ── Top Banner ── */}
      <div className="border-b border-[#0AA7B5]/20 bg-[#0AA7B5]/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-sm sm:text-base leading-snug mb-0.5">
                {config.banner.heading}
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                {config.banner.body}
              </p>
            </div>
            <a
              {...ctaProps(url)}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0AA7B5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] whitespace-nowrap"
            >
              {config.banner.buttonLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-6 text-xs text-white/40">
          {breadcrumb.map((crumb, i) => {
            const isLast = i === breadcrumb.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white/70">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/60">{crumb.label}</span>
                )}
                {!isLast && <span className="text-white/25">/</span>}
              </span>
            );
          })}
        </nav>

        {/* ── Hero ── */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0AA7B5]/30 bg-[#0AA7B5]/10 px-3 py-1 mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#22C0CD]">
                {config.badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-6">
              {config.hero.h1Prefix}{" "}
              <span className="text-[#22C0CD]">{config.hero.h1Highlight}</span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {config.hero.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <PrimaryButton url={url} label={config.ctas.primary} />
              <SecondaryButton url={url} label={config.ctas.secondary} />
            </div>

            <ul className="flex flex-col gap-2.5">
              {config.hero.trustBullets.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                  <CheckCircle2 className="h-4 w-4 text-[#22C0CD] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Content Sections ── */}
        {config.sections.map((section, i) => (
          <section key={i} className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
            <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
              <div>
                <SectionLabel text={section.heading} />
              </div>
              <div className="max-w-2xl space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-white/55 text-sm sm:text-base leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.disclaimer && (
                  <p className="text-white/30 text-xs sm:text-sm leading-relaxed">
                    {section.disclaimer}
                  </p>
                )}
                {section.hasCta && (
                  <div className="pt-2">
                    <a
                      {...ctaProps(url)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0AA7B5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD]"
                    >
                      {section.ctaText ?? "Continue"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* ── How It Works ── */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <SectionLabel text="How It Works" />
            </div>
            <div className="max-w-2xl space-y-5">
              {config.steps.map((s) => (
                <div key={s.num} className="flex gap-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0AA7B5]/50 mt-0.5 w-7 flex-shrink-0">
                    {s.num}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{s.heading}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mid-page CTA ── */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <div className="rounded-2xl border border-[#0AA7B5]/20 bg-[#0AA7B5]/[0.04] px-8 py-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {config.ctas.midHeading}
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-md mx-auto mb-7">
              {config.ctas.midBody}
            </p>
            <PrimaryButton url={url} label={config.ctas.midButton} />
          </div>
        </section>

        {/* ── Why Use This Page ── */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <SectionLabel text="Why Use This Page" />
            </div>
            <div className="max-w-2xl">
              <ul className="space-y-3">
                {config.whyUseThis.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-[#22C0CD] mt-0.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <SectionLabel text="FAQ" />
            </div>
            <div className="max-w-2xl space-y-8">
              {config.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="text-white text-sm sm:text-base font-bold mb-2 leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Guides (internal links) ── */}
        {config.relatedLinks && config.relatedLinks.length > 0 && (
          <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
            <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
              <div>
                <SectionLabel text="Related Guides" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                {config.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-[#0AA7B5]/30 hover:bg-[#0AA7B5]/[0.04]"
                  >
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#22C0CD] transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed mb-3">{link.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0AA7B5]">
                      Read guide
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="border-t border-[#0AA7B5]/10 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            {config.ctas.bottomHeading}
          </h2>
          <p className="text-white/45 text-sm leading-relaxed max-w-md mx-auto mb-7">
            {config.ctas.bottomBody}
          </p>
          <a
            {...ctaProps(url)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#0AA7B5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD]"
          >
            {config.ctas.bottomButton}
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="text-white/25 text-xs mt-5">{config.disclaimer}</p>
        </section>

      </div>
    </main>
  );
}
