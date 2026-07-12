"use client";

import { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import AnimatedCounter from "./AnimatedCounter";

interface SectionLink {
  label: string;
  href: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const sectionLinks: { [key: string]: SectionLink[] } = {
  es: [
    { label: "Noticias", href: "/noticias" },
    { label: "Discografía", href: "/discography" },
    { label: "DVDs", href: "/dvds" },
    { label: "Historia", href: "/historia" },
    { label: "Papas y formaciones", href: "/papas" },
    { label: "Miembros", href: "/miembros" },
    { label: "Entrevistas", href: "/entrevistas" },
    { label: "Videos", href: "/videos" },
    { label: "Letras de canciones con traducción al español", href: "/songs" },
  ],
  en: [
    { label: "News", href: "/noticias" },
    { label: "Discography", href: "/discography" },
    { label: "DVDs", href: "/dvds" },
    { label: "History", href: "/historia" },
    { label: "Popes and lineups", href: "/papas" },
    { label: "Members", href: "/miembros" },
    { label: "Interviews", href: "/entrevistas" },
    { label: "Videos", href: "/videos" },
    { label: "Song lyrics with Spanish translation", href: "/songs" },
  ],
};

function PresentationSectionsLinks({
  text,
  locale,
}: {
  text: string;
  locale: string;
}) {
  const links = sectionLinks[locale === "es" ? "es" : "en"];
  const content: React.ReactNode[] = [];
  let lastIndex = 0;

  // Find "Secciones:" prefix
  const seccionesIndex = text.indexOf("Secciones:");
  if (seccionesIndex === -1) return <>{text}</>;

  content.push(text.substring(0, seccionesIndex + 10)); // "Secciones: "
  const remainingText = text.substring(seccionesIndex + 10);

  links.forEach((link, index) => {
    const linkIndex = remainingText.indexOf(link.label);
    if (linkIndex !== -1) {
      // Add text before link
      if (linkIndex > lastIndex) {
        content.push(remainingText.substring(lastIndex, linkIndex));
      }
      // Add link
      content.push(
        <Link
          key={`link-${index}`}
          href={link.href}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {link.label}
        </Link>,
      );
      lastIndex = linkIndex + link.label.length;
    }
  });

  // Add remaining text
  if (lastIndex < remainingText.length) {
    content.push(remainingText.substring(lastIndex));
  }

  return <>{content}</>;
}

function TabBackground({
  src,
  alt,
  overlay,
  priority = false,
  position = "center",
}: {
  src: string;
  alt: string;
  overlay: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1440px) 100vw, 1440px"
        style={{ objectFit: "cover", objectPosition: position, zIndex: 0 }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlay,
          zIndex: 1,
        }}
      />
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`hero-tabpanel-${index}`}
      aria-labelledby={`hero-tab-${index}`}
      {...other}
    >
      <Box
        sx={{
          borderRadius: 0,
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

// Línea de papados de Ghost (personajes interpretados por Tobias Forge), en
// orden cronológico. Períodos reales de src/constants/lineups.json.
const featuredPopes = [
  { name: "Papa Emeritus I", role: { es: "2010–2012", en: "2010–2012" } },
  { name: "Papa Emeritus II", role: { es: "2012–2015", en: "2012–2015" } },
  { name: "Papa Emeritus III", role: { es: "2015–2017", en: "2015–2017" } },
  { name: "Cardinal Copia", role: { es: "2018–2020", en: "2018–2020" } },
  { name: "Papa Emeritus IV", role: { es: "2020–2023", en: "2020–2023" } },
  {
    name: "Papa V Perpetua",
    role: { es: "2025–presente", en: "2025–present" },
  },
];

// Miembros reales de Ghost: Tobias Forge y los Nameless Ghouls.
const featuredMembers = [
  {
    name: "Tobias Forge",
    role: {
      es: "Fundador, voz y compositor",
      en: "Founder, vocals and songwriter",
    },
  },
  {
    name: "Nameless Ghouls",
    role: {
      es: "Músicos enmascarados de la banda",
      en: "The band's masked musicians",
    },
  },
  {
    name: "Ghouls Era I, II, III",
    role: {
      es: "Formaciones a través de los años",
      en: "Lineups through the years",
    },
  },
];

// Top 5 canciones de Ghost por veces tocadas en vivo (datos reales de setlist.fm).
const topSongs = [
  { title: "Ritual", plays: 886 },
  { title: "Year Zero", plays: 818 },
  { title: "Cirice", plays: 644 },
  { title: "Con Clavi Con Dio", plays: 637 },
  { title: "Mummy Dust", plays: 614 },
];

// Autoplay del Hero: 6 tabs (Presentación, Noticias, Historia, Canciones,
// Papas, Miembros), rota cada 8 segundos.
const TABS_COUNT = 6;
const AUTOPLAY_INTERVAL_MS = 8000;

export default function HeroTabs() {
  const t = useTranslations("heroTabs");
  const locale = useLocale() as "es" | "en";
  const [activeTab, setActiveTab] = useState(0);
  // Las animaciones de entrada (fadeIn) corren una sola vez, al montar en el
  // cliente. Mientras `mounted` es false (SSR + primer paint) quedan pausadas
  // en su primer frame (opacity 0), así el fade no se dispara en el HTML del
  // server y NO se reinicia al hidratar / al cargar la imagen. Sigue viéndose
  // el fade in elegante en la carga, pero sin parpadeo.
  const [mounted, setMounted] = useState(false);
  // Autoplay en pausa mientras el usuario tiene el mouse encima o el foco de
  // teclado dentro del Hero (para no cambiarle el contenido mientras lee).
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Autoplay: rota al siguiente tab cada AUTOPLAY_INTERVAL_MS. Se reinicia cada
  // vez que activeTab cambia (auto o por click manual), se detiene con hover o
  // foco de teclado, y no arranca si el usuario prefiere menos movimiento.
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS_COUNT);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [activeTab, isPaused]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        maxWidth: 1440,
        ...(!mounted && {
          "& *": { animationPlayState: "paused !important" },
        }),
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Titulo y descripcion */}
      <Stack spacing={3} alignItems="start" sx={{ mb: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 32, md: 56 },
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          {t("title")}
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{
            fontSize: { xs: 18, md: 24 },
            color: "text.secondary",
            maxWidth: 1350,
          }}
        >
          {t("subtitle")}
        </Typography>
      </Stack>

      {/* Tabs */}
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", mb: 0, borderRadius: 0 }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="hero sections"
          variant="scrollable"
          scrollButtons={false}
          sx={{
            borderRadius: 0,
            "& .MuiTab-root": {
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              px: { xs: 1, md: 3 },
              borderRadius: 0,
            },
          }}
        >
          <Tab
            label={t("tabs.presentation")}
            id="hero-tab-0"
            aria-controls="hero-tabpanel-0"
          />
          <Tab
            label={t("tabs.news")}
            id="hero-tab-1"
            aria-controls="hero-tabpanel-1"
          />
          <Tab
            label={t("tabs.history")}
            id="hero-tab-2"
            aria-controls="hero-tabpanel-2"
          />
          <Tab
            label={t("tabs.songs")}
            id="hero-tab-3"
            aria-controls="hero-tabpanel-3"
          />
          <Tab
            label={t("tabs.popes")}
            id="hero-tab-4"
            aria-controls="hero-tabpanel-4"
          />
          <Tab
            label={t("tabs.members")}
            id="hero-tab-5"
            aria-controls="hero-tabpanel-5"
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}

      {/* Tab 0: Presentación */}
      <TabPanel value={activeTab} index={0}>
        <Box
          sx={{
            borderRadius: "0px 0px 8px 8px",
            p: { xs: 1, md: 4 },
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabBackground
            src="/images/tabs/presentacion.jpg"
            alt={t("imageAlt.presentation")}
            overlay="rgba(0, 0, 0, 0.75)"
            priority
          />
          <Stack
            spacing={6}
            sx={{
              width: "100%",
              position: "relative",
              zIndex: 2,
              marginTop: "auto",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 14, md: 18 },
                lineHeight: 1.8,
                color: "#fff",
                animation: `${fadeIn} 0.6s ease-in`,
              }}
            >
              {t("content.presentation")}
            </Typography>

            {/* Stats como boxes independientes */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 2, md: 3 },
              }}
            >
              {[
                { end: 80, label: t("stats.songs"), suffix: "+" },
                { end: 6, label: t("stats.albums") },
                { end: 6, label: t("stats.eras") },
                { end: 20, label: t("stats.years"), suffix: "+" },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    p: { xs: 1.5, md: 3 },
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    animation: `${fadeIn} 0.6s ease-in`,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 18, md: 32 },
                      fontWeight: 700,
                      color: "primary.main",
                      mb: 1,
                      animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                    }}
                  >
                    <AnimatedCounter end={stat.end} />
                    {stat.suffix && (
                      <span style={{ fontSize: "0.8em" }}>{stat.suffix}</span>
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#fff",
                      animation: `${fadeIn} 0.6s ease-in 0.4s both`,
                      textAlign: "center",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  color: "#fff",
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                <PresentationSectionsLinks
                  text={t("content.presentationSections")}
                  locale={locale}
                />
              </Typography>
            </Box>
          </Stack>
        </Box>
      </TabPanel>

      {/* Tab 1: Noticias */}
      <TabPanel value={activeTab} index={1}>
        <Box
          sx={{
            borderRadius: "0px 0px 8px 8px",
            p: { xs: 1, md: 4 },
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabBackground
            src="/images/tabs/noticias.jpg"
            alt={t("imageAlt.news")}
            overlay="rgba(0, 0, 0, 0.55)"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              zIndex: 2,
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "7fr 3fr" },
                gap: { xs: 3, md: 4 },
                marginTop: "auto",
              }}
            >
              <Stack spacing={3}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: 14, md: 18 },
                    lineHeight: 1.8,
                    color: "#fff",
                    animation: `${fadeIn} 0.6s ease-in`,
                  }}
                >
                  {t("content.news")}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/noticias"
                  sx={{
                    alignSelf: "flex-start",
                    animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                    textAlign: "center",
                  }}
                >
                  {t("buttons.viewNews")}
                </Button>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: { xs: 2, md: 3 },
                }}
              >
                <Box
                  sx={{
                    p: { xs: 1.5, md: 3 },
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(0, 0, 0, 0.35)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "120px",
                    transition: "all 0.3s ease",
                    animation: `${fadeIn} 0.6s ease-in`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 18, md: 32 },
                      fontWeight: 700,
                      color: "primary.main",
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    {t("stats.newsWeeklyTitle")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#fff",
                      animation: `${fadeIn} 0.6s ease-in 0.4s both`,
                      textAlign: "center",
                    }}
                  >
                    {t("stats.newsWeekly")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: { xs: 1.5, md: 3 },
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(0, 0, 0, 0.35)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "120px",
                    transition: "all 0.3s ease",
                    animation: `${fadeIn} 0.6s ease-in`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 18, md: 32 },
                      fontWeight: 700,
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    <AnimatedCounter end={100} />
                    <span style={{ fontSize: "0.8em" }}>%</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#fff",
                      animation: `${fadeIn} 0.6s ease-in 0.4s both`,
                      textAlign: "center",
                    }}
                  >
                    {t("stats.newsGhost")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 2: Historia */}
      <TabPanel value={activeTab} index={2}>
        <Box
          sx={{
            borderRadius: "0px 0px 8px 8px",
            p: { xs: 1, md: 4 },
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "500px",
          }}
        >
          <TabBackground
            src="/images/tabs/historia.jpg"
            alt={t("imageAlt.history")}
            overlay="rgba(0, 0, 0, 0.45)"
          />
          <Stack
            spacing={3}
            sx={{
              width: "100%",
              position: "relative",
              zIndex: 2,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 2, md: 3 },
              }}
            >
              {[
                { end: 20, label: t("stats.activeYears"), suffix: "+" },
                { end: 6, label: t("stats.studioAlbums") },
                { end: 20, label: t("stats.historicGhouls"), suffix: "+" },
                { end: 1, label: t("stats.grammy") },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    p: { xs: 1.5, md: 3 },
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(0, 0, 0, 0.35)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    animation: `${fadeIn} 0.6s ease-in`,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 18, md: 32 },
                      fontWeight: 700,
                      color: "primary.main",
                      mb: 1,
                      animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                    }}
                  >
                    <AnimatedCounter end={stat.end} />
                    {stat.suffix && (
                      <span style={{ fontSize: "0.8em" }}>{stat.suffix}</span>
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#fff",
                      animation: `${fadeIn} 0.6s ease-in 0.4s both`,
                      textAlign: "center",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 14, md: 18 },
                lineHeight: 1.8,
                color: "#fff",
                animation: `${fadeIn} 0.6s ease-in`,
              }}
            >
              {t("content.history")}
            </Typography>

            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/historia"
              sx={{
                alignSelf: "flex-start",
                animation: `${fadeIn} 0.6s ease-in 0.2s both`,
              }}
            >
              {t("buttons.viewHistory")}
            </Button>
          </Stack>
        </Box>
      </TabPanel>

      {/* Tab 3: Canciones */}
      <TabPanel value={activeTab} index={3}>
        <Box
          sx={{
            borderRadius: "0px 0px 8px 8px",
            p: { xs: 1, md: 4 },
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "500px",
          }}
        >
          <TabBackground
            src="/images/tabs/canciones.jpg"
            alt={t("imageAlt.songs")}
            overlay="rgba(0, 0, 0, 0.65)"
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "7fr 3fr" },
              gap: { xs: 3, md: 4 },
              marginTop: "auto",
              width: "100%",
              position: "relative",
              zIndex: 2,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: 14, md: 18 },
                  lineHeight: 1.8,
                  color: "#fff",
                  animation: `${fadeIn} 0.6s ease-in`,
                }}
              >
                {t("content.songs")}
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/songs"
                sx={{
                  alignSelf: "flex-start",
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                {t("buttons.viewSongs")}
              </Button>
            </Stack>

            <Box
              sx={{
                p: { xs: 1.5, md: 3 },
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "auto",
                transition: "all 0.3s ease",
                animation: `${fadeIn} 0.6s ease-in`,
                textAlign: "center",
                mx: "auto",
                gap: 1,
                width: "100%",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 11, md: 12 },
                  color: "#fff",
                  fontWeight: 600,
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                {t("topSongs")}
              </Typography>

              {topSongs.map((song, index) => (
                <Box key={song.title} sx={{ width: "100%" }}>
                  {index > 0 && (
                    <Box
                      sx={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        my: 0.75,
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      animation: `${fadeIn} 0.6s ease-in ${0.4 + index * 0.2}s both`,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 10, md: 11 },
                        color: "primary.main",
                        fontWeight: 700,
                        mb: 0.2,
                      }}
                    >
                      {index + 1}. {song.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 8, md: 9 },
                        color: "#ccc",
                      }}
                    >
                      {song.plays} {t("timesPlayed")}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 4: Papas */}
      <TabPanel value={activeTab} index={4}>
        <Box
          sx={{
            borderRadius: "0px 0px 8px 8px",
            p: { xs: 1, md: 4 },
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "500px",
          }}
        >
          <TabBackground
            src="/images/tabs/papas.jpg"
            alt={t("imageAlt.popes")}
            overlay="rgba(0, 0, 0, 0.55)"
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "7fr 3fr" },
              gap: { xs: 3, md: 4 },
              marginTop: "auto",
              width: "100%",
              position: "relative",
              zIndex: 2,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: 14, md: 18 },
                  lineHeight: 1.8,
                  color: "#fff",
                  animation: `${fadeIn} 0.6s ease-in`,
                }}
              >
                {t("content.popes")}
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/papas"
                sx={{
                  alignSelf: "flex-start",
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                {t("buttons.viewPopes")}
              </Button>
            </Stack>

            <Box
              sx={{
                p: { xs: 1.5, md: 3 },
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "120px",
                transition: "all 0.3s ease",
                animation: `${fadeIn} 0.6s ease-in`,
                textAlign: "center",
                mx: "auto",
                gap: 1,
                width: "100%",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 11, md: 12 },
                  color: "#fff",
                  fontWeight: 600,
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                {t("featuredPopes")}
              </Typography>

              {featuredPopes.map((pope, index) => (
                <Box key={pope.name} sx={{ width: "100%" }}>
                  {index > 0 && (
                    <Box
                      sx={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        my: 0.75,
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      animation: `${fadeIn} 0.6s ease-in ${0.4 + index * 0.2}s both`,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 13 },
                        color: "primary.main",
                        fontWeight: 700,
                        mb: 0.2,
                      }}
                    >
                      {pope.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 9, md: 10 },
                        color: "#ccc",
                      }}
                    >
                      {pope.role[locale]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 5: Miembros */}
      <TabPanel value={activeTab} index={5}>
        <Box
          sx={{
            borderRadius: "0px 0px 8px 8px",
            p: { xs: 1, md: 4 },
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "500px",
          }}
        >
          <TabBackground
            src="/images/tabs/miembros.jpg"
            alt={t("imageAlt.members")}
            overlay="rgba(0, 0, 0, 0.55)"
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "7fr 3fr" },
              gap: { xs: 3, md: 4 },
              marginTop: "auto",
              width: "100%",
              position: "relative",
              zIndex: 2,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: 14, md: 18 },
                  lineHeight: 1.8,
                  color: "#fff",
                  animation: `${fadeIn} 0.6s ease-in`,
                }}
              >
                {t("content.members")}
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/miembros"
                sx={{
                  alignSelf: "flex-start",
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                {t("buttons.viewMembers")}
              </Button>
            </Stack>

            <Box
              sx={{
                p: { xs: 1.5, md: 3 },
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "120px",
                transition: "all 0.3s ease",
                animation: `${fadeIn} 0.6s ease-in`,
                textAlign: "center",
                mx: "auto",
                gap: 1,
                width: "100%",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 11, md: 12 },
                  color: "#fff",
                  fontWeight: 600,
                  animation: `${fadeIn} 0.6s ease-in 0.2s both`,
                }}
              >
                {t("featuredMembers")}
              </Typography>

              {featuredMembers.map((member, index) => (
                <Box key={member.name} sx={{ width: "100%" }}>
                  {index > 0 && (
                    <Box
                      sx={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        my: 0.75,
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      animation: `${fadeIn} 0.6s ease-in ${0.4 + index * 0.2}s both`,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 13 },
                        color: "primary.main",
                        fontWeight: 700,
                        mb: 0.2,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 9, md: 10 },
                        color: "#ccc",
                      }}
                    >
                      {member.role[locale]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </TabPanel>
    </Container>
  );
}
