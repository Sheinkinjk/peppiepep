'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReferralShareCard } from "@/components/ReferralShareCard";
import { DiscountCodeCard } from "@/components/DiscountCodeCard";
import type { ReferralProjectConfig } from "./project-config";

type AmbassadorPreview = {
  name: string | null;
  referral_code: string | null;
  discount_code: string | null;
  business_name: string | null;
  offer_text: string | null;
  client_reward_text: string | null;
  new_user_reward_text: string | null;
  reward_terms: string | null;
  logo_url?: string | null;
  brand_highlight_color?: string | null;
};

type ReferralProjectLandingProps = {
  config: ReferralProjectConfig;
  referralHref: string;
  ambassador: AmbassadorPreview | null;
  ownerDashboardHref?: string;
};

function normalizeHref(href: string) {
  if (/^https?:\/\//i.test(href)) return href;
  if (typeof window !== "undefined") {
    try {
      return new URL(href, window.location.origin).toString();
    } catch {
      return href;
    }
  }
  return `https://referlabs.com.au${href.startsWith("/") ? href : `/${href}`}`;
}

function normalizeHexColor(value?: string | null, fallback = "#0abab5") {
  if (!value) return fallback;
  const hex = value.trim().replace(/^#/, "");
  if (!/^[0-9a-f]{3}$/i.test(hex) && !/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  if (hex.length === 3) {
    return `#${hex
      .split("")
      .map((char) => char + char)
      .join("")
      .toLowerCase()}`;
  }
  return `#${hex.toLowerCase()}`;
}

function shiftColor(hex: string, amount: number) {
  const normalized = normalizeHexColor(hex);
  const int = parseInt(normalized.slice(1), 16);
  const adjustChannel = (channel: number) => {
    const shifted = channel + Math.round((amount / 100) * 255);
    return Math.min(255, Math.max(0, shifted));
  };
  const r = adjustChannel((int >> 16) & 255);
  const g = adjustChannel((int >> 8) & 255);
  const b = adjustChannel(int & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function ProjectLandingClient({
  config,
  referralHref,
  ambassador,
  ownerDashboardHref,
}: ReferralProjectLandingProps) {
  const router = useRouter();
  const hasAmbassador = Boolean(ambassador?.referral_code);
  const dashboardHref = ownerDashboardHref ?? "/dashboard";
  const [linkRevealed, setLinkRevealed] = useState(false);
  const resolvedReferralUrl = useMemo(
    () =>
      hasAmbassador
        ? normalizeHref(referralHref)
        : "Add ambassadors to generate a personalized link.",
    [hasAmbassador, referralHref],
  );

  useEffect(() => {
    if (!hasAmbassador || !config.autoRedirectMs) return;
    const timer = window.setTimeout(() => router.replace(referralHref), config.autoRedirectMs);
    return () => window.clearTimeout(timer);
  }, [config.autoRedirectMs, referralHref, router, hasAmbassador]);

  const friendReward = ambassador?.new_user_reward_text || ambassador?.offer_text || "a VIP reward";
  const ambassadorReward = ambassador?.client_reward_text || "Concierge credit released after their visit";
  const businessName = ambassador?.business_name || config.name;
  const discountCode = ambassador?.discount_code ?? null;
  const highlightColor = normalizeHexColor(
    ambassador?.brand_highlight_color ??
      config.accentGradient.replace("from-[", "").split("]")[0]?.split(" ")[0] ??
      "#0abab5",
  );
  const darkerAccent = shiftColor(highlightColor, -30);
  const heroGradient = `linear-gradient(135deg, ${highlightColor}, ${darkerAccent})`;
  const shareMessage = hasAmbassador
    ? `I can get you ${friendReward} at ${businessName}. Tap ${resolvedReferralUrl}${
        discountCode ? ` and mention ${discountCode}` : ""
      } so their concierge locks it in for you.`
    : `We're launching private referrals at ${businessName}. Add ambassadors inside the dashboard to generate shareable links.`;
  const fallbackDiscountInstructions = `No code yet—mention your ambassador when booking so the concierge tags the reward.`;

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100"
      aria-label={`${businessName} referral invitation`}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8 sm:px-6 lg:px-8">
        <section
          className="relative overflow-hidden rounded-[38px] border border-white/30 p-8 text-white shadow-[0_30px_90px_rgba(2,18,30,0.35)]"
          style={{ background: heroGradient }}
        >
          <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="relative space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  {config.heroTagline}
                </p>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  {businessName} referral concierge
                </h1>
                <p className="text-sm text-white/85">{ambassador?.offer_text || config.heroSubtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={hasAmbassador ? referralHref : dashboardHref}
                  target={hasAmbassador ? "_blank" : undefined}
                  rel={hasAmbassador ? "noopener noreferrer" : undefined}
                >
                  <Button className="rounded-full bg-white/90 text-slate-900 hover:bg-white">
                    {hasAmbassador ? "Open personal portal" : "Go to dashboard"}
                  </Button>
                </Link>
                {!hasAmbassador && (
                <Link href={`${dashboardHref}#tab-section-clients`}>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/60 bg-white/90 text-slate-900 hover:bg-white hover:text-slate-900"
                  >
                    Review integration guide
                  </Button>
                </Link>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/30 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">You receive</p>
                <p className="mt-3 text-4xl font-black">{friendReward}</p>
                <p className="text-xs text-white/75">Automatically locked in once you submit and book.</p>
              </div>
              <div className="rounded-3xl border border-white/30 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {ambassador?.name || "Your host"} receives
                </p>
                <p className="mt-3 text-4xl font-black">{ambassadorReward}</p>
                <p className="text-xs text-white/75">Released the moment your visit is complete.</p>
              </div>
              <div className="rounded-3xl border border-white/30 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Why it matters</p>
                <p className="mt-3 text-lg font-semibold">
                  Concierges confirm within {config.stats[2]?.value ?? "<2h"}
                </p>
                <p className="text-xs text-white/75">{config.stats[2]?.subtext ?? "to protect VIP experiences"}</p>
              </div>
            </div>
            {hasAmbassador && (
              <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/20 bg-white/5 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-xl font-black">
                  {(ambassador?.name || businessName).slice(0, 2)}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{ambassador?.name || "Your ambassador"}</p>
                  <p className="text-white/70">
                    Referral code:&nbsp;
                    <span className="font-mono text-white">{ambassador?.referral_code}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {hasAmbassador ? (
            <div className="rounded-[30px] border border-slate-200 bg-white/95 p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Your referral link</p>
                  <p className="text-sm text-slate-600">Press the button to reveal and copy your share-ready link.</p>
                </div>
                <Button
                  type="button"
                  className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                  onClick={() => setLinkRevealed(true)}
                >
                  Get my referral link
                </Button>
              </div>
              {linkRevealed ? (
                <ReferralShareCard
                  referralUrl={resolvedReferralUrl}
                  shareMessage={shareMessage}
                  accentColor={highlightColor}
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-500">
                  Your personalized link and share message will appear here once you tap <strong>Get my referral link</strong>.
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-[30px] border border-dashed border-amber-200 bg-amber-50/50 p-6 shadow-inner">
              <p className="text-sm font-semibold text-amber-800">
                Add ambassadors to generate copy-ready referral links automatically.
              </p>
              <p className="mt-2 text-sm text-amber-900">
                Once customers are imported, each profile gets referral links, discount codes, and a live dashboard. Copy
                buttons will appear here instantly.
              </p>
              <Link href={`${dashboardHref}#tab-section-clients`} className="mt-4 inline-block">
                <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                  Go to Clients & Imports
                </Button>
              </Link>
            </div>
          )}

          <div className="rounded-[30px] border border-slate-200 bg-white/95 p-6 shadow-lg">
            <DiscountCodeCard
              discountCode={discountCode}
              businessName={businessName}
              fallbackInstructions={fallbackDiscountInstructions}
              accentColor={highlightColor}
            />
          </div>
        </section>

        <section className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-xl space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Loyalty program</p>
            <h2 className="text-2xl font-black text-slate-900">{businessName} ambassador advantages</h2>
            <p className="mt-2 text-sm text-slate-600">
              Every introduction is concierge-tracked. You get credited the instant your friend completes their visit.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {config.perks.map((perk) => (
              <div key={perk} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
                <span className="mr-2 text-lg text-teal-500">•</span>
                {perk}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {config.miniHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-[26px] border border-slate-200 bg-white/95 p-5 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{highlight.title}</p>
              <p className="mt-2 text-sm text-slate-600">{highlight.copy}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
