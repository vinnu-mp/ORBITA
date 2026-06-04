import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../api/axios";

const DIFFICULTY_COLORS = {
  easy: {
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.2)",
  },
  medium: {
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
  hard: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
};

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onNext,
  disabled,
  category,
}) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null); // "saved" | "exists" | "error"

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setBookmarked(false);
    setSaving(false);
    setSaveMsg(null);
  }, [question?.id]);

  const handleSelect = (option) => {
    if (disabled || selected !== null) return;
    const correct = option === question.answer;
    setSelected(option);
    setTimeout(() => setRevealed(true), 300);
    onAnswer(correct);
  };

  const handleBookmark = async () => {
    if (saving || bookmarked) return;
    setSaving(true);
    try {
      await axiosInstance.post("/bookmarks/question", {
        questionId: question.id,
        category: category ?? "general",
        question: question.question,
        options: question.options,
        answer: question.answer,
        explanation: question.explanation,
        difficulty: question.difficulty,
      });
      setBookmarked(true);
      setSaveMsg("saved");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) {
        // already bookmarked
        setBookmarked(true);
        setSaveMsg("exists");
      } else {
        setSaveMsg("error");
      }
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 2500);
    }
  };

  const getOptionState = (option) => {
    if (!selected) return "idle";
    if (option === question.answer) return "correct";
    if (option === selected) return "wrong";
    return "dim";
  };

  const diff = DIFFICULTY_COLORS[question.difficulty] || DIFFICULTY_COLORS.easy;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: "100%" }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 22,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Q{questionIndex + 1} / {totalQuestions}
        </span>
        <div
          style={{
            padding: "2px 10px",
            borderRadius: 999,
            background: diff.bg,
            border: `1px solid ${diff.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: diff.color,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Question text */}
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(16px, 2.5vw, 22px)",
          color: "#ffffff",
          lineHeight: 1.4,
          margin: "0 0 28px",
          letterSpacing: "-0.01em",
        }}
      >
        {question.question}
      </p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((option, i) => (
          <OptionButton
            key={option}
            option={option}
            index={i}
            state={getOptionState(option)}
            onClick={() => handleSelect(option)}
            disabled={disabled || selected !== null}
          />
        ))}
      </div>

      {/* Explanation + actions */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ marginTop: 20, overflow: "hidden" }}
          >
            {/* Explanation box */}
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 14,
                background: "rgba(34,211,238,0.05)",
                border: "1px solid rgba(34,211,238,0.15)",
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "rgba(103,232,249,0.6)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0 0 6px",
                }}
              >
                Explanation
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {question.explanation}
              </p>
            </div>

            {/* Action row — bookmark left, next right */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {/* Next button */}
              <button
                onClick={onNext}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(34,211,238,0.3)",
                  background: "rgba(34,211,238,0.08)",
                  color: "#22d3ee",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34,211,238,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(34,211,238,0.08)";
                }}
              >
                Next Question →
              </button>
              {/* Bookmark button */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={handleBookmark}
                  disabled={saving || bookmarked}
                  title={bookmarked ? "Saved" : "Save question"}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    border: `1px solid ${bookmarked ? "rgba(129,140,248,0.4)" : "rgba(255,255,255,0.1)"}`,
                    background: bookmarked
                      ? "rgba(129,140,248,0.12)"
                      : "rgba(255,255,255,0.04)",
                    color: bookmarked ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                    cursor: bookmarked
                      ? "default"
                      : saving
                        ? "wait"
                        : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    transition: "all 0.22s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!bookmarked && !saving) {
                      e.currentTarget.style.borderColor =
                        "rgba(129,140,248,0.35)";
                      e.currentTarget.style.background =
                        "rgba(129,140,248,0.08)";
                      e.currentTarget.style.color = "#a5b4fc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!bookmarked) {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    }
                  }}
                >
                  {saving ? (
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "2px solid rgba(165,180,252,0.3)",
                        borderTopColor: "#a5b4fc",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                  ) : bookmarked ? (
                    "🔖"
                  ) : (
                    "🔖"
                  )}
                </button>

                {/* Toast feedback */}
                <AnimatePresence>
                  {saveMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                        padding: "5px 10px",
                        borderRadius: 8,
                        background:
                          saveMsg === "error"
                            ? "rgba(248,113,113,0.15)"
                            : "rgba(129,140,248,0.15)",
                        border: `1px solid ${saveMsg === "error" ? "rgba(248,113,113,0.3)" : "rgba(129,140,248,0.3)"}`,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        color: saveMsg === "error" ? "#f87171" : "#a5b4fc",
                        pointerEvents: "none",
                      }}
                    >
                      {saveMsg === "saved" && "✓ Saved"}
                      {saveMsg === "exists" && "Already saved"}
                      {saveMsg === "error" && "Failed to save"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}

function OptionButton({ option, index, state, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);

  const stateStyles = {
    idle: {
      bg: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
      border: hovered ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.07)",
      color: hovered ? "#ffffff" : "rgba(255,255,255,0.75)",
      shadow: hovered ? "0 0 20px rgba(34,211,238,0.08)" : "none",
      letterBg: hovered ? "rgba(34,211,238,0.12)" : "rgba(255,255,255,0.04)",
      letterColor: hovered ? "#22d3ee" : "rgba(255,255,255,0.3)",
    },
    correct: {
      bg: "rgba(74,222,128,0.08)",
      border: "rgba(74,222,128,0.4)",
      color: "#ffffff",
      shadow: "0 0 24px rgba(74,222,128,0.15)",
      letterBg: "rgba(74,222,128,0.15)",
      letterColor: "#4ade80",
    },
    wrong: {
      bg: "rgba(248,113,113,0.08)",
      border: "rgba(248,113,113,0.4)",
      color: "#ffffff",
      shadow: "0 0 24px rgba(248,113,113,0.15)",
      letterBg: "rgba(248,113,113,0.15)",
      letterColor: "#f87171",
    },
    dim: {
      bg: "rgba(255,255,255,0.01)",
      border: "rgba(255,255,255,0.04)",
      color: "rgba(255,255,255,0.25)",
      shadow: "none",
      letterBg: "rgba(255,255,255,0.02)",
      letterColor: "rgba(255,255,255,0.15)",
    },
  };

  const s = stateStyles[state] || stateStyles.idle;
  const letters = ["A", "B", "C", "D"];

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      onClick={onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 16px",
        borderRadius: 14,
        border: `1px solid ${s.border}`,
        background: s.bg,
        boxShadow: s.shadow,
        backdropFilter: "blur(12px)",
        cursor: disabled ? "default" : "pointer",
        textAlign: "left",
        transition: "all 0.22s ease",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: s.letterBg,
          border: `1px solid ${s.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.22s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            color: s.letterColor,
            transition: "color 0.22s ease",
          }}
        >
          {letters[index]}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(13px, 1.8vw, 15px)",
          color: s.color,
          lineHeight: 1.4,
          transition: "color 0.22s ease",
        }}
      >
        {option}
      </span>
      {state === "correct" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ marginLeft: "auto", fontSize: 16, flexShrink: 0 }}
        >
          ✓
        </motion.span>
      )}
      {state === "wrong" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            marginLeft: "auto",
            fontSize: 14,
            color: "#f87171",
            flexShrink: 0,
          }}
        >
          ✕
        </motion.span>
      )}
    </motion.button>
  );
}
