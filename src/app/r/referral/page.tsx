import ReferralStatsClient from "./ReferralStatsClient";
import { createAmbassadorToken } from "@/lib/ambassador-auth";

interface ReferralPageProps {
  searchParams?: { code?: string };
}

export const dynamic = "force-dynamic";

export default function ReferralStatsPage({ searchParams }: ReferralPageProps) {
  const rawCode = searchParams?.code;
  const code = typeof rawCode === "string" ? rawCode : "";
  const token = code ? createAmbassadorToken(code) : null;

  return <ReferralStatsClient initialCode={code} token={token} />;
}
