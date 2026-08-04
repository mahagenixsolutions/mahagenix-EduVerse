import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { EventBus } from "@/mock-server/EventBus";
import ai from "/ai.png";

export const AITutorCard: React.FC = () => {
  const prompts = [
    "Explain quadratic equations",
    "Help me with physics homework",
    "Study tips for board exams",
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #F3F0FF 0%, #EBE5FF 100%)",
        borderRadius: "24px",
        padding: "32px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(139, 92, 246, 0.08)",
        border: "1px solid #EBE3FF",
        marginBottom: "24px",
      }}
    >
      {/* Left Text Block */}
      <div style={{ maxWidth: "340px", zIndex: 2 }}>
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#0F172A",
            margin: "0 0 8px 0",
            letterSpacing: "-0.01em",
          }}
        >
          Need help with your studies?
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#64748B",
            margin: "0 0 20px 0",
            lineHeight: 1.4,
          }}
        >
          Ask EduTrack AI Tutor for explanations, homework help, study tips, and
          more.
        </p>

        <button
          onClick={() => EventBus.publish("OPEN_AI_ASSISTANT")}
          style={{
            background: "#5B4FDB",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "999px",
            padding: "12px 24px",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 16px rgba(91, 79, 219, 0.3)",
          }}
        >
          Ask AI Tutor <Sparkles size={16} />
        </button>
      </div>

      {/* Middle Interactive Prompt Pills */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 2,
          maxWidth: "320px",
          width: "100%",
        }}
      >
        {prompts.map((promptText) => (
          <button
            key={promptText}
            onClick={() => EventBus.publish("OPEN_AI_ASSISTANT")}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "14px",
              padding: "12px 18px",
              fontSize: "0.825rem",
              fontWeight: 600,
              color: "#334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              textAlign: "left",
            }}
          >
            <span>{promptText}</span>
            <ArrowRight size={14} color="#64748B" />
          </button>
        ))}
      </div>

      {/* Right 3D Waving Robot Mascot Image (Attached PNG Asset) */}
      <div
        style={{
          width: "240px",
          height: "210px",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "-10px",
        }}
      >
        <img
          src={ai}
          alt="EduTrack AI Waving Robot Mascot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};
