import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIExplainModal from "../components/news/AIExplainModal";
import LaunchDetailModal from "../components/launches/LaunchDetailModal";
import axios from "../api/axios";

const LIMIT = 10;

function fmtLaunchDate(iso) {
  if (!iso) return "TBD";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

// ── Status badge ──────────────────────────────────────────
const STATUS_STYLES = {
  Go: {
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
    color: "#34d399",
  },
  TBD: {
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.28)",
    color: "#fbbf24",
  },
  TBC: {
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.28)",
    color: "#fbbf24",
  },
  Hold: {
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.28)",
    color: "#f87171",
  },
  Success: {
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
    color: "#34d399",
  },
  Failure: {
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.28)",
    color: "#f87171",
  },
  default: {
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.5)",
  },
};

function StatusBadge({ status }) {
  const abbr =
    typeof status === "string"
      ? status
      : (status?.abbrev ?? status?.name ?? "TBD");
  const s = STATUS_STYLES[abbr] ?? STATUS_STYLES.default;
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "'DM Mono',monospace",
        letterSpacing: "0.06em",
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
      }}
    >
      {abbr}
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────────
function LaunchSkeleton() {
  const S = ({ h, w = "100%", r = 7 }) => (
    <div
      style={{
        height: h,
        width: w,
        borderRadius: r,
        background: "rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",
          animation: "shimmer 1.8s infinite",
        }}
      />
    </div>
  );
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        display: "flex",
        gap: 0,
      }}
      className="launch-card-skeleton"
    >
      <div style={{ width: 200, flexShrink: 0 }} className="launch-img-skel">
        <S h="100%" r={0} />
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <S h={22} w="70%" />
        <S h={14} w="45%" />
        <S h={13} />
        <S h={13} w="85%" />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <S h={32} w={100} r={9} />
          <S h={32} w={110} r={9} />
        </div>
      </div>
      <style>{`
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @media(max-width:640px){ .launch-card-skeleton{flex-direction:column!important} .launch-img-skel{width:100%!important;height:180px!important} }
      `}</style>
    </div>
  );
}

// ── Launch Card ────────────────────────────────────────────
function LaunchCard({ launch, onAIExplain, onViewDetails, index }) {
  const [hovered, setHovered] = useState(false);
  const img = launch.image ?? launch.rocket?.configuration?.image_url ?? null;
  const name = launch.title ?? "Unknown Mission";
  const desc = launch.shortDescription ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: (index % LIMIT) * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: 18,
        border: hovered
          ? "1px solid rgba(34,211,238,0.28)"
          : "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        display: "flex",
        boxShadow: hovered
          ? "0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.08)"
          : "0 4px 24px rgba(0,0,0,0.25)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      className="launch-card"
    >
      {/* Image */}
      <div
        style={{
          width: 200,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
        className="launch-card-img"
      >
        {img ? (
          <motion.img
            src={img}
            alt={name}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.45 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.style.background =
                "linear-gradient(135deg,#060d20,#0a1a35)";
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: 160,
              background: "linear-gradient(135deg,#060d20,#0a1a35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 40, opacity: 0.2 }}>🚀</span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right,transparent 60%,rgba(2,5,16,0.5))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Info */}
      <div
        style={{
          flex: 1,
          padding: "18px 22px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minWidth: 0,
        }}
      >
        {/* Status + name */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <h3
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(14px,2vw,16px)",
              lineHeight: 1.3,
              color: "#fff",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {name}
          </h3>
          <StatusBadge status={launch.status} />
        </div>

        {/* Launch date */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <rect
              x="1"
              y="2"
              width="12"
              height="11"
              rx="2"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.3"
            />
            <path
              d="M4 1v2M10 1v2M1 6h12"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {fmtLaunchDate(launch.launchDate)}
          </span>
        </div>

        {/* Rocket + pad */}
        {/* Rocket + pad */}
        <div style={{ display: "flex", gap: 8 }} className="launch-tags-row">
          {launch.rocket?.name && (
            <span
              style={{
                padding: "2px 9px",
                borderRadius: 999,
                fontSize: 11,
                border: "1px solid rgba(129,140,248,0.22)",
                background: "rgba(129,140,248,0.07)",
                color: "rgba(165,180,252,0.85)",
                fontFamily: "'DM Mono',monospace",
              }}
            >
              🚀 {launch.rocket.name}
            </span>
          )}
          {launch.launchPad?.location && (
            <span
              style={{
                padding: "2px 9px",
                borderRadius: 999,
                fontSize: 11,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'DM Mono',monospace",
              }}
            >
              📍 {launch.launchPad.location}
            </span>
          )}
        </div>

        {/* Description */}
        {desc && (
          <p
            style={{
              fontSize: 12.5,
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.65,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {desc}
          </p>
        )}

        {/* Buttons */}
        <div
          style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}
        >
          <motion.button
            data-cursor="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAIExplain(launch)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              borderRadius: 9,
              border: "none",
              background:
                "linear-gradient(135deg,rgba(34,211,238,0.14),rgba(129,140,248,0.14))",
              outline: "1px solid rgba(34,211,238,0.2)",
              fontSize: 12,
              fontWeight: 600,
              color: "#67e8f9",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
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

          <motion.button
            data-cursor="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onViewDetails(launch)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              borderRadius: 9,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            View Details →
          </motion.button>
        </div>
      </div>

      <style>{`
        @media(max-width:640px){
          .launch-card{flex-direction:column!important}
          .launch-card-img{width:100%!important;height:180px!important}
        }
        @media(max-width:640px){
          .launch-tags-row{ flex-wrap: wrap !important; }
}
      `}</style>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function LaunchesPage() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [aiLaunch, setAiLaunch] = useState(null);
  const [detailLaunch, setDetailLaunch] = useState(null);

  useEffect(() => {
    axios
      .get(`/launches?limit=${LIMIT}&offset=0`)
      .then((res) => {
        const data = res.data?.data ?? res.data?.results ?? res.data ?? [];
        setLaunches(data);
        setOffset(LIMIT);
        setHasMore(data.length === LIMIT);
      })
      .catch(() => setError("Failed to load launches."))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const res = await axios.get(`/launches?limit=${LIMIT}&offset=${offset}`);
      const data = res.data?.data ?? res.data?.results ?? res.data ?? [];
      setLaunches((prev) => [...prev, ...data]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(data.length === LIMIT);
    } catch {
      /* silent */
    } finally {
      setLoadingMore(false);
    }
  };

  // Build AI article from launch
  const launchToArticle = (l) => ({
    title: l.title ?? "Unknown Mission",
    image: l.image ?? null,
    date: l.launchDate,
    description: [
      l.shortDescription,
      l.rocket?.name && `Rocket: ${l.rocket.name}`,
      l.rocket?.family && `Family: ${l.rocket.family}`,
      l.launchPad?.name && `Launch Pad: ${l.launchPad.name}`,
      l.launchPad?.location && `Location: ${l.launchPad.location}`,
      l.launchPad?.country && `Country: ${l.launchPad.country}`,
    ]
      .filter(Boolean)
      .join("\n\n"),
    officialUrl: l.infoURLs?.[0]?.url ?? null,
  });

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: 22 }}>🚀</span>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1rem, 4vw, 1.35rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: "#fff",
            margin: 0,
            maxWidth: "75%",
          }}
        >
          Upcoming Launches
        </h2>
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg,rgba(34,211,238,0.4),transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            borderRadius: 999,
            border: "1px solid rgba(129,140,248,0.22)",
            background: "rgba(129,140,248,0.07)",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#818cf8",
              display: "block",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              color: "rgba(165,180,252,0.8)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            LL2
          </span>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <LaunchSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 0",
            gap: 12,
            border: "1px solid rgba(239,68,68,0.14)",
            borderRadius: 16,
            background: "rgba(239,68,68,0.04)",
          }}
        >
          <span style={{ fontSize: 34 }}>⚠️</span>
          <p
            style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}
          >
            {error}
          </p>
          <button
            data-cursor="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "6px 18px",
              borderRadius: 8,
              border: "1px solid rgba(34,211,238,0.2)",
              background: "rgba(34,211,238,0.06)",
              color: "#67e8f9",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {launches.map((launch, i) => (
            <LaunchCard
              key={launch.id ?? i}
              launch={launch}
              index={i}
              onAIExplain={(l) => setAiLaunch(launchToArticle(l))}
              onViewDetails={(l) =>
                setDetailLaunch({
                  ...l,
                  // normalize for LaunchDetailModal which reads raw LL2 shape
                  name: l.title,
                  net: l.launchDate,
                  status: { abbrev: l.status, name: l.status },
                  mission: {
                    description: l.shortDescription,
                    type: l.missionType,
                    orbit: { name: l.orbit },
                  },
                  rocket: {
                    configuration: {
                      name: l.rocket?.name,
                      family: l.rocket?.family,
                      manufacturer: { name: l.rocket?.manufacturer },
                    },
                  },
                  pad: {
                    name: l.launchPad?.name,
                    location: {
                      name: l.launchPad?.location,
                      country_code: l.launchPad?.country,
                    },
                  },
                })
              }
            />
          ))}

          {launches.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "60px 0",
                gap: 10,
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 16,
              }}
            >
              <span style={{ fontSize: 36, opacity: 0.3 }}>🚀</span>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.28)",
                  margin: 0,
                }}
              >
                No launches found.
              </p>
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 18,
              }}
            >
              <motion.button
                data-cursor="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={loadMore}
                disabled={loadingMore}
                style={{
                  padding: "10px 32px",
                  borderRadius: 12,
                  border: "1px solid rgba(34,211,238,0.22)",
                  background:
                    "linear-gradient(135deg,rgba(34,211,238,0.1),rgba(129,140,248,0.1))",
                  color: "#67e8f9",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: loadingMore ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: loadingMore ? 0.6 : 1,
                }}
              >
                {loadingMore ? (
                  <>
                    <span
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: "50%",
                        border: "2px solid rgba(34,211,238,0.3)",
                        borderTopColor: "#22d3ee",
                        animation: "spin 0.8s linear infinite",
                        display: "block",
                      }}
                    />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </motion.button>
            </div>
          )}
        </div>
      )}

      {/* AI Modal */}
      <AnimatePresence>
        {aiLaunch && (
          <AIExplainModal
            article={aiLaunch}
            aiType="launch"
            onClose={() => setAiLaunch(null)}
          />
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailLaunch && (
          <LaunchDetailModal
            launch={detailLaunch}
            onClose={() => setDetailLaunch(null)}
            onAIExplain={(l) => {
              setDetailLaunch(null);
              setAiLaunch(launchToArticle(l));
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}
