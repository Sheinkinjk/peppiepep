"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type QuickAddCustomerFormProps = {
  quickAddAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
};

// Validation helpers
const validateEmail = (email: string): string | null => {
  if (!email.trim()) return null; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : "Please enter a valid email address";
};

const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return null; // Optional field
  // Basic phone validation - allows various formats
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
  if (cleanPhone.length < 8 || cleanPhone.length > 15) {
    return "Phone number should be 8-15 digits";
  }
  if (!/^[\d\+]+$/.test(cleanPhone)) {
    return "Phone number contains invalid characters";
  }
  return null;
};

export function QuickAddCustomerForm({ quickAddAction }: QuickAddCustomerFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [lastReferralCode, setLastReferralCode] = useState<string | null>(null);

  // Field-level errors
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  // Track which fields have been touched (for validation display)
  const [touched, setTouched] = useState<{
    name?: boolean;
    phone?: boolean;
    email?: boolean;
  }>({});

  const handleBlur = (field: "name" | "phone" | "email") => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate on blur
    if (field === "email") {
      const error = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: error ?? undefined }));
    } else if (field === "phone") {
      const error = validatePhone(phone);
      setErrors((prev) => ({ ...prev, phone: error ?? undefined }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: error ?? undefined }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (touched.phone) {
      const error = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: error ?? undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // At least one field must have content
    if (!name.trim() && !phone.trim() && !email.trim()) {
      newErrors.name = "Enter at least a name, phone, or email";
    }

    // Validate email if provided
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    // Validate phone if provided
    const phoneError = validatePhone(phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLastReferralCode(null);

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Please fix the errors",
        description: "Check the form fields and try again.",
      });
      return;
    }

    startTransition(async () => {
      let ok = false;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("pep-refresh-start", { detail: { source: "quick-add" } }));
      }

      const formData = new FormData();
      formData.append("quick_name", name.trim());
      formData.append("quick_phone", phone.trim());
      formData.append("quick_email", email.trim());

      try {
        const result = await quickAddAction(formData);
        if (result && "error" in result && result.error) {
          toast({
            variant: "destructive",
            title: "Unable to add customer",
            description: result.error,
          });
          setStatus({ type: "error", message: result.error });
          return;
        }

        const customerName = name.trim() || "Partner";
        toast({
          title: `${customerName} is now a referral partner!`,
          description: "Their unique referral link is ready to share",
        });
        setStatus({
          type: "success",
          message: `${customerName} is now a referral partner! Their unique referral link is ready below.`,
        });
        if (result && "success" in result && result.success) {
          const referralCodeMatch = result.success.match(/[A-Z0-9]{6,}/i);
          setLastReferralCode(referralCodeMatch ? referralCodeMatch[0].toUpperCase() : null);
        } else {
          setLastReferralCode(null);
        }
        setName("");
        setPhone("");
        setEmail("");
        setErrors({});
        setTouched({});
        router.refresh();
        ok = true;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Unable to add customer",
          description: "An unexpected error occurred. Please try again.",
        });
        setStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        if (typeof window !== "undefined") {
          window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent("pep-refresh-end", { detail: { source: "quick-add", ok } }));
          }, 800);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label className="text-base font-bold text-slate-900">Quick Add Customer</Label>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <Input
            name="quick_name"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => handleBlur("name")}
            className={cn(
              touched.name && errors.name && "border-rose-300 bg-rose-50/50 focus:border-rose-400"
            )}
            aria-invalid={touched.name && !!errors.name}
          />
          {touched.name && errors.name && (
            <p className="flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Input
            name="quick_phone"
            placeholder="Phone number"
            value={phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            onBlur={() => handleBlur("phone")}
            className={cn(
              touched.phone && errors.phone && "border-rose-300 bg-rose-50/50 focus:border-rose-400"
            )}
            aria-invalid={touched.phone && !!errors.phone}
          />
          {touched.phone && errors.phone && (
            <p className="flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Input
            name="quick_email"
            placeholder="Email (optional)"
            type="email"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            onBlur={() => handleBlur("email")}
            className={cn(
              touched.email && errors.email && "border-rose-300 bg-rose-50/50 focus:border-rose-400"
            )}
            aria-invalid={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <p className="flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" className="font-bold w-full sm:w-auto" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding…
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </>
        )}
      </Button>
      <p className="text-xs text-slate-500">
        We&apos;ll refresh the dashboard instantly with their referral link.
      </p>
      {status && (
        <div
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm flex items-start gap-2",
            status.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-700"
          )}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          )}
          <div>
            {status.message}
            {status.type === "success" && lastReferralCode && (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-white/70 px-2 py-0.5 text-emerald-700 border border-emerald-200">
                  Code: {lastReferralCode}
                </span>
                <a
                  href={`/r/${lastReferralCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline hover:text-emerald-800"
                >
                  View referral link
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
