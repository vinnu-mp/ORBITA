import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import axios from "../../api/axios";
import { log } from "three/src/nodes/math/MathNode.js";

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ── Typing animation ── */
function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "10px 14px",
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#22d3ee",
          }}
          animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.78, repeat: Infinity, delay: i * 0.17 }}
        />
      ))}
    </div>
  );
}

/* ── One chat bubble ── */
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg,#22d3ee,#818cf8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            marginTop: 2,
            boxShadow: "0 0 10px rgba(34,211,238,0.3)",
          }}
        >
          ✦
        </div>
      )}
      <div
        style={{
          maxWidth: "83%",
          padding: isUser ? "9px 14px" : "11px 15px",
          borderRadius: isUser ? "15px 15px 4px 15px" : "4px 15px 15px 15px",
          background: isUser
            ? "linear-gradient(135deg,rgba(34,211,238,0.18),rgba(129,140,248,0.18))"
            : "rgba(255,255,255,0.05)",
          border: isUser
            ? "1px solid rgba(34,211,238,0.22)"
            : "1px solid rgba(255,255,255,0.07)",
          fontSize: 12.5,
          lineHeight: 1.68,
          color: isUser ? "#cffafe" : "rgba(255,255,255,0.84)",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {isUser ? (
          <p style={{ margin: 0 }}>{msg.content}</p>
        ) : (
          <div className="ai-md">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Modal ── */
export default function AIExplainModal({ article, aiType, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const didInit = useRef(false);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Focus input */
  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  /* Initial explanation */
  const callAI = useCallback(
    async (history) => {
      setLoading(true);
      try {
        const res = await axios.post("/ai/explain", {
          type: aiType ?? "news",
          title: article.title,
          content: article.description,
          messages: history.slice(-6), // limit context window
        });

        const text =
          res.data?.data ?? "Sorry, I couldn't generate a response right now.";
        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ Connection error. Check your network and try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [article],
  );

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    callAI([]);
  }, [callAI]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    await callAI(next);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(2,5,16,0.78)",
        backdropFilter: "blur(7px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 22 }}
        transition={{ duration: 0.33, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: "100%",
          maxWidth: 980,
          height: "min(90vh, 650px)",
          maxHeight: "90dvh",
          borderRadius: 22,
          border: "1px solid rgba(34,211,238,0.16)",
          background: "rgba(4,8,26,0.94)",
          backdropFilter: "blur(28px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow:
            "0 40px 90px rgba(0,0,0,0.75), 0 0 0 1px rgba(34,211,238,0.07)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#22d3ee,#818cf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                boxShadow: "0 0 14px rgba(34,211,238,0.32)",
              }}
            >
              ✦
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Orbita AI
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  color: "rgba(34,211,238,0.6)",
                  margin: 0,
                  letterSpacing: "0.1em",
                }}
              >
                SPACE INTELLIGENCE · GROQ
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.32)";
              e.currentTarget.style.color = "rgba(252,165,165,0.9)";
              e.currentTarget.style.background = "rgba(239,68,68,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            ✕
          </motion.button>
        </div>

        {/* ── Split body ── */}
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
          }}
          className="ai-modal-body"
        >
          {/* LEFT — Article context panel */}
          <div
            className="ai-modal-left"
            style={{
              width: 258,
              flexShrink: 0,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              padding: 15,
              gap: 11,
              overflow: "hidden",
            }}
          >
            {/* Image */}
            {article.image && (
              <div
                style={{ borderRadius: 11, overflow: "hidden", flexShrink: 0 }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: 138,
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#fff",
                lineHeight: 1.42,
                margin: 0,
              }}
            >
              {article.title}
            </h3>

            {/* Date */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 9px",
                borderRadius: 999,
                width: "fit-content",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.04)",
                fontFamily: "'DM Mono',monospace",
                fontSize: 9.5,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              📅 {fmtDate(article.date)}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 11.5,
                color: "rgba(255,255,255,0.34)",
                lineHeight: 1.72,
                margin: 0,
              }}
            >
              {article.description?.slice(0, 220)}
              {article.description?.length > 220 ? "…" : ""}
            </p>

            {/* Source link */}
            {article.officialUrl && (
              <a
                href={article.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "#67e8f9",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a5f3fc")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#67e8f9")}
              >
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 11L11 1M11 1H5M11 1V7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Read full article
              </a>
            )}
          </div>

          {/* RIGHT — Chat area */}
          <div
            className="ai-modal-right"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "15px 17px",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              {messages.length === 0 && !loading && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: 0.28,
                  }}
                >
                  <span style={{ fontSize: 30 }}>✦</span>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    Preparing your explanation…
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <Bubble key={i} msg={msg} />
              ))}

              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#22d3ee,#818cf8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    ✦
                  </div>
                  <div
                    style={{
                      borderRadius: "4px 15px 15px 15px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div
              style={{
                padding: "11px 15px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.018)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 9,
                  alignItems: "flex-end",
                  borderRadius: 13,
                  padding: "8px 10px 8px 15px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask a follow-up question…"
                  rows={1}
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    fontSize: 13,
                    resize: "none",
                    fontFamily: "'DM Sans',sans-serif",
                    lineHeight: 1.5,
                    maxHeight: 100,
                    overflowY: "auto",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
                <motion.button
                  whileHover={{ scale: !loading && input.trim() ? 1.07 : 1 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "none",
                    background:
                      loading || !input.trim()
                        ? "rgba(255,255,255,0.07)"
                        : "linear-gradient(135deg,#22d3ee,#38bdf8)",
                    cursor:
                      loading || !input.trim() ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.18s",
                    boxShadow:
                      !loading && input.trim()
                        ? "0 0 14px rgba(34,211,238,0.32)"
                        : "none",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8h12M8 2l6 6-6 6"
                      stroke={
                        loading || !input.trim()
                          ? "rgba(255,255,255,0.28)"
                          : "#020510"
                      }
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  fontFamily: "'DM Mono',monospace",
                  color: "rgba(255,255,255,0.18)",
                  marginTop: 5,
                }}
              >
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Markdown styles */}
      <style>{`
        .ai-md{color:rgba(255,255,255,0.84);font-size:12.5px;line-height:1.72;}
        .ai-md h1,.ai-md h2,.ai-md h3{font-family:'Syne',sans-serif;color:#fff;margin:10px 0 5px;font-weight:700;}
        .ai-md h1{font-size:15px}.ai-md h2{font-size:13.5px}.ai-md h3{font-size:12.5px}
        .ai-md p{margin:0 0 7px}
        .ai-md strong{color:#67e8f9;font-weight:600}
        .ai-md em{color:rgba(255,255,255,0.6)}
        .ai-md ul,.ai-md ol{padding-left:16px;margin:5px 0}
        .ai-md li{margin-bottom:3px}
        .ai-md code{background:rgba(34,211,238,0.1);border-radius:4px;padding:1px 5px;
          font-size:11.5px;color:#a5f3fc;font-family:'DM Mono',monospace}
        .ai-md blockquote{border-left:2px solid rgba(34,211,238,0.3);
          padding-left:11px;margin:7px 0;color:rgba(255,255,255,0.52)}
        .ai-md hr{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:10px 0}
        /* ── Responsive modal ── */
        @media (max-width: 640px) {
          .ai-modal-body {
            flex-direction: column !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }
          .ai-modal-left {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            flex-direction: column !important;
            gap: 10px !important;
            padding: 14px !important;
            flex-shrink: 0 !important;
            overflow-y: visible !important;
          }
          .ai-modal-left img {
            width: 100% !important;
            height: 160px !important;
            object-fit: cover !important;
            border-radius: 10px !important;
          }
          .ai-modal-right {
            flex: none !important;
            min-height: 420px !important;
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
