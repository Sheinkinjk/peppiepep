import Link from "next/link";
import Image from "next/image";
import { Download, ExternalLink, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "WordPress Shortcode (Plugin) | Refer Labs",
  description: "Install the Refer Labs WordPress plugin and embed referral pages with a shortcode. Includes WooCommerce conversion capture.",
};

export default function WordPressGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4" />
            WordPress setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">
            WordPress shortcode plugin
          </h1>
          <p className="mt-2 text-slate-600">
            One-click install a minimal plugin, then embed referral pages anywhere with a shortcode.
          </p>
        </div>

        <a
          href="/referlabs-referral-integration.zip"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white hover:bg-teal-700"
        >
          <Download className="h-4 w-4" />
          Download plugin zip
        </a>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Install (one click)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>WordPress Admin → Plugins → Add New → Upload Plugin</li>
            <li>Select the downloaded zip → Install Now → Activate</li>
            <li>WordPress Admin → Settings → Refer Labs (optional settings)</li>
            <li>Create a page → add a Shortcode block → paste the shortcode</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Need help?{" "}
            <Link href="/contact" className="underline font-semibold text-slate-700 hover:text-slate-900">
              Contact support
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Shortcode</h2>
          <p className="mt-2 text-sm text-slate-600">
            Paste this in a Shortcode block and replace <code className="font-mono">AMBCODE</code> with the ambassador’s referral code.
          </p>
          <pre className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
{`[referlabs_referral code="AMBCODE" height="720" radius="32" utm_source="wordpress"]`}
          </pre>
          <div className="mt-4 text-sm text-slate-700 space-y-1">
            <p><span className="font-semibold">Required:</span> <code className="font-mono">code</code></p>
            <p><span className="font-semibold">Optional:</span> <code className="font-mono">height</code>, <code className="font-mono">radius</code>, <code className="font-mono">embed</code>, <code className="font-mono">utm_source</code>, <code className="font-mono">utm_campaign</code></p>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Tip: set <code className="font-mono">embed=&quot;0&quot;</code> to render a link instead of an iframe.
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Preview</h2>
        <p className="mt-2 text-sm text-slate-600">
          This is what the embed looks like inside a page. The referral page loads in an iframe.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src="/wordpress-shortcode-preview.svg"
            alt="WordPress shortcode preview"
            width={1200}
            height={720}
            className="w-full h-auto"
            priority
          />
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-900 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">WooCommerce conversions (optional)</h2>
              <p className="mt-2 text-sm text-slate-600">
                If you want completed orders to reflect in the Refer Labs dashboard automatically:
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Settings → Refer Labs → set your Discount Capture Secret</li>
                <li>Use WooCommerce coupon codes (or a checkout field saved as <code className="font-mono">discount_code</code>)</li>
                <li>Place a test order and confirm it appears in the dashboard</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                The plugin posts to <code className="font-mono">/api/discount-codes/redeem</code> using the secret you provide.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <ExternalLink className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li><span className="font-semibold">Blank iframe:</span> confirm your site is HTTPS and your theme/security plugin isn’t blocking iframes.</li>
                <li><span className="font-semibold">Looks squashed:</span> increase <code className="font-mono">height</code> (e.g. 720–900).</li>
                <li><span className="font-semibold">No conversions showing:</span> confirm the secret is correct and the checkout actually provides a discount code.</li>
                <li><span className="font-semibold">Caching:</span> purge cache/CDN after activating the plugin or changing settings.</li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                For deeper diagnostics, use the{" "}
                <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Status page
                </Link>
                .
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Install + activate the plugin zip.</li>
          <li>
            Create a page and paste{" "}
            <code className="font-mono">[referlabs_referral code=&quot;AMBCODE&quot;]</code>{" "}
            using a real ambassador code from your dashboard.
          </li>
          <li>Open the page in an incognito window and confirm the embedded referral page loads.</li>
          <li>Submit the referral form and confirm the signup appears in the dashboard (Journey timeline).</li>
          <li>If using WooCommerce conversion capture, place a test order using a coupon/discount code and confirm it appears in the dashboard.</li>
          <li>If anything doesn’t appear, run the <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">Status page</Link> checks.</li>
        </ol>
      </Card>
    </div>
  );
}
