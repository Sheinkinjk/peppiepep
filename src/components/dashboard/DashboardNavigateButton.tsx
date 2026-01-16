"use client";

type DashboardNavigateButtonProps = {
  section: string;
  scrollTo?: string;
  className?: string;
  children: React.ReactNode;
};

export function DashboardNavigateButton({
  section,
  scrollTo,
  className,
  children,
}: DashboardNavigateButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("dashboard:navigate", {
            detail: { section, scrollTo },
          }),
        );
      }}
    >
      {children}
    </button>
  );
}

