// api/auth/x/status.js — frontend calls this to check X link status
export default function handler(req, res) {
  const raw = parseCookie(req.headers.cookie, "paxpromote_x_pub");
  if (!raw) return res.status(200).json({ linked: false });

  try {
    const pub = JSON.parse(Buffer.from(raw, "base64").toString());
    return res.status(200).json({ linked: true, ...pub });
  } catch {
    return res.status(200).json({ linked: false });
  }
}

function parseCookie(cookieHeader = "", name) {
  const match = (cookieHeader || "").split(";").find(c => c.trim().startsWith(`${name}=`));
  return match ? match.trim().slice(name.length + 1) : null;
}
