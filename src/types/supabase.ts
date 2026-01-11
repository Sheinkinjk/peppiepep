// Minimal hand-written Supabase types to align with the queries used in the app.
// Replace with generated types from `supabase gen types typescript` when available.
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string | null;
          logo_url: string | null;
          offer_text: string | null;
          reward_type: "credit" | "upgrade" | "discount" | "points" | null;
          reward_amount: number | null;
          upgrade_name: string | null;
          client_reward_text: string | null;
          new_user_reward_text: string | null;
          reward_terms: string | null;
          brand_highlight_color: string | null;
          brand_tone: string | null;
          discount_capture_secret: string | null;
          sign_on_bonus_enabled: boolean | null;
          sign_on_bonus_amount: number | null;
          sign_on_bonus_type: string | null;
          sign_on_bonus_description: string | null;
          onboarding_metadata: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name?: string | null;
          logo_url?: string | null;
          offer_text?: string | null;
          reward_type?: "credit" | "upgrade" | "discount" | "points" | null;
          reward_amount?: number | null;
          upgrade_name?: string | null;
          client_reward_text?: string | null;
          new_user_reward_text?: string | null;
          reward_terms?: string | null;
          brand_highlight_color?: string | null;
          brand_tone?: string | null;
          discount_capture_secret?: string | null;
          sign_on_bonus_enabled?: boolean | null;
          sign_on_bonus_amount?: number | null;
          sign_on_bonus_type?: string | null;
          sign_on_bonus_description?: string | null;
          onboarding_metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string | null;
          logo_url?: string | null;
          offer_text?: string | null;
          reward_type?: "credit" | "upgrade" | "discount" | "points" | null;
          reward_amount?: number | null;
          upgrade_name?: string | null;
          client_reward_text?: string | null;
          new_user_reward_text?: string | null;
          reward_terms?: string | null;
          brand_highlight_color?: string | null;
          brand_tone?: string | null;
          discount_capture_secret?: string | null;
          sign_on_bonus_enabled?: boolean | null;
          sign_on_bonus_amount?: number | null;
          sign_on_bonus_type?: string | null;
          sign_on_bonus_description?: string | null;
          onboarding_metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      customers: {
        Row: {
          id: string;
          business_id: string;
          name: string | null;
          company: string | null;
          website: string | null;
          instagram_handle: string | null;
          linkedin_handle: string | null;
          audience_profile: string | null;
          source: string | null;
          notes: string | null;
          phone: string | null;
          email: string | null;
          referral_code: string | null;
          discount_code: string | null;
          status: string | null;
          credits: number | null;
          // AI Scoring fields
          ai_referral_score: number | null;
          ai_score_explanation: string | null;
          ai_estimated_value: number | null;
          ai_likelihood_to_refer: number | null;
          ai_optimal_approach: string | null;
          ai_best_contact_time: string | null;
          ai_scored_at: string | null;
          ai_score_version: string | null;
          // Engagement tracking fields
          engagement_score: number | null;
          churn_risk: number | null;
          health_status: 'healthy' | 'at_risk' | 'churned' | 'champion' | null;
          last_engagement_at: string | null;
          total_referrals_sent: number | null;
          total_conversions: number | null;
          conversion_rate: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          name?: string | null;
          company?: string | null;
          website?: string | null;
          instagram_handle?: string | null;
          linkedin_handle?: string | null;
          audience_profile?: string | null;
          source?: string | null;
          notes?: string | null;
          phone?: string | null;
          email?: string | null;
          referral_code?: string | null;
          discount_code?: string | null;
          status?: string | null;
          credits?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          name?: string | null;
          company?: string | null;
          website?: string | null;
          instagram_handle?: string | null;
          linkedin_handle?: string | null;
          audience_profile?: string | null;
          source?: string | null;
          notes?: string | null;
          phone?: string | null;
          email?: string | null;
          referral_code?: string | null;
          discount_code?: string | null;
          status?: string | null;
          credits?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string | null;
          created_at?: string | null;
        };
        Relationships: never[];
      };
      partner_applications: {
        Row: {
          id: string;
          business_id: string;
          customer_id: string | null;
          name: string | null;
          email: string | null;
          phone: string | null;
          company: string | null;
          website: string | null;
          instagram_handle: string | null;
          linkedin_handle: string | null;
          audience_profile: string | null;
          notes: string | null;
          source: string | null;
          status: "pending" | "under_review" | "approved" | "rejected" | null;
          approved_at?: string | null;
          approved_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          customer_id?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          website?: string | null;
          instagram_handle?: string | null;
          linkedin_handle?: string | null;
          audience_profile?: string | null;
          notes?: string | null;
          source?: string | null;
          status?: "pending" | "under_review" | "approved" | "rejected" | null;
          approved_at?: string | null;
          approved_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          customer_id?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          website?: string | null;
          instagram_handle?: string | null;
          linkedin_handle?: string | null;
          audience_profile?: string | null;
          notes?: string | null;
          source?: string | null;
          status?: "pending" | "under_review" | "approved" | "rejected" | null;
          approved_at?: string | null;
          approved_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      referrals: {
        Row: {
          id: string;
          business_id: string;
          ambassador_id: string | null;
          referrer_id: string | null;
          referred_by: string | null;
          referred_to: string | null;
          referral_code: string | null;
          type: string | null;
          campaign_id: string | null;
          consent_given: boolean | null;
          locale: string | null;
          referred_name: string | null;
          referred_email: string | null;
          referred_phone: string | null;
          status: string | null;
          rewarded_at: string | null;
          transaction_value: number | null;
          transaction_date: string | null;
          service_type: string | null;
          created_by: string | null;
          created_at: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          ambassador_id?: string | null;
          referrer_id?: string | null;
          referred_by?: string | null;
          referred_to?: string | null;
          referral_code?: string | null;
          type?: string | null;
          campaign_id?: string | null;
          consent_given?: boolean | null;
          locale?: string | null;
          referred_name?: string | null;
          referred_email?: string | null;
          referred_phone?: string | null;
          status?: string | null;
          rewarded_at?: string | null;
          transaction_value?: number | null;
          transaction_date?: string | null;
          service_type?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          ambassador_id?: string | null;
          referrer_id?: string | null;
          referred_by?: string | null;
          referred_to?: string | null;
          referral_code?: string | null;
          type?: string | null;
          campaign_id?: string | null;
          consent_given?: boolean | null;
          locale?: string | null;
          referred_name?: string | null;
          referred_email?: string | null;
          referred_phone?: string | null;
          status?: string | null;
          rewarded_at?: string | null;
          transaction_value?: number | null;
          transaction_date?: string | null;
          service_type?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      campaigns: {
        Row: {
          id: string;
          business_id: string;
          name: string | null;
          message: string | null;
          channel: "sms" | "email" | null;
          status: string | null;
          total_recipients: number | null;
          sent_count: number | null;
          failed_count: number | null;
          snapshot_offer_text: string | null;
          snapshot_new_user_reward_text: string | null;
          snapshot_client_reward_text: string | null;
          snapshot_reward_type: "credit" | "upgrade" | "discount" | "points" | null;
          snapshot_reward_amount: number | null;
          snapshot_upgrade_name: string | null;
          snapshot_reward_terms: string | null;
          snapshot_logo_url: string | null;
          snapshot_story_blocks: Record<string, unknown>[] | null;
          snapshot_include_qr: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          name?: string | null;
          message?: string | null;
          channel?: "sms" | "email" | null;
          status?: string | null;
          total_recipients?: number | null;
          sent_count?: number | null;
          failed_count?: number | null;
          snapshot_offer_text?: string | null;
          snapshot_new_user_reward_text?: string | null;
          snapshot_client_reward_text?: string | null;
          snapshot_reward_type?: "credit" | "upgrade" | "discount" | "points" | null;
          snapshot_reward_amount?: number | null;
          snapshot_upgrade_name?: string | null;
          snapshot_reward_terms?: string | null;
          snapshot_logo_url?: string | null;
          snapshot_story_blocks?: Record<string, unknown>[] | null;
          snapshot_include_qr?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          name?: string | null;
          message?: string | null;
          channel?: "sms" | "email" | null;
          status?: string | null;
          total_recipients?: number | null;
          sent_count?: number | null;
          failed_count?: number | null;
          snapshot_offer_text?: string | null;
          snapshot_new_user_reward_text?: string | null;
          snapshot_client_reward_text?: string | null;
          snapshot_reward_type?: "credit" | "upgrade" | "discount" | "points" | null;
          snapshot_reward_amount?: number | null;
          snapshot_upgrade_name?: string | null;
          snapshot_reward_terms?: string | null;
          snapshot_logo_url?: string | null;
          snapshot_story_blocks?: Record<string, unknown>[] | null;
          snapshot_include_qr?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      credit_ledger: {
        Row: {
          id: string;
          business_id: string;
          customer_id: string;
          referral_id: string | null;
          delta: number;
          entry_type: "issued" | "spent" | "expired" | "adjustment";
          source: string;
          note: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          customer_id: string;
          referral_id?: string | null;
          delta: number;
          entry_type: "issued" | "spent" | "expired" | "adjustment";
          source: string;
          note?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          customer_id?: string;
          referral_id?: string | null;
          delta?: number;
          entry_type?: "issued" | "spent" | "expired" | "adjustment";
          source?: string;
          note?: string | null;
          created_at?: string | null;
        };
        Relationships: never[];
      };
      discount_redemptions: {
        Row: {
          id: string;
          business_id: string;
          customer_id: string | null;
          discount_code: string;
          order_reference: string | null;
          capture_source: string | null;
          notes: string | null;
          metadata: Record<string, unknown> | null;
          amount: number | null;
          captured_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          customer_id?: string | null;
          discount_code: string;
          order_reference?: string | null;
          capture_source?: string | null;
          notes?: string | null;
          metadata?: Record<string, unknown> | null;
          amount?: number | null;
          captured_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          customer_id?: string | null;
          discount_code?: string;
          order_reference?: string | null;
          capture_source?: string | null;
          notes?: string | null;
          metadata?: Record<string, unknown> | null;
          amount?: number | null;
          captured_at?: string | null;
        };
        Relationships: never[];
      };
      admin_roles: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          role: string | null;
          permissions: Json | null;
          is_active: boolean;
          revoked_at: string | null;
          granted_by: string | null;
          notes: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          role?: string | null;
          permissions?: Json | null;
          is_active?: boolean;
          revoked_at?: string | null;
          granted_by?: string | null;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          role?: string | null;
          permissions?: Json | null;
          is_active?: boolean;
          revoked_at?: string | null;
          granted_by?: string | null;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      ambassador_commission_balances: {
        Row: {
          customer_id: string;
          ambassador_name: string | null;
          ambassador_email: string | null;
          pending_balance: number | null;
          paid_total: number | null;
          lifetime_earnings: number | null;
          pending_commissions: number | null;
          paid_commissions: number | null;
          last_payout_date: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          customer_id: string;
          ambassador_name?: string | null;
          ambassador_email?: string | null;
          pending_balance?: number | null;
          paid_total?: number | null;
          lifetime_earnings?: number | null;
          pending_commissions?: number | null;
          paid_commissions?: number | null;
          last_payout_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          customer_id?: string;
          ambassador_name?: string | null;
          ambassador_email?: string | null;
          pending_balance?: number | null;
          paid_total?: number | null;
          lifetime_earnings?: number | null;
          pending_commissions?: number | null;
          paid_commissions?: number | null;
          last_payout_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      campaign_messages: {
        Row: {
          id: string;
          campaign_id: string;
          business_id: string;
          customer_id: string | null;
          channel: "sms" | "email" | null;
          to_address: string | null;
          referral_link: string | null;
          message_body: string | null;
          metadata: Json | null;
          scheduled_at: string | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          business_id: string;
          customer_id?: string | null;
          channel?: "sms" | "email" | null;
          to_address?: string | null;
          referral_link?: string | null;
          message_body?: string | null;
          metadata?: Json | null;
          scheduled_at?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          campaign_id?: string;
          business_id?: string;
          customer_id?: string | null;
          channel?: "sms" | "email" | null;
          to_address?: string | null;
          referral_link?: string | null;
          message_body?: string | null;
          metadata?: Json | null;
          scheduled_at?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
        Relationships: never[];
      };
      stripe_connect_accounts: {
        Row: {
          id: string;
          customer_id: string;
          stripe_account_id: string;
          account_type: string | null;
          charges_enabled: boolean | null;
          payouts_enabled: boolean | null;
          details_submitted: boolean | null;
          onboarding_completed: boolean | null;
          onboarding_url: string | null;
          onboarding_expires_at: string | null;
          country: string | null;
          email: string | null;
          requirements: Json | null;
          metadata: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          customer_id: string;
          stripe_account_id: string;
          account_type?: string | null;
          charges_enabled?: boolean | null;
          payouts_enabled?: boolean | null;
          details_submitted?: boolean | null;
          onboarding_completed?: boolean | null;
          onboarding_url?: string | null;
          onboarding_expires_at?: string | null;
          country?: string | null;
          email?: string | null;
          requirements?: Json | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          customer_id?: string;
          stripe_account_id?: string;
          account_type?: string | null;
          charges_enabled?: boolean | null;
          payouts_enabled?: boolean | null;
          details_submitted?: boolean | null;
          onboarding_completed?: boolean | null;
          onboarding_url?: string | null;
          onboarding_expires_at?: string | null;
          country?: string | null;
          email?: string | null;
          requirements?: Json | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      stripe_commissions: {
        Row: {
          id: string;
          business_id: string | null;
          ambassador_id: string;
          referral_id: string | null;
          payment_id: string | null;
          amount: number;
          currency: string;
          commission_type: string;
          commission_rate: number | null;
          original_payment_amount: number | null;
          status: string;
          approved_by: string | null;
          approved_at: string | null;
          paid_at: string | null;
          payout_id: string | null;
          notes: string | null;
          metadata: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id?: string | null;
          ambassador_id: string;
          referral_id?: string | null;
          payment_id?: string | null;
          amount: number;
          currency: string;
          commission_type: string;
          commission_rate?: number | null;
          original_payment_amount?: number | null;
          status: string;
          approved_by?: string | null;
          approved_at?: string | null;
          paid_at?: string | null;
          payout_id?: string | null;
          notes?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string | null;
          ambassador_id?: string;
          referral_id?: string | null;
          payment_id?: string | null;
          amount?: number;
          currency?: string;
          commission_type?: string;
          commission_rate?: number | null;
          original_payment_amount?: number | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          paid_at?: string | null;
          payout_id?: string | null;
          notes?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      stripe_customers: {
        Row: {
          id: string;
          business_id: string | null;
          customer_id: string | null;
          stripe_customer_id: string;
          email: string | null;
          name: string | null;
          metadata: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id?: string | null;
          customer_id?: string | null;
          stripe_customer_id: string;
          email?: string | null;
          name?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string | null;
          customer_id?: string | null;
          stripe_customer_id?: string;
          email?: string | null;
          name?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      stripe_payments: {
        Row: {
          id: string;
          business_id: string | null;
          stripe_customer_id: string | null;
          stripe_payment_intent_id: string;
          amount_total: number;
          amount_subtotal: number | null;
          currency: string;
          status: string;
          payment_method: string | null;
          payment_method_type: string | null;
          description: string | null;
          receipt_url: string | null;
          paid_at: string | null;
          refund_amount: number | null;
          refunded_at: string | null;
          metadata: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_payment_intent_id: string;
          amount_total: number;
          amount_subtotal?: number | null;
          currency: string;
          status: string;
          payment_method?: string | null;
          payment_method_type?: string | null;
          description?: string | null;
          receipt_url?: string | null;
          paid_at?: string | null;
          refund_amount?: number | null;
          refunded_at?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_payment_intent_id?: string;
          amount_total?: number;
          amount_subtotal?: number | null;
          currency?: string;
          status?: string;
          payment_method?: string | null;
          payment_method_type?: string | null;
          description?: string | null;
          receipt_url?: string | null;
          paid_at?: string | null;
          refund_amount?: number | null;
          refunded_at?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      stripe_payouts: {
        Row: {
          id: string;
          business_id: string | null;
          ambassador_id: string | null;
          stripe_transfer_id: string | null;
          stripe_connect_account_id: string | null;
          amount: number;
          currency: string;
          status: string;
          description: string | null;
          metadata: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id?: string | null;
          ambassador_id?: string | null;
          stripe_transfer_id?: string | null;
          stripe_connect_account_id?: string | null;
          amount: number;
          currency: string;
          status: string;
          description?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string | null;
          ambassador_id?: string | null;
          stripe_transfer_id?: string | null;
          stripe_connect_account_id?: string | null;
          amount?: number;
          currency?: string;
          status?: string;
          description?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      stripe_webhook_events: {
        Row: {
          id: string;
          stripe_event_id: string;
          event_type: string;
          object_type: string | null;
          object_id: string | null;
          payload: Json | null;
          processed: boolean | null;
          processed_at: string | null;
          processing_error: string | null;
          retry_count: number | null;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          stripe_event_id: string;
          event_type: string;
          object_type?: string | null;
          object_id?: string | null;
          payload?: Json | null;
          processed?: boolean | null;
          processed_at?: string | null;
          processing_error?: string | null;
          retry_count?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          stripe_event_id?: string;
          event_type?: string;
          object_type?: string | null;
          object_id?: string | null;
          payload?: Json | null;
          processed?: boolean | null;
          processed_at?: string | null;
          processing_error?: string | null;
          retry_count?: number | null;
          created_at?: string | null;
        };
        Relationships: never[];
      };
      referral_events: {
        Row: {
          id: string;
          business_id: string;
          ambassador_id: string | null;
          referral_id: string | null;
          event_type:
            | "link_visit"
            | "signup_submitted"
            | "conversion_pending"
            | "conversion_completed"
            | "manual_conversion_recorded"
            | "payout_released"
            | "payout_adjusted"
            | "campaign_message_queued"
            | "campaign_message_sent"
            | "campaign_message_delivered"
            | "campaign_message_failed"
            | "campaign_delivery_batch_started"
            | "campaign_delivery_batch_finished"
            | "schedule_call_clicked"
            | "contact_us_clicked"
            | "program_settings_updated";
          source: string | null;
          device: string | null;
          metadata: Record<string, unknown> | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          ambassador_id?: string | null;
          referral_id?: string | null;
          event_type:
            | "link_visit"
            | "signup_submitted"
            | "conversion_pending"
            | "conversion_completed"
            | "manual_conversion_recorded"
            | "payout_released"
            | "payout_adjusted"
            | "campaign_message_queued"
            | "campaign_message_sent"
            | "campaign_message_delivered"
            | "campaign_message_failed"
            | "campaign_delivery_batch_started"
            | "campaign_delivery_batch_finished"
            | "schedule_call_clicked"
            | "contact_us_clicked"
            | "program_settings_updated";
          source?: string | null;
          device?: string | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          ambassador_id?: string | null;
          referral_id?: string | null;
          event_type?:
            | "link_visit"
            | "signup_submitted"
            | "conversion_pending"
            | "conversion_completed"
            | "manual_conversion_recorded"
            | "payout_released"
            | "payout_adjusted"
            | "campaign_message_queued"
            | "campaign_message_sent"
            | "campaign_message_delivered"
            | "campaign_message_failed"
            | "campaign_delivery_batch_started"
            | "campaign_delivery_batch_finished"
            | "schedule_call_clicked"
            | "contact_us_clicked"
            | "program_settings_updated";
          source?: string | null;
          device?: string | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Relationships: never[];
      };
      demo_referrals: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          email: string | null;
          source: string | null;
          context: string | null;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          source?: string | null;
          context?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          source?: string | null;
          context?: string | null;
          created_at?: string | null;
        };
        Relationships: never[];
      };
      ai_campaign_variations: {
        Row: {
          id: string;
          business_id: string;
          campaign_id: string | null;
          variation_name: 'A' | 'B' | 'C';
          subject_line: string;
          email_body: string | null;
          sms_body: string | null;
          ai_model: string | null;
          ai_prompt_version: string | null;
          generation_context: Json | null;
          sends: number | null;
          opens: number | null;
          clicks: number | null;
          conversions: number | null;
          open_rate: number | null;
          click_rate: number | null;
          conversion_rate: number | null;
          is_winner: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          campaign_id?: string | null;
          variation_name: 'A' | 'B' | 'C';
          subject_line: string;
          email_body?: string | null;
          sms_body?: string | null;
          ai_model?: string | null;
          ai_prompt_version?: string | null;
          generation_context?: Json | null;
          sends?: number | null;
          opens?: number | null;
          clicks?: number | null;
          conversions?: number | null;
          open_rate?: number | null;
          click_rate?: number | null;
          conversion_rate?: number | null;
          is_winner?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          campaign_id?: string | null;
          variation_name?: 'A' | 'B' | 'C';
          subject_line?: string;
          email_body?: string | null;
          sms_body?: string | null;
          ai_model?: string | null;
          ai_prompt_version?: string | null;
          generation_context?: Json | null;
          sends?: number | null;
          opens?: number | null;
          clicks?: number | null;
          conversions?: number | null;
          open_rate?: number | null;
          click_rate?: number | null;
          conversion_rate?: number | null;
          is_winner?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      ai_predictions: {
        Row: {
          id: string;
          business_id: string;
          prediction_type: 'roi_forecast' | 'referral_volume' | 'optimal_incentive' | 'churn_risk' | 'lifetime_value';
          predicted_value: number;
          confidence_score: number;
          confidence_interval_low: number | null;
          confidence_interval_high: number | null;
          prediction_horizon_days: number;
          prediction_date: string;
          target_date: string;
          ai_model: string | null;
          model_version: string | null;
          training_data_points: number | null;
          prediction_context: Json | null;
          explanation: string | null;
          actual_value: number | null;
          actual_recorded_at: string | null;
          prediction_accuracy: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          prediction_type: 'roi_forecast' | 'referral_volume' | 'optimal_incentive' | 'churn_risk' | 'lifetime_value';
          predicted_value: number;
          confidence_score: number;
          confidence_interval_low?: number | null;
          confidence_interval_high?: number | null;
          prediction_horizon_days: number;
          prediction_date?: string;
          target_date: string;
          ai_model?: string | null;
          model_version?: string | null;
          training_data_points?: number | null;
          prediction_context?: Json | null;
          explanation?: string | null;
          actual_value?: number | null;
          actual_recorded_at?: string | null;
          prediction_accuracy?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          prediction_type?: 'roi_forecast' | 'referral_volume' | 'optimal_incentive' | 'churn_risk' | 'lifetime_value';
          predicted_value?: number;
          confidence_score?: number;
          confidence_interval_low?: number | null;
          confidence_interval_high?: number | null;
          prediction_horizon_days?: number;
          prediction_date?: string;
          target_date?: string;
          ai_model?: string | null;
          model_version?: string | null;
          training_data_points?: number | null;
          prediction_context?: Json | null;
          explanation?: string | null;
          actual_value?: number | null;
          actual_recorded_at?: string | null;
          prediction_accuracy?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      ai_health_alerts: {
        Row: {
          id: string;
          business_id: string;
          customer_id: string | null;
          alert_type: 'churn_risk' | 'engagement_drop' | 'opportunity' | 'milestone' | 'anomaly';
          severity: 'low' | 'medium' | 'high' | 'critical';
          title: string;
          description: string;
          recommended_action: string | null;
          ai_confidence: number;
          ai_explanation: string | null;
          status: 'active' | 'acknowledged' | 'resolved' | 'dismissed' | null;
          acknowledged_at: string | null;
          acknowledged_by: string | null;
          resolved_at: string | null;
          metadata: Json | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          customer_id?: string | null;
          alert_type: 'churn_risk' | 'engagement_drop' | 'opportunity' | 'milestone' | 'anomaly';
          severity: 'low' | 'medium' | 'high' | 'critical';
          title: string;
          description: string;
          recommended_action?: string | null;
          ai_confidence: number;
          ai_explanation?: string | null;
          status?: 'active' | 'acknowledged' | 'resolved' | 'dismissed' | null;
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          resolved_at?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          customer_id?: string | null;
          alert_type?: 'churn_risk' | 'engagement_drop' | 'opportunity' | 'milestone' | 'anomaly';
          severity?: 'low' | 'medium' | 'high' | 'critical';
          title?: string;
          description?: string;
          recommended_action?: string | null;
          ai_confidence?: number;
          ai_explanation?: string | null;
          status?: 'active' | 'acknowledged' | 'resolved' | 'dismissed' | null;
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          resolved_at?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      ai_scoring_jobs: {
        Row: {
          id: string;
          business_id: string;
          job_type: 'score_referrals' | 'generate_campaign' | 'predict_roi' | 'health_check' | 'optimize_timing';
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | null;
          input_data: Json;
          output_data: Json | null;
          started_at: string | null;
          completed_at: string | null;
          error_message: string | null;
          retry_count: number | null;
          max_retries: number | null;
          priority: number | null;
          scheduled_for: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          job_type: 'score_referrals' | 'generate_campaign' | 'predict_roi' | 'health_check' | 'optimize_timing';
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | null;
          input_data: Json;
          output_data?: Json | null;
          started_at?: string | null;
          completed_at?: string | null;
          error_message?: string | null;
          retry_count?: number | null;
          max_retries?: number | null;
          priority?: number | null;
          scheduled_for?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          job_type?: 'score_referrals' | 'generate_campaign' | 'predict_roi' | 'health_check' | 'optimize_timing';
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | null;
          input_data?: Json;
          output_data?: Json | null;
          started_at?: string | null;
          completed_at?: string | null;
          error_message?: string | null;
          retry_count?: number | null;
          max_retries?: number | null;
          priority?: number | null;
          scheduled_for?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
      ai_revenue_attribution: {
        Row: {
          id: string;
          business_id: string;
          customer_id: string | null;
          referral_id: string | null;
          revenue_amount: number;
          revenue_date: string;
          revenue_source: string | null;
          attribution_confidence: number;
          attribution_method: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'ai_weighted';
          ai_attribution_weight: number | null;
          ai_explanation: string | null;
          external_transaction_id: string | null;
          integration_source: 'stripe' | 'shopify' | 'square' | 'manual' | 'api' | null;
          metadata: Json | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          customer_id?: string | null;
          referral_id?: string | null;
          revenue_amount: number;
          revenue_date: string;
          revenue_source?: string | null;
          attribution_confidence: number;
          attribution_method: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'ai_weighted';
          ai_attribution_weight?: number | null;
          ai_explanation?: string | null;
          external_transaction_id?: string | null;
          integration_source?: 'stripe' | 'shopify' | 'square' | 'manual' | 'api' | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          customer_id?: string | null;
          referral_id?: string | null;
          revenue_amount?: number;
          revenue_date?: string;
          revenue_source?: string | null;
          attribution_confidence?: number;
          attribution_method?: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'ai_weighted';
          ai_attribution_weight?: number | null;
          ai_explanation?: string | null;
          external_transaction_id?: string | null;
          integration_source?: 'stripe' | 'shopify' | 'square' | 'manual' | 'api' | null;
          metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: never[];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_current_user_admin_role: {
        Args: Record<string, never>;
        Returns: string;
      };
      increment_campaign_counts: {
        Args: {
          target: string;
          sent_delta: number;
          failed_delta: number;
        };
        Returns: null;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
