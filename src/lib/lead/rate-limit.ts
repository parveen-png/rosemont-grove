type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Simple in-memory rate limiter for the lead endpoint.
 * Suitable for single-instance deployments. Use Redis/edge KV in multi-instance production.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { success: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { success: true, remaining: limit - existing.count };
}
