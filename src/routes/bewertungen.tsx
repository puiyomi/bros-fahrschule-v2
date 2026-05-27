import { Seo } from "@/components/site/seo";
import { PageHero } from "@/components/site/ui";
import { SocialProof, FinalCTA } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Seo
        title="Bewertungen – BROS Fahrschule Marl"
        description="Über 100 Fahrschüler:innen geben BROS im Schnitt 4,9 Sterne bei Google. Lies, was sie wirklich sagen."
      />
      <PageHero
        eyebrow="4,9 ★ · Google"
        title="Was unsere"
        italic="Crew sagt."
        subtitle="Über 100 echte Google-Bewertungen. Ohne Filter. Ohne Marketing-Bla."
      />
      <SocialProof />
      <FinalCTA />
    </>
  );
}