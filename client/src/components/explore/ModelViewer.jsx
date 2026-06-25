import { Component, Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Stars,
  Center,
  Bounds,
} from "@react-three/drei";

// ─── Error Boundary ───────────────────────────────────────────────────────────
// Must be a class component. Catches actual render errors (not Promise throws).
// useGLTF throws a Promise on first load (caught by Suspense) and only throws
// a real Error if the file genuinely fails — that's what we catch here.
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Only treat it as a real error if it's not a Promise (suspense throw)
    if (error instanceof Promise) return null;
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (!(error instanceof Promise)) {
      this.props.onError?.();
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ─── Inner model component ────────────────────────────────────────────────────
// useGLTF suspends (throws Promise) until the GLB is ready.
// Suspense above catches the Promise and shows nothing (loading overlay handles UI).
// ModelErrorBoundary catches any real fetch/parse error.
function ModelWithLoad({ url, onLoad }) {
  const { scene } = useGLTF(url);
  const called = useRef(false);

  return (
    <>
      <Bounds fit clip observe margin={1.2}>
        <Center>
          <primitive object={scene} scale={1} />
        </Center>
      </Bounds>
      {/* Trigger onLoad after first successful render */}
      <LoadTrigger
        onLoad={() => {
          if (!called.current) {
            called.current = true;
            onLoad?.();
          }
        }}
      />
    </>
  );
}

function LoadTrigger({ onLoad }) {
  const called = useRef(false);
  if (!called.current) {
    called.current = true;
    // Small delay so the canvas has painted before we hide the spinner
    setTimeout(onLoad, 120);
  }
  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ModelViewer({ modelUrl, title }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading overlay — shown while GLB is fetching */}
      {loading && !error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            background: "rgba(2,5,16,0.6)",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", marginBottom: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
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
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "rgba(103,232,249,0.7)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Loading Model
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
              marginTop: 4,
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>⚠</div>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 15,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 6,
            }}
          >
            Model unavailable
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              textAlign: "center",
              maxWidth: 200,
              letterSpacing: "0.05em",
            }}
          >
            or failed to load the model
          </p>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ borderRadius: "inherit", background: "#020510" }}
        gl={{ antialias: true, alpha: false }}
      >
        <a data-cursor="link" mbientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#ffffff"
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.3}
          color="#818cf8"
        />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#22d3ee" />

        <Stars
          radius={80}
          depth={50}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />

        <Environment preset="night" />

        {/*
          Layer order matters:
          1. ModelErrorBoundary catches real file errors → triggers onError
          2. Suspense catches Promise throws (loading) → shows nothing (spinner is in DOM above)
          3. ModelWithLoad calls useGLTF which suspends until ready
        */}
        <ModelErrorBoundary
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        >
          <Suspense fallback={null}>
            <ModelWithLoad url={modelUrl} onLoad={() => setLoading(false)} />
          </Suspense>
        </ModelErrorBoundary>

        <OrbitControls
          enableZoom
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>

      {/* Controls hint — only when loaded */}
      {!loading && !error && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 12,
            padding: "5px 14px",
            borderRadius: 999,
            background: "rgba(2,5,16,0.7)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            pointerEvents: "none",
          }}
        >
          {["Drag to rotate", "Scroll to zoom"].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
