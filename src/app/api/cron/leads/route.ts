import { NextResponse } from "next/server";
import { runDailyLeadIntake } from "@/server/leads/intake";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Vercel Cron sends: Authorization: Bearer <CRON_SECRET>
 * when CRON_SECRET is configured in project env.
 */
function authorize(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  const cronHeader = request.headers.get("x-cron-secret");
  if (cronHeader === secret) return true;

  // Allow Vercel cron invocations that include the CRON_SECRET query in rare setups.
  const url = new URL(request.url);
  if (url.searchParams.get("secret") === secret) return true;

  return false;
}

export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runDailyLeadIntake();
    return NextResponse.json({
      ok: true,
      message: "Leads generated with cover + resume drafts. Approve in /crm to send.",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[cron/leads]", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
