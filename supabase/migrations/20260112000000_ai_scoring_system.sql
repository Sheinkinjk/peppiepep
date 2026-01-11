-- AI Scoring System Migration
-- Adds AI-powered referral scoring, predictions, and intelligence features

-- 1. Add AI scoring columns to customers table
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS ai_referral_score INTEGER DEFAULT NULL CHECK (ai_referral_score >= 0 AND ai_referral_score <= 100),
ADD COLUMN IF NOT EXISTS ai_score_explanation TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_estimated_value DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_likelihood_to_refer DECIMAL(5,4) DEFAULT NULL CHECK (ai_likelihood_to_refer >= 0 AND ai_likelihood_to_refer <= 1),
ADD COLUMN IF NOT EXISTS ai_optimal_approach TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_best_contact_time TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_scored_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_score_version VARCHAR(20) DEFAULT 'v1.0';

-- 2. Add engagement and health tracking columns
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS engagement_score INTEGER DEFAULT 50 CHECK (engagement_score >= 0 AND engagement_score <= 100),
ADD COLUMN IF NOT EXISTS churn_risk DECIMAL(5,4) DEFAULT NULL CHECK (churn_risk >= 0 AND churn_risk <= 1),
ADD COLUMN IF NOT EXISTS health_status VARCHAR(20) DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'at_risk', 'churned', 'champion')),
ADD COLUMN IF NOT EXISTS last_engagement_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS total_referrals_sent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_conversions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS conversion_rate DECIMAL(5,4) DEFAULT NULL;

-- 3. Create AI campaign variations table (for A/B/C testing)
CREATE TABLE IF NOT EXISTS ai_campaign_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,

  -- Variation metadata
  variation_name VARCHAR(10) NOT NULL CHECK (variation_name IN ('A', 'B', 'C')),

  -- AI-generated content
  subject_line TEXT NOT NULL,
  email_body TEXT,
  sms_body TEXT,

  -- Generation metadata
  ai_model VARCHAR(50) DEFAULT 'claude-sonnet-4.5',
  ai_prompt_version VARCHAR(20) DEFAULT 'v1.0',
  generation_context JSONB DEFAULT '{}',

  -- Performance tracking
  sends INTEGER DEFAULT 0,
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,

  -- Calculated metrics
  open_rate DECIMAL(5,4) DEFAULT NULL,
  click_rate DECIMAL(5,4) DEFAULT NULL,
  conversion_rate DECIMAL(5,4) DEFAULT NULL,

  -- Winning variant
  is_winner BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaign_variations_business ON ai_campaign_variations(business_id);
CREATE INDEX IF NOT EXISTS idx_campaign_variations_campaign ON ai_campaign_variations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_variations_winner ON ai_campaign_variations(is_winner) WHERE is_winner = TRUE;

-- 4. Create AI predictions table (for ROI forecasts)
CREATE TABLE IF NOT EXISTS ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,

  -- Prediction type
  prediction_type VARCHAR(50) NOT NULL CHECK (prediction_type IN ('roi_forecast', 'referral_volume', 'optimal_incentive', 'churn_risk', 'lifetime_value')),

  -- Prediction values
  predicted_value DECIMAL(12,2) NOT NULL,
  confidence_score DECIMAL(5,4) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  confidence_interval_low DECIMAL(12,2),
  confidence_interval_high DECIMAL(12,2),

  -- Time horizon
  prediction_horizon_days INTEGER NOT NULL,
  prediction_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  target_date TIMESTAMPTZ NOT NULL,

  -- Model metadata
  ai_model VARCHAR(50) DEFAULT 'claude-sonnet-4.5',
  model_version VARCHAR(20) DEFAULT 'v1.0',
  training_data_points INTEGER DEFAULT 0,

  -- Context and explanation
  prediction_context JSONB DEFAULT '{}',
  explanation TEXT,

  -- Actual outcome (filled in after target_date)
  actual_value DECIMAL(12,2),
  actual_recorded_at TIMESTAMPTZ,
  prediction_accuracy DECIMAL(5,4),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_predictions_business ON ai_predictions(business_id);
CREATE INDEX IF NOT EXISTS idx_predictions_type ON ai_predictions(prediction_type);
CREATE INDEX IF NOT EXISTS idx_predictions_target_date ON ai_predictions(target_date);

-- 5. Create AI health alerts table
CREATE TABLE IF NOT EXISTS ai_health_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,

  -- Alert details
  alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('churn_risk', 'engagement_drop', 'opportunity', 'milestone', 'anomaly')),
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),

  -- Alert content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  recommended_action TEXT,

  -- AI analysis
  ai_confidence DECIMAL(5,4) NOT NULL CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
  ai_explanation TEXT,

  -- Alert lifecycle
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,

  -- Alert metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_health_alerts_business ON ai_health_alerts(business_id);
CREATE INDEX IF NOT EXISTS idx_health_alerts_customer ON ai_health_alerts(customer_id);
CREATE INDEX IF NOT EXISTS idx_health_alerts_status ON ai_health_alerts(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_health_alerts_severity ON ai_health_alerts(severity);

-- 6. Create AI scoring jobs queue (for background processing)
CREATE TABLE IF NOT EXISTS ai_scoring_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,

  -- Job details
  job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('score_referrals', 'generate_campaign', 'predict_roi', 'health_check', 'optimize_timing')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),

  -- Job payload
  input_data JSONB NOT NULL DEFAULT '{}',
  output_data JSONB DEFAULT '{}',

  -- Processing metadata
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,

  -- Priority and scheduling
  priority INTEGER DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scoring_jobs_business ON ai_scoring_jobs(business_id);
CREATE INDEX IF NOT EXISTS idx_scoring_jobs_status ON ai_scoring_jobs(status) WHERE status IN ('pending', 'processing');
CREATE INDEX IF NOT EXISTS idx_scoring_jobs_scheduled ON ai_scoring_jobs(scheduled_for) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_scoring_jobs_priority ON ai_scoring_jobs(priority DESC);

-- 7. Create AI revenue attribution table
CREATE TABLE IF NOT EXISTS ai_revenue_attribution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,

  -- Revenue data
  revenue_amount DECIMAL(12,2) NOT NULL,
  revenue_date TIMESTAMPTZ NOT NULL,
  revenue_source VARCHAR(100),

  -- Attribution confidence
  attribution_confidence DECIMAL(5,4) NOT NULL CHECK (attribution_confidence >= 0 AND attribution_confidence <= 1),
  attribution_method VARCHAR(50) NOT NULL CHECK (attribution_method IN ('first_touch', 'last_touch', 'linear', 'time_decay', 'ai_weighted')),

  -- AI analysis
  ai_attribution_weight DECIMAL(5,4) CHECK (ai_attribution_weight >= 0 AND ai_attribution_weight <= 1),
  ai_explanation TEXT,

  -- Integration metadata
  external_transaction_id VARCHAR(255),
  integration_source VARCHAR(50) CHECK (integration_source IN ('stripe', 'shopify', 'square', 'manual', 'api')),

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revenue_attribution_business ON ai_revenue_attribution(business_id);
CREATE INDEX IF NOT EXISTS idx_revenue_attribution_customer ON ai_revenue_attribution(customer_id);
CREATE INDEX IF NOT EXISTS idx_revenue_attribution_referral ON ai_revenue_attribution(referral_id);
CREATE INDEX IF NOT EXISTS idx_revenue_attribution_date ON ai_revenue_attribution(revenue_date);
CREATE INDEX IF NOT EXISTS idx_revenue_attribution_external_id ON ai_revenue_attribution(external_transaction_id);

-- 8. Create view for AI insights dashboard
CREATE OR REPLACE VIEW ai_insights_dashboard AS
SELECT
  c.business_id,
  COUNT(*) FILTER (WHERE c.ai_referral_score >= 80) as high_potential_referrers,
  COUNT(*) FILTER (WHERE c.ai_referral_score >= 50 AND c.ai_referral_score < 80) as medium_potential_referrers,
  COUNT(*) FILTER (WHERE c.ai_referral_score < 50) as low_potential_referrers,
  COUNT(*) FILTER (WHERE c.health_status = 'champion') as champion_referrers,
  COUNT(*) FILTER (WHERE c.health_status = 'at_risk') as at_risk_referrers,
  COUNT(*) FILTER (WHERE c.health_status = 'churned') as churned_referrers,
  AVG(c.ai_referral_score) as avg_referral_score,
  AVG(c.engagement_score) as avg_engagement_score,
  AVG(c.conversion_rate) as avg_conversion_rate,
  SUM(c.total_referrals_sent) as total_referrals_sent,
  SUM(c.total_conversions) as total_conversions
FROM customers c
WHERE c.ai_referral_score IS NOT NULL
GROUP BY c.business_id;

-- 9. Add update trigger for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_campaign_variations_updated_at BEFORE UPDATE ON ai_campaign_variations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_predictions_updated_at BEFORE UPDATE ON ai_predictions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_health_alerts_updated_at BEFORE UPDATE ON ai_health_alerts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_scoring_jobs_updated_at BEFORE UPDATE ON ai_scoring_jobs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_revenue_attribution_updated_at BEFORE UPDATE ON ai_revenue_attribution
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Add RLS policies (Row Level Security)
ALTER TABLE ai_campaign_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_health_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_scoring_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_revenue_attribution ENABLE ROW LEVEL SECURITY;

-- Policy: Business owners can access their own AI data
CREATE POLICY "Users can view their business AI variations" ON ai_campaign_variations
FOR SELECT USING (
  business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can view their business AI predictions" ON ai_predictions
FOR SELECT USING (
  business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can view their business AI alerts" ON ai_health_alerts
FOR SELECT USING (
  business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update their business AI alerts" ON ai_health_alerts
FOR UPDATE USING (
  business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can view their business AI jobs" ON ai_scoring_jobs
FOR SELECT USING (
  business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can view their business revenue attribution" ON ai_revenue_attribution
FOR SELECT USING (
  business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  )
);

-- Grant necessary permissions
GRANT SELECT ON ai_insights_dashboard TO authenticated;

COMMENT ON TABLE ai_campaign_variations IS 'AI-generated A/B/C test variations for campaigns';
COMMENT ON TABLE ai_predictions IS 'AI-powered predictions for ROI, churn, LTV, etc.';
COMMENT ON TABLE ai_health_alerts IS 'Automated alerts for referrer health and opportunities';
COMMENT ON TABLE ai_scoring_jobs IS 'Background job queue for AI scoring operations';
COMMENT ON TABLE ai_revenue_attribution IS 'AI-powered revenue attribution tracking';
