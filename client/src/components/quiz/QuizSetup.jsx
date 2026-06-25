import { useState } from "react";
import { motion } from "framer-motion";
import { categoryMeta, QUESTION_COUNTS } from "../../data/quizData";
import QuizStats from "./QuizStats";

export default function QuizSetup({ onStart }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCount, setSelectedCount] = useState(10);

  const canStart = selectedCategory !== null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px clamp(20px,5vw,40px) 60px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 620 }}>
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(103,232,249,0.6)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Quiz Arena
          </p>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 5vw, 44px)",
              color: "#ffffff",
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Test Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cosmic
            </span>{" "}
            Knowledge
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 1.8vw, 15px)",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            Choose a category and challenge yourself
          </p>
        </motion.div>

        <QuizStats />

        {/* Category selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ marginBottom: 28 }}
        >
          <SectionLabel>Select Category</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 10,
            }}
          >
            {Object.values(categoryMeta).map((cat, i) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                selected={selectedCategory === cat.id}
                index={i}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? null : cat.id,
                  )
                }
              />
            ))}
          </div>
        </motion.div>

        {/* Question count */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{ marginBottom: 36 }}
        >
          <SectionLabel>Number of Questions</SectionLabel>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {QUESTION_COUNTS.map((count) => (
              <button
                data-cursor="button"
                key={count}
                onClick={() => setSelectedCount(count)}
                style={{
                  flex: 1,
                  minWidth: 60,
                  padding: "11px 8px",
                  borderRadius: 12,
                  border: `1px solid ${selectedCount === count ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.07)"}`,
                  background:
                    selectedCount === count
                      ? "rgba(34,211,238,0.1)"
                      : "rgba(255,255,255,0.025)",
                  color:
                    selectedCount === count
                      ? "#22d3ee"
                      : "rgba(255,255,255,0.5)",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(14px, 2vw, 17px)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(12px)",
                }}
              >
                {count}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            data-cursor="button"
            onClick={() =>
              canStart &&
              onStart({ category: selectedCategory, count: selectedCount })
            }
            disabled={!canStart}
            style={{
              width: "100%",
              padding: "15px 24px",
              borderRadius: 14,
              border: "none",
              background: canStart
                ? "linear-gradient(135deg, #22d3ee, #38bdf8)"
                : "rgba(255,255,255,0.06)",
              color: canStart ? "#020510" : "rgba(255,255,255,0.25)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(15px, 2vw, 17px)",
              cursor: canStart ? "pointer" : "not-allowed",
              letterSpacing: "0.01em",
              transition: "all 0.25s ease",
              boxShadow: canStart ? "0 0 40px rgba(34,211,238,0.2)" : "none",
            }}
            onMouseEnter={(e) => {
              if (canStart) e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              if (canStart) e.currentTarget.style.opacity = "1";
            }}
          >
            {canStart
              ? `Launch Quiz — ${selectedCount} Questions`
              : "Select a Category to Begin"}
          </button>
          {!canStart && (
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.2)",
                textAlign: "center",
                marginTop: 10,
                letterSpacing: "0.08em",
              }}
            >
              ← Choose a category above
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: "rgba(255,255,255,0.3)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: 12,
      }}
    >
      {children}
    </p>
  );
}

function CategoryCard({ cat, selected, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      data-cursor="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: "left",
        padding: "16px 18px",
        borderRadius: 16,
        border: `1px solid ${selected ? cat.border : hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        background: selected
          ? cat.gradient
          : hovered
            ? "rgba(255,255,255,0.03)"
            : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(18px)",
        cursor: "pointer",
        transition: "all 0.22s ease",
        boxShadow: selected ? `0 0 30px ${cat.color}18` : "none",
        transform: selected ? "scale(1.01)" : "scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: cat.color,
            boxShadow: `0 0 8px ${cat.color}`,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 20 }}>{cat.icon}</span>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: selected ? cat.color : "#ffffff",
            transition: "color 0.2s ease",
          }}
        >
          {cat.label}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {cat.description}
      </p>
    </motion.button>
  );
}
