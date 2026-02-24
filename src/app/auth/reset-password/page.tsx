'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { logger } from "@/lib/logger";

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
          logger.error("Failed to bootstrap recovery session:", sessionError);
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

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
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
      id="main-content"
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
                  Must be at least 8 characters
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
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-red-800 mb-1">
                        Reset Link Invalid or Expired
                      </h3>
                      <p className="text-sm text-red-700">
                        {error}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <Link
                      href="/login?forgot=true"
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-red-700 hover:text-red-800 bg-red-100 hover:bg-red-150 px-4 py-2 rounded-md transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Request new reset link
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center text-sm text-red-600 hover:text-red-700 px-4 py-2"
                    >
                      Back to login →
                    </Link>
                  </div>
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
