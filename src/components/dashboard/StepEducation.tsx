import { HowThisWorksSection } from "@/components/HowThisWorksSection"

export function Step1Education() {
  return (
    <HowThisWorksSection title="How does Business Setup work?">
      <h4>Why This Step Matters</h4>
      <p>
        Setting up your business profile ensures all referral materials are branded correctly
        and your rewards are configured properly <strong>before</strong> you invite ambassadors.
      </p>

      <h4>What You&apos;ll Do</h4>
      <ol>
        <li><strong>Enter business details:</strong> Name, website, and branding</li>
        <li><strong>Configure rewards:</strong> Set what ambassadors and new customers receive</li>
        <li><strong>Set up tracking:</strong> Configure discount code capture (if applicable)</li>
        <li><strong>Verify integrations:</strong> Test that everything works before going live</li>
      </ol>

      <h4>Pro Tip</h4>
      <p>
        💡 Complete this step <strong>fully</strong> before adding ambassadors. Changing reward
        amounts later can confuse existing ambassadors and create inconsistencies.
      </p>
    </HowThisWorksSection>
  )
}

export function Step2Education() {
  return (
    <HowThisWorksSection title="How does adding ambassadors work?">
      <h4>Why This Step Matters</h4>
      <p>
        Your customers are your best marketers! Each person you add gets a unique referral
        link they can share. The more ambassadors you have, the more reach your program has.
      </p>

      <h4>Two Ways to Add Ambassadors</h4>
      <ol>
        <li>
          <strong>Bulk Upload (CSV):</strong> Import hundreds or thousands at once
          <ul>
            <li>Download our template</li>
            <li>Fill in customer details (name, email, phone)</li>
            <li>Upload and we&apos;ll generate unique links instantly</li>
          </ul>
        </li>
        <li>
          <strong>Quick Add (Manual):</strong> Add individual customers one at a time
          <ul>
            <li>Perfect for VIP customers</li>
            <li>Instant link generation</li>
            <li>Great for testing the system</li>
          </ul>
        </li>
      </ol>

      <h4>Pro Tip</h4>
      <p>
        💡 Start with 10-20 of your <strong>most loyal customers</strong> as a test group.
        See how they perform before rolling out to your entire customer base.
      </p>
    </HowThisWorksSection>
  )
}

export function Step3Education() {
  return (
    <HowThisWorksSection title="How do campaigns work?">
      <h4>Why This Step Matters</h4>
      <p>
        Having ambassadors is great, but they need to know about the program! Campaigns let
        you send personalized messages with their unique referral links via SMS or email.
      </p>

      <h4>Campaign Options</h4>
      <ol>
        <li>
          <strong>Use Your CRM:</strong> Download CSV with personalized links
          <ul>
            <li>Import into your existing email platform</li>
            <li>Full control over design and timing</li>
            <li>Use your brand&apos;s email templates</li>
          </ul>
        </li>
        <li>
          <strong>Use Our System:</strong> Send directly through Refer Labs
          <ul>
            <li>Choose SMS or Email</li>
            <li>AI-powered message generation</li>
            <li>Track opens, clicks, and conversions</li>
          </ul>
        </li>
      </ol>

      <h4>Pro Tip</h4>
      <p>
        💡 Send a <strong>test campaign</strong> to yourself first! Make sure the message sounds
        right and the link works before sending to all ambassadors.
      </p>
    </HowThisWorksSection>
  )
}

export function Step4Education() {
  return (
    <HowThisWorksSection title="How does campaign tracking work?">
      <h4>Why This Step Matters</h4>
      <p>
        Data drives decisions! This dashboard shows you which campaigns perform best, which
        ambassadors are most active, and your overall referral program ROI.
      </p>

      <h4>What You Can Track</h4>
      <ol>
        <li>
          <strong>Analytics Tab:</strong>
          <ul>
            <li>Campaign performance metrics</li>
            <li>Click-through rates</li>
            <li>Conversion rates</li>
            <li>ROI calculations</li>
          </ul>
        </li>
        <li>
          <strong>Campaign History:</strong>
          <ul>
            <li>See all past campaigns</li>
            <li>Compare performance</li>
            <li>Identify trends</li>
          </ul>
        </li>
        <li>
          <strong>Partner Referrals:</strong>
          <ul>
            <li>Track B2B partner applications</li>
            <li>Monitor commission earnings</li>
            <li>See attribution success rate</li>
          </ul>
        </li>
      </ol>

      <h4>Pro Tip</h4>
      <p>
        💡 Check your analytics <strong>weekly</strong> to spot trends early. If a campaign
        isn&apos;t performing well, you can adjust your messaging before the next send.
      </p>
    </HowThisWorksSection>
  )
}

export function Step5Education() {
  return (
    <HowThisWorksSection title="How does ROI measurement work?">
      <h4>Why This Step Matters</h4>
      <p>
        Track every referral from click to conversion and calculate your program&apos;s return on investment.
        This data helps you optimize rewards and identify your top performers.
      </p>

      <h4>Managing Referrals</h4>
      <ol>
        <li>
          <strong>View All Referrals:</strong> See pending and completed referrals in one table
          <ul>
            <li>Filter by ambassador, status, or date</li>
            <li>See transaction values and conversion rates</li>
          </ul>
        </li>
        <li>
          <strong>Mark Conversions:</strong> When a referral books, mark it complete
          <ul>
            <li>Ambassador receives reward automatically</li>
            <li>Revenue attribution is tracked</li>
          </ul>
        </li>
        <li>
          <strong>Add Manual Referrals:</strong> Record offline or phone referrals
          <ul>
            <li>Ensure ambassadors get credit for all referrals</li>
            <li>Keep accurate ROI calculations</li>
          </ul>
        </li>
      </ol>

      <h4>Pro Tip</h4>
      <p>
        💡 Aim for 5x+ ROI. If you&apos;re below that, either increase transaction values or
        reduce reward costs. Your top 20% of ambassadors typically drive 80% of results.
      </p>
    </HowThisWorksSection>
  )
}
