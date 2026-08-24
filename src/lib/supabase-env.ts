// Resolves Supabase server credentials across the two naming schemes in play.
//
// The Vercel/Supabase integration provisions SUPABASE_PROJECT_ID,
// SUPABASE_PUBLISHABLE_KEY and SUPABASE_SECRET_KEY (the newer sb_publishable_ /
// sb_secret_ format). Most of this codebase predates that and reads
// NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, which on 24 Aug 2026
// were both present-but-EMPTY in Vercel production. Every server-side Supabase
// call therefore threw, storeLead swallowed it by design, and Apollo enquiries
// were accepted by the form and written nowhere.
//
// Reading both names means whichever the integration sets is picked up, and a
// future rename does not silently break lead capture again.

/** Project URL, from either naming scheme, derived from the ref as a last resort. */
export function supabaseUrl(): string | undefined {
  const direct =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  if (direct) return direct.replace(/\/+$/, "");
  const ref = process.env.SUPABASE_PROJECT_ID?.trim();
  return ref ? `https://${ref}.supabase.co` : undefined;
}

/** Full-access server key. Never send this to the browser. */
export function supabaseServiceKey(): string | undefined {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    undefined
  );
}

/** Which names actually resolved, for the /status page and error messages. */
export function supabaseCredentialReport(): {
  ok: boolean;
  url?: string;
  urlVar?: string;
  keyVar?: string;
  missing: string[];
} {
  const urlVar = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    ? "NEXT_PUBLIC_SUPABASE_URL"
    : process.env.SUPABASE_URL?.trim()
      ? "SUPABASE_URL"
      : process.env.SUPABASE_PROJECT_ID?.trim()
        ? "SUPABASE_PROJECT_ID"
        : undefined;
  const keyVar = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    ? "SUPABASE_SERVICE_ROLE_KEY"
    : process.env.SUPABASE_SECRET_KEY?.trim()
      ? "SUPABASE_SECRET_KEY"
      : undefined;
  const missing: string[] = [];
  if (!urlVar) missing.push("NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL / SUPABASE_PROJECT_ID)");
  if (!keyVar) missing.push("SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY)");
  return { ok: missing.length === 0, url: supabaseUrl(), urlVar, keyVar, missing };
}
