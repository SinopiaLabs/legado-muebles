"use client";

import { useEffect, useRef, useState } from "react";
import { otrosTrabajos, proyectos, trayectoria, type Proyecto } from "@/lib/data";
import Reveal from "./Reveal";

function Ficha({ p, onClose }: { p: Proyecto; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [img, setImg] = useState(0);

  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const filas = [
    ["Materiales", p.materiales],
    ["Herrajes y accesorios", p.herrajes],
    ["Iluminación y terminaciones", p.terminaciones],
  ];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="ficha m-auto max-h-[92svh] w-[min(1100px,calc(100vw-1.5rem))] overflow-y-auto bg-paper p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      aria-labelledby={`ficha-${p.codigo}`}
    >
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        <div className="bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.imagenes[img].src} alt={p.imagenes[img].alt} className="aspect-[4/5] w-full object-cover md:h-full md:max-h-[92svh]" />
          {p.imagenes.length > 1 && (
            <div className="flex gap-2 bg-ink p-3 md:hidden">
              {p.imagenes.map((im, i) => (
                <button key={im.src} type="button" onClick={() => setImg(i)} aria-label={`Ver foto ${i + 1}`} className={`h-14 w-14 overflow-hidden border ${i === img ? "border-sand" : "border-transparent opacity-60"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow">Ficha N° {p.codigo} · {p.anio}</p>
            <button type="button" onClick={() => ref.current?.close()} className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center text-2xl text-ink-soft hover:text-ink" aria-label="Cerrar ficha">
              ×
            </button>
          </div>
          <h3 id={`ficha-${p.codigo}`} className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            {p.titulo}
          </h3>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line text-sm">
            {[
              ["Tipo", p.tipo],
              ["Ubicación", p.ubicacion],
              ["Material", p.material],
              ["Medidas", p.medidas ?? "Según proyecto"],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-3">
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="eyebrow">Necesidad</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.necesidad}</p>
            </div>
            <div>
              <h4 className="eyebrow">Solución</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.solucion}</p>
            </div>
          </div>
          <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
            {filas.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
                <dt className="font-medium">{k}</dt>
                <dd className="text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-relaxed">
            <span className="font-medium">Resultado: </span>
            <span className="text-ink-soft">{p.resultado}</span>
          </p>
          {p.imagenes.length > 1 && (
            <div className="mt-6 hidden gap-2 md:flex">
              {p.imagenes.map((im, i) => (
                <button key={im.src} type="button" onClick={() => setImg(i)} aria-label={`Ver foto ${i + 1}`} className={`h-16 w-16 overflow-hidden border-2 ${i === img ? "border-wood" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

function Tarjeta({ p, onOpen, grande = false }: { p: Proyecto; onOpen: () => void; grande?: boolean }) {
  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left" aria-label={`Ver ficha: ${p.titulo}`}>
      <div className={`relative overflow-hidden bg-sand ${grande ? "aspect-[4/5] md:aspect-[16/11]" : "aspect-[4/5]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.imagenes[0].src}
          alt={p.imagenes[0].alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 bg-paper/90 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-ink">{p.codigo}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl leading-tight text-ink">{p.titulo}</h3>
        <span className="shrink-0 text-sm text-wood transition-transform group-hover:translate-x-1" aria-hidden>
          Ver ficha →
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {p.ubicacion} · {p.material}
      </p>
    </button>
  );
}

export default function Projects() {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);

  return (
    <section id="proyectos" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">04 · Proyectos Legado Muebles</p>
            <h2 className="section-title mt-4">Cada espacio tiene sus propios desafíos.</h2>
          </div>
          <p className="max-w-lg text-ink-soft md:justify-self-end">
            Una selección de proyectos desarrollados bajo nuestra marca. Cada uno se presenta en una ficha con sus
            datos principales, materiales y fotografías.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p, i) => (
            <Reveal key={p.codigo} delay={(i % 3) * 90} className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
              <Tarjeta p={p} onOpen={() => setAbierto(p)} grande={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 border-t border-line pt-14">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">Nuestra trayectoria</p>
              <h2 className="section-title mt-4">Una nueva historia, construida con experiencia.</h2>
            </div>
            <p className="max-w-lg text-ink-soft md:justify-self-end">
              Proyectos realizados por nuestro equipo antes del nacimiento de Legado Muebles, como parte de su
              trayectoria profesional.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {trayectoria.map((p, i) => (
            <Reveal key={p.codigo} delay={i * 90}>
              <Tarjeta p={p} onOpen={() => setAbierto(p)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="eyebrow">También hacemos</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {otrosTrabajos.map((o) => (
              <figure key={o.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.src} alt={o.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="mt-2 text-sm text-ink-soft">{o.titulo}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>

      {abierto && <Ficha key={abierto.codigo} p={abierto} onClose={() => setAbierto(null)} />}
    </section>
  );
}
