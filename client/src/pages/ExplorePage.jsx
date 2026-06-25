import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { celestialBodies, spaceTechnologies } from "../data/spaceExplorer";
import ExploreCard from "../components/explore/ExploreCard";
import DetailModal from "../components/explore/DetailModal";

const SECTIONS = [
  { id: "celestial", label: "Celestial Bodies", icon: "🪐" },
  { id: "technologies", label: "Space Technologies", icon: "🛸" },
];

export default function ExplorePage() {
  const [activeSection, setActiveSection] = useState("celestial");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const celestialRef = useRef(null);
  const technologiesRef = useRef(null);

  const scrollTo = (id) => {
    setActiveSection(id);
    setDropdownOpen(false);
    const ref = id === "celestial" ? celestialRef : technologiesRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Intersection observer for active section
  useEffect(() => {
    const refs = [
      { id: "celestial", ref: celestialRef },
      { id: "technologies", ref: technologiesRef },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = refs.find((r) => r.ref.current === entry.target);
            if (found) setActiveSection(found.id);
          }
        });
      },
      { threshold: 0.25 },
    );
    refs.forEach(({ ref }) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  const activeLabel = SECTIONS.find((s) => s.id === activeSection)?.label;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 0 }}>
      {/* Page hero */}
      <div
        style={{
          padding: "clamp(36px, 6vw, 72px) clamp(20px, 5vw, 60px) 0",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(500px, 90vw)",
            height: 200,
            background:
              "radial-gradient(ellipse at center, rgba(34,211,238,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "rgba(103,232,249,0.6)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}
        >
          Interactive 3D Explorer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.07 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px, 5vw, 52px)",
            color: "#ffffff",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Explore the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22d3ee, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Universe
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "rgba(255,255,255,0.45)",
            margin: "0 auto",
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Interact with photorealistic 3D models of celestial bodies and
          spacecraft. Tap any object to explore.
        </motion.p>
      </div>

      {/* Section nav */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "sticky",
          top: 64,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          padding: "16px clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Desktop nav */}
        <div
          className="section-nav-desktop"
          style={{
            display: "flex",
            gap: 4,
            padding: "5px",
            borderRadius: 999,
            background: "rgba(4,8,26,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {SECTIONS.map((s) => (
            <NavTab
              key={s.id}
              section={s}
              active={activeSection === s.id}
              onClick={() => scrollTo(s.id)}
            />
          ))}
        </div>

        {/* Mobile dropdown */}
        <div
          className="section-nav-mobile"
          style={{ position: "relative", width: "100%", maxWidth: 320 }}
        >
          <button
            data-cursor="button"
            data-cursor="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderRadius: 12,
              background: "rgba(4,8,26,0.9)",
              border: "1px solid rgba(34,211,238,0.2)",
              backdropFilter: "blur(20px)",
              cursor: "pointer",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
            }}
          >
            <span>{activeLabel}</span>
            <span
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                fontSize: 10,
                color: "rgba(103,232,249,0.7)",
              }}
            >
              ▼
            </span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  borderRadius: 12,
                  background: "rgba(4,8,26,0.97)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                  zIndex: 4,
                }}
              >
                {SECTIONS.map((s) => (
                  <button
                    data-cursor="button"
                    data-cursor="button"
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "11px 16px",
                      background:
                        activeSection === s.id
                          ? "rgba(34,211,238,0.08)"
                          : "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      color:
                        activeSection === s.id
                          ? "#22d3ee"
                          : "rgba(255,255,255,0.7)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Content */}
      <div style={{ padding: "0 clamp(20px, 5vw, 60px) 80px" }}>
        {/* Space Technologies */}
        <Section
          sectionRef={technologiesRef}
          title="Space Technologies"
          subtitle="Spacecraft, telescopes, and engineering marvels"
          icon="🛸"
          items={spaceTechnologies}
          onCardClick={setSelectedItem}
        />

        {/* Celestial Bodies */}
        <Section
          sectionRef={celestialRef}
          title="Celestial Bodies"
          subtitle="Planets, moons, and natural wonders of space"
          icon="🪐"
          items={celestialBodies}
          onCardClick={setSelectedItem}
        />
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal
            key={selectedItem.id}
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .section-nav-mobile { display: none; }
        @media (max-width: 600px) {
          .section-nav-desktop { display: none !important; }
          .section-nav-mobile { display: block; }
        }
        .explore-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: clamp(14px, 2vw, 22px);
}

@media (min-width: 640px) {
  .explore-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .explore-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
      `}</style>
    </div>
  );
}

function NavTab({ section, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      data-cursor="button"
      data-cursor="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 18px",
        borderRadius: 999,
        border: "none",
        background: active
          ? "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(129,140,248,0.12))"
          : "transparent",
        cursor: "pointer",
        transition: "all 0.25s ease",
        outline: active
          ? "1px solid rgba(34,211,238,0.25)"
          : "1px solid transparent",
      }}
    >
      <span style={{ fontSize: 13 }}>{section.icon}</span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: active ? 600 : 400,
          color: active
            ? "#22d3ee"
            : hovered
              ? "rgba(255,255,255,0.8)"
              : "rgba(255,255,255,0.45)",
          transition: "color 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {section.label}
      </span>
    </button>
  );
}

function Section({ sectionRef, title, subtitle, icon, items, onCardClick }) {
  return (
    <div ref={sectionRef} style={{ paddingTop: 40, marginTop: -8 }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 28 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 18 }}>{icon}</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(18px, 2.8vw, 26px)",
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
            margin: "0 0 0 28px",
          }}
        >
          {subtitle}
        </p>
        <div
          style={{
            marginTop: 14,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(34,211,238,0.2), rgba(129,140,248,0.1), transparent)",
          }}
        />
      </motion.div>

      {/* Grid */}
      <div className="explore-grid">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <ExploreCard item={item} onClick={onCardClick} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
