'use client'

import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { HelpCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface InlineExplainerProps {
  /** The help text to display when expanded */
  children: React.ReactNode
  /** Optional custom trigger text (defaults to "How does this work?") */
  triggerText?: string
  /** Start in expanded state */
  defaultOpen?: boolean
  /** Optional className for the container */
  className?: string
}

/**
 * Inline contextual explainer with true binary states:
 * - Collapsed: Shows only icon + trigger text (minimal)
 * - Expanded: Shows full explanation content
 *
 * Use this next to specific features/sections for contextual help
 */
export function InlineExplainer({
  children,
  triggerText = "How does this work?",
  defaultOpen = false,
  className
}: InlineExplainerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn("my-3", className)}>
      <CollapsibleTrigger className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors group">
        <HelpCircle className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium">{triggerText}</span>
        <ChevronDown className={cn(
          "h-3.5 w-3.5 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-3 pl-6 pr-2 py-3 bg-blue-50/50 border-l-2 border-blue-200 rounded-r text-sm text-slate-700 leading-relaxed">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
