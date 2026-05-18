import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/data/site";
import { buildLocalBusinessJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { AmbientShell } from "@/components/ambient/AmbientShell";
import { CookieBanner } from "@/components/consent/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootLd = buildLocalBusinessJsonLd({ reviews: [], aggregateRating: null });

  return (
    <html lang="de-CH" className={`${inter.variable} ${cormorantGaramond.variable} h-full antialiased`}>
      <head>
        <JsonLd data={rootLd} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans">
        <SiteHeader />
        <div className="relative z-0 flex flex-1 flex-col">
          <AmbientShell />
          <div className="relative z-[2] flex flex-1 flex-col">{children}</div>
        </div>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
