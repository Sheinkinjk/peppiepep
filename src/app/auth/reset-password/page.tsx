'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    let cancelled = false;

    const ensureRecoverySession = async () => {
      try {
        if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
          const params = new URLSearchParams(window.location.hash.slice(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (sessionError) {
              throw sessionError;
            }
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          }
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session && !cancelled) {
          setError("Invalid or expired reset link. Please request a new password reset.");
        }
      } catch (sessionError) {
        if (!cancelled) {
          setError("Invalid or expired reset link. Please request a new password reset.");
          console.error("Failed to bootstrap recovery session:", sessionError);
        }
      }
    };

    ensureRecoverySession();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      setSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to reset password. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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
              Create new password
            </h1>
            <p className="text-sm text-slate-600">
              Enter a new password for your account.
            </p>
          </div>

          {success ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/75 px-4 py-3 text-sm text-emerald-900">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <p className="font-semibold">Password updated successfully!</p>
                </div>
                <p>
                  Redirecting you to the dashboard...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                  placeholder="••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                onClick={handleResetPassword}
                disabled={loading || !password || !confirmPassword}
                className="w-full"
              >
                {loading ? "Updating password..." : "Update password"}
              </Button>

              <Button
                variant="link"
                className="w-full text-slate-700"
                onClick={() => router.push("/login")}
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
