import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrevistas | Ghost",
  description: "Colección completa de entrevistas a los miembros de Ghost a lo largo de su historia. Desde los inicios en 2006 hasta la actualidad, accede a conversaciones exclusivas, declaraciones históricas y momentos únicos de Tobias Forge, Papa Emeritus y todos los integrantes de la banda.",
  keywords: [
    "Ghost entrevistas",
    "Tobias Forge entrevista",
    "Papa Emeritus entrevista",
    "Ghost interviews",
    "theatrical rock entrevistas",
    "metal interviews",
    "Nameless Ghouls entrevista",
    "Ghost band members interview",
    "rock teatral entrevistas",
    "pop metal interviews",
    "Ghost historia entrevista",
    "banda Ghost declaraciones",
    "entrevistas históricas rock",
    "declaraciones Ghost",
  ],
  openGraph: {
    title: "Entrevistas | Ghost",
    description: "Colección completa de entrevistas a los miembros de Ghost a lo largo de su historia.",
    url: "/entrevistas",
    siteName: "Ghost Fan Site",
    type: "website",
    images: [
      {
        url: "/images/banners/interviews.png",
        width: 1200,
        height: 630,
        alt: "Entrevistas de Ghost - Colección completa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrevistas | Ghost",
    description: "Colección completa de entrevistas a los miembros de Ghost a lo largo de su historia.",
    images: ["/images/banners/interviews.png"],
    creator: "@GhostFanSite",
  },
  alternates: {
    canonical: "/entrevistas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};