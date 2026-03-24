import type { Metadata } from "next";
import { TicketQR } from "@/components/TicketQR";

export const metadata: Metadata = {
  title: "내 입장권 QR — Loop8 TourPass",
};

interface Props {
  params: Promise<{ ticketId: string }>;
}

export default async function TicketPage({ params }: Props) {
  const { ticketId } = await params;

  return (
    <main className="pt-16">
      <div className="max-w-md mx-auto px-6 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-muted text-sm hover:text-white transition-colors mb-8">
          ← 홈으로
        </a>
        <TicketQR ticketId={ticketId} />
      </div>
    </main>
  );
}
