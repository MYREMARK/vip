import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "metrics.json");
const totalYearsKey = "vip-connector:metrics:totalYears";
const playersKey = "vip-connector:metrics:players";

export type Metrics = {
  totalYears: number;
  players: number;
};

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  return {
    url: url.replace(/\/$/, ""),
    token
  };
}

function isProductionHost() {
  return process.env.VERCEL === "1";
}

async function redisCommand<T>(command: Array<string | number>): Promise<T | null> {
  const config = getRedisConfig();

  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Metrics storage failed: ${response.status} ${errorText}`);
  }

  const data = await response.json() as { result?: T; error?: string };

  if (data.error) {
    throw new Error(`Metrics storage command failed: ${data.error}`);
  }

  return data.result ?? null;
}

function toNumber(value: unknown) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

async function getLocalMetrics(): Promise<Metrics> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as Metrics;
  } catch {
    return { totalYears: 0, players: 0 };
  }
}

async function writeLocalMetrics(metrics: Metrics) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(metrics, null, 2), "utf8");
  } catch {
    // Serverless hosts such as Vercel do not provide persistent writable project files.
  }
}

export async function getMetrics(): Promise<Metrics> {
  try {
    const config = getRedisConfig();

    if (config) {
      const [totalYears, players] = await Promise.all([
        redisCommand<string | number | null>(["GET", totalYearsKey]),
        redisCommand<string | number | null>(["GET", playersKey])
      ]);

      return {
        totalYears: toNumber(totalYears),
        players: toNumber(players)
      };
    }

    return getLocalMetrics();
  } catch (error) {
    if (isProductionHost() && getRedisConfig()) {
      throw error;
    }

    return getLocalMetrics();
  }
}

export async function addExperienceYears(years: number): Promise<Metrics> {
  const safeYears = Number.isFinite(years) ? Math.max(0, Math.min(80, Math.round(years))) : 0;

  try {
    const config = getRedisConfig();

    if (config) {
      const localMetrics = await getLocalMetrics();

      await Promise.all([
        redisCommand(["SETNX", totalYearsKey, localMetrics.totalYears]),
        redisCommand(["SETNX", playersKey, localMetrics.players])
      ]);

      const [totalYears, players] = await Promise.all([
        redisCommand<number>(["INCRBY", totalYearsKey, safeYears]),
        redisCommand<number>(["INCRBY", playersKey, 1])
      ]);

      return {
        totalYears: toNumber(totalYears),
        players: toNumber(players)
      };
    }
  } catch (error) {
    if (isProductionHost()) {
      throw error;
    }
  }

  if (isProductionHost()) {
    throw new Error("Persistent counter storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN in Vercel.");
  }

  const current = await getLocalMetrics();
  const next = {
    totalYears: current.totalYears + safeYears,
    players: current.players + 1
  };

  await writeLocalMetrics(next);
  return next;
}
