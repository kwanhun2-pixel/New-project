"use client";

interface STOItem {
  id: string;
  title: string;
  description: string;
  genre: string;
  venue: string;
  totalAmount: number;
  raisedAmount: number;
  minInvestment: number;
  expectedReturn: number;
  deadline: string;
  status: "active" | "upcoming" | "closed";
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
    minInvestment: 10_000,
    expectedReturn: 18,
    deadline: "2024-03-31",
    status: "active",
  },
  {
    id: "exhibition-monet-2024",
    title: "모네와 인상주의 특별전",
    description: "프랑스 오르세 미술관 협력 기획전. 예상 입장객 15만 명.",
    genre: "전시",
    venue: "국립현대미술관 서울",
    totalAmount: 800_000_000,
    raisedAmount: 128_000_000,
    minInvestment: 10_000,
    expectedReturn: 12,
    deadline: "2024-04-15",
    status: "active",
  },
  {
    id: "concert-jazz-festival",
    title: "서울 재즈 페스티벌 2024",
    description: "국내 최대 야외 재즈 축제. 3일간 진행, 해외 아티스트 10팀.",
    genre: "콘서트",
    venue: "올림픽공원 88잔디마당",
    totalAmount: 1_200_000_000,
    raisedAmount: 0,
    minInvestment: 50_000,
    expectedReturn: 15,
    deadline: "2024-05-01",
    status: "upcoming",
  },
  {
    id: "ballet-swan-lake",
    title: "국립발레단 <백조의 호수>",
    description: "국립발레단 정기공연. 총 20회, 예상 관객 1만 2천 명.",
    genre: "발레",
    venue: "국립극장 해오름극장",
    totalAmount: 300_000_000,
    raisedAmount: 300_000_000,
    minInvestment: 10_000,
    expectedReturn: 10,
    deadline: "2024-02-28",
    status: "closed",
  },
];

const statusConfig = {
  active: { label: "청약 중", bg: "#E8F5F1", color: "#00B386" },
  upcoming: { label: "예정", bg: "#EBF3FF", color: "#1A73E8" },
  closed: { label: "종료", bg: "#F5F5F5", color: "#999999" },
};

interface MarketListProps {
  showAll?: boolean;
}

export function MarketList({ showAll = false }: MarketListProps) {
  const items = showAll ? MOCK_ITEMS : MOCK_ITEMS.filter((i) => i.status !== "closed").slice(0, 3);

  return (
    <section className="px-5 py-16 max-w-6xl mx-auto">
      {!showAll && (
        <>
          <div className="text-[#888888] text-xs font-medium tracking-widest mb-3 uppercase">STO MARKETS</div>
          <h2 className="text-3xl font-black text-[#191919] leading-tight mb-2">청약 목록</h2>
          <p className="text-[#666666] text-base mb-10">진행 중인 공연·전시 수익권 투자 상품입니다.</p>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <STOCard key={item.id} item={item} />
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-8">
          <a
            href="/markets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-[#E8EAED] bg-white text-[#555555] hover:bg-[#F7F8FA] transition-all"
          >
            전체 청약 목록 보기 →
          </a>
        </div>
      )}
    </section>
  );
}

function STOCard({ item }: { item: STOItem }) {
  const progress = item.totalAmount > 0 ? (item.raisedAmount / item.totalAmount) * 100 : 0;
  const cfg = statusConfig[item.status];

  return (
    <div className="bg-white border border-[#E8EAED] rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Top accent */}
      <div className="h-1" style={{ background: item.status === "active" ? "#FFE400" : item.status === "upcoming" ? "#1A73E8" : "#CCCCCC" }} />

      <div className="p-5">
        {/* Genre + Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-[#888888] bg-[#F7F8FA] px-2 py-1 rounded-md">{item.genre}</span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#191919] mb-1 leading-snug">{item.title}</h3>
        <p className="text-[#888888] text-xs mb-1">📍 {item.venue}</p>
        <p className="text-[#666666] text-xs leading-relaxed mb-5 line-clamp-2">{item.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#888888]">모금 진행률</span>
            <span className="font-bold text-[#191919]">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#F0F0F0]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: item.status === "active" ? "#FFE400" : item.status === "upcoming" ? "#1A73E8" : "#CCCCCC",
              }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1.5 text-[#888888]">
            <span>₩{(item.raisedAmount / 100_000_000).toFixed(1)}억 모금</span>
            <span>목표 ₩{(item.totalAmount / 100_000_000).toFixed(0)}억</span>
          </div>
        </div>

        {/* Key info */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#F7F8FA] rounded-xl p-3 text-center">
            <div className="text-xs text-[#888888] mb-0.5">최소 투자</div>
            <div className="text-sm font-bold text-[#191919]">
              ₩{item.minInvestment.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#F0FBF7] rounded-xl p-3 text-center">
            <div className="text-xs text-[#888888] mb-0.5">예상 수익률</div>
            <div className="text-sm font-bold text-[#00B386]">
              +{item.expectedReturn}%
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className="text-xs text-[#888888] mb-4">
          📅 청약 마감: {item.deadline}
        </div>

        <button
          disabled={item.status !== "active"}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: item.status === "active" ? "#FFE400" : "#F0F0F0",
            color: item.status === "active" ? "#191919" : "#999999",
          }}
        >
          {item.status === "active" ? "청약 참여하기" : item.status === "upcoming" ? "사전 알림 신청" : "청약 종료"}
        </button>
      </div>
    </div>
  );
}
