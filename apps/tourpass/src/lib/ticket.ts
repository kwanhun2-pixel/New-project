export interface Ticket {
  ticketId: string;
  venueId: string;
  venueName: string;
  visitDate: string;
  adultCount: number;
  childCount: number;
  totalKRW: number;
  currency: string;
  totalConverted: number;
  buyerName: string;
  buyerEmail: string;
  issuedAt: string;
  isUsed: boolean;
}

/** 브라우저 세션에서 발행된 티켓을 임시 저장하는 유틸 */
const STORAGE_KEY = "loop8_tickets";

export function saveTicket(ticket: Ticket): void {
  if (typeof window === "undefined") return;
  const existing = loadTickets();
  existing.push(ticket);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function loadTickets(): Ticket[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getTicket(ticketId: string): Ticket | undefined {
  return loadTickets().find((t) => t.ticketId === ticketId);
}

/** QR 페이로드 생성: base64(JSON) */
export function buildQRPayload(ticket: Ticket): string {
  const payload = {
    tid: ticket.ticketId,
    vid: ticket.venueId,
    date: ticket.visitDate,
    adult: ticket.adultCount,
    child: ticket.childCount,
    ts: Date.now(),
  };
  return btoa(JSON.stringify(payload));
}

/** 간단한 ID 생성 */
export function generateTicketId(): string {
  return `L8-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

const APPROX_RATES: Record<string, number> = {
  KRW: 1,
  USD: 0.00075,
  JPY: 0.11,
  TWD: 0.024,
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  KRW: "₩",
  USD: "$",
  JPY: "¥",
  TWD: "NT$",
};

export function convertCurrency(amountKRW: number, currency: string): number {
  const rate = APPROX_RATES[currency] ?? 1;
  return Math.round(amountKRW * rate);
}
