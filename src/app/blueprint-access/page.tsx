import Link from "next/link";

import ConsumerShell from "@/components/consumer/ConsumerShell";

/**
 * Blueprint portal, retired.
 *
 * The Referral Blueprint is no longer an offering, and the Supabase project
 * that held its purchase records was deleted, so no access token can be
 * verified any more. Previously this page called that dead database and told
 * anyone arriving that their link was invalid, which reads as "you were never a
 * customer" to someone who paid.
 *
 * The URL is deliberately kept alive rather than redirected or removed: people
 * who bought it have this link in their receipt and their inbox, and a 404 or a
 * bounce to the homepage answers none of their questions. A plain notice with a
 * way to reach a person does.
 *
 * No database call, so there is no failure mode left on this page.
 */

export default function BlueprintAccessPage() {
  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-2xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          The Referral Blueprint has been retired
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Refer Labs no longer sells the Referral Blueprint, and this portal is closed. Nothing further
          will be charged, and there is no subscription to cancel.
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
          If you bought the Blueprint and did not receive everything you paid for, email{" "}
          <a
            href="mailto:jarred@referlabs.com.au?subject=Referral%20Blueprint%20purchase"
            className="font-semibold text-[#0a7c42] hover:underline"
          >
            jarred@referlabs.com.au
          </a>{" "}
          with the email address you used at checkout. A person reads it, and we will sort it out.
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
          What Refer Labs does now is independent comparisons for Australians: what things cost, what
          the terms actually say, and where the offers are. The{" "}
          <Link href="/guides" className="font-semibold text-[#0a7c42] hover:underline">
            guides
          </Link>{" "}
          are free and there is nothing to buy.
        </p>

        <p className="mt-8 text-[13px] text-[#6e7b74]">
          Pepform Pty Ltd, ABN 32 660 008 159, trading as Refer Labs.
        </p>
      </main>
    </ConsumerShell>
  );
}
