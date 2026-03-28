"use client";

const contracts = [
  { name: "STOToken.sol", standard: "ERC-1400", desc: "증권형 토큰 발행 · KYC 화이트리스트 · 전송 제한" },
  { name: "STOFactory.sol", standard: "Factory", desc: "공연별 STO 상품 배포 · 파라미터 설정 자동화" },
  { name: "RevenueDistributor.sol", standard: "Custom", desc: "공연 매출 수신 → 투자 비율대로 즉시 분배" },
  { name: "Marketplace.sol", standard: "P2P", desc: "2차 거래 오더북 · 1.5% 수수료 자동 처리" },
];

export function ContractInfo() {
  return (
    <section className="px-4 py-8 border-t border-[#E8EAED] bg-[#F2F3F5]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-black text-[#191919] mb-1">스마트 컨트랙트</h2>
        <p className="text-[#888888] text-sm mb-5">Polygon Mainnet 기반. 가스비는 Loop8이 대납합니다.</p>

        <div className="flex flex-col gap-3 mb-5">
          {contracts.map((c) => (
            <div key={c.name} className="bg-white rounded-xl p-4 flex items-center justify-between">
              <div>
                <code className="text-sm font-mono font-bold text-[#191919]">{c.name}</code>
                <p className="text-[#888888] text-xs mt-0.5">{c.desc}</p>
              </div>
              <span className="flex-shrink-0 ml-3 text-xs px-2 py-0.5 rounded-md font-medium bg-[#F2F3F5] text-[#555555]">
                {c.standard}
              </span>
            </div>
          ))}
        </div>

        {/* Network info */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F2F3F5] flex items-center justify-center text-lg">⬡</div>
            <div>
              <div className="font-bold text-[#191919] text-sm">Polygon Mainnet</div>
              <div className="text-xs text-[#888888]">Chain ID: 137 · MATIC 불필요</div>
            </div>
          </div>
          <div className="flex gap-2">
            {["위변조 불가", "자동 정산", "투명 이력"].map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#F2F3F5] text-[#555555] font-medium">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
