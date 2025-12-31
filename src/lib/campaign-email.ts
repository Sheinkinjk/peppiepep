import QRCode from "qrcode";

import type { SnapshotStoryBlock } from "@/lib/campaigns";

type BrandIdentity = {
  logoUrl?: string | null;
  highlightColor?: string | null;
  tone?: string | null;
};

type CampaignEmailOptions = {
  businessName: string;
  siteUrl: string;
  campaignName: string;
  textBody: string;
  referralLink: string;
  referralLandingUrl: string;
  ambassadorPortalUrl: string;
  preheaderText?: string | null;
  brand?: BrandIdentity;
  includeQrCode?: boolean;
  snapshot: {
    newUserRewardText: string | null;
    clientRewardText: string | null;
    rewardType: string | null;
    rewardAmount: number | null;
    upgradeName: string | null;
    rewardTerms: string | null;
    logoUrl: string | null;
    storyBlocks: Array<Record<string, unknown>> | SnapshotStoryBlock[] | null;
    includeQr?: boolean | null;
  };
};

type ToneStyleKey = "modern" | "luxury" | "playful" | "earthy" | "minimal";

type ToneStyle = {
  key: ToneStyleKey;
  headingFont: string;
  bodyFont: string;
  baseBackground: string;
  cardBackground: string;
  heroText: string;
  bodyText: string;
  mutedText: string;
  labelColor: string;
  highlightLabelColor: string;
  highlightTextColor: string;
  surfaceBackground: string;
  supportingSurfaceBackground: string;
  borderColor: string;
  footerTextColor: string;
  footerMutedText: string;
  primaryButtonText: string;
  portalButtonText: string;
  secondaryButtonBackground: string;
  secondaryButtonText: string;
  textureStrength: number;
};

const toneAliases: Record<string, ToneStyleKey> = {
  premium: "luxury",
  luxe: "luxury",
  luxury: "luxury",
  glam: "luxury",
  editorial: "luxury",
  playful: "playful",
  vibrant: "playful",
  energetic: "playful",
  fun: "playful",
  bold: "modern",
  modern: "modern",
  fresh: "modern",
  default: "modern",
  earthy: "earthy",
  organic: "earthy",
  natural: "earthy",
  grounded: "earthy",
  minimal: "minimal",
  minimalist: "minimal",
  clean: "minimal",
  calm: "minimal",
};

const toneStyles: Record<ToneStyleKey, ToneStyle> = {
  modern: {
    key: "modern",
    headingFont: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    bodyFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    baseBackground: "#f8fafc",
    cardBackground: "#ffffff",
    heroText: "#0f172a",
    bodyText: "#475569",
    mutedText: "#64748b",
    labelColor: "#475569",
    highlightLabelColor: "#1e293b",
    highlightTextColor: "#0f172a",
    surfaceBackground: "#f8fafc",
    supportingSurfaceBackground: "#eef2ff",
    borderColor: "rgba(15,23,42,0.12)",
    footerTextColor: "#0f172a",
    footerMutedText: "#64748b",
    primaryButtonText: "#fdfbf7",
    portalButtonText: "#fefefe",
    secondaryButtonBackground: "#0f172a",
    secondaryButtonText: "#f8fafc",
    textureStrength: 0.18,
  },
  luxury: {
    key: "luxury",
    headingFont: "'Georgia', 'Times New Roman', serif",
    bodyFont: "'Georgia', 'Times New Roman', serif",
    baseBackground: "#fdf8f5",
    cardBackground: "#fffdf9",
    heroText: "#2b1b12",
    bodyText: "#5a4539",
    mutedText: "#8d7b72",
    labelColor: "#7b5d4a",
    highlightLabelColor: "#a86a4c",
    highlightTextColor: "#2b1b12",
    surfaceBackground: "#fbefe6",
    supportingSurfaceBackground: "#f6e0d0",
    borderColor: "rgba(90,69,57,0.22)",
    footerTextColor: "#2b1b12",
    footerMutedText: "#8d7b72",
    primaryButtonText: "#fff9f4",
    portalButtonText: "#fff9f4",
    secondaryButtonBackground: "#2b1b12",
    secondaryButtonText: "#fdf5ee",
    textureStrength: 0.14,
  },
  playful: {
    key: "playful",
    headingFont: "'Trebuchet MS', 'Verdana', 'Tahoma', sans-serif",
    bodyFont: "'Trebuchet MS', 'Verdana', 'Tahoma', sans-serif",
    baseBackground: "#fff8f1",
    cardBackground: "#ffffff",
    heroText: "#1f2933",
    bodyText: "#475467",
    mutedText: "#667085",
    labelColor: "#ea580c",
    highlightLabelColor: "#be185d",
    highlightTextColor: "#ffffff",
    surfaceBackground: "#fff4e6",
    supportingSurfaceBackground: "#ffe6f0",
    borderColor: "rgba(244,114,182,0.35)",
    footerTextColor: "#1f2933",
    footerMutedText: "#667085",
    primaryButtonText: "#fff7ed",
    portalButtonText: "#ffffff",
    secondaryButtonBackground: "#111827",
    secondaryButtonText: "#f8fafc",
    textureStrength: 0.2,
  },
  earthy: {
    key: "earthy",
    headingFont: "'Gill Sans', 'Trebuchet MS', 'Segoe UI', sans-serif",
    bodyFont: "'Gill Sans', 'Trebuchet MS', 'Segoe UI', sans-serif",
    baseBackground: "#f7f4ef",
    cardBackground: "#fffdf9",
    heroText: "#1f2a1c",
    bodyText: "#3f4c39",
    mutedText: "#677261",
    labelColor: "#5b6b52",
    highlightLabelColor: "#3f4c39",
    highlightTextColor: "#1f2a1c",
    surfaceBackground: "#f1ece4",
    supportingSurfaceBackground: "#e8f1ea",
    borderColor: "rgba(63,76,57,0.25)",
    footerTextColor: "#1f2a1c",
    footerMutedText: "#677261",
    primaryButtonText: "#fdfaf5",
    portalButtonText: "#fdfaf5",
    secondaryButtonBackground: "#1f2a1c",
    secondaryButtonText: "#f8faf2",
    textureStrength: 0.12,
  },
  minimal: {
    key: "minimal",
    headingFont: "'Helvetica Neue', Arial, sans-serif",
    bodyFont: "'Helvetica Neue', Arial, sans-serif",
    baseBackground: "#f4f7fb",
    cardBackground: "#ffffff",
    heroText: "#111827",
    bodyText: "#374151",
    mutedText: "#6b7280",
    labelColor: "#475569",
    highlightLabelColor: "#374151",
    highlightTextColor: "#111827",
    surfaceBackground: "#eff3f8",
    supportingSurfaceBackground: "#e3f2fd",
    borderColor: "rgba(55,65,81,0.18)",
    footerTextColor: "#111827",
    footerMutedText: "#6b7280",
    primaryButtonText: "#f8fafc",
    portalButtonText: "#f8fafc",
    secondaryButtonBackground: "#0f172a",
    secondaryButtonText: "#f8fafc",
    textureStrength: 0.16,
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeText(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function coerceStoryBlocks(
  rawValue: unknown,
  fallbackFactory: () => SnapshotStoryBlock[],
): SnapshotStoryBlock[] {
  if (!Array.isArray(rawValue)) {
    return fallbackFactory();
  }

  const normalized: SnapshotStoryBlock[] = [];

  for (const item of rawValue) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const type = normalizeText(record.type)?.toLowerCase();
    if (!type) continue;

    if (type === "testimonial") {
      const quote =
        normalizeText(record.quote) ??
        normalizeText(record.body) ??
        normalizeText(record.copy);
      if (!quote) continue;

      normalized.push({
        type: "testimonial",
        eyebrow: normalizeText(record.eyebrow) ?? normalizeText(record.label),
        quote,
        author: normalizeText(record.author) ?? normalizeText(record.signature),
        credential: normalizeText(record.credential) ?? normalizeText(record.title),
      });
      continue;
    }

    if (type === "reward_calculator" || type === "calculator") {
      const rawEntries =
        (Array.isArray(record.entries) && record.entries) ||
        (Array.isArray(record.lines) && record.lines) ||
        [];
      const entries: Array<{ label: string; value: string }> = [];
      for (const entry of rawEntries) {
        if (!entry || typeof entry !== "object") continue;
        const entryRecord = entry as Record<string, unknown>;
        const value =
          normalizeText(entryRecord.value) ??
          normalizeText(entryRecord.copy) ??
          normalizeText(entryRecord.answer);
        if (!value) continue;
        const label =
          normalizeText(entryRecord.label) ??
          normalizeText(entryRecord.question) ??
          "Reward";
        entries.push({ label, value });
      }
      if (entries.length === 0) continue;

      normalized.push({
        type: "reward_calculator",
        title: normalizeText(record.title) ?? "Reward calculator",
        description: normalizeText(record.description) ?? normalizeText(record.body),
        entries,
        footer: normalizeText(record.footer) ?? normalizeText(record.footnote),
      });
      continue;
    }

    if (type === "faq") {
      const rawItems = Array.isArray(record.items) ? record.items : [];
      const items: Array<{ question: string; answer: string }> = [];
      for (const entry of rawItems) {
        if (!entry || typeof entry !== "object") continue;
        const entryRecord = entry as Record<string, unknown>;
        const question =
          normalizeText(entryRecord.question) ??
          normalizeText(entryRecord.title) ??
          normalizeText(entryRecord.label);
        const answer =
          normalizeText(entryRecord.answer) ??
          normalizeText(entryRecord.copy) ??
          normalizeText(entryRecord.body);
        if (!question || !answer) continue;
        items.push({ question, answer });
      }
      if (items.length === 0) continue;

      normalized.push({
        type: "faq",
        title: normalizeText(record.title) ?? "Frequently asked",
        items,
      });
    }
  }

  if (normalized.length === 0) {
    return fallbackFactory();
  }
  return normalized;
}

function buildFallbackStoryBlocks(
  businessName: string,
  newUserReward: string,
  clientReward: string,
): SnapshotStoryBlock[] {
  return [
    {
      type: "testimonial",
      eyebrow: "Ambassador spotlight",
      quote: `"I whispered ${businessName} to my circle and they were ushered into ${newUserReward}. Every intro feels like gifting them VIP status."`,
      author: "Discreet tastemaker",
      credential: "Private ambassador",
    },
    {
      type: "reward_calculator",
      title: "Your reward runway",
      description: "Stack the rewards as your network leans in.",
      entries: [
        { label: "1 referral", value: clientReward },
        { label: "3 referrals", value: `3 x ${clientReward}` },
        { label: "10 referrals", value: "Concierge recognition all year" },
      ],
      footer: `Friends you invite receive ${newUserReward}.`,
    },
    {
      type: "faq",
      title: "What insiders ask",
      items: [
        {
          question: "How fast do rewards drop?",
          answer: "We release them as soon as your referral books or the first visit clears.",
        },
        {
          question: "Where do I track progress?",
          answer: "In your ambassador portal - live earnings, offline logging, and payout triggers live there.",
        },
        {
          question: "What do friends receive?",
          answer: `They get ${newUserReward}, announced as a gift from you.`,
        },
      ],
    },
  ];
}

function renderStoryBlocks(
  blocks: SnapshotStoryBlock[],
  tone: ToneStyle,
  options: {
    accentBorderColor: string;
    highlightCardGradient: string;
    highlightCardShadow: string;
  },
) {
  const testimonialBlock = (block: SnapshotStoryBlock & { type: "testimonial" }) => {
    const eyebrow = block.eyebrow
      ? `<p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: ${tone.highlightLabelColor}; font-weight: 700;">${escapeHtml(block.eyebrow)}</p>`
      : "";
    const author = block.author
      ? `<p style="margin: 12px 0 0 0; font-size: 13px; font-weight: 600; color: ${tone.highlightTextColor};">${escapeHtml(block.author)}${
          block.credential
            ? ` - <span style="font-weight: 400;">${escapeHtml(block.credential)}</span>`
            : ""
        }</p>`
      : "";
    return `
<div style="margin: 24px 0 0 0; border-radius: 20px; border: 1px solid ${options.accentBorderColor}; background: ${options.highlightCardGradient}; padding: 20px 22px; box-shadow: ${options.highlightCardShadow};">
  ${eyebrow}
  <p style="margin: 0; font-size: 17px; line-height: 1.7; font-style: italic; color: ${tone.highlightTextColor};">${escapeHtml(block.quote)}</p>
  ${author}
</div>`;
  };

  const rewardBlock = (block: SnapshotStoryBlock & { type: "reward_calculator" }) => {
    const title = block.title
      ? `<p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: ${tone.labelColor}; font-weight: 700;">${escapeHtml(block.title)}</p>`
      : "";
    const description = block.description
      ? `<p style="margin: 0 0 12px 0; font-size: 13px; color: ${tone.bodyText}; line-height: 1.6;">${escapeHtml(block.description)}</p>`
      : "";
    const entries = block.entries
      .map(
        (entry) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed ${tone.borderColor};">
        <span style="font-size: 13px; font-weight: 600; color: ${tone.heroText};">${escapeHtml(entry.label)}</span>
        <span style="font-size: 13px; color: ${tone.bodyText};">${escapeHtml(entry.value)}</span>
      </div>`,
      )
      .join("");
    const footer = block.footer
      ? `<p style="margin: 12px 0 0 0; font-size: 12px; color: ${tone.mutedText};">${escapeHtml(block.footer)}</p>`
      : "";

    return `
<div style="margin: 24px 0 0 0; border-radius: 20px; border: 1px solid ${options.accentBorderColor}; background: ${tone.surfaceBackground}; padding: 20px 22px;">
  ${title}
  ${description}
  <div style="margin: 0;">${entries}</div>
  ${footer}
</div>`;
  };

  const faqBlock = (block: SnapshotStoryBlock & { type: "faq" }) => {
    const title = block.title
      ? `<p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: ${tone.labelColor}; font-weight: 700;">${escapeHtml(block.title)}</p>`
      : "";
    const items = block.items
      .map(
        (item) => `
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid ${tone.borderColor};">
        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: ${tone.heroText};">${escapeHtml(item.question)}</p>
        <p style="margin: 0; font-size: 13px; color: ${tone.bodyText}; line-height: 1.6;">${escapeHtml(item.answer)}</p>
      </div>`,
      )
      .join("");

    return `
<div style="margin: 24px 0 0 0; border-radius: 20px; border: 1px solid ${tone.borderColor}; background: ${tone.cardBackground}; padding: 20px 22px;">
  ${title}
  <div>${items}</div>
</div>`;
  };

  return blocks
    .map((block) => {
      if (block.type === "testimonial") {
        return testimonialBlock(block);
      }
      if (block.type === "reward_calculator") {
        return rewardBlock(block);
      }
      if (block.type === "faq") {
        return faqBlock(block);
      }
      return "";
    })
    .join("");
}

function renderButton(options: {
  url: string;
  label: string;
  background: string;
  textColor: string;
  shadow?: string | null;
  borderColor?: string | null;
  fullWidth?: boolean;
  fontFamily: string;
}) {
  const href = options.url?.trim() ? escapeHtml(options.url) : "#";
  const safeLabel = escapeHtml(options.label);
  const widthStyle = options.fullWidth ? "width:100%;" : "width:auto;";
  const borderColor = options.borderColor ?? options.background;
  const shadowStyle = options.shadow ? `box-shadow:${options.shadow};` : "";
  return `
<table role="presentation" cellpadding="0" cellspacing="0" style="${widthStyle} margin:0; border-collapse:separate;">
  <tr>
    <td align="center" style="border-radius:999px; background:${options.background}; padding:0; border:1px solid ${borderColor}; ${shadowStyle}">
      <a
        href="${href}"
        target="_blank"
        rel="noopener noreferrer"
        style="display:inline-block; padding:14px 34px; font-size:14px; line-height:1.2; font-weight:800; letter-spacing:0.02em; font-family:${options.fontFamily}; color:${options.textColor}; text-decoration:none;"
      >
        ${safeLabel}
      </a>
    </td>
  </tr>
</table>`;
}

function resolveToneStyle(rawTone?: string | null): ToneStyle {
  if (!rawTone) return toneStyles.modern;
  const normalized = rawTone.trim().toLowerCase();
  const direct = toneStyles[normalized as ToneStyleKey];
  if (direct) return direct;
  const alias = toneAliases[normalized];
  if (alias) return toneStyles[alias];
  return toneStyles.modern;
}

function normalizeHexColor(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const prefixed = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(prefixed)) return null;
  if (prefixed.length === 4) {
    return `#${prefixed[1]}${prefixed[1]}${prefixed[2]}${prefixed[2]}${prefixed[3]}${prefixed[3]}`.toLowerCase();
  }
  return prefixed.toLowerCase();
}

function componentToHex(component: number) {
  const clamped = Math.max(0, Math.min(255, Math.round(component)));
  return clamped.toString(16).padStart(2, "0");
}

function hexToRgb(hex: string) {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;
  const value = normalized.slice(1);
  return {
    r: parseInt(value.substring(0, 2), 16),
    g: parseInt(value.substring(2, 4), 16),
    b: parseInt(value.substring(4, 6), 16),
  };
}

function adjustColor(hex: string, percent: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const ratio = percent / 100;
  const transform = (channel: number) => {
    if (ratio >= 0) {
      return channel + (255 - channel) * ratio;
    }
    return channel * (1 + ratio);
  };
  return `#${componentToHex(transform(rgb.r))}${componentToHex(transform(rgb.g))}${componentToHex(transform(rgb.b))}`;
}

function hexToRgba(hex: string, alpha: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function buildBackgroundTexture(light: string, deep: string, strength: number) {
  const first = hexToRgba(light, Math.min(strength, 0.25));
  const second = hexToRgba(deep, Math.max(strength - 0.06, 0.05));
  const third = hexToRgba(deep, Math.max(strength - 0.1, 0.04));
  return `radial-gradient(circle at 20% 20%, ${first}, transparent 40%), radial-gradient(circle at 80% 0%, ${second}, transparent 45%), radial-gradient(circle at 50% 100%, ${third}, transparent 60%)`;
}

function resolveLogoUrl(logoUrl: string | null | undefined, siteUrl: string) {
  if (!logoUrl) return null;
  if (/^https?:\/\//i.test(logoUrl)) {
    return logoUrl;
  }
  const sanitizedSite = siteUrl.replace(/\/$/, "");
  return `${sanitizedSite}${logoUrl.startsWith("/") ? logoUrl : `/${logoUrl}`}`;
}

export async function buildCampaignEmail(options: CampaignEmailOptions) {
  const {
    businessName,
    siteUrl,
    campaignName,
    textBody,
    referralLink,
    referralLandingUrl,
    ambassadorPortalUrl,
    preheaderText: preheaderOverride,
    brand,
    includeQrCode = true,
    snapshot,
  } = options;
  const landingUrl = referralLandingUrl || referralLink || siteUrl;

  const newUserReward =
    snapshot.newUserRewardText ||
    snapshot.clientRewardText ||
    "an exclusive welcome offer";
  const clientReward =
    snapshot.clientRewardText ||
    (snapshot.rewardType === "credit"
      ? `$${snapshot.rewardAmount ?? 0} credit`
      : snapshot.rewardType === "upgrade"
      ? snapshot.upgradeName || "a premium upgrade"
      : snapshot.rewardType === "discount"
      ? `${snapshot.rewardAmount ?? 0}% discount`
      : `${snapshot.rewardAmount ?? 100} points`);

  const preheaderText =
    normalizeText(preheaderOverride) ??
    `Earn ${clientReward} per referral + share ${newUserReward} with friends.`;

  const brandHighlight = normalizeHexColor(brand?.highlightColor) ?? "#7c3aed";
  const tone = resolveToneStyle(brand?.tone);
  const accentLight = adjustColor(brandHighlight, 35);
  const accentDark = adjustColor(brandHighlight, -28);
  const accentSoft = adjustColor(brandHighlight, 55);
  const accentMuted = adjustColor(brandHighlight, -45);
  const backgroundTexture = buildBackgroundTexture(accentSoft, accentMuted, tone.textureStrength);
  const heroButtonGradient = `linear-gradient(135deg, ${accentLight} 0%, ${brandHighlight} 60%, ${accentDark} 100%)`;
  const heroButtonShadow = `0 18px 45px ${hexToRgba(accentDark, 0.35)}`;
  const highlightCardGradient = `linear-gradient(135deg, ${accentSoft} 0%, ${brandHighlight} 60%, ${accentDark} 100%)`;
  const highlightCardShadow = `0 16px 38px ${hexToRgba(accentDark, 0.25)}`;
  const accentBorderColor = hexToRgba(brandHighlight, 0.32);
  const portalButtonGradient = `linear-gradient(135deg, ${brandHighlight} 0%, ${accentDark} 100%)`;
  const portalButtonShadow = `0 18px 45px ${hexToRgba(accentDark, 0.32)}`;
  const containerShadow = `0 24px 60px ${hexToRgba(accentMuted, 0.22)}`;
  const viewInBrowserColor = brandHighlight;

  const logoCandidate = brand?.logoUrl ?? snapshot.logoUrl ?? null;
  const emailLogoUrl = resolveLogoUrl(logoCandidate, siteUrl);
  const websiteLabel = siteUrl.replace(/^https?:\/\//, "");

  const campaignParagraphs = textBody
    ? textBody
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map(
          (line) =>
            `<p style="margin: 0 0 12px 0; line-height: 1.7; color: ${tone.bodyText}; font-size: 15px; font-family: ${tone.bodyFont};">${line}</p>`,
        )
        .join("")
    : "";
  const fallbackStoryBlocks = () =>
    buildFallbackStoryBlocks(businessName, newUserReward, clientReward);
  const storyBlocks = coerceStoryBlocks(snapshot.storyBlocks, fallbackStoryBlocks);
  const storyBlocksHtml = renderStoryBlocks(storyBlocks, tone, {
    accentBorderColor,
    highlightCardGradient,
    highlightCardShadow,
  });
  let qrCodeDataUrl: string | null = null;
  const qrToggleEnabled = includeQrCode && snapshot.includeQr !== false;
  if (qrToggleEnabled) {
    try {
      qrCodeDataUrl = await QRCode.toDataURL(landingUrl, {
        margin: 0,
        scale: 6,
        errorCorrectionLevel: "M",
        color: {
          dark: accentDark,
          light: "#FFFFFFFF",
        },
      });
    } catch (qrError) {
      console.warn("Failed to render referral QR code:", qrError);
      qrCodeDataUrl = null;
    }
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: ${tone.bodyFont}; background-color: ${tone.baseBackground}; color: ${tone.bodyText};">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">
    ${preheaderText}
  </span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${tone.baseBackground}; background-image: ${backgroundTexture}; background-repeat: no-repeat; background-size: cover; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: ${tone.cardBackground}; border-radius: 20px; border: 1px solid ${tone.borderColor}; box-shadow: ${containerShadow}; overflow: hidden;">
          <tr>
            <td style="background-color: ${tone.cardBackground}; padding: 18px 32px; border-bottom: 1px solid ${tone.borderColor};">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <a href="${siteUrl}" style="text-decoration: none; display: inline-flex; align-items: center; gap: 12px;">
                      ${
                        emailLogoUrl
                          ? `<img src="${emailLogoUrl}" alt="${businessName}" style="height: 42px; width: 42px; border-radius: 12px; object-fit: cover; border: 2px solid ${hexToRgba(
                              brandHighlight,
                              0.18,
                            )};" />`
                          : `<div style="height: 42px; width: 42px; border-radius: 12px; background: ${hexToRgba(
                              brandHighlight,
                              0.12,
                            )}; display: flex; align-items: center; justify-content: center; color: ${tone.heroText}; font-weight: 700; font-size: 16px;">${businessName
                              .charAt(0)
                              .toUpperCase()}</div>`
                      }
                      <span style="font-size: 16px; font-weight: 700; color: ${tone.heroText}; font-family: ${tone.headingFont};">${businessName}</span>
                    </a>
                  </td>
                  <td align="right">
                    <a href="${landingUrl}" style="font-size: 12px; color: ${viewInBrowserColor}; text-decoration: none; letter-spacing: 0.08em;">
                      View in browser
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px 24px 40px;">
              <h1 style="margin: 0 0 12px 0; color: ${tone.heroText}; font-size: 32px; font-weight: 900; font-family: ${tone.headingFont}; line-height: 1.2;">
                ${campaignName || "You're Invited to Join Our Ambassador Program"}
              </h1>
              <p style="margin: 0 0 24px 0; color: ${tone.bodyText}; font-size: 17px; font-family: ${tone.bodyFont}; line-height: 1.6;">
                Earn ${clientReward} for every friend you refer. Your friends get ${newUserReward}. It's a win-win!
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              ${campaignParagraphs}

              <!-- Main CTA Card -->
              <div style="margin: 0 0 24px 0; border-radius: 24px; border: 2px solid ${accentBorderColor}; background: linear-gradient(135deg, ${accentSoft} 0%, ${tone.cardBackground} 100%); padding: 32px; text-align: center; box-shadow: ${highlightCardShadow};">
                <p style="margin: 0 0 6px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.2em; color: ${tone.highlightLabelColor}; font-weight: 800;">
                  Your Unique Referral Link
                </p>
                <h2 style="margin: 0 0 20px 0; color: ${tone.heroText}; font-size: 22px; font-weight: 800; font-family: ${tone.headingFont};">
                  Share & Earn Rewards
                </h2>

                <!-- Referral Link Display -->
                <div style="margin: 0 0 20px 0; border-radius: 16px; background: ${tone.cardBackground}; border: 2px solid ${hexToRgba(brandHighlight, 0.3)}; padding: 18px 20px; text-align: center;">
                  <a href="${landingUrl}" target="_blank" rel="noopener noreferrer" style="color: ${brandHighlight}; font-weight: 700; font-size: 15px; text-decoration: none; word-break: break-all; font-family: 'SFMono-Regular', 'Consolas', 'Monaco', monospace; display: block;">
                    ${escapeHtml(referralLink)}
                  </a>
                </div>

                <!-- Share Button -->
                ${renderButton({
                  url: landingUrl,
                  label: "📧 Share Your Link Now",
                  background: heroButtonGradient,
                  textColor: tone.primaryButtonText,
                  shadow: heroButtonShadow,
                  borderColor: hexToRgba(brandHighlight, 0.6),
                  fontFamily: tone.headingFont,
                  fullWidth: true,
                })}

                <p style="margin: 16px 0 0 0; font-size: 13px; color: ${tone.mutedText}; line-height: 1.5;">
                  Copy the link above or tap the button to share via email, text, or social media
                </p>
              </div>

              ${
                qrCodeDataUrl
                  ? `<!-- QR Code Section -->
              <div style="margin: 0 0 24px 0; border-radius: 20px; border: 1px solid ${tone.borderColor}; background: ${tone.surfaceBackground}; padding: 24px; text-align: center;">
                <p style="margin: 0 0 16px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: ${tone.labelColor}; font-weight: 700;">
                  Or Share With QR Code
                </p>
                <div style="display: inline-block; border-radius: 18px; border: 2px solid ${hexToRgba(brandHighlight, 0.2)}; padding: 16px; background: ${tone.cardBackground}; box-shadow: 0 8px 20px ${hexToRgba(accentDark, 0.12)};">
                  <img src="${qrCodeDataUrl}" alt="Referral QR code" style="width: 160px; height: 160px; display: block;" />
                </div>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: ${tone.bodyText};">
                  Share this QR code in-store or on social media
                </p>
              </div>`
                  : ""
              }

              ${storyBlocksHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <!-- Ambassador Portal Section -->
              <div style="margin: 0 0 20px 0; border-radius: 20px; border: 1px solid ${tone.borderColor}; background: ${tone.surfaceBackground}; padding: 24px; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: ${tone.heroText}; font-size: 18px; font-weight: 800; font-family: ${tone.headingFont};">
                  Track Your Rewards
                </h3>
                <p style="margin: 0 0 16px 0; color: ${tone.bodyText}; font-size: 14px; line-height: 1.6;">
                  Monitor your referrals, track earnings, and request payouts from your ambassador dashboard
                </p>
                ${renderButton({
                  url: ambassadorPortalUrl,
                  label: "Open Ambassador Portal",
                  background: portalButtonGradient,
                  textColor: tone.portalButtonText,
                  shadow: portalButtonShadow,
                  borderColor: hexToRgba(brandHighlight, 0.4),
                  fontFamily: tone.bodyFont,
                  fullWidth: true,
                })}
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${tone.supportingSurfaceBackground}; padding: 30px 40px; text-align: center; border-top: 1px solid ${tone.borderColor};">
              <p style="margin: 0 0 4px 0; color: ${tone.footerTextColor}; font-size: 13px; font-weight: 600;">
                ${businessName}
              </p>
              <p style="margin: 0 0 4px 0; color: ${tone.footerMutedText}; font-size: 12px;">
                <a href="${siteUrl}" style="color: ${viewInBrowserColor}; text-decoration: none;">${websiteLabel}</a>
              </p>
              ${
                snapshot.rewardTerms
                  ? `<p style="margin: 0; color: ${tone.footerMutedText}; font-size: 11px;">${snapshot.rewardTerms}</p>`
                  : ""
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    html,
    text: textBody,
    preheader: preheaderText,
  };
}
