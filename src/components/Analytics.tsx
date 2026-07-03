"use client";

import Script from "next/script";

/**
 * Google Analytics 4 Component
 *
 * Setup Instructions:
 * 1. Create a Google Analytics 4 property at https://analytics.google.com
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add to your .env.local:
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 4. This component is already imported in the root layout
 *
 * Events tracked automatically:
 * - Page views
 * - Scroll depth
 * - Outbound clicks
 * - File downloads
 *
 * Custom events can be triggered using:
 * window.gtag('event', 'event_name', { ...parameters })
 */

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only load in production or if explicitly enabled
  if (!measurementId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

/**
 * Google Tag Manager Component (Alternative to GA4)
 *
 * Setup Instructions:
 * 1. Create a GTM container at https://tagmanager.google.com
 * 2. Get your Container ID (format: GTM-XXXXXXX)
 * 3. Add to your .env.local:
 *    NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 *
 * GTM is more flexible than GA4 alone:
 * - Manage multiple tracking tools (GA4, Facebook Pixel, LinkedIn Insight Tag)
 * - Set up event tracking without code changes
 * - A/B testing integrations
 */

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

/**
 * Meta (Facebook) Pixel — for retargeting on Facebook & Instagram
 * Set NEXT_PUBLIC_META_PIXEL_ID in Vercel for the marketing partner to enable
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}

/**
 * LinkedIn Insight Tag — for retargeting on LinkedIn (high B2B intent)
 * Set NEXT_PUBLIC_LINKEDIN_PARTNER_ID in Vercel
 */
export function LinkedInInsight() {
  const partnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  if (!partnerId || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script id="linkedin-insight" strategy="lazyOnload">
        {`_linkedin_partner_id="${partnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`} />
      </noscript>
    </>
  );
}

/**
 * Custom Event Tracking Utilities
 * Use these to track specific user actions
 */

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as Window & { gtag: (command: string, eventName: string, params?: Record<string, unknown>) => void }).gtag("event", eventName, parameters);
  }
};

// Predefined event trackers for common actions
export const analytics = {
  // Track pricing plan selection
  trackPricingPlanClick: (plan: string, billingCycle: string) => {
    trackEvent("select_plan", {
      plan_name: plan,
      billing_cycle: billingCycle,
      value: plan === "base" ? 399 : 599,
      currency: "USD",
    });
  },

  // Track trial signup
  trackTrialSignup: (plan: string) => {
    trackEvent("sign_up", {
      method: "email",
      plan_name: plan,
    });
  },

  // Track successful payment
  trackPurchase: (plan: string, amount: number, transactionId: string) => {
    trackEvent("purchase", {
      transaction_id: transactionId,
      value: amount,
      currency: "USD",
      items: [
        {
          item_name: `Refer Labs ${plan} Plan`,
          item_category: "subscription",
          price: amount,
          quantity: 1,
        },
      ],
    });
  },

  // Track ROI calculator usage
  trackROICalculator: (monthlyCustomers: number, conversionRate: number, estimatedROI: number) => {
    trackEvent("roi_calculator_used", {
      monthly_customers: monthlyCustomers,
      conversion_rate: conversionRate,
      estimated_roi: estimatedROI,
    });
  },

  // Track referral link creation
  trackReferralCreated: (ambassadorId: string) => {
    trackEvent("referral_link_created", {
      ambassador_id: ambassadorId,
    });
  },

  // Track contact form submission
  trackContactFormSubmit: () => {
    trackEvent("generate_lead", {
      form_name: "contact_form",
    });
  },

  // Track blog post view
  trackBlogView: (postTitle: string) => {
    trackEvent("blog_view", {
      post_title: postTitle,
    });
  },

  // Track video play
  trackVideoPlay: (videoTitle: string) => {
    trackEvent("video_start", {
      video_title: videoTitle,
    });
  },

  // Track outbound link clicks
  trackOutboundClick: (url: string, linkText: string) => {
    trackEvent("click", {
      link_url: url,
      link_text: linkText,
      outbound: true,
    });
  },

  // ── Cross-platform Blueprint events (GA4 + Meta Pixel + LinkedIn) ──────
  blueprintIntakeStarted: () => {
    trackEvent("blueprint_intake_started", { product: "Referral Growth Blueprint" });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "InitiateCheckout", { content_name: "Referral Growth Blueprint", value: 799, currency: "AUD" });
    }
    if (typeof window !== "undefined" && "lintrk" in window) {
      (window as Window & { lintrk: (track: string, params: { conversion_id: number }) => void })
        .lintrk("track", { conversion_id: 0 });
    }
  },
  blueprintCheckoutInitiated: () => {
    trackEvent("blueprint_checkout_initiated", { value: 799, currency: "AUD" });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "AddPaymentInfo", { content_name: "Referral Growth Blueprint", value: 799, currency: "AUD" });
    }
  },
  blueprintPurchaseCompleted: (sessionId?: string) => {
    trackEvent("purchase", {
      transaction_id: sessionId ?? "blueprint_" + Date.now(),
      value: 799,
      currency: "AUD",
      items: [{ item_name: "Referral Growth Blueprint", item_category: "Digital Product", price: 799, quantity: 1 }],
    });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "Purchase", { content_name: "Referral Growth Blueprint", value: 799, currency: "AUD" });
    }
    if (typeof window !== "undefined" && "lintrk" in window) {
      (window as Window & { lintrk: (track: string, params: { conversion_id: number }) => void })
        .lintrk("track", { conversion_id: 0 });
    }
  },
  leadCaptured: (source: string) => {
    trackEvent("generate_lead", { source, value: 1, currency: "AUD" });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "Lead", { source });
    }
  },
};

// Type declaration for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
