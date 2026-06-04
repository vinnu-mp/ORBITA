import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ComponentCard({ item, onAIExplain }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        borderRadius: 20,
        border: hovered
          ? "1px solid rgba(129,140,248,0.32)"
          : "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(18px)",
        overflow: "hidden",
        display: "flex",
        boxShadow: hovered
          ? "0 16px 52px rgba(0,0,0,0.45), 0 0 0 1px rgba(129,140,248,0.1)"
          : "0 4px 28px rgba(0,0,0,0.28)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      className="comp-card"
    >
      {/* Image */}
      <div
        style={{
          width: 260,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
        className="comp-card-img"
      >
        <motion.img
          src={item.image}
          alt={item.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            minHeight: 220,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background =
              "linear-gradient(135deg,#060d20,#0d1a40)";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right,transparent 55%,rgba(2,5,16,0.5))",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(2,5,16,0.5) 0%,transparent 45%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "22px 24px 22px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 11,
          minWidth: 0,
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.05rem,2.5vw,1.3rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#fff",
            margin: 0,
          }}
        >
          {item.title}
        </h2>

        {/* Full description — no truncation */}
        <p
          style={{
            fontSize: "clamp(12px,2vw,13.5px)",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.75,
            margin: 0,
            flex: 1,
          }}
        >
          {item.description}
        </p>

        {/* Example chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              color: "rgba(255,255,255,1)",
              letterSpacing: "0.1em",
              flexShrink: 0,
            }}
          >
            Ex:
          </span>
          {item.examples.map((ex) => (
            <span
              key={ex}
              style={{
                padding: "3px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontFamily: "'DM Mono',monospace",
                border: "1px solid rgba(129,140,248,0.2)",
                background: "rgba(129,140,248,0.07)",
                color: "rgba(165,180,252,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              {ex}
            </span>
          ))}
        </div>

        {/* AI Explain button only */}
        <div style={{ marginTop: 2 }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onAIExplain}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              borderRadius: 10,
              border: "none",
              background:
                "linear-gradient(135deg,rgba(129,140,248,0.18),rgba(34,211,238,0.14))",
              outline: "1px solid rgba(129,140,248,0.25)",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#a5b4fc",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle
                cx="7"
                cy="7"
                r="6"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M7 5.5v3M7 4.2v.3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            AI Explain
          </motion.button>
        </div>
      </div>

      <style>{`
        @media(max-width:620px){
          .comp-card{ flex-direction:column !important; }
          .comp-card-img{ width:100% !important; height:210px !important; }
          .comp-card-img img{ min-height:210px !important; }
        }
      `}</style>
    </motion.article>
  );
}
