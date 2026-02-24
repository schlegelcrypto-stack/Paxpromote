// api/users/register.js
// Called every time a wallet connects. Uses a Redis Set to count unique wallets.
// Redis Set automatically deduplicates — same wallet connecting 100x = counted once.

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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ error: "wallet required" });

  // SADD only adds if not already in the set — perfect deduplication
  await redis(["SADD", "paxpromote:wallets", wallet.toLowerCase()]);

  // Return current total
  const total = await redis(["SCARD", "paxpromote:wallets"]);

  return res.status(200).json({ ok: true, totalUsers: total });
}
