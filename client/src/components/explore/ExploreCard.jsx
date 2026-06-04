import { useState } from "react";

export default function ExploreCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        border: `1px solid ${hovered ? "rgba(34,211,238,0.28)" : "rgba(255,255,255,0.07)"}`,
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(18px)",
        boxShadow: hovered
          ? "0 8px 40px rgba(34,211,238,0.12), 0 4px 28px rgba(0,0,0,0.4)"
          : "0 4px 28px rgba(0,0,0,0.28)",
        transform: hovered
          ? "translateY(-4px) scale(1.01)"
          : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        aspectRatio: "4/3",
      }}
    >
      {/* Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg,#04081a,#0a0e2e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 48, opacity: 0.2 }}>🪐</span>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(2,5,16,0.92) 0%, rgba(2,5,16,0.3) 50%, rgba(2,5,16,0.1) 100%)"
            : "linear-gradient(to top, rgba(2,5,16,0.85) 0%, rgba(2,5,16,0.1) 60%, transparent 100%)",
          transition: "background 0.35s ease",
        }}
      />

      {/* Scan line effect on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.015) 2px, rgba(34,211,238,0.015) 4px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: hovered ? "#22d3ee" : "rgba(255,255,255,0.2)",
          boxShadow: hovered ? "0 0 10px #22d3ee" : "none",
          transition: "all 0.3s ease",
        }}
      />

      {/* 3D icon badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          padding: "3px 8px",
          borderRadius: 999,
          background: "rgba(2,5,16,0.7)",
          border: "1px solid rgba(34,211,238,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: "rgba(103,232,249,0.8)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          3D
        </span>
      </div>

      {/* Title area */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 18px",
        }}
      >
        {item.subtitle && (
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: "rgba(103,232,249,0.6)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 4px 0",
              transform: hovered ? "translateY(0)" : "translateY(4px)",
              opacity: hovered ? 1 : 0,
              transition: "all 0.3s ease 0.05s",
            }}
          >
            {item.subtitle}
          </p>
        )}
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "#ffffff",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          {item.title}
        </h3>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s ease 0.08s",
          }}
        >
          <div
            style={{
              width: 16,
              height: 1,
              background: "linear-gradient(90deg, #22d3ee, transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "rgba(103,232,249,0.7)",
            }}
          >
            Tap to explore
          </span>
        </div>
      </div>
    </div>
  );
}
