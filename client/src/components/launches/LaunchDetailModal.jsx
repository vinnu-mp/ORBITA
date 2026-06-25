import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function fmtDate(iso) {
  if (!iso) return "TBD";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

// ── Countdown ─────────────────────────────────────────────
function Countdown({ target }) {
  const [parts, setParts] = useState(null);

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) {
        setParts(null);
        return;
      }
      setParts({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);

  if (!parts) return null;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
      {[
        ["d", "Days"],
        ["h", "Hrs"],
        ["m", "Min"],
        ["s", "Sec"],
      ].map(([k, l]) => (
        <div
          key={k}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 16px",
            borderRadius: 12,
            border: "1px solid rgba(34,211,238,0.18)",
            background: "rgba(34,211,238,0.06)",
            minWidth: 58,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "#22d3ee",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(parts[k]).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              color: "rgba(34,211,238,0.55)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Info row ──────────────────────────────────────────────
function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.75)",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Section block ─────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div
      style={{
        padding: "20px 22px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
      }}
    >
      <h3
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          margin: "0 0 14px",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────
export default function LaunchDetailModal({ launch, onClose, onAIExplain }) {
  const img = launch.image ?? launch.rocket?.configuration?.image_url ?? null;
  const name = launch.name ?? "Unknown Mission";
  const net = launch.net ?? launch.window_start;
  const rocket = launch.rocket?.configuration;
  const mission = launch.mission;
  const pad = launch.pad;

  const infoURLs = launch.infoURLs ?? [];
  const vidURLs = launch.vidURLs ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(2,5,16,0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(34,211,238,0.16)",
          background: "rgba(4,8,26,0.96)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 40px 90px rgba(0,0,0,0.75)",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Hero image */}
        <div
          style={{
            position: "relative",
            height: 220,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {img ? (
            <img
              src={img}
              alt={name}
              referrerPolicy="no-referrer"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg,#060d20,#0a1a35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 56, opacity: 0.15 }}>🚀</span>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top,rgba(4,8,26,1) 0%,rgba(4,8,26,0.3) 60%,transparent 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Close btn */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(4,8,26,0.7)",
              backdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </motion.button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "0 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Name + status */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
              marginTop: -8,
              zIndex: 3,
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.1rem,3vw,1.5rem)",
                lineHeight: 1.2,
                color: "#fff",
                margin: 0,
              }}
            >
              {name}
            </h2>
            {launch.status && (
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  flexShrink: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'DM Mono',monospace",
                  letterSpacing: "0.06em",
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  color: "#34d399",
                  zIndex: 2,
                }}
              >
                {launch.status?.abbrev ?? launch.status?.name}
              </span>
            )}
          </div>

          {/* Date + countdown */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1"
                  y="2"
                  width="12"
                  height="11"
                  rx="2"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.3"
                />
                <path
                  d="M4 1v2M10 1v2M1 6h12"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {fmtDate(net)}
              </span>
            </div>
            <Countdown target={net} />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onAIExplain(launch)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 20px",
                borderRadius: 10,
                border: "none",
                background:
                  "linear-gradient(135deg,rgba(34,211,238,0.18),rgba(129,140,248,0.18))",
                outline: "1px solid rgba(34,211,238,0.25)",
                fontSize: 13,
                fontWeight: 600,
                color: "#67e8f9",
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M7 5.5v3M7 4.2v.3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              AI Explain
            </motion.button>

            {vidURLs.length > 0 && (
              <a
                data-cursor="link"
                href={vidURLs[0]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 20px",
                  borderRadius: 10,
                  border: "1px solid rgba(239,68,68,0.25)",
                  background: "rgba(239,68,68,0.08)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#fca5a5",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.2s",
                }}
              >
                ▶ Watch Stream
              </a>
            )}

            {infoURLs.length > 0 && (
              <a
                data-cursor="link"
                href={infoURLs[0].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 20px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.2s",
                }}
              >
                ↗ Official Site
              </a>
            )}
          </div>

          {/* Mission */}
          {mission && (
            <Section title="Mission">
              {mission.description && (
                <p
                  style={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.75,
                    margin: "0 0 12px",
                  }}
                >
                  {mission.description}
                </p>
              )}
              <InfoRow label="Type" value={mission.type} />
              <InfoRow label="Orbit" value={mission.orbit?.name} />
            </Section>
          )}

          {/* Rocket */}
          {rocket && (
            <Section title="Rocket">
              <InfoRow label="Name" value={rocket.name} />
              <InfoRow label="Family" value={rocket.family} />
              <InfoRow label="Manufacturer" value={rocket.manufacturer?.name} />
              <InfoRow
                label="Country"
                value={rocket.manufacturer?.country_code}
              />
            </Section>
          )}

          {/* Launch site */}
          {pad && (
            <Section title="Launch Site">
              <InfoRow label="Pad" value={pad.name} />
              <InfoRow label="Location" value={pad.location?.name} />
              <InfoRow label="Country" value={pad.location?.country_code} />
            </Section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
