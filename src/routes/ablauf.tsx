import { Seo } from "@/components/site/seo";
import { PageHero } from "@/components/site/ui";
import { Steps, Why, FinalCTA } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Seo
        title="Ablauf – So läufts bei BROS Fahrschule"
        description="In 4 Schritten zum Führerschein – von der Anmeldung bis zur bestandenen Prüfung. Klar, modern, stressfrei."
      />
      <PageHero
        eyebrow="So läufts"
        title="Vom Bock"
        italic="bis zum Lappen."
        subtitle="Wir machen den Weg zum Führerschein klar, transparent und ehrlich. Vier Schritte – kein Drama."
      />
      <Steps />
      <Why />
      <FinalCTA />
    </>
  );
}