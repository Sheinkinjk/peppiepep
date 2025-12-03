"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubmissionResult = { error?: string; success?: boolean };

type ReferralSubmissionFormProps = {
  locale: string;
  campaignId?: string | null;
  copy: {
    nameLabel: string;
    phoneLabel: string;
    submitCta: string;
    consentLabel: string;
    consentNote: string;
  };
  action: (formData: FormData) => Promise<SubmissionResult>;
};

export function ReferralSubmissionForm({
  locale,
  campaignId,
  copy,
  action,
}: ReferralSubmissionFormProps) {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    consent: false,
  });
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: typeof fieldErrors = {};
    if (!formValues.name.trim()) {
      errors.name = locale === "es" ? "Ingresa tu nombre completo." : "Please enter your full name.";
    }
    const cleanedPhone = formValues.phone.replace(/[^\d+]/g, "");
    if (cleanedPhone.length < 8) {
      errors.phone = locale === "es" ? "Ingresa un teléfono válido." : "Please enter a valid phone number.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormError(null);
    startTransition(async () => {
      const payload = new FormData();
      payload.set("name", formValues.name.trim());
      payload.set("phone", cleanedPhone);
      payload.set("consent", formValues.consent ? "on" : "");
      payload.set("locale", locale);
      if (campaignId) {
        payload.set("campaign_id", campaignId);
      }
      const result = await action(payload);
      if (result?.error) {
        setFormError(result.error);
        setSuccessMessage(null);
      } else {
        setSuccessMessage(
          locale === "es"
            ? "¡Listo! Te enviaremos un SMS con tu recompensa."
            : "You're all set. We'll text your reward confirmation shortly.",
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-base font-semibold">
          {copy.nameLabel}
        </Label>
        <Input
          id="name"
          name="name"
          placeholder={locale === "es" ? "Nombre completo" : "Enter your full name"}
          className="mt-2 h-12 text-base"
          value={formValues.name}
          onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
        />
        {fieldErrors.name && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone" className="text-base font-semibold">
          {copy.phoneLabel}
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+61 400 000 000"
          className="mt-2 h-12 text-base"
          value={formValues.phone}
          onChange={(e) => setFormValues((prev) => ({ ...prev, phone: e.target.value }))}
        />
        {fieldErrors.phone && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>
        )}
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={formValues.consent}
          onChange={(e) => setFormValues((prev) => ({ ...prev, consent: e.target.checked }))}
          className="mt-1 h-4 w-4"
          required
        />
        <Label htmlFor="consent" className="text-sm text-slate-700">
          {copy.consentLabel}
          <br />
          <span className="text-xs text-slate-500">{copy.consentNote}</span>
        </Label>
      </div>

      {formError && (
        <div className="rounded-xl border border-red-300/60 bg-red-50 p-3 text-sm text-red-700">
          {formError}
        </div>
      )}
      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
      >
        {isPending ? "Submitting…" : copy.submitCta}
      </Button>
    </form>
  );
}
