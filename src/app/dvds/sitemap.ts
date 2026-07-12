import { MetadataRoute } from 'next'
import dvdsData from '../../constants/dvd.json'
import { generateDVDSlug } from '@/types/dvd'

interface DVDDataItem {
  title?: string;
  album_title?: string;
  year?: number;
  release_year?: number;
}

const baseUrl = 'https://ghostband.com.ar'

function bilingualEntries(
  path: string,
  entry: { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>; priority: number },
): MetadataRoute.Sitemap {
  const enUrl = `${baseUrl}${path}`
  const esUrl = `${baseUrl}/es${path}`
  const languages = { en: enUrl, es: esUrl }

  return [
    { url: enUrl, lastModified: new Date(), alternates: { languages }, ...entry },
    { url: esUrl, lastModified: new Date(), alternates: { languages }, ...entry },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Página principal de DVDs
  const dvdsPage = bilingualEntries('/dvds', {
    changeFrequency: 'weekly',
    priority: 0.8,
  })

  // Páginas individuales de DVDs
  const dvdPages = (dvdsData as DVDDataItem[])
    .filter((item) => item.title || item.album_title)
    .flatMap((dvd) => {
      const slug = generateDVDSlug(dvd.title || dvd.album_title)
      return bilingualEntries(`/dvds/${slug}`, {
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

  return [...dvdsPage, ...dvdPages]
}
