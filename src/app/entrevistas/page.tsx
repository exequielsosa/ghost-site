import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import InterviewsListPage from "@/components/InterviewsListPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("interviews");

  const title = `${t("listTitle")} | Ghost`;
  const description = t("listDescription");
  const keywords = [
    "Ghost",
    "entrevistas",
    "interviews",
    "theatrical rock",
    "pop metal",
    "Tobias Forge",
    "Papa Emeritus",
    "Nameless Ghouls",
    "Ghost band members",
    "Ghost interviews",
    "Ghost declaraciones",
    "Ghost statements",
    "conversaciones Ghost",
    "Ghost conversations",
    "band interviews",
    "metal interviews",
    "Ghost Argentina presencia",
    "Ghost fanbase Argentina",
    "Ghost Latinoamérica alcance",
    "Ghost Spanish-speaking fans",
    "Ghost en español",
    "Ghost traductor lyrics",
    "Ghost noticias en español",
    "Ghost entrevistas españolas",
    "Ghost podcasts español",
    "Ghost radio Argentina",
    "Ghost band",
    "Ghost Swedish band",
    "Ghost theatrical rock",
    "Ghost Tobias Forge",
    "Ghost Papa Emeritus",
    "Ghost Nameless Ghouls",
    "Ghost Cirice",
    "Ghost Mary on a Cross",
    "Ghost tour dates",
    "Ghost new album",
    "Ghost latest news",
    "Ghost discography list",
    "Ghost album rankings",
    "Ghost best songs",
    "Ghost unplugged",
    "Ghost covers",
    "Ghost tributes",
    "banda Ghost",
    "Ghost banda sueca",
    "Ghost music",
    "Ghost official",
    "Ghost real members",
    "who is Ghost",
    "identidad Ghost",
    "Papa Emeritus identity",
    "Tobias Forge Ghost",
    "Ghost founder",
    "Ghost mastermind",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/entrevistas",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/interviews.png",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Entrevistas de Ghost - Colección completa"
              : "Ghost Interviews - Complete Collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/interviews.png"],
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: "/entrevistas",
      languages: {
        es: "/entrevistas",
        en: "/entrevistas",
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

export default function InterviewsPage() {
  return <InterviewsListPage />;
}
