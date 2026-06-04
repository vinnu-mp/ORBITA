import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";
import SavedNewsDrawer from "../components/profile/SavedNewsDrawer";
import SavedQuestionsDrawer from "../components/profile/SavedQuestionsDrawer";

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Avatar({ name }) {
  const initials = (name || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        width: 88,
        height: 88,
        borderRadius: "50%",
        flexShrink: 0,
        background:
          "linear-gradient(135deg, #22d3ee 0%, #38bdf8 40%, #818cf8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 28,
        color: "#020510",
        boxShadow:
          "0 0 32px rgba(34,211,238,0.35), 0 0 0 3px rgba(34,211,238,0.15)",
      }}
    >
      {initials}
    </div>
  );
}

function StatCard({ value, label, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        flex: 1,
        minWidth: 110,
        padding: "18px 16px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      whileHover={{
        borderColor: "rgba(34,211,238,0.22)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(34,211,238,0.08)",
      }}
    >
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: "1.7rem",
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9.5,
          color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function ActionCard({ icon, label, count, color, onClick, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: 160,
        padding: "22px 20px",
        borderRadius: 18,
        border: `1px solid ${color}22`,
        background: `linear-gradient(135deg, ${color}0d, rgba(255,255,255,0.02))`,
        backdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
        cursor: "pointer",
        textAlign: "left",
        boxShadow: `0 4px 24px rgba(0,0,0,0.25)`,
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            margin: "0 0 3px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: `${color}99`,
            margin: 0,
            letterSpacing: "0.1em",
          }}
        >
          {count} saved
        </p>
      </div>
      <div
        style={{
          marginTop: "auto",
          alignSelf: "flex-end",
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color,
          fontWeight: 500,
        }}
      >
        View all
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6h8M6 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.button>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawer, setDrawer] = useState(null); // "news" | "questions" | null

  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => setProfile(res.data?.data))
      .catch(() => setError("Failed to load profile."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2.5px solid rgba(34,211,238,0.25)",
            borderTopColor: "#22d3ee",
            animation: "spin 0.85s linear infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Loading profile
        </span>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 36 }}>⚠️</span>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{error}</p>
      </div>
    );

  const { user, stats } = profile;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#fff",
        minHeight: "100vh",
        maxWidth: 860,
        margin: "0 auto",
        padding: "44px 16px 100px",
      }}
    >
      {/* ── Ambient glow ── */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Header: avatar + info ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "28px 28px",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(18px)",
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <Avatar name={user.fullname || user.username} />

          <div style={{ flex: 1, minWidth: 180 }}>
            {/* Name */}
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: "0 0 4px",
              }}
            >
              {user.fullname || user.username}
            </h1>

            {/* Username */}
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: "rgba(34,211,238,0.7)",
                margin: "0 0 10px",
                letterSpacing: "0.08em",
              }}
            >
              @{user.username}
            </p>

            {/* Meta chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                ✉️ {user.email}
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                🗓️ Joined {fmtDate(user.createdAt)}
              </div>
            </div>
          </div>

          {/* Live badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 13px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.22)",
              background: "rgba(52,211,153,0.06)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#34d399",
                display: "block",
                animation: "pulse 1.8s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9.5,
                color: "rgba(52,211,153,0.8)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Active
            </span>
          </div>
        </motion.div>

        {/* ── Section label ── */}
        <SectionLabel label="Mission Stats" icon="📊" />

        {/* ── Stats row ── */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          <StatCard
            value={stats.quizzesAttempted}
            label="Quizzes Taken"
            icon="🧠"
            delay={0.05}
          />
          <StatCard
            value={`${stats.averageScore}%`}
            label="Avg Score"
            icon="🎯"
            delay={0.1}
          />
          <StatCard
            value={stats.bookmarkedNewsCount}
            label="News Saved"
            icon="📰"
            delay={0.15}
          />
          <StatCard
            value={stats.bookmarkedQuestionsCount}
            label="Questions Saved"
            icon="⭐"
            delay={0.2}
          />
        </div>

        {/* ── Section label ── */}
        <SectionLabel label="Saved Collections" icon="🗂️" />

        {/* ── Action cards ── */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <ActionCard
            icon="📰"
            label="Saved News"
            count={stats.bookmarkedNewsCount}
            color="#22d3ee"
            delay={0.22}
            onClick={() => setDrawer("news")}
          />
          <ActionCard
            icon="⭐"
            label="Saved Questions"
            count={stats.bookmarkedQuestionsCount}
            color="#818cf8"
            delay={0.28}
            onClick={() => setDrawer("questions")}
          />
        </div>

        {/* ── Score visual ── */}
        <SectionLabel label="Performance" icon="📈" />
        <ScoreBar score={stats.averageScore} quizzes={stats.quizzesAttempted} />
      </div>

      {/* ── Drawers ── */}
      <AnimatePresence>
        {drawer === "news" && (
          <SavedNewsDrawer onClose={() => setDrawer(null)} />
        )}
        {drawer === "questions" && (
          <SavedQuestionsDrawer onClose={() => setDrawer(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.38} }
        @keyframes spin   { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

/* ── Helpers ── */
function SectionLabel({ label, icon }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.05rem",
          color: "#fff",
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(34,211,238,0.3), transparent)",
        }}
      />
    </div>
  );
}

function ScoreBar({ score, quizzes }) {
  const level =
    score >= 80
      ? "Expert"
      : score >= 60
        ? "Advanced"
        : score >= 40
          ? "Intermediate"
          : "Beginner";
  const color =
    score >= 80
      ? "#22d3ee"
      : score >= 60
        ? "#818cf8"
        : score >= 40
          ? "#f59e0b"
          : "#f87171";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.3 }}
      style={{
        padding: "22px 24px",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
              margin: "0 0 2px",
            }}
          >
            Overall Accuracy
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
            }}
          >
            Based on {quizzes} quiz attempt{quizzes !== 1 ? "s" : ""}
          </p>
        </div>
        <div
          style={{
            padding: "4px 14px",
            borderRadius: 999,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color,
            letterSpacing: "0.1em",
          }}
        >
          {level}
        </div>
      </div>

      {/* Bar track */}
      <div
        style={{
          height: 8,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{
            duration: 1.1,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 12px ${color}55`,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          0%
        </span>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color,
          }}
        >
          {score}%
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          100%
        </span>
      </div>
    </motion.div>
  );
}
