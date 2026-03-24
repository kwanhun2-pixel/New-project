"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/markets", label: "STO 마켓" },
  { href: "/portfolio", label: "내 포트폴리오" },
  { href: "/kyc", label: "KYC 인증" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16"
      style={{
        background: "rgba(7,11,20,.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 no-underline">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base"
          style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
        >
          L8
        </div>
        <span className="font-bold text-white text-lg leading-none">
          Loop8 <span className="text-p0l font-light">STO</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-muted text-sm hover:text-white transition-colors no-underline"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/kyc"
        className="hidden md:inline-flex px-5 py-2 rounded-lg text-sm font-bold text-white transition-all hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
      >
        투자 시작
      </Link>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-muted hover:text-white text-xl"
        onClick={() => setOpen(!open)}
        aria-label="메뉴"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="absolute top-16 left-0 right-0 flex flex-col gap-1 p-4"
          style={{ background: "rgba(7,11,20,.97)", borderBottom: "1px solid rgba(255,255,255,.06)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-3 px-4 rounded-xl text-muted hover:text-white hover:bg-surface transition-colors no-underline text-sm"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
