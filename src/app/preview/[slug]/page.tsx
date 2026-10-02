import { himsMetadata, renderHimsPreview } from "@/lib/hims/render";

// Password-protected review copy of the Hims page set (2 Oct 2026). src/proxy.ts
// serves the 401 password page before this renders unless the review cookie is
// valid; renderHimsPreview checks the cookie again.
export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return himsMetadata(slug, { review: true });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return renderHimsPreview(slug);
}
