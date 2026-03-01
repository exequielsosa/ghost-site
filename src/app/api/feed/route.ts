import { getAllNews } from "@/lib/supabase";

export async function GET() {
  try {
    const newsData = await getAllNews();

    // Sort by date descending (newest first)
    const sortedNews = [...newsData].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );

    // Limit to 50 latest items
    const recentNews = sortedNews.slice(0, 50);

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
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
