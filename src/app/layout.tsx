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
      "Ghost band",
      "Ghost sueca",
      "banda sueca",
      "rock teatral",
      "pop metal",
      "theatrical rock",
      "theatrical metal",
      "Ghost oficial",
      "Ghost fan site",
      "Ghost Argentina",
      "Ghost Sudamérica",
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
      "Ghost tour 2024",
      "Ghost tour 2025",
      "Ghost tour 2026",
      "theatrical rock",
      "rock teatral",
      "pop metal",
      "metal teatral",
      "gothic rock",
      "metal melódico",
      "heavy rock",
      "rock sinfónico",
      "rock alternativo",
      "rock progresivo",
      "historia Ghost",
      "Papa Emeritus I era",
      "Papa Emeritus II era",
      "Papa Emeritus III era",
      "Papa Emeritus IV era",
      "rock satánico",
      "teatralidad rock",
      "catolicismo invertido",
      "ritual musical",
      "Ghost fan site",
      "Ghost Argentina fans",
      "Ghost comunidad",
      "Ghost fandom",
      "Ghost noticias actualidad",
      "últimas noticias Ghost",
      "Ghost breaking news",
      "Ghost anuncios",
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
      "Ghost band",
      "Ghost Swedish band",
      "Ghost theatrical rock",
      "Ghost Tobias Forge",
      "Ghost Papa Emeritus",
      "Ghost Nameless Ghouls",
      "Ghost Cirice",
      "Ghost Mary on a Cross",
      "Ghost tour dates",
      "Ghost new album",
      "Ghost latest news",
      "Ghost discography list",
      "Ghost album rankings",
      "Ghost best songs",
      "Ghost unplugged",
      "Ghost covers",
      "Ghost tributes",
      "Ghost Argentina presencia",
      "Ghost fanbase Argentina",
      "Ghost Latinoamérica alcance",
      "Ghost Spanish-speaking fans",
      "Ghost en español",
      "Ghost traductor lyrics",
      "Ghost noticias en español",
      "Ghost entrevistas españolas",
      "Ghost podcasts español",
      "Ghost radio Argentina",
    ],
    en: [
      "Ghost",
      "Ghost band",
      "Ghost Swedish band",
      "Swedish band",
      "theatrical rock",
      "pop metal",
      "theatrical metal",
      "Ghost official",
      "Ghost fan site",
      "Ghost Argentina",
      "Ghost South America",
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
      "ghouls Ghost",
      "Ghost tour 2024",
      "Ghost tour 2025",
      "Ghost tour 2026",
      "gothic rock",
      "melodic metal",
      "heavy rock",
      "symphonic rock",
      "alternative rock",
      "progressive rock",
      "Ghost history",
      "Papa Emeritus I era",
      "Papa Emeritus II era",
      "Papa Emeritus III era",
      "Papa Emeritus IV era",
      "satanic rock",
      "inverted Catholicism",
      "musical ritual",
      "Ghost Argentina fans",
      "Ghost community",
      "Ghost fandom",
      "Ghost news",
      "latest Ghost news",
      "Ghost breaking news",
      "Ghost announcements",
      "Ghost music",
      "Ghost band members",
      "Ghost real members",
      "who is Ghost",
      "Ghost identity",
      "Papa Emeritus identity",
      "Tobias Forge Ghost",
      "Ghost founder",
      "Ghost mastermind",
      "Ghost theatrical rock",
      "Ghost Tobias Forge",
      "Ghost Papa Emeritus",
      "Ghost Nameless Ghouls",
      "Ghost Cirice",
      "Ghost Mary on a Cross",
      "Ghost tour dates",
      "Ghost new album",
      "Ghost latest news",
      "Ghost discography list",
      "Ghost album rankings",
      "Ghost best songs",
      "Ghost unplugged",
      "Ghost covers",
      "Ghost tributes",
      "Ghost Argentina presence",
      "Ghost fanbase Argentina",
      "Ghost Latin America reach",
      "Ghost Spanish-speaking fans",
      "Ghost in Spanish",
      "Ghost lyrics translator",
      "Ghost noticias en español",
      "Ghost entrevistas españolas",
      "Ghost podcasts español",
      "Ghost radio Argentina",
    ],
  };

  const titleByLocale = {
    es: "Ghost Argentina | Noticias, Shows, Discografía y Letras",
    en: "Ghost Argentina | News, Shows, Discography & Lyrics",
  };

  const descriptionByLocale = {
    es: "Fan site de Ghost en español. Noticias, gira 2026, discografía completa, letras, setlists y toda la historia de la banda sueca de rock teatral de Tobias Forge.",
    en: "Ghost fan site in Spanish. News, 2026 tour, complete discography, lyrics, setlists and full history of Tobias Forge's Swedish theatrical rock band.",
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
      modifiedTime: "2026-03-01T00:00:00Z",
      images: [
        {
          url: "/images/pagelogo.jpg",
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
    <html
      lang={locale}
      className={`${cormorant.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/webp" href="/icon.webp" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Ghost Fan Site — Noticias"
          href="/feed.xml"
        />
        {/* Schema.org MusicGroup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Ghost",
              genre: ["Theatrical Rock", "Pop Metal", "Gothic Rock"],
              foundingDate: "2006",
              foundingLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Linköping",
                  addressCountry: "SE",
                },
              },
              member: [
                {
                  "@type": "Person",
                  name: "Tobias Forge",
                  roleName: "Lead Vocals, Founder",
                },
                {
                  "@type": "Person",
                  name: "Papa Emeritus I",
                  roleName: "Lead Vocals (2006-2012)",
                },
                {
                  "@type": "Person",
                  name: "Papa Emeritus II",
                  roleName: "Lead Vocals (2012-2015)",
                },
                {
                  "@type": "Person",
                  name: "Papa Emeritus III",
                  roleName: "Lead Vocals (2015-2020)",
                },
                {
                  "@type": "Person",
                  name: "Cardinal Copia",
                  roleName: "Lead Vocals (2020-2025)",
                },
                {
                  "@type": "Person",
                  name: "Papa V Perpetua",
                  roleName: "Lead Vocals (2025-present)",
                },
              ],
              url: "https://ghostband.com.ar",
              sameAs: [
                "https://www.facebook.com/thebandghost",
                "https://twitter.com/thebandGHOST",
                "https://www.instagram.com/thebandghost",
                "https://www.youtube.com/@ghost",
                "https://en.wikipedia.org/wiki/Ghost_(Swedish_band)",
                "https://open.spotify.com/artist/1Qp56T7n950O3EGMsSl81D",
              ],
              description:
                locale === "es"
                  ? "Ghost es una banda sueca de rock teatral fundada en 2006 por Tobias Forge. Con 8 álbumes de estudio desde Opus Eponymous (2010) hasta Skeletá (2024), la banda combina heavy rock melódico con elementos teatrales y conceptuales únicos, ganando múltiples premios Grammy y conquistando fans en todo el mundo."
                  : "Ghost is a Swedish theatrical rock band founded in 2006 by Tobias Forge. With 8 studio albums from Opus Eponymous (2010) to Skeletá (2024), the band combines melodic heavy rock with unique theatrical and conceptual elements, winning multiple Grammy Awards and captivating fans worldwide.",
            }),
          }}
        />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Ghost Argentina - Noticias"
          href="https://ghostband.com.ar/api/feed"
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
