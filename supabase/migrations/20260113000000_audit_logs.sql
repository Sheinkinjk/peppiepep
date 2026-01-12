-- Audit Logs Table Migration
-- Creates table for storing admin action audit trails

-- ============================================================================
-- AUDIT LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL, -- 'partner_approved', 'compliance_verified', 'admin_login', etc.
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Admin who performed action
  target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- User affected by action
  target_resource_id TEXT, -- ID of resource affected (partner_id, application_id, etc.)
  metadata JSONB, -- Additional context about the action
  ip_address INET, -- IP address from which action was performed
  user_agent TEXT, -- Browser/client user agent
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target_user_id ON public.audit_logs(target_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_address ON public.audit_logs(ip_address);

-- GIN index for JSONB metadata queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_metadata ON public.audit_logs USING GIN (metadata);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs (via admin role check)
-- Note: This requires admin RBAC system to be in place
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view all audit logs"
  ON public.audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_id = auth.uid()
      AND is_active = TRUE
    )
  );

-- Only the system (service role) can insert audit logs
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (TRUE); -- Service role bypasses RLS, regular users won't be able to insert

-- Prevent updates and deletes (audit logs are immutable)
DROP POLICY IF EXISTS "Audit logs are immutable" ON public.audit_logs;
CREATE POLICY "Audit logs are immutable"
  ON public.audit_logs FOR UPDATE
  USING (FALSE);

DROP POLICY IF EXISTS "Audit logs cannot be deleted" ON public.audit_logs;
CREATE POLICY "Audit logs cannot be deleted"
  ON public.audit_logs FOR DELETE
  USING (FALSE);

-- ============================================================================
-- AUTOMATIC CLEANUP (OPTIONAL)
-- ============================================================================
-- Function to archive old audit logs (optional - keeps last 90 days)
-- Uncomment if you want automatic cleanup

-- CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
-- RETURNS void AS $$
-- BEGIN
--   DELETE FROM public.audit_logs
--   WHERE created_at < NOW() - INTERVAL '90 days';
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- You can schedule this function to run daily using pg_cron or externally

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE public.audit_logs IS 'Immutable audit trail of admin actions with IP tracking and metadata';
COMMENT ON COLUMN public.audit_logs.action IS 'Type of action performed (e.g., partner_approved, compliance_verified)';
COMMENT ON COLUMN public.audit_logs.user_id IS 'Admin user who performed the action';
COMMENT ON COLUMN public.audit_logs.target_user_id IS 'User affected by the action (if applicable)';
COMMENT ON COLUMN public.audit_logs.target_resource_id IS 'ID of the resource affected (e.g., application_id, partner_id)';
COMMENT ON COLUMN public.audit_logs.metadata IS 'JSON object with additional context (page, filters, counts, etc.)';
COMMENT ON COLUMN public.audit_logs.ip_address IS 'IP address from which the action was performed';
COMMENT ON COLUMN public.audit_logs.user_agent IS 'Browser/client user agent string';
COMMENT ON COLUMN public.audit_logs.created_at IS 'Timestamp when the action was performed';
