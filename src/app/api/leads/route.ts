import { NextResponse } from "next/server";
import { project } from "@/data/project";
import { leadFormSchema } from "@/lib/lead/schema";
import { getLeadAdapter } from "@/lib/lead/adapter";
import { rateLimit } from "@/lib/lead/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const limited = rateLimit(`lead:${ip}`, 8, 60_000);
    if (!limited.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please wait a moment and try again.",
        },
        { status: 429 },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 },
      );
    }

    const parsed = leadFormSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      return NextResponse.json(
        {
          ok: false,
          error: "Please correct the highlighted fields.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    // Honeypot filled — pretend success
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const adapter = getLeadAdapter();
    const result = await adapter.submit({
      ...parsed.data,
      submittedAt: new Date().toISOString(),
      projectName: project.name,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not submit your request right now. Please call us or try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not submit your request right now. Please call us or try again shortly.",
      },
      { status: 500 },
    );
  }
}
