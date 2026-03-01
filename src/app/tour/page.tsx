import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { tourDates } from "@/constants/tourDates";
import TourClient from "./TourClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "es" | "en";

  const title =
    locale === "es"
      ? "Gira Ghost 2024-2026 | Fechas de Conciertos"
      : "Ghost Tour 2024-2026 | Concert Dates";
  const description =
    locale === "es"
      ? "Fechas de conciertos de Ghost en 2024, 2025 y 2026. Tour mundial, próximos shows, locaciones y entradas."
      : "Ghost concert dates 2024, 2025 and 2026. World tour, upcoming shows, venues and tickets.";

  const keywords = [
    "Ghost", "tour", "gira", "conciertos", "concerts",
    "Ghost tour 2024", "Ghost tour 2025", "Ghost tour 2026",
    "Ghost shows", "Ghost live", "Ghost Argentina",
    "fechas de conciertos", "concert dates", "tour dates",
    "theatrical rock", "pop metal", "Ghost band",
    "Tobias Forge", "Ghost band Argentina",
    "entradas Ghost", "Ghost tickets", "Ghost latinoamérica",
  ].join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/tour",
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
      canonical: "/tour",
      languages: { es: "/tour", en: "/tour" },
    },
    robots: { index: true, follow: true },
  };
}

export default async function TourPage() {
  const locale = (await getLocale()) as "es" | "en";

  // Generar JSON-LD EventSeries con próximos conciertos
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingShows = tourDates
    .filter((show) => new Date(show.date) >= today)
    .slice(0, 10); // Top 10 próximos

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: locale === "es" ? "Gira Ghost 2024-2026" : "Ghost Tour 2024-2026",
    description:
      locale === "es"
        ? "Tour mundial de Ghost con fechas en Argentina y Latinoamérica"
        : "Ghost world tour with dates in Argentina and Latin America",
    organizer: {
      "@type": "Organization",
      name: "Ghost",
      url: "https://ghostsweden.com",
    },
    event: upcomingShows.map((show) => ({
      "@type": "Event",
      name: `Ghost @ ${show.venue}`,
      description: `Ghost concert in ${show.city}, ${show.country}`,
      startDate: new Date(show.date).toISOString(),
      endDate: new Date(show.date).toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: show.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: show.city,
          addressCountry: show.country,
        },
      },
      offers: {
        "@type": "Offer",
        url: show.ticketLink,
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      performer: {
        "@type": "MusicGroup",
        name: "Ghost",
        url: "https://ghostsweden.com",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <TourClient />
    </>
  );
}
