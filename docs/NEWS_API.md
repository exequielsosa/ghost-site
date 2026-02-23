# API Manual de Noticias - Fase 2

## 📌 Descripción

API REST para crear noticias manualmente en el sitio de Megadeth. Requiere autenticación mediante API Key y valida todos los campos según el esquema de la base de datos.

## 🔐 Autenticación

Todas las requests requieren un header con la API Key:

```bash
X-API-Key: tu_clave_api_secreta
```

La API Key se configura en la variable de entorno `NEWS_API_KEY`.

## 🛠️ Endpoints

### POST /api/news/create

Crea una nueva noticia en la base de datos.

**URL:** `https://ghostband.com.ar/api/news/create` (producción)  
**URL:** `http://localhost:3000/api/news/create` (desarrollo)

**Headers:**
```
Content-Type: application/json
X-API-Key: tu_clave_api_secreta
```

**Body (JSON):**

#### Campos Requeridos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | ID único de la noticia (slug-friendly) |
| `title_es` | string | Título en español |
| `title_en` | string | Título en inglés |
| `description_es` | string | Descripción completa en español |
| `description_en` | string | Descripción completa en inglés |
| `published_date` | string | Fecha de publicación (formato: YYYY-MM-DD) |

#### Campos Opcionales - Imagen

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `image_url` | string | URL de la imagen principal |
| `image_alt_es` | string | Texto alternativo en español |
| `image_alt_en` | string | Texto alternativo en inglés |
| `image_caption_es` | string | Caption de la imagen en español |
| `image_caption_en` | string | Caption de la imagen en inglés |

#### Campos Opcionales - Enlace

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `link_url` | string | URL de enlace externo |
| `link_target` | enum | `"_blank"` o `"_self"` |

#### Campos Opcionales - Configuración

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `comments_active` | boolean | Habilitar comentarios | `true` |
| `youtube_video_id` | string | ID del video de YouTube | - |
| `is_automated` | boolean | Marcador de noticia automatizada | `false` |
| `source_url` | string | URL de la fuente original | - |

#### Enlaces Externos (Array Opcional)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `external_links` | array | Array de objetos de enlaces externos |
| `external_links[].url` | string | URL del enlace (requerido) |
| `external_links[].text_es` | string | Texto en español (requerido) |
| `external_links[].text_en` | string | Texto en inglés (requerido) |
| `external_links[].order_index` | number | Orden de visualización (default: 0) |

## 📝 Ejemplos de Uso

### Ejemplo Mínimo (Solo Campos Requeridos)

```bash
curl -X POST http://localhost:3000/api/news/create \
  -H "Content-Type: application/json" \
  -H "X-API-Key: tu_clave_secreta" \
  -d '{
    "id": "megadeth-news-2026",
    "title_es": "Nueva noticia de Megadeth",
    "title_en": "New Megadeth news",
    "description_es": "Descripción completa de la noticia...",
    "description_en": "Full description of the news...",
    "published_date": "2026-02-14"
  }'
```

### Ejemplo Completo (Todos los Campos)

```bash
curl -X POST http://localhost:3000/api/news/create \
  -H "Content-Type: application/json" \
  -H "X-API-Key: tu_clave_secreta" \
  -d '{
    "id": "megadeth-tour-2026",
    "title_es": "Megadeth anuncia gira mundial 2026",
    "title_en": "Megadeth announces 2026 world tour",
    "description_es": "La banda legendaria ha confirmado su gira mundial...",
    "description_en": "The legendary band has confirmed their world tour...",
    "published_date": "2026-02-14",
    "image_url": "https://example.com/images/megadeth-tour.jpg",
    "image_alt_es": "Logo de la gira",
    "image_alt_en": "Tour logo",
    "image_caption_es": "La nueva gira promete ser épica",
    "image_caption_en": "The new tour promises to be epic",
    "link_url": "https://megadeth.com/tour",
    "link_target": "_blank",
    "comments_active": true,
    "youtube_video_id": "dQw4w9WgXcQ",
    "source_url": "https://blabbermouth.net/news/megadeth-2026",
    "external_links": [
      {
        "url": "https://ticketmaster.com/megadeth",
        "text_es": "Comprar entradas",
        "text_en": "Buy tickets",
        "order_index": 0
      }
    ]
  }'
```

### Usando el Script Interactivo

```bash
# Generar API Key segura (una sola vez)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Agregar NEWS_API_KEY al archivo .env
echo "NEWS_API_KEY=tu_clave_generada" >> .env

# Ejecutar script interactivo
npm run add:news
```

## ✅ Respuestas de Éxito

**Status Code:** `201 Created`

```json
{
  "success": true,
  "message": "Noticia creada exitosamente",
  "data": {
    "article": {
      "id": "megadeth-tour-2026",
      "title_es": "Megadeth anuncia gira mundial 2026",
      "title_en": "Megadeth announces 2026 world tour",
      "published_date": "2026-02-14",
      "created_at": "2026-02-14T10:30:00.000Z",
      ...
    },
    "external_links": [
      {
        "id": "uuid-aqui",
        "news_id": "megadeth-tour-2026",
        "url": "https://ticketmaster.com/megadeth",
        "text_es": "Comprar entradas",
        "text_en": "Buy tickets"
      }
    ]
  }
}
```

## ❌ Respuestas de Error

### 401 Unauthorized - API Key inválida

```json
{
  "error": "API Key inválida o no proporcionada"
}
```

### 400 Bad Request - Datos inválidos

```json
{
  "error": "Datos de entrada inválidos",
  "validation_errors": [
    {
      "field": "title_es",
      "message": "Título en español es requerido"
    },
    {
      "field": "published_date",
      "message": "Formato de fecha debe ser YYYY-MM-DD"
    }
  ]
}
```

### 409 Conflict - ID duplicado

```json
{
  "error": "Ya existe una noticia con el ID: megadeth-tour-2026"
}
```

### 500 Internal Server Error

```json
{
  "error": "Error al crear la noticia",
  "details": "Mensaje de error detallado"
}
```

## 🔧 Scripts Disponibles

```bash
# Ejecutar script interactivo para agregar noticias
npm run add:news

# Verificar conexión con Supabase
npm run verify:supabase

# Migrar noticias existentes (solo una vez)
npm run migrate:news
```

## 🚀 Deployment en Producción

1. Configurar variable de entorno en Vercel:
   ```bash
   vercel env add NEWS_API_KEY
   ```

2. La API estará disponible en:
   ```
   https://ghostband.com.ar/api/news/create
   ```

3. Para mayor seguridad, considera:
   - Usar Vercel Edge Config para rate limiting
   - Agregar IP allowlist si solo accedes desde IPs conocidas
   - Rotar la API Key periódicamente

## 📚 Próxima Fase

**Fase 3: Automatización con IA**
- Scraping automático de sitios de noticias
- Procesamiento con Google Gemini API
- Traducción y resumen automáticos
- Cron job 2x por semana
