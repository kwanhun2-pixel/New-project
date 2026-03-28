"use client";

import Link from "next/link";

export function STOHero() {
  return (
    <section className="pt-14 bg-white border-b border-[#E8EAED]">
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-black text-[#191919] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)" }}>
              세상의 모든 공연을<br />
              내 지갑 속에 조각으로
            </h1>
            <p className="text-[#888888] text-sm leading-relaxed mb-6">
              뮤지컬, 전시, 콘서트, 발레까지.<br />
              안전하고 투명하게 블록체인에서 거래하세요.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/markets"
                className="px-5 py-2.5 rounded-xl font-bold text-[#191919] text-sm hover:brightness-95 transition-all"
                style={{ background: "#FFE400" }}
              >
                구매하기
              </Link>
              <Link
                href="/kyc"
                className="px-5 py-2.5 rounded-xl font-medium text-[#555555] text-sm border border-[#E8EAED] bg-white hover:bg-[#F2F3F5] transition-all"
              >
                KYC 인증
              </Link>
            </div>
          </div>
          {/* Decorative element */}
          <div className="hidden md:flex flex-shrink-0 w-24 h-24 rounded-2xl items-center justify-center text-5xl" style={{ background: "#F2F3F5" }}>
            🎭
          </div>
        </div>
      </div>
    </section>
  );
}
