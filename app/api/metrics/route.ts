import { NextResponse } from "next/server";
import { getMetrics } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  const metrics = await getMetrics();
  return NextResponse.json(metrics, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
