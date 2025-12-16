export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ProjectLandingClient } from "./ProjectLandingClient";
import { getReferralProjectConfig, referralProjectConfigs } from "./project-config";
import { createServiceClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

interface ReferralAliasPageProps {
  searchParams?: {
    code?: string | string[];
    embed?: string | string[];
    project?: string | string[];
  };
}

function getParam(value?: string | string[]) {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value[0] ?? null;
}

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

export default async function ReferralAliasPage({ searchParams }: ReferralAliasPageProps) {
  const code = getParam(searchParams?.code) ?? "";
  const embedParam = getParam(searchParams?.embed);
  const projectSlug = getParam(searchParams?.project);
  const appendEmbedParam = (path: string) => {
    if (embedParam !== "1") return path;
    return path.includes("?") ? `${path}&embed=1` : `${path}?embed=1`;
  };

  const projectConfig =
    getReferralProjectConfig(projectSlug) ?? referralProjectConfigs.spa;

  let ambassadorPreview: AmbassadorPreview | null = null;
  if (code) {
    try {
      const supabase = await createServiceClient();
      const { data } = await supabase
        .from("customers")
        .select(
          `
            name,
            referral_code,
            discount_code,
            business:business_id (
              name,
              offer_text,
              client_reward_text,
              new_user_reward_text,
              reward_terms,
              logo_url,
              brand_highlight_color
            )
          `,
        )
        .ilike("referral_code", code)
        .single();
      if (data) {
        const typed = data as Database["public"]["Tables"]["customers"]["Row"] & {
          business: Database["public"]["Tables"]["businesses"]["Row"] | null;
        };
        ambassadorPreview = {
          name: typed.name ?? null,
          referral_code: typed.referral_code ?? null,
          discount_code: typed.discount_code ?? null,
          business_name: typed.business?.name ?? null,
          offer_text: typed.business?.offer_text ?? null,
          client_reward_text: typed.business?.client_reward_text ?? null,
          new_user_reward_text: typed.business?.new_user_reward_text ?? null,
          reward_terms: typed.business?.reward_terms ?? null,
          logo_url: typed.business?.logo_url ?? null,
          brand_highlight_color: typed.business?.brand_highlight_color ?? null,
        };
      }
    } catch (error) {
      console.error("Failed to load ambassador preview:", error);
    }
  }

  const hasAmbassador = Boolean(ambassadorPreview?.referral_code);
  const fallbackReferralPath = appendEmbedParam(
    `/referral?project=${encodeURIComponent(projectConfig.slug)}`,
  );
  const referralHref = code
    ? appendEmbedParam(`/r/${encodeURIComponent(code)}`)
    : fallbackReferralPath;
  const landingConfig = hasAmbassador
    ? projectConfig
    : {
        ...projectConfig,
        autoRedirectMs: null,
      };

  return (
    <ProjectLandingClient
      config={landingConfig}
      referralHref={referralHref}
      ambassador={ambassadorPreview}
      ownerDashboardHref="/dashboard"
    />
  );
}
