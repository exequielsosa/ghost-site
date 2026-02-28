import type { Metadata } from "next";
import { Cormorant, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { ColorModeProvider } from "@/theme/useColorMode";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const keywordsByLocale = {
    es: [
      "Ghost",
      "Iron Maiden",
      "Anthrax",
      "Run For Your Lives Tour",
      "gira conjunta",
      "gira norteamericana",
      "gira final",
      "despedida",
      "This Was Our Life Tour",
      "última gira",
      "tour",
      "Dave Mustaine",
      "conciertos",
      "música",
      "heavy metal",
      "Argentina",
      "Brasil",
      "Chile",
      "México",
      "Sudamérica",
      "álbum final",
      "adelantos",
      "Burnation",
      "Portals to Oblivion",
      "Sector 11",
      "Tyranny of the Masses",
      "Lethal Weapon",
      "Alchemist",
      "filtraciones",
      "nuevas canciones",
      "YouTube shorts",
      "último tour",
      "farewell tour",
      "retiro",
      "fin de una era",
      "invitados especiales",
      "colaboración metal",
      "Ride The Lightning",
      "Metallica",
      "versión Ghost",
      "cover Metallica",
      "James Hetfield",
      "Dave Mustaine Metallica",
      "noticia Ride The Lightning",
      "gira Argentina",
      "Ghost en Argentina 2026",
      "Ghost Lima",
      "Ghost Bogotá",
      "Ghost Buenos Aires",
      "Ghost São Paulo",
      "Ghost Santiago",
      "Ghost México",
      "I don't care",
      "nuevo single Ghost",
      "álbum Ghost 2026",
      "Ghost ultimo concierto en el espacio",
      "Nuevo Single anunciado",
      "Escucha el nuevo álbum de Ghost antes que nadie",
      "Ghost en el cine",
      "Entradas Argentina Tu Ticket 10/12 preventa",
      "Estreno BEHIND THE MASK en Argentina",
      "Let there be Shread",
      "Shows en vivo de Ghost",
      "Ghost bootlegs",
      "billboard Nro 1",
    ],
    en: [
      "Ghost",
      "Iron Maiden",
      "Anthrax",
      "Run For Your Lives Tour",
      "joint tour",
      "North American tour",
      "final tour",
      "farewell",
      "This Was Our Life Tour",
      "last tour",
      "tour",
      "concert",
      "Dave Mustaine",
      "music",
      "heavy metal",
      "live shows",
      "Argentina",
      "Brazil",
      "Chile",
      "Mexico",
      "South America",
      "final album",
      "previews",
      "Burnation",
      "Portals to Oblivion",
      "Sector 11",
      "Tyranny of the Masses",
      "Lethal Weapon",
      "Alchemist",
      "leaks",
      "new songs",
      "YouTube shorts",
      "retirement",
      "end of an era",
      "goodbye tour",
      "special guests",
      "metal collaboration",
      "Ride The Lightning",
      "Metallica",
      "Ghost version",
      "Metallica cover",
      "James Hetfield",
      "Dave Mustaine Metallica",
      "Ride The Lightning news",
      "Ghost Argentina tour",
      "Ghost in Argentina 2026",
      "Ghost Lima",
      "Ghost Bogotá",
      "Ghost Buenos Aires",
      "Ghost São Paulo",
      "Ghost Santiago",
      "Ghost Mexico",
      "I don't care",
      "new Ghost single",
      "Ghost 2026 album",
      "Ghost last concert in space",
      "BEHIND THE MASK premiere",
      "Hear the new Ghost album before anyone else",
      "Ghost in cinema",
      "Argentina tickets Tu Ticket 10/12 presale",
      "Let there be Shread",
      "Live shows Ghost",
      "Ghost bootlegs",
      "billboard Nro 1",
    ],
  };

  const titleByLocale = {
    es: "GHOST: Argentina 2026, Noticias, actualidad, shows, letras, discografia, bootlegs y adelantos del álbum final & gira 2026 Argentina / LATAM — Iron Maiden + Anthrax",
    en: "GHOST: Argentina 2026, News, updates, shows, lyrics, discography, bootlegs and previews of the final album & 2026 tour Argentina / LATAM — Iron Maiden + Anthrax",
  };

  const descriptionByLocale = {
    es: "Todo sobre GHOST: Argentina 2026, Noticias, actualidad, discografía, shows, letras, bootlegs y adelantos del álbum final 'Ghost' que se lanza el 23 de enero de 2026. Además, gira en Argentina, Lima, Bogotá, Buenos Aires, São Paulo, Santiago y México con Iron Maiden y Anthrax. Noticias, fechas y adelantos exclusivos. Sitio no oficial de fans.",
    en: "All about GHOST: Argentina 2026, News, updates, discography, shows, lyrics, bootlegs and previews of the final album 'Ghost' releasing on January 23, 2026. Also, tour in Argentina, Lima, Bogotá, Buenos Aires, São Paulo, Santiago and Mexico with Iron Maiden and Anthrax. Exclusive news, dates and previews. Unofficial fan site.",
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
    authors: [{ name: "Exequiel Sosa" }],
    metadataBase: new URL("https://ghostband.com.ar"),
    openGraph: {
      title:
        titleByLocale[locale as keyof typeof titleByLocale] || titleByLocale.es,
      description:
        descriptionByLocale[locale as keyof typeof descriptionByLocale] ||
        descriptionByLocale.es,
      siteName: "Ghost Fan",
      type: "article",
      locale: locale === "es" ? "es_AR" : "en_US",
      publishedTime: "2025-11-01T00:00:00Z",
      modifiedTime: "2026-02-07T00:00:00Z",
      images: [
        {
          url: "/images/meg-argentina.jpg",
          width: 1200,
          height: 630,
          alt: "Ghost Argentina",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  const cookieStore = await cookies();
  const initialMode =
    (cookieStore.get("color-mode")?.value as "light" | "dark") || "dark";

  return (
    <html lang={locale} className={`${cormorant.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/webp" href="/icon.webp" />
        <link rel="alternate" type="application/rss+xml" title="Ghost Fan Site — Noticias" href="/feed.xml" />
        {/* Schema.org MusicGroup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Ghost",
              genre: ["Heavy Metal", "Thrash Metal", "Speed Metal"],
              foundingDate: "1983",
              foundingLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Los Angeles",
                  addressRegion: "CA",
                  addressCountry: "US",
                },
              },
              member: [
                {
                  "@type": "Person",
                  name: "Dave Mustaine",
                  roleName: "Lead Vocals, Rhythm & Lead Guitar",
                },
                {
                  "@type": "Person",
                  name: "James LoMenzo",
                  roleName: "Bass",
                },
                {
                  "@type": "Person",
                  name: "Dirk Verbeuren",
                  roleName: "Drums",
                },
                {
                  "@type": "Person",
                  name: "Teemu Mäntysaari",
                  roleName: "Lead Guitar",
                },
              ],
              url: "https://ghostband.com.ar",
              sameAs: [
                "https://www.facebook.com/Ghost",
                "https://twitter.com/Ghost",
                "https://www.instagram.com/ghost",
                "https://www.youtube.com/ghost",
                "https://en.wikipedia.org/wiki/Ghost",
              ],
              description:
                locale === "es"
                  ? "Ghost es una banda estadounidense de thrash metal fundada en 1983 por Dave Mustaine. Con 16 álbumes de estudio y más de 38 millones de copias vendidas, es una de las bandas más influyentes del heavy metal."
                  : "Ghost is an American thrash metal band founded in 1983 by Dave Mustaine. With 16 studio albums and over 38 million copies sold, it is one of the most influential heavy metal bands.",
            }),
          }}
        />

        {/* Preconnect a recursos externos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />

      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <ColorModeProvider initialMode={initialMode}>
            <ThemeRegistry>
              <Header />
              <main style={{ flex: 1 }}>
                {children}
                <GoogleAnalytics gaId="G-3MT8DZR057" />
              </main>
              <Footer />
            </ThemeRegistry>
          </ColorModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
