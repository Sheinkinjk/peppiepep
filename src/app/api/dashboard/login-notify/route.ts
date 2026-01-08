/**
 * Dashboard Login Notification API
 * Sends an email to admin (jarred@referlabs.com.au) whenever a user accesses the dashboard
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { sendAdminNotification, buildAdminLoginAlertEmail } from "@/lib/email-notifications";

// Rate limiting: Track last notification per user (in-memory for simplicity)
// Key: user_id, Value: timestamp
const loginNotificationCache = new Map<string, number>();
const NOTIFICATION_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes cooldown between notifications per user

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Rate limiting: Check if we've recently sent a notification for this user
    const lastNotificationTime = loginNotificationCache.get(user.id);
    const now = Date.now();

    if (lastNotificationTime && (now - lastNotificationTime) < NOTIFICATION_COOLDOWN_MS) {
      // Too soon - skip notification but return success
      return NextResponse.json({
        success: true,
        skipped: true,
        message: "Notification skipped (rate limited)"
      });
    }

    // Get user details
    const userEmail = user.email || "Unknown user";

    // Get IP address and User Agent
    const ipAddress = request.headers.get("x-forwarded-for") ||
                     request.headers.get("x-real-ip") ||
                     "Unknown";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    // Build and send notification email
    const emailHtml = buildAdminLoginAlertEmail({
      email: userEmail,
      timestamp: new Date().toISOString(),
      ipAddress,
      userAgent,
    });

    const result = await sendAdminNotification({
      subject: `🔐 Dashboard Login: ${userEmail}`,
      html: emailHtml,
    });

    if (result.success) {
      // Update rate limiting cache
      loginNotificationCache.set(user.id, now);

      return NextResponse.json({
        success: true,
        message: "Login notification sent"
      });
    } else {
      console.error("Failed to send login notification:", result.error);
      return NextResponse.json(
        { error: "Failed to send notification", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Dashboard login notification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
