/**
 * Auth Helper Utilities
 * Provides helper functions for getting current user context
 */

import type { PostgrestError } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

// Create client instance
const createClient = () => createBrowserSupabaseClient();

export interface CurrentCustomer {
  id: string;
  email: string;
  name: string | null;
  business_id: string | null;
}

export interface CurrentUser {
  id: string;
  email: string | undefined;
}

/**
 * Get current authenticated user (client-side)
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}

/**
 * Get current customer record for authenticated user (client-side)
 * This is used for ambassadors/customers accessing their own data
 */
export async function getCurrentCustomer(): Promise<CurrentCustomer | null> {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user || !user.email) {
    return null;
  }

  // Try to find customer record by email
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .select('id, email, name, business_id')
    .eq('email', user.email)
    .single() as {
      data: { id: string; email: string; name: string | null; business_id: string | null } | null;
      error: PostgrestError | null;
    };

  if (customerError || !customer) {
    return null;
  }

  return {
    id: customer.id,
    email: customer.email,
    name: customer.name,
    business_id: customer.business_id,
  };
}

/**
 * Get current business for authenticated user (client-side)
 */
export async function getCurrentBusiness() {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  if (businessError || !business) {
    return null;
  }

  return business;
}
