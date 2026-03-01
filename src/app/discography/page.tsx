import DiscographyGrid from "@/components/DiscographyGrid";
import studioAlbums from "../../constants/discography.json";
import liveAlbums from "../../constants/liveAlbums.json";
import compilations from "../../constants/compilations.json";
import eps from "../../constants/eps.json";
import { Typography, Box } from "@mui/material";
import type { Album } from "@/types/album";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";
import RandomSectionBanner from "@/components/NewsBanner";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const titleByLocale = {
    es: "Discografía Completa de Ghost | 8 Álbumes de Estudio + En Vivo y Covers",
    en: "Complete Ghost Discography | 8 Studio Albums + Live & Covers",
  };

  const descriptionByLocale = {
    es: "Discografía completa de Ghost (2010-2025): 8 álbumes de estudio desde Opus Eponymous hasta Skeletá. Incluye álbumes en vivo, EPs y covers. Información detallada, productores, Papas Emeritus y enlaces a streaming.",
    en: "Complete Ghost discography (2010-2025): 8 studio albums from Opus Eponymous to Skeletá. Includes live albums, EPs and covers. Detailed information, producers, Papa Emeritus eras and streaming links.",
  };

  const keywordsByLocale = {
    es: [
      "Ghost discografía",
      "álbumes Ghost",
      "Opus Eponymous",
      "Infestissumam",
      "Meliora",
      "Popestar",
      "Prequelle",
      "Impera",
      "Phantomime",
      "Skeletá",
      "Tobias Forge",
      "Nameless Ghouls",
      "rock teatral",
      "pop metal",
      "Papa Emeritus",
      "Papa Emeritus I",
      "Papa Emeritus II",
      "Papa Emeritus III",
      "Ghouls Ghost",
      "álbumes en vivo Ghost",
      "covers Ghost",
      "EP Ghost",
      "If You Have Ghost",
      "Ceremony and Devotion",
      "Rite Here Rite Now",
      "streaming Ghost",
      "Opus Eponymous",
      "Infestissumam",
      "Meliora",
      "Popestar",
      "Prequelle",
      "Impera",
      "Phantomime",
      "Skeletá",
      "Ghost álbum 2026",
      "álbum final Ghost",
      "último álbum Ghost",
      "discografía Ghost",
      "8 álbumes Ghost",
      "álbumes de estudio",
      "Ceremony and Devotion",
      "Rite Here Rite Now",
      "If You Have Ghost",
      "Elizabeth EP",
      "Ghost live album",
      "concierto Ghost grabado",
      "película Ghost",
      "Kia Forum",
    ],
    en: [
      "Ghost discography",
      "Ghost albums",
      "Opus Eponymous",
      "Infestissumam",
      "Meliora",
      "Popestar",
      "Prequelle",
      "Impera",
      "Phantomime",
      "Skeletá",
      "Tobias Forge",
      "Nameless Ghouls",
      "theatrical metal",
      "pop metal",
      "Papa Emeritus",
      "Papa Emeritus I",
      "Papa Emeritus II",
      "Papa Emeritus III",
      "Cardinal Copia",
      "Ghost live albums",
      "Ghost covers",
      "Ghost EP",
      "If You Have Ghost",
      "Ceremony and Devotion",
      "Rite Here Rite Now",
      "Ghost streaming",
      "Swedish metal band",
      "Infestissumam",
      "Meliora",
      "Popestar",
      "Prequelle",
      "Impera",
      "Phantomime",
      "Skeletá",
      "Ghost álbum 2026",
      "final album Ghost",
      "last album Ghost",
      "discography Ghost",
      "8 albums Ghost",
      "studio albums",
      "Ceremony and Devotion",
      "Rite Here Rite Now",
      "If You Have Ghost",
      "Elizabeth EP",
      "Ghost live album",
      "recorded Ghost concert",
      "Ghost movie",
      "Kia Forum",
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
    alternates: {
      canonical: "/discography",
      languages: {
        es: "/discography",
        en: "/discography",
      },
    },
    openGraph: {
      title:
        titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
      description:
        descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
        descriptionByLocale.es,
      url: "/discography",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/discography.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Discografía de Ghost - 8 álbumes de estudio desde Opus Eponymous hasta Skeletá"
              : "Ghost Discography - 8 studio albums from Opus Eponymous to Skeletá",
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
      images: ["/images/banners/discography.jpg"],
      creator: "@GhostFanSite",
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

export default function AlbumsPage() {
  const t = useTranslations("discography");
  const tb = useTranslations("breadcrumb");

  return (
    <ContainerGradientNoPadding>
      <Box pt={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} pb={{ xs: 2, md: 4 }}>
        <Breadcrumb items={[{ label: tb("discography") }]} />
      </Box>
      {/* Álbumes de Estudio */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("studioAlbums")}
        </Typography>
        <DiscographyGrid albums={studioAlbums as unknown as Album[]} />
      </Box>

      {/* Álbumes en Vivo */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(45deg, #ff9800, #e91e63)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("liveAlbums")}
        </Typography>
        <DiscographyGrid albums={liveAlbums as unknown as Album[]} />
      </Box>

      {/* Compilaciones */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(45deg, #9c27b0, #673ab7)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("compilations")}
        </Typography>
        <DiscographyGrid albums={compilations as unknown as Album[]} />
      </Box>

      {/* EPs */}
      <Box mb={4}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(45deg, #795548, #ff5722)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("eps")}
        </Typography>
        <DiscographyGrid albums={eps as unknown as Album[]} />
        <Box
          mt={4}
          sx={{
            px: { xs: 2, sm: 2, md: 0 },
          }}
        >
          <RandomSectionBanner currentSection="discography" />
        </Box>
      </Box>
    </ContainerGradientNoPadding>
  );
}
