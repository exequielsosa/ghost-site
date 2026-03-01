import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import FAQClient from "./FAQClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "es" | "en";

  const title =
    locale === "es"
      ? "Preguntas Frecuentes | Ghost Argentina"
      : "FAQ | Ghost Argentina";
  const description =
    locale === "es"
      ? "Preguntas frecuentes sobre el fan site de Ghost Argentina. Información sobre la banda, gira, contacto y más."
      : "Frequently asked questions about Ghost Argentina fan site. Band info, tour dates, contact and more.";

  const keywords = [
    "Ghost", "FAQ", "preguntas frecuentes", "Ghost Argentina",
    "Ghost band", "Ghost fan site", "theatrical rock",
    "Tobias Forge", "Papa Emeritus", "Nameless Ghouls",
    "Ghost tour", "Ghost gira", "Ghost contacto",
  ].join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/faq",
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: "/faq",
      languages: { es: "/faq", en: "/faq" },
    },
    robots: { index: true, follow: true },
  };
}

export default async function FAQPage() {
  const t = await getTranslations("faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("q1"),
        acceptedAnswer: { "@type": "Answer", text: t("a1") },
      },
      {
        "@type": "Question",
        name: t("q2"),
        acceptedAnswer: { "@type": "Answer", text: t("a2") },
      },
      {
        "@type": "Question",
        name: t("q3"),
        acceptedAnswer: { "@type": "Answer", text: t("a3") },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQClient />
    </>
  );
}
