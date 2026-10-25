"use client";

import { useEffect, useMemo, useRef, type CSSProperties, type RefObject } from "react";
import { TILE_H, TILE_W, acabados, lienzosAcabado } from "./three/textures";

/*
 * Respaldo 3D con transformaciones CSS para navegadores sin WebGL.
 * Sigue la misma secuencia que CabinetScene: plano → armado → acabados → puertas abiertas.
 */

const U = 120; // px por metro
const W = 2.4;
const H = 2.2;
const D = 0.58;
const T = 0.036;
const PL = 0.08;
const BAY = W / 3;

type V3 = [number, number, number];
type Part = { size: V3; pos: V3; ex: V3; delay: number; front?: boolean };

const parts: Part[] = [
  { size: [T, H, D], pos: [-W / 2 + T / 2, H / 2, 0], ex: [-1.4, 0.2, 0], delay: 0 },
  { size: [T, H, D], pos: [W / 2 - T / 2, H / 2, 0], ex: [1.4, 0.2, 0], delay: 0 },
  { size: [W, T, D], pos: [0, H - T / 2, 0], ex: [0, 1.3, 0], delay: 0.15 },
  { size: [W - 2 * T, T, D], pos: [0, PL + T / 2, 0], ex: [0, -0.7, 0.4], delay: 0.1 },
  { size: [W - 2 * T, H - PL - T, 0.01], pos: [0, (H + PL) / 2 - T / 2, -D / 2], ex: [0, 0, -1.6], delay: 0.05 },
  { size: [T, H - PL - 2 * T, D - 0.02], pos: [-BAY / 2, H / 2 + PL / 2, 0], ex: [-0.8, 0, 1.2], delay: 0.25 },
  { size: [T, H - PL - 2 * T, D - 0.02], pos: [BAY / 2, H / 2 + PL / 2, 0], ex: [0.8, 0, 1.2], delay: 0.25 },
  ...[0.5, 0.86, 1.22, 1.58, 1.94].map((y, i): Part => ({ size: [BAY - T, T, D - 0.04], pos: [0, y, 0], ex: [0, 0, 1.2 + i * 0.25], delay: 0.35 + i * 0.05 })),
  { size: [BAY - T, T, D - 0.04], pos: [-BAY, 1.86, 0], ex: [0, 0.3, 1.4], delay: 0.4 },
  { size: [BAY - T, T, D - 0.04], pos: [BAY, 1.86, 0], ex: [0, 0.3, 1.4], delay: 0.4 },
  ...[0.24, 0.5, 0.76].map((y, i): Part => ({ size: [BAY - T - 0.01, 0.24, T], pos: [BAY, y, D / 2 - 0.06], ex: [0.4, 0, 1.6 + i * 0.2], delay: 0.55 + i * 0.05, front: true })),
];

const DOORS = [
  { hinge: -W / 2, dir: 1 },
  { hinge: -BAY / 2, dir: 1 },
  { hinge: W / 2, dir: -1 },
];
const DOOR_W = BAY - 0.004;
const DOOR_H = H - PL - 0.006;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Box({ size: [w, h, d], front = false }: { size: V3; front?: boolean }) {
  const [pw, ph, pd] = [w * U, h * U, d * U];
  const face = (fw: number, fh: number, transform: string, shade: number) => (
    <div
      style={{
        position: "absolute",
        width: fw,
        height: fh,
        left: -fw / 2,
        top: -fh / 2,
        transform,
        backfaceVisibility: "hidden",
        background: `color-mix(in srgb, ${front ? "var(--finish)" : "#f1eee8"} calc(var(--solid) * 100%), transparent)`,
        outline: "1px solid color-mix(in srgb, #8e5c36 calc(var(--lines) * 100%), transparent)",
        outlineOffset: -1,
      }}
    >
      {/* Textura real del acabado (misma que usa WebGL), a escala en metros */}
      {front && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--tex)",
            backgroundSize: `${TILE_W * U}px ${TILE_H * U}px`,
            opacity: "var(--solid)",
          }}
        />
      )}
      {shade !== 0 && (
        <div style={{ position: "absolute", inset: 0, background: shade > 0 ? `rgba(0,0,0,${shade})` : `rgba(255,255,255,${-shade})`, opacity: "var(--solid)" }} />
      )}
    </div>
  );
  return (
    <>
      {face(pw, ph, `translateZ(${pd / 2}px)`, 0)}
      {face(pw, ph, `rotateY(180deg) translateZ(${pd / 2}px)`, 0.12)}
      {face(pd, ph, `rotateY(-90deg) translateZ(${pw / 2}px)`, 0.08)}
      {face(pd, ph, `rotateY(90deg) translateZ(${pw / 2}px)`, 0.08)}
      {face(pw, pd, `rotateX(90deg) translateZ(${ph / 2}px)`, -0.03)}
      {face(pw, pd, `rotateX(-90deg) translateZ(${ph / 2}px)`, 0.15)}
    </>
  );
}

export default function CssCabinet({ progress, finish }: { progress: RefObject<number>; finish: number }) {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const partRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hingeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let p = progress.current ?? 0;
    const tick = () => {
      p += ((progress.current ?? 0) - p) * 0.12;
      const el = root.current;
      if (el) {
        el.style.setProperty("--solid", String(smooth(0.17, 0.3, p)));
        el.style.setProperty("--lines", String(1 - 0.85 * smooth(0.24, 0.4, p)));
        el.style.setProperty("--led", String(smooth(0.74, 0.86, p)));
      }
      if (scene.current) {
        const ry = -38 + 52 * smooth(0, 0.62, p) + 18 * smooth(0.62, 1, p);
        const rx = -16 + 8 * smooth(0, 0.62, p);
        scene.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      parts.forEach((part, i) => {
        const g = partRefs.current[i];
        if (!g) return;
        const a = 0.08 + part.delay * 0.2;
        const e = 1 - smooth(a, a + 0.14, p);
        const [x, y, z] = part.pos.map((v, k) => (v + part.ex[k] * e) * U);
        g.style.transform = `translate3d(${x}px, ${-(y - (H / 2) * U)}px, ${z}px)`;
      });
      DOORS.forEach((d, i) => {
        const g = doorRefs.current[i];
        const h = hingeRefs.current[i];
        if (!g || !h) return;
        const a = 0.24 + i * 0.02;
        const e = 1 - smooth(a, a + 0.14, p);
        const y = PL + DOOR_H / 2 + e * 0.3 - H / 2;
        g.style.transform = `translate3d(${d.hinge * U}px, ${-y * U}px, ${(D / 2 + T / 2 + e * 2.2) * U}px)`;
        const open = smooth(0.68 + i * 0.03, 0.84 + i * 0.03, p);
        h.style.transform = `rotateY(${-d.dir * open * 100}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const a = acabados[finish];
  // Se genera en el navegador: este componente solo se monta del lado del cliente
  const texturas = useMemo(() => acabados.map((x, i) => `url(${lienzosAcabado(x, 11 + i * 17).color.toDataURL("image/jpeg", 0.85)})`), []);
  const vars = {
    "--finish": a.base,
    "--tex": texturas[finish],
    "--solid": 0,
    "--lines": 1,
    "--led": 0,
  } as CSSProperties;

  return (
    <div ref={root} className="css-cabinet absolute inset-x-0 top-[30svh] flex justify-center md:inset-y-0 md:top-0 md:items-center md:pl-[34vw]" style={vars} aria-hidden>
      <div className="scale-[0.62] sm:scale-90 lg:scale-100" style={{ perspective: 1500 }}>
        <div ref={scene} style={{ transformStyle: "preserve-3d", position: "relative", width: 0, height: 0 }}>
          {/* Suelo */}
          <div
            style={{
              position: "absolute",
              width: 6 * U,
              height: 4 * U,
              left: -3 * U,
              top: -2 * U,
              transform: `translateY(${(H / 2) * U}px) rotateX(90deg)`,
              background: "radial-gradient(closest-side, rgba(74,54,36,0.22), transparent 70%)",
            }}
          />
          {parts.map((part, i) => (
            <div key={i} ref={(el) => void (partRefs.current[i] = el)} style={{ position: "absolute", transformStyle: "preserve-3d" }}>
              <Box size={part.size} front={part.front} />
            </div>
          ))}
          {/* Luz LED bajo la cubierta */}
          <div
            style={{
              position: "absolute",
              width: (W - 0.2) * U,
              height: 10,
              left: -((W - 0.2) * U) / 2,
              top: -(H / 2 - T - 0.02) * U,
              transform: `translateZ(${(D / 2 - 0.08) * U}px)`,
              background: "#ffd49a",
              opacity: "var(--led)",
              boxShadow: "0 18px 60px 20px rgba(255, 207, 143, 0.55)",
            }}
          />
          {DOORS.map((d, i) => (
            <div key={i} ref={(el) => void (doorRefs.current[i] = el)} style={{ position: "absolute", transformStyle: "preserve-3d" }}>
              <div ref={(el) => void (hingeRefs.current[i] = el)} style={{ transformStyle: "preserve-3d" }}>
                <div style={{ position: "absolute", transformStyle: "preserve-3d", transform: `translateX(${(d.dir * DOOR_W * U) / 2}px)` }}>
                  <Box size={[DOOR_W, DOOR_H, T]} front />
                  <div
                    style={{
                      position: "absolute",
                      width: 3,
                      height: 0.42 * U,
                      left: d.dir * (DOOR_W / 2 - 0.06) * U - 1.5,
                      top: -0.21 * U - 0.05 * U,
                      transform: `translateZ(${(T / 2) * U + 3}px)`,
                      background: "#2b2b2b",
                      opacity: "var(--solid)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
