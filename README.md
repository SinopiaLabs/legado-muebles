# Legado Muebles — sitio web

Sitio de presentación de Legado Muebles (Curicó): muebles a medida, diseño, fabricación e instalación.

- **Stack:** Next.js 16 (exportación estática), Tailwind 4, three.js con React Three Fiber.
- **Tipografías:** Cormorant Garamond y Jost incluidas en `src/fonts` (Fontsource, licencia OFL), así que el build no descarga nada.
- **3D:** el isotipo del logo (portada) y un clóset que se arma con el scroll, en el que el visitante puede elegir el acabado (`src/components/three/`).
  Los modelos se generan por código, no hay archivos `.glb`. Sin WebGL, el clóset se dibuja en 3D con CSS (`CssCabinet.tsx`).
- **Contenido:** textos, servicios, proyectos y preguntas frecuentes en `src/lib/data.ts`. Imágenes (con versión de 800 px para celular) y videos en `public/`.
- **Contacto:** solo WhatsApp. Cada servicio abre WhatsApp con un mensaje listo.
- **Iconos:** [Lucide](https://lucide.dev) más WhatsApp e Instagram en `src/components/icons.tsx`. Todos usan `currentColor`: el color general se cambia en `--color-icon` (`src/app/globals.css`) o por icono con una clase de texto.
- **Accesibilidad:** el estudio de contraste y la auditoría están en [`docs/accesibilidad.md`](docs/accesibilidad.md).
- **SEO:** metadatos, datos estructurados, rendimiento y pasos para el lanzamiento en [`docs/seo.md`](docs/seo.md).

## Desarrollo

```bash
npm install
npm run dev
```

## Despliegue automático

Cada push a `main` dispara `.github/workflows/deploy.yml`:

1. Lint, typecheck y build (también corre en los PR, sin publicar).
2. Construye la imagen (`Dockerfile`: Next.js estático servido por nginx) y la sube a Docker Hub como `arturoalvarez/legado-muebles:latest`.
3. En la VM Docker (192.168.0.53), Watchtower detecta la imagen nueva en menos de 5 minutos y reinicia el contenedor.

El stack del servidor está en `/opt/stacks/legado-muebles/compose.yaml` (copia en `deploy/compose.yaml`) y publica el puerto **8096**. El dominio se conecta con el túnel de Cloudflare apuntando a `http://localhost:8096`.

El repo necesita los secretos `DOCKER_USERNAME` y `DOCKER_TOKEN` (los mismos del portfolio).
