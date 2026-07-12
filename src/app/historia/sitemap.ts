import { MetadataRoute } from 'next';
import historiaData from '@/constants/historia.json';
import { HistoryData } from '@/types/historia';

const baseUrl = 'https://ghostband.com.ar';

function bilingualEntries(
  path: string,
  entry: { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>; priority: number },
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
  const data = historiaData as HistoryData;

  // Página principal de historia
  const mainHistoryPage = bilingualEntries('/historia', {
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // Páginas de capítulos individuales
  const chapterPages = data.chapters.flatMap((chapter) =>
    bilingualEntries(`/historia/${chapter.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  return [...mainHistoryPage, ...chapterPages];
}
