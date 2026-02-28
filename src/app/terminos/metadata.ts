import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "es"
    ? "Términos y condiciones | Ghost Fan Site"
    : "Terms and Conditions | Ghost Fan Site";
  const description = locale === "es"
    ? "Lee los términos y condiciones de uso del sitio de fans de Ghost. Información legal y derechos."
    : "Read the terms and conditions for using the Ghost fan site. Legal information and rights.";
  const keywords = locale === "es"
    ? ["Ghost", "términos", "condiciones", "legal", "fan site", "uso"]
    : ["Ghost", "terms", "conditions", "legal", "fan site", "usage"];
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      siteName: "Ghost Fan Site",
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      images: [
        {
          url: "/images/ghost-ghost.jpg",
          width: 1200,
          height: 630,
          alt: "Ghost Términos",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: "/terminos",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
