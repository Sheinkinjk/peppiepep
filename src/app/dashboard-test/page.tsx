export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function DashboardTest() {
  console.log('[TEST] Dashboard test page loading...');

  try {
    const supabase = await createServerComponentClient();
    console.log('[TEST] Supabase client created');

    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('[TEST] Auth check complete:', { hasUser: !!user, error: error?.message });

    if (!user) {
      console.log('[TEST] No user, redirecting to login');
      redirect("/login?next=/dashboard-test");
    }

    console.log('[TEST] User authenticated:', user.id);

    // Test simple business query
    const { data: businesses, error: bizError } = await supabase
      .from("businesses")
      .select("id, name")
      .eq("owner_id", user.id)
      .limit(1);

    console.log('[TEST] Business query complete:', { count: businesses?.length, error: bizError?.message });

    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard Test Page</h1>
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-green-600">✅ Page Loaded Successfully</h2>
              <p className="text-sm text-slate-600 mt-1">If you see this, server-side rendering is working</p>
            </div>

            <div>
              <h3 className="font-semibold">User Info:</h3>
              <pre className="mt-2 p-3 bg-slate-100 rounded text-xs overflow-auto">
                {JSON.stringify({ id: user.id, email: user.email }, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Business Data:</h3>
              <pre className="mt-2 p-3 bg-slate-100 rounded text-xs overflow-auto">
                {JSON.stringify(businesses, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Database Connection:</h3>
              <p className="text-sm mt-1">
                {bizError ? (
                  <span className="text-red-600">❌ Error: {bizError.message}</span>
                ) : (
                  <span className="text-green-600">✅ Connected and working</span>
                )}
              </p>
            </div>

            <div className="pt-4 border-t">
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Real Dashboard →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('[TEST] Error in dashboard test:', error);
    return (
      <div className="min-h-screen bg-red-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error in Test Page</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="text-sm text-red-600">
              {error instanceof Error ? error.message : 'Unknown error'}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
