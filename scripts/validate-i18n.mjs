/**
 * Valida las rutas migradas a next-intl (Fases 1-4 del plan de i18n):
 * - status 200 en la versión EN (sin prefijo) y ES (/es/...)
 * - hreflang recíproco: en -> ruta EN, es -> ruta ES, x-default -> ruta EN,
 *   e IDÉNTICO en ambas versiones de la página.
 *
 * Requiere el server corriendo en otra terminal (npm run dev o npm start).
 *
 * Uso:
 *   node scripts/validate-i18n.mjs
 *   node scripts/validate-i18n.mjs --port 3001
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const args = process.argv.slice(2);
const portIdx = args.indexOf("--port");
const PORT = portIdx !== -1 ? args[portIdx + 1] : "3000";
const BASE = `http://localhost:${PORT}`;

function readJson(relPath) {
  try {
    const raw = readFileSync(path.join(root, relPath), "utf-8").replace(/^﻿/, "");
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`  (no se pudo leer ${relPath}: ${e.message})`);
    return null;
  }
}

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/ /g, "-")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateDVDSlug(title) {
  if (!title) return "unknown-dvd";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateInterviewSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Rutas estáticas.
const staticPaths = [
  "/",
  "/miembros",
  "/papas",
  "/songs",
  "/dvds",
  "/discography",
  "/videos",
  "/entrevistas",
  "/shows",
  "/noticias",
  "/historia",
  "/discography/reviews",
  "/tour",
  "/contacto",
  "/terminos",
  "/privacidad",
  "/faq",
];

// Una muestra real por cada ruta dinámica, tomada de los datasets — así se
// valida el patrón con datos reales, no un ejemplo inventado.
function getDynamicPaths() {
  const paths = [];

  const songs = readJson("src/constants/songs.json");
  if (songs?.[0]?.id) paths.push(`/songs/${songs[0].id}`);

  const dvds = readJson("src/constants/dvd.json");
  if (dvds?.[0]) {
    const title = dvds[0].title || dvds[0].album_title;
    if (title) paths.push(`/dvds/${generateDVDSlug(title)}`);
  }

  const shows = readJson("src/constants/shows.json");
  if (shows?.[0]?.id) paths.push(`/shows/${shows[0].id}`);

  const interviews = readJson("src/constants/interviews.json");
  if (interviews?.[0]?.id) {
    paths.push(`/entrevistas/${generateInterviewSlug(interviews[0].id)}`);
  }

  const historia = readJson("src/constants/historia.json");
  if (historia?.chapters?.[0]?.slug) {
    paths.push(`/historia/${historia.chapters[0].slug}`);
  }

  const reviews = readJson("src/constants/reviews.json");
  if (reviews?.[0]?.id) paths.push(`/discography/reviews/${reviews[0].id}`);

  const videos = readJson("src/constants/videos.json");
  if (videos?.[0]?.title) paths.push(`/videos/${slugify(videos[0].title)}`);

  const members = readJson("src/constants/members.json");
  if (members?.members) {
    const firstId = Object.keys(members.members)[0];
    if (firstId) paths.push(`/miembros/${firstId}`);
  }

  const lineups = readJson("src/constants/lineups.json");
  if (lineups?.lineups?.[0]?.id) paths.push(`/papas/${lineups.lineups[0].id}`);

  const discography = readJson("src/constants/discography.json");
  if (discography?.[0]?.id) paths.push(`/discography/${discography[0].id}`);

  return paths;
}

function extractHreflangs(html) {
  const matches = [
    ...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g),
  ];
  const map = {};
  matches.forEach(([, lang, href]) => (map[lang] = href));
  return map;
}

// Las noticias viven en Supabase, no en un JSON local — se saca un ID real
// del sitemap para poder probar /noticias/[id] igual que el resto de rutas.
async function getNewsPath() {
  try {
    const res = await fetch(`${BASE}/sitemap.xml`);
    const xml = await res.text();
    const match = xml.match(/<loc>https?:\/\/[^/]+(\/noticias\/[^<]+)<\/loc>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function checkPath(pathname) {
  const enUrl = `${BASE}${pathname}`;
  const esUrl = `${BASE}/es${pathname}`;
  const issues = [];

  let enRes, esRes, enHtml, esHtml;
  try {
    enRes = await fetch(enUrl);
    enHtml = await enRes.text();
  } catch (e) {
    return { pathname, ok: false, issues: [`EN no responde: ${e.message}`] };
  }
  try {
    esRes = await fetch(esUrl);
    esHtml = await esRes.text();
  } catch (e) {
    return { pathname, ok: false, issues: [`ES no responde: ${e.message}`] };
  }

  if (enRes.status !== 200) issues.push(`EN status ${enRes.status} (esperado 200)`);
  if (esRes.status !== 200) issues.push(`ES status ${esRes.status} (esperado 200)`);

  const enHreflangs = extractHreflangs(enHtml);
  const esHreflangs = extractHreflangs(esHtml);

  // Next.js resuelve la raíz "/" sin slash final en las URLs absolutas.
  const expectedEn =
    pathname === "/" ? "https://ghostband.com.ar" : `https://ghostband.com.ar${pathname}`;
  const expectedEs =
    pathname === "/" ? "https://ghostband.com.ar/es" : `https://ghostband.com.ar/es${pathname}`;

  [
    ["en", expectedEn, enHreflangs],
    ["es", expectedEs, enHreflangs],
    ["x-default", expectedEn, enHreflangs],
  ].forEach(([lang, expected, map]) => {
    if (map[lang] !== expected) {
      issues.push(
        `[EN page] hreflang="${lang}" es "${map[lang] ?? "FALTA"}", esperado "${expected}"`,
      );
    }
  });

  [
    ["en", expectedEn, esHreflangs],
    ["es", expectedEs, esHreflangs],
    ["x-default", expectedEn, esHreflangs],
  ].forEach(([lang, expected, map]) => {
    if (map[lang] !== expected) {
      issues.push(
        `[ES page] hreflang="${lang}" es "${map[lang] ?? "FALTA"}", esperado "${expected}"`,
      );
    }
  });

  return { pathname, ok: issues.length === 0, issues };
}

async function main() {
  console.log(`Validando contra ${BASE} ...\n`);

  const newsPath = await getNewsPath();
  const allPaths = [
    ...staticPaths,
    ...getDynamicPaths(),
    ...(newsPath ? [newsPath] : []),
  ];
  let okCount = 0;
  let failCount = 0;

  for (const p of allPaths) {
    const result = await checkPath(p);
    if (result.ok) {
      console.log(`✅ ${p}`);
      okCount++;
    } else {
      console.log(`❌ ${p}`);
      result.issues.forEach((issue) => console.log(`   - ${issue}`));
      failCount++;
    }
  }

  console.log(`\n${okCount} OK / ${failCount} con problemas / ${allPaths.length} total`);
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error("Error fatal:", e.message);
  process.exit(1);
});
