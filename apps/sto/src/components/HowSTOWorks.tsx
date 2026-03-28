"use client";

const steps = [
  { num: "01", icon: "🔐", title: "KYC 실명 인증", desc: "신분증 OCR + 셀피 인증. 1회 완료 후 모든 STO 상품에 참여 가능합니다." },
  { num: "02", icon: "📊", title: "STO 상품 선택", desc: "공연·전시 수익권 목록에서 투자할 상품을 선택하고 수익률·리스크를 확인합니다." },
  { num: "03", icon: "💳", title: "청약 및 결제", desc: "최소 1만 원부터 원하는 조각 수를 입력하고 간편 결제로 구매합니다." },
  { num: "04", icon: "⛓️", title: "STO 토큰 발행", desc: "블록체인(Polygon)에 ERC-1400 증권형 토큰이 내 지갑 주소로 자동 발행됩니다." },
  { num: "05", icon: "💰", title: "수익 자동 정산", desc: "공연 매출 발생 시 스마트 컨트랙트가 투자 비율대로 즉시 분배합니다." },
];

export function HowSTOWorks() {
  return (
    <section className="px-4 py-8 bg-white border-t border-[#E8EAED]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-black text-[#191919] mb-1">투자 프로세스</h2>
        <p className="text-[#888888] text-sm mb-6">5단계로 공연 수익권에 투자하세요.</p>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-4 items-start">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#F2F3F5] flex items-center justify-center text-lg border-2 border-white shadow-sm">
                  {step.icon}
                </div>
                {i < steps.length - 1 && <div className="w-px h-6 bg-[#E8EAED] mt-1" />}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded text-[#888888] bg-[#F2F3F5]">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-[#191919]">{step.title}</h3>
                </div>
                <p className="text-[#888888] text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
