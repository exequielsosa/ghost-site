export function i18nAlternates(pathname: string, locale: string) {
  // Casear la raíz explícitamente: "/es" + "/" da "/es/" (doble slash), que
  // con trailingSlash: false en next.config devuelve 308 hacia "/es" — el
  // propio canonical/hreflang quedaría apuntando a una URL que el sitio
  // redirige.
  const esPath = pathname === "/" ? "/es" : `/es${pathname}`;
  const enPath = pathname;
  const languages = { en: enPath, es: esPath, "x-default": enPath };
  return { canonical: locale === "es" ? esPath : enPath, languages };
}
