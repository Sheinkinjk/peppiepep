# Dashboard Explainer UX Implementation Guide

## Overview
This guide explains how to implement contextual, binary-state explainers across all dashboard sections.

## Binary State Principle

**CRITICAL**: All explainers must have ONLY two states:

1. **Fully Collapsed**: Shows only trigger (icon + text + chevron). NO body text visible.
2. **Fully Expanded**: Shows complete explanation content.

**Never** have a "collapsed" state that still shows large amounts of text.

## Two Explainer Components

### 1. `InlineExplainer` - Contextual, Feature-Level Help
**Location**: `src/components/dashboard/InlineExplainer.tsx`

**Use when**: You want to explain a specific feature, button, or action directly next to it.

**Collapsed state**: Shows only:
- `<HelpCircle>` icon
- Trigger text (e.g., "How does this work?")
- Chevron

**Expanded state**: Shows explanation in a blue-tinted box with left border.

**Example**:
```tsx
import { InlineExplainer } from "@/components/dashboard/InlineExplainer"

<div>
  <h3>Program Settings</h3>

  <InlineExplainer triggerText="Why configure this first?">
    <p>Setting up your program details ensures:</p>
    <ul>
      <li>All referral links have correct branding</li>
      <li>Reward amounts are locked in before ambassadors join</li>
      <li>Website integration can track conversions properly</li>
    </ul>
  </InlineExplainer>

  {/* Program settings form goes here */}
</div>
```

### 2. `HowThisWorksSection` - Section-Level Overview
**Location**: `src/components/HowThisWorksSection.tsx`

**Use when**: You want to provide an overview of an entire step/section at the top.

**Collapsed state**: Shows only:
- `<BookOpen>` icon
- Title
- Chevron

**Expanded state**: Shows full prose content with proper formatting.

**Example**:
```tsx
import { HowThisWorksSection } from "@/components/HowThisWorksSection"

<HowThisWorksSection title="How does Business Setup work?">
  <h4>Why This Step Matters</h4>
  <p>
    Setting up your business profile ensures all referral materials are branded correctly
    and your rewards are configured properly <strong>before</strong> you invite ambassadors.
  </p>

  <h4>What You'll Do</h4>
  <ol>
    <li><strong>Enter business details:</strong> Name, website, and branding</li>
    <li><strong>Configure rewards:</strong> Set what ambassadors and new customers receive</li>
    <li><strong>Set up tracking:</strong> Configure discount code capture (if applicable)</li>
  </ol>

  <h4>Pro Tip</h4>
  <p>
    💡 Complete this step <strong>fully</strong> before adding ambassadors.
  </p>
</HowThisWorksSection>
```

## Implementation Pattern for Each Dashboard Section

### Step 1: Business Setup & Integrations

**Current structure**:
```tsx
<TwoColumnLayout
  learnContent={
    <>
      <Step1Education />  {/* Section-level explainer */}
      <Step1Sidebar />
    </>
  }
  implementContent={
    <IntegrationTab ... />
  }
/>
```

**What to add**:

1. **Keep `Step1Education`** in the learn column (section-level overview)
2. **Add `InlineExplainer` components** inside `IntegrationTab.tsx`:
   - Next to "Program Settings" button
   - Next to "Website Integration" section
   - Next to "CRM Integration" section

**Example for IntegrationTab.tsx**:
```tsx
import { InlineExplainer } from "@/components/dashboard/InlineExplainer"

// Inside the component render:

{/* Program Settings Section */}
<div>
  <h3 className="text-lg font-bold">Configure Your Referral Program</h3>

  <InlineExplainer triggerText="Why configure rewards first?">
    <p>Setting your rewards before inviting ambassadors ensures:</p>
    <ul>
      <li><strong>Consistency:</strong> All ambassadors get the same offer</li>
      <li><strong>Trust:</strong> No confusion from changing rewards mid-program</li>
      <li><strong>Tracking:</strong> Proper attribution from day one</li>
    </ul>
  </InlineExplainer>

  <ProgramSettingsDialog ... />
</div>

{/* Website Integration Section */}
<div>
  <h3 className="text-lg font-bold">Website Integration</h3>

  <InlineExplainer triggerText="How does website tracking work?">
    <p>Installing the tracking code enables:</p>
    <ul>
      <li><strong>Click tracking:</strong> See which referral links get clicked</li>
      <li><strong>Conversion tracking:</strong> Automatically detect when referrals sign up</li>
      <li><strong>Revenue attribution:</strong> Link sales back to specific ambassadors</li>
    </ul>
    <p className="mt-2">
      <strong>Note:</strong> This is optional if you're manually tracking referrals or using our CRM integration.
    </p>
  </InlineExplainer>

  <WebsiteIntegrationCard ... />
</div>
```

### Step 2: Add Clients & Ambassadors

**What to add**:

1. Keep `Step2Education` in learn column
2. Add `InlineExplainer` next to:
   - CSV upload form ("How does bulk upload work?")
   - Quick add form ("When should I use quick add?")
   - Customers table ("What do these columns mean?")

**Example**:
```tsx
// In the customers section

<div>
  <h3>Import Customers</h3>

  <InlineExplainer triggerText="CSV upload vs. quick add?">
    <p><strong>Use CSV Upload when:</strong></p>
    <ul>
      <li>You have 10+ customers to add</li>
      <li>Your customer data is in a spreadsheet</li>
      <li>You want to import names, emails, and phone numbers at once</li>
    </ul>
    <p className="mt-2"><strong>Use Quick Add when:</strong></p>
    <ul>
      <li>You're adding 1-5 VIP customers</li>
      <li>You want to test the system</li>
      <li>You don't have a CSV file ready</li>
    </ul>
  </InlineExplainer>

  <Tabs>
    <TabsList>
      <TabsTrigger value="csv">Bulk Upload (CSV)</TabsTrigger>
      <TabsTrigger value="quick">Quick Add</TabsTrigger>
    </TabsList>
    ...
  </Tabs>
</div>
```

### Step 3: Launch Campaigns

**What to add**:

1. Keep `Step3Education` in learn column
2. Add `InlineExplainer` next to:
   - Campaign builder ("How do I choose SMS vs Email?")
   - Download CSV option ("Why download CSV?")
   - AI message generation ("How does AI help?")

### Step 4: Track Campaign Performance

**What to add**:

1. Keep `Step4Education` in learn column
2. Add `InlineExplainer` next to:
   - Analytics dashboard ("What do these metrics mean?")
   - Campaign history table ("How do I compare campaigns?")
   - Partner referrals tab ("What are partner referrals?")

### Step 5: Manage Referrals & ROI

**What to add**:

1. Keep `Step5Education` in learn column
2. Add `InlineExplainer` next to:
   - Manual referral form ("When should I add manual referrals?")
   - Mark conversion button ("How does this affect ROI?")
   - Referrals table ("What's the difference between pending and converted?")

## Default Open States

**Section-level explainers** (`HowThisWorksSection`):
- Set `defaultOpen={false}` (collapsed by default)
- Users can expand if they want overview help

**Inline explainers** (`InlineExplainer`):
- Set `defaultOpen={false}` (collapsed by default)
- Users expand when they need specific contextual help

## Testing Checklist

For each section, verify:

- [ ] When collapsed, explainer shows ONLY icon + trigger text + chevron (no body content)
- [ ] When expanded, all explanation content is visible
- [ ] Clicking trigger toggles between fully collapsed and fully expanded
- [ ] Chevron rotates smoothly during state change
- [ ] Multiple explainers can be open simultaneously without conflict
- [ ] Explainers don't break responsive layout on mobile
- [ ] Text is readable and properly formatted when expanded

## Migration Steps

1. ✅ Create `InlineExplainer` component
2. ✅ Update `HowThisWorksSection` to default `defaultOpen={false}`
3. [ ] Add `InlineExplainer` imports to relevant component files
4. [ ] Identify 2-3 key features per section that need contextual help
5. [ ] Add `<InlineExplainer>` components next to those features
6. [ ] Test each section to ensure binary collapse/expand behavior
7. [ ] Remove any old explainer components that show text when "collapsed"
8. [ ] Deploy and verify in production

## Example: Full Step 1 Implementation

```tsx
// In dashboard/page.tsx - Step 1 content

{
  id: "business-setup",
  number: 1,
  title: "Business Setup & Integrations",
  description: "Configure your program before inviting ambassadors",
  icon: <Settings className="h-5 w-5" />,
  status: hasProgramSettings ? "complete" : "in_progress",
  content: (
    <TwoColumnLayout
      learnContent={
        <>
          {/* Section-level overview - collapsed by default */}
          <Step1Education />
          <Step1Sidebar />
        </>
      }
      implementContent={
        <>
          {/* Program Settings */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Configure Your Referral Program</h3>

            <InlineExplainer triggerText="Why configure this first?">
              <p>Setting up your program details ensures:</p>
              <ul>
                <li><strong>Consistency:</strong> All ambassadors get the same offer</li>
                <li><strong>Clarity:</strong> Reward amounts locked before anyone joins</li>
                <li><strong>Compliance:</strong> Terms set upfront to avoid disputes</li>
              </ul>
            </InlineExplainer>

            <ProgramSettingsDialog {...props} />
          </div>

          {/* Website Integration */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Website Integration</h3>

            <InlineExplainer triggerText="How does this work?">
              <p>Add our tracking code to your website to enable:</p>
              <ul>
                <li><strong>Automatic click tracking:</strong> See which links perform best</li>
                <li><strong>Conversion detection:</strong> Know when referrals sign up</li>
                <li><strong>Revenue attribution:</strong> Credit ambassadors automatically</li>
              </ul>
              <p className="mt-2">
                <strong>Optional:</strong> Skip this if you're tracking manually or using CRM integration.
              </p>
            </InlineExplainer>

            <WebsiteIntegrationCard {...props} />
          </div>

          {/* CRM Integration */}
          <div>
            <h3 className="text-xl font-bold mb-2">CRM Integration</h3>

            <InlineExplainer triggerText="CRM vs. website tracking?">
              <p><strong>Use CRM integration if:</strong></p>
              <ul>
                <li>Your sales happen offline (phone, in-person)</li>
                <li>You use Salesforce, HubSpot, or similar CRM</li>
                <li>You want attribution inside your existing workflow</li>
              </ul>
              <p className="mt-2"><strong>Use website tracking if:</strong></p>
              <ul>
                <li>Your sales happen online through your website</li>
                <li>You want fully automated attribution</li>
                <li>You don't use a CRM</li>
              </ul>
            </InlineExplainer>

            <CRMIntegrationGuideCard {...props} />
          </div>
        </>
      }
    />
  ),
}
```

## Key Principles

1. **Contextual**: Place explainers next to the feature they explain
2. **Binary**: Only two states - fully collapsed or fully expanded
3. **Consistent**: Use same component and behavior across all sections
4. **Clear**: Trigger text clearly indicates what will be explained
5. **Opt-in**: Collapsed by default, users expand when needed
6. **Non-blocking**: Explainers don't prevent users from taking action

## Questions?

- If a feature needs explanation, add an `InlineExplainer` next to it
- If a whole step needs overview, keep the `Step{N}Education` component
- If you're unsure, err on the side of adding contextual help
- Test by trying to use the feature as a new user - if you're confused, add an explainer
