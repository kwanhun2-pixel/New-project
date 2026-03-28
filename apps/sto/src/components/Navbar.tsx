"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/markets", label: "탐색" },
  { href: "/portfolio", label: "내 자산" },
  { href: "/kyc", label: "KYC 인증" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8EAED] h-14 flex items-center justify-between px-5">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[#191919] text-xs" style={{ background: "#FFE400" }}>
          L8
        </div>
        <span className="font-bold text-[#191919] text-base">토큰화 자산 투자</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-[#555555] text-sm hover:text-[#191919] transition-colors no-underline font-medium">
            {l.label}
          </Link>
        ))}
      </div>

      <Link href="/kyc" className="hidden md:inline-flex px-4 py-2 rounded-xl text-sm font-bold text-[#191919] hover:brightness-95 transition-all" style={{ background: "#FFE400" }}>
        구매하기
      </Link>

      <button className="md:hidden text-[#555555] text-xl" onClick={() => setOpen(!open)} aria-label="메뉴">
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-[#E8EAED] flex flex-col p-3 gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-3 px-4 rounded-xl text-[#555555] hover:text-[#191919] hover:bg-[#F2F3F5] transition-colors no-underline text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
