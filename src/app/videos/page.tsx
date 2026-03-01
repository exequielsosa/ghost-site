import VideosGrid from "@/components/VideosGrid";
import videosData from "../../constants/videos.json";
import type { Video } from "@/types/video";
import { Container, Box } from "@mui/material";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";
import RandomSectionBanner from "@/components/NewsBanner";
import { CommentsSection } from "@/components/CommentsSection";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const titleByLocale = {
    es: "Videos Oficiales de Ghost | Videoclips y Performances en Vivo",
    en: "Official Ghost Videos | Music Videos and Live Performances",
  };

  const descriptionByLocale = {
    es: "Colección completa de videos musicales oficiales de Ghost: desde Cirice hasta sus últimos éxitos. Videoclips, performances en vivo y contenido exclusivo de la legendaria banda de rock teatral sueca.",
    en: "Complete collection of official Ghost music videos: from Cirice to their latest hits. Music videos, live performances and exclusive content from the legendary Swedish theatrical rock band.",
  };

  const keywordsByLocale = {
    es: [
      "Ghost",
      "videos",
      "videoclips",
      "Ghost videos",
      "videos oficiales Ghost",
      "theatrical rock videos",
      "rock teatral videos",
      "Cirice video",
      "Rats video",
      "Mary On A Cross video",
      "Spillways video",
      "Square Hammer video",
      "Kiss The Go-Goat video",
      "Dance Macabre video",
      "Umbra video",
      "Hunter's Moon video",
      "Tobias Forge",
      "Papa Emeritus",
      "Nameless Ghouls",
      "Ghost performances",
      "performances en vivo",
      "conciertos Ghost",
      "Ghost Argentina presencia",
      "Ghost fanbase Argentina",
      "Ghost Latinoamérica alcance",
      "Ghost Spanish-speaking fans",
      "Ghost en español",
      "Ghost noticias en español",
      "Ghost entrevistas españolas",
      "Ghost radio Argentina",
      "videoclip Ghost",
      "video oficial Ghost",
      "Ghost MTV",
      "Ghost YouTube",
      "Ghost music videos",
      "pop metal videos",
      "banda Ghost",
      "Ghost banda sueca",
      "Ghost official",
      "Ghost real members",
    ],
    en: [
      "Ghost",
      "videos",
      "Ghost videos",
      "Ghost music videos",
      "official Ghost videos",
      "theatrical rock videos",
      "Cirice video",
      "Rats video",
      "Mary On A Cross video",
      "Spillways video",
      "Square Hammer video",
      "Kiss The Go-Goat video",
      "Dance Macabre video",
      "Umbra video",
      "Hunter's Moon video",
      "Tobias Forge",
      "Papa Emeritus",
      "Nameless Ghouls",
      "Ghost performances",
      "live performances",
      "Ghost concerts",
      "Ghost Argentina presence",
      "Ghost fanbase Argentina",
      "Ghost Latin America reach",
      "Ghost Spanish-speaking fans",
      "Ghost in Spanish",
      "Ghost news in Spanish",
      "Ghost Spanish interviews",
      "Ghost radio Argentina",
      "Ghost MTV",
      "Ghost YouTube",
      "pop metal videos",
      "Ghost band",
      "Ghost Swedish band",
      "Ghost official",
      "Ghost real members",
      "who is Ghost",
      "Ghost identity",
    ],
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
    authors: [{ name: "Ghost Fan Site" }],
    creator: "Ghost Fan Site",
    publisher: "Ghost Fan Site",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/videos",
      languages: {
        es: "/videos",
        en: "/videos",
      },
    },
    openGraph: {
      title:
        titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
      description:
        descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
        descriptionByLocale.es,
      url: "/videos",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/videos.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Videos de Ghost - Colección de videoclips oficiales"
              : "Ghost Videos - Official Music Video Collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
      description:
        descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
        descriptionByLocale.es,
      images: ["/images/banners/videos.jpg"],
      creator: "@GhostFanSite",
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

// Datos estructurados para SEO
function generateStructuredData(locale: string) {
  const videoList = videosData.map((video: Video) => ({
    "@type": "VideoObject",
    name: video.title,
    description:
      video.description[locale as keyof typeof video.description] ||
      video.description.es,
    thumbnailUrl: `https://img.youtube.com/vi/${
      video.youtube.split("v=")[1]?.split("&")[0]
    }/maxresdefault.jpg`,
    uploadDate: `${video.year}-01-01`,
    duration: "PT3M30S", // Duración promedio estimada
    contentUrl: video.youtube,
    embedUrl: `https://www.youtube.com/embed/${
      video.youtube.split("v=")[1]?.split("&")[0]
    }`,
    creator: {
      "@type": "MusicGroup",
      name: "Ghost",
      genre: "Theatrical Rock",
    },
  }));

  const titleByLocale = {
    es: "Videos Oficiales de Ghost",
    en: "Official Ghost Videos",
  };

  const descriptionByLocale = {
    es: "Colección completa de videos musicales oficiales de Ghost",
    en: "Complete collection of official Ghost music videos",
  };

  const aboutDescriptionByLocale = {
    es: "Banda sueca de rock teatral formada en 2006 por Tobias Forge, conocida por su combinación de rock pesado con elementos teatrales y pop accesible.",
    en: "Swedish theatrical rock band formed in 2006 by Tobias Forge, known for their blend of heavy rock with theatrical elements and accessible pop.",
  };

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
    description:
      descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
      descriptionByLocale.es,
    url: "https://ghostband.com.ar/videos",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: videosData.length,
      itemListElement: videoList.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: video,
      })),
    },
    about: {
      "@type": "MusicGroup",
      name: "Ghost",
      genre: "Theatrical Rock",
      foundingDate: "2006",
      description:
        aboutDescriptionByLocale[
          locale as keyof typeof aboutDescriptionByLocale
        ] || aboutDescriptionByLocale.es,
    },
  };
}

export default async function VideosPage() {
  const locale = await getLocale();
  const tb = await getTranslations("breadcrumb");
  const v = await getTranslations("videos");
  const structuredData = generateStructuredData(locale);

  return (
    <>
      {/* Datos estructurados JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ContainerGradientNoPadding>
        <Box pt={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} pb={{ xs: 0, md: 0 }}>
          <Breadcrumb items={[{ label: tb("videos") }]} />
        </Box>
        <Container maxWidth={false} sx={{ maxWidth: 1440, mx: "auto", py: 4 }}>
          <VideosGrid videos={videosData as unknown as Video[]} />
          <Box mt={4}>
            <RandomSectionBanner currentSection="videos" />
          </Box>
          <CommentsSection
            pageType="article"
            pageId="videos-page"
            customSubtitle={v("comment")}
          />
        </Container>
      </ContainerGradientNoPadding>
    </>
  );
}
