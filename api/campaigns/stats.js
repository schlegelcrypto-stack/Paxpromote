// api/campaigns/stats.js — lightweight stats endpoint for homepage
// Returns: tokensPromoted, totalPaxDeployed, activeCampaigns

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
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60"); // cache 30s

  if (req.method !== "GET") return res.status(405).end();

  try {
    const ids = await redis(["LRANGE", "paxpromote:campaign_ids", "0", "499"]);

    if (!ids || ids.length === 0) {
      return res.status(200).json({
        tokensPromoted: 0,
        totalPaxDeployed: 0,
        activeCampaigns: 0,
        totalCampaigns: 0,
      });
    }

    // Batch fetch all campaigns
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

    const campaigns = results
      .map(r => {
        try { return typeof r.result === "string" ? JSON.parse(r.result) : r.result; }
        catch { return null; }
      })
      .filter(Boolean);

    // Unique tokens by contract address or name
    const uniqueTokens = new Set(
      campaigns.map(c => (c.contractAddress || c.token || "").toLowerCase()).filter(Boolean)
    );

    const totalPax = campaigns.reduce(
      (sum, c) => sum + parseFloat((c.paxAmount || "0").replace(/,/g, "")), 0
    );

    const active = campaigns.filter(c => c.status === "active").length;

    // Also get total unique wallets registered
    let totalUsers = 0;
    try {
      const userRes = await fetch(`${REDIS_URL}/${["SCARD", "paxpromote:wallets"].map(encodeURIComponent).join("/")}`, {
        headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      });
      const userJson = await userRes.json();
      totalUsers = userJson.result || 0;
    } catch {}

    return res.status(200).json({
      tokensPromoted:   uniqueTokens.size,
      totalPaxDeployed: totalPax,
      activeCampaigns:  active,
      totalCampaigns:   campaigns.length,
      totalUsers,
    });

  } catch (err) {
    console.error("GET /api/campaigns/stats error:", err);
    // Return zeros on error so homepage still loads
    return res.status(200).json({
      tokensPromoted: 0,
      totalPaxDeployed: 0,
      activeCampaigns: 0,
      totalCampaigns: 0,
    });
  }
}
