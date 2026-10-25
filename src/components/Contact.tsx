"use client";

import { useState, type FormEvent } from "react";
import { contacto, whatsappLink } from "@/lib/data";
import Reveal from "./Reveal";

const tipos = ["Cocina", "Clóset o vestidor", "Baño o vanitorio", "Living, comedor u oficina", "Mobiliario comercial", "Reparación", "Otro"];

export default function Contact() {
  const [enviado, setEnviado] = useState(false);

  // Sin backend: arma el mensaje y abre WhatsApp con el texto listo
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lineas = [
      `Hola Legado Muebles, soy ${f.get("nombre")}.`,
      `Me interesa: ${f.get("tipo")}.`,
      f.get("comuna") ? `Comuna: ${f.get("comuna")}.` : "",
      f.get("mensaje") ? `${f.get("mensaje")}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lineas.join("\n")), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <section id="contacto" className="bg-sand/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] lg:px-10">
        <Reveal>
          <p className="eyebrow">05 · Hablemos de tu proyecto</p>
          <h2 className="section-title mt-4">¿Tienes una idea o necesitas aprovechar mejor un espacio?</h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            Podemos ayudarte a desarrollar una solución a medida, pensada para tu hogar o proyecto. Conversemos y
            cuéntanos qué tienes en mente.
          </p>
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="eyebrow">WhatsApp</dt>
              <dd className="mt-1">
                <a href={contacto.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-serif text-2xl text-ink hover:text-wood">
                  {contacto.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Instagram</dt>
              <dd className="mt-1">
                <a href={contacto.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-serif text-2xl text-ink hover:text-wood">
                  {contacto.instagram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Correo</dt>
              <dd className="mt-1">
                <a href={`mailto:${contacto.correo}`} className="break-all font-serif text-2xl text-ink hover:text-wood">
                  {contacto.correo}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Cobertura</dt>
              <dd className="mt-1 text-ink">
                {contacto.cobertura}
                <span className="block text-sm text-ink-soft">Visita de medición y cotización a coordinar.</span>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="border border-line bg-paper p-6 sm:p-10">
            <h3 className="font-serif text-3xl text-ink">Solicita tu cotización</h3>
            <p className="mt-2 text-sm text-ink-soft">Al enviar se abrirá WhatsApp con tu mensaje listo.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="field">
                <span>Nombre</span>
                <input name="nombre" required autoComplete="name" />
              </label>
              <label className="field">
                <span>Comuna</span>
                <input name="comuna" autoComplete="address-level2" placeholder="Curicó" />
              </label>
              <label className="field sm:col-span-2">
                <span>¿Qué necesitas?</span>
                <select name="tipo" required defaultValue="">
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {tipos.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="field sm:col-span-2">
                <span>Cuéntanos tu idea</span>
                <textarea name="mensaje" rows={4} placeholder="Medidas aproximadas, materiales que te gustan, plazos…" />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-8 w-full justify-center">
              Enviar por WhatsApp
            </button>
            <p className="mt-3 min-h-5 text-center text-sm text-ink-soft" role="status">
              {enviado ? "¡Gracias! Si WhatsApp no se abrió, escríbenos directamente al número de la izquierda." : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
