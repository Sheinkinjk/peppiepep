'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type Ambassador = {
  id: string;
  name: string | null;
};

type ManualReferralFormProps = {
  ambassadors: Ambassador[];
  addManualReferralAction: (formData: FormData) => Promise<{ error?: string; success?: string }>;
};

export function ManualReferralForm({
  ambassadors,
  addManualReferralAction,
}: ManualReferralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await addManualReferralAction(formData);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Failed to add referral",
          description: result.error,
        });
      } else if (result.success) {
        toast({
          title: "Referral added",
          description: result.success,
        });
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error("Manual referral error:", error);
      toast({
        variant: "destructive",
        title: "Failed to add referral",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-600">
        Select the ambassador responsible (or enter their referral code). If the ambassador isn&apos;t
        in the system yet, add them from Clients &amp; Ambassadors before recording this transaction.
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ambassador_id">Ambassador (optional when using referral code)</Label>
          <select
            id="ambassador_id"
            name="ambassador_id"
            className="w-full rounded-2xl border border-slate-200 p-2.5 text-sm"
          >
            <option value="">Select ambassador</option>
            {ambassadors.map((amb) => (
              <option key={amb.id} value={amb.id}>
                {amb.name || "Unnamed ambassador"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="transaction_value">Transaction amount (optional)</Label>
          <Input
            id="transaction_value"
            name="transaction_value"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g., 200.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transaction_date">Transaction date</Label>
          <Input
            id="transaction_date"
            name="transaction_date"
            type="date"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service_type">Service type (optional)</Label>
          <Input
            id="service_type"
            name="service_type"
            placeholder="e.g., Full colour + cut"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="referred_name">Referred name</Label>
          <Input
            id="referred_name"
            name="referred_name"
            placeholder="Friend's name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="referral_code">Referral code (optional)</Label>
          <Input
            id="referral_code"
            name="referral_code"
            placeholder="e.g., ABC123 (if known)"
          />
          <p className="text-[11px] text-slate-500">
            If provided, we&apos;ll match the ambassador from this code.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="referred_email">Referred email (optional)</Label>
          <Input
            id="referred_email"
            name="referred_email"
            type="email"
            placeholder="friend@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="referred_phone">Referred phone (optional)</Label>
          <Input
            id="referred_phone"
            name="referred_phone"
            placeholder="+61 400 000 000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="context">Internal note (optional)</Label>
        <Textarea
          id="context"
          name="context"
          placeholder="e.g., Walk-in booking mentioning ambassador's name"
          className="min-h-[80px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto"
        disabled={isSubmitting || ambassadors.length === 0}
      >
        {isSubmitting ? "Adding referral..." : "Add manual referral"}
      </Button>
    </form>
  );
}
