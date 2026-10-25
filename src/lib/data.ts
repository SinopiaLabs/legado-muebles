export const contacto = {
  whatsapp: "+56 9 8244 3114",
  whatsappUrl: "https://wa.me/56982443114",
  instagram: "@legadomuebles.cl",
  instagramUrl: "https://www.instagram.com/legadomuebles.cl/",
  correo: "legadomueblesspa@gmail.com",
  cobertura: "Curicó y alrededores",
};

export function whatsappLink(mensaje: string) {
  return `${contacto.whatsappUrl}?text=${encodeURIComponent(mensaje)}`;
}

export const servicios = [
  {
    titulo: "Cocinas",
    texto: "Muebles base, aéreos, islas y torres para hornos, con cubiertas de cuarzo, Staron o postformadas.",
  },
  {
    titulo: "Clósets y vestidores",
    texto: "Walking closets, clósets con puertas correderas y soluciones de almacenamiento pensadas para cada prenda.",
  },
  {
    titulo: "Baños y vanitorios",
    texto: "Vanitorios con cajoneras y cubiertas resistentes a la humedad, a la medida exacta del recinto.",
  },
  {
    titulo: "Living, comedor y home office",
    texto: "Repisas, bibliotecas, escritorios y mobiliario que ordena y le da carácter a cada ambiente.",
  },
  {
    titulo: "Mobiliario comercial",
    texto: "Cavas iluminadas, exhibidores y muebles de atención que presentan los productos de forma atractiva.",
  },
  {
    titulo: "Soluciones especiales",
    texto: "Camas altas, muebles para espacios de fe y reparaciones: si el espacio lo pide, lo resolvemos.",
  },
];

export const pasos = [
  { n: "01", titulo: "Escuchamos", texto: "Conocemos las necesidades, medidas, gustos y prioridades del cliente." },
  { n: "02", titulo: "Diseñamos la solución", texto: "Definimos distribución, materiales y detalles según el espacio y su uso." },
  { n: "03", titulo: "Cotizamos", texto: "Preparamos una propuesta para revisar el alcance y las características del proyecto." },
  { n: "04", titulo: "Fabricamos", texto: "Trabajamos cuidando ajustes, encuentros y terminaciones." },
  { n: "05", titulo: "Instalamos y revisamos", texto: "Coordinamos la instalación y revisamos los detalles finales según lo acordado." },
];

export type Proyecto = {
  codigo: string;
  titulo: string;
  tipo: string;
  ubicacion: string;
  anio: string;
  material: string;
  medidas?: string;
  necesidad: string;
  solucion: string;
  materiales: string;
  herrajes: string;
  terminaciones: string;
  resultado: string;
  imagenes: { src: string; alt: string }[];
};

export const proyectos: Proyecto[] = [
  {
    codigo: "LM-01",
    titulo: "Cocina con isla",
    tipo: "Cocina",
    ubicacion: "Zapallar, Curicó",
    anio: "2026",
    material: "Melamina y postformado",
    medidas: "490 × 360 cm",
    necesidad:
      "Contar con mobiliario que permitiera organizar los utensilios y disponer de amplias superficies de trabajo, aprovechando el espacio con muebles base y una isla central funcional.",
    solucion:
      "Cocina en L con isla central, muebles base en melamina Seda Notte, cubierta postformada Duskberg Marble y mueble torre para horno y microondas.",
    materiales: "Muebles base en melamina Seda Notte con interior blanco y cubierta postformada Duskberg Marble",
    herrajes: "Tiradores metálicos modelo Madrid, bisagras metálicas y correderas telescópicas",
    terminaciones: "Tapacantos de PVC y zócalo de pino revestido en laminado de alta presión",
    resultado:
      "Muebles base e isla que combinan almacenamiento y amplias superficies de trabajo, con una distribución cómoda y una estética limpia, proporcionada al espacio.",
    imagenes: [
      { src: "/img/lm01-cocina-isla.webp", alt: "Cocina en L con isla central en tono Seda Notte" },
      { src: "/img/lm01-detalle.webp", alt: "Vistas de la cocina y repisas del proyecto Casa Zapallar" },
    ],
  },
  {
    codigo: "LM-02",
    titulo: "Walking closet",
    tipo: "Walking closet",
    ubicacion: "Zapallar, Curicó",
    anio: "2026",
    material: "Melamina blanca",
    medidas: "300 × 200 cm",
    necesidad:
      "Un espacio de almacenamiento personalizado para organizar ropa, calzado y accesorios, aprovechando la distribución del recinto y manteniendo todo a mano.",
    solucion:
      "Walking closet en melamina blanca con repisas, zonas de colgado, cajoneras, zapatero y tocador con espejo e iluminación.",
    materiales: "Estructura y frentes en melamina blanca",
    herrajes: "Cajones con correderas telescópicas y tiradores metálicos en el tocador",
    terminaciones: "Iluminación en el tocador, tapacantos de PVC y barras de colgar cromadas",
    resultado:
      "Espacios diferenciados para colgar, guardar ropa doblada y calzado, y un tocador con cajones que facilita el orden y aprovecha cada sector del recinto.",
    imagenes: [{ src: "/img/lm02-walking-closet.webp", alt: "Walking closet blanco con repisas, cajoneras y tocador iluminado" }],
  },
  {
    codigo: "LM-03",
    titulo: "Repisas entre pilares",
    tipo: "Repisas",
    ubicacion: "Zapallar, Curicó",
    anio: "2026",
    material: "MDF y laminado de alta presión",
    necesidad:
      "Separar visualmente los ambientes sin levantar un muro, manteniendo la amplitud, el paso de la luz y la conexión visual entre los espacios.",
    solucion:
      "Repisas de MDF revestidas en laminado Belize Teak, integradas entre los pilares del living como mueble divisorio y de exhibición abierto por ambos lados.",
    materiales: "MDF y laminado de alta presión",
    herrajes: "Fijaciones ocultas",
    terminaciones: "Repisas sin soportes a la vista, con efecto de madera maciza suspendida",
    resultado:
      "Repisas divisorias que delimitan los ambientes de manera sutil y aportan funcionalidad y valor decorativo, sin perder la amplitud del espacio.",
    imagenes: [
      { src: "/img/lm03-repisas.webp", alt: "Repisas oscuras suspendidas entre pilares blancos" },
      { src: "/img/lm03-repisas-2.webp", alt: "Vista lateral de las repisas entre pilares" },
      { src: "/img/equipo-medicion.webp", alt: "El equipo midiendo el espacio entre pilares" },
    ],
  },
  {
    codigo: "LM-04",
    titulo: "Cama alta con escalera de cajones",
    tipo: "Dormitorio",
    ubicacion: "Rauquén, Curicó",
    anio: "2026",
    material: "Melamina y pino",
    medidas: "250 × 105 cm",
    necesidad:
      "Optimizar un dormitorio de dimensiones reducidas con una cama elevada que libere superficie útil en la parte inferior.",
    solucion:
      "Cama alta en color blanco con escalera lateral de peldaños-cajón, que libera el espacio inferior y suma almacenamiento.",
    materiales: "Estructura de pino cepillado seco y melamina blanca de 18 mm",
    herrajes: "Cajones en peldaños con correderas telescópicas",
    terminaciones: "Tapacantos de PVC; fijaciones con tornillos soberbio y pernos",
    resultado:
      "Una cama fabricada a medida, con escalera integrada para un acceso cómodo y seguro, que aprovecha cada centímetro del dormitorio.",
    imagenes: [
      { src: "/img/lm04-cama-alta.webp", alt: "Cama alta blanca con escalera lateral" },
      { src: "/img/lm04-escalera.webp", alt: "Escalera de peldaños con cajones" },
      { src: "/img/equipo-armado.webp", alt: "Armado de la cama alta en terreno" },
    ],
  },
  {
    codigo: "LM-05",
    titulo: "Cava iluminada y mobiliario comercial",
    tipo: "Comercial",
    ubicacion: "Sagrada Familia",
    anio: "2026",
    material: "Melamina Peral",
    necesidad:
      "Organizar y exhibir distintos productos de manera atractiva y accesible, facilitando la atención y el funcionamiento diario del negocio.",
    solucion:
      "Cava vitrina con marco negro, puertas de vidrio, repisas inclinadas e iluminación LED, junto a un mueble para pan y un exhibidor de frutas y verduras.",
    materiales: "Melamina Peral, marco de aluminio negro y vidrio",
    herrajes: "Bisagras y cerradura en la cava",
    terminaciones: "Iluminación LED perimetral en la cava",
    resultado:
      "Un conjunto para distintas necesidades del local: cada pieza ordena y presenta los productos, mejorando la experiencia de compra.",
    imagenes: [
      { src: "/img/lm05-cava.webp", alt: "Cava con puertas de vidrio e iluminación LED instalada en el local" },
      { src: "/img/lm05-cava-taller.webp", alt: "Cava terminada en el taller" },
      { src: "/img/lm05-exhibidor.webp", alt: "Exhibidor de frutas y verduras en melamina Peral" },
      { src: "/img/lm05-exhibidor-2.webp", alt: "Mueble exhibidor con cajones inclinados" },
    ],
  },
  {
    codigo: "LM-06",
    titulo: "Clósets, despensa y vanitorios",
    tipo: "Clósets y baños",
    ubicacion: "Zapallar, Curicó",
    anio: "2026",
    material: "Melamina gris",
    necesidad:
      "Incorporar almacenamiento a medida en distintos espacios del hogar: ropa, despensa y un baño mejor aprovechado.",
    solucion:
      "Clósets con puertas correderas, despensa de piso a cielo con repisas regulables y vanitorios con cajonera y lavamanos de sobreponer.",
    materiales: "Estructura blanca; frentes en Titanio, Seda Notte y Grafito Hilado; cubierta Lunar Marble",
    herrajes: "Puertas correderas, tiradores modelo Madrid y correderas telescópicas",
    terminaciones: "Tapacantos de PVC",
    resultado:
      "Muebles para distintos espacios del hogar, con una estética acorde a cada uno y el orden como prioridad.",
    imagenes: [
      { src: "/img/lm06-closet.webp", alt: "Clóset con puerta corredera grafito e interior blanco" },
      { src: "/img/lm06-despensa.webp", alt: "Despensa de piso a cielo con repisas regulables" },
      { src: "/img/lm06-vanitorio.webp", alt: "Vanitorio gris con cajonera y lavamanos de sobreponer" },
    ],
  },
];

export const otrosTrabajos = [
  { src: "/img/lm07-taller.webp", alt: "Mueble poligonal en el taller", titulo: "Del taller…" },
  { src: "/img/lm07-mueble-instalado.webp", alt: "El mismo mueble instalado en su lugar", titulo: "…a su lugar" },
  { src: "/img/lm08-reparacion.webp", alt: "Reparación de un mueble existente junto a la ventana", titulo: "Reparación de mueble existente" },
  { src: "/img/lm08-reparacion-2.webp", alt: "Mueble existente reparado", titulo: "Recuperar lo que ya existe" },
];

export const trayectoria: Proyecto[] = [
  {
    codigo: "T-01",
    titulo: "Cocina grafito con iluminación LED",
    tipo: "Cocina",
    ubicacion: "Curicó",
    anio: "2026",
    material: "Melamina y Staron",
    medidas: "350 cm de largo",
    necesidad:
      "Una cocina moderna, con amplio almacenamiento y una distribución funcional que integrara los electrodomésticos, en tonos grafito con cubierta clara.",
    solucion:
      "Cocina lineal con muebles bajos y altos en tono grafito, cubierta blanca de Staron, torre para horno y microondas e iluminación LED bajo los muebles superiores.",
    materiales: "Estructura en melamina blanca, frentes grafito y cubierta de Staron Quasar White",
    herrajes: "Tiradores metálicos, bisagras de retén de 35 mm y correderas telescópicas",
    terminaciones: "Tira LED bajo muebles altos y tapacantos de PVC",
    resultado: "La iluminación integrada mejora la zona de trabajo y realza el contraste entre el grafito y la cubierta clara.",
    imagenes: [
      { src: "/img/t01-cocina-grafito.webp", alt: "Cocina lineal grafito con cubierta blanca e iluminación LED" },
      { src: "/img/t01-detalle.webp", alt: "Detalle del lavaplatos y cubierta de Staron" },
      { src: "/img/t01-detalle-2.webp", alt: "Vista completa de la cocina grafito" },
    ],
  },
  {
    codigo: "T-02",
    titulo: "Cocina en L en tono Venezia",
    tipo: "Cocina",
    ubicacion: "Curicó",
    anio: "2022",
    material: "Melamina y postformado",
    necesidad: "Renovar y aprovechar mejor la cocina con almacenamiento y una distribución funcional.",
    solucion:
      "Cocina en L con muebles aéreos y base en melamina Venezia, cubierta Dove Grey, torre para horno y espacios integrados para refrigerador y lavavajillas.",
    materiales: "Estructura blanca, frentes Venezia y cubierta postformada Dove Grey",
    herrajes: "Tiradores modelo Forza, bisagras de retén de 35 mm y correderas telescópicas",
    terminaciones: "Cantos de PVC y esquinero con bisagras de 165° y 135°",
    resultado: "Cocina uniforme y práctica, con cajoneras y un módulo lateral para electrodomésticos.",
    imagenes: [{ src: "/img/t02-cocina-venezia.webp", alt: "Cocina en L con frentes claros y muebles aéreos" }],
  },
  {
    codigo: "T-03",
    titulo: "Biblioteca escolar",
    tipo: "Biblioteca escolar",
    ubicacion: "Sagrada Familia",
    anio: "2020",
    material: "Terciado y laminado",
    necesidad: "Equipar una biblioteca completa: almacenamiento para libros, punto de atención y un espacio de lectura atractivo.",
    solucion: "Estanterías de madera con laterales de color, mesón de atención y muebles bajos con puertas y cubierta.",
    materiales: "Terciado de pino y laminado de color de alta presión",
    herrajes: "Tiradores y bisagras metálicas, cerraduras cuadradas",
    terminaciones: "Terciado tratado con laca y sellador a la piroxilina",
    resultado: "Renovación integral de la biblioteca: un espacio más moderno, ordenado y luminoso.",
    imagenes: [
      { src: "/img/t03-biblioteca.webp", alt: "Mesón de atención de biblioteca en terciado y laminado turquesa" },
      { src: "/img/t03-biblioteca-2.webp", alt: "Collage de muebles de la biblioteca escolar" },
    ],
  },
];

export const reels = [
  { src: "/video/walking-closet.mp4", poster: "/img/poster-walking-closet.webp", titulo: "Walking closet", texto: "Colgado, repisas, cajonera y tocador con luz propia." },
  { src: "/video/cocina.mp4", poster: "/img/poster-cocina.webp", titulo: "Cocina a medida", texto: "El detalle está en cada terminación." },
  { src: "/video/closet.mp4", poster: "/img/poster-closet.webp", titulo: "Clóset de puertas correderas", texto: "Tono grafito por fuera, orden por dentro." },
  { src: "/video/altar.mp4", poster: "/img/poster-altar.webp", titulo: "Mueble para un espacio de fe", texto: "Integrado con respeto y sobriedad al entorno." },
];
