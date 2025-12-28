=== Refer Labs Referral Integration ===
Contributors: referlabs
Tags: referral, shortcode, iframe, woocommerce
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

Embed Refer Labs referral pages on WordPress using a shortcode. Optionally capture WooCommerce conversions back to Refer Labs.

== Quick start (one-click install) ==
1) Download the plugin zip from your Refer Labs dashboard (or /referlabs-referral-integration.zip).
2) In WordPress Admin: Plugins → Add New → Upload Plugin
3) Choose the zip → Install Now → Activate
4) Create a page and paste:
   [referlabs_referral code="AMBCODE"]

== Shortcode ==
Shortcode: [referlabs_referral]

Required:
* code — ambassador referral code (example: OTS_1C2P-pgX)

Optional:
* height — iframe height in px (default: 640)
* radius — border radius in px (default: 24)
* embed — 1 (default) to embed, 0 to render an “Open referral offer” link
* utm_source — default: wordpress
* utm_campaign — optional

Example:
[referlabs_referral code="OTS_1C2P-pgX" height="720" radius="32" utm_campaign="home-page"]

== WooCommerce conversion capture (optional) ==
If you want completed orders to appear in your Refer Labs dashboard, set your Discount Capture Secret:
WordPress Admin → Settings → Refer Labs → Discount capture secret

How it works:
- If the order has coupon codes, the first coupon code is used.
- Otherwise, it tries a custom checkout meta field named discount_code.
- The plugin calls /api/discount-codes/redeem on your configured Refer Labs base URL.

== Troubleshooting ==
* Shortcode displays “Missing referral code”: you must set code="AMBCODE".
* Iframe is blank: ensure your WordPress site is served over HTTPS and your theme is not blocking iframes.
* Page looks squashed: increase height="720" (or more).
* Conversions not showing in dashboard:
  - Confirm Discount Capture Secret is set correctly.
  - Make sure your checkout actually collects/uses a discount code (coupon or discount_code field).
  - Try setting “Capture conversions when order is” to Processing if you don’t use Completed.

