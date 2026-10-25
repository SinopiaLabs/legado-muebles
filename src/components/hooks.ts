"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

/**
 * Progreso de scroll (0–1) de una sección, guardado en un ref para que la escena 3D
 * lo lea en cada frame sin provocar renders de React.
 * - "pin": 0 cuando la sección toca el borde superior, 1 cuando termina su recorrido fijo.
 * - "exit": 0 con la sección arriba, 1 cuando ya salió de la pantalla.
 */
export function useScrollProgress(
  target: RefObject<HTMLElement | null>,
  mode: "pin" | "exit",
  onChange?: (p: number) => void,
) {
  const progress = useRef(0);
  const cb = useRef(onChange);
  useEffect(() => {
    cb.current = onChange;
  });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = target.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = mode === "pin" ? r.height - vh : r.height;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      progress.current = p;
      cb.current?.(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target, mode]);

  return progress;
}

export function useInView(target: RefObject<Element | null>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [target, rootMargin]);
  return inView;
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reducedQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

let webglCache: boolean | null = null;
/**
 * WebGL con aceleración por hardware. Si el navegador dibuja por software
 * (SwiftShader, llvmpipe: equipos sin GPU, máquinas virtuales, herramientas de
 * auditoría) el 3D se vuelve lento y se usan las versiones livianas en CSS.
 * `?3d=webgl` fuerza WebGL para pruebas.
 */
function hasWebGL() {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
      if (!gl) webglCache = false;
      else if (new URLSearchParams(location.search).get("3d") === "webgl") webglCache = true;
      else {
        const info = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
        webglCache = !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
      }
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

/** null mientras no se sabe (SSR), luego true/false. */
export function useWebGL() {
  return useSyncExternalStore(
    () => () => {},
    () => hasWebGL(),
    () => null,
  );
}

/** Pasa a true la primera vez que el elemento se acerca a la pantalla y se queda así. */
export function useNearOnce(target: RefObject<Element | null>, rootMargin = "100% 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, rootMargin, near]);
  return near;
}

/** true cuando el navegador queda libre después de la carga (para trabajo no urgente). */
export function useIdle(timeout = 1500) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(() => setIdle(true), { timeout });
    return () => cic(id);
  }, [timeout]);
  return idle;
}
