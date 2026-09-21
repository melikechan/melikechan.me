import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const socialCardSize = {
  width: 1200,
  height: 630,
};

export function getSocialCard(pageName: string) {
  const url = new URL("/social-card", siteConfig.url);
  url.searchParams.set("page", pageName);

  return {
    url: url.toString(),
    ...socialCardSize,
    alt: `melikechan - ${pageName}`,
  };
}

interface PageMetadataOptions {
  title: string;
  description?: string;
  pathname: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  socialTitle?: string;
}

export function createPageMetadata({
  title,
  description,
  pathname,
  absoluteTitle = false,
  noIndex = false,
  socialTitle = title,
}: PageMetadataOptions): Metadata {
  const socialCard = getSocialCard(socialTitle);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [socialCard],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialCard],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
