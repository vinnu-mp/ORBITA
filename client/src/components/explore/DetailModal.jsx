import { useEffect, useRef, useState, lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ModelViewer = lazy(() => import("./ModelViewer"));

export default function DetailModal({ item, onClose }) {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 3vw, 28px)",
        background: visible ? "rgba(2,5,16,0.85)" : "rgba(2,5,16,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          maxHeight: "calc(100vh - 40px)",
          borderRadius: 22,
          border: "1px solid rgba(34,211,238,0.15)",
          background: "rgba(4,8,26,0.96)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(20px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22d3ee",
                boxShadow: "0 0 10px #22d3ee",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "rgba(103,232,249,0.6)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Interactive 3D Explorer
            </span>
          </div>

          <button
            data-cursor="button"
            onClick={handleClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              lineHeight: 1,
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Body — split layout */}
        <div
          style={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            flexDirection: "var(--modal-direction, row)",
          }}
          className="modal-body-split"
        >
          {/* Left — 3D Viewer */}
          <div
            style={{
              flex: "0 0 var(--viewer-width, 52%)",
              position: "relative",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              minHeight: "var(--viewer-min-height, 0)",
            }}
            className="modal-viewer-panel"
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LoadingSpinner label={item.title} />
                </div>
              }
            >
              <ModelViewer modelUrl={item.model} title={item.title} />
            </Suspense>
          </div>

          {/* Right — Info panel */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "clamp(18px, 3vw, 32px)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(34,211,238,0.15) transparent",
            }}
          >
            {/* Title block */}
            <div style={{ marginBottom: 24 }}>
              {item.subtitle && (
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "rgba(103,232,249,0.6)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    margin: "0 0 6px 0",
                  }}
                >
                  {item.subtitle}
                </p>
              )}
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 3.5vw, 32px)",
                  color: "#ffffff",
                  margin: 0,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                {item.title}
              </h2>
              <div
                style={{
                  marginTop: 10,
                  height: 2,
                  width: 48,
                  background:
                    "linear-gradient(90deg, #22d3ee, rgba(129,140,248,0.5), transparent)",
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Markdown content */}
            <div className="orbita-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {item.fullInfo}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-md table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 12.5px;
  font-family: 'DM Sans', sans-serif;
}

.ai-md th {
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.ai-md td {
  padding: 8px 12px;
  color: rgba(255,255,255,0.78);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  line-height: 1.5;
}

.ai-md tr:last-child td {
  border-bottom: none;
}

.ai-md tr:nth-child(even) {
  background: rgba(255,255,255,0.025);
}

.ai-md td:first-child {
  color: rgba(34,211,238,0.75);
  font-weight: 500;
  white-space: nowrap;
}

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Responsive split */
        @media (max-width: 700px) {
          .modal-body-split {
            flex-direction: column !important;
          }
          .modal-viewer-panel {
            flex: 0 0 300px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
        }

        /* Markdown styles */
        .orbita-markdown { color: rgba(255,255,255,0.7); font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.75; }
        .orbita-markdown h1 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(18px, 2.5vw, 22px); color: #fff; margin: 0 0 4px; display: none; }
        .orbita-markdown h2 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: clamp(13px, 1.8vw, 15px); color: rgba(103,232,249,0.9); margin: 22px 0 10px; letter-spacing: 0.06em; text-transform: uppercase; }
        .orbita-markdown h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: rgba(165,180,252,0.9); margin: 16px 0 8px; }
        .orbita-markdown p { margin: 0 0 12px; }
        .orbita-markdown strong { color: rgba(255,255,255,0.9); font-weight: 600; }
        .orbita-markdown em { color: rgba(103,232,249,0.8); font-style: italic; }
        .orbita-markdown hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 16px 0; }
        .orbita-markdown ul, .orbita-markdown ol { padding-left: 18px; margin: 0 0 12px; }
        .orbita-markdown li { margin-bottom: 5px; }
        .orbita-markdown li::marker { color: rgba(34,211,238,0.5); }
        .orbita-markdown table { width: 100%; border-collapse: collapse; margin: 14px 0; font-family: 'DM Mono', monospace; font-size: 11px; }
        .orbita-markdown th { color: rgba(103,232,249,0.8); text-align: left; padding: 7px 10px; border-bottom: 1px solid rgba(34,211,238,0.2); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 10px; }
        .orbita-markdown td { color: rgba(255,255,255,0.65); padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .orbita-markdown tr:hover td { background: rgba(255,255,255,0.02); }
        .orbita-markdown code { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(165,180,252,0.9); background: rgba(129,140,248,0.08); padding: 1px 5px; border-radius: 4px; }
        .orbita-markdown blockquote { border-left: 2px solid rgba(34,211,238,0.3); padding-left: 12px; color: rgba(255,255,255,0.45); margin: 12px 0; font-style: italic; }
      `}</style>
    </div>
  );
}

function LoadingSpinner({ label }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ position: "relative", width: 48, height: 48 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(34,211,238,0.15)",
            borderTopColor: "#22d3ee",
            animation: "spin 1s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "2px solid rgba(129,140,248,0.15)",
            borderBottomColor: "#818cf8",
            animation: "spin 1.5s linear infinite reverse",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "rgba(103,232,249,0.5)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Initialising
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
