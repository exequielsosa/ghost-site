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
      "Dave Mustaine concierto",
      "tour fechas",
      "metal en vivo",
      "thrash metal tour",
    ],
    en: [
      "Ghost tour",
      "Ghost concerts",
      "Ghost tickets",
      "tour 2025",
      "Dave Mustaine concert",
      "tour dates",
      "live metal",
      "thrash metal tour",
    ],
  };

  const titleByLocale = {
    es: "Ghost Tour 2025 - Fechas y Entradas",
    en: "Ghost Tour 2025 - Dates and Tickets",
  };

  const descriptionByLocale = {
    es: "Fechas oficiales del tour de Ghost 2025. Encuentra entradas para los conciertos en Europa y América.",
    en: "Official Ghost 2025 tour dates. Find tickets for concerts in Europe and America.",
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
          url: "/images/ghost-ghost.jpg",
          width: 1200,
          height: 630,
          alt: "Ghost Tour 2025",
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
