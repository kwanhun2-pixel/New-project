import { KYCForm } from "@/components/KYCForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KYC 인증 — Loop8 STO",
  description: "실명 확인 후 STO 투자에 참여하세요.",
};

export default function KYCPage() {
  return (
    <main className="pt-16">
      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="text-p0l font-mono text-xs tracking-widest mb-4 uppercase">KYC / AML</div>
        <h1 className="text-4xl font-black text-white leading-none mb-2">실명 인증</h1>
        <p className="text-muted text-base mb-10 font-light">
          금융당국 기준에 맞는 신원 확인 절차입니다. 1회만 진행하면 됩니다.
        </p>
        <KYCForm />
      </div>
    </main>
  );
}
