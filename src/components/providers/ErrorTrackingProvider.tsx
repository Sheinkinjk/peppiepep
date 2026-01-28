"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  initErrorTracking,
  addBreadcrumb,
  setUser,
  captureError,
} from "@/lib/error-tracking";

interface ErrorTrackingProviderProps {
  children: ReactNode;
  user?: {
    id: string;
    email?: string;
    name?: string;
  } | null;
}

export function ErrorTrackingProvider({
  children,
  user,
}: ErrorTrackingProviderProps) {
  const pathname = usePathname();

  // Initialize error tracking on mount
  useEffect(() => {
    initErrorTracking();
  }, []);

  // Track route changes
  useEffect(() => {
    addBreadcrumb("navigation", `Navigated to ${pathname}`, {
      url: pathname,
    });
  }, [pathname]);

  // Set user context when user changes
  useEffect(() => {
    if (user) {
      setUser(user);
      addBreadcrumb("auth", "User context set", {
        userId: user.id,
      });
    }
  }, [user]);

  // Set up global fetch error tracking
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const [url, options] = args;
      const method = options?.method || "GET";
      const urlString = typeof url === "string" ? url : url.toString();

      try {
        const response = await originalFetch(...args);

        // Track failed API calls (but not 4xx client errors)
        if (!response.ok && response.status >= 500) {
          addBreadcrumb("fetch", `API error: ${method} ${urlString}`, {
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response;
      } catch (error) {
        // Track network errors
        captureError(error as Error, {
          action: "fetch",
          metadata: {
            url: urlString,
            method,
          },
        });
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return <>{children}</>;
}

/**
 * Hook to track user actions
 */
export function useTrackAction() {
  return (action: string, data?: Record<string, unknown>) => {
    addBreadcrumb("action", action, data);
  };
}

/**
 * Hook to track errors
 */
export function useTrackError() {
  return (error: Error, context?: Record<string, unknown>) => {
    captureError(error, { metadata: context });
  };
}
