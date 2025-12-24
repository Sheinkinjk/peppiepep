import { Card } from "@/components/ui/card"
import { BookOpen, Lightbulb } from "lucide-react"

interface SidebarSection {
  title: string
  items: string[]
}

interface StepSidebarProps {
  sections: SidebarSection[]
  proTip: string
}

function StepSidebar({ sections, proTip }: StepSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Main guidance sections */}
      {sections.map((section, idx) => (
        <Card key={idx} className="p-4 border border-blue-200 bg-blue-50">
          <h4 className="font-semibold text-blue-900 text-sm mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {section.title}
          </h4>
          <ol className="space-y-2 text-sm text-blue-800">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-semibold text-blue-600 shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </Card>
      ))}

      {/* Pro Tip */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <h5 className="font-semibold text-amber-900 text-sm mb-1">Pro Tip</h5>
            <p className="text-xs text-amber-800">{proTip}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function Step1Sidebar() {
  return (
    <StepSidebar
      sections={[
        {
          title: "Why This Step Matters",
          items: [
            "Sets the foundation for your entire referral program",
            "Ensures consistent branding across all materials",
            "Locks in reward structure before inviting ambassadors",
            "Verifies integrations work correctly",
          ],
        },
        {
          title: "What You'll Configure",
          items: [
            "Business name and branding",
            "Ambassador and customer rewards",
            "Discount code tracking (optional)",
            "Integration settings",
          ],
        },
      ]}
      proTip="Complete this step fully before adding ambassadors. Changing reward amounts later can confuse existing ambassadors and create inconsistencies in your program."
    />
  )
}

export function Step2Sidebar() {
  return (
    <StepSidebar
      sections={[
        {
          title: "Why This Step Matters",
          items: [
            "Your customers are your best marketers",
            "Each ambassador gets a unique trackable link",
            "More ambassadors = more program reach",
            "Quality matters more than quantity",
          ],
        },
        {
          title: "Two Ways to Add",
          items: [
            "Bulk Upload: Import hundreds/thousands via CSV",
            "Quick Add: Add individual VIP customers manually",
            "Download template for bulk uploads",
            "Test with 10-20 loyal customers first",
          ],
        },
      ]}
      proTip="Start with your most loyal customers as a test group. See how they perform before rolling out to your entire customer base. Quality ambassadors drive better results than large numbers."
    />
  )
}

export function Step3Sidebar() {
  return (
    <StepSidebar
      sections={[
        {
          title: "Why This Step Matters",
          items: [
            "Ambassadors need to know about the program",
            "Personalized messages increase participation",
            "Track campaign performance and ROI",
            "Test messaging before full rollout",
          ],
        },
        {
          title: "Campaign Options",
          items: [
            "Use Your CRM: Download CSV with personalized links",
            "Use Our System: Send SMS or Email directly",
            "AI-powered message generation available",
            "Track opens, clicks, and conversions",
          ],
        },
      ]}
      proTip="Send a test campaign to yourself first! Make sure the message sounds right, the link works, and the branding looks good before sending to all ambassadors. Test, test, test!"
    />
  )
}

export function Step4Sidebar() {
  return (
    <StepSidebar
      sections={[
        {
          title: "Why This Step Matters",
          items: [
            "Data drives better decisions",
            "Identify top-performing ambassadors",
            "Optimize campaigns based on results",
            "Calculate program ROI accurately",
          ],
        },
        {
          title: "What You Can Track",
          items: [
            "Analytics: Performance metrics and conversion rates",
            "Campaign History: Compare past campaigns",
            "Partner Referrals: B2B tracking and commissions",
            "Share Assets: Download marketing materials",
          ],
        },
      ]}
      proTip="Check your analytics weekly to spot trends early. If a campaign isn't performing well, you can adjust your messaging, timing, or target audience before the next send. Data is power!"
    />
  )
}
