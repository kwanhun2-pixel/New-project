import { PRHero } from "@/components/PRHero";
import { PricingSection } from "@/components/PricingSection";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function PRHomePage() {
  return (
    <main>
      <PRHero />
      <FeaturesSection />
      <PricingSection />
    </main>
  );
}
