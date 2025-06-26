const ipRequestCounts = new Map();

export function rateLimit(ip: string, limit = 5, intervalMs = 60_000) {
  const now = Date.now();
  const requests = ipRequestCounts.get(ip) || [];
  const updatedRequests = requests.filter((t: number) => now - t < intervalMs);

  if (updatedRequests.length >= limit) {
    return false;
  }

  updatedRequests.push(now);
  ipRequestCounts.set(ip, updatedRequests);
  return true;
}
