import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excluye /api, internos de Next, y cualquier path con extensión de archivo
  // (imágenes, robots.txt, sitemap.xml, feed.xml, favicon, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
