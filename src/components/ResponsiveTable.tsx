import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTableProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive table wrapper that handles overflow and scroll on mobile
 * Provides horizontal scroll with shadow indicators
 */
export function ResponsiveTableWrapper({ children, className }: ResponsiveTableProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Scroll container */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Shadow indicators for scroll */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden" />

        {/* Minimum width to prevent extreme compression */}
        <div className="min-w-[600px]">
          {children}
        </div>
      </div>

      {/* Mobile hint */}
      <p className="text-xs text-gray-500 mt-2 md:hidden">
        ← Scroll horizontally to see more →
      </p>
    </div>
  );
}

/**
 * Mobile-optimized table cell that truncates on small screens
 */
export function ResponsiveCell({ children, className, truncate = false }: {
  children: ReactNode;
  className?: string;
  truncate?: boolean;
}) {
  return (
    <div className={cn(
      truncate && "truncate max-w-[150px] md:max-w-none",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * Hide columns on mobile/tablet using responsive classes
 */
export function HideOnMobile({ children }: { children: ReactNode }) {
  return <div className="hidden md:block">{children}</div>;
}

export function HideOnTablet({ children }: { children: ReactNode }) {
  return <div className="hidden lg:block">{children}</div>;
}

/**
 * Show only on mobile
 */
export function ShowOnMobile({ children }: { children: ReactNode }) {
  return <div className="block md:hidden">{children}</div>;
}
