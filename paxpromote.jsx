import { useState, useEffect, useRef } from "react";

const TIERS = [
  {
    id: "word-out",
    name: "Get The Word Out",
    tagline: "Spark the conversation",
    price: "500",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.3)",
    icon: "📡",
    features: ["5 Raiders assigned", "24hr campaign", "Basic X amplification", "Project card listing", "Performance report"],
  },
  {
    id: "make-noise",
    name: "Make Some Noise",
    tagline: "Build momentum",
    price: "1,500",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.3)",
    icon: "🔊",
    features: ["15 Raiders assigned", "72hr campaign", "Boosted X amplification", "Trending hashtag push", "Artwork promotion", "Detailed analytics"],
  },
  {
    id: "in-your-face",
    name: "In Your Face",
    tagline: "Dominate the feed",
    price: "4,000",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    icon: "🔥",
    featured: true,
    features: ["40 Raiders assigned", "7-day campaign", "Premium X raids", "Priority placement", "Community raids", "Meme & content package", "Live tracking dashboard"],
  },
  {
    id: "kol-package",
    name: "KOL Package",
    tagline: "Full-spectrum domination",
    price: "12,000",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    icon: "👑",
    features: ["100+ Raiders assigned", "30-day campaign", "KOL endorsements", "Spaces events", "Viral content creation", "AMA coordination", "Dedicated campaign manager", "Real-time command center"],
  },
];

const MOCK_RAIDERS = [
  { rank: 1, name: "CryptoViper", handle: "@CryptoViper_X", avatar: "🦅", followers: "284K", earnings: "42,800", raids: 1847, tier: "Elite", badge: "👑" },
  { rank: 2, name: "MoonHunter", handle: "@MoonHunter99", avatar: "🐺", followers: "156K", earnings: "31,200", raids: 1203, tier: "Elite", badge: "🔥" },
  { rank: 3, name: "PaxRaider_Z", handle: "@PaxRaider_Z", avatar: "🦊", followers: "89K", earnings: "18,600", raids: 904, tier: "Pro", badge: "⚡" },
  { rank: 4, name: "BlockSniper", handle: "@BlockSniper", avatar: "🎯", followers: "67K", earnings: "12,400", raids: 741, tier: "Pro", badge: "🎯" },
  { rank: 5, name: "NeonWolf", handle: "@NeonWolf_DeFi", avatar: "🐉", followers: "43K", earnings: "8,900", raids: 612, tier: "Rising", badge: "💎" },
  { rank: 6, name: "SatoshiGhost", handle: "@SatoshiGhost", avatar: "👻", followers: "38K", earnings: "7,100", raids: 534, tier: "Rising", badge: "🚀" },
  { rank: 7, name: "DeFiPhantom", handle: "@DeFiPhantom", avatar: "⚡", followers: "29K", earnings: "5,600", raids: 478, tier: "Rising", badge: "💫" },
  { rank: 8, name: "TokenStorm", handle: "@TokenStorm_", avatar: "🌪️", followers: "21K", earnings: "4,200", raids: 391, tier: "Starter", badge: "🌟" },
];

const MOCK_RAIDS = [
  { project: "NOVA Token", task: "Quote tweet with $NOVA", status: "completed", earned: "45 PAX", time: "2h ago" },
  { project: "PepeChain", task: "Reply engagement thread", status: "completed", earned: "28 PAX", time: "5h ago" },
  { project: "MoonFi", task: "Original post with artwork", status: "pending", earned: "60 PAX", time: "Active" },
  { project: "AstroDAO", task: "Twitter Space participation", status: "pending", earned: "120 PAX", time: "Active" },
];

function Navbar({ view, setView }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(5,5,10,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(245,158,11,0.15)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => setView("home")}>
          <div style={{
            width: 38, height: 38, background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }} />
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.6rem", letterSpacing: "0.08em", color: "#fff" }}>
            PAX<span style={{ color: "#f59e0b" }}>promote</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.25rem" }}>
          {[["home", "HOME"], ["tiers", "TIERS"], ["leaderboard", "LEADERBOARD"], ["raider", "RAIDER DASHBOARD"], ["promote", "PROMOTE"]].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? "rgba(245,158,11,0.15)" : "transparent",
              border: view === v ? "1px solid rgba(245,158,11,0.4)" : "1px solid transparent",
              color: view === v ? "#f59e0b" : "rgba(255,255,255,0.6)",
              padding: "0.4rem 1rem",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.8rem",
              cursor: "pointer", borderRadius: 2,
              transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        <button onClick={() => setView("raider")} style={{
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          border: "none", color: "#000", padding: "0.5rem 1.4rem",
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          letterSpacing: "0.12em", fontSize: "0.85rem", cursor: "pointer",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}>JOIN RAID FORCE</button>
      </div>
    </nav>
  );
}

function Hero({ setView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c < 12847 ? c + Math.floor(Math.random() * 150) : 12847), 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", paddingTop: 72,
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Diagonal accent line */}
      <div style={{
        position: "absolute", top: 0, right: "20%", width: 1, height: "100%",
        background: "linear-gradient(180deg, transparent, rgba(245,158,11,0.2), transparent)",
        transform: "rotate(15deg)", transformOrigin: "top",
      }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 2rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "2rem",
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.8rem",
          letterSpacing: "0.2em", color: "#f59e0b",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
          RAID FORCE ACTIVE · {count.toLocaleString()} PAX DISTRIBUTED
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(4rem, 12vw, 9rem)",
          lineHeight: 0.9, letterSpacing: "0.03em",
          color: "#fff", margin: 0,
        }}>
          LAUNCH.<br />
          <span style={{ color: "#f59e0b", textShadow: "0 0 60px rgba(245,158,11,0.5)" }}>RAID.</span><br />
          DOMINATE.
        </h1>

        <p style={{
          fontFamily: "'Barlow', sans-serif", fontWeight: 300,
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "rgba(255,255,255,0.55)", maxWidth: 600,
          margin: "2rem auto", lineHeight: 1.6, letterSpacing: "0.02em",
        }}>
          The premier promotion network for Paxfun tokens. Deploy raid forces, amplify your project across X, and dominate the crypto conversation.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
          <button onClick={() => setView("promote")} style={{
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            border: "none", color: "#000", padding: "1rem 2.5rem",
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            letterSpacing: "0.15em", fontSize: "1.1rem", cursor: "pointer",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            transition: "opacity 0.2s",
          }}>PROMOTE YOUR TOKEN</button>
          <button onClick={() => setView("raider")} style={{
            background: "transparent",
            border: "1px solid rgba(245,158,11,0.5)", color: "#f59e0b", padding: "1rem 2.5rem",
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            letterSpacing: "0.15em", fontSize: "1.1rem", cursor: "pointer",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          }}>BECOME A RAIDER</button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: "3rem", justifyContent: "center", marginTop: "5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3rem", flexWrap: "wrap",
        }}>
          {[["2,847", "Active Raiders"], ["$4.2M", "PAX Distributed"], ["847", "Tokens Promoted"], ["98.3%", "Campaign Success"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2.2rem", color: "#f59e0b", letterSpacing: "0.05em" }}>{num}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiersPage({ setView }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.3em", color: "#f59e0b", fontSize: "0.8rem", marginBottom: "1rem" }}>SELECT YOUR CAMPAIGN TIER</div>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", margin: 0, letterSpacing: "0.05em" }}>
          CHOOSE YOUR <span style={{ color: "#f59e0b" }}>FIREPOWER</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Barlow', sans-serif", marginTop: "1rem" }}>All payments in PAX token · Instant deployment after confirmation</p>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {TIERS.map((tier) => (
          <div key={tier.id} onClick={() => { setSelected(tier.id); setView("promote"); }}
            style={{
              background: selected === tier.id || tier.featured
                ? `linear-gradient(180deg, rgba(${tier.featured ? "245,158,11" : "255,255,255"},0.06) 0%, rgba(5,5,10,0.95) 100%)`
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${tier.featured ? tier.color : "rgba(255,255,255,0.08)"}`,
              borderRadius: 4, padding: "2.5rem 2rem", cursor: "pointer", position: "relative",
              transition: "all 0.3s ease",
              boxShadow: tier.featured ? `0 0 40px ${tier.glow}` : "none",
              transform: tier.featured ? "translateY(-8px)" : "none",
            }}>
            {tier.featured && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                color: "#000", fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, letterSpacing: "0.2em", fontSize: "0.7rem",
                padding: "0.25rem 1rem",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}>MOST POPULAR</div>
            )}

            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{tier.icon}</div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.6rem", color: tier.color, letterSpacing: "0.05em", lineHeight: 1 }}>{tier.name}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.3rem", marginBottom: "2rem" }}>{tier.tagline}</div>

            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "3rem", color: "#fff", letterSpacing: "0.03em" }}>{tier.price}</span>
              <span style={{ color: "#f59e0b", fontFamily: "'Barlow Condensed', sans-serif", marginLeft: "0.4rem", fontWeight: 600 }}>PAX</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
              {tier.features.map(f => (
                <div key={f} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 2, background: tier.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.6rem", color: "#000", fontWeight: 900 }}>✓</span>
                  </div>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>{f}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%", background: tier.featured ? `linear-gradient(135deg, ${tier.color}, #ef4444)` : "transparent",
              border: `1px solid ${tier.color}`, color: tier.featured ? "#000" : tier.color,
              padding: "0.85rem", fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, letterSpacing: "0.15em", fontSize: "0.95rem", cursor: "pointer",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}>DEPLOY CAMPAIGN</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.3em", color: "#f59e0b", fontSize: "0.8rem", marginBottom: "1rem" }}>SEASON 3 · LIVE RANKINGS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(3rem, 8vw, 4.5rem)", color: "#fff", margin: 0 }}>
            RAID <span style={{ color: "#f59e0b" }}>LEADERBOARD</span>
          </h2>
        </div>

        {/* Top 3 podium */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "flex-end", justifyContent: "center" }}>
          {[MOCK_RAIDERS[1], MOCK_RAIDERS[0], MOCK_RAIDERS[2]].map((r, i) => {
            const heights = ["140px", "180px", "120px"];
            const labels = ["2nd", "1st", "3rd"];
            const colors = ["#38bdf8", "#f59e0b", "#4ade80"];
            return (
              <div key={r.rank} style={{ flex: 1, maxWidth: 220, textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2rem" }}>{r.avatar}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{r.name}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginBottom: "0.5rem" }}>{r.handle}</div>
                <div style={{
                  height: heights[i], background: `linear-gradient(180deg, ${colors[i]}22, ${colors[i]}08)`,
                  border: `1px solid ${colors[i]}`, borderBottom: "none",
                  display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "1rem",
                }}>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.8rem", color: colors[i] }}>{labels[i]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 100px 80px", padding: "0.75rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(245,158,11,0.05)" }}>
            {["#", "RAIDER", "FOLLOWERS", "RAIDS", "EARNED", "TIER"].map(h => (
              <div key={h} style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{h}</div>
            ))}
          </div>
          {MOCK_RAIDERS.map((r, i) => (
            <div key={r.rank} style={{
              display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 100px 80px",
              padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: i < 3 ? "rgba(245,158,11,0.02)" : "transparent",
              alignItems: "center",
            }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.4rem", color: i < 3 ? "#f59e0b" : "rgba(255,255,255,0.3)" }}>#{r.rank}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{r.avatar}</span>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{r.name} <span>{r.badge}</span></div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>{r.handle}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#38bdf8", fontWeight: 600 }}>{r.followers}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "rgba(255,255,255,0.7)" }}>{r.raids}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#4ade80", fontWeight: 600 }}>{r.earnings} PAX</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em",
                color: r.tier === "Elite" ? "#f59e0b" : r.tier === "Pro" ? "#38bdf8" : r.tier === "Rising" ? "#a78bfa" : "rgba(255,255,255,0.4)",
                border: `1px solid ${r.tier === "Elite" ? "#f59e0b44" : r.tier === "Pro" ? "#38bdf844" : r.tier === "Rising" ? "#a78bfa44" : "rgba(255,255,255,0.1)"}`,
                padding: "0.15rem 0.5rem", borderRadius: 2,
              }}>{r.tier.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RaiderDashboard() {
  const [tab, setTab] = useState("overview");
  const mockRaider = MOCK_RAIDERS[0];

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Profile Header */}
        <div style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.05))",
          border: "1px solid rgba(245,158,11,0.15)", borderRadius: 4, padding: "2rem",
          display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap",
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", background: "rgba(245,158,11,0.1)",
            border: "2px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2.5rem",
          }}>{mockRaider.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2rem", color: "#fff", letterSpacing: "0.05em" }}>
              {mockRaider.name} <span style={{ color: "#f59e0b" }}>{mockRaider.badge}</span>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>{mockRaider.handle}</span>
              <span style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8", padding: "0.1rem 0.6rem", fontSize: "0.7rem", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>X LINKED ✓</span>
              <span style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", padding: "0.1rem 0.6rem", fontSize: "0.7rem", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>ELITE TIER</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[["42,800 PAX", "Total Earned"], ["1,847", "Total Raids"], ["#1", "Global Rank"], ["284K", "X Followers"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.6rem", color: "#f59e0b" }}>{v}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem" }}>
          {[["overview", "OVERVIEW"], ["raids", "ACTIVE RAIDS"], ["earnings", "EARNINGS"], ["profile", "PROFILE SETTINGS"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? "rgba(245,158,11,0.1)" : "transparent",
              border: "none", borderBottom: tab === t ? "2px solid #f59e0b" : "2px solid transparent",
              color: tab === t ? "#f59e0b" : "rgba(255,255,255,0.4)",
              padding: "0.5rem 1.2rem", fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.8rem", cursor: "pointer",
            }}>{l}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Available raids */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.2rem", color: "#fff", letterSpacing: "0.08em", marginBottom: "1.2rem" }}>
                ACTIVE <span style={{ color: "#f59e0b" }}>CAMPAIGNS</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {MOCK_RAIDS.map((raid, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 3, padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{raid.project}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: 2 }}>{raid.task}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#4ade80", fontWeight: 600 }}>{raid.earned}</div>
                      <div style={{
                        fontSize: "0.7rem", marginTop: 2,
                        color: raid.status === "completed" ? "#4ade80" : "#f59e0b",
                      }}>{raid.status === "completed" ? "✓ DONE" : "● ACTIVE"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cashout panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(5,5,10,0.5))", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 4, padding: "1.5rem" }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>AVAILABLE BALANCE</div>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "3rem", color: "#4ade80", letterSpacing: "0.05em" }}>3,840 PAX</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>≈ $192.00 USD</div>
                <button style={{
                  width: "100%", background: "linear-gradient(135deg, #4ade80, #22c55e)",
                  border: "none", color: "#000", padding: "0.85rem",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  letterSpacing: "0.15em", fontSize: "0.95rem", cursor: "pointer",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}>CASH OUT TO WALLET</button>
              </div>

              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "1.5rem" }}>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.1rem", color: "#fff", marginBottom: "1rem" }}>EARNINGS MULTIPLIER</div>
                {[["Follower Bonus", "284K followers", "+2.8x"], ["Raid Streak", "47 days active", "+1.5x"], ["Elite Tier", "Top 10 rank", "+2.0x"]].map(([label, sub, mult]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>{label}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.73rem" }}>{sub}</div>
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue', cursive", color: "#f59e0b", fontSize: "1.3rem" }}>{mult}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div style={{ maxWidth: 600 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Avatar upload */}
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>PROFILE PHOTO</div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(245,158,11,0.1)", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>🦅</div>
                  <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", padding: "0.5rem 1rem", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", fontSize: "0.8rem", cursor: "pointer", borderRadius: 2 }}>UPLOAD PHOTO</button>
                </div>
              </div>

              {[["DISPLAY NAME", "CryptoViper"], ["BIO", "Elite raider · Crypto OG · Building on Paxfun"], ["WALLET ADDRESS", "0x1234...5678"]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</div>
                  <input defaultValue={val} style={{
                    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", padding: "0.75rem 1rem", fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem",
                    borderRadius: 2, outline: "none", boxSizing: "border-box",
                  }} />
                </div>
              ))}

              <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 3, padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#38bdf8", fontSize: "0.9rem" }}>X (TWITTER) ACCOUNT</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>@CryptoViper_X · 284K followers · Connected</div>
                </div>
                <button style={{ background: "#38bdf8", border: "none", color: "#000", padding: "0.4rem 1rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2 }}>LINKED ✓</button>
              </div>

              <button style={{
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                border: "none", color: "#000", padding: "0.85rem",
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                letterSpacing: "0.15em", fontSize: "0.95rem", cursor: "pointer",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}>SAVE CHANGES</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PromotePage() {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [form, setForm] = useState({ tokenName: "", contractAddress: "", xHandle: "", description: "", launchpadUrl: "" });

  return (
    <div style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.3em", color: "#f59e0b", fontSize: "0.8rem", marginBottom: "1rem" }}>TOKEN CAMPAIGN SETUP</div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", margin: 0 }}>
            LAUNCH YOUR <span style={{ color: "#f59e0b" }}>RAID CAMPAIGN</span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "3rem", justifyContent: "center" }}>
          {[["01", "Select Tier"], ["02", "Token Info"], ["03", "Pay & Deploy"]].map(([num, label], i) => (
            <div key={num} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer",
                opacity: step === i + 1 ? 1 : 0.4,
              }} onClick={() => step > i + 1 && setStep(i + 1)}>
                <div style={{
                  width: 28, height: 28, borderRadius: 2,
                  background: step >= i + 1 ? "#f59e0b" : "rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem",
                  color: step >= i + 1 ? "#000" : "rgba(255,255,255,0.4)",
                }}>{num}</div>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", fontSize: "0.8rem", color: step === i + 1 ? "#fff" : "rgba(255,255,255,0.4)" }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {TIERS.map(tier => (
                <div key={tier.id} onClick={() => setSelectedTier(tier)} style={{
                  background: selectedTier?.id === tier.id ? `rgba(${tier.id === "in-your-face" ? "245,158,11" : "255,255,255"},0.06)` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedTier?.id === tier.id ? tier.color : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 4, padding: "1.5rem", cursor: "pointer",
                  boxShadow: selectedTier?.id === tier.id ? `0 0 20px ${tier.glow}` : "none",
                  transition: "all 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{tier.icon}</div>
                      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.2rem", color: tier.color, letterSpacing: "0.05em" }}>{tier.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.8rem", color: "#fff" }}>{tier.price}</div>
                      <div style={{ color: "#f59e0b", fontSize: "0.75rem", fontFamily: "'Barlow Condensed', sans-serif" }}>PAX</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => selectedTier && setStep(2)} style={{
              width: "100%", background: selectedTier ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "rgba(255,255,255,0.05)",
              border: "none", color: selectedTier ? "#000" : "rgba(255,255,255,0.2)", padding: "1rem",
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.15em",
              fontSize: "1rem", cursor: selectedTier ? "pointer" : "not-allowed",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}>CONTINUE TO TOKEN INFO →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              ["TOKEN NAME / TICKER", "tokenName", "e.g. PEPE Token · $PEPE"],
              ["CONTRACT ADDRESS (optional)", "contractAddress", "0x..."],
              ["X (TWITTER) HANDLE TO RAID", "xHandle", "@YourTokenHandle"],
              ["PAXFUN LAUNCHPAD URL", "launchpadUrl", "https://paxfun.app/token/..."],
            ].map(([label, field, placeholder]) => (
              <div key={field}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</div>
                <input placeholder={placeholder} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={{
                  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", padding: "0.75rem 1rem", fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem",
                  borderRadius: 2, outline: "none", boxSizing: "border-box",
                  "::placeholder": { color: "rgba(255,255,255,0.2)" },
                }} />
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>PROJECT DESCRIPTION</div>
              <textarea rows={4} placeholder="Tell raiders about your project..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", padding: "0.75rem 1rem", fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem",
                borderRadius: 2, outline: "none", resize: "vertical", boxSizing: "border-box",
              }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>CAMPAIGN ARTWORK</div>
              <div style={{
                border: "2px dashed rgba(245,158,11,0.3)", borderRadius: 4, padding: "2rem",
                textAlign: "center", cursor: "pointer", color: "rgba(255,255,255,0.3)",
                fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖼️</div>
                DRAG & DROP OR CLICK TO UPLOAD<br />
                <span style={{ fontSize: "0.75rem" }}>PNG, JPG, GIF · Max 10MB</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "0.85rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2 }}>← BACK</button>
              <button onClick={() => setStep(3)} style={{
                flex: 2, background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                border: "none", color: "#000", padding: "0.85rem",
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.15em", cursor: "pointer",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}>CONTINUE TO PAYMENT →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "2rem" }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.2rem", color: "#fff", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>ORDER SUMMARY</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Barlow', sans-serif" }}>Campaign Tier</span>
                <span style={{ color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{selectedTier?.name || "In Your Face"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Barlow', sans-serif" }}>Token</span>
                <span style={{ color: "#fff", fontFamily: "'Barlow Condensed', sans-serif" }}>{form.tokenName || "—"}</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>TOTAL</span>
                <div>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2rem", color: "#f59e0b" }}>{selectedTier?.price || "4,000"}</span>
                  <span style={{ color: "#f59e0b", fontFamily: "'Barlow Condensed', sans-serif", marginLeft: "0.4rem" }}>PAX</span>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4, padding: "2rem" }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.1rem", color: "#f59e0b", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>PAX TOKEN PAYMENT</div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>YOUR WALLET ADDRESS</div>
                <input placeholder="Connect your PAX wallet..." style={{
                  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,158,11,0.2)",
                  color: "#fff", padding: "0.75rem 1rem", fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem",
                  borderRadius: 2, outline: "none", boxSizing: "border-box", marginBottom: "1rem",
                }} />
              </div>
              <button style={{
                width: "100%", background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b", padding: "0.85rem",
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.15em",
                fontSize: "0.95rem", cursor: "pointer", borderRadius: 2, marginBottom: "1rem",
              }}>CONNECT WALLET</button>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "0.85rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2 }}>← BACK</button>
                <button style={{
                  flex: 2, background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                  border: "none", color: "#000", padding: "0.85rem",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.15em", cursor: "pointer",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}>SUBMIT PAYMENT & DEPLOY 🚀</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500&family=Barlow+Condensed:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #05050a; color: #fff; }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        button:hover { filter: brightness(1.1); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05050a; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 2px; }
      `}</style>
      <Navbar view={view} setView={setView} />
      {view === "home" && (
        <>
          <Hero setView={setView} />
          <TiersPage setView={setView} />
        </>
      )}
      {view === "tiers" && <TiersPage setView={setView} />}
      {view === "leaderboard" && <Leaderboard />}
      {view === "raider" && <RaiderDashboard />}
      {view === "promote" && <PromotePage />}
    </>
  );
}
