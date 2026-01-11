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
    </head>
    <body style="margin:0;padding:0;">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New account created: ${safeBusinessName} (${safeEmail})</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
        <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
          <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">🎉 New Account Created</p>
          <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${safeBusinessName}</h1>
          <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${safeEmail}</p>
        </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
        <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Account Details</h2>
        <ul style="list-style:none;padding:0;margin:0 0 16px;">
          <li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></li>
          <li style="margin:6px 0;"><strong>Business Name:</strong> ${safeBusinessName === "New User" ? "Not provided yet" : safeBusinessName}</li>
          <li style="margin:6px 0;"><strong>Created:</strong> ${new Date(userData.createdAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
        </ul>
        <div style="margin-top:24px;padding:16px;border-radius:16px;background:#f1f5f9;border:1px solid #e2e8f0;">
          <p style="margin:0;font-weight:600;color:#0f172a;">Next Steps</p>
          <p style="margin:6px 0 0;font-size:14px;color:#475569;">This user can now access their dashboard and start setting up their referral program. Consider reaching out to welcome them and offer onboarding assistance.</p>
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
    </head>
    <body style="margin:0;padding:0;">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New chatbot conversation from ${safeFirstName} (${safeEmail})</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
        <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
          <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">💬 New Chatbot Conversation</p>
          <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${safeFirstName}</h1>
          <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${safeEmail}</p>
        </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
        <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Conversation Started</h2>
        <ul style="list-style:none;padding:0;margin:0 0 16px;">
          <li style="margin:6px 0;"><strong>Name:</strong> ${safeFirstName}</li>
          <li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></li>
          <li style="margin:6px 0;"><strong>Time:</strong> ${new Date(leadData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
        </ul>
        <div style="margin-top:16px;padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;">
          <p style="margin:0 0 8px;font-weight:600;font-size:14px;color:#64748b;">First Message:</p>
          <p style="margin:0;color:#475569;white-space:pre-wrap;">${safeFirstMessage}</p>
        </div>
        <div style="margin-top:24px;padding:16px;border-radius:16px;background:#ecfdf5;border:1px solid #bbf7d0;">
          <p style="margin:0;font-weight:600;color:#065f46;">Opportunity</p>
          <p style="margin:6px 0 0;font-size:14px;color:#047857;">This is a warm lead who initiated a conversation. Consider reaching out within 24 hours to maximize conversion potential.</p>
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
    </head>
    <body style="margin:0;padding:0;">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New newsletter subscriber: ${safeEmail} from ${safeSource}</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
        <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
          <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">📰 Newsletter Signup</p>
          <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;">New Subscriber</h1>
          <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${safeEmail}</p>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
          <ul style="list-style:none;padding:0;margin:0 0 16px;">
            <li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></li>
            <li style="margin:6px 0;"><strong>Source:</strong> ${safeSource}</li>
            <li style="margin:6px 0;"><strong>Subscribed:</strong> ${new Date(subscription.createdAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
          </ul>
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
    </head>
    <body style="margin:0;padding:0;">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">Onboarding progress: ${safeBusinessName} has saved their configuration</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
        <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
          <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">📋 Onboarding Progress</p>
          <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${safeBusinessName}</h1>
          <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${safeUserEmail}</p>
        </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
        <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Snapshot Saved</h2>
        <p style="margin:0 0 16px;color:#475569;font-size:14px;">User has saved their onboarding configuration. Here's what they've set up:</p>
        <ul style="list-style:none;padding:0;margin:0 0 16px;">
          <li style="margin:6px 0;"><strong>Business Name:</strong> ${safeBusinessName}</li>
          ${safeBusinessType ? `<li style="margin:6px 0;"><strong>Business Type:</strong> ${safeBusinessType}</li>` : ""}
          ${safeWebsiteUrl ? `<li style="margin:6px 0;"><strong>Website:</strong> <a href="${safeWebsiteUrl}" target="_blank" rel="noopener noreferrer">${safeWebsiteUrl}</a></li>` : ""}
          ${safePlatform ? `<li style="margin:6px 0;"><strong>Platform:</strong> ${safePlatform}</li>` : ""}
          ${safeCRM ? `<li style="margin:6px 0;"><strong>CRM:</strong> ${safeCRM}</li>` : ""}
          ${snapshotData.avgSale ? `<li style="margin:6px 0;"><strong>Avg Sale:</strong> $${snapshotData.avgSale}</li>` : ""}
          ${snapshotData.referralGoal ? `<li style="margin:6px 0;"><strong>Referral Goal:</strong> ${snapshotData.referralGoal} referrals/month</li>` : ""}
          <li style="margin:6px 0;"><strong>Saved:</strong> ${new Date(snapshotData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
        </ul>
        <div style="margin-top:24px;padding:16px;border-radius:16px;background:#fef3c7;border:1px solid #fbbf24;">
          <p style="margin:0;font-weight:600;color:#92400e;">User is progressing!</p>
          <p style="margin:6px 0 0;font-size:14px;color:#b45309;">This user is actively configuring their program. Consider checking in to ensure they're not blocked on any integrations.</p>
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
    </head>
    <body style="margin:0;padding:0;">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">Admin login alert: ${safeEmail} logged in from ${safeIp}</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
        <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
          <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">🔐 Dashboard Login</p>
          <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${safeEmail}</h1>
          <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${formattedTime}</p>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
          <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Login Details</h2>
          <ul style="list-style:none;padding:0;margin:0 0 16px;">
            <li style="margin:6px 0;"><strong>User:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></li>
            <li style="margin:6px 0;"><strong>IP Address:</strong> ${safeIp}</li>
            <li style="margin:6px 0;"><strong>Browser:</strong> ${safeAgent}</li>
          </ul>
          <div style="margin-top:24px;padding:16px;border-radius:16px;background:#f1f5f9;border:1px solid #e2e8f0;">
            <p style="margin:0;font-weight:600;color:#0f172a;">Security note</p>
            <p style="margin:6px 0 0;font-size:14px;color:#475569;">
              If this login looks unfamiliar, follow up with the user and reset their credentials.
            </p>
          </div>
          ${buildNotificationFooter()}
        </div>
      </div>
    </body>
    </html>
  `;
}
