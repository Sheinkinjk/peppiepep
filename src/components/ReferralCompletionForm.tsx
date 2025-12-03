"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReferralCompletionFormProps {
  referralId: string;
  ambassadorId: string;
  completionAction: (
    formData: FormData,
  ) => Promise<{ error?: string; success?: string }>;
  onCompleted?: () => void;
}

export function ReferralCompletionForm({
  referralId,
  ambassadorId,
  completionAction,
  onCompleted,
}: ReferralCompletionFormProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCompleting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await completionAction(formData);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Failed to Complete Referral",
          description: result.error,
        });
      } else if (result.success) {
        toast({
          title: "Referral Completed!",
          description: result.success,
        });
        setOpen(false);
        onCompleted?.();
      }
    } catch (error) {
      console.error("Completion error:", error);
      toast({
        variant: "destructive",
        title: "Failed to Complete Referral",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsCompleting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        // Prevent closing while submitting
        if (!isCompleting) {
          setOpen(nextOpen);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isCompleting}
        >
          {isCompleting ? "Processing..." : "Mark completed"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete referral</DialogTitle>
          <DialogDescription>
            Add optional transaction details so your performance and ROI
            analytics stay accurate.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="referral_id" value={referralId} />
          <input type="hidden" name="ambassador_id" value={ambassadorId} />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`transaction_value_${referralId}`}>
                Transaction amount (optional)
              </Label>
              <Input
                id={`transaction_value_${referralId}`}
                name="transaction_value"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 220.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`transaction_date_${referralId}`}>
                Transaction date
              </Label>
              <Input
                id={`transaction_date_${referralId}`}
                name="transaction_date"
                type="date"
                required
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`service_type_${referralId}`}>
                Service / treatment (optional)
              </Label>
              <Input
                id={`service_type_${referralId}`}
                name="service_type"
                placeholder="e.g., Colour + cut"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCompleting}>
              {isCompleting ? "Saving..." : "Save & complete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
