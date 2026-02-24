// api/verify/retweet.js — checks if the linked X user retweeted a specific tweet
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { tweetId } = req.body || {};
  if (!tweetId) return res.status(400).json({ error: "tweetId required" });

  const raw = parseCookie(req.headers.cookie, "paxpromote_x");
  if (!raw) return res.status(401).json({ error: "Not authenticated with X" });

  let linked;
  try {
    linked = JSON.parse(Buffer.from(raw, "base64").toString());
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }

  const { xId, accessToken } = linked;

  // GET /2/tweets/:id/retweeted_by — lists users who retweeted
  // We use the app Bearer Token here (doesn't need user token) to avoid scope issues
  const rtRes = await fetch(
    `https://api.twitter.com/2/tweets/${tweetId}/retweeted_by?max_results=100`,
    {
      headers: {
        // Use Bearer token for this lookup — more reliable than user token
        Authorization: `Bearer ${process.env.X_BEARER_TOKEN}`,
      },
    }
  );

  if (!rtRes.ok) {
    const err = await rtRes.json();
    return res.status(rtRes.status).json({ error: err?.detail || "X API error" });
  }

  const rtData = await rtRes.json();
  const retweeted = (rtData?.data || []).some(u => u.id === xId);

  return res.status(200).json({
    verified:  retweeted,
    xHandle:   linked.xHandle,
    tweetId,
    checkedAt: Date.now(),
  });
}

function parseCookie(cookieHeader = "", name) {
  const match = cookieHeader.split(";").find(c => c.trim().startsWith(`${name}=`));
  return match ? match.trim().slice(name.length + 1) : null;
}
