/**
 * Email notification helper using Resend API
 * Sends automated notifications to jarred@referlabs.com.au for key events
 */

// SECURITY FIX: HTML escape function to prevent XSS in emails
export function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

type EmailParams = {
  subject: string;
  html: string;
  from?: string;
  to?: string;
};

export async function sendAdminNotification({
  subject,
  html,
  from,
  to,
}: EmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const resendFrom = from || process.env.RESEND_FROM_EMAIL?.trim() || "Refer Labs <jarred@referlabs.com.au>";
    const resendTo = to || "jarred@referlabs.com.au";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return { success: false, error: "Email service not configured" };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [resendTo],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Resend API error:", errorData);
      return { success: false, error: `Resend API returned ${response.status}` };
    }

    const data = await response.json();
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Email template for new account registration
 */
export function buildNewAccountEmail(userData: {
  email: string;
  businessName?: string;
  createdAt: string;
}): string {
  // SECURITY FIX: Escape all user-generated content
  const safeEmail = escapeHtml(userData.email);
  const safeBusinessName = escapeHtml(userData.businessName) || "New User";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media (prefers-color-scheme: dark) {
          .email-container { background-color: #1a1a1a !important; }
          .email-card { background-color: #2d2d2d !important; border-color: #404040 !important; }
          .text-primary { color: #ffffff !important; }
          .text-secondary { color: #d1d5db !important; }
          .text-muted { color: #9ca3af !important; }
          .card-highlight { background-color: #374151 !important; border-color: #4b5563 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;" class="email-container">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New account created: ${safeBusinessName} (${safeEmail})</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;box-shadow:0 4px 12px rgba(10,186,181,0.25);">
          <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
            <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">🎉 New Account Created</p>
          </div>
          <h1 style="margin:0 0 8px 0;font-size:32px;font-weight:900;line-height:1.2;">${safeBusinessName}</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${safeEmail}</p>
        </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="email-card">
        <h2 style="margin-top:0;font-size:20px;font-weight:700;color:#0f172a;" class="text-primary">Account Details</h2>
        <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;" class="card-highlight">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;color:#475569;" class="text-secondary">
                <strong style="color:#0f172a;display:block;margin-bottom:4px;" class="text-primary">Email</strong>
                <a href="mailto:${safeEmail}" style="color:#0abab5;text-decoration:none;font-size:14px;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#475569;" class="text-secondary">
                <strong style="color:#0f172a;display:block;margin-bottom:4px;" class="text-primary">Business Name</strong>
                <span style="font-size:14px;">${safeBusinessName === "New User" ? "Not provided yet" : safeBusinessName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#475569;" class="text-secondary">
                <strong style="color:#0f172a;display:block;margin-bottom:4px;" class="text-primary">Created</strong>
                <span style="font-size:14px;">${new Date(userData.createdAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</span>
              </td>
            </tr>
          </table>
        </div>
        <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #86efac;box-shadow:0 2px 8px rgba(134,239,172,0.2);">
          <div style="display:flex;align-items:center;margin-bottom:8px;">
            <span style="font-size:24px;margin-right:12px;">🚀</span>
            <p style="margin:0;font-weight:700;font-size:16px;color:#065f46;">Next Steps</p>
          </div>
          <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">This user can now access their dashboard and start setting up their referral program. Consider reaching out to welcome them and offer onboarding assistance.</p>
        </div>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
          <p style="margin:0 0 8px 0;font-size:12px;color:#64748b;">
            Pepform Pty Ltd (trading as Refer Labs)<br>
            ABN: 32 660 008 159<br>
            <a href="https://referlabs.com.au" style="color:#0abab5;text-decoration:none;">referlabs.com.au</a>
          </p>
          <p style="margin:8px 0 0 0;font-size:11px;color:#94a3b8;">
            <a href="https://referlabs.com.au/contact?subject=Unsubscribe" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> |
            <a href="https://referlabs.com.au/privacy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
    </body>
    </html>
  `;
}

/**
 * Standard email footer for notification emails
 */
function buildNotificationFooter(): string {
  return `
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
          <p style="margin:0 0 8px 0;font-size:12px;color:#64748b;">
            Pepform Pty Ltd (trading as Refer Labs)<br>
            ABN: 32 660 008 159<br>
            <a href="https://referlabs.com.au" style="color:#0abab5;text-decoration:none;">referlabs.com.au</a>
          </p>
          <p style="margin:8px 0 0 0;font-size:11px;color:#94a3b8;">
            <a href="https://referlabs.com.au/contact?subject=Unsubscribe" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> |
            <a href="https://referlabs.com.au/privacy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
          </p>
        </div>
  `;
}

/**
 * Email template for chatbot conversation start
 */
export function buildChatbotLeadEmail(leadData: {
  firstName: string;
  email: string;
  firstMessage: string;
  timestamp: string;
}): string {
  const safeFirstName = escapeHtml(leadData.firstName);
  const safeEmail = escapeHtml(leadData.email);
  const safeFirstMessage = escapeHtml(leadData.firstMessage);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media (prefers-color-scheme: dark) {
          .email-container { background-color: #1a1a1a !important; }
          .email-card { background-color: #2d2d2d !important; border-color: #404040 !important; }
          .text-primary { color: #ffffff !important; }
          .text-secondary { color: #d1d5db !important; }
          .text-muted { color: #9ca3af !important; }
          .card-highlight { background-color: #374151 !important; border-color: #4b5563 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;" class="email-container">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New chatbot conversation from ${safeFirstName} (${safeEmail})</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;box-shadow:0 4px 12px rgba(10,186,181,0.25);">
          <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
            <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">💬 New Chatbot Conversation</p>
          </div>
          <h1 style="margin:0 0 8px 0;font-size:32px;font-weight:900;line-height:1.2;">${safeFirstName}</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${safeEmail}</p>
        </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="email-card">
        <h2 style="margin-top:0;font-size:20px;font-weight:700;color:#0f172a;" class="text-primary">Conversation Started</h2>
        <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;border-left:4px solid #0abab5;" class="card-highlight">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;">
                <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Name</strong>
                <span style="font-size:14px;color:#475569;" class="text-secondary">${safeFirstName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Email</strong>
                <a href="mailto:${safeEmail}" style="color:#0abab5;text-decoration:none;font-size:14px;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Time</strong>
                <span style="font-size:14px;color:#475569;" class="text-secondary">${new Date(leadData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</span>
              </td>
            </tr>
          </table>
        </div>
        <div style="margin-top:20px;padding:20px;border-radius:16px;background:#fafafa;border:2px dashed #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.04);" class="card-highlight">
          <div style="margin-bottom:12px;">
            <span style="font-size:20px;margin-right:8px;">💭</span>
            <strong style="font-size:14px;color:#64748b;" class="text-muted">First Message</strong>
          </div>
          <p style="margin:0;color:#0f172a;white-space:pre-wrap;line-height:1.6;font-size:14px;" class="text-primary">${safeFirstMessage}</p>
        </div>
        <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #86efac;box-shadow:0 2px 8px rgba(134,239,172,0.2);">
          <div style="display:flex;align-items:center;margin-bottom:8px;">
            <span style="font-size:24px;margin-right:12px;">⚡</span>
            <strong style="font-size:16px;color:#065f46;">Hot Lead Alert</strong>
          </div>
          <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">This is a warm lead who initiated a conversation. Consider reaching out within 24 hours to maximize conversion potential.</p>
        </div>
        ${buildNotificationFooter()}
      </div>
    </div>
    </body>
    </html>
  `;
}

/**
 * Email template for newsletter subscription
 */
export function buildNewsletterSubscriptionEmail(subscription: {
  email: string;
  source: string;
  createdAt: string;
}): string {
  const safeEmail = escapeHtml(subscription.email);
  const safeSource = escapeHtml(subscription.source);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media (prefers-color-scheme: dark) {
          .email-container { background-color: #1a1a1a !important; }
          .email-card { background-color: #2d2d2d !important; border-color: #404040 !important; }
          .text-primary { color: #ffffff !important; }
          .text-secondary { color: #d1d5db !important; }
          .card-highlight { background-color: #374151 !important; border-color: #4b5563 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;" class="email-container">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New newsletter subscriber: ${safeEmail} from ${safeSource}</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;box-shadow:0 4px 12px rgba(10,186,181,0.25);">
          <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
            <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">📰 Newsletter Signup</p>
          </div>
          <h1 style="margin:0 0 8px 0;font-size:32px;font-weight:900;line-height:1.2;">New Subscriber</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${safeEmail}</p>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="email-card">
          <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;border-left:4px solid #7c3aed;" class="card-highlight">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Email</strong>
                  <a href="mailto:${safeEmail}" style="color:#0abab5;text-decoration:none;font-size:14px;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Source</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safeSource}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Subscribed</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${new Date(subscription.createdAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</span>
                </td>
              </tr>
            </table>
          </div>
          ${buildNotificationFooter()}
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email template for onboarding snapshot saved
 */
export function buildOnboardingSnapshotEmail(snapshotData: {
  businessName: string;
  userEmail: string;
  businessType?: string;
  websiteUrl?: string;
  websitePlatform?: string;
  crmPlatform?: string;
  avgSale?: number;
  referralGoal?: number;
  timestamp: string;
}): string {
  const safeBusinessName = escapeHtml(snapshotData.businessName);
  const safeUserEmail = escapeHtml(snapshotData.userEmail);
  const safeBusinessType = escapeHtml(snapshotData.businessType || '');
  const safeWebsiteUrl = escapeHtml(snapshotData.websiteUrl || '');
  const safePlatform = escapeHtml(snapshotData.websitePlatform || '');
  const safeCRM = escapeHtml(snapshotData.crmPlatform || '');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media (prefers-color-scheme: dark) {
          .email-container { background-color: #1a1a1a !important; }
          .email-card { background-color: #2d2d2d !important; border-color: #404040 !important; }
          .text-primary { color: #ffffff !important; }
          .text-secondary { color: #d1d5db !important; }
          .card-highlight { background-color: #374151 !important; border-color: #4b5563 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;" class="email-container">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">Onboarding progress: ${safeBusinessName} has saved their configuration</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;box-shadow:0 4px 12px rgba(10,186,181,0.25);">
          <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
            <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">📋 Onboarding Progress</p>
          </div>
          <h1 style="margin:0 0 8px 0;font-size:32px;font-weight:900;line-height:1.2;">${safeBusinessName}</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${safeUserEmail}</p>
        </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="email-card">
        <h2 style="margin-top:0;font-size:20px;font-weight:700;color:#0f172a;" class="text-primary">Configuration Saved</h2>
        <p style="margin:0 0 20px;color:#475569;font-size:14px;line-height:1.6;" class="text-secondary">User has saved their onboarding configuration. Here's what they've set up:</p>
        <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;border-left:4px solid #f59e0b;" class="card-highlight">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Business Name:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">${safeBusinessName}</span></td>
            </tr>
            ${safeBusinessType ? `<tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Business Type:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">${safeBusinessType}</span></td></tr>` : ""}
            ${safeWebsiteUrl ? `<tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Website:</strong> <a href="${safeWebsiteUrl}" target="_blank" style="color:#0abab5;text-decoration:none;font-size:14px;">${safeWebsiteUrl}</a></td></tr>` : ""}
            ${safePlatform ? `<tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Platform:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">${safePlatform}</span></td></tr>` : ""}
            ${safeCRM ? `<tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">CRM:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">${safeCRM}</span></td></tr>` : ""}
            ${snapshotData.avgSale ? `<tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Avg Sale:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">$${snapshotData.avgSale}</span></td></tr>` : ""}
            ${snapshotData.referralGoal ? `<tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Referral Goal:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">${snapshotData.referralGoal} referrals/month</span></td></tr>` : ""}
            <tr><td style="padding:8px 0;"><strong style="color:#0f172a;font-size:13px;" class="text-primary">Saved:</strong> <span style="font-size:14px;color:#475569;" class="text-secondary">${new Date(snapshotData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</span></td></tr>
          </table>
        </div>
        <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:2px solid #fbbf24;box-shadow:0 2px 8px rgba(251,191,36,0.2);">
          <div style="display:flex;align-items:center;margin-bottom:8px;">
            <span style="font-size:24px;margin-right:12px;">🎯</span>
            <strong style="font-size:16px;color:#92400e;">User is progressing!</strong>
          </div>
          <p style="margin:0;font-size:14px;color:#b45309;line-height:1.6;">This user is actively configuring their program. Consider checking in to ensure they're not blocked on any integrations.</p>
        </div>
        ${buildNotificationFooter()}
      </div>
    </div>
    </body>
    </html>
  `;
}


/**
 * Email template for admin login alert
 */
export function buildAdminLoginAlertEmail(loginData: {
  email: string;
  timestamp: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}): string {
  const safeEmail = escapeHtml(loginData.email);
  const safeIp = escapeHtml(loginData.ipAddress || "Unknown");
  const safeAgent = escapeHtml(loginData.userAgent || "Unknown");
  const formattedTime = new Date(loginData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media (prefers-color-scheme: dark) {
          .email-container { background-color: #1a1a1a !important; }
          .email-card { background-color: #2d2d2d !important; border-color: #404040 !important; }
          .text-primary { color: #ffffff !important; }
          .text-secondary { color: #d1d5db !important; }
          .card-highlight { background-color: #374151 !important; border-color: #4b5563 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;" class="email-container">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">Admin login alert: ${safeEmail} logged in from ${safeIp}</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;box-shadow:0 4px 12px rgba(10,186,181,0.25);">
          <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
            <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">🔐 Dashboard Login</p>
          </div>
          <h1 style="margin:0 0 8px 0;font-size:32px;font-weight:900;line-height:1.2;">${safeEmail}</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${formattedTime}</p>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="email-card">
          <h2 style="margin-top:0;font-size:20px;font-weight:700;color:#0f172a;" class="text-primary">Login Details</h2>
          <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;border-left:4px solid #3b82f6;" class="card-highlight">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">User</strong>
                  <a href="mailto:${safeEmail}" style="color:#0abab5;text-decoration:none;font-size:14px;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">IP Address</strong>
                  <span style="font-size:14px;font-family:monospace;color:#475569;" class="text-secondary">${safeIp}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Browser</strong>
                  <span style="font-size:13px;color:#475569;" class="text-secondary">${safeAgent}</span>
                </td>
              </tr>
            </table>
          </div>
          <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border:2px solid #cbd5e1;box-shadow:0 2px 6px rgba(203,213,225,0.3);">
            <div style="display:flex;align-items:center;margin-bottom:8px;">
              <span style="font-size:24px;margin-right:12px;">⚠️</span>
              <strong style="font-size:16px;color:#0f172a;" class="text-primary">Security Note</strong>
            </div>
            <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;" class="text-secondary">
              If this login looks unfamiliar, follow up with the user and reset their credentials immediately.
            </p>
          </div>
          ${buildNotificationFooter()}
        </div>
      </div>
    </body>
    </html>
  `;
}
