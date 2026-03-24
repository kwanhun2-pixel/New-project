import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: "p0" | "p1" | "p2" | "p3" | "p4" | "none";
  hover?: boolean;
}

const accentColors: Record<string, string> = {
  p0: "linear-gradient(90deg, #7C3AED, #A78BFA)",
  p1: "linear-gradient(90deg, #0EA5E9, #7DD3FC)",
  p2: "linear-gradient(90deg, #D946EF, #F0ABFC)",
  p3: "linear-gradient(90deg, #10B981, #6EE7B7)",
  p4: "linear-gradient(90deg, #F59E0B, #FCD34D)",
  none: "transparent",
};

export function Card({
  children,
  className = "",
  accent = "none",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-[#161E2E] border border-[rgba(255,255,255,.06)] rounded-2xl relative overflow-hidden ${hover ? "transition-all hover:-translate-y-1 hover:border-[rgba(255,255,255,.12)]" : ""} ${className}`}
    >
      {accent !== "none" && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: accentColors[accent] }}
        />
      )}
      {children}
    </div>
  );
}
