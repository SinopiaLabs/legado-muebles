"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useIdle, useInView, useReducedMotion, useScrollProgress, useWebGL } from "./hooks";
import { Icono, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/data";

const LogoScene = dynamic(() => import("./three/LogoScene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref, "exit");
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const webgl = useWebGL();
  // El logo 3D espera a que termine la carga para no competir con el texto principal
  const idle = useIdle();

  return (
    <section ref={ref} id="inicio" className="relative overflow-hidden pt-20 md:pt-24">
      <div className="mx-auto grid max-w-7xl items-center px-4 sm:px-6 md:min-h-[calc(100svh-6rem)] md:grid-cols-[1.1fr_1fr] md:gap-8 lg:px-10">
        <div className="relative z-10 order-2 pb-10 md:order-1 md:py-16">
          {/* El h1 lleva la búsqueda principal; el lema grande es solo visual */}
          <h1 className="eyebrow flex items-center gap-2">
            <Icono nombre="ubicacion" className="h-4 w-4 text-icon" />
            Muebles a medida en Curicó y alrededores
          </h1>
          <p className="hero-title mt-4 font-serif text-[2.75rem] leading-[1.02] text-ink sm:text-6xl lg:text-[5.2rem]">
            <span className="block">Tu espacio,</span>
            <span className="block text-wood-text">a la medida exacta.</span>
          </p>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Diseñamos, fabricamos e instalamos cocinas, clósets y muebles pensados para cómo vives. Un mismo equipo de
            principio a fin.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" />
              Cotiza por WhatsApp
            </a>
            <a className="btn-ghost" href="#proceso">
              Mira cómo trabajamos
            </a>
          </div>
          <ul className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-line pt-6 text-sm text-ink">
            {(
              [
                ["medir", "Medimos en terreno"],
                ["taller", "Fabricamos en taller"],
                ["instalar", "Instalamos"],
              ] as const
            ).map(([icono, texto]) => (
              <li key={texto} className="flex flex-col gap-2">
                <Icono nombre={icono} className="h-6 w-6 text-icon" />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative order-1 -mx-4 aspect-[5/4] sm:mx-0 md:order-2 md:aspect-[4/5]">
          <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,var(--color-sand)_0%,transparent_70%)]" />
          {/* El logo plano viene en el HTML (pinta al instante) y se desvanece cuando entra el 3D */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/mark-400.webp"
            alt=""
            width={400}
            height={400}
            fetchPriority="high"
            className={`logo-float absolute inset-[22%] h-[56%] w-[56%] object-contain transition-opacity duration-700 ${
              webgl && idle ? "opacity-0" : "opacity-100"
            }`}
          />
          {webgl && idle && <LogoScene progress={progress} active={visible} reduced={reduced} />}
        </div>
      </div>
    </section>
  );
}
