import { Seo } from "@/components/site/seo";
import { PageHero } from "@/components/site/ui";
import { Contact } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Seo
        title="Kontakt – BROS Fahrschule Marl"
        description="Schreib uns. Ruf an. Komm vorbei. BROS Fahrschule in der Carl-Duisberg-Straße 57, 45772 Marl."
      />
      <PageHero
        eyebrow="Sag Hi"
        title="Lass uns"
        italic="reden."
        subtitle="WhatsApp, Anruf, Mail oder einfach vorbeikommen. Wir freuen uns auf dich."
      />
      <Contact />
    </>
  );
}
