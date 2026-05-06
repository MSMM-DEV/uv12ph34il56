import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tags: string[] = body.tags || ["projects", "team", "jobs", "testimonials", "settings", "departments"];

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      timestamp: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
