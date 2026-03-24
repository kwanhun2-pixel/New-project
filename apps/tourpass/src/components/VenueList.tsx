"use client";

interface Venue {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  priceKRW: number;
  location: string;
  emoji: string;
  phase: 1 | 2 | 3;
}

const venues: Venue[] = [
  {
    id: "gyeongbokgung",
    name: "경복궁",
    nameEn: "Gyeongbokgung Palace",
    category: "궁궐",
    priceKRW: 3000,
    location: "서울 종로구",
    emoji: "🏯",
    phase: 1,
  },
  {
    id: "changdeokgung",
    name: "창덕궁",
    nameEn: "Changdeokgung Palace",
    category: "궁궐 · UNESCO",
    priceKRW: 3000,
    location: "서울 종로구",
    emoji: "🏰",
    phase: 1,
  },
  {
    id: "deoksugung",
    name: "덕수궁",
    nameEn: "Deoksugung Palace",
    category: "궁궐",
    priceKRW: 1000,
    location: "서울 중구",
    emoji: "🏛️",
    phase: 1,
  },
  {
    id: "national-museum",
    name: "국립중앙박물관",
    nameEn: "National Museum of Korea",
    category: "박물관",
    priceKRW: 0,
    location: "서울 용산구",
    emoji: "🏺",
    phase: 2,
  },
  {
    id: "folk-village",
    name: "한국민속촌",
    nameEn: "Korean Folk Village",
    category: "민속촌",
    priceKRW: 25000,
    location: "경기 용인시",
    emoji: "🎪",
    phase: 3,
  },
];

export function VenueList() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-p1l font-mono text-xs tracking-widest mb-4 uppercase">
        VENUES
      </div>
      <h2 className="text-5xl font-black leading-none mb-3 tracking-tight text-white">
        연동 시설
      </h2>
      <p className="text-muted text-lg mb-12 font-light">
        단계별로 연동 시설을 확대합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  const phaseColors = {
    1: { bg: "rgba(14,165,233,.12)", border: "rgba(14,165,233,.4)", text: "#7DD3FC" },
    2: { bg: "rgba(124,58,237,.12)", border: "rgba(124,58,237,.4)", text: "#A78BFA" },
    3: { bg: "rgba(245,158,11,.12)", border: "rgba(245,158,11,.4)", text: "#FCD34D" },
  };
  const colors = phaseColors[venue.phase];

  return (
    <div
      className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[rgba(255,255,255,.12)] cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{venue.emoji}</div>
        <span
          className="text-xs font-mono px-2.5 py-1 rounded-full border"
          style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}
        >
          {venue.phase}단계
        </span>
      </div>

      <div className="mb-1 text-xs text-muted font-mono tracking-wider">
        {venue.category}
      </div>
      <h3 className="text-lg font-bold text-white mb-0.5">{venue.name}</h3>
      <div className="text-sm text-muted mb-4">{venue.nameEn}</div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">📍 {venue.location}</span>
        <span className="font-bold" style={{ color: colors.text }}>
          {venue.priceKRW === 0
            ? "무료"
            : `₩${venue.priceKRW.toLocaleString()}`}
        </span>
      </div>

      <button
        className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${colors.text}22, ${colors.text}44)`, border: `1px solid ${colors.border}`, color: colors.text }}
      >
        입장권 구매 →
      </button>
    </div>
  );
}
