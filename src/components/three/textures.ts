import * as THREE from "three";

/*
 * Texturas de melamina y laminado generadas en canvas (sin archivos externos).
 *
 * Imitan cómo se ven los tableros reales de cerca:
 * - fibras finas y rectas en el sentido del largo, con bandas suaves de color;
 * - una leve ondulación de la veta y poros alargados en los tonos madera;
 * - un mapa de relieve (bump) para que la luz rasante marque la textura.
 *
 * Cada textura representa un trozo de tablero de TILE_W × TILE_H metros y se
 * repite sin costuras. Las piezas usan UV en metros (ver uvEnMetros), así la veta
 * tiene el mismo tamaño en una puerta de 2 m que en un cajón de 24 cm.
 */

export const TILE_W = 0.4;
export const TILE_H = 1.6;
const PX_W = 512;
const PX_H = 1024;

export type Acabado = {
  nombre: string;
  tipo: string;
  base: string; // color medio del tablero con luz neutra
  veta: string; // color de las fibras oscuras
  contraste: number; // cuánto se notan fibras y bandas (0 = liso)
  fibra: number; // peso de las fibras finas frente a las bandas anchas
  ondulacion: number; // px de ondulación de la veta
  poros: number; // cantidad de poros alargados (0 en tableros lisos)
  rugosidad: number; // 0 brillante – 1 mate
  relieve: number; // intensidad del bump
};

// Colores calibrados con fotos de proyectos de Legado (cocinas LM-01 y T-01,
// exhibidor y cava LM-05, repisas LM-03) y las fichas de los fabricantes.
export const acabados: Acabado[] = [
  { nombre: "Grafito", tipo: "Melamina", base: "#45464a", veta: "#36373a", contraste: 0.035, fibra: 1, ondulacion: 0, poros: 0, rugosidad: 0.66, relieve: 0.12 },
  { nombre: "Peral", tipo: "Melamina", base: "#c48a55", veta: "#8a5329", contraste: 0.45, fibra: 0.5, ondulacion: 6, poros: 900, rugosidad: 0.5, relieve: 0.6 },
  { nombre: "Seda Notte", tipo: "Melamina", base: "#55524e", veta: "#3d3a37", contraste: 0.14, fibra: 0.9, ondulacion: 1, poros: 0, rugosidad: 0.56, relieve: 0.3 },
  { nombre: "Belize Teak", tipo: "Laminado de alta presión", base: "#6b4029", veta: "#3a1f12", contraste: 0.55, fibra: 0.5, ondulacion: 4, poros: 1400, rugosidad: 0.45, relieve: 0.7 },
];

export const blanco: Acabado = { nombre: "Blanco", tipo: "Melamina", base: "#f1eee8", veta: "#e2ddd4", contraste: 0.05, fibra: 1, ondulacion: 0, poros: 0, rugosidad: 0.58, relieve: 0.15 };

// Madera del isotipo del logo
export const maderaLogo: Acabado = { nombre: "Logo", tipo: "", base: "#a8693c", veta: "#5e3418", contraste: 0.6, fibra: 0.55, ondulacion: 5, poros: 700, rugosidad: 0.5, relieve: 0.6 };

function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Ruido 1D periódico (se repite exacto cada `n` celdas) con interpolación suave. */
function ruidoPeriodico(n: number, rand: () => number) {
  const v = Array.from({ length: n }, () => rand() * 2 - 1);
  return (t: number) => {
    const x = (((t % 1) + 1) % 1) * n;
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return v[i % n] * (1 - u) + v[(i + 1) % n] * u;
  };
}

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));

export type Lienzos = { color: HTMLCanvasElement; relieve: HTMLCanvasElement };

const cache = new Map<string, Lienzos>();

export function lienzosAcabado(a: Acabado, seed = 7): Lienzos {
  const key = `${a.nombre}-${seed}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const rand = rng(seed * 7919 + 13);
  // Perfil de fibras a lo ancho: bandas anchas + fibras cada vez más finas
  const octavas = [
    { n: 3, a: 1 - a.fibra },
    { n: 9, a: (1 - a.fibra) * 0.6 },
    { n: 31, a: a.fibra * 0.5 },
    { n: 97, a: a.fibra * 0.8 },
    { n: 211, a: a.fibra * 0.6 },
  ].map((o) => ({ ...o, f: ruidoPeriodico(o.n, rand) }));
  const norm = octavas.reduce((s, o) => s + o.a, 0) || 1;
  const perfil = new Float32Array(PX_W);
  for (let x = 0; x < PX_W; x++) {
    let v = 0;
    for (const o of octavas) v += o.f(x / PX_W) * o.a;
    perfil[x] = v / norm;
  }
  // Variación lenta a lo largo de la fibra
  const largo = ruidoPeriodico(5, rand);
  const fase1 = rand() * Math.PI * 2;
  const fase2 = rand() * Math.PI * 2;

  const [br, bg, bb] = hex(a.base);
  const [vr, vg, vb] = hex(a.veta);
  const color = new ImageData(PX_W, PX_H);
  const alto = new Float32Array(PX_W * PX_H);

  for (let y = 0; y < PX_H; y++) {
    const ty = y / PX_H;
    const lento = largo(ty) * 0.25;
    for (let x = 0; x < PX_W; x++) {
      const tx = x / PX_W;
      // Ondulación con frecuencias enteras para que la textura siga siendo repetible
      const w =
        a.ondulacion *
        (Math.sin(2 * Math.PI * (2 * ty + tx) + fase1) * 0.65 + Math.sin(2 * Math.PI * (5 * ty - 2 * tx) + fase2) * 0.35);
      const xs = (((x + w) % PX_W) + PX_W) % PX_W;
      const i0 = Math.floor(xs);
      const fr = xs - i0;
      let v = perfil[i0] * (1 - fr) + perfil[(i0 + 1) % PX_W] * fr;
      v = v + lento * (1 - a.fibra) + (rand() - 0.5) * 0.12;

      const k = y * PX_W + x;
      alto[k] = v;
      const t = Math.max(0, -v) * a.contraste * 1.6;
      const l = Math.max(0, v) * a.contraste * 0.35;
      const j = k * 4;
      color.data[j] = br + (vr - br) * t + (255 - br) * l * 0.4;
      color.data[j + 1] = bg + (vg - bg) * t + (255 - bg) * l * 0.4;
      color.data[j + 2] = bb + (vb - bb) * t + (255 - bb) * l * 0.4;
      color.data[j + 3] = 255;
    }
  }

  // Poros: trazos cortos y oscuros en el sentido de la fibra
  for (let p = 0; p < a.poros; p++) {
    const x = Math.floor(rand() * PX_W);
    const y0 = Math.floor(rand() * PX_H);
    const len = 4 + Math.floor(rand() * 22);
    const d = 0.25 + rand() * 0.35;
    for (let s = 0; s < len; s++) {
      const k = ((y0 + s) % PX_H) * PX_W + x;
      const j = k * 4;
      color.data[j] = color.data[j] * (1 - d) + vr * d;
      color.data[j + 1] = color.data[j + 1] * (1 - d) + vg * d;
      color.data[j + 2] = color.data[j + 2] * (1 - d) + vb * d;
      alto[k] -= 0.8;
    }
  }

  const relieveData = new ImageData(PX_W, PX_H);
  for (let k = 0; k < alto.length; k++) {
    const g = Math.max(0, Math.min(255, 128 + alto[k] * 90));
    relieveData.data[k * 4] = relieveData.data[k * 4 + 1] = relieveData.data[k * 4 + 2] = g;
    relieveData.data[k * 4 + 3] = 255;
  }

  const lienzo = (img: ImageData) => {
    const c = document.createElement("canvas");
    c.width = PX_W;
    c.height = PX_H;
    c.getContext("2d")!.putImageData(img, 0, 0);
    return c;
  };
  const out = { color: lienzo(color), relieve: lienzo(relieveData) };
  cache.set(key, out);
  return out;
}

export type Mapas = { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture };

/** Texturas de three.js para un acabado, repitiéndose cada TILE_W × TILE_H metros. */
export function mapasAcabado(a: Acabado, seed = 7, anisotropia = 8): Mapas {
  const { color, relieve } = lienzosAcabado(a, seed);
  const tex = (c: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(c);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1 / TILE_W, 1 / TILE_H);
    t.anisotropy = anisotropia;
    return t;
  };
  return { map: tex(color, true), bumpMap: tex(relieve, false) };
}

/**
 * Convierte las UV de una BoxGeometry a metros reales (u = ancho de la cara, v = alto),
 * con un desfase para que dos piezas iguales no muestren exactamente la misma veta.
 */
export function uvEnMetros(geo: THREE.BoxGeometry, [w, h, d]: [number, number, number], desfase = 0) {
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  // Orden de caras de BoxGeometry: +x, -x, +y, -y, +z, -z (4 vértices cada una)
  const caras: [number, number][] = [
    [d, h],
    [d, h],
    [w, d],
    [w, d],
    [w, h],
    [w, h],
  ];
  for (let f = 0; f < 6; f++) {
    for (let i = f * 4; i < f * 4 + 4; i++) {
      uv.setXY(i, uv.getX(i) * caras[f][0] + desfase, uv.getY(i) * caras[f][1] + desfase * 0.37);
    }
  }
  uv.needsUpdate = true;
  return geo;
}
