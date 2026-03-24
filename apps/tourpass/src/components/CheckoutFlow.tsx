"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveTicket, generateTicketId, CURRENCY_SYMBOLS } from "@/lib/ticket";
import type { Ticket } from "@/lib/ticket";

type PayStep = "info" | "pay" | "done";

const PAY_METHODS = [
  { id: "toss", label: "토스페이먼츠", icon: "💳" },
  { id: "card", label: "신용·체크카드", icon: "🏦" },
  { id: "kakao", label: "카카오페이", icon: "💛" },
];

export function CheckoutFlow() {
  const params = useSearchParams();
  const router = useRouter();

  const venueId = params.get("venueId") ?? "";
  const venueName = params.get("venueName") ?? "";
  const visitDate = params.get("visitDate") ?? "";
  const adultCount = Number(params.get("adultCount") ?? 1);
  const childCount = Number(params.get("childCount") ?? 0);
  const currency = params.get("currency") ?? "KRW";
  const totalKRW = Number(params.get("totalKRW") ?? 0);
  const totalConverted = Number(params.get("totalConverted") ?? 0);
  const sym = CURRENCY_SYMBOLS[currency] ?? "₩";

  const [step, setStep] = useState<PayStep>("info");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [payMethod, setPayMethod] = useState("toss");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  function handlePay() {
    setIsProcessing(true);
    // Simulate payment processing (1.5s)
    setTimeout(() => {
      const newTicket: Ticket = {
        ticketId: generateTicketId(),
        venueId,
        venueName,
        visitDate,
        adultCount,
        childCount,
        totalKRW,
        currency,
        totalConverted,
        buyerName,
        buyerEmail,
        issuedAt: new Date().toISOString(),
        isUsed: false,
      };
      saveTicket(newTicket);
      setTicket(newTicket);
      setIsProcessing(false);
      setStep("done");
    }, 1500);
  }

  if (!venueId) {
    return (
      <div className="text-center text-muted py-12">
        <p>잘못된 접근입니다.</p>
        <a href="/" className="text-p1l underline mt-2 inline-block">홈으로 돌아가기</a>
      </div>
    );
  }

  return (
    <div>
      {/* Order summary (always visible) */}
      <div className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl p-5 mb-6">
        <div className="text-xs font-mono text-muted tracking-wider mb-3">주문 내역</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">시설</span><span className="text-white font-medium">{venueName}</span></div>
          <div className="flex justify-between"><span className="text-muted">방문 날짜</span><span className="text-white">{visitDate}</span></div>
          <div className="flex justify-between"><span className="text-muted">성인</span><span className="text-white">{adultCount}명</span></div>
          {childCount > 0 && (
            <div className="flex justify-between"><span className="text-muted">어린이</span><span className="text-white">{childCount}명</span></div>
          )}
          <div className="flex justify-between border-t border-[rgba(255,255,255,.06)] pt-2 mt-2">
            <span className="text-muted">합계</span>
            <span className="text-p1l font-black text-lg">{sym}{totalConverted.toLocaleString()} {currency}</span>
          </div>
        </div>
      </div>

      {/* Step: 구매자 정보 */}
      {step === "info" && (
        <div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-muted mb-1.5">이름 (영문 권장)</label>
              <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Hong Gil-dong"
                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.08)] text-white text-sm outline-none focus:border-[rgba(14,165,233,.4)] transition-colors placeholder:text-muted"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1.5">이메일 (QR 코드 수신)</label>
              <input type="email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.08)] text-white text-sm outline-none focus:border-[rgba(14,165,233,.4)] transition-colors placeholder:text-muted"
              />
            </div>
          </div>
          <button
            onClick={() => setStep("pay")}
            disabled={!buyerName || !buyerEmail.includes("@")}
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{ background: "linear-gradient(135deg,#0EA5E9,#7C3AED)" }}
          >
            결제 방법 선택 →
          </button>
        </div>
      )}

      {/* Step: 결제 방법 */}
      {step === "pay" && (
        <div>
          <div className="space-y-3 mb-6">
            {PAY_METHODS.map((m) => (
              <button key={m.id} onClick={() => setPayMethod(m.id)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left"
                style={{
                  background: payMethod === m.id ? "rgba(14,165,233,.1)" : "rgba(255,255,255,.03)",
                  borderColor: payMethod === m.id ? "rgba(14,165,233,.5)" : "rgba(255,255,255,.08)",
                }}>
                <span className="text-2xl">{m.icon}</span>
                <span className={`font-medium text-sm ${payMethod === m.id ? "text-p1l" : "text-muted"}`}>{m.label}</span>
                {payMethod === m.id && <span className="ml-auto text-p1l text-sm">✓</span>}
              </button>
            ))}
          </div>

          <div className="bg-[rgba(245,158,11,.06)] border border-[rgba(245,158,11,.2)] rounded-xl p-3.5 text-xs text-muted mb-6">
            🔒 결제 즉시 이메일({buyerEmail})로 QR 코드가 발송됩니다.
          </div>

          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait"
            style={{ background: "linear-gradient(135deg,#0EA5E9,#7C3AED)" }}
          >
            {isProcessing ? "결제 처리 중..." : `${sym}${totalConverted.toLocaleString()} 결제하기`}
          </button>
        </div>
      )}

      {/* Step: 완료 */}
      {step === "done" && ticket && (
        <div className="text-center">
          <div className="text-6xl mb-5">🎫</div>
          <h2 className="text-2xl font-black text-white mb-2">결제 완료!</h2>
          <p className="text-muted text-sm mb-2">QR 코드가 생성되었습니다.</p>
          <p className="text-xs text-muted mb-8">
            <span className="text-p1l">{buyerEmail}</span>로 QR 코드가 발송됩니다.
          </p>
          <button
            onClick={() => router.push(`/ticket/${ticket.ticketId}`)}
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 mb-3"
            style={{ background: "linear-gradient(135deg,#0EA5E9,#7C3AED)" }}
          >
            QR 코드 확인하기 →
          </button>
          <a href="/"
            className="block text-sm text-muted hover:text-white transition-colors mt-2">
            홈으로 돌아가기
          </a>
        </div>
      )}
    </div>
  );
}
