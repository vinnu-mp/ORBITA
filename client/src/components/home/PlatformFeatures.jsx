import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// ── Feature data ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "📚",
    gradient: "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(139,92,246,0.12))",
    border: "rgba(99,102,241,0.28)",
    glow: "rgba(99,102,241,0.15)",
    accent: "#a78bfa",
    title: "Learning & Content",
    desc: "Verified space facts, official documentation, and structured learning modules curated by experts.",
    tags: ["Space Facts", "Docs", "Modules"],
  },
  {
    icon: "🌍",
    gradient: "linear-gradient(135deg,rgba(34,211,238,0.16),rgba(14,165,233,0.1))",
    border: "rgba(34,211,238,0.26)",
    glow: "rgba(34,211,238,0.14)",
    accent: "#22d3ee",
    title: "Real-Time Updates",
    desc: "Live global space news integration — stay current with every mission, launch, and discovery as it happens.",
    tags: ["Live Feed", "Global News"],
  },
  {
    icon: "🪐",
    gradient: "linear-gradient(135deg,rgba(251,191,36,0.14),rgba(245,158,11,0.08))",
    border: "rgba(251,191,36,0.24)",
    glow: "rgba(251,191,36,0.12)",
    accent: "#fbbf24",
    title: "3D Exploration",
    desc: "Interactive 3D Solar System powered by Three.js. Explore planets, orbits, and celestial bodies in real time.",
    tags: ["Three.js", "Solar System", "Orbits"],
  },
  {
    icon: "🤖",
    gradient: "linear-gradient(135deg,rgba(34,211,238,0.14),rgba(129,140,248,0.14))",
    border: "rgba(129,140,248,0.26)",
    glow: "rgba(129,140,248,0.14)",
    accent: "#818cf8",
    title: "AI Assistant",
    desc: "Smart space chatbot powered by Groq. Ask anything — get instant, clear explanations of complex concepts.",
    tags: ["Groq AI", "Chat", "Explain"],
  },
  {
    icon: "🎮",
    gradient: "linear-gradient(135deg,rgba(52,211,153,0.14),rgba(16,185,129,0.09))",
    border: "rgba(52,211,153,0.24)",
    glow: "rgba(52,211,153,0.12)",
    accent: "#34d399",
    title: "Gamification",
    desc: "Space quizzes, progress tracking, and achievement milestones. Learn while you play and level up your knowledge.",
    tags: ["Quizzes", "Progress", "Achievements"],
  },
  {
    icon: "🔖",
    gradient: "linear-gradient(135deg,rgba(244,114,182,0.14),rgba(236,72,153,0.09))",
    border: "rgba(244,114,182,0.24)",
    glow: "rgba(244,114,182,0.12)",
    accent: "#f472b6",
    title: "Personalization",
    desc: "Bookmark articles, save content, and track your full learning history — your space journey, your way.",
    tags: ["Bookmarks", "History", "Saved"],
  },
];

// ── Stat strip ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "100+", label: "Launches Tracked",   icon: "🚀" },
  { value: "3D",   label: "Space Visualizer",   icon: "🪐" },
  { value: "Live", label: "Space News Feed",    icon: "📡" },
  { value: "24/7", label: "AI Support",         icon: "🤖" },
];

// ── Framer variants ────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ── Single feature card ───────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index % 3}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.22 }}
      style={{
        borderRadius: 22,
        border: `1px solid ${feature.border}`,
        background: feature.gradient,
        backdropFilter: "blur(18px)",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        minHeight: 280,
        boxShadow: `0 4px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)`,
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 12px 48px rgba(0,0,0,0.4), 0 0 32px ${feature.glow}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 4px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)`;
      }}
    >
      {/* Background glow blob */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${feature.glow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 15,
        border: `1px solid ${feature.border}`,
        background: "rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, flexShrink: 0,
      }}>
        {feature.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: 19,
        letterSpacing: "-0.015em", color: "#fff", margin: 0,
      }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 14, color: "rgba(255,255,255,0.44)",
        lineHeight: 1.76, margin: 0, flex: 1,
      }}>
        {feature.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {feature.tags.map(tag => (
          <span key={tag} style={{
            padding: "3px 9px", borderRadius: 999,
            border: `1px solid ${feature.border}`,
            background: "rgba(255,255,255,0.04)",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, letterSpacing: "0.08em",
            color: feature.accent,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Stat chip ─────────────────────────────────────────────────────────────────
function StatChip({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 6, padding: "20px 24px", borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)", flex: 1, minWidth: 110,
      }}
    >
      <span style={{ fontSize: 24 }}>{stat.icon}</span>
      <span style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 900,
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        background: "linear-gradient(135deg,#fff 0%,#93c5fd 60%,#818cf8 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", lineHeight: 1,
      }}>
        {stat.value}
      </span>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)", textAlign: "center",
      }}>
        {stat.label}
      </span>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PlatformFeatures() {
  const headerRef  = useRef(null);
  const headerView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section style={{
      position: "relative", padding: "96px 0 80px",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Top divider glow line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.25),rgba(129,140,248,0.25),transparent)",
      }} />

      {/* Ambient glow behind section */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: "70%", height: 400,
        background: "radial-gradient(ellipse at center,rgba(129,140,248,0.05) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Section header ── */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={headerView ? "visible" : "hidden"}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 14px", borderRadius: 999, marginBottom: 18,
              border: "1px solid rgba(129,140,248,0.25)",
              background: "rgba(129,140,248,0.07)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%",
              background: "#818cf8", display: "block",
              animation: "pulse 2s infinite" }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(167,139,250,0.9)",
            }}>
              Platform Features
            </span>
          </motion.div>

          <motion.h2
            custom={1} variants={fadeUp} initial="hidden"
            animate={headerView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              lineHeight: 1.05, letterSpacing: "-0.025em",
              background: "linear-gradient(135deg,#fff 0%,#93c5fd 50%,#818cf8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", margin: "0 0 16px",
            }}
          >
            Everything you need to<br />explore the cosmos.
          </motion.h2>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden"
            animate={headerView ? "visible" : "hidden"}
            style={{
              fontSize: 15, color: "rgba(255,255,255,0.38)",
              lineHeight: 1.72, maxWidth: 480, margin: "0 auto",
            }}
          >
            From real-time space news to 3D planet exploration and AI-powered
            explanations — Orbita is your complete space intelligence platform.
          </motion.p>
        </div>

        {/* ── Stat strip ── */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap",
          justifyContent: "center", marginBottom: 64,
        }}>
          {STATS.map((stat, i) => (
            <StatChip key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* ── Feature cards grid — max 3 cols ── */}
        <div style={{
          display: "grid", gap: 20,
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
          className="features-grid"
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <BottomCTA />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        /* Grid responsiveness — 3 cols desktop, 2 tablet, 1 mobile */
        .features-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ── Bottom CTA — auth-aware ───────────────────────────────────────────────────
function BottomCTA() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-40px" });
  const isLoggedIn = useSelector((state) => state.auth.status);

  // Content switches based on auth state
  const content = isLoggedIn
    ? {
        eyebrow:  "Welcome back, Explorer",
        heading:  "Continue your mission.",
        sub:      "Pick up right where you left off — your news, quizzes, and saved content are waiting.",
        primary:  { label: "Go to News →",      to: "/news"      },
        secondary:{ label: "Open 3D Explorer",  to: "/vizualise" },
      }
    : {
        eyebrow:  "Ready to launch?",
        heading:  "Start your space journey today.",
        sub:      "Create a free account and unlock live news, AI explanations, 3D exploration, quizzes, and more.",
        primary:  { label: "Create Free Account →", to: "/signup" },
        secondary:{ label: "Login",                 to: "/login"  },
      };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        marginTop: 72, borderRadius: 24,
        border: "1px solid rgba(34,211,238,0.15)",
        background: "linear-gradient(135deg,rgba(34,211,238,0.06),rgba(129,140,248,0.06))",
        backdropFilter: "blur(16px)",
        padding: "52px 36px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: -60, left: "18%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(34,211,238,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -60, right: "18%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(129,140,248,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          marginBottom: 16,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%",
            background: isLoggedIn ? "#34d399" : "#22d3ee",
            display: "block", animation: "pulse 2s infinite" }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: isLoggedIn ? "rgba(52,211,153,0.8)" : "rgba(34,211,238,0.75)",
          }}>
            {content.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff",
          margin: "0 0 14px",
        }}>
          {content.heading}
        </h3>

        {/* Sub */}
        <p style={{
          fontSize: 14.5, color: "rgba(255,255,255,0.36)",
          lineHeight: 1.68, maxWidth: 440, margin: "0 auto 30px",
        }}>
          {content.sub}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={content.primary.to}
              style={{
                padding: "12px 28px", borderRadius: 12, textDecoration: "none",
                background: "linear-gradient(135deg,#22d3ee,#38bdf8,#818cf8)",
                color: "#020510", fontWeight: 700, fontSize: 14,
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em",
                boxShadow: "0 0 18px rgba(34,211,238,0.28)",
                display: "inline-block",
              }}
            >
              {content.primary.label}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={content.secondary.to}
              style={{
                padding: "12px 28px", borderRadius: 12, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.65)", fontWeight: 500, fontSize: 14,
                fontFamily: "'DM Sans', sans-serif", display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              {content.secondary.label}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
