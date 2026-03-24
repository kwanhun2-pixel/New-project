import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop8 PR — 공연예술 PR·뉴스 플랫폼",
  description:
    "보도자료 한 번 등록으로 기자·SNS·파워블로그에 자동 배포되는 공연예술 전문 PR SaaS",
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
