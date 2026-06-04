import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SPACE_COMPONENTS from "../data/spaceComponents";
import ComponentCard from "../components/space/ComponentCard";
import AIExplainModal from "../components/news/AIExplainModal";

export default function SpacePage() {
  const [aiItem, setAiItem] = useState(null);

  const toAiArticle = (item) => ({
    title: item.title,
    image: item.image,
    date: null,
    description: item.aiContext,
    officialUrl: null,
  });

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        color: "#fff",
        minHeight: "100vh",
        paddingBottom: 80,
      }}
    >
      {/* Page header */}
      <div
        style={{
          padding: "clamp(28px,5vw,52px) 16px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 0%,rgba(129,140,248,0.1) 0%,transparent 65%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.6rem,5vw,3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              background:
                "linear-gradient(135deg,#fff 0%,#c7d2fe 45%,#818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Space Technologies
          </h1>
          <p
            style={{
              marginTop: 10,
              color: "rgba(255,255,255,0.35)",
              fontSize: "clamp(12px,3vw,14px)",
              lineHeight: 1.65,
              maxWidth: 460,
              margin: "10px auto 0",
            }}
          >
            Explore the machines and systems pushing humanity beyond Earth —
            with AI-powered deep dives into each technology.
          </p>
        </motion.div>
      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {SPACE_COMPONENTS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.48,
              delay: i * 0.07,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <ComponentCard item={item} onAIExplain={() => setAiItem(item)} />
          </motion.div>
        ))}
      </div>

      {/* AI modal */}
      <AnimatePresence>
        {aiItem && (
          <AIExplainModal
            article={toAiArticle(aiItem)}
            aiType="component"
            onClose={() => setAiItem(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
      `}</style>
    </div>
  );
}
