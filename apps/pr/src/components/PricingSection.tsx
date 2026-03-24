"use client";

const plans = [
  {
    name: "기본",
    price: "50만원",
    period: "/월",
    desc: "소규모 공연사",
    features: [
      "보도자료 5건/월",
      "국내 기자 풀 발송",
      "이메일 발송 리포트",
      "기본 분석 대시보드",
    ],
    color: "p1" as const,
    cta: "시작하기",
  },
  {
    name: "프로",
    price: "150만원",
    period: "/월",
    desc: "중견 공연 기획사",
    features: [
      "보도자료 무제한",
      "SNS·블로그 자동화",
      "해외 기자 풀 발송",
      "상세 분석 + 기사 게재 추적",
      "카카오 알림 발송",
    ],
    color: "p3" as const,
    cta: "프로 시작하기",
    highlight: true,
  },
  {
    name: "엔터프라이즈",
    price: "300만원+",
    period: "/월",
    desc: "대형 공연 · 뮤지컬",
    features: [
      "프로 플랜 전체 포함",
      "전담 PM 배정",
      "대만·일본 해외 배포",
      "원격 기자회견 지원",
      "맞춤 계약",
    ],
    color: "p0" as const,
    cta: "문의하기",
  },
];

const colorMap = {
  p0: { bg: "rgba(124,58,237,.12)", border: "rgba(124,58,237,.4)", text: "#A78BFA", btn: "linear-gradient(135deg,#7C3AED,#A78BFA)" },
  p1: { bg: "rgba(14,165,233,.12)", border: "rgba(14,165,233,.4)", text: "#7DD3FC", btn: "linear-gradient(135deg,#0EA5E9,#7DD3FC)" },
  p3: { bg: "rgba(16,185,129,.12)", border: "rgba(16,185,129,.4)", text: "#6EE7B7", btn: "linear-gradient(135deg,#10B981,#6EE7B7)" },
};

export function PricingSection() {
  return (
    <section className="px-6 py-24 bg-bg2">
      <div className="max-w-5xl mx-auto">
        <div className="text-p3l font-mono text-xs tracking-widest mb-4 uppercase">PRICING</div>
        <h2 className="text-5xl font-black leading-none mb-3 tracking-tight text-white">요금제</h2>
        <p className="text-muted text-lg mb-12 font-light">공연사 규모에 맞는 플랜을 선택하세요.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const c = colorMap[plan.color];
            return (
              <div
                key={plan.name}
                className={`bg-surface rounded-2xl p-7 relative overflow-hidden transition-all hover:-translate-y-1 ${plan.highlight ? "ring-2" : "border border-[rgba(255,255,255,.06)]"}`}
                style={plan.highlight ? { borderColor: c.border, boxShadow: `0 0 40px ${c.bg}` } : {}}
              >
                {plan.highlight && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: c.btn }}
                  />
                )}
                {plan.highlight && (
                  <div
                    className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                  >
                    추천
                  </div>
                )}

                <div className="text-xs font-mono tracking-wider mb-3" style={{ color: c.text }}>
                  {plan.desc}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black" style={{ color: c.text }}>{plan.price}</span>
                  <span className="text-muted text-sm ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted">
                      <span style={{ color: c.text }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: c.btn }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
