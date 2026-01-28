/**
 * Accessibility utilities for better screen reader support and keyboard navigation
 */

import { useCallback, useEffect, useRef } from "react";

/**
 * Announce a message to screen readers using an ARIA live region
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
): void {
  if (typeof document === "undefined") return;

  // Find or create the live region
  let liveRegion = document.getElementById("sr-announcer");

  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.id = "sr-announcer";
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", priority);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    // Visually hidden but available to screen readers
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);
  }

  // Update the priority if needed
  liveRegion.setAttribute("aria-live", priority);

  // Clear and set new message (triggers screen reader announcement)
  liveRegion.textContent = "";
  // Small delay to ensure screen readers pick up the change
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, 100);
}

/**
 * Hook to trap focus within a container (for modals, dialogs)
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the first element
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus when the trap is deactivated
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Hook to handle keyboard navigation for lists/grids
 */
export function useArrowKeyNavigation<T extends HTMLElement>(
  items: T[],
  options: {
    orientation?: "horizontal" | "vertical" | "both";
    loop?: boolean;
    onSelect?: (index: number) => void;
  } = {}
) {
  const { orientation = "vertical", loop = true, onSelect } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, currentIndex: number) => {
      const isVertical = orientation === "vertical" || orientation === "both";
      const isHorizontal = orientation === "horizontal" || orientation === "both";

      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowUp":
          if (isVertical) {
            e.preventDefault();
            newIndex = currentIndex - 1;
          }
          break;
        case "ArrowDown":
          if (isVertical) {
            e.preventDefault();
            newIndex = currentIndex + 1;
          }
          break;
        case "ArrowLeft":
          if (isHorizontal) {
            e.preventDefault();
            newIndex = currentIndex - 1;
          }
          break;
        case "ArrowRight":
          if (isHorizontal) {
            e.preventDefault();
            newIndex = currentIndex + 1;
          }
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = items.length - 1;
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect?.(currentIndex);
          return;
        default:
          return;
      }

      // Handle looping
      if (loop) {
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
      }

      items[newIndex]?.focus();
    },
    [items, orientation, loop, onSelect]
  );

  return handleKeyDown;
}

/**
 * Hook to handle Escape key to close modals/dialogs
 */
export function useEscapeKey(onEscape: () => void, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, isActive]);
}

/**
 * Generate unique IDs for ARIA relationships
 */
let idCounter = 0;
export function generateAriaId(prefix: string = "aria"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * ARIA live region priorities
 */
export const ARIA_LIVE = {
  OFF: "off" as const,
  POLITE: "polite" as const,
  ASSERTIVE: "assertive" as const,
};

/**
 * Common ARIA labels for dashboard actions
 */
export const ARIA_LABELS = {
  // Navigation
  mainNav: "Main navigation",
  dashboardSections: "Dashboard sections",
  breadcrumb: "Breadcrumb navigation",

  // Actions
  close: "Close",
  expand: "Expand",
  collapse: "Collapse",
  submit: "Submit",
  save: "Save changes",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  copy: "Copy to clipboard",
  refresh: "Refresh",
  retry: "Retry",

  // Status
  loading: "Loading",
  error: "Error",
  success: "Success",
  required: "Required field",

  // Dashboard specific
  partnersTable: "Partners table",
  referralsTable: "Referrals table",
  campaignsTable: "Campaigns table",
  qaReadiness: "QA readiness checklist",
  settingsForm: "Program settings form",
  uploadForm: "File upload form",
};

/**
 * Skip link component props
 */
export interface SkipLinkProps {
  targetId: string;
  children?: React.ReactNode;
}

/**
 * CSS for visually hidden elements (but accessible to screen readers)
 */
export const visuallyHiddenStyles = `
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
