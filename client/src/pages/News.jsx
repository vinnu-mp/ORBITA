import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/news/apod", label: "APOD", icon: "🌌" },
  { path: "/news/latest", label: "Latest", icon: "🛰️" },
  { path: "/news/launches", label: "Launches", icon: "🚀" },
  { path: "/news/india", label: "Indian", icon: "🇮🇳" },
];

export default function News() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const currentSection =
    NAV_ITEMS.find((item) => item.path === location.pathname)?.label ??
    "Latest";

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Page header */}
      <div
        style={{
          padding: "clamp(20px,5vw,40px) 16px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 0%,rgba(34,211,238,0.09) 0%,transparent 68%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 999,
              marginBottom: 12,
              border: "1px solid rgba(34,211,238,0.22)",
              background: "rgba(34,211,238,0.07)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22d3ee",
                animation: "pulse 2s infinite",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(103,232,249,0.85)",
              }}
            >
              Live Feed
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.3rem,5vw,3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg,#fff 0%,#93c5fd 50%,#818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Space Intelligence
          </h1>
          <p
            style={{
              marginTop: 8,
              color: "rgba(255,255,255,0.32)",
              fontSize: "clamp(11px,3.5vw,13.5px)",
              lineHeight: 1.6,
            }}
          >
            Curated space news &amp; Updates with AI-powered explanations.
          </p>
        </div>
      </div>

      {/* ── Mobile dropdown (≤1023px) ── */}
      <div className="mobile-news-nav">
        <div style={{ padding: "0 16px 16px", position: "relative" }}>
          <button
            onClick={() => setMobileOpen((p) => !p)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 16px",
              borderRadius: 12,
              cursor: "pointer",
              border: "1px solid rgba(34,211,238,0.18)",
              background: "rgba(4,8,26,0.75)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              {currentSection}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#22d3ee",
                display: "block",
                transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s",
              }}
            >
              ▼
            </span>
          </button>

          {mobileOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% - 4px)",
                left: 16,
                right: 16,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(4,8,26,0.97)",
                backdropFilter: "blur(20px)",
                zIndex: 50,
                padding: 8,
              }}
            >
              {NAV_ITEMS.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 12px",
                    borderRadius: 10,
                    textDecoration: "none",
                    background: isActive
                      ? "rgba(34,211,238,0.07)"
                      : "transparent",
                    borderLeft: isActive
                      ? "2px solid #22d3ee"
                      : "2px solid transparent",
                    transition: "all 0.18s",
                    marginBottom: 2,
                  })}
                >
                  <span>{item.icon}</span>
                  <span
                    style={{
                      fontSize: 13.5,
                      fontFamily: "'DM Sans',sans-serif",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div
        style={{
          display: "flex",
          gap: 20,
          padding: "0 16px 100px",
          maxWidth: 1320,
          margin: "0 auto",
          alignItems: "flex-start",
        }}
      >
        {/* Page content via child route */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </div>

        {/* Sticky sidebar — desktop only */}
        <div className="desktop-sidebar" style={{ width: 152, flexShrink: 0 }}>
          <div style={{ position: "sticky", top: 88 }}>
            <div
              style={{
                borderRadius: 16,
                padding: "14px 12px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(4,8,26,0.6)",
                backdropFilter: "blur(14px)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 8.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  margin: "0 0 10px",
                }}
              >
                Navigate
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {NAV_ITEMS.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.path}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: isActive
                        ? "1px solid rgba(34,211,238,0.22)"
                        : "1px solid transparent",
                      background: isActive
                        ? "rgba(34,211,238,0.08)"
                        : "transparent",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: isActive
                              ? "#22d3ee"
                              : "rgba(255,255,255,0.2)",
                            boxShadow: isActive ? "0 0 7px #22d3ee" : "none",
                            transition: "all 0.2s",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive
                              ? "#e0f7fa"
                              : "rgba(255,255,255,0.45)",
                            fontFamily: "'DM Sans',sans-serif",
                            transition: "color 0.2s",
                          }}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .mobile-news-nav  { display: none; }
        .desktop-sidebar  { display: block; }
        @media(max-width:1023px) {
          .desktop-sidebar { display: none !important; }
          .mobile-news-nav { display: block !important; }
        }
      `}</style>
    </div>
  );
}
