"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { useInView, useScrollProgress, useWebGL } from "./hooks";
import { acabados } from "./three/textures";

const CabinetScene = dynamic(() => import("./three/CabinetScene"), { ssr: false });

// Tramos del scroll que coinciden con la animación de CabinetScene
const etapas = [
  {
    hasta: 0.22,
    n: "01",
    titulo: "Escuchamos y medimos",
    texto: "Todo comienza en tu espacio: tomamos medidas, conocemos tus gustos, prioridades y cómo vas a usar el mueble.",
  },
  {
    hasta: 0.42,
    n: "02",
    titulo: "Diseñamos la solución",
    texto: "Definimos distribución, repisas, cajones y zonas de colgado. Cada pieza tiene un lugar y una razón.",
  },
  {
    hasta: 0.68,
    n: "03",
    titulo: "Seleccionamos materiales",
    texto: "Melaminas, laminados de alta presión, cubiertas y herrajes elegidos según el uso, la estética y el presupuesto.",
  },
  {
    hasta: 1.01,
    n: "04",
    titulo: "Fabricamos e instalamos",
    texto: "Cuidamos ajustes, encuentros y terminaciones, e instalamos en terreno revisando cada detalle contigo.",
  },
];

export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const [etapa, setEtapa] = useState(0);
  const [acabado, setAcabado] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((p: number) => {
    setEtapa(etapas.findIndex((e) => p < e.hasta));
    if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
  }, []);

  const progress = useScrollProgress(ref, "pin", onProgress);
  const visible = useInView(ref, "200px");
  const webgl = useWebGL();

  return (
    <section ref={ref} id="recorrido" aria-label="Cómo trabajamos, paso a paso" className="relative h-[420vh] bg-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          {webgl ? (
            <CabinetScene progress={progress} active={visible} onFinish={setAcabado} />
          ) : webgl === false ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/img/lm02-walking-closet.webp" alt="" className="h-full w-full object-cover opacity-90" />
          ) : null}
        </div>

        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl items-end px-4 pb-6 sm:px-6 md:items-center md:pb-0 lg:px-10">
          <div className="relative flex w-full gap-5 md:max-w-md">
            <div className="hidden w-px shrink-0 bg-line md:block" aria-hidden>
              <div ref={barRef} className="h-full w-px origin-top scale-y-0 bg-wood" />
            </div>
            <div className="relative grid w-full">
              {etapas.map((e, i) => (
                <article
                  key={e.n}
                  aria-hidden={i !== etapa}
                  className={`story-card col-start-1 row-start-1 ${i === etapa ? "is-active" : ""}`}
                >
                  <p className="eyebrow">Paso {e.n} de 04</p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">{e.titulo}</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{e.texto}</p>
                  {i === 2 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Acabados de ejemplo">
                      {acabados.map((a, j) => (
                        <li
                          key={a.nombre}
                          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            j === acabado ? "border-wood bg-white text-ink" : "border-line text-ink-soft"
                          }`}
                        >
                          <span className="h-3 w-3 rounded-full" style={{ background: a.base }} aria-hidden />
                          {a.nombre}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
