import { NextResponse } from "next/server";
import JSZip from "jszip";
import QRCode from "qrcode";

type MediaKitPayload = {
  referralLink?: string;
  ambassadorName?: string | null;
  businessName?: string | null;
  friendReward?: string | null;
  ambassadorReward?: string | null;
  offerText?: string | null;
};

function buildEmailTemplate({
  ambassadorName,
  friendReward,
  ambassadorReward,
  referralLink,
  businessName,
}: Required<Pick<MediaKitPayload, "referralLink">> &
  Omit<MediaKitPayload, "referralLink">) {
  const friendlyName = ambassadorName || "I";
  const brand = businessName || "our studio";
  return `Subject: VIP Invite to ${brand}

Hi there,

${friendlyName} thought you would love ${brand}.
Claim ${friendReward || "a welcome reward"} with this private link:
${referralLink}

You’ll unlock it instantly, and ${friendlyName} earns ${
    ambassadorReward || "a thank-you credit"
  } too. Let me know if you have any questions!

Cheers,
${friendlyName}`;
}

function buildSmsTemplate({
  friendReward,
  referralLink,
}: {
  friendReward?: string | null;
  referralLink: string;
}) {
  return `I have a ${friendReward || "VIP reward"} for you — claim it here: ${referralLink}`;
}

function buildSocialCaption({
  offerText,
  referralLink,
  businessName,
}: {
  offerText?: string | null;
  referralLink: string;
  businessName?: string | null;
}) {
  return `${offerText || "Upgrade your experience with us"} ✨

Use my private link to join ${
    businessName || "our club"
  } and unlock rewards instantly:
${referralLink}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MediaKitPayload | null;
    const referralLink = payload?.referralLink;

    if (!referralLink) {
      return NextResponse.json(
        { error: "Missing referral link." },
        { status: 400 },
      );
    }

    const zip = new JSZip();
    const metadata = {
      ambassador: payload?.ambassadorName || "Ambassador",
      business: payload?.businessName || "Your Brand",
      friendReward: payload?.friendReward || "VIP reward",
      ambassadorReward: payload?.ambassadorReward || "ambassador thank-you",
      offerText: payload?.offerText || null,
    };

    zip.file(
      "README.txt",
      `Media kit for ${metadata.business}\n\nIncluded assets:\n- Email template\n- SMS template\n- Share button HTML\n- Banner HTML\n- Social caption text\n- QR code (png)\n\nGenerated at ${new Date().toISOString()}`,
    );

    const emailTemplate = buildEmailTemplate({
      ambassadorName: metadata.ambassador,
      friendReward: metadata.friendReward,
      ambassadorReward: metadata.ambassadorReward,
      referralLink,
      businessName: metadata.business,
    });
    zip.file("email-template.txt", emailTemplate);

    zip.file(
      "sms-template.txt",
      buildSmsTemplate({
        friendReward: metadata.friendReward,
        referralLink,
      }),
    );

    zip.file(
      "social-caption.txt",
      buildSocialCaption({
        offerText: metadata.offerText,
        referralLink,
        businessName: metadata.business,
      }),
    );

    const buttonSnippet = `<a href="${referralLink}" target="_blank" rel="noopener" style="display:inline-block;background:#111827;color:#fff;border-radius:999px;padding:12px 28px;font-family:Arial,sans-serif;text-decoration:none;font-weight:600;">Join ${metadata.business}</a>`;
    const bannerSnippet = `<div style="border-radius:24px;padding:20px;background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;font-family:Arial,sans-serif;text-align:center;">
  <p style="margin:0;font-size:13px;letter-spacing:0.3em;text-transform:uppercase;">Referral Reward</p>
  <h3 style="margin:12px 0;font-size:26px;">${metadata.friendReward}</h3>
  <p style="margin:0 0 16px 0;">Share ${metadata.ambassadorReward} with ${metadata.business}</p>
  <a href="${referralLink}" target="_blank" rel="noopener" style="display:inline-block;background:#fff;color:#0f172a;border-radius:999px;padding:10px 24px;font-weight:700;text-decoration:none;">Claim the reward</a>
</div>`;

    zip.file("button.html", buttonSnippet);
    zip.file("banner.html", bannerSnippet);

    const qrBuffer = await QRCode.toBuffer(referralLink, {
      type: "png",
      width: 600,
      margin: 2,
    });
    zip.file("qr-code.png", qrBuffer);

    const archive = await zip.generateAsync({ type: "nodebuffer" });
    const arrayBuffer = new ArrayBuffer(archive.byteLength);
    const uint8ArrayView = new Uint8Array(arrayBuffer);
    uint8ArrayView.set(archive);
    const blob = new Blob([uint8ArrayView], { type: "application/zip" });

    const filename = `media-kit-${metadata.business.replace(/\s+/g, "-").toLowerCase()}-${
      Date.now() / 1000
    }.zip`;

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Media kit generation failed:", error);
    return NextResponse.json(
      { error: "Failed to build media kit." },
      { status: 500 },
    );
  }
}
