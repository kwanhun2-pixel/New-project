"use client";

const steps = [
  {
    num: "01",
    icon: "🌐",
    title: "온라인 구매",
    desc: "웹사이트에서 원하는 시설과 날짜를 선택하고 KRW·USD·JPY·TWD 중 편한 통화로 결제합니다.",
  },
  {
    num: "02",
    icon: "📱",
    title: "QR 코드 발급",
    desc: "결제 즉시 이메일과 앱으로 고유 QR 코드가 발송됩니다. 별도 출력 없이 스마트폰으로 입장합니다.",
  },
  {
    num: "03",
    icon: "✅",
    title: "현장 입장",
    desc: "입장 게이트에서 직원이 스마트폰으로 QR을 스캔하면 즉시 입장 완료. 대기줄 없이 빠르게!",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 bg-bg2">
      <div className="max-w-5xl mx-auto">
        <div className="text-p1l font-mono text-xs tracking-widest mb-4 uppercase">
          HOW IT WORKS
        </div>
        <h2 className="text-5xl font-black leading-none mb-3 tracking-tight text-white">
          이용 방법
        </h2>
        <p className="text-muted text-lg mb-16 font-light">
          3단계로 간단하게 한국 문화시설을 즐기세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute top-4 right-5 font-black opacity-5 leading-none text-white"
                style={{ fontSize: "5rem" }}
              >
                {step.num}
              </div>
              <div className="text-3xl mb-5">{step.icon}</div>
              <div className="text-xs font-mono text-p1l tracking-wider mb-2">
                STEP {step.num}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Language/Currency badges */}
        <div className="mt-16 p-6 bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-xs text-muted font-mono tracking-wider mb-2">SUPPORTED LANGUAGES</div>
            <div className="flex gap-2 flex-wrap">
              {["한국어", "English", "日本語", "繁體中文", "简体中文"].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{ background: "rgba(14,165,233,.12)", color: "#7DD3FC", border: "1px solid rgba(14,165,233,.3)" }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted font-mono tracking-wider mb-2">SUPPORTED CURRENCIES</div>
            <div className="flex gap-2 flex-wrap">
              {["KRW ₩", "USD $", "JPY ¥", "TWD NT$"].map((cur) => (
                <span
                  key={cur}
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{ background: "rgba(124,58,237,.12)", color: "#A78BFA", border: "1px solid rgba(124,58,237,.3)" }}
                >
                  {cur}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
