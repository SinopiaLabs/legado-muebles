/* eslint-disable @next/next/no-img-element -- sitio estático: las variantes ya están optimizadas en public/img */

/** Imagen con dos tamaños (800 px para celular, original para pantallas grandes). */
export default function Foto({
  nombre,
  alt,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
  eager = false,
}: {
  nombre: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={`/img/${nombre}.webp`}
      srcSet={`/img/${nombre}-800.webp 800w, /img/${nombre}.webp 1400w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
