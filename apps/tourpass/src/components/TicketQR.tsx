"use client";

import { useEffect, useState } from "react";
import { getTicket, buildQRPayload, CURRENCY_SYMBOLS } from "@/lib/ticket";
import type { Ticket } from "@/lib/ticket";

interface Props {
  ticketId: string;
}

export function TicketQR({ ticketId }: Props) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [qrPayload, setQrPayload] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = getTicket(ticketId);
    if (t) {
      setTicket(t);
      setQrPayload(buildQRPayload(t));
    }
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-muted text-sm mb-4">티켓을 찾을 수 없습니다.</p>
        <p className="text-xs text-muted mb-6">
          티켓 정보는 브라우저 세션에 저장됩니다.<br />
          새 탭이나 새 브라우저에서는 조회가 되지 않습니다.
        </p>
        <a href="/"
          className="inline-flex px-6 py-3 rounded-xl font-bold text-white text-sm"
          style={{ background: "linear-gradient(135deg,#0EA5E9,#7C3AED)" }}>
          입장권 구매하기
        </a>
      </div>
    );
  }

  const sym = CURRENCY_SYMBOLS[ticket.currency] ?? "₩";

  function handleCopy() {
    navigator.clipboard.writeText(ticketId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      {/* Ticket card */}
      <div className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl overflow-hidden">
        {/* Top bar */}
        <div className="h-1.5" style={{ background: "linear-gradient(90deg,#0EA5E9,#7C3AED)" }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-mono text-p1l tracking-widest mb-1">LOOP8 TOURPASS</div>
              <h2 className="text-xl font-black text-white">{ticket.venueName}</h2>
            </div>
            <div className="text-3xl">🎫</div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <QRDisplay payload={qrPayload} />
          </div>

          {/* Ticket details */}
          <div className="space-y-2.5 text-sm border-t border-[rgba(255,255,255,.06)] pt-5">
            {[
              { label: "방문 날짜", value: ticket.visitDate },
              { label: "성인", value: `${ticket.adultCount}명` },
              ...(ticket.childCount > 0 ? [{ label: "어린이", value: `${ticket.childCount}명` }] : []),
              { label: "결제 금액", value: `${sym}${ticket.totalConverted.toLocaleString()} ${ticket.currency}` },
              { label: "구매자", value: ticket.buyerName },
              { label: "발급 시각", value: new Date(ticket.issuedAt).toLocaleString("ko-KR") },
            ].map((row) => (
              <div key={row.label} className="flex justify-between">
                <span className="text-muted">{row.label}</span>
                <span className="text-white font-medium">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Ticket ID */}
          <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,.06)]">
            <div className="text-xs text-muted mb-1.5">티켓 ID</div>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono text-p1l bg-[rgba(14,165,233,.1)] px-2.5 py-1.5 rounded-lg flex-1 overflow-hidden text-ellipsis">
                {ticket.ticketId}
              </code>
              <button onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{ background: "rgba(255,255,255,.06)", color: copied ? "#6EE7B7" : "#6B7A99" }}>
                {copied ? "복사됨 ✓" : "복사"}
              </button>
            </div>
          </div>
        </div>

        {/* Status footer */}
        <div className="px-6 py-3 flex items-center justify-between"
          style={{ background: "rgba(16,185,129,.08)", borderTop: "1px solid rgba(16,185,129,.2)" }}>
          <span className="text-xs" style={{ color: "#6EE7B7" }}>✓ 유효한 입장권</span>
          <span className="text-xs text-muted">입장 게이트에서 QR을 제시하세요</span>
        </div>
      </div>

      {/* Usage guide */}
      <div className="mt-6 p-5 bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl text-sm text-muted space-y-2">
        <div className="font-semibold text-white text-base mb-3">📋 이용 안내</div>
        <div>• 방문 날짜에 입장 게이트에서 QR 코드를 제시하세요.</div>
        <div>• 1회만 사용 가능하며, 사용 후 입장 처리됩니다.</div>
        <div>• 스크린샷으로 저장하시면 오프라인에서도 사용 가능합니다.</div>
        <div>• 문의: tourpass@loop8.io</div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <a href="/"
          className="py-3 rounded-xl text-sm font-semibold text-center border transition-all hover:border-[rgba(255,255,255,.2)]"
          style={{ borderColor: "rgba(255,255,255,.08)", color: "#6B7A99" }}>
          홈으로
        </a>
        <button
          onClick={() => window.print()}
          className="py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#0EA5E9,#7C3AED)" }}>
          티켓 인쇄 / 저장
        </button>
      </div>
    </div>
  );
}

/** SVG 기반 간이 QR 렌더러 (실제 프로덕션에서는 qrcode.react 사용) */
function QRDisplay({ payload }: { payload: string }) {
  // payload를 시각적으로 나타내는 placeholder QR
  const size = 200;
  const cells = 25;
  const cellSize = size / cells;

  // payload를 seed로 사용해 결정론적 패턴 생성
  const pattern = generateQRPattern(payload, cells);

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-xl"
        style={{ background: "white", padding: 8 }}
      >
        {pattern.map((row, y) =>
          row.map((filled, x) =>
            filled ? (
              <rect
                key={`${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#070B14"
              />
            ) : null
          )
        )}
        {/* Finder patterns (corners) */}
        <FinderPattern x={0} y={0} cellSize={cellSize} />
        <FinderPattern x={(cells - 7) * cellSize} y={0} cellSize={cellSize} />
        <FinderPattern x={0} y={(cells - 7) * cellSize} cellSize={cellSize} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow text-lg">
          🎫
        </div>
      </div>
    </div>
  );
}

function FinderPattern({ x, y, cellSize }: { x: number; y: number; cellSize: number }) {
  return (
    <g>
      <rect x={x} y={y} width={cellSize * 7} height={cellSize * 7} fill="#070B14" />
      <rect x={x + cellSize} y={y + cellSize} width={cellSize * 5} height={cellSize * 5} fill="white" />
      <rect x={x + cellSize * 2} y={y + cellSize * 2} width={cellSize * 3} height={cellSize * 3} fill="#070B14" />
    </g>
  );
}

function generateQRPattern(seed: string, cells: number): boolean[][] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) >>> 0;
  }
  const pattern: boolean[][] = [];
  for (let y = 0; y < cells; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < cells; x++) {
      // Reserve finder pattern corners
      const inCorner =
        (x < 8 && y < 8) ||
        (x >= cells - 8 && y < 8) ||
        (x < 8 && y >= cells - 8);
      if (inCorner) { row.push(false); continue; }
      const val = (hash ^ (x * 31 + y * 17) ^ (x * y)) % 3;
      row.push(val === 0);
    }
    pattern.push(row);
  }
  return pattern;
}
