"use client";

const contracts = [
  { name: "STOToken.sol", standard: "ERC-1400", desc: "증권형 토큰 발행 · KYC 화이트리스트 · 전송 제한" },
  { name: "STOFactory.sol", standard: "Factory", desc: "공연별 STO 상품 배포 · 파라미터 설정 자동화" },
  { name: "RevenueDistributor.sol", standard: "Custom", desc: "공연 매출 수신 → 투자 비율대로 즉시 분배" },
  { name: "Marketplace.sol", standard: "P2P", desc: "2차 거래 오더북 · 1.5% 수수료 자동 처리" },
];

export function ContractInfo() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-p0l font-mono text-xs tracking-widest mb-4 uppercase">SMART CONTRACTS</div>
      <h2 className="text-5xl font-black text-white leading-none mb-3">블록체인 기술</h2>
      <p className="text-muted text-lg mb-12 font-light max-w-lg">
        Polygon Mainnet 기반 스마트 컨트랙트가 투명하고 자동으로 모든 거래를 처리합니다.
        가스비는 Loop8이 대납합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {contracts.map((c) => (
          <div
            key={c.name}
            className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl p-5 transition-all hover:border-[rgba(124,58,237,.35)] hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-3">
              <code className="text-sm font-mono font-bold" style={{ color: "#A78BFA" }}>{c.name}</code>
              <span
                className="text-xs px-2 py-0.5 rounded-md font-mono"
                style={{ background: "rgba(124,58,237,.12)", color: "#A78BFA", border: "1px solid rgba(124,58,237,.3)" }}
              >
                {c.standard}
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Network badge */}
      <div
        className="flex items-center justify-between p-5 rounded-2xl border flex-wrap gap-4"
        style={{ background: "rgba(124,58,237,.06)", borderColor: "rgba(124,58,237,.25)" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(124,58,237,.2)" }}>⬡</div>
          <div>
            <div className="font-bold text-white text-sm">Polygon Mainnet</div>
            <div className="text-xs text-muted">Chain ID: 137 · 가스비 대납 · MATIC 불필요</div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {["위변조 불가", "자동 정산", "투명 이력"].map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border"
              style={{ background: "rgba(124,58,237,.12)", borderColor: "rgba(124,58,237,.3)", color: "#A78BFA" }}>
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
