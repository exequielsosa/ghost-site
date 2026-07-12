import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import lineupsData from "@/constants/lineups.json";
import { LineupFormation } from "@/types";
import LineupDetailClient from "./LineupDetailClient";

interface PageProps {
  params: Promise<{
    lineupId: string;
  }>;
}

function findLineup(lineupId: string): LineupFormation | null {
  const lineups: LineupFormation[] = lineupsData.lineups;
  return lineups.find((l) => l.id === lineupId) || null;
}

// Nombre corto del personaje por lineup, para el patrón de title
// "Personaje: la era [Álbum] de Ghost (años)". `lineup.title` trae el título
// largo tipo "El Papado de Papa Emeritus III" / "The Papa Emeritus III Era",
// no el nombre limpio del personaje.
const characterNameByLineupId: Record<string, { es: string; en: string }> = {
  "papa-emeritus-i-era": { es: "Papa Emeritus I", en: "Papa Emeritus I" },
  "papa-emeritus-ii-era": { es: "Papa Emeritus II", en: "Papa Emeritus II" },
  "papa-emeritus-iii-era": { es: "Papa Emeritus III", en: "Papa Emeritus III" },
  "cardinal-copia-era": { es: "Cardinal Copia", en: "Cardinal Copia" },
  "papa-emeritus-iv-era": { es: "Papa Emeritus IV", en: "Papa Emeritus IV" },
  "papa-v-perpetua-era": { es: "Papa V Perpetua", en: "Papa V Perpetua" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lineupId } = await params;
  const locale = (await getLocale()) as "es" | "en";
  const lineup = findLineup(lineupId);

  if (!lineup) {
    return { title: "Formación no encontrada" };
  }

  const characterName =
    characterNameByLineupId[lineupId]?.[locale] ||
    lineup.title[locale] ||
    lineup.title.es;
  const eraAlbum = lineup.albums?.[0] || "";
  const period = lineup.period || "";

  const title = eraAlbum
    ? locale === "es"
      ? `${characterName}: la era ${eraAlbum} de Ghost (${period})`
      : `${characterName}: the ${eraAlbum} era of Ghost (${period})`
    : `${characterName} | Ghost`;

  const description = lineup.description?.[locale] || lineup.description?.es || "";
  const descriptionShort = description.substring(0, 160);

  const keywords = [
    "Ghost",
    "papas",
    "lineups",
    "formaciones",
    title,
    period,
    "Papa Emeritus",
    "Nameless Ghouls",
    "Ghost band",
    "Ghost Argentina",
    "theatrical rock",
    "rock teatral",
    "Tobias Forge",
    "Ghost members",
    "miembros Ghost",
    ...title.split(" ").filter((word) => word.length > 3),
  ].filter(Boolean);

  return {
    title,
    description: descriptionShort || `Información sobre ${characterName} de Ghost`,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description: descriptionShort,
      url: `/papas/${lineupId}`,
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descriptionShort,
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: `/papas/${lineupId}`,
      languages: {
        es: `/papas/${lineupId}`,
        en: `/papas/${lineupId}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LineupPage({ params }: PageProps) {
  const { lineupId } = await params;
  const lineup = findLineup(lineupId);

  if (!lineup) {
    notFound();
  }

  const locale = (await getLocale()) as "es" | "en";
  const characterName =
    characterNameByLineupId[lineupId]?.[locale] ||
    lineup.title[locale] ||
    lineup.title.es;

  // Schema.org PerformanceRole: responde estructuralmente "quién interpretó
  // este personaje y durante qué período" — la misma pregunta que
  // respondimos en texto plano en LineupDetailClient.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: characterName,
    about: {
      "@type": "MusicGroup",
      name: "Ghost",
      url: "https://ghostband.com.ar",
      member: {
        "@type": "PerformanceRole",
        roleName: characterName,
        startDate: String(lineup.yearStart),
        ...(lineup.yearEnd != null && { endDate: String(lineup.yearEnd) }),
        member: {
          "@type": "Person",
          name: "Tobias Forge",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LineupDetailClient params={params} />
    </>
  );
}
