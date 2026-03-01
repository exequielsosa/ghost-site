import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "es"
    ? "Contacto | Ghost Fan Site"
    : "Contact | Ghost Fan Site";
  const description = locale === "es"
    ? "Formulario de contacto para el sitio de fans de Ghost. Envía tus dudas, sugerencias o comentarios."
    : "Contact form for the Ghost fan site. Send your questions, suggestions or comments.";
  const keywords = locale === "es"
    ? ["Ghost", "contacto", "fan site", "formulario", "dudas", "sugerencias", "comentarios"]
    : ["Ghost", "contact", "fan site", "form", "questions", "suggestions", "comments"];
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
          url: "/images/pagelogo.jpg",
          width: 1200,
          height: 630,
          alt: "Ghost Contacto",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: "/contacto",
    },
  };
}
