// Minimal hand-written Supabase types to align with the queries used in the app.
// Replace with generated types from `supabase gen types typescript` when available.
export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string | null;
          offer_text: string | null;
          reward_type: string | null;
          reward_amount: number | null;
          upgrade_name: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name?: string | null;
          offer_text?: string | null;
          reward_type?: string | null;
          reward_amount?: number | null;
          upgrade_name?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string | null;
          offer_text?: string | null;
          reward_type?: string | null;
          reward_amount?: number | null;
          upgrade_name?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      customers: {
        Row: {
          id: string;
          business_id: string;
          name: string | null;
          phone: string | null;
          email: string | null;
          referral_code: string | null;
          status: string | null;
          credits: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          referral_code?: string | null;
          status?: string | null;
          credits?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          referral_code?: string | null;
          status?: string | null;
          credits?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      referrals: {
        Row: {
          id: string;
          business_id: string;
          ambassador_id: string | null;
          referred_name: string | null;
          referred_email: string | null;
          referred_phone: string | null;
          status: string | null;
          rewarded_at: string | null;
          created_at: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          ambassador_id?: string | null;
          referred_name?: string | null;
          referred_email?: string | null;
          referred_phone?: string | null;
          status?: string | null;
          rewarded_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          ambassador_id?: string | null;
          referred_name?: string | null;
          referred_email?: string | null;
          referred_phone?: string | null;
          status?: string | null;
          rewarded_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
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
      };
    };
  };
}
