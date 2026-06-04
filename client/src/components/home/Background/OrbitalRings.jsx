import React from "react";

/**
 * OrbitalRings
 *
 * Decorative SVG ellipses that evoke satellite orbits.
 * They rotate via CSS keyframe animation at different speeds —
 * no JS, no canvas. Each ring has a subtle dash pattern and
 * a very low opacity so they stay in the background.
 */
export default function OrbitalRings() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full max-w-[600px] max-h-[600px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ring 1 — inner */}
        <ellipse
          cx="300"
          cy="300"
          rx="200"
          ry="55"
          stroke="rgba(56,189,248,0.12)"
          strokeWidth="1"
          strokeDasharray="6 10"
          style={{
            transformOrigin: "300px 300px",
            animation: "orbitSpin1 22s linear infinite",
          }}
        />
        {/* Ring 2 — mid */}
        <ellipse
          cx="300"
          cy="300"
          rx="260"
          ry="72"
          stroke="rgba(56,189,248,0.07)"
          strokeWidth="0.8"
          strokeDasharray="4 14"
          style={{
            transformOrigin: "300px 300px",
            animation: "orbitSpin2 35s linear infinite",
          }}
        />
        {/* Ring 3 — outer */}
        <ellipse
          cx="300"
          cy="300"
          rx="310"
          ry="88"
          stroke="rgba(129,140,248,0.05)"
          strokeWidth="0.6"
          style={{
            transformOrigin: "300px 300px",
            animation: "orbitSpin3 50s linear infinite reverse",
          }}
        />

        {/* Satellite dot on ring 1 */}
        <circle
          cx="300"
          cy="245"
          r="3"
          fill="rgba(56,189,248,0.6)"
          style={{
            transformOrigin: "300px 300px",
            animation: "orbitSpin1 22s linear infinite",
          }}
        />
        {/* Satellite dot on ring 2 */}
        <circle
          cx="560"
          cy="300"
          r="2"
          fill="rgba(99,102,241,0.5)"
          style={{
            transformOrigin: "300px 300px",
            animation: "orbitSpin2 35s linear infinite",
          }}
        />
      </svg>

      <style>{`
        @keyframes orbitSpin1 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitSpin2 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitSpin3 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
