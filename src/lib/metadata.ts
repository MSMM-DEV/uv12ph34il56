import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = title === "Home" ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
