import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { VenueList } from "@/components/VenueList";
import { HowItWorks } from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <VenueList />
      <HowItWorks />
    </main>
  );
}
