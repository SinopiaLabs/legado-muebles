"use client";
/* eslint-disable react-hooks/immutability -- los objetos de three.js se mutan en cada frame (patrón normal de R3F) */

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { acabados, woodTexture } from "./textures";

type V3 = [number, number, number];
type Kind = "carcass" | "front" | "metal" | "led";
type PartDef = { size: V3; pos: V3; ex: V3; kind: Kind; delay: number; cyl?: boolean };

/** Acabado que corresponde al scroll si el visitante no eligió uno. */
export const autoFinish = (p: number) => (p < 0.42 ? 0 : Math.min(acabados.length - 1, Math.floor((p - 0.42) / 0.06)));

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Medidas del clóset en metros: 3 cuerpos de 80 cm
const W = 2.4;
const H = 2.2;
const D = 0.58;
const T = 0.036;
const PL = 0.08; // zócalo
const BAY = W / 3;
const innerH = H - PL - 2 * T;

function buildParts(): PartDef[] {
  const parts: PartDef[] = [
    { kind: "carcass", size: [T, H, D], pos: [-W / 2 + T / 2, H / 2, 0], ex: [-1.4, 0.2, 0], delay: 0 },
    { kind: "carcass", size: [T, H, D], pos: [W / 2 - T / 2, H / 2, 0], ex: [1.4, 0.2, 0], delay: 0 },
    { kind: "carcass", size: [W, T, D], pos: [0, H - T / 2, 0], ex: [0, 1.3, 0], delay: 0.15 },
    { kind: "carcass", size: [W - 2 * T, T, D], pos: [0, PL + T / 2, 0], ex: [0, -0.7, 0.4], delay: 0.1 },
    { kind: "carcass", size: [W - 2 * T, PL, T], pos: [0, PL / 2, D / 2 - 0.04], ex: [0, -0.5, 1], delay: 0.1 },
    { kind: "carcass", size: [W - 2 * T, H - PL - T, 0.008], pos: [0, (H + PL) / 2 - T / 2, -D / 2 + 0.004], ex: [0, 0, -1.6], delay: 0.05 },
  ];
  // Divisiones verticales
  for (const x of [-BAY / 2, BAY / 2]) {
    parts.push({ kind: "carcass", size: [T, innerH, D - 0.02], pos: [x, PL + T + innerH / 2, 0.01], ex: [x * 2, 0, 1.2], delay: 0.25 });
  }
  // Cuerpo izquierdo y derecho: repisa superior + barra de colgar
  for (const cx of [-BAY, BAY]) {
    parts.push({ kind: "carcass", size: [BAY - T, T, D - 0.04], pos: [cx, 1.86, 0.01], ex: [0, 0.3, 1.4], delay: 0.4 });
    parts.push({ kind: "metal", cyl: true, size: [0.014, BAY - T - 0.02, 0.014], pos: [cx, 1.76, 0.02], ex: [0, 0.2, 1.7], delay: 0.5 });
  }
  // Cuerpo central: repisas
  [0.5, 0.86, 1.22, 1.58, 1.94].forEach((y, i) => {
    parts.push({ kind: "carcass", size: [BAY - T, T, D - 0.04], pos: [0, y, 0.01], ex: [0, 0, 1.2 + i * 0.25], delay: 0.35 + i * 0.05 });
  });
  // Cajonera en el cuerpo derecho
  [0.24, 0.5, 0.76].forEach((y, i) => {
    parts.push({ kind: "front", size: [BAY - T - 0.01, 0.24, T], pos: [BAY, y, D / 2 - 0.06], ex: [0.4, 0, 1.6 + i * 0.2], delay: 0.55 + i * 0.05 });
  });
  // Tiras LED bajo la cubierta
  for (const cx of [-BAY, 0, BAY]) {
    parts.push({ kind: "led", size: [BAY - T - 0.06, 0.008, 0.016], pos: [cx, H - T - 0.006, D / 2 - 0.08], ex: [0, 1.2, 0.5], delay: 0.6 });
  }
  return parts;
}

// Puertas abatibles: [x de la bisagra, lado de apertura]
const DOORS: { hinge: number; dir: 1 | -1 }[] = [
  { hinge: -W / 2, dir: 1 },
  { hinge: -BAY / 2, dir: 1 },
  { hinge: W / 2, dir: -1 },
];
const DOOR_W = BAY - 0.004;
const DOOR_H = H - PL - 0.006;

// Cámara por tramos de scroll
const KEYS: { p: number; pos: V3; tgt: V3 }[] = [
  { p: 0, pos: [3.6, 3.4, 5.2], tgt: [0, 1.0, 0] },
  { p: 0.3, pos: [-3.2, 2.2, 5.0], tgt: [0, 1.1, 0] },
  { p: 0.62, pos: [0.3, 1.4, 5.0], tgt: [0, 1.1, 0] },
  { p: 1, pos: [2.0, 1.5, 4.0], tgt: [0, 1.1, 0] },
];

function cameraAt(p: number, pos: THREE.Vector3, tgt: THREE.Vector3) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = smooth(a.p, b.p, p);
  pos.set(...a.pos).lerp(new THREE.Vector3(...b.pos), t);
  tgt.set(...a.tgt).lerp(new THREE.Vector3(...b.tgt), t);
}

function Cabinet({
  progress,
  override,
  onFinish,
}: {
  progress: RefObject<number>;
  override: RefObject<number | null>;
  onFinish: (i: number) => void;
}) {
  const parts = useMemo(() => buildParts(), []);
  const { size } = useThree();

  const geos = useMemo(
    () =>
      parts.map((p) => {
        const g = p.cyl
          ? new THREE.CylinderGeometry(p.size[0], p.size[0], p.size[1], 16).rotateZ(Math.PI / 2)
          : new THREE.BoxGeometry(...p.size);
        return { mesh: g, edges: new THREE.EdgesGeometry(g, 30) };
      }),
    [parts],
  );
  const doorGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(DOOR_W, DOOR_H, T);
    return { mesh: g, edges: new THREE.EdgesGeometry(g) };
  }, []);
  const handleGeo = useMemo(() => new THREE.BoxGeometry(0.016, 0.42, 0.02), []);

  const textures = useMemo(() => acabados.map((a, i) => woodTexture(a.base, a.veta, 11 + i * 17, a.contraste)), []);
  const mats = useMemo(
    () => ({
      carcass: new THREE.MeshStandardMaterial({ color: "#f3efe8", roughness: 0.6, transparent: true }),
      front: new THREE.MeshStandardMaterial({ color: "#ffffff", map: textures[0], roughness: 0.45, transparent: true }),
      metal: new THREE.MeshStandardMaterial({ color: "#d4d4d4", metalness: 0.9, roughness: 0.25, transparent: true }),
      led: new THREE.MeshBasicMaterial({ color: "#3a3a3a", toneMapped: false, transparent: true }),
      line: new THREE.LineBasicMaterial({ color: "#8e5c36", transparent: true }),
    }),
    [textures],
  );

  useEffect(
    () => () => {
      geos.forEach((g) => (g.mesh.dispose(), g.edges.dispose()));
      doorGeo.mesh.dispose();
      doorGeo.edges.dispose();
      handleGeo.dispose();
      textures.forEach((t) => t.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    },
    [geos, doorGeo, handleGeo, textures, mats],
  );

  const partRefs = useRef<(THREE.Group | null)[]>([]);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const doorRefs = useRef<(THREE.Group | null)[]>([]);
  const hingeRefs = useRef<(THREE.Group | null)[]>([]);
  const doorMeshRefs = useRef<(THREE.Group | null)[]>([]);
  const ledLight = useRef<THREE.PointLight>(null);
  const state = useRef({ p: 0, finish: -1 });
  const camPos = useMemo(() => new THREE.Vector3(), []);
  const camTgt = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useRef(new THREE.Vector3(0, 1.1, 0));
  const ledOn = useMemo(() => new THREE.Color("#ffd49a"), []);
  const ledOff = useMemo(() => new THREE.Color("#3a3a3a"), []);

  useFrame(({ camera }, dt) => {
    const s = state.current;
    s.p = THREE.MathUtils.damp(s.p, progress.current ?? 0, 5, Math.min(dt, 0.1));
    const p = s.p;

    // 1) Plano → 2) armado → 3) acabados → 4) puertas abiertas y luz
    const solid = smooth(0.17, 0.3, p);
    const lines = 1 - 0.85 * smooth(0.24, 0.4, p);
    for (const m of [mats.carcass, mats.front, mats.metal, mats.led]) {
      m.opacity = solid;
      m.transparent = solid < 0.999;
      m.depthWrite = solid > 0.5;
    }
    mats.line.opacity = lines;

    parts.forEach((part, i) => {
      const g = partRefs.current[i];
      if (!g) return;
      const a = 0.08 + part.delay * 0.2;
      const e = 1 - smooth(a, a + 0.14, p);
      g.position.set(part.pos[0] + part.ex[0] * e, part.pos[1] + part.ex[1] * e, part.pos[2] + part.ex[2] * e);
      const mesh = meshRefs.current[i];
      if (mesh) mesh.visible = solid > 0.01;
    });

    const finish = override.current ?? autoFinish(p);
    if (finish !== s.finish) {
      s.finish = finish;
      mats.front.map = textures[finish];
      onFinish(finish);
    }

    DOORS.forEach((d, i) => {
      const g = doorRefs.current[i];
      const hinge = hingeRefs.current[i];
      if (!g || !hinge) return;
      const a = 0.24 + i * 0.02;
      const e = 1 - smooth(a, a + 0.14, p);
      g.position.set(d.hinge, PL + DOOR_H / 2 + 0.003 + e * 0.3, D / 2 + T / 2 + e * 2.2);
      const open = smooth(0.68 + i * 0.03, 0.84 + i * 0.03, p);
      hinge.rotation.y = -d.dir * open * 1.75;
      const dm = doorMeshRefs.current[i];
      if (dm) dm.visible = solid > 0.01;
    });

    const led = smooth(0.74, 0.86, p);
    mats.led.color.copy(ledOff).lerp(ledOn, led);
    if (ledLight.current) ledLight.current.intensity = led * 1.1;

    // Cámara: en pantallas anchas el mueble se corre a la derecha para dejar espacio al texto
    cameraAt(p, camPos, camTgt);
    const aspect = size.width / size.height;
    // Alejar la cámara desde el objetivo: más en pantallas angostas
    const k = aspect > 1.05 ? 1.42 : 2.3;
    camPos.sub(camTgt).multiplyScalar(k).add(camTgt);
    if (aspect > 1.05) {
      camPos.x -= 1.05;
      camTgt.x -= 1.05;
    } else {
      camTgt.y -= 0.95;
    }
    camera.position.lerp(camPos, 1 - Math.exp(-6 * dt));
    lookAt.current.lerp(camTgt, 1 - Math.exp(-6 * dt));
    camera.lookAt(lookAt.current);
  });

  return (
    <group>
      {parts.map((part, i) => (
        <group key={i} ref={(el) => void (partRefs.current[i] = el)} position={part.pos}>
          <mesh
            ref={(el) => void (meshRefs.current[i] = el)}
            geometry={geos[i].mesh}
            material={mats[part.kind]}
            castShadow
            receiveShadow
          />
          {part.kind !== "led" && <lineSegments geometry={geos[i].edges} material={mats.line} />}
        </group>
      ))}

      {DOORS.map((d, i) => (
        <group key={i} ref={(el) => void (doorRefs.current[i] = el)} position={[d.hinge, PL + DOOR_H / 2, D / 2 + T / 2]}>
          <group ref={(el) => void (hingeRefs.current[i] = el)}>
            <group position={[(d.dir * DOOR_W) / 2, 0, 0]}>
              <group ref={(el) => void (doorMeshRefs.current[i] = el)}>
                <mesh geometry={doorGeo.mesh} material={mats.front} castShadow />
                <mesh geometry={handleGeo} material={mats.metal} position={[d.dir * (DOOR_W / 2 - 0.06), 0.05, T / 2 + 0.012]} />
              </group>
              <lineSegments geometry={doorGeo.edges} material={mats.line} />
            </group>
          </group>
        </group>
      ))}

      <pointLight ref={ledLight} position={[0, H - 0.2, 0]} color="#ffcf8f" intensity={0} distance={2} decay={1.6} />
    </group>
  );
}

export default function CabinetScene({
  progress,
  override,
  active,
  onFinish,
}: {
  progress: RefObject<number>;
  override: RefObject<number | null>;
  active: boolean;
  onFinish: (i: number) => void;
}) {
  // En celulares: menos resolución y sin sombras dinámicas para cuidar batería y fluidez
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={mobile ? [1, 1.5] : [1, 1.75]}
      shadows={!mobile}
      camera={{ position: [3.6, 3.4, 5.2], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <hemisphereLight args={["#fffaf2", "#d8cbb8", 0.9]} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} castShadow={!mobile} shadow-mapSize={[1024, 1024]} />
      <Environment resolution={128}>
        <Lightformer intensity={1.4} position={[0, 4, 4]} scale={[8, 4, 1]} color="#fff6ea" />
        <Lightformer intensity={0.8} position={[-5, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#f2e6d4" />
      </Environment>
      <Cabinet progress={progress} override={override} onFinish={onFinish} />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.35} scale={8} blur={2.6} far={3} resolution={512} color="#4a3624" />
      <Grid
        position={[0, 0, 0]}
        args={[14, 14]}
        cellSize={0.2}
        cellThickness={0.6}
        cellColor="#ddd0bd"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#c4a383"
        fadeDistance={11}
        fadeStrength={1.6}
        infiniteGrid
      />
    </Canvas>
  );
}
