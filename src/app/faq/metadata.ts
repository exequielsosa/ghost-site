import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "es"
    ? "Preguntas frecuentes | Ghost Fan Site"
    : "Frequently Asked Questions | Ghost Fan Site";
  const description = locale === "es"
    ? "Respuestas a las preguntas más comunes sobre el fan site de Ghost, legalidad, contacto y uso."
    : "Answers to the most common questions about the Ghost fan site, legality, contact and usage.";
  const keywords = locale === "es"
    ? ["Ghost", "FAQ", "preguntas frecuentes", "fan site", "contacto", "legal", "privacidad", "términos"]
    : ["Ghost", "FAQ", "frequently asked questions", "fan site", "contact", "legal", "privacy", "terms"];
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
          alt: "Ghost FAQ",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: "/faq",
    },
  };
}
