"use client";

import { useState, type CSSProperties } from "react";
import { proyectos } from "@/lib/data";
import Foto from "./Foto";
import Reveal from "./Reveal";

/** Comparador arrastrable: el mismo mueble en el taller y ya instalado. */
function TallerALugar() {
  const [x, setX] = useState(50);
  return (
    <figure className="relative">
      <div className="compare relative aspect-[3/4] overflow-hidden bg-ink md:aspect-[4/5]" style={{ "--x": `${x}%` } as CSSProperties}>
        <Foto nombre="lm05-cava" alt="La cava instalada en el local, con iluminación LED encendida" sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
        <div className="compare-top absolute inset-0">
          <Foto nombre="lm05-cava-taller" alt="La misma cava terminada en el taller, antes de instalarla" sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 bg-ink/85 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-paper">En el taller</span>
        <span className="pointer-events-none absolute right-3 top-3 bg-paper/90 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-ink">Instalada</span>
        <div className="compare-handle pointer-events-none absolute inset-y-0" aria-hidden>
          <span className="compare-knob">⟷</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          aria-label="Desliza para comparar la cava en el taller y ya instalada"
          className="compare-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-ink-soft">
        <span className="font-medium text-ink">Cava iluminada · Sagrada Familia.</span> Desliza para ver el mismo mueble del
        taller a su lugar.
      </figcaption>
    </figure>
  );
}

export default function Projects() {
  const [activo, setActivo] = useState(0);
  const p = proyectos[activo];

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
          <div>
            <p className="eyebrow">Proyectos</p>
            <h2 id="proyectos-titulo" className="section-title mt-3">
              Del taller a tu espacio.
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Cada mueble se fabrica para un lugar exacto. Así se ve el antes y el después de una misma pieza.
            </p>
          </div>
          <TallerALugar />
        </Reveal>

        {/* Escritorio: lista interactiva con vista previa fija */}
        <div className="mt-20 hidden gap-12 md:grid md:grid-cols-[1fr_1.25fr]">
          <ul className="self-center border-t border-line" aria-label="Proyectos destacados">
            {proyectos.map((q, i) => (
              <li key={q.titulo} className="border-b border-line">
                <button
                  type="button"
                  onMouseEnter={() => setActivo(i)}
                  onFocus={() => setActivo(i)}
                  onClick={() => setActivo(i)}
                  aria-pressed={i === activo}
                  className={`project-row ${i === activo ? "is-on" : ""}`}
                >
                  <span className="font-serif text-sm tabular-nums text-ink-soft">0{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-serif text-3xl leading-tight">{q.titulo}</span>
                    <span className="block text-sm text-ink-soft">
                      {q.lugar}
                      {q.previo ? " · Trayectoria del equipo" : ""}
                    </span>
                  </span>
                  <span aria-hidden className="project-arrow">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="relative" aria-live="polite">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              {proyectos.map((q, i) => (
                <Foto
                  key={q.img}
                  nombre={q.img}
                  alt={i === activo ? q.alt : ""}
                  sizes="55vw"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ${
                    i === activo ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-lg text-ink">{p.frase}</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Detalles">
              {p.detalles.map((d) => (
                <li key={d} className="rounded-full border border-line px-3 py-1 text-sm text-ink-soft">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Celular: tarjetas deslizables */}
        {/* tabIndex: permite desplazar la lista con el teclado */}
        <ul tabIndex={0} className="-mx-4 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden" aria-label="Proyectos destacados (desliza para ver más)">
          {proyectos.map((q) => (
            <li key={q.titulo} className="w-[82vw] shrink-0 snap-center">
              <Foto nombre={q.img} alt={q.alt} sizes="82vw" className="aspect-[4/3] w-full object-cover" />
              <h3 className="mt-3 font-serif text-2xl text-ink">{q.titulo}</h3>
              <p className="text-sm text-ink-soft">
                {q.lugar}
                {q.previo ? " · Trayectoria del equipo" : ""}
              </p>
              <p className="mt-2 text-ink">{q.frase}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
