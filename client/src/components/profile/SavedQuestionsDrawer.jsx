import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../api/axios";

const DIFF_STYLE = {
  easy: {
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.22)",
  },
  medium: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.22)",
  },
  hard: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.22)",
  },
};

function QuestionCard({ item, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const [removing, setRemoving] = useState(false);

  const diff = (item.difficulty || "easy").toLowerCase();
  const dStyle = DIFF_STYLE[diff] || DIFF_STYLE.easy;

  const handleRemove = async (e) => {
    e.stopPropagation();
    setRemoving(true);
    try {
      await axios.delete(`/bookmarks/question/${item.questionId}`);
      onRemove(item.questionId);
    } catch {
      setRemoving(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 14, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        borderRadius: 14,
        border: expanded
          ? "1px solid rgba(129,140,248,0.28)"
          : "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.25s",
      }}
    >
      {/* Question header — always visible */}
      <div
        onClick={() => setExpanded((p) => !p)}
        style={{
          padding: "14px 16px",
          cursor: "pointer",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        {/* Category icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            flexShrink: 0,
            background: "rgba(129,140,248,0.12)",
            border: "1px solid rgba(129,140,248,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          {categoryIcon(item.category)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Chips row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                background: dStyle.bg,
                border: `1px solid ${dStyle.border}`,
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: dStyle.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {item.difficulty}
            </span>
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
              }}
            >
              {item.category}
            </span>
          </div>

          {/* Question text */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 500,
              color: "#fff",
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {item.question}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            flexShrink: 0,
          }}
        >
          {/* Expand chevron */}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              display: "block",
            }}
          >
            ▼
          </motion.span>

          {/* Remove */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleRemove}
            disabled={removing}
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              border: "1px solid rgba(239,68,68,0.18)",
              background: "rgba(239,68,68,0.05)",
              color: "rgba(239,68,68,0.55)",
              cursor: removing ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) =>
              !removing &&
              (e.currentTarget.style.background = "rgba(239,68,68,0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.05)")
            }
          >
            {removing ? (
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  borderTopColor: "#f87171",
                  animation: "spin 0.7s linear infinite",
                  display: "block",
                }}
              />
            ) : (
              "✕"
            )}
          </motion.button>
        </div>
      </div>

      {/* Expanded answer area */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 16px 16px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                marginTop: 0,
                paddingTop: 14,
              }}
            >
              {/* Options grid */}
              {item.options && item.options.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  {item.options.map((opt, i) => {
                    const isAnswer = opt === item.answer;
                    return (
                      <div
                        key={i}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 9,
                          border: isAnswer
                            ? "1px solid rgba(52,211,153,0.35)"
                            : "1px solid rgba(255,255,255,0.07)",
                          background: isAnswer
                            ? "rgba(52,211,153,0.1)"
                            : "rgba(255,255,255,0.03)",
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                        }}
                      >
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: isAnswer
                              ? "rgba(52,211,153,0.2)"
                              : "rgba(255,255,255,0.06)",
                            border: isAnswer
                              ? "1px solid rgba(52,211,153,0.4)"
                              : "1px solid rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            color: isAnswer
                              ? "#34d399"
                              : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {isAnswer ? "✓" : ["A", "B", "C", "D"][i]}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontFamily: "'DM Sans', sans-serif",
                            color: isAnswer
                              ? "#a7f3d0"
                              : "rgba(255,255,255,0.6)",
                            lineHeight: 1.3,
                          }}
                        >
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Explanation */}
              {item.explanation && (
                <div
                  style={{
                    padding: "11px 13px",
                    borderRadius: 10,
                    background: "rgba(129,140,248,0.07)",
                    border: "1px solid rgba(129,140,248,0.15)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      color: "rgba(129,140,248,0.7)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    Explanation
                  </p>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.68,
                      margin: 0,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function categoryIcon(cat) {
  const map = {
    planets: "🪐",
    stars: "⭐",
    galaxy: "🌌",
    moon: "🌙",
    rockets: "🚀",
    isro: "🇮🇳",
    nasa: "🛸",
    space: "🌠",
    solar: "☀️",
    black_hole: "⚫",
    satellites: "🛰️",
  };
  const key = (cat || "").toLowerCase().replace(/\s+/g, "_");
  return map[key] || "🔭";
}

export default function SavedQuestionsDrawer({ onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "easy" | "medium" | "hard"

  useEffect(() => {
    axios
      .get("/bookmarks/question")
      .then((res) => setItems(res.data?.data ?? []))
      .catch(() => setError("Failed to load saved questions."))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = (qId) => {
    setItems((prev) => prev.filter((i) => i.questionId !== qId));
  };

  const filtered =
    filter === "all"
      ? items
      : items.filter((i) => (i.difficulty || "easy").toLowerCase() === filter);

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
          width: "min(620px,100vw)",
          zIndex: 101,
          background: "rgba(4,8,26,0.97)",
          backdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(129,140,248,0.14)",
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
                background: "rgba(129,140,248,0.12)",
                border: "1px solid rgba(129,140,248,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              ⭐
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Saved Questions
              </h2>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9.5,
                  color: "rgba(129,140,248,0.65)",
                  margin: 0,
                  letterSpacing: "0.1em",
                }}
              >
                {filtered.length} of {items.length} question
                {items.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <motion.button
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

        {/* Filter tabs */}
        {!loading && items.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "12px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              flexShrink: 0,
            }}
          >
            {["all", "easy", "medium", "hard"].map((f) => {
              const ds = DIFF_STYLE[f] || {
                color: "rgba(255,255,255,0.6)",
                bg: "rgba(255,255,255,0.05)",
                border: "rgba(255,255,255,0.12)",
              };
              const active = filter === f;
              return (
                <button
                  data-cursor="button"
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    border: active
                      ? `1px solid ${ds.border}`
                      : "1px solid rgba(255,255,255,0.08)",
                    background: active ? ds.bg : "transparent",
                    color: active ? ds.color : "rgba(255,255,255,0.38)",
                    fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    transition: "all 0.18s",
                    textTransform: "capitalize",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "14px 20px",
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
                  height: 80,
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
              <span style={{ fontSize: 40, opacity: 0.25 }}>⭐</span>
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                No saved questions yet.
                <br />
                Star questions in the Quiz section to save them.
              </p>
            </div>
          )}

          <AnimatePresence>
            {!loading &&
              !error &&
              filtered.map((item) => (
                <QuestionCard
                  key={item._id || item.questionId}
                  item={item}
                  onRemove={handleRemove}
                />
              ))}
          </AnimatePresence>

          {!loading && !error && items.length > 0 && filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "rgba(255,255,255,0.3)",
                fontSize: 13,
              }}
            >
              No {filter} questions saved.
            </div>
          )}
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </>
  );
}
