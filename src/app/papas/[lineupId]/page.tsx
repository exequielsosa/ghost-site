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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lineupId } = await params;
  const locale = (await getLocale()) as "es" | "en";
  const lineup = findLineup(lineupId);

  if (!lineup) {
    return { title: "Formación no encontrada" };
  }

  const title = lineup.title[locale] || lineup.title.es;
  const description = lineup.description?.[locale] || lineup.description?.es || "";
  const descriptionShort = description.substring(0, 160);
  const period = lineup.period || "";

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
    title: `${title} | Ghost`,
    description: descriptionShort || `Información sobre ${title} de Ghost`,
    keywords: keywords.join(", "),
    openGraph: {
      title: `${title} | Ghost`,
      description: descriptionShort,
      url: `/papas/${lineupId}`,
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ghost`,
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

  return <LineupDetailClient params={params} />;
}
