# Legado Muebles — sitio web

Sitio de presentación de Legado Muebles (Curicó): muebles a medida, diseño, fabricación e instalación.

- **Stack:** Next.js 16 (exportación estática), Tailwind 4, three.js con React Three Fiber.
- **3D:** el isotipo del logo (portada) y un clóset que se arma con el scroll, en el que el visitante puede elegir el acabado (`src/components/three/`).
  Los modelos se generan por código, no hay archivos `.glb`. Sin WebGL, el clóset se dibuja en 3D con CSS (`CssCabinet.tsx`).
- **Contenido:** textos, servicios, proyectos y preguntas frecuentes en `src/lib/data.ts`. Imágenes (con versión de 800 px para celular) y videos en `public/`.
- **Contacto:** solo WhatsApp. Cada servicio abre WhatsApp con un mensaje listo.
- **Iconos:** [Lucide](https://lucide.dev) más WhatsApp e Instagram en `src/components/icons.tsx`. Todos usan `currentColor`: el color general se cambia en `--color-icon` (`src/app/globals.css`) o por icono con una clase de texto.
- **Accesibilidad:** el estudio de contraste y la auditoría están en [`docs/accesibilidad.md`](docs/accesibilidad.md).

## Desarrollo

```bash
npm install
npm run dev
```

## Publicar

```bash
npm run build
```

Genera `out/`, una carpeta estática que se puede subir a cualquier hosting (Nginx, Cloudflare Pages, Netlify, S3…).
