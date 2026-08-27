import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { KNOSE_URL, PETSONME_URL, PETSONME_CODE } from "@/lib/affiliate-links";

/**
 * The two pet-insurance partners, presented together.
 *
 * Lifted verbatim out of /pet-insurance so the same offer, the same figures and
 * the same wording about what each code actually discounts appear wherever the
 * offer appears. Three pages carried, or needed, this block; keeping one copy is
 * what stops the PetsOnMe code being described as a premium discount on one page
 * and a services discount on another. No claim here is new: every figure came
 * with the block.
 *
 * `ctaPrefix` scopes the data-cta so affiliate_click reports which page the
 * click came from rather than attributing all of them to the hub.
 */
export default function PetOfferPair({ ctaPrefix }: { ctaPrefix: string }) {
  return (
    <>
      {/* Prominent current offer: Knose */}
      <section className="mb-10">
        <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#e8f5ee] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/knose.svg" alt="Knose logo" width={160} height={62} className="h-9 w-auto" />
            <span className="rounded-full bg-[#0a7c42] px-4 py-1.5 text-sm font-bold text-white">2 months free</span>
          </div>
          <p className="mt-5 text-2xl font-black leading-tight tracking-[-0.01em] text-[#10251b] sm:text-[1.7rem]">
            New customers: 2 months free on Knose pet insurance
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Use the code <strong className="text-[#10251b]">referlab2mf</strong> through our link. Cover, waiting
            periods, exclusions and limits are in Knose&apos;s PDS, so get a quote to see what would apply to your pet.
          </p>
          <p className="mt-2 text-[11px] font-medium text-[#6e7b74]">
            Read off Knose&apos;s own page on 27 August 2026. Offers can change, so check the current terms before
            you sign up.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={KNOSE_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta={`${ctaPrefix}-knose-offer`}
              className="nw-btn"
            >
              Get a Knose quote (2 months free) <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/knose" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
              More about the Knose offer
            </Link>
          </div>
        </div>
      </section>

      {/* Second provider: PetsOnMe. Kept factual and even-handed, and the code is
          stated precisely because it discounts pet care services, not the premium. */}
      <section className="mb-10">
        <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/petsonme.svg" alt="PetsOnMe logo" width={161} height={45} className="h-9 w-auto" />
            <span className="rounded-full border border-[#cfe6da] bg-[#e8f5ee] px-4 py-1.5 text-sm font-bold text-[#0a7c42]">
              Three cover levels
            </span>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-[#3d4b44]">
            PetsOnMe publishes its cover levels openly: Accidental ($5,000 annual limit), Classic ($10,000, with
            hereditary conditions to $2,300 a year) and Deluxe ($20,000, hereditary to $3,800 and select dental to
            $500). All three pay 80% of the eligible vet bill less a $100, $200 or $300 excess. Underwritten by
            Pacific International Insurance.
          </p>
          <p className="mt-2 text-[11px] font-medium text-[#6e7b74]">
            Figures are from PetsOnMe&apos;s own compare-cover page, checked 17 August 2026. Offers can change, so
            check the current terms before you sign up.
          </p>
          <p className="mt-3 rounded-lg border border-[#cfe6da] bg-[#e8f5ee] px-4 py-3 text-sm leading-relaxed text-[#2b362f]">
            <span className="font-semibold text-[#10251b]">The code. </span>
            <strong className="text-[#10251b]">{PETSONME_CODE}</strong> upgrades the discount on PetsOnMe&apos;s pet
            care services, such as walking, minding and grooming, from 12% to 15%. It is a discount on those
            services, not on the insurance premium.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={PETSONME_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta={`${ctaPrefix}-petsonme-offer`}
              className="nw-btn"
            >
              Compare PetsOnMe cover <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/petsonme" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
              More about PetsOnMe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
