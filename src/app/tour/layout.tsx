import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const keywordsByLocale = {
    es: [
      "Ghost tour",
      "conciertos Ghost",
      "entradas Ghost",
      "gira 2025",
      "Tobias Forge concierto",
      "tour fechas",
      "metal en vivo",
      "thrash metal tour",
      "Skeletá tour",
      "Setlist tour Ghost",
      "Impera Tour",
      "Ghost tour 2024",
      "Ghost tour 2025",
      "Ghost tour 2026",
      "gira Ghost",
      "conciertos Ghost",
      "shows Ghost",
      "fechas Ghost",
      "Ghost Argentina 2024",
      "Ghost Buenos Aires",
      "Ghost Chile",
      "Ghost Brasil",
      "Ghost México",
      "Ghost Lima",
      "Ghost Bogotá",
      "Ghost São Paulo",
      "Ghost Santiago",
      "Ghost en vivo",
      "Ghost live",
      "setlist Ghost",
    ],
    en: [
      "Ghost tour",
      "Ghost concerts",
      "Ghost tickets",
      "tour 2025",
      "Tobias Forge concert",
      "tour dates",
      "live metal",
      "thrash metal tour",
      "Skeletá tour",
      "Setlist tour Ghost",
      "Impera Tour",
      "Ghost tour 2024",
      "Ghost tour 2025",
      "Ghost tour 2026",
      "gira Ghost",
      "conciertos Ghost",
      "shows Ghost",
      "fechas Ghost",
      "Ghost Argentina 2024",
      "Ghost Buenos Aires",
      "Ghost Chile",
      "Ghost Brasil",
      "Ghost México",
      "Ghost Lima",
      "Ghost Bogotá",
      "Ghost São Paulo",
      "Ghost Santiago",
      "Ghost en vivo",
      "Ghost live",
      "setlist Ghost",
    ],
  };

  const titleByLocale = {
    es: "Ghost Tour 2026 - Fechas y Entradas",
    en: "Ghost Tour 2026 - Dates and Tickets",
  };

  const descriptionByLocale = {
    es: "Fechas oficiales del tour de Ghost 2026. Encuentra entradas para los conciertos en Europa y América. Historico de fechas y setlist",
    en: "Official Ghost 2026 tour dates. Find tickets for concerts in Europe and America. Historical dates and setlist",
  };

  return {
    title:
      titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
    description:
      descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
      descriptionByLocale.es,
    keywords:
      keywordsByLocale[locale as keyof typeof keywordsByLocale] ||
      keywordsByLocale.es,
    authors: [{ name: "Exequiel Sosa" }],
    openGraph: {
      title:
        titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
      description:
        descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
        descriptionByLocale.es,
      siteName: "Ghost Fan",
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      images: [
        {
          url: "/images/banners/tour.jpg",
          width: 1200,
          height: 630,
          alt: "Ghost Tour 2026",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: "/tour",
    },
  };
}

export default function TourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
