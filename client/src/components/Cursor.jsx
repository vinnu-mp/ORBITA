export default function Cursor() {
  return (
    <>
      <div
        id="cursor-dot"
        style={{
          position: "fixed",
          width: "8px",
          height: "8px",
          background: "#38bdf8",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          boxShadow: "0 0 6px #38bdf8",
          transition: "opacity 0.2s",
        }}
      />
      <div
        id="cursor-ring"
        style={{
          position: "fixed",
          width: "28px",
          height: "28px",
          border: "1.5px solid #38bdf8",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9998,
          opacity: 0.5,
          transition:
            "width 0.2s, height 0.2s, opacity 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
