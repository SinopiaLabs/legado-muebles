import { contacto, preguntas, servicios } from "./data";

export const SITE_URL = "https://legadomuebles.cl";
export const NOMBRE = "Legado Muebles";

export const TITULO = "Muebles a medida en Curicó | Legado Muebles";
export const DESCRIPCION =
  "Cocinas, clósets, vestidores y muebles a medida en Curicó y alrededores. Diseñamos, fabricamos e instalamos con un mismo equipo. Cotiza por WhatsApp.";

const telefono = contacto.whatsapp.replace(/\s/g, "");

/** Datos estructurados (schema.org) para Google: negocio local, sitio y preguntas frecuentes. */
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE_URL}/#negocio`,
      name: NOMBRE,
      legalName: "Legado Muebles SpA",
      description: DESCRIPCION,
      url: SITE_URL,
      telephone: telefono,
      image: `${SITE_URL}/opengraph-image.jpg`,
      logo: `${SITE_URL}/img/mark.png`,
      slogan: "Diseño · Fabricación · Instalación de muebles a medida",
      address: { "@type": "PostalAddress", addressLocality: "Curicó", addressRegion: "Región del Maule", addressCountry: "CL" },
      // Negocio de área de servicio: atiende en terreno, sin local abierto al público
      areaServed: [
        { "@type": "City", name: "Curicó" },
        { "@type": "City", name: "Sagrada Familia" },
        { "@type": "AdministrativeArea", name: "Provincia de Curicó" },
      ],
      contactPoint: { "@type": "ContactPoint", telephone: telefono, contactType: "customer service", availableLanguage: "es" },
      sameAs: [contacto.instagramUrl],
      knowsAbout: ["Muebles a medida", "Cocinas a medida", "Clósets a medida", "Vanitorios", "Mobiliario comercial", "Melamina", "Laminados de alta presión"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Muebles a medida",
        itemListElement: servicios.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.titulo, description: s.texto, areaServed: "Curicó" },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#sitio`,
      url: SITE_URL,
      name: NOMBRE,
      inLanguage: "es-CL",
      publisher: { "@id": `${SITE_URL}/#negocio` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#preguntas`,
      mainEntity: preguntas.map((q) => ({
        "@type": "Question",
        name: q.p,
        acceptedAnswer: { "@type": "Answer", text: q.r },
      })),
    },
  ],
};
