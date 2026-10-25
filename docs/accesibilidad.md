# Estudio de accesibilidad y contraste

Objetivo: **WCAG 2.2 nivel AA**. Revisado el 25-10-2026 sobre la rama `feat/sitio-web`.

## Cómo se midió

- **Auditoría automática** con [axe-core](https://github.com/dequelabs/axe-core) (reglas `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` y `best-practice`) en Chrome headless, a 1440×900 (escritorio) y 390×844 (celular), con todas las secciones ya cargadas.
- **Contraste** calculado con la fórmula de luminancia relativa de WCAG para cada par de colores de texto y fondo que usa el sitio.
- **Revisión manual**: navegación con teclado, tamaño de los objetivos táctiles, movimiento reducido y textos alternativos.

## Resultado

| Prueba | Escritorio | Celular |
| --- | --- | --- |
| Infracciones de axe | 0 | 0 |
| Reglas aprobadas | 46 | 48 |
| Scroll horizontal | No | No |
| Objetivos táctiles menores a 24 px | 0 | 0 |
| Errores de consola | 0 | 0 |

### Problemas encontrados y corregidos

| Problema | Criterio | Corrección |
| --- | --- | --- |
| Madera `#9a6235` sobre fondo arena: 4,24:1 | 1.4.3 Contraste | Nuevo color `wood-text` `#7c4a25` (6,63:1) para todo texto en madera. `#9a6235` queda solo para líneas y bordes decorativos. |
| Texto del pie al 40 % de opacidad: 3,98:1 | 1.4.3 Contraste | Subido al 75 % (9,09:1). |
| Verde de WhatsApp `#1f7a4d` con texto blanco: 5,32:1 | 1.4.3 Contraste | Oscurecido a `#1b6e45` (6,24:1), con más margen. |
| Botón flotante de WhatsApp fuera de un landmark | Buena práctica | Envuelto en `<aside aria-label="Contacto rápido">`. |
| Lista deslizable de proyectos sin acceso por teclado | 2.1.1 Teclado | `tabIndex={0}` y etiqueta descriptiva. |

## Contraste de la paleta final

Mínimos AA: **4,5:1** para texto normal, **3:1** para texto grande e iconos.

| Uso | Texto | Fondo | Contraste |
| --- | --- | --- | --- |
| Texto principal (ink) | `#1d1c1a` | `#f7f3ec` | 15,40:1 |
| Texto secundario (ink-soft) | `#57524b` | `#f7f3ec` | 7,00:1 |
| Texto secundario sobre blanco 60 % | `#57524b` | `#fcfaf7` | 7,43:1 |
| Madera para texto (wood-text) | `#7c4a25` | `#f7f3ec` | 6,63:1 |
| Madera para texto sobre blanco 60 % | `#7c4a25` | `#fcfaf7` | 7,04:1 |
| Iconos (icon) | `#8a552c` | `#f7f3ec` | 5,56:1 |
| Iconos sobre blanco 60 % | `#8a552c` | `#fcfaf7` | 5,90:1 |
| Panel del recorrido 3D sobre una puerta grafito | `#57524b` | `#e8e5de` | 6,15:1 |
| Crema sobre carbón | `#f7f3ec` | `#1d1c1a` | 15,40:1 |
| Crema 80 % sobre carbón | `#cbc8c2` | `#1d1c1a` | 10,20:1 |
| Crema 75 % (pie de página) | `#c0bdb8` | `#1d1c1a` | 9,09:1 |
| Arena sobre carbón | `#e9dccb` | `#1d1c1a` | 12,62:1 |
| Blanco sobre verde WhatsApp | `#ffffff` | `#1b6e45` | 6,24:1 |
| Crema sobre botón carbón | `#f7f3ec` | `#1d1c1a` | 15,40:1 |
| Crema sobre botón en hover | `#f7f3ec` | `#7c4a25` | 6,63:1 |

Los colores están en `src/app/globals.css` (`@theme`). Si cambias alguno, vuelve a medirlo: cualquier color de texto debe mantenerse sobre 4,5:1.

## Otras pautas aplicadas

- **Teclado:** enlace "Saltar al contenido", foco visible (contorno de 2 px) en todos los elementos interactivos, y comparador del taller usable con las flechas del teclado.
- **Objetivos táctiles:** botones y enlaces de al menos 44×44 px (acabados, menú, pausa de videos y botón de WhatsApp).
- **Movimiento:** con `prefers-reduced-motion` se desactivan las animaciones de entrada, el pulso del botón y la flotación del logo, y los videos parten en pausa. El 3D solo se mueve con el scroll de la persona.
- **Videos:** se reproducen solo mientras están a la vista y todos tienen botón de pausa (2.2.2). No tienen audio, así que no necesitan subtítulos (axe marca `video-caption` como "revisar", no como infracción).
- **Lectores de pantalla:** idioma `es-CL`, jerarquía de títulos ordenada, textos alternativos descriptivos, iconos decorativos con `aria-hidden`, y estado de los acabados con `aria-pressed`. Las escenas 3D son decorativas (`aria-hidden`) y el texto de cada paso está en el HTML.
- **Sin WebGL:** el recorrido usa una versión 3D hecha con CSS, así que el contenido nunca depende de WebGL.

## Pendiente (requiere personas o equipos reales)

- Probar con VoiceOver (iPhone) y TalkBack (Android).
- Probar en un celular de gama media para confirmar que el 3D se mueve con fluidez.
