import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const siteName = "Prism & Dark Room";

export const shareImages = {
  prism: {
    url: "/og/prism.png",
    width: 1200,
    height: 630,
    alt: "Prism symbol: a wireframe prism refracting a beam into five bands",
    type: "image/png",
  },
  darkRoom: {
    url: "/og/dark-room.png",
    width: 1200,
    height: 630,
    alt: "Dark Room logo with the door ajar",
    type: "image/png",
  },
};

type ShareImage = (typeof shareImages)[keyof typeof shareImages];

export const absoluteUrl = (path: string) =>
  `${siteUrl}${path === "/" ? "/" : path}`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: ShareImage;
};

export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  image = shareImages.prism,
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["pt_BR"],
      siteName,
      title: absoluteTitle ? title : `${title} · Prism`,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} · Prism`,
      description,
      images: [image],
    },
  };
}

export function legacyMeta(title: string, target: string): Metadata {
  return {
    title,
    robots: { index: false, follow: true },
    alternates: { canonical: target },
  };
}
