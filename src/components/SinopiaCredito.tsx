// Crédito "Desarrollado por Sinopia Labs" para el footer de los sitios que hacemos.
// Versión React / Next.js: sin hooks ni "use client", así que se renderiza en el
// servidor y el enlace queda en el HTML (lo ven Google y quien navega sin JS).
// No depende de Tailwind: trae sus propios estilos con el prefijo .sl-credito.
//
// Uso:
//   <SinopiaCredito cliente="vientosdelsur" lang="es" />
//
// Hereda el color y la fuente del footer, así que sirve en fondos claros y oscuros.

const SITIO = "https://sinopialabs.cl/";

const TEXTOS = {
  es: { antes: "Desarrollado por", titulo: "Sitio desarrollado por Sinopia Labs (abre en una pestaña nueva)" },
  en: { antes: "Built by", titulo: "Website built by Sinopia Labs (opens in a new tab)" },
} as const;

const CSS = `
.sl-credito{display:inline-flex;align-items:center;gap:.4em;padding:.25em 0;border-radius:4px;color:inherit;text-decoration:none;font-size:.8125rem;line-height:1.2;opacity:.72;transition:opacity .2s ease}
.sl-credito:hover,.sl-credito:focus-visible{opacity:1}
.sl-credito:focus-visible{outline:2px solid currentColor;outline-offset:3px}
.sl-credito__marca{font-weight:600;text-underline-offset:3px}
.sl-credito:hover .sl-credito__marca{text-decoration:underline}
.sl-credito svg{width:1.2em;height:1.2em;flex:none;overflow:visible}
.sl-credito rect{transform-box:fill-box;transition:transform .35s cubic-bezier(.3,.7,.2,1)}
.sl-credito:hover .sl-c1,.sl-credito:focus-visible .sl-c1{transform:translateX(-31%)}
.sl-credito:hover .sl-c3,.sl-credito:focus-visible .sl-c3{transform:translateX(31%)}
@media (prefers-reduced-motion:reduce){.sl-credito,.sl-credito rect{transition:none}}
`;

type Props = {
  /** Slug del cliente; va como utm_source para medir las visitas que llegan desde su sitio. */
  cliente: string;
  lang?: keyof typeof TEXTOS;
  className?: string;
};

export function SinopiaCredito({ cliente, lang = "es", className }: Props) {
  const t = TEXTOS[lang] ?? TEXTOS.es;
  const url = `${SITIO}?utm_source=${encodeURIComponent(cliente)}&utm_medium=referral&utm_campaign=credito-footer`;

  return (
    <>
      {/* React 19 deduplica y sube este <style> al <head> gracias a href + precedence. */}
      <style href="sinopia-credito" precedence="default">
        {CSS}
      </style>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        title={t.titulo}
        className={className ? `sl-credito ${className}` : "sl-credito"}
      >
        <span>{t.antes}</span>
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <rect className="sl-c1" x="20" y="9" width="35" height="12" rx="6" fill="#E3997A" />
          <rect className="sl-c2" x="9" y="26" width="46" height="12" rx="6" fill="#CB5A33" />
          <rect className="sl-c3" x="9" y="43" width="35" height="12" rx="6" fill="#A33A1A" />
        </svg>
        <span className="sl-credito__marca">Sinopia Labs</span>
      </a>
    </>
  );
}

export default SinopiaCredito;
