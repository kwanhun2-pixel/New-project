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
    <div className="bg-white border border-[#E8EAED] rounded-2xl overflow-hidden shadow-sm">
      {/* Step indicator */}
      <div className="flex border-b border-[#E8EAED]">
        {stepOrder.map((step, i) => (
          <div
            key={step}
            className="flex-1 text-center py-3 text-xs font-medium transition-colors"
            style={{
              color: i <= stepIndex ? "#191919" : "#BBBBBB",
              borderBottom: i === stepIndex ? "2px solid #FFE400" : "2px solid transparent",
              background: i === stepIndex ? "#FFFDE7" : "transparent",
            }}
          >
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full text-xs mr-1 font-bold"
              style={{
                background: i < stepIndex ? "#00B386" : i === stepIndex ? "#FFE400" : "#F0F0F0",
                color: i < stepIndex ? "white" : "#191919",
              }}
            >
              {i < stepIndex ? "✓" : i + 1}
            </span>
            <span className="hidden sm:inline">{stepLabels[step]}</span>
          </div>
        ))}
      </div>

      <div className="p-6">
        {currentStep === "id" && (
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-1">신분증을 업로드하세요</h3>
            <p className="text-[#888888] text-sm mb-6">주민등록증, 운전면허증, 여권 중 하나를 선택합니다.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#555555] mb-1.5">실명</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E8EAED] text-[#191919] text-sm outline-none focus:border-[#FFE400] focus:bg-white transition-colors placeholder:text-[#BBBBBB]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#555555] mb-1.5">주민등록번호 앞 6자리</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="YYMMDD"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E8EAED] text-[#191919] text-sm outline-none focus:border-[#FFE400] focus:bg-white transition-colors placeholder:text-[#BBBBBB]"
                />
              </div>
            </div>

            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#E8EAED] rounded-2xl p-8 cursor-pointer hover:border-[#FFE400] hover:bg-[#FFFDE7] transition-all text-center">
              <span className="text-4xl">{idFile ? "✅" : "📄"}</span>
              <span className="text-sm text-[#555555]">
                {idFile ? idFile.name : "신분증 이미지를 클릭하거나 드래그하여 업로드"}
              </span>
              <span className="text-xs text-[#888888]">JPG, PNG, PDF · 최대 10MB</span>
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
              className="w-full mt-5 py-3.5 rounded-xl font-bold text-[#191919] transition-all hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              style={{ background: "#FFE400" }}
            >
              다음 단계 →
            </button>
          </div>
        )}

        {currentStep === "selfie" && (
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-1">셀피를 업로드하세요</h3>
            <p className="text-[#888888] text-sm mb-6">
              신분증을 들고 정면을 바라보는 사진을 촬영하세요. 얼굴이 명확하게 보여야 합니다.
            </p>

            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#E8EAED] rounded-2xl p-8 cursor-pointer hover:border-[#FFE400] hover:bg-[#FFFDE7] transition-all text-center">
              <span className="text-4xl">{selfieFile ? "✅" : "🤳"}</span>
              <span className="text-sm text-[#555555]">
                {selfieFile ? selfieFile.name : "셀피 사진을 클릭하거나 드래그하여 업로드"}
              </span>
              <span className="text-xs text-[#888888]">JPG, PNG · 최대 10MB</span>
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
              className="w-full mt-5 py-3.5 rounded-xl font-bold text-[#191919] transition-all hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              style={{ background: "#FFE400" }}
            >
              다음 단계 →
            </button>
          </div>
        )}

        {currentStep === "review" && (
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-1">정보를 확인하세요</h3>
            <p className="text-[#888888] text-sm mb-6">제출 전 마지막으로 확인합니다.</p>

            <div className="bg-[#F7F8FA] rounded-2xl p-4 mb-5">
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

            <div className="bg-[#FFF9C4] border border-[#FFE400] rounded-xl p-4 text-xs text-[#555555] mb-5 flex gap-2">
              <span>⚠️</span>
              <span>제출된 개인정보는 AES-256 암호화 후 오프체인 DB에만 저장됩니다. 블록체인에는 SHA-256 해시값만 기록됩니다.</span>
            </div>

            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl font-bold text-[#191919] transition-all hover:brightness-95 text-sm"
              style={{ background: "#FFE400" }}
            >
              KYC 제출하기
            </button>
          </div>
        )}

        {currentStep === "done" && (
          <div className="text-center py-8">
            <div className="text-6xl mb-5">🎉</div>
            <h3 className="text-xl font-bold text-[#191919] mb-2">KYC 인증 요청 완료</h3>
            <p className="text-[#666666] text-sm mb-8 leading-relaxed max-w-xs mx-auto">
              영업일 기준 1~2일 내에 이메일로 결과를 안내드립니다.<br />
              인증 완료 후 STO 청약에 참여하실 수 있습니다.
            </p>
            <a
              href="/markets"
              className="inline-flex px-8 py-3.5 rounded-xl font-bold text-[#191919] transition-all hover:brightness-95 text-sm"
              style={{ background: "#FFE400" }}
            >
              STO 마켓 보러가기 →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
