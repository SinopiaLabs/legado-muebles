export const contacto = {
  whatsapp: "+56 9 8244 3114",
  whatsappUrl: "https://wa.me/56982443114",
  instagram: "@legadomuebles.cl",
  instagramUrl: "https://www.instagram.com/legadomuebles.cl/",
  cobertura: "Curicó y alrededores",
};

export function whatsappLink(mensaje = "Hola Legado Muebles, me gustaría cotizar un mueble a medida.") {
  return `${contacto.whatsappUrl}?text=${encodeURIComponent(mensaje)}`;
}

export function mensajeCotizar(que: string) {
  return `Hola Legado Muebles, me gustaría cotizar: ${que}. Les comparto fotos y medidas aproximadas del espacio.`;
}

export type IconoNombre =
  | "cocina"
  | "closet"
  | "bano"
  | "living"
  | "comercial"
  | "medida"
  | "equipo"
  | "materiales"
  | "cercania"
  | "medir"
  | "taller"
  | "instalar"
  | "ubicacion";

// Por qué elegirnos: lo que más pesa al decidir a quién encargar un mueble
export const beneficios: { icono: IconoNombre; titulo: string; texto: string }[] = [
  { icono: "equipo", titulo: "Un solo equipo", texto: "Diseño, fabricación e instalación sin intermediarios." },
  { icono: "medida", titulo: "Hecho a tu medida", texto: "Cada centímetro de tu espacio, aprovechado." },
  { icono: "materiales", titulo: "Tú eliges los materiales", texto: "Según uso, estética y presupuesto." },
  { icono: "cercania", titulo: "Atención cercana", texto: "Hablas directo con quien diseña y fabrica." },
];

export const servicios: { icono: IconoNombre; titulo: string; texto: string }[] = [
  { icono: "cocina", titulo: "Cocinas", texto: "Cocinas a medida: muebles base, aéreos, islas y torres." },
  { icono: "closet", titulo: "Clósets y vestidores", texto: "Clósets, walking closets y puertas correderas a medida." },
  { icono: "bano", titulo: "Baños", texto: "Vanitorios y muebles de baño resistentes a la humedad." },
  { icono: "living", titulo: "Living y oficina", texto: "Repisas, bibliotecas y escritorios a medida." },
  { icono: "comercial", titulo: "Negocios", texto: "Cavas, exhibidores y mesones para locales comerciales." },
  { icono: "taller", titulo: "Proyectos especiales", texto: "Camas altas, reparaciones y lo que tu espacio pida." },
];

export type Proyecto = {
  titulo: string;
  lugar: string;
  frase: string;
  detalles: string[];
  img: string;
  alt: string;
  previo?: boolean;
};

// Selección corta: los proyectos con mejor foto y resultado más claro
export const proyectos: Proyecto[] = [
  {
    titulo: "Cocina con isla",
    lugar: "Zapallar, Curicó",
    frase: "Una isla central que suma superficie de trabajo y deja todo a mano.",
    detalles: ["Melamina Seda Notte", "Cubierta Duskberg Marble", "4,9 × 3,6 m"],
    img: "lm01-cocina-isla",
    alt: "Cocina en L con isla central en tono gris oscuro y cubierta clara",
  },
  {
    titulo: "Walking closet",
    lugar: "Zapallar, Curicó",
    frase: "Colgado, cajoneras, zapatero y un tocador con luz propia.",
    detalles: ["Melamina blanca", "Tocador iluminado", "3 × 2 m"],
    img: "lm02-walking-closet",
    alt: "Walking closet blanco con repisas, cajoneras y tocador con espejo",
  },
  {
    titulo: "Repisas entre pilares",
    lugar: "Zapallar, Curicó",
    frase: "Separan ambientes sin levantar un muro y sin soportes a la vista.",
    detalles: ["Laminado Belize Teak", "Fijaciones ocultas"],
    img: "lm03-repisas",
    alt: "Repisas oscuras suspendidas entre pilares blancos en un living",
  },
  {
    titulo: "Cocina grafito con LED",
    lugar: "Curicó",
    frase: "Luz bajo los muebles altos que realza el contraste grafito y blanco.",
    detalles: ["Cubierta Staron", "Iluminación LED"],
    img: "t01-cocina-grafito",
    alt: "Cocina lineal grafito con cubierta blanca e iluminación LED bajo los muebles altos",
    previo: true,
  },
];

export const preguntas = [
  {
    p: "¿Cómo cotizo?",
    r: "Escríbenos por WhatsApp con una foto del espacio y medidas aproximadas. Con eso conversamos la idea y coordinamos una visita de medición para afinar la propuesta.",
  },
  {
    p: "¿En qué zonas trabajan?",
    r: "En Curicó y sus alrededores. Si estás más lejos, escríbenos igual y vemos cómo hacerlo.",
  },
  {
    p: "¿Puedo elegir los materiales?",
    r: "Sí. Trabajamos con melaminas, laminados de alta presión, cubiertas de cuarzo, postformadas o Staron, y herrajes metálicos. Te recomendamos según el uso, la estética y tu presupuesto.",
  },
  {
    p: "¿Ustedes mismos instalan?",
    r: "Sí. El mismo equipo diseña, fabrica e instala, y al terminar revisamos contigo los detalles finales.",
  },
  {
    p: "¿Reparan muebles que ya tengo?",
    r: "Depende de su estado. Cuando conviene, recuperar lo que ya existe es una buena alternativa; si no, te proponemos una solución nueva.",
  },
  {
    p: "¿Hacen muebles para negocios?",
    r: "Sí: cavas iluminadas, exhibidores, muebles para pan o frutas y mesones de atención, pensados para el día a día del local.",
  },
];

export const reels = [
  { src: "/video/walking-closet.mp4", poster: "/img/poster-walking-closet.webp", titulo: "Walking closet" },
  { src: "/video/cocina.mp4", poster: "/img/poster-cocina.webp", titulo: "Cocina a medida" },
  { src: "/video/closet.mp4", poster: "/img/poster-closet.webp", titulo: "Clóset de correderas" },
  { src: "/video/altar.mp4", poster: "/img/poster-altar.webp", titulo: "Mueble para un espacio de fe" },
];
