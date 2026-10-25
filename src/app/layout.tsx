import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { contacto } from "@/lib/data";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const descripcion =
  "Cocinas, clósets y muebles a medida en Curicó y alrededores. Diseñamos, fabricamos e instalamos. Cotiza por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://legadomuebles.cl"),
  title: "Legado Muebles · Muebles a medida en Curicó",
  description: descripcion,
  openGraph: {
    title: "Legado Muebles · Muebles a medida en Curicó",
    description: descripcion,
    locale: "es_CL",
    type: "website",
    images: [{ url: "/img/lm01-cocina-isla.webp", width: 1400, height: 723, alt: "Cocina con isla fabricada por Legado Muebles" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Legado Muebles",
  description: descripcion,
  telephone: contacto.whatsapp.replace(/\s/g, ""),
  areaServed: "Curicó, Región del Maule, Chile",
  address: { "@type": "PostalAddress", addressLocality: "Curicó", addressRegion: "Maule", addressCountry: "CL" },
  sameAs: [contacto.instagramUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" className={`${serif.variable} ${sans.variable} antialiased`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
