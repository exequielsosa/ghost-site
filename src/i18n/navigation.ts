import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Versiones locale-aware de Link/useRouter/usePathname/redirect, con la misma
// API que las de next/link y next/navigation. Los hrefs se escriben igual
// (ej. "/miembros"); el componente decide solo si hace falta anteponer /es.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
