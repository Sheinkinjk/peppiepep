#!/usr/bin/env node

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.local",
});

const targetOrigin =
  process.env.TARGET_ORIGIN ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  console.error(
    "Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY)."
  );
  process.exit(1);
}

const projectRef = new URL(supabaseUrl).host.split(".")[0];
const authCookieName = `sb-${projectRef}-auth-token`;

const adminClient = createClient(supabaseUrl, serviceRoleKey);
const browserClient = createClient(supabaseUrl, anonKey);

async function createConfirmedUser() {
  const email = `auth-check+${Date.now()}@referlabs.com.au`;
  const password = `Refer!${Math.random().toString(36).slice(2, 8)}`;
  const { error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
  return { email, password };
}

async function signIn(email, password) {
  const { data, error } = await browserClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data.session) {
    throw new Error(`Sign-in failed: ${error?.message ?? "No session"}`);
  }
  return data.session;
}

async function syncSessionWithApp(session) {
  const response = await fetch(`${targetOrigin}/auth/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "INITIAL_SESSION", session }),
    redirect: "manual",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Session sync failed (${response.status}): ${body || response.statusText}`,
    );
  }

  const setCookieHeaders =
    response.headers.getSetCookie?.() ?? response.headers.raw?.()["set-cookie"] ?? [];
  const sessionCookie = setCookieHeaders.find((cookie) =>
    cookie.startsWith(`${authCookieName}=`),
  );

  if (!sessionCookie) {
    throw new Error("Session cookie not found in response.");
  }

  return sessionCookie.split(";")[0];
}

async function fetchDashboard(cookie) {
  const headers = cookie ? { Cookie: cookie } : {};
  const response = await fetch(`${targetOrigin}/dashboard`, {
    headers,
    redirect: "manual",
  });
  return {
    status: response.status,
    location: response.headers.get("location") ?? null,
  };
}

async function signOut(cookie) {
  const response = await fetch(`${targetOrigin}/auth/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify({ event: "SIGNED_OUT", session: null }),
  });

  const setCookieHeaders =
    response.headers.getSetCookie?.() ?? response.headers.raw?.()["set-cookie"] ?? [];
  const sessionCookie = setCookieHeaders.find((value) =>
    value.startsWith(`${authCookieName}=`),
  );

  if (!sessionCookie) {
    return null;
  }

  const parsed = sessionCookie.split(";")[0] ?? "";
  return parsed.length > `${authCookieName}=`.length ? parsed : null;
}

async function run() {
  console.log(`\nTarget origin: ${targetOrigin}`);
  const credentials = await createConfirmedUser();
  console.log(`Created confirmed user: ${credentials.email}`);

  const session = await signIn(credentials.email, credentials.password);
  console.log("Supabase password login succeeded.");

  const cookie = await syncSessionWithApp(session);
  console.log("Session synced to Next.js route (cookie issued).");

  const firstDashboard = await fetchDashboard(cookie);
  console.log(
    `/dashboard response: ${firstDashboard.status}${
      firstDashboard.location ? ` -> ${firstDashboard.location}` : ""
    }`,
  );

  if (firstDashboard.status !== 200) {
    throw new Error("Dashboard did not render after login.");
  }

  const secondDashboard = await fetchDashboard(cookie);
  console.log(
    `Subsequent /dashboard request: ${secondDashboard.status}${
      secondDashboard.location ? ` -> ${secondDashboard.location}` : ""
    }`,
  );
  console.log(
    "\nAuth flow test completed (sign-up -> verification -> login -> dashboard access).",
  );
}

run().catch((error) => {
  console.error("\nAuth flow test failed:");
  console.error(error);
  process.exit(1);
});
