"use client";

const features = [
  {
    icon: "📰",
    title: "보도자료 자동 배포",
    desc: "등록 즉시 분야별 기자에게 이메일·카카오 알림 자동 발송. 수동 작업 0%.",
  },
  {
    icon: "👥",
    title: "기자 풀 CRM",
    desc: "국내 문화부 기자 + 대만·일본 글로벌 기자 풀. 분야별·지역별 타겟 발송.",
  },
  {
    icon: "📱",
    title: "SNS·블로그 자동화",
    desc: "네이버·티스토리 파워블로그 + 인스타·페이스북 동시 자동 게시.",
  },
  {
    icon: "🎥",
    title: "원격 기자회견",
    desc: "Zoom 연동 온라인 기자회견 일정 설정 & 초청장 자동 발송.",
  },
  {
    icon: "📊",
    title: "배포 성과 분석",
    desc: "기사 게재율, 클릭수, SNS 반응을 실시간 대시보드로 확인.",
  },
  {
    icon: "🌏",
    title: "해외 미디어 연동",
    desc: "대만 Nownews·UDN, 일본 미디어 파트너십으로 해외 홍보 원스톱.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-p3l font-mono text-xs tracking-widest mb-4 uppercase">FEATURES</div>
      <h2 className="text-5xl font-black leading-none mb-3 tracking-tight text-white">핵심 기능</h2>
      <p className="text-muted text-lg mb-12 font-light">공연예술 PR의 모든 과정을 자동화합니다.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[rgba(16,185,129,.3)]"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
