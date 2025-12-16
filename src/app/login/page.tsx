'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import type { Session } from "@supabase/supabase-js";

type PasswordStrengthState = {
  score: number;
  label: string;
  textClass: string;
  barColor: string;
};

const passwordStrengthLevels: PasswordStrengthState[] = [
  { score: 0, label: "Add a password", textClass: "text-slate-400", barColor: "bg-slate-200" },
  { score: 1, label: "Too short", textClass: "text-rose-600", barColor: "bg-rose-500" },
  { score: 2, label: "Getting there", textClass: "text-amber-600", barColor: "bg-amber-500" },
  { score: 3, label: "Strong", textClass: "text-emerald-600", barColor: "bg-emerald-500" },
];

const getPasswordStrength = (password: string): PasswordStrengthState => {
  if (!password) return passwordStrengthLevels[0];

  if (password.length < 8) {
    return { ...passwordStrengthLevels[1], score: 1 };
  }

  let score = 1; // meets min length
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  return passwordStrengthLevels[Math.min(score, passwordStrengthLevels.length - 1)];
};

type ViewState = "auth" | "onboarding" | "forgot-password";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<ViewState>("auth");

  // Onboarding state
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserSupabaseClient();
  type BusinessInsert = Database["public"]["Tables"]["businesses"]["Insert"];

  const syncServerAuthSession = async (session: Session | null, event: string) => {
    try {
      await fetch("/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    } catch (syncError) {
      console.error("Failed to sync auth session", syncError);
    }
  };

  // Check for URL error parameters
  useEffect(() => {
    const urlError = searchParams.get('error');
    const needsOnboarding = searchParams.get('needs_onboarding');

    if (urlError) {
      setError(decodeURIComponent(urlError));
    }

    if (needsOnboarding === 'true') {
      setView('onboarding');
    }
  }, [searchParams]);

  // Load and persist onboarding drafts so entered data is not lost
  useEffect(() => {
    if (draftLoaded) return;
    const rawDraft = localStorage.getItem("pepform_onboarding_draft");
    if (rawDraft) {
      try {
        const draft = JSON.parse(rawDraft) as {
          businessName?: string;
          businessEmail?: string;
          phone?: string;
        };
        setBusinessName(draft.businessName ?? "");
        setBusinessEmail(draft.businessEmail ?? "");
        setPhone(draft.phone ?? "");
      } catch {
        // ignore corrupted draft
      }
    }
    setDraftLoaded(true);
  }, [draftLoaded]);

  useEffect(() => {
    if (!draftLoaded) return;
    const draft = {
      businessName,
      businessEmail,
      phone,
    };
    localStorage.setItem("pepform_onboarding_draft", JSON.stringify(draft));
  }, [businessName, businessEmail, phone, draftLoaded]);

  const passwordStrength = getPasswordStrength(password);
  const passwordsMismatch = isSignUp && confirmPassword && confirmPassword !== password;

  const handleAuth = async () => {
    if (isSignUp) {
      if (!hasAcceptedTerms) {
        setError("Please accept the Terms of Service before creating an account.");
        return;
      }

      if (password.length < 8) {
        setError("Use at least 8 characters for your password.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords must match before continuing.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
            data: {
              needs_onboarding: true,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          try {
            await fetch("/api/auth/send-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
          } catch (sendError) {
            console.error("Failed to send confirmation via Resend:", sendError);
          }

          setConfirmationSent(true);
          setConfirmationEmail(email);
          setPassword("");
          setConfirmPassword("");
          setHasAcceptedTerms(false);
          return;
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data?.user && !data.user.email_confirmed_at) {
          await supabase.auth.signOut();
          setError("Confirm your email before signing in – the verification link just hit your inbox.");
          return;
        }

        await syncServerAuthSession(data.session ?? null, "SIGNED_IN");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Authentication failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          skipBrowserRedirect: false,
        },
      });

      if (signInError) throw signInError;
      // Browser will redirect to Google, don't set loading to false
    } catch (err: unknown) {
      const fallbackMessage =
        "Google sign-in failed. Clear your browser cookies or try a private window, then attempt again.";
      const message = err instanceof Error ? `${err.message}. ${fallbackMessage}` : fallbackMessage;
      setError(message);
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address");
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

    if (!response.ok) {
      throw new Error(payload?.error || "Failed to send password reset email");
    }

    setResetEmailSent(true);
  } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send password reset email";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboarding = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No authenticated user found");
      }

      const cleanBusinessName =
        businessName.trim() || `${email.split("@")[0]}'s Business`;

      // Real users: create in Supabase
      const insertPayload: BusinessInsert = {
        owner_id: user.id,
        name: cleanBusinessName,
        offer_text: null,
        reward_type: "credit",
        reward_amount: 0,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any)
        .from("businesses")
        .insert([insertPayload]);

      if (insertError) throw insertError;

      localStorage.removeItem("pepform_onboarding_draft");
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create business profile";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (view === "forgot-password") {
    return (
      <main
        className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4 py-12"
        aria-label="Refer Labs password reset"
      >
        <Card className="relative w-full max-w-md overflow-hidden border border-white/60 bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Reset your password
              </h1>
              <p className="text-sm text-slate-600">
                Enter your email address and we&rsquo;ll send you a link to reset your password.
              </p>
            </div>

            {resetEmailSent ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/75 px-4 py-3 text-sm text-emerald-900">
                  <p className="font-semibold mb-1">Check your email</p>
                  <p>
                    We sent a password reset link to{" "}
                    <span className="font-semibold">{email}</span>. Click the link in the email to create a new password.
                  </p>
                  <p className="mt-2 text-xs text-emerald-900/80">
                    Can&rsquo;t find it? Check your spam or promotions folder, then resend below.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    variant="secondary"
                    className="w-full"
                  >
                    {loading ? "Resending..." : "Resend email"}
                  </Button>
                  <Button
                    onClick={() => {
                      setView("auth");
                      setResetEmailSent(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Back to sign in
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reset-email">Email address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    placeholder="you@yourbusiness.com"
                    onKeyDown={(e) => e.key === "Enter" && handleForgotPassword()}
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleForgotPassword}
                  disabled={loading || !email}
                  className="w-full"
                >
                  {loading ? "Sending..." : "Send reset link"}
                </Button>

                <Button
                  variant="link"
                  className="w-full text-slate-700"
                  onClick={() => {
                    setView("auth");
                    setError("");
                  }}
                >
                  Back to sign in
                </Button>
              </div>
            )}
          </div>
        </Card>
      </main>
    );
  }

  if (view === "onboarding") {
    return (
      <main
        className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4 py-12"
        aria-label="Refer Labs onboarding form"
      >
        <Card className="relative w-full max-w-2xl overflow-hidden border border-white/60 bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span className="text-slate-900">Step 2 of 2</span>
                <span>Business profile</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 flex-1 rounded-full bg-emerald-500" />
                <span className="h-2 flex-1 rounded-full bg-slate-200" />
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Set up your business
                </h1>
                <p className="text-sm text-slate-600">
                  You&rsquo;re moments away from the dashboard—this info keeps your referral portal compliant and on-brand.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business name *</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Glow Beauty Studio"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="businessEmail">Business email *</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="contact@yourbusiness.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Your phone (optional)</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+61 400 123 456"
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  We use this to personalize your referral portal, contracts, and payouts.
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleOnboarding}
                  disabled={loading || !businessName || !businessEmail}
                  className="w-full"
                >
                  {loading ? "Creating..." : "Launch Dashboard"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main
      className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4 py-12"
      aria-label="Refer Labs account access"
    >
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Join the referral revolution
          </h1>
          <p className="text-lg text-slate-600">
            180+ businesses growing on autopilot with Refer Labs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Concierge Onboarding */}
          <Card className="relative overflow-hidden border border-purple-200 bg-white/90 p-6 shadow-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl" />
            <div className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-gradient-to-tr from-purple-200/40 to-pink-200/40 blur-3xl" />

            <div className="relative space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 px-3 py-1.5 mb-3 bg-white/80 text-purple-800 text-xs font-semibold tracking-wide">
                  WHITE-GLOVE ONBOARDING
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Launch live with our concierge team
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Every customer gets hands-on setup assistance. No sandbox. No fake data. We configure your rewards, upload ambassadors, and QA the flow before you invite anyone.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>Kickoff session</strong> — Map your rewards, tone, and payout workflows with our team.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>Full implementation</strong> — We import contacts, configure branding, and verify referral tracking.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>Launch checklist</strong> — Final QA across referral links, discount capture, and payouts before ambassadors log in.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-purple-200 text-purple-800 font-semibold bg-white hover:bg-purple-50"
              >
                <Link href="https://calendly.com/jarredkrowitz/30min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Book onboarding call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-center text-xs text-slate-500">
                Prefer email? <a className="font-semibold text-purple-700" href="mailto:jarred@referlabs.com.au">jarred@referlabs.com.au</a>
              </p>
            </div>
          </Card>

          {/* Regular Auth */}
          <Card className="relative overflow-hidden border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-slate-200/30 to-slate-300/30 blur-3xl" />

            <div className="relative">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Refer Labs</p>
                    <p className="text-xs text-slate-500">Cloud account</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  {isSignUp
                    ? "Full cloud access with SMS automation"
                    : "Access your Refer Labs dashboard"}
                </p>
              </div>

              {confirmationSent && (
                <div
                  className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50/75 px-4 py-3 text-sm text-emerald-900"
                  role="status"
                >
                  We sent a confirmation link to{" "}
                  <span className="font-semibold text-emerald-800">
                    {confirmationEmail || email}
                  </span>
                  . Confirm to unlock the Refer Labs dashboard.
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    placeholder="you@yourbusiness.com"
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label htmlFor="password">Password</Label>
                    {isSignUp ? (
                      <div className="flex items-center gap-2">
                        <div className="flex w-16 gap-1">
                          {[0, 1, 2].map((index) => (
                            <span
                              key={index}
                              className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
                                passwordStrength.score > index
                                  ? passwordStrength.barColor
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs font-semibold ${passwordStrength.textClass}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setView("forgot-password");
                          setError("");
                        }}
                        className="text-xs font-semibold text-purple-700 hover:text-purple-800"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                    placeholder="••••••••"
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  />
                  {isSignUp && (
                    <p className="mt-2 text-xs text-slate-500">
                      Use at least 8 characters with a mix of upper/lowercase letters and a number or symbol.
                    </p>
                  )}
                </div>
                {isSignUp && (
                  <div>
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Re-enter your password"
                    />
                    {passwordsMismatch && (
                      <p className="mt-2 text-xs font-semibold text-rose-600">
                        Passwords must match before you can create an account.
                      </p>
                    )}
                  </div>
                )}
              </div>

            {isSignUp && (
              <label className="mt-4 flex items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={hasAcceptedTerms}
                  onChange={(event) => setHasAcceptedTerms(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-2 focus:ring-teal-500"
                />
                <span className="leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="font-semibold text-slate-900 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold text-slate-900 underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            )}

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              )}

              <Button
                onClick={handleAuth}
                disabled={
                  loading ||
                  !email ||
                  !password ||
                  (isSignUp &&
                    (!hasAcceptedTerms || !confirmPassword || passwordsMismatch || password.length < 8))
                }
                className="mt-6 w-full"
              >
                {loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="link"
                className="w-full text-slate-700 mt-2"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setConfirmationSent(false);
                  setConfirmationEmail("");
                  setHasAcceptedTerms(false);
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>

              {isSignUp && (
                <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Cloud account includes:</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      Automatic SMS notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      Multi-device access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      Unlimited data storage
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            By signing up, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
