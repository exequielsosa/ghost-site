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

### En progreso
- Adaptación desde megadeth-site a ghost-site
- Reemplazos estructurales completados (dominio, nombre del sitio, env vars)
- **Pendiente**: reescribir contenido con datos reales de Ghost:
  - `messages/en.json` y `messages/es.json`
  - `src/constants/` — discography, members, history, shows
  - `src/data/` — songs, shows raw
  - `public/images/` — imágenes de la banda
  - `src/theme/` — colores del tema (Ghost: negro, dorado, rojo)
  - `scripts/scrape-news.js` — fuentes RSS para noticias de Ghost
  - Crear cuentas fan en redes sociales y configurar tokens
  - Crear nuevo proyecto Supabase
  - Obtener GHOST_MBID de MusicBrainz
