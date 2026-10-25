import * as THREE from "three";

// Pseudo-random determinista: la veta sale igual en cada render.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/** Textura de veta de madera dibujada en canvas (sin archivos externos). */
export function woodTexture(base: string, grain: string, seed = 7, contrast = 0.22) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = rng(seed);

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // Vetas: líneas verticales onduladas de grosor y opacidad variable
  for (let i = 0; i < 140; i++) {
    const x0 = rand() * size;
    const amp = 2 + rand() * 9;
    const freq = 0.004 + rand() * 0.01;
    const phase = rand() * Math.PI * 2;
    ctx.strokeStyle = grain;
    ctx.globalAlpha = contrast * (0.25 + rand() * 0.75);
    ctx.lineWidth = 0.6 + rand() * 2.4;
    ctx.beginPath();
    for (let y = 0; y <= size; y += 8) {
      const x = x0 + Math.sin(y * freq + phase) * amp;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Ruido fino para que no se vea plano
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = rand() > 0.5 ? "#000" : "#fff";
    ctx.fillRect(rand() * size, rand() * size, 1, 1 + rand() * 3);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

export type Acabado = { nombre: string; tipo: string; base: string; veta: string; contraste: number };

// Acabados que la empresa usa en sus proyectos (portafolio)
export const acabados: Acabado[] = [
  { nombre: "Grafito", tipo: "Melamina", base: "#3d3f42", veta: "#1f2022", contraste: 0.12 },
  { nombre: "Peral", tipo: "Melamina", base: "#c48a55", veta: "#7c4a22", contraste: 0.3 },
  { nombre: "Seda Notte", tipo: "Melamina", base: "#5b554d", veta: "#2c2823", contraste: 0.18 },
  { nombre: "Belize Teak", tipo: "Laminado de alta presión", base: "#8e5c36", veta: "#4a2c16", contraste: 0.34 },
];
