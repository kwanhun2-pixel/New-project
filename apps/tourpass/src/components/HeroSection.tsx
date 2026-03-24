"use client";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden bg-bg">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(14,165,233,.12) 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-[rgba(14,165,233,.15)] border border-[rgba(14,165,233,.3)] rounded-full px-4 py-1.5 text-p1l text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-p1l animate-pulse" />
          Loop8 TourPass — 한국 문화시설 통합 입장권
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 tracking-tight">
          <span className="block text-white">한국의</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #7DD3FC, #A78BFA, #F0ABFC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            문화를 즐기다
          </span>
        </h1>

        <p className="text-lg text-muted max-w-lg mx-auto mb-10 font-light leading-relaxed">
          경복궁·창덕궁·덕수궁·박물관 등<br />
          <strong className="text-[#E8EDF5] font-medium">
            한국 주요 문화시설
          </strong>{" "}
          입장권을 온라인으로 구매하고
          <br />
          QR 코드 하나로 간편하게 입장하세요.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="/venues"
            className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
              boxShadow: "0 0 0 rgba(14,165,233,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 12px 40px rgba(14,165,233,.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 0 rgba(14,165,233,0)";
            }}
          >
            입장권 구매하기
          </a>
          <a
            href="/how-it-works"
            className="px-8 py-4 rounded-xl font-medium text-[#E8EDF5] border border-[rgba(255,255,255,.06)] bg-transparent transition-all hover:border-[rgba(255,255,255,.2)] hover:bg-[rgba(255,255,255,.03)]"
          >
            이용 방법 →
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-16 pt-12 border-t border-[rgba(255,255,255,.06)] flex-wrap">
          <div className="text-center">
            <div className="text-4xl font-black text-p1l leading-none">3곳</div>
            <div className="text-xs text-muted mt-1 tracking-widest">
              1단계 연동 궁
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-p0l leading-none">5개</div>
            <div className="text-xs text-muted mt-1 tracking-widest">
              지원 언어
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-p2l leading-none">4개</div>
            <div className="text-xs text-muted mt-1 tracking-widest">
              지원 통화
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-p3l leading-none">QR</div>
            <div className="text-xs text-muted mt-1 tracking-widest">
              즉시 입장
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
