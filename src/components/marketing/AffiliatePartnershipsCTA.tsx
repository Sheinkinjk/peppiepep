"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type AffiliatePartnershipsCTAProps = {
  calendlyUrl: string;
  className?: string;
  primaryLabel?: string;
  showScheduleCall?: boolean;
};

export function AffiliatePartnershipsCTA({
  calendlyUrl,
  className,
  primaryLabel = "Apply",
  showScheduleCall = true,
}: AffiliatePartnershipsCTAProps) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("Increase qualified demos");
  const [partnerTypes, setPartnerTypes] = useState("LinkedIn influencers, consultants, strategic partners");
  const [rewardModel, setRewardModel] = useState("Revenue share or fee per booked demo");
  const [notes, setNotes] = useState("");

  const mailtoHref = useMemo(() => {
    const lines = [
      "Affiliate Partnerships Application",
      "",
      `Company: ${company || "-"}`,
      `Contact: ${contactName || "-"}`,
      `Email: ${email || "-"}`,
      `Goals: ${goal || "-"}`,
      `Ideal partners: ${partnerTypes || "-"}`,
      `Reward model: ${rewardModel || "-"}`,
      "",
      `Notes: ${notes || "-"}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(`Affiliate Partnerships | ${company || "New application"}`);
    return `mailto:jarred@referlabs.com.au?subject=${subject}&body=${body}`;
  }, [company, contactName, email, goal, partnerTypes, rewardModel, notes]);

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className ?? ""}`}>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="lg"
            className="rounded-xl bg-cyan-400 text-slate-900 hover:bg-cyan-300 px-8 py-4 text-sm font-semibold shadow-none"
          >
            {primaryLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl bg-slate-950 text-white border border-cyan-500/30">
          <DialogHeader>
            <DialogTitle>Apply for Affiliate Partnerships</DialogTitle>
            <DialogDescription className="text-slate-300">
              Share your objectives and partner preferences. Your details will be emailed directly to jarred@referlabs.com.au.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700"
            />
            <Input
              placeholder="Your name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700"
            />
            <Input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700"
            />
            <Input
              placeholder="Goals (e.g. more demos, revenue, exposure)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700"
            />
            <Input
              placeholder="Ideal partners (e.g. LinkedIn influencers, advisors)"
              value={partnerTypes}
              onChange={(e) => setPartnerTypes(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700"
            />
            <Input
              placeholder="Reward model (e.g. revenue share, fee per demo)"
              value={rewardModel}
              onChange={(e) => setRewardModel(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700"
            />
            <Textarea
              placeholder="Notes: audience, timelines, campaigns, compliance requirements"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-slate-900/60 text-white border-slate-700 min-h-[120px]"
            />
            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <Button
                type="button"
                asChild
                className="rounded-xl bg-cyan-400 text-slate-900 hover:bg-cyan-300 font-semibold"
              >
                <a href={mailtoHref} onClick={() => setOpen(false)}>
                  Send to Refer Labs <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-slate-300 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showScheduleCall && (
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-xl border border-cyan-400/50 bg-transparent text-white hover:bg-cyan-400/10 px-8 py-4 text-sm font-semibold shadow-none"
        >
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            Schedule a Call <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}
