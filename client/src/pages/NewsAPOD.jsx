import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIExplainModal from "../components/news/AIExplainModal";
import axios from "../api/axios";

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Skeleton ─────────────────────────────────────────────
function APODSkeleton() {
  const S = ({ h, w = "100%", r = 8 }) => (
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
        maxWidth: 960,
        margin: "0 auto",
        padding: "clamp(16px,4vw,28px) clamp(16px,4vw,32px)",
      }}
    >
      <S h={520} r={20} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 28,
        }}
      >
        <S h={32} w="60%" />
        <S h={16} w="30%" />
        <S h={14} />
        <S h={14} w="95%" />
        <S h={14} w="88%" />
        <S h={14} w="92%" />
      </div>
      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
      @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}

  @media(max-width:640px){
    .apod-hero img{
      max-height: 260px !important;
      object-fit: cover !important;
    }
    .apod-hero-title{
      position: relative !important;
      bottom: auto !important;
      padding: 14px 16px !important;
      background: rgba(2,5,16,0.9) !important;
    }
    .apod-hero-title h1{
      font-size: 1.1rem !important;
    }
  }`}</style>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────
export default function APODPage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/apod")
      .then((res) => setApod(res.data?.data))
      .catch(() => setError("Failed to load today's APOD."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={{ paddingTop: 32 }}>
        <APODSkeleton />
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 0",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 40 }}>🔭</span>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{error}</p>
        <button
          data-cursor="button"
          onClick={() => window.location.reload()}
          style={{
            padding: "7px 20px",
            borderRadius: 9,
            border: "1px solid rgba(34,211,238,0.22)",
            background: "rgba(34,211,238,0.07)",
            color: "#67e8f9",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );

  if (!apod) return null;

  const isVideo = apod.mediaType === "video";
  const PREVIEW = 420;
  const desc = apod.explanation ?? "";
  const isLong = desc.length > PREVIEW;

  // Build article object for AI modal (same shape NewsCard uses)
  const aiArticle = {
    title: apod.title,
    image: apod.image,
    date: apod.date,
    description: apod.explanation,
    officialUrl: apod.hdImage,
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: 22 }}>🌌</span>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1rem, 4vw, 1.35rem)",
            letterSpacing: "-0.01em",
            color: "#fff",
            margin: 0,
            lineHeight: 1.1,
            maxWidth: "75%",
          }}
        >
          NASA Astronomy Picture of the Day
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
            NASA
          </span>
        </div>
      </div>
      {/* ── Hero media ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          maxWidth: 960,
          margin: "0 auto 36px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
        }}
        className="apod-hero"
      >
        {isVideo ? (
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src={apod.image}
              title={apod.title}
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: 20,
              }}
            />
          </div>
        ) : (
          <>
            <motion.img
              src={apod.image}
              alt={apod.title}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.6 }}
              style={{
                width: "100%",
                display: "block",
                maxHeight: 580,
                objectFit: "cover",
              }}
            />
            {/* Bottom gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "55%",
                background:
                  "linear-gradient(to top,rgba(2,5,16,0.92) 0%,transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Title inside hero */}
            <div
              className="apod-hero-title"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "24px 28px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 11px",
                  borderRadius: 999,
                  marginBottom: 10,
                  border: "1px solid rgba(34,211,238,0.22)",
                  background: "rgba(2,5,16,0.55)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(103,232,249,0.85)",
                  }}
                >
                  NASA APOD · {fmtDate(apod.date)}
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1rem,4vw,2rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  margin: 0,
                  textShadow: "0 2px 20px rgba(0,0,0,0.7)",
                }}
              >
                {apod.title}
              </h1>
              {apod.copyright && (
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 6,
                  }}
                >
                  © {apod.copyright}
                </p>
              )}
            </div>
          </>
        )}

        {/* Glow border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            pointerEvents: "none",
            border: "1px solid rgba(34,211,238,0.14)",
            boxShadow: "inset 0 0 40px rgba(34,211,238,0.04)",
          }}
        />
      </motion.div>

      {/* ── Content card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "28px 32px",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Action buttons row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {/* AI Explain */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setAiOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 18px",
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
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
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

          {/* HD Download */}
          {apod.hdImage && !isVideo && (
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={apod.hdImage}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 18px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2v7M4 7l3 3 3-3M2 11h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              HD Image
            </motion.a>
          )}

          {/* Date badge */}
          <div
            style={{
              marginLeft: "auto",
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {fmtDate(apod.date)}
          </div>
        </div>

        {/* Explanation */}
        <div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.82,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "'DM Sans',sans-serif",
              margin: 0,
              overflow: "hidden",
              maxHeight: expanded || !isLong ? "none" : 140,
              transition: "max-height 0.4s ease",
            }}
          >
            {desc}
          </p>

          {isLong && (
            <button
              data-cursor="button"
              onClick={() => setExpanded((p) => !p)}
              style={{
                marginTop: 14,
                background: "none",
                border: "none",
                color: "#67e8f9",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: 0,
              }}
            >
              {expanded ? "Show less ↑" : "Read more ↓"}
            </button>
          )}
        </div>
      </motion.div>

      {/* AI Modal */}
      <AnimatePresence>
        {aiOpen && (
          <AIExplainModal
            article={aiArticle}
            aiType="apod"
            onClose={() => setAiOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
