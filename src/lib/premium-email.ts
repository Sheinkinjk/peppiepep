type PremiumEmailCTA = {
  label: string;
  url: string;
};

type PremiumEmailOptions = {
  title: string;
  subtitle?: string | null;
  preheader?: string | null;
  bodyHtml: string;
  cta?: PremiumEmailCTA | null;
  footerNote?: string | null;
  brandName?: string | null;
  logoUrl?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderButton(cta: PremiumEmailCTA) {
  const href = escapeHtml(cta.url);
  const label = escapeHtml(cta.label);
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0 0 0;">
      <tr>
        <td style="border-radius:14px;background:linear-gradient(135deg,#0abab5,#24d9e2);padding:0;">
          <a href="${href}" target="_blank" rel="noopener noreferrer"
             style="display:inline-block;padding:14px 30px;border-radius:14px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.02em;">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function buildPremiumEmail({
  title,
  subtitle,
  preheader,
  bodyHtml,
  cta,
  footerNote,
  brandName,
  logoUrl,
}: PremiumEmailOptions) {
  const safeTitle = escapeHtml(title);
  const safeSubtitle = subtitle ? escapeHtml(subtitle) : "";
  const safeBrandName = escapeHtml(brandName ?? "Refer Labs");
  const headerBadge = logoUrl
    ? `<img src="${logoUrl}" alt="${safeBrandName}" style="width:42px;height:42px;border-radius:12px;object-fit:cover;border:2px solid rgba(255,255,255,0.4);" />`
    : `<div style="width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;">${safeBrandName
        .charAt(0)
        .toUpperCase()}</div>`;
  const preview = preheader ? escapeHtml(preheader) : "";
  const footerCopy = footerNote
    ? `<p style="margin:12px 0 0;color:#94a3b8;font-size:12px;">${escapeHtml(footerNote)}</p>`
    : "";

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#f3f7f8;font-family:Inter,system-ui,-apple-system,sans-serif;color:#0f172a;">
      <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;">${preview}</span>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f7f8;padding:36px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px;background:#ffffff;border-radius:24px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 24px 60px rgba(15,23,42,0.08);">
              <tr>
                <td style="padding:28px 32px;background:linear-gradient(135deg,#0abab5,#24d9e2);color:#ffffff;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:12px;">
                          ${headerBadge}
                          <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.24em;font-weight:700;opacity:0.95;">
                            ${safeBrandName}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:16px;">
                        <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:800;">${safeTitle}</h1>
                        ${safeSubtitle ? `<p style="margin:10px 0 0;font-size:15px;opacity:0.92;line-height:1.5;">${safeSubtitle}</p>` : ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 32px 34px 32px;">
                  <div style="font-size:14px;line-height:1.7;color:#0f172a;">
                    ${bodyHtml}
                  </div>
                  ${cta ? renderButton(cta) : ""}
                </td>
              </tr>
            </table>
            <div style="max-width:640px;margin:14px auto 0;text-align:center;color:#94a3b8;font-size:12px;">
              Sent by ${safeBrandName}
              ${footerCopy}
            </div>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
