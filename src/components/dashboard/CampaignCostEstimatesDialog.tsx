"use client";

import { useMemo, useState, useTransition } from "react";
import { DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type CampaignCostEstimatesDialogProps = {
  smsCost: number;
  emailCost: number;
  updateCostsAction: (formData: FormData) => Promise<void>;
};

const formatCost = (value: number) => {
  if (!Number.isFinite(value)) return "";
  if (value === 0) return "0";
  if (value < 0.1) return value.toFixed(3);
  return value.toFixed(2);
};

export function CampaignCostEstimatesDialog({
  smsCost,
  emailCost,
  updateCostsAction,
}: CampaignCostEstimatesDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, startTransition] = useTransition();
  const [smsValue, setSmsValue] = useState(() => formatCost(smsCost));
  const [emailValue, setEmailValue] = useState(() => formatCost(emailCost));

  const hasChanges = useMemo(() => {
    const sms = Number(smsValue);
    const email = Number(emailValue);
    return (
      Number.isFinite(sms) &&
      Number.isFinite(email) &&
      (sms !== smsCost || email !== emailCost)
    );
  }, [emailCost, emailValue, smsCost, smsValue]);

  const handleSave = () => {
    const sms = Number(smsValue);
    const email = Number(emailValue);

    if (!Number.isFinite(sms) || sms < 0) {
      toast({
        variant: "destructive",
        title: "Invalid SMS cost",
        description: "Enter a number ≥ 0 (e.g., 0.02).",
      });
      return;
    }

    if (!Number.isFinite(email) || email < 0) {
      toast({
        variant: "destructive",
        title: "Invalid email cost",
        description: "Enter a number ≥ 0 (e.g., 0.01).",
      });
      return;
    }

    const formData = new FormData();
    formData.set("campaign_cost_sms", String(sms));
    formData.set("campaign_cost_email", String(email));

    startTransition(async () => {
      await updateCostsAction(formData);
      toast({
        title: "Cost estimates updated",
        description: "Program ROI will use these estimates for campaign send cost.",
      });
      setOpen(false);
    });
  };

  return (
    <>
      <Button type="button" variant="outline" className="h-9 px-3 text-xs" onClick={() => setOpen(true)}>
        Edit estimates
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              ROI cost estimates
            </DialogTitle>
            <DialogDescription>
              These values are used to estimate campaign send cost for Program ROI. They do not affect billing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="sms-cost">SMS cost per message (AUD)</Label>
              <Input
                id="sms-cost"
                inputMode="decimal"
                value={smsValue}
                onChange={(e) => setSmsValue(e.target.value)}
                placeholder="0.02"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-cost">Email cost per message (AUD)</Label>
              <Input
                id="email-cost"
                inputMode="decimal"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="0.01"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaving || !hasChanges}>
              {isSaving ? "Saving…" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

