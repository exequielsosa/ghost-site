// This file is a server component, so 'use client' should not be present.
// Removing 'use client' to allow for export of generateMetadata.

// "use client"; // This line is being removed
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("lineups");

  const title = `${t("members")} | Ghost`;
  const description = t("membersSubtitle");
  const keywords = [
    "Ghost",
    "miembros",
    "members",
    "músicos Ghost",
    "Tobias Forge",
    "Ghouls",
    "nameless ghouls",
    "banda Ghost",
    "metal",
    "bandas metal",
    "historia Ghost",
    "Tobias Forge",
    "Tobias Jens Forge",
    "Papa Emeritus",
    "Papa Emeritus I",
    "Papa Emeritus II",
    "Papa Emeritus III",
    "Papa Emeritus IV",
    "Cardinal Copia",
    "Nameless Ghouls",
    "Ghost members",
    "miembros Ghost",
    "ghouls Ghost",
    "chronology Ghost",
    "timeline Ghost",
    "evolución Ghost",
    "formaciones Ghost",
    "cambios de formación",
    "historia de Ghost 2006-2025",
    "20 años Ghost",
    "dos décadas Ghost",
    "Alfa Leduc",
    "Omega Ghost",
    "Cirrus Ghost",
    "Water Ghost",
    "Fire Ghost",
    "Air Ghost",
    "Shadow Ghost",
    "Dew Ghost",
    "Phantom Ghost",
    "banda Ghost",
    "Ghost banda sueca",
    "Ghost music",
    "Ghost band members",
    "Ghost official",
    "Ghost real members",
    "who is Ghost",
    "identidad Ghost",
    "Papa Emeritus identity",
    "Tobias Forge Ghost",
    "Ghost founder",
    "Ghost mastermind",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/miembros",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/banners/members.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Miembros de Ghost - Todos los músicos de la banda"
              : "Ghost Members - All musicians in the band",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/members.jpg"],
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: "/miembros",
      languages: {
        es: "/miembros",
        en: "/miembros",
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

import { Typography, Box, Grid, Card, CardContent, Chip } from "@mui/material";
import { useTranslations, useLocale } from "next-intl";
import { BilingualText } from "@/types";
import membersData from "@/constants/members.json";
import ghoulsData from "@/constants/ghouls.json";
import Breadcrumb from "@/components/Breadcrumb";

type Member = {
  id: string;
  name: string;
  fullName: { es: string; en: string };
  nickname?: { es: string; en: string };
  period: { es: string; en: string };
  instruments: { es: string[]; en: string[] };
  role: { es: string; en: string };
  albums?: string[];
  otherProjects?: { es: string[]; en: string[] };
  biography?: { es: string; en: string };
  image?: string;
  birthYear?: number | null;
  deathYear?: number;
  country: { es: string; en: string };
  ghouls_era?: number;
};
import Image from "next/image";
import Link from "next/link";
import RandomSectionBanner from "@/components/NewsBanner";

export default function MembersPage() {
  const t = useTranslations("lineups");
  const tb = useTranslations("breadcrumb");
  const locale = useLocale() as "es" | "en";

  const currentMembers = Object.values(membersData.members) as Member[];

  const ghoulsEra1 = Object.values(ghoulsData.ghouls_era1 || {}) as Member[];
  const ghoulsEra2 = Object.values(ghoulsData.ghouls_era2 || {}) as Member[];
  const ghoulsEra3 = Object.values(ghoulsData.ghouls_era3 || {}) as Member[];

  const getLocalizedText = (text: BilingualText): string => {
    if (!text || typeof text !== "object") return "";
    return text[locale] || text.es || "";
  };

  const MemberCard = ({ member }: { member: Member }) => (
    <Card
      component={Link}
      href={`/miembros/${member.id}`}
      sx={{
        height: "100%",
        textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Image
          src={member.image ?? "/images/default.jpg"}
          alt={member.name}
          width={200}
          height={200}
          style={{ borderRadius: "16px", objectFit: "cover" }}
        />

        <Typography variant="h5" component="h3" gutterBottom>
          {member.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {member.nickname && getLocalizedText(member.nickname)}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {member.instruments[locale]?.join(", ") ||
            member.instruments.es?.join(", ")}
        </Typography>

        <Chip
          label={getLocalizedText(member.period)}
          color={member.id === "tobias-forge" ? "primary" : "default"}
          size="small"
          sx={{ mb: 1 }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {getLocalizedText(member.role)}
        </Typography>

        {member.birthYear && member.deathYear && (
          <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
            {`${member.birthYear} - ${member.deathYear}`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ContainerGradientNoPadding>
      <Box pt={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} pb={{ xs: 0, md: 0 }}>
        <Breadcrumb items={[{ label: tb("members") }]} />
      </Box>
      <Box display={"flex"} justifyContent={"center"} width="100%" px={2}>
        <Box maxWidth={"1350px"} sx={{ pt: 4, pb: 2 }}>
          {/* Header */}
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontSize: { xs: 28, md: 48 } }}
              fontWeight={600}
            >
              {t("members")}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={500}
              sx={{ mx: "auto", fontSize: { xs: 16, md: 20 } }}
            >
              {t("meet")}
            </Typography>
          </Box>

          {/* Current Members */}
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontSize: { xs: 20, md: 30 } }}
            >
              {t("currentLineup")}
            </Typography>

            <Grid container spacing={3}>
              {currentMembers.map((member) => (
                <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MemberCard member={member} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Ghouls Era I */}
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontSize: { xs: 20, md: 30 } }}
            >
              {locale === "es" ? "Ghouls Era I" : "Ghouls Era I"}
            </Typography>

            <Grid container spacing={3}>
              {ghoulsEra1.map((member) => (
                <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MemberCard member={member} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Ghouls Era II */}
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontSize: { xs: 20, md: 30 } }}
            >
              {locale === "es" ? "Ghouls Era II" : "Ghouls Era II"}
            </Typography>

            <Grid container spacing={3}>
              {ghoulsEra2.map((member) => (
                <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MemberCard member={member} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Ghouls Era III */}
          <Box>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontSize: { xs: 20, md: 30 } }}
            >
              {locale === "es" ? "Ghouls Era III" : "Ghouls Era III"}
            </Typography>

            <Grid container spacing={3}>
              {ghoulsEra3.map((member) => (
                <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MemberCard member={member} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box mb={4}>
        <RandomSectionBanner currentSection="members" />
      </Box>
    </ContainerGradientNoPadding>
  );
}
