import { Routes, Route } from "react-router-dom";
import { Navbar, Footer, FloatingWhatsApp, Preloader, Grain, Cursor, ScrollProgress } from "@/components/site/chrome";
import Index from "./routes/index";
import Ablauf from "./routes/ablauf";
import Bewertungen from "./routes/bewertungen";
import Faq from "./routes/faq";
import Fuehrerschein from "./routes/fuehrerschein";
import Kontakt from "./routes/kontakt";
import Team from "./routes/team";
import NotFound from "./routes/not-found";

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Preloader />
      <Grain />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fuehrerschein" element={<Fuehrerschein />} />
          <Route path="/ablauf" element={<Ablauf />} />
          <Route path="/team" element={<Team />} />
          <Route path="/bewertungen" element={<Bewertungen />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}