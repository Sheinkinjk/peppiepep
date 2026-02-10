'use client';

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

export function SupabaseSessionListener() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const [supabase] = useState(() => (hasSupabaseConfig ? createBrowserSupabaseClient() : null));

  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      fetch("/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      }).catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Failed to sync auth session", error);
        }
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return null;
}
