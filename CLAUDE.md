# Ghost Band Site — Claude Code Context

## Descripción
Sitio web fan/informativo de Ghost con noticias automatizadas por IA, setlists en tiempo real, discografía, historia de la banda y contenido multiidioma (ES/EN).

---

## Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 15 — App Router + Edge Runtime |
| Lenguaje | TypeScript 5 (strict mode) |
| UI | React 19 + MUI v7 + Emotion |
| Base de datos | Supabase (PostgreSQL) |
| Cache/KV | Vercel KV (Redis) |
| IA | Google Gemini 2.5-flash + Groq SDK |
| i18n | next-intl v4 — EN y ES |
| Scraping | RSS Parser + News API |
| Analytics | Google Analytics GA4 |
| Deploy | Vercel (Edge Functions + Cron) |
| Validación | Zod |

---

## Estructura de Directorios

```
src/
├── app/
│   ├── api/                        # API routes
│   ├── [sección]/                  # Páginas: discography, shows, noticias, miembros, etc.
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
├── constants/                      # JSON estáticos: discography, members, shows, etc.
├── data/
├── lib/
├── types/
├── theme/
├── i18n/
├── utils/
└── scripts/

scripts/                            # Scripts Node.js para CLI
messages/
├── en.json
└── es.json
```

---

## Convenciones

### Routing y Componentes
- **Siempre App Router**. Nunca Pages Router.
- **Server Components por defecto**. `"use client"` solo para interactividad.
- **MUI para UI**. Nunca CSS modules ni Tailwind.

### Internacionalización
- Todo texto visible via **next-intl** (`useTranslations()`).
- Archivos en `/messages/en.json` y `/messages/es.json`.
- **Nunca hardcodear** strings en los componentes.

### TypeScript
- **No usar `var`** — preferir `const` y `let`.
- Strict mode activo.
- Path alias: `@/*` → `./src/*`.

---

## Dominio
- **Producción**: `ghostband.com.ar`

---

## Variables de Entorno

```bash
# Públicas
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# Solo servidor
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY
SETLISTFM_API_KEY
GHOST_MBID                         # MusicBrainz ID de Ghost
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
KV_REST_API_URL
KV_URL / REDIS_URL
GEMINI_API_KEY
GROQ_API_KEY
NEWS_API_KEY
NEWS_API_URL
CRON_SECRET
PRODUCTION_URL
```

---

## Qué NO hacer

- No usar **Pages Router** — siempre App Router.
- No usar **CSS modules ni Tailwind** — solo MUI.
- No exponer **`SUPABASE_SERVICE_KEY`** al cliente.
- No **hardcodear strings de UI** — siempre next-intl.
- No usar **`var`** — solo `const` y `let`.
- No añadir comentarios, docstrings ni anotaciones de tipo a código que no se modificó.
- No agregar manejo de errores para escenarios imposibles.
- No crear abstracciones prematuras.

---

## Instrucciones para Claude
- Al final de cada sesión de trabajo, actualiza la sección "Estado actual" de este archivo.

## Estado actual

### Completado (Feb 2026)

**Infraestructura base**
- Supabase nuevo: `exozntnfmaeqikmjjgxz.supabase.co` — schema SQL ejecutado (news_articles, news_external_links, comments, social_posted_at)
- Deployado en Vercel → `ghostband.com.ar`
- GHOST_MBID: `2bcf2e02-5bc3-4c76-bf76-41126cb11444`
- KV compartido con Ghost (mismas creds, keys separados por MBID — no hay colisión)

**setlist.fm / shows**
- `last-show/route.ts` y `tour/route.ts`: MBID fallback usa `process.env.GHOST_MBID`
- `yearsAgo` default cambiado de 20 → 5 (Ghost existe desde 2008)
- Traducciones: "5 Years Ago..." / "Hace 5 Años..."
- **Para activar en prod**: agregar en Vercel → `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`, `SETLISTFM_API_KEY`, `GHOST_MBID`

**Scraper de noticias**
- `src/lib/ai.ts`: `isRelevantToGhost` + prompt `processNewsWithAI` actualizados para Ghost
- `scripts/scrape-news.js`: feeds actualizados (theprp → kerrang)
- `.github/workflows/scrape-news.yml`: renombrado "Scrape Ghost News", social media paso comentado con TODO
- **Probado localmente**: funcionando correctamente
- **Para activar Action diario**: configurar GitHub Secrets (NEWS_API_URL, NEWS_API_KEY, GROQ_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY)

**Fixes de producción**
- `public/images/ghost-Logo.png` → `ghost-logo.png` (case-sensitivity Linux/Vercel)
- `Header.tsx`: logo mobile corregido (era `/logo-megadeth.png`)

**Página de miembros reestructurada (26 Feb)**
- Reemplazó "Miembros Anteriores" con tres secciones: **Ghouls Era I, II, III**
- `src/app/miembros/page.tsx`: importa `ghoulsData` de `@/constants/ghouls.json`
- Actualizado Member type: agregó `ghouls_era?: number` y cambió `birthYear?: number | null`
- Changed member highlight: "dave-mustaine" → "tobias-forge"
- `src/app/miembros/[memberId]/page.tsx`: búsqueda extendida a todos los ghouls (3 eras)

**Reemplazo global Megadeth → Ghost (26 Feb)**
- Reemplazadas **todas** las referencias en todo el codebase:
  - `messages/*.json` — UI strings
  - `src/constants/*.json` — datos JSON
  - `src/app/**/*.ts(x)` — componentes y rutas
  - `src/lib/`, `src/scripts/`, archivos raíz
- Patrones: "Megadeth" → "Ghost", "megadeth" → "ghost", "MEGADETH" → "GHOST"
- Build verificado: ✅ Sin errores TypeScript

### Pendiente
- [ ] Configurar GitHub Secrets para el Action diario de scraping
- [ ] Agregar env vars en Vercel: `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`, `SETLISTFM_API_KEY`, `GHOST_MBID` (para que aparezcan las cards de shows)
- [ ] Crear cuentas fan de Ghost en redes sociales → descomentar social media step en el Action
- [ ] Reescribir/actualizar contenido con datos reales de Ghost:
  - `src/constants/members.json` — agregar perfiles completos de miembros actuales y ghouls
  - `src/constants/discography.json` — discografía y datos de álbumes
  - `src/constants/` — history, interviews, songs data
  - `src/data/` — songs.meta.json, shows raw data
  - `public/images/` — imágenes de la banda (band.webp, members/, albums/, etc.)
  - `src/theme/` — colores del tema (Ghost: negro, dorado, rojo)
- [ ] Configurar `NEXT_PUBLIC_GA_ID` propio para Ghost en Vercel
