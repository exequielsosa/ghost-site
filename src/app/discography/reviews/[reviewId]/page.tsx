import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import reviewsData from "@/constants/reviews.json";
import { Review } from "@/types/review";
import ReviewDetailPage from "@/components/ReviewDetailPage";

export async function generateStaticParams() {
  return reviewsData.map((review) => ({
    reviewId: review.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const { reviewId } = await params;
  const review = reviewsData.find((r) => r.id === reviewId) as Review;

  if (!review) {
    return {
      title: "Review not found",
    };
  }

  const title = review.title[locale as "es" | "en"];
  const subtitle = review.subtitle?.[locale as "es" | "en"];
  const fullTitle = subtitle ? `${title} - ${subtitle}` : title;

  return {
    title: `${fullTitle} | Ghost Argentina`,
    description: review.content[locale as "es" | "en"].substring(0, 160),
    keywords: `Megadeth, review, crítica, reseña, ${title}, ${review.category}, Dave Mustaine, álbum, rating ${review.rating}`,
    openGraph: {
      title: fullTitle,
      description: review.content[locale as "es" | "en"].substring(0, 200),
      type: "article",
      publishedTime: review.publishedDate,
      url: `https://ghostband.com.ar/discography/reviews/${review.id}`,
      images: [
        {
          url: `https://ghostband.com.ar${review.imageUrl}`,
          alt: review.imageAlt[locale as "es" | "en"],
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: review.content[locale as "es" | "en"].substring(0, 200),
      images: [`https://ghostband.com.ar${review.imageUrl}`],
    },
    alternates: {
      canonical: `https://ghostband.com.ar/discography/reviews/${review.id}`,
      languages: {
        es: `https://ghostband.com.ar/discography/reviews/${review.id}`,
        en: `https://ghostband.com.ar/discography/reviews/${review.id}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) {
  const locale = await getLocale();
  const { reviewId } = await params;
  const review = reviewsData.find((r) => r.id === reviewId) as Review;

  if (!review) {
    notFound();
  }

  return <ReviewDetailPage review={review} locale={locale} />;
}
