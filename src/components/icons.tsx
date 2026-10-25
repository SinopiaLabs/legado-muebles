import {
  Armchair,
  Bath,
  ChefHat,
  Drill,
  Hammer,
  Handshake,
  Layers,
  MapPin,
  MessageCircleHeart,
  Ruler,
  Shirt,
  Store,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconoNombre } from "@/lib/data";

/*
 * Todos los iconos usan `currentColor`: su color se cambia con la clase de texto
 * (p. ej. `text-icon`, `text-paper`) o globalmente con la variable --color-icon
 * en globals.css.
 */

const mapa: Record<IconoNombre, React.ComponentType<LucideProps>> = {
  cocina: ChefHat,
  closet: Shirt,
  bano: Bath,
  living: Armchair,
  comercial: Store,
  medida: Ruler,
  equipo: Users,
  materiales: Layers,
  cercania: Handshake,
  medir: Ruler,
  taller: Hammer,
  instalar: Drill,
  ubicacion: MapPin,
};

export function Icono({ nombre, ...props }: { nombre: IconoNombre } & LucideProps) {
  const C = mapa[nombre];
  return <C aria-hidden strokeWidth={1.5} {...props} />;
}

export { MessageCircleHeart };

type SvgProps = { className?: string; size?: number };

export function WhatsAppIcon({ className, size = 24 }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.22-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5a9.46 9.46 0 0 1 9.5 9.51c0 5.24-4.27 9.5-9.51 9.5m8.09-17.59A11.36 11.36 0 0 0 12.04.5C5.74.5.61 5.62.6 11.92c0 2.01.53 3.98 1.53 5.71L.5 23.5l6.01-1.58a11.4 11.4 0 0 0 5.53 1.41h.01c6.3 0 11.43-5.13 11.43-11.43 0-3.05-1.19-5.92-3.34-8.08" />
    </svg>
  );
}

export function InstagramIcon({ className, size = 24 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
