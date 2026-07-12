import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { i18nAlternates } from "@/utils/i18nAlternates";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("reviews");

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    keywords:
      "Ghost, reviews, críticas, reseñas, análisis, álbumes, discos, metal, thrash metal, Dave Mustaine, opinión, valoración",
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      url: "/discography/reviews",
      siteName: "Ghost Argentina",
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
      images: [
        {
          url: "https://ghostband.com.ar/logo-ghost.png",
          width: 1200,
          height: 630,
          alt: "Ghost Reviews",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pageTitle"),
      description: t("pageDescription"),
      images: ["https://ghostband.com.ar/logo-ghost.png"],
    },
    alternates: i18nAlternates("/discography/reviews", locale),
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

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
