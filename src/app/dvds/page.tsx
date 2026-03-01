import DVDGrid from "@/components/DVDGrid";
import dvdsData from "../../constants/dvd.json";
import type { DVD } from "@/types/dvd";
import { Container, Box } from "@mui/material";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";
import RandomSectionBanner from "@/components/NewsBanner";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const titleByLocale = {
    es: "DVDs de Ghost | Videos Musicales, Documentales y Conciertos en Vivo",
    en: "Ghost DVDs | Music Videos, Documentaries and Live Concerts",
  };

  const descriptionByLocale = {
    es: "Colección oficial de DVDs y películas de Ghost: el debut cinematográfico 'Rite Here Rite Now', conciertos en vivo, videos musicales y documentales del legendario acto de rock teatral sueco.",
    en: "Official collection of Ghost DVDs and films: the cinematic debut 'Rite Here Rite Now', live concerts, music videos and documentaries from the legendary Swedish theatrical rock act.",
  };

  const keywordsByLocale = {
    es: [
      "Ghost DVDs",
      "Rite Here Rite Now",
      "Ceremony and Devotion",
      "conciertos Ghost",
      "documentales rock teatral",
      "videos musicales Ghost",
      "Tobias Forge",
      "rock teatral DVDs",
      "película Ghost",
      "Kia Forum",
      "material exclusivo Ghost",
      "formato audiovisual",
      "colección DVDs Ghost",
      "cinematic debut",
    ],
    en: [
      "Ghost DVDs",
      "Rite Here Rite Now",
      "Ceremony and Devotion",
      "Ghost concerts",
      "theatrical rock documentaries",
      "Ghost music videos",
      "Tobias Forge",
      "theatrical rock DVDs",
      "Ghost film",
      "Kia Forum",
      "exclusive Ghost material",
      "audiovisual format",
      "Ghost DVD collection",
      "cinematic debut",
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
      canonical: "/dvds",
      languages: {
        es: "/dvds",
        en: "/dvds",
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
    verification: {
      google: "your-google-verification-code",
    },
    category: "entertainment",
    openGraph: {
      title:
        titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
      description:
        descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
        descriptionByLocale.es,
      url: "/dvds",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/dvd.png",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "DVDs de Ghost - Colección de videos musicales y documentales"
              : "Ghost DVDs - Music Video and Documentary Collection",
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
      images: ["/images/banners/dvd.png"],
      creator: "@GhostFanSite",
    },
  };
}

// Interfaz para manejar estructuras irregulares del JSON
interface DVDDataItem {
  title?: string;
  album_title?: string;
  year?: number;
  release_year?: number;
  label?: string;
  duration?: string;
  description?: {
    short?: {
      es: string;
      en: string;
    };
  };
}

// Datos estructurados para SEO
function generateStructuredData(locale: string) {
  const dvdList = (dvdsData as DVDDataItem[])
    .filter(
      (item) => (item.title || item.album_title) && item.description?.short,
    ) // Filtrar solo elementos con estructura correcta
    .map((dvd) => ({
      "@type": "CreativeWork",
      name: dvd.title || dvd.album_title || "Unknown",
      description:
        dvd.description?.short?.[
          locale as keyof typeof dvd.description.short
        ] ||
        dvd.description?.short?.es ||
        "",
      datePublished: `${dvd.year || dvd.release_year || 2000}-01-01`,
      duration: dvd.duration || "Unknown",
      publisher: {
        "@type": "Organization",
        name: dvd.label || "Unknown",
      },
      creator: {
        "@type": "MusicGroup",
        name: "Ghost",
        genre: "Theatrical Rock",
      },
    }));

  const titleByLocale = {
    es: "DVDs de Ghost",
    en: "Ghost DVDs",
  };

  const descriptionByLocale = {
    es: "Colección completa de DVDs de Ghost con videos musicales y documentales",
    en: "Complete collection of Ghost DVDs with music videos and documentaries",
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
    url: "https://ghostband.com.ar/dvds",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: dvdsData.length,
      itemListElement: dvdList.map((dvd, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: dvd,
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

export default async function DVDsPage() {
  const locale = await getLocale();
  const tb = await getTranslations("breadcrumb");
  const structuredData = generateStructuredData(locale);

  // Filtrar solo DVDs válidos que tengan la estructura esperada
  const validDvds = (dvdsData as DVDDataItem[]).filter(
    (item) => (item.title || item.album_title) && item.description?.short,
  );

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
          <Breadcrumb items={[{ label: tb("dvds") }]} />
        </Box>
        <Container maxWidth={false} sx={{ maxWidth: 1440, mx: "auto", py: 4 }}>
          <DVDGrid dvds={validDvds as unknown as DVD[]} />
          <Box mt={4}>
            <RandomSectionBanner currentSection="dvds" />
          </Box>
        </Container>
      </ContainerGradientNoPadding>
    </>
  );
}
