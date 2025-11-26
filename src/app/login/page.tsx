'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { Building2, Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";

type ViewState = "auth" | "onboarding" | "guest-onboarding";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<ViewState>("auth");

  // Onboarding state
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);

  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  type BusinessInsert = Database["public"]["Tables"]["businesses"]["Insert"];

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

  const handleAuth = async () => {
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
              needs_onboarding: true
            }
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          setView("onboarding");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    setView("guest-onboarding");
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (signInError) throw signInError;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google sign-in failed";
      setError(message);
      setLoading(false);
    }
  };

  const handleOnboarding = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user && view === "onboarding") {
        throw new Error("No authenticated user found");
      }

      // Guest mode: store in localStorage
      if (view === "guest-onboarding") {
        const guestBusiness = {
          id: `guest-${Date.now()}`,
          name: businessName || "My Test Business",
          offer_text: null,
          reward_type: "credit",
          reward_amount: 0,
          is_guest: true,
          created_at: new Date().toISOString()
        };

        localStorage.setItem("pepform_guest_business", JSON.stringify(guestBusiness));
        localStorage.setItem("pepform_guest_mode", "true");

        router.push("/dashboard-guest");
        return;
      }

      const cleanBusinessName =
        businessName.trim() || `${email.split("@")[0]}'s Business`;

      // Real users: create in Supabase
      const insertPayload: BusinessInsert = {
        owner_id: user!.id,
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

  if (view === "onboarding" || view === "guest-onboarding") {
    return (
      <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4 py-12">
        <Card className="relative w-full max-w-2xl overflow-hidden border border-white/60 bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Set up your business
                </h1>
                <p className="text-sm text-slate-600">
                  {view === "guest-onboarding"
                    ? "Create a test profile (no account needed)"
                    : "Complete your profile to start tracking referrals"}
                </p>
              </div>
            </div>

            {view === "guest-onboarding" && (
              <div className="mb-6 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">MVP Testing Mode</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Your data will be stored locally. Perfect for testing the platform before committing to a full account.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                  We'll use this for account setup and support. You can configure offers and rewards inside the dashboard.
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {view === "guest-onboarding" && (
                  <Button
                    variant="outline"
                    onClick={() => setView("auth")}
                    className="w-full"
                  >
                    Back
                  </Button>
                )}
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
      </div>
    );
  }

  return (
    <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Join the referral revolution
          </h1>
          <p className="text-lg text-slate-600">
            180+ businesses growing on autopilot with Pepform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Guest Mode - HUGE & Prominent */}
          <Card className="relative overflow-hidden border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-8 shadow-2xl">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-400/30 to-pink-400/30 blur-3xl" />

            <div className="relative">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 mb-4">
                  <Zap className="h-4 w-4 text-white" />
                  <span className="text-sm font-bold text-white">RECOMMENDED FOR MVP TESTING</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Try it free—no signup needed
                </h2>
                <p className="text-slate-700 mb-6">
                  Test Pepform instantly with full access. Perfect for investors, testers, and curious businesses.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <strong>Full platform access</strong> — Upload CSVs, track referrals, test all features
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <strong>No credit card required</strong> — Start testing in under 60 seconds
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <strong>Convert anytime</strong> — Upgrade to a real account when you are ready
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGuestMode}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl text-lg py-6"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Testing Now (Guest Mode)
              </Button>

              <div className="mt-4 text-center">
                <Link
                  href="/demo"
                  className="text-sm text-purple-600 hover:text-purple-700 underline"
                >
                  Or view the live demo first →
                </Link>
              </div>
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
                    <p className="text-sm font-semibold text-slate-900">Pepform</p>
                    <p className="text-xs text-slate-500">Cloud account</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  {isSignUp
                    ? "Full cloud access with SMS automation"
                    : "Access your Pepform dashboard"}
                </p>
              </div>

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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                    placeholder="••••••••"
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                onClick={handleAuth}
                disabled={loading || !email || !password}
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
    </div>
  );
}
