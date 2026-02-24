// api/campaigns.js — GET all campaigns / POST new campaign
// Uses Upstash Redis REST API (no npm install needed — plain fetch)

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // ── GET /api/campaigns?wallet=0x... ──────────────────────────────────────────
  if (req.method === "GET") {
    try {
      const { wallet } = req.query;

      // Get all campaign IDs from the sorted set (newest first)
      const ids = await redis(["LRANGE", "paxpromote:campaign_ids", "0", "499"]);

      if (!ids || ids.length === 0) return res.status(200).json({ campaigns: [] });

      // Fetch all campaign objects in one pipeline
      const pipeline = ids.map(id => ["GET", `paxpromote:campaign:${id}`]);
      const pipelineRes = await fetch(`${REDIS_URL}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REDIS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipeline),
      });
      const results = await pipelineRes.json();

      let campaigns = results
        .map(r => {
          try { return typeof r.result === "string" ? JSON.parse(r.result) : r.result; }
          catch { return null; }
        })
        .filter(Boolean);

      // Filter by wallet if requested
      if (wallet) {
        campaigns = campaigns.filter(c =>
          c.wallet?.toLowerCase() === wallet.toLowerCase()
        );
      }

      return res.status(200).json({ campaigns });
    } catch (err) {
      console.error("GET /api/campaigns error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // ── POST /api/campaigns ───────────────────────────────────────────────────────
  if (req.method === "POST") {
    try {
      const campaign = req.body;

      if (!campaign || !campaign.id) {
        return res.status(400).json({ error: "Invalid campaign data" });
      }

      const id  = campaign.id.toString();
      const key = `paxpromote:campaign:${id}`;

      // Store campaign object
      await redis(["SET", key, JSON.stringify(campaign)]);

      // Add ID to the front of the list (newest first)
      await redis(["LPUSH", "paxpromote:campaign_ids", id]);

      // Also maintain a per-wallet index for fast lookups
      if (campaign.wallet) {
        await redis(["LPUSH", `paxpromote:wallet:${campaign.wallet.toLowerCase()}`, id]);
      }

      return res.status(200).json({ ok: true, id });
    } catch (err) {
      console.error("POST /api/campaigns error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
