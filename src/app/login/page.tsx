'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

/*
 * Staff sign-in only (15 Sep 2026).
 *
 * This page used to be the retired referral SaaS front door: a "Turn Your Network
 * Into New Customers" pitch, a concierge booking card, account sign-up and a
 * business onboarding step. Sign-up's API was deleted with the SaaS, so the form
 * failed for anyone who tried it. What remains is the one thing still in use:
 * signing in to /admin/leads. There is no public account to create.
 */

type View = "signin" | "forgot-password";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("signin");

  const searchParams = useSearchParams();
  const supabase = createBrowserSupabaseClient();

  const nextPath = (() => {
    const raw = searchParams.get("next");
    if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/admin/leads";
    return raw;
  })();

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) setError(decodeURIComponent(urlError));
  }, [searchParams]);

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      // Server-side sign in so the session cookies are set before the redirect.
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.error || "Sign in failed");
      // Full reload so the proxy sees the new cookies.
      window.location.href = nextPath;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
          skipBrowserRedirect: false,
        },
      });
      if (signInError) throw signInError;
    } catch (err: unknown) {
      const fallback = "Google sign-in failed. Clear your browser cookies or try a private window, then try again.";
      setError(err instanceof Error ? `${err.message}. ${fallback}` : fallback);
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email address first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/send-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || "Failed to send the reset email");
      setResetEmailSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send the reset email");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-[#dfe5df] bg-white px-4 py-3 text-[15px] text-[#10251b] outline-none transition-colors focus:border-[#0a7c42]";
  const labelClass = "text-sm font-semibold text-[#10251b]";
  const primaryButton =
    "w-full rounded-full bg-[#0a7c42] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#086536] disabled:cursor-not-allowed disabled:opacity-60";
  const secondaryButton =
    "w-full rounded-full border border-[#dfe5df] bg-white px-6 py-3 text-[15px] font-semibold text-[#10251b] transition-colors hover:bg-[#f2f4ee] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-[#f2f4ee] px-4 py-12"
      aria-label="Refer Labs staff sign in"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#e5e9e7] bg-white p-8 shadow-[0_1px_2px_rgba(16,37,27,0.05)]">
        <Link href="/" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
          Refer Labs
        </Link>

        {view === "forgot-password" ? (
          <>
            <h1 className="mt-4 text-2xl font-bold text-[#10251b]">Reset your password</h1>
            {resetEmailSent ? (
              <div className="mt-6 space-y-4">
                <p className="rounded-xl border border-[#cfe6da] bg-[#e8f5ee] px-4 py-3 text-sm text-[#2b362f]" role="status">
                  If an account exists for <strong>{email}</strong>, a reset link is on its way. Check your spam folder if
                  it does not arrive.
                </p>
                <button type="button" className={secondaryButton} onClick={() => { setView("signin"); setResetEmailSent(false); }}>
                  Back to sign in
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="reset-email" className={labelClass}>Email address</label>
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleForgotPassword()}
                    className={inputClass}
                  />
                </div>
                {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                <button type="button" onClick={handleForgotPassword} disabled={loading || !email} className={primaryButton}>
                  {loading ? "Sending..." : "Send reset link"}
                </button>
                <button type="button" className="w-full text-sm font-semibold text-[#3d4b44] hover:text-[#10251b]" onClick={() => { setView("signin"); setError(""); }}>
                  Back to sign in
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="mt-4 text-2xl font-bold text-[#10251b]">Staff sign in</h1>
            <p className="mt-2 text-sm text-[#5a665f]">
              For the Refer Labs team. Readers do not need an account to use the site.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                  className={inputClass}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className={labelClass}>Password</label>
                  <button
                    type="button"
                    onClick={() => { setView("forgot-password"); setError(""); }}
                    className="text-xs font-semibold text-[#0a7c42] hover:text-[#086536]"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                  className={inputClass}
                />
              </div>

              {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

              <button type="button" onClick={handleSignIn} disabled={loading || !email || !password} className={primaryButton}>
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex items-center gap-3 py-1 text-xs uppercase tracking-wide text-[#627068]">
                <span className="h-px flex-1 bg-[#e5e9e7]" />
                or
                <span className="h-px flex-1 bg-[#e5e9e7]" />
              </div>

              <button type="button" onClick={handleGoogleSignIn} disabled={loading} className={secondaryButton}>
                Continue with Google
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f2f4ee]">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
