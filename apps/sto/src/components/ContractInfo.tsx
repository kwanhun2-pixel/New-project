"use client";

const contracts = [
  { name: "STOToken.sol", standard: "ERC-1400", desc: "증권형 토큰 발행 · KYC 화이트리스트 · 전송 제한" },
  { name: "STOFactory.sol", standard: "Factory", desc: "공연별 STO 상품 배포 · 파라미터 설정 자동화" },
  { name: "RevenueDistributor.sol", standard: "Custom", desc: "공연 매출 수신 → 투자 비율대로 즉시 분배" },
  { name: "Marketplace.sol", standard: "P2P", desc: "2차 거래 오더북 · 1.5% 수수료 자동 처리" },
];

export function ContractInfo() {
  return (
    <section className="px-5 py-16 bg-[#F7F8FA] border-t border-[#E8EAED]">
      <div className="max-w-5xl mx-auto">
        <div className="text-[#888888] text-xs font-medium tracking-widest mb-3 uppercase">SMART CONTRACTS</div>
        <h2 className="text-3xl font-black text-[#191919] leading-tight mb-2">블록체인 기술</h2>
        <p className="text-[#666666] text-base mb-10 max-w-lg">
          Polygon Mainnet 기반 스마트 컨트랙트가 투명하고 자동으로 모든 거래를 처리합니다.
          가스비는 Loop8이 대납합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {contracts.map((c) => (
            <div
              key={c.name}
              className="bg-white border border-[#E8EAED] rounded-xl p-5 transition-all hover:shadow-sm hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-2">
                <code className="text-sm font-mono font-bold text-[#191919]">{c.name}</code>
                <span
                  className="text-xs px-2 py-0.5 rounded-md font-medium"
                  style={{ background: "#FFF9C4", color: "#555500" }}
                >
                  {c.standard}
                </span>
              </div>
              <p className="text-[#666666] text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Network badge */}
        <div className="flex items-center justify-between p-5 rounded-2xl border border-[#E8EAED] bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-[#F7F8FA] border border-[#E8EAED]">
              ⬡
            </div>
            <div>
              <div className="font-bold text-[#191919] text-sm">Polygon Mainnet</div>
              <div className="text-xs text-[#888888]">Chain ID: 137 · 가스비 대납 · MATIC 불필요</div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["위변조 불가", "자동 정산", "투명 이력"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-[#E8EAED] bg-[#F7F8FA] text-[#555555] font-medium"
              >
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
