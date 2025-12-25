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
      <Script id="google-tag-manager" strategy="afterInteractive">
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
