import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);

  // Scroll: hide on scroll down, show on scroll up, frost on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < lastScrollY.current || y < 60);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "News", slug: "/news", active: authStatus },
    { name: "SpaceTech", slug: "/components", active: authStatus },
    { name: "3D", slug: "/3d-explore", active: authStatus },
    { name: "AI", slug: "/ai", active: authStatus },
    { name: "Quiz", slug: "/quiz", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
  ];

  const visibleItems = navItems.filter((i) => i.active);
  // Split: main nav links vs auth/cta buttons
  const mainItems = visibleItems.filter(
    (i) => !["Login", "Signup", "Profile"].includes(i.name),
  );
  const authItems = visibleItems.filter((i) =>
    ["Login", "Signup", "Profile"].includes(i.name),
  );

  const isActive = (slug) => location.pathname === slug;

  return (
    <nav
      className="relative overflow-hidden border-b border-violet-500/20 bg-gradient-to-b from-[#0B1020]/95 via-[#0A0F1D]/90 to-[#070B16]/95 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      ref={menuRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition:
          "transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(2,5,16,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(56,189,248,0.08)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 0 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        className=""
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 28px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* Icon mark */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(34,211,238,0.35)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.5" stroke="white" strokeWidth="1.5" />
              <ellipse
                cx="8"
                cy="8"
                rx="7"
                ry="3"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Syne', 'Arial Black', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #ffffff 0%, #93c5fd 60%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ORBITA
          </span>
        </Link>

        {/* ── Desktop Nav + Auth (all right-aligned) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginLeft: "auto", // pushes everything to the right
          }}
          className="orbita-desktop-nav"
        >
          {/* Nav links */}
          {mainItems.map((item) => (
            <Link
              key={item.slug}
              to={item.slug}
              style={{
                position: "relative",
                padding: "6px 14px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
                color: isActive(item.slug)
                  ? "#ffffff"
                  : "rgba(255,255,255,0.5)",
                background: isActive(item.slug)
                  ? "rgba(56,189,248,0.1)"
                  : "transparent",
                border: isActive(item.slug)
                  ? "1px solid rgba(56,189,248,0.2)"
                  : "1px solid transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.slug)) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.slug)) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.name}
              {isActive(item.slug) && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#22d3ee",
                    boxShadow: "0 0 6px #22d3ee",
                  }}
                />
              )}
            </Link>
          ))}

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 20,
              background: "rgba(255,255,255,0.1)",
              margin: "0 6px",
            }}
          />

          {/* Auth buttons */}
          {authStatus ? (
            <Link
              to="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)";
                e.currentTarget.style.background = "rgba(56,189,248,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="../../public/user.png"
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    scale: "0.9",
                    objectFit: "cover",
                  }}
                />
              </div>
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: "7px 16px",
                  borderRadius: 9,
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={{
                  padding: "7px 18px",
                  borderRadius: 9,
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#020510",
                  background:
                    "linear-gradient(135deg, #22d3ee 0%, #38bdf8 60%, #818cf8 100%)",
                  border: "none",
                  boxShadow: "0 0 16px rgba(34,211,238,0.25)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 24px rgba(34,211,238,0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 16px rgba(34,211,238,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
        {/* animated cosmic glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="navbar-ambient absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="navbar-ambient-delayed absolute -top-24 right-1/4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="orbita-hamburger"
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "6px 8px",
            cursor: "pointer",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "rgba(255,255,255,0.7)",
                borderRadius: 2,
                transition: "all 0.25s",
                transform: menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(4px, 4px)"
                    : i === 2
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : "scaleX(0)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>
      {/* top ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-24 w-72 -translate-x-1/2 bg-violet-500/15 blur-3xl" />

        <div className="absolute right-1/4 top-0 h-20 w-56 bg-blue-500/10 blur-3xl" />
      </div>
      {/* strong animated separator */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5" />

      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
        <div className="navbar-glow h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-[2px]" />
      </div>

      <div className="absolute bottom-0 left-1/2 h-[14px] w-2/3 -translate-x-1/2 bg-fuchsia-500/20 blur-2xl" />

      {/* ── Mobile Menu ── */}
      <div
        className="orbita-mobile-menu"
        style={{
          display: "none",
          maxHeight: menuOpen ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(2,5,16,0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(56,189,248,0.08)",
        }}
      >
        <div style={{ padding: "12px 20px 20px" }}>
          {visibleItems.map((item) => (
            <Link
              key={item.slug}
              to={item.slug}
              style={{
                display: "block",
                padding: "11px 14px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: isActive(item.slug) ? 700 : 500,
                fontFamily: "'DM Sans', sans-serif",
                color: isActive(item.slug)
                  ? "#22d3ee"
                  : "rgba(255,255,255,0.65)",
                background: isActive(item.slug)
                  ? "rgba(34,211,238,0.07)"
                  : "transparent",
                marginBottom: 2,
                borderLeft: isActive(item.slug)
                  ? "2px solid #22d3ee"
                  : "2px solid transparent",
                transition: "all 0.18s",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 860px) {
          .orbita-desktop-nav { display: none !important; }
          .orbita-hamburger    { display: flex !important; }
          .orbita-mobile-menu  { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
