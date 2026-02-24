// api/auth/x/callback.js — exchanges code for token, stores X identity
export default async function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) {
    return res.redirect(`/?xauth=denied`);
  }

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state" });
  }

  // Decode state to get wallet + codeVerifier
  let wallet, codeVerifier;
  try {
    const decoded = JSON.parse(Buffer.from(state, "base64url").toString());
    wallet       = decoded.wallet;
    codeVerifier = decoded.v;
  } catch {
    return res.status(400).json({ error: "Invalid state" });
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(
        `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
      ).toString("base64"),
    },
    body: new URLSearchParams({
      code,
      grant_type:    "authorization_code",
      redirect_uri:  process.env.X_CALLBACK_URL,
      code_verifier: codeVerifier,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    console.error("Token exchange failed:", tokenData);
    return res.redirect(`/?xauth=failed`);
  }

  // Fetch X user info
  const userRes = await fetch("https://api.twitter.com/2/users/me?user.fields=name,username,profile_image_url", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userData = await userRes.json();
  const xUser = userData?.data;

  if (!xUser) {
    return res.redirect(`/?xauth=failed`);
  }

  // Build the linked account payload
  // In production you'd save this to a DB keyed by wallet
  // For now encode in a cookie the frontend can read
  const linked = {
    wallet,
    xId:          xUser.id,
    xHandle:      xUser.username,
    xName:        xUser.name,
    xAvatar:      xUser.profile_image_url,
    accessToken:  tokenData.access_token,
    refreshToken: tokenData.refresh_token || null,
    linkedAt:     Date.now(),
  };

  // Set a cookie the frontend JS can't read (httpOnly) but the API can verify
  const cookieVal = Buffer.from(JSON.stringify(linked)).toString("base64");
  res.setHeader("Set-Cookie", [
    `paxpromote_x=${cookieVal}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
    `paxpromote_x_pub=${Buffer.from(JSON.stringify({ wallet, xId: xUser.id, xHandle: xUser.username, xName: xUser.name, xAvatar: xUser.profile_image_url })).toString("base64")}; Path=/; Secure; SameSite=Lax; Max-Age=2592000`,
  ]);

  // Redirect back to app with success
  res.redirect(`/?xauth=success&handle=${encodeURIComponent(xUser.username)}`);
}
