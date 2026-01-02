/**
 * Admin Authentication & Authorization Utilities
 * Provides helper functions for checking admin access in the application
 */

import { createServerComponentClient, createServiceClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import type { Database, Json } from "@/types/supabase";

export type AdminRole = 'super_admin' | 'admin' | 'support' | 'analyst';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  permissions: Record<string, unknown>;
  is_active: boolean;
}

type AdminRoleRow = Database["public"]["Tables"]["admin_roles"]["Row"];

function normalizePermissions(value: AdminRoleRow["permissions"]): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

/**
 * Check if the current user is an admin (any role)
 * Returns admin user object if admin, null if not
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const authClient = await createServerComponentClient();

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return null;
  }

  // Prefer the SECURITY DEFINER RPC (avoids RLS/policy recursion issues on admin_roles).
  // If the function isn't installed, this will fail and we fall back to direct table reads.
  let rpcRole: string | null = null;
  try {
    const { data: roleData, error: roleError } = await (authClient as any).rpc(
      "get_current_user_admin_role",
    );
    if (!roleError && typeof roleData === "string" && roleData.length > 0) {
      rpcRole = roleData;
    }
  } catch {
    // Ignore and fall back.
  }

  // Use service client to check admin_roles table
  const supabase = await createServiceClient();

  const { data: adminRole, error } = await supabase
    .from('admin_roles')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .is('revoked_at', null)
    .maybeSingle();

  // Fallback: some environments may have an admin role keyed to email rather than user_id
  // (e.g., if a user was re-created). If the user_id lookup fails, try the email match.
  let resolvedAdminRole = adminRole;
  if (!resolvedAdminRole && user.email) {
    const { data: adminRoleByEmail, error: emailError } = await supabase
      .from("admin_roles")
      .select("*")
      .ilike("email", user.email)
      .eq("is_active", true)
      .is("revoked_at", null)
      .limit(1)
      .maybeSingle();

    if (emailError) {
      console.warn("Admin role lookup by email failed:", emailError);
    }

    resolvedAdminRole = adminRoleByEmail;
  }

  if (error && error.code !== "PGRST116") {
    console.warn("Admin role lookup by user_id failed:", error);
  }

  if (!resolvedAdminRole && rpcRole && user.email) {
    return {
      id: user.id,
      email: user.email,
      role: rpcRole as AdminRole,
      permissions: {},
      is_active: true,
    };
  }

  if (!resolvedAdminRole) {
    return null;
  }

  const roleRow = resolvedAdminRole as AdminRoleRow;
  return {
    id: user.id,
    email: roleRow.email,
    role: roleRow.role as AdminRole,
    permissions: normalizePermissions(roleRow.permissions),
    is_active: roleRow.is_active,
  };
}

/**
 * Require admin access - redirects to dashboard if not admin
 * Use this in server components to protect admin-only pages
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/dashboard');
  }

  return admin;
}

/**
 * Require specific admin role - redirects if user doesn't have required role
 */
export async function requireAdminRole(requiredRole: AdminRole | AdminRole[]): Promise<AdminUser> {
  const admin = await requireAdmin();

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (!roles.includes(admin.role)) {
    redirect('/dashboard');
  }

  return admin;
}

/**
 * Check if user has specific admin role
 */
export async function hasAdminRole(requiredRole: AdminRole): Promise<boolean> {
  const admin = await getCurrentAdmin();
  return admin ? admin.role === requiredRole : false;
}

/**
 * Check if user is super admin
 */
export async function isSuperAdmin(): Promise<boolean> {
  return hasAdminRole('super_admin');
}

/**
 * Get all admin users (super admin only)
 */
export async function getAllAdmins(): Promise<AdminUser[]> {
  await requireAdminRole('super_admin');

  const supabase = await createServiceClient();

  const { data: adminRoles, error } = await supabase
    .from('admin_roles')
    .select('*')
    .eq('is_active', true)
    .is('revoked_at', null)
    .order('created_at', { ascending: false });

  if (error || !adminRoles) {
    return [];
  }

  return adminRoles.map((role) => ({
    id: role.user_id,
    email: role.email,
    role: role.role as AdminRole,
    permissions: normalizePermissions(role.permissions),
    is_active: role.is_active,
  }));
}

/**
 * Grant admin role to user (super admin only)
 */
export async function grantAdminRole(
  userEmail: string,
  role: AdminRole,
  permissions: Record<string, unknown> = {},
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const currentAdmin = await requireAdminRole('super_admin');

  const supabase = await createServiceClient();

  // Get user by email
  const { data: users } = await supabase.auth.admin.listUsers();
  const targetUser = users.users.find(u => u.email === userEmail);

  if (!targetUser) {
    return { success: false, error: 'User not found' };
  }

  // Check if user already has admin role
  const { data: existing } = await supabase
    .from('admin_roles')
    .select('*')
    .eq('user_id', targetUser.id)
    .single();

  if (existing) {
    // Update existing role
    const { error } = await supabase
      .from('admin_roles')
      .update({
        role,
        permissions: permissions as Json,
        is_active: true,
        revoked_at: null,
        notes: notes || existing.notes,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', targetUser.id);

    if (error) {
      return { success: false, error: error.message };
    }
  } else {
    // Insert new role
    const { error } = await supabase
      .from('admin_roles')
      .insert({
        user_id: targetUser.id,
        email: userEmail,
        role,
        permissions: permissions as Json,
        granted_by: currentAdmin.id,
        is_active: true,
        notes,
      });

    if (error) {
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

/**
 * Revoke admin role from user (super admin only)
 */
export async function revokeAdminRole(
  userEmail: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  await requireAdminRole('super_admin');

  const supabase = await createServiceClient();

  const { error } = await supabase
    .from('admin_roles')
    .update({
      is_active: false,
      revoked_at: new Date().toISOString(),
      notes: reason,
      updated_at: new Date().toISOString(),
    })
    .eq('email', userEmail);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
