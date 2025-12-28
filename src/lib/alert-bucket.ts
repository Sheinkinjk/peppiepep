import { Redis } from "@upstash/redis";

type BucketKey = string;

const redisClient =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

type MemoryBucketEntry = {
  count: number;
  expiresAt: number;
};

const memoryBuckets = new Map<BucketKey, MemoryBucketEntry>();
const memoryOnce = new Map<string, number>();

function cleanupMemory(now: number) {
  for (const [key, value] of memoryBuckets.entries()) {
    if (value.expiresAt <= now) memoryBuckets.delete(key);
  }
  for (const [key, expiresAt] of memoryOnce.entries()) {
    if (expiresAt <= now) memoryOnce.delete(key);
  }
}

export async function incrementAlertBucket({
  key,
  ttlSeconds,
}: {
  key: string;
  ttlSeconds: number;
}): Promise<number> {
  const namespaced = `pepform:alerts:${key}`;
  if (redisClient) {
    const value = await redisClient.incr(namespaced);
    if (value === 1) {
      await redisClient.expire(namespaced, ttlSeconds);
    }
    return value;
  }

  const now = Date.now();
  cleanupMemory(now);
  const existing = memoryBuckets.get(namespaced);
  if (!existing || existing.expiresAt <= now) {
    const entry = { count: 1, expiresAt: now + ttlSeconds * 1000 };
    memoryBuckets.set(namespaced, entry);
    return 1;
  }

  existing.count += 1;
  memoryBuckets.set(namespaced, existing);
  return existing.count;
}

export async function shouldSendOnce({
  key,
  ttlSeconds,
}: {
  key: string;
  ttlSeconds: number;
}): Promise<boolean> {
  const namespaced = `pepform:once:${key}`;
  if (redisClient) {
    const ok = await redisClient.set(namespaced, "1", {
      nx: true,
      ex: ttlSeconds,
    });
    return ok === "OK";
  }

  const now = Date.now();
  cleanupMemory(now);
  const existing = memoryOnce.get(namespaced);
  if (existing && existing > now) return false;
  memoryOnce.set(namespaced, now + ttlSeconds * 1000);
  return true;
}

