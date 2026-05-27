import { Seo } from "@/components/site/seo";
import { PageHero } from "@/components/site/ui";
import { FAQ, FinalCTA } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Seo
        title="FAQ – BROS Fahrschule Marl"
        description="Antworten auf die häufigsten Fragen zum Führerschein bei BROS Fahrschule in Marl."
      />
      <PageHero
        eyebrow="FAQ"
        title="Häufige Fragen,"
        italic="ehrliche Antworten."
        subtitle="Du fragst, wir antworten. Wenn deine Frage nicht dabei ist – schreib uns einfach."
      />
      <FAQ />
      <FinalCTA />
    </>
  );
}
