"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-10">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Legado Muebles, ir al inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/mark.png" alt="" width={34} height={34} className="h-8 w-8 md:h-9 md:w-9" />
          <span className="leading-none">
            <span className="block font-serif text-xl tracking-[0.22em] text-ink">LEGADO</span>
            <span className="mt-0.5 block text-[0.6rem] tracking-[0.55em] text-wood">MUEBLES</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary !px-5 !py-2.5 text-sm">
            Cotizar
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-6 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-6 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="menu-movil" className="border-t border-line px-4 pb-6 pt-2 md:hidden" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 font-serif text-2xl text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
