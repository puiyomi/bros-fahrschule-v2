import { Seo } from "@/components/site/seo";
import { PageHero } from "@/components/site/ui";
import { Courses, FinalCTA } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Seo
        title="Führerscheinklassen – BROS Fahrschule Marl"
        description="Auto, Motorrad, Anhänger, Intensiv: alle Führerscheinklassen bei BROS in Marl – transparent, modern, ohne Stress."
      />
      <PageHero
        eyebrow="Führerschein · Marl"
        title="Deine Klasse,"
        italic="dein Weg."
        subtitle="Auto, Motorrad oder Anhänger – wir bringen dich zur richtigen Klasse. Transparent, modern, ohne Bullshit."
      />
      <Courses />
      <FinalCTA />
    </>
  );
}
