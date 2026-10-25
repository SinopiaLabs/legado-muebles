import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Reels from "@/components/Reels";
import ScrollStory from "@/components/ScrollStory";
import { Beneficios, Contacto, Footer, Nosotros, Preguntas, Servicios, WhatsAppFab } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Beneficios />
        <ScrollStory />
        <Servicios />
        <Projects />
        <Reels />
        <Nosotros />
        <Preguntas />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
