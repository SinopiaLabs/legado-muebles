import {
  beneficios,
  contacto,
  mensajeCotizar,
  preguntas,
  servicios,
  whatsappLink,
} from "@/lib/data";
import Foto from "./Foto";
import { Icono, InstagramIcon, WhatsAppIcon } from "./icons";
import Reveal from "./Reveal";

export function Beneficios() {
  return (
    <section
      aria-labelledby="beneficios-titulo"
      className="border-y border-line bg-white/60"
    >
      <h2 id="beneficios-titulo" className="sr-only">
        Por qué elegir Legado Muebles
      </h2>
      <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {beneficios.map((b, i) => (
          <Reveal
            as="li"
            key={b.titulo}
            delay={i * 80}
            className="border-line px-4 py-8 sm:px-6 lg:px-10 [&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
          >
            <Icono nombre={b.icono} className="h-7 w-7 text-icon" />
            <h3 className="mt-4 font-serif text-xl leading-tight text-ink sm:text-2xl">
              {b.titulo}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {b.texto}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Nosotros() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-titulo"
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:px-10">
        <Reveal className="relative">
          <Foto
            nombre="equipo-medicion"
            alt="Dos integrantes del equipo revisando medidas en una casa en obra"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full object-cover md:aspect-[4/5]"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Quiénes somos</p>
          <h2 id="nosotros-titulo" className="section-title mt-3">
            Una empresa nueva, con años de oficio detrás.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
            Legado nace de un equipo que lleva años trabajando junto en el rubro
            del mobiliario. Unimos diseño y gestión con la experiencia de
            fabricar e instalar, para que tu proyecto quede en manos de quienes
            lo hacen de principio a fin.
          </p>
          <blockquote className="mt-8 border-l-2 border-wood pl-5 font-serif text-2xl italic leading-snug text-wood-text">
            “Una nueva historia, construida con experiencia y dedicación.”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

export function Servicios() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="bg-white/60 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Qué hacemos</p>
            <h2 id="servicios-titulo" className="section-title mt-3">
              ¿Qué quieres crear?
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Elige una opción y te escribimos por WhatsApp con tu consulta lista.
          </p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <Reveal as="li" key={s.titulo} delay={(i % 3) * 70}>
              <a
                href={whatsappLink(mensajeCotizar(s.titulo.toLowerCase()))}
                target="_blank"
                rel="noopener noreferrer"
                className="service-card group"
              >
                <span className="service-icon">
                  <Icono nombre={s.icono} className="h-7 w-7" />
                </span>
                <span className="mt-5 block font-serif text-xl leading-tight text-ink sm:text-2xl">
                  {s.titulo}
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink-soft">
                  {s.texto}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-wood-text">
                  Cotizar
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                  <span className="sr-only">{s.titulo} por WhatsApp</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Preguntas() {
  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-titulo"
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <Reveal>
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="preguntas-titulo" className="section-title mt-3">
            Antes de empezar
          </h2>
          <p className="mt-4 max-w-sm text-ink-soft">
            ¿Tienes otra duda? Escríbenos y te respondemos directamente.
          </p>
        </Reveal>
        <Reveal
          delay={100}
          className="divide-y divide-line border-y border-line"
        >
          {preguntas.map((q) => (
            <details key={q.p} className="faq group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl text-ink sm:text-2xl">
                {q.p}
                <span className="faq-plus" aria-hidden />
              </summary>
              <p className="pb-5 pr-10 leading-relaxed text-ink-soft">{q.r}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Contacto() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="relative overflow-hidden bg-ink py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow !text-sand">Hablemos de tu proyecto</p>
          <h2
            id="contacto-titulo"
            className="mx-auto mt-4 max-w-3xl font-serif text-[2.4rem] leading-[1.05] sm:text-6xl"
          >
            Envíanos una foto de tu espacio y empecemos.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-paper/80">
            Te respondemos por WhatsApp y coordinamos una visita de medición en{" "}
            {contacto.cobertura}.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-cta mt-10"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Escribir al {contacto.whatsapp}
          </a>
          <p className="mt-8">
            <a
              href={contacto.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-paper/80 underline-offset-4 hover:text-paper hover:underline"
            >
              <InstagramIcon className="h-5 w-5" />
              Síguenos en {contacto.instagram}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink pb-24 pt-8 text-sm text-paper/75 md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/mark.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-sm bg-paper p-1"
          />
          <span>
            <span className="block font-serif text-lg tracking-[0.22em] text-paper">
              LEGADO
            </span>
            <span className="block text-[0.6rem] tracking-[0.5em] text-sand">
              MUEBLES
            </span>
          </span>
        </div>
        <p>
          Diseño · Fabricación · Instalación — {contacto.cobertura} · ©{" "}
          {new Date().getFullYear()} Legado Muebles SpA
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <aside aria-label="Contacto rápido">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="wa-fab fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg shadow-ink/25 md:bottom-6 md:right-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </aside>
  );
}
