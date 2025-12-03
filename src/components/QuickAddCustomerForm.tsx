"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type QuickAddCustomerFormProps = {
  quickAddAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
};

export function QuickAddCustomerForm({ quickAddAction }: QuickAddCustomerFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    if (!name.trim() && !phone.trim() && !email.trim()) {
      toast({
        variant: "destructive",
        title: "Missing details",
        description: "Enter a name, phone, or email before adding a customer.",
      });
      return;
    }

    startTransition(async () => {
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

        toast({
          title: "Customer added",
          description: (result && result.success) || "We created a referral link instantly.",
        });
        setStatus({
          type: "success",
          message: (result && result.success) || "Customer added and referral link issued instantly.",
        });
        setName("");
        setPhone("");
        setEmail("");
        router.refresh();
      } catch (error) {
        console.error("Quick add failed:", error);
        toast({
          variant: "destructive",
          title: "Unable to add customer",
          description: "An unexpected error occurred. Please try again.",
        });
        setStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label className="text-base font-bold text-slate-900">Quick Add Customer</Label>
      <div className="grid sm:grid-cols-3 gap-3">
        <Input
          name="quick_name"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          name="quick_phone"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <Input
          name="quick_email"
          placeholder="Email (optional)"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
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
          className={`rounded-2xl border px-3 py-2 text-xs ${
            status.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
}
