# Análisis de Fuentes RSS para Noticias de Ghost

## Fuentes Actuales (4)
```javascript
const RSS_FEEDS = [
  'https://www.blabbermouth.net/feed/',         // 30 items
  'https://loudwire.com/feed/',                 // 35 items
  'https://metalinjection.net/feed',            // 25 items
  'https://www.metalsucks.net/feed/',           // 50 items
];
```
**Total actual**: ~140 items analizados por ejecución

---

## Nuevas Fuentes Recomendadas

### 🔥 ALTA PRIORIDAD (Agregar sí o sí)

#### 1. BraveWords
- **URL**: `https://bravewords.com/rss`
- **Items**: 300 ❗ (el más grande)
- **Pros**: 
  - Sitio especializado en metal/rock con mucha cobertura
  - Gran volumen de noticias
  - Muy establecido en la escena del metal
- **Ejemplo última noticia**: "BAD MARRIAGE Premieres 'Match Made In Hell' Music Video"

#### 2. Metal Hammer
- **URL**: `https://www.loudersound.com/metal-hammer/feed`
- **Items**: 50
- **Pros**: 
  - Revista legendaria del metal (desde 1983)
  - Contenido de alta calidad
  - Cobertura global e histórica
- **Ejemplo**: Artículos sobre black metal, historia del metal, etc.

#### 3. Revolver Magazine
- **URL**: `https://www.revolvermag.com/feed`
- **Items**: 9
- **Pros**: 
  - Revista prestigiosa de rock/metal
  - Entrevistas exclusivas
  - Cobertura de giras y lanzamientos importantes
- **Ejemplo**: "6 best new songs right now"

#### 4. Consequence (Heavy Section)
- **URL**: `https://consequence.net/category/heavy-consequence/feed/`
- **Items**: 15
- **Pros**: 
  - Sitio grande con sección dedicada al heavy
  - Buena curaduría
  - Contenido multimedia
- **Ejemplo**: "Don Broco Recruit Nickelback for New Single 'Nightmare Tripping'"

---

### ⭐ MEDIA PRIORIDAD (Considerar agregar)

#### 5. The PRP
- **URL**: `https://www.theprp.com/feed/`
- **Items**: 10
- **Pros**: 
  - Especializado en punk/hardcore/metal
  - Noticias rápidas y actualizadas
- **Ejemplo**: "Judas Priest Release Clip From Their New Documentary"

#### 6. Decibel Magazine
- **URL**: `https://www.decibelmagazine.com/feed/`
- **Items**: 10
- **Pros**: 
  - Revista especializada en metal extremo
  - Reviews y entrevistas de calidad
- **Ejemplo**: "Five For Friday"

#### 7. MetalTalk
- **URL**: `https://www.metaltalk.net/feed`
- **Items**: 10
- **Pros**: 
  - Sitio británico especializado
  - Cobertura de tours europeos
- **Ejemplo**: "Ghost / Excess All Areas With Vanessa Warwick On The Skeletour"

#### 8. Metal Addicts
- **URL**: `https://metaladdicts.com/feed/`
- **Items**: 12
- **Pros**: 
  - Contenido fan-oriented
  - Videos y multimedia
- **Ejemplo**: "BLAZE BAYLEY Rocks Sarajevo's Eternal Flame Festival"

#### 9. Invisible Oranges
- **URL**: `https://www.invisibleoranges.com/feed/`
- **Items**: 9
- **Pros**: 
  - Metal underground y progresivo
  - Estrenos exclusivos
- **Ejemplo**: "Disgustingest Unleash the Stench on 'Coagulating Putrescence'"

---

### ⚠️ BAJA PRIORIDAD (Saltar por ahora)

- **TheRockFix**: 0 items (feed vacío)
- **Ultimate Guitar News**: Bloqueado (403)
- **Kerrang**: No disponible (404)
- **Metal Underground**: Error de certificado
- **Metal Archives**: Bloqueado (403)
- **Rock Feed**: Error de parsing
- **Knotfest**: No disponible (404)

---

## Recomendación Final

### Opción 1: EXPANSIÓN MODERADA (+5 fuentes)
```javascript
const RSS_FEEDS = [
  // Actuales (4)
  'https://www.blabbermouth.net/feed/',
  'https://loudwire.com/feed/',
  'https://metalinjection.net/feed',
  'https://www.metalsucks.net/feed/',
  
  // Nuevas - Alta Prioridad (5)
  'https://bravewords.com/rss',                                    // +300 items
  'https://www.loudersound.com/metal-hammer/feed',               // +50 items
  'https://www.revolvermag.com/feed',                            // +9 items
  'https://consequence.net/category/heavy-consequence/feed/',    // +15 items
  'https://www.theprp.com/feed/',                                // +10 items
];
```
**Total**: ~524 items analizados (de 140 a 524 = **+274% más noticias**)

### Opción 2: EXPANSIÓN COMPLETA (+9 fuentes)
```javascript
const RSS_FEEDS = [
  // Actuales (4)
  'https://www.blabbermouth.net/feed/',
  'https://loudwire.com/feed/',
  'https://metalinjection.net/feed',
  'https://www.metalsucks.net/feed/',
  
  // Nuevas - Todas las funcionales (9)
  'https://bravewords.com/rss',
  'https://www.loudersound.com/metal-hammer/feed',
  'https://www.revolvermag.com/feed',
  'https://consequence.net/category/heavy-consequence/feed/',
  'https://www.theprp.com/feed/',
  'https://www.decibelmagazine.com/feed/',
  'https://www.metaltalk.net/feed',
  'https://metaladdicts.com/feed/',
  'https://www.invisibleoranges.com/feed/',
];
```
**Total**: ~584 items analizados (de 140 a 584 = **+317% más noticias**)

---

## Consideraciones Importantes

### ⏱️ Tiempo de Análisis
- Scraper actual: 30 items por feed × 4 feeds = 120 items procesados
- Con Opción 1: 30 items × 9 feeds = 270 items procesados (~2-3x tiempo)
- Con Opción 2: 30 items × 13 feeds = 390 items procesados (~3-4x tiempo)

### 💰 Límite de Gemini
- Tier gratuito: **20 requests/día**
- Ejecuciones: 2 veces/semana = no hay problema
- Si procesamos 390 items y solo ~5-10 son relevantes = 5-10 requests/ejecución ✅

### 🎯 Calidad vs Cantidad
- **BraveWords** tiene 300 items pero solo necesitamos analizar 30
- Más fuentes = más diversidad de cobertura
- Filtro de IA + keywords ya previene falsos positivos

---

## Mi Recomendación: OPCIÓN 1 (Expansión Moderada)

### Por qué
1. **BraveWords** solo aporta volumen masivo sin garantía de mejor cobertura
2. Las 5 nuevas fuentes son **premium** (Revolver, Metal Hammer, Consequence)
3. Tiempo de procesamiento razonable
4. Diversidad geográfica (US + UK)
5. Diferentes audiencias (mainstream + underground)

### Implementación
Solo actualizar el array `RSS_FEEDS` en `scripts/scrape-news.js`.

---

## Comando para actualizar

### Para testing:
```bash
# Primero probar con las nuevas fuentes individualmente
node scripts/check-rss-feeds.js
```

### Para producción:
Editar `scripts/scrape-news.js` líneas 29-34 según la opción elegida.
