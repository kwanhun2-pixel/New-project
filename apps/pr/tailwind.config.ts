import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070B14",
        bg2: "#0D1420",
        surface: "#161E2E",
        p3: "#10B981",
        p3l: "#6EE7B7",
        muted: "#6B7A99",
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
