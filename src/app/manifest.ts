import type { MetadataRoute } from "next";
import { DESCRIPCION, NOMBRE } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: NOMBRE,
    short_name: "Legado",
    description: DESCRIPCION,
    lang: "es-CL",
    start_url: "/",
    display: "browser",
    background_color: "#f7f3ec",
    theme_color: "#f7f3ec",
    icons: [
      { src: "/img/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/img/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
