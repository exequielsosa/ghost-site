import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  // Inglés es el default: sin prefijo en la URL (conserva lo ya indexado por
  // Google). Español va prefijado con /es.
  defaultLocale: "en",
  localePrefix: "as-needed",
  // La URL manda, no el header Accept-Language ni la cookie de idioma del
  // navegador — si no, la misma URL sirve contenido distinto según el
  // visitante (justo el problema que motivó migrar a rutas por idioma). El
  // cambio de idioma queda a cargo del selector del Header, que navega
  // explícitamente a la URL con/sin /es.
  localeDetection: false,
});
