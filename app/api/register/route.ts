import { NextResponse } from "next/server";
import { addExperienceYears, getMetrics } from "@/lib/metrics";
import { sendRegistrationToHubSpot } from "@/lib/hubspot";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const role = body.role === "game" ? "game" : "player";

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let metrics = await getMetrics();

    if (role === "player") {
      const experienceYears = Number(body.experienceYears);
      const igamingSector = String(body.igamingSector || "").trim();
      const location = String(body.location || "").trim();

      if (!Number.isFinite(experienceYears) || !igamingSector || !location) {
        return NextResponse.json({ error: "Missing required participant fields" }, { status: 400 });
      }

      metrics = await addExperienceYears(experienceYears);
    } else {
      const organisationName = String(body.organisationName || "").trim();
      const jobTitle = String(body.jobTitle || "").trim();

      if (!organisationName || !jobTitle) {
        return NextResponse.json({ error: "Missing required operator fields" }, { status: 400 });
      }
    }

    let hubspot = null;
    try {
      hubspot = await sendRegistrationToHubSpot(body);
    } catch (error) {
      hubspot = { error: error instanceof Error ? error.message : "HubSpot sync failed" };
    }

    return NextResponse.json({ ok: true, metrics, hubspot });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 500 }
    );
  }
}
