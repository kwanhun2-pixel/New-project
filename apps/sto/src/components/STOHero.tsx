"use client";

import Link from "next/link";

export function STOHero() {
  return (
    <section className="pt-14 bg-white">
      {/* Top banner */}
      <div className="bg-[#FFF9C4] border-b border-[#FFE400] px-5 py-2.5 text-center text-sm text-[#555555]">
        <span className="font-medium text-[#191919]">규제 샌드박스 신청 예정</span>
        {"  "}· ERC-1400 · Polygon Mainnet
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
              style={{ background: "#FFF9C4", color: "#555500" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0D800]" />
              공연예술 소액 투자 플랫폼
            </div>

            <h1 className="font-black text-[#191919] leading-tight mb-4" style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)" }}>
              공연에<br />
              <span style={{ background: "linear-gradient(90deg,#191919,#444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                투자하다
              </span>
              <span
                className="inline-block ml-3 px-3 py-1 rounded-lg text-[#191919] font-black align-middle"
                style={{ background: "#FFE400", fontSize: "clamp(1rem,3vw,1.5rem)" }}
              >
                1만원~
              </span>
            </h1>

            <p className="text-[#666666] text-base leading-relaxed mb-8 max-w-md">
              공연·전시 수익권을 디지털 증권(STO)으로 토큰화.<br />
              누구나 소액으로 공연 수익을 함께 나눠요.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/markets"
                className="px-6 py-3 rounded-xl font-bold text-[#191919] text-sm transition-all hover:brightness-95 shadow-sm"
                style={{ background: "#FFE400" }}
              >
                STO 청약 목록 보기
              </Link>
              <Link
                href="/kyc"
                className="px-6 py-3 rounded-xl font-medium text-[#555555] text-sm border border-[#E8EAED] bg-white hover:bg-[#F7F8FA] transition-all"
              >
                KYC 인증하기 →
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="flex-shrink-0 w-full md:w-80">
            <div className="bg-[#F7F8FA] rounded-2xl p-6 border border-[#E8EAED]">
              <div className="text-xs text-[#888888] font-medium mb-4">플랫폼 정보</div>
              <div className="space-y-4">
                {[
                  { val: "₩10,000", label: "최소 투자금", color: "#191919" },
                  { val: "2%", label: "발행 수수료", color: "#191919" },
                  { val: "1.5%", label: "2차 거래 수수료", color: "#191919" },
                  { val: "자동", label: "스마트컨트랙트 정산", color: "#00B386" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-3 border-b border-[#E8EAED] last:border-0">
                    <span className="text-sm text-[#666666]">{s.label}</span>
                    <span className="text-base font-bold" style={{ color: s.color }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
