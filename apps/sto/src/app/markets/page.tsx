import { MarketList } from "@/components/MarketList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STO 마켓 — Loop8",
  description: "진행 중·예정·종료 공연 수익권 청약 목록",
};

export default function MarketsPage() {
  return (
    <main className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-p0l font-mono text-xs tracking-widest mb-4 uppercase">STO MARKETS</div>
        <h1 className="text-5xl font-black text-white leading-none mb-3">청약 목록</h1>
        <p className="text-muted text-lg mb-12 font-light">
          공연·전시 수익권에 1만 원부터 투자하세요.
        </p>
        <MarketList showAll />
      </div>
    </main>
  );
}
