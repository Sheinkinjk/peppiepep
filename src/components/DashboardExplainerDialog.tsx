"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info, Link2, Share2, Rocket, Users, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardExplainerDialogProps = {
  className?: string;
};

const TAB_DETAILS = [
  {
    title: "Step 1: Setup Integration",
    icon: <Link2 className="h-5 w-5 text-emerald-600" />,
    color: "from-emerald-50 to-emerald-100",
    borderColor: "border-emerald-200",
    steps: [
      {
        title: "Configure Program Settings",
        description: "Click 'Program Settings' to define your reward structure (credit amount, upgrade name, etc.). This is what ambassadors will earn per referral.",
      },
      {
        title: "Set Up Referral Page",
        description: "Copy the hosted referral page link (e.g., yoursite.com/r/[code]). Share this link with customers or embed it on your website.",
      },
      {
        title: "Install Discount Capture",
        description: "Add the discount capture webhook to your checkout/booking system. This reports when a discount code is used so Pepform can credit the right ambassador.",
      },
      {
        title: "Test the Flow",
        description: "Use a test referral code to make a purchase and confirm the conversion is tracked. Check that credits are awarded correctly.",
      },
    ],
  },
  {
    title: "Step 2: CRM Integration",
    icon: <Share2 className="h-5 w-5 text-sky-600" />,
    color: "from-sky-50 to-sky-100",
    borderColor: "border-sky-200",
    steps: [
      {
        title: "Export Ambassador Data",
        description: "Download CSV with all ambassadors, their referral codes, discount codes, and referral links. Use this to sync with Klaviyo, Mailchimp, or your CRM.",
      },
      {
        title: "Map Fields to Your CRM",
        description: "Import the CSV into your CRM and map 'referral_code' to a custom field. This lets you personalize emails with each customer's unique link.",
      },
      {
        title: "Set Up Conversion Webhooks (Advanced)",
        description: "Use the secure API endpoint to POST conversion data back to Pepform when transactions happen in your CRM, keeping payouts in sync.",
      },
      {
        title: "Automate Referral Campaigns",
        description: "Create email flows in your CRM that automatically send referral invites to new customers using their unique codes from the export.",
      },
    ],
  },
  {
    title: "Step 3: Clients & Ambassadors",
    icon: <Users className="h-5 w-5 text-emerald-600" />,
    color: "from-emerald-50 to-teal-100",
    borderColor: "border-emerald-200",
    steps: [
      {
        title: "Import Your Customer Base",
        description: "Upload a CSV with name, email, and phone columns. Pepform instantly generates unique referral codes and discount codes for each person.",
      },
      {
        title: "Quick Add VIP Customers",
        description: "Use the 'Quick Add' form to manually add high-value customers one at a time. They'll immediately receive their referral link.",
      },
      {
        title: "Manage Ambassador Credits",
        description: "View all customers in the table below. Adjust credits manually, resend referral links, or export individual referral kits.",
      },
      {
        title: "Monitor Ambassador Activity",
        description: "Track which ambassadors are actively referring and which ones need a nudge. Use this data to create targeted re-engagement campaigns.",
      },
    ],
  },
  {
    title: "Step 4: View Campaigns",
    icon: <Rocket className="h-5 w-5 text-purple-600" />,
    color: "from-purple-50 to-pink-100",
    borderColor: "border-purple-200",
    steps: [
      {
        title: "Build Your First Campaign",
        description: "Use the Campaign Builder to create SMS or email messages. Personalize with reward amounts, referral codes, and business branding.",
      },
      {
        title: "Select Recipients",
        description: "Choose which ambassadors to target (all, specific segments, or individual customers). Preview how the message will look to each recipient.",
      },
      {
        title: "Launch & Monitor",
        description: "Send the campaign and track deliverability in real-time. See opens, clicks, and conversions attributed to each campaign.",
      },
      {
        title: "Share Assets",
        description: "Download QR codes, referral kits, or social media graphics to use in-store, on Instagram, or in physical mailings.",
      },
    ],
  },
  {
    title: "Step 5: Performance",
    icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
    color: "from-blue-50 to-indigo-100",
    borderColor: "border-blue-200",
    steps: [
      {
        title: "Monitor All Referrals",
        description: "View every referral in the Referrals Table—both link-tracked and manually recorded. Mark referrals as complete to trigger credit payouts.",
      },
      {
        title: "Track Referral Journey",
        description: "Use Journey Timeline to see the path from link click → signup → conversion. Identify where drop-offs happen and optimize accordingly.",
      },
      {
        title: "Record Offline Conversions",
        description: "When customers book offline but mention a referral code, use the Manual Conversion form to attribute revenue and credit ambassadors.",
      },
      {
        title: "Analyze Program ROI",
        description: "Review metrics like total revenue, average transaction value, conversion rate, and ROI to prove the program's impact on your bottom line.",
      },
    ],
  },
];

export function DashboardExplainerDialog({ className }: DashboardExplainerDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full border-slate-200 bg-white/95 text-slate-700 shadow hover:bg-slate-50",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <Info className="mr-2 h-4 w-4 text-emerald-600" />
        Dashboard explainer
      </Button>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-black text-slate-900 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Complete Setup Guide: 5 Steps to Launch Your Referral Program
          </DialogTitle>
          <DialogDescription className="text-base text-slate-700 mt-3">
            Follow these steps in order to properly set up your account and start generating referrals. Each tab builds on the previous one to create a complete referral system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {TAB_DETAILS.map((tab, index) => (
            <div
              key={tab.title}
              className={cn(
                "rounded-2xl border p-6 shadow-lg bg-gradient-to-br",
                tab.color,
                tab.borderColor
              )}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md flex-shrink-0">
                  {tab.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-1">{tab.title}</h3>
                  <p className="text-sm text-slate-600">Complete these actions to set up this section</p>
                </div>
              </div>

              <div className="space-y-4 ml-16">
                {tab.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">
                      {stepIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 mb-2 text-lg">How Everything Connects</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Flow:</strong> Add ambassadors (Step 3) → Generate their unique referral & discount codes →
                  Launch campaigns (Step 4) or export to CRM (Step 2) → Customers use codes to book →
                  Track conversions via discount capture (Step 1) or manual entry (Step 5) → Credits automatically awarded to the correct ambassador.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-white/80 border border-purple-200">
                  <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide mb-2">Pro Tip</p>
                  <p className="text-sm text-slate-700">
                    Start with Steps 1-3 to build your foundation, then use Step 4 to activate your ambassadors with campaigns,
                    and monitor everything in Step 5. Each step is essential for a fully automated referral program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
