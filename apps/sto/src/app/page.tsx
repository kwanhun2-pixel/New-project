import { STOHero } from "@/components/STOHero";
import { MarketList } from "@/components/MarketList";
import { HowSTOWorks } from "@/components/HowSTOWorks";
import { ContractInfo } from "@/components/ContractInfo";

export default function STOHomePage() {
  return (
    <main>
      <STOHero />
      <MarketList />
      <HowSTOWorks />
      <ContractInfo />
    </main>
  );
}
