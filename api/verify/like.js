// api/verify/like.js — checks if the linked X user liked a specific tweet
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { tweetId } = req.body || {};
  if (!tweetId) return res.status(400).json({ error: "tweetId required" });

  // Read the httpOnly cookie set at OAuth callback
  const raw = parseCookie(req.headers.cookie, "paxpromote_x");
  if (!raw) return res.status(401).json({ error: "Not authenticated with X" });

  let linked;
  try {
    linked = JSON.parse(Buffer.from(raw, "base64").toString());
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }

  const { xId, accessToken } = linked;

  // Check liked tweets (X API v2)
  // GET /2/users/:id/liked_tweets — returns up to 100 most recent likes
  const likedRes = await fetch(
    `https://api.twitter.com/2/users/${xId}/liked_tweets?tweet.fields=id&max_results=100`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (likedRes.status === 401) {
    return res.status(401).json({ error: "X token expired — please re-link your account" });
  }

  const likedData = await likedRes.json();
  const liked = (likedData?.data || []).some(t => t.id === tweetId);

  return res.status(200).json({
    verified: liked,
    xHandle:  linked.xHandle,
    tweetId,
    checkedAt: Date.now(),
  });
}

function parseCookie(cookieHeader = "", name) {
  const match = cookieHeader.split(";").find(c => c.trim().startsWith(`${name}=`));
  return match ? match.trim().slice(name.length + 1) : null;
}
