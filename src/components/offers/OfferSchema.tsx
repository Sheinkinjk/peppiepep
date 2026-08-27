import { offerSchema } from "@/lib/offers";

/**
 * schema.org Offer for a discount code, emitted alongside the page's FAQPage.
 *
 * FAQPage carries the code inside an answer string, which is prose an engine has
 * to read. Offer states the same thing as data: seller, description, price where
 * one exists. Both, not one instead of the other.
 *
 * Renders nothing for an unknown code rather than an empty node, so a typo in a
 * caller cannot put a half-populated Offer in front of a crawler.
 */
export default function OfferSchema({ code }: { code: string }) {
  const node = offerSchema(code);
  if (!node) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
  );
}
