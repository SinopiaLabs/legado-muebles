"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import CssCabinet from "./CssCabinet";
import { useInView, useNearOnce, useScrollProgress, useWebGL } from "./hooks";
import { acabados } from "./three/textures";

const CabinetScene = dynamic(() => import("./three/CabinetScene"), { ssr: false });

// Igual que autoFinish en CabinetScene (sin importar el módulo de three.js)
const acabadoPorScroll = (p: number) => (p < 0.42 ? 0 : Math.min(acabados.length - 1, Math.floor((p - 0.42) / 0.06)));

// Tramos del scroll que coinciden con la animación del mueble
const etapas = [
  { hasta: 0.22, titulo: "Medimos tu espacio", texto: "Vamos a terreno, tomamos medidas y escuchamos cómo usarás el mueble." },
  { hasta: 0.42, titulo: "Diseñamos cada pieza", texto: "Repisas, cajones y zonas de colgado: cada parte tiene un lugar y una razón." },
  { hasta: 0.68, titulo: "Eliges el acabado", texto: "Toca un acabado para verlo en el mueble." },
  { hasta: 1.01, titulo: "Fabricamos e instalamos", texto: "Lo armamos en taller, lo instalamos y revisamos contigo cada detalle." },
];

export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const [etapa, setEtapa] = useState(0);
  const [autoAcabado, setAutoAcabado] = useState(0);
  const [elegido, setElegido] = useState<number | null>(null);
  const override = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((p: number) => {
    setEtapa(etapas.findIndex((e) => p < e.hasta));
    setAutoAcabado(acabadoPorScroll(p));
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
  }, []);

  const progress = useScrollProgress(ref, "pin", onProgress);
  const visible = useInView(ref, "200px");
  // El 3D se carga recién cuando la sección está a media pantalla de distancia
  const near = useNearOnce(ref, "50% 0px");
  const webgl = useWebGL();
  const acabado = elegido ?? autoAcabado;

  function elegir(i: number) {
    override.current = i;
    setElegido(i);
  }

  return (
    <section ref={ref} id="proceso" aria-labelledby="proceso-titulo" className="relative h-[360vh] bg-paper md:h-[420vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          {!near ? null : webgl ? (
            <CabinetScene progress={progress} override={override} active={visible} onFinish={() => {}} />
          ) : webgl === false ? (
            <CssCabinet progress={progress} finish={acabado} />
          ) : null}
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-24 pt-20 sm:px-6 md:justify-center md:pb-0 lg:px-10">
          <h2 id="proceso-titulo" className="sr-only">
            Cómo trabajamos, en cuatro pasos
          </h2>
          <div className="story-panel md:max-w-sm">
            <div className="flex items-center gap-3" aria-hidden>
              <span className="font-serif text-sm text-wood-text tabular-nums">0{etapa + 1}</span>
              <div className="h-px flex-1 bg-line">
                <div ref={barRef} className="h-px origin-left scale-x-0 bg-wood" />
              </div>
              <span className="font-serif text-sm text-ink-soft">04</span>
            </div>
            <div className="relative mt-4 grid">
              {etapas.map((e, i) => (
                <div
                  key={e.titulo}
                  aria-hidden={i !== etapa}
                  className={`story-step col-start-1 row-start-1 ${i === etapa ? "is-active" : ""}`}
                >
                  <h3 className="font-serif text-[1.9rem] leading-tight text-ink sm:text-4xl">{e.titulo}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{e.texto}</p>
                </div>
              ))}
            </div>
            {etapa >= 2 && (
              <fieldset className="mt-4">
                <legend className="sr-only">Elige un acabado</legend>
                <div className="flex flex-wrap gap-2">
                  {acabados.map((a, j) => (
                    <button
                      key={a.nombre}
                      type="button"
                      onClick={() => elegir(j)}
                      aria-pressed={j === acabado}
                      className={`finish-chip ${j === acabado ? "is-on" : ""}`}
                    >
                      <span className="h-4 w-4 rounded-full ring-1 ring-ink/15" style={{ background: a.base }} aria-hidden />
                      {a.nombre}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
