# Brief: egress de Supabase — ghost-site corre el mismo riesgo que megadeth

Diagnóstico del 24 oct 2026. **Todavía no se cambió código** (ver "Instrucciones para Claude" en `CLAUDE.md`: confirmar antes de tocar).

## Contexto

- La organización vieja de Supabase (megadeth + Call 2 Santa) quedó **restringida por `exceed_egress_quota`**: la API REST devolvía 402 a todo y los dos sitios se quedaron sin datos. La cuota de egress (5 GB/mes en Free) es **por organización**, no por proyecto.
- La causa en megadeth: ninguna consulta de noticias se cacheaba y varias páginas bajaban **todas** las noticias completas en cada visita o pedido de bot.
- ghost-site es un fork del mismo código. El 24 oct se arregló babymetal-site, que tenía exactamente el mismo problema: **100 cargas de página = 0 consultas a Supabase** después del fix.

## Diagnóstico de ghost-site

Medido contra el proyecto `exozntnfmaeqikmjjgxz` con la anon key:

| Consulta | Peso |
|---|---|
| `news_articles_with_links?select=*` (lo que hace `getAllNews()`) | **212 KB** (33 noticias, ~6,4 KB c/u) |
| `news_articles?select=id,published_date` | 3,3 KB |

Las noticias de Ghost son más pesadas que las de babymetal (65 KB con 14 noticias): con 200 noticias, como megadeth, cada consulta pesaría **~1,3 MB**.

### Problemas encontrados

| # | Problema | Dónde | Gravedad |
|---|---|---|---|
| 1 | El buscador llama a `getAllNews()` **desde el navegador** en un `useEffect` al montarse, y está montado siempre en el Header. **Cada página vista baja 212 KB de Supabase**, aunque nadie abra el buscador | `src/components/SearchModal.tsx:50-60`, `src/components/Header.tsx:521` | 🔴 |
| 2 | `/noticias` es `"use client"` y llama a `getAllNews()` desde el navegador: otros 212 KB por visita, imposible de cachear en la CDN | `src/app/[locale]/noticias/page.tsx:1,27` | 🔴 |
| 3 | `await cookies()` en el layout vuelve dinámico todo el sitio, así que los `revalidate = 300` de la home y el detalle **no hacen nada**: cada request consulta Supabase. Producción responde `private, no-cache, no-store` y `x-vercel-cache: MISS` en `/es` y `/es/noticias` | `src/app/[locale]/layout.tsx:279` | 🔴 |
| 4 | `/api/feed` (el RSS que anuncia el `<link rel="alternate">` del layout) llama a `getAllNews()` y solo manda `max-age=3600`, **sin `s-maxage`**: la CDN no lo cachea (`MISS` en producción). Cada lector de RSS que hace polling baja 212 KB de Supabase | `src/app/api/feed/route.ts`, `src/app/[locale]/layout.tsx:369` | 🔴 |
| 5 | La home trae **todas** las noticias para mostrar 5 | `src/app/[locale]/page.tsx:7` | 🟠 |
| 6 | Sitemap y `generateStaticParams` del detalle usan `getAllNews()` (`select("*")`) cuando solo necesitan id y fecha | `src/app/sitemap.ts:191`, `src/app/[locale]/noticias/[id]/page.tsx:23` | 🟠 |
| 7 | `robots.ts` no bloquea crawlers de IA, no hay regla de firewall en Vercel (la API devuelve 404: el firewall nunca se inicializó) y no hay Vercel Analytics. Verificado: `meta-externalagent` recibe **200**. En megadeth ese crawler era el 58% del tráfico | `src/app/robots.ts` | 🟡 |
| 8 | Después de publicar un comentario se recarga la lista, pero la CDN cachea el GET 60 s y el comentario nuevo no aparece | `src/components/CommentsSection.tsx:119-120` | 🟡 (bug de UX, no de egress) |

### Cuánto gasta hoy

Una página vista cualquiera gasta 212 KB (buscador) + 212 KB (home o `/noticias`) ≈ **~425 KB**. Los 5 GB del plan Free alcanzan para **~12 mil páginas vistas por mes**, bots incluidos, y cada noticia nueva que agrega el scraper sube ese costo. Más los lectores de RSS (problema 4).

### Lo que está bien

- El sitemap ya usa el id crudo de la noticia (no `generateInterviewSlug`), así que no tiene el bug de 404 que tenían megadeth y babymetal.
- `SUPABASE_SERVICE_KEY` solo se usa en el servidor (`/api/news/create`).
- `/api/comments` tiene `s-maxage=60` en la CDN.

## Plan (igual al de babymetal)

Rama `fix/egress-supabase`. Referencia directa: commit **`7e5473b`** de `babymetal-site` (es el mismo fork, los archivos son casi idénticos). Original en megadeth-site: `6ad47dd`, `dc3e9bf`, `986cc39`.

1. **`src/lib/news.ts`** (nuevo): `unstable_cache` con tag `"news"` y revalidate de 1 h para `getAllNewsCached`, `getLatestNewsCached(limit)`, `getNewsByIdCached(id)` y `getNewsIndexCached()` (solo `id, published_date`). Las respuestas vacías tiran error para que no queden cacheadas y se siga sirviendo la última versión buena. Copiar el de babymetal tal cual.
2. **`/api/news/create`**: `revalidateTag(NEWS_TAG)` después del insert, para que la noticia nueva aparezca al instante.
3. **`/noticias`**: `page.tsx` pasa a server component que llama a `getAllNewsCached()`; la UI va a `src/components/NoticiasPageClient.tsx` (props `newsData`). Ojo con los textos y URLs de Ghost al copiar el de babymetal.
4. **`SearchModal`** + nuevo **`/api/news/search`**: el endpoint devuelve solo `id, title, description` con `s-maxage=3600, stale-while-revalidate=86400`; el modal lo pide recién la primera vez que se abre (`useRef` + `open`) y agrega `newsData` a las dependencias del `useMemo`.
5. **Home**: `getLatestNewsCached(5)`.
6. **Detalle**: `getNewsByIdCached` y `generateStaticParams` con `getNewsIndexCached`.
7. **Sitemap**: `getNewsIndexCached()` y `lastModified: new Date(news.published_date)`.
8. **RSS** — ghost tiene **dos**: `/feed.xml` (con `getLatestNews(50)`) y `/api/feed` (con `getAllNews()`). Los dos pasan a `getLatestNewsCached(50)`. A `/api/feed` agregarle `s-maxage=3600, stale-while-revalidate=86400`. Evaluar si conviene que el `<link rel="alternate">` del layout apunte a `/feed.xml` y dejar `/api/feed` como redirect, para tener un solo feed.
9. **Comentarios**: después del POST, `if (json?.item) setItems((prev) => [json.item, ...prev])` en vez de `await load()`.
10. **`robots.ts`**: lista `AI_CRAWLERS` con Disallow (copiar la de babymetal y cambiar el dominio a `ghostband.com.ar`). Googlebot, Bingbot y `facebookexternalhit` siguen permitidos.
11. **`@vercel/analytics`**: `npm install @vercel/analytics@^2.0.1` y `<Analytics />` al lado de `<GoogleAnalytics />` en el layout.

**No tocar** el `cookies()` del layout en esta rama. Con el caché de datos deja de afectar a Supabase; sacarlo implica migrar el theming de dark mode, y en megadeth ya fallaron 3 enfoques (ver su `CLAUDE.md`). Va en una rama aparte.

## Verificación

1. `npm run build` y `npx tsc --noEmit` (ignorar errores viejos de `.next/types`; borrar `.next` antes del build).
2. `next start` con un preload que loguee cada `fetch` a `supabase.co` (`NODE_OPTIONS="--require <logger>.cjs"`), cargar 10 veces home, `/noticias`, un detalle ES/EN, `/sitemap.xml`, `/feed.xml`, `/api/feed` y `/api/news/search`. Esperado: **0 consultas** después de la primera carga.
3. En el preview de Vercel: `/noticias` filtra igual que antes, el buscador encuentra noticias, una noticia nueva vía `/api/news/create` aparece sin esperar, un comentario nuevo aparece al toque.

## Pasos manuales en Vercel (después del merge)

- **Analytics** → Enable.
- **Firewall** → Configure → New Rule: User Agent **contains** `meta-externalagent` → **Deny** → Save → Review Changes → Publish. **Nunca bloquear por ASN 32934**: corta también a `facebookexternalhit` y los posteos de FB/IG quedan sin miniatura. Verificar con curl: meta-externalagent → 403; facebookexternalhit, Googlebot y navegador → 200.

## Otros hallazgos (fuera de este brief)

- **Supabase**: el proyecto `exozntnfmaeqikmjjgxz` no está en la organización vieja (la restringida). Confirmar en qué cuenta/organización está y si comparte cuota con otro proyecto. Revisar Usage → Egress.
- **Errores en producción** (últimos 7 días, Vercel):
  - `PGRST116` en `/[locale]/noticias/[id]` (18 veces): se piden ids que no existen. Con `.single()` Supabase devuelve error; usar `.maybeSingle()` lo convierte en un `null` limpio → 404.
  - `[Cron] PRODUCTION_URL environment variable is not set` en `/api/cron/warm-shows` (7 veces): falta la variable en Vercel, así que el precalentado de shows no corre.
- `.env` tiene algún byte no-texto en el medio (`grep` lo trata como binario). No afecta a Next, pero conviene revisarlo.
