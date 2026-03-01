import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ShowsListPage from "@/components/ShowsListPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("shows");

  const title = `${t("listTitle")} | Ghost`;
  const description = t("listDescription");
  const keywords = [
    "Ghost",
    "shows",
    "conciertos",
    "concerts",
    "live",
    "en vivo",
    "theatrical rock",
    "metal",
    "Tobias Forge",
    "historic shows",
    "shows históricos",
    "tour dates",
    "fechas de gira",
    "setlist",
    "Ghouls",
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
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/shows",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/shows.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Shows Históricos de Ghost"
              : "Ghost Historic Shows",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/shows.jpg"],
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: "/shows",
      languages: {
        es: "/shows",
        en: "/shows",
      },
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
}

export default function ShowsPage() {
  return <ShowsListPage />;
}
