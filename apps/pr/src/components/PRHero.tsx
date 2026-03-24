"use client";

export function PRHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden bg-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-[rgba(16,185,129,.15)] border border-[rgba(16,185,129,.3)] rounded-full px-4 py-1.5 text-p3l text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-p3l animate-pulse" />
          Loop8 PR — 공연예술 PR·뉴스 플랫폼
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 tracking-tight">
          <span className="block text-white">보도자료</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #6EE7B7, #7DD3FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            자동 배포
          </span>
        </h1>

        <p className="text-lg text-muted max-w-lg mx-auto mb-10 font-light leading-relaxed">
          등록 한 번으로 <strong className="text-[#E8EDF5] font-medium">기자·SNS·파워블로그</strong>에 동시 배포.<br />
          IDEALAB의 공연예술 PR 노하우를 디지털로.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="/dashboard"
            className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #10B981, #0EA5E9)",
            }}
          >
            무료로 시작하기
          </a>
          <a
            href="/pricing"
            className="px-8 py-4 rounded-xl font-medium text-[#E8EDF5] border border-[rgba(255,255,255,.06)] bg-transparent transition-all hover:border-[rgba(255,255,255,.2)]"
          >
            요금제 보기 →
          </a>
        </div>

        <div className="flex items-center justify-center gap-12 mt-16 pt-12 border-t border-[rgba(255,255,255,.06)] flex-wrap">
          <div className="text-center">
            <div className="text-4xl font-black text-p3l leading-none">500명+</div>
            <div className="text-xs text-muted mt-1 tracking-widest">기자 풀 목표</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-[#7DD3FC] leading-none">20곳</div>
            <div className="text-xs text-muted mt-1 tracking-widest">2024 온보딩 목표</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-[#A78BFA] leading-none">즉시</div>
            <div className="text-xs text-muted mt-1 tracking-widest">자동 배포</div>
          </div>
        </div>
      </div>
    </section>
  );
}
