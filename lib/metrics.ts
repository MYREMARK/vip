import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "metrics.json");

export type Metrics = {
  totalYears: number;
  players: number;
};

export async function getMetrics(): Promise<Metrics> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as Metrics;
  } catch {
    return { totalYears: 0, players: 0 };
  }
}

export async function addExperienceYears(years: number): Promise<Metrics> {
  const safeYears = Number.isFinite(years) ? Math.max(0, Math.min(80, Math.round(years))) : 0;
  const current = await getMetrics();
  const next = {
    totalYears: current.totalYears + safeYears,
    players: current.players + 1
  };

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(next, null, 2), "utf8");
  } catch {
    // Serverless hosts such as Vercel do not provide persistent writable project files.
  }

  return next;
}
