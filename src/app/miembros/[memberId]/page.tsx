import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import membersData from "@/constants/members.json";
import ghoulsData from "@/constants/ghouls.json";
import MemberDetailClient from "./MemberDetailClient";

interface Member {
  id: string;
  name: string;
  fullName?: { es: string; en: string };
  role?: { es: string; en: string };
  biography?: { es: string; en: string };
  [key: string]: unknown;
}

interface PageProps {
  params: Promise<{
    memberId: string;
  }>;
}

function findMember(memberId: string): Member | null {
  // Search in current members
  const memberObj = membersData.members[memberId as keyof typeof membersData.members];
  if (memberObj) return memberObj as Member;

  // Search in all ghouls eras
  const ghoulsRecord = ghoulsData as Record<string, Record<string, Member>>;
  for (const era of Object.values(ghoulsRecord)) {
    if (era[memberId]) {
      return era[memberId];
    }
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { memberId } = await params;
  const locale = (await getLocale()) as "es" | "en";
  const member = findMember(memberId);

  if (!member) {
    return { title: "Miembro no encontrado" };
  }

  const name = member.name;
  const fullName = member.fullName?.[locale] || name;
  const role = member.role?.[locale] || "";
  const biography = member.biography?.[locale] || "";
  const biographyShort = biography.substring(0, 160);

  const keywords = [
    "Ghost",
    "miembros",
    "members",
    name,
    fullName,
    role,
    "Ghost band",
    "Nameless Ghouls",
    "Ghost Argentina",
    "theatrical rock",
    "rock teatral",
    "Tobias Forge",
    "Ghost lineup",
    "Ghost formación",
    ...name.split(" ").filter((word) => word.length > 3),
  ].filter(Boolean);

  return {
    title: `${name} | Ghost`,
    description: biographyShort || `Información sobre ${name} de Ghost`,
    keywords: keywords.join(", "),
    openGraph: {
      title: `${name} | Ghost`,
      description: biographyShort,
      url: `/miembros/${memberId}`,
      siteName: "Ghost Fan Site",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Ghost`,
      description: biographyShort,
      creator: "@GhostFanSite",
    },
    alternates: {
      canonical: `/miembros/${memberId}`,
      languages: {
        es: `/miembros/${memberId}`,
        en: `/miembros/${memberId}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MemberPage({ params }: PageProps) {
  const { memberId } = await params;
  const member = findMember(memberId);

  if (!member) {
    notFound();
  }

  return <MemberDetailClient params={params} />;
}
