import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Container, Chip, Grid } from "@mui/material";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";
import Breadcrumb from "@/components/Breadcrumb";
import RandomSectionBanner from "@/components/NewsBanner";
import videosData from "@/constants/videos.json";
import type { Video } from "@/types/video";
import { generateVideoSlug, findVideoBySlug } from "@/types/video";
import { getYouTubeVideoId } from "@/types/show";

interface VideoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return (videosData as Video[]).map((video) => ({
    slug: generateVideoSlug(video.title),
  }));
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as "es" | "en";
  const video = findVideoBySlug(videosData as Video[], slug);

  if (!video) {
    return { title: locale === "es" ? "Video no encontrado" : "Video not found" };
  }

  const description = video.description[locale] || video.description.es;
  const videoId = getYouTubeVideoId(video.youtube);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const title = `${video.title} - Ghost (${video.year})`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/videos/${slug}`,
      siteName: "Ghost Fan Site",
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [
        {
          url: thumbnailUrl,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnailUrl],
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: `/videos/${slug}`,
      languages: {
        es: `/videos/${slug}`,
        en: `/videos/${slug}`,
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

export default async function VideoWatchPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as "es" | "en";
  const tb = await getTranslations("breadcrumb");
  const v = await getTranslations("videos");

  const videos = videosData as Video[];
  const video = findVideoBySlug(videos, slug);

  if (!video) {
    notFound();
  }

  const videoId = getYouTubeVideoId(video.youtube);

  if (!videoId) {
    notFound();
  }

  const description = video.description[locale] || video.description.es;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Otros 3 videos para interlinking: los siguientes al actual en la lista
  // (con wraparound), así cada watch page muestra un set distinto en vez de
  // repetir siempre los primeros 3 del array.
  const currentIndex = videos.findIndex(
    (v2) => generateVideoSlug(v2.title) === slug
  );
  const moreVideos = Array.from({ length: 3 }, (_, i) => {
    const idx = (currentIndex + i + 1) % videos.length;
    return videos[idx];
  }).filter((v2) => generateVideoSlug(v2.title) !== slug);

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description,
    thumbnailUrl,
    uploadDate: `${video.year}-01-01T00:00:00+00:00`,
    contentUrl: video.youtube,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    creator: {
      "@type": "MusicGroup",
      name: "Ghost",
      genre: "Theatrical Rock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <ContainerGradientNoPadding>
        <Box pt={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} pb={{ xs: 0, md: 0 }}>
          <Breadcrumb
            items={[
              { label: tb("videos"), href: "/videos" },
              { label: video.title },
            ]}
          />
        </Box>

        <Container maxWidth={false} sx={{ maxWidth: 1000, mx: "auto", py: 4 }}>
          {/* Embed real, server-rendered desde la primera carga (no client-side).
              La miniatura del video va de fondo: mientras el iframe de YouTube
              carga (unos ms en negro), se ve la miniatura en vez de un cuadro
              negro vacío. Autoplay activado. */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              backgroundColor: "black",
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              overflow: "hidden",
              mb: 3,
            }}
          >
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={`${video.title} - Ghost (${video.year})`}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Box>

          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: { xs: 24, md: 36 }, fontWeight: 700, mb: 1.5 }}
          >
            {video.title}
          </Typography>

          <Chip label={video.year} color="primary" size="small" sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 4, maxWidth: 800 }}
          >
            {description}
          </Typography>

          <Link
            href="/videos"
            style={{
              display: "inline-block",
              marginBottom: 48,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              ← {v("backToVideos")}
            </Typography>
          </Link>

          {/* Interlinking: otros videos */}
          {moreVideos.length > 0 && (
            <Box mb={6}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 700, mb: 2 }}
              >
                {v("moreVideos")}
              </Typography>
              <Grid container spacing={2}>
                {moreVideos.map((mv) => {
                  const mvId = getYouTubeVideoId(mv.youtube);
                  const mvSlug = generateVideoSlug(mv.title);
                  if (!mvId) return null;
                  return (
                    <Grid key={mvSlug} size={{ xs: 12, sm: 4 }}>
                      <Link
                        href={`/videos/${mvSlug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "56.25%",
                            borderRadius: 1,
                            overflow: "hidden",
                            mb: 1,
                          }}
                        >
                          <Image
                            src={`https://img.youtube.com/vi/${mvId}/hqdefault.jpg`}
                            alt={mv.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          {mv.title}
                        </Typography>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          <RandomSectionBanner currentSection="videos" />
        </Container>
      </ContainerGradientNoPadding>
    </>
  );
}
