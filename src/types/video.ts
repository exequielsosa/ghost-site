import { slugify } from "@/utils/slugify";

export type VideoDescription = {
  es: string;
  en: string;
};

export type Video = {
  title: string;
  year: number;
  youtube: string;
  description: VideoDescription;
};

export function generateVideoSlug(title: string): string {
  return slugify(title);
}

export function findVideoBySlug(videos: Video[], slug: string): Video | null {
  return videos.find((video) => generateVideoSlug(video.title) === slug) || null;
}