"use client";

import { useEffect, useRef, useState } from "react";
import { contacto, reels } from "@/lib/data";
import { useReducedMotion } from "./hooks";
import { InstagramIcon } from "./icons";
import Reveal from "./Reveal";

function Reel({ src, poster, titulo }: (typeof reels)[number]) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  // null = sin elección de la persona; con movimiento reducido parte en pausa
  const [manual, setManual] = useState<boolean | null>(null);
  const pausado = manual ?? reduced;
  const visible = useRef(false);

  // Se reproduce solo mientras está a la vista
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting && !pausado) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [pausado]);

  function alternar() {
    const v = ref.current;
    if (!v) return;
    setManual(!pausado);
    if (pausado) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <li className="w-[62vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none">
      <div className="relative overflow-hidden bg-black">
        <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className="aspect-[9/16] w-full object-cover" aria-label={`Video: ${titulo}`} />
        <button
          type="button"
          onClick={alternar}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur hover:bg-ink"
          aria-label={pausado ? `Reproducir video: ${titulo}` : `Pausar video: ${titulo}`}
        >
          {pausado ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          )}
        </button>
      </div>
      <p className="mt-3 font-serif text-xl text-paper">{titulo}</p>
    </li>
  );
}

export default function Reels() {
  return (
    <section aria-labelledby="reels-titulo" className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow !text-sand">En movimiento</p>
            <h2 id="reels-titulo" className="section-title mt-3 !text-paper">
              El detalle está en cada terminación.
            </h2>
          </div>
          <a
            href={contacto.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-paper/85 hover:text-paper"
          >
            <InstagramIcon className="h-5 w-5 text-sand" />
            Más en {contacto.instagram}
          </a>
        </Reveal>
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {reels.map((r) => (
            <Reel key={r.src} {...r} />
          ))}
        </ul>
      </div>
    </section>
  );
}
