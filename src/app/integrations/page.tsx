import Link from "next/link";
import {
  Calendar,
  BarChart3,
  Code2,
  CreditCard,
  Globe,
  LayoutTemplate,
  Mail,
  Rocket,
  ShoppingBag,
  Sparkles,
  Square,
  Store,
  Tag,
  Truck,
  Users,
  Wrench,
  Workflow,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Integrations | Refer Labs",
  description: "Step-by-step integration guides for websites, payments, and CRMs.",
};

function IntegrationCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href} className="block">
      <Card className="p-6 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-slate-900 p-2">{icon}</div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function IntegrationsHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        <Wrench className="h-4 w-4" />
        Integrations
      </div>
      <h1 className="mt-4 text-3xl font-black text-slate-900">Integration guides</h1>
      <p className="mt-2 text-slate-600">
        Step-by-step pages designed to make onboarding and testing intuitive.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <IntegrationCard
          href="/wordpress"
          title="WordPress + WooCommerce"
          description="One-click plugin install + shortcode embed + WooCommerce conversion capture."
          icon={<Globe className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/shopify"
          title="Shopify"
          description="Theme embed + conversion capture via discount code tracking + testing checkpoints."
          icon={<ShoppingBag className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/shopify/checkout-extensibility"
          title="Shopify Checkout Extensibility"
          description="Modern conversion tracking via webhooks + server (no order status scripts required)."
          icon={<ShoppingBag className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/stripe"
          title="Stripe"
          description="Webhook setup + testing checklist so payments sync reliably."
          icon={<CreditCard className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/klaviyo"
          title="Klaviyo"
          description="Import ambassadors, map merge fields, and validate click + conversion attribution."
          icon={<Mail className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/mailchimp"
          title="Mailchimp"
          description="Audience field mapping + merge tags for referral links + testing checkpoints."
          icon={<Mail className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/hubspot"
          title="HubSpot"
          description="Contact properties + personalization tokens + optional workflow webhooks."
          icon={<Users className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/zapier"
          title="Zapier"
          description="No-code conversion posting (payments/bookings/CRM) + step-by-step testing."
          icon={<Zap className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/make"
          title="Make (Integromat)"
          description="HTTP module conversion posting + field mapping + testing checkpoints."
          icon={<Workflow className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/api-guide"
          title="Custom API"
          description="Backend integration for retries, idempotency, and reliable attribution."
          icon={<Code2 className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/webflow"
          title="Webflow"
          description="Embed referral pages with an Embed block + end-to-end testing checkpoints."
          icon={<LayoutTemplate className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/squarespace"
          title="Squarespace"
          description="Code block embed + conversion capture options (Zapier/Make/Custom API)."
          icon={<Square className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/wix"
          title="Wix"
          description="HTML embed + server-side conversion capture via Velo or automations."
          icon={<Sparkles className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/square"
          title="Square POS"
          description="Track in-person + invoice conversions via discount code redemption posting."
          icon={<Store className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/calendly"
          title="Calendly"
          description="Capture bookings as conversions by collecting codes and posting on confirmation."
          icon={<Calendar className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/servicem8"
          title="ServiceM8"
          description="Field-service job/invoice conversions posted with captured discount codes."
          icon={<Truck className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/gtm"
          title="Google Tag Manager (GTM)"
          description="Standardize analytics + verify referral tracking end-to-end."
          icon={<Tag className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/analytics"
          title="Analytics (GA4)"
          description="UTM verification + tracking checklist without breaking attribution."
          icon={<BarChart3 className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/go-live"
          title="Go-live checklist"
          description="Production launch checklist for attribution + real-time dashboard."
          icon={<Rocket className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/meta-ads"
          title="Meta Ads"
          description="Pixel/CAPI setup guidance that keeps referral attribution accurate."
          icon={<Tag className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/google-ads"
          title="Google Ads"
          description="Tag/conversion setup without relying on fragile client-side attribution."
          icon={<BarChart3 className="h-5 w-5 text-white" />}
        />
        <IntegrationCard
          href="/tiktok-ads"
          title="TikTok Ads"
          description="Pixel/Events setup + end-to-end attribution testing checklist."
          icon={<Rocket className="h-5 w-5 text-white" />}
        />
      </div>
    </div>
  );
}
