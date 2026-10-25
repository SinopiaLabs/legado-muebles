"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { mapasAcabado } from "./mapas";
import { TILE_H, TILE_W, maderaLogo } from "./textures";

// Contornos del isotipo, trazados sobre el logo en una grilla de 512 px (y hacia abajo)
const NEGRO = [[68, 45], [122, 12], [122, 445], [375, 445], [375, 500], [68, 500]];
const MADERA = [[160, 5], [412, 148], [412, 355], [338, 355], [338, 192], [218, 125], [218, 410], [160, 410]];
const PIE = [[272, 392], [442, 392], [442, 500], [408, 500], [408, 416], [255, 416]];

function shape(points: number[][]) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const px = ((x - 256) / 256) * 1.2;
    const py = (-(y - 256) / 256) * 1.2;
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  });
  s.closePath();
  return s;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Mark({ progress, reduced }: { progress: RefObject<number>; reduced: boolean }) {
  const geos = useMemo(() => {
    const opts = (depth: number) => ({ depth, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 });
    return [
      new THREE.ExtrudeGeometry(shape(NEGRO), opts(0.22)),
      new THREE.ExtrudeGeometry(shape(MADERA), opts(0.3)),
      new THREE.ExtrudeGeometry(shape(PIE), opts(0.3)),
    ].map((g) => g.center());
  }, []);
  // Centros originales de cada pieza para volver a ubicarlas tras center()
  const origins = useMemo(
    () =>
      [NEGRO, MADERA, PIE].map((pts) => {
        const b = new THREE.Box2();
        pts.forEach(([x, y]) => b.expandByPoint(new THREE.Vector2(((x - 256) / 256) * 1.2, (-(y - 256) / 256) * 1.2)));
        const c = new THREE.Vector2();
        b.getCenter(c);
        return new THREE.Vector3(c.x, c.y, 0);
      }),
    [],
  );
  // 1 unidad del logo ≈ 35 cm de tablero, para que la veta tenga escala de mueble real
  const wood = useMemo(() => {
    const m = mapasAcabado(maderaLogo, 3);
    for (const t of [m.map, m.bumpMap]) {
      t.repeat.set(0.35 / TILE_W, 0.35 / TILE_H);
      t.rotation = 0.06;
    }
    return m;
  }, []);
  const mats = useMemo(
    () => [
      new THREE.MeshPhysicalMaterial({ color: "#1d1c1a", roughness: 0.6, clearcoat: 0.1, clearcoatRoughness: 0.5 }),
      new THREE.MeshPhysicalMaterial({
        ...wood,
        bumpScale: maderaLogo.relieve,
        roughness: maderaLogo.rugosidad,
        clearcoat: 0.12,
        clearcoatRoughness: 0.45,
      }),
    ],
    [wood],
  );
  useEffect(
    () => () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      wood.map.dispose();
      wood.bumpMap.dispose();
    },
    [geos, mats, wood],
  );

  const group = useRef<THREE.Group>(null);
  const pieces = useRef<(THREE.Mesh | null)[]>([]);
  const t0 = useRef<number | null>(null);
  const smoothP = useRef(0);
  // Hacia dónde se separa cada pieza al hacer scroll
  const spread: [number, number, number][] = [
    [-0.55, -0.15, -0.4],
    [0.15, 0.4, 0.45],
    [0.55, -0.35, 0.6],
  ];

  useFrame(({ clock, pointer, camera, size }, dt) => {
    // Aleja la cámara según la forma del lienzo para que las piezas nunca se corten en el borde
    camera.position.z = 6.6 * Math.max(1, 1.05 / (size.width / size.height));
    if (t0.current === null) t0.current = clock.elapsedTime;
    // Entrada: las piezas se ensamblan al cargar
    const intro = reduced ? 1 : smooth(0, 1.6, clock.elapsedTime - t0.current);
    smoothP.current = THREE.MathUtils.damp(smoothP.current, progress.current ?? 0, 6, Math.min(dt, 0.1));
    const sep = (1 - intro) * 0.9 + smooth(0, 1, smoothP.current) * 0.6;

    pieces.current.forEach((m, i) => {
      if (!m) return;
      const o = origins[i];
      const s = spread[i];
      m.position.set(o.x + s[0] * sep, o.y + s[1] * sep, s[2] * sep);
      m.rotation.set(s[1] * sep * 0.5, s[0] * sep * 0.6, 0);
    });

    const g = group.current;
    if (g) {
      const idle = reduced ? 0 : Math.sin(clock.elapsedTime * 0.5) * 0.06;
      const ry = -0.38 + pointer.x * 0.22 + idle + smoothP.current * 0.6;
      const rx = 0.06 - pointer.y * 0.12;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 3, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 3, dt);
    }
  });

  return (
    <group ref={group}>
      {geos.map((g, i) => (
        <mesh
          key={i}
          ref={(el) => void (pieces.current[i] = el)}
          geometry={g}
          material={mats[i === 0 ? 0 : 1]}
          castShadow
        />
      ))}
    </group>
  );
}

export default function LogoScene({
  progress,
  active,
  reduced,
}: {
  progress: RefObject<number>;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.5, 3, 4]} intensity={1.8} />
      <directionalLight position={[-3, -1, 2]} intensity={0.4} color="#f4e2c8" />
      <Environment resolution={128}>
        <Lightformer intensity={1.2} position={[0, 3, 4]} scale={[6, 3, 1]} color="#fff4e4" />
        <Lightformer intensity={0.6} position={[4, 0, 2]} rotation-y={-Math.PI / 3} scale={[3, 4, 1]} color="#f0d9bb" />
      </Environment>
      <Mark progress={progress} reduced={reduced} />
    </Canvas>
  );
}
