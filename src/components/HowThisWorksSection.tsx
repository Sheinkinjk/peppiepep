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
  defaultOpen = false
}: HowThisWorksSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group">
        <BookOpen className="h-4 w-4" />
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="prose prose-sm max-w-none prose-headings:text-blue-900 prose-p:text-blue-800 prose-li:text-blue-800 prose-strong:text-blue-900">
            {children}
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
