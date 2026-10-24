import { getLatestNewsCached } from "@/lib/news";

export async function GET() {
  try {
    // Las 50 últimas (ya vienen ordenadas por fecha desc) desde el cache de
    // datos (lib/news.ts): antes cada lector de RSS bajaba todas las noticias.
    const recentNews = await getLatestNewsCached(50);

    // Generate RSS XML
    const rssItems = recentNews
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title?.en || article.title?.es || "Untitled"}]]></title>
      <description><![CDATA[${(article.description?.en || article.description?.es || "No description").substring(0, 500)}]]></description>
      <link>https://ghostband.com.ar/noticias/${article.id}</link>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <guid isPermaLink="false">ghost-news-${article.id}</guid>
      ${
        article.imageUrl
          ? `<image><url>${article.imageUrl.startsWith("http") ? article.imageUrl : `https://ghostband.com.ar${article.imageUrl}`}</url></image>`
          : article.youtubeVideoId
            ? `<image><url>https://img.youtube.com/vi/${article.youtubeVideoId}/hqdefault.jpg</url></image>`
            : ""
      }
    </item>
  `
      )
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Ghost Argentina - Noticias | Ghost Argentina News</title>
    <link>https://ghostband.com.ar</link>
    <description>Últimas noticias y actualidad de Ghost | Latest Ghost news and updates</description>
    <language>es-es</language>
    <copyright>Ghost Argentina Fan Site © 2024</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>https://ghostband.com.ar/images/ghost-logo.png</url>
      <title>Ghost Argentina</title>
      <link>https://ghostband.com.ar</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        // s-maxage para que la CDN lo cachee (max-age solo cachea en el cliente)
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
