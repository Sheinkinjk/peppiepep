"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap, useEscapeKey, announceToScreenReader } from "@/lib/accessibility";

interface AccessibleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export function AccessibleDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  initialFocusRef,
}: AccessibleDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useFocusTrap(isOpen);
  const titleId = `dialog-title-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const descriptionId = description
    ? `dialog-desc-${title.replace(/\s+/g, "-").toLowerCase()}`
    : undefined;

  // Handle escape key
  useEscapeKey(onClose, isOpen);

  // Announce dialog opening to screen readers
  useEffect(() => {
    if (isOpen) {
      announceToScreenReader(`${title} dialog opened`, "polite");

      // Focus initial element or first focusable
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      }
    }
  }, [isOpen, title, initialFocusRef]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={(node) => {
          // Combine refs
          if (node) {
            (dialogRef as any).current = node;
            (focusTrapRef as any).current = node;
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "relative w-full bg-white rounded-2xl shadow-xl",
          "animate-in zoom-in-95 fade-in duration-200",
          "max-h-[90vh] overflow-hidden flex flex-col",
          sizeClasses[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <h2
              id={titleId}
              className="text-xl font-bold text-slate-900"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-sm text-slate-600"
              >
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Dialog footer for action buttons
 */
export function DialogFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 pt-4 mt-4 border-t border-slate-200",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Confirmation dialog with accessible defaults
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  isLoading?: boolean;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AccessibleDialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={message}
      size="sm"
      initialFocusRef={cancelRef}
    >
      <DialogFooter>
        <button
          ref={cancelRef}
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={cn(
            "px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
            variant === "danger"
              ? "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500"
              : "bg-slate-900 hover:bg-slate-800 focus:ring-slate-500"
          )}
        >
          {isLoading ? "Loading..." : confirmLabel}
        </button>
      </DialogFooter>
    </AccessibleDialog>
  );
}
