export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_role_audit_log: {
        Row: {
          action: string
          admin_role_id: string | null
          changed_by: string | null
          created_at: string | null
          email: string
          id: string
          metadata: Json | null
          new_role: string | null
          old_role: string | null
          reason: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          admin_role_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          email: string
          id?: string
          metadata?: Json | null
          new_role?: string | null
          old_role?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          admin_role_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          email?: string
          id?: string
          metadata?: Json | null
          new_role?: string | null
          old_role?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_role_audit_log_admin_role_id_fkey"
            columns: ["admin_role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          created_at: string | null
          email: string
          granted_at: string | null
          granted_by: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          permissions: Json | null
          revoked_at: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          permissions?: Json | null
          revoked_at?: string | null
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          permissions?: Json | null
          revoked_at?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_campaign_variations: {
        Row: {
          ai_model: string | null
          ai_prompt_version: string | null
          business_id: string
          campaign_id: string | null
          click_rate: number | null
          clicks: number | null
          conversion_rate: number | null
          conversions: number | null
          created_at: string | null
          email_body: string | null
          generation_context: Json | null
          id: string
          is_winner: boolean | null
          open_rate: number | null
          opens: number | null
          sends: number | null
          sms_body: string | null
          subject_line: string
          updated_at: string | null
          variation_name: string
        }
        Insert: {
          ai_model?: string | null
          ai_prompt_version?: string | null
          business_id: string
          campaign_id?: string | null
          click_rate?: number | null
          clicks?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string | null
          email_body?: string | null
          generation_context?: Json | null
          id?: string
          is_winner?: boolean | null
          open_rate?: number | null
          opens?: number | null
          sends?: number | null
          sms_body?: string | null
          subject_line: string
          updated_at?: string | null
          variation_name: string
        }
        Update: {
          ai_model?: string | null
          ai_prompt_version?: string | null
          business_id?: string
          campaign_id?: string | null
          click_rate?: number | null
          clicks?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string | null
          email_body?: string | null
          generation_context?: Json | null
          id?: string
          is_winner?: boolean | null
          open_rate?: number | null
          opens?: number | null
          sends?: number | null
          sms_body?: string | null
          subject_line?: string
          updated_at?: string | null
          variation_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_campaign_variations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "ai_campaign_variations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_campaign_variations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_health_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          ai_confidence: number
          ai_explanation: string | null
          alert_type: string
          business_id: string
          created_at: string | null
          customer_id: string | null
          description: string
          id: string
          metadata: Json | null
          recommended_action: string | null
          resolved_at: string | null
          severity: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          ai_confidence: number
          ai_explanation?: string | null
          alert_type: string
          business_id: string
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: string
          metadata?: Json | null
          recommended_action?: string | null
          resolved_at?: string | null
          severity: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          ai_confidence?: number
          ai_explanation?: string | null
          alert_type?: string
          business_id?: string
          created_at?: string | null
          customer_id?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          recommended_action?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_health_alerts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "ai_health_alerts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_health_alerts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "ai_health_alerts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_predictions: {
        Row: {
          actual_recorded_at: string | null
          actual_value: number | null
          ai_model: string | null
          business_id: string
          confidence_interval_high: number | null
          confidence_interval_low: number | null
          confidence_score: number
          created_at: string | null
          explanation: string | null
          id: string
          model_version: string | null
          predicted_value: number
          prediction_accuracy: number | null
          prediction_context: Json | null
          prediction_date: string
          prediction_horizon_days: number
          prediction_type: string
          target_date: string
          training_data_points: number | null
          updated_at: string | null
        }
        Insert: {
          actual_recorded_at?: string | null
          actual_value?: number | null
          ai_model?: string | null
          business_id: string
          confidence_interval_high?: number | null
          confidence_interval_low?: number | null
          confidence_score: number
          created_at?: string | null
          explanation?: string | null
          id?: string
          model_version?: string | null
          predicted_value: number
          prediction_accuracy?: number | null
          prediction_context?: Json | null
          prediction_date?: string
          prediction_horizon_days: number
          prediction_type: string
          target_date: string
          training_data_points?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_recorded_at?: string | null
          actual_value?: number | null
          ai_model?: string | null
          business_id?: string
          confidence_interval_high?: number | null
          confidence_interval_low?: number | null
          confidence_score?: number
          created_at?: string | null
          explanation?: string | null
          id?: string
          model_version?: string | null
          predicted_value?: number
          prediction_accuracy?: number | null
          prediction_context?: Json | null
          prediction_date?: string
          prediction_horizon_days?: number
          prediction_type?: string
          target_date?: string
          training_data_points?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_predictions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "ai_predictions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_revenue_attribution: {
        Row: {
          ai_attribution_weight: number | null
          ai_explanation: string | null
          attribution_confidence: number
          attribution_method: string
          business_id: string
          created_at: string | null
          customer_id: string | null
          external_transaction_id: string | null
          id: string
          integration_source: string | null
          metadata: Json | null
          referral_id: string | null
          revenue_amount: number
          revenue_date: string
          revenue_source: string | null
          updated_at: string | null
        }
        Insert: {
          ai_attribution_weight?: number | null
          ai_explanation?: string | null
          attribution_confidence: number
          attribution_method: string
          business_id: string
          created_at?: string | null
          customer_id?: string | null
          external_transaction_id?: string | null
          id?: string
          integration_source?: string | null
          metadata?: Json | null
          referral_id?: string | null
          revenue_amount: number
          revenue_date: string
          revenue_source?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_attribution_weight?: number | null
          ai_explanation?: string | null
          attribution_confidence?: number
          attribution_method?: string
          business_id?: string
          created_at?: string | null
          customer_id?: string | null
          external_transaction_id?: string | null
          id?: string
          integration_source?: string | null
          metadata?: Json | null
          referral_id?: string | null
          revenue_amount?: number
          revenue_date?: string
          revenue_source?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_revenue_attribution_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "ai_revenue_attribution_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_revenue_attribution_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "ai_revenue_attribution_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_revenue_attribution_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_scoring_jobs: {
        Row: {
          business_id: string
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          input_data: Json
          job_type: string
          max_retries: number | null
          output_data: Json | null
          priority: number | null
          retry_count: number | null
          scheduled_for: string | null
          started_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json
          job_type: string
          max_retries?: number | null
          output_data?: Json | null
          priority?: number | null
          retry_count?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json
          job_type?: string
          max_retries?: number | null
          output_data?: Json | null
          priority?: number | null
          retry_count?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_scoring_jobs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "ai_scoring_jobs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          metadata: Json | null
          target_resource_id: string | null
          target_user_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          target_resource_id?: string | null
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          target_resource_id?: string | null
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      businesses: {
        Row: {
          brand_highlight_color: string | null
          brand_tone: string | null
          client_reward_text: string | null
          compliance_framework: string | null
          created_at: string | null
          custom_landing_url: string | null
          data_residency_region: string | null
          discount_capture_secret: string | null
          dpa_accepted_at: string | null
          dpa_version: string | null
          id: string
          logo_url: string | null
          name: string | null
          new_user_reward_text: string | null
          offer_text: string | null
          onboarding_metadata: Json | null
          owner_id: string
          regulated_industry: boolean | null
          reward_amount: number | null
          reward_terms: string | null
          reward_type: string | null
          service_provider_type: string | null
          sign_on_bonus_amount: number | null
          sign_on_bonus_description: string | null
          sign_on_bonus_enabled: boolean | null
          sign_on_bonus_type: string | null
          soc2_audit_date: string | null
          soc2_certified: boolean | null
          updated_at: string | null
          upgrade_name: string | null
          website_url: string | null
        }
        Insert: {
          brand_highlight_color?: string | null
          brand_tone?: string | null
          client_reward_text?: string | null
          compliance_framework?: string | null
          created_at?: string | null
          custom_landing_url?: string | null
          data_residency_region?: string | null
          discount_capture_secret?: string | null
          dpa_accepted_at?: string | null
          dpa_version?: string | null
          id?: string
          logo_url?: string | null
          name?: string | null
          new_user_reward_text?: string | null
          offer_text?: string | null
          onboarding_metadata?: Json | null
          owner_id: string
          regulated_industry?: boolean | null
          reward_amount?: number | null
          reward_terms?: string | null
          reward_type?: string | null
          service_provider_type?: string | null
          sign_on_bonus_amount?: number | null
          sign_on_bonus_description?: string | null
          sign_on_bonus_enabled?: boolean | null
          sign_on_bonus_type?: string | null
          soc2_audit_date?: string | null
          soc2_certified?: boolean | null
          updated_at?: string | null
          upgrade_name?: string | null
          website_url?: string | null
        }
        Update: {
          brand_highlight_color?: string | null
          brand_tone?: string | null
          client_reward_text?: string | null
          compliance_framework?: string | null
          created_at?: string | null
          custom_landing_url?: string | null
          data_residency_region?: string | null
          discount_capture_secret?: string | null
          dpa_accepted_at?: string | null
          dpa_version?: string | null
          id?: string
          logo_url?: string | null
          name?: string | null
          new_user_reward_text?: string | null
          offer_text?: string | null
          onboarding_metadata?: Json | null
          owner_id?: string
          regulated_industry?: boolean | null
          reward_amount?: number | null
          reward_terms?: string | null
          reward_type?: string | null
          service_provider_type?: string | null
          sign_on_bonus_amount?: number | null
          sign_on_bonus_description?: string | null
          sign_on_bonus_enabled?: boolean | null
          sign_on_bonus_type?: string | null
          soc2_audit_date?: string | null
          soc2_certified?: boolean | null
          updated_at?: string | null
          upgrade_name?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_service_provider_type_fkey"
            columns: ["service_provider_type"]
            isOneToOne: false
            referencedRelation: "service_provider_types"
            referencedColumns: ["name"]
          },
        ]
      }
      campaign_messages: {
        Row: {
          attempts: number
          business_id: string
          campaign_id: string
          channel: string
          created_at: string | null
          customer_id: string | null
          delivered_at: string | null
          error: string | null
          id: string
          last_attempt_at: string | null
          message_body: string | null
          metadata: Json | null
          provider_message_id: string | null
          referral_link: string | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          to_address: string | null
          updated_at: string | null
        }
        Insert: {
          attempts?: number
          business_id: string
          campaign_id: string
          channel: string
          created_at?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          error?: string | null
          id?: string
          last_attempt_at?: string | null
          message_body?: string | null
          metadata?: Json | null
          provider_message_id?: string | null
          referral_link?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          to_address?: string | null
          updated_at?: string | null
        }
        Update: {
          attempts?: number
          business_id?: string
          campaign_id?: string
          channel?: string
          created_at?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          error?: string | null
          id?: string
          last_attempt_at?: string | null
          message_body?: string | null
          metadata?: Json | null
          provider_message_id?: string | null
          referral_link?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          to_address?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_messages_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "campaign_messages_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_messages_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "campaign_messages_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          business_id: string
          channel: string
          created_at: string
          failed_count: number
          id: string
          message: string
          name: string
          scheduled_at: string | null
          sent_count: number
          snapshot_client_reward_text: string | null
          snapshot_include_qr: boolean | null
          snapshot_logo_url: string | null
          snapshot_new_user_reward_text: string | null
          snapshot_offer_text: string | null
          snapshot_reward_amount: number | null
          snapshot_reward_terms: string | null
          snapshot_reward_type: string | null
          snapshot_story_blocks: Json | null
          snapshot_upgrade_name: string | null
          status: string
          total_recipients: number
          updated_at: string
        }
        Insert: {
          business_id: string
          channel: string
          created_at?: string
          failed_count?: number
          id?: string
          message: string
          name: string
          scheduled_at?: string | null
          sent_count?: number
          snapshot_client_reward_text?: string | null
          snapshot_include_qr?: boolean | null
          snapshot_logo_url?: string | null
          snapshot_new_user_reward_text?: string | null
          snapshot_offer_text?: string | null
          snapshot_reward_amount?: number | null
          snapshot_reward_terms?: string | null
          snapshot_reward_type?: string | null
          snapshot_story_blocks?: Json | null
          snapshot_upgrade_name?: string | null
          status?: string
          total_recipients?: number
          updated_at?: string
        }
        Update: {
          business_id?: string
          channel?: string
          created_at?: string
          failed_count?: number
          id?: string
          message?: string
          name?: string
          scheduled_at?: string | null
          sent_count?: number
          snapshot_client_reward_text?: string | null
          snapshot_include_qr?: boolean | null
          snapshot_logo_url?: string | null
          snapshot_new_user_reward_text?: string | null
          snapshot_offer_text?: string | null
          snapshot_reward_amount?: number | null
          snapshot_reward_terms?: string | null
          snapshot_reward_type?: string | null
          snapshot_story_blocks?: Json | null
          snapshot_upgrade_name?: string | null
          status?: string
          total_recipients?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_ledger: {
        Row: {
          business_id: string
          created_at: string | null
          customer_id: string
          delta: number
          entry_type: string
          id: string
          note: string | null
          referral_id: string | null
          source: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          customer_id: string
          delta: number
          entry_type: string
          id?: string
          note?: string | null
          referral_id?: string | null
          source: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          customer_id?: string
          delta?: number
          entry_type?: string
          id?: string
          note?: string | null
          referral_id?: string | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_ledger_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "credit_ledger_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_ledger_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "credit_ledger_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_ledger_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          ai_best_contact_time: string | null
          ai_estimated_value: number | null
          ai_likelihood_to_refer: number | null
          ai_optimal_approach: string | null
          ai_referral_score: number | null
          ai_score_explanation: string | null
          ai_score_version: string | null
          ai_scored_at: string | null
          audience_profile: string | null
          business_id: string
          churn_risk: number | null
          company: string | null
          compliance_status: string | null
          compliance_verified_at: string | null
          conversion_rate: number | null
          created_at: string | null
          credits: number | null
          discount_code: string | null
          email: string | null
          engagement_score: number | null
          health_status: string | null
          id: string
          instagram_handle: string | null
          last_compliance_check: string | null
          last_engagement_at: string | null
          license_jurisdiction: string | null
          linkedin_handle: string | null
          metadata: Json | null
          name: string | null
          notes: string | null
          partner_since_date: string | null
          partner_tier: string | null
          partner_tier_id: string | null
          phone: string | null
          professional_license_number: string | null
          referral_code: string | null
          referral_link: string | null
          service_provider_type: string | null
          source: string | null
          status: string | null
          total_conversions: number | null
          total_referrals_sent: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          ai_best_contact_time?: string | null
          ai_estimated_value?: number | null
          ai_likelihood_to_refer?: number | null
          ai_optimal_approach?: string | null
          ai_referral_score?: number | null
          ai_score_explanation?: string | null
          ai_score_version?: string | null
          ai_scored_at?: string | null
          audience_profile?: string | null
          business_id: string
          churn_risk?: number | null
          company?: string | null
          compliance_status?: string | null
          compliance_verified_at?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          credits?: number | null
          discount_code?: string | null
          email?: string | null
          engagement_score?: number | null
          health_status?: string | null
          id?: string
          instagram_handle?: string | null
          last_compliance_check?: string | null
          last_engagement_at?: string | null
          license_jurisdiction?: string | null
          linkedin_handle?: string | null
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          partner_since_date?: string | null
          partner_tier?: string | null
          partner_tier_id?: string | null
          phone?: string | null
          professional_license_number?: string | null
          referral_code?: string | null
          referral_link?: string | null
          service_provider_type?: string | null
          source?: string | null
          status?: string | null
          total_conversions?: number | null
          total_referrals_sent?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          ai_best_contact_time?: string | null
          ai_estimated_value?: number | null
          ai_likelihood_to_refer?: number | null
          ai_optimal_approach?: string | null
          ai_referral_score?: number | null
          ai_score_explanation?: string | null
          ai_score_version?: string | null
          ai_scored_at?: string | null
          audience_profile?: string | null
          business_id?: string
          churn_risk?: number | null
          company?: string | null
          compliance_status?: string | null
          compliance_verified_at?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          credits?: number | null
          discount_code?: string | null
          email?: string | null
          engagement_score?: number | null
          health_status?: string | null
          id?: string
          instagram_handle?: string | null
          last_compliance_check?: string | null
          last_engagement_at?: string | null
          license_jurisdiction?: string | null
          linkedin_handle?: string | null
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          partner_since_date?: string | null
          partner_tier?: string | null
          partner_tier_id?: string | null
          phone?: string | null
          professional_license_number?: string | null
          referral_code?: string | null
          referral_link?: string | null
          service_provider_type?: string | null
          source?: string | null
          status?: string | null
          total_conversions?: number | null
          total_referrals_sent?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_partner_tier_id_fkey"
            columns: ["partner_tier_id"]
            isOneToOne: false
            referencedRelation: "partner_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_service_provider_type_fkey"
            columns: ["service_provider_type"]
            isOneToOne: false
            referencedRelation: "service_provider_types"
            referencedColumns: ["name"]
          },
        ]
      }
      demo_referrals: {
        Row: {
          context: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          source: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          source?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          source?: string | null
        }
        Relationships: []
      }
      discount_redemptions: {
        Row: {
          amount: number | null
          business_id: string
          capture_source: string | null
          captured_at: string | null
          customer_id: string | null
          discount_code: string
          id: string
          metadata: Json | null
          notes: string | null
          order_reference: string | null
        }
        Insert: {
          amount?: number | null
          business_id: string
          capture_source?: string | null
          captured_at?: string | null
          customer_id?: string | null
          discount_code: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_reference?: string | null
        }
        Update: {
          amount?: number | null
          business_id?: string
          capture_source?: string | null
          captured_at?: string | null
          customer_id?: string | null
          discount_code?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discount_redemptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "discount_redemptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discount_redemptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "discount_redemptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      external_partner_links: {
        Row: {
          business_id: string
          campaign_goal: string
          created_at: string
          customer_id: string
          id: string
          landing_url: string
          request_id: string | null
          status: string
        }
        Insert: {
          business_id: string
          campaign_goal: string
          created_at?: string
          customer_id: string
          id?: string
          landing_url: string
          request_id?: string | null
          status?: string
        }
        Update: {
          business_id?: string
          campaign_goal?: string
          created_at?: string
          customer_id?: string
          id?: string
          landing_url?: string
          request_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_partner_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "external_partner_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_partner_links_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "external_partner_links_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_partner_links_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "external_partner_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      external_partner_request_datasets: {
        Row: {
          business_id: string
          filename: string
          id: string
          request_id: string
          storage_bucket: string
          storage_path: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          business_id: string
          filename: string
          id?: string
          request_id: string
          storage_bucket: string
          storage_path: string
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          business_id?: string
          filename?: string
          id?: string
          request_id?: string
          storage_bucket?: string
          storage_path?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_partner_request_datasets_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "external_partner_request_datasets_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_partner_request_datasets_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "external_partner_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      external_partner_requests: {
        Row: {
          assigned_to: string | null
          business_id: string
          created_at: string
          id: string
          payload: Json
          status: string
          submitted_by: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          business_id: string
          created_at?: string
          id?: string
          payload?: Json
          status?: string
          submitted_by: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          business_id?: string
          created_at?: string
          id?: string
          payload?: Json
          status?: string
          submitted_by?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_partner_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "external_partner_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      partner_agreement_acceptances: {
        Row: {
          acceptance_method: string | null
          accepted_at: string | null
          agreement_id: string
          customer_id: string
          electronic_signature: string | null
          id: string
          ip_address: unknown
          user_agent: string | null
        }
        Insert: {
          acceptance_method?: string | null
          accepted_at?: string | null
          agreement_id: string
          customer_id: string
          electronic_signature?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
        }
        Update: {
          acceptance_method?: string | null
          accepted_at?: string | null
          agreement_id?: string
          customer_id?: string
          electronic_signature?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_agreement_acceptances_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "partner_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_agreement_acceptances_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "partner_agreement_acceptances_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_agreements: {
        Row: {
          business_id: string
          created_at: string | null
          created_by: string | null
          effective_date: string
          expires_date: string | null
          id: string
          is_active: boolean | null
          requires_acceptance: boolean | null
          terms_html: string | null
          terms_text: string
          title: string
          version: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          created_by?: string | null
          effective_date: string
          expires_date?: string | null
          id?: string
          is_active?: boolean | null
          requires_acceptance?: boolean | null
          terms_html?: string | null
          terms_text: string
          title: string
          version: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          created_by?: string | null
          effective_date?: string
          expires_date?: string | null
          id?: string
          is_active?: boolean | null
          requires_acceptance?: boolean | null
          terms_html?: string | null
          terms_text?: string
          title?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_agreements_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "partner_agreements_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_applications: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approved_tier: string | null
          audience_profile: string | null
          business_id: string
          company: string | null
          compliance_notes: string | null
          created_at: string | null
          customer_id: string | null
          email: string | null
          id: string
          instagram_handle: string | null
          linkedin_handle: string | null
          name: string | null
          notes: string | null
          phone: string | null
          professional_license_number: string | null
          service_provider_type: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approved_tier?: string | null
          audience_profile?: string | null
          business_id: string
          company?: string | null
          compliance_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          id?: string
          instagram_handle?: string | null
          linkedin_handle?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          professional_license_number?: string | null
          service_provider_type?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approved_tier?: string | null
          audience_profile?: string | null
          business_id?: string
          company?: string | null
          compliance_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          id?: string
          instagram_handle?: string | null
          linkedin_handle?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          professional_license_number?: string | null
          service_provider_type?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_applications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "partner_applications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_applications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "partner_applications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_applications_service_provider_type_fkey"
            columns: ["service_provider_type"]
            isOneToOne: false
            referencedRelation: "service_provider_types"
            referencedColumns: ["name"]
          },
        ]
      }
      partner_compliance_status: {
        Row: {
          business_id: string
          created_at: string | null
          customer_id: string
          document_url: string | null
          expiry_date: string | null
          id: string
          status: string
          updated_at: string | null
          verification_date: string | null
          verification_notes: string | null
          verification_type: string | null
          verified_by: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          customer_id: string
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          status: string
          updated_at?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verification_type?: string | null
          verified_by?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          customer_id?: string
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verification_type?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_compliance_status_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "partner_compliance_status_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_compliance_status_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "partner_compliance_status_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_tiers: {
        Row: {
          benefits: string | null
          business_id: string
          commission_rate_percentage: number
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          min_monthly_revenue: number | null
          min_referrals_required: number | null
          tier_name: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string | null
          business_id: string
          commission_rate_percentage: number
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          min_monthly_revenue?: number | null
          min_referrals_required?: number | null
          tier_name: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string | null
          business_id?: string
          commission_rate_percentage?: number
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          min_monthly_revenue?: number | null
          min_referrals_required?: number | null
          tier_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_tiers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "partner_tiers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_events: {
        Row: {
          ambassador_id: string | null
          business_id: string
          created_at: string | null
          device: string | null
          event_type: string
          id: string
          metadata: Json | null
          referral_id: string | null
          source: string | null
        }
        Insert: {
          ambassador_id?: string | null
          business_id: string
          created_at?: string | null
          device?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          referral_id?: string | null
          source?: string | null
        }
        Update: {
          ambassador_id?: string | null
          business_id?: string
          created_at?: string | null
          device?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          referral_id?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_events_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "referral_events_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "referral_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_events_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          ambassador_id: string | null
          business_id: string
          campaign_id: string | null
          consent_given: boolean | null
          created_at: string | null
          created_by: string | null
          id: string
          is_manual: boolean
          locale: string | null
          referred_email: string | null
          referred_name: string | null
          referred_phone: string | null
          rewarded_at: string | null
          service_type: string | null
          status: string | null
          transaction_date: string | null
          transaction_value: number | null
          updated_at: string | null
        }
        Insert: {
          ambassador_id?: string | null
          business_id: string
          campaign_id?: string | null
          consent_given?: boolean | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_manual?: boolean
          locale?: string | null
          referred_email?: string | null
          referred_name?: string | null
          referred_phone?: string | null
          rewarded_at?: string | null
          service_type?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_value?: number | null
          updated_at?: string | null
        }
        Update: {
          ambassador_id?: string | null
          business_id?: string
          campaign_id?: string | null
          consent_given?: boolean | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_manual?: boolean
          locale?: string | null
          referred_email?: string | null
          referred_name?: string | null
          referred_phone?: string | null
          rewarded_at?: string | null
          service_type?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "referrals_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "referrals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_requirements: {
        Row: {
          created_at: string | null
          description: string | null
          documentation_required: boolean | null
          id: string
          jurisdiction: string | null
          renewal_period_days: number | null
          required_for_platform: boolean | null
          requirement_code: string | null
          requirement_name: string
          service_type_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          documentation_required?: boolean | null
          id?: string
          jurisdiction?: string | null
          renewal_period_days?: number | null
          required_for_platform?: boolean | null
          requirement_code?: string | null
          requirement_name: string
          service_type_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          documentation_required?: boolean | null
          id?: string
          jurisdiction?: string | null
          renewal_period_days?: number | null
          required_for_platform?: boolean | null
          requirement_code?: string | null
          requirement_name?: string
          service_type_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regulatory_requirements_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_provider_types"
            referencedColumns: ["id"]
          },
        ]
      }
      service_provider_types: {
        Row: {
          compliance_framework: string | null
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          name: string
          requires_professional_license: boolean | null
          updated_at: string | null
        }
        Insert: {
          compliance_framework?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          name: string
          requires_professional_license?: boolean | null
          updated_at?: string | null
        }
        Update: {
          compliance_framework?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          name?: string
          requires_professional_license?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stripe_commissions: {
        Row: {
          ambassador_id: string | null
          amount: number
          approved_at: string | null
          approved_by: string | null
          business_id: string | null
          commission_rate: number | null
          commission_type: string
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          notes: string | null
          original_payment_amount: number | null
          paid_at: string | null
          payment_id: string | null
          payout_id: string | null
          referral_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          ambassador_id?: string | null
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          business_id?: string | null
          commission_rate?: number | null
          commission_type: string
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          original_payment_amount?: number | null
          paid_at?: string | null
          payment_id?: string | null
          payout_id?: string | null
          referral_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          ambassador_id?: string | null
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          business_id?: string | null
          commission_rate?: number | null
          commission_type?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          original_payment_amount?: number | null
          paid_at?: string | null
          payment_id?: string | null
          payout_id?: string | null
          referral_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_commission_payout"
            columns: ["payout_id"]
            isOneToOne: false
            referencedRelation: "stripe_payouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_commissions_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "stripe_commissions_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_commissions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "stripe_commissions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_commissions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "stripe_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_commissions_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_connect_accounts: {
        Row: {
          account_type: string | null
          business_name: string | null
          charges_enabled: boolean | null
          country: string | null
          created_at: string | null
          customer_id: string | null
          details_submitted: boolean | null
          email: string | null
          id: string
          individual_name: string | null
          metadata: Json | null
          onboarding_completed: boolean | null
          onboarding_expires_at: string | null
          onboarding_url: string | null
          payouts_enabled: boolean | null
          requirements: Json | null
          stripe_account_id: string
          updated_at: string | null
        }
        Insert: {
          account_type?: string | null
          business_name?: string | null
          charges_enabled?: boolean | null
          country?: string | null
          created_at?: string | null
          customer_id?: string | null
          details_submitted?: boolean | null
          email?: string | null
          id?: string
          individual_name?: string | null
          metadata?: Json | null
          onboarding_completed?: boolean | null
          onboarding_expires_at?: string | null
          onboarding_url?: string | null
          payouts_enabled?: boolean | null
          requirements?: Json | null
          stripe_account_id: string
          updated_at?: string | null
        }
        Update: {
          account_type?: string | null
          business_name?: string | null
          charges_enabled?: boolean | null
          country?: string | null
          created_at?: string | null
          customer_id?: string | null
          details_submitted?: boolean | null
          email?: string | null
          id?: string
          individual_name?: string | null
          metadata?: Json | null
          onboarding_completed?: boolean | null
          onboarding_expires_at?: string | null
          onboarding_url?: string | null
          payouts_enabled?: boolean | null
          requirements?: Json | null
          stripe_account_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connect_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "stripe_connect_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customers: {
        Row: {
          business_id: string | null
          created_at: string | null
          customer_id: string | null
          email: string
          id: string
          metadata: Json | null
          name: string | null
          stripe_customer_id: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          email: string
          id?: string
          metadata?: Json | null
          name?: string | null
          stripe_customer_id: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          email?: string
          id?: string
          metadata?: Json | null
          name?: string | null
          stripe_customer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "stripe_customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_customers_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "stripe_customers_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_payments: {
        Row: {
          amount_subtotal: number
          amount_total: number
          business_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          metadata: Json | null
          paid_at: string | null
          payment_method: string | null
          payment_method_type: string | null
          receipt_url: string | null
          refund_amount: number | null
          refunded_at: string | null
          status: string
          stripe_checkout_session_id: string | null
          stripe_customer_id: string | null
          stripe_payment_intent_id: string
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_subtotal: number
          amount_total: number
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_method_type?: string | null
          receipt_url?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          status: string
          stripe_checkout_session_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id: string
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_subtotal?: number
          amount_total?: number
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_method_type?: string | null
          receipt_url?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_payments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "stripe_payments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_payments_stripe_customer_id_fkey"
            columns: ["stripe_customer_id"]
            isOneToOne: false
            referencedRelation: "stripe_customers"
            referencedColumns: ["stripe_customer_id"]
          },
        ]
      }
      stripe_payouts: {
        Row: {
          ambassador_id: string | null
          amount: number
          arrival_date: string | null
          business_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          failure_code: string | null
          failure_message: string | null
          id: string
          initiated_by: string | null
          metadata: Json | null
          method: string | null
          status: string | null
          stripe_connect_account_id: string
          stripe_payout_id: string | null
          stripe_transfer_id: string | null
          updated_at: string | null
        }
        Insert: {
          ambassador_id?: string | null
          amount: number
          arrival_date?: string | null
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          initiated_by?: string | null
          metadata?: Json | null
          method?: string | null
          status?: string | null
          stripe_connect_account_id: string
          stripe_payout_id?: string | null
          stripe_transfer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ambassador_id?: string | null
          amount?: number
          arrival_date?: string | null
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          initiated_by?: string | null
          metadata?: Json | null
          method?: string | null
          status?: string | null
          stripe_connect_account_id?: string
          stripe_payout_id?: string | null
          stripe_transfer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_payouts_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "ambassador_commission_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "stripe_payouts_ambassador_id_fkey"
            columns: ["ambassador_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_payouts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "stripe_payouts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_webhook_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          object_id: string | null
          object_type: string | null
          payload: Json
          processed: boolean | null
          processed_at: string | null
          processing_error: string | null
          retry_count: number | null
          stripe_event_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          object_id?: string | null
          object_type?: string | null
          payload: Json
          processed?: boolean | null
          processed_at?: string | null
          processing_error?: string | null
          retry_count?: number | null
          stripe_event_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          object_id?: string | null
          object_type?: string | null
          payload?: Json
          processed?: boolean | null
          processed_at?: string | null
          processing_error?: string | null
          retry_count?: number | null
          stripe_event_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      ai_insights_dashboard: {
        Row: {
          at_risk_referrers: number | null
          avg_conversion_rate: number | null
          avg_engagement_score: number | null
          avg_referral_score: number | null
          business_id: string | null
          champion_referrers: number | null
          churned_referrers: number | null
          high_potential_referrers: number | null
          low_potential_referrers: number | null
          medium_potential_referrers: number | null
          total_conversions: number | null
          total_referrals_sent: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_payment_summary"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      ambassador_commission_balances: {
        Row: {
          ambassador_email: string | null
          ambassador_name: string | null
          customer_id: string | null
          last_payout_date: string | null
          lifetime_earnings: number | null
          paid_commissions: number | null
          paid_total: number | null
          pending_balance: number | null
          pending_commissions: number | null
        }
        Relationships: []
      }
      business_payment_summary: {
        Row: {
          business_id: string | null
          business_name: string | null
          last_payment_date: string | null
          successful_payments: number | null
          total_payments: number | null
          total_refunds: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_current_user_admin_role: { Args: never; Returns: string }
      has_admin_role: {
        Args: { required_role: string; user_id: string }
        Returns: boolean
      }
      increment_campaign_counts: {
        Args: { failed_delta: number; sent_delta: number; target: string }
        Returns: undefined
      }
      is_admin: { Args: { user_id: string }; Returns: boolean }
      is_current_user_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
