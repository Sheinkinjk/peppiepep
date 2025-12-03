"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Clock3, Shield, Gift, Stars } from "lucide-react";

import type { ReferralProjectConfig } from "./project-config";

type ReferralProjectLandingProps = {
  config: ReferralProjectConfig;
  referralHref: string;
};

export function ProjectLandingClient({ config, referralHref }: ReferralProjectLandingProps) {
  const router = useRouter();
  const autoRedirectSeconds = config.autoRedirectMs
    ? Math.ceil(config.autoRedirectMs / 1000)
    : null;
  const [secondsLeft, setSecondsLeft] = useState(autoRedirectSeconds);

  useEffect(() => {
    if (!config.autoRedirectMs) return;
    const redirectTimer = window.setTimeout(() => {
      router.replace(referralHref);
    }, config.autoRedirectMs);
    return () => window.clearTimeout(redirectTimer);
  }, [config.autoRedirectMs, referralHref, router]);

  useEffect(() => {
    if (!config.autoRedirectMs) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSecondsLeft(Math.ceil(config.autoRedirectMs / 1000));
    const countdown = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 0) return prev;
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(countdown);
  }, [config.autoRedirectMs]);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${config.gradient} text-white`}>
      <div className="relative isolate overflow-hidden px-4 py-12 sm:px-8">
        <div className="absolute inset-0 opacity-50 blur-3xl">
          <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute right-0 bottom-20 h-64 w-64 rounded-full bg-fuchsia-500/10" />
        </div>
        <div className="relative mx-auto max-w-6xl space-y-12">
          <section className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
                <Sparkles className="h-4 w-4 text-amber-200" />
                <span>{config.heroTagline}</span>
              </div>
              <div>
                {config.badge && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                    {config.badge}
                  </p>
                )}
                <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  {config.heroTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-slate-200">
                  {config.heroSubtitle}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {config.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/5 p-4 shadow-lg shadow-black/20"
                  >
                    <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.subtext}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Continuing your journey</p>
                  <p className="text-xs text-white/70">
                    Concierge will escort you to your ambassador portal.
                    {secondsLeft !== null && secondsLeft >= 0
                      ? ` Redirecting in ${secondsLeft}s.`
                      : null}
                  </p>
                </div>
                <Link
                  href={referralHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/40"
                >
                  {config.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/20 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Perks</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {config.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <Gift className="mt-0.5 h-4 w-4 text-emerald-300" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/20 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Testimonial</p>
                  <p className="mt-3 text-sm text-white/80">“{config.testimonial.quote}”</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/60">
                    {config.testimonial.author}
                  </p>
                  <p className="text-[11px] text-white/60">{config.testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {config.miniHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-xl shadow-black/20"
              >
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  <Shield className="h-4 w-4 text-sky-200" />
                  <span>{highlight.title}</span>
                </div>
                <p className="text-sm text-white/80">{highlight.copy}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[36px] border border-white/15 bg-white/5 p-6 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Automatic concierge route
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {config.name} is ready for your network
                </h2>
                <p className="text-sm text-white/70">
                  This branded moment softens the landing, then hands guests to your secure portal
                  with their referral code already stamped on every click.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm text-white/80">
                  <Clock3 className="h-4 w-4 text-amber-200" />
                  Redirecting shortly
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm text-white/80">
                  <Stars className="h-4 w-4 text-emerald-200" />
                  Referral code locked in
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                  Ambassador portal
                </p>
                <p className="mt-2 text-base text-white/80">
                  Live earnings, manual logging, instant redemption.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                  Landing glow-up
                </p>
                <p className="mt-2 text-base text-white/80">
                  Each project gets bespoke copy, stats, and CTAs tuned for that market.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
