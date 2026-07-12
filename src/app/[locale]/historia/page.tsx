import { Metadata } from "next";
import HistoriaClient from "./HistoriaClient";
import { getLocale, getTranslations } from "next-intl/server";
import ContainerGradientNoPadding from "@/components/atoms/ContainerGradientNoPadding";

import { i18nAlternates } from "@/utils/i18nAlternates";
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("historyPage");

  return {
    title: `${t("title")} | Ghost`,
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: `${t("title")} | Ghost`,
      description: t("description"),
      type: "article",
      images: [
        {
          url: "/images/banners/history.jpg",
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | Ghost`,
      description: t("description"),
      images: ["/images/banners/history.jpg"],
    },
    alternates: i18nAlternates("/historia", locale),
  };
}

export default function HistoriaPage() {
  return (
    <ContainerGradientNoPadding>
      <HistoriaClient />
    </ContainerGradientNoPadding>
  );
}
