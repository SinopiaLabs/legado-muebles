"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, useReducedMotion, useScrollProgress, useWebGL } from "./hooks";
import { whatsappLink } from "@/lib/data";

const LogoScene = dynamic(() => import("./three/LogoScene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref, "exit");
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const webgl = useWebGL();

  return (
    <section ref={ref} id="inicio" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-10 lg:px-10">
        <div className="relative z-10 py-6 md:py-20">
          <p className="eyebrow">Curicó · Diseño, fabricación e instalación</p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Muebles a medida,
            <br />
            <em className="text-wood not-italic">construidos con oficio.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Transformamos las ideas y necesidades de cada cliente en mobiliario personalizado, cuidando cada
            detalle desde la propuesta inicial hasta la instalación final.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              className="btn-primary"
              href={whatsappLink("Hola Legado Muebles, me gustaría cotizar un mueble a medida.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotiza tu proyecto
            </a>
            <a className="btn-ghost" href="#proyectos">
              Ver proyectos
            </a>
          </div>
          <ul className="mt-12 flex max-w-md flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-xs uppercase tracking-[0.22em] text-ink-soft">
            <li>Diseño</li>
            <li aria-hidden className="text-wood">·</li>
            <li>Fabricación</li>
            <li aria-hidden className="text-wood">·</li>
            <li>Instalación</li>
          </ul>
        </div>

        <div className="relative -mx-4 aspect-square sm:mx-0 md:aspect-[4/5]">
          <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,var(--color-sand)_0%,transparent_70%)]" />
          {webgl ? (
            <LogoScene progress={progress} active={visible} reduced={reduced} />
          ) : webgl === false ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/img/mark.png" alt="" className="absolute inset-[18%] h-[64%] w-[64%] object-contain" />
          ) : null}
        </div>
      </div>

      <a
        href="#recorrido"
        className="mx-auto mb-6 mt-2 flex w-fit flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-soft"
      >
        Descubre cómo trabajamos
        <span className="scroll-cue" aria-hidden />
      </a>
    </section>
  );
}
