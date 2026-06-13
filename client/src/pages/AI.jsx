import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import axios from "../api/axios.js";

// ── Suggested starter prompts ──────────────────────────
const SUGGESTIONS = [
  { icon: "🌌", text: "Explain black holes in simple terms" },
  { icon: "🚀", text: "How does the James Webb telescope work?" },
  { icon: "🌍", text: "What is ISRO's Gaganyaan mission?" },
  { icon: "⭐", text: "How are stars born and how do they die?" },
  { icon: "🛸", text: "Is there any evidence of life beyond Earth?" },
  { icon: "🪐", text: "What makes Saturn's rings so special?" },
];

// ── Typing dots ────────────────────────────────────────
function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        padding: "10px 14px",
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22d3ee",
          }}
          animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.16 }}
        />
      ))}
    </div>
  );
}

// ── One message bubble ─────────────────────────────────
function Message({ msg, isLast }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: 10,
        alignItems: "flex-end",
        marginBottom: 4,
      }}
    >
      {/* AI avatar */}
      {!isUser && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg,#22d3ee,#818cf8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            boxShadow: "0 0 12px rgba(34,211,238,0.3)",
            marginBottom: 2,
          }}
        >
          ✦
        </div>
      )}

      {/* Bubble */}
      <div
        style={{
          maxWidth: "72%",
          padding: isUser ? "10px 16px" : "13px 17px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
          background: isUser
            ? "linear-gradient(135deg,rgba(34,211,238,0.2),rgba(129,140,248,0.2))"
            : "rgba(255,255,255,0.05)",
          border: isUser
            ? "1px solid rgba(34,211,238,0.25)"
            : "1px solid rgba(255,255,255,0.08)",
          fontSize: 14,
          lineHeight: 1.7,
          color: isUser ? "#cffafe" : "rgba(255,255,255,0.86)",
          fontFamily: "'DM Sans',sans-serif",
          boxShadow: isUser
            ? "0 4px 20px rgba(34,211,238,0.08)"
            : "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        {isUser ? (
          <p style={{ margin: 0 }}>{msg.content}</p>
        ) : (
          <div className="ai-chat-md">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg,#38bdf8,#818cf8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#020510",
            marginBottom: 2,
          }}
        >
          U
        </div>
      )}
    </motion.div>
  );
}

// ── Main AI page ───────────────────────────────────────
export default function AIPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Show clear button once there are messages
  useEffect(() => {
    setShowClear(messages.length > 0);
  }, [messages]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text?.trim() || input.trim();
      if (!trimmed || loading) return;
      setInput("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      const userMsg = { role: "user", content: trimmed };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setLoading(true);

      try {
        const res = await axios.post("/ai/chat", {
          messages: updated,
        });
        const aiText =
          res.data?.data?.response ||
          res.data?.response ||
          "Sorry, I couldn't generate a response.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: aiText },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "⚠️ Connection error. Please check your network and try again.",
          },
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [input, messages, loading],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)", // subtract navbar height
        fontFamily: "'DM Sans',sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(2,5,16,0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#22d3ee,#818cf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              boxShadow: "0 0 16px rgba(34,211,238,0.3)",
            }}
          >
            ✦
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: "#fff",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Orbita AI
            </p>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 9,
                color: "rgba(34,211,238,0.65)",
                margin: 0,
                letterSpacing: "0.12em",
              }}
            >
              SPACE INTELLIGENCE
            </p>
          </div>
        </div>

        {/* New chat button */}
        <AnimatePresence>
          {showClear && (
            <motion.button
              initial={{ opacity: 0, scale: 0.88, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.88, x: 10 }}
              transition={{ duration: 0.22 }}
              onClick={handleNewChat}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
                e.currentTarget.style.color = "#67e8f9";
                e.currentTarget.style.background = "rgba(34,211,238,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8a5 5 0 1 1 1.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 5v3h3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              New Chat
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat area ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
        }}
        className="orbita-chat-scroll"
      >
        <div
          style={{
            maxWidth: 760,
            width: "100%",
            margin: "0 auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Empty state — welcome + suggestions */}
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 28,
                  padding: "20px 0 40px",
                }}
              >
                {/* Logo */}
                <div>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      margin: "0 auto 16px",
                      background: "linear-gradient(135deg,#22d3ee,#818cf8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 30,
                      boxShadow: "0 0 40px rgba(34,211,238,0.2)",
                    }}
                  >
                    ✦
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(1.5rem,4vw,2.2rem)",
                      letterSpacing: "-0.02em",
                      background:
                        "linear-gradient(135deg,#fff,#93c5fd 55%,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      margin: "0 0 8px",
                    }}
                  >
                    Ask me anything about space
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      maxWidth: 380,
                      margin: "0 auto",
                    }}
                  >
                    From black holes to rocket science — I'm here to make the
                    cosmos make sense.
                  </p>
                </div>

                {/* Suggestions grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                    gap: 10,
                    width: "100%",
                    maxWidth: 640,
                  }}
                >
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.35 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => sendMessage(s.text)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "12px 14px",
                        borderRadius: 14,
                        textAlign: "left",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(34,211,238,0.22)";
                        e.currentTarget.style.background =
                          "rgba(34,211,238,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.08)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)";
                      }}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0 }}>
                        {s.icon}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.6)",
                          lineHeight: 1.5,
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        {s.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          {!isEmpty && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} isLast={i === messages.length - 1} />
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", gap: 10, alignItems: "flex-end" }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#22d3ee,#818cf8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      flexShrink: 0,
                      marginBottom: 2,
                    }}
                  >
                    ✦
                  </div>
                  <div
                    style={{
                      borderRadius: "4px 18px 18px 18px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input area ── */}
      <div
        style={{
          flexShrink: 0,
          padding: "12px 16px 16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(2,5,16,0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
              borderRadius: 16,
              padding: "10px 12px 10px 18px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              transition: "border-color 0.2s",
            }}
            onFocusCapture={(e) =>
              (e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)")
            }
            onBlurCapture={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
            }
          >
            <textarea
              ref={(el) => {
                inputRef.current = el;
                textareaRef.current = el;
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about space, rockets, stars, missions…"
              rows={1}
              disabled={loading}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 14,
                resize: "none",
                fontFamily: "'DM Sans',sans-serif",
                lineHeight: 1.6,
                maxHeight: 160,
                overflowY: "auto",
                opacity: loading ? 0.5 : 1,
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 160) + "px";
              }}
            />

            {/* Send button */}
            <motion.button
              whileHover={{ scale: !loading && input.trim() ? 1.06 : 1 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                border: "none",
                background:
                  loading || !input.trim()
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg,#22d3ee,#38bdf8)",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.18s",
                boxShadow:
                  !loading && input.trim()
                    ? "0 0 16px rgba(34,211,238,0.3)"
                    : "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8h12M8 2l6 6-6 6"
                  stroke={
                    !loading && input.trim()
                      ? "#020510"
                      : "rgba(255,255,255,0.3)"
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
              fontSize: 11,
              fontFamily: "'DM Mono',monospace",
              color: "rgba(255,255,255,0.18)",
              marginTop: 8,
            }}
          >
            Enter to send · Shift+Enter for new line · Orbita AI focuses on
            space & science
          </p>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .orbita-chat-scroll::-webkit-scrollbar { width: 4px; }
        .orbita-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .orbita-chat-scroll::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.18); border-radius: 4px; }

        .ai-chat-md { color: rgba(255,255,255,0.86); font-size: 14px; line-height: 1.75; }
        .ai-chat-md p { margin: 0 0 10px; }
        .ai-chat-md p:last-child { margin-bottom: 0; }
        .ai-chat-md h1,.ai-chat-md h2,.ai-chat-md h3 {
          font-family:'Syne',sans-serif; font-weight:700; color:#fff; margin:14px 0 6px;
        }
        .ai-chat-md h1{font-size:17px} .ai-chat-md h2{font-size:15px} .ai-chat-md h3{font-size:14px}
        .ai-chat-md strong { color:#67e8f9; font-weight:600; }
        .ai-chat-md em { color:rgba(255,255,255,0.65); }
        .ai-chat-md code {
          background:rgba(34,211,238,0.1); border-radius:4px;
          padding:1px 6px; font-size:12.5px; color:#a5f3fc;
          font-family:'DM Mono',monospace;
        }
        .ai-chat-md pre {
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          border-radius:10px; padding:12px 14px; overflow-x:auto; margin:10px 0;
        }
        .ai-chat-md pre code { background:none; padding:0; font-size:12.5px; color:rgba(255,255,255,0.8); }
        .ai-chat-md ul,.ai-chat-md ol { padding-left:18px; margin:6px 0; }
        .ai-chat-md li { margin-bottom:4px; }
        .ai-chat-md blockquote {
          border-left:2px solid rgba(34,211,238,0.35); padding-left:12px;
          margin:8px 0; color:rgba(255,255,255,0.55);
        }
        .ai-chat-md hr { border:none; border-top:1px solid rgba(255,255,255,0.08); margin:12px 0; }
        .ai-chat-md a { color:#67e8f9; }
        .ai-chat-md table { border-collapse:collapse; width:100%; margin:10px 0; font-size:13px; }
        .ai-chat-md th { background:rgba(34,211,238,0.08); padding:7px 10px;
          border:1px solid rgba(255,255,255,0.08); color:#67e8f9; text-align:left; }
        .ai-chat-md td { padding:7px 10px; border:1px solid rgba(255,255,255,0.06);
          color:rgba(255,255,255,0.75); }
      `}</style>
    </div>
  );
}
