import { Suspense, type ReactNode } from "react";

import AmbassadorJoinClient from "./AmbassadorJoinClient";
import { createAmbassadorToken } from "@/lib/ambassador-auth";

interface AmbassadorJoinPageProps {
  searchParams?: { code?: string };
}

export const dynamic = "force-dynamic";

export default function AmbassadorJoinPage({
  searchParams,
}: AmbassadorJoinPageProps) {
  const rawCode = searchParams?.code;
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
