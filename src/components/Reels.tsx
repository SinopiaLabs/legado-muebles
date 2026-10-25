"use client";

import { useEffect, useRef } from "react";
import { contacto, reels } from "@/lib/data";
import Reveal from "./Reveal";

function Reel({ src, poster, titulo, texto }: (typeof reels)[number]) {
  const ref = useRef<HTMLVideoElement>(null);

  // Solo se reproduce mientras está a la vista
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduced) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="w-[68vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
      <div className="overflow-hidden bg-ink">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="aspect-[9/16] w-full object-cover"
          aria-label={titulo}
        />
      </div>
      <figcaption className="mt-3">
        <span className="block font-serif text-xl text-paper">{titulo}</span>
        <span className="text-sm text-paper/60">{texto}</span>
      </figcaption>
    </figure>
  );
}

export default function Reels() {
  return (
    <section className="bg-ink py-24 text-paper md:py-32" aria-labelledby="reels-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow !text-sand">Del taller a su lugar</p>
            <h2 id="reels-titulo" className="section-title mt-4 !text-paper">
              El detalle está en cada terminación.
            </h2>
          </div>
          <p className="max-w-lg text-paper/70 md:justify-self-end">
            Así se ven nuestros proyectos en movimiento. Encuentra más en Instagram{" "}
            <a href={contacto.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sand underline underline-offset-4">
              {contacto.instagram}
            </a>
            .
          </p>
        </Reveal>
        <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {reels.map((r) => (
            <Reel key={r.src} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
