-- =====================================================
-- Admin Role-Based Access Control (RBAC) System
-- For Refer Labs Platform
-- Date: December 21, 2025
-- =====================================================

-- =====================================================
-- TABLE: admin_roles
-- Maps users to admin roles for platform-wide access
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'support', 'analyst')),
  permissions JSONB DEFAULT '{}',
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON admin_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_roles_email ON admin_roles(email);
CREATE INDEX IF NOT EXISTS idx_admin_roles_role ON admin_roles(role);
CREATE INDEX IF NOT EXISTS idx_admin_roles_active ON admin_roles(is_active);

COMMENT ON TABLE admin_roles IS 'Admin role assignments for platform-wide access control';

COMMENT ON COLUMN admin_roles.role IS 'Admin role: super_admin (full access), admin (manage businesses), support (view only), analyst (read analytics)';
COMMENT ON COLUMN admin_roles.permissions IS 'Additional granular permissions as JSON object';
COMMENT ON COLUMN admin_roles.is_active IS 'Whether this admin role is currently active';

-- =====================================================
-- TRIGGER: Updated_at automation
-- =====================================================

DROP TRIGGER IF EXISTS update_admin_roles_updated_at ON admin_roles;
CREATE TRIGGER update_admin_roles_updated_at
  BEFORE UPDATE ON admin_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- HELPER FUNCTION: Check if user is admin
-- =====================================================

CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles
    WHERE admin_roles.user_id = $1
    AND is_active = TRUE
    AND revoked_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_admin IS 'Check if a user has any active admin role';

-- =====================================================
-- HELPER FUNCTION: Check if user has specific admin role
-- =====================================================

CREATE OR REPLACE FUNCTION has_admin_role(user_id UUID, required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles
    WHERE admin_roles.user_id = $1
    AND admin_roles.role = $2
    AND is_active = TRUE
    AND revoked_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION has_admin_role IS 'Check if a user has a specific admin role';

-- =====================================================
-- HELPER FUNCTION: Check if current authenticated user is admin
-- =====================================================

CREATE OR REPLACE FUNCTION is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles
    WHERE admin_roles.user_id = auth.uid()
    AND is_active = TRUE
    AND revoked_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_current_user_admin IS 'Check if currently authenticated user is an admin';

-- =====================================================
-- HELPER FUNCTION: Get current user admin role
-- =====================================================

CREATE OR REPLACE FUNCTION get_current_user_admin_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM admin_roles
  WHERE admin_roles.user_id = auth.uid()
  AND is_active = TRUE
  AND revoked_at IS NULL
  LIMIT 1;

  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_current_user_admin_role IS 'Get the admin role of currently authenticated user';

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Super admins can manage all admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can view admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Users can view their own admin role" ON admin_roles;
DROP POLICY IF EXISTS "Service role has full access to admin_roles" ON admin_roles;

-- Super admins can manage all admin roles
CREATE POLICY "Super admins can manage all admin roles"
  ON admin_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
      AND ar.role = 'super_admin'
      AND ar.is_active = TRUE
      AND ar.revoked_at IS NULL
    )
  );

-- Admins can view (but not modify) admin roles
CREATE POLICY "Admins can view admin roles"
  ON admin_roles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
      AND ar.is_active = TRUE
      AND ar.revoked_at IS NULL
    )
  );

-- Users can view their own admin role
CREATE POLICY "Users can view their own admin role"
  ON admin_roles FOR SELECT
  USING (user_id = auth.uid());

-- Service role has full access
CREATE POLICY "Service role has full access to admin_roles"
  ON admin_roles FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- SEED DATA: Create initial super admin
-- =====================================================

-- Insert initial super admin (jarred@referlabs.com.au)
-- This will only insert if no admin exists yet
INSERT INTO admin_roles (user_id, email, role, permissions, is_active, notes)
SELECT
  id,
  email,
  'super_admin',
  '{"full_access": true, "can_grant_roles": true, "can_revoke_roles": true}'::jsonb,
  TRUE,
  'Initial super admin created during RBAC migration'
FROM auth.users
WHERE email = 'jarred@referlabs.com.au'
ON CONFLICT (user_id) DO NOTHING;

-- =====================================================
-- AUDIT LOG: Track admin role changes
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_role_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_role_id UUID REFERENCES admin_roles(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('granted', 'revoked', 'modified', 'activated', 'deactivated')),
  old_role TEXT,
  new_role TEXT,
  changed_by UUID REFERENCES auth.users(id),
  reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_user ON admin_role_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_action ON admin_role_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_role_audit_log(created_at DESC);

COMMENT ON TABLE admin_role_audit_log IS 'Audit log for all admin role changes';

-- Enable RLS on audit log
ALTER TABLE admin_role_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit log
CREATE POLICY "Admins can view audit log"
  ON admin_role_audit_log FOR SELECT
  USING (is_current_user_admin());

-- Service role has full access
CREATE POLICY "Service role has full access to admin_audit_log"
  ON admin_role_audit_log FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- TRIGGER: Log admin role changes
-- =====================================================

CREATE OR REPLACE FUNCTION log_admin_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO admin_role_audit_log (admin_role_id, user_id, email, action, new_role, changed_by, metadata)
    VALUES (NEW.id, NEW.user_id, NEW.email, 'granted', NEW.role, NEW.granted_by, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.role != NEW.role THEN
      INSERT INTO admin_role_audit_log (admin_role_id, user_id, email, action, old_role, new_role, changed_by, metadata)
      VALUES (NEW.id, NEW.user_id, NEW.email, 'modified', OLD.role, NEW.role, auth.uid(), row_to_json(NEW)::jsonb);
    END IF;
    IF OLD.is_active != NEW.is_active THEN
      INSERT INTO admin_role_audit_log (admin_role_id, user_id, email, action, new_role, changed_by, metadata)
      VALUES (NEW.id, NEW.user_id, NEW.email,
        CASE WHEN NEW.is_active THEN 'activated' ELSE 'deactivated' END,
        NEW.role, auth.uid(), row_to_json(NEW)::jsonb);
    END IF;
    IF OLD.revoked_at IS NULL AND NEW.revoked_at IS NOT NULL THEN
      INSERT INTO admin_role_audit_log (admin_role_id, user_id, email, action, old_role, changed_by, metadata)
      VALUES (NEW.id, NEW.user_id, NEW.email, 'revoked', NEW.role, auth.uid(), row_to_json(NEW)::jsonb);
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS admin_role_changes_trigger ON admin_roles;
CREATE TRIGGER admin_role_changes_trigger
  AFTER INSERT OR UPDATE ON admin_roles
  FOR EACH ROW EXECUTE FUNCTION log_admin_role_changes();

-- =====================================================
-- COMPLETE!
-- =====================================================
