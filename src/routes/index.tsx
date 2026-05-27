import { Seo } from "@/components/site/seo";
import {
  Hero, Stories, Counters, SocialProof, Community, KineticStatement, Reels, FinalCTA,
} from "@/components/site/sections";

export default function Index() {
  return (
    <>
      <Seo
        title="BROS Fahrschule Marl – Stressfrei zum Führerschein"
        description="Modern, locker und auf Augenhöhe. Auto- & Motorradführerschein in Marl. 4,9 ★ bei über 100 Fahrschüler:innen."
      />
      <Hero />
      <Stories />
      <Counters />
      <SocialProof />
      <Community />
      <KineticStatement />
      <Reels />
      <FinalCTA />
    </>
  );
}
