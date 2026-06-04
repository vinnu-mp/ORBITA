import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import gsap from "gsap";

const FEATURES = [
  { icon: "🛰️", label: "Live Launches" },
  { icon: "🤖", label: "AI Explain" },
  { icon: "🌍", label: "3D Explorer" },
  { icon: "📰", label: "Space News" },
  { icon: "🧠", label: "Quiz Mode" },
  { icon: "🔖", label: "Bookmarks" },
];

const LETTERS = "ORBITA".split("");

export default function HeroText() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

  const wrapperRef = useRef(null);
  const lettersRef = useRef([]);
  const underlineRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const pillsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Badge fade up
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      // 2. Letters drop in with stagger
      gsap.from(lettersRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.55,
        ease: "back.out(1.4)",
        stagger: 0.07,
        delay: 0.3,
      });

      // 3. Underline sweep
      gsap.from(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.7,
        ease: "power3.out",
        delay: 0.75,
      });

      // 4. Subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.85,
      });

      // 5. Pills stagger
      gsap.from(pillsRef.current, {
        opacity: 0,
        y: 8,
        scale: 0.92,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.07,
        delay: 1.0,
      });

      // 6. CTA
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.35,
      });

      // 7. Continuous left-to-right gradient sweep on title
      // Each letter has a gradient background; we shift background-position
      // with a stagger loop to simulate a flowing sweep
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes badgeDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(34,211,238,0.9); }
          50%       { opacity: 0.4; box-shadow: 0 0 2px rgba(34,211,238,0.3); }
        }

        .orbita-title {
  font-family: 'Syne', 'Arial Black', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 5rem);
  line-height: 1;
  letter-spacing: -0.04em;

  background: linear-gradient(
    90deg,
    #67e8f9,
    #818cf8,
    #38bdf8,
    #67e8f9
  );

  background-size: 300% auto;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  animation: orbitaGradient 6s linear infinite;

  filter: drop-shadow(0 0 18px rgba(34,211,238,0.18));
}

@keyframes orbitaGradient {
  0% {
    background-position: 0% center;
  }

  100% {
    background-position: 300% center;
  }
}

        /* If background-clip doesn't work, show plain color */
        @supports not (-webkit-background-clip: text) {
          .orbita-letter {
            background: none !important;
            -webkit-text-fill-color: #67e8f9 !important;
            color: #67e8f9 !important;
          }
        }

        .badge-dot {
          animation: badgeDot 2s ease-in-out infinite;
        }

        .hero-cta-btn {
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .hero-cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 28px rgba(34,211,238,0.28);
        }
      `}</style>

      <div
        ref={wrapperRef}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "999px",
            width: "fit-content",
            border: "1px solid rgba(34,211,238,0.2)",
            background: "rgba(34,211,238,0.05)",
          }}
        >
          <span
            className="badge-dot"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22d3ee",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(103,232,249,0.8)",
            }}
          >
            Space Learning Platform
          </span>
        </div>

        {/* ORBITA */}
        {/* ORBITA */}
        <div>
          <h1
            ref={(el) => (lettersRef.current = [el])}
            className="orbita-title"
            style={{
              margin: 0,
              padding: 0,
              lineHeight: 1,
            }}
          >
            ORBITA
          </h1>

          <div
            ref={underlineRef}
            style={{
              height: "3px",
              borderRadius: "999px",
              marginTop: "10px",
              width: "65%",
              background:
                "linear-gradient(90deg, #22d3ee, #818cf8, transparent)",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            maxWidth: "400px",
            margin: 0,
          }}
        >
          Orbita transforms space learning into an interactive experience with
          real-time exploration, immersive visuals, and futuristic educational
          tools.
        </p>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            maxWidth: "420px",
          }}
        >
          {FEATURES.map((f, i) => (
            <span
              key={f.label}
              ref={(el) => (pillsRef.current[i] = el)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 11px",
                borderRadius: "999px",
                border: "1px solid rgba(129,140,248,0.2)",
                background: "rgba(129,140,248,0.07)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "rgba(165,180,252,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ fontSize: "11px" }}>{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>

        {/* CTA + Stats */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="hero-cta-btn"
            onClick={() => navigate(isLoggedIn ? "/news" : "/signup")}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#020510",
              background: "linear-gradient(135deg, #22d3ee, #38bdf8)",
            }}
          >
            {isLoggedIn ? "Go to News →" : "Get Started →"}
          </button>

          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { val: "6+", label: "Features" },
              { val: "AI", label: "Powered" },
              { val: "3D", label: "Explorer" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#67e8f9",
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
