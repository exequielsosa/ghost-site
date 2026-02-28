import { useTranslations } from "next-intl";
import { Container, Typography, Box, Button } from "@mui/material";
import Breadcrumb from "@/components/Breadcrumb";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("contact");

  const titleByLocale = {
    es: `${t("title")} | Ghost Argentina`,
    en: `${t("title")} | Ghost Argentina`,
  };

  const descriptionByLocale = {
    es: "Ponte en contacto con Ghost Argentina. Envíanos tus comentarios, sugerencias o consultas sobre el sitio web no oficial de fans de Ghost.",
    en: "Get in touch with Ghost Argentina. Send us your comments, suggestions or questions about the unofficial Ghost fan website.",
  };

  const keywordsByLocale = {
    es: [
      "Ghost contacto",
      "contactar Ghost Argentina",
      "email Ghost",
      "sugerencias Ghost",
      "comentarios sitio Ghost",
      "fan site contacto",
    ],
    en: [
      "Ghost contact",
      "contact Ghost Argentina",
      "Ghost email",
      "Ghost suggestions",
      "Ghost site comments",
      "fan site contact",
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
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tb = useTranslations("breadcrumb");
  return (
    <ContainerGradientNoPadding>
      <Box pt={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} pb={{ xs: 0, md: 0 }}>
        <Breadcrumb items={[{ label: tb("contact") }]} />
      </Box>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: "auto", py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
        >
          {t("title")}
        </Typography>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            {t("description")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="mailto:ghostargentina77@gmail.com"
            sx={{ fontWeight: 600 }}
          >
            {t("emailButton")}
          </Button>
        </Box>
      </Container>
    </ContainerGradientNoPadding>
  );
}
