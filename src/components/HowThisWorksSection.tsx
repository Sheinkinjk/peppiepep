'use client'

import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card } from "@/components/ui/card"
import { BookOpen, ChevronDown } from "lucide-react"

interface HowThisWorksSectionProps {
  title?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function HowThisWorksSection({
  title = "How does this step work?",
  children,
  defaultOpen = true
}: HowThisWorksSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <Card className="overflow-hidden border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CollapsibleTrigger className="w-full flex items-center gap-2 px-4 py-3 text-left font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100/50 transition-all group">
          <BookOpen className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-sm">{isOpen ? title : `${title} (click to expand)`}</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2">
            <div className="prose prose-sm max-w-none prose-headings:text-blue-900 prose-headings:font-bold prose-headings:text-sm prose-p:text-blue-800 prose-p:text-sm prose-li:text-blue-800 prose-li:text-sm prose-strong:text-blue-900 prose-ul:my-2 prose-ol:my-2 prose-h4:mt-3 prose-h4:mb-1">
              {children}
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
