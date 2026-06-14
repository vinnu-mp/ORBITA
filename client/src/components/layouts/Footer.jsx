import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LINKS = {
  Explore: [
    { label: "Solar System 3D",  to: "/vizualise" },
    { label: "Space News",        to: "/news"      },
    { label: "ISRO Highlights",   to: "/news#india" },
    { label: "Space Facts",       to: "/facts"     },
  ],
  Platform: [
    { label: "AI Assistant",  to: "/ai"   },
    { label: "Space Quizzes", to: "/quiz" },
    { label: "My Profile",    to: "/me"   },
  ],
  Account: [
    { label: "Sign Up", to: "/signup" },
    { label: "Login",   to: "/login"  },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      position: "relative", overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: "5%", right: "5%", height: 1,
        background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.2),rgba(129,140,248,0.2),transparent)",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 280,
        background: "radial-gradient(ellipse at 50% 100%,rgba(34,211,238,0.04) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 32px", position: "relative", zIndex: 1 }}>

        {/* ── Top row ── */}
        <div style={{
          display: "flex", gap: 48, flexWrap: "wrap",
          justifyContent: "space-between", marginBottom: 48,
        }}>

          {/* Brand column */}
          <div style={{ minWidth: 220, maxWidth: 280, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg,#22d3ee,#818cf8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 14px rgba(34,211,238,0.35)", flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3.5" stroke="white" strokeWidth="1.5"/>
                  <ellipse cx="8" cy="8" rx="7" ry="3" stroke="white" strokeWidth="1" opacity=".6"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg,#fff 0%,#93c5fd 60%,#818cf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Orbita</span>
            </Link>

            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", lineHeight: 1.72, margin: 0 }}>
              Your complete space intelligence platform. Explore the universe through
              real-time news, 3D visualizations, and AI-powered learning.
            </p>

            {/* Live indicator */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, width: "fit-content",
              padding: "4px 12px", borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.06)",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399",
                animation: "pulse 1.5s infinite", display: "block" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                color: "rgba(52,211,153,0.75)", letterSpacing: "0.14em",
                textTransform: "uppercase" }}>Live Space Data Active</span>
            </div>
          </div>

          {/* Nav link columns */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group} style={{ minWidth: 120 }}>
                <p style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)", marginBottom: 14, margin: "0 0 14px",
                }}>{group}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {items.map(item => (
                    <li key={item.label}>
                      <Link to={item.to} style={{
                        fontSize: 13.5, color: "rgba(255,255,255,0.45)",
                        textDecoration: "none", transition: "color 0.18s",
                        display: "inline-block",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height: 1, marginBottom: 24,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",
        }} />

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{
            fontSize: 12, color: "rgba(255,255,255,0.22)",
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            © {new Date().getFullYear()} Orbita · Built for curious minds 🚀
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)",
              fontFamily: "'DM Mono', monospace" }}>Powered by</span>
            {["Groq AI", "Three.js", "NASA APIs"].map(t => (
              <span key={t} style={{
                padding: "2px 7px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
      `}</style>
    </footer>
  );
}
