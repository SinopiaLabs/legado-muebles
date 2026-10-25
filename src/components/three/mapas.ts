import * as THREE from "three";
import { TILE_H, TILE_W, lienzosAcabado, type Acabado } from "./textures";

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
