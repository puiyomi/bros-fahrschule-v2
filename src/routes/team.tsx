import { Seo } from "@/components/site/seo";
import { PageHero } from "@/components/site/ui";
import { Team, FinalCTA } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Seo
        title="Team – BROS Fahrschule Marl"
        description="Lerne das Team hinter BROS kennen. Mentoren, Fahrlehrer, echte Menschen – nicht nur Lehrer."
      />
      <PageHero
        eyebrow="Das Team"
        title="Echte Menschen,"
        italic="echte Storys."
        subtitle="Wir holen echte Portraits und Behind-the-Scenes von unserem Team – stay tuned. Bis dahin: erste Vorschau auf die Crew."
      />
      <Team />
      <FinalCTA />
    </>
  );
}
