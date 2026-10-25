import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Reels from "@/components/Reels";
import Reveal from "@/components/Reveal";
import ScrollStory from "@/components/ScrollStory";
import { contacto, pasos, servicios, whatsappLink } from "@/lib/data";

function Nosotros() {
  return (
    <section id="nosotros" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-10">
        <Reveal className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/equipo-medicion.webp" alt="El equipo de Legado Muebles midiendo un espacio en obra" loading="lazy" className="aspect-[4/5] w-full object-cover md:w-[82%]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/equipo-instalacion.webp"
            alt="Instalación de una cubierta en terreno"
            loading="lazy"
            className="absolute -bottom-8 right-0 hidden aspect-square w-[44%] border-8 border-paper object-cover md:block"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">01 · Quiénes somos</p>
          <h2 className="section-title mt-4">Después de mucho trabajo y cariño, nace algo propio.</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>
              En Legado Muebles nos especializamos en el diseño y desarrollo de mobiliario a medida, creando soluciones
              que combinan funcionalidad, diseño y calidad.
            </p>
            <p>
              Legado nace a partir de años de experiencia y trabajo conjunto en el rubro. Reunimos conocimientos en
              diseño y gestión con la experiencia práctica en fabricación e instalación: aunque somos una empresa
              nueva, detrás existe una trayectoria de trabajo compartido.
            </p>
          </div>
          <blockquote className="mt-8 border-l-2 border-wood pl-5 font-serif text-2xl italic leading-snug text-wood-dark">
            “Una nueva historia, construida con experiencia y dedicación.”
          </blockquote>
          <ul className="mt-10 grid grid-cols-3 gap-3 text-center text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft sm:text-xs">
            {["Diseño y medición", "Armado y ajustes", "Instalación en terreno"].map((t) => (
              <li key={t} className="border-t border-wood pt-3">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Servicios() {
  return (
    <section id="servicios" className="border-y border-line bg-white/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">02 · Qué hacemos</p>
          <h2 className="section-title mt-4">Soluciones a medida para cada espacio.</h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <Reveal key={s.titulo} delay={(i % 3) * 80} className="group bg-paper p-8 transition-colors hover:bg-white">
              <span className="font-serif text-sm text-wood">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl text-ink">{s.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.texto}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">03 · Materiales y detalles</p>
            <h2 className="section-title mt-4">La combinación correcta.</h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Seleccionamos materiales, cubiertas, herrajes y accesorios de acuerdo con el uso, la estética, el
              presupuesto y las necesidades de cada proyecto. La propuesta se define de manera personalizada.
            </p>
            <ol className="mt-10 space-y-5">
              {pasos.map((p) => (
                <li key={p.n} className="grid grid-cols-[2.5rem_1fr] gap-2">
                  <span className="font-serif text-lg text-wood">{p.n}</span>
                  <div>
                    <p className="font-medium text-ink">{p.titulo}</p>
                    <p className="text-sm text-ink-soft">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-3 self-start">
            <figure className="col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/materiales-laminados.webp" alt="Muestras de laminados de alta presión en tonos madera" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-soft">Laminados de alta presión</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/materiales-cuarzo.webp" alt="Muestra de cubierta de cuarzo sobre madera" loading="lazy" className="aspect-square w-full object-cover" />
              <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-soft">Cubiertas de cuarzo</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/t01-detalle.webp" alt="Herrajes y grifería metálica en cocina grafito" loading="lazy" className="aspect-square w-full object-cover" />
              <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-soft">Herrajes metálicos</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink py-14 text-paper/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/mark.png" alt="" width={44} height={44} className="h-14 w-14 rounded-sm bg-paper p-1.5" />
          <p className="mt-4 font-serif text-2xl tracking-[0.22em] text-paper">LEGADO</p>
          <p className="text-[0.65rem] tracking-[0.55em] text-sand">MUEBLES</p>
          <p className="mt-4 text-sm">Diseño · Fabricación · Instalación de muebles a medida</p>
        </div>
        <div className="text-sm md:text-right">
          <p>{contacto.cobertura}</p>
          <p>
            <a href={`mailto:${contacto.correo}`} className="hover:text-paper">
              {contacto.correo}
            </a>
          </p>
          <p className="mt-4 text-xs text-paper/40">© {new Date().getFullYear()} Legado Muebles SpA</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hola Legado Muebles, me gustaría cotizar un mueble a medida.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-ink/20 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.22-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5a9.46 9.46 0 0 1 9.5 9.51c0 5.24-4.27 9.5-9.51 9.5m8.09-17.59A11.36 11.36 0 0 0 12.04.5C5.74.5.61 5.62.6 11.92c0 2.01.53 3.98 1.53 5.71L.5 23.5l6.01-1.58a11.4 11.4 0 0 0 5.53 1.41h.01c6.3 0 11.43-5.13 11.43-11.43 0-3.05-1.19-5.92-3.34-8.08" />
      </svg>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-3">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <ScrollStory />
        <Nosotros />
        <Servicios />
        <Projects />
        <Reels />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
