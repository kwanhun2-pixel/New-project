"use client";

const steps = [
  { num: "01", icon: "🔐", title: "KYC 실명 인증", desc: "신분증 OCR + 셀피 인증. 1회 완료 후 모든 STO 상품에 참여 가능합니다." },
  { num: "02", icon: "📊", title: "STO 상품 선택", desc: "공연·전시 수익권 목록에서 투자할 상품을 선택하고 수익률·리스크를 확인합니다." },
  { num: "03", icon: "💳", title: "청약 및 결제", desc: "최소 1만 원부터 원하는 금액을 입력하고 토스페이먼츠 또는 카드로 결제합니다." },
  { num: "04", icon: "⛓️", title: "STO 토큰 발행", desc: "블록체인(Polygon)에 ERC-1400 증권형 토큰이 내 지갑 주소로 자동 발행됩니다." },
  { num: "05", icon: "💰", title: "수익 자동 정산", desc: "공연 매출 발생 시 RevenueDistributor.sol 컨트랙트가 투자 비율대로 즉시 분배합니다." },
];

export function HowSTOWorks() {
  return (
    <section className="px-6 py-24 bg-bg2">
      <div className="max-w-5xl mx-auto">
        <div className="text-p0l font-mono text-xs tracking-widest mb-4 uppercase">HOW IT WORKS</div>
        <h2 className="text-5xl font-black text-white leading-none mb-3">투자 프로세스</h2>
        <p className="text-muted text-lg mb-16 font-light">5단계로 공연 수익권에 투자하세요.</p>

        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-6 items-start">
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black border"
                  style={{ background: "rgba(124,58,237,.15)", borderColor: "rgba(124,58,237,.4)", color: "#A78BFA" }}
                >
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-10 mt-2" style={{ background: "linear-gradient(#7C3AED,transparent)" }} />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                <div className="text-xs font-mono text-muted tracking-wider mb-1">STEP {step.num}</div>
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-md">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
