// api/campaigns/migrate.js
// One-time endpoint to seed campaigns from the browser into Redis.
// Call it once from the browser console after deploy — then it can be deleted.
// Protected by a secret so only you can trigger it.

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const MIGRATE_SECRET = process.env.MIGRATE_SECRET || "paxpromote-migrate-2026";

async function redis(command) {
  const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  // Auth check
  const { secret, campaigns } = req.body;
  if (secret !== MIGRATE_SECRET) {
    return res.status(403).json({ error: "Invalid secret" });
  }

  if (!Array.isArray(campaigns) || campaigns.length === 0) {
    return res.status(400).json({ error: "No campaigns provided" });
  }

  const results = [];

  for (const campaign of campaigns) {
    const id  = campaign.id?.toString() || Date.now().toString();
    const key = `paxpromote:campaign:${id}`;

    // Check if already exists
    const existing = await redis(["EXISTS", key]);
    if (existing === 1) {
      results.push({ id, status: "skipped (already exists)" });
      continue;
    }

    // Save campaign
    await redis(["SET", key, JSON.stringify({ ...campaign, id })]);
    await redis(["LPUSH", "paxpromote:campaign_ids", id]);
    if (campaign.wallet) {
      await redis(["LPUSH", `paxpromote:wallet:${campaign.wallet.toLowerCase()}`, id]);
    }

    results.push({ id, status: "migrated", token: campaign.token });
  }

  return res.status(200).json({
    ok: true,
    migrated: results.filter(r => r.status === "migrated").length,
    skipped:  results.filter(r => r.status !== "migrated").length,
    results,
  });
}
