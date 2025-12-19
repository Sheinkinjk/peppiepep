'use client'

import { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  learnContent: ReactNode
  implementContent: ReactNode
  /** Whether to make the learn column sticky (default: true) */
  stickyLearn?: boolean
}

/**
 * Two-column layout for dashboard steps
 * Left: Educational content (Learn)
 * Right: Implementation area (Implement)
 */
export function TwoColumnLayout({
  learnContent,
  implementContent,
  stickyLearn = true,
}: TwoColumnLayoutProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,380px)_1fr] xl:grid-cols-[minmax(360px,420px)_1fr]">
      {/* Left Column: Learn */}
      <div className={stickyLearn ? 'lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto' : ''}>
        <div className="space-y-4">
          {learnContent}
        </div>
      </div>

      {/* Right Column: Implement */}
      <div className="space-y-6 min-w-0">
        {implementContent}
      </div>
    </div>
  )
}
