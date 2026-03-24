import { notFound } from "next/navigation";
import { getVenue, VENUES } from "@/lib/venues";
import { VenueDetail } from "@/components/VenueDetail";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return VENUES.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const venue = getVenue(id);
  if (!venue) return { title: "Not Found" };
  return {
    title: `${venue.name} 입장권 — Loop8 TourPass`,
    description: venue.description,
  };
}

export default async function VenuePage({ params }: Props) {
  const { id } = await params;
  const venue = getVenue(id);
  if (!venue) notFound();

  return <VenueDetail venue={venue} />;
}
