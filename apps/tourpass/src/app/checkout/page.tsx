import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFlow } from "@/components/CheckoutFlow";

export const metadata: Metadata = {
  title: "결제 — Loop8 TourPass",
};

export default function CheckoutPage() {
  return (
    <main className="pt-16">
      <div className="max-w-xl mx-auto px-6 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-muted text-sm hover:text-white transition-colors mb-8">
          ← 취소하고 돌아가기
        </a>
        <div className="text-xs font-mono text-p1l tracking-widest mb-3">CHECKOUT</div>
        <h1 className="text-3xl font-black text-white leading-none mb-8">결제</h1>
        <Suspense fallback={<div className="text-muted text-sm">로딩 중...</div>}>
          <CheckoutFlow />
        </Suspense>
      </div>
    </main>
  );
}
