import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SongsListPage from "../../components/SongsListPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("songs");

  const title = `${t("songsListTitle")} | Ghost`;
  const description = t("songsListDescription");
  const keywords = [
    "Ghost",
    "songs",
    "canciones",
    "theatrical rock",
    "Tobias Forge",
    "The Nameless Ghouls",
    "A Ghoul Writer",
    "theatrical rock",
    "metal",
    "Meaning of Ghost songs",
    "Significado de las canciones de Ghost",
    "discografía Ghost",
    "Letras traducidas Ghost",
    "álbumes Ghost",
    "lyrics",
    "letras",
    "Top songs played live",
    "Canciones más tocadas en vivo",
    "Cirice",
    "Rats",
    "Mary on a Cross",
    "Square Hammer",
    "Dance Macabre",
    "Spillways",
    "Call Me Little Sunshine",
    "Kaisarion",
    "Imperium",
    "Absolution",
    "If You Have Ghosts",
    "Twenties",
    "Miasma",
    "Kiss The Go-Goat",
    "Respite On The Spitalfields",
    "Watcher In The Sky",
    "Faith",
    "Tobias is God",
    "Ghuleh/Zombie Queen",
    "Year Zero",
    "Per Aspera Ad Inferi",
    "Elizabeth",
    "Ritual",
    "Stand by Him",
    "Death Knell",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/songs",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/songs.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Listado de canciones de Ghost"
              : "Ghost Songs List",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/songs.jpg"],
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: "/songs",
      languages: {
        es: "/songs",
        en: "/songs",
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

export default function SongsPage() {
  return <SongsListPage />;
}
