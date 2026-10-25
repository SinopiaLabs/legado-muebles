import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/img/lm01-cocina-isla.webp`, `${SITE_URL}/img/lm02-walking-closet.webp`],
    },
  ];
}
