import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "es"
    ? "Política de privacidad | Ghost Fan Site"
    : "Privacy Policy | Ghost Fan Site";
  const description = locale === "es"
    ? "Lee la política de privacidad del sitio de fans de Ghost. Protección de datos y derechos de los usuarios."
    : "Read the privacy policy for the Ghost fan site. Data protection and user rights.";
  const keywords = locale === "es"
    ? ["Ghost", "privacidad", "política", "datos", "fan site", "usuarios"]
    : ["Ghost", "privacy", "policy", "data", "fan site", "users"];
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
          alt: "Ghost Privacidad",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: "/privacidad",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
