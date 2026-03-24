"use client";

import Link from "next/link";

export function STOHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center relative overflow-hidden bg-bg">
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.07) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%,black 40%,transparent 100%)",
        }}
      />
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-60%)",
        }}
      />

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8 border"
          style={{ background: "rgba(124,58,237,.15)", borderColor: "rgba(124,58,237,.35)", color: "#A78BFA" }}>
          <span className="w-2 h-2 rounded-full bg-p0l animate-pulse" />
          ERC-1400 · Polygon Mainnet · 규제 샌드박스 신청 예정
        </div>

        <h1 className="font-black leading-none mb-6 tracking-tight"
          style={{ fontSize: "clamp(3rem,10vw,7rem)" }}>
          <span className="block text-white">공연에</span>
          <span className="block" style={{
            background: "linear-gradient(90deg,#A78BFA,#7DD3FC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            투자하다
          </span>
        </h1>

        <p className="text-lg text-muted max-w-md mx-auto mb-10 font-light leading-relaxed">
          공연·전시 수익권을 디지털 증권(STO)으로 토큰화.<br />
          <strong className="text-[#E8EDF5] font-medium">1만 원부터</strong> 누구나 참여하는 블록체인 투자.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/markets"
            className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}>
            STO 청약 목록 보기
          </Link>
          <Link href="/kyc"
            className="px-8 py-4 rounded-xl font-medium text-[#E8EDF5] border border-[rgba(255,255,255,.06)] bg-transparent transition-all hover:border-[rgba(255,255,255,.2)]">
            KYC 인증하기 →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[rgba(255,255,255,.06)]">
          {[
            { val: "₩10,000", label: "최소 투자금" },
            { val: "2%", label: "발행 수수료" },
            { val: "1.5%", label: "2차 거래 수수료" },
            { val: "자동", label: "스마트컨트랙트 정산" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-p0l leading-none">{s.val}</div>
              <div className="text-xs text-muted mt-1 tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
