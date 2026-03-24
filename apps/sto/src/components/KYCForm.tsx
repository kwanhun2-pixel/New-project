"use client";

import { useState } from "react";

type Step = "id" | "selfie" | "review" | "done";

const stepLabels: Record<Step, string> = {
  id: "신분증 업로드",
  selfie: "셀피 촬영",
  review: "정보 확인",
  done: "인증 완료",
};

const stepOrder: Step[] = ["id", "selfie", "review", "done"];

export function KYCForm() {
  const [currentStep, setCurrentStep] = useState<Step>("id");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const stepIndex = stepOrder.indexOf(currentStep);

  function next() {
    if (stepIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[stepIndex + 1]);
    }
  }

  return (
    <div className="bg-surface border border-[rgba(255,255,255,.06)] rounded-2xl overflow-hidden">
      {/* Step indicator */}
      <div className="flex border-b border-[rgba(255,255,255,.06)]">
        {stepOrder.map((step, i) => (
          <div
            key={step}
            className="flex-1 text-center py-3 text-xs font-mono tracking-wider transition-colors"
            style={{
              color: i <= stepIndex ? "#A78BFA" : "#6B7A99",
              borderBottom: i === stepIndex ? "2px solid #7C3AED" : "2px solid transparent",
              background: i === stepIndex ? "rgba(124,58,237,.08)" : "transparent",
            }}
          >
            {i + 1}. {stepLabels[step]}
          </div>
        ))}
      </div>

      <div className="p-8">
        {currentStep === "id" && (
          <div>
            <h3 className="text-lg font-bold text-white mb-2">신분증을 업로드하세요</h3>
            <p className="text-muted text-sm mb-6">주민등록증, 운전면허증, 여권 중 하나를 선택합니다.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-muted mb-1.5">실명</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.08)] text-white text-sm outline-none focus:border-[rgba(124,58,237,.5)] transition-colors placeholder:text-muted"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1.5">주민등록번호 앞 6자리</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="YYMMDD"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.08)] text-white text-sm outline-none focus:border-[rgba(124,58,237,.5)] transition-colors placeholder:text-muted"
                />
              </div>
            </div>

            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[rgba(124,58,237,.3)] rounded-2xl p-10 cursor-pointer hover:border-[rgba(124,58,237,.6)] hover:bg-[rgba(124,58,237,.06)] transition-all text-center">
              <span className="text-4xl">{idFile ? "✅" : "📄"}</span>
              <span className="text-sm text-muted">
                {idFile ? idFile.name : "신분증 이미지를 클릭하거나 드래그하여 업로드"}
              </span>
              <span className="text-xs text-muted">JPG, PNG, PDF · 최대 10MB</span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <button
              onClick={next}
              disabled={!idFile || !name || idNumber.length < 6}
              className="w-full mt-6 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
            >
              다음 단계 →
            </button>
          </div>
        )}

        {currentStep === "selfie" && (
          <div>
            <h3 className="text-lg font-bold text-white mb-2">셀피를 업로드하세요</h3>
            <p className="text-muted text-sm mb-6">
              신분증을 들고 정면을 바라보는 사진을 촬영하세요. 얼굴이 명확하게 보여야 합니다.
            </p>

            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[rgba(124,58,237,.3)] rounded-2xl p-10 cursor-pointer hover:border-[rgba(124,58,237,.6)] hover:bg-[rgba(124,58,237,.06)] transition-all text-center">
              <span className="text-4xl">{selfieFile ? "✅" : "🤳"}</span>
              <span className="text-sm text-muted">
                {selfieFile ? selfieFile.name : "셀피 사진을 클릭하거나 드래그하여 업로드"}
              </span>
              <span className="text-xs text-muted">JPG, PNG · 최대 10MB</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <button
              onClick={next}
              disabled={!selfieFile}
              className="w-full mt-6 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
            >
              다음 단계 →
            </button>
          </div>
        )}

        {currentStep === "review" && (
          <div>
            <h3 className="text-lg font-bold text-white mb-2">정보를 확인하세요</h3>
            <p className="text-muted text-sm mb-6">제출 전 마지막으로 확인합니다.</p>

            <div className="space-y-3 mb-6">
              {[
                { label: "이름", value: name },
                { label: "생년월일", value: idNumber },
                { label: "신분증", value: idFile?.name ?? "" },
                { label: "셀피", value: selfieFile?.name ?? "" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-3 border-b border-[rgba(255,255,255,.06)] text-sm">
                  <span className="text-muted">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[rgba(245,158,11,.08)] border border-[rgba(245,158,11,.25)] rounded-xl p-4 text-xs text-muted mb-6">
              ⚠️ 제출된 개인정보는 AES-256 암호화 후 오프체인 DB에만 저장됩니다. 블록체인에는 SHA-256 해시값만 기록됩니다.
            </div>

            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
            >
              KYC 제출하기
            </button>
          </div>
        )}

        {currentStep === "done" && (
          <div className="text-center py-6">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">KYC 인증 요청 완료</h3>
            <p className="text-muted text-sm mb-8 leading-relaxed max-w-xs mx-auto">
              영업일 기준 1~2일 내에 이메일로 결과를 안내드립니다. 인증 완료 후 STO 청약에 참여하실 수 있습니다.
            </p>
            <a
              href="/markets"
              className="inline-flex px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
            >
              STO 마켓 보러가기 →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
