'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Link2, ShieldCheck, ClipboardList } from "lucide-react";

type ImplementationGuideDialogProps = {
  siteUrl: string;
  businessName: string;
  discountCaptureSecret?: string | null;
};

export function ImplementationGuideDialog({
  siteUrl,
  businessName,
  discountCaptureSecret,
}: ImplementationGuideDialogProps) {
  const [open, setOpen] = useState(false);
  const normalizedSiteUrl =
    siteUrl.endsWith("/") && siteUrl.length > 1 ? siteUrl.slice(0, -1) : siteUrl;
  const referralExample = `${normalizedSiteUrl}/referral?code=YOURCODE`;
  const captureSecretDisplay =
    discountCaptureSecret ||
    "Create or copy this key from Program Settings → Website capture.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#0abab5] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:bg-[#0aa0a5]"
        >
          <HelpCircle className="h-4 w-4" />
          How to implement
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Implementation guide
          </DialogTitle>
          <DialogDescription>
            Walk-through for {businessName || "your business"} to prove each referral
            touchpoint is wired up before inviting ambassadors.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-2">
          <section className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white">
                <Link2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  1. Test the referral link journey
                </h3>
                <p className="text-sm text-slate-600">
                  Confirm the landing + buttons mirror what your clients will see.
                </p>
              </div>
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
              <li>
                Open <span className="font-mono text-xs">{referralExample}</span>{" "}
                (replace <span className="font-semibold">YOURCODE</span> with any ambassador&apos;s
                code from the Clients table).
              </li>
              <li>
                Click <em>Become an Ambassador</em> and <em>Open Referral Landing</em> to ensure
                they deep-link to your forms/site in a new tab.
              </li>
              <li>
                Send yourself a campaign email and tap every CTA. The email preview in the dashboard
                is the exact HTML sent by Resend.
              </li>
            </ol>
          </section>

          <section className="rounded-2xl border border-cyan-200/80 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  2. Wire discount codes into your checkout
                </h3>
                <p className="text-sm text-slate-600">
                  Capture the word ambassadors share and send it back to Refer Labs so conversions are
                  logged automatically.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Each ambassador has a reusable discount code. When your form or POS receives it, call
              the secure endpoint below:
            </p>
            <pre className="rounded-2xl bg-slate-900/95 p-4 text-xs text-slate-100 overflow-x-auto">
{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  x-pepf-discount-secret: ${captureSecretDisplay}
Body:
{
  "discountCode": "LARRYLESS90",
  "orderReference": "shopify-#1234",
  "amount": 450,
  "source": "shopify"
}`}
            </pre>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Use the <strong>Website Integration</strong> card for copy/paste snippets if your
                team prefers no-code embeds.
              </li>
              <li>
                If you prefer unique referral links, both the link and discount word map to the same
                ambassador profile—use whichever is easier for your checkout.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  3. Log manual conversions when in doubt
                </h3>
                <p className="text-sm text-slate-600">
                  Phone bookings or concierge sales can still issue credit immediately.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700">
              Go to <strong>Performance → Add Manual Referral Conversion</strong>, select the
              ambassador, and enter the ticket value. This keeps stats and payouts in sync even if a
              transaction happens off your website.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Tip: Encourage staff to keep this dashboard tab pinned. If a referral arrives and the
              checkout hasn&apos;t been updated yet, logging it manually ensures ambassadors still see
              instant credit.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
