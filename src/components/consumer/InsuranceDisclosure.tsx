// Compliance block for the pet-insurance vertical. Keeps the referral framing
// consistent everywhere: general information only, no advice/recommendation,
// benefit disclosed, and a pointer to the insurer's PDS/TMD. This supports the
// referral basis under Corporations Regulation 7.6.01(1)(e) (referrer exemption:
// refer + disclose benefit + do not give financial product advice).

export default function InsuranceDisclosure({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 ${className}`}>
      <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#0a7c42]">General information, not financial advice</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#3d4b44]">
        Refer Labs is not an insurer, broker or financial adviser, and nothing here is a recommendation or personal
        financial advice. We provide general information and refer you to the provider. We may receive a commission or
        referral fee if you take up an offer through our links, at no extra cost to you. Whether a policy suits you
        depends on your own circumstances, so read the provider&apos;s Product Disclosure Statement (PDS) and Target
        Market Determination (TMD) before deciding.
      </p>
    </div>
  );
}
