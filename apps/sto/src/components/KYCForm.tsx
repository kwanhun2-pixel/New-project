"use client";

import { useState } from "react";

type Step = "id" | "selfie" | "review" | "done";

const stepLabels: Record<Step, string> = {
  id: "신분증",
  selfie: "셀피",
  review: "확인",
  done: "완료",
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Step indicator */}
      <div className="flex border-b border-[#F2F3F5]">
        {stepOrder.map((step, i) => (
          <div
            key={step}
            className="flex-1 text-center py-3.5 text-xs font-medium transition-colors"
            style={{
              color: i <= stepIndex ? "#191919" : "#BBBBBB",
              borderBottom: i === stepIndex ? "2px solid #191919" : "2px solid transparent",
            }}
          >
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full text-xs mr-1 font-bold"
              style={{
                background: i < stepIndex ? "#191919" : i === stepIndex ? "#FFE400" : "#F2F3F5",
                color: i < stepIndex ? "white" : "#191919",
              }}
            >
              {i < stepIndex ? "✓" : i + 1}
            </span>
            {stepLabels[step]}
          </div>
        ))}
      </div>

      <div className="p-6">
        {currentStep === "id" && (
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-1">신분증을 업로드하세요</h3>
            <p className="text-[#888888] text-sm mb-5">주민등록증, 운전면허증, 여권 중 하나를 선택합니다.</p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-sm font-medium text-[#555555] mb-1.5">실명</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl bg-[#F2F3F5] border border-transparent text-[#191919] text-sm outline-none focus:border-[#191919] transition-colors placeholder:text-[#BBBBBB]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#555555] mb-1.5">주민등록번호 앞 6자리</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="YYMMDD"
                  className="w-full px-4 py-3 rounded-xl bg-[#F2F3F5] border border-transparent text-[#191919] text-sm outline-none focus:border-[#191919] transition-colors placeholder:text-[#BBBBBB]"
                />
              </div>
            </div>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8EAED] rounded-2xl p-8 cursor-pointer hover:border-[#191919] hover:bg-[#F2F3F5] transition-all text-center">
              <span className="text-4xl">{idFile ? "✅" : "📄"}</span>
              <span className="text-sm text-[#555555] font-medium">
                {idFile ? idFile.name : "신분증 이미지 업로드"}
              </span>
              <span className="text-xs text-[#888888]">JPG, PNG, PDF · 최대 10MB</span>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setIdFile(e.target.files?.[0] ?? null)} />
            </label>

            <button
              onClick={next}
              disabled={!idFile || !name || idNumber.length < 6}
              className="w-full mt-4 py-3.5 rounded-xl font-bold text-[#191919] text-sm transition-all hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#FFE400" }}
            >
              다음
            </button>
          </div>
        )}

        {currentStep === "selfie" && (
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-1">셀피를 업로드하세요</h3>
            <p className="text-[#888888] text-sm mb-5">신분증을 들고 정면을 바라보는 사진을 촬영하세요.</p>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8EAED] rounded-2xl p-8 cursor-pointer hover:border-[#191919] hover:bg-[#F2F3F5] transition-all text-center">
              <span className="text-4xl">{selfieFile ? "✅" : "🤳"}</span>
              <span className="text-sm text-[#555555] font-medium">
                {selfieFile ? selfieFile.name : "셀피 사진 업로드"}
              </span>
              <span className="text-xs text-[#888888]">JPG, PNG · 최대 10MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)} />
            </label>

            <button
              onClick={next}
              disabled={!selfieFile}
              className="w-full mt-4 py-3.5 rounded-xl font-bold text-[#191919] text-sm transition-all hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#FFE400" }}
            >
              다음
            </button>
          </div>
        )}

        {currentStep === "review" && (
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-1">정보를 확인하세요</h3>
            <p className="text-[#888888] text-sm mb-5">제출 전 마지막으로 확인합니다.</p>

            <div className="bg-[#F2F3F5] rounded-2xl p-4 mb-4">
              {[
                { label: "이름", value: name },
                { label: "생년월일", value: idNumber },
                { label: "신분증", value: idFile?.name ?? "" },
                { label: "셀피", value: selfieFile?.name ?? "" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-3 border-b border-[#E8EAED] last:border-0 text-sm">
                  <span className="text-[#888888]">{row.label}</span>
                  <span className="text-[#191919] font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {/* LP 확정 단가 스타일 안내 박스 */}
            <div className="border-2 border-[#1A73E8] rounded-2xl p-4 mb-4 bg-[#EBF3FF]">
              <div className="text-[#1A73E8] text-xs font-bold mb-1">개인정보 보호 안내</div>
              <div className="text-[#191919] font-bold text-sm mb-1">AES-256 암호화 저장</div>
              <div className="text-[#555555] text-xs">블록체인에는 SHA-256 해시값만 기록됩니다.</div>
            </div>

            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl font-bold text-[#191919] text-sm transition-all hover:brightness-95"
              style={{ background: "#FFE400" }}
            >
              KYC 제출하기
            </button>
          </div>
        )}

        {currentStep === "done" && (
          <div className="text-center py-10">
            <div className="text-6xl mb-5">🎉</div>
            <h3 className="text-xl font-bold text-[#191919] mb-2">KYC 인증 요청 완료</h3>
            <p className="text-[#888888] text-sm mb-8 leading-relaxed max-w-xs mx-auto">
              영업일 기준 1~2일 내에 이메일로 결과를 안내드립니다.
            </p>
            <a href="/markets" className="inline-flex px-8 py-3.5 rounded-xl font-bold text-[#191919] text-sm hover:brightness-95 transition-all" style={{ background: "#FFE400" }}>
              STO 마켓 보러가기 →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
