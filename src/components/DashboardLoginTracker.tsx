"use client";

import { useEffect, useState } from "react";

/**
 * Dashboard Login Tracker Component
 * Automatically sends a login notification to admin when user accesses dashboard
 * Only sends once per session to avoid spam
 */
export function DashboardLoginTracker() {
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    // Check if we've already sent notification in this session
    const sessionKey = "dashboard_login_notified";
    const alreadyNotified = sessionStorage.getItem(sessionKey);

    if (alreadyNotified) {
      return; // Already notified in this session
    }

    // Send login notification
    const sendNotification = async () => {
      try {
        const response = await fetch("/api/dashboard/login-notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Mark as notified for this session
          sessionStorage.setItem(sessionKey, "true");
          setNotificationSent(true);
        }
      } catch (error) {
        console.error("Failed to send dashboard login notification:", error);
        // Fail silently - don't block user experience
      }
    };

    // Send notification after a short delay to avoid blocking page load
    const timeoutId = setTimeout(sendNotification, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // This component doesn't render anything visible
  return null;
}
