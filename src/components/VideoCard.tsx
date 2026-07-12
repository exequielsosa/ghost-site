"use client";

import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Video } from "@/types/video";
import { generateVideoSlug } from "@/types/video";
import { getYouTubeVideoId } from "@/types/show";

interface VideoCardProps {
  video: Video;
}

function getVideoDescription(
  description: Video["description"],
  locale: string
): string {
  return description[locale as keyof typeof description] || description.es;
}

export default function VideoCard({ video }: VideoCardProps) {
  const locale = useLocale();
  const videoId = getYouTubeVideoId(video.youtube);
  const description = getVideoDescription(video.description, locale);
  const watchHref = `/videos/${generateVideoSlug(video.title)}`;

  if (!videoId) {
    return null;
  }

  return (
    <Card
      component="article"
      itemScope
      itemType="https://schema.org/VideoObject"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      {/* Miniatura -> lleva a la watch page (/videos/[slug]), donde el
          iframe real está en el HTML server-rendered para que Google lo
          indexe. */}
      <Box
        component={Link}
        href={watchHref}
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9 aspect ratio
          backgroundColor: "black",
          display: "block",
        }}
      >
        <Box
          component="img"
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={`Miniatura del video ${video.title} de Ghost (${video.year})`}
          itemProp="thumbnailUrl"
          loading="lazy"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Play Button Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <IconButton
            component="span"
            aria-label={`Ver video ${video.title}`}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              width: 64,
              height: 64,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <PlayArrow sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          itemProp="name"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          <Link
            href={watchHref}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {video.title}
          </Link>
        </Typography>

        <Typography
          variant="subtitle2"
          component="time"
          itemProp="uploadDate"
          dateTime={`${video.year}-01-01`}
          sx={{
            color: "text.secondary",
            mb: 1,
            fontWeight: "medium",
          }}
        >
          {video.year}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          itemProp="description"
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>

        {/* Metadatos ocultos para SEO */}
        <meta itemProp="contentUrl" content={video.youtube} />
        <meta itemProp="duration" content="PT3M30S" />
        <meta itemProp="genre" content="Theatrical Rock" />
        <div
          itemProp="creator"
          itemScope
          itemType="https://schema.org/MusicGroup"
          style={{ display: "none" }}
        >
          <meta itemProp="name" content="Ghost" />
        </div>
      </CardContent>
    </Card>
  );
}
