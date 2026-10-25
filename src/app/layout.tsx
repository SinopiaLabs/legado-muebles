import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DESCRIPCION, NOMBRE, SITE_URL, TITULO, jsonLd } from "@/lib/seo";
import "./globals.css";

// Fuentes incluidas en el proyecto (Fontsource, licencia OFL en src/fonts):
// el build no depende de descargar nada de Google Fonts.
const serif = localFont({
  variable: "--font-cormorant",
  src: [
    { path: "../fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const sans = localFont({
  variable: "--font-jost",
  src: "../fonts/jost-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITULO, template: `%s | ${NOMBRE}` },
  description: DESCRIPCION,
  applicationName: NOMBRE,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: NOMBRE,
    title: TITULO,
    description: DESCRIPCION,
    locale: "es_CL",
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRIPCION },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
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
