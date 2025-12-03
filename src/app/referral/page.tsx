export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";

import { ProjectLandingClient } from "./ProjectLandingClient";
import { getReferralProjectConfig } from "./project-config";

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

export default function ReferralAliasPage({ searchParams }: ReferralAliasPageProps) {
  const code = getParam(searchParams?.code) ?? "";
  const embedParam = getParam(searchParams?.embed);
  const projectSlug = getParam(searchParams?.project);
  const embedSuffix = embedParam === "1" ? "?embed=1" : "";

  const target = code
    ? `/r/${encodeURIComponent(code)}${embedSuffix}`
    : "/r/demo-referral";

  const projectConfig = getReferralProjectConfig(projectSlug);

  if (!projectConfig) {
    redirect(target);
  }

  const referralHref =
    code && projectConfig
      ? `/r/${encodeURIComponent(code)}${embedSuffix}`
      : projectConfig.defaultReferralPath || target;

  return <ProjectLandingClient config={projectConfig} referralHref={referralHref} />;
}
