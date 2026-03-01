"use client";

import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { useTranslations, useLocale } from "next-intl";
import ContainerGradient from "../components/atoms/ContainerGradient";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import ArticleCard from "./ArticleCard";
import QuickAccessGrid from "./QuickAccessGrid";
import TopSongsWidget from "./TopSongsWidget";
import UpcomingToursWidget from "./UpcomingToursWidget";
import { NewsArticle } from "@/types/news";
import Link from "next/link";
import RandomSectionBanner from "./NewsBanner";
import SiteUpdatesBanner from "./SiteUpdatesBanner";
import siteUpdatesData from "@/constants/site-updates.json";
import LastShowsCards from "./LastShowsCards";
import HeroHeader from "./HeroHeader";
// import FeaturedReviewBanner from "./FeaturedReviewBanner";
// import ArgentinaConcertBanner from "./ArgentinaConcertBanner";
// import { slugify } from "@/utils/slugify";

export default function Hero({ latestNews }: { latestNews: NewsArticle[] }) {
  // const t = useTranslations("hero");
  // const tAlbum = useTranslations("album");
  const tNews = useTranslations("news");
  // const tIntro = useTranslations("heroIntro");
  const locale = useLocale() as "es" | "en";

  return (
    <ContainerGradient>
      <Container
        maxWidth={false}
        sx={{ maxWidth: 1440, mx: "auto", px: { xs: 2, sm: 3 } }}
      >
        <HeroHeader />

        {/* Banner de concierto en Argentina */}
        {/* <Box mt={4}>
          <ArgentinaConcertBanner />
        </Box> */}

        {/* <FeaturedReviewBanner /> */}

        {/* Quick Access Grid */}
        <QuickAccessGrid />

        {/* Upcoming Tours & Top Songs - Side by Side */}
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
            mt: 6,
            mb: 4,
            alignItems: "stretch",
          }}
        >
          <UpcomingToursWidget limit={8} />
          <TopSongsWidget />
        </Box>

        {/* Banner de actualizaciones del sitio */}
        {siteUpdatesData.length > 0 && (
          <Box sx={{ width: "100%", mb: 4 }}>
            <SiteUpdatesBanner updates={siteUpdatesData} />
          </Box>
        )}

        {/* Cards de últimos shows */}
        <Box sx={{ width: "100%" }} pt={3}>
          <LastShowsCards />
        </Box>

        {/* Sección de últimas noticias - Solo mostrar si hay noticias */}
        {latestNews.length > 0 && (
          <>
            <Divider sx={{ mt: 8, mb: 4, width: "100%" }} />

            <Typography
              variant="h2"
              sx={{ fontSize: { xs: 28, md: 48 }, mb: 4, mt: 4 }}
            >
              {tNews("latestNews")}
            </Typography>

            {latestNews.map((article: NewsArticle) => (
              <Box key={article.id}>
                <ArticleCard
                  title={
                    article.title?.[locale] ||
                    (locale === "es" ? "Noticia sin título" : "Untitled news")
                  }
                  description={article.description?.[locale] || ""}
                  imageUrl={article.imageUrl}
                  imageAlt={article.imageAlt?.[locale]}
                  imageCaption={article.imageCaption?.[locale]}
                  publishedDate={article.publishedDate}
                  linkUrl={article.linkUrl}
                  linkTarget={article.linkTarget}
                  youtubeVideoId={article.youtubeVideoId}
                  externalLinks={article.externalLinks?.map((link) => ({
                    url: link.url,
                    text: link.text[locale],
                  }))}
                />
                <Divider sx={{ my: 6, width: "100%" }} />
              </Box>
            ))}

            {/* Botón para ver todas las noticias */}
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <Button
                component={Link}
                href="/noticias"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 16, md: 18 },
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {tNews("viewAllNews")}
              </Button>
            </Box>

            <RandomSectionBanner currentSection="news" />
          </>
        )}
      </Container>
    </ContainerGradient>
  );
}
