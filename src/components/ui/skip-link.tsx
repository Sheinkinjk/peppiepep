"use client";

/**
 * Skip Link component for keyboard users to skip repetitive navigation
 * Place at the very top of your page layout
 */
export function SkipLink({
  targetId = "main-content",
  children = "Skip to main content",
}: {
  targetId?: string;
  children?: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      {children}
    </a>
  );
}

/**
 * Main content landmark wrapper
 * Use this to wrap your main content area with proper ARIA roles
 */
export function MainContent({
  children,
  id = "main-content",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <main id={id} role="main" aria-label="Main content" className={className}>
      {children}
    </main>
  );
}

/**
 * Region landmark for important page sections
 */
export function Section({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <section role="region" aria-label={label} className={className}>
      {children}
    </section>
  );
}
