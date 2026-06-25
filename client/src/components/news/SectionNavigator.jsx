import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SectionNavigator({ items, sectionRefs, onSelect }) {
  const [active, setActive] = useState("latest");

  useEffect(() => {
    const activeItems = items.filter((i) => i.active);
    const observers = activeItems.map(({ id }) => {
      const el = sectionRefs.current?.[id];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [items, sectionRefs]);

  return (
    <div
      style={{
        borderRadius: 16,
        padding: "14px 12px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(4,8,26,0.6)",
        backdropFilter: "blur(14px)",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 8.5,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
          marginBottom: 10,
          margin: "0 0 10px",
        }}
      >
        Navigate
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {items.map(({ id, label, icon, active: isAvailable }) => {
          const isActive = active === id && isAvailable;
          return (
            <motion.button
              data-cursor="button"
              key={id}
              whileHover={isAvailable ? { x: 2 } : {}}
              onClick={() => isAvailable && onSelect(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 10,
                width: "100%",
                border: isActive
                  ? "1px solid rgba(34,211,238,0.22)"
                  : "1px solid transparent",
                background: isActive ? "rgba(34,211,238,0.08)" : "transparent",
                cursor: isAvailable ? "pointer" : "default",
                opacity: isAvailable ? 1 : 0.32,
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              {/* Dot indicator */}
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: isActive ? "#22d3ee" : "rgba(255,255,255,0.2)",
                  boxShadow: isActive ? "0 0 7px #22d3ee" : "none",
                  transition: "all 0.2s",
                }}
              />
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#e0f7fa" : "rgba(255,255,255,0.45)",
                  fontFamily: "'DM Sans',sans-serif",
                  lineHeight: 1.3,
                  transition: "color 0.2s",
                }}
              >
                {label}
              </span>
              {!isAvailable && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.1em",
                  }}
                >
                  soon
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
