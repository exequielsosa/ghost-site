import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    keywords:
      "Ghost, noticias, news, metal, thrash metal, Dave Mustaine, actualidad, últimas noticias, tour, conciertos",
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      url: "https://ghostband.com.ar/noticias",
      siteName: "Ghost Argentina",
      locale: "es_AR",
      type: "website",
      images: [
        {
          url: "https://ghostband.com.ar/images/band.webp",
          width: 1200,
          height: 630,
          alt: "Ghost",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pageTitle"),
      description: t("pageDescription"),
      images: ["https://ghostband.com.ar/images/band.webp"],
    },
    alternates: {
      canonical: "https://ghostband.com.ar/noticias",
      languages: {
        es: "https://ghostband.com.ar/noticias",
        en: "https://ghostband.com.ar/noticias",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
