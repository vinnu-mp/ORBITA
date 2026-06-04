import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMER_SECONDS = 20;

export default function QuizTimer({ onExpire, running, resetKey }) {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [resetKey]);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, resetKey]);

  const progress = timeLeft / TIMER_SECONDS;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference * progress;

  const urgent = timeLeft <= 5;
  const color = urgent ? "#f87171" : timeLeft <= 8 ? "#fbbf24" : "#22d3ee";

  return (
    <div
      style={{
        position: "relative",
        width: 68,
        height: 68,
        flexShrink: 0,
      }}
    >
      <svg
        width="68"
        height="68"
        style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}
      >
        {/* Track */}
        <circle
          cx="34"
          cy="34"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        {/* Progress */}
        <motion.circle
          cx="34"
          cy="34"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - strokeDash}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          transition={{ duration: 0.4, ease: "linear" }}
        />
      </svg>

      {/* Number */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={timeLeft}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: urgent ? 20 : 18,
              fontWeight: 700,
              color,
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
          >
            {timeLeft}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Pulse ring when urgent */}
      {urgent && (
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `1px solid ${color}`,
            opacity: 0.3,
            animation: "timer-pulse 0.8s ease-in-out infinite",
          }}
        />
      )}

      <style>{`
        @keyframes timer-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.12); opacity: 0.06; }
        }
      `}</style>
    </div>
  );
}
