import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  quizCategories,
  categoryMeta,
  shuffleAndSlice,
} from "../data/quizData";
import QuizSetup from "../components/quiz/QuizSetup";
import QuestionCard from "../components/quiz/QuestionCard";
import QuizTimer from "../components/quiz/QuizTimer";
import QuizResultScreen from "../components/quiz/QuizResultScreen";

const PHASE = { SETUP: "setup", PLAYING: "playing", RESULT: "result" };

export default function QuizPage() {
  const [phase, setPhase] = useState(PHASE.SETUP);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [config, setConfig] = useState(null);
  const [timerKey, setTimerKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleStart = useCallback(({ category, count }) => {
    const pool = quizCategories[category] ?? [];
    const selected = shuffleAndSlice(pool, count);
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setConfig({ category, count });
    setAnswered(false);
    setTimerKey((k) => k + 1);
    setTimerRunning(true);
    setPhase(PHASE.PLAYING);
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        setTimerRunning(false);
        setPhase(PHASE.RESULT);
        return prev;
      }
      setAnswered(false);
      setTimerKey((k) => k + 1);
      setTimerRunning(true);
      return next;
    });
  }, [questions.length]);

  // change handleAnswer — remove setTimeout(advance, 1800)
  const handleAnswer = useCallback(
    (correct) => {
      if (answered) return;
      setAnswered(true);
      setTimerRunning(false);
      if (correct) setScore((s) => s + 1);
      // removed: setTimeout(advance, 1800)
    },
    [answered],
  );

  const handleTimerExpire = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    setTimerRunning(false);
    // no correct answer — advance automatically after brief pause
    setTimeout(advance, 800);
  }, [answered, advance]);

  const handleRestart = () => {
    setPhase(PHASE.SETUP);
    setAnswered(false);
  };

  const meta = config ? categoryMeta[config.category] : null;
  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AnimatePresence mode="wait">
        {phase === PHASE.SETUP && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizSetup onStart={handleStart} />
          </motion.div>
        )}

        {phase === PHASE.PLAYING && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              minHeight: "calc(100vh - 64px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px clamp(20px, 5vw, 40px)",
            }}
          >
            <div style={{ width: "100%", maxWidth: 640 }}>
              {/* Top bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 28,
                  gap: 12,
                }}
              >
                {/* Category + progress */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: meta?.color ?? "#22d3ee",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {meta?.icon} {meta?.label}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div
                    style={{
                      height: 3,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      animate={{
                        width: `${((currentIndex + 1) / questions.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${meta?.color ?? "#22d3ee"}, ${meta?.color ?? "#22d3ee"}80)`,
                      }}
                    />
                  </div>
                </div>

                {/* Timer */}
                <QuizTimer
                  onExpire={handleTimerExpire}
                  running={timerRunning}
                  resetKey={timerKey}
                />
              </div>

              {/* Question card container */}
              <div
                style={{
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(18px)",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.35)",
                  padding: "clamp(20px, 4vw, 36px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle glow corner */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${meta?.color ?? "#22d3ee"}12 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <AnimatePresence mode="wait">
                  <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    questionIndex={currentIndex}
                    totalQuestions={questions.length}
                    onAnswer={handleAnswer}
                    onNext={advance}
                    disabled={answered}
                    category={config?.category}
                  />
                </AnimatePresence>
              </div>

              {/* Score tracker */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                  gap: 6,
                }}
              >
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i < currentIndex ? 8 : 5,
                      height: 5,
                      borderRadius: 999,
                      background:
                        i < currentIndex
                          ? (meta?.color ?? "#22d3ee")
                          : i === currentIndex
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.08)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === PHASE.RESULT && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResultScreen
              score={score}
              totalQuestions={questions.length}
              category={config?.category}
              onRestart={() => handleStart(config)}
              onHome={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
