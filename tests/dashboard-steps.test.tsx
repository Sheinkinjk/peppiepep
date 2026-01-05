/**
 * Comprehensive tests for refactored dashboard step components
 * Tests Steps 2, 3, and 4 to ensure functionality after refactoring
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step2Content } from '@/components/dashboard/steps/Step2Content';
import { Step3Content } from '@/components/dashboard/steps/Step3Content';
import { Step4Content } from '@/components/dashboard/steps/Step4Content';
import type { Database } from '@/types/supabase';

// Mock server actions
const mockUpdateBusinessOnboarding = vi.fn();
const mockUpdateSettings = vi.fn();
const mockQuickAddCustomer = vi.fn();
const mockAdjustCustomerCredits = vi.fn();
const mockUploadLogo = vi.fn();

// Mock customer data
const mockCustomers: Database['public']['Tables']['customers']['Row'][] = [
  {
    id: 'cust-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    referral_code: 'JOHN123',
    discount_code: 'DISC123',
    business_id: 'biz-1',
    credits: 100,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    metadata: null,
    source: null,
  },
  {
    id: 'cust-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    referral_code: 'JANE456',
    discount_code: 'DISC456',
    business_id: 'biz-1',
    credits: 50,
    status: 'active',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    metadata: null,
    source: null,
  },
];

const mockLinkedInCustomers: Database['public']['Tables']['customers']['Row'][] = [
  {
    ...mockCustomers[0],
    id: 'linkedin-1',
    source: 'linkedin_influencer',
  },
];

// Mock campaign data
const mockCampaigns: Database['public']['Tables']['campaigns']['Row'][] = [
  {
    id: 'camp-1',
    name: 'Summer Campaign',
    channel: 'email',
    status: 'completed',
    business_id: 'biz-1',
    total_recipients: 100,
    sent_count: 95,
    failed_count: 5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    message_template: 'Test template',
    scheduled_at: null,
    completed_at: '2024-01-02T00:00:00Z',
  },
];

// Mock referral data
const mockReferrals: Database['public']['Tables']['referrals']['Row'][] = [
  {
    id: 'ref-1',
    referrer_id: 'cust-1',
    referred_email: 'referred@example.com',
    referred_name: 'Referred User',
    status: 'completed',
    business_id: 'biz-1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    transaction_value: 100,
    commission_earned: 10,
    campaign_id: 'camp-1',
    metadata: null,
    completed_at: '2024-01-02T00:00:00Z',
  },
];

const mockPartnerReferrals: Database['public']['Tables']['referrals']['Row'][] = [
  {
    ...mockReferrals[0],
    id: 'partner-ref-1',
    metadata: { source: 'partner' },
  },
];

const mockCampaignEventStats = {
  'camp-1': {
    clicks: 50,
    signups: 25,
    conversions: 10,
  },
};

describe('Step2Content - Clients & Ambassadors', () => {
  const defaultProps = {
    siteUrl: 'https://test.com',
    businessId: 'biz-1',
    businessName: 'Test Business',
    discountCaptureSecret: 'secret123',
    offerText: '10% off',
    newUserRewardText: '$10 credit',
    clientRewardText: '$5 credit',
    rewardType: 'credit' as const,
    rewardAmount: 10,
    upgradeName: 'Premium',
    rewardTerms: 'Terms apply',
    logoUrl: 'https://test.com/logo.png',
    brandHighlightColor: '#FF0000',
    brandTone: 'professional',
    onboardingMetadata: null,
    signOnBonusEnabled: true,
    signOnBonusAmount: 20,
    signOnBonusType: 'credit',
    signOnBonusDescription: 'Welcome bonus',
    safeCustomers: mockCustomers,
    currentAdmin: null,
    linkedInInfluencerCustomers: [],
    regularCustomers: mockCustomers,
    updateBusinessOnboarding: mockUpdateBusinessOnboarding,
    updateSettings: mockUpdateSettings,
    quickAddCustomer: mockQuickAddCustomer,
    adjustCustomerCredits: mockAdjustCustomerCredits,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders customer import and quick add sections', () => {
    render(<Step2Content {...defaultProps} />);

    expect(screen.getByText('Import Customers')).toBeInTheDocument();
    expect(screen.getByText('Bulk upload spreadsheets to instantly generate referral links.')).toBeInTheDocument();
    expect(screen.getByText(`Active ambassadors:`)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays customer count correctly', () => {
    render(<Step2Content {...defaultProps} />);

    const customerCount = screen.getByText('2');
    expect(customerCount).toBeInTheDocument();
  });

  it('shows all customers table when customers exist', () => {
    render(<Step2Content {...defaultProps} />);

    expect(screen.getByText('All Customers (2)')).toBeInTheDocument();
  });

  it('shows empty state when no customers exist', () => {
    render(<Step2Content {...defaultProps} safeCustomers={[]} regularCustomers={[]} />);

    expect(screen.getByText('No customers yet')).toBeInTheDocument();
    expect(screen.getByText('Add your first customer using the quick form above, or upload a CSV to get started with your referral program.')).toBeInTheDocument();
  });

  it('shows admin partner applications section when admin is logged in', () => {
    const adminProps = {
      ...defaultProps,
      currentAdmin: { id: 'admin-1' },
    };

    render(<Step2Content {...adminProps} />);

    expect(screen.getByText('Partner applications')).toBeInTheDocument();
    expect(screen.getByText('Admin tools')).toBeInTheDocument();
  });

  it('shows LinkedIn Influencer customers section when admin and LinkedIn customers exist', () => {
    const linkedInProps = {
      ...defaultProps,
      currentAdmin: { id: 'admin-1' },
      linkedInInfluencerCustomers: mockLinkedInCustomers,
    };

    render(<Step2Content {...linkedInProps} />);

    expect(screen.getByText(/LinkedIn Influencer Customers/)).toBeInTheDocument();
    expect(screen.getByText('Customers from LinkedIn Influencer marketplace signups (influencers and businesses). These are separate from the regular referral program.')).toBeInTheDocument();
  });

  it('does not show admin sections for non-admin users', () => {
    render(<Step2Content {...defaultProps} />);

    expect(screen.queryByText('Partner applications')).not.toBeInTheDocument();
    expect(screen.queryByText('LinkedIn Influencer Customers')).not.toBeInTheDocument();
  });
});

describe('Step3Content - Launch Campaigns', () => {
  const defaultProps = {
    safeCustomers: mockCustomers,
    siteUrl: 'https://test.com',
    businessId: 'biz-1',
    businessName: 'Test Business',
    discountCaptureSecret: 'secret123',
    offerText: '10% off',
    newUserRewardText: '$10 credit',
    clientRewardText: '$5 credit',
    rewardType: 'credit' as const,
    rewardAmount: 10,
    upgradeName: 'Premium',
    rewardTerms: 'Terms apply',
    brandHighlightColor: '#FF0000',
    brandTone: 'professional',
    uploadLogo: mockUploadLogo,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders premium campaigns hero section', () => {
    render(<Step3Content {...defaultProps} />);

    expect(screen.getByText('Premium Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Launch High-Converting Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Send beautifully designed emails and SMS campaigns with personalized links and real-time tracking.')).toBeInTheDocument();
  });

  it('displays campaign feature highlights', () => {
    render(<Step3Content {...defaultProps} />);

    expect(screen.getByText('Personal Links')).toBeInTheDocument();
    expect(screen.getByText('Live Tracking')).toBeInTheDocument();
    expect(screen.getByText('Pro Templates')).toBeInTheDocument();
  });

  it('renders CRM integration tab', () => {
    render(<Step3Content {...defaultProps} />);

    // CRMIntegrationTab should be rendered
    const container = screen.getByText('Launch High-Converting Campaigns').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('renders campaign builder section', () => {
    render(<Step3Content {...defaultProps} />);

    expect(screen.getByText('Campaign Builder')).toBeInTheDocument();
    expect(screen.getByText('Design and send personalized campaigns to your ambassadors')).toBeInTheDocument();
  });
});

describe('Step4Content - Track Campaigns', () => {
  const defaultProps = {
    campaignsData: mockCampaigns,
    safeReferrals: mockReferrals,
    campaignEventStats: mockCampaignEventStats,
    safePartnerReferrals: mockPartnerReferrals,
    safeCustomers: mockCustomers,
    siteUrl: 'https://test.com',
    businessName: 'Test Business',
    clientRewardText: '$5 credit',
    newUserRewardText: '$10 credit',
    rewardAmount: 10,
    offerText: '10% off',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders campaign insights tabs', () => {
    render(<Step4Content {...defaultProps} />);

    expect(screen.getByText('Campaign insights')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Campaign History')).toBeInTheDocument();
    expect(screen.getByText(/Partner Referrals/)).toBeInTheDocument();
    expect(screen.getByText('Share Assets')).toBeInTheDocument();
  });

  it('shows analytics when campaigns exist', () => {
    render(<Step4Content {...defaultProps} />);

    // Should show CampaignAnalyticsDashboard instead of empty state
    expect(screen.queryByText('No campaigns yet')).not.toBeInTheDocument();
  });

  it('shows empty state when no campaigns exist', () => {
    const emptyProps = {
      ...defaultProps,
      campaignsData: [],
    };

    render(<Step4Content {...emptyProps} />);

    expect(screen.getByText('No campaigns yet')).toBeInTheDocument();
    expect(screen.getByText('Launch your first campaign to start tracking analytics and performance metrics.')).toBeInTheDocument();
  });

  it('displays partner referrals count in tab', () => {
    render(<Step4Content {...defaultProps} />);

    expect(screen.getByText(/Partner Referrals \(1\)/)).toBeInTheDocument();
  });

  it('renders campaign history table when campaigns exist', async () => {
    render(<Step4Content {...defaultProps} />);

    // Click on Campaign History tab
    const historyTab = screen.getByText('Campaign History');
    await userEvent.click(historyTab);

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Channel')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });
  });

  it('shows empty state in campaign history when no campaigns', async () => {
    const emptyProps = {
      ...defaultProps,
      campaignsData: [],
    };

    render(<Step4Content {...emptyProps} />);

    // Click on Campaign History tab
    const historyTab = screen.getByText('Campaign History');
    await userEvent.click(historyTab);

    await waitFor(() => {
      expect(screen.getByText('No campaigns yet')).toBeInTheDocument();
      expect(screen.getByText('Launch your first campaign to start building your campaign history and tracking performance over time.')).toBeInTheDocument();
    });
  });
});

describe('Integration Tests - Props Consistency', () => {
  it('Step2Content accepts all required props without TypeScript errors', () => {
    const props = {
      siteUrl: 'https://test.com',
      businessId: 'biz-1',
      businessName: 'Test',
      discountCaptureSecret: 'secret',
      offerText: 'offer',
      newUserRewardText: 'reward',
      clientRewardText: 'client',
      rewardType: 'credit' as const,
      rewardAmount: 10,
      upgradeName: 'premium',
      rewardTerms: 'terms',
      logoUrl: 'logo',
      brandHighlightColor: '#000',
      brandTone: 'professional',
      onboardingMetadata: null,
      signOnBonusEnabled: true,
      signOnBonusAmount: 20,
      signOnBonusType: 'credit',
      signOnBonusDescription: 'bonus',
      safeCustomers: mockCustomers,
      currentAdmin: null,
      linkedInInfluencerCustomers: [],
      regularCustomers: mockCustomers,
      updateBusinessOnboarding: mockUpdateBusinessOnboarding,
      updateSettings: mockUpdateSettings,
      quickAddCustomer: mockQuickAddCustomer,
      adjustCustomerCredits: mockAdjustCustomerCredits,
    };

    expect(() => render(<Step2Content {...props} />)).not.toThrow();
  });

  it('Step3Content accepts all required props without TypeScript errors', () => {
    const props = {
      safeCustomers: mockCustomers,
      siteUrl: 'https://test.com',
      businessId: 'biz-1',
      businessName: 'Test',
      discountCaptureSecret: 'secret',
      offerText: 'offer',
      newUserRewardText: 'reward',
      clientRewardText: 'client',
      rewardType: 'credit' as const,
      rewardAmount: 10,
      upgradeName: 'premium',
      rewardTerms: 'terms',
      brandHighlightColor: '#000',
      brandTone: 'professional',
      uploadLogo: mockUploadLogo,
    };

    expect(() => render(<Step3Content {...props} />)).not.toThrow();
  });

  it('Step4Content accepts all required props without TypeScript errors', () => {
    const props = {
      campaignsData: mockCampaigns,
      safeReferrals: mockReferrals,
      campaignEventStats: mockCampaignEventStats,
      safePartnerReferrals: mockPartnerReferrals,
      safeCustomers: mockCustomers,
      siteUrl: 'https://test.com',
      businessName: 'Test',
      clientRewardText: 'client',
      newUserRewardText: 'new',
      rewardAmount: 10,
      offerText: 'offer',
    };

    expect(() => render(<Step4Content {...props} />)).not.toThrow();
  });
});

describe('Edge Cases and Error Handling', () => {
  it('Step2Content handles null values gracefully', () => {
    const nullProps = {
      siteUrl: 'https://test.com',
      businessId: 'biz-1',
      businessName: 'Test',
      discountCaptureSecret: null,
      offerText: null,
      newUserRewardText: null,
      clientRewardText: null,
      rewardType: 'credit' as const,
      rewardAmount: null,
      upgradeName: null,
      rewardTerms: null,
      logoUrl: null,
      brandHighlightColor: null,
      brandTone: null,
      onboardingMetadata: null,
      signOnBonusEnabled: false,
      signOnBonusAmount: null,
      signOnBonusType: null,
      signOnBonusDescription: null,
      safeCustomers: [],
      currentAdmin: null,
      linkedInInfluencerCustomers: [],
      regularCustomers: [],
      updateBusinessOnboarding: mockUpdateBusinessOnboarding,
      updateSettings: mockUpdateSettings,
      quickAddCustomer: mockQuickAddCustomer,
      adjustCustomerCredits: mockAdjustCustomerCredits,
    };

    expect(() => render(<Step2Content {...nullProps} />)).not.toThrow();
  });

  it('Step4Content handles empty arrays correctly', () => {
    const emptyProps = {
      campaignsData: [],
      safeReferrals: [],
      campaignEventStats: {},
      safePartnerReferrals: [],
      safeCustomers: [],
      siteUrl: 'https://test.com',
      businessName: null,
      clientRewardText: null,
      newUserRewardText: null,
      rewardAmount: null,
      offerText: null,
    };

    expect(() => render(<Step4Content {...emptyProps} />)).not.toThrow();
  });

  it('Step3Content handles empty customer list', () => {
    const props = {
      safeCustomers: [],
      siteUrl: 'https://test.com',
      businessId: 'biz-1',
      businessName: 'Test',
      discountCaptureSecret: null,
      offerText: null,
      newUserRewardText: null,
      clientRewardText: null,
      rewardType: 'credit' as const,
      rewardAmount: null,
      upgradeName: null,
      rewardTerms: null,
      brandHighlightColor: null,
      brandTone: null,
      uploadLogo: mockUploadLogo,
    };

    expect(() => render(<Step3Content {...props} />)).not.toThrow();
  });
});
