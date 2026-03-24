export const PLATFORMS = {
  TOURPASS: "tourpass",
  STO: "sto",
  NFT: "nft",
  PR: "pr",
  ADMIN: "admin",
} as const;

export const SUPPORTED_LANGUAGES = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh-TW", name: "繁體中文", flag: "🇹🇼" },
  { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
] as const;

export const SUPPORTED_CURRENCIES = [
  { code: "KRW", symbol: "₩", name: "Korean Won" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar" },
] as const;

export const COMMISSION_RATES = {
  TOURPASS: { min: 0.05, max: 0.10 },
  STO_ISSUANCE: 0.02,
  STO_SUBSCRIPTION: 0.01,
  STO_SECONDARY: 0.015,
  NFT_MINT: 0.02,
  NFT_SECONDARY: 0.025,
} as const;

export const REVENUE_SPLIT = {
  LOOP8: 0.6,
  PHILTEK: 0.4,
} as const;
