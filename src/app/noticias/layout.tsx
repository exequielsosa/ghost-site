import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    keywords:
      "Ghost, noticias, news, metal, thrash metal, Tobias Forge, actualidad, últimas noticias, tour, conciertos, Ghost Argentina presencia, Ghost fanbase Argentina, Ghost Latinoamérica alcance,Ghost Spanish-speaking fans,Ghost en español,Ghost traductor lyrics,Ghost noticias en español,Ghost entrevistas españolas,Ghost podcasts español,   Ghost radio Argentina,Ghost band,Ghost Swedish band,Ghost theatrical rock,Ghost Tobias Forge,Ghost Papa Emeritus,Ghost Nameless Ghouls,Ghost Cirice,Ghost Mary on a Cross,Ghost tour dates,Ghost new album,Ghost latest news,Ghost discography list,Ghost album rankings,Ghost best songs,Ghost unplugged,Ghost covers,    Ghost tributes,    banda Ghost,Ghost banda sueca,Ghost music,Ghost band members,Ghost official,Ghost real members,who is Ghost,identidad Ghost,Papa Emeritus identity,Tobias Forge Ghost,Ghost founder,Ghost mastermind,Ghost fan site,Ghost Argentina fans,Ghost comunidad,Ghost fandom,Ghost noticias actualidad,últimas noticias Ghost,Ghost breaking news,Ghost anuncios,Ghost discografía completa,Ghost letras,Ghost lyrics,Ghost canciones,Ghost entrevistas,Ghost noticias,Ghost news,Ghost streaming,Ghost Spotify,Ghost Apple Music,Ghost YouTube,Ghost videos oficiales,Ghost documentales,Ghost behind the scenes",
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      url: "https://ghostband.com.ar/noticias",
      siteName: "Ghost Argentina",
      locale: "es_AR",
      type: "website",
      images: [
        {
          url: "https://ghostband.com.ar/images/banners/news.jpg",
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
      images: ["https://ghostband.com.ar/images/banners/news.jpg"],
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
