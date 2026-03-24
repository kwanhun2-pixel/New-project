import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "p0" | "p1" | "p2" | "p3" | "p4";
  className?: string;
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  p0: { bg: "rgba(124,58,237,.12)", border: "rgba(124,58,237,.4)", text: "#A78BFA" },
  p1: { bg: "rgba(14,165,233,.12)", border: "rgba(14,165,233,.4)", text: "#7DD3FC" },
  p2: { bg: "rgba(217,70,239,.12)", border: "rgba(217,70,239,.4)", text: "#F0ABFC" },
  p3: { bg: "rgba(16,185,129,.12)", border: "rgba(16,185,129,.4)", text: "#6EE7B7" },
  p4: { bg: "rgba(245,158,11,.12)", border: "rgba(245,158,11,.4)", text: "#FCD34D" },
};

export function Badge({ children, color = "p1", className = "" }: BadgeProps) {
  const c = colorMap[color];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border font-mono tracking-wide ${className}`}
      style={{ background: c.bg, borderColor: c.border, color: c.text }}
    >
      {children}
    </span>
  );
}
