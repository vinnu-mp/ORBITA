import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRank, categoryMeta } from "../../data/quizData";
import axiosInstance from "../../api/axios";

export default function QuizResultScreen({
  score,
  totalQuestions,
  category,
  onRestart,
  onHome,
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const rank = getRank(percentage);
  const meta = categoryMeta[category];
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [animScore, setAnimScore] = useState(0);

  // Animate score counter
  useEffect(() => {
    let frame;
    let start = null;
    const duration = 1200;
    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setAnimScore(Math.round(progress * score));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  // Save attempt
  useEffect(() => {
    const save = async () => {
      try {
        await axiosInstance.post("/quiz/attempt", {
          category,
          score,
          totalQuestions,
        });
        setSaved(true);
      } catch {
        setSaveError(true);
      }
    };
    save();
  }, []);

  const STAT_ITEMS = [
    { label: "Correct", value: score, color: "#4ade80" },
    { label: "Incorrect", value: totalQuestions - score, color: "#f87171" },
    { label: "Accuracy", value: `${percentage}%`, color: rank.color },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px clamp(20px, 5vw, 40px) 40px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: meta?.color || "#22d3ee",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {meta?.icon} {meta?.label}
          </span>
        </motion.div>

        {/* Rank */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 200 }}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <div
            style={{
              fontSize: "clamp(48px, 10vw, 72px)",
              marginBottom: 10,
              filter: "drop-shadow(0 0 20px rgba(34,211,238,0.3))",
            }}
          >
            {rank.icon}
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(24px, 5vw, 38px)",
              color: rank.color,
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            {rank.label}
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            Mission Complete · {totalQuestions} Questions
          </p>
        </motion.div>

        {/* Score ring card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          style={{
            borderRadius: 20,
            border: `1px solid ${rank.color}22`,
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(18px)",
            boxShadow: `0 8px 40px rgba(0,0,0,0.35), 0 0 60px ${rank.color}10`,
            padding: "32px 28px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {/* Big score */}
          <div style={{ marginBottom: 28 }}>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(52px, 12vw, 80px)",
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {animScore}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(18px, 4vw, 28px)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              /{totalQuestions}
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 4,
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                height: "100%",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${rank.color}, ${rank.color}80)`,
                boxShadow: `0 0 8px ${rank.color}60`,
              }}
            />
          </div>

          {/* Stat pills */}
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {STAT_ITEMS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                  minWidth: 80,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(18px, 3vw, 24px)",
                    color: s.color,
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Save status */}
        {(saved || saveError) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: saved ? "rgba(74,222,128,0.6)" : "rgba(248,113,113,0.5)",
              textAlign: "center",
              letterSpacing: "0.08em",
              marginBottom: 20,
            }}
          >
            {saved
              ? "✓ Result saved to your profile"
              : "⚠ Could not save result"}
          </motion.p>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <button
            data-cursor="button"
            onClick={onRestart}
            style={{
              flex: 1,
              minWidth: 140,
              padding: "13px 20px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #22d3ee, #38bdf8)",
              border: "none",
              color: "#020510",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Play Again
          </button>

          <button
            data-cursor="button"
            onClick={onHome}
            style={{
              flex: 1,
              minWidth: 140,
              padding: "13px 20px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            Back to Arena
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
