import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useBookmark } from "../../hooks/useBookmark";

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NewsCard({ article, onAIExplain }) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const { saved, loading, toggle } = useBookmark(article, authStatus);

  const { title, image, date, description, officialUrl } = article;

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        borderRadius: 18,
        border: hovered
          ? "1px solid rgba(34,211,238,0.28)"
          : "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(18px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 12px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,211,238,0.1)"
          : "0 4px 24px rgba(0,0,0,0.28)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        height: "100%",
      }}
    >
      {/* ── Image ── */}
      <div
        style={{
          position: "relative",
          height: 175,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {image && !imgErr ? (
          <motion.img
            src={image}
            alt={title}
            onError={() => setImgErr(true)}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.45 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
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
            <span style={{ fontSize: 40, opacity: 0.22 }}>🛸</span>
          </div>
        )}
        {/* gradient fade bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(2,5,16,0.82) 0%,transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {/* Top-right: category tag if source exists */}
        {article.source && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "2px 8px",
              borderRadius: 999,
              background: "rgba(2,5,16,0.72)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.1em",
            }}
          >
            {article.source}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div
        style={{
          padding: "13px 15px 15px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          flex: 1,
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 14.5,
            lineHeight: 1.38,
            letterSpacing: "-0.01em",
            color: "#fff",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </h3>

        {/* Action row — Date | Official Link | AI Explain | Save */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {/* Date pill */}
          <span
            style={{
              padding: "3px 9px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              fontFamily: "'DM Mono',monospace",
              fontSize: 9.5,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            {fmtDate(date)}
          </span>

          {/* Official Link */}
          {officialUrl && (
            <a
              data-cursor="link"
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                fontSize: 11.5,
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                transition: "all 0.18s",
                fontFamily: "'DM Sans',sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H5M11 1V7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Official
            </a>
          )}

          {/* AI Explain */}
          <button
            data-cursor="button"
            onClick={() => onAIExplain(article)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 11px",
              borderRadius: 7,
              border: "none",
              background:
                "linear-gradient(135deg,rgba(34,211,238,0.14),rgba(129,140,248,0.14))",
              outline: "1px solid rgba(34,211,238,0.2)",
              fontSize: 11.5,
              fontWeight: 600,
              color: "#67e8f9",
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "'DM Sans',sans-serif",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg,rgba(34,211,238,0.24),rgba(129,140,248,0.24))";
              e.currentTarget.style.color = "#a5f3fc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg,rgba(34,211,238,0.14),rgba(129,140,248,0.14))";
              e.currentTarget.style.color = "#67e8f9";
            }}
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
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
          </button>

          {/* Save — right aligned */}
          <motion.button
            data-cursor="button"
            whileTap={{ scale: 0.88 }}
            onClick={toggle}
            disabled={loading || !authStatus}
            title={
              !authStatus
                ? "Login to save"
                : loading
                  ? "Saving..."
                  : saved
                    ? "Remove bookmark"
                    : "Save article"
            }
            style={{
              marginLeft: "auto",
              width: 29,
              height: 29,
              borderRadius: "50%",
              border: "none",
              background: saved
                ? "rgba(251,191,36,0.14)"
                : "rgba(255,255,255,0.04)",
              outline: saved
                ? "1px solid rgba(251,191,36,0.38)"
                : "1px solid rgba(255,255,255,0.1)",
              color: saved
                ? "#fbbf24"
                : loading
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.38)",
              cursor: !authStatus || loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              transition: "all 0.2s",
            }}
          >
            {loading ? (
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(251,191,36,0.3)",
                  borderTopColor: "#fbbf24",
                  animation: "spin 0.7s linear infinite",
                  display: "block",
                }}
              />
            ) : saved ? (
              "★"
            ) : (
              "☆"
            )}
          </motion.button>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 12.5,
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.68,
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.article>
  );
}
