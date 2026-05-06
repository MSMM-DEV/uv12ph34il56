import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

const TAG_TO_PATHS: Record<string, string[]> = {
  projects: ["/projects", "/"],
  team: ["/team", "/about"],
  jobs: ["/careers"],
  testimonials: ["/"],
  settings: ["/"],
  departments: ["/team", "/careers"],
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const tags: string[] = body.tags || Object.keys(TAG_TO_PATHS);

    const paths = new Set<string>();
    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
      for (const path of TAG_TO_PATHS[tag] || []) paths.add(path);
    }
    for (const path of paths) revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      tags,
      paths: Array.from(paths),
      timestamp: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to revalidate", detail: String(err) },
      { status: 500 }
    );
  }
}
