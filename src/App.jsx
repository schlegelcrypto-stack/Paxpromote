import { useState, useEffect, useRef } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider, useAccount, useDisconnect } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWeb3Modal } from "@web3modal/wagmi/react";

// ─── Mobile hook ─────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}


const projectId = "60ce60abcf144f20677ce7e052a00f35";

// ─── HyperPaxeer custom chain ─────────────────────────────────────────────────
const hyperPaxeer = {
  id: 125,
  name: "HyperPaxeer Network",
  nativeCurrency: { name: "PAX", symbol: "PAX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet-beta.rpc.hyperpaxeer.com/rpc"] },
    public:  { http: ["https://mainnet-beta.rpc.hyperpaxeer.com/rpc"] },
  },
  blockExplorers: {
    default: { name: "PaxScan", url: "https://paxscan.paxeer.app" },
  },
};

const metadata = {
  name: "PAXpromote",
  description: "The premier promotion network for Paxfun tokens",
  url: "https://paxpromote.io",
  icons: ["https://brand.paxeer.app/assets/500x5000_texr_logo_darkBG.png"],
};

const chains = [hyperPaxeer];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#3d8b5e",
    "--w3m-background-color": "#111113",
    "--w3m-border-radius-master": "4px",
    "--w3m-font-family": "DM Sans, sans-serif",
  },
});

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
    color: "#3d8b5e",
    glow: "rgba(61,139,94,0.3)",
    icon: "🔊",
    features: ["15 Raiders assigned", "72hr campaign", "Boosted X amplification", "Trending hashtag push", "Artwork promotion", "Detailed analytics"],
  },
  {
    id: "in-your-face",
    name: "In Your Face",
    tagline: "Dominate the feed",
    price: "4,000",
    color: "#3d8b5e",
    glow: "rgba(61,139,94,0.30)",
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

// ─── Brand tokens ───────────────────────────────────────────────────────────
const C = {
  cyan:       "#3d8b5e",                   // --color-accent
  cyanDim:    "rgba(61,139,94,0.15)",     // --color-accent-muted ish
  cyanGlow:   "rgba(61,139,94,0.20)",
  cyanBorder: "rgba(61,139,94,0.30)",
  bg:         "#0a0a0b",                   // --color-base
  bg2:        "#111113",                   // --color-surface
  bg3:        "#1a1a1e",                   // --color-surface-2
  bg4:        "#222228",                   // --color-surface-3
  inset:      "#08080a",                   // --color-inset
  border:     "rgba(255,255,255,0.07)",    // subtle border
  text:       "#f0f0f2",                   // --color-text-primary
  text2:      "#a0a0ab",                   // --color-text-secondary
  text3:      "#5a5a66",                   // --color-text-muted
  green:      "#4ade80",                   // --color-success (bright lime, distinct from hunter green accent)
  red:        "#ef4444",                   // --color-danger
  yellow:     "#eab308",                   // --color-warning
  blue:       "#3b82f6",                   // --color-info
  purple:     "#a78bfa",
};

const btnPrimary = {
  background: "#3d8b5e",
  border: "none",
  color: "#ffffff",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
  letterSpacing: "0.01em",
  fontSize: "0.875rem",
  cursor: "pointer",
  borderRadius: "10px",
  transition: "background 0.15s",
};

const btnGhost = {
  background: "rgba(61,139,94,0.10)",
  border: "1px solid rgba(61,139,94,0.28)",
  color: "#3d8b5e",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
  letterSpacing: "0.01em",
  fontSize: "0.875rem",
  cursor: "pointer",
  borderRadius: "10px",
};

const labelStyle = {
  fontFamily: "'DM Mono', monospace",
  letterSpacing: "0.05em",
  fontSize: "0.7rem",
  color: C.text3,
  textTransform: "uppercase",
  marginBottom: "0.5rem",
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ view, setView, wallet, profile, onConnectClick, onDisconnect }) {
  const [scrolled, setScrolled]   = useState(false);
  const [dashOpen, setDashOpen]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [search, setSearch]       = useState("");
  const dashRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (dashRef.current && !dashRef.current.contains(e.target)) setDashOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); setDashOpen(false); }, [view]);

  const isDashView = view === "raider" || view === "dev";
  const navLinks = [["home","Home"],["promote","Promote"],["leaderboard","Leaderboard"]];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || menuOpen ? "rgba(10,10,11,0.95)" : "rgba(10,10,11,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition: "all 0.3s ease",
        padding: isMobile ? "0 1rem" : "0 1.5rem",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", height: 60, gap: isMobile ? 0 : 16 }}>

          {/* LEFT — Logo + Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 0 : 6, flexShrink: 0 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", marginRight: isMobile ? 0 : 12 }} onClick={() => setView("home")}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.03em", color: C.text }}>PAX</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.25rem", letterSpacing: "-0.02em", color: C.text2 }}>promote</span>
            </div>

            {/* Desktop nav links */}
            {!isMobile && navLinks.map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? "rgba(255,255,255,0.06)" : "transparent",
                border: "none",
                color: view === v ? C.text : C.text2,
                padding: "0.4rem 0.85rem",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.9rem",
                cursor: "pointer", borderRadius: 8, transition: "all 0.15s",
              }}>{label}</button>
            ))}

            {/* Dashboard dropdown */}
            {!isMobile && (
              <div ref={dashRef} style={{ position: "relative" }}>
                <button onClick={() => setDashOpen(o => !o)} style={{
                  background: isDashView ? "rgba(255,255,255,0.06)" : "transparent",
                  border: "none",
                  color: isDashView ? C.text : C.text2,
                  padding: "0.4rem 0.85rem",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.9rem",
                  cursor: "pointer", borderRadius: 8, transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  Dashboard
                  <span style={{ fontSize: "0.55rem", transform: dashOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.5 }}>▼</span>
                </button>
                {dashOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", left: 0,
                    background: "#111113", border: `1px solid ${C.border}`,
                    borderRadius: 12, overflow: "hidden", minWidth: 200,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    animation: "modalIn 0.15s ease",
                  }}>
                    {[
                      { v: "dev",    label: "Dev Dashboard",    icon: "⬡", desc: "Token launcher view" },
                      { v: "raider", label: "Raider Dashboard", icon: "⚡", desc: "Raider earnings view" },
                    ].map(({ v, label, icon, desc }) => (
                      <button key={v} onClick={() => { setView(v); setDashOpen(false); }} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        width: "100%", padding: "12px 16px",
                        background: view === v ? C.cyanDim : "transparent",
                        border: "none",
                        cursor: "pointer", textAlign: "left", transition: "background 0.15s",
                      }}>
                        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: view === v ? C.cyan : C.text }}>{label}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: C.text3, marginTop: 1 }}>{desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CENTER — Search bar */}
          {!isMobile && (
            <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 1rem" }}>
              <div style={{
                position: "relative", width: "100%", maxWidth: 420,
              }}>
                <span style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  color: C.text3, fontSize: "0.85rem", pointerEvents: "none",
                }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search tokens and pools"
                  style={{
                    width: "100%",
                    background: "#1a1a1e",
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "0.5rem 2.5rem 0.5rem 2.2rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: C.text,
                    outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(61,139,94,0.4)"}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
                <kbd style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "#222228", border: `1px solid ${C.border}`,
                  borderRadius: 4, padding: "1px 5px",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.text3,
                }}>/</kbd>
              </div>
            </div>
          )}

          {/* RIGHT — Wallet area */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
            {!isMobile && wallet ? (
              <>
                {/* Profile pill */}
                <button onClick={() => setView("profile")} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: view === "profile" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 999, padding: "4px 12px 4px 4px",
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.cyanDim, border: `1.5px solid ${C.cyanBorder}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {profile?.avatar ? <img src={profile.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "0.85rem" }}>👤</span>}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: C.text }}>
                    {wallet.slice(0,6)}…{wallet.slice(-4)}
                  </span>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}`, flexShrink: 0 }} />
                </button>
                <button onClick={onDisconnect} style={{
                  background: "transparent", border: `1px solid ${C.border}`,
                  color: C.text3, padding: "6px 12px", borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.8rem", cursor: "pointer",
                }}>Disconnect</button>
              </>
            ) : !isMobile && (
              <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                Connect Wallet
              </button>
            )}

            {/* Mobile: avatar/connect + hamburger */}
            {isMobile && (
              <>
                {wallet ? (
                  <button onClick={() => setView("profile")} style={{ width: 32, height: 32, borderRadius: "50%", border: `1.5px solid ${C.cyanBorder}`, background: C.cyanDim, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    {profile?.avatar ? <img src={profile.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "0.9rem" }}>👤</span>}
                  </button>
                ) : (
                  <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.4rem 0.9rem", fontSize: "0.78rem" }}>Connect</button>
                )}
                <button onClick={() => setMenuOpen(o => !o)} style={{
                  background: "transparent", border: `1px solid ${C.border}`,
                  borderRadius: 8, width: 36, height: 36,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 4.5, cursor: "pointer", padding: 0,
                }}>
                  <span style={{ width: 16, height: 1.5, background: menuOpen ? C.cyan : C.text2, borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(3px)" : "none" }} />
                  <span style={{ width: 16, height: 1.5, background: menuOpen ? C.cyan : C.text2, borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "all 0.2s" }} />
                  <span style={{ width: 16, height: 1.5, background: menuOpen ? C.cyan : C.text2, borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-3px)" : "none" }} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 999,
          background: "rgba(10,10,11,0.97)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.cyanBorder}`,
          padding: "1rem 1.2rem 1.5rem",
          animation: "modalIn 0.2s ease",
        }}>
          {/* Nav links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 16 }}>
            {navLinks.map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? C.cyanDim : "transparent",
                border: view === v ? `1px solid ${C.cyanBorder}` : "1px solid transparent",
                color: view === v ? C.cyan : C.text2,
                padding: "0.75rem 1rem", borderRadius: 8, textAlign: "left",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.85rem",
                cursor: "pointer",
              }}>{label}</button>
            ))}
            {/* Dashboard section */}
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: C.text3, letterSpacing: "0.08em", padding: "0 1rem", marginBottom: 6 }}>DASHBOARD</div>
              {[{ v: "dev", label: "Dev Dashboard", icon: "⬡" }, { v: "raider", label: "Raider Dashboard", icon: "⚡" }].map(({ v, label, icon }) => (
                <button key={v} onClick={() => setView(v)} style={{
                  background: view === v ? C.cyanDim : "transparent",
                  border: view === v ? `1px solid ${C.cyanBorder}` : "1px solid transparent",
                  color: view === v ? C.cyan : C.text2,
                  padding: "0.75rem 1rem", borderRadius: 8, textAlign: "left", width: "100%",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.85rem",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                }}><span>{icon}</span>{label}</button>
              ))}
            </div>
          </div>

          {/* Wallet section in menu */}
          {wallet ? (
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, borderRadius: 8, padding: "10px 14px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}`, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text }}>{profile?.username || "Connected"}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.cyan }}>{wallet.slice(0,8)}…{wallet.slice(-6)}</div>
                </div>
              </div>
              <button onClick={onDisconnect} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.text3, padding: "0.7rem", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.06em" }}>DISCONNECT WALLET</button>
            </div>
          ) : (
            <button onClick={onConnectClick} style={{ ...btnPrimary, width: "100%", padding: "0.85rem", marginTop: 8 }}>CONNECT WALLET</button>
          )}
        </div>
      )}
    </>
  );
}


// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ setView, onConnectClick }) {
  const [count, setCount] = useState(0);
  const [paxPrice, setPaxPrice] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => setCount(c => c < 12847 ? c + Math.floor(Math.random() * 150) : 12847), 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/sidiora-api/api/native/price")
      .then(r => r.json())
      .then(data => {
        const price = data?.price ?? data?.usd ?? data?.value ?? data?.data?.price ?? null;
        if (price != null) setPaxPrice(parseFloat(price).toFixed(4));
      })
      .catch(() => {
        // fallback: try pricefeed for PAX native price
        fetch("/pricefeed/tokens")
          .then(r => r.json())
          .then(data => {
            const list = Array.isArray(data) ? data : [];
            const pax = list.find(t => t.symbol?.toUpperCase() === "PAX" || t.symbol?.toUpperCase() === "WPAX");
            if (pax?.price_usd) setPaxPrice(parseFloat(pax.price_usd).toFixed(4));
          })
          .catch(() => {});
      });
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", paddingTop: 64,
    }}>
      {/* Clean backdrop — subtle top glow + secondary accent */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(61,139,94,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 75% 70%, rgba(61,139,94,0.03) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: isMobile ? "0 1.2rem" : "0 2rem", width: "100%" }}>

        {/* Live badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          background: C.cyanDim, border: `1px solid ${C.cyanBorder}`,
          borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "1.5rem",
          fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "0.6rem" : "0.7rem",
          letterSpacing: "0.1em", color: C.cyan,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite", flexShrink: 0 }} />
          {isMobile ? `${count.toLocaleString()} PAX DISTRIBUTED` : `RAID FORCE ACTIVE · ${count.toLocaleString()} PAX DISTRIBUTED`}
        </div>

        <h1 style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          fontSize: isMobile ? "clamp(3rem, 18vw, 5rem)" : "clamp(4rem, 11vw, 8.5rem)",
          lineHeight: 0.92, letterSpacing: "-0.04em", color: C.text, margin: 0,
        }}>
          LAUNCH.<br />
          <span style={{ color: C.cyan }}>RAID.</span><br />
          DOMINATE.
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          fontSize: isMobile ? "0.9rem" : "clamp(1rem, 2.5vw, 1.2rem)",
          color: C.text2, maxWidth: 580,
          margin: "1.5rem auto", lineHeight: 1.7,
          padding: isMobile ? "0 0.5rem" : 0,
        }}>
          The premier promotion network for Paxfun tokens. Deploy raid forces, amplify your project across X, and dominate the crypto conversation.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: isMobile ? "1.5rem" : "2.5rem" }}>
          <button onClick={() => setView("promote")} style={{ ...btnPrimary, padding: isMobile ? "0.85rem 1.5rem" : "1rem 2.5rem", fontSize: isMobile ? "0.85rem" : "1rem" }}>
            PROMOTE YOUR TOKEN
          </button>
          <button onClick={() => setView("raider")} style={{ ...btnGhost, padding: isMobile ? "0.85rem 1.5rem" : "1rem 2.5rem", fontSize: isMobile ? "0.85rem" : "1rem" }}>
            BECOME A RAIDER
          </button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)",
          gap: isMobile ? "1.5rem" : "3rem",
          justifyContent: isMobile ? "stretch" : "center",
          marginTop: isMobile ? "3rem" : "5rem",
          borderTop: `1px solid ${C.border}`, paddingTop: "2rem",
          maxWidth: isMobile ? 340 : "none",
          margin: `${isMobile ? "3rem" : "5rem"} auto 0`,
        }}>
          {[["2,847","Active Raiders"],["$4.2M","PAX Distributed"],["847","Tokens Promoted"],[paxPrice ? `$${paxPrice}` : "—","PAX Price"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "1.4rem" : "2rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.05em", color: C.text3, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Token Card ───────────────────────────────────────────────────────────────
function TokenAvatar({ token, size = 48 }) {
  const [imgError, setImgError] = useState(false);
  // Generate a consistent color from token name for fallback
  const colors = ["#3d8b5e","#3b82f6","#a78bfa","#f59e0b","#ef4444","#06b6d4","#ec4899"];
  const colorIdx = (token.name || "").charCodeAt(0) % colors.length;
  const initials  = (token.name || "?").slice(0, 2).toUpperCase();

  if (token.image && !imgError) {
    return (
      <img
        src={token.image}
        alt={token.name}
        onError={() => setImgError(true)}
        style={{ width: size, height: size, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: 10, flexShrink: 0,
      background: colors[colorIdx],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
      fontSize: size * 0.35, color: "#fff",
    }}>{initials}</div>
  );
}

function TokenCard({ token, onPromote, onTokenClick }) {
  const [hovered, setHovered] = useState(false);
  const isUp       = token.change >= 0;
  const changeColor = isUp ? C.green : C.red;
  const changeBg    = isUp ? "rgba(74,222,128,0.12)" : "rgba(239,68,68,0.12)";
  const isPromoted  = token.promoted === true;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 260, maxWidth: 260,
        background: isPromoted
          ? "rgba(61,139,94,0.08)"
          : hovered ? "rgba(255,255,255,0.03)" : "#111113",
        border: `1px solid ${isPromoted
          ? "rgba(61,139,94,0.45)"
          : hovered ? "rgba(255,255,255,0.12)" : C.border}`,
        borderRadius: 14, padding: "16px",
        cursor: "pointer", flexShrink: 0,
        transition: "border-color 0.15s, background 0.15s",
        display: "flex", flexDirection: "column", gap: 12,
        boxShadow: isPromoted ? "0 0 16px rgba(61,139,94,0.10)" : "none",
      }}>

      {/* Top row: avatar + name/ticker/price/change */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <TokenAvatar token={token} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 110 }}>{token.name}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.text3, whiteSpace: "nowrap" }}>{token.ticker}</span>
            {isPromoted && (
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.06em",
                color: C.cyan, background: "rgba(61,139,94,0.15)",
                border: "1px solid rgba(61,139,94,0.3)",
                borderRadius: 4, padding: "1px 5px",
              }}>PROMOTED</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: "1rem", color: C.text }}>{token.price || "—"}</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.78rem",
              color: changeColor, background: changeBg,
              padding: "1px 7px", borderRadius: 20,
            }}>{isUp ? "+" : ""}{token.change?.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {[
          ["Market Cap", token.mcap    || "—"],
          ["Volume 24h", token.volume  || "—"],
          ["Holders",    token.holders || "—"],
        ].map(([label, val]) => (
          <div key={label} style={{
            background: isPromoted ? "rgba(61,139,94,0.06)" : "#1a1a1e",
            borderRadius: 8, padding: "8px 10px",
          }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: C.text3, marginBottom: 3 }}>{label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: C.text }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${isPromoted ? "rgba(61,139,94,0.2)" : C.border}`, paddingTop: 10 }}>
        <button
          onClick={e => { e.stopPropagation(); onTokenClick && onTokenClick(token); }}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
            color: C.cyan, display: "flex", alignItems: "center", gap: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
          onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
        >
          <span style={{ fontSize: "0.65rem" }}>⚡</span> Active Promotions
        </button>
        {!isPromoted && (
          <button
            onClick={e => { e.stopPropagation(); onPromote(token); }}
            style={{
              ...btnPrimary, padding: "5px 12px", fontSize: "0.72rem",
              opacity: hovered ? 1 : 0.7, transition: "opacity 0.15s",
            }}>
            Promote
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Token Row (Netflix-style) ────────────────────────────────────────────────
function TokenRow({ title, badge, badgeColor, tokens, loading, error, onPromote, onTokenClick }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) rowRef.current.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <div style={{ marginBottom: "3rem" }}>
      {/* Row header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.2rem", padding: "0 2rem" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em", margin: 0 }}>
          {title}
        </h3>
        {badge && (
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.05em",
            padding: "3px 10px", borderRadius: 20,
            background: `${badgeColor}22`, color: badgeColor,
            border: `1px solid ${badgeColor}44`,
          }}>{badge}</span>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["←", "→"].map((arrow, i) => (
            <button key={arrow} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
              background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`,
              color: C.text2, width: 30, height: 30, borderRadius: "50%",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>{arrow}</button>
          ))}
        </div>
      </div>

      {/* Scroll track */}
      <div style={{ position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(90deg, #0a0a0b 60%, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(270deg, #0a0a0b 60%, transparent)", pointerEvents: "none" }} />

        <div ref={rowRef} style={{
          display: "flex", gap: 14, overflowX: "auto", paddingLeft: "2rem", paddingRight: "2rem",
          scrollbarWidth: "none", msOverflowStyle: "none",
        }}
          onMouseDown={e => {
            const el = rowRef.current;
            let startX = e.pageX - el.offsetLeft;
            let scrollLeft = el.scrollLeft;
            const move = (e) => { el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
            const up = () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
          }}
        >
          {loading && Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              minWidth: 260, height: 200, borderRadius: 14,
              background: "linear-gradient(90deg, #111113 25%, #1a1a1e 50%, #111113 75%)",
              backgroundSize: "200% 100%",
              flexShrink: 0, border: `1px solid ${C.border}`,
              animation: "shimmer 1.5s infinite",
            }} />
          ))}

          {error && (
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.text3, fontSize: "0.85rem", padding: "2rem" }}>
              Could not load tokens — {error}
            </div>
          )}

          {!loading && !error && tokens.map((token, i) => (
            <TokenCard key={token.address || i} token={token} onPromote={onPromote} onTokenClick={onTokenClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mock promoted tokens (manually curated) ─────────────────────────────────
const PROMOTED_TOKENS = [
  { name: "NOVA Token",   ticker: "$NOVA",  change: 24.1, price: "0.00042 PAX", emoji: "⭐", color: "rgba(251,191,36,0.2)",  promoted: true },
  { name: "AstroDAO",     ticker: "$ASTRO", change: 8.7,  price: "0.00018 PAX", emoji: "🚀", color: "rgba(249,115,22,0.15)",  promoted: true },
  { name: "MoonFi",       ticker: "$MOON",  change: -2.4, price: "0.00009 PAX", emoji: "🌕", color: "rgba(167,139,250,0.2)", promoted: true },
  { name: "PaxDragon",    ticker: "$DRAGO", change: 55.2, price: "0.00130 PAX", emoji: "🐉", color: "rgba(239,68,68,0.2)",   promoted: true },
  { name: "SolarPax",     ticker: "$SOL",   change: 12.0, price: "0.00077 PAX", emoji: "☀️", color: "rgba(251,146,60,0.2)",  promoted: true },
  { name: "VaultX",       ticker: "$VX",    change: -5.1, price: "0.00033 PAX", emoji: "🔐", color: "rgba(74,222,128,0.15)", promoted: true },
  { name: "StealthNode",  ticker: "$STN",   change: 31.8, price: "0.00061 PAX", emoji: "👁️", color: "rgba(249,115,22,0.1)",   promoted: true },
  { name: "PaxRocket",    ticker: "$PRKX",  change: 18.5, price: "0.00022 PAX", emoji: "🛸", color: "rgba(167,139,250,0.15)", promoted: true },
];

// ─── GraphQL token fetcher ────────────────────────────────────────────────────
const MARKETS_QUERY = `
  query FetchMarkets($orderBy: String!, $orderDirection: String!, $first: Int!, $skip: Int!) {
    markets(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      id
      name
      symbol
      spotPrice
      marketCap
      volumeUSID
      swapCount
      holderCount
      createdAt
      token { id address }
    }
  }
`;

function fmtUSD(val) {
  const n = parseFloat(val || 0);
  if (!n) return "—";
  if (n >= 1_000_000) return `$${(n/1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n/1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function fmtPrice(val) {
  const n = parseFloat(val || 0);
  if (!n) return "—";
  if (n < 0.000001) return `$${n.toExponential(2)}`;
  if (n < 0.01)     return `$${n.toFixed(8)}`;
  return `$${n.toFixed(4)}`;
}

async function fetchMarkets(orderBy, orderDirection, first = 20) {
  const res = await fetch("/hg/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: MARKETS_QUERY,
      variables: { orderBy, orderDirection, first, skip: 0 },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || "GraphQL error");
  return (json.data?.markets || []).map(m => ({
    name:    m.name   || "Unknown",
    ticker:  m.symbol ? `$${m.symbol}` : "???",
    price:   fmtPrice(m.spotPrice),
    mcap:    fmtUSD(m.marketCap),
    volume:  fmtUSD(m.volumeUSID),
    holders: m.holderCount != null ? `${m.holderCount}` : "—",
    swaps:   m.swapCount   != null ? `${m.swapCount}`   : "—",
    address: m.token?.address || m.id,
    change:  0,
    emoji:   "🪙",
    color:   "rgba(61,139,94,0.12)",
    image:   null,
    verified: false,
  }));
}

function useMarkets(orderBy, orderDirection) {
  const [tokens, setTokens]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMarkets(orderBy, orderDirection)
      .then(data => { setTokens(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [orderBy, orderDirection]);

  return { tokens, loading, error };
}

function TokenSections({ setView, onTokenClick }) {
  const newTokens    = useMarkets("createdAt",  "desc");
  const hotTokens    = useMarkets("volumeUSID", "desc");
  const gainerTokens = useMarkets("marketCap",  "desc");

  const handlePromote = () => setView("promote");

  return (
    <div style={{ background: "#0a0a0b", paddingTop: "4rem", paddingBottom: "2rem" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ padding: "0 2rem", marginBottom: "3rem", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: C.cyan, fontSize: "0.65rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>Live on Paxfun</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.04em", margin: 0 }}>
            EXPLORE <span style={{ color: C.cyan }}>TOKENS</span>
          </h2>
        </div>

        {/* New Tokens */}
        <TokenRow
          title="✨ New Tokens"
          badge="JUST LAUNCHED"
          badgeColor={C.green}
          tokens={newTokens.tokens}
          loading={newTokens.loading}
          error={newTokens.error}
          onPromote={handlePromote}
          onTokenClick={onTokenClick}
        />

        {/* Hot Tokens */}
        <TokenRow
          title="🌶️ Hot Right Now"
          badge="TRENDING"
          badgeColor="#f59e0b"
          tokens={hotTokens.tokens}
          loading={hotTokens.loading}
          error={hotTokens.error}
          onPromote={handlePromote}
          onTokenClick={onTokenClick}
        />

        {/* Top Gainers */}
        <TokenRow
          title="📈 Top by Market Cap"
          badge="MARKET CAP"
          badgeColor={C.green}
          tokens={gainerTokens.tokens}
          loading={gainerTokens.loading}
          error={gainerTokens.error}
          onPromote={handlePromote}
          onTokenClick={onTokenClick}
        />

      </div>
    </div>
  );
}

// ─── Tiers ────────────────────────────────────────────────────────────────────
function TiersPage({ setView }) {
  const [selected, setSelected] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", paddingTop: isMobile ? 90 : 120, paddingBottom: 80 }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? "2.5rem" : "4rem", padding: "0 1.2rem" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: C.cyan, fontSize: "0.7rem", marginBottom: "1rem", textTransform: "uppercase" }}>Select Your Campaign Tier</div>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 8vw, 5rem)", color: C.text, margin: 0, letterSpacing: "-0.04em" }}>
          CHOOSE YOUR <span style={{ color: C.cyan }}>FIREPOWER</span>
        </h2>
        <p style={{ color: C.text2, fontFamily: "'DM Sans', sans-serif", marginTop: "1rem", fontSize: "0.85rem" }}>All payments in PAX token · Instant deployment after confirmation</p>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {TIERS.map((tier) => (
          <div key={tier.id} onClick={() => { setSelected(tier.id); setView("promote"); }}
            style={{
              background: tier.featured ? `linear-gradient(180deg, rgba(61,139,94,0.08) 0%, rgba(5,5,5,0.95) 100%)` : "rgba(255,255,255,0.02)",
              border: `1px solid ${tier.featured ? C.cyan : C.border}`,
              borderRadius: 12, padding: isMobile ? "1.8rem 1.5rem" : "2.5rem 2rem", cursor: "pointer", position: "relative",
              transition: "all 0.3s ease",
              boxShadow: tier.featured ? `0 0 40px ${C.cyanGlow}` : "none",
              transform: !isMobile && tier.featured ? "translateY(-8px)" : "none",
            }}>
            {tier.featured && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${C.cyan}, #2d6e4a)`,
                color: "#ffffff", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800, letterSpacing: "0.08em", fontSize: "0.65rem",
                padding: "0.25rem 1rem",
                
                whiteSpace: "nowrap",
              }}>MOST POPULAR</div>
            )}

            <div style={{ display: "flex", alignItems: isMobile ? "center" : "flex-start", justifyContent: "space-between", gap: 12, marginBottom: isMobile ? "1rem" : 0 }}>
              <div>
                <div style={{ fontSize: "2rem", marginBottom: isMobile ? "0.5rem" : "1rem" }}>{tier.icon}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.2rem" : "1.4rem", color: tier.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{tier.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: C.text2, marginTop: "0.3rem" }}>{tier.tagline}</div>
              </div>
              {isMobile && (
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.6rem", color: C.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{tier.price}</div>
                  <div style={{ color: C.cyan, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem" }}>PAX</div>
                </div>
              )}
            </div>

            {!isMobile && (
              <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.8rem", color: C.text, letterSpacing: "-0.04em" }}>{tier.price}</span>
                <span style={{ color: C.cyan, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, marginLeft: "0.4rem" }}>PAX</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem", marginTop: isMobile ? "0.75rem" : 0 }}>
              {tier.features.map(f => (
                <div key={f} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 10, background: tier.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.6rem", color: "#ffffff", fontWeight: 900 }}>✓</span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: C.text2 }}>{f}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%",
              background: tier.featured ? `linear-gradient(135deg, ${C.cyan}, #2d6e4a)` : "transparent",
              border: `1px solid ${tier.color}`,
              color: tier.featured ? "#ffffff" : tier.color,
              padding: "0.85rem",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
              letterSpacing: "0.05em", fontSize: "0.85rem", cursor: "pointer",
              
            }}>DEPLOY CAMPAIGN</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────
function Leaderboard() {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", paddingTop: isMobile ? 90 : 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: C.cyan, fontSize: "0.7rem", marginBottom: "1rem", textTransform: "uppercase" }}>Season 3 · Live Rankings</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 8vw, 4.5rem)", color: C.text, margin: 0, letterSpacing: "-0.04em" }}>
            RAID <span style={{ color: C.cyan }}>LEADERBOARD</span>
          </h2>
        </div>

        {/* Top 3 podium */}
        <div style={{ display: "flex", gap: isMobile ? "0.5rem" : "1rem", marginBottom: "2rem", alignItems: "flex-end", justifyContent: "center" }}>
          {[MOCK_RAIDERS[1], MOCK_RAIDERS[0], MOCK_RAIDERS[2]].map((r, i) => {
            const heights = [isMobile ? "100px" : "140px", isMobile ? "130px" : "180px", isMobile ? "80px" : "120px"];
            const labels = ["2nd", "1st", "3rd"];
            const colors = [C.purple, C.cyan, C.green];
            return (
              <div key={r.rank} style={{ flex: 1, maxWidth: isMobile ? 120 : 220, textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "1.5rem" : "2rem" }}>{r.avatar}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.text, fontSize: isMobile ? "0.75rem" : "0.95rem" }}>{r.name}</div>
                <div style={{ color: C.text3, fontSize: "0.65rem", marginBottom: "0.5rem" }}>{r.handle}</div>
                <div style={{
                  height: heights[i], background: `linear-gradient(180deg, ${colors[i]}22, ${colors[i]}08)`,
                  border: `1px solid ${colors[i]}`, borderBottom: "none",
                  display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "0.75rem",
                }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "1.2rem" : "1.6rem", fontWeight: 700, color: colors[i] }}>{labels[i]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table — mobile shows condensed card list */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOCK_RAIDERS.map((r, i) => (
              <div key={r.rank} style={{
                background: i < 3 ? C.cyanDim : "#111113",
                border: `1px solid ${i < 3 ? C.cyanBorder : C.border}`,
                borderRadius: 8, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: i < 3 ? C.cyan : C.text3, width: 32, flexShrink: 0 }}>#{r.rank}</div>
                <span style={{ fontSize: "1.4rem" }}>{r.avatar}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.text, fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name} {r.badge}</div>
                  <div style={{ color: C.text3, fontSize: "0.7rem" }}>{r.handle}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", color: C.green, fontWeight: 600, fontSize: "0.8rem" }}>{r.earnings} PAX</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: r.tier === "Elite" ? C.cyan : r.tier === "Pro" ? C.purple : C.green, marginTop: 2 }}>{r.tier.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: "#1a1a1e", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 100px 80px", padding: "0.75rem 1.5rem", borderBottom: `1px solid ${C.border}`, background: C.cyanDim }}>
              {["#", "RAIDER", "FOLLOWERS", "RAIDS", "EARNED", "TIER"].map(h => (
                <div key={h} style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", fontSize: "0.65rem", color: C.text3 }}>{h}</div>
              ))}
            </div>
            {MOCK_RAIDERS.map((r, i) => (
              <div key={r.rank} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 100px 80px",
                padding: "1rem 1.5rem", borderBottom: `1px solid ${C.border}`,
                background: i < 3 ? C.cyanDim : "transparent", alignItems: "center",
              }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2rem", fontWeight: 700, color: i < 3 ? C.cyan : C.text3 }}>#{r.rank}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{r.avatar}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.text, fontSize: "0.95rem" }}>{r.name} <span>{r.badge}</span></div>
                    <div style={{ color: C.text3, fontSize: "0.75rem" }}>{r.handle}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", color: C.cyan, fontWeight: 600, fontSize: "0.85rem" }}>{r.followers}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", color: C.text2, fontSize: "0.85rem" }}>{r.raids}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", color: C.green, fontWeight: 600, fontSize: "0.85rem" }}>{r.earnings} PAX</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em",
                  color: r.tier === "Elite" ? C.cyan : r.tier === "Pro" ? C.purple : r.tier === "Rising" ? C.green : C.text3,
                  border: `1px solid ${r.tier === "Elite" ? C.cyanBorder : r.tier === "Pro" ? "rgba(167,139,250,0.4)" : r.tier === "Rising" ? "rgba(74,222,128,0.4)" : C.border}`,
                  padding: "0.15rem 0.5rem", borderRadius: 10,
                }}>{r.tier.toUpperCase()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Raider Dashboard ─────────────────────────────────────────────────────────
function RaiderDashboard({ wallet, onConnectClick }) {
  const [tab, setTab] = useState("overview");
  const isMobile = useIsMobile();
  const mockRaider = MOCK_RAIDERS[0];

  if (!wallet) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 72 }}>
      <div style={{ textAlign: "center", maxWidth: 420, padding: "0 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🔒</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
          Connect to access your <span style={{ color: C.cyan }}>Raider Dashboard</span>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.text2, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          Connect your wallet via WalletConnect to sign in and view your raids, earnings, and profile.
        </div>
        <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.9rem 2.5rem", fontSize: "0.95rem" }}>
          CONNECT WALLET
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: isMobile ? 90 : 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem" }}>

        {/* Profile Header */}
        <div style={{
          background: `linear-gradient(135deg, rgba(61,139,94,0.07), rgba(0,144,204,0.04))`,
          border: `1px solid ${C.cyanBorder}`, borderRadius: 12, padding: isMobile ? "1.25rem" : "2rem",
          display: "flex", alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1rem" : "2rem", marginBottom: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: isMobile ? 56 : 80, height: isMobile ? 56 : 80, borderRadius: "50%", background: C.cyanDim,
              border: `2px solid ${C.cyan}`, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isMobile ? "1.8rem" : "2.5rem", boxShadow: `0 0 20px ${C.cyanGlow}`, flexShrink: 0,
            }}>{mockRaider.avatar}</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.3rem" : "1.8rem", color: C.text, letterSpacing: "-0.03em" }}>
                {mockRaider.name} <span style={{ color: C.cyan }}>{mockRaider.badge}</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.4rem" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: C.text2, fontSize: "0.85rem" }}>{mockRaider.handle}</span>
                <span style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, color: C.cyan, padding: "0.1rem 0.6rem", fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", borderRadius: 2 }}>X LINKED ✓</span>
                <span style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, color: C.cyan, padding: "0.1rem 0.6rem", fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", borderRadius: 2 }}>ELITE TIER</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)", gap: isMobile ? "0.75rem 1.5rem" : "2rem", width: isMobile ? "100%" : "auto", marginLeft: isMobile ? 0 : "auto" }}>
            {[["42,800 PAX", "Total Earned"], ["1,847", "Total Raids"], ["#1", "Global Rank"], ["284K", "X Followers"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: isMobile ? "left" : "center" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{v}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.05em", color: C.text3, marginTop: 3, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.1rem", marginBottom: "1.5rem", borderBottom: `1px solid ${C.border}`, paddingBottom: "0.5rem", overflowX: "auto", scrollbarWidth: "none" }}>
          {[["overview", "OVERVIEW"], ["raids", isMobile ? "RAIDS" : "ACTIVE RAIDS"], ["earnings", "EARNINGS"], ["profile", isMobile ? "PROFILE" : "PROFILE SETTINGS"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? C.cyanDim : "transparent",
              border: "none", borderBottom: tab === t ? `2px solid ${C.cyan}` : "2px solid transparent",
              color: tab === t ? C.cyan : C.text3,
              padding: "0.5rem 0.9rem", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700, letterSpacing: "0.06em", fontSize: "0.72rem", cursor: "pointer",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>{l}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
            {/* Active campaigns */}
            <div style={{ background: "#1a1a1e", border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: C.text, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
                ACTIVE <span style={{ color: C.cyan }}>CAMPAIGNS</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {MOCK_RAIDS.map((raid, i) => (
                  <div key={i} style={{
                    background: "#1a1a1e", border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.text, fontSize: "0.9rem" }}>{raid.project}</div>
                      <div style={{ color: C.text3, fontSize: "0.78rem", marginTop: 2 }}>{raid.task}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", color: C.green, fontWeight: 600, fontSize: "0.85rem" }}>{raid.earned}</div>
                      <div style={{ fontSize: "0.7rem", marginTop: 2, color: raid.status === "completed" ? C.green : C.cyan }}>
                        {raid.status === "completed" ? "✓ DONE" : "● ACTIVE"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cashout + multipliers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: `linear-gradient(135deg, rgba(61,139,94,0.07), rgba(5,5,5,0.5))`, border: `1px solid ${C.cyanBorder}`, borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ ...labelStyle, marginBottom: "0.5rem" }}>Available Balance</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.8rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>3,840 PAX</div>
                <div style={{ color: C.text3, fontSize: "0.8rem", marginBottom: "1.5rem", fontFamily: "'DM Sans', sans-serif" }}>≈ $192.00 USD</div>
                <button style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${C.cyan}, #2d6e4a)`,
                  border: "none", color: "#ffffff", padding: "0.85rem",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                  letterSpacing: "0.05em", fontSize: "0.85rem", cursor: "pointer",
                  
                }}>CASH OUT TO WALLET</button>
              </div>

              <div style={{ background: "#1a1a1e", border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: C.text, marginBottom: "1rem", letterSpacing: "-0.02em" }}>EARNINGS MULTIPLIER</div>
                {[["Follower Bonus", "284K followers", "+2.8x"], ["Raid Streak", "47 days active", "+1.5x"], ["Elite Tier", "Top 10 rank", "+2.0x"]].map(([label, sub, mult]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}` }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: C.text2, fontSize: "0.85rem" }}>{label}</div>
                      <div style={{ color: C.text3, fontSize: "0.73rem", fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", color: C.cyan, fontSize: "1.2rem", fontWeight: 700 }}>{mult}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div style={{ maxWidth: 600 }}>
            <div style={{ background: "#1a1a1e", border: `1px solid ${C.border}`, borderRadius: 12, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={labelStyle}>Profile Photo</div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.cyanDim, border: `2px solid ${C.cyanBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>🦅</div>
                  <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.5rem 1rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.8rem", cursor: "pointer", borderRadius: 10 }}>UPLOAD PHOTO</button>
                </div>
              </div>

              {[["DISPLAY NAME", "CryptoViper"], ["BIO", "Elite raider · Crypto OG · Building on Paxfun"], ["WALLET ADDRESS", "0x1234...5678"]].map(([label, val]) => (
                <div key={label}>
                  <div style={labelStyle}>{label}</div>
                  <input defaultValue={val} style={{
                    width: "100%", background: "#1a1a1e", border: `1px solid ${C.border}`,
                    color: C.text, padding: "0.75rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
                    borderRadius: 10, outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }} onFocus={e => e.target.style.borderColor = C.cyanBorder}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              ))}

              <div style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, borderRadius: 10, padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.cyan, fontSize: "0.9rem" }}>X (TWITTER) ACCOUNT</div>
                  <div style={{ color: C.text3, fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", marginTop: 3 }}>@CryptoViper_X · 284K followers · Connected</div>
                </div>
                <button style={{ background: C.cyan, border: "none", color: "#ffffff", padding: "0.4rem 1rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.08em", cursor: "pointer", borderRadius: 10 }}>LINKED ✓</button>
              </div>

              <button style={{
                ...btnPrimary,
                padding: "0.85rem",
                width: "100%",
                
              }}>SAVE CHANGES</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Promote ──────────────────────────────────────────────────────────────────
function PromotePage({ wallet, onConnectClick }) {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [form, setForm] = useState({ tokenName: "", contractAddress: "", xHandle: "", description: "", launchpadUrl: "" });
  const isMobile = useIsMobile();

  const inputStyle = {
    width: "100%", background: "#1a1a1e", border: `1px solid ${C.border}`,
    color: C.text, padding: "0.75rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
    borderRadius: 10, outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: isMobile ? 90 : 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "3rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: C.cyan, fontSize: "0.7rem", marginBottom: "1rem", textTransform: "uppercase" }}>Token Campaign Setup</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 6vw, 4rem)", color: C.text, margin: 0, letterSpacing: "-0.04em" }}>
            LAUNCH YOUR <span style={{ color: C.cyan }}>RAID CAMPAIGN</span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", gap: isMobile ? "0.25rem" : "0.5rem", alignItems: "center", marginBottom: isMobile ? "2rem" : "3rem", justifyContent: "center" }}>
          {[["01", isMobile ? "Tier" : "Select Tier"], ["02", isMobile ? "Token" : "Token Info"], ["03", isMobile ? "Deploy" : "Pay & Deploy"]].map(([num, label], i) => (
            <div key={num} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", opacity: step === i + 1 ? 1 : 0.4 }}
                onClick={() => step > i + 1 && setStep(i + 1)}>
                <div style={{
                  width: 28, height: 28, borderRadius: 10,
                  background: step >= i + 1 ? C.cyan : "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.7rem",
                  color: step >= i + 1 ? "#ffffff" : C.text3,
                  boxShadow: step >= i + 1 ? `0 0 12px ${C.cyanGlow}` : "none",
                }}>{num}</div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.06em", fontSize: "0.8rem", color: step === i + 1 ? C.text : C.text3 }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 40, height: 1, background: C.border }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {TIERS.map(tier => (
                <div key={tier.id} onClick={() => setSelectedTier(tier)} style={{
                  background: selectedTier?.id === tier.id ? C.cyanDim : tier.featured ? "rgba(61,139,94,0.03)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedTier?.id === tier.id ? C.cyan : tier.featured ? C.cyanBorder : C.border}`,
                  borderRadius: 8, padding: "1.5rem", cursor: "pointer",
                  boxShadow: selectedTier?.id === tier.id ? `0 0 20px ${C.cyanGlow}` : tier.featured ? `0 0 16px ${C.cyanGlow}` : "none",
                  transition: "all 0.2s", position: "relative",
                }}>
                  {tier.featured && (
                    <div style={{
                      position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${C.cyan}, #2d6e4a)`,
                      color: "#ffffff", fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 800, letterSpacing: "0.05em", fontSize: "0.55rem",
                      padding: "0.2rem 0.75rem",
                      
                      whiteSpace: "nowrap",
                    }}>MOST POPULAR</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>{tier.icon}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: tier.color, letterSpacing: "-0.02em" }}>{tier.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.text3, marginTop: 2 }}>{tier.tagline}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: C.text, letterSpacing: "-0.04em" }}>{tier.price}</div>
                      <div style={{ color: C.cyan, fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>PAX</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {tier.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                        <div style={{ width: 14, height: 14, borderRadius: 2, background: selectedTier?.id === tier.id ? C.cyan : tier.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: "0.55rem", color: "#ffffff", fontWeight: 900 }}>✓</span>
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.text2 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  {selectedTier?.id === tier.id && (
                    <div style={{ marginTop: "1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.cyan, letterSpacing: "0.1em" }}>✓ SELECTED</div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => selectedTier && setStep(2)} style={{
              width: "100%",
              background: selectedTier ? `linear-gradient(135deg, ${C.cyan}, #2d6e4a)` : "rgba(255,255,255,0.05)",
              border: "none", color: selectedTier ? "#ffffff" : C.text3, padding: "1rem",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800, letterSpacing: "0.05em",
              fontSize: "0.95rem", cursor: selectedTier ? "pointer" : "not-allowed",
              
            }}>CONTINUE TO TOKEN INFO →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: "#1a1a1e", border: `1px solid ${C.border}`, borderRadius: 12, padding: isMobile ? "1.25rem" : "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              ["TOKEN NAME / TICKER", "tokenName", "e.g. PEPE Token · $PEPE"],
              ["CONTRACT ADDRESS (optional)", "contractAddress", "0x..."],
              ["X (TWITTER) HANDLE TO RAID", "xHandle", "@YourTokenHandle"],
              ["PAXFUN LAUNCHPAD URL", "launchpadUrl", "https://paxfun.app/token/..."],
            ].map(([label, field, placeholder]) => (
              <div key={field}>
                <div style={labelStyle}>{label}</div>
                <input placeholder={placeholder} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.cyanBorder}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
            ))}
            <div>
              <div style={labelStyle}>Project Description</div>
              <textarea rows={4} placeholder="Tell raiders about your project..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = C.cyanBorder}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <div style={labelStyle}>Campaign Artwork</div>
              <div style={{
                border: `2px dashed ${C.cyanBorder}`, borderRadius: 12, padding: "2rem",
                textAlign: "center", cursor: "pointer", color: C.text3,
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em", fontSize: "0.85rem",
                transition: "background 0.2s",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖼️</div>
                DRAG & DROP OR CLICK TO UPLOAD<br />
                <span style={{ fontSize: "0.75rem", color: C.text3 }}>PNG, JPG, GIF · Max 10MB</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.85rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", borderRadius: 10 }}>← BACK</button>
              <button onClick={() => setStep(3)} style={{
                flex: 2, ...btnPrimary, padding: "0.85rem",
                
              }}>CONTINUE TO PAYMENT →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ background: "#1a1a1e", border: `1px solid ${C.border}`, borderRadius: 12, padding: "2rem" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: C.text, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>ORDER SUMMARY</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: C.text2, fontFamily: "'DM Sans', sans-serif" }}>Campaign Tier</span>
                <span style={{ color: C.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{selectedTier?.name || "In Your Face"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: C.text2, fontFamily: "'DM Sans', sans-serif" }}>Token</span>
                <span style={{ color: C.text, fontFamily: "'DM Sans', sans-serif" }}>{form.tokenName || "—"}</span>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.text2, letterSpacing: "0.08em" }}>TOTAL</span>
                <div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "2rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{selectedTier?.price || "4,000"}</span>
                  <span style={{ color: C.cyan, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, marginLeft: "0.4rem" }}>PAX</span>
                </div>
              </div>
            </div>

            <div style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, borderRadius: 12, padding: "2rem" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: C.cyan, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>PAX TOKEN PAYMENT</div>

              {wallet ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "rgba(61,139,94,0.05)", border: `1px solid ${C.cyanBorder}`,
                  borderRadius: 6, padding: "12px 16px", marginBottom: "1rem",
                }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.green }}>WALLET CONNECTED</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text2, marginTop: 2 }}>{wallet}</div>
                  </div>
                </div>
              ) : (
                <>
                  <div style={labelStyle}>Your Wallet Address</div>
                  <input placeholder="Connect your PAX wallet..." style={{ ...inputStyle, borderColor: C.cyanBorder, marginBottom: "1rem" }}
                    onFocus={e => e.target.style.borderColor = C.cyan}
                    onBlur={e => e.target.style.borderColor = C.cyanBorder} />
                  <button onClick={onConnectClick} style={{
                    width: "100%", background: C.cyanDim,
                    border: `1px solid ${C.cyanBorder}`, color: C.cyan, padding: "0.85rem",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.05em",
                    fontSize: "0.9rem", cursor: "pointer", borderRadius: 10, marginBottom: "1rem",
                  }}>CONNECT WALLET VIA WALLETCONNECT</button>
                </>
              )}

              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.85rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", borderRadius: 10 }}>← BACK</button>
                <button disabled={!wallet} style={{
                  flex: 2, ...btnPrimary, padding: "0.85rem",
                  
                  opacity: wallet ? 1 : 0.4, cursor: wallet ? "pointer" : "not-allowed",
                  filter: "none",
                }}>SUBMIT PAYMENT & DEPLOY 🚀</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dev Dashboard ────────────────────────────────────────────────────────────
const MOCK_CAMPAIGNS = [
  { id: 1, token: "NOVA Token", ticker: "$NOVA", tier: "In Your Face", status: "active", progress: 68, raiders: 40, reach: "2.4M", spent: "4,000", daysLeft: 3, change: "+24.1%" },
  { id: 2, token: "AstroDAO",   ticker: "$ASTRO", tier: "Make Some Noise", status: "active", progress: 41, raiders: 15, reach: "840K", spent: "1,500", daysLeft: 1, change: "+8.7%" },
  { id: 3, token: "MoonFi",     ticker: "$MOON",  tier: "Get The Word Out", status: "completed", progress: 100, raiders: 5, reach: "310K", spent: "500", daysLeft: 0, change: "+5.2%" },
];

function DevDashboard({ wallet, onConnectClick, setView }) {
  const [tab, setTab] = useState("overview");
  const isMobile = useIsMobile();

  if (!wallet) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 72 }}>
      <div style={{ textAlign: "center", maxWidth: 420, padding: "0 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🔒</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
          Connect to access your <span style={{ color: C.cyan }}>Dev Dashboard</span>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.text2, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          Connect your wallet to manage your token campaigns, view performance stats, and deploy new raids.
        </div>
        <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.9rem 2.5rem", fontSize: "0.95rem" }}>CONNECT WALLET</button>
      </div>
    </div>
  );

  const totalReach   = "3.55M";
  const totalSpent   = "6,000";
  const activeCampaigns = MOCK_CAMPAIGNS.filter(c => c.status === "active").length;

  return (
    <div style={{ minHeight: "100vh", paddingTop: isMobile ? 90 : 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem" }}>

        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, rgba(61,139,94,0.07), rgba(0,144,204,0.03))`,
          border: `1px solid ${C.cyanBorder}`, borderRadius: 12, padding: isMobile ? "1.25rem" : "1.75rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.3rem" : "1.7rem", letterSpacing: "-0.03em" }}>Dev Dashboard</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.text3, marginTop: 4 }}>
              {wallet.slice(0, 8)}…{wallet.slice(-6)}
            </div>
          </div>
          <button onClick={() => setView("promote")} style={{ ...btnPrimary, padding: "0.65rem 1.4rem", fontSize: "0.8rem" }}>
            + NEW CAMPAIGN
          </button>
        </div>

        {/* Stats row — 2x2 on mobile, 4x1 on desktop */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 10 : 14, marginBottom: "1.5rem" }}>
          {[
            { label: "Active Campaigns", value: activeCampaigns,  unit: "",      sub: `${MOCK_CAMPAIGNS.length} total`, color: C.cyan },
            { label: "Total PAX Spent",  value: totalSpent,       unit: " PAX",  sub: "all campaigns", color: C.cyan },
            { label: "Total Reach",      value: totalReach,       unit: "",      sub: "est. impressions", color: C.green },
            { label: "Avg Engagement",   value: "4.8%",           unit: "",      sub: "+1.2% vs last mo", color: C.green },
          ].map(({ label, value, unit, sub, color }) => (
            <div key={label} style={{
              background: "#111113", border: `1px solid ${C.border}`,
              borderRadius: 8, padding: isMobile ? "14px" : "18px 20px",
            }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, color: C.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "1.4rem" : "1.9rem", fontWeight: 700, color, letterSpacing: "-0.04em", lineHeight: 1 }}>
                {value}<span style={{ fontSize: "0.8rem", color: C.text2, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{unit}</span>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: C.text3, marginTop: 6 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem", borderBottom: `1px solid ${C.border}`, paddingBottom: "0.5rem" }}>
          {[["overview", "CAMPAIGNS"], ["analytics", "ANALYTICS"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "transparent", border: "none",
              borderBottom: tab === t ? `2px solid ${C.cyan}` : "2px solid transparent",
              color: tab === t ? C.cyan : C.text3,
              padding: "0.5rem 1.2rem",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em",
              fontSize: "0.75rem", cursor: "pointer",
            }}>{l}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {MOCK_CAMPAIGNS.map(c => (
              <div key={c.id} style={{
                background: "#111113",
                border: `1px solid ${c.status === "active" ? C.cyanBorder : C.border}`,
                borderRadius: 8, padding: isMobile ? "16px" : "20px 24px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: c.status === "active" ? C.cyanDim : "rgba(255,255,255,0.04)",
                      border: `1px solid ${c.status === "active" ? C.cyanBorder : C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.72rem", color: C.cyan,
                    }}>{c.ticker.replace("$","")}</div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em" }}>{c.token}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.text3, marginTop: 2 }}>{c.tier}</div>
                    </div>
                  </div>                  <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                    {[
                      { label: "Raiders", val: c.raiders },
                      { label: "Est. Reach", val: c.reach },
                      { label: "PAX Spent", val: c.spent },
                      { label: "Price Δ", val: c.change, color: C.green },
                    ].map(({ label, val, color }) => (
                      <div key={label} style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.9rem", color: color || C.text }}>{val}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: C.text3, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                      </div>
                    ))}

                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em",
                      padding: "4px 10px", borderRadius: 20,
                      background: c.status === "active" ? "rgba(0,240,160,0.1)" : "rgba(255,255,255,0.05)",
                      color: c.status === "active" ? C.green : C.text3,
                      border: `1px solid ${c.status === "active" ? "rgba(0,240,160,0.25)" : C.border}`,
                    }}>
                      {c.status === "active" ? `● ACTIVE · ${c.daysLeft}d left` : "✓ COMPLETED"}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: C.text3 }}>Campaign progress</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.cyan }}>{c.progress}%</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${c.progress}%`,
                      background: c.progress === 100
                        ? `linear-gradient(90deg, ${C.green}, #22c55e)`
                        : `linear-gradient(90deg, ${C.cyan}, #2d6e4a)`,
                      borderRadius: 99,
                      boxShadow: c.progress < 100 ? `0 0 8px ${C.cyanGlow}` : "none",
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* Reach over time chart */}
            <div style={{ background: "#111113", border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Reach Over Time
              </div>
              <div style={{ height: 150, position: "relative" }}>
                <svg viewBox="0 0 400 150" width="100%" height="150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.cyan} stopOpacity="0.2"/>
                      <stop offset="100%" stopColor={C.cyan} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <path d="M0,140 C50,130 100,110 150,95 C200,80 240,88 280,65 C320,42 360,35 400,20 L400,150 L0,150 Z" fill="url(#reachGrad)"/>
                  <path d="M0,140 C50,130 100,110 150,95 C200,80 240,88 280,65 C320,42 360,35 400,20" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="400" cy="20" r="4" fill={C.cyan}/>
                  <circle cx="400" cy="20" r="8" fill={C.cyan} opacity="0.2"/>
                </svg>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                {["Day 1","Day 3","Day 5","Day 7","Today"].map(d => (
                  <span key={d} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: C.text3 }}>{d}</span>
                ))}
              </div>
            </div>

            {/* Engagement breakdown */}
            <div style={{ background: "#111113", border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 20, letterSpacing: "-0.01em" }}>
                Engagement Breakdown
              </div>
              {[
                { label: "Quote Tweets", pct: 42, color: C.cyan },
                { label: "Replies",      pct: 28, color: C.purple },
                { label: "Original Posts", pct: 18, color: C.green },
                { label: "Spaces",       pct: 12, color: "#f59e0b" },
              ].map(({ label, pct, color }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.text2 }}>{label}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, boxShadow: `0 0 6px ${color}55` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Top performing raiders for your campaigns */}
            <div style={{ background: "#111113", border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px", gridColumn: "1 / -1" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Top Raiders on Your Campaigns
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {MOCK_RAIDERS.slice(0,4).map(r => (
                  <div key={r.rank} style={{
                    background: "#1a1a1e", border: `1px solid ${C.border}`,
                    borderRadius: 6, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontSize: "1.4rem" }}>{r.avatar}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.83rem" }}>{r.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.cyan, marginTop: 2 }}>{r.followers} followers</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


// ─── Profile Setup Modal ──────────────────────────────────────────────────────
function ProfileSetupModal({ wallet, onSave, onSkip }) {
  const isMobile = useIsMobile();
  const [username, setUsername]   = useState("");
  const [xHandle, setXHandle]     = useState("");
  const [avatar, setAvatar]       = useState(null);   // base64 data URL
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [step, setStep]           = useState(1);       // 1=username, 2=photo, 3=x
  const [usernameError, setUsernameError] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      setAvatarPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!username.trim()) { setUsernameError("Username is required"); return; }
      if (username.length < 3) { setUsernameError("Must be at least 3 characters"); return; }
      setUsernameError("");
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSave = () => {
    onSave({
      username: username.trim(),
      xHandle: xHandle.trim().replace(/^@/, ""),
      avatar: avatar || null,
      wallet,
      createdAt: Date.now(),
    });
  };

  const steps = ["Username", "Photo", "Connect X"];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "#111113", border: `1px solid ${C.cyanBorder}`,
        borderRadius: isMobile ? 0 : 14,
        width: isMobile ? "100vw" : 460,
        maxHeight: isMobile ? "100vh" : "90vh",
        overflowY: "auto",
        boxShadow: `0 0 80px ${C.cyanGlow}`,
        animation: "modalIn 0.25s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 0" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em", marginBottom: 4 }}>
            Create your profile
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.text3, marginBottom: 24 }}>
            {wallet.slice(0,6)}…{wallet.slice(-4)}
          </div>

          {/* Step indicators */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{
                  height: 3, borderRadius: 99, marginBottom: 6,
                  background: i + 1 <= step ? C.cyan : "rgba(255,255,255,0.08)",
                  boxShadow: i + 1 <= step ? `0 0 8px ${C.cyanGlow}` : "none",
                  transition: "all 0.3s",
                }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: i + 1 === step ? C.cyan : C.text3, fontWeight: i + 1 === step ? 700 : 400 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "0 28px 28px" }}>

          {/* Step 1 — Username */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={labelStyle}>Choose a username</div>
                <input
                  value={username}
                  onChange={e => { setUsername(e.target.value); setUsernameError(""); }}
                  placeholder="e.g. CryptoViper"
                  maxLength={24}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${usernameError ? "#ff4060" : C.border}`,
                    color: C.text, padding: "0.8rem 1rem",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
                    borderRadius: 6, outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = C.cyan}
                  onBlur={e => e.target.style.borderColor = usernameError ? "#ff4060" : C.border}
                  onKeyDown={e => e.key === "Enter" && handleNext()}
                  autoFocus
                />
                {usernameError && <div style={{ color: "#ff4060", fontSize: "0.75rem", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>{usernameError}</div>}
                <div style={{ color: C.text3, fontSize: "0.72rem", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
                  {username.length}/24 characters · Letters, numbers, underscores only
                </div>
              </div>
              <button onClick={handleNext} style={{ ...btnPrimary, padding: "0.85rem", width: "100%",  }}>
                CONTINUE →
              </button>
              <button onClick={onSkip} style={{ background: "none", border: "none", color: C.text3, fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", cursor: "pointer", textAlign: "center" }}>
                Skip for now
              </button>
            </div>
          )}

          {/* Step 2 — Photo */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              {/* Avatar preview */}
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                border: `2px solid ${avatarPreview ? C.cyan : C.border}`,
                background: avatarPreview ? "transparent" : "rgba(255,255,255,0.04)",
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: avatarPreview ? `0 0 20px ${C.cyanGlow}` : "none",
                transition: "all 0.3s",
              }}>
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: "2.5rem", opacity: 0.3 }}>👤</span>
                }
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{username}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.text3 }}>{wallet.slice(0,6)}…{wallet.slice(-4)}</div>
              </div>

              <label style={{
                background: C.cyanDim, border: `1px solid ${C.cyanBorder}`,
                color: C.cyan, padding: "0.75rem 2rem",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "0.82rem", letterSpacing: "0.08em", cursor: "pointer",
                borderRadius: 6, display: "inline-block",
              }}>
                UPLOAD PHOTO
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              </label>

              <div style={{ display: "flex", gap: 10, width: "100%" }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", borderRadius: 6 }}>← Back</button>
                <button onClick={handleNext} style={{ flex: 2, ...btnPrimary, padding: "0.75rem",  }}>
                  {avatarPreview ? "LOOKS GOOD →" : "SKIP PHOTO →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Connect X */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                {/* Avatar summary */}
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  border: `2px solid ${C.cyanBorder}`,
                  background: "rgba(255,255,255,0.04)",
                  overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 10px",
                }}>
                  {avatarPreview
                    ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "1.8rem" }}>👤</span>
                  }
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem" }}>{username}</div>
              </div>

              <div>
                <div style={labelStyle}>X (Twitter) Handle</div>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                    color: C.text3, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
                  }}>@</span>
                  <input
                    value={xHandle}
                    onChange={e => setXHandle(e.target.value.replace(/^@/, ""))}
                    placeholder="YourHandle"
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${C.border}`,
                      color: C.text, padding: "0.8rem 1rem 0.8rem 2rem",
                      fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                      borderRadius: 6, outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderColor = C.cyan}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                </div>
                <div style={{ color: C.text3, fontSize: "0.72rem", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
                  Required to participate as a Raider and earn PAX
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", borderRadius: 6 }}>← Back</button>
                <button onClick={handleSave} style={{ flex: 2, ...btnPrimary, padding: "0.75rem",  }}>
                  CREATE PROFILE 🚀
                </button>
              </div>
              <button onClick={onSkip} style={{ background: "none", border: "none", color: C.text3, fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", cursor: "pointer", textAlign: "center" }}>
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage({ wallet, profile, onSaveProfile, onConnectClick }) {
  const isMobile = useIsMobile();
  const [editing, setEditing]     = useState(false);
  const [username, setUsername]   = useState(profile?.username || "");
  const [xHandle, setXHandle]     = useState(profile?.xHandle || "");
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [saved, setSaved]         = useState(false);

  if (!wallet) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 72 }}>
      <div style={{ textAlign: "center", maxWidth: 420, padding: "0 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>👤</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
          Connect to view your <span style={{ color: C.cyan }}>Profile</span>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.text2, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          Connect your wallet to create and manage your PAXpromote profile.
        </div>
        <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.9rem 2.5rem", fontSize: "0.95rem" }}>CONNECT WALLET</button>
      </div>
    </div>
  );

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setAvatarPreview(ev.target.result); setNewAvatar(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSaveProfile({ ...profile, username, xHandle: xHandle.replace(/^@/, ""), avatar: newAvatar || profile?.avatar });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: isMobile ? 90 : 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem" }}>

        {/* Profile card */}
        <div style={{
          background: `linear-gradient(135deg, rgba(61,139,94,0.08), rgba(5,5,5,0.95))`,
          border: `1px solid ${C.cyanBorder}`, borderRadius: 14,
          padding: "2.5rem", marginBottom: 24, textAlign: "center",
        }}>
          {/* Avatar */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              border: `3px solid ${C.cyan}`,
              background: "rgba(255,255,255,0.04)",
              overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 30px ${C.cyanGlow}`,
            }}>
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "3rem" }}>👤</span>
              }
            </div>
            {editing && (
              <label style={{
                position: "absolute", bottom: 0, right: 0,
                width: 30, height: 30, borderRadius: "50%",
                background: C.cyan, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "0.75rem",
                boxShadow: `0 0 10px ${C.cyanGlow}`,
              }}>
                ✏️
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              </label>
            )}
          </div>

          {!editing ? (
            <>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.03em", marginBottom: 6 }}>
                {profile?.username || "Anonymous"}
              </div>
              {profile?.xHandle && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.cyan, marginBottom: 8 }}>
                  @{profile.xHandle}
                </div>
              )}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.text3, marginBottom: 20 }}>
                {wallet.slice(0, 10)}…{wallet.slice(-8)}
              </div>
              <button onClick={() => setEditing(true)} style={{
                background: C.cyanDim, border: `1px solid ${C.cyanBorder}`,
                color: C.cyan, padding: "0.6rem 1.8rem", borderRadius: 6,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "0.8rem", letterSpacing: "0.08em", cursor: "pointer",
              }}>EDIT PROFILE</button>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
              <div>
                <div style={labelStyle}>Username</div>
                <input value={username} onChange={e => setUsername(e.target.value)} maxLength={24}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.text, padding: "0.75rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", borderRadius: 6, outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = C.cyan}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <div>
                <div style={labelStyle}>X (Twitter) Handle</div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.text3 }}>@</span>
                  <input value={xHandle} onChange={e => setXHandle(e.target.value.replace(/^@/, ""))}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.text, padding: "0.75rem 1rem 0.75rem 2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", borderRadius: 6, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = C.cyan}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setEditing(false); setUsername(profile?.username || ""); setXHandle(profile?.xHandle || ""); setAvatarPreview(profile?.avatar || null); }}
                  style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", borderRadius: 6 }}>CANCEL</button>
                <button onClick={handleSave}
                  style={{ flex: 2, ...btnPrimary, padding: "0.75rem",  }}>SAVE CHANGES</button>
              </div>
            </div>
          )}

          {saved && (
            <div style={{ marginTop: 16, color: C.green, fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
              ✓ Profile saved!
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { label: "Campaigns Launched", value: "0" },
            { label: "Raids Completed", value: "0" },
            { label: "PAX Earned", value: "0" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#111113", border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: C.text3, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Home Tiers Strip ─────────────────────────────────────────────────────────
function HomeTiersStrip({ setView }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#0a0a0b", padding: isMobile ? "3rem 1.2rem 4rem" : "4rem 2rem 5rem", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "3rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: C.cyan, fontSize: "0.65rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>All payments in PAX token</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.04em", margin: 0 }}>
            CAMPAIGN <span style={{ color: C.cyan }}>TIERS</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "0.75rem" : "1rem" }}>
          {TIERS.map(tier => (
            <div key={tier.id} style={{
              background: tier.featured ? `linear-gradient(135deg, rgba(61,139,94,0.07), rgba(5,5,5,0.95))` : "rgba(255,255,255,0.02)",
              border: `1px solid ${tier.featured ? C.cyan : C.border}`,
              borderRadius: 8, padding: isMobile ? "1.2rem 1rem" : "1.5rem",
              display: "flex", flexDirection: "column", gap: "1rem",
              position: "relative",
              boxShadow: tier.featured ? `0 0 24px ${C.cyanGlow}` : "none",
            }}>
              {tier.featured && (
                <div style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                  background: `linear-gradient(135deg, ${C.cyan}, #2d6e4a)`,
                  color: "#ffffff", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 800, letterSpacing: "0.05em", fontSize: "0.55rem",
                  padding: "0.2rem 0.75rem",
                  
                  whiteSpace: "nowrap",
                }}>POPULAR</div>
              )}
              <div>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{tier.icon}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "0.9rem" : "1rem", color: tier.color, letterSpacing: "-0.02em" }}>{tier.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: C.text3, marginTop: 2 }}>{tier.tagline}</div>
              </div>
              <div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "1.3rem" : "1.6rem", fontWeight: 700, color: C.text, letterSpacing: "-0.04em" }}>{tier.price}</span>
                <span style={{ color: C.cyan, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", marginLeft: "0.3rem" }}>PAX</span>
              </div>
              <button onClick={() => setView("promote")} style={{
                width: "100%",
                background: tier.featured ? `linear-gradient(135deg, ${C.cyan}, #2d6e4a)` : "transparent",
                border: `1px solid ${tier.featured ? C.cyan : tier.color}`,
                color: tier.featured ? "#ffffff" : tier.color,
                padding: isMobile ? "0.6rem" : "0.7rem",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                letterSpacing: "0.1em", fontSize: "0.75rem", cursor: "pointer",
                
              }}>PROMOTE</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
// ─── Token Detail Page ────────────────────────────────────────────────────────
function TokenDetailPage({ token, onBack, setView, wallet, onConnectClick }) {
  const isMobile = useIsMobile();
  if (!token) return null;

  const isUp = token.change >= 0;
  const changeColor = isUp ? C.green : C.red;
  const shortAddr = token.address ? `${token.address.slice(0,6)}...${token.address.slice(-4)}` : "—";

  const raidOptions = [
    {
      id: "x",
      label: "Interact on X",
      desc: "Like, retweet & reply to boost visibility",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => window.open(`https://x.com/search?q=%24${token.ticker?.replace("$","")}`, "_blank"),
    },
    {
      id: "media",
      label: "Create Media",
      desc: "Make memes, videos & posts for this token",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="m21 15-5-5L5 21"/>
        </svg>
      ),
      action: () => setView("raider"),
    },
    {
      id: "tg",
      label: "Telegram Call",
      desc: "Blast this token to call channels",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      action: () => window.open("https://t.me/paxeernetwork", "_blank"),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingTop: 60 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "1.5rem 1rem" : "2rem 2rem" }}>

        {/* Back link */}
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          color: C.text2, fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem",
          marginBottom: "1.5rem", padding: 0,
        }}>
          <span>←</span> Back to Markets
        </button>

        {/* ── RAID BAR ── */}
        <div style={{
          background: "#111113",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: isMobile ? "1rem" : "1.25rem 1.5rem",
          marginBottom: "1.25rem",
        }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
            letterSpacing: "0.08em", color: C.cyan, textTransform: "uppercase",
            marginBottom: "1rem",
          }}>⚡ Raid Options</div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 12,
          }}>
            {raidOptions.map(opt => (
              <div key={opt.id} style={{
                background: "#1a1a1e",
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "1rem",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "rgba(61,139,94,0.10)",
                    border: `1px solid rgba(61,139,94,0.2)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.cyan, flexShrink: 0,
                  }}>
                    {opt.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: C.text }}>{opt.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.text3, marginTop: 2 }}>{opt.desc}</div>
                  </div>
                </div>
                <button onClick={opt.action} style={{
                  ...btnPrimary,
                  padding: "0.5rem 1rem", fontSize: "0.8rem", width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  Raid
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOKEN HEADER (PaxFun style) ── */}
        <div style={{
          background: "#111113",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: isMobile ? "1.25rem" : "1.5rem",
          marginBottom: "1.25rem",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            {/* Avatar */}
            <div style={{
              width: 64, height: 64, borderRadius: 14,
              background: "#1a1a1e", border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2rem", flexShrink: 0, overflow: "hidden",
            }}>
              {token.image
                ? <img src={token.image} alt={token.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                : token.emoji || "🪙"
              }
            </div>

            {/* Name + address */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: C.text }}>{token.name}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.text3 }}>{token.ticker}</span>
                {token.promoted && (
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em",
                    background: "rgba(61,139,94,0.15)", color: C.cyan,
                    border: "1px solid rgba(61,139,94,0.3)", borderRadius: 4, padding: "2px 8px",
                  }}>PROMOTED</span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.text3 }}>Token: {shortAddr}</span>
                {token.address && (
                  <button onClick={() => navigator.clipboard?.writeText(token.address)} style={{
                    background: "none", border: "none", cursor: "pointer", color: C.text3, fontSize: "0.75rem", padding: 0,
                  }}>⧉</button>
                )}
              </div>
            </div>

            {/* PaxFun link */}
            <a href={`https://swap.sidiora.xyz/paxfun/${token.address}`} target="_blank" rel="noopener noreferrer" style={{
              background: "#1a1a1e", border: `1px solid ${C.border}`,
              borderRadius: 8, padding: "8px 12px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.text2,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
            }}>
              View on PaxFun ↗
            </a>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
            gap: 12, marginTop: "1.5rem",
            borderTop: `1px solid ${C.border}`, paddingTop: "1.25rem",
          }}>
            {[
              ["Price",       token.price   || "—"],
              ["Market Cap",  token.mcap    || "—"],
              ["24h Volume",  token.volume  || "—"],
              ["Holders",     token.holders || "—"],
              ["Swaps",       token.swaps   || "—"],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.text3, marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: label === "Price" ? "1.3rem" : "1rem", color: C.text }}>{val}</div>
                {label === "Price" && (
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: changeColor, marginTop: 2 }}>
                    {isUp ? "+" : ""}{token.change?.toFixed(2)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── PROMOTE CTA ── */}
        {!token.promoted && (
          <div style={{
            background: "rgba(61,139,94,0.06)",
            border: `1px solid rgba(61,139,94,0.2)`,
            borderRadius: 16, padding: "1.25rem 1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: C.text, marginBottom: 4 }}>
                This token isn't promoted yet
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.text3 }}>
                Deploy a raid campaign to boost visibility across X and Telegram
              </div>
            </div>
            <button onClick={() => setView("promote")} style={{ ...btnPrimary, padding: "0.6rem 1.5rem" }}>
              Promote This Token
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{
      background: "#030303",
      borderTop: `1px solid ${C.border}`,
      padding: isMobile ? "2rem 1.2rem" : "2.5rem 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>

        {/* Logo + copyright */}
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 0, marginBottom: "0.4rem" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: C.text }}>PAX</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.1rem", letterSpacing: "-0.02em", color: C.text }}>promote</span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.text3 }}>
            © 2026 PAXpromote. All rights reserved.
          </div>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {[
            { label: "𝕏", name: "X / Twitter", href: "https://x.com/paxeer_app" },
            { label: "✈", name: "Telegram", href: "https://t.me/paxeernetwork" },

          ].map(({ label, name, href }) => (
            <a key={name} href={href} title={name} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${C.border}`,
              color: C.text2, textDecoration: "none",
              fontSize: "1rem", fontWeight: 700,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.cyanBorder; e.currentTarget.style.color = C.cyan; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text2; }}
            >{label}</a>
          ))}
        </div>

      </div>
    </footer>
  );
}

// ─── App (inner — has access to wagmi hooks) ──────────────────────────────────
function AppInner() {
  const [view, setView]                   = useState("home");
  const [selectedToken, setSelectedToken] = useState(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profile, setProfile]             = useState(() => {
    try { return JSON.parse(localStorage.getItem("paxpromote_profile")) || null; } catch { return null; }
  });

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const wallet = isConnected ? address : null;
  const onConnectClick = () => open();
  const onDisconnect = () => { disconnect(); };

  const openToken = (token) => { setSelectedToken(token); setView("token"); };

  // Show profile setup modal on first connect
  useEffect(() => {
    if (isConnected && address && !profile) {
      const timer = setTimeout(() => setShowProfileSetup(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isConnected, address, profile]);

  const handleSaveProfile = (profileData) => {
    setProfile(profileData);
    localStorage.setItem("paxpromote_profile", JSON.stringify(profileData));
    setShowProfileSetup(false);
  };

  const handleSkipProfile = () => {
    const skipped = { skipped: true, wallet: address };
    setProfile(skipped);
    localStorage.setItem("paxpromote_profile", JSON.stringify(skipped));
    setShowProfileSetup(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0b; color: #f0f0f2; font-family: 'DM Sans', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        button:hover { filter: brightness(1.08); }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0b; }
        ::-webkit-scrollbar-thumb { background: #5a5a66; border-radius: 2px; }
        input, textarea, button { -webkit-tap-highlight-color: transparent; }
        @media (max-width: 767px) {
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>

      {showProfileSetup && wallet && (
        <ProfileSetupModal wallet={wallet} onSave={handleSaveProfile} onSkip={handleSkipProfile} />
      )}

      <Navbar view={view} setView={setView} wallet={wallet} profile={profile} onConnectClick={onConnectClick} onDisconnect={onDisconnect} />
      {view === "home" && (
        <>
          <Hero setView={setView} onConnectClick={onConnectClick} />
          <TokenSections setView={setView} onTokenClick={openToken} />
          <TiersPage setView={setView} />
          <Footer />
        </>
      )}
      {view === "token"       && <><TokenDetailPage token={selectedToken} onBack={() => setView("home")} setView={setView} wallet={wallet} onConnectClick={onConnectClick} /><Footer /></>}
      {view === "leaderboard" && <><Leaderboard /><Footer /></>}
      {view === "dev"         && <><DevDashboard wallet={wallet} onConnectClick={onConnectClick} setView={setView} /><Footer /></>}
      {view === "raider"      && <><RaiderDashboard wallet={wallet} onConnectClick={onConnectClick} /><Footer /></>}
      {view === "promote"     && <><PromotePage wallet={wallet} onConnectClick={onConnectClick} /><Footer /></>}
      {view === "profile"     && <><ProfilePage wallet={wallet} profile={profile} onSaveProfile={handleSaveProfile} onConnectClick={onConnectClick} /><Footer /></>}
    </>
  );
}

// ─── App (root — provides wagmi + query context) ──────────────────────────────
export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppInner />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
