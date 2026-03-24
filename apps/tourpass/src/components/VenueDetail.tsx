"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Venue } from "@/lib/venues";
import { convertCurrency, CURRENCY_SYMBOLS } from "@/lib/ticket";

const CURRENCIES = ["KRW", "USD", "JPY", "TWD"];

interface Props {
  venue: Venue;
}

export function VenueDetail({ venue }: Props) {
  const router = useRouter();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [currency, setCurrency] = useState("KRW");
  const [visitDate, setVisitDate] = useState("");

  const totalKRW = venue.priceKRW * (adultCount + childCount * 0.5);
  const totalConverted = convertCurrency(totalKRW, currency);
  const sym = CURRENCY_SYMBOLS[currency];

  function handleCheckout() {
    const params = new URLSearchParams({
      venueId: venue.id,
      venueName: venue.name,
      visitDate,
      adultCount: String(adultCount),
      childCount: String(childCount),
      currency,
      totalKRW: String(totalKRW),
      totalConverted: String(totalConverted),
    });
    router.push(`/checkout?${params}`);
  }

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <main className="pt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Back */}
        <a href="/" className="inline-flex items-center gap-2 text-muted text-sm hover:text-white transition-colors mb-8">
          ← 시설 목록으로
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <div className="text-xs font-mono text-p1l tracking-widest mb-3">{venue.category}</div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{venue.emoji}</span>
              <div>
                <h1 className="text-3xl font-black text-white leading-none">{venue.name}</h1>
                <p className="text-muted text-sm mt-1">{venue.nameEn}</p>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-8">{venue.description}</p>

            {/* Highlights */}
            <div className="mb-8">
              <div className="text-xs font-mono text-muted tracking-wider mb-3">HIGHLIGHTS</div>
              <div className="flex flex-wrap gap-2">
                {venue.highlights.map((h) => (
                  <span key={h} className="px-3 py-1.5 rounded-xl text-sm border"
                    style={{ background: "rgba(14,165,233,.1)", borderColor: "rgba(14,165,233,.3)", color: "#7DD3FC" }}>
                    ✨ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: "📍", label: "주소", value: venue.address },
                { icon: "🕐", label: "운영시간", value: venue.openHours },
                { icon: "🚫", label: "휴관일", value: venue.closedDay },
                { icon: "💳", label: "성인 입장료", value: venue.priceKRW === 0 ? "무료" : `₩${venue.priceKRW.toLocaleString()}` },
              ].map((item) => (
                <div key={item.label} className="bg-surface border border-[rgba(255,255,255,.06)] rounded-xl p-4">
                  <div className="text-xs text-muted mb-1">{item.icon} {item.label}</div>
                  <div className="text-sm font-medium text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Purchase box */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl p-6 sticky top-20">
              <div className="text-xs font-mono text-p1l tracking-widest mb-4">입장권 구매</div>

              {/* Currency selector */}
              <div className="mb-5">
                <div className="text-xs text-muted mb-2">결제 통화</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {CURRENCIES.map((c) => (
                    <button key={c} onClick={() => setCurrency(c)}
                      className="py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
                      style={{
                        background: currency === c ? "rgba(14,165,233,.2)" : "rgba(255,255,255,.04)",
                        border: currency === c ? "1px solid rgba(14,165,233,.5)" : "1px solid rgba(255,255,255,.06)",
                        color: currency === c ? "#7DD3FC" : "#6B7A99",
                      }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visit date */}
              <div className="mb-5">
                <div className="text-xs text-muted mb-2">방문 날짜</div>
                <input type="date" min={minDate} value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.08)] text-white outline-none focus:border-[rgba(14,165,233,.4)] transition-colors"
                />
              </div>

              {/* Count selectors */}
              <div className="space-y-3 mb-5">
                <CountSelector
                  label="성인"
                  sublabel={`${sym}${convertCurrency(venue.priceKRW, currency).toLocaleString()}`}
                  value={adultCount}
                  min={1}
                  max={10}
                  onChange={setAdultCount}
                />
                <CountSelector
                  label="어린이 (7~12세)"
                  sublabel={`${sym}${convertCurrency(Math.round(venue.priceKRW * 0.5), currency).toLocaleString()} (50%)`}
                  value={childCount}
                  min={0}
                  max={10}
                  onChange={setChildCount}
                />
              </div>

              {/* Total */}
              <div className="border-t border-[rgba(255,255,255,.06)] pt-4 mb-5">
                <div className="flex justify-between text-sm text-muted mb-1">
                  <span>합계</span>
                  <span className="text-xs">(₩{totalKRW.toLocaleString()})</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-p1l">
                    {sym}{totalConverted.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted">{currency}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!visitDate || (adultCount + childCount === 0)}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ background: "linear-gradient(135deg,#0EA5E9,#7C3AED)" }}
              >
                결제하기 →
              </button>

              <div className="mt-3 text-center text-xs text-muted">
                🔒 결제 즉시 QR 코드 발급
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CountSelector({
  label,
  sublabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 bg-[rgba(255,255,255,.03)] rounded-xl border border-[rgba(255,255,255,.06)]">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-muted">{sublabel}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold transition-colors hover:bg-[rgba(255,255,255,.1)]"
          style={{ background: "rgba(255,255,255,.06)" }}
        >
          −
        </button>
        <span className="text-white font-bold w-4 text-center">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold transition-colors hover:bg-[rgba(14,165,233,.3)]"
          style={{ background: "rgba(14,165,233,.2)" }}
        >
          +
        </button>
      </div>
    </div>
  );
}
