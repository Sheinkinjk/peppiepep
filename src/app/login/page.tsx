'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { Building2, Sparkles, ArrowRight } from "lucide-react";

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
  const [offerText, setOfferText] = useState("");
  const [rewardAmount, setRewardAmount] = useState("15");

  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

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
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    setView("guest-onboarding");
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
          offer_text: offerText || "20% off your first visit",
          reward_type: "credit",
          reward_amount: Number(rewardAmount) || 15,
          is_guest: true,
          created_at: new Date().toISOString()
        };

        localStorage.setItem("pepform_guest_business", JSON.stringify(guestBusiness));
        localStorage.setItem("pepform_guest_mode", "true");

        router.push("/dashboard");
        return;
      }

      // Real users: create in Supabase
      const { error: insertError } = await supabase
        .from("businesses")
        .insert([{
          owner_id: user!.id,
          name: businessName || `${email.split("@")[0]}'s Business`,
          offer_text: offerText || "20% off your first visit",
          reward_type: "credit",
          reward_amount: Number(rewardAmount) || 15,
        }]);

      if (insertError) throw insertError;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create business profile");
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
              <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Guest Mode (MVP Testing)</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Your data will be stored locally in your browser. Create a real account later to save your progress to the cloud.
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
                <Label htmlFor="offerText">New customer offer *</Label>
                <Input
                  id="offerText"
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  placeholder="e.g., 20% off your first visit"
                  className="mt-1"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  This is what referred customers will see
                </p>
              </div>

              <div>
                <Label htmlFor="rewardAmount">Ambassador reward amount ($ AUD) *</Label>
                <Input
                  id="rewardAmount"
                  type="number"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  placeholder="15"
                  className="mt-1"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  How much credit ambassadors earn per successful referral
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
                  disabled={loading || !businessName || !offerText}
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
    <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="relative overflow-hidden border border-white/60 bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Pepform</p>
                <p className="text-xs text-slate-500">Referrals that compound</p>
              </div>
            </div>

            <h1 className="mb-2 text-3xl font-bold text-slate-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mb-6 text-sm text-slate-600">
              {isSignUp
                ? "Start tracking referrals and growing your business"
                : "Access your Pepform dashboard"}
            </p>

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

            <Button
              variant="link"
              className="w-full text-slate-700"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </Card>

        <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">
                Testing the MVP?
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Try Pepform without creating an account. Your test data will be stored locally.
              </p>
              <Button
                variant="outline"
                onClick={handleGuestMode}
                className="w-full border-purple-300 bg-white hover:bg-purple-50"
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-slate-500">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
