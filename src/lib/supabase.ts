import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

function normalizeCookieValue(value?: string | null) {
  if (!value) return value;
  const base64Prefix = "base64-";
  if (value.startsWith(base64Prefix)) {
    const encoded = value.slice(base64Prefix.length);
    try {
      return Buffer.from(encoded, "base64").toString("utf8");
    } catch {
      return value;
    }
  }
  return value;
}

function mapCookies(store: Awaited<ReturnType<typeof cookies>>) {
  return store.getAll().map(({ name, value }) => ({
    name,
    value: normalizeCookieValue(value) ?? "",
  }));
}

// For server components and server actions (uses anon key + cookies)
export const createServerComponentClient = async (): Promise<SupabaseClient<Database>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookieStore = (await cookies()) as any; // Allows cookie mutation in RSC
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return mapCookies(cookieStore);
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

// For server actions / route handlers (bypasses RLS when needed).
export const createServiceClient = async (): Promise<SupabaseClient<Database>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookieStore = (await cookies()) as any; // Allows cookie mutation in server actions
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return mapCookies(cookieStore);
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    },
  );
};
