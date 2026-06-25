import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./NewsCardSkeleton";
import axios from "../../api/axios.js";

const LIMIT = 12;

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      delay: i * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function NewsSection({
  id,
  label,
  icon,
  endpoint,
  onAIExplain,
}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false); // initial load
  const [loadingMore, setLoadingMore] = useState(false); // load-more
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initial fetch — runs once on mount via the div ref trick below
  const fetchInitial = useCallback(async () => {
    if (initialized) return;
    setInitialized(true);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${endpoint}?limit=${LIMIT}&offset=0`);
      const data = res.data?.data ?? res.data ?? [];
      setArticles(data);
      setOffset(LIMIT);
      setHasMore(data.length === LIMIT);
    } catch {
      setError("Failed to load. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, initialized]);

  const fetchMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `${endpoint}?limit=${LIMIT}&offset=${offset}`,
      );
      const data = res.data?.data ?? res.data ?? [];
      setArticles((prev) => [...prev, ...data]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(data.length === LIMIT);
    } catch {
      // silent — user can retry
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section id={id} ref={() => fetchInitial()}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 22 }}>{icon}</span>
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
          {label}
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
            border: "1px solid rgba(52,211,153,0.2)",
            background: "rgba(52,211,153,0.06)",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#34d399",
              animation: "pulse 1.5s infinite",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              color: "rgba(52,211,153,0.75)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Live
          </span>
        </div>
      </div>

      {/* Skeletons */}
      {loading && (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
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
            justifyContent: "center",
            padding: "60px 0",
            gap: 12,
            border: "1px solid rgba(239,68,68,0.14)",
            borderRadius: 16,
            background: "rgba(239,68,68,0.04)",
          }}
        >
          <span style={{ fontSize: 32 }}>⚠️</span>
          <p
            style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}
          >
            {error}
          </p>
          <button
            data-cursor="button"
            onClick={() => {
              setInitialized(false);
              fetchInitial();
            }}
            style={{
              padding: "6px 18px",
              borderRadius: 8,
              border: "1px solid rgba(34,211,238,0.2)",
              background: "rgba(34,211,238,0.06)",
              color: "#67e8f9",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && articles.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 0",
            gap: 10,
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 16,
          }}
        >
          <span style={{ fontSize: 36, opacity: 0.3 }}>📡</span>
          <p
            style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", margin: 0 }}
          >
            No transmissions received.
          </p>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && articles.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fill,minmax(268px,1fr))",
            }}
          >
            <AnimatePresence>
              {articles.map((article, i) => (
                <motion.div
                  key={article.id ?? i}
                  custom={i % LIMIT}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <NewsCard article={article} onAIExplain={onAIExplain} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={fetchMore}
                disabled={loadingMore}
                style={{
                  padding: "10px 32px",
                  borderRadius: 12,
                  border: "1px solid rgba(34,211,238,0.22)",
                  background: loadingMore
                    ? "rgba(255,255,255,0.04)"
                    : "linear-gradient(135deg,rgba(34,211,238,0.1),rgba(129,140,248,0.1))",
                  color: loadingMore ? "rgba(255,255,255,0.35)" : "#67e8f9",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: loadingMore ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: "0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.2s",
                }}
              >
                {loadingMore ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
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
        </>
      )}

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      `}</style>
    </section>
  );
}
