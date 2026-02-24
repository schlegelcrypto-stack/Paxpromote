// api/auth/x.js — starts X OAuth 2.0 PKCE flow
import { randomBytes, createHash } from "crypto";

export default function handler(req, res) {
  const { wallet } = req.query;
  if (!wallet) return res.status(400).json({ error: "wallet required" });

  // Generate PKCE pair
  const codeVerifier  = randomBytes(32).toString("base64url");
  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  // State encodes wallet so we get it back on callback
  const state = Buffer.from(JSON.stringify({ wallet, v: codeVerifier })).toString("base64url");

  const params = new URLSearchParams({
    response_type:         "code",
    client_id:             process.env.X_CLIENT_ID, // ZmV4bGd5Q2luMFV0Q0xZZlhiWEs6MTpjaQ
    redirect_uri:          process.env.X_CALLBACK_URL,
    scope:                 "tweet.read users.read like.read offline.access",
    state,
    code_challenge:        codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(`https://twitter.com/i/oauth2/authorize?${params}`);
}
