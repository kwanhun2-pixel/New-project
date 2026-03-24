/**
 * Format number as Korean Won
 */
export function formatKRW(amount: number): string {
  if (amount === 0) return "무료";
  return `₩${amount.toLocaleString("ko-KR")}`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale = "ko-KR"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Generate QR code payload for venue entry ticket
 */
export function generateQRPayload(params: {
  ticketId: string;
  venueId: string;
  userId: string;
  validDate: string;
}): string {
  const payload = {
    t: params.ticketId,
    v: params.venueId,
    u: params.userId,
    d: params.validDate,
    ts: Date.now(),
  };
  return btoa(JSON.stringify(payload));
}

/**
 * Convert currency amounts using approximate rates
 * In production, use a live exchange rate API
 */
const APPROX_RATES: Record<string, number> = {
  KRW: 1,
  USD: 0.00075,
  JPY: 0.11,
  TWD: 0.024,
};

export function convertCurrency(
  amountKRW: number,
  toCurrency: string
): { amount: number; symbol: string } {
  const symbols: Record<string, string> = {
    KRW: "₩",
    USD: "$",
    JPY: "¥",
    TWD: "NT$",
  };
  const rate = APPROX_RATES[toCurrency] ?? 1;
  return {
    amount: Math.round(amountKRW * rate),
    symbol: symbols[toCurrency] ?? "₩",
  };
}
