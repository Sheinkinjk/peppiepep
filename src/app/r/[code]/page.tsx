export const dynamic = "force-dynamic";
export const revalidate = 0;

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Gift, Sparkles, TrendingUp, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { createServiceClient } from "@/lib/supabase";
import { recordReferralSubmission } from "@/lib/referrals";
import { Database } from "@/types/supabase";
import { inferDeviceFromUserAgent, logReferralEvent } from "@/lib/referral-events";
import { createAmbassadorToken } from "@/lib/ambassador-auth";
import { ReferralSubmissionForm } from "@/components/ReferralSubmissionForm";

type ReferralSearchParams = Record<string, string | string[] | undefined>;

interface ReferralPageProps {
  params: { code: string };
  searchParams?: ReferralSearchParams;
}

export default async function ReferralPage({ params, searchParams }: ReferralPageProps) {
  const supabase = await createServiceClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("*, business:business_id(*)")
    .eq("referral_code", params.code)
    .single();

  if (!customer) {
    redirect(`/r/demo-referral?code=${encodeURIComponent(params.code)}`);
  }

  type CustomerWithBusiness = Database["public"]["Tables"]["customers"]["Row"] & {
    business: Database["public"]["Tables"]["businesses"]["Row"] | null;
  };

  const customerWithBusiness = customer as CustomerWithBusiness;
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
          : "aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-white p-4"
      }
    >
      <div className={isEmbed ? "w-full space-y-6" : "w-full max-w-2xl space-y-6"}>
        {/* Ambassador Stats Banner */}
        <Card className="relative overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-6 shadow-2xl">
          <div className="absolute -right-12 -top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex items-center justify-between text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <h2 className="text-xl font-bold">Ambassador: {customerWithBusiness.name}</h2>
              </div>
              <p className="text-purple-100">Sharing rewards with friends!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black">{totalReferrals}</div>
              <div className="text-sm text-purple-100">Referrals</div>
            </div>
          </div>
        </Card>

        {/* Main Referral Card */}
        <Card className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-8 shadow-2xl backdrop-blur">
          <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-3 justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-1.5 text-sm font-semibold text-white">
                <Gift className="h-4 w-4" />
                Exclusive Offer
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
                {t.languageLabel}:
                {Object.keys(localeCopy).map((locale) => (
                  <Link
                    key={locale}
                    href={buildLocaleHref(locale)}
                    className={`rounded-full px-2 py-0.5 border text-[11px] ${
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

            <h1 className="mb-3 text-4xl font-black text-slate-900">
              {t.heroTitle}
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-700">
              {t.inviteText(customerWithBusiness.name, businessName)}{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
                {newUserReward}
              </span>{" "}
              {selectedLocale === "es" ? "" : "at"}{" "}
              <span className="font-bold text-slate-900">{businessName}</span>.{" "}
              {selectedLocale === "es"
                ? `Ambos recibirán ${clientReward} cuando completes tu reserva.`
                : `They’ll earn ${clientReward} as a thank-you once you complete your booking.`}
            </p>

            {/* Rewards Info Cards */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-pink-50 to-orange-50 p-4 border border-pink-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5 text-pink-600" />
                  <div className="text-sm font-semibold text-slate-600">Your Reward</div>
                </div>
                <div className="text-2xl font-black text-slate-900">{newUserReward}</div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div className="text-sm font-semibold text-slate-600">Their Reward</div>
                </div>
                <div className="text-2xl font-black text-slate-900">{clientReward}</div>
              </div>
            </div>

            {/* Ambassador Stats */}
            <div className="mb-8 rounded-xl bg-slate-50 p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-slate-600" />
                <h3 className="font-bold text-slate-900">Why {customerWithBusiness.name} loves us</h3>
              </div>
              <div className="flex gap-6">
                <div>
                  <div className="text-2xl font-black text-slate-900">{totalReferrals}</div>
                  <div className="text-sm text-slate-600">Friends Referred</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600">
                    ${ambassadorCredits}
                  </div>
                  <div className="text-sm text-slate-600">Credits Earned</div>
                </div>
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

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500 justify-center">
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
              <Link
                href="/contact"
                className="underline text-red-600"
              >
                {t.dataDelete}
              </Link>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur">
          <h3 className="mb-4 text-lg font-bold text-slate-900">How This Works</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">1</div>
              <p><strong>You claim your {newUserReward}</strong> by submitting your details above</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">2</div>
              <p><strong>Book your appointment</strong> at {businessName}</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">3</div>
              <p><strong>{customerWithBusiness.name} gets {clientReward}</strong> when you complete your booking!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
