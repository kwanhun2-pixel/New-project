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
  active: { label: "청약 중", bg: "rgba(16,185,129,.12)", border: "rgba(16,185,129,.4)", text: "#6EE7B7" },
  upcoming: { label: "예정", bg: "rgba(14,165,233,.12)", border: "rgba(14,165,233,.4)", text: "#7DD3FC" },
  closed: { label: "종료", bg: "rgba(255,255,255,.05)", border: "rgba(255,255,255,.1)", text: "#6B7A99" },
};

interface MarketListProps {
  showAll?: boolean;
}

export function MarketList({ showAll = false }: MarketListProps) {
  const items = showAll ? MOCK_ITEMS : MOCK_ITEMS.filter((i) => i.status !== "closed").slice(0, 3);

  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      {!showAll && (
        <>
          <div className="text-p0l font-mono text-xs tracking-widest mb-4 uppercase">STO MARKETS</div>
          <h2 className="text-5xl font-black text-white leading-none mb-2">청약 목록</h2>
          <p className="text-muted text-lg mb-12 font-light">진행 중인 공연·전시 수익권 투자 상품입니다.</p>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <STOCard key={item.id} item={item} />
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-10">
          <a href="/markets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:border-[rgba(124,58,237,.5)] hover:bg-[rgba(124,58,237,.08)]"
            style={{ borderColor: "rgba(255,255,255,.08)", color: "#A78BFA" }}>
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
    <div className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[rgba(124,58,237,.35)] group">
      {/* Top accent */}
      <div className="h-1" style={{ background: "linear-gradient(90deg,#7C3AED,#A78BFA)" }} />

      <div className="p-6">
        {/* Genre + Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-muted tracking-wider">{item.genre}</span>
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium"
            style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}>
            {cfg.label}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1 leading-snug">{item.title}</h3>
        <p className="text-muted text-xs mb-1">📍 {item.venue}</p>
        <p className="text-muted text-xs leading-relaxed mb-5 line-clamp-2">{item.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted">모금 진행률</span>
            <span className="font-bold" style={{ color: "#A78BFA" }}>{progress.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.06)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%`, background: "linear-gradient(90deg,#7C3AED,#A78BFA)" }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1.5 text-muted">
            <span>₩{(item.raisedAmount / 100_000_000).toFixed(1)}억 모금</span>
            <span>목표 ₩{(item.totalAmount / 100_000_000).toFixed(0)}억</span>
          </div>
        </div>

        {/* Key info */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[rgba(124,58,237,.08)] rounded-xl p-3 text-center">
            <div className="text-xs text-muted mb-0.5">최소 투자</div>
            <div className="text-sm font-bold" style={{ color: "#A78BFA" }}>
              ₩{item.minInvestment.toLocaleString()}
            </div>
          </div>
          <div className="bg-[rgba(16,185,129,.08)] rounded-xl p-3 text-center">
            <div className="text-xs text-muted mb-0.5">예상 수익률</div>
            <div className="text-sm font-bold" style={{ color: "#6EE7B7" }}>
              +{item.expectedReturn}%
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className="text-xs text-muted mb-5">
          📅 청약 마감: {item.deadline}
        </div>

        <button
          disabled={item.status !== "active"}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
          style={{ background: item.status === "active" ? "linear-gradient(135deg,#7C3AED,#0EA5E9)" : "rgba(255,255,255,.05)" }}
        >
          {item.status === "active" ? "청약 참여하기" : item.status === "upcoming" ? "사전 알림 신청" : "청약 종료"}
        </button>
      </div>
    </div>
  );
}
