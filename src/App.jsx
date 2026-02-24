import { useState, useEffect, useRef } from “react”;
import { createWeb3Modal } from “@web3modal/wagmi/react”;
import { defaultWagmiConfig } from “@web3modal/wagmi/react/config”;
import { WagmiProvider, useAccount, useDisconnect } from “wagmi”;
import { QueryClient, QueryClientProvider } from “@tanstack/react-query”;
import { useWeb3Modal } from “@web3modal/wagmi/react”;

// ─── Mobile hook ─────────────────────────────────────────────────────────────
function useIsMobile() {
const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
useEffect(() => {
const handler = () => setIsMobile(window.innerWidth < 768);
window.addEventListener(“resize”, handler);
return () => window.removeEventListener(“resize”, handler);
}, []);
return isMobile;
}

const projectId = “60ce60abcf144f20677ce7e052a00f35”;

// ─── HyperPaxeer custom chain ─────────────────────────────────────────────────
const hyperPaxeer = {
id: 125,
name: “HyperPaxeer Network”,
nativeCurrency: { name: “PAX”, symbol: “PAX”, decimals: 18 },
rpcUrls: {
default: { http: [“https://mainnet-beta.rpc.hyperpaxeer.com/rpc”] },
public:  { http: [“https://mainnet-beta.rpc.hyperpaxeer.com/rpc”] },
},
blockExplorers: {
default: { name: “PaxScan”, url: “https://paxscan.paxeer.app” },
},
};

const metadata = {
name: “PAXpromote”,
description: “The premier promotion network for Paxfun tokens”,
url: “https://paxpromote.io”,
icons: [“https://brand.paxeer.app/assets/500x5000_texr_logo_darkBG.png”],
};

const chains = [hyperPaxeer];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
const queryClient = new QueryClient();

createWeb3Modal({
wagmiConfig,
projectId,
chains,
themeMode: “dark”,
themeVariables: {
“–w3m-accent”: “#00E0FF”,
“–w3m-background-color”: “#0c0c0e”,
“–w3m-border-radius-master”: “4px”,
“–w3m-font-family”: “Inter, sans-serif”,
},
});

const TIERS = [
{
id: “word-out”,
name: “Get The Word Out”,
tagline: “Spark the conversation”,
price: “500”,
color: “#4ade80”,
glow: “rgba(74,222,128,0.3)”,
icon: “📡”,
features: [“5 Raiders assigned”, “24hr campaign”, “Basic X amplification”, “Project card listing”, “Performance report”],
},
{
id: “make-noise”,
name: “Make Some Noise”,
tagline: “Build momentum”,
price: “1,500”,
color: “#00E0FF”,
glow: “rgba(0,224,255,0.3)”,
icon: “🔊”,
features: [“15 Raiders assigned”, “72hr campaign”, “Boosted X amplification”, “Trending hashtag push”, “Artwork promotion”, “Detailed analytics”],
},
{
id: “in-your-face”,
name: “In Your Face”,
tagline: “Dominate the feed”,
price: “4,000”,
color: “#00E0FF”,
glow: “rgba(0,224,255,0.35)”,
icon: “🔥”,
featured: true,
features: [“40 Raiders assigned”, “7-day campaign”, “Premium X raids”, “Priority placement”, “Community raids”, “Meme & content package”, “Live tracking dashboard”],
},
{
id: “kol-package”,
name: “KOL Package”,
tagline: “Full-spectrum domination”,
price: “12,000”,
color: “#a78bfa”,
glow: “rgba(167,139,250,0.35)”,
icon: “👑”,
features: [“100+ Raiders assigned”, “30-day campaign”, “KOL endorsements”, “Spaces events”, “Viral content creation”, “AMA coordination”, “Dedicated campaign manager”, “Real-time command center”],
},
];

const MOCK_RAIDERS = [
{ rank: 1, name: “CryptoViper”, handle: “@CryptoViper_X”, avatar: “🦅”, followers: “284K”, earnings: “42,800”, raids: 1847, tier: “Elite”, badge: “👑” },
{ rank: 2, name: “MoonHunter”, handle: “@MoonHunter99”, avatar: “🐺”, followers: “156K”, earnings: “31,200”, raids: 1203, tier: “Elite”, badge: “🔥” },
{ rank: 3, name: “PaxRaider_Z”, handle: “@PaxRaider_Z”, avatar: “🦊”, followers: “89K”, earnings: “18,600”, raids: 904, tier: “Pro”, badge: “⚡” },
{ rank: 4, name: “BlockSniper”, handle: “@BlockSniper”, avatar: “🎯”, followers: “67K”, earnings: “12,400”, raids: 741, tier: “Pro”, badge: “🎯” },
{ rank: 5, name: “NeonWolf”, handle: “@NeonWolf_DeFi”, avatar: “🐉”, followers: “43K”, earnings: “8,900”, raids: 612, tier: “Rising”, badge: “💎” },
{ rank: 6, name: “SatoshiGhost”, handle: “@SatoshiGhost”, avatar: “👻”, followers: “38K”, earnings: “7,100”, raids: 534, tier: “Rising”, badge: “🚀” },
{ rank: 7, name: “DeFiPhantom”, handle: “@DeFiPhantom”, avatar: “⚡”, followers: “29K”, earnings: “5,600”, raids: 478, tier: “Rising”, badge: “💫” },
{ rank: 8, name: “TokenStorm”, handle: “@TokenStorm_”, avatar: “🌪️”, followers: “21K”, earnings: “4,200”, raids: 391, tier: “Starter”, badge: “🌟” },
];

const MOCK_RAIDS = [
{ project: “NOVA Token”, task: “Quote tweet with $NOVA”, status: “completed”, earned: “45 PAX”, time: “2h ago” },
{ project: “PepeChain”, task: “Reply engagement thread”, status: “completed”, earned: “28 PAX”, time: “5h ago” },
{ project: “MoonFi”, task: “Original post with artwork”, status: “pending”, earned: “60 PAX”, time: “Active” },
{ project: “AstroDAO”, task: “Twitter Space participation”, status: “pending”, earned: “120 PAX”, time: “Active” },
];

// ─── Brand tokens ───────────────────────────────────────────────────────────
const C = {
cyan: “#00E0FF”,
cyanDim: “rgba(0,224,255,0.10)”,
cyanGlow: “rgba(0,224,255,0.25)”,
cyanBorder: “rgba(0,224,255,0.3)”,
bg: “#050505”,
bg2: “#0c0c0e”,
border: “rgba(255,255,255,0.06)”,
text: “#ffffff”,
text2: “rgba(255,255,255,0.55)”,
text3: “rgba(255,255,255,0.25)”,
green: “#4ade80”,
purple: “#a78bfa”,
};

const btnPrimary = {
background: `linear-gradient(135deg, ${C.cyan}, #0090cc)`,
border: “none”,
color: “#050505”,
fontFamily: “‘Inter’, sans-serif”,
fontWeight: 800,
letterSpacing: “0.10em”,
fontSize: “0.85rem”,
cursor: “pointer”,
clipPath: “polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)”,
transition: “opacity 0.2s, filter 0.2s”,
};

const btnGhost = {
background: “transparent”,
border: `1px solid ${C.cyanBorder}`,
color: C.cyan,
fontFamily: “‘Inter’, sans-serif”,
fontWeight: 700,
letterSpacing: “0.10em”,
fontSize: “0.85rem”,
cursor: “pointer”,
clipPath: “polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)”,
};

const labelStyle = {
fontFamily: “‘Space Mono’, monospace”,
letterSpacing: “0.15em”,
fontSize: “0.7rem”,
color: C.text3,
textTransform: “uppercase”,
marginBottom: “0.5rem”,
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ view, setView, wallet, profile, onConnectClick, onDisconnect }) {
const [scrolled, setScrolled]     = useState(false);
const [dashOpen, setDashOpen]     = useState(false);
const [menuOpen, setMenuOpen]     = useState(false);
const dashRef  = useRef(null);
const isMobile = useIsMobile();

useEffect(() => {
const handler = () => setScrolled(window.scrollY > 20);
window.addEventListener(“scroll”, handler);
return () => window.removeEventListener(“scroll”, handler);
}, []);

useEffect(() => {
const handler = (e) => { if (dashRef.current && !dashRef.current.contains(e.target)) setDashOpen(false); };
document.addEventListener(“mousedown”, handler);
return () => document.removeEventListener(“mousedown”, handler);
}, []);

// Close mobile menu on view change
useEffect(() => { setMenuOpen(false); setDashOpen(false); }, [view]);

const isDashView = view === “raider” || view === “dev”;
const navLinks = [[“home”,“HOME”],[“tiers”,“TIERS”],[“promote”,“PROMOTE”],[“leaderboard”,“LEADERBOARD”]];

return (
<>
<nav style={{
position: “fixed”, top: 0, left: 0, right: 0, zIndex: 1000,
background: scrolled || menuOpen ? “rgba(5,5,5,0.97)” : “transparent”,
backdropFilter: scrolled || menuOpen ? “blur(20px)” : “none”,
borderBottom: scrolled || menuOpen ? `1px solid ${C.cyanBorder}` : “none”,
transition: “all 0.4s ease”,
padding: isMobile ? “0 1.2rem” : “0 2rem”,
}}>
<div style={{ maxWidth: 1400, margin: “0 auto”, display: “flex”, alignItems: “center”, justifyContent: “space-between”, height: 64 }}>

```
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }} onClick={() => setView("home")}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.2rem" : "1.45rem", letterSpacing: "-0.03em", color: C.text }}>PAX</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: isMobile ? "1.2rem" : "1.45rem", letterSpacing: "-0.02em", color: C.text }}>promote</span>
      </div>

      {/* Desktop nav links */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {navLinks.map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: "transparent", border: "1px solid transparent",
              color: view === v ? C.cyan : C.text2,
              padding: "0.4rem 1rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.75rem",
              cursor: "pointer", borderRadius: 4, transition: "all 0.2s",
            }}>{label}</button>
          ))}

          {/* Dashboard dropdown */}
          <div ref={dashRef} style={{ position: "relative" }}>
            <button onClick={() => setDashOpen(o => !o)} style={{
              background: "transparent", border: "1px solid transparent",
              color: isDashView ? C.cyan : C.text2,
              padding: "0.4rem 1rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.75rem",
              cursor: "pointer", borderRadius: 4, transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              DASHBOARD
              <span style={{ fontSize: "0.55rem", transform: dashOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block", opacity: 0.6 }}>▼</span>
            </button>
            {dashOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                background: "#0c0c0e", border: `1px solid ${C.cyanBorder}`,
                borderRadius: 8, overflow: "hidden", minWidth: 180,
                boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${C.cyanGlow}`,
                animation: "modalIn 0.15s ease",
              }}>
                {[
                  { v: "dev",    label: "Dev Dashboard",    icon: "⬡", desc: "Token launcher view" },
                  { v: "raider", label: "Raider Dashboard", icon: "⚡", desc: "Raider earnings view" },
                ].map(({ v, label, icon, desc }) => (
                  <button key={v} onClick={() => { setView(v); setDashOpen(false); }} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    width: "100%", padding: "13px 16px",
                    background: view === v ? C.cyanDim : "transparent",
                    border: "none", borderLeft: view === v ? `2px solid ${C.cyan}` : "2px solid transparent",
                    cursor: "pointer", textAlign: "left", transition: "background 0.15s",
                  }}>
                    <span style={{ fontSize: "1.1rem", opacity: 0.8 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: view === v ? C.cyan : C.text }}>{label}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: C.text3, marginTop: 1 }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Desktop wallet area */}
        {!isMobile && wallet && (
          <>
            <button onClick={() => setView("profile")} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: view === "profile" ? C.cyanDim : "rgba(255,255,255,0.04)",
              border: `1px solid ${view === "profile" ? C.cyanBorder : C.border}`,
              borderRadius: 6, padding: "5px 10px 5px 6px",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${C.cyanBorder}`, background: "rgba(0,224,255,0.1)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {profile?.avatar ? <img src={profile.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "0.85rem" }}>👤</span>}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: profile?.username ? C.text : C.text3 }}>{profile?.username || "Set up profile"}</div>
                {profile?.xHandle && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: C.cyan }}>@{profile.xHandle}</div>}
              </div>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, borderRadius: 6, padding: "6px 10px", fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: C.cyan }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}`, flexShrink: 0 }} />
              {wallet.slice(0, 6)}…{wallet.slice(-4)}
            </div>
            <button onClick={onDisconnect} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.text3, padding: "6px 10px", borderRadius: 6, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.72rem", cursor: "pointer", letterSpacing: "0.06em" }}>DISCONNECT</button>
          </>
        )}
        {!isMobile && !wallet && (
          <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.5rem 1.4rem", fontSize: "0.8rem" }}>CONNECT WALLET</button>
        )}

        {/* Mobile: avatar OR connect + hamburger */}
        {isMobile && wallet && (
          <button onClick={() => setView("profile")} style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${C.cyanBorder}`, background: "rgba(0,224,255,0.1)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            {profile?.avatar ? <img src={profile.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "1rem" }}>👤</span>}
          </button>
        )}
        {isMobile && !wallet && (
          <button onClick={onConnectClick} style={{ ...btnPrimary, padding: "0.45rem 0.9rem", fontSize: "0.7rem", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}>CONNECT</button>
        )}

        {/* Hamburger button */}
        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6, width: 38, height: 38, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer", flexShrink: 0, padding: 0 }}>
            <span style={{ width: 18, height: 1.5, background: menuOpen ? C.cyan : C.text2, borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
            <span style={{ width: 18, height: 1.5, background: menuOpen ? C.cyan : C.text2, borderRadius: 2, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 18, height: 1.5, background: menuOpen ? C.cyan : C.text2, borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
          </button>
        )}
      </div>
    </div>
  </nav>

  {/* Mobile slide-down menu */}
  {isMobile && menuOpen && (
    <div style={{
      position: "fixed", top: 64, left: 0, right: 0, zIndex: 999,
      background: "rgba(5,5,5,0.98)", backdropFilter: "blur(20px)",
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
            fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.85rem",
            cursor: "pointer",
          }}>{label}</button>
        ))}
        {/* Dashboard section */}
        <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: C.text3, letterSpacing: "0.15em", padding: "0 1rem", marginBottom: 6 }}>DASHBOARD</div>
          {[{ v: "dev", label: "Dev Dashboard", icon: "⬡" }, { v: "raider", label: "Raider Dashboard", icon: "⚡" }].map(({ v, label, icon }) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? C.cyanDim : "transparent",
              border: view === v ? `1px solid ${C.cyanBorder}` : "1px solid transparent",
              color: view === v ? C.cyan : C.text2,
              padding: "0.75rem 1rem", borderRadius: 8, textAlign: "left", width: "100%",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.85rem",
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
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text }}>{profile?.username || "Connected"}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: C.cyan }}>{wallet.slice(0,8)}…{wallet.slice(-6)}</div>
            </div>
          </div>
          <button onClick={onDisconnect} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.text3, padding: "0.7rem", borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.06em" }}>DISCONNECT WALLET</button>
        </div>
      ) : (
        <button onClick={onConnectClick} style={{ ...btnPrimary, width: "100%", padding: "0.85rem", marginTop: 8 }}>CONNECT WALLET</button>
      )}
    </div>
  )}
</>
```

);
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ setView, onConnectClick }) {
const [count, setCount] = useState(0);
const isMobile = useIsMobile();
useEffect(() => {
const timer = setInterval(() => setCount(c => c < 12847 ? c + Math.floor(Math.random() * 150) : 12847), 30);
return () => clearInterval(timer);
}, []);

return (
<section style={{
minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”,
position: “relative”, overflow: “hidden”, paddingTop: 64,
}}>
{/* Grid background */}
<div style={{
position: “absolute”, inset: 0,
backgroundImage: `linear-gradient(${C.cyanDim} 1px, transparent 1px), linear-gradient(90deg, ${C.cyanDim} 1px, transparent 1px)`,
backgroundSize: “60px 60px”, opacity: 0.5,
}} />
<div style={{ position: “absolute”, top: “40%”, left: “50%”, transform: “translate(-50%,-50%)”, width: 900, height: 900, borderRadius: “50%”, background: `radial-gradient(ellipse, rgba(0,224,255,0.07) 0%, transparent 70%)`, pointerEvents: “none” }} />
<div style={{ position: “absolute”, top: 0, right: “20%”, width: 1, height: “100%”, background: `linear-gradient(180deg, transparent, ${C.cyanGlow}, transparent)`, transform: “rotate(15deg)”, transformOrigin: “top” }} />

```
  <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: isMobile ? "0 1.2rem" : "0 2rem", width: "100%" }}>

    {/* Live badge */}
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.6rem",
      background: C.cyanDim, border: `1px solid ${C.cyanBorder}`,
      borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "1.5rem",
      fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "0.6rem" : "0.7rem",
      letterSpacing: "0.1em", color: C.cyan,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite", flexShrink: 0 }} />
      {isMobile ? `${count.toLocaleString()} PAX DISTRIBUTED` : `RAID FORCE ACTIVE · ${count.toLocaleString()} PAX DISTRIBUTED`}
    </div>

    <h1 style={{
      fontFamily: "'Inter', sans-serif", fontWeight: 800,
      fontSize: isMobile ? "clamp(3rem, 18vw, 5rem)" : "clamp(4rem, 11vw, 8.5rem)",
      lineHeight: 0.92, letterSpacing: "-0.04em", color: C.text, margin: 0,
    }}>
      LAUNCH.<br />
      <span style={{ color: C.cyan, textShadow: `0 0 60px ${C.cyanGlow}` }}>RAID.</span><br />
      DOMINATE.
    </h1>

    <p style={{
      fontFamily: "'Inter', sans-serif", fontWeight: 300,
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
      {[["2,847","Active Raiders"],["$4.2M","PAX Distributed"],["847","Tokens Promoted"],["98.3%","Campaign Success"]].map(([num, label]) => (
        <div key={label} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "1.4rem" : "2rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{num}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: C.text3, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

);
}

// ─── Token Card ───────────────────────────────────────────────────────────────
function TokenCard({ token, onPromote }) {
const [hovered, setHovered] = useState(false);
const isUp = token.change >= 0;

return (
<div
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
style={{
minWidth: 200, maxWidth: 200,
background: hovered ? “rgba(0,224,255,0.05)” : “#0c0c0e”,
border: `1px solid ${hovered ? C.cyanBorder : C.border}`,
borderRadius: 10, padding: “16px”,
cursor: “pointer”, flexShrink: 0,
transition: “all 0.2s”,
transform: hovered ? “translateY(-4px)” : “translateY(0)”,
boxShadow: hovered ? `0 8px 24px rgba(0,0,0,0.4), 0 0 16px ${C.cyanGlow}` : “none”,
position: “relative”, overflow: “hidden”,
}}>

```
  {/* Token image / logo */}
  <div style={{
    width: "100%", height: 120, borderRadius: 8,
    background: token.image
      ? "transparent"
      : `linear-gradient(135deg, ${token.color || "rgba(0,224,255,0.15)"}, rgba(5,5,5,0.8))`,
    marginBottom: 12, overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: `1px solid ${C.border}`,
  }}>
    {token.image
      ? <img src={token.image} alt={token.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      : <span style={{ fontSize: "3rem" }}>{token.emoji || "🪙"}</span>
    }
  </div>

  {/* Name + ticker */}
  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.01em", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
    {token.name}
  </div>
  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: C.cyan, marginBottom: 10 }}>
    {token.ticker}
  </div>

  {/* Price + change */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", color: C.text2 }}>
      {token.price || "—"}
    </div>
    <div style={{
      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.72rem",
      color: isUp ? C.green : "#ff4060",
      background: isUp ? "rgba(0,240,160,0.1)" : "rgba(255,64,96,0.1)",
      padding: "2px 7px", borderRadius: 20,
    }}>
      {isUp ? "+" : ""}{token.change?.toFixed(1)}%
    </div>
  </div>

  {/* Promote button on hover */}
  {hovered && (
    <button
      onClick={(e) => { e.stopPropagation(); onPromote(token); }}
      style={{
        width: "100%", ...btnPrimary, padding: "0.5rem",
        fontSize: "0.72rem", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
        animation: "modalIn 0.15s ease",
      }}>
      PROMOTE TOKEN
    </button>
  )}
</div>
```

);
}

// ─── Token Row (Netflix-style) ────────────────────────────────────────────────
function TokenRow({ title, badge, badgeColor, tokens, loading, error, onPromote }) {
const rowRef = useRef(null);

const scroll = (dir) => {
if (rowRef.current) rowRef.current.scrollBy({ left: dir * 440, behavior: “smooth” });
};

return (
<div style={{ marginBottom: “3rem” }}>
{/* Row header */}
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: “1.2rem”, padding: “0 2rem” }}>
<h3 style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “1.3rem”, letterSpacing: “-0.03em”, margin: 0 }}>
{title}
</h3>
{badge && (
<span style={{
fontFamily: “‘Space Mono’, monospace”, fontSize: “0.6rem”, letterSpacing: “0.12em”,
padding: “3px 10px”, borderRadius: 20,
background: `${badgeColor}22`, color: badgeColor,
border: `1px solid ${badgeColor}44`,
}}>{badge}</span>
)}
<div style={{ marginLeft: “auto”, display: “flex”, gap: 6 }}>
{[“←”, “→”].map((arrow, i) => (
<button key={arrow} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
background: “rgba(255,255,255,0.06)”, border: `1px solid ${C.border}`,
color: C.text2, width: 30, height: 30, borderRadius: “50%”,
fontFamily: “‘Inter’, sans-serif”, fontSize: “0.85rem”,
cursor: “pointer”, display: “flex”, alignItems: “center”, justifyContent: “center”,
transition: “all 0.15s”,
}}>{arrow}</button>
))}
</div>
</div>

```
  {/* Scroll track */}
  <div style={{ position: "relative" }}>
    {/* Fade edges */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(90deg, #050505, transparent)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(270deg, #050505, transparent)", pointerEvents: "none" }} />

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
          minWidth: 200, height: 220, borderRadius: 10,
          background: "linear-gradient(90deg, #0c0c0e 25%, #141416 50%, #0c0c0e 75%)",
          flexShrink: 0, border: `1px solid ${C.border}`,
          animation: "pulse 1.5s ease infinite",
        }} />
      ))}

      {error && (
        <div style={{ fontFamily: "'Inter', sans-serif", color: C.text3, fontSize: "0.85rem", padding: "2rem" }}>
          Could not load tokens — {error}
        </div>
      )}

      {!loading && !error && tokens.map((token, i) => (
        <TokenCard key={token.address || i} token={token} onPromote={onPromote} />
      ))}
    </div>
  </div>
</div>
```

);
}

// ─── Mock promoted tokens (manually curated) ─────────────────────────────────
const PROMOTED_TOKENS = [
{ name: “NOVA Token”,   ticker: “$NOVA”,  change: 24.1, price: “0.00042 PAX”, emoji: “⭐”, color: “rgba(251,191,36,0.2)”,  promoted: true },
{ name: “AstroDAO”,     ticker: “$ASTRO”, change: 8.7,  price: “0.00018 PAX”, emoji: “🚀”, color: “rgba(0,224,255,0.15)”,  promoted: true },
{ name: “MoonFi”,       ticker: “$MOON”,  change: -2.4, price: “0.00009 PAX”, emoji: “🌕”, color: “rgba(167,139,250,0.2)”, promoted: true },
{ name: “PaxDragon”,    ticker: “$DRAGO”, change: 55.2, price: “0.00130 PAX”, emoji: “🐉”, color: “rgba(239,68,68,0.2)”,   promoted: true },
{ name: “SolarPax”,     ticker: “$SOL”,   change: 12.0, price: “0.00077 PAX”, emoji: “☀️”, color: “rgba(251,146,60,0.2)”,  promoted: true },
{ name: “VaultX”,       ticker: “$VX”,    change: -5.1, price: “0.00033 PAX”, emoji: “🔐”, color: “rgba(74,222,128,0.15)”, promoted: true },
{ name: “StealthNode”,  ticker: “$STN”,   change: 31.8, price: “0.00061 PAX”, emoji: “👁️”, color: “rgba(0,224,255,0.1)”,   promoted: true },
{ name: “PaxRocket”,    ticker: “$PRKX”,  change: 18.5, price: “0.00022 PAX”, emoji: “🛸”, color: “rgba(167,139,250,0.15)”, promoted: true },
];

// ─── Token Sections (fetches from Paxeer Launchpad API) ───────────────────────
function useTokens(endpoint) {
const [tokens, setTokens] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError]   = useState(null);

useEffect(() => {
setLoading(true);
setError(null);
fetch(endpoint, { headers: { “Accept”: “application/json” } })
.then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
.then(data => {
// Normalise Paxeer Launchpad API response
const list = Array.isArray(data) ? data : data.data || data.tokens || data.markets || data.result || [];
const normalised = list.slice(0, 24).map(t => ({
name:    t.name        || t.tokenName   || t.token_name  || “Unknown”,
ticker:  t.symbol      || t.ticker      || t.tokenSymbol || “???”,
price:   t.price != null
? `${parseFloat(t.price).toFixed(6)} PAX`
: t.priceUsd != null
? `$${parseFloat(t.priceUsd).toFixed(6)}`
: “—”,
change:  parseFloat(t.priceChange24h ?? t.price_change_24h ?? t.change ?? t.priceChange ?? 0),
image:   t.image       || t.logo        || t.imageUrl    || t.logoUrl || null,
address: t.address     || t.contract    || t.tokenAddress || t.id,
emoji:   “🪙”,
color:   “rgba(0,224,255,0.12)”,
}));
setTokens(normalised);
setLoading(false);
})
.catch(err => {
setError(err.message);
setLoading(false);
});
}, [endpoint]);

return { tokens, loading, error };
}

function TokenSections({ setView }) {
// Paxeer Launchpad REST API endpoints
const BASE             = “https://launchpad.paxeer.app”;
const PAXEER_NEW       = `${BASE}/api/v1/markets/new`;
const PAXEER_HOT       = `${BASE}/api/v1/markets/hot`;
const PAXEER_GAINERS   = `${BASE}/api/v1/markets/gainers`;

const newTokens      = useTokens(PAXEER_NEW);
const hotTokens      = useTokens(PAXEER_HOT);
const gainerTokens   = useTokens(PAXEER_GAINERS);

const handlePromote = () => setView(“promote”);

return (
<div style={{ background: “#050505”, paddingTop: “4rem”, paddingBottom: “2rem” }}>
<div style={{ maxWidth: 1600, margin: “0 auto” }}>

```
    {/* Section header */}
    <div style={{ padding: "0 2rem", marginBottom: "3rem", textAlign: "center" }}>
      <div style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em", color: C.cyan, fontSize: "0.65rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>Live on Paxfun</div>
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.04em", margin: 0 }}>
        EXPLORE <span style={{ color: C.cyan }}>TOKENS</span>
      </h2>
    </div>

    {/* Promoted */}
    <TokenRow
      title="🔥 Promoted Tokens"
      badge="SPONSORED"
      badgeColor={C.cyan}
      tokens={PROMOTED_TOKENS}
      loading={false}
      error={null}
      onPromote={handlePromote}
    />

    {/* New Tokens */}
    <TokenRow
      title="✨ New Tokens"
      badge="JUST LAUNCHED"
      badgeColor={C.green}
      tokens={newTokens.tokens}
      loading={newTokens.loading}
      error={newTokens.error}
      onPromote={handlePromote}
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
    />

    {/* Top Gainers */}
    <TokenRow
      title="📈 Top Gainers"
      badge="24H GAINERS"
      badgeColor={C.green}
      tokens={gainerTokens.tokens}
      loading={gainerTokens.loading}
      error={gainerTokens.error}
      onPromote={handlePromote}
    />

  </div>
</div>
```

);
}

// ─── Tiers ────────────────────────────────────────────────────────────────────
function TiersPage({ setView }) {
const [selected, setSelected] = useState(null);
const isMobile = useIsMobile();
return (
<div style={{ minHeight: “100vh”, paddingTop: isMobile ? 90 : 120, paddingBottom: 80 }}>
<div style={{ textAlign: “center”, marginBottom: isMobile ? “2.5rem” : “4rem”, padding: “0 1.2rem” }}>
<div style={{ fontFamily: “‘Space Mono’, monospace”, letterSpacing: “0.2em”, color: C.cyan, fontSize: “0.7rem”, marginBottom: “1rem”, textTransform: “uppercase” }}>Select Your Campaign Tier</div>
<h2 style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “clamp(2.2rem, 8vw, 5rem)”, color: C.text, margin: 0, letterSpacing: “-0.04em” }}>
CHOOSE YOUR <span style={{ color: C.cyan }}>FIREPOWER</span>
</h2>
<p style={{ color: C.text2, fontFamily: “‘Inter’, sans-serif”, marginTop: “1rem”, fontSize: “0.85rem” }}>All payments in PAX token · Instant deployment after confirmation</p>
</div>

```
  <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 1.2rem" : "0 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
    {TIERS.map((tier) => (
      <div key={tier.id} onClick={() => { setSelected(tier.id); setView("promote"); }}
        style={{
          background: tier.featured ? `linear-gradient(180deg, rgba(0,224,255,0.06) 0%, rgba(5,5,5,0.95) 100%)` : "rgba(255,255,255,0.02)",
          border: `1px solid ${tier.featured ? C.cyan : C.border}`,
          borderRadius: 4, padding: isMobile ? "1.8rem 1.5rem" : "2.5rem 2rem", cursor: "pointer", position: "relative",
          transition: "all 0.3s ease",
          boxShadow: tier.featured ? `0 0 40px ${C.cyanGlow}` : "none",
          transform: !isMobile && tier.featured ? "translateY(-8px)" : "none",
        }}>
        {tier.featured && (
          <div style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            background: `linear-gradient(135deg, ${C.cyan}, #0090cc)`,
            color: "#050505", fontFamily: "'Inter', sans-serif",
            fontWeight: 800, letterSpacing: "0.15em", fontSize: "0.65rem",
            padding: "0.25rem 1rem",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            whiteSpace: "nowrap",
          }}>MOST POPULAR</div>
        )}

        <div style={{ display: "flex", alignItems: isMobile ? "center" : "flex-start", justifyContent: "space-between", gap: 12, marginBottom: isMobile ? "1rem" : 0 }}>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: isMobile ? "0.5rem" : "1rem" }}>{tier.icon}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.2rem" : "1.4rem", color: tier.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{tier.name}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: C.text2, marginTop: "0.3rem" }}>{tier.tagline}</div>
          </div>
          {isMobile && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", color: C.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{tier.price}</div>
              <div style={{ color: C.cyan, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.75rem" }}>PAX</div>
            </div>
          )}
        </div>

        {!isMobile && (
          <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.8rem", color: C.text, letterSpacing: "-0.04em" }}>{tier.price}</span>
            <span style={{ color: C.cyan, fontFamily: "'Inter', sans-serif", fontWeight: 700, marginLeft: "0.4rem" }}>PAX</span>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem", marginTop: isMobile ? "0.75rem" : 0 }}>
          {tier.features.map(f => (
            <div key={f} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: tier.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "0.6rem", color: "#050505", fontWeight: 900 }}>✓</span>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: C.text2 }}>{f}</span>
            </div>
          ))}
        </div>

        <button style={{
          width: "100%",
          background: tier.featured ? `linear-gradient(135deg, ${C.cyan}, #0090cc)` : "transparent",
          border: `1px solid ${tier.color}`,
          color: tier.featured ? "#050505" : tier.color,
          padding: "0.85rem",
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          letterSpacing: "0.12em", fontSize: "0.85rem", cursor: "pointer",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}>DEPLOY CAMPAIGN</button>
      </div>
    ))}
  </div>
</div>
```

);
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────
function Leaderboard() {
const isMobile = useIsMobile();
return (
<div style={{ minHeight: “100vh”, paddingTop: isMobile ? 90 : 120, paddingBottom: 80 }}>
<div style={{ maxWidth: 900, margin: “0 auto”, padding: isMobile ? “0 1.2rem” : “0 2rem” }}>
<div style={{ textAlign: “center”, marginBottom: “3rem” }}>
<div style={{ fontFamily: “‘Space Mono’, monospace”, letterSpacing: “0.2em”, color: C.cyan, fontSize: “0.7rem”, marginBottom: “1rem”, textTransform: “uppercase” }}>Season 3 · Live Rankings</div>
<h2 style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “clamp(2.2rem, 8vw, 4.5rem)”, color: C.text, margin: 0, letterSpacing: “-0.04em” }}>
RAID <span style={{ color: C.cyan }}>LEADERBOARD</span>
</h2>
</div>

```
    {/* Top 3 podium */}
    <div style={{ display: "flex", gap: isMobile ? "0.5rem" : "1rem", marginBottom: "2rem", alignItems: "flex-end", justifyContent: "center" }}>
      {[MOCK_RAIDERS[1], MOCK_RAIDERS[0], MOCK_RAIDERS[2]].map((r, i) => {
        const heights = [isMobile ? "100px" : "140px", isMobile ? "130px" : "180px", isMobile ? "80px" : "120px"];
        const labels = ["2nd", "1st", "3rd"];
        const colors = [C.purple, C.cyan, C.green];
        return (
          <div key={r.rank} style={{ flex: 1, maxWidth: isMobile ? 120 : 220, textAlign: "center" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? "1.5rem" : "2rem" }}>{r.avatar}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: C.text, fontSize: isMobile ? "0.75rem" : "0.95rem" }}>{r.name}</div>
            <div style={{ color: C.text3, fontSize: "0.65rem", marginBottom: "0.5rem" }}>{r.handle}</div>
            <div style={{
              height: heights[i], background: `linear-gradient(180deg, ${colors[i]}22, ${colors[i]}08)`,
              border: `1px solid ${colors[i]}`, borderBottom: "none",
              display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "0.75rem",
            }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "1.2rem" : "1.6rem", fontWeight: 700, color: colors[i] }}>{labels[i]}</span>
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
            background: i < 3 ? C.cyanDim : "#0c0c0e",
            border: `1px solid ${i < 3 ? C.cyanBorder : C.border}`,
            borderRadius: 8, padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: i < 3 ? C.cyan : C.text3, width: 32, flexShrink: 0 }}>#{r.rank}</div>
            <span style={{ fontSize: "1.4rem" }}>{r.avatar}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: C.text, fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name} {r.badge}</div>
              <div style={{ color: C.text3, fontSize: "0.7rem" }}>{r.handle}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", color: C.green, fontWeight: 600, fontSize: "0.8rem" }}>{r.earnings} PAX</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: r.tier === "Elite" ? C.cyan : r.tier === "Pro" ? C.purple : C.green, marginTop: 2 }}>{r.tier.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 100px 80px", padding: "0.75rem 1.5rem", borderBottom: `1px solid ${C.border}`, background: C.cyanDim }}>
          {["#", "RAIDER", "FOLLOWERS", "RAIDS", "EARNED", "TIER"].map(h => (
            <div key={h} style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", fontSize: "0.65rem", color: C.text3 }}>{h}</div>
          ))}
        </div>
        {MOCK_RAIDERS.map((r, i) => (
          <div key={r.rank} style={{
            display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 100px 80px",
            padding: "1rem 1.5rem", borderBottom: `1px solid ${C.border}`,
            background: i < 3 ? C.cyanDim : "transparent", alignItems: "center",
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.2rem", fontWeight: 700, color: i < 3 ? C.cyan : C.text3 }}>#{r.rank}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{r.avatar}</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: C.text, fontSize: "0.95rem" }}>{r.name} <span>{r.badge}</span></div>
                <div style={{ color: C.text3, fontSize: "0.75rem" }}>{r.handle}</div>
              </div>
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", color: C.cyan, fontWeight: 600, fontSize: "0.85rem" }}>{r.followers}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", color: C.text2, fontSize: "0.85rem" }}>{r.raids}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", color: C.green, fontWeight: 600, fontSize: "0.85rem" }}>{r.earnings} PAX</div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em",
              color: r.tier === "Elite" ? C.cyan : r.tier === "Pro" ? C.purple : r.tier === "Rising" ? C.green : C.text3,
              border: `1px solid ${r.tier === "Elite" ? C.cyanBorder : r.tier === "Pro" ? "rgba(167,139,250,0.4)" : r.tier === "Rising" ? "rgba(74,222,128,0.4)" : C.border}`,
              padding: "0.15rem 0.5rem", borderRadius: 3,
            }}>{r.tier.toUpperCase()}</div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
```

);
}

// ─── Raider Dashboard ─────────────────────────────────────────────────────────
function RaiderDashboard({ wallet, onConnectClick }) {
const [tab, setTab] = useState(“overview”);
const isMobile = useIsMobile();
const mockRaider = MOCK_RAIDERS[0];

if (!wallet) return (
<div style={{ minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, paddingTop: 72 }}>
<div style={{ textAlign: “center”, maxWidth: 420, padding: “0 2rem” }}>
<div style={{ fontSize: “3rem”, marginBottom: “1.5rem” }}>🔒</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “1.8rem”, letterSpacing: “-0.03em”, marginBottom: “0.75rem” }}>
Connect to access your <span style={{ color: C.cyan }}>Raider Dashboard</span>
</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, color: C.text2, fontSize: “0.9rem”, lineHeight: 1.7, marginBottom: “2rem” }}>
Connect your wallet via WalletConnect to sign in and view your raids, earnings, and profile.
</div>
<button onClick={onConnectClick} style={{ …btnPrimary, padding: “0.9rem 2.5rem”, fontSize: “0.95rem” }}>
CONNECT WALLET
</button>
</div>
</div>
);

return (
<div style={{ minHeight: “100vh”, paddingTop: isMobile ? 90 : 100, paddingBottom: 80 }}>
<div style={{ maxWidth: 1200, margin: “0 auto”, padding: isMobile ? “0 1.2rem” : “0 2rem” }}>

```
    {/* Profile Header */}
    <div style={{
      background: `linear-gradient(135deg, rgba(0,224,255,0.07), rgba(0,144,204,0.04))`,
      border: `1px solid ${C.cyanBorder}`, borderRadius: 4, padding: isMobile ? "1.25rem" : "2rem",
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
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.3rem" : "1.8rem", color: C.text, letterSpacing: "-0.03em" }}>
            {mockRaider.name} <span style={{ color: C.cyan }}>{mockRaider.badge}</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.4rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", color: C.text2, fontSize: "0.85rem" }}>{mockRaider.handle}</span>
            <span style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, color: C.cyan, padding: "0.1rem 0.6rem", fontSize: "0.65rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", borderRadius: 2 }}>X LINKED ✓</span>
            <span style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, color: C.cyan, padding: "0.1rem 0.6rem", fontSize: "0.65rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", borderRadius: 2 }}>ELITE TIER</span>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)", gap: isMobile ? "0.75rem 1.5rem" : "2rem", width: isMobile ? "100%" : "auto", marginLeft: isMobile ? 0 : "auto" }}>
        {[["42,800 PAX", "Total Earned"], ["1,847", "Total Raids"], ["#1", "Global Rank"], ["284K", "X Followers"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: isMobile ? "left" : "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{v}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", color: C.text3, marginTop: 3, textTransform: "uppercase" }}>{l}</div>
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
          padding: "0.5rem 0.9rem", fontFamily: "'Inter', sans-serif",
          fontWeight: 700, letterSpacing: "0.06em", fontSize: "0.72rem", cursor: "pointer",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>{l}</button>
      ))}
    </div>

    {tab === "overview" && (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
        {/* Active campaigns */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "1.5rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: C.text, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            ACTIVE <span style={{ color: C.cyan }}>CAMPAIGNS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {MOCK_RAIDS.map((raid, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`,
                borderRadius: 3, padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: C.text, fontSize: "0.9rem" }}>{raid.project}</div>
                  <div style={{ color: C.text3, fontSize: "0.78rem", marginTop: 2 }}>{raid.task}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", color: C.green, fontWeight: 600, fontSize: "0.85rem" }}>{raid.earned}</div>
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
          <div style={{ background: `linear-gradient(135deg, rgba(0,224,255,0.07), rgba(5,5,5,0.5))`, border: `1px solid ${C.cyanBorder}`, borderRadius: 4, padding: "1.5rem" }}>
            <div style={{ ...labelStyle, marginBottom: "0.5rem" }}>Available Balance</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.8rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>3,840 PAX</div>
            <div style={{ color: C.text3, fontSize: "0.8rem", marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }}>≈ $192.00 USD</div>
            <button style={{
              width: "100%",
              background: `linear-gradient(135deg, ${C.cyan}, #0090cc)`,
              border: "none", color: "#050505", padding: "0.85rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 800,
              letterSpacing: "0.12em", fontSize: "0.85rem", cursor: "pointer",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}>CASH OUT TO WALLET</button>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "1.5rem" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1rem", color: C.text, marginBottom: "1rem", letterSpacing: "-0.02em" }}>EARNINGS MULTIPLIER</div>
            {[["Follower Bonus", "284K followers", "+2.8x"], ["Raid Streak", "47 days active", "+1.5x"], ["Elite Tier", "Top 10 rank", "+2.0x"]].map(([label, sub, mult]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: C.text2, fontSize: "0.85rem" }}>{label}</div>
                  <div style={{ color: C.text3, fontSize: "0.73rem", fontFamily: "'Inter', sans-serif" }}>{sub}</div>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", color: C.cyan, fontSize: "1.2rem", fontWeight: 700 }}>{mult}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {tab === "profile" && (
      <div style={{ maxWidth: 600 }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <div style={labelStyle}>Profile Photo</div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.cyanDim, border: `2px solid ${C.cyanBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>🦅</div>
              <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.5rem 1rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.8rem", cursor: "pointer", borderRadius: 3 }}>UPLOAD PHOTO</button>
            </div>
          </div>

          {[["DISPLAY NAME", "CryptoViper"], ["BIO", "Elite raider · Crypto OG · Building on Paxfun"], ["WALLET ADDRESS", "0x1234...5678"]].map(([label, val]) => (
            <div key={label}>
              <div style={labelStyle}>{label}</div>
              <input defaultValue={val} style={{
                width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`,
                color: C.text, padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                borderRadius: 3, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }} onFocus={e => e.target.style.borderColor = C.cyanBorder}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
          ))}

          <div style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, borderRadius: 3, padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: C.cyan, fontSize: "0.9rem" }}>X (TWITTER) ACCOUNT</div>
              <div style={{ color: C.text3, fontSize: "0.8rem", fontFamily: "'Inter', sans-serif", marginTop: 3 }}>@CryptoViper_X · 284K followers · Connected</div>
            </div>
            <button style={{ background: C.cyan, border: "none", color: "#050505", padding: "0.4rem 1rem", fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.08em", cursor: "pointer", borderRadius: 3 }}>LINKED ✓</button>
          </div>

          <button style={{
            ...btnPrimary,
            padding: "0.85rem",
            width: "100%",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}>SAVE CHANGES</button>
        </div>
      </div>
    )}
  </div>
</div>
```

);
}

// ─── Promote ──────────────────────────────────────────────────────────────────
function PromotePage({ wallet, onConnectClick }) {
const [step, setStep] = useState(1);
const [selectedTier, setSelectedTier] = useState(null);
const [form, setForm] = useState({ tokenName: “”, contractAddress: “”, xHandle: “”, description: “”, launchpadUrl: “” });
const isMobile = useIsMobile();

const inputStyle = {
width: “100%”, background: “rgba(255,255,255,0.03)”, border: `1px solid ${C.border}`,
color: C.text, padding: “0.75rem 1rem”, fontFamily: “‘Inter’, sans-serif”, fontSize: “0.9rem”,
borderRadius: 3, outline: “none”, boxSizing: “border-box”,
};

return (
<div style={{ minHeight: “100vh”, paddingTop: isMobile ? 90 : 120, paddingBottom: 80 }}>
<div style={{ maxWidth: 800, margin: “0 auto”, padding: isMobile ? “0 1.2rem” : “0 2rem” }}>
<div style={{ textAlign: “center”, marginBottom: isMobile ? “2rem” : “3rem” }}>
<div style={{ fontFamily: “‘Space Mono’, monospace”, letterSpacing: “0.15em”, color: C.cyan, fontSize: “0.7rem”, marginBottom: “1rem”, textTransform: “uppercase” }}>Token Campaign Setup</div>
<h2 style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “clamp(2rem, 6vw, 4rem)”, color: C.text, margin: 0, letterSpacing: “-0.04em” }}>
LAUNCH YOUR <span style={{ color: C.cyan }}>RAID CAMPAIGN</span>
</h2>
</div>

```
    {/* Steps */}
    <div style={{ display: "flex", gap: isMobile ? "0.25rem" : "0.5rem", alignItems: "center", marginBottom: isMobile ? "2rem" : "3rem", justifyContent: "center" }}>
      {[["01", isMobile ? "Tier" : "Select Tier"], ["02", isMobile ? "Token" : "Token Info"], ["03", isMobile ? "Deploy" : "Pay & Deploy"]].map(([num, label], i) => (
        <div key={num} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", opacity: step === i + 1 ? 1 : 0.4 }}
            onClick={() => step > i + 1 && setStep(i + 1)}>
            <div style={{
              width: 28, height: 28, borderRadius: 3,
              background: step >= i + 1 ? C.cyan : "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.7rem",
              color: step >= i + 1 ? "#050505" : C.text3,
              boxShadow: step >= i + 1 ? `0 0 12px ${C.cyanGlow}` : "none",
            }}>{num}</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.06em", fontSize: "0.8rem", color: step === i + 1 ? C.text : C.text3 }}>{label}</span>
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
              background: selectedTier?.id === tier.id ? C.cyanDim : "rgba(255,255,255,0.02)",
              border: `1px solid ${selectedTier?.id === tier.id ? C.cyan : C.border}`,
              borderRadius: 4, padding: "1.5rem", cursor: "pointer",
              boxShadow: selectedTier?.id === tier.id ? `0 0 20px ${C.cyanGlow}` : "none",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{tier.icon}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: tier.color, letterSpacing: "-0.02em" }}>{tier.name}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: C.text, letterSpacing: "-0.04em" }}>{tier.price}</div>
                  <div style={{ color: C.cyan, fontSize: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>PAX</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => selectedTier && setStep(2)} style={{
          width: "100%",
          background: selectedTier ? `linear-gradient(135deg, ${C.cyan}, #0090cc)` : "rgba(255,255,255,0.05)",
          border: "none", color: selectedTier ? "#050505" : C.text3, padding: "1rem",
          fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: "0.12em",
          fontSize: "0.95rem", cursor: selectedTier ? "pointer" : "not-allowed",
          clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
        }}>CONTINUE TO TOKEN INFO →</button>
      </div>
    )}

    {step === 2 && (
      <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 4, padding: isMobile ? "1.25rem" : "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
            border: `2px dashed ${C.cyanBorder}`, borderRadius: 4, padding: "2rem",
            textAlign: "center", cursor: "pointer", color: C.text3,
            fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em", fontSize: "0.85rem",
            transition: "background 0.2s",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖼️</div>
            DRAG & DROP OR CLICK TO UPLOAD<br />
            <span style={{ fontSize: "0.75rem", color: C.text3 }}>PNG, JPG, GIF · Max 10MB</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.85rem", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", borderRadius: 3 }}>← BACK</button>
          <button onClick={() => setStep(3)} style={{
            flex: 2, ...btnPrimary, padding: "0.85rem",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}>CONTINUE TO PAYMENT →</button>
        </div>
      </div>
    )}

    {step === 3 && (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "2rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: C.text, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>ORDER SUMMARY</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ color: C.text2, fontFamily: "'Inter', sans-serif" }}>Campaign Tier</span>
            <span style={{ color: C.text, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>{selectedTier?.name || "In Your Face"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ color: C.text2, fontFamily: "'Inter', sans-serif" }}>Token</span>
            <span style={{ color: C.text, fontFamily: "'Inter', sans-serif" }}>{form.tokenName || "—"}</span>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: C.text2, letterSpacing: "0.08em" }}>TOTAL</span>
            <div>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "2rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{selectedTier?.price || "4,000"}</span>
              <span style={{ color: C.cyan, fontFamily: "'Inter', sans-serif", fontWeight: 700, marginLeft: "0.4rem" }}>PAX</span>
            </div>
          </div>
        </div>

        <div style={{ background: C.cyanDim, border: `1px solid ${C.cyanBorder}`, borderRadius: 4, padding: "2rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1rem", color: C.cyan, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>PAX TOKEN PAYMENT</div>

          {wallet ? (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(0,224,255,0.05)", border: `1px solid ${C.cyanBorder}`,
              borderRadius: 6, padding: "12px 16px", marginBottom: "1rem",
            }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.green }}>WALLET CONNECTED</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", color: C.text2, marginTop: 2 }}>{wallet}</div>
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
                fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.12em",
                fontSize: "0.9rem", cursor: "pointer", borderRadius: 3, marginBottom: "1rem",
              }}>CONNECT WALLET VIA WALLETCONNECT</button>
            </>
          )}

          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.85rem", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", borderRadius: 3 }}>← BACK</button>
            <button disabled={!wallet} style={{
              flex: 2, ...btnPrimary, padding: "0.85rem",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              opacity: wallet ? 1 : 0.4, cursor: wallet ? "pointer" : "not-allowed",
              filter: "none",
            }}>SUBMIT PAYMENT & DEPLOY 🚀</button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
```

);
}

// ─── Dev Dashboard ────────────────────────────────────────────────────────────
const MOCK_CAMPAIGNS = [
{ id: 1, token: “NOVA Token”, ticker: “$NOVA”, tier: “In Your Face”, status: “active”, progress: 68, raiders: 40, reach: “2.4M”, spent: “4,000”, daysLeft: 3, change: “+24.1%” },
{ id: 2, token: “AstroDAO”,   ticker: “$ASTRO”, tier: “Make Some Noise”, status: “active”, progress: 41, raiders: 15, reach: “840K”, spent: “1,500”, daysLeft: 1, change: “+8.7%” },
{ id: 3, token: “MoonFi”,     ticker: “$MOON”,  tier: “Get The Word Out”, status: “completed”, progress: 100, raiders: 5, reach: “310K”, spent: “500”, daysLeft: 0, change: “+5.2%” },
];

function DevDashboard({ wallet, onConnectClick, setView }) {
const [tab, setTab] = useState(“overview”);
const isMobile = useIsMobile();

if (!wallet) return (
<div style={{ minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, paddingTop: 72 }}>
<div style={{ textAlign: “center”, maxWidth: 420, padding: “0 2rem” }}>
<div style={{ fontSize: “3rem”, marginBottom: “1.5rem” }}>🔒</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “1.8rem”, letterSpacing: “-0.03em”, marginBottom: “0.75rem” }}>
Connect to access your <span style={{ color: C.cyan }}>Dev Dashboard</span>
</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, color: C.text2, fontSize: “0.9rem”, lineHeight: 1.7, marginBottom: “2rem” }}>
Connect your wallet to manage your token campaigns, view performance stats, and deploy new raids.
</div>
<button onClick={onConnectClick} style={{ …btnPrimary, padding: “0.9rem 2.5rem”, fontSize: “0.95rem” }}>CONNECT WALLET</button>
</div>
</div>
);

const totalReach   = “3.55M”;
const totalSpent   = “6,000”;
const activeCampaigns = MOCK_CAMPAIGNS.filter(c => c.status === “active”).length;

return (
<div style={{ minHeight: “100vh”, paddingTop: isMobile ? 90 : 100, paddingBottom: 80 }}>
<div style={{ maxWidth: 1200, margin: “0 auto”, padding: isMobile ? “0 1.2rem” : “0 2rem” }}>

```
    {/* Header */}
    <div style={{
      background: `linear-gradient(135deg, rgba(0,224,255,0.07), rgba(0,144,204,0.03))`,
      border: `1px solid ${C.cyanBorder}`, borderRadius: 4, padding: isMobile ? "1.25rem" : "1.75rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem",
    }}>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.3rem" : "1.7rem", letterSpacing: "-0.03em" }}>Dev Dashboard</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: C.text3, marginTop: 4 }}>
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
          background: "#0c0c0e", border: `1px solid ${C.border}`,
          borderRadius: 8, padding: isMobile ? "14px" : "18px 20px",
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500, color: C.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "1.4rem" : "1.9rem", fontWeight: 700, color, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {value}<span style={{ fontSize: "0.8rem", color: C.text2, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>{unit}</span>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: C.text3, marginTop: 6 }}>{sub}</div>
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
          fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em",
          fontSize: "0.75rem", cursor: "pointer",
        }}>{l}</button>
      ))}
    </div>

    {tab === "overview" && (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {MOCK_CAMPAIGNS.map(c => (
          <div key={c.id} style={{
            background: "#0c0c0e",
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
                  fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.72rem", color: C.cyan,
                }}>{c.ticker.replace("$","")}</div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em" }}>{c.token}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: C.text3, marginTop: 2 }}>{c.tier}</div>
                </div>
              </div>                  <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                {[
                  { label: "Raiders", val: c.raiders },
                  { label: "Est. Reach", val: c.reach },
                  { label: "PAX Spent", val: c.spent },
                  { label: "Price Δ", val: c.change, color: C.green },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.9rem", color: color || C.text }}>{val}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: C.text3, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                  </div>
                ))}

                <div style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em",
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
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: C.text3 }}>Campaign progress</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: C.cyan }}>{c.progress}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${c.progress}%`,
                  background: c.progress === 100
                    ? `linear-gradient(90deg, ${C.green}, #22c55e)`
                    : `linear-gradient(90deg, ${C.cyan}, #0090cc)`,
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
        <div style={{ background: "#0c0c0e", border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16, letterSpacing: "-0.01em" }}>
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
              <span key={d} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: C.text3 }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Engagement breakdown */}
        <div style={{ background: "#0c0c0e", border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 20, letterSpacing: "-0.01em" }}>
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
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: C.text2 }}>{label}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color }}>{pct}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, boxShadow: `0 0 6px ${color}55` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top performing raiders for your campaigns */}
        <div style={{ background: "#0c0c0e", border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px", gridColumn: "1 / -1" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16, letterSpacing: "-0.01em" }}>
            Top Raiders on Your Campaigns
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {MOCK_RAIDERS.slice(0,4).map(r => (
              <div key={r.rank} style={{
                background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`,
                borderRadius: 6, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: "1.4rem" }}>{r.avatar}</span>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.83rem" }}>{r.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: C.cyan, marginTop: 2 }}>{r.followers} followers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

  </div>
</div>
```

);
}

// ─── Profile Setup Modal ──────────────────────────────────────────────────────
function ProfileSetupModal({ wallet, onSave, onSkip }) {
const isMobile = useIsMobile();
const [username, setUsername]   = useState(””);
const [xHandle, setXHandle]     = useState(””);
const [avatar, setAvatar]       = useState(null);   // base64 data URL
const [avatarPreview, setAvatarPreview] = useState(null);
const [step, setStep]           = useState(1);       // 1=username, 2=photo, 3=x
const [usernameError, setUsernameError] = useState(””);

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
if (!username.trim()) { setUsernameError(“Username is required”); return; }
if (username.length < 3) { setUsernameError(“Must be at least 3 characters”); return; }
setUsernameError(””);
setStep(2);
} else if (step === 2) {
setStep(3);
}
};

const handleSave = () => {
onSave({
username: username.trim(),
xHandle: xHandle.trim().replace(/^@/, “”),
avatar: avatar || null,
wallet,
createdAt: Date.now(),
});
};

const steps = [“Username”, “Photo”, “Connect X”];

return (
<div style={{
position: “fixed”, inset: 0, zIndex: 2000,
background: “rgba(0,0,0,0.9)”, backdropFilter: “blur(10px)”,
display: “flex”, alignItems: “center”, justifyContent: “center”,
}}>
<div style={{
background: “#0c0c0e”, border: `1px solid ${C.cyanBorder}`,
borderRadius: isMobile ? 0 : 14,
width: isMobile ? “100vw” : 460,
maxHeight: isMobile ? “100vh” : “90vh”,
overflowY: “auto”,
boxShadow: `0 0 80px ${C.cyanGlow}`,
animation: “modalIn 0.25s ease”,
}}>
{/* Header */}
<div style={{ padding: “24px 28px 0” }}>
<div style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “1.3rem”, letterSpacing: “-0.03em”, marginBottom: 4 }}>
Create your profile
</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, fontSize: “0.8rem”, color: C.text3, marginBottom: 24 }}>
{wallet.slice(0,6)}…{wallet.slice(-4)}
</div>

```
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
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: i + 1 === step ? C.cyan : C.text3, fontWeight: i + 1 === step ? 700 : 400 }}>{s}</div>
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
                fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                borderRadius: 6, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = C.cyan}
              onBlur={e => e.target.style.borderColor = usernameError ? "#ff4060" : C.border}
              onKeyDown={e => e.key === "Enter" && handleNext()}
              autoFocus
            />
            {usernameError && <div style={{ color: "#ff4060", fontSize: "0.75rem", marginTop: 6, fontFamily: "'Inter', sans-serif" }}>{usernameError}</div>}
            <div style={{ color: C.text3, fontSize: "0.72rem", marginTop: 6, fontFamily: "'Inter', sans-serif" }}>
              {username.length}/24 characters · Letters, numbers, underscores only
            </div>
          </div>
          <button onClick={handleNext} style={{ ...btnPrimary, padding: "0.85rem", width: "100%", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}>
            CONTINUE →
          </button>
          <button onClick={onSkip} style={{ background: "none", border: "none", color: C.text3, fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", cursor: "pointer", textAlign: "center" }}>
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
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{username}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: C.text3 }}>{wallet.slice(0,6)}…{wallet.slice(-4)}</div>
          </div>

          <label style={{
            background: C.cyanDim, border: `1px solid ${C.cyanBorder}`,
            color: C.cyan, padding: "0.75rem 2rem",
            fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "0.82rem", letterSpacing: "0.08em", cursor: "pointer",
            borderRadius: 6, display: "inline-block",
          }}>
            UPLOAD PHOTO
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
          </label>

          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", borderRadius: 6 }}>← Back</button>
            <button onClick={handleNext} style={{ flex: 2, ...btnPrimary, padding: "0.75rem", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}>
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
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem" }}>{username}</div>
          </div>

          <div>
            <div style={labelStyle}>X (Twitter) Handle</div>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                color: C.text3, fontFamily: "'Inter', sans-serif", fontSize: "1rem",
              }}>@</span>
              <input
                value={xHandle}
                onChange={e => setXHandle(e.target.value.replace(/^@/, ""))}
                placeholder="YourHandle"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  color: C.text, padding: "0.8rem 1rem 0.8rem 2rem",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                  borderRadius: 6, outline: "none", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = C.cyan}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>
            <div style={{ color: C.text3, fontSize: "0.72rem", marginTop: 6, fontFamily: "'Inter', sans-serif" }}>
              Required to participate as a Raider and earn PAX
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", borderRadius: 6 }}>← Back</button>
            <button onClick={handleSave} style={{ flex: 2, ...btnPrimary, padding: "0.75rem", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}>
              CREATE PROFILE 🚀
            </button>
          </div>
          <button onClick={onSkip} style={{ background: "none", border: "none", color: C.text3, fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", cursor: "pointer", textAlign: "center" }}>
            Skip for now
          </button>
        </div>
      )}
    </div>
  </div>
</div>
```

);
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage({ wallet, profile, onSaveProfile, onConnectClick }) {
const isMobile = useIsMobile();
const [editing, setEditing]     = useState(false);
const [username, setUsername]   = useState(profile?.username || “”);
const [xHandle, setXHandle]     = useState(profile?.xHandle || “”);
const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || null);
const [newAvatar, setNewAvatar] = useState(null);
const [saved, setSaved]         = useState(false);

if (!wallet) return (
<div style={{ minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, paddingTop: 72 }}>
<div style={{ textAlign: “center”, maxWidth: 420, padding: “0 2rem” }}>
<div style={{ fontSize: “3rem”, marginBottom: “1.5rem” }}>👤</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, fontWeight: 800, fontSize: “1.8rem”, letterSpacing: “-0.03em”, marginBottom: “0.75rem” }}>
Connect to view your <span style={{ color: C.cyan }}>Profile</span>
</div>
<div style={{ fontFamily: “‘Inter’, sans-serif”, color: C.text2, fontSize: “0.9rem”, lineHeight: 1.7, marginBottom: “2rem” }}>
Connect your wallet to create and manage your PAXpromote profile.
</div>
<button onClick={onConnectClick} style={{ …btnPrimary, padding: “0.9rem 2.5rem”, fontSize: “0.95rem” }}>CONNECT WALLET</button>
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
onSaveProfile({ …profile, username, xHandle: xHandle.replace(/^@/, “”), avatar: newAvatar || profile?.avatar });
setEditing(false);
setSaved(true);
setTimeout(() => setSaved(false), 2500);
};

return (
<div style={{ minHeight: “100vh”, paddingTop: isMobile ? 90 : 100, paddingBottom: 80 }}>
<div style={{ maxWidth: 640, margin: “0 auto”, padding: isMobile ? “0 1.2rem” : “0 2rem” }}>

```
    {/* Profile card */}
    <div style={{
      background: `linear-gradient(135deg, rgba(0,224,255,0.06), rgba(5,5,5,0.95))`,
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
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.03em", marginBottom: 6 }}>
            {profile?.username || "Anonymous"}
          </div>
          {profile?.xHandle && (
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: C.cyan, marginBottom: 8 }}>
              @{profile.xHandle}
            </div>
          )}
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: C.text3, marginBottom: 20 }}>
            {wallet.slice(0, 10)}…{wallet.slice(-8)}
          </div>
          <button onClick={() => setEditing(true)} style={{
            background: C.cyanDim, border: `1px solid ${C.cyanBorder}`,
            color: C.cyan, padding: "0.6rem 1.8rem", borderRadius: 6,
            fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "0.8rem", letterSpacing: "0.08em", cursor: "pointer",
          }}>EDIT PROFILE</button>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
          <div>
            <div style={labelStyle}>Username</div>
            <input value={username} onChange={e => setUsername(e.target.value)} maxLength={24}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.text, padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", borderRadius: 6, outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = C.cyan}
              onBlur={e => e.target.style.borderColor = C.border} />
          </div>
          <div>
            <div style={labelStyle}>X (Twitter) Handle</div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.text3 }}>@</span>
              <input value={xHandle} onChange={e => setXHandle(e.target.value.replace(/^@/, ""))}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.text, padding: "0.75rem 1rem 0.75rem 2rem", fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", borderRadius: 6, outline: "none", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = C.cyan}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setEditing(false); setUsername(profile?.username || ""); setXHandle(profile?.xHandle || ""); setAvatarPreview(profile?.avatar || null); }}
              style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, color: C.text2, padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", borderRadius: 6 }}>CANCEL</button>
            <button onClick={handleSave}
              style={{ flex: 2, ...btnPrimary, padding: "0.75rem", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}>SAVE CHANGES</button>
          </div>
        </div>
      )}

      {saved && (
        <div style={{ marginTop: 16, color: C.green, fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
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
        <div key={label} style={{ background: "#0c0c0e", border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: C.cyan, letterSpacing: "-0.04em" }}>{value}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: C.text3, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
        </div>
      ))}
    </div>
  </div>
</div>
```

);
}

// ─── App (inner — has access to wagmi hooks) ──────────────────────────────────
function AppInner() {
const [view, setView]                   = useState(“home”);
const [showProfileSetup, setShowProfileSetup] = useState(false);
const [profile, setProfile]             = useState(() => {
try { return JSON.parse(localStorage.getItem(“paxpromote_profile”)) || null; } catch { return null; }
});

const { address, isConnected } = useAccount();
const { disconnect } = useDisconnect();
const { open } = useWeb3Modal();

const wallet = isConnected ? address : null;
const onConnectClick = () => open();
const onDisconnect = () => { disconnect(); };

// Show profile setup modal on first connect
useEffect(() => {
if (isConnected && address && !profile) {
const timer = setTimeout(() => setShowProfileSetup(true), 600);
return () => clearTimeout(timer);
}
}, [isConnected, address, profile]);

const handleSaveProfile = (profileData) => {
setProfile(profileData);
localStorage.setItem(“paxpromote_profile”, JSON.stringify(profileData));
setShowProfileSetup(false);
};

const handleSkipProfile = () => {
const skipped = { skipped: true, wallet: address };
setProfile(skipped);
localStorage.setItem(“paxpromote_profile”, JSON.stringify(skipped));
setShowProfileSetup(false);
};

return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: #050505; color: #fff; overflow-x: hidden; } html { scroll-behavior: smooth; overflow-x: hidden; } input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); } @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } } @keyframes spin { to { transform: rotate(360deg); } } @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } } button:hover { filter: brightness(1.08); } ::-webkit-scrollbar { width: 4px; height: 4px; } ::-webkit-scrollbar-track { background: #050505; } ::-webkit-scrollbar-thumb { background: rgba(0,224,255,0.25); border-radius: 2px; } input, textarea, button { -webkit-tap-highlight-color: transparent; } @media (max-width: 767px) { ::-webkit-scrollbar { display: none; } }`}</style>

```
  {showProfileSetup && wallet && (
    <ProfileSetupModal wallet={wallet} onSave={handleSaveProfile} onSkip={handleSkipProfile} />
  )}

  <Navbar view={view} setView={setView} wallet={wallet} profile={profile} onConnectClick={onConnectClick} onDisconnect={onDisconnect} />
  {view === "home" && (
    <>
      <Hero setView={setView} onConnectClick={onConnectClick} />
      <TokenSections setView={setView} />
      <TiersPage setView={setView} />
    </>
  )}
  {view === "tiers"       && <TiersPage setView={setView} />}
  {view === "leaderboard" && <Leaderboard />}
  {view === "dev"         && <DevDashboard wallet={wallet} onConnectClick={onConnectClick} setView={setView} />}
  {view === "raider"      && <RaiderDashboard wallet={wallet} onConnectClick={onConnectClick} />}
  {view === "promote"     && <PromotePage wallet={wallet} onConnectClick={onConnectClick} />}
  {view === "profile"     && <ProfilePage wallet={wallet} profile={profile} onSaveProfile={handleSaveProfile} onConnectClick={onConnectClick} />}
</>
```

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
