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
function hasWebGL() {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
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
