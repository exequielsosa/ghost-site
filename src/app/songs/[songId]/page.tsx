import SongDetailPage from "../../../components/SongDetailPage";
import songsData from "@/constants/songs.json";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return songsData.map((song) => ({ songId: song.id }));
}

interface Props {
  params: Promise<{
    songId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = await getLocale();
  const song = songsData.find((s) => s.id === resolvedParams.songId);
  if (!song) return { title: "Song not found" };

  const title = song.title;
  const album = song.album.title;
  const year = song.album.year;
  const theme = song.theme ? (locale === "es" ? song.theme.es : song.theme.en) : "";
  const description = `${title} (${year}) - ${album}. ${theme}`;

  const keywords = [
    title,
    album,
    year.toString(),
    "Ghost",
    "lyrics",
    "letra",
    ...song.credits.musicians.map((m) => m.name),
  ];
  const canonicalUrl = `/songs/${song.id}`;

  return {
    title: `${title} | Ghost`,
    description,
    keywords,
    openGraph: {
      title: `${title} | Ghost`,
      description,
      url: `/songs/${song.id}`,
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "article",
      images: [
        {
          url: song.album.cover,
          width: 1200,
          height: 630,
          alt: `${title} (${year}) - ${album}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ghost`,
      description,
      images: [song.album.cover],
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: canonicalUrl,
        en: canonicalUrl,
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

export default async function SongPage({ params }: Props) {
  const resolvedParams = await params;
  return <SongDetailPage songId={resolvedParams.songId} />;
}
