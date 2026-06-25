import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../api/axios";

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function NewsItem({ item, onRemove }) {
  const [removing, setRemoving] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await axios.delete(`/bookmarks/news/${item.newsId}`);
      onRemove(item.newsId);
    } catch {
      setRemoving(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.32 }}
      style={{
        display: "flex",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(12px)",
        alignItems: "flex-start",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(34,211,238,0.18)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
      }
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 90,
          height: 62,
          borderRadius: 10,
          overflow: "hidden",
          flexShrink: 0,
          background: "linear-gradient(135deg,#060d20,#0a1a35)",
        }}
      >
        {item.image && !imgErr ? (
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            onError={() => setImgErr(true)}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              opacity: 0.25,
            }}
          >
            🛸
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 13.5,
            color: "#fff",
            margin: "0 0 5px",
            lineHeight: 1.38,
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: 11.5,
            color: "rgba(255,255,255,0.35)",
            margin: "0 0 8px",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {item.source && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: "rgba(34,211,238,0.65)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {item.source}
            </span>
          )}
          {item.officialUrl && (
            <a
              data-cursor="link"
              href={item.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                fontSize: 10.5,
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.15s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#67e8f9")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
              }
            >
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H5M11 1V7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Read
            </a>
          )}
        </div>
      </div>

      {/* Remove button */}
      <motion.button
        data-cursor="button"
        whileTap={{ scale: 0.9 }}
        onClick={handleRemove}
        disabled={removing}
        title="Remove bookmark"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          flexShrink: 0,
          border: "1px solid rgba(239,68,68,0.2)",
          background: "rgba(239,68,68,0.06)",
          color: removing ? "rgba(255,255,255,0.2)" : "rgba(239,68,68,0.6)",
          cursor: removing ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          transition: "all 0.18s",
        }}
        onMouseEnter={(e) =>
          !removing &&
          (e.currentTarget.style.background = "rgba(239,68,68,0.14)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(239,68,68,0.06)")
        }
      >
        {removing ? (
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderTopColor: "#f87171",
              animation: "spin 0.7s linear infinite",
              display: "block",
            }}
          />
        ) : (
          "✕"
        )}
      </motion.button>
    </motion.div>
  );
}

export default function SavedNewsDrawer({ onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/bookmarks/news")
      .then((res) => setItems(res.data?.data ?? []))
      .catch(() => setError("Failed to load saved news."))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = (newsId) => {
    setItems((prev) => prev.filter((i) => i.newsId !== newsId));
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(2,5,16,0.75)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(600px, 100vw)",
          zIndex: 101,
          background: "rgba(4,8,26,0.97)",
          backdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(34,211,238,0.12)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "rgba(34,211,238,0.12)",
                border: "1px solid rgba(34,211,238,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              📰
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Saved News
              </h2>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9.5,
                  color: "rgba(34,211,238,0.6)",
                  margin: 0,
                  letterSpacing: "0.1em",
                }}
              >
                {items.length} article{items.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
          <motion.button
            data-cursor="button"
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
              e.currentTarget.style.color = "rgba(252,165,165,0.9)";
              e.currentTarget.style.background = "rgba(239,68,68,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            ✕
          </motion.button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 90,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
                    animation: "shimmer 1.75s infinite",
                  }}
                />
              </div>
            ))}

          {!loading && error && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "60px 0",
              }}
            >
              <span style={{ fontSize: 40, opacity: 0.25 }}>📰</span>
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                No saved articles yet.
                <br />
                Hit the ☆ on any news card to save it.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            items.map((item) => (
              <NewsItem key={item.newsId} item={item} onRemove={handleRemove} />
            ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </>
  );
}
