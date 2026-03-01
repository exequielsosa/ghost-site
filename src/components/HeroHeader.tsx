"use client";

import { Box, Container, Button, Typography, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HeroHeader() {
  const t = useTranslations("heroHeader");

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "700px", sm: "600px", md: "700px" },
        overflow: "hidden",
        mb: 6,
        backgroundImage: "url('/images/home_image2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%)",
          zIndex: 2,
        },
      }}
    >
      {/* Content - Positioned at bottom */}
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: {
            xs: "flex-start",
            sm: "space-between",
            md: "space-between",
          },
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 3,
          py: { xs: 2, sm: 5, md: 4 },
          gap: { xs: 3, sm: 0, md: 0 },
        }}
      >
        {/* Welcome Subtitle */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
            color: "#ffffff",
            fontFamily: "var(--font-crimson-text)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            mb: { xs: 2, sm: 6, md: 6 },
            maxWidth: "700px",
            opacity: 0.95,
            animation: "fadeIn 0.8s ease-out",
            flex: { xs: 0, sm: 0, md: 0 },
            background: "rgba(0, 0, 0, 0.4)",
            padding: { xs: "0.5rem", sm: "1rem", md: "1rem" },
            borderRadius: "0.5rem",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 0.95 },
            },
          }}
        >
          {t("welcome")}
        </Typography>

        {/* Spacer to push buttons down */}
        <Box sx={{ flex: 1 }} />

        {/* Stats & Buttons Container */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 2, sm: 1, md: 1 },
          }}
        >
          {/* Stats */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3, md: 3 }}
            sx={{
              display: { xs: "none", sm: "flex", md: "flex" },
              justifyContent: "center",
              width: "fit-content",
              animation: "fadeIn 0.8s ease-out 0.1s both",
              background: "rgba(0, 0, 0, 0.3)",
              padding: { xs: "0.5rem", sm: "1rem", md: "1rem" },
              borderRadius: "0.5rem",
            }}
          >
            {[
              { label: t("statsAlbums"), value: "8" },
              { label: t("statsGrammys"), value: "3+" },
              { label: t("statsTours"), value: "2024-26" },
            ].map((stat, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  px: { xs: 1, md: 2 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 700,
                    color: "primary.light",
                    fontFamily: "var(--font-cormorant)",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", md: "0.9rem" },
                    color: "#ffffff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2 }}
            sx={{
              animation: "fadeIn 0.8s ease-out 0.2s both",
              width: "100%",
              justifyContent: "center",
              maxWidth: "500px",
            }}
          >
            <Button
              component={Link}
              href="/noticias"
              variant="contained"
              sx={{
                px: { xs: 2, md: 2.5 },
                py: { xs: 0.8, md: 1 },
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                transition: "all 0.3s ease",
                flex: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {t("ctaNews")}
            </Button>

            <Button
              component={Link}
              href="/discography"
              variant="outlined"
              sx={{
                px: { xs: 2, md: 2.5 },
                py: { xs: 0.8, md: 1 },
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderColor: "primary.light",
                color: "primary.light",
                transition: "all 0.3s ease",
                flex: 1,
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(255, 0, 100, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {t("ctaDiscography")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
