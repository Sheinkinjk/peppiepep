import { Suspense, type ReactNode } from "react";

import AmbassadorJoinClient from "./AmbassadorJoinClient";
import { createAmbassadorToken } from "@/lib/ambassador-auth";

interface AmbassadorJoinPageProps {
  searchParams?:
    | { code?: string }
    | Promise<Record<string, string | string[] | undefined>>;
}

export const dynamic = "force-dynamic";

function isPromise<T>(value: unknown): value is Promise<T> {
  return typeof value === "object" && value !== null && "then" in (value as Record<string, unknown>);
}

export default async function AmbassadorJoinPage({
  searchParams,
}: AmbassadorJoinPageProps) {
  const resolvedParams = isPromise(searchParams) ? await searchParams : searchParams ?? {};
  const rawCode = resolvedParams?.code;
  const code = typeof rawCode === "string" ? rawCode : "";
  const token = code ? createAmbassadorToken(code) : null;

  return (
    <SuspenseWrapper>
      <AmbassadorJoinClient code={code} token={token} />
    </SuspenseWrapper>
  );
}

function SuspenseWrapper({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
