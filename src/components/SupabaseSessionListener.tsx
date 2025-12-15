'use client';

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

export function SupabaseSessionListener() {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      fetch("/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      }).catch((error) => {
        console.error("Failed to sync auth session", error);
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return null;
}
