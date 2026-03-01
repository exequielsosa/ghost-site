import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container, Typography, Box } from "@mui/material";
import Breadcrumb from "@/components/Breadcrumb";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "es" | "en";

  const title =
    locale === "es"
      ? "Política de Privacidad | Ghost Argentina"
      : "Privacy Policy | Ghost Argentina";
  const description =
    locale === "es"
      ? "Política de privacidad del fan site Ghost Argentina. Información sobre cómo manejamos tus datos."
      : "Privacy policy for Ghost Argentina fan site. Information about how we handle your data.";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: "/privacidad",
      languages: { es: "/privacidad", en: "/privacidad" },
    },
  };
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const tb = useTranslations("breadcrumb");
  return (
    <ContainerGradientNoPadding>
      <Box pt={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} pb={{ xs: 0, md: 0 }}>
        <Breadcrumb items={[{ label: tb("privacy") }]} />
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
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            {t("body")}
          </Typography>
        </Box>
      </Container>
    </ContainerGradientNoPadding>
  );
}
