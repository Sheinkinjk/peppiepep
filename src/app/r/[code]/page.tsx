export const dynamic = "force-dynamic";
export const revalidate = 0;

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { createServiceClient } from "@/lib/supabase";
import { recordReferralSubmission } from "@/lib/referrals";
import { Database } from "@/types/supabase";
import { inferDeviceFromUserAgent, logReferralEvent } from "@/lib/referral-events";
import { createAmbassadorToken } from "@/lib/ambassador-auth";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { ReferralSubmissionForm } from "@/components/ReferralSubmissionForm";
import { ReferralShareCard } from "@/components/ReferralShareCard";
import { DiscountCodeCard } from "@/components/DiscountCodeCard";

function normalizeHexColor(value?: string | null, fallback = "#0abab5") {
  if (!value) return fallback;
  const hex = value.trim().replace(/^#/, "");
  if (!/^[0-9a-f]{3}$/i.test(hex) && !/^[0-9a-f]{6}$/i.test(hex)) {
    return fallback;
  }
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
  const adjust = (channel: number) => {
    const shifted = channel + Math.round((amount / 100) * 255);
    return Math.min(255, Math.max(0, shifted));
  };
  const r = adjust((int >> 16) & 255);
  const g = adjust((int >> 8) & 255);
  const b = adjust(int & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function initialsFromName(name?: string | null) {
  if (!name) return "VIP";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "VIP";
}

type ReferralSearchParams = Record<string, string | string[] | undefined>;

interface ReferralPageProps {
  params: Promise<{ code: string }>;
  searchParams?: ReferralSearchParams;
}

export default async function ReferralPage({ params, searchParams }: ReferralPageProps) {
  const supabase = await createServiceClient();
  const { code } = await params;

  const { data: customer } = await supabase
    .from("customers")
    .select("*, business:business_id(*)")
    .ilike("referral_code", code)
    .single();

  if (!customer) {
    redirect(`/referral?code=${encodeURIComponent(code)}`);
  }

  type CustomerWithBusiness = Database["public"]["Tables"]["customers"]["Row"] & {
    business: Database["public"]["Tables"]["businesses"]["Row"] | null;
  };

  const customerWithBusiness = customer as CustomerWithBusiness;

  // Check if this is the admin's referral code - redirect to partner program with attribution
  const ADMIN_REFERRAL_CODE = process.env.ADMIN_REFERRAL_CODE || "Jn9wjbn2kQlO";
  if (code.toLowerCase() === ADMIN_REFERRAL_CODE.toLowerCase()) {
    // Redirect to route handler that will set attribution cookie and redirect to partner program
    // This is necessary because cookies can only be set in Route Handlers or Server Actions in Next.js 16+
    const params = new URLSearchParams();
    params.set("code", customerWithBusiness.referral_code || code);
    params.set("ambassador_id", customerWithBusiness.id);
    params.set("business_id", customerWithBusiness.business_id);

    // Pass through any UTM or tracking parameters
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        const strValue = Array.isArray(value) ? value[0] : value;
        if (strValue) {
          params.set(key, strValue);
        }
      });
    }

    redirect(`/api/referral-redirect?${params.toString()}`);
  }
  const offerText = customerWithBusiness.business?.offer_text || "$15 credit";
  const businessName = customerWithBusiness.business?.name || "our business";
  const rewardAmount = customerWithBusiness.business?.reward_amount || 15;
  const newUserReward =
    customerWithBusiness.business?.new_user_reward_text || offerText;
  const clientReward =
    customerWithBusiness.business?.client_reward_text ||
    (customerWithBusiness.business?.reward_type === "credit"
      ? `$${rewardAmount} credit`
      : customerWithBusiness.business?.reward_type === "upgrade"
      ? customerWithBusiness.business?.upgrade_name || "a free upgrade"
      : customerWithBusiness.business?.reward_type === "discount"
      ? `${rewardAmount}% discount`
      : `${rewardAmount} points`);
  const rewardTerms = customerWithBusiness.business?.reward_terms || null;
  const localeCopy = {
    en: {
      heroTitle: "You’ve Been Hooked Up!",
      inviteText: (name: string | null, business: string) =>
        `${name || "A friend"} is sharing an exclusive ${business} offer with you! Enjoy`,
      consentLabel:
        "I give consent for my information to be stored so my reward can be processed.",
      nameLabel: "Your Name",
      phoneLabel: "Phone Number",
      submitCta: "Claim this offer",
      languageLabel: "Language",
      consentNote: "You can request your data at any time via the links below.",
      dataExport: "Download my data",
      dataDelete: "Delete my data",
    },
    es: {
      heroTitle: "¡Te han invitado!",
      inviteText: (name: string | null, business: string) =>
        `${name || "Un amigo"} comparte esta recompensa exclusiva contigo en ${business}. Disfruta`,
      consentLabel:
        "Autorizo que mis datos se almacenen para poder procesar mi recompensa.",
      nameLabel: "Tu nombre",
      phoneLabel: "Número de teléfono",
      submitCta: "Canjear oferta",
      languageLabel: "Idioma",
      consentNote: "Puedes solicitar tus datos en cualquier momento con los enlaces debajo.",
      dataExport: "Descargar mis datos",
      dataDelete: "Eliminar mis datos",
    },
  } as const;

  const getParam = (key: string) => {
    if (!searchParams) return null;
    const raw = searchParams[key];
    if (Array.isArray(raw)) return raw[0] ?? null;
    return raw ?? null;
  };

  const sourceParam = getParam("utm_source") ?? getParam("source");
  const campaignParam = getParam("utm_campaign");
  const metadataQuery =
    searchParams
      ? Object.fromEntries(
          Object.entries(searchParams).map(([key, value]) => [
            key,
            Array.isArray(value) ? value[0] ?? null : value ?? null,
          ]),
        )
      : {};
  const requestedLocale = getParam("lang") || getParam("locale");
  const selectedLocale =
    requestedLocale && requestedLocale in localeCopy
      ? (requestedLocale as keyof typeof localeCopy)
      : "en";
  const t = localeCopy[selectedLocale];

  const headerStore = await headers();
  const device = inferDeviceFromUserAgent(headerStore.get("user-agent"));
  const referrer = headerStore.get("referer");

  await logReferralEvent({
    supabase,
    businessId: customerWithBusiness.business_id,
    ambassadorId: customerWithBusiness.id,
    eventType: "link_visit",
    source: campaignParam ?? sourceParam ?? "direct",
    device,
    metadata: {
      referrer,
      query: metadataQuery,
      locale: selectedLocale,
    },
  });

  const campaignTrackingId = campaignParam;
  const isEmbed = getParam("embed") === "1";
  const buildLocaleHref = (locale: string) => {
    const params = new URLSearchParams();
    Object.entries(metadataQuery).forEach(([key, value]) => {
      if (typeof value === "string" && value.length > 0) {
        params.set(key, value);
      }
    });
    params.set("lang", locale);
    return `?${params.toString()}`;
  };

  // Get ambassador's stats
  const { data: referralStats } = await supabase
    .from("referrals")
    .select("*", { count: "exact" })
    .eq("ambassador_id", customerWithBusiness.id);

  const totalReferrals = referralStats?.length || 0;
  const ambassadorCredits = customerWithBusiness.credits || 0;
  const ambassadorToken = customerWithBusiness.referral_code
    ? createAmbassadorToken(customerWithBusiness.referral_code)
    : null;
  const highlightColor = normalizeHexColor(customerWithBusiness.business?.brand_highlight_color);
  const darkerAccent = shiftColor(highlightColor, -25);
  const lighterAccent = shiftColor(highlightColor, 35);
  const heroGradient = `linear-gradient(135deg, ${highlightColor}, ${darkerAccent})`;
  const ambassadorName = customerWithBusiness.name || "Your ambassador";
  const ambassadorInitials = initialsFromName(customerWithBusiness.name);
  const discountCode = customerWithBusiness.discount_code || null;
  const siteOrigin =
    ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    ensureAbsoluteUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    "https://referlabs.com.au";
  const resolvedReferralUrl = `${siteOrigin}/r/${customerWithBusiness.referral_code ?? code}`;
  const shareMessage = `I can get you ${newUserReward} at ${businessName}. Tap ${resolvedReferralUrl}${
    discountCode ? ` and mention ${discountCode}` : ""
  } so their concierge locks it in for you.`;
  const fallbackDiscountInstructions = `No discount word needed — just mention ${ambassadorName} when you book so the concierge attaches your reward.`;
  const howItWorks = [
    {
      title: "Reserve your perk",
      copy: `Share your details so ${businessName} can hold ${newUserReward} in your name.`,
    },
    {
      title: "Book with the concierge",
      copy: `Expect a text or call to finalize timing. Mention ${discountCode ?? ambassadorName} if they ask.`,
    },
    {
      title: "Rewards unlock automatically",
      copy: `${ambassadorName} gets ${clientReward} once you complete your visit, and you keep ${newUserReward}.`,
    },
  ];

  async function submitReferral(formData: FormData) {
    "use server";
    try {
      const supabase = await createServiceClient();
      const campaignIdFromForm =
        (formData.get("campaign_id")?.toString().trim() || null) ?? null;
      const submittedLocale = formData.get("locale")?.toString() || selectedLocale;
      const consentGiven = formData.get("consent") === "on";

      await recordReferralSubmission({
        supabase,
        businessId: customerWithBusiness.business_id,
        ambassadorId: customerWithBusiness.id,
        campaignId: campaignIdFromForm,
        consentGiven,
        locale: submittedLocale,
        referredName: formData.get("name")?.toString() ?? null,
        referredPhone: formData.get("phone")?.toString() ?? null,
      });
      await logReferralEvent({
        supabase,
        businessId: customerWithBusiness.business_id,
        ambassadorId: customerWithBusiness.id,
        eventType: "signup_submitted",
        source: campaignIdFromForm ?? "referral-form",
        metadata: {
          locale: submittedLocale,
        },
      });

      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Referral submission error:", error);
      return {
        error:
          selectedLocale === "es"
            ? "No pudimos guardar tu solicitud. Intenta nuevamente."
            : "We couldn’t process your referral. Please try again.",
      };
    }
  }

  return (
    <div
      className={
        isEmbed
          ? "min-h-full w-full bg-transparent"
          : "min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100"
      }
    >
      <div className={isEmbed ? "w-full space-y-6" : "mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8"}>
        <section
          className="relative overflow-hidden rounded-[34px] border border-white/20 p-8 text-white shadow-[0_25px_70px_rgba(6,35,57,0.35)]"
          style={{ background: heroGradient }}
        >
          <div className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {customerWithBusiness.business?.logo_url ? (
                  <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={customerWithBusiness.business.logo_url}
                      alt={businessName}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-xl font-black uppercase">
                    {businessName.slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">Private invitation</p>
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{businessName}</h1>
                  <p className="text-sm text-white/85">
                    {offerText || `Concierge referral program hosted by ${businessName}.`}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
                <p className="text-white/70">Introduced by</p>
                <p className="text-lg font-semibold">{ambassadorName}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Reward for you</p>
                <p className="mt-2 text-2xl font-black">{newUserReward}</p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Thank-you for {ambassadorName}</p>
                <p className="mt-2 text-2xl font-black">{clientReward}</p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Ambassador stats</p>
                <p className="mt-2 text-lg font-semibold">
                  {totalReferrals} introductions · ${ambassadorCredits} earned
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-lg">
            <ReferralShareCard
              referralUrl={resolvedReferralUrl}
              shareMessage={shareMessage}
              accentColor={highlightColor}
            />
          </Card>
          <Card className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-lg space-y-6">
            <DiscountCodeCard
              discountCode={discountCode}
              businessName={businessName}
              fallbackInstructions={fallbackDiscountInstructions}
              accentColor={highlightColor}
            />
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Language</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.keys(localeCopy).map((locale) => (
                  <Link
                    key={locale}
                    href={buildLocaleHref(locale)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      locale === selectedLocale
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {locale.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Reserve your reward</p>
              <h2 className="text-2xl font-black text-slate-900">
                Claim {newUserReward} at {businessName}
              </h2>
              <p className="text-sm text-slate-600">
                Submit your details so the concierge can lock in the offer before you book.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold">
                {ambassadorInitials}
              </div>
              Hosted by {ambassadorName}
            </div>
          </div>
          <ReferralSubmissionForm
            locale={selectedLocale}
            campaignId={campaignTrackingId}
            copy={{
              nameLabel: t.nameLabel,
              phoneLabel: t.phoneLabel,
              consentLabel: t.consentLabel,
              consentNote: t.consentNote,
              submitCta: t.submitCta,
            }}
            action={submitReferral}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Data encrypted & stored securely for {businessName} only.</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {rewardTerms && <span>{rewardTerms}</span>}
              {ambassadorToken && customerWithBusiness.referral_code ? (
                <a
                  href={`/api/ambassadors/export?code=${customerWithBusiness.referral_code}&token=${encodeURIComponent(
                    ambassadorToken,
                  )}`}
                  className="underline"
                >
                  {t.dataExport}
                </a>
              ) : (
                <span className="text-slate-400">{t.dataExport}</span>
              )}
              <Link href="/contact" className="underline text-red-600">
                {t.dataDelete}
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900/10 p-3 text-slate-900">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">How it works</p>
              <h3 className="text-xl font-black text-slate-900">A simple 3-step journey</h3>
            </div>
          </div>
          <div className="space-y-4">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl text-base font-black text-slate-900"
                  style={{ backgroundColor: `${lighterAccent}33`, color: darkerAccent }}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-600">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
