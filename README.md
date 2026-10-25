# Legado Muebles — sitio web

Sitio de presentación de Legado Muebles (Curicó): muebles a medida, diseño, fabricación e instalación.

- **Stack:** Next.js 16 (exportación estática), Tailwind 4, three.js con React Three Fiber.
- **3D:** el isotipo del logo (portada) y un clóset que se arma con el scroll (`src/components/three/`).
  Los modelos se generan por código, no hay archivos `.glb`. Sin WebGL se muestran fotos en su lugar.
- **Contenido:** textos y fichas de proyectos en `src/lib/data.ts`; imágenes y videos optimizados en `public/`.
- **Contacto:** el formulario no tiene backend; arma el mensaje y abre WhatsApp.

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
