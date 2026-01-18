import ReferralStatsClient from "./ReferralStatsClient";
import { createAmbassadorToken } from "@/lib/ambassador-auth";

interface ReferralPageProps {
  searchParams?:
    | { code?: string }
    | Promise<Record<string, string | string[] | undefined>>;
}

function isPromise<T>(value: unknown): value is Promise<T> {
  return typeof value === "object" && value !== null && "then" in (value as Record<string, unknown>);
}

export const dynamic = "force-dynamic";

export default async function ReferralStatsPage({ searchParams }: ReferralPageProps) {
  const resolvedParams = isPromise(searchParams) ? await searchParams : searchParams ?? {};
  const rawCode = resolvedParams?.code;
  const code = typeof rawCode === "string" ? rawCode : "";
  const token = code ? createAmbassadorToken(code) : null;

  return <ReferralStatsClient initialCode={code} token={token} />;
}
