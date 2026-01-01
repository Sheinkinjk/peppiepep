import { HowThisWorksSection } from "@/components/HowThisWorksSection"

export function Step1Education() {
  return (
    <HowThisWorksSection title="What's in Business Setup & Integrations?">
      <h4>Overview</h4>
      <p>
        This section is your control center for configuring your entire referral program foundation.
        You'll define your brand identity, reward structure, and technical integrations that power
        tracking and attribution across your website, checkout, and marketing tools.
      </p>

      <h4>What's Inside This Section</h4>
      <ol>
        <li>
          <strong>Business Snapshot (Step 1A):</strong> Capture your business type, website platform,
          CRM details, and tech stack. This helps us provide tailored integration recommendations
          and troubleshooting support.
        </li>
        <li>
          <strong>Referral Rewards (Step 1B):</strong> Configure what ambassadors earn when they
          refer customers (credit, discount, upgrade, or points), plus optional sign-on bonuses
          for new ambassadors. Set your brand colors and upload your logo for a fully customized
          referral page experience.
        </li>
        <li>
          <strong>Integrations (Step 1C):</strong> Connect your website platform (WordPress, Shopify,
          Webflow, etc.) to embed referral forms, track conversions via discount codes, and sync
          with your CRM (HubSpot, Klaviyo, Mailchimp). Each integration includes setup guides,
          testing checklists, and verification tools.
        </li>
      </ol>

      <h4>Why Complete This First</h4>
      <p>
        Your reward structure and integrations must be locked in before ambassadors start sharing.
        Changing reward amounts mid-campaign breaks trust and creates confusion. Testing your
        website embed and conversion tracking now prevents attribution failures later when real
        referrals are flowing.
      </p>

      <h4>Key Actions to Take</h4>
      <ul>
        <li>Fill out all business context fields so integrations are properly configured</li>
        <li>Preview your hosted referral page to confirm branding looks professional</li>
        <li>Mark your website integration as "complete" after embedding the referral form</li>
        <li>Test a full referral journey: click link → submit form → trigger conversion</li>
        <li>Verify discount code capture works with your checkout system</li>
      </ul>

      <h4>Pro Tips</h4>
      <p>
        💡 <strong>Start with one integration at a time.</strong> Don't try to set up Shopify +
        Klaviyo + Meta Ads all at once. Get your website embed working first, then add conversion
        tracking, then layer in CRM and ad integrations.
      </p>
      <p>
        💡 <strong>Use the integration status tracker</strong> in Step 1C to mark each platform
        as "pending", "testing", or "complete". This creates accountability and helps our support
        team diagnose issues faster if something breaks.
      </p>
    </HowThisWorksSection>
  )
}

export function Step2Education() {
  return (
    <HowThisWorksSection title="What's in Add Clients & Ambassadors?">
      <h4>Overview</h4>
      <p>
        This section is where you build your ambassador army. Every person you add receives a
        unique referral link and discount code automatically. Think of this as loading ammunition
        into your referral machine—the more quality ambassadors you have, the more referrals flow
        in without additional ad spend.
      </p>

      <h4>What's Inside This Section</h4>
      <ol>
        <li>
          <strong>Import Customers (CSV Upload):</strong> Bulk-add your entire customer base by
          uploading a spreadsheet with names, emails, and phone numbers. Our system instantly
          generates personalized referral links for every row. Perfect for migrating from another
          system or launching to your full list at once.
        </li>
        <li>
          <strong>Quick Add Customer:</strong> Manually add individual ambassadors one-by-one.
          Ideal for testing the system with VIP customers, adding walk-in clients on the spot,
          or onboarding high-value partners who deserve white-glove treatment.
        </li>
        <li>
          <strong>All Customers Table:</strong> View your complete ambassador roster with their
          referral codes, discount codes, total credits earned, and performance metrics. Adjust
          credits manually, copy links to share directly, or export data for external analysis.
        </li>
        <li>
          <strong>Partner Applications (Admin Only):</strong> If you're running a B2B partner
          program, approved partner applications appear here as customers. Each partner gets
          tracked attribution and commission payouts just like regular ambassadors.
        </li>
      </ol>

      <h4>Why This Comes Second</h4>
      <p>
        You can't send campaigns or track referrals without ambassadors in your system. But adding
        people before Step 1 is complete means they'd get broken links or see incorrect rewards.
        The sequence matters: configure program → add ambassadors → launch campaigns.
      </p>

      <h4>Key Actions to Take</h4>
      <ul>
        <li>Download the CSV template and map your existing customer data to our format</li>
        <li>Upload a small test batch (5-10 people) first to verify formatting works</li>
        <li>Add yourself as a test ambassador and verify your referral link loads correctly</li>
        <li>Export your ambassador list after importing to confirm all links generated successfully</li>
        <li>Check the "Active ambassadors" counter to track your total ambassador count</li>
      </ul>

      <h4>Pro Tips</h4>
      <p>
        💡 <strong>Start with your top 20% of customers.</strong> Loyal, repeat buyers are 10x
        more likely to refer than one-time purchasers. Launch to your VIPs first, measure
        performance, then expand to the full list once you've proven ROI.
      </p>
      <p>
        💡 <strong>Use Quick Add for immediate wins.</strong> When a happy customer checks out
        in-store or leaves a 5-star review, add them on the spot and text their referral link
        while they're still excited. Strike while the iron is hot.
      </p>
      <p>
        💡 <strong>Clean your data before uploading.</strong> Duplicate emails, invalid phone
        numbers, and formatting errors break imports. Use Excel's "Remove Duplicates" and
        validate phone formats (+61 for Australia) before hitting upload.
      </p>
    </HowThisWorksSection>
  )
}

export function Step3Education() {
  return (
    <HowThisWorksSection title="What's in Launch Campaigns?">
      <h4>Overview</h4>
      <p>
        This section is your activation engine. Ambassadors won't share unless they know the
        program exists and have their link handy. Campaigns deliver personalized messages (SMS
        or email) with each ambassador's unique referral link, triggering them to spread the
        word to their networks.
      </p>

      <h4>What's Inside This Section</h4>
      <ol>
        <li>
          <strong>Premium Campaign Showcase:</strong> A visual overview of the campaign builder
          with feature highlights (personalized links, live tracking, pro templates). This is
          your entry point to launching high-converting SMS and email campaigns.
        </li>
        <li>
          <strong>CRM Integration Tab:</strong> Export your ambassador list with merge fields
          (referral_link, discount_code, name) to import into your existing email platform
          (Klaviyo, HubSpot, Mailchimp). Includes setup guides for each major CRM, field mapping
          instructions, and testing checkpoints to verify attribution flows back correctly.
        </li>
        <li>
          <strong>Campaign Builder:</strong> Send campaigns directly through Refer Labs without
          needing external tools. Choose SMS or Email, select recipients, generate AI-powered
          copy, and launch with one click. Tracks delivery, opens, clicks, and conversions in
          real-time so you can measure campaign performance instantly.
        </li>
      </ol>

      <h4>Why This Comes Third</h4>
      <p>
        Campaigns only work if you have ambassadors loaded (Step 2) and integrations configured
        (Step 1). Sending a campaign before testing your referral flow means ambassadors share
        broken links, killing trust. Launch campaigns only after you've verified end-to-end
        attribution works.
      </p>

      <h4>Two Ways to Run Campaigns</h4>
      <p>
        <strong>Option 1: Use Your CRM (Recommended for established brands)</strong><br />
        Export ambassadors → Import to Klaviyo/HubSpot → Map merge fields → Send from your
        branded email domain. Pros: Full design control, existing deliverability reputation,
        integration with your marketing automation. Cons: Requires CRM setup and field mapping.
      </p>
      <p>
        <strong>Option 2: Use Refer Labs Campaign Builder (Recommended for speed)</strong><br />
        Select ambassadors → Generate copy with AI → Send SMS or Email instantly. Pros: No
        external tools needed, built-in tracking, fast launch. Cons: Less design customization,
        emails come from Refer Labs domain (can hurt deliverability for cold lists).
      </p>

      <h4>Key Actions to Take</h4>
      <ul>
        <li>Send a test campaign to yourself first—verify the message copy sounds natural</li>
        <li>Click your own referral link to confirm it loads the correct branded page</li>
        <li>Check that personalization tokens ({'{{name}}'}, {'{{referral_link}}'}) populate correctly</li>
        <li>If using your CRM, test one ambassador first before importing your full list</li>
        <li>Monitor the Campaign History tab after sending to track delivery and open rates</li>
      </ul>

      <h4>Pro Tips</h4>
      <p>
        💡 <strong>Launch at the right time.</strong> Tuesday-Thursday 10am-2pm gets the highest
        open rates for B2C. Avoid Mondays (inbox overload) and weekends (low engagement). For
        SMS, send between 11am-7pm to avoid morning/night interruptions.
      </p>
      <p>
        💡 <strong>Segment your first campaign.</strong> Don't blast 1,000 ambassadors at once.
        Send to your top 50 performers first, measure results, tweak copy based on feedback, then
        roll out to the full list. This prevents mass unsubscribes from poorly worded messages.
      </p>
      <p>
        💡 <strong>Use scarcity and urgency sparingly.</strong> "Limited time bonus" or "First
        10 referrals get double rewards" can boost shares short-term, but overuse burns out your
        audience. Reserve urgency tactics for quarterly promotions, not every campaign.
      </p>
    </HowThisWorksSection>
  )
}

export function Step4Education() {
  return (
    <HowThisWorksSection title="What's in Track Campaigns?">
      <h4>Overview</h4>
      <p>
        This section is your analytics command center. After launching campaigns, you need to
        know what's working and what's flopping. Track Campaigns shows delivery rates, click
        patterns, conversion velocity, and ROI by campaign so you can double down on winners
        and kill underperformers fast.
      </p>

      <h4>What's Inside This Section</h4>
      <ol>
        <li>
          <strong>Analytics Tab:</strong> High-level performance dashboard showing total sends,
          clicks, conversions, and revenue per campaign. See click-through rates (CTR), conversion
          rates (CVR), and ROI calculations across all campaigns. Identifies your best-performing
          messaging and channels (SMS vs Email) so you can replicate success.
        </li>
        <li>
          <strong>Campaign History:</strong> A chronological table of every campaign you've sent
          with granular metrics: recipients, sent count, failed deliveries, clicks, signups,
          conversions, reward spend, and net ROI. Compare campaigns side-by-side to spot patterns
          (e.g., "Tuesday emails outperform Friday SMS by 3x").
        </li>
        <li>
          <strong>Partner Referrals Tab:</strong> Separate tracking for B2B partner applications
          and their referral performance. Monitor commission payouts, attribution accuracy, and
          which partners drive the most qualified leads. Helps you identify top-tier partners
          worth investing more resources into.
        </li>
        <li>
          <strong>Share Assets Tab:</strong> Pre-built social media copy, email templates, and
          shareable graphics ambassadors can use to promote your program. Includes UTM-tracked
          links so you can attribute conversions back to specific share methods (Instagram Story
          vs Email Forward).
        </li>
      </ol>

      <h4>Why This Comes Fourth</h4>
      <p>
        You can't track campaigns until you've sent them (Step 3). And campaign data is only
        meaningful if you've configured attribution properly (Step 1). This step transforms raw
        send data into actionable insights that inform your next campaign's messaging, timing,
        and targeting.
      </p>

      <h4>Key Metrics to Monitor</h4>
      <ul>
        <li><strong>Delivery Rate:</strong> % of campaigns that reached inboxes (target: 95%+)</li>
        <li><strong>Open Rate:</strong> % of recipients who opened the message (target: 25%+ email, 98%+ SMS)</li>
        <li><strong>Click-Through Rate (CTR):</strong> % who clicked the referral link (target: 8-12%)</li>
        <li><strong>Conversion Rate (CVR):</strong> % of clicks that became paying customers (target: 5-10%)</li>
        <li><strong>Revenue Per Send:</strong> Average transaction value attributed to each campaign send</li>
        <li><strong>ROI:</strong> (Revenue - Reward Spend) / Reward Spend (target: 5x+)</li>
      </ul>

      <h4>Key Actions to Take</h4>
      <ul>
        <li>Check analytics 24-48 hours after sending to gauge initial performance</li>
        <li>Identify your top 3 performing campaigns and analyze what made them successful</li>
        <li>Look for campaigns with high clicks but low conversions—indicates a broken checkout flow</li>
        <li>Compare SMS vs Email performance to allocate budget toward the winning channel</li>
        <li>Export campaign data monthly to track long-term trends and seasonal patterns</li>
      </ul>

      <h4>Pro Tips</h4>
      <p>
        💡 <strong>Focus on ROI, not just clicks.</strong> A campaign with 1,000 clicks and 2
        conversions (0.2% CVR) loses money. A campaign with 50 clicks and 10 conversions (20% CVR)
        is a goldmine. Optimize for conversion quality, not vanity metrics.
      </p>
      <p>
        💡 <strong>Watch for attribution lag.</strong> Referrals often convert 3-7 days after
        clicking the link. Don't judge a campaign's success in the first 24 hours—wait a week
        before making conclusions about performance.
      </p>
      <p>
        💡 <strong>A/B test systematically.</strong> Change one variable per campaign (subject
        line, send time, or reward amount) and compare results. Don't change multiple things at
        once or you won't know what caused the lift.
      </p>
    </HowThisWorksSection>
  )
}

export function Step5Education() {
  return (
    <HowThisWorksSection title="What's in Measure ROI?">
      <h4>Overview</h4>
      <p>
        This section is your financial truth serum. Measure ROI tracks every referral from click
        to cash, calculates your program's profitability, and identifies which ambassadors are
        worth their weight in gold versus deadweight. Use this data to optimize rewards, cut
        underperformers, and double down on your top 20% of referrers.
      </p>

      <h4>What's Inside This Section</h4>
      <ol>
        <li>
          <strong>Referral Table:</strong> A comprehensive list of every referral (pending,
          completed, or failed) with ambassador name, referred customer, transaction value,
          reward amount, status, and timestamps. Filter by date, ambassador, or status to analyze
          patterns. Export to CSV for external reporting or accounting reconciliation.
        </li>
        <li>
          <strong>Journey Timeline:</strong> A chronological event log showing every touchpoint
          in a referral's lifecycle: link click → form submit → discount code entered → checkout
          completed → reward released. Helps diagnose attribution failures (e.g., "Why didn't
          this conversion get credited?").
        </li>
        <li>
          <strong>Metrics Dashboard:</strong> High-level KPIs showing total referrals, pending
          value, completed revenue, reward spend, and net ROI. Breaks down manual vs tracked
          referrals so you can see how much revenue comes from automated attribution vs offline
          entries.
        </li>
        <li>
          <strong>Add Manual Referral Form:</strong> Record offline conversions that happened
          outside your digital tracking (phone bookings, in-store purchases, verbal mentions).
          Ensures ambassadors get credit for all referrals, not just online ones, maintaining
          trust and accurate ROI calculations.
        </li>
      </ol>

      <h4>Why This Comes Fifth</h4>
      <p>
        ROI data only accumulates after campaigns drive referrals (Step 3 → Step 4 → Step 5).
        You need completed conversions to calculate profitability. This is your final validation
        that the entire program—setup, ambassadors, campaigns, tracking—is generating positive
        returns worth scaling.
      </p>

      <h4>How to Use the Referral Table</h4>
      <p>
        <strong>Pending Referrals:</strong> Someone clicked a link and submitted the form, but
        hasn't purchased yet. These are warm leads in your pipeline. Follow up with abandoned
        cart emails or retargeting ads to nudge them toward conversion.
      </p>
      <p>
        <strong>Completed Referrals:</strong> The referred customer purchased and the ambassador
        received their reward. These count toward your ROI calculations. Monitor transaction values
        to ensure referrals aren't just low-value one-time buyers.
      </p>
      <p>
        <strong>Manual Referrals:</strong> Conversions you added manually (e.g., customer mentioned
        "Sarah sent me" during checkout). Mark these complete to release rewards and keep ambassadors
        motivated.
      </p>

      <h4>Key Metrics to Monitor</h4>
      <ul>
        <li><strong>Total Referrals:</strong> Lifetime count of all referrals generated (target: grows monthly)</li>
        <li><strong>Conversion Rate:</strong> % of pending referrals that become paying customers (target: 15-25%)</li>
        <li><strong>Average Transaction Value:</strong> Mean purchase amount per referred customer (compare to non-referred baseline)</li>
        <li><strong>Reward Spend:</strong> Total credits/discounts paid to ambassadors (should stay under 20% of revenue)</li>
        <li><strong>Net ROI:</strong> (Total Revenue - Reward Spend) / Reward Spend (target: 5x minimum, 10x+ is elite)</li>
        <li><strong>Top Ambassador Performance:</strong> Identify your top 10 referrers by revenue generated</li>
      </ul>

      <h4>Key Actions to Take</h4>
      <ul>
        <li>Mark pending referrals as "completed" when customers make their first purchase</li>
        <li>Add manual referrals immediately after in-store/phone transactions to keep attribution current</li>
        <li>Review the Journey Timeline for failed conversions to diagnose broken tracking</li>
        <li>Export your referral table monthly and cross-check against accounting records</li>
        <li>Identify ambassadors with 5+ completed referrals and offer them VIP bonuses to keep them active</li>
      </ul>

      <h4>Pro Tips</h4>
      <p>
        💡 <strong>Focus on the top 20%.</strong> The Pareto Principle applies ruthlessly in
        referrals—20% of ambassadors drive 80% of revenue. Identify your elite performers and
        give them exclusive perks (higher rewards, early access, personal thank-yous) to keep
        them engaged.
      </p>
      <p>
        💡 <strong>Target 5x+ ROI minimum.</strong> If your program is returning less than 5x
        (e.g., spending $1,000 in rewards to earn $4,000 in revenue), either cut reward amounts
        or increase average order values through upsells. Below 3x ROI means the program is
        bleeding money—pause and fix before scaling.
      </p>
      <p>
        💡 <strong>Track lifetime value, not just first purchase.</strong> A referred customer
        might spend $50 on their first order but $500 over 12 months. Don't judge ROI purely on
        initial transaction value—measure long-term retention to see the true impact of referrals.
      </p>
      <p>
        💡 <strong>Use manual referrals strategically.</strong> If an ambassador brings you a
        whale customer ($10,000+ deal) via offline intro, manually add it and give them a bonus
        on top of standard rewards. Reinforcing offline referral behavior keeps your best
        networkers engaged.
      </p>
    </HowThisWorksSection>
  )
}
