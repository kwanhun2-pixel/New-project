import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Loop8 STO — 공연예술 소액 투자 플랫폼",
  description:
    "공연·전시 수익권을 1만 원부터 투자하는 블록체인 기반 STO 플랫폼. ERC-1400 스마트 컨트랙트로 투명하게 운영됩니다.",
  keywords: ["STO", "공연투자", "블록체인", "디지털증권", "Loop8"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-[#E8EDF5] font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
