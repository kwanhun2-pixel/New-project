import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "text-white font-bold",
  secondary:
    "border border-[rgba(255,255,255,.06)] text-[#E8EDF5] bg-transparent hover:border-[rgba(255,255,255,.2)] hover:bg-[rgba(255,255,255,.03)]",
  ghost: "text-[#6B7A99] hover:text-white bg-transparent border-0",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  style,
  children,
  ...props
}: ButtonProps) {
  const primaryStyle =
    variant === "primary"
      ? { background: "linear-gradient(135deg, #0EA5E9, #7C3AED)", ...style }
      : style;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={primaryStyle}
      {...props}
    >
      {children}
    </button>
  );
}
