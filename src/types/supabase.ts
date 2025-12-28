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
            | "campaign_delivery_batch_finished";
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
            | "campaign_delivery_batch_finished";
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
            | "campaign_delivery_batch_finished";
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
    };
    Views: Record<string, never>;
    Functions: {
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
