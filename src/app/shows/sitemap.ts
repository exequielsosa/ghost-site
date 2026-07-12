import { MetadataRoute } from "next";
import showsData from "@/constants/shows.json";
import { Show, generateShowSlug } from "@/types/show";

const baseUrl = "https://ghostband.com.ar";

function bilingualEntries(
  path: string,
  entry: { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>; priority: number },
): MetadataRoute.Sitemap {
  const enUrl = `${baseUrl}${path}`;
  const esUrl = `${baseUrl}/es${path}`;
  const languages = { en: enUrl, es: esUrl };

  return [
    { url: enUrl, lastModified: new Date(), alternates: { languages }, ...entry },
    { url: esUrl, lastModified: new Date(), alternates: { languages }, ...entry },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const shows = showsData as Show[];

  const showEntries = shows.flatMap((show) =>
    bilingualEntries(`/shows/${generateShowSlug(show)}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    ...bilingualEntries("/shows", { changeFrequency: "weekly", priority: 0.8 }),
    ...showEntries,
  ];
}
