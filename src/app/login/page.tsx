'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const supabase = createBrowserSupabaseClient();

  const handleSubmit = async () => {
    const { error } = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${location.origin}/auth/callback` },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    if (!error) router.push("/dashboard");
  };

  return (
    <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Secure access to your Pepform dashboard and ambassadors.
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
              placeholder="you@example.com"
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
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="mt-6 w-full">
          {isSignUp ? "Create Account" : "Login"}
        </Button>
        <Button
          variant="link"
          className="w-full text-slate-700"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  );
}
