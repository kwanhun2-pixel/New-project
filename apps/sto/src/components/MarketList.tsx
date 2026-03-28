"use client";

import { useState } from "react";

interface STOItem {
  id: string;
  title: string;
  description: string;
  genre: string;
  venue: string;
  totalAmount: number;
  raisedAmount: number;
  pricePerToken: number;
  priceChange: number;
  expectedReturn: number;
  deadline: string;
  status: "active" | "upcoming" | "closed";
  categoryLabel: string;
  gradient: string;
  emoji: string;
}

const MOCK_ITEMS: STOItem[] = [
  {
    id: "musical-hero-2024",
    title: "뮤지컬 <히어로> 2024 앙코르",
    description: "2023 흥행 뮤지컬의 앙코르 공연. 총 60회 공연, 예상 관객 3만 명.",
    genre: "뮤지컬",
    venue: "LG아트센터 서울",
    totalAmount: 500_000_000,
    raisedAmount: 312_000_000,
    pricePerToken: 10_000,
    priceChange: 2.4,
    expectedReturn: 18,
    deadline: "2024-03-31",
    status: "active",
    categoryLabel: "수익형 공연",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    emoji: "🎭",
  },
  {
    id: "exhibition-monet-2024",
    title: "모네와 인상주의 특별전",
    description: "프랑스 오르세 미술관 협력 기획전. 예상 입장객 15만 명.",
    genre: "전시",
    venue: "국립현대미술관 서울",
    totalAmount: 800_000_000,
    raisedAmount: 128_000_000,
    pricePerToken: 10_000,
    priceChange: 1.2,
    expectedReturn: 12,
    deadline: "2024-04-15",
    status: "active",
    categoryLabel: "대체 보유자산",
    gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
    emoji: "🖼️",
  },
  {
    id: "concert-jazz-festival",
    title: "서울 재즈 페스티벌 2024",
    description: "국내 최대 야외 재즈 축제. 3일간 진행, 해외 아티스트 10팀.",
    genre: "콘서트",
    venue: "올림픽공원 88잔디마당",
    totalAmount: 1_200_000_000,
    raisedAmount: 0,
    pricePerToken: 50_000,
    priceChange: 0,
    expectedReturn: 15,
    deadline: "2024-05-01",
    status: "upcoming",
    categoryLabel: "안전 자산",
    gradient: "linear-gradient(135deg, #0f3460 0%, #533483 100%)",
    emoji: "🎺",
  },
  {
    id: "ballet-swan-lake",
    title: "국립발레단 <백조의 호수>",
    description: "국립발레단 정기공연. 총 20회, 예상 관객 1만 2천 명.",
    genre: "발레",
    venue: "국립극장 해오름극장",
    totalAmount: 300_000_000,
    raisedAmount: 300_000_000,
    pricePerToken: 10_000,
    priceChange: -0.8,
    expectedReturn: 10,
    deadline: "2024-02-28",
    status: "closed",
    categoryLabel: "수익형 공연",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #c94b4b 100%)",
    emoji: "🩰",
  },
];

const GENRES = ["전체", "뮤지컬", "전시", "콘서트", "발레"];

const GENRE_ICONS: Record<string, string> = {
  전체: "",
  뮤지컬: "🎭",
  전시: "🖼️",
  콘서트: "🎺",
  발레: "🩰",
};

interface MarketListProps {
  showAll?: boolean;
}

export function MarketList({ showAll = false }: MarketListProps) {
  const [selectedGenre, setSelectedGenre] = useState("전체");

  const filtered = MOCK_ITEMS.filter((item) => {
    if (!showAll && item.status === "closed") return false;
    if (selectedGenre !== "전체" && item.genre !== selectedGenre) return false;
    return true;
  }).slice(0, showAll ? undefined : 3);

  return (
    <section className="px-4 py-6 max-w-2xl mx-auto">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-[#191919]">탐색</h2>
        {!showAll && (
          <a href="/markets" className="text-sm text-[#888888] hover:text-[#191919] transition-colors">
            전체보기
          </a>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: selectedGenre === genre ? "#191919" : "#FFFFFF",
              color: selectedGenre === genre ? "#FFFFFF" : "#555555",
              border: selectedGenre === genre ? "none" : "1px solid #E8EAED",
            }}
          >
            {GENRE_ICONS[genre] && <span>{GENRE_ICONS[genre]}</span>}
            {genre}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📦</div>
            <div className="font-bold text-[#191919] text-base mb-1">해당 장르의 상품이 없습니다</div>
            <div className="text-[#888888] text-sm">다른 장르를 선택해보세요</div>
          </div>
        ) : (
          filtered.map((item) => <STOCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  );
}

function STOCard({ item }: { item: STOItem }) {
  const progress = item.totalAmount > 0 ? (item.raisedAmount / item.totalAmount) * 100 : 0;
  const isPositive = item.priceChange >= 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      {/* Image area */}
      <div className="relative h-44 flex items-center justify-center" style={{ background: item.gradient }}>
        <span className="text-6xl opacity-40">{item.emoji}</span>
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
            {item.categoryLabel}
          </span>
        </div>
        {item.status === "upcoming" && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#1A73E8]/80 text-white text-xs px-2.5 py-1 rounded-full font-medium">예정</span>
          </div>
        )}
        {item.status === "closed" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm">청약 종료</span>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-4">
        <div className="text-xs text-[#888888] mb-1">{item.genre}</div>
        <div className="font-bold text-[#191919] text-base mb-3 leading-snug">{item.title}</div>

        {/* Progress */}
        <div className="mb-3">
          <div className="h-1 rounded-full bg-[#F2F3F5] mb-1">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: item.status === "active" ? "#FFE400" : item.status === "upcoming" ? "#1A73E8" : "#CCCCCC",
              }}
            />
          </div>
          <div className="text-xs text-[#888888]">모금률 {progress.toFixed(1)}%</div>
        </div>

        <div className="border-t border-[#F2F3F5] pt-3 flex items-end justify-between">
          <div>
            <div className="text-xs text-[#888888] mb-0.5">1조각 단가</div>
            <div className="font-bold text-[#191919] text-sm flex items-center gap-1.5">
              {item.pricePerToken.toLocaleString()}원
              {item.priceChange !== 0 && (
                <span className="text-xs font-medium" style={{ color: isPositive ? "#FF3B30" : "#1A73E8" }}>
                  {isPositive ? "+" : ""}{item.priceChange}%
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#888888] mb-0.5">예상 연 수익률</div>
            <div className="font-bold text-sm" style={{ color: "#FF3B30" }}>
              {item.expectedReturn}%
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button
          disabled={item.status !== "active"}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: item.status === "active" ? "#FFE400" : "#F2F3F5",
            color: item.status === "active" ? "#191919" : "#888888",
          }}
        >
          {item.status === "active" ? "구매하기" : item.status === "upcoming" ? "사전 알림 신청" : "청약 종료"}
        </button>
      </div>
    </div>
  );
}
