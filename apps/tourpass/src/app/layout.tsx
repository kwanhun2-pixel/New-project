import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop8 TourPass — 한국 문화시설 통합 입장권",
  description:
    "경복궁·창덕궁·덕수궁 등 주요 문화시설 입장권을 온라인으로 구매하고 QR로 간편 입장하세요.",
  keywords: ["TourPass", "한국관광", "경복궁", "입장권", "QR"],
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
        {children}
      </body>
    </html>
  );
}
