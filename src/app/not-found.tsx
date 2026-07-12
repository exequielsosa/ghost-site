import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Cormorant, Playfair_Display } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { ColorModeProvider } from "@/theme/useColorMode";

// Misma config que [locale]/layout.tsx: el theme (createTheme.ts) usa las
// variables CSS de estas fuentes, que solo existen si el <html> tiene esta
// clase. Sin esto, el tema cae al fallback (system-ui/Arial) aunque
// ThemeRegistry esté bien aplicado.
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

// Red de seguridad SOLO para URLs que Next.js no llega a asociar a NINGUNA
// ruta (ej. /es/typo-en-la-url, o /pagina-que-jamas-existio). Next genera un
// único "_not-found" automático a nivel raíz, sin importar el locale, y lo
// renderiza a través de src/app/layout.tsx — que a propósito no tiene
// <html>/<body> (viven en [locale]/layout.tsx). Sin este archivo, eso rompe
// con "Missing <html> and <body> tags in the root layout" al hidratar en el
// navegador.
//
// Esto NO afecta a src/app/[locale]/not-found.tsx: esa sigue siendo la que
// se usa cuando notFound() se llama desde código dentro de una página ya
// resuelta (ej. /dvds/id-invalido), en ambos idiomas.
//
// No puede usar next-intl (useTranslations/getTranslations) porque no hay
// NextIntlClientProvider en este nivel — mismo diseño e imagen que la página
// real, pero con el texto fijo en inglés en vez de t(). Usa el Link de
// next/link (no el de @/i18n/navigation): no hay locale que prefijar acá.
//
// SÍ envuelve con ThemeRegistry/ColorModeProvider (mismo tema que el resto
// del sitio, default "dark" igual que [locale]/layout.tsx): sin esto los
// botones de MUI salían con los colores default de la librería en vez de
// los de la marca.
export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfairDisplay.variable}`}
    >
      <body style={{ margin: 0 }}>
        <ColorModeProvider initialMode="dark">
          <ThemeRegistry>
            <Container maxWidth="lg">
              <Box
                sx={{
                  minHeight: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  py: 8,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: 250, sm: 350, md: 600 },
                    height: { xs: 250, sm: 350, md: 600 },
                    mb: 0,
                    borderRadius: 2,
                  }}
                >
                  <Image
                    src="/images/404.jpg"
                    alt="404 - Page not found"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                    priority
                  />
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: 24, md: 40 },
                    fontWeight: 600,
                    mb: 3,
                    mt: 2,
                  }}
                >
                  Page not found
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: 16, md: 20 },
                    color: "text.secondary",
                    mb: 2,
                    maxWidth: 600,
                  }}
                >
                  Sorry, the page you are looking for does not exist or has
                  been moved.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: "text.secondary",
                    mb: 5,
                    maxWidth: 600,
                  }}
                >
                  You may have mistyped the address or the page may have been
                  removed.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <Link href="/">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: { xs: 14, md: 16 },
                        fontWeight: 600,
                      }}
                    >
                      Go to home
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </Container>
          </ThemeRegistry>
        </ColorModeProvider>
      </body>
    </html>
  );
}
