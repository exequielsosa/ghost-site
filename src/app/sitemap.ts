import { MetadataRoute } from 'next';
import lineupsData from '@/constants/lineups.json';
import membersData from '@/constants/members.json';
import discographyData from '@/constants/discography.json';
import dvdData from '@/constants/dvd.json';
import songsData from '@/constants/songs.json';
import historiaData from '@/constants/historia.json';
import interviewsData from '@/constants/interviews.json';
import showsData from '@/constants/shows.json';
import videosData from '@/constants/videos.json';
import { generateInterviewSlug } from '@/types/interview';
import { generateVideoSlug } from '@/types/video';
import { generateDVDSlug } from '@/types/dvd';
import { getAllNews } from '@/lib/supabase';

const base = 'https://ghostband.com.ar';

// Por cada página lógica empuja DOS entradas (en + es), cada una con la otra
// como alternate — el patrón que Next.js 15 espera para sitemaps bilingües
// (no una sola entrada con un mapa de idiomas).
function pushBilingual(
  sitemap: MetadataRoute.Sitemap,
  path: string,
  entry: {
    lastModified: Date;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
    priority: number;
  },
) {
  const enUrl = `${base}${path}`;
  const esUrl = path === '/' ? `${base}/es` : `${base}/es${path}`;
  const languages = { en: enUrl, es: esUrl };

  sitemap.push({ url: enUrl, alternates: { languages }, ...entry });
  sitemap.push({ url: esUrl, alternates: { languages }, ...entry });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    { path: '/', priority: 1, changeFreq: 'daily' as const },
    { path: '/tour', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/noticias', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/discography', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/videos', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/dvds', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/historia', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/papas', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/miembros', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/entrevistas', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/terminos', priority: 0.6, changeFreq: 'yearly' as const },
    { path: '/privacidad', priority: 0.6, changeFreq: 'yearly' as const },
    { path: '/contacto', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/songs', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/shows', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/discography/reviews', priority: 0.9, changeFreq: 'weekly' as const },
  ];
  const sitemap: MetadataRoute.Sitemap = [];

  // Páginas principales
  pages.forEach(page => {
    pushBilingual(sitemap, page.path, {
      lastModified: new Date(),
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });
  });

  // Canciones dinámicas
  if (Array.isArray(songsData)) {
    songsData.forEach(song => {
      if (song.id) {
        pushBilingual(sitemap, `/songs/${song.id}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Papas / formaciones dinámicas
  const lineups = lineupsData.lineups;
  lineups.forEach(lineup => {
    pushBilingual(sitemap, `/papas/${lineup.id}`, {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Miembros dinámicos
  const memberIds = Object.keys(membersData.members);
  memberIds.forEach(memberId => {
    pushBilingual(sitemap, `/miembros/${memberId}`, {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Discografía dinámica
  if (Array.isArray(discographyData)) {
    discographyData.forEach(album => {
      if (album.id) {
        pushBilingual(sitemap, `/discography/${album.id}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // DVDs dinámica — usa generateDVDSlug (la misma función que usa
  // dvds/[dvdId]/page.tsx para buscar), no una copia local del slugify.
  if (Array.isArray(dvdData)) {
    dvdData.forEach((dvd) => {
      const title = dvd.title || (dvd as { album_title?: string }).album_title;
      const slug = title ? generateDVDSlug(title) : undefined;
      if (slug) {
        pushBilingual(sitemap, `/dvds/${slug}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Historia dinámica
  if (historiaData && Array.isArray(historiaData.chapters)) {
    historiaData.chapters.forEach(chapter => {
      if (chapter.slug) {
        pushBilingual(sitemap, `/historia/${chapter.slug}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Entrevistas dinámicas
  if (Array.isArray(interviewsData)) {
    interviewsData.forEach(interview => {
      const slug = generateInterviewSlug(interview.id);
      if (slug) {
        pushBilingual(sitemap, `/entrevistas/${slug}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Shows dinámicas
  if (Array.isArray(showsData)) {
    showsData.forEach(show => {
      const slug = generateInterviewSlug(show.id);
      if (slug) {
        pushBilingual(sitemap, `/shows/${slug}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Videos dinámicos
  if (Array.isArray(videosData)) {
    videosData.forEach(video => {
      const slug = generateVideoSlug(video.title);
      if (slug) {
        pushBilingual(sitemap, `/videos/${slug}`, {
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Noticias dinámicas desde Supabase — news.id ya ES la clave primaria real
  // (getNewsById hace .eq("id", id), match exacto). No pasarlo por
  // generateInterviewSlug: esa función colapsa guiones dobles, y un id real
  // con doble guión generaría una URL que no matchea ninguna noticia (404).
  try {
    const newsData = await getAllNews();
    if (Array.isArray(newsData)) {
      newsData.forEach(news => {
        if (news.id) {
          pushBilingual(sitemap, `/noticias/${news.id}`, {
            lastModified: new Date(news.publishedDate || new Date()),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error loading news for sitemap:', error);
  }

  return sitemap;
}
