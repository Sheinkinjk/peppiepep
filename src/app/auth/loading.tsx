import { Skeleton } from "@/components/Skeleton";

export default function AuthLoading() {
  return (
    <main className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white px-4 py-12">
      <div className="relative w-full max-w-md overflow-hidden border border-white/60 bg-white/80 p-8 shadow-2xl shadow-purple-100 backdrop-blur rounded-2xl">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />

        <div className="relative">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />

            <div className="text-center">
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
