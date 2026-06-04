import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axios";

export default function QuizStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/quiz/stats");

        setStats(res.data.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <StatsSkeleton />;
  if (error || !stats) return null;

  const bestRecent =
    stats.attempts?.length > 0
      ? Math.max(...stats.attempts.slice(0, 5).map((a) => a.percentage ?? 0))
      : 0;

  const CARDS = [
    {
      label: "Quizzes Played",
      value: stats.totalAttempts ?? 0,
      icon: "🎮",
      color: "#22d3ee",
    },
    {
      label: "Average Score",
      value: `${Math.round(stats.averagePercentage ?? 0)}%`,
      icon: "📊",
      color: "#818cf8",
    },
    {
      label: "Best Recent",
      value: `${Math.round(bestRecent)}%`,
      icon: "🏆",
      color: "#67e8f9",
    },
  ];

  return (
    <div style={{ marginBottom: 40 }}>
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        Your Stats
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(18px)",
              padding: "clamp(12px,2vw,18px) clamp(10px,1.5vw,14px)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "clamp(20px,4vw,28px)", marginBottom: 6 }}>
              {card.icon}
            </div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(18px,3.5vw,26px)",
                color: card.color,
                lineHeight: 1.1,
                marginBottom: 4,
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(8px,1.2vw,10px)",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {card.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 10,
        marginBottom: 40,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            height: 90,
            borderRadius: 16,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            animation: "shimmer 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
