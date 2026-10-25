# SEO de legadomuebles.cl

Revisado el 25-10-2026 con Lighthouse 12 (perfiles móvil y escritorio) sobre la imagen de producción.

## Resultado

| | Antes | Después |
| --- | --- | --- |
| SEO (móvil / escritorio) | 100 / 100 | 100 / 100 |
| Rendimiento móvil | 58 | 94 |
| Rendimiento escritorio | 69 | 93 |
| Bloqueo del hilo principal (TBT, móvil) | 6.870 ms | 90 ms |
| LCP móvil | 3,8 s | 3,0 s |
| Peso de la carga inicial | 932 KB | 508 KB |
| Accesibilidad / buenas prácticas | 100 / 100 | 100 / 100 |

Las Core Web Vitals (LCP, INP, CLS) son señal de posicionamiento en Google, por eso el rendimiento es parte del trabajo de SEO.

## Qué incluye el sitio

**Técnico**
- `robots.txt` y `sitemap.xml` (con imágenes), generados en `src/app/robots.ts` y `src/app/sitemap.ts`.
- URL canónica `https://legadomuebles.cl` e indexación con vista previa de imagen grande.
- `manifest.webmanifest`, idioma `es-CL` e iconos.
- Imagen para compartir en WhatsApp, Facebook y X (`src/app/opengraph-image.jpg`, 1200×630), con texto alternativo.

**Datos estructurados** (`src/lib/seo.ts`, schema.org en JSON-LD)
- `LocalBusiness` / `HomeAndConstructionBusiness`: nombre, teléfono, zona de servicio (Curicó, Sagrada Familia, provincia de Curicó), Instagram y catálogo de servicios.
- `WebSite` y `FAQPage` con las preguntas frecuentes.

**Contenido**
- Título: "Muebles a medida en Curicó | Legado Muebles" (búsqueda principal más la marca).
- `h1`: "Muebles a medida en Curicó y alrededores". El lema grande es visual.
- Los textos de los servicios incluyen las búsquedas de cada uno: cocinas, clósets y vanitorios a medida.
- El pie de página muestra nombre, zona y teléfono, iguales que en Google e Instagram.

**Rendimiento**
- three.js ya no está en la carga inicial: se descarga solo al usarse.
- El mueble 3D se monta cuando la sección está cerca y genera cada textura cuando hace falta.
- El logo 3D espera a que termine la carga. Mientras tanto se ve el logo plano, que pinta al instante.
- En equipos que dibujan WebGL por software (sin GPU) se usan las versiones en CSS. Para forzar WebGL en pruebas, agrega `?3d=webgl` a la URL.

## Al publicar el dominio (pendiente)

1. **Google Business Profile.** Es lo que más pesa en búsquedas locales como "muebles a medida Curicó". Hay que crearlo como negocio de área de servicio, con el mismo nombre, teléfono y zona del sitio, y subir fotos de los proyectos.
2. **Google Search Console.** Hay que verificar el dominio (registro TXT en Cloudflare) y enviar `https://legadomuebles.cl/sitemap.xml`.
3. **Bing Webmaster Tools.** Se puede importar desde Search Console.
4. **Instagram.** Poner el enlace a la web en la biografía de @legadomuebles.cl.
5. **Reseñas.** Pedir a los clientes reseñas en Google. Influyen en el ranking local y en la decisión de nuevos clientes.
6. **Redirección de `www`.** Crear `www.legadomuebles.cl` en el túnel y redirigirlo a `legadomuebles.cl` (regla de redirección en Cloudflare) para no duplicar contenido.
