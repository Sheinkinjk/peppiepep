import type { ReactNode } from "react";

/**
 * Keeps this route out of the static prerender.
 *
 * The page is a client component that builds a Supabase browser client during
 * render, so prerendering it at build time calls createBrowserClient, which
 * throws "Your project's URL and API key are required" whenever
 * NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are not readable at
 * build. That took down the whole production build on 24 Aug 2026: two
 * deployments failed and the site silently kept serving an older one, so an
 * env-var fix appeared to have no effect.
 *
 * A password-reset screen has nothing to gain from being prerendered, and the
 * deploy should not be able to fail on it. Note this does not remove the need
 * for those variables at build: NEXT_PUBLIC_* values are inlined into the client
 * bundle, so they must NOT be marked "Sensitive" in Vercel, which makes them
 * runtime-only.
 */
export const dynamic = "force-dynamic";

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
  return children;
}
