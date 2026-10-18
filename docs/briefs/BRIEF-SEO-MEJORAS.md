Brief técnico SEO para Claude Code — ghostband.com.ar

Contexto: fan site de Ghost en Next.js (mismo template que babymetal.com.ar y megadeth.com.ar). GSC 9/4–8/7/2026: 266 clics, 30,3K impresiones, CTR 0,9 %, posición media 10. Sitio joven: solo 39 páginas indexadas de 152 en el sitemap. Informe completo en INFORME-SEO-ghostband.md.

Instrucción general: verificá cada diagnóstico en el código antes de implementar. Varios fixes son idénticos a los de los otros dos sitios — reutilizá los patrones ya implementados.


TAREA 1 — ELIMINAR EL TEXTO DE MEGADETH (crítico, hacer primero)

Problema (verificado en el HTML actual, 9/7/2026): el footer de TODAS las páginas y los JSON-LD globales Organization y WebSite contienen: "Ghost es una banda pionera del thrash metal fundada por Dave Mustaine en 1983... Rust in Peace, Peace Sells... but Who's Buying?, Countdown to Extinction..." (y su versión EN "Ghost is a pioneering thrash metal band founded by Dave Mustaine in 1983..."). "Mustaine" aparece 10 veces por página. Google ya lo usa como snippet en /discography, /songs, /tour y /dvds.

Acciones:


grep -ri "Mustaine\|Rust in Peace\|Countdown to Extinction\|thrash" src/ messages/ constants/ — localizar el bloque del footer y las descripciones de Organization/WebSite en el layout o config SEO global.
Reescribir con la descripción real de Ghost (ES y EN): banda sueca de rock/metal teatral fundada por Tobias Forge en Linköping (2006), álbumes Opus Eponymous → Skeletá, personajes Papa Emeritus/Cardinal Copia.
Revisar si el mismo template dejó otros restos cruzados (grep por "BABYMETAL" y "Megadeth" en el repo de Ghost, y por "Ghost"/"Forge" en los otros dos repos).
Post-deploy: solicitar indexación en GSC de las ~10 páginas principales para purgar los snippets.


TAREA 2 — Desbloquear la indexación (111 páginas descubiertas y nunca rastreadas)

Datos GSC: 39 indexadas vs 116 sin indexar; 111 en "Descubierta: actualmente sin indexar" con último rastreo N/D (contacto, /dvds/rite-here-rite-now, todas las /entrevistas/*, /faq...). Sitemap OK (152 págs). 0 backlinks. 430 enlaces internos exactamente uniformes (39/página = solo nav).

Acciones de código:


Interlinking contextual dentro del contenido: desde las páginas ya indexadas y con tráfico (/tour, /discography, /papas, /songs) linkear hacia las no indexadas relevantes (cada álbum → sus canciones; /dvds → /dvds/rite-here-rite-now; /historia → /entrevistas/* pertinentes; cada Papa → su era).
Módulo "contenido relacionado" al pie de páginas de detalle (3-4 links contextuales, no nav).
Verificar que las páginas no indexadas devuelvan 200 con contenido sustancial server-side y no dependan de JS para el contenido principal.
Revisar los casos puntuales: 1 noindex (¿intencional?), 1 soft 404, 1 redirección, 1 "Google eligió otra canónica".


Acciones manuales (dueño): Inspección de URL → "Solicitar indexación" para las 10-15 páginas más importantes no indexadas; conseguir 2-3 backlinks iniciales (r/Ghostbc, foros de fans, intercambio con los otros dos sitios propios — enlace visible entre los tres fansites es legítimo y ayuda).

Nota: la Tarea 1 probablemente contribuya — texto falso duplicado en todo el sitio es una señal de calidad negativa clásica.

TAREA 3 — i18n con rutas por idioma + hreflang

Mismo problema y misma solución que babymetal.com.ar: dynamic serving ES/EN por Accept-Language/cookie en la misma URL, sin hreflang, /en → 404. Google indexó la versión EN (verificado en SERP: "Members | Ghost", "Popes | Ghost", "Complete Ghost Discography..."). Audiencia: EE.UU. 37 % de impresiones; ES-hablantes ven snippets EN ("miembros de ghost" 504 imp, 0 clics).


Raíz = inglés (lo indexado), /es/ = español, hreflang recíproco, x-default → raíz.
Replicar la arquitectura que se implemente en babymetal (segmento [lang], middleware, generateStaticParams, sitemap con xhtml:link).
Eliminar la variación por Accept-Language en contenido indexable.


TAREA 4 — Nicho "Papas": páginas por personaje

Datos: /papas rankea 4-9 para "ghost popes/papas/pope" y existe /historia/papa-emeritus-iii (785 imp, CTR 0,5 %). Queries con 0 clics: "papa emeritus" 284, "papa emeritus 2" 247+174, "papa emeritus iii" 201+128, "papa emeritus 1" 56, "cardinal copia" 86, "ghost papa emeritus ii iii age difference" 315+134 (¡pregunta específica con demanda!).

Acciones:


Página propia por personaje: Papa Emeritus I, II, III, IV (Cardinal Copia), Papa V Perpetua — con años de la era, álbumes, datos del personaje, actor/interpretación (todos son Tobias Forge — responder eso directamente, es una duda frecuente).
Title patrón: Papa Emeritus III: la era Meliora de Ghost (2015-2017) — historia del personaje.
Responder en texto preguntas literales de la SERP: diferencias entre Papas, cronología, "who plays papa emeritus".
/papas como hub que linkea a todas (interlinking ↔ Tarea 2).
Schema: los personajes pueden ir como Person/PerformanceRole dentro del MusicGroup — evaluar.


TAREA 5 — Titles y descriptions de páginas clave


/miembros ("Miembros | Ghost", 2.021 imp, 0,9 %): → Ghost Band Members: Tobias Forge & the Nameless Ghouls (Full Lineup) / ES equivalente. Incluir "Nameless Ghouls" — es el término real de búsqueda de la banda.
/papas ("Papas | Ghost") → The Popes of Ghost: Papa Emeritus I-V & Cardinal Copia Explained.
/songs (3.191 imp, "ghost songs" pos 27,9): title con "All Ghost Songs" + listado por álbum server-side.
/discography: el title ya es bueno; mejorar description (la actual quedará bien al limpiar el footer — verificar).
/tour (mejor página, CTR 4,4 %): "ghost band tour" pos 20,7 y "ghost tour dates" 14,9 → sumar "Tour Dates" al title y un bloque de próximas fechas en texto plano arriba.
/miembros/tobias-forge (1.183 imp, 0,6 %, "tobias forge" pos 14,6): ampliar con biografía completa, Repugnant/Subvision, creación de los personajes.


TAREA 6 — Watch pages para videos

13 de 15 videos sin indexar, mismo fix que los otros sitios: /videos/[slug] con VideoObject, galería que linkea, sitemap.

TAREA 7 — Event schema (rápido)

1 evento válido con warnings: agregar validFrom (en offers), image, organizer (+ endDate/eventStatus si faltan, como en babymetal).

Fuera de código


Backlinks = 0: es el freno principal de rastreo. Primeros pasos baratos: enlaces cruzados visibles entre tus tres fansites, r/Ghostbc, foros/comunidades de fans, directorios de fansites.
Tras Tareas 1-2, pedir indexación manualmente y monitorear "Descubierta sin indexar" en GSC cada 2 semanas: objetivo 39 → 100+ indexadas en 4-6 semanas.


Orden sugerido


Tarea 1 (una hora — es el fix más urgente de los tres sitios)
Tarea 5 (horas)
Tarea 2 (1-2 días)
Tarea 7 (minutos)
Tarea 4 (2-3 días)
Tarea 6 (1-2 días)
Tarea 3 (proyecto grande, reutilizar patrón de babymetal)


Métricas de éxito (GSC, 4-6 semanas)


Snippets sin rastro de Megadeth en site:ghostband.com.ar.
Indexadas: 39 → 100+; "Descubierta sin indexar": 111 → <30.
/papas: CTR 0,8 % → ≥2 %; queries "papa emeritus *" con primeros clics.
/discography: CTR 0,5 % → ≥1,5 %.
Videos indexados: 2 → 10+.