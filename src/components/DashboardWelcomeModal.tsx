"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

type WelcomeModalProps = {
  businessName: string;
  onClose: () => void;
};

export function DashboardWelcomeModal({ businessName, onClose }: WelcomeModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem("dashboard_welcome_seen");
    if (!hasSeenWelcome) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("dashboard_welcome_seen", "true");
    setOpen(false);
    onClose();
  };

  const steps = [
    {
      number: 1,
      title: "Setup Integration",
      description: "Connect your website and install tracking",
    },
    {
      number: 2,
      title: "Add Clients & Ambassadors",
      description: "Import your customer base and generate referral links",
    },
    {
      number: 3,
      title: "Launch Campaigns",
      description: "Send referral campaigns through your CRM",
    },
    {
      number: 4,
      title: "Track Performance",
      description: "Monitor campaign results and analytics",
    },
    {
      number: 5,
      title: "Measure ROI",
      description: "View ambassador performance and conversions",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-0 overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
              <Sparkles className="h-8 w-8" />
            </div>
            <DialogTitle className="text-3xl font-black">
              Welcome to Your Growth Dashboard!
            </DialogTitle>
          </div>
          <DialogDescription className="text-white/90 text-lg">
            Let's get {businessName} set up for explosive referral growth in just 5 simple steps.
          </DialogDescription>
        </div>

        {/* Steps Overview */}
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-900 mb-4">
              Your Growth Journey:
            </h3>
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-4 p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-purple-200 hover:bg-purple-50/30 transition-all"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-black shadow-lg">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-2">What makes this easy:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Each step builds on the previous one</li>
                  <li>• Click any step to expand and see what to do</li>
                  <li>• Only one step open at a time - stay focused</li>
                  <li>• All your tools and settings are organized by step</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleClose}
            className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            Get Started with Step 1
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-center text-xs text-slate-500">
            This guide will only show once. You can always access help from the dashboard explainer.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
